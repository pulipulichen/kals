<?php
include_once 'web_apps_controller.php';
/**
 * Image_scope
 *
 * annotation_getter full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2015/11/14 下午 03:36:17
 */

class Image_spot extends Web_apps_controller {

    protected $controller_enable_cache = FALSE;
    protected $login_require = FALSE;

    var $user = NULL;
    var $url = NULL;
    var $action_id = 3;
    
    /**
     * @var {annotation_getter}
     */
    var $annotation_getter = NULL;


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
        $this->user = get_context_user();
        
        require_once 'annotation_getter.php';
        $this->annotation_getter = new annotation_getter();

    }
    
    // ------------------------------------
    /**
     * 取得image_spot指定的標註
     * @param int $index 標註的位置
     * @param string $callback
     */
    public function get($index, $callback) {
        $output_data = array();
        
        $url = $this->url;
        $search = new Search_annotation_collection();
        
        // 設定範圍
        $scope_coll = $this->annotation_scope_collection->import_webpage_search_data($url, $index);
        $search->set_target_scope($scope_coll);
        
        foreach ($search AS $search_annotation)
        {
            $annotation_data = $search_annotation->export_webpage_imape_spot_data($url);
            $output_data[] = $annotation_data;
        }

        
//        $output_data[] = array(
//            "top" => 286,
//            "left" => 161,
//            "width" => 52,
//            "height" => 37,
//            "text" => "Small people on the steps",
//            "id" => "e69213d0-2eef-40fa-a04b-0ed998f9f1f5",
//            "editable" => false ,
//            "type" => "疑惑",
//            "user" => "楊舜閔",
//            "timestamp" => 1445172850
//        );
//        
//        $output_data[] = array(
//            "top" => 134,
//            "left" => 179,
//            "width" => 68,
//            "height" => 74,
//            "text" => "National Gallery Dome<span style='color:red;'>color</span>",
//            "id" => "e7f44ac5-bcf2-412d-b440-6dbb8b19ffbe",
//            "editable" => true,
//            "type" => "重要",
//            "user" => "布丁",
//            "timestamp" => 1447201802
//        );
        
        return $this->_display_jsonp($output_data, $callback);
    }
    
    // ----------------------------------------------------------
    
    /**
     * @author Pulipuli Chen <pulipuli.chen@gmail.com> 20151114
     * @param String|Null $json
     */
    public function create($json = NULL) {
        $index = 'create_image_spot_post';
        if ($this->_is_callback($json) == false)
        {
            //test_msg("set", 1);
            //從POST中取得JSON的資料
            $json = $this->_get_post_json();
            
            //test_msg("set", 2);
            $data = $this->_create_image_spot_process($json);

            //test_msg("set", 3);
            //然後把data存入session中
            $this->_set_post_session($index, $data);
            
            //test_msg("set", 4);
            $this->_display_post_complete();
        }
        else
        {
            $callback = $json;
            $data = $this->_get_post_session($index);

            $this->_display_jsonp($data, $callback);
        }
        context_complete();
    }
    
    /**
     * 實際上進行建立檔案的過程
     * @param Object $json
     * @return Object
     */
    private function _create_image_spot_process($json)
    {
        // 是否啟用偵錯
        $debug = FALSE;
        if ($debug) {
            $this->output->enable_profiler(TRUE);
        }
        
        $data = json_to_object($json);
        
        //檢視資料
        //test_msg('annotation_setter._create_image_spot_process', $json);
        //{
        //  "feature_location":[0,2,4],
        //  "note":"%3Cp%3E%0A%09test%3C%2Fp%3E%0A",
        //  "policy_type":1,
        //  "is_like":false,
        //  "like_count":0,
        //  "feature_recommend_scope":[[6391,6434]],
        //  "scope":[
        //      [6391,6433,"3.%20This%20distraction%20effect%20of%20the%20visual%20cue%20map%20has%20not%20been%20proven.%20In%20the%20future%2C%20a%20systematic%20experimental%20design%20should%20be%20conducted%20to%20examine%20whether%20the%20visual%20cue%20map%20distracts%20learners\'%20reading%2C%20thus%20affecting%20their%20reading%20comprehension"]
        //      ],
        //  "type":1
        //   }
            
        //先將權限設成管理者
        set_ignore_authorize(true);

        //取得參考網址資料跟位於session的user
        $url = $this->url;
        $user = $this->user;

        //取得來自$json的範圍資料
        $scope_coll_data = $data->scope;
        //$scope_coll_data = "[35,35]";
        //echo $scope_coll_data;
        $scope_coll = $this->annotation_scope_collection->import_webpage_data($url, $scope_coll_data);
        //echo $scope_coll->get_id();
        //echo $scope_coll->export_json();

        //建立標註
        //test_msg("建立標註");
        $annotation = $this->annotation->create_annotation($user, $scope_coll);
        //test_msg("設定標註", $annotation->get_id());
        $data = $this->_setup_annotation($annotation, $data);
        //test_msg("建立完成");
        
        set_ignore_authorize(true);
        //test_msg("_create_process", 'after create recommend');
        
//        // 標註共識的分數都重新計算
//        test_msg("標註共識的分數都重新計算");
//        $annotation = new Annotation($annotation->get_id());
//        test_msg("建立完成");
        
        //log區
        $array_data = $annotation->export_webpage_data($this->url);

        $action = "image_spot.create";
        kals_log($this->db, $action, $array_data);
        
        set_ignore_authorize(false);
        
        return $data;
    }
    
    /**
     *
     * @param Annotation $annotation
     * @param Object $data
     * @param String $callback
     */
    private function _setup_annotation(& $annotation, $data)
    {
        //$this->output->enable_profiler(TRUE);

        $url = $this->url;
        $user = $this->user;
        $auth = $this->authorize_manager;

        //設定標註細節
        //test_msg('設定標註細節');
            //type
            if (isset($data->type))
            {
                if (is_string($data->type))
                {
                    $data->type = trim($data->type);
                    if ($data->type !== '') {
                        $data->type = urldecode($data->type);
                    }
                    else {
                        //如果是空白的話，則視為自訂
                        $data->type = 7;
                    }
                }

                $annotation->set_type($data->type);
            }

            //note
            if (isset($data->note) && $data->note != '')
            {
                $note = $data->note;
                if (is_string(($note))) {
                    $note = urldecode($note);
                }

                $annotation->set_note($note);
            }
            else
            {
                $note = $annotation->get_note();

                if (isset($note) && $note !== '') {
                    $annotation->set_note(NULL);
                }
            }
            
            if (isset($data->image_spot_position)) {
                //test_msg("image_spot_position");
                $annotation->set_feature_image_spot_position($data->image_spot_position);
                //test_msg("image_spot_position 完成");
            }

//        //設定respond
//        //test_msg('設定respond');
            //topic
//            if (isset($data->topic))
//            {
//                //理論上topic只會有一個，並設定他的ID
//                $topic_id = $data->topic->annotation_id;
//                $annotation->set_respond_to_topic($topic_id);
//            }
//
//            //respond_coll
//            if (isset($data->respond_to_coll))
//            {
//                $respond_to_annotations = array();
//                foreach ($data->respond_to_coll AS $respond_to)
//                {
//                    $respond_to_annotation_id = $respond_to->annotation_id;
//                    $respond_to_annotation = new Annotation($respond_to_annotation_id);
//                    $respond_to_annotations[] = $respond_to_annotation;
//                }
//                $annotation->set_respond_to_coll($respond_to_annotations);
//            }

        //-----------------------
        //設定policy
        
        //test_msg('設定policy');
        $policy_type = 1;
        if (isset($data->policy_type)) {
            $policy_type = $data->policy_type;
        }
        // 1    public
        // 2    private    private特別是指只有自己能閱讀
        // 3    share
        $share_user_coll = NULL;

        if ($policy_type === 1)
        {
            //什麼都不用作
        }
        else if ($policy_type === 2)
        {
            $share_user_coll = array(
                $user
            );
        }
        else if ($policy_type === 3)
        {
            $share_list = $data->share_list;

            $share_user_coll = array();
            foreach ($share_list AS $share_user_data)
            {
                $share_user_id = $share_user_data->id;
                $share_user = new User($share_user_id);
                array_push($share_user_coll, $share_user);
            }
        }

        $this->load->library('policy/Authorize_manager');

        $ACTION_ANNOTATION_READ = 5;

        $auth->set_resource($annotation);

        if (is_array($share_user_coll))
        {
            foreach ($share_user_coll AS $share_user)
            {
                //在這邊為該$annotation設定policy readable
                $auth->policy_add_actor($ACTION_ANNOTATION_READ, $share_user);
            }
        }
        else
        {
            //清除該$annotation的policy
            $auth->policy_remove_actor($ACTION_ANNOTATION_READ);
        }
        
        //-------------------

        //回傳標註建立的ID跟timestamp
        //test_msg("更新前");
        $annotation->update();
        //test_msg("更新後");

        $return_data = array(
            'annotation_id' => $annotation->get_id(),
            'timestamp' => $annotation->get_update_epoch(),
            'nav' => $this->annotation_getter->parse_navigation_level($annotation->get_score(0)->get_score())

            //,'note' => $annotation->get_note()
            //,'noteset' => $data->note
        );

        /*
        else
        {
            $topic_annotation = $annotation->get_topic();
            $this->_setup_scores_recommend($topic_annotation);
        }
        */

        set_ignore_authorize(false);

        // 寫入資料庫
        context_complete();

        return $return_data;
    }

    // ------------------------------


    public function edit($json = NULL) {
        $index = 'edit_image_spot_post';
        if ($this->_is_callback($json) == false)
        {
            //從POST中取得JSON的資料
            $json = $this->_get_post_json();
            $data = $this->_edit_process($json);

            //然後把data存入session中
            $this->_set_post_session($index, $data);
        }
        else
        {
            $callback = $json;
            $data = $this->_get_post_session($index);
            $this->_display_jsonp($data, $callback);
        }
        context_complete();
    }
    
    private function _edit_process($json)
    {
        $data = json_to_object($json);

        //先將權限設成管理者
        set_ignore_authorize(true);

        //取得參考網址資料跟位於session的user
        $user = $this->user;

        $annotation = NULL;
        if (isset($data->annotation_id))
        {
            $annotation = new Annotation($data->annotation_id);

            $annotation_user = $annotation->get_user();
            if ($user->get_id() == $annotation_user->get_id())
            {
                $data = $this->_setup_annotation($annotation, $data);
            }
            else {
                $data = create_json_excpetion('Edit Annnotation Error', 'You cannot edit annotation whick is not yours.');
            }
        } else
        {
            $data = create_json_excpetion('Edit Annnotation Error', 'Annotation ID is NULL');
        }

        //log區
        $array_data = NULL;
        if (isset($annotation)) {
            $array_data = $annotation->export_webpage_data($this->url);
        }

        $action = "image_spot.edit";
        kals_log($this->db, $action, $array_data);

        return $data;
    }
    
    // ------------------------------
//    public function delete($json, $callback = NULL)
//    {
//        require_once 'annotation_setter.php';
//        $annotation_setter = new annotation_setter();
//        $annotation_setter->delete($json, $callback);
//        return true;
//    }

    public function delete($json, $callback = NULL)
    {
        $annotation_id = json_to_object($json);

        if (is_null($annotation_id))
        {
            $data = FALSE;
            return $this->_display_jsonp($data, $callback);
        }

        //set_ignore_authorize(true);
        $annotation = new Annotation($annotation_id);
        $this->_delete_annotation($annotation);
        set_ignore_authorize(true);
        context_complete();

        $data = true;
        return $this->_display_jsonp($data, $callback);
    }    
    
    /**
     * 
     * @param Annotation $annotation
     * @return Boolean
     */
    private function _delete_annotation($annotation) {
        $annotation_id = $annotation->get_id();
        $annotation_user = $annotation->get_user();

        //test_msg('delete', $annotation_user->get_id());
        if (is_null($annotation_user->get_id()))
        {
            $data = show_error('No annotation.');
            return $this->_display_jsonp($data, $callback);
        }

        $user = $this->user;
        if ($user->equals($annotation_user) === FALSE)
        {
            $data = show_error('Permission deny.');
            return $this->_display_jsonp($data, $callback);
        }

        $action = "image_spot.delete";
        kals_log($this->db, $action, $annotation_id);

        set_ignore_authorize(true);
        
        $annotation->delete();
        context_complete();
        set_ignore_authorize(false);
    }
}

/* End of file annotation_getter.php */
/* Location: ./system/application/controllers/annotation_getter.php */