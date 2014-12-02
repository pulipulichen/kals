<?php
/**
 * KALS_actor
 *
 * 使用者(User)與群組(Group)的原形
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/27 下午 03:16:29
 * @property Domain $domain
 */
class KALS_actor extends Generic_object {

    public $types = array(
        1 => 'User',
        2 => 'Group'
    );

    public function __construct($id = NULL)
    {
        parent::__construct($id);
        $this->_CI_load('library', 'kals_resource/Domain', 'domain');
        $this->_CI_load('library', 'kals_actor/Group', 'group');
        $this->_CI_load('library', 'kals_actor/User', 'user');
        return $this;
    }

    public function get_type_id()
    {
        return $this->actor_type_id;
    }

    public function get_parent_groups(array $groups = NULL) {
        $groups_id = $this->get_parent_groups_id();
        $groups = array();
        foreach ($groups_id AS $id)
        {
            array_push($groups, new Group($id));
        }
        return $groups;
    }

    public function get_parent_groups_id(array $groups_id = NULL)
    {
        $type_id = $this->get_type_id();
        $type = $this->types[$type_id];

        if (is_null($groups_id))
            $groups_id = array();

        $this->db->where(array(
            'actor_type_id' => $type_id,
            'actor_id' => $this->get_id()
        ))
                ->select('group_id');

        $query = $this->db->get('group2actor');

        foreach ($query->result() AS $row)
        {
            $group_id = $row->group_id;
            if (FALSE === in_array($group_id, $groups_id))
            {
                array_push($groups_id, $group_id);

                $group = new Group($group_id);
                $groups_id = $group->get_parent_groups_id($groups_id);
            }
        }
        return $groups_id;
    }

    public function set_domain($domain)
    {
        if (is_object($domain))
            $domain_id = $domaim->get_id();
        else if (is_int($domaim))
            $domain_id = $domaim;
        $this->set_field('domain_id', $domain_id);
        return $this;
    }

    public function get_domain()
    {
        $domain_id = $this->get_field('domain_id');
        return new Domain($domain_id);
    }

    public function get_name()
    {
        return $this->get_field('name');
    }

    public function  _pre_delete() {
        //先刪除group2actor裡面的資料！

        $id = $this->get_id();
        $type_id = $this->get_type_id();

        //確認資料無誤
        if (is_null($id) OR is_null($type_id))
            return;

        $table_name = 'group2actor';
        $db = $this->db;
        $db->where(array(
            'actor_type_id' => $type_id,
            'actor_id' => $id
        ));
        $db->delete($table_name);

        //如果是群組
        if ($type_id == 2)
        {
            $db->where('group_id', $id);
            $db->delete($table_name);
        }
    }

    public function equals($actor)
    {
        if (is_object($actor)
            && (get_class($actor) == 'User' OR get_class($actor) == 'Group'))
        {
            return ($this->get_id() == $actor->get_id()
                && $this->get_type_id() == $actor->get_type_id());
        }
        else
            return FALSE;
    }

    public function find_actor($type_id, $id)
    {
        if (!isset($this->types[$type_id]))
            return NULL;

        $class_name = $this->types[$type_id];

        $actor = get_cache($class_name, $class_name.'_id', $id);
        if (is_null($actor))
        {
            $actor = new $class_name($id);
            set_cache($actor, $class_name.'_id', $id);
        }
        return $actor;
    }
}


/* End of file KALSActor.php */
/* Location: ./system/application/libraries/kals_actor/KALSActor.php */