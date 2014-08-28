<?php
/**
 * ut_tutor
 *
 * ut_tutor full description.
 *
 * @package		KALS
 * @category		Unit Tests
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/18 下午 05:35:34
 */
class ut_tutor extends Controller {

    private $url = 'http://www.plurk.com/p/6esun8#response-1800111973';

    function __construct()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');

        $this->load->library('kals_resource/Annotation');
        $this->load->library('kals_resource/Webpage');
        $this->load->library('recommend/Annotation_recommend');

        create_context(TRUE);
        $this->unit->set_benchmark('Construc Complete');
    }

    function index()
    {
        $url = $this->url;
        $webpage = $this->webpage->create($url);
        $tutor = $webpage->get_tutor();

        $annotation = new Annotation(1017);

        $user = $annotation->get_user();
        $unread_count = $user->get_unread_notification_count();
        $this->unit->run($unread_count
                , 'is_int'
                , '先看一下user的未讀通知有幾封');

        $tutor->setup_recommend($annotation);

        $recommend = $annotation->get_recommend();
        
        $this->unit->run($recommend->get_id()
                , 'is_int'
                , '有取得建議');

        $recommend_annotation = $recommend->get_recommend_by();

        $this->unit->run($recommend_annotation
                , NULL
                , '沒有推薦標註');

        $tips = $recommend->get_tips_text_array();
        $this->unit->run_false(count($tips)
                , 0
                , '有建議');

        //------------------------------------------------

        $recommend_annotation = new Annotation(783);
        $recommend_annotation->set_score(0, 3);
        $recommend_annotation->update();

        $scope = new Annotation_scope(129);
        $recommend_scope = new Annotation_scope_collection();
        $recommend_scope->add_scope($scope);

        $annotation->set_recommend_scopes($recommend_scope);

        $tutor->setup_recommend($annotation);

        $recommend->reload();
        $recommend_annotation = $recommend->get_recommend_by();
        $this->unit->run($recommend_annotation->get_id()
                , 783
                , '有找到推薦標註');

        $this->unit->run($user->get_unread_notification_count(TRUE)
                , $unread_count + 2
                , '因為新增了兩次推薦，所以應該有兩封通知？');

//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        //context_complete();
        unit_test_report($this, __METHOD__);
    }
}
/* End of file ut_tutor.php */
/* Location: ./system/application/controllers/ut_.../ut_tutor.php */