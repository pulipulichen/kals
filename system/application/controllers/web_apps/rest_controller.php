<?php
include_once 'web_apps_controller.php';
/**
 * rest_controller
 *
 * rest_controller full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/10/23 下午 03:51:22
 */

class rest_controller extends Web_apps_controller {

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
        
        $this->_after_construct();
    }
    
    /**
     * ===========================
     * CONTROLLER設定（請覆寫以下設定）
     * ===========================
     */
    
    /**
     * 如果呼叫此controller之後還要做其他事情，請在此設定
     */
    public function _after_construct() {
        // 請覆寫此處
    }

    /**
     * ===========================
     * GET方法（請覆寫以下設定）
     * ===========================
     */
    
    /**
     * 方法的設定
     * @var array 
     */
    var $request_get_config = array(
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
    
    /**
     * GET方法中處理$data的地方
     * 請覆寫此處
     * 
     * @param Object $data 此處將會傳入來自JavaScript的JSON轉換而成的關聯式陣列
     * 
     * [JavaScript端]
     * var _data = {
     *    "field1": "value1",
     *    "field2": ["value2_0", "value2_1", "value2_2"]
     * };
     * [此處PHP端]
     * $data = array(
     *     "field1" => "value1",
     *     "field2" => array("value2_0", "value2_1,", "value2_2,")
     * );
     * 
     * @return Object 請處理過後再回傳
     */
    public function _process_get_data($data) {
        $data = TRUE;
        return $data;
    }

    /**
     * ===========================
     * POST方法（請覆寫以下設定）
     * ===========================
     */
    
    /**
     * 方法的設定
     * @var array 
     */
    var $request_post_config = array(
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
        "method" => 'POST',
        
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
    
    /**
     * POST方法中處理$data的地方
     * 請覆寫此處
     * 
     * @param Object $data 此處將會傳入來自JavaScript的JSON轉換而成的關聯式陣列
     * 
     * [JavaScript端]
     * var _data = {
     *    "field1": "value1",
     *    "field2": ["value2_0", "value2_1", "value2_2"]
     * };
     * [此處PHP端]
     * $data = array(
     *     "field1" => "value1",
     *     "field2" => array("value2_0", "value2_1,", "value2_2,")
     * );
     * 
     * @return Object 請處理過後再回傳
     */
    public function _process_post_data($data) {
        $data = TRUE;
        return $data;
    }
    
    /**
     * ===========================
     * PUT方法（請覆寫以下設定）
     * ===========================
     */
    
    /**
     * 方法的設定
     * @var array 
     */
    var $request_put_config = array(
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
    
    /**
     * PUT方法中處理$data的地方
     * 請覆寫此處
     * 
     * @param Object $data 此處將會傳入來自JavaScript的JSON轉換而成的關聯式陣列
     * 
     * [JavaScript端]
     * var _data = {
     *    "field1": "value1",
     *    "field2": ["value2_0", "value2_1", "value2_2"]
     * };
     * [此處PHP端]
     * $data = array(
     *     "field1" => "value1",
     *     "field2" => array("value2_0", "value2_1,", "value2_2,")
     * );
     * 
     * @return Object 請處理過後再回傳
     */
    public function _process_put_data($data) {
        $data = TRUE;
        return $data;
    }
    
    /**
     * ===========================
     * DELETE方法（請覆寫以下設定）
     * ===========================
     */
    
    /**
     * 方法的設定
     * @var array 
     */
    var $request_delete_config = array(
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
    
    /**
     * DELETE方法中處理$data的地方
     * 請覆寫此處
     * 
     * @param Object $data 此處將會傳入來自JavaScript的JSON轉換而成的關聯式陣列
     * 
     * [JavaScript端]
     * var _data = {
     *    "field1": "value1",
     *    "field2": ["value2_0", "value2_1", "value2_2"]
     * };
     * [此處PHP端]
     * $data = array(
     *     "field1" => "value1",
     *     "field2" => array("value2_0", "value2_1,", "value2_2,")
     * );
     * 
     * @return Object 請處理過後再回傳
     */
    public function _process_delete_data($data) {
        $data = TRUE;
        return $data;
    }
    
    /**
     * ===========================
     * 允許對外的方法設定
     * ===========================
     */
    
    /**
     * 對外可使用的GET
     * @param String $json
     * @param String $callback
     * @return String 要回傳的JavaScript
     */
    public function get($json = NULL, $callback = NULL) {
        $config = NULL;
        if (isset($this->request_get_config)) {
            $config = $this->request_get_config;
        }
        return $this->_request('get', $config, $json, $callback);
    }

    /**
     * 對外可使用的PUT
     * @param String $json
     * @param String $callback
     * @return String 要回傳的JavaScript
     */
    public function put($json = NULL, $callback = NULL) {
        $config = NULL;
        if (isset($this->request_put_config)) {
            $config = $this->request_put_config;
        }
        return $this->_request('put', $config, $json, $callback);
    }
    
    /**
     * 對外可使用的POST
     * @param String $json
     * @param String $callback
     * @return String 要回傳的JavaScript
     */
    public function post($json = NULL, $callback = NULL) {
        $config = NULL;
        if (isset($this->request_post_config)) {
            $config = $this->request_post_config;
        }
        return $this->_request('post', $config, $json, $callback);
    }
    
    /**
     * 對外可使用的GET
     * @param String $json
     * @param String $callback
     * @return String 要回傳的JavaScript
     */
    public function delete($json = NULL, $callback = NULL) {
        $config = NULL;
        if (isset($this->request_delete_config)) {
            $config = $this->request_delete_config;
        }
        return $this->_request('delete', $config, $json, $callback);
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

    /**
     * 運作方法的函式
     * @param type $name Description
     * @return array(0=> "basic", 1=> "custom")
     */
    private function _request($rest_type, $config = NULL, $json = NULL, $callback = NULL) {
        
        if (is_null($config)) {
            $config = $this->request_default_config;
        }
        
        // 權限控管
        $auth_configs = $config["auth_configs"];
        $this->_auth_check($auth_configs);
        
        // 偵錯
        if ($config['enable_profiler'] === TRUE) {
            $this->output->enable_profiler(TRUE);
        }
        
        // 快取
        if ($config["enable_cache"] === TRUE) {
            $this->_enable_cache();
        }
        
        // 取得資料
        if ($config["method"] == 'GET') {
            $data = $this->_retrieve_get_json($json);
        }
        else if ($config["method"] == 'POST') {
            $data = $this->_retrieve_post_json($json);
        }
        
        $output_data = TRUE;
        // 處理輸出資料
        switch ($rest_type) {
            case 'get':
                $output_data = $this->_process_get_data($data);
                break;
            case 'put':
                $output_data = $this->_process_put_data($data);
                break;
            case 'post':
                $output_data = $this->_process_post_data($data);
                break;
            case 'delete':
                $output_data = $this->_process_delete_data($data);
                break;
        }
        
        // 留下記錄
        if (is_numeric($config["action_id"])) {
            kals_log($this->db, $config["action_id"], $output_data);
            context_complete();
        }
        
        // 偵錯確認
        if ($config['enable_profiler'] != TRUE) {
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

/* End of file rest_controller.php */
/* Location: ./system/application/controllers/rest_controller.php */