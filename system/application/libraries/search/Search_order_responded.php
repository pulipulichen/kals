<?php
include_once 'Search_order.php';
/**
 * Search_order_responded
 *
 * 搜尋的排序選項：受回應的程度
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/13 下午 04:58:24
 */
class Search_order_responded extends Search_order {

    public $type_id = 4;
    public $name = 'search.order.responded';

    public function setup_order(CI_DB_active_record $db)
    {
        $db->join('annotation2respond_count AS order_respond', 'order_respond.annotation_id = annotation.annotation_id');
        $db->select('order_respond.responded_count');
        $db->order_by('order_respond.responded_count', $this->get_direction());
        return $db;
    }
}


/* End of file Search_order_responded.php */
/* Location: ./system/application/libraries/search/Search_order_responded.php */