<?php
include_once 'mobile_apps_controller.php';
/**
 * redirect
 * 檢查登入
 * 
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2014, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2014/5/19 下午 03:51:22
 */

class redirect extends Mobile_apps_controller{
    
    function __construct()
    {
        parent::__construct();
        $this->load->library('kals_actor/User');
        
    } 
    

    /**
     * 列出指定網頁的標註列表
     * @param type $wepage_id
     * @param type $page
     */
    public function load($webpage_id, $topic_id = NULL, $annotation_id = NULL) {
        //$topic_id = NULL
        
        // 先儲存下來
        $mobile_apps_url = $this->_get_mobile_apps_url($webpage_id, $topic_id, $annotation_id);
         
        if (get_context_user() !== NULL) {
            // 直接轉接到行動版
            
            //test_msg("url", $url);
            redirect($mobile_apps_url);
            return;
        }
        else {
            // 轉接到網站
            $url = $this->_get_webpage_url($webpage_id, $topic_id, $annotation_id);
            
            //test_msg("flashdata", $this->session->flashdata("mobile_redirect"));
            
            //$this->session->set_flashdata("mobile_redirect", $mobile_apps_url);
            $this->session->set_userdata(array("mobile_redirect"=> $mobile_apps_url));
            context_complete();
            
            //test_msg("url", array($url, $mobile_apps_url) );
            //redirect($url);
            
            $this->load->view('mobile_apps/redirect', array(
                "url" => $url
            ));
            return;
        }
        
    }
    
    /**
     * 取得原本網站的網址
     * @param Int $webpage_id
     * @param Int $topic_id
     * @param Int $annotation_id
     * @return string
     */
    private function _get_webpage_url($webpage_id, $topic_id, $annotation_id) {
        // 轉接到網站
        $this->load->library('kals_resource/Webpage');

        $webpage = new Webpage($webpage_id);
        $url = $webpage->get_url();

        /*
        $url = $url . "#mobile=true";

        if (isset($topic_id)) {
            $url = $url . "&topic_id=" . $topic_id;
        }

        if (isset($annotation_id)) {
           $url = $url . "&annotation_id=" . $annotation_id;
        }
        */
        return $url;
    }
    
    
    /**
     * 取得mobile_apps的網址
     * @param Int $webpage_id
     * @param Int $topic_id
     * @param Int $annotation_id
     * @return string
     */
    private function _get_mobile_apps_url($webpage_id, $topic_id, $annotation_id) {
        // 轉接到網站
        $url;
        
        if (is_null($topic_id)) {
            $webpage_topics_path = '/mobile_apps/annotation_topics/webpade_id/'.$webpage_id;
            $url = get_kals_base_url($webpage_topics_path);
        }
        else {
            $annotation_thread_path = "mobile_apps/annotation_thread/topic_id/".$topic_id."#annotation_".$annotation_id;
            $url = get_kals_base_url($annotation_thread_path);
        }
        
        return $url;
    }
    
}        
    






