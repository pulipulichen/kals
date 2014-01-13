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
     * 範例：http://localhost/kals/mobile/mobile_setter
     */
    
    
    public function mobile_setter($view = "mobile_views") {
          
        //載入libary
        // 用poset接收textarea的值:array
        $this->load->library('kals_resource/Webpage');
        
        // 接收-送回應值
        $data = array();
        if ( isset($_POST["note_text"]) ) {
            $note_massage = $_POST["note_text"];
            $data["note_massage"] = $note_massage;
        }
        // 詳見全文url：Webpage -> get_url()
        $url_msg ='https://www.google.com'; 
       // $url_msg = get_url();
        $data['webpage_url'] = $url_msg;
        
        $this->load->view('mobile/mobile_views_header');
        $this->load->view('mobile/'.$view, $data);
        $this->load->view('mobile/mobile_views_footer');

    }
   
   private function _get_webpage() {
        $webpage = get_context_webpage();
        return $webpage;
  
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





