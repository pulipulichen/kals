<?php
include_once 'Search_order.php';
/**
 * Search_order_score
 *
 * 搜尋的排序選項：分數
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/13 下午 04:58:24
 */
class Search_order_score extends Search_order {

    public $type_id = 1;
    public $name = 'search.order.score';

    public function setup_order(CI_DB_active_record $db)
    {
        //$CI =& get_instance();
        //$CI->load->library('score/Annotation_score_integrated');
        //$score_type_id = $CI->annotation_score_integrated->get_type_id();
        
        //$db->join('score AS order_score', 'order_score.annotation_id = annotation.annotation_id AND order_score.score_type_id = '.$score_type_id);
        $db->join('annotation2score AS order_score', 'order_score.annotation_id = annotation.annotation_id');

        $db->select('order_score.score');
        $db->order_by('order_score.score', $this->get_direction());
        return $db;
    }
}


/* End of file Search_order_score.php */
/* Location: ./system/application/libraries/search/Search_order_score.php */