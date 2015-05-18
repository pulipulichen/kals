<?php
/**
 * Annotation_score_collection
 *
 * 標註分數的集合
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

-- View: annotation2score

-- DROP VIEW annotation2score;

CREATE OR REPLACE VIEW annotation2score AS
 SELECT annotation.annotation_id,
        CASE
            WHEN score.score IS NOT NULL THEN score.score
            ELSE 0::numeric
        END AS score
   FROM annotation
   LEFT JOIN score ON annotation.annotation_id = score.annotation_id AND score.score_type_id = 0;

ALTER TABLE annotation2score OWNER TO postgres;


 * </code>
 */
class Annotation_score_collection extends Generic_attribute_collection {

    # Memver Varibles
    protected $table_name = 'score';
    protected $index_field = 'annotation_id';
    protected $type_field = 'score_type_id';
    protected $data_fields = array('score_id', 'annotation_id', 'score_type_id', 'score');

    protected $class_name = array(
        0 => 'Annotation_score_integrated',
        1 => 'Annotation_score_consensus',
        2 => 'Annotation_score_like',
        3 => 'Annotation_score_type',
        4 => 'Annotation_score_speech',
        5 => 'Annotation_score_length',
        6 => 'Annotation_score_location'
    );
    protected $class_dir = 'score/';

    public function set_scores($scores)
    {
        //test_msg($scores);

        foreach ($this->class_name AS $type_id => $type)
        {
            $score_object = $this->get_item($type_id);
            //test_msg($score_object, array($type_id, isset($scores[$type_id]),$scores[$type_id]));
            $score_object->
                    set_score($scores[$type_id]);
            //test_msg($score_object, 'pass');
            $score_object->update();
        }
        return $this;
    }

    public function get_scores_array()
    {
        $output = array();
        foreach ($this->class_name AS $type_id => $type)
        {
            $score_object = $this->get_item($type_id);
            $output[] = $score_object->get_score();
        }
        return $output;
    }
}


/* End of file Annotation_score_collection.php */
/* Location: ./system/application/libraries/annotation/Annotation_score_collection.php */