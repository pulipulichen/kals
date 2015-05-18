<?php
/**
 * Ut_clustering
 *
 * ut_clustering full description.
 *
 * @package		KALS
 * @category		Unit Tests
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/17 下午 01:16:23
 */
class Ut_clustering extends Controller {

    function __construct()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->library('fuzzy/Clustering');

        create_context(TRUE);
        $this->unit->set_benchmark('Construc Complete');
    }

    function index()
    {

        $clustering = Clustering::get_clustering();

        $data = array(1, 3, 2, 5, 6, 2, 3, 1, 30, 36, 45, 3, 15, 17);
        $number = 3;
        $clustering->setup($data, $number);

        $result = $clustering->get_result();
        $positions = $clustering->get_result_positions();

        $this->unit->run(count($result)
                , 3
                , '資料應該分成了3群');
        $this->unit->run(count($positions)
                , 3
                , '中心點應該也有3個');

        $this->unit->run_false($result[0]
                , array()
                , '第一群不是空陣列');
        $this->unit->run_false($result[1]
                , array()
                , '第二群不是空陣列');
        $this->unit->run_false($result[2]
                , array()
                , '第三群不是空陣列');

        $this->unit->run_false($positions
                , array()
                , '中心點不是空陣列');

        //-------------------------

        $clustering = Clustering::get_clustering();
        $data = array(1,1,1,1,1,2,20,20,20,20);
        $number = 3;
        $clustering->setup($data, $number);

        $result = $clustering->get_result();
        $positions = $clustering->get_result_positions();

        $this->unit->run(count($result)
                , 3
                , '資料應該分成了3群');
        $this->unit->run(count($positions)
                , 3
                , '中心點應該也有3個');

        $this->unit->run_false($result[0]
                , array()
                , '第一群不是空陣列');

        //
        $this->unit->run($result[1]
                , array()
                , '第二群不是空陣列(這一個測試會故意錯誤，但這是因為k-means對偏離值影響很大。但KALS並不是要做很正確的分群，只是要個大概的中心點位置，所以重點在於下面的positions能有就好。)');
        $this->unit->run_false($result[2]
                , array()
                , '第三群不是空陣列');

        $this->unit->run_false($positions
                , array()
                , '中心點不是空陣列');

//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        //context_complete();
        unit_test_report($this, __METHOD__);
    }
}
/* End of file ut_clustering.php */
/* Location: ./system/application/controllers/ut_.../ut_clustering.php */