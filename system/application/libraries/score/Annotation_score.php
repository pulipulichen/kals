<?php
/**
 * Annotation_score
 *
 * 標註分數
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/6 下午 09:47:16
 * @example
 * 資料表建立：<code>

-- Table: score

-- DROP TABLE score;

CREATE TABLE score
(
  score_id serial NOT NULL,
  annotation_id integer NOT NULL,
  score_type_id integer NOT NULL DEFAULT 1,
  score numeric NOT NULL,
  CONSTRAINT score_pkey PRIMARY KEY (score_id),
  CONSTRAINT score_annotation_id_fkey FOREIGN KEY (annotation_id)
      REFERENCES annotation (annotation_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (OIDS=FALSE);
ALTER TABLE score OWNER TO postgres;

 * </code>
 */
class Annotation_score extends Generic_attribute_object {

    # Memver Varibles
    protected $type_id;
    protected $name;

    //------------------------------------
    # Generic Attribute Object

    protected $table_name = 'score';
    protected $primary_key = 'score_id';
    protected $table_fields = array('score_id', 'annotation_id', 'score_type_id', 'score');
    protected  $not_null_field = array('annotation_id' , 'score_type_id', 'score');
    protected  $default_field = 'score';

    protected $type_field = 'score_type_id';

    public function get_score()
    {
        return (float) $this->get_field('score');
    }

    public function set_score($score)
    {
        return $this->set_field('score', $score);
    }
}


/* End of file Annotation_score.php */
/* Location: ./system/application/libraries/score/Annotation_score.php */