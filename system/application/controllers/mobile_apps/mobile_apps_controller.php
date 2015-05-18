<?php
/**
 * Mobile_apps_controller
 *
 * 讀取Mobile_apps所需要的資料，Controller的原形
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/23 上午 11:16:40
 */

class Mobile_apps_controller extends Controller {

    protected $controller_enable_cache = FALSE;    
    protected $login_require = FALSE;
    
    protected $package_load = FALSE;
    
    //var $dir = 'web_apps/';
    var $dir = 'mobile_apps/';
    var $release_dir = 'mobile_apps/';
    
    var $_login_path = "mobile_apps/login";
    var $_webpage_path = "mobile_apps/webpage_list";
    
    var $CI;
    var $session;
    
    var $client_ip;
    
    function  __construct()
    {
        parent::Controller();
        
        
        $this->load->library('kals_actor/User');
        
        $this->load->helper('url');
        $this->load->helper('web_apps');
        $this->load->config('kals');

        if ($this->controller_enable_cache) {
            $this->_enable_cache();
        }
        create_context();
        
        if ($this->login_require === TRUE)
        {
            login_require(true);
        }
        
        
        $this->lang->load('kals_mobile_apps');
        $this->lang->load('kals_web_apps');
        
         $this->client_ip = array(
           'ip' => get_client_ip(),
           'browser' => $_SERVER['HTTP_USER_AGENT']
        );
         
    }
    
    function load_js($path, $path2 = NULL)
    {
        $script = $this->_combine_js($path, $path2);

        send_js_header($this->output);
        $this->load->view($this->dir.'display', array('data'=>$script));
    }

    /**
     * 壓縮JavaScript
     * @param Array $path 要壓縮的檔案路徑，是一個陣列
     * @param String $cache_name 快取的檔案名稱
     */
    function pack_js($path, $cache_name)
    {
        send_js_header($this->output);
        //header('Content-type: text/javascript');
        
        $this->load->helper('file');
        
        $packed_file = '';
        
        if (is_string($path)) {
            $path = array($path);
        }
        
        
        //製作快取路徑
        $cache_path = './system/cache/'.$cache_name.'.js';
        
        //先檢查是否有啟動快取
        if ($this->_is_config_cache_enable())
        {
            //如果啟動了，那麼檢查是否有快取檔案
            if (get_file_info($cache_path) !== FALSE) {
                //如果有快取檔案，回傳快取檔案的內容，記得送出js_header
                
                $packed = read_file($cache_path);
                $this->load->view($this->dir.'display', array('data'=>$packed));
            }
            else {
                //如果沒有快取檔案，那麼照以下步驟製作出快取之後，寫入快取檔案
                //$script = $this->_combine_js($path);
                //$packed = $this->_minify_compression_js($script);
                //$packed = $this->_combine_js($path);
                //write_file($cache_path, $packed);
                
                foreach ($path AS $p) {
                    if ($p === '') {
                        continue;
                    }
                    $script = $this->load->view($this->dir.$p.'.js', NULL, TRUE);
                    $packed = $this->_minify_compression_js($script);
                    $this->load->view($this->dir.'display', array('data'=>$packed));
                    //echo $packed;
                    $packed_file = $packed_file . $packed;
                }
            }
        }
        else
        {
            //如果沒有啟動，那就刪除快取檔案
            if (get_file_info($cache_path) !== FALSE) {
                unlink($cache_path);
            }
            
            //然後照以下步驟顯示檔案內容
            //$script = $this->_combine_js($path);
            //$packed = $this->_minify_compression_js($script);
            //$packed = $this->_combine_js($path);
            
                foreach ($path AS $p) {
                    if ($p == '')
                        continue;
                    $script = $this->load->view($this->dir.$p.'.js', NULL, TRUE);
                    $packed = $this->_minify_compression_js($script);
                    $this->load->view($this->dir.'display', array('data'=>$packed));
                    //echo $packed;
                }
        }
        
        if ($packed_file != '') {
            write_file($cache_path, $packed_file);
        }
    }

    /**
     * 讀取JS檔案
     * @param string|string[] $path 讀取路徑。如果是陣列，那就是讀取多個檔案並且合併
     * @param string|null $path2
     * @return string JavaScript文字檔
     */
    private function _combine_js($path, $path2 = null) {
        $scripts = "";
        $scripts_ary = array();
        if (is_string($path))
        {
            if (isset($path2))
                $path .= '/'.$path2;
            $path .= '.js';
            $script = $this->load->view($this->dir.$path, NULL, TRUE);
            //$script = $this->_minify_compression_js($script);
            $scripts_ary[] = $script;
        }
        else if (is_array($path))
        {
            $list =  $path;
            foreach ($list AS $path)
            {
                if (isset($path2))
                    $path .= '/'.$path2;
                $path = $path .'.js';

                $file_path = './system/application/views/'.$this->dir.$path;
                //test_msg($file_path, is_file($file_path));
                if (is_file($file_path) == FALSE)
                    continue;

                $script = $this->load->view($this->dir.$path, NULL, TRUE);
                //$script = $this->_minify_compression_js($script);
                $scripts_ary[] = $script;
            }
        }
        /*
                $pass = false;
                while ($pass == false)
                {
                    try {
                        @$output = implode("\n", $scripts_ary);
                        if ($output != '')
                            return $output;
                    }
                    catch (Exception $e) {
                        $this->_wait();
                    }
                }
        */
        //return $scripts;
        
        $output = '';
        $this->load->library('web_apps/phplock.php');

        $lock = $this->phplock;
        $lock->startLock ();
        $status = $lock->isLock ();
        
        $i = 0;
        while (!$status && $i < 3)
        {
            $this->_wait();
            $status = $lock->isLock ();
            $i++;
        }
        $output = implode("\n", $scripts_ary);
        $lock->unlock ();
        $lock->endLock ();   
        
        return $output;
    }
    

    /**
     * Dean Edwards式JavaScript壓縮法(packer)
     * @param String $script 壓縮前的JavaScript
     * @return String 壓縮後的JavaScript
     * @version 2009 Pudding Chen
     */
    protected function _compression_js($script)
    {
        return $this->_yui_compression_js($script);
        
        $this->load->library('web_apps/JavaScriptPacker');

        //$packer = new JavaScriptPacker($script, 'Normal', true, false);
        //$packer = new JavaScriptPacker($script, 62, false, true);
        $packer = new JavaScriptPacker($script, 62, false, true);
        $packed = $packer->pack();
        return $packed;
    }
    
    function _wait() {
        // sleep(rand(0, 10)/1000);
    }

    /**
     * 改用Minify來壓縮JavaScript
     * @param string $script 要被壓縮的JavaScript程式碼
     * @return string 壓縮完成的結果
     */
    protected function _minify_compression_js($script) {
        if ($this->config->item('output.package.enable') == false)
            return $script;
        
        $packed = '';
        
        //$this->load->library('web_apps/min/lib/JSMinPlus');
        require_once './system/application/libraries/web_apps/min/lib/JSMinPlus.php';
        //echo '[][][][]'.$packed;
        $packed = JSMinPlus::minify($script);
        $packed = $packed."\n";
        
        return $packed;
    }
    
    /**
     * 改用Minify來壓縮CSS
     * @param string $style 要被壓縮的CSS程式碼
     * @return string 壓縮完成的結果
     */
    protected function _minify_compression_css($style) {
        if ($this->config->item('output.package.enable') == false)
            return $style;
        
        $packed = '';
        
        //$this->load->library('web_apps/min/lib/JSMinPlus');
        require_once './system/application/libraries/web_apps/min/lib/CSSmin.php';
        //echo '[][][][]'.$packed;
        if (is_null($this->cssmin))
            $this->cssmin = new CSSmin ();
        $packed = $this->cssmin->run($style);
        //$packed = $style;
        $packed = $packed;
        return $packed;
    }
    
    /**
     * Minify的CSSmin，專門壓縮CSS用的。
     * @var CSSmin 
     */
    private $cssmin = null;

    protected function _yui_compression_js($script)
    {
        if ($this->config->item('output.package.enable') == false)
            return $script;

        
        $this->load->library('web_apps/Minify_YUICompressor');
        
        $this->load->library('web_apps/phplock.php');
        $lock = $this->phplock;
        $lock->startLock ();
        //$lock->lock ();
        $status = $lock->isLock ();
        
        $i = 0;
        while (!$status && $i < 3)
        {
            $this->_wait();
            $status = $lock->isLock ();
            $i++;
        }
        
        $pass = false;
        while ($pass == false)
        {
            try {
                $packed = Minify_YUICompressor::minifyJs($script);
                $vm_error = 'Error occurred during initialization of VM';
                while (substr($packed, 0, strlen($vm_error)) == $vm_error || $packed == '')
                {
                    $this->_wait();
                    $packed = Minify_YUICompressor::minifyJs($script);
                }
                $pass = true;
            } catch (Exception $e)
            {
                $this->_wait();
            }
        }      
        $lock->unlock ();
        $lock->endLock ();     
        
        return $packed;
    }

    protected function _yui_compression_css($script)
    {
        if ($this->config->item('output.package.enable') == false)
            return $script;

        $this->load->library('web_apps/Minify_YUICompressor');

        $packed = Minify_YUICompressor::minifyCss($script);
        return $packed;
    }

    function load_css($path, $path2 = NULL)
    {
        if (isset($path2))
            $path .= '/'.$path2;

        $path .= '.css';
        if (FALSE === starts_with($path, 'style/'))
            $path = 'style/'.$path;

        //$style = $this->load->view($this->dir.$path, NULL, TRUE);
        $style = $this->_initialize_css($path);


        //取代網址
        //$base_url = base_url();
        $base_url = get_kals_base_url();
        $style = str_replace('${base_url}', $base_url, $style);

        send_css_header($this->output);
        $this->load->view($this->dir.'display', array('data'=>$style));
    }
    
    function pack_css($path, $cache_name) {
        $this->load->helper('file');
        
        //製作快取路徑
        $cache_path = './system/cache/'.$cache_name.'.css';
       
        //先檢查是否有啟動快取
        if ($this->_is_config_cache_enable())
        {
           
            //如果啟動了，那麼檢查是否有快取檔案
            if (get_file_info($cache_path) !== FALSE) {
                //如果有快取檔案，回傳快取檔案的內容，記得送出js_header
                $packed = read_file($cache_path);
                //$packed = file_get_contents($cache_path);
                //$packed = $this->create_pack_css($path);
            } 
            else {
                //如果沒有快取檔案，那麼照以下步驟製作出快取之後，寫入快取檔案
                $packed = $this->create_pack_css($path);
                //write_file($cache_path, $packed);
                file_put_contents($cache_path, $packed);
            }
        } 
        else
        {
            //如果沒有啟動，那就刪除快取檔案
            if (get_file_info($cache_path) !== FALSE) {
                unlink($cache_path);
            }
            
            //然後照以下步驟顯示檔案內容
            $packed = $this->create_pack_css($path);
        }
        
        //$packed = '/*Content-type: text/css*/'.$packed;
        
        //$packed = $this->_20130219_pack_css($path);
        send_css_header($this->output);
        $this->load->view($this->dir.'display', array('data'=>$packed));
       // $packed = $this->_20130219_pack_css($path);
        //$this->load->view($this->dir.'display', array('data'=>$packed));
    }

    function create_pack_css($path, $path2 = NULL)
    {
        if (is_array($path))
        {
            $style = '';
            foreach ($path AS $p)
            {
                $style = $style . $this->create_pack_css($p);
            }
            return $style;
        }
        
        if (isset($path2))
            $path .= '/'.$path2;

        $path .= '.css';
        //if (FALSE === starts_with($path, 'style/'))
        //    $path = 'style/'.$path;
        
        //$style = $this->load->view($this->dir.$path, NULL, TRUE);
        $style = $this->_initialize_css($path);

        
        if ($this->config->item('output.package.enable'))
        {
            //$style = $this->_compress_css($style);
            /**
             * 不使用YUI的CSS壓縮
             * @version 201302201 Pudding Chen
             */
            //$style = $this->_yui_compression_css($style);
            
            $style = $this->_minify_compression_css($style);
        }

        //取代網址
        //$base_url = base_url();
        $base_url = get_kals_base_url();
        $style = str_replace('${base_url}', $base_url, $style);

        //send_css_header($this->output);
        //$style = $this->load->view($this->dir.'display', array('data'=>$style), TRUE);
        return $style;
    }
    
    /**
     * 取得
     * @param type $path
     * @param type $replace
     * @param type $strip_end
     * @return type
     */
    protected function _get_view_prefix($path, $replace = '-', $strip_end = NULL) {
        $classname = $path;
        if (!is_null($strip_end)) {
            $classname = substr($classname,0, (1-  strlen($strip_end)));
        }
        $classname = preg_replace('/[\W|\_]/', $replace, $classname);

        $classname = strtolower($classname);
        return $classname;
        //$classname = '.kals-view.' . $classname . ' ';
    }
    
    /**
     * 過濾CSS，把view的CSS處理掉
     * @param String $path
     * @return String 過濾過的CSS檔案
     */
    private function _initialize_css($path) {
        $style = $this->load->view($this->dir.$path, NULL, TRUE);
        
        
        
        if (strpos($path, 'view/') !== FALSE) {
            $classname = $path;
            $classname = substr($classname,0, -4);
            $classname = preg_replace('/[\W|\_]/', "-", $classname);
            /*
            $class_array1 = explode('}', $classname);
            foreach ($class_array1 AS $c_ary1) {
                $class_ary2 = explode('{', $c_ary1);
                if (count($class_ary2) > 0) {
                    $selectors_list = $class_ary2[0];
                }
                else {
                    $selectors_list = $c_ary1;
                }
                
                $selectors = explode(',', $selectors_list);
                
            }
             */
            
            $classname = strtolower($classname);
            $classname = '.kals-view.' . $classname . ' ';
            
            //test_msg($classname);
            
            // 如果是樣板的話
            //preg_replace($style, $path, $style);
            //$style = preg_replace('/[\}|\,]*[\{|\,]/', "" .$classname+"\$0", $style);
            
            
$parts = explode('}', $style);
foreach ($parts as &$part) {
    if (empty($part) 
            || strlen($part) === 0 
            || strpos($part, '{') === FALSE) {
        continue;
    }
    
    $part = trim($part);
    if (substr($part, 0, 1) == '@') {
        $media_parts = explode('{', $part);
        foreach ($media_parts AS $media_index => $media_part) {
            $media_part = trim($media_part);
            
            if ($media_index > 0 
                    && $media_index < count($media_parts) -1
                    && substr($media_part, 0, 1) != '@') {
                $media_part = $classname . $media_part;
                $media_part = trim($media_part);
            }
            $media_parts[$media_index] = $media_part; 
        }
        $part = implode("{", $media_parts);
        $part = trim($part);
    }
    
    
    $subParts = explode(',', $part);
    foreach ($subParts as &$subPart) {
        $subPart = trim($subPart);
        if (substr($part, 0, 1) != '@') {
            $subPart = $classname . ' ' . $subPart;
            $subPart = trim($subPart);
        }
    }

    $part = implode(', ', $subParts);
    $part = trim($part);
    
}

$style = implode("}\n", $parts);
            
            $style = trim($style);
            $style = str_replace('  ', ' ', $style);
            //if ($style != '') {
            //    $style = $classname . $style;
            //}
            test_msg($style);
        }
        return $style;
    }
            

    /**
     * 舊的pack css程式
     * 不應該使用，這只是測試用的
     * 
     * @deprecated 20130219
     * @param string $path
     * @param string $path2
     * @return null 直接輸出到view了
     */
    function _20130219_pack_css($path, $path2 = NULL)
    {
        if (isset($path2))
            $path .= '/'.$path2;

        $path .= '.css';
        if (FALSE === starts_with($path, 'style/'))
            $path = 'style/'.$path;
        $style = $this->load->view($this->dir.$path, NULL, TRUE);

        if ($this->config->item('output.package.enable'))
        {
            $style = $this->_compress_css($style);
            /**
             * 不使用YUI的CSS壓縮
             * @version 201302201 Pudding Chen
             */
            //$style = $this->_yui_compression_css($style);
        }

        //取代網址
        //$base_url = base_url();
        $base_url = get_kals_base_url();
        $style = str_replace('${base_url}', $base_url, $style);
        
        send_css_header($this->output);
        $this->load->view($this->dir.'display', array('data'=>$style));
    }
    

    /**
     * Converts a CSS-file contents into one string
     * Source Code: http://snippets.dzone.com/posts/show/4137
     * @Author: Dmitry-Sh http://snippets.dzone.com/user/Dmitry-Sh
     *
     * @param    string  $buffer Text data
     * @return   string  Optimized string
     */
    private function _compress_css($buffer) {
        /* Remove comments */
        $buffer = preg_replace("/\/\*(.*?)\*\//s", ' ', $buffer);

        /* Remove new lines, spaces */
        $buffer = preg_replace("/(\s{2,}|[\r\n|\n|\t|\r])/", ' ', $buffer);

        /* Join rules */
        $buffer = preg_replace('/([,|;|:|{|}]) /', '\\1', $buffer);
        $buffer = str_replace(' {', '{', $buffer);

        /* Remove ; for the last attribute */
        $buffer = str_replace(';}', '}', $buffer);
        $buffer = str_replace(' }', '}', $buffer);

        return $buffer;
    }

    protected function _enable_cache()
    {
        $enable_cache = $this->_is_config_cache_enable();
        if ($enable_cache)
        {
            $cache_expiration = $this->config->item('output.cache.expiration');
            $this->output->cache($cache_expiration);
        }
    }
    
    /**
     * 檢查設定檔中是否設定了快取
     * @return boolean 是or否
     */
    protected function _is_config_cache_enable() {
        return $this->config->item('output.cache.enable');
    }
            

    protected function _disable_cache()
    {
        $this->output->cache(0);
    }

    protected function _display_jsonp($object, $callback = NULL)
    {
        if (is_null($callback)) {
            return $object;
        }

        send_js_header($this->output);
        //test_msg($object['policy']['my_custom']);
        
        $json = kals_json_encode($object);
        $pos = stripos($callback, '='); // 取得 = 號的位置
        $callback_hash = ($pos === false) ?  '' : substr($callback, $pos+1);  // 擷取 = 後面的字串
        //echo "{$jsonp}({$json})"; // 輸出

        $vars = array(
            'callback_hash' => $callback_hash,
            'json' => $json
        );
        $this->load->view($this->dir.'display_jsonp', $vars);
    }

    protected function _set_upload_session($state, $data)
    {
        $this->session->set_flashdata('upload_completed', $state);
        $this->session->set_flashdata('upload_data', $data);
        return $this;
    }

    protected function _get_upload_session()
    {
        $data = array(
            'completed' => $this->session->flashdata('upload_completed'),
            'data' => $this->session->flashdata('upload_data')
        );
        return $data;
    }

    protected $post_session_index_prefix = 'post_';

    /**
     * 判斷輸入參數是否是callback
     * @param String $param
     * @return boolean
     */
    protected function _is_callback ($param = NULL) {
        if (is_null($param))
            return FALSE;
        else
            return (starts_with($param, 'callback='));
    }
    
    protected function _set_post_session($index, $data) {
        $index = $this->post_session_index_prefix.$index;
        $this->session->set_flashdata($index, $data);
        return $this;
    }

    protected function _get_post_session($index)
    {
        $index = $this->post_session_index_prefix.$index;
        $data = $this->session->flashdata($index);
        return $data;
    }
    
    /**
     * 取得POST的值
     * 
     * @author Pulipuli Chen <pulipuli.chen@gmail.com>
     * 20131225 來自於annotation_setter
     * @return String
     */
    protected function _get_post_json() {
        if (isset($_POST['json'])) {
            //return urldecode($_POST['json']);
            //return $_POST['json'];
            
            $json = $_POST["json"];
            
            /**
             * 20121224 Pulipuli Chen
             * 移除scope中text包含\'的資料
             */
            $json = str_replace("\\'", "'", $json);
            
            return $json;
        }
        else {
            handle_error ('Cannot get json data.');
        }
    }
    
    /**
     * 完成POST
     * 
     * @author Pulipuli Chen <pulipuli.chen@gmail.com>
     */
    protected function _display_post_complete() {
        send_js_header($this->output);
        $this->load->view('web_apps/display_post_complete');
    }
    
    var $_session_key_webpage_list_page = "mobile_apps.webpage_list.page";
    /**
     * 儲存現在網頁的頁數
     * @param Int $page
     */
    protected function set_session_webpage_list_page($page) {
        if ($page === FALSE || is_null($page) || $page === 1) {
            return;
        } 
        
        $sesseion_key = $this->_session_key_webpage_list_page;
        $this->session->set_userdata($sesseion_key, $page);
    }
    
    /**
     * 取得指定Webpage的頁數
     * @return Int 頁數
     */
    protected function get_session_webpage_list_page() {
        $sesseion_key = $this->_session_key_webpage_list_page;
        
        $page = $this->session->userdata($sesseion_key);
        if ($page === FALSE || is_null($page)) {
            $page = 1;
        } 
        else {
            $page = intval($page);
        }
        return $page;
    }
}

/* End of file mobile_apps.php */
/* Location: ./system/application/controllers/mobile_apps.php */