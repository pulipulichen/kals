<?php
include_once 'Search_engine.php';
/**
 * Search_scope_collection
 *
 * 搜尋範圍
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/14 下午 12:27:34
 * @property Annotation_scope_collection $scope_coll
 */
class Search_scope_collection extends search_engine {

    private $scope_coll;
    public function load_default()
    {
        $db = $this->setup_search();

        $db->distinct();
        $db->join('annotation2scope AS select_annotation2scope', 'select_annotation2scope.annotation_id = annotation.annotation_id');
        $db->join('scope AS select_scope', 'select_annotation2scope.scope_id = select_scope.scope_id');
        $db->select('select_scope.*');

        //加入other_from
        foreach ($this->other_from AS $from)
            $db->from($from);
        $db->from('annotation');

        $query = $db->get();

        $this->members = array();
        $this->_CI_load('library', 'scope/Annotation_scope', 'annotation_scope');
        $this->_CI_load('library', 'scope/Annotation_scope_collection', 'annotation_scope_collection');

        $scope_coll = new Annotation_scope_collection();
        foreach ($query->result_array() AS $row)
        {
            $scope = new Annotation_scope($row);
            $scope_coll->add_scope($scope);
        }


        foreach ($scope_coll AS $scope)
        {
            $this->members[] = $scope;
        }
        $this->scope_coll = $scope_coll;
        return TRUE;
    }

    public function get_scope_length()
    {
        $this->_check_callback();
        if (isset($this->scope_coll))
            return $this->scope_coll->get_scope_length ();
        else
            return NULL;
    }
}


/* End of file Search_scope_collection.php */
/* Location: ./system/application/libraries/search/Search_scope_collection.php */