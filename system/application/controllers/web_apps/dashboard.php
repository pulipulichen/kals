<?php
include_once 'rest_controller.php';
/**
 * Dashboard
 *
 * 輸出網頁標註資訊的位置
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2013, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2013/11/19 下午 03:51:22
 */

class dashboard extends rest_controller {

    
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
        "action_id" => 36,  //查詢Dashboard
        
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
        
        // @author Pulipuli Chen 201311119
        // 測試用，先作mock
        $data["annotation_count"] = rand(5, 100);
        $data["user_count"] = rand(1, 6);
        $data["last_annotation_id"] = 14848;
        $data["last_annotation_timestamp"] = time();
        
        $last_annotation = new Annotation(14848);
        $data["last_annotation"] = $last_annotation->export_data();
        $data["activity"] = "Good";
        
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
     * @author Pulipuli Chen 20131119 此controller不使用POST方法
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
    /*
    public function _process_post_data($data) {
        $data = TRUE;
        return $data;
    }
     */
    
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
     * @author Pulipuli Chen 20131119 此controller不使用PUT方法
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
    /*
    public function _process_put_data($data) {
        $data = TRUE;
        return $data;
    }
    */
    
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
     * @author Pulipuli Chen 20131119 不使用DELETE方法
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
    /*
    public function _process_delete_data($data) {
        $data = TRUE;
        return $data;
    }
     */
}

/* End of file dashboard.php */
/* Location: ./system/application/controllers/web_apps/rest/dashboard.php */