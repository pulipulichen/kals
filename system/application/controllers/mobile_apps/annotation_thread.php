<?php
include_once 'mobile_apps_controller.php';
/**
 * annotation_thread
 * 列出指定annotation_id的thread
 * 
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2014, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2014/4/23 下午 03:51:22
 */

class annotation_thread extends Mobile_apps_controller{
    
     /**
      * mobile_login
      * 登入
      * 
      * 範例：http://localhost/kals/mobile/mobile_user_login
      */
    var $url; //來源url
    var $webpage;
    var $client_ip;

    var $CI;
    var $session;

    function __construct()
    {
        parent::__construct();
        $this->load->library('kals_actor/User');
        //$this->url = get_referer_url(TRUE);

        $this->client_ip = array(
           'ip' => get_client_ip(),
           'browser' => $_SERVER['HTTP_USER_AGENT']
        );
        
        // 新增標註用
 
        $this->load->library('scope/Annotation_scope_collection');
        $this->load->library('scope/Annotation_scope');
        $this->load->library('kals_resource/Annotation');  
        
        $this->lang->load('kals_mobile_apps');
        $this->lang->load('kals_web_apps');
    } 
    
    /**
     * 轉接
     * @param Int $topic_id
     * @param Int $page 頁數，目前尚未有作用
     */
    public function index($topic_id, $page = 0) {
        $this->topic_id($topic_id, $page);
    }
    // -----------------------------------------------------------------
    
    /**
     * 列出指定topic_id的標註列表
     * @param Int $topic_id
     * @param Int $page
     */
    public function topic_id($topic_id, $page = 0) {
        
        // 準備要送去給view的資料
        $data = array();
        
        // 過濾一下topic_id
        if (strval($topic_id)) {
            $topic_id = intval($topic_id);
        }
        $topic_annotation = new Annotation($topic_id);
        
        // 先檢查是否是topic
        $this->_check_is_topic($topic_annotation);
        
        $data["topic_annotation"] = $this->_get_topic_annotation_attr($topic_annotation);
        $data["webpage"] = $this->_get_webpage_attr($topic_annotation);
        
        // 接收-送回應值
        // 用post接收textarea的值:array
        
        // 以下不知道要幹嘛，全部刪掉
        /*
        if ( isset($_POST["note_text"]) ) {
            $note_massage = $_POST["note_text"];
            $data["note_massage"] = $note_massage;                     
        }       
        // radio-type 
        if (isset ($_POST["annotation_type"])){
            $anno_type = $_POST["annotation_type"];       
            $data['pop_type'] = $anno_type;
        }
        
        $annotation_self_id = $annotation_id;        
         */
        // check topic id
        // 不做topic_id的判斷
        /*
        $is_topic_id = NULL;
        if (isset($annotation_id)) {
            $topic_array = $this->db->query("SELECT topic_id
                                   FROM annotation
                                   WHERE annotation_id ='".$annotation_id."'");
            foreach ($topic_array->result_array() as $row) {
                $is_topic_id = $row['topic_id'];
            }
        }
        
        if($is_topic_id !== NULL){
            //is respond id
            $annotation_id = $is_topic_id;
        }    
         */
        
        
        //echo 'annotation_id ='.$annotation_id.'/';
        //echo 'topic_id = '.$is_topic_id.'/';
        // $login_test = $this->session->userdata('logged_in');
        //echo 'loggin = '.$login_test.'/';
        

        // $annotation_id
        /*
        $annotation = new Annotation($annotation_id);
        $annotation_id = $annotation->get_id();           
        $log_topic_id = $annotation_id;
        $anchor_text = $annotation->get_anchor_text();  
        $user = $annotation->get_user()->get_name();   
        $user_id = $annotation->get_user()->get_id();
        $type = $annotation->get_type()->get_name();        
        $css_type = $annotation->get_type()->get_type_id();
        $note = $annotation->get_note();   
        $timestamp = $annotation->get_update_timestamp();       
        */
        //$log_user_id = $this->session->userdata('user_id');    
        //echo $this->session->userdata('user_id').'??';
        //echo $this->session->userdata('logged_in').'??';
        
        /*
        $login_user = get_context_user();
        $log_user_id = NULL;
        $logged_id = FALSE;
        if (isset($login_user)) {
            $log_user_id = $login_user->get_id();
            $logged_id = TRUE;
        }
        */
        
        if (isset($_POST["annotation_type"])) {
            //test_msg("有回應！！！");
            $data = $this->_do_response($topic_annotation, $data);
        }
       
        // 記錄
        $this->_log($topic_annotation);
        
        $data["respond_annotations"] = $this->_get_respond_annotations($topic_annotation);
    
        $this->_display_view($data);
    }
    
    /**
     * 確認是否是topic_annotation
     * @param Annotation $annotation
     */
    private function _check_is_topic($annotation) {
        if ($annotation->is_respond()) {
            $topic_id = $annotation->get_topic()->get_id();
            $respond_id = $annotation->get_id();
            $annotation_thread_uri = site_url("mobile_apps/annotation_thread/topic_id/"
                    . $topic_id
                    . "#respond_" . $respond_id);
            
            // 轉走
            redirect($annotation_thread_uri);
            
            return FALSE;
        }
        return TRUE;
    }
    
    /**
     * 準備好topic的Annotation資料
     * @param Annotation $annotation
     * @param Array $data
     * @return Array
     */
    private function _get_topic_annotation_attr($annotation) {
        $topic_id = $annotation->get_id();
        //$annotation_id = $annotation->get_id();           
        //$log_topic_id = $annotation_id;
        $anchor_text = $annotation->get_anchor_text();  
        $annotation_user_name = $annotation->get_user()->get_name();   
        //$user_id = $annotation->get_user()->get_id();
        
        $annotation_type = $annotation->get_type();
        $type_classname = $annotation_type->get_classname();
        $note = $annotation->get_note();   
        $timestamp = $annotation->get_update_timestamp();    
        
        // send data -annotation topic
        $topic_annotation_array = array();
        
        $topic_annotation_array["topic_id"] = $topic_id;
        //$data["annotation_self_id"] = $annotation_self_id;
        $topic_annotation_array["anchor_text"] = $anchor_text;
        $topic_annotation_array["user_name"] = $annotation_user_name;
        $topic_annotation_array["type_name_lang"] = $this->_get_type_name_lang($annotation_type);
        $topic_annotation_array["type_classname"] = $type_classname;
        
        $topic_annotation_array["note"] = $note;
        
        $topic_annotation_array["timestamp"] = $this->_convert_timestamp_to_date($timestamp);
        
        $login_user_id = get_context_user_id();
        $topic_annotation_array["is_my"] = FALSE;
        if (isset($login_user_id) 
                && $annotation->get_user()->get_id() === $login_user_id) {
            $topic_annotation_array["is_my"] = TRUE;
        }
        
        return $topic_annotation_array;
    }
    
    private function _do_response($topic_annotation, $data) {
        
        set_ignore_authorize(true);   
        
        // 開始新增標註回應       
        //取得參考網址(全文網址)資料($url)跟現在登入(session)的user
        //$user_now = $this->session->userdata('user_id'); 
        $user_now = get_context_user();

        //建立範圍(使用topic_id取得)
        $scope_coll = $topic_annotation->get_scopes();
        //開始建立回應標註     
        $new_res_annotation = $topic_annotation->create_annotation($user_now, $scope_coll);

        $type_id = $_POST["annotation_type"];
        $type_id = intval($type_id);
        //設定標註細節
        //echo 'set annotation detail ->';
        //type
        if (isset($type_id)) {
            $new_res_annotation->set_type($type_id);                     
        }
        else { 
            //test_msg('no type_id');
            $data["error_message"] = $this->lang->line("mobile_apps.annotation_thread.error");
        }

        //note
        $note_message = $_POST["note"];
        if (isset($note_message) 
                && $note_message !== '') {
            $new_res_annotation->set_note($note_message);
        } else {
            //test_msg('no note_msg');
            $data["error_message"] = $this->lang->line("mobile_apps.annotation_thread.error");
        }
        
        //標註錨點範圍的特徵(feature location)
        $feature_location = $topic_annotation->get_feature_location();
        if (isset($feature_location)){
           $new_res_annotation->set_feature_location($feature_location); 
        }
        
        //設定respond_topic_id
        $topic_id = $topic_annotation->get_id();
        $new_res_annotation->set_respond_to_topic($topic_id);
        
        //設定policy
        //echo 'start set policy';
        //$policy_type = 1;
        /*$this->load->library('policy/Authorize_manager');
          $ACTION_ANNOTATION_READ = 5;
          $auth->set_resource($annotation);

          if (is_array($share_user_coll)){
             foreach ($share_user_coll AS $share_user)
             {
               //在這邊為該$annotation設定policy readable
                 $auth->policy_add_actor($ACTION_ANNOTATION_READ, $share_user);
             }
           }
          else{
             //清除該$annotation的policy
             $auth->policy_remove_actor($ACTION_ANNOTATION_READ);
          }*/     

        //test_msg("準備儲存？", $data["error_message"]);
         if (isset($data["error_message"]) === FALSE) {
             // 如果沒有錯誤
             //test_msg("準備儲存？");
             //先將權限設成管理者
            set_ignore_authorize(true);
            //回傳標註
            $new_res_annotation->update();
            set_ignore_authorize(false);

            // 寫入DB(若note不為空才寫入)
            context_complete();
         }
         return $data;
    }
    
    /**
     * 準備網頁的資料
     * @param Annotation $topic_annotation
     * @param Array $data
     * @return Array
     */
    private function _get_webpage_attr($topic_annotation) {
        // 詳見全文url：Webpage -> get_url()
        $webpage = $topic_annotation->get_append_to_webpages();
        $mobile_webpage = $webpage[0];
        $webpage_id = $mobile_webpage->get_id();   
        $url = $mobile_webpage->get_url();
       
        $webpage_array = array();
        $webpage_array['url'] = $url; 
        $webpage_array['id'] = $webpage_id;
        //$data['webpage'] = $webpage;
        
        return $webpage_array;
    }
    
    /**
     * 將日期僅擷取年、月跟日
     * @param String $timestamp 完整的時間戳記
     * @return String 年月日
     */
    private function _convert_timestamp_to_date($timestamp) {
        return substr($timestamp, 0, 10);
    }
    
    /**
     * 取得標註的回覆
     * @param Annotation $topic_annotation
     */
    private function _get_respond_annotations($topic_annotation) {
        
        // annotation_respones
        $respond_collection = $topic_annotation->get_topic_respond_coll();
        $respond_json = array(); 
        
        $login_user_id = get_context_user_id();
        
        foreach ($respond_collection AS $respond_annotation) {
            $json = array();
            
            $json["annotation_id"] = $respond_annotation->get_id();
            $annotation_user = $respond_annotation->get_user();
            $json["user_name"] = $annotation_user->get_name();
            
            $json["is_my"] = FALSE;
            //test_msg("res", array($annotation_user->get_id(), $login_user_id, $annotation_user->get_id() === $login_user_id));
            if (isset($login_user_id) 
                    && $annotation_user->get_id() === $login_user_id) {
                $json["is_my"] = TRUE;
            }
            
            
            //$css_res_type = $respond_annotation->get_type()->get_type_id();
            /*
            $res_type = $respond_annotation->get_type()->get_name();
            if ($res_type != 'annotation.type.custom'){
                $res_type_show = $this->lang->line("web_apps.". $res_type);
                $res_type = $res_type_show;
            }
            else {
                $res_type_show = $this->lang->line("web_apps." . 'annotation.type.other');
                $res_type = $res_type_show;
            }
                
            switch ($css_res_type) {
            case 1:
                $css_res_type = 'importance';
                break;
            case 2:
                $css_res_type = 'concept';
                break;
            case 3:
                $css_res_type = 'confusion';
                break;
            case 4:
                $css_res_type = 'question';
                break;
            case 5:
                $css_res_type = 'example';
                break;
            case 6:
                $css_res_type = 'summary';
                break;
            case 7:
                $css_res_type = 'other';
                break;
            case 8:
                $css_res_type = 'custom';
                break;
            default:
                $css_res_type = 'importance';
                break;
        }
            $json["css_type"] = $css_res_type;
            $json["type"] = $res_type;
             */
            $annotation_type = $respond_annotation->get_type();
            $json["type_classname"] = $annotation_type->get_classname();
            $json["type_name_lang"] = $this->_get_type_name_lang($annotation_type);
            
            $json["note"] = $respond_annotation->get_note();
            
            $sub_res_timestamp =$respond_annotation->get_update_timestamp();
            $json["timestamp"] = $this->_convert_timestamp_to_date($sub_res_timestamp);
            
            $respond_json[] = $json;
        } //$respond_json[0]['user'];

        return $respond_json;
    }
    /**
     * 標註轉換成文字
     * @param Annotation_type $type
     */
    private function _get_type_name_lang($type) {
        $type_name_lang = $type->get_name();
        if ($type->is_basic()) {
            $type_name_lang = $this->lang->line("web_apps.".$type_name_lang);
        }
        else if ($type_name_lang === "annotation.type.custom") {
            //$type_name_lang = "annotation.type.other";
            //$type_name_lang = $this->lang->line("web_apps.".$type_name_lang);
            $type_name_lang = $type->get_custom_name();
        }
        return $type_name_lang;
    }

    /**
     * log區
     * @param Annotation $topic_annotation
     */
    private function _log($topic_annotation) {
        //log區-mobile瀏覽討論-action = 41
        $action = 41;  
        // data: topic_id 
        $log_webpage = $topic_annotation->get_append_to_webpages();
        $log_webpage_id = $log_webpage[0]->get_id();       
        $log_topic_id = $topic_annotation->get_id();
        $log_user_id = get_context_user_id();
        $array_data = array(
            'target_topic' => FALSE,
            'topic_id' => $log_topic_id,
            'order_by' => 'create',
            'show_total_count' => TRUE
        );
        kals_mobile_log($this->db, $log_webpage_id, $action, array('memo'=>$array_data, 'user_id' => $log_user_id));    
        context_complete(); //寫入db
    }
    
    /**
     * 顯示View
     * @param array $data
     */
    private function _display_view($data) {
        // 把語系檔存入變數中，傳入view
        $data['lang'] = $this->lang;
        
        $data["title"] = $this->lang->line("mobile_apps.annotation_thread.title");
        //$data["webpage_list_page"] = $this->get_session_webpage_list_page();
        
        $this->load->library("type/Annotation_type_factory");
        $data["types"] = $this->annotation_type_factory->get_total_types();
        
        $this->load->view('mobile_apps/view_header', $data);
        $this->load->view('mobile_apps/annotation_thread_list', $data);
        $this->load->view('mobile_apps/annotation_thread_form', $data);
        $this->load->view('mobile_apps/view_footer');
    }
}        
    






