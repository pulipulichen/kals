<?php
/**
 * ut_user
 *
 * ut_user full description.
 *
 * @package		KALS
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/23 下午 04:43:43
 * @property User $user
 * @property Annotation $annotation
 * @property Authorize_manager $authorize_manager
 */
class Ut_user extends Controller {

    var $url = 'http://www.plurk.com/p/5xra8r#response-1657897612';
    var $host = 'http://www.plurk.com/';
    var $user_name = 'puddingchen.35';
    var $user_email = 'puddingchen.35@gmail.com';
    var $user_email2 = 'siroma@gmail.com';
    var $keyword = 'dd';
    var $not_keyword = '嘿嘿我用錯"誤的資料去\'搜尋看看';
    var $password = 'kals_2010';
    var $crypt_password = 'kap45wPTVht6g';

    function Ut_user()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');

        $this->load->library('kals_actor/User');
        $this->load->database();
        
        create_context(TRUE);
    }

    function index()
    {
        $deleted = array();

        //用email建立user1
        //$user1 = $this->user->create($this->url, 'name', $this->user_name);
        $user1 = $this->user->create_user($this->url, $this->user_email);
        //檢查user1的name
        $this->unit->run($user1->get_name(),
                'puddingchen.35',
                '檢查user1的name');

        $deleted[] = $user1->get_id();
        //檢查$user1的domain
        $domain1 = $user1->get_domain();
        $this->unit->run($domain1->get_host(),
                $this->host,
                '檢查$user1的domain');

        //測試密碼是否如期一樣地編碼
        $this->unit->run($user1->_crypt_password($this->password)
                , $this->crypt_password
                , '測試密碼是否如期一樣地編碼');

        //設定user1的密碼
        $user1->set_password($this->password);
        $user1->update();

        $user_another = $this->user->create_user($this->url, $this->user_email2);
        $this->unit->run_false($user1->get_id()
            , $user_another->get_id()
            , '建立user_another，看看是否是不同人');


        //find user2，用name跟password來找
        $user2 = $this->user->find_user($this->url,$this->user_email,$this->password);

        //檢查user2的name
        $this->unit->run($user2->get_name()
                , $this->user_name
                , 'find user2，用name跟password來找 檢查user2的name');

        //用錯誤的密碼去找找看
        $user21 = $this->user->find_user($this->url, $this->user_name,'error_password');
        $this->unit->run($user21
                , NULL
                , '用錯誤的密碼去找找看');

        //用email建立user3
        $user3 = $this->user->create_user($this->url, $this->user_email);
        $deleted[] = $user3->get_id();

        //檢查user3的name
        $this->unit->run($user3->get_name()
                , 'puddingchen.35'
                , '用email建立user3 檢查user3的name');

        //測試search吧
        $users = $this->user->search($this->url, $this->keyword);
        $this->unit->run((count($users) > 0)
                , TRUE
                , '測試Search，應該要找到東西才是');
        $this->unit->run($users[0]->get_name()
                , $this->user_name
                , '測試Search，看第一個是不是剛剛建立的');
        $users = $this->user->search($this->url, $this->not_keyword);
        $this->unit->run(count($users)
                , 0
                , '測試錯誤的Search，應該找不到東西才是');

        //刪除user1
        $user1_id = $user1->get_id();
        $user1->delete();

        //檢查user1的name
        $this->unit->run($user1->get_name()
                , NULL
                , '刪除user1 檢查user1的name');

        $this->db->where('user_id', $user1_id);
        $this->db->where('deleted', 'FALSE');
        $count = $this->db->count_all_results('user');
        $this->unit->run($count
                , 0
                , '用資料庫來測試看看');

        //恢復user1
        $user1 = new User($user1_id);
        $user1->restore();
        $this->unit->run($user1->get_name()
                , $this->user_name
                , '恢復user1 檢查user1的name');
        $this->db->where('user_id', $user1_id);
        $this->db->where('deleted', 'FALSE');
        $count = $this->db->count_all_results('user');
        $this->unit->run($count
                , 1
                , '恢復user1, 用資料庫來測試看看');
        $user1->delete();

        //用user2去find看看
        $user2 = $this->user->find_user($this->url, $this->user_name);

        $this->unit->run($user2
                , NULL
                , '刪除user1 用user2去find看看');

        //刪除user3
        $user3->delete();

        //檢查user3的email
        $this->unit->run($user3->get_email()
                , NULL
                , '刪除user3 檢查user3的email');
        $user1 = $this->user->create_user($this->url, $this->user_email);

        $count1 = $this->db->where('deleted', 'TRUE')
                ->count_all_results('user');
        $this->unit->run($count1
                , 1
                , '刪除之後，資料是否還在？');
        $count2 = $this->db->where('deleted', 'FALSE')
                ->count_all_results('user');
        $this->unit->run($count1
                , 1
                , '刪除之後又新增，是否有新增的資料？');
        $count3 = $this->db->count_all_results('user');
        $this->unit->run($count1 + $count2
                , $count3
                , '刪除與新增的資料相加，是否等於全部資料表的筆數？');

//        $this->unit->run($test_result,
//                $expected_result,
//                $test_name);

//        $this->load->database();
//        $domain_count = $this->db->count_all_results('domain', array('host'=> 'http://www.plurk.com/'));
//        $this->unit->run($domain_count < 2
//                , TRUE
//                , '確認沒有多餘的Domain');
//
//        //單元測試之後不留下垃圾！
//        foreach ($deleted AS $d)
//        {
//            $this->db->delete(array('domain2user', 'user'), array('user_id'=> $d));
//        }
        unit_test_report($this);
    }

    public function friend()
    {
        //先建立scope
        $url = 'http://www.plurk.com/p/6bk0s3#response-1771001736';

        $this->load->library('scope/Annotation_scope');
        $scope = new Annotation_scope();
        $scope->set_index(48, 19);
        $scope->set_anchor_text('頭髮越來越長了……等系統做完回家再剪。所以頭髮越長就表示系統作越久 >_<');
        $scope->set_webpage($url);
        //$scope->update();

        //建立user_author user1 user2
        $email_author = 'puddingchen.35@gmail.comsss';
        $email1 = 'sealing@puli.com';
        $email2 = 'yachio@working.com';

        $user_author = $this->user->create_user($url, $email_author);
        $user1 = $this->user->create_user($url, $email1);
        $user2 = $this->user->create_user($url, $email2);

            //檢查一下是否大家都有ID
            $this->unit->run(NULL !== $user_author->get_id()
                    && NULL !== $user1->get_id()
                    && NULL !== $user2->get_id()
                , TRUE
                , '檢查一下是否大家都有ID');
            $friend_count = $user_author->get_friends(TRUE)->length();
            $this->unit->run($friend_count
                , 'is_int'
                , '檢查一下user_author的friend數量');

        //建立Annotation
        $this->load->library('kals_resource/Annotation');
        $annotation = $this->annotation->create_annotation($user_author, $scope);

        $this->unit->run($user_author->get_friends(TRUE)->length()
                , $friend_count
                , '檢查一下user_author的friend數量，建立annotation之後');

        //加入權限
        $this->load->library('policy/Authorize_manager');
        $this->load->library('policy/Action_annotation_read');
        $action = new Action_annotation_read();
        $this->authorize_manager
                ->set_resource($annotation)
                ->policy_add_actor($action, $user1);

        $this->unit->run($user_author->get_friends(TRUE)->length()
                , $friend_count+1
                , '檢查一下user_author的friend數量，加入$user1');

        $this->authorize_manager->policy_add_actor($action, $user2);

        $this->unit->run($user_author->get_friends(TRUE)->length()
                , $friend_count+2
                , '檢查一下user_author的friend數量，加入user2');

        $this->authorize_manager->policy_remove_actor($action, $user1);
        $this->unit->run($user_author->get_friends(TRUE)->length()
                , $friend_count+1
                , '檢查一下user_author的friend數量，移除user1');

        $match = FALSE;
        foreach ($user_author->get_friends() AS $friends)
        {
            if ($friends->get_id() == $user2->get_id())
            {
                $match = TRUE;
                break;
            }
        }

        $this->unit->run($match
                , TRUE
                , '檢查一下user_author的friend中，應該只剩下user1');


        unit_test_report($this, __METHOD__);
    }
    
    public function stat()
    {
        // 1. 載入library
        // 2. Mock 
        $this->load->library('kals_actor/User_statistic');
        $this->load->library('kals_resource/Webpage');
        // Test.1 Url -> Webpage
        // Webpage->filter_webpage_object
        $user = new User(2002);
        $webpage = new Webpage(1575);
        // Test.2 Type(Int String) -> Annotation_type
        // new Annotation_type($type)
        
        $user1 = $this->user->create_user($this->url, $this->user_email);
        //檢查user1的name
        $this->unit->run($user1->get_name(),
                'puddingchen.35',
                '檢查user1的name');
        //----------------------------------------------
        //檢查get_topic_types_count
        $this->unit->run($this->user_statistic->get_respond_to_other_types_count($user, $webpage),
                2,
                '檢查自己使用importance回應別人的標註數量');
        
        
        // ----------------------------------------------
        unit_test_report($this, __METHOD__);
    }
}


/* End of file ut_user.php */
/* Location: ./system/application/helpers/ut_user.php */