<?php
include_once 'Search_engine.php';
/**
 * Search_annotation_collection
 *
 * Search_annotation_collection full description.
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/14 下午 12:27:34
 */
class Search_annotation_collection extends Search_engine {

    public function load_default()
    {
        $db = $this->setup_search();

        $db->distinct();
        $db->select('annotation.*');

        //加入other_from
        foreach ($this->other_from AS $from)
            $db->from($from);
        $db->from('annotation');

        $query = $db->get();

        $this->members = array();
        $this->_CI_load('library', 'kals_resource/Annotation', 'annotation');
        foreach ($query->result_array() AS $row)
        {
            $member = new Annotation($row);
            $this->members[] = $member;
        }
        return TRUE;
    }
    
    /**
     * 取得搜尋結果的範圍位置
     * @return Annotation_scope_collection
     */
    public function get_result_scope_coll() {
        $scope_coll = new Annotation_scope_collection();
        
        foreach ($this AS $index => $annotation) {
            $annotation_scope_coll = $annotation->get_scopes();
            //test_msg("get_result_scope_coll" . $index, $annotation_scope_coll->export_);
            $scope_coll->add_scope_collection($annotation_scope_coll);
        }
        
        return $scope_coll;
    }
}


/* End of file Search_annotation_collection.php */
/* Location: ./system/application/libraries/search/Search_annotation_collection.php */