<?php
include_once 'mobile_apps_controller.php';
/**
 * login
 * 管理登入頁面的資料
 * 
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2014, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2014/4/23 下午 03:51:22
 */

class login extends Mobile_apps_controller{
    
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
    
    public function index() {
        $this->login();
    }
    // -----------------------------------------------------------------
    
    /**
     *  登入畫面
     * @param String $url 從其他頁面帶入這個$url
     */
    public function login() {
         
        $data = array(
            //'email'     => null,
            //'password'  => null,
            //'has_url'   => false,   //是否有來源url
            //'do_login'  => false,   //是否有登入動作
            //'disabled'  => null     //隱藏input_url
        );
          
        //$data['domain'] = $this->_get_referer_url();

        $user = get_context_user();
        if (isset($user) === FALSE) {
            if (isset($_POST["do_login"]) === FALSE) {
                // 如果沒有嘗試要登入
                return $this->_show_login_form();
            }
            else {
                // 如果嘗試要登入
                return $this->_check_login($data);
            }
        }
        else {
            // 如果已經登入了
            return $this->_already_login();
        }
    }   //public function mobile_user_login(
    
    /**
     * 顯示登入表單
     * @version 20140423 Pulipuli Chen
     */
    private function _show_login_form($data = NULL) {
        if (is_null($data)) {
            $data = array(
                'domain'    => "",
                'email'     => "",
                'password'  => ""
            );
        }
        
        $referer_url = get_referer_url();
        
        $is_not_login_path = (ends_with($referer_url, $this->_login_path) === FALSE);
        $is_from_mobile_apps = (strpos($referer_url, "/mobile_apps/") !== FALSE);
        $data["referer_url"] = "";
        if ($is_not_login_path && $is_from_mobile_apps) {
            $data["referer_url"] = $referer_url;
        }
        if ($data["referer_url"] == "") {
            $data["referer_url"] = $this->_webpage_path;
        }
        
        if (isset($_POST["domain"])) {
            $data["domain"] = $_POST["domain"];
        }
        if (isset($_POST["do_redirect"])) {
            $data["do_redirect"] = TRUE;
        }
        
        $data["lang"] = $this->lang;
        
        $this->load->view('mobile_apps/view_header', $data);
        $this->load->view('mobile_apps/login', $data);
        $this->load->view('mobile_apps/view_footer');
    }
    
    /**
     * 進行登入的動作
     * @version 20140423 wyfan
     * @param Array $data 準備傳入view的參數
     */
    private function _check_login($data) {
        
        $data["domain"] = $_POST["domain"];
        $data['email'] = $_POST['email'];
        $data['password'] = $_POST['password'];

        // echo 'check 2: email & password:'.$data['email'].'&'.$data['password'].'<br>'; //msg 2

        // search user data 
        
        
        
        $search_registered_user = $this->user->find_user($data["domain"], $data["email"], $data["password"]);
        //test_msg("data", $data);
        //test_msg("search", is_null($search_registered_user) );

        // 判斷是否有來源url 
        //if (isset($data['referer_url'])){
        //    $data['has_url'] = true;
        //}

        // 檢查看看是否有已經註冊的使用者
        if (isset($search_registered_user)) {
            // 存入使用者，送出
            //$this->load->helper("context");
            set_context_user($search_registered_user);
            context_complete();

            return $this->_redirect_to_referer_url();
        }
        else {
            $data["message"] = $this->lang->line("web_apps.authentication.login_error.user_not_found"); //'電子信箱或是密碼錯誤。'

            return $this->_show_login_form($data);
        }
    }
    
    /**
     * 取得參考的來源網址
     * @return String
     */
    /*
    private function _get_referer_url() {
        
        $referer_url = null;
        
        if (isset($_POST["domain"])) {
            $referer_url = $_POST["domain"];
        }
        else {
            $referer_url = get_referer_url();
        }
        
        return $referer_url;
    }
    */
    
    /**
     * 已經登入了，直接引導到webpage_list
     * @version 20140423 Pulipuli Chen
     */
    private function _already_login() {
        $redirect_url = $this->_webpage_path;
        if (isset($_POST["referer_url"])
                && $_POST["referer_url"] !== ""
                && strpos($redirect_url, "/mobile_apps/") !== FALSE) {
            $redirect_url = $_POST["referer_url"];
        }
        //header("Location: ".$redirect_url);
        
        //test_msg("already_login", $redirect_url);
        redirect($redirect_url);
        return;
    }
    
    /**
     * 儲存記錄
     */
    private function _log() {
        // log區 -登入成功(有登入才記log)-action = 39
        $action = 39;
        $log_webpage_id = NULL; 
        $log_user_id = get_context_user_id();
        $array_data =$this->client_ip;
        kals_mobile_log($this->db, $log_webpage_id, $action, array('memo'=>$array_data, 'user_id' => $log_user_id));    
        context_complete(); //寫入db
    }

    /**
     * 重導至參考頁面
     */
    private function _redirect_to_referer_url() {
        // 若有原url則跳轉回原url，若無則到Wabpage_list
        //$login_url = 'http://140.119.61.137/kals/mobile/mobile_user_login';
        
        $referer_url = $_POST["referer_url"];
        $login_url = $this->_login_path;

        //test_msg("referer_url", $referer_url);
        //test_msg("login_url", $login_url);
        //test_msg("ends_with", ends_with($referer_url, $login_url));

        if (ends_with($referer_url, $login_url)) {
            $referer_url = $this->_webpage_path;
        }
        
        //header("Location: ".$referer_url);
        //test_msg("redirect_url", $referer_url);
        
        redirect($referer_url);
        return;
    }
}        
    






