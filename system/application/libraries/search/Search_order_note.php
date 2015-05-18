<?php
include_once 'Search_order.php';
/**
 * Search_order_note
 *
 * 搜尋的排序選項：note相關度
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/13 下午 04:58:24
 */
class Search_order_note extends Search_order {

    public $type_id = 8;
    public $name = 'search.order.note';

    public function setup_order(CI_DB_active_record $db)
    {
        $db->select('ts_rank_cd(annotation.note_index, "search_note_query") AS search_note_rank', FALSE);
        $db->order_by('search_note_rank', $this->get_direction());

        return $db;
    }
}


/* End of file Search_order_note.php */
/* Location: ./system/application/libraries/search/Search_order_note.php */