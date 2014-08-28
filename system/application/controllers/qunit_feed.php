<?php
/**
 * qunit_feed
 *
 * qunit_feed full description.
 *
 * @package		KALS
 * @category		Unit Tests
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 下午 03:49:11
 */
class qunit_feed extends Controller {

    function __construct()
    {
        parent::Controller();
        $this->load->helper('web_apps');
    }

    function index($json, $callback)
    {
        //echo $callback."({result: 'ok'})";
        //$json = json_encode($json); // 利用 PHP(5) 內建的 json_encode 將資料轉成 json 格式
        //echo urldecode($json).'<br />';
        $ary = null;
        $ary = json_to_object($json);
        //$ary = json_decode($json);
        
        $data = array(
            'foo' => $ary->value,
            'bar' => 'ABCDEFG',
            'baz' => array(52, 97)
        );

        $json = '{
  "foo": "The quick brown fox jumps over the lazy dog.",
  "bar": "ABCDEFG",
  "baz": [52, 97]
}';

        display_jsonp($callback, $data);
        
//
//        //$pos = stripos($_SERVER['QUERY_STRING'], '='); // 取得 = 號的位置
//        $pos = stripos($a, '='); // 取得 = 號的位置
//        //$jsonp = ($pos === false) ?  '' : substr($_SERVER['QUERY_STRING'], $pos+1);  // 擷取 = 後面的字串
//        $jsonp = ($pos === false) ?  '' : substr($a, $pos+1);  // 擷取 = 後面的字串
//        echo "{$jsonp}({$json})"; // 輸出

        /*
        ?>{
  "foo": "The quick brown fox jumps over the lazy dog.",
  "bar": "ABCDEFG",
  "baz": [52, 97]
}<?php
         */
    }
}
/* End of file qunit_feed.php */
/* Location: ./system/application/controllers/ut_.../qunit_feed.php */