<?php
/**
 * Notification
 *
 * 通知
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

-- Table: notification

-- DROP TABLE notification;

CREATE TABLE notification
(
  notification_id serial NOT NULL,
  create_timestamp time with time zone NOT NULL DEFAULT now(),
  "read" boolean NOT NULL DEFAULT false,
  update_timestamp time with time zone NOT NULL DEFAULT now(),
  trigger_actor_type_id integer DEFAULT 1,
  trigger_actor_id integer,
  trigger_resource_type_id integer NOT NULL DEFAULT 3,
  trigger_resource_id integer NOT NULL,
  notification_type_id integer NOT NULL,
  association_user_id integer NOT NULL,
  CONSTRAINT notification_pkey PRIMARY KEY (notification_id),
  CONSTRAINT notification_association_user_id_fkey FOREIGN KEY (association_user_id)
      REFERENCES "user" (user_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT notification_trigger_actor_type_id_key UNIQUE (trigger_actor_type_id, trigger_actor_id, trigger_resource_type_id, trigger_resource_id, association_user_id, notification_type_id)
)
WITH (OIDS=FALSE);
ALTER TABLE notification OWNER TO postgres;

-- Index: fki_notification_association_user_id

-- DROP INDEX fki_notification_association_user_id;

CREATE INDEX fki_notification_association_user_id
  ON notification
  USING btree
  (association_user_id);


 * </code>
 */
class Notification extends Generic_attribute_object {

    # Memver Varibles
    protected $type_id;
    protected $actor_type_id;
    protected $resource_type_id;
    protected $name = 'notification.default';

    //------------------------------------
    # Generic Attribute Object

    protected $table_name = 'notification';
    protected $primary_key = 'notification_id';
    protected $table_fields = array('notification_id', 'create_timestamp', 'update_timestamp', 'read', 'association_user_id'
        , 'trigger_actor_type_id', 'trigger_actor_id', 'trigger_resource_type_id', 'trigger_resource_id', 'notification_type_id');
    protected  $not_null_field = array('association_user_id'
        , 'trigger_resource_type_id', 'trigger_resource_id', 'notification_type_id');
    protected $type_field = 'notification_type_id';
    protected $unique_restriction = array('notification_type_id', 'association_user_id'
        , 'trigger_actor_type_id', 'trigger_actor_id', 'trigger_resource_type_id', 'trigger_resource_id');

    protected function  _set_field_filter($cond) {
        if (isset($cond['read']) && isset($this->id))
        {
            $cond['update_timestamp'] = get_timestamp();
        }
        return $cond;
    }

    public function get_create_timestamp()
    {
        return $this->get_field('create_timestamp');
    }

    public function set_read($b = TRUE)
    {
        if (is_bool($b))
        {
            if ($b)
                $b = 'TRUE';
            else
                $b = 'FALSE';
        }
        return $this->set_field('read', $b);
    }

    public function is_read()
    {
        $read = $this->get_field('read');
        if (is_null($read))
            $read = FALSE;
        else if (is_string($read))
        {
            if (in_array($read, array('t', 'TRUE')))
                $read = TRUE;
            else
                $read = FALSE;
        }
        return $read;
    }

    public function set_association_user($user)
    {
        $this->_CI_load('library', 'kals_actor/User', 'user');
        $user_id = $this->CI->user->filter_id($user);
        return $this->set_field('association_user_id', $user_id);
    }

    public function set_trigger_actor(KALS_actor $actor)
    {
        $data = array(
            'trigger_actor_type_id' => $actor->get_type_id(),
            'trigger_actor_id' => $actor->get_id()
        );
        return $this->set_field($data);
    }

    public function set_trigger_actor_id($actor_id)
    {
        $data = array(
            'trigger_actor_type_id' => $this->actor_type_id,
            'trigger_actor_id' => $actor_id
        );
        return $this->set_field($data);
    }

    /**
     * @return KALS_actor
     */
    public function get_trigger_actor()
    {
        $actor_type_id = $this->get_field('trigger_actor_type_id');
        $actor_id = $this->get_field('trigger_actor_id');
        $this->_CI_load('library', 'kals_actor/KALS_actor', 'kals_actor');
        $actor = $this->CI->kals_actor->find_actor($actor_type_id, $actor_id);
        return $actor;
    }

    public function set_trigger_resource(KALS_resource $resource)
    {
        $data = array(
            'trigger_resource_type_id' => $resource->get_type_id(),
            'trigger_resource_id' => $resource->get_id()
        );
        
        if ($resource->get_type_id() == 3)
        {
            $data['association_user_id'] = $resource->get_field('user_id');
        }

        return $this->set_field($data);
    }

    public function set_trigger_resource_id($resource_id)
    {
        $data = array(
            'trigger_resource_type_id' => $this->resource_type_id,
            'trigger_resource_id' => $resource_id
        );
        return $this->set_field($data);
    }

    /**
     * @return KALS_resource
     */
    public function get_trigger_resource()
    {
        $resource_type_id = $this->get_field('trigger_resource_type_id');
        $resource_id = $this->get_field('trigger_resource_id');
        $this->_CI_load('library', 'kals_resource/KALS_resource', 'kals_resource');
        $resource = $this->CI->kals_resource->find_resource($resource_type_id, $resource_id);
        return $resource;
    }

    public function get_template()
    {
        $actor = $this->get_trigger_actor();
        $resource = $this->get_trigger_resource();
        $template = NULL;
        if (isset($actor) && isset ($resource))
        {
            $resource_name = $this->lang->line('kals_resource.type.'.$resource->get_type_id());
            $template = $this->lang->line($this->get_name(), array($actor->get_name(), $resource_name, $resource->get_id()));
        }
        else if (isset($actor))
        {
            $template = $this->lang->line('notification.default.trigger_actor', array($actor->get_name()));
        }
        else if (isset($resource))
        {
            $resource_name = $this->lang->line('kals_resource.type.'.$resource->get_type_id());
            $template = $this->lang->line('notification.default.trigger_resource', array($resource_name, $resource->get_id()));
        }
        return $template;
    }

    public function create_notification(User $association_actor, KALS_resource $resource, KALS_actor $actor = NULL)
    {

        $data = array(
            'association_user_id' => $association_actor->get_id(),
            'trigger_resource_type_id' => $resource->get_type_id(),
            'trigger_resource_id' => $resource->get_id()
        );

        if (isset($actor))
        {
            $data['trigger_actor_type_id'] = $actor->get_type_id();
            $data['trigger_actor_id'] = $actor->get_id();
        }

        if (!isset($data['association_user_id']) && $resource->get_type_id() == 3)
        {
            $data['association_user_id'] = $resource->get_field('user_id');
        }
        
        $data['notification_type_id'] = $this->get_type_id();
        
        $notification = $this->create($data);
        return $notification;
    }
}


/* End of file Notification.php */
/* Location: ./system/application/libraries/kals_actor/Notification.php */