<?php
/**
 * ${name}
 *
 * ${name} full description.
 *
 * @package		KALS
 * @category		Unit Tests
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 ${date} ${time}
 */
class ${name} extends Controller {

    function __construct()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');

        create_context(TRUE);
        $this->unit->set_benchmark('Construc Complete');
    }

    function index()
    {

        $this->unit->run($test_result
                , $expected_result
                , $test_name);

//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        //context_complete();
        unit_test_report($this, __METHOD__);
    }
}
/* End of file ${name}.php */
/* Location: ./system/application/controllers/ut_.../${name}.php */