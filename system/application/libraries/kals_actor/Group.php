<?php
include_once 'KALS_actor.php';
/**
 * User
 *
 * 使用者
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/27 下午 08:15:20
 * @example
 * 資料表建立：<code>

-- Table: "group"

-- DROP TABLE "group";

CREATE TABLE "group"
(
  group_id serial NOT NULL,
  "name" text,
  domain_id integer NOT NULL,
  CONSTRAINT group_pkey PRIMARY KEY (group_id),
  CONSTRAINT group_group_id_key UNIQUE (group_id, domain_id)
)
WITH (OIDS=FALSE);
ALTER TABLE "group" OWNER TO postgres;

-- Table: group2actor

-- DROP TABLE group2actor;

CREATE TABLE group2actor
(
  group2actor_id serial NOT NULL,
  group_id integer NOT NULL,
  actor_type_id integer NOT NULL,
  actor_id integer NOT NULL,
  CONSTRAINT group2actor_pkey PRIMARY KEY (group2actor_id),
  CONSTRAINT group2actor_group_id_fkey FOREIGN KEY (group_id)
      REFERENCES "group" (group_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT group2actor_group_id_key UNIQUE (group_id, actor_type_id, actor_id)
)
WITH (OIDS=FALSE);
ALTER TABLE group2actor OWNER TO postgres;

-- Index: fki_

-- DROP INDEX fki_;

CREATE INDEX fki_
  ON group2actor
  USING btree
  (group_id);


 * </code>
 */
class Group extends KALS_actor {

    public $actor_type_id = 2;

    protected $table_name = 'group';
    protected $table_fields = array('group_id', 'name', 'domain_id');
    protected $primary_key = 'group_id';
    protected $not_null_field = array('name', 'domain_id');
    protected $unique_restriction = array('group_id', 'domain_id');
    protected $default_field = 'name';

    /**
     * @param int|Domain|String $domain_id 可以是ID、Domain物件、URL
     * @param String $name
     * @return Group
     */
    public function create_group($domain_id, $name) {
        $domain_id = $this->CI->domain->filter_domain_id($domain_id);

        $data = array(
            'domain_id' => $domain_id,
            'name' => $name
        );

        return parent::create($data);
    }

    /**
     * @param int|Domain|String $domain_id 可以是ID、Domain物件、URL
     * @param String|NULL $name 省略的話則找所有的Group
     * @param int|NULL $limit 省略的話則回傳全部找到的Group
     * @param int|NULL $offset
     * @return Group
     */
    public function find_groups($domain_id, $name = NULL, $limit = NULL, $offset = NULL)
    {
        $domain_id = $this->CI->domain->filter_domain_id($domain_id);

        $db = $this->db;
        $pk = $this->primary_key;
        $table_name = $this->table_name;

        $key = $pk;

        $db->from($table_name)
            ->where('domain_id', $domain_id);
        if (NULL !== $name)
            $db->where ('name', $name);
        if (NULL !== $limit)
            $db->limit($limit);
        if (NULL !== $offset)
            $db->offset ($offset);

        $query = $db->get();

        $list = array();
        foreach($query->result_array() AS $row)
        {
            $id = $row[$pk];
            $item = get_cache($this, $key, $id);
            if (is_null($item))
            {
                $item = new Group($id);
                $item->force_loaded();
                $item->set_field($row);
                set_cache($item, $key, $id);
            }
            array_push($list, $item);
        }
        return $list;
    }

    public function find_group($domain_id, $name)
    {
        $groups = $this->find_groups($domain_id, $name, 1);
        if (count($groups) == 1)
            return $groups[0];
        else
            return NULL;
    }

    public function get_actors($actor_type_id = NULL)
    {
        $id = $this->get_id();

        $db = $this->db;
        $db->from('group2actor')
            ->where('group_id', $id)
            ->select('actor_type_id,actor_id');
        if (NULL != $actor_type_id)
            $db->where('actor_type_id', $actor_type_id);
        $query = $db->get();

        $list = array();
        foreach($query->result() AS $row)
        {
            $actor_type_id = intval($row->actor_type_id);
            $actor_id = intval($row->actor_id);
            $type = $this->types[$actor_type_id];
            
            $key = $type.'_id';
            $value = $actor_id;
            
            $actor = get_cache($type, $key, $value);
            if (is_null($actor))
            {
                $actor = new $type($actor_id);
                set_cache($actor, $key, $value);
            }
            array_push($list, $actor);
        }
        return $list;
    }
    public function get_users()
    {
        return $this->get_actors(1);
    }
    public function get_groups()
    {
        return $this->get_actors(2);
    }

    /**
     * @param KALS_actor $actor
     */
    public function add_actor($actor)
    {
        if ($this->in_group($actor))
            return $this;

        $data = $this->_get_actor_data($actor);

        $this->db->insert('group2actor', $data);

        return $this;
    }

    /**
     * @param KALS_actor $actor
     */
    public function in_group($actor)
    {
        $cond = $this->_get_actor_data($actor);

        $count = $this->db->where($cond)
            ->count_all_results('group2actor');

        return ($count > 0);
    }

    public function remove_actor($actor)
    {
        $cond = $this->_get_actor_data($actor);

        $this->db->delete('group2actor', $cond);
        return $this;
    }

    private function _get_actor_data($actor)
    {
        $data = array(
            'group_id' => $this->get_id(),
            'actor_id' => $actor->get_id(),
            'actor_type_id' => $actor->get_type_id()
        );
        return $data;
    }
}


/* End of file Group.php */
/* Location: ./system/application/libraries/kals_actor/Group.php */