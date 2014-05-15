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
 * @property Notification_collection $notification_coll
 * @example
 * 資料表建立：<code>

-- Table: "user"

-- DROP TABLE "user";

CREATE TABLE "user"
(
  user_id serial NOT NULL,
  "name" text NOT NULL,
  email text,
  sex integer NOT NULL DEFAULT 0,
  photo boolean NOT NULL DEFAULT false,
  locale character varying(20),
  style text,
  "password" text,
  deleted boolean NOT NULL DEFAULT false,
  domain_id integer NOT NULL,
  CONSTRAINT user_pkey PRIMARY KEY (user_id)
)
WITH (OIDS=FALSE);
ALTER TABLE "user" OWNER TO postgres;

 * </code>
 */
class User extends KALS_actor {

    public $actor_type_id = 1;

    protected $table_name = 'user';
    protected $table_fields = array('user_id', 'name', 'email', 'sex', 'photo', 'locale', 'style', 'password', 'deleted', 'domain_id');
    protected $primary_key = 'user_id';
    protected $not_null_field = array('email', 'domain_id');
    protected $unique_restriction = array('email', 'domain_id');
    protected $default_field = 'email';
    protected $fake_delete = 'deleted';
    
    private $notification_coll;
    protected function  _post_construct($table_name = NULL, $id = NULL) {
        $this->CI->load->helper('email');
        //$this->_CI_load('library', 'user_agent', 'user_agent');
        $this->CI->load->library("user_agent");

        $this->_CI_load('library', 'kals_actor/Notification_collection', 'notification_collection');
        $this->notification_coll = new Notification_collection($this);

        $this->_CI_load('library', 'kals_actor/User_friend_collection', 'user_friend_collection');
        $this->friend_coll = new User_friend_collection($this);

        //$this->CI->load->library('user_agent');
    }

    protected function  _post_update() {
        $this->notification_coll->update();
    }

    protected function _set_field_filter($data)
    {
        //test_msg('User._set_field_filter befure', $data);
        if (is_array($data))
        {
            //test_msg('User._set_field_filter is_array');
            
            if (array_key_exists('password', $data))
            {
                $data['password'] = $this->_crypt_password($data['password']);
            }
            if (array_key_exists('host', $data) && FALSE === array_key_exists('domain_id', $data))
            {
                $domain = $this->CI->domain->create($data['host']);
                $domain_id = $domain->get_id();
                $data['domain_id'] = $domain_id;
            }
            if (array_key_exists('url', $data) && FALSE === array_key_exists('domain_id', $data))
            {
                $domain = $this->CI->domain->create($data['url']);
                $domain_id = $domain->get_id();
                $data['domain_id'] = $domain_id;
            }
            if (array_key_exists('domain', $data) && FALSE === array_key_exists('domain_id', $data))
            {
                $domain = $data['domain'];
                $domain_id = $domain->get_id();
                $data['domain_id'] = $domain_id;
            }
            
            //檢查email是否合法
            //test_msg('User._set_field_filter has key: email', isset($data['email']));
            //test_msg('valid_email',valid_email($data['email']));
            if (isset($data['email']) && FALSE === valid_email($data['email']))
            {
                unset($data['email']);
            }
            if (isset($data['locale']))
            {
                /**
                 * 先取消這個功能，這到底是怎麼了orz
                 * @author Pudding Chen <pulipuli.chen@gmail.com> 20121228
                 */
                //if ($this->CI->user_agent->in_acceptable_langage($data['locale']) === FALSE)
                //    $data['locale'] = $this->CI->user_agent->get_default_language();
                
            }
        }
        return $data;
    }

    protected function  _get_field_filter($field) {
        if ($field == 'password')
        {
            handle_error($this->lang->line('user.get_field.get_password_deny.exception'));
        }
        return $field;
    }

    public function search($domain_id, $keyword, $limit = NULL, $offset = NULL)
    {
        $domain_id = $this->CI->domain->filter_domain_id($domain_id);

        $db = $this->db;

//        $keyword = '%'.$keyword.'%';
//
//        $sql = 'SELECT * FROM "'.$this->table_name.'" WHERE '.$this->fake_delete.' = FALSE AND domain_id = ? '
//            .' AND (name LIKE ? OR email LIKE ?)';
//        $data = array($domain_id, $keyword, $keyword);
//
//        if (NULL !== $limit)
//            $sql = $sql.' LIMIT '.$limit;
//        if (NULL !== $offset)
//            $sql = $sql.' OFFSET '.$limit;
//        $query = $this->db->query($sql, $data);

        $db->from($this->table_name);
        $db->where(array(
            'domain_id' => $domain_id,
            $this->fake_delete => 'FALSE'
        ));
        $db->or_like(array(
            'name' => $keyword,
            'email' => $keyword
        ));
//        $db->or_like('e-mail', $keyword);
        if (NULL !== $limit)
            $db->limit($limit);
        if (NULL !== $offset)
            $db->offset($offset);

        $query = $db->get();

        $list = array();
        foreach ($query->result_array() AS $row)
        {
            $id = $row[$this->primary_key];
            $key = $this->primary_key;
            $value = $id;
            $item = get_cache($this, $key, $value);
            if (is_null($item))
            {
                $item = new User($id);
                $item->force_loaded();
                $item->set_field($row);
                set_cache($item, $key, $value);
            }
            array_push($list, $item);
        }
        return $list;
    }

    /**
     * 建立使用者
     * @param string|int $domain_id
     * @param string $email
     * @return User
     */
    public function create_user($domain_id, $email)
    {
        $domain_id = $this->CI->domain->filter_domain_id($domain_id);

        //test_msg('User.create_user before check', array($domain_id, $email));
        
        if (is_int($domain_id) && is_string($email))
        {
            $key = $domain_id;
            $value = $email;
            $user = get_cache($this, $key, $value);
            if (is_null($user))
            {
                $data = array(
                    'domain_id' => $domain_id,
                    'email' => $email
                );
                
                //test_msg('User.create_user', $data);
                
                $user = $this->create($data);
                if (isset($user)) {
                    set_cache ($user, $key, $value);
                }
            }
            
            //test_msg('User.create_user after create', $user->get_id());
            
            return $user;
        }
        else
        {
            
            $data = array(
                'domain_id' => $domain_id,
                'email' => $email
            );
            
            //test_msg('User.create_user by array data', $data);
            return $this->create($data);
        }
    }

    /**
     * 找尋使用者
     *
     * @param string|ing $domain_id
     * @param string $keyword
     * @param string $password
     * @return User
     */
    public function find_user($domain_id, $keyword, $password = NULL)
    {
        $domain_id = $this->CI->domain->filter_domain_id($domain_id);

        if (is_int($domain_id) && is_string($keyword))
        {
            $cond = array();
            if (valid_email($keyword))
            {
                $cond = array(
                    'domain_id' => $domain_id,
                    'email' => $keyword
                );
            }
            else
            {
                $cond = array(
                    'domain_id' => $domain_id,
                    'name' => $keyword
                );
            }
            if (NULL != $password)
                $cond['password'] = $password;
            return $this->find($cond);
        }
        else
        {
            return $this->find($domain_id, $keyword);
        }
    }

    protected function  _pre_insert($data) {
        if (isset($data['email'])
            && FALSE === isset ($data['name']))
        {
            $data['name'] = get_email_name($data['email']);
            $this->set_field('name', $data['name']);
        }
        
        //test_msg("User._pre_insert", $data);

        return $data;
    }

    public function _crypt_password($password)
    {
        if ($password == NULL)
            return NULL;
        $this->CI->config->load('kals');
        $salt = $this->CI->config->item('crypt_salt');
        $crypted_password = crypt($password, $salt);
        return $crypted_password;
    }

    public function set_password($value)
    {
        return $this->set_field('password', $value);
    }

    public function set_email($value)
    {
        return $this->set_field('email', $value);
    }

    public function get_email()
    {
        return $this->get_field('email');
    }

    public function set_name($value)
    {
        return $this->set_field('name', $value);
    }

    public function get_name()
    {
        return $this->get_field('name');
    }

    /**
     * 性別
     * 0: 不表示性別
     * 1: 男生
     * 2: 女生
     * @param <int> $value
     */
    public function set_sex($value)
    {
        return $this->set_field('sex', $value);
    }

    public function get_sex()
    {
        return $this->get_field('sex', '0');
    }

    public function set_photo($value)
    {
        return $this->set_field('photo', $value);
    }

    public function has_photo()
    {
        $photo = $this->get_field('photo');
        if ($photo == 'TRUE' || $photo === TRUE
            || $photo == 't'){
            return TRUE;}
        else{
        return FALSE;}
    }

    public function set_locale($value)
    {
        return $this->set_field('locale', $value);
    }

    public function get_locale()
    {
        $locale = $this->get_field('locale');
        
        //@todo 20121223 讀不到自訂的MY_User_Agent
        //失敗了，雖然有user_agent，可是卻沒有in_acceptable_language
        /*
        if (
                $this->CI->user_agent->in_acceptable_language($locale) === FALSE)
            $locale = $this->CI->user_agent->get_default_language();
         * 
         */
        
        return $locale;
    }

    public function set_style($value)
    {
        return $this->set_field('style', $value);
    }

    public function get_style()
    {
        return $this->get_field('style');
    }
    
    /**
     * 取得使用者所在的群組
     * @author Pulipuli Chen 20131119 尚未實作，先回傳空群組
     * @return Array
     */
    public function get_groups() {
        return array();
    }

    //------------------------------------------
    //底下是跟通知有關的

    /**
     * @return Notification_collection
     */
    public function get_notification_coll($do_load = FALSE)
    {
        if (TRUE === $do_load){
            $this->notification_coll->force_loaded();
        }
        return $this->notification_coll;
    }

    /**
     * @param int $limit
     * @param int $offset
     * @return Notification_collection
     */
    public function get_unread_notification_coll($limit = NULL, $offset = NULL, $do_load = FALSE)
    {
        $unread_coll = $this->notification_coll->get_unread($limit, $offset);

        if (TRUE === $do_load) {
            $unread_coll->load_default();
        }
        return $unread_coll;
    }

    public function get_unread_notification_count($do_load = FALSE)
    {
        if (TRUE === $do_load) {
            $this->notification_coll->force_loaded();
        }
        return $this->notification_coll->get_unread_count();
    }

    public function set_notification_read($notification_id)
    {
        $notification = new Notification($notification_id);
        $notification->set_read('TRUE');
        $notification->update();
        return $this;
    }

    //-----------------------------------------------------
    //底下是跟friend有關的

    /**
     * Friend指那些常常被這個user在annotation中設定policy的對象，限定為10個，依照設定次數來遞減排序
     * @return User_friend_collection
     */
    public function get_friends($reload = FALSE)
    {
        if ($reload) {
            $this->friend_coll->load_default();
        }
        return $this->friend_coll;
    }

    //---------------------------------------------------
    //底下跟JSON有關

    public function export_data()
    {
        $data = array();

        $data['class'] = get_class($this);
        $data['id'] = $this->get_id();
        $data['name'] = $this->get_name();
        $data['email'] = $this->get_email();
        $data['photo'] = $this->has_photo();
        return $data;
    }
    
    /**
     * 輸出成為陣列
     * @return Array
     */
    public function export_to_array() {
        return $this->export_data();
    }

    public function export_json()
    {
        $data = $this->export_data();

        $json = json_encode($data);
        return $json;
    }

    public function export_simple_data()
    {
        $data = array(
            'id' => $this->get_id(),
            'name' => $this->get_name()
        );
        return $data;
    }
    
    /**
     * 取得自己寫的指定標註類型的所有標註數量
     * 
     * @param Webpage $webpage
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @return Int $count
     */
    /*
    public function get_annotation_count($webpage, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        if ($annotation_type !== NULL ){
            //$type_id = $annotation_type->get_type_id();
            $type_id = $annotation_type->get_type_id();        
        }
        // use to test 
        //$user_id = 2002;
        $user_id = $this->get_id();
        
        //改用Acticve Recordz方式
        $this->db->select('annotation.annotation_id');
        $this->db->from('annotation');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('user_id', $user_id);
        if ($annotation_type !== NULL){
            $this->db->where('annotation_type_id', $type_id);
        }
        $query = $this->db->get();
        $count = $query->num_rows();
        return $count;
    }
     * 
     */
    
    /**
     * 取得自己寫的指定標註類型的主題(topic)標註數量
     * 
     * @param Webpage $webpage
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     */
    /*
    public function get_topic_count($webpage, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        // use to test 
        //$user_id = 2002;
        $user_id = $this->get_id();
        
        $this->db->select('annotation.annotation_id');
        $this->db->from('annotation');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('user_id', $user_id);
        if ($annotation_type !== NULL){
            $this->db->where('annotation_type_id', $type_id);
        }
        $this->db->where('topic_id', NULL);
        $query = $this->db->get();
        $count = $query->num_rows();
        return $count;
    }
     * 
     */
    
    /**
     * 取得被指定標註類型回應的回應數量(被別人回應的特定類型的回應數量)
     * 
     * @param Webpage $webpage
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型(ALL)
     */
    /*
    public function get_responded_count($webpage, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        // use to test 
        //$user_id = 2002;
        $user_id = $this->get_id();
        
        $this->db->select('respond.annotation_id');
        $this->db->from('annotation respond');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = respond.annotation_id');
        $this->db->join('annotation topic', 'respond.topic_id = topic.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('topic.user_id', $user_id);
        $this->db->where('respond.topic_id IS NOT NULL');
        $this->db->where('respond.user_id <>', $user_id);
        if ($annotation_type !== NULL){
            $this->db->where('respond.annotation_type_id', $type_id);
        }
        $query = $this->db->get();
        $count = $query->num_rows();
        return $count;
    }
     * 
     */
    
    /**
     * 取得被指定對象回應的回應數量(被特定對象回應的回應數量)
     * 
     * @param Webpage $webpage
     * @param User $responded_user
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @return array | user_id
     */
    /*
    public function get_responded_by_user_count($webpage, $responded_user, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        // use to test 
        //$user_id = 2002;
        $user_id = $this->get_id();
        
        $this->db->select('respond.user_id');
        $this->db->from('annotation respond');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = respond.annotation_id');
        $this->db->join('annotation topic', 'respond.topic_id = topic.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('topic.user_id', $user_id);
        $this->db->where('respond.topic_id IS NOT NULL');
        $this->db->where('respond.user_id', $responded_user->get_id());
        if ($annotation_type !== NULL){
            $this->db->where('respond.annotation_type_id', $type_id);
        }
        $query = $this->db->get();
        $count = $query->num_rows();
        return $count;
    }
     * 
     */

    /**
     * 取得被指定類型回應的對象(哪些人用什麼類型回應)
     * 
     * @param Webpage $webpage
     * @param User $responded_user
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @return array| user_id
     */
    /*
    public function get_respond_users($webpage, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        // use to test 
        //$user_id = 2002;
        $user_id = $this->get_id();
        
        $this->db->distinct('respond.user_id');
        $this->db->from('annotation respond');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = respond.annotation_id');
        $this->db->join('annotation topic', 'respond.topic_id = topic.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('topic.user_id', $user_id);
        $this->db->where('respond.topic_id IS NOT NULL');
        if ($annotation_type !== NULL){
            $this->db->where('respond.annotation_type_id', $type_id);
        }
        $query = $this->db->get();
        $respond_user = array();
        foreach ($query->result() as $row){
            $respond_user = $row->user_id;
        }
        return $respond_user;
        
    }
     * 
     */
 
     /**
     * 取得被指定類型回應的對象的數量(哪些人用什麼類型回應的數量)
     * 
     * @param Webpage $webpage
     * @param User $responded_user
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @return Int $count
     */
    /*
    public function get_respond_users_count($webpage, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $respond_user = $this->get_respond_users($webpage, $annotation_type);
        $count = count($respond_user);
        return $count;
    }
     * 
     */

    /**
     * 取得指定標註類型回應標註的數量(自己寫的回應標註)
     * 
     * @param Webpage $webpage
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     */
    /*
    public function get_respond_to_count($webpage, $annotation_type = NULL) {
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        // use to test
        //$user_id = 2002;
        $user_id = $this->get_id();       
        
        $this->db->select('annotation.annotation_id');
        $this->db->from('annotation');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('user_id', $user_id);
        if ($annotation_type !== NULL){
            $this->db->where('annotation_type_id', $type_id);
        }
        $this->db->where('topic_id IS NOT NULL');
        $query = $this->db->get();
        $count = $query->num_rows();
        return $count;
    }
     * 
     */
     /**
     * 取得指定對象與標註類型回應標註的數量(自己用哪些類型標註回應誰)
     * 
     * @param Webpage $webpage
     * @param User $respond_to_user 
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @return Int  $count
     */
    /*
    public function get_respond_to_count_by_user($webpage, $respond_to_user, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        // use to test 
        //$user_id = 2002;
        $user_id = $this->get_id();
        //--------
        $this->db->select('respond_to.user_id');
        $this->db->from('annotation my_res');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = my_res.annotation_id');
        $this->db->join('annotation respond_to', 'my_res.topic_id = respond_to.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('my_res.user_id', $user_id);
        $this->db->where('my_res.topic_id IS NOT NULL');
        $this->db->where('respond_to.user_id', $respond_to_user->get_id());
        if ($annotation_type !== NULL){
            $this->db->where('my_res.annotation_type_id', $type_id);
        }
        $query = $this->db->get();
        $count = $query->num_rows();
        return  $count;
    }
     * 
     */
    
    
    /**
     * 取得指定對象與標註類型回應標註的名單(自己用哪些類型標註回應誰)
     * 
     * @param Webpage $webpage
     * @param User $respond_to_user 
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @return array | user_id
     */
    /*
    public function get_respond_to_users($webpage, $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        //$type_id = $annotation_type->get_type_id();
        if ($annotation_type !== NULL){
            $type_id = $annotation_type->get_type_id();
        }
        // use to test 
        //$user_id = 2002;
        $user_id = $this->get_id();
        //--------
        $this->db->distinct('respond_to.user_id');
        $this->db->from('annotation my_res');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = my_res.annotation_id');
        $this->db->join('annotation respond_to', 'my_res.topic_id = respond_to.annotation_id');
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('my_res.user_id', $user_id);
        $this->db->where('my_res.topic_id IS NOT NULL');
        $this->db->where('respond_to.user_id <>', $user_id);
        if ($annotation_type !== NULL){
            $this->db->where('my_res.annotation_type_id', $type_id);
        }
        $query = $this->db->get();
        $respond_user = array();
        foreach ($query->result() as $row){
            $respond_user[] = $row->user_id;
        }
        return $respond_user;
    }
     * 
     */
    
     /**
     * 取得指定對象與標註類型回應標註的數量(自己用哪些類型標註回應誰)
     * 
     * @param Webpage $webpage
     * @param User $respond_to_user 
     * @param Annotation_type $annotation_type 如果是NULL，則不限定標註類型
     * @return Int $count
     */
    /*
    public function get_respond_to_users_count(Webpage $webpage, Annotation_type $annotation_type = NULL) {
        // @TODO 20140512 Pulipuli Chen
        $respond_user = $this->get_respond_to_users($webpage, $annotation_type);
        $count = count($respond_user);
        return $count;
    }
     */
    
     /**
     * 取得自己喜愛的標註list
     * @TODO 20140512 Pulipuli Chen
     * @param Webpage $webpage
     * @return Annotation_collection
     */
    /*
    public function get_like_to_annotation(Webpage $webpage) {
        $this->CI->load->library("annotation/annotation_collection");
        $this->CI->load->library("kals_resource/annotation");
        
        $webpage_id = $webpage->get_id(); 
        // use to test 
        //$user_id = 2002;
        $user_id = $this->get_id();
        //--------
        $this->db->select('annotation2like.annotation_id');
        $this->db->from('annotation2like');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation2like.annotation_id');
        $this->db->where('user_id', $user_id);
        $this->db->where('webpage_id', $webpage_id);
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
     */
    
    /**
     * 取得自己喜愛的數量
     * @param Webpage $webpage
     * @return Int $count
     */
    /*
    public function get_like_to_annotation_count($webpage) {
        $like_to_count = $this->get_like_to_annotation($webpage)->length();
        return $like_to_count;
    }
    */
    
    /**
     * 取得喜愛指定對象的數量
     * 
     * @param Webpage $webpage
     * @param User $user 
     */
    /*
    public function get_like_to_user_count($webpage, $like_to_user) {
     // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        // use to test 
        //$user_id = 2002;
        $user_id = $this->get_id();
        //--------
        $this->db->select('annotation2like.annotation_id');
        $this->db->from('annotation2like');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation2like.annotation_id');
        $this->db->join('annotation', 'annotation.annotation_id = annotation2like.annotation_id');
        $this->db->where('annotation2like.user_id', $user_id);
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('annotation.user_id', $like_to_user->get_id());
        $query = $this->db->get();
        $count = $query->num_rows(); 
        return $count;
    }
     */
    
    /**
     * 取得被喜愛的標註數量
     * 
     * @param Webpage $webpage
     * @param User $user 
     */
    /*
    public function get_liked_count($webpage) {
     // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        // use to test 
        //$user_id = 2002;
        $user_id = $this->get_id();
        //--------
        $this->db->select('annotation2like.annotation_id');
        $this->db->from('annotation2like');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation2like.annotation_id');
        $this->db->join('annotation', 'annotation.annotation_id = annotation2like.annotation_id');
        $this->db->where('annotation2like.user_id <>', $user_id);
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('annotation.user_id', $user_id);
        $query = $this->db->get();
        $count = $query->num_rows(); 
        return $count;
    }
     * 
     */
     
    /**
     * 取得被指定對象喜愛的數量
     * 
     * @param Webpage $webpage
     * @param User $user 
     */
    /*
    public function get_liked_by_user_count($webpage, $liked_user) {
     // @TODO 20140512 Pulipuli Chen
        $webpage_id = $webpage->get_id(); 
        // use to test 
        //$user_id = 2002;
        $user_id = $this->get_id();
        //--------
        $this->db->select('annotation2like.annotation_id');
        $this->db->from('annotation2like');
        $this->db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation2like.annotation_id');
        $this->db->join('annotation', 'annotation.annotation_id = annotation2like.annotation_id');
        $this->db->where('annotation2like.user_id', $liked_user->get_id());
        $this->db->where('webpage_id', $webpage_id);
        $this->db->where('annotation.user_id', $user_id);
        $query = $this->db->get();
        $count = $query->num_rows(); 
        return $count;
    }
     * 
     */
    
    /**
     * 取得被誰喜愛的名單
     * 
     * @param Webpage $webpage
     * @param User $user 
     * @todo 之後再完成
     */
    /*
    public function get_liked_user($webpage) {
        
        return 0;
    }
     * 
     */
        /**
     * 取得被多少人喜愛的數量
     * 
     * @param Webpage $webpage
     * @param User $user 
     * @todo 之後再完成
     */
    /*
    public function get_liked_user_count($webpage) {
        
        return 0;
    }
     * 
     */
}


/* End of file User.php */
/* Location: ./system/application/libraries/kals_actor/User.php */