<?php
include_once 'Notification.php';
/**
 * Notification_responded
 *
 * 通知
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/6 下午 09:47:16
 */
class Notification_responded extends Notification {

    # Memver Varibles
    protected $type_id = 1;
    protected $actor_type_id = 1;
    protected $resource_type_id = 3;
    protected $name = 'notification.responded';

}

/* End of file Notification_responded.php */
/* Location: ./system/application/libraries/kals_actor/Notification_responded.php */