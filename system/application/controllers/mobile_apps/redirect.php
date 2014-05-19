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
         
         
        if (get_context_user() !== NULL) {
            // 直接轉接到行動版
            
            if (is_null($topic_id)) {
                $webpage_topics_path = '/mobile_apps/annotation_topics/webpade_id/'.$webpage_id;
                $url = get_kals_base_url($webpage_topics_path);
            }
            else {
                $annotation_thread_path = "mobile_apps/annotation_thread/topic_id/".$topic_id."#annotation_".$annotation_id;
                $url = get_kals_base_url($annotation_thread_path);
            }
            
            //test_msg("url", $url);
            redirect($url);
            return;
        }
        else {
            // 轉接到網站
            $this->load->library('kals_resource/Webpage');
            
            $webpage = new Webpage($webpage_id);
            $url = $webpage->get_url();
            
            $url = $url . "#mobile=true";
            
            if (isset($topic_id)) {
                $url = $url . "&topic_id=" . $topic_id;
               
            }
            
            if (isset($annotation_id)) {
               $url = $url . "&annotation_id=" . $annotation_id;
            }
            
            //test_msg("url", $url);
            redirect($url);
            return;
        }
        
    }
    
}        
    






