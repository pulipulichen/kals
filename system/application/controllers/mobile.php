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
        
        
        $annotation_self_id = $annotation_id;        
        // check topic id
        if (isset($annotation_id)){
           $topic_array = $this->db->query("SELECT topic_id
                                      FROM annotation
                                      WHERE annotation_id ='".$annotation_id."'");     
            }
        foreach ($topic_array->result_array() as $row){
                $is_topic_id = $row['topic_id'];
        }    
        if($is_topic_id !== NULL){
            //is respond id
            $annotation_id = $is_topic_id;
        }    
        echo 'annotation_id ='.$annotation_id.'/';
        echo 'topic_id = '.$is_topic_id.'/';
        

        // $annotation_id
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
        
        //$log_user_id = $this->session->userdata('user_id');    
        //echo $this->session->userdata('user_id').'??';
        //echo $this->session->userdata('logged_in').'??';
                
        $login_user = get_context_user();
        $log_user_id = NULL;
        $logged_id = FALSE;
        if (isset($login_user)) {
            $log_user_id = $login_user->get_id();
            $logged_id = TRUE;
        }
        
        
        
        // 如果有回應值才要做新增的動作
        if(isset($note_massage) && isset($anno_type)){
            
           // 開始新增標註回應       
           //先將權限設成管理者
           set_ignore_authorize(true);
           //取得參考網址(全文網址)資料($url)跟現在登入(session)的user
           //$user_now = $this->session->userdata('user_id'); 
           $user_now = get_context_user();
           
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
         
       //log區-mobile瀏覽討論-action = 41
        $action = 41;  
        // data: topic_id 
        $log_webpage = $annotation->get_append_to_webpages();
        $log_webpage_id = $log_webpage[0]->get_id();       
        $array_data = array(
            'target_topic' => FALSE,
            'topic_id' => $log_topic_id,
            'order_by' => 'create',
            'show_total_count' => TRUE
        );
        kals_mobile_log($this->db, $log_webpage_id, $action, array('memo'=>$array_data, 'user_id' => $log_user_id));    
        context_complete(); //寫入db
        
        
        $data['log_webpage_id'] = $log_webpage_id;
        
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
            
            $json["annotation_id"] = $respond_annotation->get_id();
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

          // 詳見全文url：Webpage -> get_url()
        $webpage = $annotation->get_append_to_webpages();            
        $webpage_id = $webpage[0]->get_id();   
        //$webpage_id = 1573;
        $mobile_webpage = new Webpage($webpage_id);
        $url = $mobile_webpage->get_url();
       
        $data['webpage_url'] = $url; 
        $data['webpage_id'] = $webpage_id;
        $data['webpage'] = $webpage;      
        
    
        // send data -annotation topic
        $data["annotataion_id"] = $annotation_id;
        $data["annotation_self_id"] = $annotation_self_id;
        $data["anchor_text"] = $anchor_text;
        $data["user"] = $user;
        $data["type"] = $type;
        $data["type_name"] = $type_name;
        $data["css_type"] = $css_type;
        $data["note"] = $note;
        $sub_timestamp = substr($timestamp, 0, 10);
        $data["timestamp"] = $sub_timestamp;        
        $data["respond_json"] = $respond_json;
            
                
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
         
         
         // rss->user_id
        $session_user = $this->session->userdata('user_id'); 
        if (isset($session_user)){
            $user_id = get_context_user()->get_id();
        }else {
            $user_id = 0;       
        }
         
         echo 'get_context_user ='.$user_id.'//';
         echo $this->session->userdata('logged_in').'//';
         echo 'session_user_id ='.$this->session->userdata('user_id');

         // 查詢未讀過的annotation
         if ( $user_id !== 0 ){
             $unread_annotation = $this->db->query("SELECT topic_annotation.webpage_id, topic_annotation.is_topic_id, annotation_timestamp, max(log_timestamp) as log_timestamp
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
                                                       WHERE user_id = '".$user_id."' AND webpage_id = '".$webpage_id."' AND action = '16' 
                                                       GROUP BY user_id, webpage_id, note) AS log_view_thread
                                                             ON log_view_thread.note like concat('%\"topic_id\":' , topic_annotation.is_topic_id , '%')
                                                GROUP BY topic_annotation.webpage_id, is_topic_id, annotation_timestamp
                                                HAVING max(log_timestamp) < annotation_timestamp OR max(log_timestamp) IS NULL");
             $unread_array = array();
        
             // 存放unread topic id(topic and res)
             foreach($unread_annotation->result_array() as $row){
                 $unread_id = $row['is_topic_id']; 
                 $unread_array[$unread_id] = $row['is_topic_id'];                   
             }
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
            
            
             
             //是否為訪客
            if ( $user_id !== 0 ){
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
             }else { $array['is_unread'] = 'none'; }
            
             $data['written_annotations'][] = $array;          
         }
         
        // log區 -使用mobile裝置瀏覽topic list- action = 40
        $action = 40;
        // webpage_id, action, user_id, array data
        $log_webpage_id = $webpage_id;       
        $log_user_id = $user_id;    
        $array_data = $this->client_ip;
        kals_mobile_log($this->db, $log_webpage_id, $action, array('memo'=>$array_data, 'user_id' => $log_user_id));    
        context_complete(); //寫入db
        
        

        
        
        //kals_mobile_log($this->db, $log_webpage_id, $action, array('memo'=>$array_data, 'user_id' => $log_user_id)); 
         
         
         
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
         echo 'context_id = '.get_context_user()->get_id();
         echo '$user->get_id = '.$user_id.'//';
         echo $this->session->userdata('logged_in');
         echo 'session_user_id ='.$this->session->userdata('user_id');
        
        
        if ($user_id !== 0){       
        $unread_search = $this->db->query("SELECT DISTINCT topic_annotation.webpage_id, count(topic_annotation.is_topic_id) AS unread
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
action = '16' 
group by user_id, webpage_id, note) AS log_view_thread

ON log_view_thread.note like concat('%\"topic_id\":' , topic_annotation.is_topic_id , '%')

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
           if ( $user_id !== 0){
               if (isset($unread_array[$webpage_id])) {
                   $webpage_array['is_unread'] = 'inline';
               }
               else {
                   $webpage_array['is_unread'] = 'none';
               }
           }else { $webpage_array['is_unread'] = 'none'; }
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
                  
                  // log區 -登入成功(有登入才記log)-action = 39
                  $action = 39;
                  $log_webpage_id = NULL; 
                  $log_user_id = $user_id;
                  $array_data =$this->client_ip;
                  kals_mobile_log($this->db, $log_webpage_id, $action, array('memo'=>$array_data, 'user_id' => $log_user_id));    
                  context_complete(); //寫入db

            
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
       $session_array = array(
           'user_id' =>NULL,
           'user_name' =>NULL,
           'logged_in' => NULL
        );    
          
       if(isset($user) && $data['do_login'] === TRUE){    
            $session_array['user_id'] = $user_id;
            $session_array['user_name'] = $user->get_name();
            $session_array['logged_in'] = TRUE;
            set_context_user($user);
        }
        else {        
            
            $session_array['logged_in'] = FALSE;
            clear_context_user();
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





