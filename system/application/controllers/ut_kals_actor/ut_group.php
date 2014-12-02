<?php
/**
 * Ut_group
 *
 * Group類別的單元測試
 *
 * @package		KALS
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/24 下午 04:33:40
 * @property Group $group
 * @property User $user
 */

class Ut_group extends Controller {

    var $url = 'http://www.plurk.com/p/5yjboy#response-1664599018';
    var $host = 'http://www.plurk.com/';
    var $group_name1 = 'pudding';
    var $group_name2 = 'sealing';
    var $user_name1 = 'wawa@test.com';
    var $user_name2 = 'puli@test.com';
    
    function Ut_group()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');

        $this->load->library('kals_actor/User');
        $this->load->library('kals_actor/Group');
    }

    function index()
    {
        create_context(TRUE);
        $del_user = array();

        //建立$group1
        $group1 = $this->group->create_group($this->url, $this->group_name1);

        //[R]$group1->get_name()
        $this->unit->run($group1->get_name(),
                $this->group_name1,
                '建立$group1 [R]$group1->get_name()');

        //$group1find = find by name
        $group1finds = $this->group->find_groups($this->url, $this->group_name1);
        $group1find = $group1finds[0];

        //$group1find->get_domain()
        $domain1 = $group1find->get_domain();

        //[R]取得domain的host
        $this->unit->run($domain1->get_host(),
                $this->host,
                '$group1find = find by name get_domain() [R]取得domain的host');

        //建立$user1
        //把$user1加入$group1中
        $user1 = $this->user->create_user($this->url, $this->user_name1);
        
        $group1->add_actor($user1);

        //$group1->get_users()
        $users = $group1->get_users();

        //[R]測試get_users()數量是否為1
        $this->unit->run(count($users),
                1,
                '把$user1加入$group1中 $group1->get_users() [R]測試get_users()數量是否為1');

        //記得$group1_id
        //$group1find = find by id
        $group1_id = $group1->get_id();
        //$group1find = $this->group->find('id', $group1_id);
        $group1find = new Group($group1_id);

        //$group1find->get_users()
        //[R]測試users[0]的名字是否符合
        $users = $group1find->get_users();
        $this->unit->run($users[0]->get_email(),
                $this->user_name1,
                '$group1find = find by id | $group1find->get_users() | [R]測試users[0]的名字是否符合'.$users[0]->get_id());

        //從$group1中移除$user1
        //[R]$group1看看是否數量為0
        $group1->remove_actor($users[0]);
        $users = $group1->get_users();
        $this->unit->run(count($users),
                0,
                '從$group1中移除$user1 | [R]$group1看看是否數量為0');

        //$group1find = find by id
        //[R] 看看get_users數量是否為0
        //$group1find = $this->group->find(array('group_id'=> $group1_id));
        $group1find = new Group($group1_id);
        $users = $group1find->get_users();
        $this->unit->run(count($users),
                0,
                '$group1find = find by id | [R] 看看get_users數量是否為0');

        //建立$group2
        //把$group2加入$group1中
        $group2 = $this->group->create_group($this->url, $this->group_name2);
        $group1->add_actor($group2);

        //從$group1中get_group
        //[R]檢查groups[0]是否跟$group2->equals()
        $groups = $group1->get_groups();
        $this->unit->run($group2->equals($groups[0]),
                TRUE,
                '從$group1中get_group | [R]檢查groups[0]是否跟$group2->equals()');

        //建立$user2
        //把$user2加入$group2中
        //取得$user2->get_parent_groups()
        //[R] 檢查數量是否有2個
        $user2 = $this->user->create_user($this->url, $this->user_name2);
        $group2->add_actor($user2);
        $groups = $user2->get_parent_groups();
        $this->unit->run(count($groups),
                2,
                '建立$user2 | 把$user2加入$group2中 | 取得$user2->get_parent_groups() | [R] 檢查數量是否有2個');

        //[R] 檢查第一個是否equals $group1
        $this->unit->run($groups[0]->equals($group2),
                TRUE,
                '[R] 檢查第一個是否equals $group2');

        //[R] 檢查第二個是否跟$group2的名稱一樣
        $this->unit->run($group1->equals($groups[1]),
                TRUE,
                '[R] 檢查第二個是否跟$group1的名稱一樣');

        //刪除$group1
        $group1->delete();

        //取得$user2的get_parent_groups
        //[R] 數量是否為1
        $groups = $user2->get_parent_groups();
        $this->unit->run(count($groups),
                1,
                '取得$user2的get_parent_groups | [R] 數量是否為1');

        //[R] 是否equals $group2
        $this->unit->run($groups[0]->equals($group2),
                TRUE,
                '[R] 是否equals $group2');

        //刪除$group2
        $group2->delete();

        //[R] 確認$group2的名稱消失
        $this->unit->run($group2->get_name(),
                NULL,
                '刪除$group2 | [R] 確認$group2的名稱消失');

        //用id去找尋$group1
        //[R] 確認找不到
        //$group1find = $this->group->find('group_id', $group1_id);
        $group1find = new Group($group1_id);
        $this->unit->run($group1find->get_name(),
                NULL,
                '用id去找尋$group1 | [R] 確認get_name取不到名字');

        //刪除$user1 $user2
        //用資料庫刪除
//        $user1_id = $user1->get_id();
//        $user2_id = $user2->get_id();
//        $user1->delete();
//        $user2->delete();
//        $this->db->delete('domain2user', array('user_id'=>$user1_id));
//        $this->db->delete('domain2user', array('user_id'=>$user2_id));
//        $this->db->delete('user', array('user_id'=>$user1_id));
//        $this->db->delete('user', array('user_id'=>$user2_id));

//        $this->unit->run($test_result,
//                $expected_result,
//                $test_name);

        unit_test_report($this);
    }
}


/* End of file ut_group.php */
/* Location: ./system/application/helpers/ut_group.php */