<?php
include_once 'web_apps_controller.php';
/**
 * generic
 *
 * generic full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/28 下午 01:08:33
 */

class generic extends Web_apps_controller {

    protected $controller_enable_cache = FALSE;
    
    private $dirmap_path = "./system/application/views/web_apps/";
   
    /**
     * JavaScript載入清單
     * @deprecated 改到 config/kals.php裡面去控制
     * @var Array
     */
//    public $javascript_import_list = array(
    
    /**
     * 載入基本工具類
     * 
     * 這是第一次載入的工具
     * @param Array $return_list
     * @return string JavaScript
     */
    public function toolkit($return_list = NULL)
    {
        $this->_enable_cache();
        
        //$list = $this->javascript_import_list["toolkit_list"];
        $list = $this->config->item('web_apps.javascript_import');
        $list = $list['toolkit_list'];
        
        //test_msg("toolkit 1");

        //$list_package = $this->javascript_import_list["toolkit_list_package"];
        $list_package = $this->config->item('web_apps.javascript_import');
        $list_package = $list_package['toolkit_list_package'];

        if (is_null($return_list))
        {
            //test_msg("toolkit 2");
            $this->load_js($list);
            //test_msg("toolkit 3");
            $this->pack_js($list_package, 'toolkit');
            //test_msg("toolkit 4");
        }
        else
        {
            $full_list = $list;
            foreach ($list_package AS $path) {
                $full_list[] = $path;
            }
            return $full_list;
        }
    }

    function core($return_list = NULL)
    {
        $this->_enable_cache();
        
        $list = array(
            //'',
            ""
        );

        //注意順序！
        //$list_package = $this->javascript_import_list["core_list_package"];
        $list_package = $this->config->item('web_apps.javascript_import');
        $list_package = $list_package['core_list_package'];
        
        /*
        $dir_list = array(
    		'core'
    	);
        $files = $this->dirmap($dir_list);
		*/
        
        if (is_null($return_list))
        {
            //$this->load_js($list);
            $this->pack_js($list_package, 'core');
        }
        else
        {
            $full_list = $list;
            foreach ($list_package AS $path) {
                $full_list[] = $path;
            }
            return $full_list;
        }
    }

    /**
     * 載入Component類型的JavaScript
     * @param {boolean} 是否要回傳列表
     */
    function component($return_list = NULL)
    {
        $this->_enable_cache();
        
        $list = array(      
            ''
        );

        //$list_package = $this->javascript_import_list["component_list_package"];
        $list_package = $this->config->item('web_apps.javascript_import');
        $list_package = $list_package['component_list_package'];
        
    	/*
    	$dir_list = array(
    		'kals_window',
                'navigation',
                'kals_toolbar',
                'annotation_param',
                'selection',
                'annotation_editor',
                'annotation_view',
                'annotation_recommend',
                'kals_text'
    	);
        $files = $this->dirmap($dir_list);
        */
        
        //test_msg("取得其他的JavaScript");
        $exception_list = $this->_get_javascript_exception_list();
        $other_list_package = $this->_dir_get_list(".js", $exception_list);
        
        $list_package = array_merge($list_package, $other_list_package);
        
        if (is_null($return_list))
        {
            //$this->load_js($list);
            //$this->pack_js($files, 'component');
            $this->pack_js($list_package, 'component');
        }
        else
        {
            $full_list = $list;
            foreach ($files AS $path) {
                $full_list[] = $path;
            }
            return $full_list;
        }
    }
    
    /**
     * 取得目錄陣列底下的檔案列表 
     *
     */
    function dirmap($dirs) {
    	
    	if (is_string($dirs)) {
            $dirs = array($dirs);
    	}
    	
    	$files = array();
    	
    	$this->load->helper('directory');
    	for ($i = 0; $i < count($dirs); $i++) {
            $f = directory_map($this->dirmap_path . $dirs[$i], TRUE);
            //print_r($f);
            for ($j = 0; $j < count($f); $j++) {
                $f[$j] = $dirs[$i]."/".$f[$j];
            }
            $file_name = $f;
            
            //echo "// [!] " . $file_name;
            //if (strpos($file_name, "libraries/src") !== FALSE) {
            //    continue;
            //}
            
            $files = array_merge($files, $file_name);
    	}
        
        for ($i = 0; $i < count($files); $i++) {
            $name = $files[$i];
            
            $name = substr($name, 0 , strrpos($name, "."));
            $files[$i] = $name;
        }
        
        //print_r($files);
    	
        return $files;
    }
    
    // --------------------------------
    
    /**
     * 測試用
     */
    /*
    public function show_javascript_list() {
        $exception_list = $this->_get_javascript_exception_list();
        $list = $this->_get_javascript_list($exception_list);
        
        //print_r($exception_list);
        print_r($list);
    }
    */
    
    /**
     * 取得排除清單
     * @return array
     */
    private function _get_javascript_exception_list() {
        $list = array();
        
        //foreach ($this->javascript_import_list AS $l) {
        foreach ($this->config->item('web_apps.javascript_import') AS $l) {
            //print_r($l);
            $list = array_merge($list, $l);
        }
        
        //$file = directory_map($this->dirmap_path . "libraries/src/", false);
        //$files = $this->_dir_get_file_path($needle, $files, $dir, $file, $exception_list);
        
        // 把libraries/src加入
        
        return $list;
    }
    
    /**
     * 取得web_apps底下的資料夾
     */
    private function _dir_get_list($needle, $exception_list = array()) {
        $this->load->helper('directory');
        
        $files = array();
        
        $file = directory_map($this->dirmap_path, false);
        $dir = "";
        
        //print_r($file);
        $files = $this->_dir_get_file_path($needle, $files, $dir, $file, $exception_list);
        
        return $files;
    }
    
    /**
     * 取得該檔案的路徑
     * @param array $files
     * @param String $dir
     * @param String|array $file
     * @param array $exception_list 排除清單
     * @return array
     */
    private function _dir_get_file_path($needle, $files, $dir, $file, $exception_list = array()) {
       
        /**
         * 避免目錄太深
         */
       //if (strpos($dir, "/") !== FALSE && count(explode("/", $dir)) > 3 ) {
           //test_msg("太深了 " . $dir);
           //return $files;
       //}
        
       //$needle = ".js";
       if (is_string($file)) {
           if (substr($file, (0-strlen($needle))) === $needle) {
               $file = substr($file, 0, (0-strlen($needle)));
               $path = $dir . $file;
               
               if (FALSE === in_array($path, $exception_list)
                    && $this->_filter_file($path)
                    && ends_with($path, "_test") === FALSE
                    && starts_with($path, "libraries/src/") === FALSE) {
                   $files[] = $path;
               }
           }
       }
       else {
           foreach ($file AS $d => $f) {
               $child_dir = $dir;
               if (FALSE === is_numeric($d)) {
                   $child_dir = $dir . $d . "/";
               }
               
               $files = $this->_dir_get_file_path($needle, $files, $child_dir, $f, $exception_list);
           }
       }
       
       return $files;
    }
    
    /**
     * 過濾指定的檔案名稱
     * @param type $file_name
     */
    private function _filter_file($file_name) {
        if (strpos($file_name, '-locale_') !== FALSE) {
            return FALSE;
        }
        return TRUE;
    }
    
    // --------------------------

    function package($is_demo = NULL) {
	
        if (isset($is_demo))
        {
                $this->dir = $this->release_dir;
        }

        //$full_list = array();
        
        $list_toolkit = $this->toolkit(true);
        $list_core = $this->core(true);
        $list_component = $this->component(true);

        
        $full_list = $list_toolkit;
        foreach ($list_core AS $path) {
            $full_list[] = $path;
        }
        foreach ($list_component AS $path) {
            $full_list[] = $path;
        }

        //$this->load_js($full_list);
        $this->pack_js($full_list, 'package');
    }
    
    function component_package($is_demo = NULL) {
	
        if (isset($is_demo))
        {
                $this->dir = $this->release_dir;
        }

        $this->core();
        $this->component();

    }
    
    /**
     * KALS網頁使用css
     * @author Pulipuli Chen 20150115
     */
    function style()
    {
        /**
         * 加入快取功能
         * @author Pulipuli Chen 20150115
         */
        $this->_enable_cache();
        
        
    	/*
        $list = array(
            'generic',
            'dialog',
            'notify',
            'toolbar',
            'tooltip',
            'jquery.jcrop',
            'window',
            'navigation',
            'selection',
            'text',
            'annotation_tool',
            'annotation_list',
            'annotation_editor',
            'annotation_view',
            'annotation_recommend',
            'core',
        	'toolkit'
        );
        */
        
        /*
        foreach ($list AS $path)
        {
            //測試用時，寫load_css
            //$this->load_css($path);

            //實際使用時，寫pack_css
            
            //$this->_20130219_pack_css($path);
        }*/
        //$this->pack_css($list, 'style');
        
    	/*
        $this->load->helper('directory');
        $files = directory_map($this->dirmap_path . 'style/');
        for ($i = 0; $i < count($files); $i++) {
        	$files[$i] = substr($files[$i], 0 , -4);
        }
        */
        //print_r($files);
        
        //$files = $this->dirmap("style");
        
        $files = $this->_dir_get_list(".css");
        
        //test_msg($files);
        
        $this->pack_css($files, 'style');
    }

    /**
     * @deprecated 20111106 Pudding Chen 請使用style
     */
    /*
    function style_release()
    {
        $list = array(
            'generic',
            'dialog',
            'notify',
            'toolbar',
            'tooltip',
            'jquery.jcrop',
            'window',
            'navigation',
            'selection',
            'text',
            'annotation_tool',
            'annotation_list',
            'annotation_editor',
            'annotation_view',
            'annotation_recommend',
            'core'
            'map'
        );
        foreach ($list AS $path)
        {
            //測試用時，寫load_css
            //$this->load_css_release($path);

            //實際使用時，寫pack_css
            $this->pack_css($path, 'style_release');
        }
    }
    */

    function load_css($path, $path2 = NULL)
    {
        if (isset($path2)) {
            $path .= '/'.$path2;
        }

        $path .= '.css';
        if (FALSE === starts_with($path, 'style/')) {
            $path = 'style/'.$path;
        }

        $file_path = './system/application/views/'.$this->dir.$path;
        //test_msg($file_path, is_file($file_path));
        if (is_file($file_path) == FALSE) {
            return;
        }
        
        $style = $this->load->view($this->dir.$path, NULL, TRUE);

        //取代網址
        //$base_url = base_url();
        $base_url = get_kals_base_url();
        $base_url = trim($base_url);
        $style = str_replace('${base_url}', $base_url, $style);

        send_css_header($this->output);
        $this->load->view($this->dir.'display', array('data'=>$style));
    }
    
    function load_css_release($path, $path2 = NULL)
    {
        if (isset($path2)) {
            $path .= '/'.$path2;
        }

        $path .= '.css';
        if (FALSE === starts_with($path, 'style/')) {
            $path = 'style/'.$path;
        }

        $file_path = './system/application/views/'.$this->dir.$path;
        //test_msg($file_path, is_file($file_path));
        if (is_file($file_path) == FALSE) {
            return;
        }


        $style = $this->load->view($this->dir.$path, NULL, TRUE);

        //取代網址
        //$base_url = base_url();
        //$base_url = trim($base_url);
        //$style = str_replace('${base_url}', $base_url, $style);
        $style = $this->_css_replace_base_url($style);

        send_css_header($this->output);
        $this->load->view($this->release_dir.'display', array('data'=>$style));
    }

    /**
     * KALS網頁使用的jQuery
     * @author Pulipuli Chen 20150115
     */
    function jquery()
    {
        /**
         * 加入快取功能
         * @author Pulipuli Chen 20150115
         */
        $this->_enable_cache();
        
        $path = array(
            'libraries/jquery',
            //'libraries/jquery-patch',
        );
        //$this->pack_js($path);
        $this->load_js($path);
    }

    /**
     * KALS網頁第一個讀取的程式碼
     * @author Pulipuli Chen 20150115
     * @param Boolean $is_release
     */
    function loader($is_release = NULL)
    {
        /**
         * 加入快取功能
         * @author Pulipuli Chen 20150115
         */
        $this->_enable_cache();
        
        //if (is_null($is_release) == false)
        if (true)
        {
            $this->dir = $this->release_dir;
        }
        
        $path = array(
            'core/KALS_CONFIG',
            'core/KALS_loader'
        );

        //$this->load_js($path);
        $this->pack_js($path, 'loader');
    }

    /**
     * context所需資訊
     * @param String $json
     * @param String $callback
     */
    function info($json, $callback = NULL)
    {
        if (is_null($callback))
        {
            $callback = $json;
            $json = NULL;
        }
        
        //分析json
        if (isset($json))
        {
            $input_data = json_to_object($json);

            if (isset($input_data->anchor_navigation_type))
            {
                $type = $input_data->anchor_navigation_type;
                $GLOBALS['context']->set_anchor_navigation_type($type);
            }
        }
        $data = array();

        $data['KALS_language'] = $this->_load_lang();
        $data['Window_profile'] = array(
            'sex' => array(0, 1, 2),    //性別
            'locale' => array('zh_tw', 'en_us') //語系
        );

        require_once 'authentication.php';
        $authentication = new authentication();

        $data['KALS_authentication'] = $authentication->default_data();

        //$data['KALS_view_manager'] = $this->_load_viewes();
        
        // 20140517 Pulipuli Chen
        //$data['webpage_id'] = get_context_webpage()->get_id();
        
        /**
         * @author Pulipuli Chen <pulipuli.chen@gmail.com> 20150117
         * 不，不能這樣做
         * 要把navigation data拆開來之後再做快取
         * 快取網址要搭配 webpage_id 跟 user_id
         */
        //$this->output->cache($this->config->item('output.cache.info.expiration'));
        
        $this->_display_jsonp($data, $callback);
    }
    
    
    /**
     * 模組所需資訊
     * 
     * @version 20140517 Pulipuli Chen
     * @param String $json
     * @param String $callback
     */
    function modules_config($json, $callback = NULL)
    {
        if (is_null($callback))
        {
            $callback = $json;
            $json = NULL;
        }
        
        $data = array();

        $data['KALS_view_manager'] = $this->_load_viewes();
        
        $this->_enable_cache();
        
        $this->_display_jsonp($data, $callback);
    }
    
    /**
     * 網頁所需資訊
     * 
     * @version 20140519 Pulipuli Chen
     * @param String $json
     * @param String $callback
     */
    function webpage_info($json, $callback = NULL)
    {
        if (is_null($callback))
        {
            $callback = $json;
            $json = NULL;
        }
        
        $data = array();
        
        // 20140517 Pulipuli Chen
        $data['webpage_id'] = get_context_webpage()->get_id();
        
        $this->_display_jsonp($data, $callback);
    }

    /**
     * 讀取語系檔案
     * @return Array
     * @author Pulipuli Chen 20131119
     */
    private function _load_lang()
    {
        $this->lang->load('kals_web_apps');
        $web_apps_lang = $this->lang->package('web_apps');
        
        // 加入
        $view_lang = $this->_load_view_lang();
        $web_apps_lang = array_merge($web_apps_lang, $view_lang);
        
        return $web_apps_lang;
    }
    
    /**
     * 讀取樣板的語系檔案
     * @return Array
     * @author Pulipuli Chen 20131119
     */
    private function _load_view_lang() {
        //$lang = 'zh_tw';
        $lang = $this->config->item('language');
        $postfix = '_locale_' . $lang . '.php';
        $prefix_dir = 'system/application/views/';
        
        //test_msg(__DIR__);
        $paths = $this->_dir_get_list($postfix);
        //test_msg(get_kals_root_path(''));
        //test_msg($paths);
        
        $view_lang = array();
        foreach ($paths AS $path) {
            $view_prefix = $this->_get_view_prefix($path, '_');
            $view_prefix = 'view.' . $view_prefix . '.';
            
            $lang = array();
            $view_lang_path = $prefix_dir.$this->dir.$path.$postfix;
            $view_lang_path = get_kals_root_path($view_lang_path);
            
            require_once $view_lang_path;
            //require_once 'D:\xampp\htdocs\kals\system\application\views\web_apps\extension\dashboard\view\Dashboard_locale_zh_tw.php';
            //get_kals_root_path($view_lang)
            //test_msg($view_lang_path);
            
            //$lang = $this->load->view($view_lang_path, NULL, TRUE);
            
            //test_msg($lang);
            
            foreach ($lang AS $line => $value) {
                $view_line = $view_prefix . $line;
                $view_lang[$view_line] = $value;
            }
        }
        return $view_lang;
    }

    /**
     * 設置標註指引類型
     * @version 20111106 Pudding Chen
     * @param string $json = 'all', 'recommend', 'none'
     * @param string $callback
     */
    public function set_anchor_navigation_type($json, $callback = NULL)
    {
        if (is_null($callback))
        {
            $callback = $json;
            $json = 'all';
        }
        
        $type = $json;
        $GLOBALS['context']->set_anchor_navigation_type($type);

        $data = true;
        $this->_display_jsonp($data, $callback);
    }
    
    /**
     * 讀取樣板
     * @return Array 
     * array(
     *  '樣板路徑' => '樣板內容'
     * )
     */
    private function _load_viewes() {
        $files = $files = $this->_dir_get_list(".html");
        
        $output = array();
        foreach ($files AS $file) {
            $output[$file] = $this->_get_templete($file);
        }
        
        return $output;
        //$this->_display_jsonp($output, 'view');
    }
    
    //public function view() {
    //    $view = $this->_load_views();
    //    test_msg($view);
    //}
    
    private function _get_templete($path) {
        $path = $this->dirmap_path . $path . '.html';
        
        $d = new DOMDocument;
        $mock = new DOMDocument;
        $text = file_get_contents($path);
        
        if (strpos($text, '<body') !== FALSE) {
            $d->loadHTML($text);
            $body_element = $d->getElementsByTagName('body');
            //test_msg($body_element->length);
            if (count($body_element) > 0) {
                $body = $body_element->item(0);
                foreach ($body->childNodes as $child){
                    $mock->appendChild($mock->importNode($child, true));
                }

                $text = $mock->saveHTML();
            }
        }
        $text = trim($text);
        //test_msg($text);
        //test_msg($path);
        
        //$text = '';
        //$text = file_get_contents($path);
        return $text;
    }
}


/* End of file generic.php */
/* Location: ./system/application/controllers/generic.php */