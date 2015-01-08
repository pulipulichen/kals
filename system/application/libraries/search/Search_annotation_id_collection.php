<?php
include_once 'Search_engine.php';
/**
 * Search_annotation_id_collection
 *
 * 搜尋標註計算數量時使用，只載入id，不實體化Annotation，查詢速度比較快
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/14 下午 12:27:34
 */
class Search_annotation_id_collection extends search_engine {
    public function load_default()
    {
        $db = $this->setup_search();

        $db->distinct();
        $db->select('annotation.annotation_id');

        //加入other_from
        foreach ($this->other_from AS $from) {
            $db->from($from);
        }
        $db->from('annotation');

        $query = $db->get();

        $this->members = array();
        foreach ($query->result_array() AS $row)
        {
            $member = $row['annotation_id'];
            $this->members[] = $member;
        }
        return TRUE;
    }
}


/* End of file Search_annotation_id_collection.php */
/* Location: ./system/application/libraries/search/Search_annotation_id_collection.php */