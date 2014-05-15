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
    var $user_name3 = 'demo';
    var $user_email = 'puddingchen.35@gmail.com';
    var $user_email3 = 'demo@dlll.nccu.edu.tw';
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
        $this->load->library('kals_actor/User_statistic');
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
        $this->load->library('type/Annotation_type');
        //$this->load->library('type/Type_factory', "type_factory");
        $this->load->library('type/Annotation_type_factory');
        $this->load->library('kals_resource/Webpage');
        $this->load->library('kals_actor/User');
        $this->load->library('kals_actor/User_statistic');
       
        $me = new User(2002);

        //-----------------------------------------------------
        // Test.1 Url -> Webpage
        // Webpage->filter_webpage_object      
        // Test.2 Type(Int String) -> Annotation_type
        // new Annotation_type($type)

        //$url = $this->url;
        $url = 'http://140.119.61.137/kals/help/config_annotation_scope.html';
        
        $name = 'importance';
        //$type = $this->type_factory->create_type($name);    
        $type = $this->annotation_type_factory->filter_object($name);
        $this->unit->run( $type->get_id(),
                          1,
                          '1.importance可以用filter_object轉換為物件嗎?');              
        $webpage = $this->webpage->filter_webpage_object($url);
        //$annotation_type = new Annotation_type($type);
        //----------------------------
        //取得指定標註類型的所有標註數量 get_annotation_count
        $annotation_count = $this->user_statistic->get_annotation_count($me, $webpage, $type);
        $this->unit->run( $annotation_count,
                          8,
                          '2.檢查計算指定類型的標註數量,importance count對嗎？');
        
        // ---------------------------
        // 檢查計算指定類型的標註為topic的數量
        $topic_count = $this->user_statistic->get_topic_count($me, $webpage, $type);
        $this->unit->run( $topic_count,
                          5,
                          '3.檢查計算指定類型的標註為topic的數量,importance topic count對嗎？');
        
        // ---------------------------
        // 檢查計算被指定類型的回應標註的數量
        $response_count = $this->user_statistic->get_respond_to_count($me, $webpage, $type);
        $this->unit->run( $response_count,
                          3,
                          '4.取得指定標註類型回應標註的數量(自己寫的回應標註), count對嗎？'); 
        
        // ---------------------------
        // 檢查計算被指定標註類型回應的回應數量(被別人回應的特定類型的回應數量)
        $responsed_count = $this->user_statistic->get_responded_count($me, $webpage, $type);
        $this->unit->run( $responsed_count,
                          2,
                          '5.取得被指定標註類型回應的回應數量(被別人回應的特定類型的回應數量), count對嗎？');
        // ---------------------------
        // 檢查計算被指定對象回應的回應數量(被特定對象回應的回應數量)
        $responded_user = new User(2003);
        $respond_to_user = new User(2003);
        
        $responsed_count = $this->user_statistic->get_responded_by_user_count($me, $webpage, $responded_user, $type);
        $this->unit->run( $responsed_count,
                          2,
                          '6.取得被指定對象回應的回應數量(被特定對象回應的回應數量), count對嗎？');
        // ---------------------------
        // 檢查取得被指定類型回應的對象的數量(哪些人用什麼類型回應的數量)       
        $responsed_count = $this->user_statistic->get_respond_users_count($me, $webpage, $type);
        $this->unit->run( $responsed_count,
                          2,
                          '7.取得取得被指定類型回應的對象的數量(哪些人用什麼類型回應的數量), count對嗎？'); 
        // ---------------------------
        // 檢查指定對象與標註類型回應標註的數量(自己用哪些類型標註回應誰)    
        $responsed_count = $this->user_statistic->get_respond_to_count_by_user($me, $webpage, $respond_to_user, $type);
        $this->unit->run( $responsed_count,
                          1,
                          '8.取得指定對象與標註類型回應標註的對象數量(自己用哪些類型標註回應誰), count對嗎？'); 
        // ---------------------------
        // 檢查指定對象與標註類型回應標註的數量(自己用哪些類型標註回應誰)    
        $response_count = $this->user_statistic->get_respond_to_count_by_user($me, $webpage, $respond_to_user, $type);
        $this->unit->run( $response_count,
                          1,
                          '9.取得指定對象與標註類型回應標註的數量(自己用哪些類型標註回應誰), count對嗎？'); 
       
        // ---------------------------
        // 檢查取得自己喜愛的數量   
        $like_count = $this->user_statistic->get_like_to_annotation_count($me, $webpage);
        $this->unit->run( $like_count,
                          2,
                          '10.取得自己喜愛的數量, count對嗎？');
        
         // ---------------------------
        // 檢查取得喜愛指定對象的數量 
        $like_to_user = new User(2003);
        $like_count = $this->user_statistic->get_like_to_user_count($me, $webpage, $like_to_user);
        $this->unit->run( $like_count,
                          2,
                          '11.取得喜愛指定對象的數量, count對嗎？');
        // ---------------------------
        // 檢查取得被喜愛的數量 
        $like_count = $this->user_statistic->get_liked_count($me, $webpage);
        $this->unit->run( $like_count,
                          4,
                          '12.取得被喜愛的數量, count對嗎？');
        // ---------------------------
        // 檢查取得被指定對象喜愛的數量 
        $like_count = $this->user_statistic->get_liked_by_user_count($me, $webpage, $like_to_user);
        $this->unit->run( $like_count,
                          4,
                          '13.取得被指定對象喜愛的數量, count對嗎？');
        
        
        // ----------------------------------------------
        unit_test_report($this, __METHOD__);
    }
}


/* End of file ut_user.php */
/* Location: ./system/application/helpers/ut_user.php */