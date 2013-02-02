<?php
include_once 'Search_order.php';
/**
 * Search_order_scope
 *
 * 搜尋的排序選項：範圍
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/13 下午 04:58:24
 */
class Search_order_scope extends Search_order {

    public $type_id = 2;
    public $name = 'search.order.scope';
    public $desc = FALSE;

    public function setup_order(CI_DB_active_record $db)
    {
        $db->join('annotation2scope AS order_annotation2scope', 'order_annotation2scope.annotation_id = annotation.annotation_id');
        $db->join('scope AS order_scope', 'order_scope.scope_id = order_annotation2scope.scope_id');
        if ($this->desc === TRUE)
        {
            $db->select('order_scope.to_index');
            $db->order_by('order_scope.to_index', $this->get_direction());
        }
        else
        {
            $db->select('order_scope.from_index');
            $db->order_by('order_scope.from_index');
        }
        return $db;
    }
}


/* End of file Search_order_scope.php */
/* Location: ./system/application/libraries/search/Search_order_scope.php */