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
     * @var Array
     */
    public $javascript_import_list = array(
        
        /**
         * 會用其他方法載入，在這邊不載入的清單
         */
        "exception_list" => array(
            "core/KALS_loader",
            "libraries/jquery"
        ),
        
        /**
         * 基本工具類
         * 
         * 20130221 Pulipuli Chen
         * 部分的JavaScript無法順利用Minify壓縮，這大部分都是別人寫好的程式庫
         * 他們有些適合用YUI Compressor壓縮，壓縮過的程式碼不能再給Minify壓縮
         * 我是用YUI Compressor Online壓縮的
         * http://refresh-sf.com/yui
         * 
         * 實際上也可以用Web_apps_controller的_yui_compression_js()也有YUI Compressor的功能
         * @var Array 
         */
        "toolkit_list" => array(
            'libraries/min/jquery.tools'
            ,'libraries/min/jquery.ba-bbq.min'
            , 'libraries/min/jquery.jcrop'
            , 'libraries/min/jquery.ba-hashchange'
            , 'libraries/min/jquery.placeheld.min'
            , 'libraries/min/jquery.endless-scroll.1.4.1'
            , 'libraries/min/yui-min'
            , 'libraries/min/jQuery_mousewheel_plugin-min'
            , 'libraries/min/jquery.scrollIntoView-min'
        ),
        
        /**
         * 工具類壓縮工具基本清單
         * @var Array
         */
        "toolkit_list_package" => array(
            'core/KALS_CONFIG'
            , 'core/KALS_language_param'
            , 'core/feedback/feedback'
            , 'core/feedback/html2canvas'
            , 'helpers/jQuery_kals_plugin'
            , 'toolkit/KALS_user_interface' //Qunit
            , 'toolkit/KALS_modal'
            , 'toolkit/Overlay_modal'
            , 'toolkit/Tooltip_modal'
            , 'toolkit/Dialog_modal'
            , 'toolkit/Dialog_option'
            , 'toolkit/Dialog_link'
            , 'toolkit/Dialog_close_option'
            , 'toolkit/Dialog_close_link'
            , 'toolkit/Notify_modal'
            , 'toolkit/Event_dispatcher'
            , 'toolkit/Multi_event_dispatcher'
            , 'toolkit/Attribute_event_dispatcher'
            , 'toolkit/JSONP_dispatcher'
            , 'toolkit/Task_event_dispatcher'
            , 'helpers/KALS_exception'
            , 'toolkit/Name_value_pair'
            , 'helpers/KALS_util'   //Qunit

            //, 'toolkit/'
        ),
        
        /**
         * 核心工具
         * @type {Array}
         */
        "core_list_package" => array(
            'core/KALS_language',
            'core/KALS_template',
            'core/Viewportmove_dispatcher',
            'core/feedback/Feedback_manager',
            'core/KALS_authentication',
            'core/URL_hash_dispatcher',
            'core/Style_manager',
            'core/Overlay_manager',
            'core/Context_user',
            'core/Context_policy',
            'core/Context_search',
            'core/Context_custom_type',
            'core/Init_context',
            'core/Init_component',
            'core/Init_profile',
            'core/KALS_context'	//必須是最後一個！	
            //''
        ),
        
        /**
         * 工具類
         */
        "component_list_package" => array(
            //'',
            'kals_window/KALS_window',
            'kals_window/Window_loading_component',
            'kals_window/Window_content',
            'kals_window/Window_content_submit',
            'kals_window/Window_user_interface',
            'kals_window/Window_change_link',

            'navigation/Navigation_list',

            'navigation/Anonymous_navigation',

            'navigation/Window_login',
            'navigation/Window_login_submit',
            'navigation/Window_register',
            'navigation/Window_register_submit',

            'navigation/Profile_navigation',
            'navigation/Embed_navigation',
            'navigation/Window_profile',
            'navigation/Window_profile_submit',
            //'navigation/Window_style',
            //'navigation/Window_style_submit',
            'navigation/Window_logout',
            'navigation/Window_logout_submit',
            'navigation/Window_password_change',
            'navigation/Window_password_change_submit',
            //'navigation/Window_search',
            //'navigation/Window_search_submit',
            'navigation/Common_navigation',
            'navigation/Window_filter',
            'navigation/Window_filter_submit',
            
            /**
             * 20131116 婷芸小地圖
             */
            'extension/map/Window_map',

            'kals_toolbar/Toolbar_component',
            'kals_toolbar/Toolbar_toggle_component',
            'kals_toolbar/Toolbar_padding_component',
            'kals_toolbar/Logo_component',
            'kals_toolbar/Loading_component',
            //'kals_toolbar/Search_component',
            //'kals_toolbar/Search_form_component',
            //'kals_toolbar/Search_result_component',

            'kals_toolbar/Avatar_component',
            'kals_toolbar/Notification_component',

            'kals_toolbar/KALS_toolbar',

            'annotation_param/Scope_param',
            'annotation_param/Scope_collection_param',
            'annotation_param/User_param',
            'annotation_param/User_collection_param',
            'annotation_param/Annotation_type_param',
            'annotation_param/Annotation_param',
            'annotation_param/Annotation_collection_param',
            'annotation_param/Recommend_param',

            'selection/Selection',
            'selection/Selection_view',
            'selection/Selection_select',
            //'selection/Selection_search',
            'selection/Selection_recommend',
            'selection/Selection_recommended',
            'selection/Selection_recommend_by',
            
            'selection/Selection_my',
            'selection/Selection_my_importance',
            'selection/Selection_my_concept',
            'selection/Selection_my_confusion',
            'selection/Selection_my_question',
            'selection/Selection_my_example',
            'selection/Selection_my_summary',
            'selection/Selection_my_custom',
            'selection/Selection_my_manager',

            'selection/Selection_my_custom_type',
            'selection/Selection_my_custom_manager',
            
            'selection/Selection_navigation',
            'selection/Selection_navigation_bad',
            'selection/Selection_navigation_normal',
            'selection/Selection_navigation_good',
            'selection/Selection_navigation_great',
            'selection/Selection_navigation_manager',

            'selection/Select_tooltip',
            'selection/Selectable_text',
            'selection/Selection_manager',

            
            'annotation_editor/Editor_container',
            'annotation_editor/Annotation_editor',
            'annotation_editor/Type_component',
            'annotation_editor/Type_menu',
            'annotation_editor/Note_editor',
            'annotation_editor/Note_editor_ckeditor',
            'annotation_editor/Init_note_editor',
            'annotation_editor/Note_editor_manager',
            'annotation_editor/Editor_respond_to',
            'annotation_editor/Editor_respond_to_collection',
            'annotation_editor/Editor_respond_to_topic',
            'annotation_editor/Policy_component',
            'annotation_editor/Window_policy',
            'annotation_editor/Window_policy_submit',
            'annotation_editor/Web_search_component',

            'annotation_list/List_collection',
            'annotation_list/List_collection_like',
            'annotation_list/List_collection_my',
            'annotation_list/List_collection_other',
            //'annotation_list/List_collection_search',
            'annotation_list/List_collection_anonymous',
            'annotation_list/Respond_list_collection',
            'annotation_list/Topic_list',


            'annotation_list/List_timestamp_component',
            'annotation_list/List_menu',

            'annotation_list/List_menu_tooltip',
            'annotation_list/List_menu_block',
            'annotation_list/List_like_component',
            'annotation_list/List_header_component',
            'annotation_list/List_note_component',
            'annotation_list/List_item',
            'annotation_list/List_item_topic',
            'annotation_list/List_item_respond',
            //'annotation_list/List_menu_search',
            
            'annotation_recommend/Recommend_hint',
            'annotation_recommend/Recommend_tooltip',
            'annotation_recommend/Recommend_list_item',

            'annotation_view/View_anchor_text_component',
            'annotation_view/View_list_collection',
            'annotation_view/View_list_item_topic',
            'annotation_view/View_list_item_respond',
            'annotation_view/View_editor_container',
            'annotation_view/View_respond_list_collection',
            'annotation_view/Window_view',
            
            //'annotation_list/List_item_search_topic',
            //'annotation_list/List_item_search_respond',

            'kals_text/Annotation_tool',
            'kals_text/Annotation_scope_loader',
            'kals_text/My_annotation_loader',
            'kals_text/My_basic_annotation_loader',
            'kals_text/My_custom_annotation_loader',
            'kals_text/Navigation_loader',

            'kals_text/Init_text',
            'kals_text/KALS_text',
        ),
    );
    
    /**
     * 載入基本工具類
     * 
     * 這是第一次載入的工具
     * @param Array $return_list
     * @return string JavaScript
     */
    public function toolkit($return_list = NULL)
    {
        $list = $this->javascript_import_list["toolkit_list"];

        $list_package = $this->javascript_import_list["toolkit_list_package"];

        if (is_null($return_list))
        {
            $this->load_js($list);
            $this->pack_js($list_package, 'toolkit');
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
        $list = array(
            //'',
            ""
        );

        //注意順序！
        $list_package = $this->javascript_import_list["core_list_package"];
        
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
        $list = array(            
            ''
        );

        $list_package = $this->javascript_import_list["component_list_package"];
        
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
        
        // 取得其他的JavaScript
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
            foreach ($files AS $path)
                $full_list[] = $path;
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
        
        foreach ($this->javascript_import_list AS $l) {
            //print_r($l);
            $list = array_merge($list, $l);
        }
        
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
                    && $this->_filter_file($path)) {
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

        $full_list = array();
        
        $list_toolkit = $this->toolkit(true);
        $list_core = $this->core(true);
        $list_component = $this->component(true);

        
        $full_list = $list_toolkit;
        foreach ($list_core AS $path)
            $full_list[] = $path;
        foreach ($list_component AS $path)
            $full_list[] = $path;

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
    

    function style()
    {
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
        if (isset($path2))
            $path .= '/'.$path2;

        $path .= '.css';
        if (FALSE === starts_with($path, 'style/'))
            $path = 'style/'.$path;

        $file_path = './system/application/views/'.$this->dir.$path;
        //test_msg($file_path, is_file($file_path));
        if (is_file($file_path) == FALSE)
            return;


        $style = $this->load->view($this->dir.$path, NULL, TRUE);

        //取代網址
        $base_url = base_url();
        $style = str_replace('${base_url}', $base_url, $style);

        send_css_header($this->output);
        $this->load->view($this->dir.'display', array('data'=>$style));
    }
    
    function load_css_release($path, $path2 = NULL)
    {
        if (isset($path2))
            $path .= '/'.$path2;

        $path .= '.css';
        if (FALSE === starts_with($path, 'style/'))
            $path = 'style/'.$path;

        $file_path = './system/application/views/'.$this->dir.$path;
        //test_msg($file_path, is_file($file_path));
        if (is_file($file_path) == FALSE)
            return;


        $style = $this->load->view($this->dir.$path, NULL, TRUE);

        //取代網址
        $base_url = base_url();
        $style = str_replace('${base_url}', $base_url, $style);

        send_css_header($this->output);
        $this->load->view($this->release_dir.'display', array('data'=>$style));
    }

    function jquery()
    {
        $path = 'libraries/jquery';
        //$this->pack_js($path);
        $this->load_js($path);
    }

    function loader($is_release = NULL)
    {
        //if (is_null($is_release) == false)
        if (true)
        {
                $this->dir = $this->release_dir;
        }
        
        $path = 'core/KALS_loader';

        //$this->load_js($path);
        $this->pack_js($path, 'loader');
    }

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

        $data['KALS_template'] = $this->_load_templates();
        
        $this->_display_jsonp($data, $callback);
    }

    private function _load_lang()
    {
        $this->lang->load('kals_web_apps');
        $web_apps_lang = $this->lang->package('web_apps');
        return $web_apps_lang;
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
    private function _load_templates() {
        $files = $files = $this->_dir_get_list(".html");
        
        $output = array();
        foreach ($files AS $file) {
            $output[$file] = $this->_get_templete($file);
        }
        
        return $output;
        //$this->_display_jsonp($output, 'template');
    }
    
    //public function template() {
    //    $template = $this->_load_templates();
    //    test_msg($template);
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