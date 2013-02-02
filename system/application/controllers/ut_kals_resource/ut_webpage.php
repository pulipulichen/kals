<?php
/**
 * ut_webpage
 *
 * ut_webpage full description.
 *
 * @package		KALS
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/22 下午 02:51:44
 */

class Ut_webpage extends Controller {

    var $url = 'http://www.plurk.com/p/5x1uan#response-1650638188';
    var $title = 'PHP布丁 說 [CODING D4] 目前進度5/182。希望今天能夠打起精神好好地來做！ - #5x1uan';
    var $webpage;
    var $webpages_count = 0;

    function Ut_webpage()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->library('kals_resource/Webpage');

        create_context(TRUE);
    }

    function index()
    {
        //create_context(TRUE);
        $this->create();
        $this->delete();
    }

    function create()
    {
        $url = $this->url;
        $title = $this->title;

        $webpages = $this->webpage->find_all();
        $this->webpages_count = count($webpages);
        $this->unit->run($this->webpages_count
                , 'is_int'
                , '找尋Webpage find_all() 應該是個數值，但不確定是多少');

        $webpage = $this->webpage->create($url);

        $this->unit->run($webpage->get_uri()
                , '/p/5x1uan'
                , '測試URI');

        $this->unit->run($webpage->get_url()
                , 'http://www.plurk.com/p/5x1uan'
                , '測試URI');

        $this->unit->run($webpage->get_title()
                , $title
                , '測試標題');

        $webpage2 = $this->webpage->find(array('url' => $url));
        
        $this->unit->run($webpage2->get_url()
                , 'http://www.plurk.com/p/5x1uan'
                , 'find之後，測試URL');
        
        $this->unit->run($webpage2->get_title()
                , $title
                , 'find之後，測試Title');

        $domain = $webpage->get_domain();
        $this->unit->run($domain->get_host()
                , 'http://www.plurk.com/'
                , '測試Parent Domain');

        $webpages = $this->webpage->find_all();
        $this->unit->run((count($webpages) > 0)
                , TRUE
                , '測試取得所有Webpage');

//        $domain2 = $webpage->get_domain();
//        $deleted = FALSE;
//        try
//        {
//            $domain2->delete();
//            $deleted = TRUE;
//        }
//        catch (Exception $e) { }
//        $this->unit->run($deleted
//                , TRUE
//                , '看看有沒有防止刪除的機制出現');

    }

    function delete()
    {
        $url = $this->url;
        $title = $this->title;

        $webpage = $this->webpage->find('url', $url);

        $webpages = $this->webpage->find_all();
        $count_webpages = count($webpages);
        $this->unit->run($count_webpages
                , 'is_int'
                , '刪除webpage之前，剩下的個數');


        $webpage->delete();
        $this->unit->run($webpage->get_id()
                , NULL
                , '刪除webpage之後，ID是否還在？');

        $webpage2 = $this->webpage->find('url', $url);
        $this->unit->run(is_object($webpage2)
                , FALSE
                , '刪除webpage之後，是否還能找得到？');


        $webpages = $this->webpage->find_all();
        $this->unit->run(count($webpages)
                , $count_webpages - 1
                , '刪除webpage之後，剩下的個數');

        unit_test_report($this);
    }
}


/* End of file ut_webpage.php */
/* Location: ./system/application/helpers/ut_webpage.php */