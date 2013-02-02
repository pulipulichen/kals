<?php
/**
 * Annotation_like_collection
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

-- View: annotation2like_count

-- DROP VIEW annotation2like_count;

CREATE OR REPLACE VIEW annotation2like_count AS
 SELECT annotation.annotation_id, count(annotation2like.user_id) AS like_count
   FROM annotation
   LEFT JOIN annotation2like ON annotation.annotation_id = annotation2like.annotation_id AND annotation2like.canceled = false AND annotation.user_id <> annotation2like.user_id
  GROUP BY annotation.annotation_id;

ALTER TABLE annotation2like_count OWNER TO postgres;
GRANT ALL ON TABLE annotation2like_count TO postgres;
GRANT SELECT ON TABLE annotation2like_count TO public;



 * </code>
 */
class Annotation_like_collection extends Generic_attribute_collection {

    # Memver Varibles
    protected $table_name = 'annotation2like';
    protected $index_field = 'annotation_id';
    protected $type_field = 'user_id';
    protected $data_fields = array('annotation2like_id', 'annotation_id','user_id', 'canceled', 'create_timestamp', 'update_timestamp');

    protected $class_name = 'Annotation_like';
    protected $class_dir = 'annotation/';

    public function  set_item_data($user_id, $canceled = FALSE) {
        if (is_class($user_id, 'User'))
            $user_id = $user_id->get_id();

        if (isset($this->index_object) && is_int($user_id)
            && $this->index_object->get_field('user_id') == $user_id)
        {
            //不允許跟標註使用者相同的使用者新增
            handle_error('annotation_like_collection.deny_annotation_author.exception');
            return $this;
        }

        return parent::set_item_data($user_id
            , array('canceled' => $canceled)
            );
    }

    public function get_like_count()
    {
        $this->update();

//        $db = $this->db;
//        $db->where($this->index_field, $this->id);
//        $db->where('canceled', 'FALSE');
//        return $db->count_all_results($this->table_name);

        $db = $this->db;
        $db->where('annotation_id', $this->id);
        $db->select('like_count');
        $query = $db->get('annotation2like_count');
        
        if ($query->num_rows() > 0)
        {
            $row = $query->row_array();
            $count = $row['like_count'];
            $count = intval($count);
            return $count;
        }
        else
            return 0;
    }

    public function get_like_canceled_count()
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
        $like = $this->get_item($key);
        return $like->is_like();
    }
}


/* End of file Annotation_feature_collection.php */
/* Location: ./system/application/libraries/annotation/Annotation_feature_collection.php */