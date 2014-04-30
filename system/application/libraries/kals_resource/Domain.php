<?php
include_once 'KALS_resource.php';
/**
 * Domain
 *
 * 網域
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/27 下午 09:14:42
 * @example
 * 資料表建立：<code>

-- Table: "domain"

-- DROP TABLE "domain";

CREATE TABLE "domain"
(
  domain_id serial NOT NULL,
  host character varying(2083) NOT NULL,
  title text,
  CONSTRAINT domain_pk PRIMARY KEY (domain_id)
)
WITH (OIDS=FALSE);
ALTER TABLE "domain" OWNER TO postgres;

 * </code>
 */
class Domain extends KALS_resource {

    public $resource_type_id = 1;

    protected $table_name = 'domain';
    protected $table_fields = array('domain_id', 'host', 'title');
    protected $primary_key = 'domain_id';
    protected $not_null_field = array('host');
    protected $unique_restriction = array('host');
    protected $default_field = 'url';
    protected $foreign_keys = array(
         'webpage' => 'domain_id',
         'user' => 'domain_id',
         'group' => 'domain'
    );

    protected $use_cache = TRUE;

    private $auth;

    protected function  _post_construct($table_name = NULL, $id = NULL) {
        $this->_CI_load('library', 'policy/Authorize_manager', 'authorize_manager');
        $this->auth = new Authorize_manager();
        $this->auth->set_resource($this);
        $this->auth->set_throw_exception(TRUE);
    }

    protected function _set_field_filter($cond)
    {
        if (is_array($cond) && array_key_exists('url', $cond)) {
            $cond['host'] = parse_host($cond['url']);
        }
        else if (is_string($cond) && $cond == 'url') {
            $cond = 'host';
        }
        //else if (is_string($cond) && starts_with($cond, "http://") === FALSE) {
        //    $cond = "http://" . $cond;
        //}

        return $cond;
    }
    protected function _get_field_filter($cond)
    {
        if (is_string($cond) && $cond == 'url') {
            $cond = 'host';
        }
        
        return $cond;
    }

    protected function _pre_update($data)
    {
        //插入權限檢查
        //$this->auth->allow(1);

        if (FALSE === isset($data['title'])
            OR is_null($data['title']))
        {
            $host = $this->get_field('host');
            $title = retrieve_title($host);
            if (NULL != $title)
            {
                $data['title'] = $title;
                $this->set_field('title', $title);
            }
        }
        return $data;
    }

    protected function _pre_create($data)
    {
        //插入權限檢查
        //$this->auth->allow(1);
        return $data;
    }

    protected function _pre_delete()
    {
        //插入權限檢查
        $this->auth->allow(1);
    }

    public function get_host()
    {
        return $this->get_field('host');
    }

    public function get_title()
    {
        return $this->get_field('title');
    }

    /**
     * 輸入網址，過濾出指定的domain
     * @param Domain|String|Int $domain_id
     * @return Int Domain ID
     */
    public function filter_domain_id($domain_id)
    {
        if (is_object($domain_id) && get_class($domain_id) == 'Domain')
        {
            $domain = $domain_id;
            $domain_id = $domain->get_id();
        }
        if (is_string($domain_id)) {
            $http_prefix = "http://";
            $https_prefix = "https://";
            if (starts_with($domain_id, $http_prefix) === FALSE
                    && starts_with($domain_id, $https_prefix) === FALSE) {
                $domain_id = $http_prefix . $domain_id;
            }
            
            if (ends_with($domain_id, "/")) {
                $domain_id = $domain_id . "/";
            }
            
            $domain = $this->create($domain_id);
            $domain_id = $domain->get_id();
        }
        return $domain_id;
    }

    /**
     * 取得該Domain底下所有的webpage陣列
     * @return array|Webpage
     */
    public function get_webpages() {
        $id = $this->get_id();
        $output = array();

        if (is_null($id))
            return $output;

        $query = $this->CI->db->select('webpage_id')
                ->where(array('domain_id' => $id))
                ->get('webpage');
        $this->_CI_load('library', 'kals_resource/Webpage');
        foreach ($query->result_array() AS $row)
        {
            $id = intval($row['webpage_id']);
            $obj = new Webpage($id);
            array_push($output, $obj);
        }
        return $output;
    }
    
    /**
     * 取得所有Domain
     * @return array|Domain
     */
    static public function get_all_domains() {
        $output = array();
        $domain = new Domain();
        $query = $domain->CI->db->select('domain_id')
                ->get('domain');
        foreach ($query->result_array() AS $row)
        {
            $id = intval($row['domain_id']);
            $obj = new Domain($id);
            array_push($output, $obj);
        }
        return $output;
    }
    
    /**
     * 取得所有Domain的所有Webpage
     * @return Array
     * key domain_id
     * value Array|Webpage
     * 
     * $array = array(
     *      1 => array(3, 4, 6),
     *      6 => array(5, 12, 34)
     * );
     */
    static public function get_all_domain_webpages() {
        
        //$domains = $this->get_all_domains();
        $domains = Domain::get_all_domains();
        $output = array();
        
        foreach ($domains AS $domain) {
            $output[$domain->get_id()] = $domain->get_webpages();
        }
        
        return $output;
    }
}


/* End of file Domain.php */
/* Location: ./system/application/libraries/kals_resource/Domain.php */