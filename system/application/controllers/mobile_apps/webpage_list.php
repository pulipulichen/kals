<?php
include_once 'mobile_apps_controller.php';
/**
 * webpage
 * 列出網頁列表
 * 
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2014, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2014/4/23 下午 03:51:22
 */

class webpage_list extends Mobile_apps_controller{
    
     /**
      * mobile_login
      * 登入
      * 
      * 範例：http://localhost/kals/mobile/mobile_user_login
      */

    
    var $_page_limit = 10;

    function __construct()
    {
        parent::__construct();
        
        // 新增標註用
        $this->load->library('kals_resource/Webpage');
        $this->load->library('kals_resource/Domain');
    } 
    
    public function index($page = 1) {
        $this->page($page);
    }
    // -----------------------------------------------------------------
    
    /**
     *  列出指定頁數的網頁列表
     * @param Int $page 頁數
     */
    public function page($page = 1) {

        $data = array();       
  
        $webpage_array = array();
       
        // --------------------------------
        //換頁
        $page_data = $this->_page_parsing($page);
        $data['page'] = $page_data['page'];
        $data['prev_page'] = $page_data['prev_page'];
        $data['next_page'] = $page_data['next_page'];
        
        // 儲存頁數
        $this->set_session_webpage_list_page($page);
 
        
// --------------------------------
        // 取得還沒閱讀的網頁列表
        $unread_webpages = $this->_get_unread_webpages();
        
        $user = get_context_user();
        $all_webpages = $this->webpage->get_all_webpages_order_by_read( $user, ($page-1) );
        $data['all_webpages'] = $this->_filter_webpage_info($all_webpages, $unread_webpages);
        
        $this->_display_view($data, $page);
  
    }
    
    /**
     * 剖析頁數，取得上一頁與下一頁
     * @param Int $page
     * @return Array
     */
    private function _page_parsing($page) {
        $webpage_count = $this->webpage->get_all_webpages_count();
        $page_count = ceil($webpage_count/$this->_page_limit);
        
        $next_page = $page + 1;
        $prev_page = -1;
        
        if ($page > 1 && $page < $page_count){
            $next_page = $page + 1;
            $prev_page = $page - 1;
        }
        else if ($page == $page_count){
            $next_page = -1;
            $prev_page = $page - 1;
        }
        $data = array(
            'page'      => $page,
            'prev_page' => $prev_page,
            'next_page' => $next_page
        );
        return $data;
    }
    
    /**
     * 取得還沒閱讀的網頁列表
     * @return Array
     */
    private function _get_unread_webpages() {
        $user = get_context_user();
        $unread_webpages = array();
        
        if (isset($user) === false) {
            return array();
        }
        
        $user_id = $user->get_id();

        $unread_search = $this->db->query("
SELECT DISTINCT topic_annotation.webpage_id, count(topic_annotation.is_topic_id) AS unread
FROM 
(SELECT webpage2annotation.webpage_id, annotation_id AS is_topic_id,
      MAX(CASE WHEN res.update_timestamp IS NULL THEN annotation.update_timestamp
            ELSE res.update_timestamp
            END)AS annotation_timestamp
FROM annotation JOIN webpage2annotation using (annotation_id) 
     LEFT JOIN ( 
               SELECT webpage_id, annotation_id AS res_id, annotation.topic_id AS res_topic_id, annotation.update_timestamp
               FROM annotation JOIN webpage2annotation using (annotation_id) 
               WHERE topic_id IS NOT NULL ) AS res ON (annotation.annotation_id = res.res_topic_id)
WHERE annotation.topic_id IS NULL  
GROUP BY webpage2annotation.webpage_id, is_topic_id) AS topic_annotation

LEFT JOIN

(select 
user_id, webpage_id, note, max(log_timestamp) AS log_timestamp
 from log
where
user_id = '".$user_id."' and
( action = '16' OR action = '40')  
group by user_id, webpage_id, note) AS log_view_thread

ON log_view_thread.note like '%\"topic_id\":' || topic_annotation.is_topic_id || '%'

GROUP BY topic_annotation.webpage_id, annotation_timestamp, topic_annotation.is_topic_id
HAVING max(log_timestamp) < annotation_timestamp OR max(log_timestamp) IS NULL" );
        
        $unread_array = array();
        foreach($unread_search->result_array() as $row ){
            $webpage_id = $row['webpage_id'];
            $unread = $row['unread'];
            // TST MSG
            //echo $webpage_id . " - " . $unread_count . " / <br />";
            $unread_array[$webpage_id] = $unread;
        }
        
        return $unread_array;
    }
    
    private function _filter_webpage_info($all_webpages, $unread_webpage) {
        $user = get_context_user();
        $has_user = isset($user);
        $output = array();
        // array：$all_webpages value:array array中為webpage_id
        
        foreach ($all_webpages AS $webpage){
           // get page's title and id
           $webpage_id = $webpage->get_id();
           $webpage_array['webpage_id'] = $webpage_id;
           //test_msg($webpage_id);
           //continue;
           
           //$webpage = new Webpage($webpage_id);
           $webpage_title = $webpage->get_title();
           //echo 'msg= '.$webpage_title.'<br>'; //msg

           $webpage_array['webpage_title'] = $webpage_title;
           
           // get page's annotation count
           $annotation_count = $webpage->get_written_annotations_count();
           //$annotation_count = 0;
           $webpage_array['annotation_count'] = $annotation_count;
          
           // 判斷有無read
           //if ( $user_id !== 0){
           if ($has_user) {
               if (isset($unread_webpage[$webpage_id])) {
                   $webpage_array['is_unread'] = TRUE;
               }
               else {
                   $webpage_array['is_unread'] = FALSE;
               }
           }
           else { 
               $webpage_array['is_unread'] = FALSE; 
           }
           $output[] = $webpage_array;
        }
        return $output;
    }

    /**
     * 儲存記錄
     */
    private function _log() {
        // log區 -登入成功(有登入才記log)-action = 39
        $action = 42;
        $log_webpage_id = NULL; 
        $log_user_id = get_context_user_id();
        $array_data =$this->client_ip;
        kals_mobile_log($this->db, $log_webpage_id, $action, array('memo'=>$array_data, 'user_id' => $log_user_id));    
        context_complete(); //寫入db
    }
    
    /**
     * 顯示最後的網頁
     * @param Array $data
     * @param Int $page
     */
    private function _display_view($data, $page = 1) {
        
        
        $data['lang'] = $this->lang;
        $data['title'] = $this->lang->line("mobile_apps.webpage_list.title")
                . " "
                . $this->lang->line("mobile_apps.webpage_list.page.1")
                . $page
                . $this->lang->line("mobile_apps.webpage_list.page.2");
        
        $this->load->view('mobile_apps/view_header', $data);
        $this->load->view('mobile_apps/webpage_list', $data);
        $this->load->view('mobile_apps/view_footer'); 
    }
}        
    






