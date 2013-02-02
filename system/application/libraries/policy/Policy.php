<?php
//require_once '';
/**
 * Policy
 *
 * 權限
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/25 下午 08:05:32
 * @property CI_DB_active_record $db
 * @property CI_Base $CI
 * @property CI_Language $lang
 * @property KALSResource $resource
 * @property Action $action
 * @example
 * 資料表建立：<code>

-- Table: policy

-- DROP TABLE policy;

CREATE TABLE policy
(
  policy_id serial NOT NULL,
  action_id integer NOT NULL,
  resource_type_id integer NOT NULL,
  resource_id integer NOT NULL,
  CONSTRAINT policy_pkey PRIMARY KEY (policy_id)
)
WITH (OIDS=FALSE);
ALTER TABLE policy OWNER TO postgres;

-- Table: policy2actor

-- DROP TABLE policy2actor;

CREATE TABLE policy2actor
(
  policy2actor_id serial NOT NULL,
  policy_id integer NOT NULL,
  actor_type_id integer NOT NULL,
  actor_id integer NOT NULL,
  CONSTRAINT policy2actor_pkey PRIMARY KEY (policy2actor_id),
  CONSTRAINT policy2actor_policy_id_fkey FOREIGN KEY (policy_id)
      REFERENCES policy (policy_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (OIDS=FALSE);
ALTER TABLE policy2actor OWNER TO postgres;

 * </code>
 */
class Policy extends Generic_object {

    protected $table_name = 'policy';
    protected $table_fields = array('policy_id', 'action_id', 'resource_type_id', 'resource_id');
    protected $primary_key = 'policy_id';
    protected $not_null_field = array('action_id', 'resource_type_id', 'resource_id');
    protected $unique_restriction = array('action_id', 'resource_type_id', 'resource_id');

    private $throw_exception = FALSE;
    
    private $asso_name = 'policy2actor';
    private $asso_pk = 'policy2actor_id';

    protected function _post_construct($table_name = NULL, $id = NULL)
    {
        $this->_CI_load('library', 'kals_actor/KALS_actor', 'kals_actor');
        $this->_CI_load('library', 'policy/Action_factory', 'action_factory');
    }

    protected function _set_field_filter($cond)
    {
        if (array_key_exists('resource', $cond))
        {
            $cond['resource_type_id'] = $cond['resource']->get_type_id();
            $cond['resource_id'] = $cond['resource']->get_id();
        }
        if (array_key_exists('action', $cond))
        {
            $cond['action_id'] = $cond['action']->get_id();
        }
        return $cond;
    }

    public function create_policy($resource, $action_id, $actors = array())
    {
        $data = $this->_create_policy_cond($resource, $action_id);

        $policy = $this->find($data);

        if (is_null($policy))
        {
            $policy = $this->create($data);
            foreach($actors AS $actor)
            {
                $policy->add_actor($actor);
            }
        }

        return $policy;
    }

    public function find_policy($resource, $action_id)
    {
        $cond = $this->_create_policy_cond($resource, $action_id);
        return $this->find($cond);
    }

    private function _create_policy_cond($resource, $action_id)
    {
        $action_id = $this->CI->action_factory->filter_action_id($action_id);
        $cond = array(
            'action_id' => $action_id,
            'resource_type_id' => $resource->get_type_id(),
            'resource_id' => $resource->get_id()
        );
        return $cond;
    }

    private function _check_action($action_id)
    {
        return $this->CI->action_factory->create($action_id);
    }

    protected function _pre_delete()
    {
        $this->empty_actors();
    }

    public function set_resource($resource)
    {
        $this->set_field('resource', $resource);
    }

    public function get_resource()
    {
        return $this->get_field('resource');
    }

    public function set_action($action)
    {
        $this->set_field('action', $action);
    }

    public function get_action()
    {
        return $this->get_field(('action'));
    }

    public function set_throw_exception($throw)
    {
        $this->throw_exception = $throw;
        return $this;
    }

    public function set_actors($actors)
    {
        $id = $this->get_id();
        $pk = $this->primary_key;
        $db = $this->db;

        $this->empty_actors();

        foreach($actors AS $actor)
        {
            $data = $this->_create_actor_cond($actor);
            $db->insert('policy2actor', $data);
        }
        return $this;
    }

    public function empty_actors()
    {
        //刪除policy2actor
        $id = $this->get_id();
        $db = $this->db;
        $pk = $this->primary_key;

        $db->delete('policy2actor', array($pk=>$id));
    }

    public function get_actors()
    {
        $id = $this->get_id();
        $db = $this->db;
        $pk = $this->primary_key;

        $db->from('policy2actor')
                ->where($pk, $id);
        $query = $db->get();
        $list = array();
        foreach ($query->result_array() AS $row)
        {
            $actor_id = $row['actor_id'];
            $actor_type_id = $row['actor_type_id'];
            $actor = $this->CI->kals_actor->find_actor($actor_type_id, $actor_id);
            array_push($list, $actor);
        }
        return $list;
    }

    public function in_actors($actor)
    {
        $cond = $this->_create_actor_cond($actor);

        $db = $this->db;
        $db->where($cond);
        $count = $db->count_all_results('policy2actor');
        return ($count > 0);
    }

    function has_actors()
    {
        $cond = $this->_create_actor_cond();

        $db = $this->db;
        $db->where($cond);
        $count = $db->count_all_results('policy2actor');
        return ($count > 0);
    }

    private function _create_actor_cond($actor = NULL)
    {
        $cond = array();
        if ($actor != NULL)
        {
            $cond = array(
                $this->primary_key => $this->get_id(),
                'actor_type_id' => $actor->get_type_id(),
                'actor_id' => $actor->get_id()
            );
        }

        $cond[$this->primary_key] = $this->get_id();

        return $cond;
    }

    function add_actor($actor)
    {
        if ($this->in_actors($actor))
        {
            return $this;
        }

        $data = $this->_create_actor_cond($actor);
        $this->db->insert('policy2actor', $data);

        return $this;
    }

    function remove_actor($actor)
    {
        $data = $this->_create_actor_cond($actor);
        $this->db->delete('policy2actor', $data);

        if (FALSE === $this->has_actors())
        {
            $this->delete();
        }

        return $this;
    }

    /**
     * 檢查Actor及其所屬群組是否有在這個Policy中。
     * @param KALS_actor $actor
     * @return boolean
     */
    function allow($actor)
    {
        //加入Context的Ignore Authorize
        if (get_ignore_authorize ())
            return TRUE;

        if (is_null($actor))
        {
            return $this->action->default_allow;
        }

        $actors = $actor->get_parent_groups();
        array_push($actors, $actor);

        $passed = FALSE;
        foreach ($actors AS $a)
        {
            if ($this->in_actors($a))
            {
                $passed = TRUE;
                break;
            }
        }
        return $passed;
    }
}


/* End of file Policy.php */
/* Location: ./system/application/libraries/.../Policy.php */