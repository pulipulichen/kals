<?php
/**
 * ut_output_lang_var
 *
 * ut_output_lang_var full description.
 *
 * @package		KALS
 * @category		Unit Tests
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/12 上午 12:00:35
 * @property Output_language_variable_collection $coll
 */
class ut_output_lang_var extends Controller {

    private $coll;

    function __construct()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->library('fuzzy/Output_language_variable_collection');
        $this->coll = $this->output_language_variable_collection;

        create_context(TRUE);
        $this->unit->set_benchmark('Construc Complete');
    }

    function index()
    {
        //U* = (0.19*1 + 0.6*2 + 0.21*3) / (0.19 + 0.6 + 0.21)
        //   = 2.02 / 1
        //   = 1
        
        $coll = $this->coll;
        
        $this->unit->run($coll->length()
                , 3
                , '先看看有沒有三個變數');

        $this->unit->run($coll->get_membership(1)
                , 0
                , '取得type_id=1的membership，沒設定之前預設為0');

        $coll->set_memberships(array(0.19, 0.6, 0.21));

        //$coll->set_membership(0, 0.19);

        $this->unit->run($coll->get_membership(0)
                , 0.19
                , '設定type_id=1的membership並測試');

        //$coll->set_membership(1, 0.6);
        //$coll->set_membership(2, 0.21);

        $this->unit->run($coll->get_defuzzy_code()
                , 2.02
                , '測試重心法輸出fuzzy_code');

//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        //context_complete();
        unit_test_report($this);
    }
}
/* End of file ut_output_lang_var.php */
/* Location: ./system/application/controllers/ut_.../ut_output_lang_var.php */