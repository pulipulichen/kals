<?php
include_once 'kals_model.php';
/**
 * Webpage_cache
 *
 * 快取Webpage的網頁內容
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/10/23 下午 03:51:22
 */

class Webpage_cache extends KALS_model {

    protected $controller_enable_cache = FALSE;
    protected $login_require = FALSE;

    var $url = NULL;
    var $webpage = NULL;
    //var $action_id = 3;

    function __construct() {
        parent::__construct();

        $this->url = get_referer_url(TRUE);
        $this->webpage = get_context_webpage();
        
        $this->load->helper('file');
    }
    
    // ---------------------------
    // 儲存函式
    // ---------------------------
    
    /**
     * 儲存webpage快取
     * @return Boolean
     */
    public function save($part, $json = NULL) {
        
        $index = "selectable_text";
        if ($this->_is_callback($json) == false)
        {
            //test_msg("create_post", 1);
            //從POST中取得JSON的資料
            $json = $this->_get_post_json();

            //test_msg("create_post", 2);
            $data = $this->_save_webpage_cache($part, $json);

            //test_msg("create_post", 3);
            //然後把data存入session中
            $this->_set_post_session($index, $data);
            
            //test_msg("create_post", 4);
            $this->_display_post_complete();
        }
        else
        {
            $callback = $json;
            $data = $this->_get_post_session($index);
            
            $this->_display_jsonp($data, $callback);
        }
        context_complete();
    }
    
    /**
     * 儲存快取檔案
     * @param String $cache
     * @return boolean
     */
    private function _save_webpage_cache($part, $cache) {
        
        $cache_path = $this->_get_cache_path($part);
        
        //$cache = $cache["selectable_text"];
        $cache = substr($cache, 1, strlen($cache) - 2);
        //$cache = substr($cache, 1, strlen($cache) - 1);
        //$cache = stripslashes($cache);
        
        //if (is_string($cache)
        //        && is_file($cache_path) === FALSE) {
        
        if (is_string($cache)) {
            
            //test_msg("儲存前", strlen($cache));
            write_file($cache_path, $cache);
            
            //$data = read_file($cache_path);
            //test_msg("儲存後", strlen($data));
        }
        
        return TRUE;
    }
    
    /**
     * 清除暫存檔案
     */
    public function clean_save($data = NULL) {
        
        $i = 0;
        $cache_path = $this->_get_cache_path($i);
        while (is_file($cache_path)) {
            unlink($cache_path);
            $i++;
            $cache_path = $this->_get_cache_path($i);
        }
        
        return TRUE;
    }
    
    // ---------------------------
    // 讀取函式
    // ---------------------------
    
    /**
     * 是否啟用快取
     * @var Boolean
     */
    var $enable_cache = true;
    
    /**
     * 讀取時，一次合併的檔案數量
     * @var Int 
     */
    var $merge_parts = 10;
    
    public function load($data) {
        
        $webpage_id = $data["webpage_id"];
        
        if (is_null($webpage_id)) {
            handle_error("Cannot get webpage_id");
            return;
        }
        
        $parts_count = 0; 
        
        if ($this->_check_cache_expire()) {
            $this->clean_save();
            
            $data = array('parts_count' => 0);
            return $data;
        }
        
        // 先計算數量
        $i = 0;
        
        $cache_path = $this->_get_cache_path($i);
        while (is_file($cache_path)) {
            $i++;
            $cache_path = $this->_get_cache_path($i);
        }
        
        if ($i > 0) {
            $parts_count = ceil( $i / $this->merge_parts );
            
            //$cache_mins = $this->config->item("webpage_cache.expiration");
            //if ($this->enable_cache) {
            //    $this->output->cache($cache_mins);
            //}
        }
        
        //$this->_display_get($parts_count);
        $data = array(
            'parts_count' => $parts_count
        );
        
        return $data;
    }
    
    /**
     * 確認檔案是否過期
     * @return boolean
     */
    private function _check_cache_expire() {
        $cache_path = $this->_get_cache_path(0);
        
        if (is_file($cache_path)) {
            $created_time = time() - filectime($cache_path);
            $cache_mins = $this->config->item("webpage_cache.expiration") * 60;
            if ($created_time < $cache_mins) {
                return FALSE;
            }
            else {
                return TRUE;
            }
        }
        
        return TRUE;
    }
    
    /**
     * 讀取
     * 
     * @param Int $webpage_id 如果未輸入webpage_id，則會被自動帶入現在所在的webpage的ID]
     */
    public function load_parts($data) {
        
        //if (is_null($webpage_id)) {
        //    $webpage_id = $this->webpage->get_id();
        //    redirect("web_apps/webpage_cache/load/" . $callback . "/" . $webpage_id);
        //    return;
        //}
        
        //$cache_path = $this->_get_cache_path($part);
        
        $webpage_id = $data["webpage_id"];
        if (is_null($webpage_id)) {
            handle_error("Cannot get webpage_id");
            return;
        }
        
        $start_index = $data["start_index"];
        
        $data = "";
        
        $i = ($start_index * $this->merge_parts );
        $end_index = $i + $this->merge_parts;
        $cache_path = $this->_get_cache_path($i);
        while (is_file($cache_path)) {
            $data = $data . read_file($cache_path);
            
            $i++;
            if ($i === $end_index) {
                break;
            }
            
            $cache_path = $this->_get_cache_path($i);
        }
        //test_msg($i, $end_index);
        
        //for ($i = 0; $i < 3; $i++) {
        //    $data = $data . $data;
        //}
        
        /*
        if (is_file($cache_path)) {
            //$data = read_file($cache_path);
            //test_msg("有資料:" . $data);
            //echo "";
            //unlink($cache_path);
            
            //$this->_display_get($data);
            
            // 快取時間
            
            
            
            //return $this;
        }
        */
        
        if ($data !== "") {
            $cache_mins = $this->config->item("webpage_cache.expiration");
            if ($this->enable_cache) {
                $this->output->cache($cache_mins);
            }
        }
        
        //$this->_display_get($data);
        
        $data = array(
            "cache" => $data
        );
        return $data;
    }

    // ---------------------------
    // 共通會用到的函式
    // ---------------------------
    
    /**
     * 快取儲存路徑到本機端快取區
     * 
     * true: 儲存到快取區
     * false: 儲存到 ./system/cache
     * @var Boolean 
     */
    var $_save_cache_to_sys_temp_dir = false;
    
    /**
     * 取得快取路徑
     * 
     * @param Int $part 部分
     * @return string
     */
    private function _get_cache_path($part = NULL) {
        
        $webpage_id = $this->webpage->get_id();
        
        $dir = "./system/cache/";
        if ($this->_save_cache_to_sys_temp_dir) {
            $dir = sys_get_temp_dir() . DIRECTORY_SEPARATOR;
        }
        
        $filename = $webpage_id;
        if ($part !== NULL) {
            $filename = $filename . "-" . $part;
        }
        
        $path = $dir . "KALS_webpage_cache_" . $filename . ".html";
        
        //test_msg($path);
        
        return $path;
    }
}

/* End of file annotation_getter.php */
/* Location: ./system/application/controllers/annotation_getter.php */