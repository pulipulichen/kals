<?php
/**
 * ut_kals_helper
 *
 * 測試kals_helper
 * 
 * @package		KALS
 * @category		Unit_test
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/18 下午 10:29:30
 */
class Ut_kals_helper extends Controller {

    var $url = 'http://localhost/CodeIgniter_1.7.2/unit_test';
    var $host;

    function  __construct() {
        parent::__construct();
        $this->load->helper('url');
        $this->url = site_url("unit_test");
        $this->host = 'http://'. $_SERVER["HTTP_HOST"] .'/';
    }

    function index()
    {
        $this->load->helper('url');
        redirect('ut_misc/ut_kals_helper/test', 'refresh');
        $this->url = site_url("ut_misc/ut_kals_helper");
        
    }

    function test()
    {
        $this->load->library('unit_test');

        //$test = 1 + 1;
        //$expected_result = 2;
        //$test_name = 'Adds one plus one';
        //$this->unit->run($test, $expected_result, $test_name);

        $this->load->helper('kals');

        $this->unit->run(get_referer_url(),
                'http://localhost/CodeIgniter_1.7.2/unit_test',
                '取得參考的網址！'. get_referer_url());

        $this->unit->run(parse_host(get_referer_url()),
                $this->host,
                '取得參考的HOST！'.parse_host());
        $this->unit->run(parse_uri('http://localhost/CodeIgniter_1.7.2/index.php/ut_misc/ut_kals_helper/test'),
                '/CodeIgniter_1.7.2/index.php/ut_misc/ut_kals_helper/test',
                '取得參考的URI！'.parse_uri());
        
        $this->unit->run(url_is_link('http://images.plurk.com/1422855_79bdc93f1317c2a7b8c9f0c5d51586c9.jpg'),
                TRUE,
                '確認是否是連結');

        $this->unit->run(url_is_image('http://images.plurk.com/1422855_79bdc93f1317c2a7b8c9f0c5d51586c9.jpg'),
                TRUE,
                '確認是否是圖片');

        $this->unit->run(url_is_link('http://www.plurk.com/p/5u89gi#response-1629050986'),
                TRUE,
                '確認是否是連結');

        $this->unit->run(url_is_image('http://www.plurk.com/p/5u89gi#response-1629050986'),
                FALSE,
                '確認是否是圖片');
        $this->unit->run(parse_email_name('puddingchen.35@gmail.com'),
                'puddingchen.35',
                '取出email的名字');

        $this->unit->run(retrieve_title('http://www.plurk.com/p/5uuz7o#response-1632175301'),
                'JS布丁 正在 [CODING D2] http://www.youtube.com/watch?v=c8I_WPonFHE  進度:2/182 - #5uuz7o',
                //'PHP布丁 正在 [CODING D2] http://www.youtube.com/watch?v=c8I_WPonFHE  進度:2/182 - #5uuz7o',
                '取得網頁的title');
        
        $data = array(
            'title' => get_class($this),
            'unit' => $this->unit
        );
        $this->load->view('misc/unit_test', $data);
    }
}

/* End of file ut_kals_helper.php */
/* Location: ./system/application/controllers/test/ut_kals_helper.php */