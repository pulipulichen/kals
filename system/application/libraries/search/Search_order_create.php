<?php
include_once 'Search_order.php';
/**
 * Search_order_create
 *
 * 搜尋的排序選項：標註建立時間
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/13 下午 04:58:24
 */
class Search_order_create extends Search_order {

    public $type_id = 7;
    public $name = 'search.order.create';

    public function setup_order(CI_DB_active_record $db)
    {
        $db->order_by('annotation.create_timestamp', $this->get_direction());
        return $db;
    }
}


/* End of file Search_order_create.php */
/* Location: ./system/application/libraries/search/Search_order_create.php */