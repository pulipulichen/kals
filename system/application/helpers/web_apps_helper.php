<?php
/**
 * web_apps_helper
 *
 * 剖析回呼函式(callback)名稱，並將輸入參數以JSON的方式回傳。
 * 這個作法來自於Simple Complexity http://tiramisu1983.spaces.live.com/blog/cns!A030B8E246FEC75B!1164.entry
 *
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://pulipuli.blogspot.com/
 * @version		1.0 2010/6/22 下午 02:07:49
 */

if ( ! function_exists('json_to_object'))
{
    function json_to_object($json)
    {
        if (defined("JSON_UNESCAPED_UNICODE") ) {
            return json_decode($json, false, JSON_UNESCAPED_UNICODE);
        }
        else {
            return json_decode($json, false);
        }
    }
}

if ( ! function_exists('json_to_array'))
{
    function json_to_array($json)
    {
        if (is_object($json))
            return (array) $json;
        if (is_array($json))
            return $json;
        else
            return json_decode($json, TRUE);
    }
}

if ( ! function_exists('display_jsonp'))
{
    function display_jsonp($callback, $json)
    {
        $json = json_encode($json);
        $pos = stripos($callback, '='); // 取得 = 號的位置
        $jsonp = ($pos === false) ?  '' : substr($callback, $pos+1);  // 擷取 = 後面的字串
        echo "{$jsonp}({$json})"; // 輸出
    }
}

if ( ! function_exists('send_js_header'))
{
    function send_js_header(CI_Output $output)
    {
        //header('Content-type: text/javascript');
        $header = 'Content-type: text/javascript';
        $output->set_header($header, TRUE);
    }
}

if ( ! function_exists('send_css_header'))
{
    function send_css_header(CI_Output $output)
    {
        //header('Content-type: text/css');
        $header = 'Content-type: text/css';
        $output->set_header($header, TRUE);
    }
}

if ( ! function_exists('send_png_header'))
{
    function send_png_header(CI_Output $output)
    {
        //header('Content-type: text/css');
        $header = 'Content-type: image/png';
        $output->set_header($header, TRUE);
    }
}

if ( ! function_exists('create_json_excpetion'))
{
    function create_json_excpetion($header, $message)
    {
        $data = array(
            'exception' => array(
                'heading' => $header,
                'message' => $message,
                'request_uri' => get_referer_url(FALSE)
            )
        );
        
        //log區
        $array_data = $data;

        $user = get_context_user();
        $user_id = NULL;
        if (isset($user))
            $user_id = $user->get_id();

        $action = 27;
        $CI =& get_instance();
        kals_log($CI->db, $action, array('memo'=>$array_data, 'user_id' => $user_id));
        context_complete();

        return $data;
    }
}

if ( ! function_exists('get_client_ip'))
{
    /**
     * 取得使用者的IP資訊
     * @return String
     */
    function get_client_ip()
    {
        $myip = NULL;
        if (empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $myip = $_SERVER['REMOTE_ADDR'];
        } else {
            $myip = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $myip = $myip[0];
        }
        return $myip;
    }
}

if ( ! function_exists('get_client_ip_browser'))
{
    /**
     * 取得使用者的IP資訊與瀏覽器資訊
     * @return String
     */
    function get_client_ip_browser()
    {
        return array(
           'ip' => get_client_ip(),
           'browser' => $_SERVER['HTTP_USER_AGENT']
        );
    }
}

if ( !function_exists("kals_json_encode")) {
    function kals_json_encode($arr)
    {
        if (defined('JSON_UNESCAPED_UNICODE') === TRUE ) {
            //return json_encode($arr, JSON_UNESCAPED_UNICODE);
        }
        
        //convmap since 0x80 char codes so it takes all multibyte codes (above ASCII 127). So such characters are being "hidden" from normal json_encoding
        
        if (is_array($arr)) {
            array_walk_recursive($arr, 
                function (&$item, $key) { 
                    if (is_string($item)) {
                        //$item = mb_encode_numericentity($item, array (0x80, 0xffff, 0, 0xffff), 'UTF-8');
                        mb_convert_encoding($item, 'HTML-ENTITIES', 'utf-8');
                    }
                });
        }
        
        //return mb_decode_numericentity(json_encode($arr), array (0x80, 0xffff, 0, 0xffff), 'UTF-8');
        //return mb_convert_encoding($arr, 'HTML-ENTITIES', 'utf-8');
        $arr = json_encode($arr);
        
        $arr = preg_replace_callback('/\\\\u([0-9a-f]{4})/i',
                        function($matches) {
                            return mb_convert_encoding(pack('H*', $matches[1]), 'UTF-8', 'UTF-16');
                        }, $arr);
        return $arr;
        
        //return mb_convert_encoding($arr, 'HTML-ENTITIES', 'utf-8');
        
        /*
        array_walk_recursive($arr, 
            function (&$item, $key) { 
                if (is_string($item)) {
                    $item = preg_replace_callback('/\\\\u([0-9a-f]{4})/i',
                        function($matches) {
                            return mb_convert_encoding(pack('H*', $matches[1]), 'UTF-8', 'UTF-16');
                        }, $item);
                }
            });
        */
        /*
        array_walk_recursive($arr, function(&$item, $key) {
            if(is_string($item)) {
                $item = htmlentities($item);
            }
        });
         */
        //return json_encode($arr);
    }
}

if ( !function_exists("get_kals_base_url")) {
    
    /**
     * 取得KALS伺服器的根網址
     */
    function get_kals_base_url($path = NULL) {
        $s = &$_SERVER;
        $ssl = (!empty($s['HTTPS']) && $s['HTTPS'] == 'on') ? true:false;
        $sp = strtolower($s['SERVER_PROTOCOL']);
        $protocol = substr($sp, 0, strpos($sp, '/')) . (($ssl) ? 's' : '');
        $port = $s['SERVER_PORT'];
        $port = ((!$ssl && $port=='80') || ($ssl && $port=='443')) ? '' : ':'.$port;
        $host = isset($s['HTTP_X_FORWARDED_HOST']) ? $s['HTTP_X_FORWARDED_HOST'] : isset($s['HTTP_HOST']) ? $s['HTTP_HOST'] : $s['SERVER_NAME'];
        $uri = $protocol . '://' . $host . $port . base_url();
        $segments = explode('?', $uri, 2);
        $url = $segments[0];
        
        if (is_null($path) !== true) {
            if (starts_with($path, '/')) {
                $path = substr($path, 1);
            }
            $url = $url . $path;
        }
        return $url;
    }
 }
 
if ( !function_exists("get_kals_root_path")) {
    
    /**
     * 取得KALS伺服器的根網址
     */
    function get_kals_root_path($path = NULL) {
        $dir = __DIR__;
        $dir_sep = DIRECTORY_SEPARATOR;
        
        $strip_end = 'system'.$dir_sep.'application'.$dir_sep.'helpers'.$dir_sep;
        $dir = substr($dir, 0, (1-strlen($strip_end)));
        
        if (isset($path)) {
            //$detectdir_sep = '/';
            if (DIRECTORY_SEPARATOR == '\\') {
                $path = str_replace('/', DIRECTORY_SEPARATOR, $path);
            }
            
            if (substr($path, 0, 1) == DIRECTORY_SEPARATOR) {
                $path = substr($path, 1);
            }
            
            $dir = $dir . $path;
        }
        
        //test_msg($dir);
        return $dir;
    }
 }
 
  

if ( ! function_exists('kals_log'))
{
    function kals_log($db, $action, $data = array())
    {
        $url = get_referer_url(FALSE);

        $webpage_id = NULL;
        if ($url !== FALSE)
        {
            /*
            $CI =& get_instance();
            if (isset($CI->webpage) == FALSE || is_null($CI->webpage))
                $CI->load->library('kals_resource/Webpage');
            $webpage_id = $CI->webpage->filter_webpage_id($url);
             */
            $webpage_id = get_context_webpage()->get_id();
        }
        
        $user_id = NULL;
        $note = NULL;

        if (is_array($data) && 
                (isset($data['user_id']) || isset($data['memo']) ) ) {
            if (isset($data['user_id'])) {
                $user_id = $data['user_id'];
            }
            if (isset($data['memo']))
            {
                $note = $data['memo'];
                if (is_array($note) || is_object($note))
                {
                    $note = json_encode($note);
                }

                if ($note == '')
                    $note = NULL;
            }
        }
        else {
            if (defined("JSON_UNESCAPED_UNICODE")) {
                $note = json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            else {
                $note = kals_json_encode($data);
            }
        }
        
        if (is_null($user_id)) {
            $user = get_context_user();
            if (isset($user)) {
                $user_id = $user->get_id();
            }
        }
            

        $db->insert('log', array(
            'webpage_id' => $webpage_id,
            'user_id' => $user_id,
            'user_ip' => get_client_ip(),
            'action'=> $action,
            'note'=>$note
        ));
    }
}

/**
 * mobile_log
 * 供Mobile使用的Log記錄檔案
 * @param $this->db, $action, array|$data, webpage_id
 */
if ( ! function_exists('kals_mobile_log'))
{
    function kals_mobile_log($db, $webpage_id, $action, $data = array())
    {
        
       
       /* 不使用get_context_webpage()->get_id()來取webpage_id 
        $url = get_referer_url(FALSE);
        $webpage_id = NULL;
        if ($url !== FALSE)
        {
            
            //$CI =& get_instance();
            //if (isset($CI->webpage) == FALSE || is_null($CI->webpage))
            //    $CI->load->library('kals_resource/Webpage');
            //$webpage_id = $CI->webpage->filter_webpage_id($url);
             
            $webpage_id = get_context_webpage()->get_id();
        }*/
        
        $user_id = NULL;
        $note = NULL;

        if (is_array($data) && 
                (isset($data['user_id']) || isset($data['memo']) ) ) {
            if (isset($data['user_id'])) {
                $user_id = $data['user_id'];
            }
            if (isset($data['memo']))
            {
                $note = $data['memo'];
                if (is_array($note) || is_object($note)) {
                    $note = json_encode($note);
                }

                if ($note === '') {
                    $note = NULL;
                }
            }
        }
        else {
            if (defined("JSON_UNESCAPED_UNICODE")) {
                $note = json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            else {
                $note = kals_json_encode($data);
            }
        }
        
        if (is_null($user_id) || $user_id == '') {
            $user = get_context_user();
            if (isset($user)) {
                $user_id = $user->get_id();
            }
            
            if (is_null($user_id) || $user_id == "") {
                $user_id = NULL;
            }
        }

        $db->insert('log', array(
            'webpage_id' => $webpage_id,
            'user_id' => $user_id,
            'user_ip' => get_client_ip(),
            'action'=> $action,
            'note'=>$note
        ));
    }
}

/* End of file web_apps_helper.php */
/* Location: ./system/application/helpers/web_apps_helper.php */