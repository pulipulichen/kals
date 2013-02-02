<?php
/**
 * Ut_type
 *
 * 標註類型的單元測試
 *
 * @package		KALS
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/6 下午 09:18:38
 * @property Annotation_type_factory $factory
 */
class ut_type extends Controller {

    private $factory;

    function __construct()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->library('type/Annotation_type_factory');
        $this->factory = $this->annotation_type_factory;
        create_context(TRUE);
    }

    function index()
    {
        $name = 'annotation.type.confusion';
        $type_id = 3;

        $type = $this->factory->create($name);
        $this->unit->run($type->get_name()
                , $name
                , '以$name create()，測試get_name()');
        $this->unit->run($type->get_type_id()
                , $type_id
                , '以$name create()，測試get_type_id()');

        $name = 'annotation.type.custom';
        $type_id = 7;

        $type = $this->factory->create($type_id);
        $this->unit->run($type->get_name()
                , $name
                , '以$type_id create()，測試get_name()');
        $this->unit->run($type->get_type_id()
                , $type_id
                , '以$type_id create()，測試get_type_id()');

        $types = $this->factory->get_total_types();
        $this->unit->run(count($types)
                , 7
                , '測試get_total_types');
        $this->unit->run($types[1]->get_name()
                , 'annotation.type.importance'
                , '測試get_total_types後的get_name()');
        $this->unit->run($types[2]->get_name()
                , 'annotation.type.question'
                , '測試get_total_types後的get_name()');
        $this->unit->run($types[6]->get_type_id()
                , 6
                , '測試get_total_types後的get_type_id()');
        $this->unit->run($types[3]->get_type_id()
                , 3
                , '測試get_total_types後的$types[3] get_type_id()');
        $this->unit->run($types[5]->get_type_id()
                , 5
                , '測試get_total_types後的get_type_id()');

//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        unit_test_report($this);
    }
}
/* End of file ut_type.php */
/* Location: ./system/application/controllers/ut_.../ut_type.php */