<?php
include_once 'mobile_apps_controller.php';
/**
 * logout
 * 管理登出頁面的資料
 * 
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2014, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2014/4/23 下午 03:51:22
 */

class logout extends Mobile_apps_controller{
    
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
    
    var $_login_path = "mobile_apps/login";
    var $_webpage_path = "mobile_apps/webpage";

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
        $this->logout();
    }
    // -----------------------------------------------------------------
    
    /**
     *  登出
     */
    public function logout() {
        $user = get_context_user();
        if (isset($user)) {
            clear_context_user();
            $this->_log();
        }
        redirect($this->_login_path);
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
}        
    






