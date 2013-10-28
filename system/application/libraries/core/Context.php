<?php
/**
 * Context
 *
 * 負責記錄使用者資訊、網頁資訊與快取資料的物件
 * @author Pudding Chen <puddingchen.35@gmail.com>
 * @version 1.0 2010/6/18 上午 11:47:26
 * @copyright Copyright (c) 2010, Pudding Chen
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @property CI_Session $session
 * @example
 * 資料表建立：<code>

-- Table: ci_sessions

-- DROP TABLE ci_sessions;

CREATE TABLE ci_sessions
(
  session_id character varying(40) NOT NULL DEFAULT 0,
  ip_address character varying(16) NOT NULL DEFAULT 0,
  user_agent character varying(50) NOT NULL,
  last_activity integer NOT NULL DEFAULT 0,
  user_data text,
  CONSTRAINT ci_sessions_pkey PRIMARY KEY (session_id)
)
WITH (OIDS=FALSE);
ALTER TABLE ci_sessions OWNER TO postgres;

 * </code>
 */
class Context extends KALS_object {

    var $session;
    var $config;

    var $webpage;
    var $domain;
    var $user;

    var $ignore_auth = FALSE;
//    static private $CACHEABLE_TYPES = array('Domain', 'Webpage', 'Annotation', 'User', 'Group', 'Annotation_scope', 'Scope_anchor_text', 'Annotation_like'
//        , 'Annotation_feature_collection', 'Annotation_like_collection', 'Annotation_respond_collection', 'Annotation_topic_respond_collection'
//        , 'Annotation_scope_collection', 'Annotation_score_collection'
//        , 'Notification_collection', 'Policy', 'Notification', 'Annotation_collection', 'User_friend_collection'
//        , 'Search_annotation_collection', 'Search_annotation_id_collection'
//        , 'Language_variable_collection', 'Language_variable_consensus', 'Language_variable_like'
//        , 'Annotation_recommend'
//        );
//    static private $CACHEABLE_TYPES_CLOSE = array();
    static private $CACHEABLE_TYPES;
    static private $cache = array();

    var $ignore_authorize = FALSE;

    function __construct()
    {
        parent::__construct();
        $this->_CI_load('library', 'session', 'session');
        $this->session = $this->CI->session;

        $this->_CI_load('library', 'core/Logger', 'logger');
        $this->logger = $this->CI->logger;

        if (is_null(self::$CACHEABLE_TYPES))
        {
            $this->CI->config->load('kals');
            self::$CACHEABLE_TYPES = $this->CI->config->item('CACHEABLE_TYPES');
        }

        $this->db->trans_start();
    }

    function get_context()
    {
        return $this;
    }

    /**
     * 取得現在的使用者
     * @return User
     */
    function get_current_user()
    {
        if ($this->user == NULL)
        {
            //先讀取session，取得user_id
            $user_id = $this->session->userdata('user_id');
            if ($user_id !== FALSE)
            {
                //$this->CI->load->library('kals_actor/User');
                $this->_CI_load('library', 'kals_actor/User', 'user');
                $this->user = new User($user_id);
                //$this->user->find();
            }
        }
        return $this->user;
    }

    function set_current_user($user_in = NULL)
    {
        if (is_null($user_in))
        {
            $this->user = NULL;
            $this->session->unset_userdata('user_id');
        }
        else
        {
            $this->user = $user_in;
            $this->session->set_userdata(array(
                    'user_id' => $user_in->get_id()
                ));
        }
        return $this;
    }

    function clear_current_user()
    {
        return $this->set_current_user(NULL);
    }

    function get_current_webpage()
    {
        if ($this->webpage == NULL)
        {
            $url = get_referer_url();
            //$this->CI->load->library('kals_resource/Webpage');
            $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
            $this->webpage = $this->CI->webpage->create($url);
        }
        return $this->webpage;
    }

    function get_current_domain()
    {
        if ($this->domain == NULL)
        {
            $url = get_referer_url();
            //$this->CI->load->library('kals_resource/Domain');
            $this->_CI_load('library', 'kals_resource/Domain', 'domain');
            $this->domain = $this->CI->domain->create($url);
        }
        return $this->domain;
    }

    function set_cache(&$obj, $key, $value = NULL)
    {
        if (is_array($key) && is_null($value))
        {
            $cond = $key;
            $key = get_cond_key($cond);
            $value = get_cond_value($cond);
        }

        if (!is_object($obj)
                OR $key == NULL
                OR $value == NULL)
            return;

        $type = get_class($obj);
        if (!in_array($type, self::$CACHEABLE_TYPES))
        {
            //echo " Not Cacheable: ".$type.'<br />';
            return;
        }

        if (!isset(self::$cache[$type][$key][$value]))
            self::$cache[$type][$key][$value] =& $obj;
        //echo '[Setted Cache Type: '.$type.'; Key: '.$key.'; Value:'.$value.'] <br />';
    }

    function unset_cache($obj)
    {
        if (!is_object($obj))
            return;

        $type = get_class($obj);
        if (!in_array($type, self::$CACHEABLE_TYPES))
            return;

        if (is_array(self::$cache[$type]))
        {
            foreach (self::$cache[$type] AS $key => $cache_key)
            {
                if (is_array($cache_key))
                {
                    foreach ($cache_key AS $value => $cache_value)
                    {
                        if ($cache_value->get_id() == $obj->get_id())
                        {
                            //echo '[Cache Removed! Type: '.$type.'; Key: '.$key.'; Value:'.$value.'] <br />';
                            unset(self::$cache[$type][$key][$value]);
                        }
                    }
                }   //if (is_array($cache_key))
                else
                {
                    if ($cache_key->get_id() == $obj->get_id())
                    {
                        //echo '[Cache Removed! Type: '.$type.'; Key: '.$key.'] <br />';
                        unset(self::$cache[$type][$key]);
                    }
                }
            }
        }
    }

    function get_cache($type, $key, $value = NULL)
    {
        if (is_array($key) && is_null($value))
        {
            $cond = $key;
            $key = get_cond_key($cond);
            $value = get_cond_value($cond);
        }

        if ($type == NULL OR $key == NULL OR $value == NULL)
            return NULL;
        
        if (is_object($type))
            $type = get_class($type);

        //echo '[Search Cache Type: '.$type.'; Key: '.$key.'; Value:'.$value.'] <br />';
        if (isset(self::$cache[$type][$key])
            && isset(self::$cache[$type][$key][$value]))
        {
            //echo '[Cache Getted! Type: '.$type.'; Key: '.$key.'; Value:'.$value.'] <br />';
            $object = self::$cache[$type][$key][$value];
            return $object;
        }
        else
        {
            //echo '[Cache Not Found! Type: '.$type.'; Key: '.$key.'; Value:'.$value.'] <br />';
            return NULL;
        }
    }

    public function set_ignore_authorize($ignore)
    {
        $this->ignore_authorize = $ignore;
    }

    public function get_ignore_authorize()
    {
        return $this->ignore_authorize;
    }

    public function check_login_domain($show_exception = TRUE) {

        $user = $this->get_current_user();
        if (is_null($user))
            return TRUE;

        $user_domain = $user->get_domain();
        if ($user_domain->get_host() != get_referer_host($show_exception))
        {
            if ($show_exception)
            {
                handle_error('chech_login_domain_failed');
            }

            return FALSE;
        }
        return TRUE;
    }

    public function set_session($index, $data)
    {
        $this->session->set_userdata(array(
            $index => $data
        ));
        context_complete();
        return true;
    }

    public function get_session($index)
    {
        return $this->session->userdata($index);
    }

    // ---------------------------------------

    /**
     * @var String 標註指引類型
     *  "all" 所有標註
     *  "recommend" 推薦標註
     *  "none" 不顯示標註
     * @version 20111106 Pudding Chen
     */
    var $_anchor_navigation_type = null;
    var $_default_anchor_navigation_type = "all";

    /**
     * 設定標註指引類型
     * @param String $type 標註指引類型
     *  "all" 所有標註
     *  "recommend" 推薦標註
     *  "none" 不顯示標註
     * @return authentication
     * @version 20111106 Pudding Chen
     */
    public function set_anchor_navigation_type($type)
    {
        ////if (!isset($this->session))
        //{
        //    $this->load->library('session');
        //}
        $this->_anchor_navigation_type = $type;
        $session_name = $this->_get_anchor_navigation_type_session_name();
        //test_msg('設置成功？', set_session($session_name, $type));
        set_session($session_name, $type);
        return $this;
    }

    /**
     * 取得標註指引類型
     * @param String|null $callback 回呼函式的名稱
     * @return String
     * @version 20111106 Pudding Chen
     */
    public function get_anchor_navigation_type($callback = NULL) {
        $output = $this->_anchor_navigation_type;
        $session_name = $this->_get_anchor_navigation_type_session_name();

        //test_msg($session_name, get_session($session_name));

        if (is_null($output))
        {
            //試著從session抓資料看看
            $session_data = get_session($session_name);
            //test_msg('取得的資料是', ($session_data == FALSE));
            if ($session_data != FALSE)
            {
                $this->set_anchor_navigation_type($session_data);
                $output = $session_data;
            }
            else
            {
                $output = $this->_default_anchor_navigation_type;
            }
        }

        return $output;
    }

    /**
     * 取得標註指引類型的session名稱
     *  固定標題+webpage
     * @access private
     * @return String
     */
    private function _get_anchor_navigation_type_session_name() {
        $output = 'anchor_navigation_type_';

        $wepage = get_context_webpage();
        if (isset($wepage)) {
            $output = $output . $wepage->get_id();
        }
        return $output;
    }
}

/* End of file context.php */
/* Location: ./system/application/library/core/Context.php */