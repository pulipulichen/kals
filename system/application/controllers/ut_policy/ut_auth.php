<?php
/**
 * Ut_auth
 *
 * Ut_auth full description.
 *
 * @package		KALS
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/25 下午 08:51:08
 * @property Webpage $webpage
 * @property User $user
 * @property Group $group
 * @property Action_factory $action_factory
 * @property Authorize_manager $authorize_manager
 */
class Ut_auth extends Controller {

    var $url = 'http://www.plurk.com/p/5zb6um#response-1672175356';
    var $user_email = 'pudding@test.com';
    var $user_name = 'pudding';
    var $group1_name = 'puli_group';
    var $group2_name = 'siroma_group';
    var $action_webpage_read = 3;
    var $action_webpage_admin = 2;
    var $action_domain_admin = 1;

    function Ut_auth()
    {
        parent::Controller();
        $this->load->database();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');

        $this->load->library('kals_resource/Webpage');
        $this->load->library('kals_actor/User');
        $this->load->library('kals_actor/Group');
        $this->load->library('policy/Authorize_manager');
        $this->load->library('policy/Action_factory');
    }

    function index()
    {
        create_context();
        //初始設定開始！

        //先建立$webpage
        //建立$user1
        //建立$group1
        $webpage = $this->webpage->create($this->url);
        $user = $this->user->create_user($this->url, $this->user_email);
        $group1 = $this->group->create_group($this->url, $this->group1_name);
        $group2 = $this->group->create_group($this->url, $this->group2_name);
        $group1->add_actor($user);

        $auth = $this->authorize_manager;
        $auth->set_resource($webpage);
        $auth->set_actor($group1);
        $auth->set_throw_exception(FALSE);
        //初始設定結束！

        //-------------------------------------------------------
        //Round 1 測試尚未設定Policy之前
//        test_msg('Round 1 測試尚未設定Policy之前');

        $this->unit->run($auth->has_policy($this->action_webpage_admin)
                , FALSE
                , '測試尚未設定Policy之前，$webpage是否有設定過$action_webpage_adming的權限');

        $this->unit->run($auth->allow($this->action_webpage_admin)
                , FALSE
                , '測試尚未設定Policy之前，任意人士是否允許管理Webpage');

        $this->unit->run($auth->has_policy($this->action_webpage_admin)
                , FALSE
                , '測試尚未設定Policy之前，$webpage是否有設定過action_webpage_read的權限？');

        $this->unit->run($auth->allow($this->action_webpage_read)
                , TRUE
                , '測試尚未設定Policy之前，任意人士是否允許讀取');
        $this->unit->run($auth->has_policy($this->action_webpage_admin)
                , FALSE
                , '測試尚未設定Policy之前，$webpage是否有設定過action_domain_admin的權限？');

        $this->unit->run($auth->allow($this->action_domain_admin)
                , FALSE
                , '測試尚未設定Policy之前，輸入適用對象錯誤的Action看看');

        //--------------------------------------------------------
        //Round 2 設定Policy之後
//        test_msg('Round 2 設定Policy之後');

        $auth->policy_add_actor($this->action_webpage_admin);

        $this->unit->run($auth->has_policy($this->action_webpage_admin)
                , TRUE
                , '設定Policy之後，$webpage是否有設定過$action_webpage_adming的權限');

        $this->unit->run($auth->allow($this->action_webpage_admin)
                , TRUE
                , '設定Policy之後，$group1是否允許管理Webpage');

        //------------------------------------------------------------
        //Round 3 設定不相干人士看看
//        test_msg('Round 3 設定不相干人士看看');

        $auth->set_actor($group2);

        $this->unit->run($auth->has_policy($this->action_webpage_admin)
                , TRUE
                , '設定不相干人士看看，$webpage是否有設定過action_webpage_admin的權限？');

        $this->unit->run($auth->allow($this->action_webpage_admin)
                , FALSE
                , '設定不相干人士看看，$group2是否允許管理Webpage');

        //------------------------------------------------------------
        //Round 4 設定子成員看看
//        test_msg('Round 4 設定子成員看看');

        $auth->set_actor($user);

        $this->unit->run($auth->has_policy($this->action_webpage_admin)
                , TRUE
                , '設定子成員看看，$webpage是否有設定過action_webpage_admin的權限？');

        $this->unit->run($auth->allow($this->action_webpage_admin)
                , TRUE
                , '設定子成員看看，$user是否允許管理Webpage');

        //------------------------------------------------------------
        //Round 5 加入$group2看看
//        test_msg('Round 5 加入$group2看看');

        $auth->policy_add_actor($this->action_webpage_admin, $group2);

        $this->unit->run($auth->has_policy($this->action_webpage_admin)
                , TRUE
                , '加入$group2看看，$webpage是否有設定過action_webpage_admin的權限？');

        $this->unit->run($auth->allow($this->action_webpage_admin)
                , TRUE
                , '加入$group2看看，$group2是否允許管理Webpage');

        //------------------------------------------------------------
        //Round 6 測試policy
//        test_msg('Round 6 測試policy');

        $policy = $auth->get_policy($this->action_webpage_admin);
        $actors = $policy->get_actors();

        $this->unit->run(count($actors)
                , 2
                , '測試policy的get_actors()數量，應該是有$group1跟$group2');

        $passed = FALSE;
        foreach ($actors AS $a)
        {
            if ($a->equals($group1))
            {
                $passed = TRUE;
                break;
            }
        }

        $this->unit->run($passed
                , TRUE
                , '測試policy的get_actors()，用foreach $actors[0]->equals($group1)看看');

        $passed = FALSE;
        foreach ($actors AS $a)
        {
            if ($a->equals($group2))
            {
                $passed = TRUE;
                break;
            }
        }

        $this->unit->run($passed
                , TRUE
                , '測試policy的get_actors()，用$actors[0]->equals($group2)看看');

        $passed = FALSE;
        foreach ($actors AS $a)
        {
            if ($a->equals($user))
            {
                $passed = TRUE;
                break;
            }
        }

        $this->unit->run($passed
                , FALSE
                , '測試policy的get_actors()，應該是沒有$user');

        //----------------------------------------------------------
        //Round 7 測試get_polices()
//        test_msg('Round 7 測試get_polices()');

        $auth->policy_add_actor($this->action_webpage_read, $user);

        $polices = $auth->get_policies();
        $this->unit->run(count($polices)
                , 2
                , '測試get_polices()，應該有兩個policy');

        $policy_id = $policy->get_id();
        $polices_ids = array();
        foreach ($polices AS $p)
        {
            $polices_ids[] = $p->get_id();
        }

        $this->unit->run(in_array($policy_id, $polices_ids)
                , TRUE
                , '測試get_polices()，應該包含了policy的ID在裡面');

        //----------------------------------------------------------
        //Round 8 測試is_admin
//        test_msg('Round 8 測試is_admin');

        $this->unit->run($auth->is_admin($user)
                , TRUE
                , '測試is_admin，$user可以管理$webpage嗎？');

        $this->unit->run($auth->is_admin($group1)
                , TRUE
                , '測試is_admin，$group1可以管理$webpage嗎？');

        $auth->policy_remove_actor($this->action_webpage_admin, $group2);
        $this->unit->run($auth->is_admin($group2)
                , FALSE
                , '測試is_admin，$group2可以管理$webpage嗎？');

        //----------------------------------------------------------
        //Round 9 測試remove_entrie_policy()
//        test_msg('Round 9 測試remove_entrie_policy()');
        
        $count = count($auth->get_actors($this->action_webpage_read));

        $auth->policy_remove_actor($this->action_webpage_read, $group2);

        $this->unit->run($auth->has_policy($this->action_webpage_read)
                , TRUE
                , '測試remove_entrie_policy()，移除不相干的人看看會怎樣');
        
        $this->unit->run(count($auth->get_actors($this->action_webpage_read))
                , $count
                , '測試remove_entrie_policy()，移除不相干的人之後，count應該還是一樣吧？');

        $auth->policy_remove_actor($this->action_webpage_read, $user);

        $this->unit->run($auth->has_policy($this->action_webpage_read)
                , FALSE
                , '測試remove_entrie_policy()，移除相干的人看看會怎樣');

        $polices = $auth->get_policies();

        $this->unit->run(count($polices)
                , 1
                , '測試remove_entrie_policy()，應該只剩下1個');

        $this->unit->run($polices[0]->get_id()
                , $policy_id
                , '測試remove_entrie_policy()，應該只剩下action_webpage_admin了');

        //----------------------------------------------------------
        //Round 10 remove_entrie_policy()不指定actor
//        test_msg('Round 10 remove_entrie_policy()不指定actor');

        $auth->remove_entrie_policy($this->action_webpage_admin);

        $this->unit->run($auth->has_policy($this->action_webpage_admin)
                , FALSE
                , 'remove_entrie_policy()不指定actor');

        $polices = $auth->get_policies();
        $this->unit->run(count($polices)
                , 0
                , 'remove_entrie_policy()不指定actor，應該只剩下0個');

//        //最後要回收不用到的物件
//        $webpage->delete();
//        $group->delete();
//
//        $user_id = $user->get_id();
//        $user->delete();
//        $this->db->delete(array('domain2user', 'user'), array('user_id' => $user_id));

//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        unit_test_report($this);
    }
}
/* End of file ut_auth.php */
/* Location: ./system/application/controllers/ut_policy/ut_auth.php */