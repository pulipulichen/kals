<?php
/**
 * ut_context
 *
 * ut_context full description.
 *
 * @package		KALS
 * @category		Unit Tests
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/15 下午 01:00:05
 * @property User $user
 */
class Ut_context extends Controller {

    var $url = 'http://www.plurk.com/p/6cz3zb';
    var $email = 'test_context_user@gmail.com';

    function __construct()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->library('kals_actor/User');

        create_context(TRUE);
        $this->unit->set_benchmark('Construc Complete');
    }

    function index()
    {
        $this->unit->run(get_context_domain()->get_host()
                , 'http://localhost/'
                , '測試get_context_domain()');

        $this->unit->run(get_context_domain()->get_id()
                , 'is_int'
                , '測試get_context_domain() id');

        $this->unit->run(get_context_webpage()->get_uri()
                //, '/CodeIgniter_1.7.2/index.php/unit_test'
                , '/CodeIgniter_1.7.2/unit_test'
                , '測試get_context_webpage()，應該是得到來自上一個的網頁');

        $this->unit->run(get_context_webpage()->get_id()
                , 'is_int'
                , '測試get_context_webpage() id');

        //-------------------------------

        clear_context_user();
        $user = get_context_user();
        $this->unit->run(get_class($user)
                , null
                , '未登入之前測試get_current_user()');

        $user = $this->user->create_user($this->url, $this->email);
        $this->unit->run($user->get_id()
                , 'is_int'
                , '建立一個'.$this->email.'看看，id有沒有進去');
        
        set_context_user($user);
        context_complete();

        ?>
<a href="ut_context/check_user">確認是否有建立好user</a>
<?php

//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        //context_complete();
        unit_test_report($this);
    }

    function check_user()
    {
        $user = get_context_user();
        $this->unit->run(get_class($user)
                , 'User'
                , '登入之後測試get_context_user()');
        $this->unit->run($user->get_id()
                , 'is_int'
                , '登入之後測試get_context_user()的id');
        $this->unit->run($user->get_email()
                , $this->email
                , '登入之後測試get_context_user()的email');
        unit_test_report($this);
    }
}
/* End of file ut_context.php */
/* Location: ./system/application/controllers/ut_.../ut_context.php */