<?php
include_once 'web_apps/web_apps_controller.php';
/**
 * mobile
 * 
 * login->login_view
 * logout->logout_view
 * 
 * webpage->webpage_view
 *      topic_unread + respond_unread
 * annotation_topics->annotation_topics_view
 *      topic_unread : array(1198, 1132)
 *      RESPOND UNREAD: array('1401' => 4, '531' => 7)
 * annotation_thread->annotation_thread_view  
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
     * 範例：http://localhost/kals/mobile/annotation_thread/14835
     * 
     */
  
    /**
     * annotation_thread
     * @param type  $annotation_id
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
        // radio-type 
        if (isset ($_POST["annotation_type"])){
        $anno_type = $_POST["annotation_type"];       
        $data['pop_type'] = $anno_type;
        }
             
        // $annotation_id
        $annotation = new Annotation($annotation_id);
        $annotation_id = $annotation->get_id();           
        $anchor_text = $annotation->get_anchor_text();  
        $user = $annotation->get_user()->get_name();    
        $type = $annotation->get_type()->get_name();        
        $css_type = $annotation->get_type()->get_type_id();
        $note = $annotation->get_note();   
        $timestamp = $annotation->get_update_timestamp();       
        
  
        // 如果有回應值才要做新增的動作
        if(isset($note_massage) && isset($anno_type)){
            
           // 開始新增標註回應       
           //先將權限設成管理者
           set_ignore_authorize(true);
           //取得參考網址(全文網址)資料($url)跟現在登入(session)的user
           $user_now = $this->session->userdata('user_id'); 
           //建立範圍(使用topic_id取得)
           $scope_coll = $annotation->get_scopes();    
           //開始建立回應標註     
           $new_res_annotation = $annotation->create_annotation($user_now, $scope_coll);
       
           $type_id = $anno_type;
           //設定標註細節
           //echo 'set annotation detail ->';
           //type
           if (isset($type_id)){
             $new_res_annotation->set_type($type_id);                     
           }else{ echo 'no type_id';}
       
           set_ignore_authorize(true);   
           //note
           if(isset($note_massage) && $note_massage !== ''){
              $new_res_annotation->set_note($note_massage);           
           }else {echo 'no note_msg';}
           //標註錨點範圍的特徵(feature location)
           $feature_location = $annotation->get_feature_location();
           if (isset($feature_location)){
              $new_res_annotation->set_feature_location($feature_location); 
           }else { echo 'no feature_location'; }
           //設定respond_topic_id
           $topic_id = $annotation_id;     
           if(isset($topic_id)){
              $new_res_annotation->set_respond_to_topic($topic_id);           
           }else {echo 'no topic id'; }     
           //設定policy
           //echo 'start set policy';
           $policy_type = 1;
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
       
            //回傳標註
            $new_res_annotation->update();
            set_ignore_authorize(false);
            // 寫入DB(若note不為空才寫入)
            if (isset($note_massage) && $note_massage !== ''){
                context_complete();        
            } 
        }
         
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
            $json["note"] = $respond_annotation->get_note();
            $sub_res_timestamp =$respond_annotation->get_update_timestamp();
            $json["timestamp"] =substr($sub_res_timestamp, 0, 10);
            
            $respond_json[] = $json;
        }//$respond_json[0]['user'];

        
        // send data -annotation topic
        $data["annotataion_id"] = $annotation_id;
        $data["anchor_text"] = $anchor_text;
        $data["user"] = $user;
        $data["type"] = $type;
        $data["type_name"] = $type_name;
        $data["css_type"] = $css_type;
        $data["note"] = $note;
        $sub_timestamp = substr($timestamp, 0, 10);
        $data["timestamp"] = $sub_timestamp;        
        $data["respond_json"] = $respond_json;
        
        // 詳見全文url：Webpage -> get_url()
        $webpage = $annotation->get_append_to_webpages();            
        $webpage_id = $webpage[0]->get_id();   
        //$webpage_id = 1573;
        $mobile_webpage = new Webpage($webpage_id);
        $url = $mobile_webpage->get_url();
       
        $data['webpage_url'] = $url; 
        $data['webpage_id'] = $webpage_id;
        $data['webpage'] = $webpage;
    
                
        $this->load->view('mobile/mobile_views_header');
        $this->load->view('mobile/annotation_thread_view', $data);
        $this->load->view('mobile/mobile_views_footer');

    }    

    

    /**
     * annotation_topics
     * @param type $topic_id
     */
     public function annotation_topics($webpage_id = NULL) {
         //$topic_id = NULL
         $this->load->library('kals_resource/Webpage');
         $this->load->library('kals_resource/Annotation');
         
         $data = array();
         $webpage = new Webpage($webpage_id);
         
       
         
         // 取得文章標題
         $title = $webpage->get_title();   
         $data['title'] = $title;
         
         // 取得網頁中所有的標註並設定collection的排序方式
         $annotation_order = 10;
         $annotation_desc = TRUE;
         $written_annotations = $webpage->get_written_annotations($annotation_order, $annotation_desc);
         $data['written_annotations'] = array();
         $array = array();
         
         
         // session->user_id
         $user_id = $this->session->userdata('user_id');
         
         // 查詢未讀過的annotation
         $unread_annotation = $this->db->query("SELECT webpage2annotation.webpage_id, annotation_id AS topic_self_id, res.res_id, res.res_topic_id, 
                                                   (CASE WHEN res.update_timestamp IS NULL THEN annotation.update_timestamp
                                                         ELSE res.update_timestamp
                                                    END) AS annotation_timestamp
                                                FROM annotation JOIN webpage2annotation using (annotation_id) 
                                                   LEFT JOIN ( 
                                                             SELECT webpage_id, annotation_id AS res_id, annotation.topic_id AS res_topic_id, annotation.update_timestamp
                                                             FROM annotation JOIN webpage2annotation using (annotation_id) 
                                                             WHERE topic_id IS NOT NULL AND webpage_id = ".$webpage_id.") AS res ON (annotation.annotation_id = res.res_topic_id)
                                                   LEFT JOIN log ON log.action = 16 
                                                                AND log.user_id =".$user_id."  
                                                                AND log.note like concat('%topic_id:' , annotation.annotation_id , '%')
                                                WHERE  
                                                      annotation.topic_id IS NULL AND webpage2annotation.webpage_id =".$webpage_id."  
                                                  AND (log.user_id = ".$user_id." OR log.user_id IS NULL)
                                                  AND (log.log_timestamp IS NULL OR log.log_timestamp < annotation.update_timestamp)");
         $unread_array = array();
        
         // 存放unread topic id(topic and res)
         foreach($unread_annotation->result_array() as $row){
             $unread_id = $row['topic_self_id']; 
             $unread_array[$unread_id] = $row['topic_self_id'];                   
         }         

         
         foreach ($written_annotations AS $annotation) {
           
             
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
             
             // 判斷有無unread annotation
             if (isset($unread_array[$annotation_id])) {
                 $array['is_unread'] = 'inline';
                 //echo $annotation_id;
                 //echo 'Y <br>';
             }
             else {
                 $array['is_unread'] = 'none';
                 //echo $annotation_id;
                 //echo 'N <br>';
             }
            
             $data['written_annotations'][] = $array;          
         }
                 
         
        $this->load->view('mobile/mobile_views_header');
        $this->load->view('mobile/annotation_topic_view', $data);
        $this->load->view('mobile/mobile_views_footer'); 
         
     }
    
    
     /**
     * webpage_list
     * @param type $topic_id
     */
     public function webpage_list() {
         
        $this->load->library('kals_resource/Webpage');
        $this->load->library('kals_resource/Domain');
        
        $user = get_context_user();

        // get domain's all pages
        $data = array();
       
        //$webpage_list = Domain::get_all_domain_webpages();
        $domain = new Domain();
        $all_webpages = $domain->get_all_domain_webpages(); //array
        $data['all_webpages'] = array();
        $webpage_array = array();
        
        
        $user_id = $user->get_id();   
        $unread_search = $this->db->query("SELECT user2webpage.user_id, user2webpage.webpage_id , count(annotation.annotation_id) AS unread_count
                                           FROM annotation join webpage2annotation using(annotation_id) join 
                                               (SELECT (".$user_id.") as user_id, webpage.webpage_id, last_login_timestamp 
                                                FROM webpage LEFT JOIN 
                                                  (SELECT log.user_id, log.webpage_id, max(log.log_timestamp) AS last_login_timestamp 
                                                   FROM log 
                                                   WHERE (log.action = 16 OR log.action = 3 ) AND log.user_id = ".$user_id." 
                                                   GROUP BY log.user_id, log.webpage_id) AS user_last_login ON (webpage.webpage_id = user_last_login.webpage_id)) AS user2webpage using(webpage_id) 
                                           WHERE (user2webpage.last_login_timestamp < annotation.create_timestamp OR user2webpage.last_login_timestamp IS NULL) AND annotation.topic_id IS NULL
                                           GROUP BY user2webpage.user_id, user2webpage.webpage_id
                                           ORDER BY user2webpage.webpage_id " );
        
        $unread_array = array();
        foreach($unread_search->result_array() as $row ){
            $webpage_id = $row['webpage_id'];
            $unread_count = $row['unread_count'];
            // TST MSG
            //echo $webpage_id . " - " . $unread_count . " / <br />";
            $unread_array[$webpage_id] = $unread_count;
        }
        
        // array：$all_webpages value:array array中為webpage_id
        foreach ($all_webpages AS $array){
           // get page's title and id
           $webpage_id = $array[0]->get_id();
           $webpage_array['webpage_id'] = $webpage_id;
           
           $webpage = new Webpage($webpage_id);
           $webpage_title = $webpage->get_title();
           //echo 'msg= '.$webpage_title.'<br>'; //msg

           $webpage_array['webpage_title'] = $webpage_title;
           
           // get page's annotation count
           $annotation_count = $webpage->get_written_annotations_count();
           $webpage_array['annotation_count'] = $annotation_count;
          
           // 判斷有無read
           if (isset($unread_array[$webpage_id])) {
               $webpage_array['is_unread'] = 'inline';
           }
           else {
               $webpage_array['is_unread'] = 'none';
           }
           
           $data['all_webpages'][] = $webpage_array;
        }
     
        // session test msg
        /*echo $this->session->userdata('user_id').'/';
        echo $this->session->userdata('user_name').'/';
        echo $this->session->userdata('logged_in');*/

     
        
        $this->load->view('mobile/mobile_views_header');
        $this->load->view('mobile/webpage_list_view', $data);
        $this->load->view('mobile/mobile_views_footer'); 
         
     }   
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
    } 
    
    /**
     *  登入畫面
     * @param String $url 從其他頁面帶入這個$url
     * 
     */
    
     public function mobile_user_login() {
         
         // 初始化session：使用$this->session
         //$this->load->library('session');
         
         
         $this->load->library('core/Context');
         $context = new Context();
         
          $data = array(
              'email' =>  null,
              'password' => null,
              'referer_url' => null, 
              'has_url' => false, //是否有來源url
              'do_login' => false, //是否有登入動作
              'disabled' => null //隱藏input_url
         );
          
          // 從引導進入的網頁填入 helpers->kals_helper->get_referer_url         
          require_once 'system/application/helpers/kals_helper.php'; 
          
          //$referer_url = null;
          $referer_url = get_referer_url();          
          $data['referer_url'] = $referer_url;
           
            
          $user = NULL;
          $user_id = NULL;
          $output = $this->_create_default_data();
          //echo 'check 0: it is work?'.'<br>';
          
          // 有登入動作

          if (isset($_POST['do_login'])){       
              $data['do_login'] = $_POST['do_login'];
              //echo 'check 1:do_login = '.$data['do_login'].'<br>' ; //msg 1
          }
          if ($data['do_login']){
              $data['email'] = $_POST['email'];
              $data['password'] = $_POST['password'];
             // echo 'check 2: email & password:'.$data['email'].'&'.$data['password'].'<br>'; //msg 2
              
              // search user data 
              $user = $this->user->find_user($referer_url, $data["email"], $data["password"]);
                  /*if(isset($user)){
                  echo 'check 3: get user'.'<br>'; //msg 3
                  }else 'check 4: not get user'.'<br>'; //msg 4*/
              
              // 判斷是否有來源url 
              if (isset($data['referer_url'])){
                  $data['has_url'] = true;
              }
              // 是否成功登入->$user         
              if (isset($user)){    
                  $user_id = $user->get_id();
                  // set current user and let other pages know
                  $context->set_current_user($user); 
                  
                  $output['success'] = 'Yes, user exist';
                  $data['user'] = $output;
                  $data['do_login'] = TRUE;
                  //echo 'check 5: login success?'.$data['user']['success'].'<br>'; //msg 5 
                  
            
                  // 若有原url則跳轉回原url，若無則到Wabpage_list
                  $login_url = 'http://140.119.61.137/kals/mobile/mobile_user_login';
                  
                  if ($referer_url !== $login_url){
                      header("Location: ".$referer_url);              
                  }else {
                      $referer_url = 'webpage_list';
                      //$referer_url = 'http://140.119.61.137/kals/mobile/mobile_user_login';
                      header("Location: ".$referer_url);       
                  }
                
                  
              }
              else {
                   $output['error'] = 'user_not_found'; 
                   $data['do_login'] = FALSE;
                  // echo 'chehk 6: NO!'.$data['do_login'].'<br>'; //msg 6
                  
                   echo 'No user!Please rigister!';
              }
               
          }
                      
        // set session 
      //$session_array = array();
       $session_array = array(
           'user_id' =>NULL,
           'user_name' =>NULL,
           'notify_key' =>NULL,
           'logged_in' => NULL
        );    
          
       if(isset($user) && $data['do_login'] === TRUE){    
            $session_array['user_id'] = $user_id;
            $session_array['user_name'] = $user->get_name();
            $session_array['logged_in'] = TRUE;
        }else{
            $session_array['logged_in'] = FALSE;
        }
        $this->session->set_userdata($session_array);
        context_complete(); //存入db 
        
          
        $this->load->view('mobile/mobile_views_header');
        $this->load->view('mobile/mobile_login_view', $data);
        $this->load->view('mobile/mobile_views_footer');
 
        }
   
   private function _create_default_data() {

        $output = array(
            'login' => FALSE,
            'embed_login' => FALSE,
            'user' => array(
                'email' => NULL,
                'name' => NULL,
                'id' => NULL,
                'has_photo' => FALSE,
                'locale' => NULL,
                'sex' => NULL
            ),
            'policy' => array(
            	'read' => TRUE,
            	'write' => FALSE,
            	'show_navigation' => TRUE,    
            )
        );

        return $output;
    }
    

    
}





