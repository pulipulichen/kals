<?php
include_once 'Search_order.php';
/**
 * Search_order_read
 *
 * 搜尋的排序選項：喜愛程度
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/13 下午 04:58:24
 */
class Search_order_read extends Search_order {

    public $type_id = 3;
    public $name = 'search.order.read';

    public function setup_order(CI_DB_active_record $db)
    {

//        $db->select('(SELECT count(user_id) '
//                . 'FROM annotation2read JOIN annotation ON annotation2read.annotation.id = annotation.annotation.id) '
//                . 'GROUP BY annotation_id WHERE annotation.annotation_id');

        $db->join('annotation2read_count AS order_read', 'order_read.annotation_id = annotation.annotation_id ');
        $db->select('order_read.read_count');
        $db->order_by('order_read.read_count', $this->get_direction());
        return $db;
    }
}


/* End of file Search_order_read.php */
/* Location: ./system/application/libraries/search/Search_order_read.php */