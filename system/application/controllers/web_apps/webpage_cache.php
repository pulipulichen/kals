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
    
    // ---------------------------
    // 讀取函式
    // ---------------------------
    
    /**
     * 讀取
     * 
     * @param Int $webpage_id 如果未輸入webpage_id，則會被自動帶入現在所在的webpage的ID]
     * @param Int $part 分部分
     */
    public function load($webpage_id, $part = NULL) {
        
        //if (is_null($webpage_id)) {
        //    $webpage_id = $this->webpage->get_id();
        //    redirect("web_apps/webpage_cache/load/" . $callback . "/" . $webpage_id);
        //    return;
        //}
        
        $cache_path = $this->_get_cache_path($part);
        
        $data = "";
        if (is_file($cache_path)) {
            $data = read_file($cache_path);
            //test_msg("有資料:" . $data);
            //echo "";
            //unlink($cache_path);
            
            //$this->_display_get($data);
            
            // 快取時間
            $cache_mins = $this->config->item("webpage_cache.expiration");
            $this->output->cache($cache_mins);
            
            //return $this;
        }
        
        
        $this->_display_get($data);
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