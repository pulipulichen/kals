<?php
/**
 * Ut_action
 *
 * @package		KALS
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/25 下午 05:41:21
 * @property Action_factory $action_factory
 */

class Ut_action extends Controller {

    var $action1_id = 4;
    var $action1_lang = 'action.webpage.recommend_show';

    var $action2_id = 5;
    var $action2_type_id = '3';

    var $action3_id = 1;

    function Ut_action()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->library('policy/Action_factory');
    }

    function index()
    {
        $action = $this->action_factory->check($this->action1_id);

        $this->unit->run($action->get_lang()
                , $this->action1_lang
                , '讀取action1的lang看看');


        $this->load->library('kals_resource/Webpage');
        $webpage = $this->webpage;
        $this->load->library('kals_resource/Domain');
        $domain = $this->domain;
        $this->unit->run($action->is_applicable($webpage)
                , TRUE
                , '測試action2的is_applicable Webpage');
        $this->unit->run($action->is_applicable($domain)
                , FALSE
                , '測試action2的is_applicable Domain');
        
        $action = $this->action_factory->check($this->action2_id);

        $this->unit->run($action->get_applicable_id()
                , $this->action2_type_id
                , '讀取action2的applicable_id看看');

        $action = $this->action_factory->check($this->action3_id);
        
        $this->unit->run($action->get_id()
                , $this->action3_id
                , '讀取action3的id看看');

        $this->unit->run($action->is_applicable($domain)
                , TRUE
                , '測試action3的is_applicable Domain');
        $this->unit->run($action->is_applicable($webpage)
                , FALSE
                , '測試action3的is_applicable Webpage');

        $actions = $this->action_factory->find_all();
        $this->unit->run(count($actions)
                , 5
                , 'find_all');

        $actions = $this->action_factory->find_all($webpage);
        $this->unit->run(count($actions)
                , 3
                , 'find_all webpage');
        
//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        unit_test_report($this);
    }
}


/* End of file ut_action.php */
/* Location: ./system/application/controller/ut_policy/ut_action.php */