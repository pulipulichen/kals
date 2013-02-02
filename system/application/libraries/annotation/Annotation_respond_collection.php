<?php
include_once 'Annotation_collection.php';
/**
 * Annotation_respond_collection
 *
 * 標註回應的集合
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/8 下午 05:10:18
 * @example
 * 資料表建立：<code>
-- Table: annotation2respond

-- DROP TABLE annotation2respond;

CREATE TABLE annotation2respond
(
  annotation2respond_id serial NOT NULL,
  annotation_id integer NOT NULL,
  respond_to integer NOT NULL,
  CONSTRAINT annotation2respond_pkey PRIMARY KEY (annotation2respond_id),
  CONSTRAINT annotation2respond_annotation_id_fkey FOREIGN KEY (annotation_id)
      REFERENCES annotation (annotation_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT annotation2respond_respond_to_fkey FOREIGN KEY (respond_to)
      REFERENCES annotation (annotation_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (OIDS=FALSE);
ALTER TABLE annotation2respond OWNER TO postgres;

-- Index: fki_annotation2respond_respond_to

-- DROP INDEX fki_annotation2respond_respond_to;

CREATE INDEX fki_annotation2respond_respond_to
  ON annotation2respond
  USING btree
  (respond_to);

-- View: annotation2respond_count

-- DROP VIEW annotation2respond_count;

CREATE OR REPLACE VIEW annotation2respond_count AS
 SELECT annotation.annotation_id, count(annotation2respond.annotation_id) AS responded_count
   FROM annotation
   LEFT JOIN annotation2respond ON annotation.annotation_id = annotation2respond.respond_to
  GROUP BY annotation.annotation_id;

ALTER TABLE annotation2respond_count OWNER TO postgres;
GRANT ALL ON TABLE annotation2respond_count TO postgres;
GRANT SELECT ON TABLE annotation2respond_count TO public;


 * </code>
 */
class Annotation_respond_collection extends Annotation_collection {

    protected $table_name = 'annotation2respond';
    protected $index_field = 'annotation_id';
    protected $foreign_field = 'respond_to';

    protected $class_table_name = 'annotation';
    protected $class_foreign_field = 'annotation_id';
    protected $class_name = 'Annotation';
    protected $class_dir = 'kals_resource/';
    protected $association_fake_delete = 'deleted';

    protected $members_readonly = TRUE;

    protected function  _post_update() {
        parent::_post_update();

        if (isset($this->index_object))
        {
            $members = $this->_pre_update($this->members);

            foreach($members AS $trigger_resource)
            {
                $this->_CI_load('library', 'kals_actor/User', 'user');
                $association_user = $trigger_resource->get_user();
                $trigger_actor = $this->index_object->get_user();

                $this->_CI_load('library', 'kals_actor/Notification_responded', 'notification_responded');
                $notification = $this->CI->notification_responded
                        ->create_notification($association_user, $trigger_resource, $trigger_actor);
                if (is_null($notification))
                {
                    handle_error($this->lang->line('notification.responded.create_notification.exception'));
                }
            }   //foreach($members AS $trigger_resource)
        }   //if (isset($index_id))
        return $this;
    }

    public function exists_user(User $user)
    {
        $existed = FALSE;
        foreach ($this AS $annotation)
        {
            if ($annotation->get_user()->get_id() == $user->get_id())
            {
                $existed = TRUE;
                break;
            }
        }
        return $existed;
    }

    public function export_respond_to_data() {

        $data = array();

        foreach ($this AS $annotation)
        {
            //$data[] = $annotation->export(array(
            //    'annotation_id',
            //    'user'
            //));
            $data[] = array(
                'annotation_id' => $annotation->get_id(),
                'user' => $annotation->get_user()->export_simple_data()
            );
        }

        return $data;
    }

    public function import_respond_to_data($respond_to_data)
    {
        $this->_CI_load('library', 'kals_resource/Annotation', 'annotation');

        if (is_array(($respond_to_data)))
        {
            $members = array();
            foreach ($respond_to_data AS $respond_to)
            {
                $respond_to_id = $respond_to->annotation_id;
                $respond_to_annotation = new Annotation($respond_to_id);
                $members[] = $respond_to_annotation;
            }

            $annotation_respond_colleciton = new Annotation_respond_collection();
            $annotation_respond_colleciton->set_members($members);
            return $annotation_respond_colleciton;
        }
        else
            return NULL;
    }
}


/* End of file Annotation_respond_collection.php */
/* Location: ./system/application/libraries/annotation/Annotation_respond_collection.php */