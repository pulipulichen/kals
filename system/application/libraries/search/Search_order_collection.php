<?php
/**
 * Search_order_collection
 *
 * 排序選項的集合
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/13 下午 05:43:21
 */
class Search_order_collection extends Collection {

    protected  $class_name = array(
        1 => 'Search_order_score',
        2 => 'Search_order_scope',
        3 => 'Search_order_like',
        4 => 'Search_order_responded',
        5 => 'Search_order_author',
        6 => 'Search_order_update',
        7 => 'Search_order_create',
        8 => 'Search_order_note',
        9 => 'Search_order_anchor_text'
    );
    protected $class_dir = 'search/';

    public function add_order($type_id, $desc = NULL)
    {
        if (FALSE === is_object($type_id))
        {
            if (!isset($this->class_name[$type_id]))
                 return $this;
            $class_name = $this->class_name[$type_id];
            $class_path = $this->class_dir.$class_name;
            $this->_CI_load('library', $class_path, strtolower($class_name));

            $order = new $class_name();
            if (isset($desc))
                $order->set_desc($desc);
        }
        else
            $order = $type_id;
        return $this->add_item($order);
    }

    public function setup_order(CI_DB_active_record $db)
    {
        foreach ($this AS $order)
        {
            $order->setup_order($db);
        }
        return $db;
    }
}


/* End of file Search_order_collection.php */
/* Location: ./system/application/libraries/.../Search_order_collection.php */