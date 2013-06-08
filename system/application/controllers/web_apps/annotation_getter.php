<?php
include_once 'web_apps_controller.php';
/**
 * annotation_getter
 *
 * annotation_getter full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/10/23 下午 03:51:22
 */

class Annotation_getter extends Web_apps_controller {

    protected $controller_enable_cache = FALSE;
    protected $login_require = FALSE;

    var $url = NULL;
    var $action_id = 3;

    function __construct() {
        parent::__construct();

        $this->load->library('scope/Annotation_scope_collection');
        $this->load->library('scope/Annotation_scope');
        $this->load->library('kals_resource/Domain');
        $this->load->library('kals_resource/Webpage');
        $this->load->library('kals_resource/Annotation');

        $this->load->library('kals_actor/User');

        $this->load->library('search/Search_annotation_collection');
        $this->load->library('search/Search_annotation_id_collection');
        $this->load->library('search/Search_annotation_user_collection');
        $this->load->library('search/Search_scope_collection');

        $this->load->library('type/Type_factory');

        $this->url = get_referer_url(TRUE);

    }

    /**
     * @return array(0=> "basic", 1=> "custom")
     */
    function my($json = NULL, $callback = NULL) {

        $check_time = NULL;
        if (isset($callback))
        {
            $check_time = json_to_object($json);
        }
        else
        {
            $callback = $json;
        }
        //login_require(true);
        if (login_require(FALSE) === FALSE)
        {
            $output_data = array(
                'basic'=> array(),
                'custom'=> array()
            );
            return $this->_display_jsonp($output_data, $callback);
        }

        $user = get_context_user();

        $type_scope_colls = array(
            //1 => new Annotation_scope_collection(), //importance
            //2 => new Annotation_scope_collection(), //question
            //3 => new Annotation_scope_collection(), //confusion
            //4 => new Annotation_scope_collection(), //summary
            //5 => new Annotation_scope_collection(), //concept
            //6 => new Annotation_scope_collection(), //example
            //7 => new Annotation_scope_collection()  //custom
        );

        /**
         * @var array 自訂的類型
         */
        $custom_type_scope_colls = array();

        $search = new Search_annotation_collection();
        $search->set_target_user($user);
        $search->set_target_topic(TRUE);

        if (isset ($check_time))
        {
            $search->set_target_newer_update($check_time);
        }

        $search->add_order(6, FALSE);

        //test_msg('準備要取得資料嚕');

        //取得搜尋結果
        foreach ($search AS $annotation)
        {
            $annotation_type = $annotation->get_type();
            $annotation_type_id = $annotation_type->get_type_id();
            $annotation_type_name = $annotation_type->get_custom_name();
            $is_basic = $annotation_type->is_basic();
            //test_msg('is_basic', array($is_basic, $annotation_type_id) );
            $annotation_scope_coll = $annotation->get_scopes();

            if ($is_basic == true)
            {
                if (isset($type_scope_colls[$annotation_type_id]) == false)
                    $type_scope_colls[$annotation_type_id] = new Annotation_scope_collection();

                //test_msg('標註', array($annotation_type_id, $annotation));

                //用$is_basic來區分是否是基本類型吧
                //if ($annotation_type_id > 7)
                //    $annotation_type_id = 7;

                foreach ($type_scope_colls AS $type_id => $scope_coll)
                {
                    if ($annotation_type_id == $type_id)
                    {
                        foreach ($annotation_scope_coll AS $scope)
                        {
                            $scope_coll->add_scope($scope);
                        }
                    }
                    else
                    {
                        foreach ($annotation_scope_coll AS $scope)
                        {
                            $scope_coll->exclude_scope($scope);
                        }
                    }
                }
            }   //if ($is_basic)
            else
            {
                if (isset($custom_type_scope_colls[$annotation_type_name]) == false)
                    $custom_type_scope_colls[$annotation_type_name] = new Annotation_scope_collection();

                foreach ($custom_type_scope_colls AS $type_name => $scope_coll)
                {
                    if ($annotation_type_name == $type_name)
                    {
                        foreach ($annotation_scope_coll AS $scope)
                        {
                            $scope_coll->add_scope($scope);
                        }
                    }
                    else
                    {
                        foreach ($annotation_scope_coll AS $scope)
                        {
                            $scope_coll->exclude_scope($scope);
                        }
                    }
                }
            }
            
            //test_msg('標註3', array($annotation_type_id, $annotation));
        }

        //test_msg('完成取得標註');

        $output_data = array(
            'basic' => array(),
            'custom' => array()
        );

        foreach ($type_scope_colls AS $type_id => $scope_coll)
        {
            //這是給basic的！
            $output_data['basic'][$type_id] = $scope_coll->export_webpage_data($this->url);
        }

        foreach ($custom_type_scope_colls AS $type_id => $scope_coll)
        {
            //這是給custom的！
            $output_data['custom'][$type_id] = $scope_coll->export_webpage_data($this->url);
        }
        return $this->_display_jsonp($output_data, $callback);
    }

    /**
     * 取出basic的範圍
     * @param string $json
     * @param string $callback
     * @return array()
     */
    function my_basic($json = NULL, $callback = NULL)
    {
        $output_data = array();

        $my_annotation = $this->my();
        if (isset($my_annotation['basic'])) {
            $output_data = $my_annotation['basic'];
        }
        else if (is_array($my_annotation)) {
            $output_data = $my_annotation;
        }

        return $this->_display_jsonp($output_data, $callback);
    }

    /**
     * 取出custom的範圍
     * @param string $json
     * @param string $callback
     * @return array()
     */
    function my_custom($json = NULL, $callback = NULL)
    {
        $output_data = array();

        $my_annotation = $this->my();
        if (isset($my_annotation['custom']))
            $output_data = $my_annotation['custom'];
        else if (is_array($my_annotation))
            $output_data = $my_annotation;

        return $this->_display_jsonp($output_data, $callback);
    }
    
    /**
     * 標註指引，預設是指引到全部
     * @param {Object} $json=NULL
     * @param {Object} $callback=NULL
     */
    function navigation($json = NULL, $callback = NULL)
    {
        $type = $GLOBALS['context']->get_anchor_navigation_type();

        if ($type == 'recommend')
            return $this->navigation_recommend($json, $callback);
        else if ($type == 'none')
            return $this->navigation_none($json, $callback);
        else
            return $this->navigation_all($json, $callback);
    }

    /**
     * 標註指引：推薦的
     * @param {Object} $json=NULL
     * @param {Object} $callback=NULL
     */
    function navigation_recommend($json = NULL, $callback = NULL)
    {
        $check_time = NULL;
        if (isset($callback))
        {
            $check_time = json_to_object($json);
        }
        else
        {
            $callback = $json;
        }

        /*
        $score_scope_colls = array(
            1 => new Annotation_scope_collection(), //bad
            2 => new Annotation_scope_collection(), //normal
            3 => new Annotation_scope_collection(), //good
            4 => new Annotation_scope_collection()  //great
        );
         */
        
        //這是用來顯示最後導覽的數值
        $score_scope_colls = array(
            //4 => new Annotation_scope_collection()  //great
        );

        $search = new Search_annotation_collection();

        if (isset ($check_time))
        {
            $search->set_target_newer_update($check_time);
        }

        //依照分數由高而低
        $recommend_by = $this->config->item('recommend_by_threshold');

        $search->add_order(1, FALSE);
        $search->set_target_topic(TRUE);
        $search->set_target_over_score($recommend_by);
        $search->set_target_webpage($this->url);

        //取得搜尋結果
        $score_type = 4;
        foreach ($search AS $annotation)
        {

            //如果要讓標註指引有分數層次的差別，則請解開這邊的註解
            /*
            $score = $annotation->get_score(0)->get_score();

            $score_type = 1;
            if ($score < 1.5)
                $score_type = 1;
            else if ($score >= 1.5 && $score < 2)
                $score_type = 2;
            else if ($score >= 2 && $score < 2.5)
                $score_type = 3;
            else
                $score_type = 4;
            */
           
            if (isset($score_scope_colls[$score_type]) == false)
            {
                $score_scope_colls[$score_type] = new Annotation_scope_collection();
            }
           
            $annotation_scope_coll = $annotation->get_scopes();

            foreach ($score_scope_colls AS $type_id => $scope_coll)
            {
                if ($score_type == $type_id)
                {
                    foreach ($annotation_scope_coll AS $scope)
                    {
                        //test_msg('add_scope', array(
                        //    $type_id,
                        //    $scope->get_from_index(),
                        //    $scope->get_to_index()
                        //));
                        $scope_coll->add_scope($scope);
                    }
                }
                else
                {
                    foreach ($annotation_scope_coll AS $scope)
                    {
                        //test_msg('exclude_scope', array(
                        //    $type_id,
                        //    $scope->get_from_index(),
                        //    $scope->get_to_index()
                        //));
                        $scope_coll->exclude_scope($scope);
                    }
                }
            }
        }

        $output_data = array();
        foreach ($score_scope_colls AS $type_id => $scope_coll)
        {
            //test_msg($this->url);

            $output_data[$type_id] = $scope_coll->export_webpage_data($this->url);
            //$output_data[$type_id] = $scope_coll->export_data();
        }
        return $this->_display_jsonp($output_data, $callback);
    }
    
    /**
     * 標註指引：全部
     * @param {Object} $json=NULL
     * @param {Object} $callback=NULL
     */
    function navigation_all($json = NULL, $callback = NULL)
    {
        $check_time = NULL;
        if (isset($callback))
        {
            $check_time = json_to_object($json);
        }
        else
        {
            $callback = $json;
        }
        
        //這是用來顯示最後導覽的數值
        $score_scope_colls = array(
            //1 => new Annotation_scope_collection(), //bad
            //2 => new Annotation_scope_collection(), //normal
            //3 => new Annotation_scope_collection(), //good
            //4 => new Annotation_scope_collection()  //great
        );
        
        $search = new Search_annotation_collection();

        if (isset ($check_time))
        {
            $search->set_target_newer_update($check_time);
        }

        $search->add_order(1, FALSE);
        $search->set_target_topic(TRUE);
        $search->set_target_webpage($this->url);
        
        //不限定全部標註
        //$search->set_target_over_score($recommend_by);
        
        //取得搜尋結果
        foreach ($search AS $annotation)
        {

            //如果要讓標註指引有分數層次的差別，則請解開這邊的註解
            $score = $annotation->get_score(0)->get_score();

            $score_type = $this->parse_navigation_level($score);
            
            if (isset($score_scope_colls[$score_type]) === false)
            {
                $score_scope_colls[$score_type] = new Annotation_scope_collection();
            }
           
            $annotation_scope_coll = $annotation->get_scopes();

            foreach ($score_scope_colls AS $type_id => $scope_coll)
            {
                if ($score_type == $type_id)
                {
                    foreach ($annotation_scope_coll AS $scope)
                    {
                        //test_msg('add_scope', array(
                        //    $type_id,
                        //    $scope->get_from_index(),
                        //    $scope->get_to_index()
                        //));
                        $scope_coll->add_scope($scope);
                    }
                }
                else
                {
                    foreach ($annotation_scope_coll AS $scope)
                    {
                        //test_msg('exclude_scope', array(
                        //    $type_id,
                        //    $scope->get_from_index(),
                        //    $scope->get_to_index()
                        //));
                        $scope_coll->exclude_scope($scope);
                    }
                }
            }
        }

        $output_data = array();
        foreach ($score_scope_colls AS $type_id => $scope_coll)
        {
            $output_data[$type_id] = $scope_coll->export_webpage_data($this->url);
        }
        return $this->_display_jsonp($output_data, $callback);
    }
    
    /**
     * 標註指引：不顯示
     * @param {Object} $json=NULL
     * @param {Object} $callback=NULL
     */
    function navigation_none($json = NULL, $callback = NULL)
    {
        $output_data = array();
        return $this->_display_jsonp($output_data, $callback);
    }
    
    function navigation_disable($json = NULL, $callback = NULL)
    {
        return $this->navigation_none($json, $callback);
    }

    /**
     * 判斷推薦標註的等級，目前分成4級
     * @version 20111106 Pudding Chen
     * @param float $score
     * @return int
     */
    public function parse_navigation_level($score)
    {
        $score_type = 1;
        if ($score < 1.5)
            $score_type = 1;
        else if ($score >= 1.5 && $score < 2)
            $score_type = 2;
        else if ($score >= 2 && $score < 2.5)
            $score_type = 3;
        else
            $score_type = 4;
        return $score_type;
    }

    function list_annotation($json, $callback = NULL)
    {
        $enable_profiler = FALSE;

        if ($enable_profiler == TRUE)
            $this->output->enable_profiler(TRUE);

        if (is_string($json))
            $data = json_to_object($json);
        else
            $data = $json;

        $user = get_context_user();
        $url = $this->url;
        $search = new Search_annotation_collection();

        $search_id = null;
        if (isset($data->limit))
            $search_id = new Search_annotation_collection();

        // 1 [ topic id ]
        if (isset($data->topic_id)
            && isset($data->target_topic) && $data->target_topic === TRUE)
        {
            $annotation = new Annotation($data->topic_id);
            $output_data = array(
                'annotation_collection' => array(
                    $annotation->export_data()
                ),
                'totally_loaded' => true
            );
            
            return $this->_display_jsonp($output_data, $callback);
        }
        else if (isset($data->topic_id)
            && isset($data->target_topic) && $data->target_topic === FALSE)
        {
            $search->set_target_topic_id($data->topic_id);
            if (isset($search_id))
                $search_id->set_target_topic_id($data->topic_id);
        }

        // 2 [ scope ]
        //test_msg('2 [ scope ]', is_null($data->scope));
        //如果沒有設定範圍，則直接回傳空值
        //if (is_null($data->scope))
        //{
        //    //return $this->_create_null_list($callback);
        //}

        if (isset($data->scope))
        {
            $scope_coll_data = $data->scope;
            //test_msg('2 [ scope ] 2', is_null($data->scope));
            $scope_coll = $this->annotation_scope_collection->import_webpage_search_data($url, $scope_coll_data);

            //test_msg($scope_coll->export_json());


            $search->set_overlap_scope($scope_coll);
            if (isset($search_id))
                $search_id->set_overlap_scope($scope_coll);

            //test_msg('2 [ scope ] 3', is_null($data->scope));
        }
        

        // 3 [ target like ]
        // 4 [ target my ]
        //test_msg('3 [ target like ] 4 [ target my ]');

        if ((isset($data->target_lik) OR isset($data->target_my) )
            && is_null($user))
        {
            return $this->_create_null_list($callback);
        }

        if (isset($data->target_like))
        {
            $search->set_target_like($data->target_like, $user);
            if (isset($search_id))
                $search_id->set_target_like($data->target_like, $user);
        }

        if (isset($data->target_my))
        {
            if ($data->target_my === TRUE)
            {
                $search->set_target_user($user);
                if (isset($search_id))
                    $search_id->set_target_user($user);
            }
            else
            {
                $search->set_exclude_user($user);
                if (isset($search_id))
                    $search_id->set_exclude_user($user);
            }
        }
        
        // 5 [ target_topic ]
        if (isset($data->target_topic))
        {
            $search->set_target_topic($data->target_topic);
            if (isset($search_id))
                $search_id->set_target_topic($data->target_topic);
        }

        // 6 [ order by ]
        //test_msg('6 [ order by ]', isset($data->order_by));
        if (isset($data->order_by))
        {
            if ($data->order_by == 'update')
            {
                $search->add_order (6, TRUE);
                if (isset($search_id))
                    $search_id->add_order (6, TRUE);
            }
            else if ($data->order_by == 'create')
            {
                $search->add_order (7);
                if (isset($search_id))
                    $search_id->add_order (7);
            }
            else
            {
                $search->add_order (1, TRUE);
                if (isset($search_id))
                    $search_id->add_order (1, TRUE);
            }
        }
        else
        {
            $search->add_order (1, TRUE);
            if (isset($search_id))
                $search_id->add_order (1, TRUE);
        }

        if (isset($data->order_by) === FALSE OR $data->order_by != 'update')
        {
            $search->add_order (6, TRUE);
            if (isset($search_id))
                $search_id->add_order (6, TRUE);
        }

        // 7 [ offset ]
        //test_msg('7 [ offset ]', isset($data->offset));
        if (isset($data->offset))
        {
            $search->set_offset($data->offset);
            if (isset($search_id))
                $search_id->set_offset($data->offset);
        }

        // 8 [ limit ]
        //test_msg('8 [ limit ]', array(isset($data->limit),$data->limit));

        if (isset($data->limit))
        {
            $search->set_limit($data->limit);

            //$search_id在此不作設限
        }

        //輸出
        $totally_loaded = TRUE;
        if (isset ($search_id))
            $totally_loaded = FALSE;
        
        //不作limit的情況下讀完，表示完全讀取
        if (isset($search_id)
            && ($search->length() == $search_id->length() || $search->length() == 0))
        {
            $totally_loaded = TRUE;
        }

        $annotation_collection = array();

        //test_msg('Search Length', $search->length());

        foreach ($search AS $search_annotation)
        {
            $annotation_data = $search_annotation->export_webpage_data($url);

            if (isset($data->target_topic) && $data->target_topic === TRUE)
            {
                $search_data = json_to_object('{}');
                $search_data->target_topic = FALSE;
                $search_data->topic_id = $search_annotation->get_id();
                $search_data->limit = 5;
                //$search_data->is_like = NULL;
                $search_data->order_by = 'create';
                $search_data->show_total_count = TRUE;

                $search_result = $this->list_annotation($search_data);
                
                //test_msg($search_result);

                if (count($search_result['annotation_collection']) > 0)
                {
                    $annotation_data['respond_list'] = $search_result;
                }
            }

            array_push($annotation_collection, $annotation_data);
        }


        $output_data = array(
            'annotation_collection' => $annotation_collection,
            'totally_loaded' => $totally_loaded
        );

        if (isset($data->show_total_count)
            && $data->show_total_count === TRUE)
        {
            if (count($annotation_collection) === 0)
                $output_data['total_count'] = 0;
            else if (isset($search_id))
                $output_data['total_count'] = $search_id->length();
            else
                $output_data['total_count'] = count($annotation_collection);
        }

        //log區
        $array_data = NULL;
        if (is_string($json))
            $array_data = json_to_array($json);
        else
            $array_data = (array) $json;
        $user_id = NULL;
        if (isset($user))
            $user_id = $user->get_id();

        $action = 12;
        if (isset($data->topic_id)
            && isset($data->target_topic) && $data->target_topic === FALSE
            && isset($data->limit) == FALSE)
            $action = 16;

        $do_log = TRUE;
        if (isset($data->limit) && $data->limit == 5)
            $do_log = FALSE;

        if (isset($data->target_my))
        {
            if ($data->target_my == FALSE)
                $do_log = FALSE;
        }
        else if ($user_id == NULL)
        {

            $action = 17;
            if (isset($data->topic_id)
                && isset($data->target_topic) && $data->target_topic === FALSE
                && isset($data->limit) == FALSE)
                $action = 18;
        }
         
        if ($do_log)
        {
            kals_log($this->db, $action, array('memo'=>$array_data, 'user_id' => $user_id));
        }

        context_complete();

        if ($enable_profiler != TRUE)
            return $this->_display_jsonp($output_data, $callback);
    }

    private function _create_null_list($callback)
    {
        $output_data = array(
            'annotation_collection' => array(),
            'totally_loaded' => true
        );
        return $this->_display_jsonp($output_data, $callback);
    }

    public function load_annotation_param($annotation_id, $callback)
    {
        //$this->output->enable_profiler(TRUE);
        $annotation = new Annotation($annotation_id);
        if ($annotation->is_deleted() == FALSE)
        {
            $output_data = $annotation->export_webpage_data($this->url);
        }
        else
        {
            $output_data = FALSE;
        }
        return $this->_display_jsonp($output_data, $callback);
    }

    /**
     * 查詢標註類型的ID
     * @deprecated 20111105 Pudding Chen 不使用
     * @param string $json 輸入的值為「標註類型」的「字串陣列」
     *      例如 ["標註類型一", "標註類型二", "標註類型三"]
     *      如果沒有該標註類型，則會自動建立
     * @param string $callback
     * @return 回傳標註類型與對應的ID
     *      例如 {"標註類型一":19, "標註類型二":20, "標註類型三":21}
     */
    /*
    public function get_annotation_type_id($json, $callback = NULL) {

        $type_name_list = json_to_object($json);
        $output_data = array();

        foreach ($type_name_list AS $type_name)
        {
            $type_id = $this->type_factory->filter_id($type_name);
            $output_data[$type_name] = $type_id;
        }

        return $this->_display_jsonp($output_data, $callback);
    }
     */
}

/* End of file annotation_getter.php */
/* Location: ./system/application/controllers/annotation_getter.php */