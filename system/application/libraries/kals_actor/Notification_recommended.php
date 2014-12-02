<?php
include_once 'Notification.php';
/**
 * Notification_recommended
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
class Notification_recommended extends Notification {

    # Memver Varibles
    protected $type_id = 3;
    protected $actor_type_id = 1;
    protected $resource_type_id = 3;
    protected $name = 'notification.recommended';

    public function get_template()
    {
        $resource = $this->get_trigger_resource();
        $template = NULL;
        if (isset($resource))
        {
            $resource_name = $this->lang->line('kals_resource.type.'.$resource->get_type_id());
            $template = $this->lang->line($this->get_name(), array($resource_name, $resource->get_id()));
        }
        return $template;
    }
}

/* End of file Notification_recommended.php */
/* Location: ./system/application/libraries/kals_actor/Notification_recommended.php */