<?php
/**
 * Ut_search
 *
 * Ut_search full description.
 *
 * @package		KALS
 * @category		Unit Tests
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/14 下午 12:52:33
 * @property Webpage $webpage
 * @property Annotation $annotation
 * @property User $user
 * @property Annotation_scope $annotation_scope
 * @property Search_annotation_collection $search_annotation_collection
 * @property Search_annotation_id_collection $search_annotation_id_collection
 * @property Search_scope_collection $search_scope_collection
 */
class Ut_search extends Controller {

    function __construct()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->library('kals_resource/Annotation');
        $this->load->library('kals_resource/Webpage');
        $this->load->library('kals_actor/User');
        $this->load->library('kals_actor/Group');
        $this->load->library('scope/Annotation_scope');
        $this->load->library('policy/Authorize_manager');

        $this->load->library('search/Search_annotation_collection');
        $this->load->library('search/Search_annotation_id_collection');
        $this->load->library('search/Search_annotation_user_collection');
        $this->load->library('search/Search_scope_collection');
        
        $this->unit->set_benchmark('Construc Complete');
    }

    function index()
    {
        create_context(TRUE);
        $this->search_without_context();
    }

    function search_without_context()
    {
        $user_found = new User(225);
        $user_not_found = new User(9999);
        $url_nf = 'http://www.plurk.com/p/6c5cdt#response-1777726347';
        $webpage_nf = $this->webpage->create($url_nf);
        $url_f = 'http://www.plurk.com/p/67k6st';
        $webpage_f = $this->webpage->create($url_f);
        
        $text = '話說回來，其實本篇主題是要講，目前階段是Search，加入了Collection概念，並強化應用Active Record的方式之後，應該是更強大，卻也複雜到一種境界。';

        $target_scope_nf = new Annotation_scope_collection();
        $target_scope_nf->add_scope($this->annotation_scope->create_scope(18, 33, $text, $webpage_f));

        $target_scope_f = new Annotation_scope_collection();
        $target_scope_f->add_scope($this->annotation_scope->create_scope(3, 20, $text, $webpage_f));
        $target_scope_f->add_scope($this->annotation_scope->create_scope(26, 40, $text, $webpage_f));

        $overlap_scope_nf = new Annotation_scope_collection();
        $overlap_scope_nf->add_scope($this->annotation_scope->create_scope(23, 25, $text, $webpage_f));

        $overlap_scope_f = new Annotation_scope_collection();
        $overlap_scope_f->add_scope($this->annotation_scope->create_scope(23, 25, $text, $webpage_f));
        $overlap_scope_f->add_scope($this->annotation_scope->create_scope(39, 40, $text, $webpage_f));

        //-----------------------------------------------------------

        $search = new Search_annotation_collection();
        $search->set_target_user($user_not_found);
        $this->unit->run($search->length()
                , 0
                , 'Search_annotation_collection，搜尋錯誤user_id，看length()');

        $search = new Search_annotation_collection();
        $search->set_target_user($user_found);
        $this->unit->run($search->length()
                , 2
                , 'Search_annotation_collection，搜尋正確的user_id，看length()');

        $search = new Search_annotation_id_collection();
        $search->set_target_user($user_found);
        $this->unit->run($search->length()
                , 2
                , 'Search_annotation_id_collection，搜尋正確的user_id，看length()，耗費時間應該比Search_annotation_collection還短');
        $this->unit->run($search->get_item(0)
                , 'is_string'
                , 'Search_annotation_id_collection，搜尋正確的user_id，get_item()，值應該是id');

        //----

        $search = new Search_annotation_collection();
        $search->set_target_webpage($webpage_nf);
        $this->unit->run($search->length()
                , 0
                , 'Search_annotation_collection，搜尋錯誤的webpage，看length()');

        $this->unit->run($webpage_f->get_id()
                , 138
                , '先檢查webpage正確的id');

        $search = new Search_annotation_collection();
        $search->set_target_webpage($webpage_f);
        $this->unit->run($search->length()
                , 3
                , 'Search_annotation_collection，搜尋正確的webpage，看length()');

        //----
        
        $search = new Search_annotation_collection();
        $search->set_target_scope($target_scope_nf);
        $this->unit->run($search->length()
                , 0
                , 'Search_annotation_collection，搜尋錯誤的target_scope，看length()');


        $this->unit->run($target_scope_f->length()
                , 2
                , '先確定一下target_scope_f的數量沒錯');

        $search = new Search_annotation_collection();
        $search->set_target_scope($target_scope_f);
        $this->unit->run($search->length()
                , 2
                , 'Search_annotation_collection，搜尋正確的target_scope，看length()');

        //----

        $search = new Search_annotation_collection();
        $search->set_exclude_scope($target_scope_nf);
        $this->unit->run($search->length()
                , 3
                , 'Search_annotation_collection，搜尋錯誤的exclude_scope，看length()');
        $this->unit->run($search->get_item(0)->get_id()
                , 783
                , 'order scope之前');
        $this->unit->run($search->get_item(0)->get_user()->get_name()
                , 'puddingchen.35'
                , 'order scope之前，查看一下user name');
        $search = new Search_annotation_collection();
        $search->set_exclude_scope($target_scope_nf);
        $search->add_order(2, TRUE);
        $this->unit->run($search->get_item(0)->get_id()
                , 1017
                , 'order scope desc之後');
        $search = new Search_annotation_collection();
        $search->set_exclude_scope($target_scope_nf);
        $search->add_order(3);
        $this->unit->run($search->get_item(0)->get_id()
                , 1018
                , 'order like desc之後');

        $search = new Search_annotation_collection();
        $search->set_exclude_scope($target_scope_nf);
        $search->add_order(4);
        $this->unit->run($search->get_item(0)->get_id()
                , 1018
                , 'order respond desc之後');

        $search = new Search_annotation_collection();
        $search->set_exclude_scope($target_scope_nf);
        $search->add_order(5, TRUE);
        $this->unit->run($search->get_item(0)->get_user()->get_name()
                , 'pulipuli'
                , 'order author desc之後');

        $search = new Search_annotation_collection();
        $search->set_exclude_scope($target_scope_nf);
        $search->add_order(6);
        $this->unit->run($search->get_item(0)->get_id()
                , 1018
                , 'order update desc之後');
        $search = new Search_annotation_collection();
        $search->set_exclude_scope($target_scope_nf);
        $search->add_order(7);
        $this->unit->run($search->get_item(0)->get_id()
                , 1018
                , 'order update desc之後');


        $search = new Search_annotation_collection();
        $search->set_exclude_scope($target_scope_f);
        $this->unit->run($search->length()
                , 1
                , 'Search_annotation_collection，搜尋正確的exclude_scope，看length()，應該是跟上上個測試剛好是相反地');
        $this->unit->run($search->get_item(0)->get_id()
                , 783
                , 'Search_annotation_collection，搜尋正確的exclude_scope，get_item(0)並檢查id，應該是指定的784才對');

        //----

        $search = new Search_annotation_collection();
        $search->set_overlap_scope($overlap_scope_nf);
        $this->unit->run($search->length()
                , 0
                , 'Search_annotation_collection，搜尋錯誤的overlap_scope，看length()');

        $search = new Search_annotation_collection();
        $search->set_overlap_scope($overlap_scope_f);
        $this->unit->run($search->length()
                , 2
                , 'Search_annotation_collection，搜尋正確的overlay_scope，看length()');
        $this->unit->run($search->get_item(0)->get_id()
                , 1017
                , 'Search_annotation_collection，搜尋正確的overlay_scope，get_item() get_id()看看');

        //----

        $type_id_nf = 3;
        $type_id_f = 2;

        //$search = new Search_scope_collection();
        $search = new Search_annotation_collection();
        $search->set_target_type($type_id_nf);
        $this->unit->run($search->length()
                , 0
                , 'Search_annotation_collection，搜尋錯誤的target_id，看length()');

        $search = new Search_annotation_collection();
        $search->set_target_type($type_id_f);
        $this->unit->run($search->length()
                , 1
                , 'Search_annotation_collection，搜尋正確的target_id，看length()');
        $this->unit->run($search->get_item(0)->get_id()
                , 1017
                , 'Search_annotation_collection，搜尋正確的type_id，get_item() get_id()看看');

        //----

        $search = new Search_annotation_collection();
        $search->set_exclude_user($user_not_found);
        $this->unit->run($search->length()
                , 3
                , 'Search_annotation_collection，搜尋錯誤的exclude_user_id，看length()');

        $search = new Search_annotation_collection();
        $search->set_exclude_user($user_found);
        $this->unit->run($search->length()
                , 1
                , 'Search_annotation_collection，搜尋正確的exclude_user_id，看length()');

        //----

        $annotation_id_nf = 9999;
        $annotation_id_f = 1017;

        $search = new Search_annotation_collection();
        $search->set_exclude_annotation($annotation_id_nf);
        $this->unit->run($search->length()
                , 3
                , 'Search_annotation_collection，搜尋錯誤的exclude_annotation_id，看length()');

        $search = new Search_annotation_collection();
        $search->set_exclude_annotation($annotation_id_f);
        $this->unit->run($search->length()
                , 2
                , 'Search_annotation_collection，搜尋正確的exclude_annotation_id，看length()');
        $this->unit->run($search->get_item(0)->get_id()
                , 783
                , 'Search_annotation_collection，搜尋正確的exclude_annotation_id，get_item get_id');

        //----

        $note_nf = '搜尋錯誤';
        $note_f = '變項回歸';

        $search = new Search_annotation_id_collection();
        $search->set_search_note($note_nf);
        $this->unit->run($search->length()
                , 0
                , 'Search_annotation_id_collection，搜尋錯誤的search_note，看length()');

        $search = new Search_annotation_collection();
        $search->set_search_note($note_f);
        $search->add_order(8);
        $this->unit->run($search->length()
                , 1
                , 'Search_annotation_collection，搜尋正確的search_note，看length()');
        $this->unit->run($search->get_item(0)->get_id()
                , 783
                , 'Search_annotation_collection，搜尋正確的search_note，get_item get_id');

        //----

        $anchor_text_f = '冷氣電扇被子';

        $search = new Search_scope_collection();
        $search->set_search_anchor_text($note_nf);
        $this->unit->run($search->length()
                , 0
                , 'Search_annotation_id_collection，搜尋錯誤的search_anchor_text，看length()');

        $search = new Search_annotation_collection();
        $search->set_search_anchor_text($note_f);
        $search->add_order(9);
        $this->unit->run($search->length()
                , 2
                , 'Search_annotation_collection，搜尋正確的search_anchor_text，看length()');
        $this->unit->run($search->get_item(0)->get_id()
                , 1017
                , 'Search_annotation_collection，搜尋正確的search_anchor_text，get_item get_id');

        $search = new Search_annotation_collection();
        $search->set_check_authorize(FALSE);
        $search->set_search_anchor_text($note_f);
        $this->unit->run($search->length()
                , 2
                , 'Search_annotation_collection，並關掉權限檢查，搜尋正確的search_anchor_text，看length()');

        $this->unit->run($search->get_item(0)->get_id()
                , 1017
                , 'order score之前');

        $search = new Search_annotation_collection();
        $search->set_check_authorize(FALSE);
        $search->set_search_anchor_text($note_f);
        $search->add_order(1);
        $this->unit->run($search->get_item(0)->get_id()
                , 1018
                , 'order score之後');

        $search = new Search_scope_collection();
        $search->set_check_authorize(FALSE);
        $search->set_search_anchor_text($note_f);
        $this->unit->run($search->get_scope_length()
                , 20-3+1+40-26+1
                , 'Search_scope_collection，並關掉權限檢查，搜尋正確的search_anchor_text，看get_scope_length()');

        //----

        $score_over_nf = 3;
        $score_over_f = 2.1214435;

        $search = new Search_scope_collection();
        $search->set_target_over_score($score_over_nf);
        $this->unit->run($search->length()
                , 0
                , 'Search_annotation_id_collection，搜尋錯誤的target_over_score，看length()');

        $search = new Search_annotation_collection();
        $search->set_target_over_score($score_over_f);
        $this->unit->run($search->length()
                , 1
                , 'Search_annotation_collection，搜尋正確的target_over_score，看length()');
        $this->unit->run($search->get_item(0)->get_id()
                , 1018
                , 'Search_annotation_collection，搜尋正確的target_over_score，get_item get_id');

        $search = new Search_annotation_user_collection();
        $search->set_target_over_score($score_over_f);
        $this->unit->run($search->length()
                , 1
                , 'Search_annotation_user_collection，搜尋正確的target_over_score，length');
        $this->unit->run($search->get_item(0)->get_id()
                , 225
                , 'Search_annotation_user_collection，搜尋正確的target_over_score，get_item get_id');



//        //--------------------------------------------------------------------------------
//        $search = new Search_annotation_collection();
//        $search->set_check_authorize(FALSE);
//        $search->set_target_user($user_not_found);
//        $this->unit->run($search->length()
//                , 0
//                , 'Search_annotation_collection，取消auth，搜尋錯誤user_id，看length()');
//
//        $search = new Search_annotation_collection();
//        $search->set_check_authorize(FALSE);
//        $search->set_target_user($user_found);
//        $this->unit->run($search->length()
//                , 4
//                , 'Search_annotation_collection，取消auth，搜尋正確的user_id，看length()');

//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        //context_complete();
        unit_test_report($this);
    }

    public function check_auth()
    {
        create_context(TRUE);

        $url = 'http://www.plurk.com/p/6dhwp7';
        $email = 'search_check_auth@test.kals.org.tw';
        $group_name = 'check_auth';

        $user = $this->user->create_user($url, $email);
        $group = $this->group->create_group($url, $group_name);
        $group->add_actor($user);

        $annotation = new Annotation(784);
        $this->authorize_manager->set_resource($annotation);
        $this->authorize_manager->policy_add_actor(5, $group);

        clear_context_user();

        $search = new Search_annotation_collection();
        $count = $search->length();

        $this->unit->run($count
                , 'is_int'
                , '先找看看有沒有，應該是有的');

        set_context_user($user);

        $search = new Search_annotation_collection();
        $this->unit->run($search->length()
                , $count + 1
                , '設定權限之後，應該能找到被設定的那一個項目');

        unit_test_report($this);
    }
}
/* End of file ut_search.php */
/* Location: ./system/application/controllers/ut_.../ut_search.php */