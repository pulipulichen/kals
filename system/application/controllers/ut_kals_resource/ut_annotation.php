<?php
/**
 * ut_annotation
 *
 * ut_annotation full description.
 *
 * @package		KALS
 * @category		Unit Tests
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/7 下午 02:18:21
 * @property Annotation_scope_collection $annotation_scope_collection
 * @property Annotation $annotation
 * @property Annotation_scope $annotation_scope
 * @property User $user
 */
class ut_annotation extends Controller {

    function __construct()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->library('scope/Annotation_scope_collection');
        $this->load->library('scope/Annotation_scope');
        $this->load->library('kals_resource/Annotation');
        $this->load->library('kals_actor/User');
        
        create_context(TRUE);
        //set_ignore_authorize(TRUE);
        $this->unit->set_benchmark('Construc Complete', 47);
    }

    function index()
    {
        $url = 'http://www.plurk.com/p/67k6st#response-1739920625';
        $text1 = '[CODING D17] 晚上睡覺時天氣、室溫、冷氣、電扇、被子的厚度與蓋的方法，組合起來就可以預測隔天會不會一整天過敏。但我還沒有明顯地分辨出他們的關聯。';
        $text2 = '變項太多，這回歸的組合也不知道要排到什麼時候orz';

        $note = '「西瓜牛奶去冰的話可能沒有滿杯喔」由於店員這樣說，所以我改口跟他說不用去冰好了……結果還是一樣沒有滿杯orz';

        $email = 'puddingchen.35@gmail.com';
        $email_siroma = 'siroma@gmail.com';
        
        $scope1 = $this->annotation_scope->create_scope(3, 20, $text1, $url);

        


        $scope2 = $this->annotation_scope->create_scope(26, 40, $text2, $url);

        $scope_coll = new Annotation_scope_collection();
        $scope_coll->add_scope($scope1);
        $scope_coll->add_scope($scope2);
        $len = $scope_coll->get_scope_length();

        $user = $this->user->create_user($url, $email);
        $user_siroma = $this->user->create_user($url, $email_siroma);

        $annotation = $this->annotation->create_annotation($user, $scope_coll);

        $this->unit->run_false($annotation->get_id()
                , 9999
                , '是否有正確地存入資料庫？');

        $scope_coll2 = $annotation->get_scopes();
        $this->unit->run($scope_coll2->get_scope_length()
                , $len
                , '測試get_scopes()');

        $annotation->set_note($note);
        $this->unit->run($annotation->get_note()
                , $note
                , '測試get_note()');

        $annotation->set_type(3);
        $type = $annotation->get_type();
        $this->unit->run($type->get_name()
                , 'annotation.type.confusion'
                , '測試get_type()');

        $user = $annotation->get_user();
        $this->unit->run($user->get_email()
                , $email
                , '測試get_user()');
        $this->unit->run($user->get_email()
                , $email
                , '測試get_user()');

        $annotation_topic = $this->annotation->create_annotation($user_siroma, $scope2);
        $annotation_topic_id = $annotation_topic->get_id();
        $annotation->set_respond_to_topic($annotation_topic);
        $topic = $annotation->get_respond_to_topic();
        $this->unit->run($topic->get_id()
                , $annotation_topic_id
                , '測試respond_to_topic()');

        //來測試respond_to_coll
        $scope3 = $this->annotation_scope->create_scope(104, 135, $note, $url);
        $annotation_respond = $this->annotation->create_annotation($user_siroma, $scope3);
        //$annotation_coll = new Annotation_collection($annotation_respond);
        $annotation->set_respond_to_coll($annotation_respond);

        $coll = $annotation->get_respond_to_coll();
        $this->unit->run($coll->length()
                , 1
                , '測試respond_to_coll()的length');
        $this->unit->run($coll->get_item(0)->get_id()
                , $annotation_respond->get_id()
                , '測試respond_to_coll()的get_id() | '.$annotation->get_id());


        $annotation->set_feature(1, 1);
        $feature = $annotation->get_feature(1);
        $this->unit->run($feature->get_name()
                , 'annotation.feature.location'
                , 'set_feature之後又get_feature->get_name()');
        $this->unit->run($feature->get_value()
                , '1'
                , 'set_feature之後又get_feature->get_value()');

        $annotation->set_feature(1, 2);
        $feature = $annotation->get_feature(1);
        $this->unit->run($feature->get_value()
                , '2'
                , '再一次set_feature之後又get_feature->get_value()');

        $score_number = 2.36978;
        $score_number2 = 1.36978;
        $annotation->set_score(0, $score_number);
        $score = $annotation->get_score(0);
        $this->unit->run($score->get_name()
                , 'annotation.score.integrated'
                , 'set_score之後又get_score->get_name()');
        $this->unit->run($score->get_score()
                , $score_number
                , 'set_score之後又get_score->get_value()');

        $annotation->set_score(0, $score_number2);
        $score = $annotation->get_score(0);
        $this->unit->run($score->get_score()
                , $score_number2
                , '再一次set_score之後又get_score->get_score()');


        $email_like = 'siroma@gmail.com';
        $user_like = $this->user->create_user($url, $email_like);
        $this->unit->run_false($user->get_id()
                , $user_like->get_id()
                , '建立一個user_like，跟user不同人吧？');
        $this->unit->run_false($annotation->get_user()->get_id()
                , $user_like->get_id()
                , 'user_like，跟標註的作者user不同人吧？');

        
        $this->unit->run($annotation->get_like_count()
                , 0
                , 'like測試，加入user_like之前 get_like_count()');

        $annotation->add_like($user_like);
        $this->unit->run($annotation->get_like_count()
                , 1
                , 'like測試，加入user_like之後 get_like_count()');
        $annotation->remove_like($user_like);
        $this->unit->run($annotation->get_like_count()
                , 0
                , 'like測試，移除user_like之後 get_like_count()');
        $annotation->add_like($user_like);
        $this->unit->run($annotation->get_like_count()
                , 1
                , 'like測試，再加入user_like之後 get_like_count()');

        $this->unit->run($annotation->get_user()->get_unread_notification_count()
                , 1
                , '更新之前，到底annotation的作者收到幾封未讀通知呢？應該是有like的一封');

        $annotation->update();
        $this->unit->run(TRUE
                , TRUE
                , '======================更新完畢======================');

        $this->unit->run($user_siroma->get_unread_notification_count()
                , 1
                , '更新之後，由於user_siroma被設為topic跟respond的對象，所以user_siroma應該只會收到1封通知');

        $db = $this->db;
        $db->from('annotation2like_count');
        $db->where('annotation_id', $annotation->get_id());
        $db->select('like_count');
        $query = $db->get();
        $row = $query->row_array();
        $like_count = intval($row['like_count']);
        $this->unit->run($like_count
                , 1
                , '測試annotation2like_count');

        //----------------------------------------------------------------------------

        //搜尋看看吧
        $id = $annotation->get_id();

        $annotation2 = new Annotation($id);

        $scope_coll3 = $annotation2->get_scopes();

        $this->unit->run($annotation2->get_id()
                , $id
                , '$annotation2的id是否跟當初設定的相同？');

        $this->unit->run($scope_coll3->get_scope_length()
                , $len
                , '取出$annotation2之後，測試scopes');
        $this->unit->run($scope_coll3->length()
                , 2
                , '取出$annotation2之後，測試scopes有幾個');
        $this->unit->run($scope_coll3->get_anchor_speech()
                , $scope_coll2->get_anchor_speech()
                , '取出$annotation2之後，測試scopes的get_anchor_speech()');

        $this->unit->run($annotation2->get_note()
                , $note
                , '取出$annotation2之後，測試note');

        $type2 = $annotation2->get_type();
        $this->unit->run($type2->get_name()
                , 'annotation.type.confusion'
                , '取出$annotation2之後，測試type');

        $user2 = $annotation2->get_user();
        $this->unit->run($user2->get_email()
                , $email
                , '取出$annotation2之後，測試get_user()');

        $text2 = '雖然這邊太吵了應該聽不到尖叫聲，不過應該是會有人間叫';


        $this->unit->run($annotation2->get_like_count()
                , 1
                , '搜尋之後，like測試，已經加入user_like');

        $this->unit->run_false($annotation2->get_user()->get_id()
                , $user_like->get_id()
                , '確認一下兩個標註應該是不同人吧？');

        $annotation2->set_note($text2);
        $annotation2->update();

        $this->unit->run(TRUE
                , TRUE
                , '<h4>======================更新完畢======================</h4>');



        //----------------------------------------------------------------------

        $annotation3 = new Annotation($annotation2->get_id());
        $this->unit->run($annotation3->get_note()
                , $text2
                , '更新note，取出$annotation3之後，測試get_note()');

        $webpages = $annotation3->get_append_to_webpages();
        $this->unit->run(count($webpages)
                , 1
                , '測試get_append_to_webpages()');

        $this->unit->run($webpages[0]->get_uri()
                , parse_uri($url)
                , '測試get_append_to_webpages()是否相符');

        $topic = $annotation3->get_respond_to_topic();
        $this->unit->run($topic->get_id()
                , $annotation_topic_id
                , '測試respond_to_topic()');

        $coll = $annotation3->get_respond_to_coll();
        $this->unit->run($coll->length()
                , 1
                , '測試respond_to_coll()的length');
        $this->unit->run($coll->get_item(0)->get_id()
                , $annotation_respond->get_id()
                , '測試respond_to_coll()的get_id()，應該只有找到一個，並且就是剛剛插入的那一個 | '.$annotation3->get_id());
        $this->unit->run($annotation2->get_id()
                , $annotation3->get_id()
                , 'annotation2跟3的id是否相同呢？應該一樣才是');

        $topic_respond_coll = $topic->get_topic_respond_coll();
        $this->unit->run($topic_respond_coll->length()
                , 1
                , '測試get_topic_responded_coll()的length');
         $this->unit->run($topic_respond_coll->get_item(0)->get_id()
                , $annotation3->get_id()
                , '測試get_topic_responded_coll()的length');

        $feature = $annotation3->get_feature(1);
        $this->unit->run($feature->get_value()
                , '2'
                , '搜尋之後，get_feature->get_value()');

        $feature = $annotation3->get_feature(2);
        $this->unit->run($feature->get_value()
                , NULL
                , '搜尋之後，get_feature沒設定的id，應該會有屬性，但是沒有值');

        $feature = $annotation3->get_feature(3);
        $this->unit->run($feature
                , NULL
                , '搜尋之後，get_featur不再factory_item範圍內的id，應該直接是null');

        $score = $annotation3->get_score(0);
        $this->unit->run($score->get_name()
                , 'annotation.score.integrated'
                , '搜尋之後，get_score->get_name()');
        $this->unit->run($score->get_score()
                , $score_number2
                , '搜尋之後，get_score->get_value()');
        $query = $this->db->select('score')->limit(1)->where('annotation_id', $annotation3->get_id())->get('score');
        $row = $query->row_array();
        $this->unit->run($row['score']
                , $score_number2
                , '以資料庫查看是否有存入score');

        $this->unit->run_false($annotation3->get_field('create_timestamp')
                , $annotation3->get_field('update_timestamp')
                , 'Annotation更新過後，create_timestamp跟update_timestamp應該要不同才對');

        $this->unit->run($annotation->get_like_count()
                , 1
                , '搜尋之後，like測試，已經加入user_like');

        $this->unit->run_false($annotation->get_user()->get_id()
                , $user_like->get_id()
                , '確認一下兩個標註應該是不同人吧？');
//        $annotation->remove_like($user2);
//        $this->unit->run($annotation->get_like_count()
//                , 0
//                , '搜尋之後，like測試，移除user2之後');

        //context_complete();

//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        unit_test_report($this);
    }

    function update()
    {
        $url = 'http://www.plurk.com/p/67k6st#response-1739920625';
        $text1 = '[CODING D17] 晚上睡覺時天氣、室溫、冷氣、電扇、被子的厚度與蓋的方法，組合起來就可以預測隔天會不會一整天過敏。但我還沒有明顯地分辨出他們的關聯。';
        $text2 = '變項太多，這回歸的組合也不知道要排到什麼時候orz';

        $note = '「西瓜牛奶去冰的話可能沒有滿杯喔」由於店員這樣說，所以我改口跟他說不用去冰好了……結果還是一樣沒有滿杯orz';

        $email = 'puddingchen.35@gmail.com';

        $scope1 = $this->annotation_scope->create_scope(3, 20, $text1, $url);
        $scope2 = $this->annotation_scope->create_scope(26, 40, $text2, $url);

        $scope_coll = new Annotation_scope_collection();
        $scope_coll->add_scope($scope1);
        $scope_coll->add_scope($scope2);

        $user = $this->user->create_user($url, $email);

        $annotation3 = $this->annotation->create_annotation($user, $scope_coll);
        $this->unit->run_false($annotation3->get_id()
                , 'is_int'
                , '先確認看看有沒有ID');

        sleep(3);

        $annotation3->set_note($note);
        $annotation3->update();

        $this->unit->run_false($annotation3->get_field('create_timestamp')
                , $annotation3->get_field('update_timestamp')
                , 'Annotation更新過後，create_timestamp跟update_timestamp應該要不同才對');

        unit_test_report($this, __METHOD__);
    }

    function time()
    {
        $url = 'http://www.plurk.com/p/67k6st#response-1739920625';
        $text1 = '[CODING D17] 晚上睡覺時天氣、室溫、冷氣、電扇、被子的厚度與蓋的方法，組合起來就可以預測隔天會不會一整天過敏。但我還沒有明顯地分辨出他們的關聯。';
        $text2 = '變項太多，這回歸的組合也不知道要排到什麼時候orz';

        $note = '「西瓜牛奶去冰的話可能沒有滿杯喔」由於店員這樣說，所以我改口跟他說不用去冰好了……結果還是一樣沒有滿杯orz';

        $email = 'puddingchen.35@gmail.com';

        $scope1 = $this->annotation_scope->create_scope(3, 20, $text1, $url);
        $scope2 = $this->annotation_scope->create_scope(26, 40, $text2, $url);

        $scope_coll = new Annotation_scope_collection();
        $scope_coll->add_scope($scope1);
        $scope_coll->add_scope($scope2);
        $len = $scope_coll->get_scope_length();

        $user = $this->user->create_user($url, $email);

        $annotation = $this->annotation->create_annotation($user, $scope_coll);
        $annotation->update();
        context_complete();
        $annotation->reload();

        $this->unit->run($annotation->get_field('create_timestamp')
                , 'is_string'
                , 'create_timestamp');
        $this->unit->run($annotation->get_field('update_timestamp')
                , 'is_string'
                , 'update_timestamp');
        $this->unit->run(substr($annotation->get_field('create_timestamp'), 0, 19)
                , substr($annotation->get_field('update_timestamp'), 0, 19)
                , 'create_timestamp == update_timestamp');

        
        sleep(5);
        $annotation->set_note($text1);
        $annotation->update();
        $annotation->reload();

        $this->unit->run($annotation->get_field('create_timestamp')
                , 'is_string'
                , 'create_timestamp');
        $this->unit->run($annotation->get_field('update_timestamp')
                , 'is_string'
                , 'update_timestamp');
        $this->unit->run_false(substr($annotation->get_field('create_timestamp'), 0, 19)
                , substr($annotation->get_field('update_timestamp'), 0, 19)
                , 'create_timestamp != update_timestamp');

        context_complete();

        unit_test_report($this);
    }

    function time2()
    {
        $id = 783;
        $text2 = '變項太多，這回歸的組合也不知道要排到什麼時候orz';

        $annotation = new Annotation(783);

        $this->unit->run($annotation->get_field('create_timestamp')
                , 'is_string'
                , 'create_timestamp');
        $this->unit->run($annotation->get_field('update_timestamp')
                , 'is_string'
                , 'update_timestamp');
        $this->unit->run_false(substr($annotation->get_field('create_timestamp'), 0, 19)
                , substr($annotation->get_field('update_timestamp'), 0, 19)
                , 'create_timestamp == update_timestamp');

        sleep(5);
        $annotation->set_note($text2);
        $annotation->update();
        $annotation->reload();

        $this->unit->run($annotation->get_field('create_timestamp')
                , 'is_string'
                , 'create_timestamp');
        $this->unit->run($annotation->get_field('update_timestamp')
                , 'is_string'
                , 'update_timestamp');
        $this->unit->run_false(substr($annotation->get_field('create_timestamp'), 0, 19)
                , substr($annotation->get_field('update_timestamp'), 0, 19)
                , 'create_timestamp != update_timestamp');

        context_complete();

        unit_test_report($this);
    }

    public function consensus()
    {
        $annotation = new Annotation(1017);

        $this->unit->run($annotation->get_consensus_count()
                , 1
                , 'get_consensus_count');
        $this->unit->run($annotation->get_consensus_coll()->get_item(0)->get_id()
                , 1018
                , 'get_consensus_coll後get_item get_id');

        unit_test_report($this);
    }

    public function like()
    {
        $url = 'http://www.plurk.com/p/67k6st#response-1739920625';
        $text1 = '[CODING D17] 晚上睡覺時天氣、室溫、冷氣、電扇、被子的厚度與蓋的方法，組合起來就可以預測隔天會不會一整天過敏。但我還沒有明顯地分辨出他們的關聯。';
        $text2 = '變項太多，這回歸的組合也不知道要排到什麼時候orz';

        $note = '「西瓜牛奶去冰的話可能沒有滿杯喔」由於店員這樣說，所以我改口跟他說不用去冰好了……結果還是一樣沒有滿杯orz';

        $email = 'puddingchen.35@gmail.com';
        $email_siroma = 'siroma@gmail.com';

        $scope1 = $this->annotation_scope->create_scope(3, 20, $text1, $url);

        $scope2 = $this->annotation_scope->create_scope(26, 40, $text2, $url);

        $scope_coll = new Annotation_scope_collection();
        $scope_coll->add_scope($scope1);
        $scope_coll->add_scope($scope2);
        $len = $scope_coll->get_scope_length();

        $user = $this->user->create_user($url, $email);
        $user_siroma = $this->user->create_user($url, $email_siroma);

        $annotation = $this->annotation->create_annotation($user, $scope_coll);


        $email_like = 'annotation_like@test.kals.org.tw';
        $user_like = $this->user->create_user($url, $email_like);

        $this->unit->run($annotation->get_like_count()
                , 0
                , 'like測試，加入user_like之前 get_like_count()');

        
        $annotation->add_like($user_like);
        $this->unit->run($annotation->get_like_count()
                , 1
                , 'like測試，加入user_like之後 get_like_count()');
        $annotation->remove_like($user_like);
        $this->unit->run($annotation->get_like_count()
                , 0
                , 'like測試，移除user_like之後 get_like_count()');
        $annotation->add_like($user_like);
        $this->unit->run($annotation->get_like_count()
                , 1
                , 'like測試，再加入user_like之後 get_like_count()');

        unit_test_report($this);
    }

    function anchor_speech()
    {
        $url = 'http://www.plurk.com/p/67k6st#response-1739920625';
        $text1 = '[CODING D17] 晚上睡覺時天氣、室溫、冷氣、電扇、被子的厚度與蓋的方法，組合起來就可以預測隔天會不會一整天過敏。但我還沒有明顯地分辨出他們的關聯。';
        $text2 = '變項太多，這回歸的組合也不知道要排到什麼時候orz';

        $note = '「西瓜牛奶去冰的話可能沒有滿杯喔」由於店員這樣說，所以我改口跟他說不用去冰好了……結果還是一樣沒有滿杯orz';

        $email = 'puddingchen.35@gmail.com';
        $scope1 = $this->annotation_scope->create_scope(3, 20, $text1, $url);
        $scope2 = $this->annotation_scope->create_scope(26, 40, $text2, $url);

        $scope_coll = new Annotation_scope_collection();
        $scope_coll->add_scope($scope1);
        $scope_coll->add_scope($scope2);

        $user = $this->user->create_user($url, $email);

        $annotation = $this->annotation->create_annotation($user, $scope_coll);
        $annotation_cache = get_cache($annotation, 'annotation_id', $annotation->get_id());
        

        if (isset($annotation_cache))
        {
            //如果有開啟cache才跑這幾項
            $this->unit->run($annotation_cache
                , $annotation
                , '測試取出cache');

            $this->unit->run($annotation->get_scopes()->get_anchor_speech()
                    , $annotation_cache->get_scopes()->get_anchor_speech()
                    , '$annotation跟$annotation_cache的get_scopes應該要是一樣的');
        }

        $scope_coll2 = $annotation->get_scopes();
        $annotation->update();

        $id = $annotation->get_id();

        $annotation2 = new Annotation($id);
        $scope_coll3 = $annotation2->get_scopes();
        $this->unit->run($scope_coll3->length()
                , $scope_coll2->length()
                , '取出$annotation2之後，測試scopes的id是否相同？');

        $this->unit->run($scope_coll3->get_anchor_speech()
                , $scope_coll2->get_anchor_speech()
                , '取出$annotation2之後，測試scopes的get_anchor_speech()');

        $this->unit->run(count($scope_coll2->get_anchor_speech()) > 0
                , TRUE
                , 'count($scope_coll2->get_anchor_speech()) > 0');
        $this->unit->run(count($scope_coll3->get_anchor_speech()) > 0
                , TRUE
                , 'count($scope_coll3->get_anchor_speech()) > 0');

        unit_test_report($this, __METHOD__);
    }

    function json()
    {
        $annotation = new Annotation(1017);

        $user = $annotation->get_user();

        $this->unit->run($user->export_json()
                , 'is_string'
                , '測試user->export_json()');

        $this->unit->run($annotation->export_json()
                , 'is_string'
                , '測試annotation->export_json()');

        unit_test_report($this, __METHOD__);
    }
}
/* End of file ut_annotation.php */
/* Location: ./system/application/controllers/ut_.../ut_annotation.php */