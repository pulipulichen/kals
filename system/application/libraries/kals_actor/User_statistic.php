<?php
include_once 'KALS_actor.php';
/**
 * User_statistic
 *
 * 使用者統計
 *
 * @package		KALS
 * @category		Controllers
 * @author		Wyfan <wyfan@nccu.edu.tw>
 * @copyright		Copyright (c) 2014, Wyfan
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2014/5/15 下午 03:51:22
 */
class User_statistic extends KALS_actor {

   /* public $actor_type_id = 1;

    protected $table_name = 'user';
    protected $table_fields = array('user_id', 'name', 'email', 'sex', 'photo', 'locale', 'style', 'password', 'deleted', 'domain_id');
    protected $primary_key = 'user_id';
    protected $not_null_field = array('email', 'domain_id');
    protected $unique_restriction = array('email', 'domain_id');
    protected $default_field = 'email';
    protected $fake_delete = 'deleted';
    
    private $notification_coll;*/
    protected function  _post_construct() {
        $this->CI->load->library("annotation/annotation_collection");
        $this->CI->load->library("kals_resource/annotation");
        $this->CI->load->library('kals_actor/User');
        //$this->_CI_load('library', 'kals_actor/Notification_collection', 'notification_collection');
        //$this->notification_coll = new Notification_collection($this);
    }
    
    /**
     * 取得自己寫的指定標註類型的所有標註數量
     * 
     * @param Webpage $webpage
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @param User $user
     * @return Int $count
     */
    public function get_annotation_count($user, $webpage, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        if ($annotation_type !== NULL ){
            //$type_id = $annotation_type->get_type_id();
            $type_id = $annotation_type->get_type_id();        
        }
        // use to test 
        //$user_id = 2002;
        $user_id = $user->get_id();
        
        //改用Acticve Recordz方式
        $this->db->select('annotation.annotation_id');
        $this->db->from('annotation');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('user_id', $user_id);
        
        // 要加入未刪除的限制啊！
        $this->db->where('annotation.deleted', 'false');
        
        if ($annotation_type !== NULL){
            $this->db->where('annotation_type_id', $type_id);
        }
        $query = $this->db->get();
        $count = $query->num_rows();
        return $count;
    }
    
    /**
     * 取得自己寫的指定標註類型的主題(topic)標註數量
     * 
     * @param Webpage $webpage
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @param User $user
     * @return Int $count
     */
    public function get_topic_count($user, $webpage, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        // use to test 
        //$user_id = 2002;
        $user_id = $user->get_id();
        
        $this->db->select('annotation.annotation_id');
        $this->db->from('annotation');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('user_id', $user_id);        
        
        // 要加入未刪除的限制啊！
        $this->db->where('annotation.deleted', 'false');
        
        if ($annotation_type !== NULL){
            $this->db->where('annotation_type_id', $type_id);
        }
        $this->db->where('topic_id', NULL);
        $query = $this->db->get();
        $count = $query->num_rows();
        return $count;
    }
    
    /**
     * 取得被指定標註類型回應的回應數量(被別人回應的特定類型的回應數量)
     * 
     * @param Webpage $webpage
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型(ALL)
     * @param User $user
     * @return Int $count
     */
    public function get_responded_count($user, $webpage, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        // use to test 
        //$user_id = 2002;
        $user_id = $user->get_id();
        
        $this->db->select('respond.annotation_id');
        $this->db->from('annotation respond');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = respond.annotation_id');
        $this->db->join('annotation topic', 'respond.topic_id = topic.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('topic.user_id', $user_id);
        $this->db->where('respond.topic_id IS NOT NULL');
        $this->db->where('respond.user_id <>', $user_id);
                
        // 要加入未刪除的限制啊！
        $this->db->where('topic.deleted', 'false');
        $this->db->where('respond.deleted', 'false');
        
        if ($annotation_type !== NULL){
            $this->db->where('respond.annotation_type_id', $type_id);
        }
        $query = $this->db->get();
        $count = $query->num_rows();
        return $count;
    }
    
    /**
     * 取得被指定對象回應的回應數量(被特定對象回應的回應數量)
     * 
     * @param Webpage $webpage
     * @param User $responded_user
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @param User $user 
     * @return array | user_id
     */
    public function get_responded_by_user_count($user, $webpage, $responded_user, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        // use to test 
        //$user_id = 2002;
        $user_id = $user->get_id();
        
        $this->db->select('respond.user_id');
        $this->db->from('annotation respond');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = respond.annotation_id');
        $this->db->join('annotation topic', 'respond.topic_id = topic.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('topic.user_id', $user_id);
        $this->db->where('respond.topic_id IS NOT NULL');
        $this->db->where('respond.user_id', $responded_user->get_id());
                
        // 要加入未刪除的限制啊！
        $this->db->where('topic.deleted', 'false');
        $this->db->where('respond.deleted', 'false');
        
        
        if ($annotation_type !== NULL){
            $this->db->where('respond.annotation_type_id', $type_id);
        }
        $query = $this->db->get();
        $count = $query->num_rows();
        return $count;
    }

    /**
     * 取得被指定類型回應的對象數量(用指定類型回應我的人數)
     * 
     * @param Webpage $webpage
     * @param User $user
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @return Int $count
     */
    public function get_respond_users_count($user, $webpage, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        $user_id = $user->get_id();
        
        $this->db->distinct('respond.user_id');
        $this->db->from('annotation respond');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = respond.annotation_id');
        $this->db->join('annotation topic', 'respond.topic_id = topic.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('topic.user_id', $user_id);
        $this->db->where('respond.user_id <>', $user_id);
        $this->db->where('respond.topic_id IS NOT NULL');
                
        // 要加入未刪除的限制啊！
        $this->db->where('topic.deleted', 'false');
        $this->db->where('respond.deleted', 'false');
        
        if ($annotation_type !== NULL){
            $this->db->where('respond.annotation_type_id', $type_id);
        }
        $query = $this->db->get();
        $count = $query->num_rows();
        return $count;        
    }
 
     /**
     * 取得被指定類型回應的對象的數量(哪些人用什麼類型回應的數量)
     * 
     * @param Webpage $webpage
     * @param User $responded_user
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @return User_collection
     * @todo 建立user_collection再完成 
     */
    public function get_respond_users($user, $webpage, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen

        return 0;
    }

    /**
     * 取得指定標註類型回應標註的數量(自己寫的回應標註)
     * @param User $user 
     * @param Webpage $webpage
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     */
    public function get_respond_to_count($user, $webpage, $annotation_type = NULL) {
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        $user_id = $user->get_id();       
        
        $this->db->select('annotation.annotation_id');
        $this->db->from('annotation');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('user_id', $user_id);
        
        // 要加入未刪除的限制啊！
        $this->db->where('annotation.deleted', 'false');
        
        if ($annotation_type !== NULL){
            $this->db->where('annotation_type_id', $type_id);
        }
        $this->db->where('topic_id IS NOT NULL');
        $query = $this->db->get();
        $count = $query->num_rows();
        return $count;
    }
     /**
     * 取得指定對象與標註類型回應標註的數量(自己用哪些類型標註回應誰)
     * 
     * @param Webpage $webpage
     * @param User $respond_to_user 
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @return Int  $count
     */
    public function get_respond_to_count_by_user($user, $webpage, $topic_user, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        $user_id = $user->get_id();
        
        //--------
        $this->db->select('respond_to.user_id');
        $this->db->from('annotation respond_to');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = respond_to.annotation_id');
        $this->db->join('annotation topic', 'respond_to.topic_id = topic.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('respond_to.user_id', $user_id);
        $this->db->where('respond_to.topic_id IS NOT NULL');
        
        // 要加入未刪除的限制啊！
        $this->db->where('topic.deleted', 'false');
        $this->db->where('respond_to.deleted', 'false');
        
        $this->db->where('topic.user_id', $topic_user->get_id());
        if ($annotation_type !== NULL){
            $this->db->where('respond_to.annotation_type_id', $type_id);
        }
        $query = $this->db->get();
        $count = $query->num_rows();
        return  $count;
    }
    
    
    /**
     * 取得指定對象與標註類型回應標註的名單(自己用哪些類型標註回應誰)
     * 
     * @param Webpage $webpage
     * @param User $respond_to_user 
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @return array | user_id
     */
    public function get_respond_to_users($user, $webpage, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        $user_id = $user->get_id();
        
        //--------
        $this->db->distinct('respond_to.user_id');
        $this->db->from('annotation my_res');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = my_res.annotation_id');
        $this->db->join('annotation respond_to', 'my_res.topic_id = respond_to.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('my_res.user_id', $user_id);
        $this->db->where('my_res.topic_id IS NOT NULL');
        
        // 要加入未刪除的限制啊！
        $this->db->where('my_res.deleted', 'false');
        $this->db->where('respond_to.deleted', 'false');
        
        $this->db->where('respond_to.user_id <>', $user_id);
        if ($annotation_type !== NULL) {
            $this->db->where('my_res.annotation_type_id', $type_id);
        }
        $query = $this->db->get();
        $respond_user = array();
        foreach ($query->result() as $row) {
            $respond_user[] = $row->user_id;
        }
        return $respond_user;
    }
     /**
     * 取得指定對象與標註類型回應標註的數量(自己用哪些類型標註回應誰)
     * 
     * @param Webpage $webpage
     * @param User $respond_to_user 
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @return Int $count
     */
    public function get_respond_to_users_count($user, Webpage $webpage, Annotation_type $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $respond_user = $this->get_respond_to_users($user, $webpage, $annotation_type);
        $count = count($respond_user);
        return $count;
    }
    
     /**
     * 取得自己喜愛的標註list
     * @TODO 20140512 Pulipuli Chen
     * @param Webpage $webpage
     * @return Annotation_collection
     */
    public function get_like_to_annotation($user, Webpage $webpage) {
      
        $webpage_id = $webpage->get_id(); 
        // use to test 
        //$user_id = 2002;
        $user_id = $user->get_id();
        //--------
        $this->db->select('annotation2like.annotation_id');
        $this->db->from('annotation2like');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation2like.annotation_id');
        $this->db->where('user_id', $user_id);
        $this->db->where('webpage_id', $webpage_id);
        
        // 要加入未刪除的限制啊！
        $this->db->where("canceled", "false");
        
        $query = $this->db->get();
        //$count = $query->num_rows();
        $like_to = new Annotation_collection();
        foreach ($query->result() as $row){
            $like_to->add_item(new Annotation($row->annotation_id));
            //$like_to[] = new Annotation($row->annotation_id);
        }
       return $like_to;   
       //return $count;
    }
    /**
     * 取得自己喜愛的數量
     * @param Webpage $webpage
     * @return Int $count
     */
    public function get_like_to_annotation_count($user, $webpage) {
        $like_to_count = $this->get_like_to_annotation($user, $webpage)->length();
        return $like_to_count;
    }

    
    /**
     * 取得喜愛指定對象的數量
     * 
     * @param Webpage $webpage
     * @param User $user 
     */
    public function get_like_to_user_count($user, $webpage, $like_to_user) {
     // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        $user_id = $user->get_id();
        //--------
        $this->db->select('annotation2like.annotation_id');
        $this->db->from('annotation2like');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation2like.annotation_id');
        $this->db->join('annotation', 'annotation.annotation_id = annotation2like.annotation_id');
        $this->db->where('annotation2like.user_id', $user_id);
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('annotation.user_id', $like_to_user->get_id());
        
        // 要加入未刪除的限制啊！
        $this->db->where("canceled", "false");
        
        $query = $this->db->get();
        $count = $query->num_rows(); 
        return $count;
    }
    
    /**
     * 取得被喜愛的標註數量
     * 
     * @param Webpage $webpage
     * @param User $user 
     */
    public function get_liked_count($user, $webpage) {
     // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        $user_id = $user->get_id();
        //--------
        $this->db->select('annotation2like.annotation_id');
        $this->db->from('annotation2like');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation2like.annotation_id');
        $this->db->join('annotation', 'annotation.annotation_id = annotation2like.annotation_id');
        $this->db->where('annotation2like.user_id <>', $user_id);
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('annotation.user_id', $user_id);
        
        // 要加入未刪除的限制啊！
        $this->db->where("canceled", "false");
        
        $query = $this->db->get();
        $count = $query->num_rows(); 
        return $count;
    }
     
    /**
     * 取得被指定對象喜愛的數量
     * 
     * @param Webpage $webpage
     * @param User $user 
     */
    public function get_liked_by_user_count($user, $webpage, $liked_user) {
     // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        $user_id = $user->get_id();
        //--------
        $this->db->select('annotation2like.annotation_id');
        $this->db->from('annotation2like');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation2like.annotation_id');
        $this->db->join('annotation', 'annotation.annotation_id = annotation2like.annotation_id');
        $this->db->where('annotation2like.user_id', $liked_user->get_id());
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('annotation.user_id', $user_id);
        
        // 要加入未刪除的限制啊！
        $this->db->where("canceled", "false");
        
        $query = $this->db->get();
        $count = $query->num_rows(); 
        return $count;
    }
    
    /**
     * 取得被誰喜愛的名單
     * 
     * @param Webpage $webpage
     * @param User $user 
     * @todo 之後再完成
     */
    public function get_liked_user($webpage) {
        
        return 0;
    }
        /**
     * 取得被多少人喜愛的數量
     * 
     * @param Webpage $webpage
     * @param User $user 
     * @todo 之後再完成
     */
    public function get_liked_user_count($webpage) {
        
        return 0;
    }
}


/* End of file User.php */
/* Location: ./system/application/libraries/kals_actor/User.php */