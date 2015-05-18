<?php
/**
 * ut_scope_collection
 *
 * ut_scope_collection full description.
 *
 * @package		KALS
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/5 下午 08:17:43
 * @property Annotation_scope $scope
 * @property Annotation_scope_collection $coll
 *
 */
class Ut_scope_collection extends Controller {

    var $scope;
    var $coll;

    function __construct()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->library('scope/Annotation_scope');
        $this->load->library('scope/Annotation_scope_collection');
        $this->scope = $this->annotation_scope;
        $this->coll = $this->annotation_scope_collection;
        create_context(TRUE);
        $this->unit->set_benchmark('First Unit Test');
    }

    function index()
    {
        $scope1 = $this->scope->create_scope(0, 2);
        $scope2 = $this->scope->create_scope(6, 9);

        $coll = new Annotation_scope_collection();

        $coll->set_scopes($scope1);
        $this->unit->run($coll->get_scope_length()
                , 3
                , "set_scopes 0~2之後測試get_scope_length()");

        $coll->set_scopes($scope2);
        $this->unit->run($coll->get_scope_length()
                , 4
                , "set_scopes 6~9之後測試get_scope_length()");

        $coll->add_scope($scope1);
        $this->unit->run($coll->get_scope_length()
                , 7
                , "add_scopes 0~2之後測試get_scope_length() (0~2 6~9)");
        $this->unit->run($coll->length()
                , 2
                , "add_scopes 0~2之後測試get_scopes() (0~2 6~9)");

        $scope3 = $this->scope->create_scope(5, 7);

        $coll->add_scope($scope3);

        $this->unit->run($coll->get_scope_length()
                , 8
                , "add_scopes 5~7之後測試get_scope_length() (0~2 5~9)");
        $this->unit->run($coll->length()
                , 2
                , "add_scopes 5~7之後測試get_scopes() (0~2 5~9)");

        $scope = $this->scope->create_scope(3, 4);
        $coll->exclude_scope($scope);
        $this->unit->run($coll->get_scope_length()
                , 8
                , "exclude_scopes 3~4之後測試get_scope_length() (0~2 5~9)");
        $this->unit->run($coll->length()
                , 2
                , "exclude_scopes 3~4之後測試get_scopes() (0~2 5~9)");


        $scope = $this->scope->create_scope(4, 5);
        $coll->exclude_scope($scope);
        $this->unit->run($coll->get_scope_length()
                , 7
                , "exclude_scopes 4~5之後測試get_scope_length() (0~2 6~9)");
        $this->unit->run($coll->length()
                , 2
                , "exclude_scopes 3~4之後測試get_scopes() (0~2 6~9)");

        $scope = $this->scope->create_scope(7, 8);
        $coll->exclude_scope($scope);
        $this->unit->run($coll->get_scope_length()
                , 5
                , "exclude_scopes 7~8之後測試get_scope_length() (0~2 6 9)");
        $this->unit->run($coll->length()
                , 3
                , "exclude_scopes 7~8之後測試get_scopes() (0~2 6 9)");

        //來測試foreach吧！！
        foreach ($coll AS $key => $scope)
        {
            $this->unit->run_false($scope->get_length()
                , 999
                , "測試foreach，看scope ".$key." 是否都有正確底顯示");
        }

//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        unit_test_report($this);
    }

    function webpage()
    {
        $scope1 = $this->scope->create_scope(0, 2);
        $scope2 = $this->scope->create_scope(6, 9);

        $url = 'http://www.plurk.com/p/6cz3zb';
        $text = '雖然感覺上70/182的進度大有嶄進，但是之前寫好的一些仍有問題，要想辦法做測試才行。
';
        $scope_another = $this->scope->create_scope(1, 7, $text, $url);

        $coll = new Annotation_scope_collection();

        $coll->add_scope($scope1);
        $this->unit->run($coll->get_scope_length()
                , 3
                , "set_scopes 0~2之後測試get_scope_length()");

        $coll->add_scope($scope2);
        $this->unit->run($coll->get_scope_length()
                , 7
                , "set_scopes 6~9之後測試get_scope_length()");

        $coll->add_scope($scope_another);
        $this->unit->run($coll->get_scope_length()
                , 14
                , "set_scopes 1~7 another webpage之後測試get_scope_length()");
        $this->unit->run($coll->length()
                , 3
                , "set_scopes 1~7 another webpage之後測試length()");

        unit_test_report($this);
    }
}
/* End of file ut_scope_collection.php */
/* Location: ./system/application/controllers/ut_.../ut_scope_collection.php */