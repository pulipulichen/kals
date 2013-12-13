<?php
/**
 * Api
 *
 * 以REST形式，回傳資料的方法
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2013, Pulipuli Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		https://github.com/pulipulichen/kals
 * @version		1.0 2013/12/26 上午 11:16:40
 */

class Api extends Controller {

    // ------------------
    // 設定區
    // ------------------
    
    var $dir = 'web_apps/';
    
    /**
     * 預先載入相關的library
     * 
     * 如果還有用到其他的library，請在此載入
     */
    function  __construct()
    {
        parent::Controller();
        $this->load->helper('url');
        $this->load->helper('web_apps');
        $this->load->config('kals');

        create_context();
    }
    
    /**
     * 以HTML顯示資料
     * 
     * 不需要變動了
     * @param Array $data 以關聯式陣列組成的回傳資料
     */
    private function _display_data($data) {
        $data = kals_json_encode($data);
        $this->load->view($this->dir.'display', array('data'=>$data));
    }
    
    /**
     * 以JSONP顯示資料
     * 
     * 不需要變動了
     * @param Array $data 以關聯式陣列組成的回傳資料
     * @param String $callback
     */
    private function _display_jsonp($data, $callback = NULL) {
        
        send_js_header($this->output);
        
        if (is_null($callback)) {
            return $this->_display_data($data);
        }
        else {
            $data = kals_json_encode($data);
            
            $pos = stripos($callback, '='); // 取得 = 號的位置
            $callback_hash = ($pos === false) ?  '' : substr($callback, $pos+1);  // 擷取 = 後面的字串
            
            $vars = array(
                'callback_hash' => $callback_hash,
                'json' => $data
            );
            $this->load->view($this->dir.'display_jsonp', $vars);
        }
    }
    
    // ------------------
    // 實作區：Webpage
    // ------------------
    
    /**
     * 取得目前KALS當中所有的閱讀標註網頁資訊
     * 用法：http://localhost/kals/api/webpage/callback=jsonp1386943076032
     * 
     * 取得指定$webpage_id網頁中的所有Topic Annotation
     * 用法：http://localhost/kals/api/webpage/231/callback=jsonp1386943076032
     * 
     * 不需要變動了
     * @param type $webpage_id 指定查詢網頁ID。省略則會顯示所有網頁
     */
    public function webpage($webpage_id = NULL, $callback = NULL) {
        
        if (!is_null($webpage_id) && is_null($callback)) {
            if (strpos($webpage_id, "callback=") !== FALSE) {
                $callback = $webpage_id;
                $webpage_id = NULL;
            }
        }
        
        if (is_string($webpage_id)) {
            $webpage_id = intval($webpage_id);
        }
        
        $message;
        
        if (is_null($webpage_id)) {
            $message = $this->_get_webpages();
        }
        else {
            // 如果
            $message = $this->_get_webpage_topics($webpage_id);
        }
        
        $this->_display_jsonp($message, $callback);
    }
    
    /**
     * 回傳所有webpage的資料
     * @return array
     */
    private function _get_webpages() {
        $list = array();
        
        // ---------------
        // 模擬資料
        // ---------------
        $mock = array(
            "webpage" => array(
                array(
                    "webpage_id" => 1,
                    "url" => "http://dlll.nccu.edu.tw/index.php"
                ),
                array(
                    "webpage_id" => 2,
                    "url" => "http://demo-kals.dlll.nccu.edu.tw/test.php"
                )
            )
        );
        $list = $mock;  //如果要開始實作的話，請註解這一行
        
        // ---------------
        // 實作開始
        // ---------------
        
        return $list;
    }
    
    /**
     * 取得指定$webpaged_id底下的所有標註
     * @param int $webpage_id Webpage的ID
     */
    private function _get_webpage_topics($webpage_id) {
        $list = array();
        
        // ---------------
        // 模擬資料
        // ---------------
        $mock = array(
            "topic_annotation" => array(
                
                // 按照時間由新到舊排序
                array(
                    "anchor_text" => "取而代之 的是如",
                    "annotation_id" => 15530,
                    "note" => "<p>\n\ttwtwe<\/p>",
                    "user" => array(
                        "id" => 2002,
                        "name" => "pudding"
                    ),
                    "type" => 1,
                    "scope" => array(
                        "1573" => array(array(802,891))
                    ),
                    "respond_to_coll" => array(),
                    "is_like" => false,
                    "timestamp" => "1382978858",
                    "url" => "http://localhost/kals/help/config_annotation_scope.html#view=15530"   // 由webpage + annotation_id組成
                ),
                array(
                    "anchor_text" => "取而代之 的是如",
                    "annotation_id" => 15530,
                    "note" => "<p>\n\ttwtwe<\/p>",
                    "user" => array(
                        "id" => 2002,
                        "name" => "pudding"
                    ),
                    "type" => 1,
                    "scope" => array(
                        "1573" => array(array(802,891))
                    ),
                    "respond_to_coll" => array(),
                    "is_like" => false,
                    "timestamp" => "1382978858",
                    "url" => "http://localhost/kals/help/config_annotation_scope.html#view=15530"   // 由webpage + annotation_id組成
                )
            ) 
        );
        $list = $mock;  //如果要開始實作的話，請註解這一行
        
        // ---------------
        // 實作開始
        // ---------------
        
        // ---------------
        // 資料回傳
        // ---------------
        return $list;
    }
    
    // ------------------
    // 實作區：Topic Annotation
    // ------------------
    
    /**
     * 取得指定Topic以及底下的標註資訊
     * 用法：http://localhost/kals/api/topic_annotation/15531/callback=jsonp1386943076032
     * 
     * 不需要變動了
     * @param Int $topic_id 指定查詢的標題標註ID
     * @param String
     */
    public function topic_annotation($topic_id, $callback = NULL) {
        
        $topic_id = intval($topic_id);
        $message = $this->_get_topic_annotations($topic_id);
        
        $this->_display_jsonp($message, $callback);
    }
        
    /**
     * 取得指定$topic_id所有標註
     * @param int $topic_id 指定查詢的標題標註ID
     */
    private function _get_topic_annotations($topic_id) {
        $list = array();
        
        // ---------------
        // 模擬資料
        // ---------------
        $mock = array(
            "annotation" => array(
                
                // 按照時間由舊到新排序
                
                // 這是topic annotation
                array(
                    "anchor_text" => "取而代之 的是如",
                    "annotation_id" => 15531,
                    "note" => null,
                    "user" => array(
                        "id" => 2002,
                        "name" => "pudding"
                    ),
                    "type" => 1,
                    "scope" => array(
                        "1573" => array(array(802,891))
                    ),
                    "is_like" => false,
                    "timestamp" => "1382978735",
                    "like_count" => 0,
                    "url" => "http://localhost/kals/help/config_annotation_scope.html#view=15531"   // 由webpage + topic_id組成
                ),
                
                // 底下是response annotations
                array(
                    "anchor_text" => "取而代之 的是如",
                    "annotation_id" => 15532,
                    "note" => "<p>\n\ttest<\/p>",
                    "user" => array(
                        "id" => 1701,
                        "name" => "demo"
                    ),
                    "type" => 1,
                    "scope" => array(
                        "1573" => array(array(802,891))
                    ),
                    "respond_to_coll" => array(),
                    "is_like" => false,
                    "timestamp" => "1382978859",
                    "topic" => array(
                        "annotation_id" => 15531,
                        "user" => array(
                            "id" => 2002,
                            "name" => "pudding"
                        ),
                    ),
                    "url" => "http://localhost/kals/help/config_annotation_scope.html#view=15531"   // 由webpage + topic_id組成
                ),
                array(
                    "anchor_text" => "取而代之 的是如",
                    "annotation_id" => 15595,
                    "note" => "<p>\n\terwere<\/p>",
                    "user" => array(
                        "id" => 2002,
                        "name" => "pudding"
                    ),
                    "type" => 1,
                    "scope" => array(
                        "1573" => array(array(802,891))
                    ),
                    "respond_to_coll" => array(
                        array(
                            "annotation_id" => 15532,
                            "user" => array(
                                "id" => 1701,
                                "name" => "demo"
                            )
                        )
                    ),
                    "is_like" => false,
                    "timestamp" => "1386941507",
                    "topic" => array(
                        "annotation_id" => 15531,
                        "user" => array(
                            "id" => 2002,
                            "name" => "pudding"
                        ),
                    ),
                    "url" => "http://localhost/kals/help/config_annotation_scope.html#view=15531"   // 由webpage + topic_id組成
                )
            ) 
        );
        $list = $mock;  //如果要開始實作的話，請註解這一行
        
        // ---------------
        // 實作開始
        // ---------------
        
        
        // ---------------
        // 資料回傳
        // ---------------
        return $list;
    }
    
    
    // ------------------
    // 實作區：Auth Check
    // ------------------
    
    /**
     * 確認身分
     * 
     * 只確認有註冊這個人，不確認密碼
     * 密碼由取用API的網站自行管理吧？
     * 
     * @param String $user_email
     * @param String $callback
     */
    public function auth_check($user_email, $callback = NULL) {
        
        $topic_id = intval($topic_id);
        
        $message = $this->_check_user_exist($user_email);
        
        $this->_display_jsonp($message, $callback);
    }
    
    /**
     * 確認是否有這位email的使用者
     * @param String $user_email
     * @return boolean
     */
    private function _check_user_exist($user_email) {
        $exist = false;
        
        // ---------------
        // 實作開始：請在此去確認是否有此email
        // ---------------
        
        // ---------------
        // 資料回傳
        // ---------------
        return $exist;
    }
}

/* End of file api.php */
/* Location: ./system/application/controllers/api.php */