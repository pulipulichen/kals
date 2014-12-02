<?php
include_once 'web_apps_controller.php';
/**
 * notification
 *
 * notification full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/10/5 下午 03:59:59
 */

class notification extends Web_apps_controller {

    protected $controller_enable_cache = FALSE;
    protected $login_require = TRUE;

    public function count_unread()
    {
        $user = get_context_user();

        $unread = $user->get_unread_notification_count();
    }

    public function get_list($limit = 10, $page = 1)
    {

    }

    public function get_unread_list($limit = 10, $page = 1)
    {

    }

    public function set_read($nid) {

    }

    private function _setup() {
        //這到底要幹嘛用的？
    }
}

/* End of file notification.php */
/* Location: ./system/application/controllers/notification.php */