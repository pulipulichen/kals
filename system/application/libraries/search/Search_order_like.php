<?php
include_once 'Search_order.php';
/**
 * Search_order_like
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
class Search_order_like extends Search_order {

    public $type_id = 3;
    public $name = 'search.order.like';

    public function setup_order(CI_DB_active_record $db)
    {

//        $db->select('(SELECT count(user_id) '
//                . 'FROM annotation2like JOIN annotation ON annotation2like.annotation.id = annotation.annotation.id) '
//                . 'GROUP BY annotation_id WHERE annotation.annotation_id');

        $db->join('annotation2like_count AS order_like', 'order_like.annotation_id = annotation.annotation_id ');
        $db->select('order_like.like_count');
        $db->order_by('order_like.like_count', $this->get_direction());
        return $db;
    }
}


/* End of file Search_order_like.php */
/* Location: ./system/application/libraries/search/Search_order_like.php */