<?php
include_once 'Search_order.php';
/**
 * Search_order_author
 *
 * 搜尋的排序選項：作者姓名
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/13 下午 04:58:24
 */
class Search_order_author extends Search_order {

    public $type_id = 5;
    public $name = 'search.order.author';
    public $desc = FALSE;

    public function setup_order(CI_DB_active_record $db)
    {
        $db->join('user AS order_user', 'order_user.user_id = annotation.user_id');
        $db->select('order_user.name');
        $db->order_by('order_user.name', $this->get_direction());

        return $db;
    }
}


/* End of file Search_order_author.php */
/* Location: ./system/application/libraries/search/Search_order_author.php */