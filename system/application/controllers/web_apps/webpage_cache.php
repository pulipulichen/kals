<?php
include_once 'web_apps_controller.php';
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

class Webpage_cache extends Web_apps_controller {

    protected $controller_enable_cache = TRUE;
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
    public function save($json = NULL) {
        
        $index = "selectable_text";
        if ($this->_is_callback($json) == false)
        {
            //test_msg("create_post", 1);
            //從POST中取得JSON的資料
            $json = $this->_get_post_json();

            //test_msg("create_post", 2);
            $data = $this->_save_webpage_cache($json);

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
    private function _save_webpage_cache($cache) {
        
        $cache_path = $this->_get_cache_path();
        
        //$cache = $cache["selectable_text"];
        $cache = substr($cache, 1, strlen($cache) - 2);
        
        if (is_string($cache)
                && is_file($cache_path) === FALSE) {
            write_file($cache_path, $cache);
        }
        
        return TRUE;
    }
    
    // ---------------------------
    // 儲存函式
    // ---------------------------
    
    /**
     * 讀取
     * @param String $callback AJAX使用的callback
     * @param Int $webpage_id 如果未輸入webpage_id，則會被自動帶入現在所在的webpage的ID
     */
    public function load($callback, $webpage_id = NULL) {
        
        if (is_null($webpage_id)) {
            $webpage_id = $this->webpage->get_id();
            redirect("web_apps/webpage_cache/load/" . $callback . "/" . $webpage_id);
            return;
        }
        
        $cache_path = $this->_get_cache_path();
        
        $data = "";
        if (is_file($cache_path)) {
            $data = read_file($cache_path);
            unlink($cache_path);
        }
        
        // 快取時間
        $cache_mins = 1;
        $this->output->cache($cache_mins);
        
        $this->_display_jsonp($data, $callback);
    }

    // ---------------------------
    // 共通會用到的函式
    // ---------------------------
    
    /**
     * 取得快取路徑
     * @return string
     */
    private function _get_cache_path() {
        
        $webpage_id = $this->webpage->get_id();
        
        $path = "./system/cache/webpage_cache_" . $webpage_id . ".html";
        
        return $path;
    }
}

/* End of file annotation_getter.php */
/* Location: ./system/application/controllers/annotation_getter.php */