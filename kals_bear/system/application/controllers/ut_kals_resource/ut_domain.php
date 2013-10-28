<?php
/**
 * Ut_domain
 *
 * Unit test for domain.
 * 
 * @package		KALS
 * @category		Unit_test
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/19 下午 04:42:04
 */
class Ut_domain extends Controller {

    function Ut_domain()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->helper('cookie');
    }

    function index()
    {
//        $url = 'http://www.lib.nccu.edu.tw/?m=1109&sn=54&id=92&mm=1101';
//        $host = 'http://www.lib.nccu.edu.tw/';
//        $title = '政治大學圖書館網站';
        $url = 'http://pulipuli.blogspot.com/2010/07/2010711.html';
        $host = 'http://pulipuli.blogspot.com/';
        $title = '布丁布丁吃&#65311;';

        
        //以下才是正是的測試開始

        create_context(TRUE);

        $this->load->library('kals_resource/Domain');

        $domain2 = new Domain();
        $domain2->set_field('url', $url);
        $domain2->update();

        $this->unit->run($domain2->get_field("url"),
                $host,
                '以new建立domain2，測試get_field("url")');


        $domain = $this->domain->create($url);
        $domain_id = $domain->get_id();

        $this->unit->run($domain_id,
                'is_int',
                '用ctreate()來建立Domain，看看是否有id');


        $test_domain = $this->domain->create($url);
        $test_domain_id = $test_domain->get_id();
        //echo $test_domain_id;

        $this->unit->run($test_domain->get_field("url"),
                $host,
                '測試get_host');

        $this->unit->run(($domain_id != NULL),
                TRUE,
                '測試test_domain是不是真的find到domain');

        $this->unit->run($domain_id,
                $test_domain_id,
                '測試test_domain是不是真的find到domain');

        $this->unit->run($test_domain->get_id()
                , $domain_id
                ,'用ctreate()以同樣的url來建立Domain，看看是否有id');
        $this->unit->run($test_domain->get_field('title'),
                $title,
                '再建立時，是否就能找到title？');

        $id = $test_domain->get_id();
        $test_domain = new Domain($id);

        $this->unit->run(($test_domain->get_id() != NULL),
                TRUE,
                '測試用id來find Domain');

        $this->unit->run($test_domain->get_field('url'),
                $host,
                '測試用id來find Domain 測試get_host');


        $this->unit->run($test_domain->get_field('title'),
                $title,
                '測試title');

        $domains = $this->domain->find_all();
        $this->unit->run((count($domains) > 0 ),
                TRUE,
                '測試find_all是否有找到東西');

        $domains = $this->domain->find_all(array('domain_id' => $id));
        $this->unit->run(count($domains),
                1,
                '測試find_all加上條件，是否能找到測試時建立的domain');

        $this->unit->run($domains[0]->get_id(),
                $id,
                '測試find_all中能不能get_id()');

        $this->unit->run($domains[0]->get_host(),
                $host,
                '測試find_all中能不能get_host()');

        $test_domain->delete();
        $this->unit->run($test_domain->get_id(),
                NULL,
                '測試刪除之後，Domain ID還在不在這件事情');

        $domain_deleted = $this->domain->find($url);
        $this->unit->run($domain_deleted,
                NULL
                , '測試刪除之後，Domain還能不能找到這件事情');

        //context_complete();
        //context_abort();

        unit_test_report($this);


        //destory_context();
    }
}

/* End of file ut_domain.php */
/* Location: ./system/application/controllers/ut_kals_resource/ut_domain.php */