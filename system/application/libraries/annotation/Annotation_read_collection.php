<?php
/**
 * Annotation_read_collection
 *
 * 喜愛標註的合集
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/10 上午 01:35:59
 * @example
 * 資料表建立：<code>

-- View: annotation2read_count

-- DROP VIEW annotation2read_count;

CREATE OR REPLACE VIEW annotation2read_count AS
 SELECT annotation.annotation_id, count(annotation2read.user_id) AS read_count
   FROM annotation
   LEFT JOIN annotation2read ON annotation.annotation_id = annotation2read.annotation_id AND annotation2read.canceled = false AND annotation.user_id <> annotation2read.user_id
  GROUP BY annotation.annotation_id;

ALTER TABLE annotation2read_count OWNER TO postgres;
GRANT ALL ON TABLE annotation2read_count TO postgres;
GRANT SELECT ON TABLE annotation2read_count TO public;



 * </code>
 */
class Annotation_read_collection extends Generic_attribute_collection {

    # Memver Varibles
    protected $table_name = 'annotation2read';
    protected $index_field = 'annotation_id';
    protected $type_field = 'user_id';
    protected $data_fields = array('annotation2read_id', 'annotation_id','user_id', 'canceled', 'create_timestamp', 'update_timestamp');

    protected $class_name = 'Annotation_read';
    protected $class_dir = 'annotation/';

    public function  set_item_data($user_id, $canceled = FALSE) {
        if (is_class($user_id, 'User'))
            $user_id = $user_id->get_id();

        if (isset($this->index_object) && is_int($user_id)
            && $this->index_object->get_field('user_id') == $user_id)
        {
            //不允許跟標註使用者相同的使用者新增
            handle_error('annotation_read_collection.deny_annotation_author.exception');
            return $this;
        }

        return parent::set_item_data($user_id
            , array('canceled' => $canceled)
            );
    }

    public function get_read_count()
    {
        $this->update();

//        $db = $this->db;
//        $db->where($this->index_field, $this->id);
//        $db->where('canceled', 'FALSE');
//        return $db->count_all_results($this->table_name);

        $db = $this->db;
        $db->where('annotation_id', $this->id);
        $db->select('read_count');
        $query = $db->get('annotation2read_count');
        
        if ($query->num_rows() > 0)
        {
            $row = $query->row_array();
            $count = $row['read_count'];
            $count = intval($count);
            return $count;
        }
        else
            return 0;
    }

    public function get_read_canceled_count()
    {
        $this->update();

        $db = $this->db;
        $db->where($this->index_field, $this->id);
        $db->where('canceled', 'TRUE');
        return $db->count_all_results($this->table_name);
    }

    public function  exists($key) {
        $exists = parent::exists($key);
        if ($exists === FALSE)
            return FALSE;
        $read = $this->get_item($key);
        return $read->is_read();
    }
}


/* End of file Annotation_feature_collection.php */
/* Location: ./system/application/libraries/annotation/Annotation_feature_collection.php */