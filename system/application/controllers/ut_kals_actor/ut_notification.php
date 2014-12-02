<?php
/**
 * Ut_notification
 * @package		KALS
 * @category		Unit Tests
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/11 上午 11:02:37
 * @property Notification_responded $responded
 * @property Notification_liked $liked
 * @property Notification_recommended $recommended
 */
class Ut_notification extends Controller {

    private $association_user;
    private $trigger_user;
    private $trigger_annotation;

    private $responded;
    private $liked;
    private $recommended;

    private $url = 'http://www.plurk.com/p/6a5w89';

    function __construct()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');

        $this->load->library('kals_actor/Notification');
        $this->load->library('kals_actor/Notification_responded');
        $this->responded = $this->notification_responded;
        $this->load->library('kals_actor/Notification_liked');
        $this->liked = $this->notification_liked;
        $this->load->library('kals_actor/Notification_recommended');
        $this->recommended = $this->notification_recommended;

        $this->load->library('scope/Annotation_scope_collection');
        $this->load->library('scope/Annotation_scope');
        $this->load->library('kals_resource/Annotation');
        $this->load->library('kals_actor/User');

        create_context(TRUE);
        $this->unit->set_benchmark('Construc Complete');
    }

    function index()
    {
        $annotation = $this->create_annotation();
        $this->association_user = $annotation->get_user();

        $email2 = 'siroma@gmail.com';
        $this->trigger_user = $this->user->create_user($this->url, $email2);

        //以上是準備！
        //--------------------------------------
        //以下正式開始！

        $this->unit->run($this->association_user->get_unread_notification_count()
                , 0
                , 'association_user 有沒有未讀的，應該沒有');

        $this->unit->run($this->liked->get_template()
                , NULL
                , 'liked什麼都沒set 然後 get_template()');

        $this->unit->run($this->liked->get_id()
                , NULL
                , '看看liked的id，未存入之前應該沒有東西才是');
        
        //$this->liked->set_trigger_resource($annotation);
        //$this->liked->set_trigger_actor($this->trigger_user);
        $this->liked = $this->liked->create_notification($annotation->get_user(), $annotation, $this->trigger_user);

        $this->unit->run($this->liked->get_template()
                , 'is_string'
                , 'set liked 然後 get_template()');

        //$this->liked->update();

        $this->unit->run($this->liked->get_id()
                , 'is_int'
                , 'update liked，有存入嗎？');
        $this->unit->run($this->liked->get_template()
                , 'is_string'
                , 'update liked 然後 get_template()');

        $this->unit->run($this->association_user->get_unread_notification_count()
                , 1
                , '再association_user 有沒有未讀的，應該有1個');

        //--------------------------------------------


        $this->unit->run($this->responded->get_template()
                , NULL
                , 'responded什麼都沒set 然後 get_template()');

        //$this->responded->set_trigger_resource($annotation);
        //$this->responded->set_trigger_actor($this->trigger_user);
        $this->responded = $this->responded->create_notification($annotation->get_user(), $annotation, $this->trigger_user);

        $this->unit->run($this->responded->get_template()
                , 'is_string'
                , 'set responded 然後 get_template()');

        //$this->responded->update();

        $this->unit->run($this->responded->get_id()
                , 'is_int'
                , 'update responded，有存入嗎？');

        $this->unit->run($this->association_user->get_unread_notification_count()
                , 2
                , '再association_user 有沒有未讀的，應該有2個');

        //--------------------------------------------------------------

        $this->unit->run($this->recommended->get_template()
                , NULL
                , 'recommend什麼都沒set 然後 get_template()');

        //$this->recommended->set_trigger_resource($annotation);
        //$this->recommended->set_trigger_actor($this->trigger_user);
        $this->recommended = $this->recommended->create_notification($annotation->get_user(), $annotation, $this->trigger_user);

        $this->unit->run($this->recommended->get_template()
                , 'is_string'
                , 'set recommended 然後 get_template()');

        //$this->recommended->update();

        $this->unit->run($this->recommended->get_id()
                , 'is_int'
                , 'update recommended，有存入嗎？');

        $this->unit->run_false($this->recommended->get_id()
                , $this->liked->get_id()
                , 'recommend跟liked的id應該不同');

        $count = $this->db->count_all_results('notification');
        $this->unit->run($count
                , 'is_int'
                , '資料表notification裡面應該有資料');
        $this->unit->run($count >= 3
                , TRUE
                , '資料表notification裡面資料應該>=3');

        $this->unit->run($this->association_user->get_unread_notification_count()
                , 3
                , '再association_user 有沒有未讀的，應該有3個');

        //---------------------------------------------------------------
        //$another_liked = new Notification_liked();
        //$another_liked->set_trigger_resource($annotation);
        //$another_liked->set_trigger_actor($this->trigger_user);
        //$another_liked->update();
        $another_liked = $this->liked->create_notification($annotation->get_user(), $annotation, $this->trigger_user);

        $this->unit->run($another_liked->get_id()
                , $this->liked->get_id()
                , '同樣資料下的notification，ID應該會相同');

        $this->unit->run($this->association_user->get_unread_notification_count()
                , 3
                , '再association_user 有沒有未讀的，應該依然是3個');

        //----------------------------------------------
        //接下來檢查notification

        $unread_coll = $this->association_user->get_unread_notification_coll();
        $id_list = array($this->liked->get_id(), $this->recommended->get_id(), $this->responded->get_id());
        foreach ($unread_coll AS $unread)
        {
            $this->unit->run(in_array($unread->get_id(), $id_list)
                , TRUE
                , '用foreach檢查每一個unread ('.$unread->get_id().')，應該都符合剛剛建立的那幾個');
        }

        $this->association_user->set_notification_read($id_list[0]);

        $this->unit->run($this->association_user->get_unread_notification_count()
                , 2
                , '設定讀過1個之後，再association_user 有沒有未讀的，應該有2個');

        $this->association_user->set_notification_read($id_list[1]);

        $this->unit->run($this->association_user->get_unread_notification_count()
                , 1
                , '設定讀過2個之後，再association_user 有沒有未讀的，應該有1個');


        $unread_coll = $this->association_user->get_unread_notification_coll(NULL, NULL, TRUE);
        $this->unit->run($unread_coll->length()
                , 1
                , '取得unread_coll，看一下length，應該只剩下1個');



//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        //context_complete();
        unit_test_report($this);
    }

    /**
     * @return Annotation
     */
    function create_annotation()
    {
        $url = $this->url;
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

        $this->association_user = $user;
        return $annotation;
    }
}
/* End of file ut_notification.php */
/* Location: ./system/application/controllers/ut_.../ut_notification.php */