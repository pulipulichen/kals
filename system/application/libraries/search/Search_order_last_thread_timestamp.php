<?php
include_once 'Search_order.php';
/**
 * Search_order_last_thread_timestamp
 *
 * 搜尋的排序選項：若有最新的回應則以最新回應時間優先(update_timestamp)，若無則為自己的creat_timestamp
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/13 下午 04:58:24
 */
class Search_order_last_thread_timestamp extends Search_order {

    public $type_id = 10;
    public $name = 'search.order.last_thread_timestamp';
    public $desc = TRUE;

    public function setup_order(CI_DB_active_record $db)
    {
        $last_thread_timestamp_view = '(SELECT topic_annotation.annotation_id, 
       annotation2topic_respond_count.topic_responded_count, 
       CASE
         WHEN annotation2topic_respond_count.topic_responded_count!=0
           THEN topic_annotation.update_timestamp
         WHEN annotation2topic_respond_count.topic_responded_count =0
           THEN topic_annotation.create_timestamp
       END AS last_timestamp
FROM annotation AS topic_annotation, annotation2topic_respond_count
WHERE 
topic_annotation.annotation_id = annotation2topic_respond_count.annotation_id
AND topic_annotation.topic_id IS NULL) as thread_timestamp_view';
        
        $db->join($last_thread_timestamp_view, 'thread_timestamp_view.annotation_id = annotation.annotation_id');
        $db->select('thread_timestamp_view.last_timestamp AS thread_last_timestamp');
        $db->order_by('thread_last_timestamp', $this->get_direction());
        
        return $db;
    }
}

/* End of file Search_order_update.php */
/* Location: ./system/application/libraries/search/Search_order_update.php */