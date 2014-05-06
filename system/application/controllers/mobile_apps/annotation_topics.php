<?php
include_once 'mobile_apps_controller.php';
/**
 * annotation_topics
 * 列出指定webpage的所有topics
 * 
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2014, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2014/4/23 下午 03:51:22
 */

class annotation_topics extends Mobile_apps_controller{
    
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
     * @param Int $webpage_id
     * @param Int $page 頁數，目前尚未有作用
     */
    public function index($webpage_id = NULL, $page = 0) {
        
        if (is_null($webpage_id)) {
            return $this->_redirect_from_referer();
        }
        
        $this->webpage_id($webpage_id, $page);
    }
    // -----------------------------------------------------------------
    
    /**
     * 當沒有指定webpage_id時
     * 從參考來源自動轉向指定的webpage_id
     */
    private function _redirect_from_referer() {
        
        $webpage = get_context_webpage();
        $webpage_id = $webpage->get_id();
        
        $path = "/mobile_apps/annotation_topics/webpage_id/" . $webpage_id;
        redirect($path);
    }

        /**
     * 列出指定網頁的標註列表
     * @param type $wepage_id
     * @param type $page
     */
    public function webpage_id($webpage_id, $page = 0) {
        //$topic_id = NULL
         $this->load->library('kals_resource/Webpage');
         $this->load->library('kals_resource/Annotation');
         
         $data = array();
         $webpage = new Webpage($webpage_id);
         $data["webpage"] = $webpage;
       
         // 取得文章標題
         $title = $webpage->get_title();   
         $data['webpage_title'] = $title;
         
         // rss->user_id
        /*$session_user = $this->session->userdata('user_id'); 
        if (isset($session_user)) {
            $user_id = get_context_user()->get_id();
        }
        else {
            $user_id = 0;       
        }*/
         $user = get_context_user();
         
         //echo 'get_context_user ='.$user_id.'//';
         //echo $this->session->userdata('logged_in').'//';
         //echo 'session_user_id ='.$this->session->userdata('user_id');

         // 取得網頁中所有的標註並設定collection的排序方式
         $written_annotations = $this->_get_written_annotations_from_webpage($webpage);
         
         // 查詢未讀過的annotation
         $unread_topics = $this->_get_unread_topcis($webpage);

         $data['written_annotations'] = $this->_filter_written_annotations($written_annotations, $unread_topics);
         
        // log區 -使用mobile裝置瀏覽topic list- action = 40
        $this->_log($webpage);
        
        return $this->_display_view($data);
    }
    
    /**
     * 取得已經撰寫的標註
     * @param Webpage $wepage
     * @return Array;
     */
    private function _get_written_annotations_from_webpage($webpage) {
        
        $annotation_order = 10;
        $annotation_desc = TRUE;
        $written_annotations = $webpage->get_written_annotations($annotation_order, $annotation_desc);
        
        return $written_annotations;
    }
    
    /**
     * 取得尚未讀取標註列表
     * @param Webpage $webpage
     * @return Array
     */
    private function _get_unread_topcis($webpage) {
        $unread_array = array();
        
        $user = get_context_user();
        // 查詢未讀過的annotation
         //if ( $user_id !== 0 ){
         if (isset($user)) {
             $user_id = $user->get_id();
             $webpage_id = $webpage->get_id();
             
             $unread_annotation = $this->db->query("
SELECT topic_annotation.webpage_id, topic_annotation.is_topic_id, annotation_timestamp, max(log_timestamp) as log_timestamp
FROM 
    (SELECT webpage2annotation.webpage_id, annotation_id AS is_topic_id,
            MAX(CASE WHEN res.update_timestamp IS NULL THEN annotation.update_timestamp
                     ELSE res.update_timestamp
                     END)AS annotation_timestamp 
      FROM annotation JOIN webpage2annotation using (annotation_id) 
                      LEFT JOIN ( 
                                 SELECT webpage_id, annotation_id AS res_id, annotation.topic_id AS res_topic_id, annotation.update_timestamp
                                 FROM annotation JOIN webpage2annotation using (annotation_id) 
                                 WHERE topic_id IS NOT NULL AND webpage_id = '".$webpage_id."') AS res ON (annotation.annotation_id = res.res_topic_id)
      WHERE annotation.topic_id IS NULL AND webpage2annotation.webpage_id = '".$webpage_id."'  
      GROUP BY webpage2annotation.webpage_id, is_topic_id) AS topic_annotation
LEFT JOIN
      (SELECT user_id, webpage_id, note, max(log_timestamp) AS log_timestamp
       FROM log
       WHERE user_id = '".$user_id."' AND webpage_id = '".$webpage_id."' AND (action = '16' OR action = '41') 
       GROUP BY user_id, webpage_id, note) AS log_view_thread
             ON log_view_thread.note like concat('%\"topic_id\":' , topic_annotation.is_topic_id , '%')
GROUP BY topic_annotation.webpage_id, is_topic_id, annotation_timestamp
HAVING max(log_timestamp) < annotation_timestamp OR max(log_timestamp) IS NULL
                                                ");
            $unread_array = array();
        
            // 存放unread topic id(topic and res)
            foreach ($unread_annotation->result_array() as $row) {
                $unread_id = $row['is_topic_id']; 
                $unread_array[$unread_id] = $row['is_topic_id'];                   
            }
        }  //if (isset($user)) {
        
        return $unread_array;
    }
    
    /**
     * 將標註資料轉換成可以顯示的資料
     * @param Array $written_annotations 從網頁過來得標佇列表
     * @param Array $unread_topics 尚未讀取的標題
     * @return Array 已經過濾過的標註資料
     */
    private function _filter_written_annotations($written_annotations, $unread_topics) {
        
        $filtered_written_annotations = array();
        $user = get_context_user();
        
        foreach ($written_annotations AS $annotation) {
            $array = array();
            $anchor_text = $annotation->get_anchor_text(); //topic
            //$array['note'] = $annotation->get_note(); //note

            // get annotation id 
            $annotation_id = $annotation->get_id();
            $array['annotation_id'] = $annotation_id;

            // 控制anchor text顯示長度
            $anchor_length = $annotation->get_scope_length();
            if ( $anchor_length > 10) {
                $array['anchor_text'] = mb_substr($anchor_text, 0, 8, "utf-8");
            }
            else { 
                $array['anchor_text'] = $anchor_text;             
            }

            $respond_collection = $annotation->get_topic_respond_length(); //response  
            $array['respond_count'] = $respond_collection; //取得長度(only res)

            // get last response timestamp 
            if ($array['respond_count'] != 0) {
                $last_respond = $annotation->get_last_respond(); 
                $last_respond_id = $last_respond->get_id();
                $last_item = new $annotation($last_respond_id);
                $last_timestamp = $last_item->get_create_timestamp();
           }
           else {             
               $last_timestamp = $annotation->get_create_timestamp();
           }
           $last_short_timestamp = substr($last_timestamp, 0, 10);
           $array['timestamp'] = $last_short_timestamp;

            //是否為訪客
           //if ( $user_id !== 0 ){
           if (isset($user)
                   && isset($unread_topics[$annotation_id])) {
                $array['is_unread'] = TRUE;
           }
           else {
                $array['is_unread'] = FALSE;
            }
            $filtered_written_annotations[] = $array;          
        }

        return $filtered_written_annotations;
    }


    /**
     * log區 -使用mobile裝置瀏覽topic list- action = 40
     * @param Webpage $webpage
     */
    private function _log($webpage) {
        $action = 40;
        // webpage_id, action, user_id, array data
        $log_webpage_id = $webpage->get_id();       
        
        $log_user_id = null;    
        $user = get_context_user();
        if (isset($user)) {
            $log_user_id = $user->get_id();
        }
        
        $array_data = $this->client_ip;
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
        
        $data["title"] = $this->lang->line("mobile_apps.annotation_topics.title");
        $data["webpage_list_page"] = $this->get_session_webpage_list_page();
        
        $this->load->view('mobile_apps/view_header', $data);
        $this->load->view('mobile_apps/annotation_topics', $data);
        $this->load->view('mobile_apps/view_footer'); 
    }
}        
    






