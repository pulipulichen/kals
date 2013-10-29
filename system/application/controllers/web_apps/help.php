<?php
include_once 'web_apps_controller.php';
/**
 * help
 *
 * help full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/9/1 下午 03:17:08
 */

class help extends Web_apps_controller {

    function __construct()
    {
        parent::Controller();
    }

    function index()
    {
        //log區
        $array_data = array(
           'ip' => get_client_ip(),
           'browser' => $_SERVER['HTTP_USER_AGENT'],
           'request_uri' => $_SERVER["REQUEST_URI"]
        );

        $user = get_context_user();
        $user_id = NULL;
        if (isset($user))
            $user_id = $user->get_id();

        $action = 28;
        kals_log($this->db, $action, array('memo'=>$array_data, 'user_id' => $user_id));

        $this->load->view('help/index');
    }
}

/* End of file help.php */
/* Location: ./system/application/controllers/help.php */