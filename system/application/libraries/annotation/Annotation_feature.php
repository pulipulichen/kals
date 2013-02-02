<?php
/**
 * Annotation_feature
 *
 * 標註特徵
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

-- Table: feature

-- DROP TABLE feature;

CREATE TABLE feature
(
  feature_id serial NOT NULL,
  annotation_id integer NOT NULL,
  feature_type_id integer NOT NULL,
  "value" text,
  CONSTRAINT feature_pkey PRIMARY KEY (feature_id),
  CONSTRAINT feature_annotation_id_fkey FOREIGN KEY (annotation_id)
      REFERENCES annotation (annotation_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (OIDS=FALSE);
ALTER TABLE feature OWNER TO postgres;

-- Index: fki_feature_2_annotation

-- DROP INDEX fki_feature_2_annotation;

CREATE INDEX fki_feature_2_annotation
  ON feature
  USING btree
  (annotation_id);


 * </code>
 */
class Annotation_feature extends Generic_attribute_object {

    # Memver Varibles
    protected $type_id;
    protected $name;

    //------------------------------------
    # Generic Attribute Object

    protected $table_name = 'feature';
    protected $primary_key = 'feature_id';
    protected $table_fields = array('feature_id', 'annotation_id', 'feature_type_id', 'value');
    protected  $not_null_field = array('annotation_id' , 'feature_type_id');
    protected  $default_field = 'value';

    protected $type_field = 'feature_type_id';

    public function  _pre_update($data) {

        if (isset($data['value']) && is_int($data['value']))
            $data['value'] = $data['value'].'';
        return $data;
    }

    public function get_value()
    {
        return $this->get_field('value');
    }
}


/* End of file Annotation_feature.php */
/* Location: ./system/application/libraries/annotation/Annotation_feature.php */