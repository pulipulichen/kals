<?php
/**
 * Annotation_like
 *
 * 喜歡標註
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
-- Table: annotation2like

-- DROP TABLE annotation2like;

CREATE TABLE annotation2like
(
  annotation2like_id serial NOT NULL,
  annotation_id integer NOT NULL,
  user_id integer NOT NULL,
  create_timestamp time with time zone NOT NULL DEFAULT now(),
  canceled boolean NOT NULL DEFAULT false,
  update_timestamp time with time zone NOT NULL DEFAULT now(),
  CONSTRAINT annotation2like_pkey PRIMARY KEY (annotation2like_id),
  CONSTRAINT annotation2like_annotation_id_fkey FOREIGN KEY (annotation_id)
      REFERENCES annotation (annotation_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT annotation2like_user_id_fkey FOREIGN KEY (user_id)
      REFERENCES "user" (user_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (OIDS=FALSE);
ALTER TABLE annotation2like OWNER TO postgres;
 * </code>
 */
class Annotation_like extends Generic_attribute_object {


    //------------------------------------
    # Generic Attribute Object

    protected $table_name = 'annotation2like';
    protected $primary_key = 'annotation2like_id';
    protected $table_fields = array('annotation2like_id', 'annotation_id', 'user_id', 'create_timestamp', 'update_timestamp', 'canceled');
    protected  $not_null_field = array('annotation_id' , 'user_id');
    protected $unique_restriction = array('annotation_id', 'user_id');
    protected  $default_field = 'canceled';
    //protected $fake_delete = 'canceled';

    protected $type_field = 'user_id';

    protected function  _set_field_filter($cond) {
        if (isset($cond['canceled']) && isset($this->id))
        {
            $cond['update_timestamp'] = get_timestamp();
        }
        return $cond;
    }

    protected function  _post_update() {
        parent::_post_update();
        //假如是喜歡的話……
        $canceled = $this->get_field('canceled');
        if ($canceled === FALSE OR $canceled == 'FALSE' OR $canceled == 'f')
        {
            $annotation_id = intval($this->get_field('annotation_id'));
            $user_id = intval($this->get_field('user_id'));
            if ($annotation_id != 0 && $user_id != 0)
            {
                $this->_CI_load('library', 'kals_resource/Annotation', 'annotation');
                $this->_CI_load('library', 'kals_actor/User', 'user');
                $trigger_resource = new Annotation($annotation_id);
                $association_user = $trigger_resource->get_user();
                $trigger_actor = new User($user_id);

                $this->_CI_load('library', 'kals_actor/Notification_liked', 'notification_liked');
                $notification = $this->CI->notification_liked
                        ->create_notification($association_user, $trigger_resource, $trigger_actor);
                if (is_null($notification))
                {
                    handle_error($this->lang->line('notification.liked.create_notification.exception'));
                }
            }
        }   //if ($canceled == FALSE OR $canceled == 'FALSE')
    }

    public function is_like()
    {
        $canceled = $this->get_field('canceled');
        if ($canceled === FALSE OR $canceled == 'FALSE' OR $canceled == 'f')
            return TRUE;
        else
            return FALSE;
    }

}


/* End of file Annotation_feature.php */
/* Location: ./system/application/libraries/annotation/Annotation_feature.php */