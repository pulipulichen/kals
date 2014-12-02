<?php
/**
 * ut_scope
 *
 * ut_scope full description.
 *
 * @package		KALS
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/5 上午 11:38:52
 */
class Ut_scope extends Controller {

    function  __construct()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->library('scope/Annotation_scope');
        create_context(TRUE);
    }

    function index()
    {
        $url = 'http://www.plurk.com/p/666n0u#response-1725369556';
        $from_index = 2;
        $to_index = 18;
        $from_index2 = 3;
        $to_index2 = 19;
        $text = '[CODING D15] 嗯，今天乖乖地集中在一串。';
        $seg = '[/PARENTHESISCATEGORY CODING/FW D/FW 15/DET ]/PARENTHESISCATEGORY 嗯/T ，/COMMACATEGORY 今天/N 乖乖/Vi 地/T 集中/Vt 在/P 一/DET 串/M 。/PERIODCATEGORY';
        
        $scope = $this->annotation_scope->create_scope($from_index, $to_index, $text, $url);

        $scope_id = $scope->get_id();

        $this->unit->run($scope_id
                , 'is_int'
                , '測試create_scope()是否有正確地建立');

        $index = $scope->get_index();
        
        $this->unit->run($index['from']
                , $from_index
                , '測試get_index()的from');
        $this->unit->run($index['to']
                , $to_index
                , '測試get_index()的to');

        $at = $scope->get_anchor_text();
        $at_id = $at->get_id();

        $this->unit->run(is_int($at_id)
                , TRUE
                , '測試get_anchor_text()是否有正確地建立');
        $this->unit->run($at->get_text()
                , $text
                , '測試get_anchor_text()的text是否正確');
        $this->unit->run($at->get_segment()
                , $seg
                , '測試get_anchor_text()的segment是否正確');

        $scope2 = $this->annotation_scope->create_scope($from_index, $to_index, $text, $url);
        $this->unit->run($scope2->get_id()
                , $scope_id
                , '測試create_scope() 同樣資料是否能建立相同的ID');

        $scope3 = $this->annotation_scope->create_scope($to_index, $from_index, $text, $url);
        $this->unit->run($scope3->get_id()
                , $scope_id
                , '測試create_scope() index相反是否能建立相同的ID');

        $index = $scope3->get_index();

        $this->unit->run($index['from']
                , $from_index
                , '測試scope3 get_index()的from');

        $scope4 = $this->annotation_scope->create_scope($to_index2, $from_index2, $text, $url);

        $this->unit->run_false($scope4->get_id()
                , $scope_id
                , 'scope4 測試create_scope() index不同且相反是否能建立不相同的ID');

        $index = $scope4->get_index();

        $this->unit->run($index['from']
                , $from_index2
                , '測試scope4 get_index()的from');

        $this->unit->run($index['to']
                , $to_index2
                , '測試scope4 get_index()的to');
//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        unit_test_report($this);
    }
}
/* End of file ut_scope.php */
/* Location: ./system/application/controllers/ut_.../ut_scope.php */