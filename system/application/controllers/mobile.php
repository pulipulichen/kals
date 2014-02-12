<?php
include_once 'web_apps/web_apps_controller.php';
/**
 * mobile
 *
 * 
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2013, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2013/11/19 下午 03:51:22
 */

class mobile extends Web_apps_controller{
    
    /**
     * mobile控制
     * Output:  webpage id, annotation note, type, anchor text, topic? 
     * Input: note, type,
     * 
     * 範例：http://localhost/kals/mobile/mobile_setter/mobile_views/14835
     */
    
    
    public function mobile_setter($view = "mobile_views", $anchor_text_id = NULL) {
          
        //載入libary
        
        $this->load->library('kals_resource/Webpage');
       
        // 取anchor_text_id
        $this->load->library('kals_resource/Annotation');
        $this->load->library('scope/Scope_anchor_text');
        $this->load->library('search/Search_annotation_collection');
        
        // 接收-送回應值
        // 用post接收textarea的值:array
        $data = array();
        if ( isset($_POST["note_text"]) ) {
            $note_massage = $_POST["note_text"];
            $data["note_massage"] = $note_massage;
                     
        }
        // 詳見全文url：Webpage -> get_url()
        $url_msg ='https://www.google.com';
        /*$webpage_id = 1573 ;
        $webpage = new Webpage($webpage_id);
        $url_msg = $webpage->get_url(); */
        $data['webpage_url'] = $url_msg;
        
       //radio 
        if (isset ($_POST["annotation_type"])){
        $anno_type = $_POST["annotation_type"];       
        $data['type'] = $anno_type;
        }
        
       // anchor_text_id
       if(is_null($anchor_text_id)){
            //從rss.php取得現在的anchor_text_id  
            $anchor_text_id = 14835;
        }
        $data['anchor_text_id'] = $anchor_text_id;
        
        
        
        
        $this->load->view('mobile/mobile_views_header');
        $this->load->view('mobile/'.$view, $data);
        //$this->load->view('mobile/'.$view.$anchor_text_id , $data);
        $this->load->view('mobile/mobile_views_footer');

    }
   
   private function _get_webpage() {
        $webpage = get_context_webpage();
        $webpage_id = $webpage->get_id();
        //return $webpage;
        return;
   }
     
     

   /* public function annotation_thread($annotation_id = 3) {
        
        // load library
        
        $data = array();
        
        if (isset($_POST['note'])) {
             //call $this->_add_annotation($annotation)
            $message = $this->_add_annotation();
            $data['message'] = $message;
        }
        
        // get annotation by id
        
            // add to data
        
        // from topic to get respond thread
        
            // add to data
        
        // load view
        $this->load->view('mobile/mobile_views_header');
            // respond form
            $this->load->view('mobile/annotation_thread_view', $data);

        $this->load->view('mobile/mobile_views_footer');
            
        
    }
    
    private function _add_annotation() {
        
        // use Annotation to create a new annotation
        $note = $_POST["note"];
        
        // $annotation = new Annotation();
        // $annotation->set_note($note);
        
        // $annotation->update();
        
        $message = "已經儲存 : " . $note;
        
        return $message;
    }
    */
    
    
        }





