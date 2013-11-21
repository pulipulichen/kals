<?php
include_once 'web_apps_controller.php';
/**
 * KALS_model
 *
 * KALS_model full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/10/23 下午 03:51:22
 */

class KALS_model extends Web_apps_controller {

    protected $controller_enable_cache = FALSE;
    protected $login_require = FALSE;

    var $url = NULL;
    
    var $put_action_id = NULL;
    var $post_action_id = NULL;
    var $delete_action_id = NULL;

    function __construct() {
        parent::__construct();

        $this->load->library('scope/Annotation_scope_collection');
        $this->load->library('scope/Annotation_scope');
        $this->load->library('kals_resource/Domain');
        $this->load->library('kals_resource/Webpage');
        $this->load->library('kals_resource/Annotation');

        $this->load->library('kals_actor/User');

        $this->load->library('search/Search_annotation_collection');
        $this->load->library('search/Search_annotation_id_collection');
        $this->load->library('search/Search_annotation_user_collection');
        $this->load->library('search/Search_scope_collection');

        $this->load->library('type/Type_factory');

        $this->url = get_referer_url(TRUE);
        
        $this->_initialize_model();
    }
    
    
    /**
     * ===========================
     * CONTROLLER設定（請覆寫以下設定）
     * ===========================
     */
    
    /**
     * 如果呼叫此controller之後還要做其他事情，請在此設定
     */
    protected function _initialize_model() {
        // @TODO
        // 請覆寫此處
    }
    
    /**
     * ===========================
     * 通用的方法設定
     * ===========================
     */
    
    /**
     * 方法的設定
     * @var array 
     */
    var $request_default_config = array(
        /**
         * 記錄get方法的Action ID
         * 關Action ID的細節，請查看[kals]/system/applications/controllers/log.php
         * @type int
         */
        "action_id" => NULL,
        
        /**
         * 開啟偵錯模式
         * @type boolean
         */
        "enable_profiler" => FALSE,
        
        /**
         * 使用快取功能
         * @type boolean
         */
        "enable_cache" => FALSE,
        
        /**
         * 接收資料的形態
         * @type String get|post
         */
        "method" => 'GET',
        
        /**
         * 權限控管設定
         * 
         * 權限檢查發揮的效果會依照此設定由上而下地一一篩選(可自行調整順序)，如果有不合格的地方則會傳回權限錯誤
         * @type Array
         */
        "auth_configs" => array(
            /**
             * 只允許已經登入的使用者
             * @type boolean NULL表示沒有設定
             */
            "allow_logined" => NULL,
            /**
             * 只阻擋未登入的使用者
             * @type boolean NULL表示沒有設定
             */
            "deny_logined" => NULL,
            
            /**
             * 只允許陣列中指定的使用者
             * @type Array|NULL NULL表示沒有設定
             */
            "allow_users" => NULL,
            /**
             * 只阻擋陣列中指定的使用者
             * @type Array|NULL NULL表示沒有設定
             */
            "deny_users" => NULL,
            
            /**
             * 只允許陣列中指定的群組
             * @type Array|NULL NULL表示沒有設定
             */
            "allow_groups" => NULL,
            /**
             * 只阻擋陣列中指定的群組
             * @type Array|NULL NULL表示沒有設定
             */
            "deny_groups" => NULL,
            
            /**
             * 只允許陣列中指定的權限
             * @type Array|NULL NULL表示沒有設定
             * @author Pulipuli Chen 20131119 尚未設計好，沒有實際上的作用
             */
            "allow_policies" => NULL,
            /**
             * 只阻擋陣列中指定的權限
             * @type Array|NULL NULL表示沒有設定
             * @author Pulipuli Chen 20131119 尚未設計好，沒有實際上的作用
             */
            "deny_policies" => NULL,
        )
    );

    private $model_action_id = 37;

    /**
     * 運作方法的函式
     * @param String $json
     * @param String $callback
     * @return String
     */
    public function request ($json = NULL, $callback = NULL) {
        // 取得資料
        $data = $this->_retrieve_get_json($json);
        if (is_null($data)) {
            $data = $this->_retrieve_post_json($json);
        }
        
        // 偵錯
        if (isset($data['_enable_debug']) 
            && $data['_enable_debug'] === TRUE) {
            $this->output->enable_profiler(TRUE);
        }
        
        // 快取
        if (isset($data['_enable_cache']) 
            && $data["_enable_cache"] === TRUE) {
            $this->_enable_cache();
        }

        // 依照class去做處理
        $action = NULL;
        if (isset($data['_action'])) {
            $action = $data['_action'];
            if (method_exists($this, $action)) {
                $data = $this->$action($data);
            }
        }
        
        // 留下記錄
        if (!is_null($action)) {
            kals_log($this->db, $this->model_action_id, $data);
            context_complete();
        }

        // 偵錯確認
        if (isset($data['_enable_debug']) === FALSE
            || $data['_enable_debug'] != TRUE) {

            // 刪除多餘的欄位
            $strip_fields = array(
                '_action', '_enable_debug', '_enable_cache'
            );

            $output_data = array();
            foreach ($data AS $field => $value) {
                if (!in_array($field, $strip_fields)) {
                    $output_data[$field] = $value;
                }
            }
            
            // 最終回傳資料
            //test_msg($output_data);
            return $this->_display_jsonp($output_data, $callback);
        }
    }
    
    // ---------------
    // 處理資料的方式
    // ---------------
    
    /**
     * 從JSON取得資料
     * @param type $json
     */
    private function _retrieve_get_json($json) {
        if (is_string($json)) {
            $data = json_to_array($json);
        }
        else {
            $data = $json;
        }
        
        return $data;
    } 
    
    /**
     * 取得POST的資料
     * @param Object
     * @return Object
     */
    private function _retrieve_post_json($json) {
        if (isset($_POST['json']))
        {
            $json = $_POST['json'];
            $json = str_replace("\\'", "'", $json);
        
            $data = json_to_array($json);
            return $data;
        }
        else
        {
            return $json;
        }
    }
    
    // ---------------
    // 處理權限的方式
    // ---------------
    
    private function _auth_check($auth_configs) {
        
        foreach ($auth_configs AS $auth => $config) {
            
            // 如果是NULL或FALSE，都代表不使用
            if (is_null($config) || $config === FALSE ) {
                continue;
            }
            
            switch ($auth) {
                case "allow_logined":
                    $this->_auth_check_allow_logined($config);
                    break;
                case "deny_logined":
                    $this->_auth_check_deny_logined($config);
                    break;
                
                case "allow_users":
                    $this->_auth_check_allow_users($config);
                    break;
                case "deny_users":
                    $this->_auth_check_deny_users($config);
                    break;
                
                case "allow_groups":
                    $this->_auth_check_allow_groups($config);
                    break;
                case "deny_groups":
                    $this->_auth_check_deny_groups($config);
                    break;
                
                case "allow_polices":
                    $this->_auth_check_allow_polices($config);
                    break;
                case "deny_polices":
                    $this->_auth_check_deny_polices($config);
                    break;
            }
        }
    }
    
    /**
     * 檢查權限allow_logined
     * @param boolean $config
     */
    private function _auth_check_allow_logined($config) {
        if ($config === TRUE) {
            login_require(true);
        }
    }
    
    /**
     * 檢查權限deny_logined
     * @param boolean $config
     */
    private function _auth_check_deny_logined($config) {
        if ($config === TRUE) {
            $user = get_context_user();
            if (isset($user)) {
                handle_error('auth_check_deny_logined');
            }
        }
    }
    
    /**
     * 檢查權限allow_users
     * @param Array $config_list
     */
    private function _auth_check_allow_users($config_array) {
        // 預設狀態
        $passed = FALSE;
        
        $user = get_context_user();
        if (isset($user)) {
            foreach ($config_array AS $config) {
                if ($user->get_id() == $config) {
                    $passed = TRUE;
                    break;
                }
            }
        }
        
        if ($passed === FALSE) {
            handle_error('auth_check_allow_users');
        }
    }
    
    /**
     * 檢查權限deny_users
     * @param Array $config_list
     */
    private function _auth_check_deny_users($config_array) {
        // 預設狀態
        $passed = TRUE;
        
        $user = get_context_user();
        if (isset($user)) {
            foreach ($config_array AS $config) {
                if ($user->get_id() == $config) {
                    $passed = FALSE;
                    break;
                }
            }
        }
        
        if ($passed === FALSE) {
            handle_error('auth_check_deny_users');
        }
    }
    
    /**
     * 檢查權限allow_groups
     * @param Array $config_list
     */
    private function _auth_check_allow_groups($config_array) {
        // 預設狀態
        $passed = FALSE;
        
        $user = get_context_user();
        if (isset($user)) {
            $groups = $user->get_groups();
            foreach ($groups AS $group) {
                if (in_array($group->get_id(), $config_array)) {
                    $passed = TRUE;
                    break;
                }
            }
        }
        
        if ($passed === FALSE) {
            handle_error('auth_check_allow_groups');
        }
    }
    
    /**
     * 檢查權限deny_groups
     * @param Array $config_list
     */
    private function _auth_check_deny_groups($config_array) {
        // 預設狀態
        $passed = TRUE;
        
        $user = get_context_user();
        if (isset($user)) {
            $groups = $user->get_groups();
            foreach ($groups AS $group) {
                if (in_array($group->get_id(), $config_array)) {
                    $passed = FALSE;
                    break;
                }
            }
        }
        
        if ($passed === FALSE) {
            handle_error('auth_check_deny_groups');
        }
    }
    
    /**
     * 檢查權限allow_polices
     * @param Array $config_list
     */
    private function _auth_check_allow_polices($config_array) {
        // 預設狀態
        $passed = FALSE;
        
        // 尚未設計好，沒有實際上的作用
        $passed = TRUE;
        
        if ($passed === FALSE) {
            handle_error('auth_check_allow_groups');
        }
    }
    
    /**
     * 檢查權限deny_polices
     * @param Array $config_list
     */
    private function _auth_check_deny_polices($config_array) {
        // 預設狀態
        $passed = FALSE;
        
        // 尚未設計好，沒有實際上的作用
        $passed = TRUE;
        
        if ($passed === FALSE) {
            handle_error('auth_check_allow_groups');
        }
    }
}

/* End of file KALS_model.php */
/* Location: ./system/application/controllers/KALS_model.php */