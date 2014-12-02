<?php
include_once 'KALS_actor.php';
//include_once 'KALS_actor.php';
/**
 * User_statistic
 *
 * 使用者統計資料
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
     * @return Int | count
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
    public function get_responded_users_count($user, $webpage, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        $user_id = $user->get_id();
        
        //$this->db->distinct('respond.user_id');
        $this->db->select('respond.user_id');
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
        
        $this->db->group_by('respond.user_id');
        
        $query = $this->db->get();
        $count = $query->num_rows();
        //test_msg("count",$count);
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
        //$this->db->distinct('respond_to.user_id');
        $this->db->select('respond_to.user_id');
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
        $this->db->group_by('respond_to.user_id');
       
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
    public function get_like_to_annotation_by_user_count($user, $webpage, $like_to_user) {
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
     * 取得我喜愛的標註數量
     * 
     * @param Webpage $webpage
     * @param User $user 
     */
    public function get_like_to_count($user, $webpage) {
     // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        $user_id = $user->get_id();
        //--------
        $this->db->select('annotation2like.annotation_id');
        $this->db->from('annotation2like');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation2like.annotation_id');
        $this->db->where('annotation2like.user_id', $user_id);
        $this->db->where('webpage_id', $webpage_id);        
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
     * 取得被誰喜愛的名單(有哪些人喜愛我)
     * 
     * @param Webpage $webpage
     * @param User $user 
     */
    public function get_liked_users($user, $webpage) {
        $webpage_id = $webpage->get_id(); 
        $user_id = $user->get_id();
        $liked_user_array = array();
        //-------------------------
        $this->db->select('user_liked.liked_user');
        $this->db->from('user_liked');
        $this->db->join('webpage2annotation', 'user_liked.annotation_id = 
webpage2annotation.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('user_liked.me', $user_id);
        //----------
        $this->db->distinct();
        $query = $this->db->get();
        foreach ( $query->result() as $row){
            $liked_user_array[] = $row->liked_user;
        }
       
        return $liked_user_array;       

    }
    /**
     * 取得被多少人喜愛的數量
     * 
     * @param Webpage $webpage
     * @param User $user 
     * 
     */
    public function get_liked_users_count($user, $webpage) {
        $liked_user = $this->get_liked_users($user, $webpage);
        $count = count($liked_user);
        //test_msg("liked_user_count", $count);
        return $count;             

    }
    //---------------------------------------
    /**
     * 取得我喜愛了哪些人的名單
     * 
     * @param Webpage $webpage
     * @param User $user 
     */
    public function get_like_to_users($user, $webpage) {
        $webpage_id = $webpage->get_id(); 
        $user_id = $user->get_id();
        $like_to_user_array = array();
        //-------------------------
        $this->db->select('like_to_user');
        $this->db->from('user_like_to');
        $this->db->join('webpage2annotation', 'user_like_to.annotation_id = 
webpage2annotation.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('user_like_to.me', $user_id);
        //----------
        $this->db->distinct();
        $query = $this->db->get();
        foreach ( $query->result() as $row){
            $like_to_user_array[] = $row->like_to_user;
        }
        return $like_to_user_array;    
    }
    /**
     * 取得我喜愛了多少人的數量
     * 
     * @param Webpage $webpage
     * @param User $user 
     * 
     */
    public function get_like_to_users_count($user, $webpage) {
        $like_to_user = $this->get_like_to_users($user, $webpage);
        $count = count($like_to_user);
        return $count;             

    }
    
    // --------------------------------------
     /**
     * 取得所有有用過的標註類型(自己寫的)
     * @param User $user
     * @param Webpage $webpage
     * @return Array $annotation_type
     */
    public function get_topic_types(User $user, Webpage $webpage) {
        $type_array = array();
        $webpage_id = $webpage->get_id(); 
        $user_id = $user->get_id();
        //--------
        $this->db->select('annotation.annotation_type_id');
        $this->db->from('annotation');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation.annotation_id');
        $this->db->where('annotation.user_id', $user_id);
        $this->db->where('webpage_id', $webpage_id);      
        $this->db->where('deleted', 'false');
        $this->db->group_by('annotation.annotation_type_id');
        $this->db->order_by('annotation_type_id', 'asc');
        
        $query = $this->db->get();
        foreach ( $query->result() as $row){
            $type_array[] = $row->annotation_type_id;
        }
        return $type_array;
    } 
    
    
    /**
     * 取得主題標註所有類型個別統計次數的陣列
     * @todo 20140516 Pulipuli Chen 
     * @param User $user
     * @param Webpage $webpage
     * @return Array $type_count_collection
     */
    public function get_topic_types_count(User $user, Webpage $webpage) {
        $this->CI->load->library('type/Type_factory');
        $this->CI->load->library('type/Annotation_type_factory');
        $this->CI->load->library('type/Annotation_type');
           
        $type_count_collection = array();
        // 取得所有有使用到的type_id->array
        $type_id_array = $this->get_topic_types($user, $webpage);
        //test_msg("type_id_array", $type_id_array);
        $annotation_type_factory = new Annotation_type_factory();
        // 因為Annotation_type沒有繼承 $key =自General Object，所以不能直接用，改用Annotation_type_factory()
        foreach ($type_id_array as $value) {       
            $value = intval($value, 10);            
            $type = $annotation_type_factory->filter_object($value);  
            // 直接用$type->get_name()是basic才能用
            
            //if ($type->is_basic()) {
                //$type_name = $type->get_name();  
                //test_msg("BASIC_type=", $type->get_name());
                //$type_name = substr($type_name, 16); //SUBSTR是因為這邊抓到的是annotation.type.question，只留後面
            //}
            //else {
                $type_name = $type->get_custom_name();
                //test_msg("CUSTOM_type=", $type->get_custom_name());
            //}
            //test_msg("type_id", $type->get_id());
            
            //preg_match('@^(?:annotation.type.)?([^/]+)@i',$type_name2, $type_name_test);
            //test_msg("type_count_collection", array($type_name, $type->get_id(), $this->get_topic_count($user, $webpage, $type)));
            $type_count_collection[$type_name] = $this->get_topic_count($user, $webpage, $type);          
           //test_msg('value', $value);
           //test_msg('name', $type_name);
            }
        //$type_test = $type_count_collection['importance']; // annotation.type.importance
        
        /*$type_count_collection = array(
            // 標註類型名稱 => 次數
            'importance' => $this->get_topic_count($user, $webpage, $annotation_type),
        );*/  
        return $type_count_collection;
    }
    
 /**
     * 取得主題標註所有類型個別統計次數的陣列長度(使用了多少種類型)
     * @todo 20140516 Pulipuli Chen 
     * @param User $user
     * @param Webpage $webpage
     * @return Int $type_used_count
     */
    public function get_topic_types_used_count_(User $user, Webpage $webpage) {
        $this->CI->load->library('type/Type_factory');
        $this->CI->load->library('type/Annotation_type_factory');
        $this->CI->load->library('type/Annotation_type');
           
        $type_count_collection = $this->get_topic_types_count($user, $webpage);
        $type_used_count = $type_count_collection.length();
        return $type_used_count;
    }   
    
     /**
     * 取得所有別人回應自己的標註中有用過的標註類型的陣列
     * @param User $user
     * @param Webpage $webpage
     * @return Array $annotation_type
     */
    public function get_respond_to_my_types(User $user, Webpage $webpage) {
        $type_array = array();
        $webpage_id = $webpage->get_id(); 
        $user_id = $user->get_id();
        //--------
        $this->db->select('respond.annotation_type_id');
        $this->db->from('annotation respond');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = respond.annotation_id');
        $this->db->join('annotation topic', 'respond.topic_id = topic.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('topic.user_id', $user_id);
        $this->db->where('respond.topic_id IS NOT NULL');
        $this->db->where('respond.user_id <>', $user_id);
        $this->db->where('topic.deleted', 'false');
        $this->db->where('respond.deleted', 'false');
        $this->db->group_by('respond.annotation_type_id');
        $this->db->order_by('respond.annotation_type_id', 'asc');     
               
        $query = $this->db->get();
        foreach ( $query->result() as $row){
            $type_array[] = $row->annotation_type_id;
        }
        return $type_array;
    } 
    
    /**
     * 取得別人回應自己的標註所有類型個別統計次數的陣列
     * @todo 20140516 Pulipuli Chen 請wyfan把它完成
     * @param User $user
     * @param Webpage $webpage
     * @return Array $type_count_collection
     */
    public function get_respond_to_my_types_count(User $user, Webpage $webpage) {
        $this->CI->load->library('type/Type_factory');
        $this->CI->load->library('type/Annotation_type_factory');
        $this->CI->load->library('type/Annotation_type');
     
        $type_count_collection = array();
        //取得別人回應自己所有有用到的type_id->array
        $type_id_array = $this->get_respond_to_my_types($user, $webpage);
        
        $annotation_type_factory = new Annotation_type_factory();
        foreach ($type_id_array as $value) {       
            $value = intval($value, 10);
            $type = $annotation_type_factory->filter_object($value);  
            $type_name = $type->get_custom_name();  
            //$type_name = $type->get_name();  
            //$type_name = substr($type_name, 16); 
            //preg_match('@^(?:annotation.type.)?([^/]+)@i',$type_name2, $type_name_test);
            $type_count_collection[$type_name] = $this->get_responded_count($user, $webpage, $type);          
        }
        //$type_test = $type_count_collection['importance']; // annotation.type.importance

        return $type_count_collection;
    }
    
     /**
     * 取得回應給別人的標註所有類型陣列(自己回應給別人的標註有使用過的標註類型陣列)
     * @param User $user
     * @param Webpage $webpage
     * @return Array $annotation_type
     */
    public function get_respond_to_other_types(User $user, Webpage $webpage) {
        $type_array = array();
        $webpage_id = $webpage->get_id(); 
        $user_id = $user->get_id();
        //--------
        $this->db->select('annotation.annotation_type_id');
        $this->db->from('annotation');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('annotation.user_id', $user_id);
        $this->db->where('annotation.topic_id IS NOT NULL');
        $this->db->where('annotation.deleted', 'false');
        $this->db->group_by('annotation.annotation_type_id');
        $this->db->order_by('annotation.annotation_type_id', 'asc');     
               
        $query = $this->db->get();
        foreach ( $query->result() as $row){
            $type_array[] = $row->annotation_type_id;
        }
        return $type_array;
    }    
    
    /**
     * 取得回應給別人的標註所有類型個別統計次數的陣列(自己回應給別人的標註)
     * @todo 20140516 Pulipuli Chen 請wyfan把它完成
     * @param User $user
     * @param Webpage $webpage
     * @return int
     */
    public function get_respond_to_other_types_count(User $user, Webpage $webpage) {
        $this->CI->load->library('type/Type_factory');
        $this->CI->load->library('type/Annotation_type_factory');
        $this->CI->load->library('type/Annotation_type');
     
        $type_count_collection = array();
        //自己回應給別人所有有使用過的type_id->array
        $type_id_array = $this->get_respond_to_other_types($user, $webpage);
        
        $annotation_type_factory = new Annotation_type_factory();
        foreach ($type_id_array as $value) {       
            $value = intval($value, 10);
            $type = $annotation_type_factory->filter_object($value);  
            //$type_name = $type->get_name();  
            $type_name = $type->get_custom_name();  
            //$type_name = substr($type_name, 16); 
            //preg_match('@^(?:annotation.type.)?([^/]+)@i',$type_name2, $type_name_test);
            $type_count_collection[$type_name] = $this->get_respond_to_count($user, $webpage, $type);   
            }
        //$type_test = $type_count_collection['importance']; // annotation.type.importance
        return $type_count_collection;       
    }
    
// ---------------------------------------------------------------------
//    /**
//     * 統整所有要丟給Context_user的資料
//     * 
//     * @deprecated since version 20140620 改到statistics/user_params去
//     * @param User $user
//     * @param Webpage $webpage
//     * @return JSON
//     */
//    public function user_params( $callback = NULL ) {
//        $user = get_context_user();
//        $webpage = get_context_webpage();
//        
//        $data =  array(
//            //"responded_count" => $this->get_responded_count($user, $webpage),
//            "responded_count" => 5,
//            "responded_user_count" =>$this->get_responded_users_count($user, $webpage),
//            "respond_to_user_count" =>$this->get_respond_to_users_count($user, $webpage)
//        );
//
//        
//        $output = array(
//            "user" => $data
//        );
//        
//        //打包成json丟回去 
//        return $this->_display_jsonp($output, $callback);       
//    }
//    

    /**
     * @author Pulipuli Chen <pulipuli.chen@gmail.com> 20141110
     * @return Array
     */
    public function get_init_user_params($user = NULL, $webpage = NULL) {
        
        if (is_null($user)) {
            $user = get_context_user();
        }
        if (is_null($webpage)) {
            $webpage = get_context_webpage();
        }
        
        $data =  array();
//                "responded_count" => $this->user_statistic->get_responded_count($user, $webpage),
//                //"responded_count" => 5,
//                "responded_users_count" =>$this->user_statistic->get_responded_users_count($user, $webpage),
//                "respond_to_users_count" =>$this->user_statistic->get_respond_to_users_count($user, $webpage)
//                
            // 從$this->user_statistic可以取得的資料
            // types_array
        $count = $this->get_topic_types_count($user, $webpage);
        if (count($count) > 0) {
            $data['topic_annotation_count'] = $count;
        }
        
        $count = $this->get_respond_to_my_types_count($user, $webpage);
        if (count($count) > 0) {
            $data['respond_to_my_annotation_count'] = $count;
        }
        
        $count = $this->get_respond_to_other_types_count($user, $webpage);
        if (count($count) > 0) {
            $data['respond_to_other_annotation_count'] = $count;
        }
        
        return $data;
    }   
    
    /**
     * @author Pulipuli Chen <pulipuli.chen@gmail.com> 20141110
     * @return Array
     */
    public function get_user_params($user = NULL, $webpage = NULL) {
        
        if (is_null($user)) {
            $user = get_context_user();
        }
        if (is_null($webpage)) {
            $webpage = get_context_webpage();
        }
        
        $data =  array(
//                "responded_count" => $this->user_statistic->get_responded_count($user, $webpage),
//                //"responded_count" => 5,
//                "responded_users_count" =>$this->user_statistic->get_responded_users_count($user, $webpage),
//                "respond_to_users_count" =>$this->user_statistic->get_respond_to_users_count($user, $webpage)
//                
            // 從$this->user_statistic可以取得的資料
            // types_array
            'responded_users_count' =>$this->get_responded_users_count($user, $webpage),
            'respond_to_users_count' =>$this->get_respond_to_users_count($user, $webpage),

            // int count
            'responded_count' => $this->get_responded_count($user, $webpage),
            'like_to_count' => $this->get_like_to_count($user, $webpage),
            'liked_count' => $this->get_liked_count($user, $webpage),
            'like_to_users_count' => $this->get_like_to_users_count($user, $webpage),
            'liked_users_count' => $this->get_liked_users_count($user, $webpage)
        );
        
        return $data;
    }   
}


/* End of file User.php */
/* Location: ./system/application/libraries/kals_actor/User.php */