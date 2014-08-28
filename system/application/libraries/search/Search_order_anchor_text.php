<?php
include_once 'Search_order.php';
/**
 * Search_order_anchor_text
 *
 * 搜尋的排序選項：anchor_text相關度
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/13 下午 04:58:24
 */
class Search_order_anchor_text extends Search_order {

    public $type_id = 9;
    public $name = 'search.order.anchor_text';

    public function setup_order(CI_DB_active_record $db)
    {
        $db->select('ts_rank_cd(annotation.note_index, "search_anchor_text_query") AS search_anchor_text_rank', FALSE);
        $db->order_by('search_anchor_text_rank', $this->get_direction());

        //$db->order_by('ts_rank_cd(search_anchor_text.indexed, search_anchor_text_query, 1)', $this->get_direction());

        return $db;
    }
}


/* End of file Search_order_anchor_text.php */
/* Location: ./system/application/libraries/search/Search_order_anchor_text.php */