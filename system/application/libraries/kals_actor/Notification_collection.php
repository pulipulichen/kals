<?php
/**
 * Notification_collection
 *
 * 通知的合集
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/10 上午 01:35:59
 */
class Notification_collection extends Generic_collection {

    # Memver Varibles
    protected $table_name = 'notification';
    protected $index_field = 'association_user_id';
    protected $type_field = 'notification_type_id';
    protected $data_fields = array('notification_id', 'create_timestamp','update_timestamp','read'
        ,'association_user_id', 'trigger_actor_type_id', 'trigger_actor_id', 'trigger_resource_type_id', 'trigger_resource_id', 'notification_type_id');

    protected $order_by = 'create_timestamp desc';

    protected $class_name = array(
        1 => 'Notification_responded',
        2 => 'Notification_liked',
        3 => 'Notification_recommended'
    );
    protected $class_dir = 'kals_actor/';

    protected $limit = 20;
    private $limit_unread = FALSE;

    protected function _load_custom()
    {
        if ($this->limit_unread)
        {
            $db = $this->db;
            $db->where('read', 'FALSE');
        }
    }

    public function set_limit_read($read = TRUE)
    {
        $this->limit_unread = $read;
        return $this;
    }

    public function get_lastest($limit = NULL, $offset = NULL)
    {
        $coll = new Notification_collection($this->index_object);
        if (isset($limit))
            $coll->set_limit ($limit);
        if (isset ($offset))
            $coll->set_offset ($offset);
        return $coll;
    }

    public function get_unread($limit = NULL, $offset = NULL)
    {
        $coll = $this->get_lastest($limit, $offset);
        $coll->set_limit_read(TRUE);
        return $coll;
    }

    public function get_unread_count()
    {
        $id = $this->get_id();

        $db = $this->db;
        $db->where('read', 'FALSE');
        $db->where($this->index_field, $id);
        $count = $db->count_all_results($this->table_name);

        return $count;
    }
}


/* End of file Notification_collection.php */
/* Location: ./system/application/libraries/kals_actor/Notification_collection.php */