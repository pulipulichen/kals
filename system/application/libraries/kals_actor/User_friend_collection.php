<?php
/**
 * User_friend_collection
 *
 * 就是朋友的合集
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/13 上午 11:38:08
 */
class User_friend_collection extends Generic_collection {

    protected $table_name = 'annotation';
    protected $index_field = 'user_id';
    protected $class_name = 'User';
    protected $class_dir = 'kals_actor/';

    protected $members_readonly = TRUE;
    protected $limit = 10;
    protected $order_by = 'count(policy2actor.actor_id) DESC';

    protected function _load_custom($db, $id)
    {
        $this->_CI_load('library', 'kals_resource/Annotation', 'annotation');
        $annotation_type_id = $this->CI->annotation->get_type_id();
        $this->_CI_load('library', 'kals_actor/User', 'user');
        $user_type_id = $this->CI->user->get_type_id();

        $db = $this->db;
        $db->join('policy', 'policy.resource_id = annotation.annotation_id AND policy.resource_type_id = '.$annotation_type_id)
            ->join('policy2actor', 'policy.policy_id = policy2actor.policy_id AND policy2actor.actor_type_id = '.$user_type_id)
            ->select('policy2actor.actor_id')
            ->group_by('policy2actor.actor_id');
    }

    public function create_item($type_id = NULL, $data = array())
    {
        $this->_CI_load('library', 'kals_actor/User', 'user');
        $actor_id = intval($data['actor_id']);
        return new User($actor_id);
    }

//    public function load_default()
//    {
//        $id = $this->get_id();
//        if (is_null($id))
//            return FALSE;
//
//
//
//        $db = $this->db;
//        $db->from('annotation')
//            ->where('user_id', $id)
//            ->join('policy', 'policy.resource_id = annotation.annotation_id AND policy.resource_type_id = '.$annotation_type_id)
//            ->join('policy2actor', 'policy.policy_id = policy2actor.policy_id AND policy2actor.actor_type_id = '.$user_type_id)
//            ->select('policy2actor.actor_id')
//            ->group_by('policy2actor.actor_id')
//            ->order_by('count(policy2actor.actor_id)', 'DESC')
//            ->limit($this->limit);
//        $query = $db->get();
//        $this->members = array();
//        foreach ($query->result_array() AS $row)
//        {
//            $actor_id = intval($row['actor_id']);
//            $this->members[] = new User($actor_id);
//        }
//
//        $this->_post_load();
//        return TRUE;
//    }
}


/* End of file User_friend_collection.php */
/* Location: ./system/application/libraries/kals_actor/User_friend_collection.php */