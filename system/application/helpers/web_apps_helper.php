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
        return json_decode($json);
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
        $memo = NULL;

        if (isset($data['user_id']))
            $user_id = $data['user_id'];
        if (isset($data['memo']))
        {
            $memo = $data['memo'];
            if (is_array($memo) || is_object($memo))
            {
                $memo = json_encode($memo);
            }

            if ($memo == '')
                $memo = NULL;
        }

        $db->insert('log', array(
            'webpage_id' => $webpage_id,
            'user_id' => $user_id,
            'user_ip' => get_client_ip(),
            'action'=> $action,
            'note'=>$memo
        ));
    }
}

/* End of file web_apps_helper.php */
/* Location: ./system/application/helpers/web_apps_helper.php */