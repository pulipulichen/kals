<?php
/**
 * Web_apps_controller
 *
 * 讀取Web_apps所需要的資料，Controller的原形
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/23 上午 11:16:40
 */

class Web_apps_controller extends Controller {

    protected $controller_enable_cache = FALSE;    
    protected $login_require = FALSE;
    
    protected $package_load = FALSE;
    
    //var $dir = 'web_apps/';
    var $dir = 'web_apps_release/';
    var $release_dir = 'web_apps_release/';

    function  __construct()
    {
        parent::Controller();
        $this->load->helper('url');
        $this->load->helper('web_apps');
        $this->load->config('kals');

        if ($this->controller_enable_cache)
            $this->_enable_cache();
        create_context();
        
        if ($this->login_require === TRUE)
        {
            login_require(true);
        }
    }
    
    function load_js($path, $path2 = NULL)
    {
        $script = $this->_combine_js($path, $path2);

        send_js_header($this->output);
        $this->load->view($this->dir.'display', array('data'=>$script));
    }

    function pack_js($path, $path2 = NULL)
    {
        $script = $this->_combine_js($path, $path2);
        
        $packed = $this->_compression_js($script);
        send_js_header($this->output);
        $this->load->view($this->dir.'display', array('data'=>$packed));
    }

    /**
     * 讀取JS檔案
     * @param string|string[] $path 讀取路徑。如果是陣列，那就是讀取多個檔案並且合併
     * @param string|null $path2
     * @return string JavaScript文字檔
     */
    private function _combine_js($path, $path2) {
        $scripts = "";
        if (is_string($path))
        {
            if (isset($path2))
                $path .= '/'.$path2;
            $path .= '.js';
            $scripts = $this->load->view($this->dir.$path, NULL, TRUE);
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
                $scripts = $scripts . $script . "\n";
            }
        }
        return $scripts;
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

    protected function _yui_compression_js($script)
    {
        if ($this->config->item('output.package.enable') == false)
            return $script;

        $this->load->library('web_apps/Minify_YUICompressor');

        $packed = Minify_YUICompressor::minifyJs($script);
        return $packed;
    }

    protected function _yui_compression_css($script)
    {
        //if ($this->config->item('output.package.enable') == false)
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

        $style = $this->load->view($this->dir.$path, NULL, TRUE);

        //取代網址
        $base_url = base_url();
        $style = str_replace('${base_url}', $base_url, $style);

        send_css_header($this->output);
        $this->load->view($this->dir.'display', array('data'=>$style));
    }

    function pack_css($path, $path2 = NULL)
    {
        if (isset($path2))
            $path .= '/'.$path2;

        $path .= '.css';
        if (FALSE === starts_with($path, 'style/'))
            $path = 'style/'.$path;
        $style = $this->load->view($this->dir.$path, NULL, TRUE);

        if ($this->config->item('output.package.enable'))
        {
            /**
             * 加入使用YUI的CSS壓縮
             * @version 20111111 Pudding Chen
             */
            $style = $this->_compress_css($style);
            $style = $this->_yui_compression_css($style);
        }

        //取代網址
        $base_url = base_url();
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
        $enable_cache = $this->config->item('output.cache.enable');
        if ($enable_cache)
        {
            $cache_expiration = $this->config->item('output.cache.expiration');
            $this->output->cache($cache_expiration);
        }
    }

    protected function _disable_cache()
    {
        $this->output->cache(0);
    }

    protected function _display_jsonp($object, $callback = NULL)
    {
        if (is_null($callback))
            return $object;

        send_js_header($this->output);
        $json = json_encode($object);
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

    protected function _set_post_session($index, $data)
    {
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
}

/* End of file web_apps.php */
/* Location: ./system/application/controllers/web_apps.php */