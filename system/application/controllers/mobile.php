<?php
include_once 'web_apps/web_apps_controller.php';
/**
 * mobile
 * login->login_view
 * logout->logout_view
 * webpage->webpage_view
 * annotation_topics->annotation_topics_view
 * annotation_thread->annotation_thread_view  
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
     * 範例：http://localhost/kals/mobile/annotation_thread/14835
     * 
     */
    
    
    public function annotation_thread($annotation_id = NULL) {
          
        //載入libary
        $this->load->library('kals_resource/Webpage');
        $this->load->library('kals_resource/Annotation');
        $this->load->library('scope/Scope_anchor_text');
        $this->load->library('search/Search_annotation_collection');
        // 語系
        $this->lang->load('kals_web_apps');
       
        // 接收-送回應值
        // 用post接收textarea的值:array
        $data = array();
        if ( isset($_POST["note_text"]) ) {
            $note_massage = $_POST["note_text"];
            $data["note_massage"] = $note_massage;
                     
        }
        
        // $annotation_id
        $annotation = new Annotation($annotation_id);
        
        
        $anchor_text = $annotation->get_anchor_text();  
        $user = $annotation->get_user()->get_name();    
        $type = $annotation->get_type()->get_name();
        $css_type = $annotation->get_type()->get_type_id();
        $note = $annotation->get_note();   
        $timestamp = $annotation->get_update_timestamp();
       
            
            
        
        // type
       if ($type != 'annotation.type.custom'){
            $type_show = $this->lang->line("web_apps.". $type);
            $type_name = $type_show;
        }
        
        // css-type
        switch ($css_type) {
            case 1:
                $css_type = 'importance';
                break;
            case 2:
                $css_type = 'concept';
                break;
            case 3:
                $css_type = 'confusion';
                break;
            case 4:
                $css_type = 'question';
                break;
            case 5:
                $css_type = 'example';
                break;
            case 6:
                $css_type = 'summary';
                break;
            case 7:
                $css_type = 'other';
                break;
            case 8:
                $css_type = 'custom';
                break;
            default:
                $css_type = 'importance';
                break;
        }
        
        // annotation_respones
        $respond_collection = $annotation->get_topic_respond_coll();
        $respond_json = array(); 
        foreach ($respond_collection AS $respond_annotation) {
            $json = array();
            
            $json["user"] = $respond_annotation->get_user()->get_name();
            $css_res_type = $respond_annotation->get_type()->get_type_id();
            $res_type = $respond_annotation->get_type()->get_name();
            if ($res_type != 'annotation.type.custom'){
                $res_type_show = $this->lang->line("web_apps.". $res_type);
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
            $json["note"] = $respond_annotation->get_note();
            $json["timestamp"] = $respond_annotation->get_update_timestamp();
            
            
            $respond_json[] = $json;
        }//$respond_json[0]['user'];
        
        // send data -annotation topic
        $data["anchor_text"] = $anchor_text;
        $data["user"] = $user;
        $data["type"] = $type;
        $data["type_name"] = $type_name;
        $data["css_type"] = $css_type;
        $data["note"] = $note;
        $data["timestamp"] = $timestamp;
        
        $data["respond_json"] = $respond_json;
        
        // 詳見全文url：Webpage -> get_url()
        $webpage = $annotation->get_append_to_webpages();            
        $webpage_id = $webpage[0]->get_id();       
        //$webpage_id = 1573;
        $mobile_webpage = new Webpage($webpage_id);
        $url = $mobile_webpage->get_url();
       
        $data['webpage_url'] = $url; 
        $data['webpage_id'] = $webpage_id;

        // radio 
        if (isset ($_POST["annotation_type"])){
        $anno_type = $_POST["annotation_type"];       
        $data['pop_type'] = $anno_type;
        } 
                
        $this->load->view('mobile/mobile_views_header');
        $this->load->view('mobile/annotation_thread_view', $data);
        $this->load->view('mobile/mobile_views_footer');

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





