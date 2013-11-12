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

if ( !function_exists("get_kals_base_url")) {
    
    /**
     * 取得KALS伺服器的根網址
     */
    function get_kals_base_url() {
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
        return $url;
    }
 }

if ( ! function_exists('kals_log'))
{
    /**
     * 記錄
     * 
     * @param {CI_Database} $db 資料庫
     * @param {Int} $action 動作編號，參考資料如下
     * @param {String|JSON} $data 把額外要記錄的屬性以JSON保存
     * 
     * $action參數列表
     * 1=檢查登入成功	//記得要取得瀏覽器資料
     * 2=檢查登入失敗
     * 3=輸入登入成功
     * 4=輸入登入失敗
     * 5=內嵌登入成功
     * 6=內嵌登入失敗
     * 7=登出
     * 8=註冊成功
     * 9=註冊失敗
     * 10=變更帳戶
     * 11=變更密碼
     * 12=瀏覽標註: 範圍
     * 13=標註沒有建議:type;note
     * 14=新增標註具有建議:type;note;recommend_id
     * 15=修改標註:type:note
     * 16=瀏覽討論
     * 17=未登入者瀏覽
     * 18=未登入者瀏覽討論
     * 19=刪除標註:annotation_id
     * 20=新增回應標註:type;topic_id;respond_id_list;note
     * 21=修改回應標註:type;topic_id;respond_id_list;note
     * 22=加入喜愛清單:被喜愛的annotation_id
     * 23=移除喜愛清單:被移除的annotation_id
     * 24=接受建議，沒有推薦:recommend_id
     * 25=接受建議，有推薦:recommend_id
     * 26=拒絕建議:recommend_id
     * 27=發生錯誤:錯誤內容
     * 28=查看說明
     * 29=寄送意見回饋
     * 30=點選文章結構地圖:章節標題內文,heading tag(如h1)
     */
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