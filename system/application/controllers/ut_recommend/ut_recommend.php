<?php
/**
 * ut_recommend
 *
 * ut_recommend full description.
 *
 * @package		KALS
 * @category		Unit Tests
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/18 下午 01:57:03
 */
class ut_recommend extends Controller {

    function __construct()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->library('kals_resource/Annotation');
        $this->load->library('recommend/Annotation_recommend');

        create_context(TRUE);
        $this->unit->set_benchmark('Construc Complete');
    }

    function index()
    {
        $url = 'http://www.plurk.com/p/6esun8#response-1799208331';

        $annotation = $this->annotation->find('annotation_id', 1017);
        $this->unit->run($annotation->get_id()
                , 1017
                , '接受推薦之前，原本的標註還在');

        $annotation = new Annotation(1017);
        $original_annotation_id = $annotation->get_id();
        $original_note = $annotation->get_note();
        $recommend_annotation = new Annotation(783);

        $recommend = new Annotation_recommend();
        $recommend->set_webpage($url);
        $recommend->set_recommended($annotation);
        $recommend->set_recommend_by($recommend_annotation);
        $recommend->update();

        $this->unit->run($recommend->get_id()
                , 'is_int'
                , '確認recommend有儲存進去');

        $annotation = new Annotation(1017);
        $recommend = $annotation->get_recommend();
        $this->unit->run($recommend->get_id()
                , 'is_int'
                , '能從annotation中取得recommend嗎？');
        $this->unit->run($recommend->get_recommend_by()->get_id()
                , $recommend_annotation->get_id()
                , '從recommend中取出的recommend_by，跟先前推薦的一樣嗎？');

        $tips = $recommend->get_tips_text_array();
        $this->unit->run(count($tips)
                , 'is_int'
                , '從recommend中取出的get_tips_text_array()，有提示嗎？');
        foreach ($tips AS $key => $tip)
        {
            $this->unit->run($tip
                , 'is_string'
                , '從recommend中取出的get_tips_text_array()，看一下第'.$key.'個提示');
        }

        //-----------------------------------------------

        $length = $annotation->get_scope_length();
        $recommend_length = $recommend_annotation->get_scope_length();

        $this->unit->run_false($length
                , $recommend_length
                , '測試看看，標註跟推薦標註兩個的長度應該不一樣才對');

        $recommend = $annotation->get_recommend();
        $annotation = $recommend->set_accept(TRUE);

        $length = $annotation->get_scope_length();
        $this->unit->run($length
                , $recommend_length
                , '接受推薦之後，標註跟推薦標註兩個的長度應該一樣才對');
        $this->unit->run_false($annotation->get_id()
                , $original_annotation_id
                , '接受推薦之後，這個標註應該跟上面的不一樣');
        $this->unit->run_false($annotation->get_score(0)->get_score().''
                , '0'
                , '接受推薦之後，修改過後的標註應該有分數？');
        $this->unit->run($annotation->get_note()
                , $original_note
                , '接受推薦之後，修改過後的標註應該有原本的筆記？');


        $recommend = $annotation->get_recommend();
        $this->unit->run($recommend
                , NULL
                , '接受推薦之後，標註就沒有推薦了');
        
        $annotation = $this->annotation->find('annotation_id', 1017);
        $this->unit->run($annotation
                , NULL
                , '接受推薦之後，原本的標註就被刪掉了才對');


//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        //context_complete();
        unit_test_report($this, __METHOD__);
    }

    public function no_recommend()
    {
                $url = 'http://www.plurk.com/p/6esun8#response-1799208331';

        $annotation = $this->annotation->find('annotation_id', 1017);

        $annotation = new Annotation(1017);
        $original_annotation_id = $annotation->get_id();

        $recommend = new Annotation_recommend();
        $recommend->set_webpage($url);
        $recommend->set_recommended($annotation);
        $recommend->update();
        $annotation = new Annotation(1017);
        $recommend = $annotation->get_recommend();


        //-----------------------------------------------

        $length = $annotation->get_scope_length();

        $recommend = $annotation->get_recommend();
        $annotation = $recommend->set_accept(TRUE);

        $length = $annotation->get_scope_length();
        $this->unit->run($annotation->get_scope_length()
                , $length
                , '接受推薦之後，由於並沒有改變標註，所以長度還是一樣');
        $this->unit->run($annotation->get_id()
                , $original_annotation_id
                , '接受推薦之後，這個標註應該跟上面的一樣');

        $recommend = $annotation->get_recommend();
        $this->unit->run($recommend
                , NULL
                , '接受推薦之後，標註就沒有推薦了');

        $annotation = $this->annotation->find('annotation_id', 1017);
        $this->unit->run($annotation->get_id()
                , 'is_int'
                , '接受推薦之後，原本的標註仍在');


//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        //context_complete();
        unit_test_report($this, __METHOD__);
    }

    public function not_accept()
    {
                $url = 'http://www.plurk.com/p/6esun8#response-1799208331';

        $annotation = $this->annotation->find('annotation_id', 1017);

        $annotation = new Annotation(1017);
        $original_annotation_id = $annotation->get_id();

        $recommend = new Annotation_recommend();
        $recommend->set_webpage($url);
        $recommend->set_recommended($annotation);
        $recommend->update();

        $annotation = new Annotation(1017);
        $recommend = $annotation->get_recommend();

        //-----------------------------------------------

        $length = $annotation->get_scope_length();

        $recommend = $annotation->get_recommend();
        $annotation = $recommend->set_accept(FALSE);

        $length = $annotation->get_scope_length();
        $this->unit->run($annotation->get_scope_length()
                , $length
                , '拒絕推薦之後，由於並沒有改變標註，所以長度還是一樣');
        $this->unit->run($annotation->get_id()
                , $original_annotation_id
                , '拒絕推薦之後，這個標註應該跟上面的一樣');

        $recommend = $annotation->get_recommend();
        $this->unit->run($recommend
                , NULL
                , '拒絕推薦之後，標註就沒有推薦了');

        $annotation = $this->annotation->find('annotation_id', 1017);
        $this->unit->run($annotation->get_id()
                , 'is_int'
                , '拒絕推薦之後，原本的標註仍在');


//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        //context_complete();
        unit_test_report($this, __METHOD__);
    }
}
/* End of file ut_recommend.php */
/* Location: ./system/application/controllers/ut_.../ut_recommend.php */