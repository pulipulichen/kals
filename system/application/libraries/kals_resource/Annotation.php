<?php
include_once 'KALS_resource.php';
/**
 * Annotation
 *
 * 標註
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/5 下午 10:40:15
 * @property Annotation_type_factory $type_factory
 * @property Authorize_manager $auth
 * @property Segmentor segmentor
 * @property Annotation_scope_collection $scope_coll
 * @property Annotation_score_collection $score_coll
 * @property Annotation_respond_collection $respond_to_coll
 * @property Annotation_topic_respond_collection $topic_respond_coll
 * @property Annotation_like_collection $like_coll
 * @property Annotation_recommend $recommend
 * @example
 * 資料表建立：<code>

-- Table: annotation

-- DROP TABLE annotation;

CREATE TABLE annotation
(
  annotation_id serial NOT NULL,
  create_timestamp timestamp with time zone NOT NULL DEFAULT now(),
  update_timestamp timestamp with time zone NOT NULL DEFAULT now(),
  deleted boolean NOT NULL DEFAULT false,
  user_id integer NOT NULL,
  annotation_type_id integer NOT NULL DEFAULT 1,
  note text,
  note_index tsvector,
  topic_id integer,
  CONSTRAINT annotation_pkey PRIMARY KEY (annotation_id)
)
WITH (OIDS=FALSE);
ALTER TABLE annotation OWNER TO postgres;

 * </code>
 */
class Annotation extends KALS_resource {

    public $resource_type_id = 3;

    protected $table_name = 'annotation';
    protected $table_fields = array('annotation_id', 'create_timestamp', 'update_timestamp', 'deleted', 'user_id', 'annotation_type_id', 'note', 'note_index', 'topic_id');
    protected $primary_key = 'annotation_id';
    protected $not_null_field = array('user_id', 'annotation_type_id');
    protected $except_bind_fields = array('note_index');
    protected $fake_delete = 'deleted';

    private $auth;
    private $type_factory;
    private $segmentor;
    private $scope_coll;
    private $score_coll;

    private function _load_type_factory()
    {
        if (is_null(($this->type_factory)))
        {
            $this->_CI_load('library', 'type/Annotation_type_factory', 'annotation_type_factory');
            $this->type_factory = $this->CI->annotation_type_factory;
        }
    }

    private function _load_user()
    {
        if (is_null(($this->CI->user)))
        {
            $this->_CI_load('library', 'kals_actor/User', 'user');
        }
    }

    protected function _pre_update($data)
    {
        //檢查權限
        $this->auth->is_admin();

        if (count($data) == 0)
            return $data;

        //檢查note_index，加入斷詞
        if (isset($data['note']) && isset($this->modified_fields['note']) && $this->modified_fields['note'] == TRUE)
        {
            // 2010.11.5 因為斷詞器即時運作會影響效能，所以先關掉
            // 未來改用非同步的方式來斷詞吧
            /*
            if (is_null($data['note']) == FALSE)
            {
                $this->_load_segmentor();
                $note = $data['note'];
                //$note = urlencode($note);
                //$note = strip_tags($note);
                //$note = addslashes($note);
                //$note = trim($note);

                $data['note_index'] = $this->segmentor->text_to_index($note);
                $this->modified_fields['note_index'] = TRUE;
            }
            else
            {
                $data['note_index'] = NULL;
                $this->modified_fields['note_index'] = TRUE;
            }
             */
        }
        else if (array_key_exists ('note', $data) && is_null($data['note']))
        {
            $data['note_index'] = NULL;
            //$data['note'] = NULL;
            //unset($data['note_index']);
        }

        if (FALSE === isset($data['annotation_type_id']))
        {
            $data['annotation_type_id'] = 1;
        }
        if (isset($this->id))
        {
            $data['update_timestamp'] = get_timestamp();
        }

        return $data;
    }

    private function _load_segmentor()
    {
        if (is_null($this->segmentor))
        {
            $this->_CI_load('library', 'scope/Segmentor_factory', 'segmentor_factory');
            $this->segmentor = Segmentor_factory::create();
        }
        return $this;
    }

    protected function _pre_delete()
    {
        //檢查權限
        $this->auth->is_admin();
    }

    //-------------------------------------------------

    public function set_user($user_id)
    {
        $this->_load_user();
        $user_id = $this->CI->user->filter_id($user_id);

        return $this->set_field('user_id', $user_id);
    }

    /**
     * @return User
     */
    public function get_user()
    {
        $user_id = $this->get_field('user_id');
        $this->_load_user();
        return new User($user_id);
    }

    /**
     * 設置Type
     * @param Int|String|Annotation_type $type_id 目前只允許七種類別而已
     * @return Annotation
     */
    public function set_type($type_id)
    {
        $this->_load_type_factory();
        $type_id = $this->type_factory->filter_type_id($type_id);
        return $this->set_field('annotation_type_id', $type_id);
    }
    /**
     * @return Annotation_type
     */
    public function get_type()
    {
        $this->_load_type_factory();
        $type_id = intval($this->get_field('annotation_type_id', 1));
        return $this->type_factory->create($type_id);
    }

    /*
    public function get_type_id()
    {
        $type_id = $this->get_field('annotation_type_id');
        $type_id = intval($type_id);
        return $type_id;
    }
     */

    public function set_note($value)
    {
        if (is_string($value))
        {
            //$value = strip_tags($value, '<p><a><b><strong><i><table><tbody><tr><th><td><thead><tfoot><img><span><div><li><ul><ol><br /><object>');
            $value = strip_selected_tags($value, array('script', 'style') );
            //$value = addslashes($value);
            //$value = strip_tags($value);
            $value = trim($value);
        }
        if (is_null($value) || $value == '')
            return $this->unset_field ('note');
        else
            return $this->set_field('note', $value);
    }

    public function get_note()
    {
        return $this->get_field('note');
    }

    public function get_create_timestamp()
    {
        //$timestamp = $this->get_field('create_timestamp');
        $query = $this->db->from($this->table_name)
                ->where($this->primary_key, $this->get_id())
                ->select('create_timestamp AS timestamp')
                ->get();
        $row = $query->row_array();
        $timestamp = $row['timestamp'];
        return $timestamp;
    }

    public function get_update_timestamp()
    {
        //$timestamp = $this->get_field('create_timestamp');
        $query = $this->db->from($this->table_name)
                ->where($this->primary_key, $this->get_id())
                ->select('update_timestamp AS timestamp')
                ->get();
        $row = $query->row_array();
        $timestamp = $row['timestamp'];
        return $timestamp;
    }

    public function get_update_epoch()
    {
        $query = $this->db->from($this->table_name)
                ->where($this->primary_key, $this->get_id())
                ->select('EXTRACT(EPOCH FROM update_timestamp)::int AS epoch_time')
                ->get();
        $row = $query->row_array();
        $timestamp = $row['epoch_time'];
        return $timestamp;
    }

    public function get_create_epoch()
    {
        $query = $this->db->from($this->table_name)
                ->where($this->primary_key, $this->get_id())
                ->select('EXTRACT(EPOCH FROM create_timestamp)::int AS epoch_time')
                ->get();
        $row = $query->row_array();
        $timestamp = $row['epoch_time'];
        return $timestamp;
    }

    //---------------------------------------------------
    //跟respond & topic相關
    
    public function set_respond_to_topic($topic_id)
    {
        $topic_id = $this->filter_id($topic_id);
        return $this->set_field('topic_id', $topic_id);
    }

    public function is_respond()
    {
        $topic_id = $this->get_field('topic_id');
        return (is_null($topic_id) === FALSE);
    }

    /**
     * @return Annotation
     */
    public function get_respond_to_topic()
    {
        $topic_id = $this->get_field('topic_id');
        if (is_null($topic_id))
            return NULL;
        else
            return new Annotation($topic_id);
    }

    //----------------------------------------------
    // 標註回應的部份

    private $respond_to_coll;

    /**
     * 匯入一堆Annotation當做respond to的對象
     * @param Annotation[] $coll
     * @return Annotation
     */
    public function set_respond_to_coll($coll)
    {
        if (is_array($coll))
        {
            $this->respond_to_coll->set_members($coll);
        }
        return $this;
    }

    /**
     * @return Annotation_respond_collection
     */
    public function get_respond_to_coll()
    {
        return $this->respond_to_coll;
    }

    private $topic_responded_coll;
    /**
     * Topic Annotation底下的list
     */
    public function get_topic_respond_coll()
    {
        return $this->topic_respond_coll;
    }

    /**
     * @return Annotation 
     */
    public function get_topic()
    {
        $topic_id = $this->get_field('topic_id');
        if (is_null($topic_id))
            return NULL;
        else
            return new Annotation($topic_id);
    }
    
    //------------------------------------------
    //跟Annotation_scope_collection相關

    public function create_annotation($user_id, $scope_coll, $do_update = TRUE)
    {
        $this->_load_user();
        $user_id = $this->CI->user->filter_id($user_id);

        $annotation = new Annotation();
        $annotation->set_scopes($scope_coll);
        $annotation->set_user($user_id);
        if ($do_update)
            $annotation->update();

        return $annotation;
    }
    
    public function set_scopes($scope_coll)
    {
        $this->scope_coll->set_members($scope_coll);
        return $this;
    }

    /**
     * @return Annotation_scope_collection
     */
    public function get_scopes()
    {
        return $this->scope_coll;
    }

    /**
     * @return string
     */
    public function get_anchor_text()
    {
        $scope_coll = $this->get_scopes();
        return $scope_coll->get_anchor_text();
    }

    
    public function get_anchor_speech()
    {
        $scope_coll = $this->get_scopes();
        return $scope_coll->get_anchor_speech();
    }

    public function get_scope_length()
    {
        $scope_coll = $this->get_scopes();
        return $scope_coll->get_scope_length();
    }
    
    //------------------------------------------
    //跟webpage2annotation相關

    private function _load_webpage()
    {
        if (is_null(($this->CI->webpage)))
        {
        	$this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        }
    }

    private $appended_webpages;
    public function get_append_to_webpages()
    {
        if (is_null($this->appended_webpages))
        {
            $scope_coll = $this->get_scopes();
            $this->appended_webpages = $scope_coll->get_appended_webpages();
        }
        return $this->appended_webpages;
    }


    //----------------------------------------------
    //跟Annotation_feature_factory相關

    public function set_feature($feature_type_id, $value)
    {
        $this->feature_coll->set_item_data($feature_type_id, $value);
        $this->feature_coll->update();
        return $this;
    }

    /**
     * @param int $feature_type_id
     * @return Annotation_feature
     */
    public function get_feature($feature_type_id)
    {
        return $this->feature_coll->get_item($feature_type_id);
    }

    public function set_feature_location($value)
    {
        $this->_CI_load('library', 'annotation/Annotation_feature_location', 'annotation_feature_location');
        $feature_type_id = $this->CI->annotation_feature_location->get_type_id();

        $value = json_encode($value);
        $this->set_feature($feature_type_id, $value);
        return $this;
    }

    /**
     *
     * @return array|string
     */
    public function get_feature_location()
    {
        $this->_CI_load('library', 'annotation/Annotation_feature_location', 'annotation_feature_location');
        $feature_type_id = $this->CI->annotation_feature_location->get_type_id();

        $serialized_json = $this->get_feature($feature_type_id)->get_value();

        if (isset($serialized_json))
        {
            $feature_location = json_decode($serialized_json);
            if (is_array($feature_location) === FALSE)
            {
                $feature_location = array($feature_location);
            }
            return $feature_location;
        }
        else
            return array();
    }

    public function set_recommend_scopes(Annotation_scope_collection $scope_coll)
    {
        $value = $scope_coll->export_json();

        $this->_CI_load('library', 'annotation/Annotation_feature_recommend_scope', 'annotation_feature_recommend_scope');
        $feature_type_id = $this->CI->annotation_feature_recommend_scope->get_type_id();
        //test_msg('set_recommend_scopes', $value);
        $this->set_feature($feature_type_id, $value);
        return $this;
    }

    public function get_recommend_by_scopes() {
        return $this->get_recommend_scopes();
    }

    public function get_recommend_scopes()
    {
        $this->_CI_load('library', 'annotation/Annotation_feature_recommend_scope', 'annotation_feature_recommend_scope');
        $feature_type_id = $this->CI->annotation_feature_recommend_scope->get_type_id();

        $serialized_json = $this->get_feature($feature_type_id)->get_value();

        if (isset($serialized_json))
        {
            $this->_CI_load('library', 'scope/Annotation_scope_collection', 'annotation_scope_collection');
            $scope_coll = $this->CI->annotation_scope_collection->import_json($serialized_json);
            return $scope_coll;
        }
        else
            return NULL;
    }

    //---------------------------------------------
    //Annotation_like_collection相關

    private $recommend;
    protected function  _post_construct($table_name = NULL, $id = NULL) {
        //$this->CI->load->library('policy/Authorize_manager', NULL, 'authorize_manager');
        $this->_CI_load('library', 'policy/Authorize_manager', 'authorize_manager');
        $this->auth = new Authorize_manager();
        $this->auth->set_resource($this);
        $this->auth->set_throw_exception(TRUE);

        $this->_CI_load('library', 'annotation/Annotation_respond_collection', 'annotation_respond_collection');
        $this->respond_to_coll = new Annotation_respond_collection($this);

        $this->_CI_load('library', 'scope/Annotation_scope_collection', 'annotation_scope_collection');
        $this->scope_coll = new Annotation_scope_collection($this);

        $this->_CI_load('library', 'annotation/Annotation_topic_respond_collection', 'annotation_topic_respond_collection');
        $this->topic_respond_coll = new Annotation_topic_respond_collection($this);

        $this->_CI_load('library', 'annotation/Annotation_feature_collection', 'annotation_feature_collection');
        $this->feature_coll = new Annotation_feature_collection($this);

        $this->_CI_load('library', 'score/Annotation_score_collection', 'annotation_score_collection');
        $this->score_coll = new Annotation_score_collection($this);

        $this->_CI_load('library', 'annotation/Annotation_like_collection', 'annotation_like_collection');
        $this->like_coll = new Annotation_like_collection($this);
        
        $this->_CI_load('library', 'annotation/Annotation_read_collection', 'annotation_read_collection');
        $this->read_coll = new Annotation_read_collection($this);
    }

    protected function  _post_update() {
        $this->scope_coll->update();
        $this->respond_to_coll->update();
        $this->feature_coll->update();
        $this->score_coll->update();
        $this->like_coll->update();
        $this->read_coll->update();

        //假如有topic的話……
        $topic_id = $this->get_field('topic_id');
        if ($topic_id !== NULL && $topic_id !== '')
        {
            $this->_CI_load('library', 'kals_actor/User', 'user');
            $trigger_resource = $this;
            $association_resource = new Annotation($topic_id);
            $association_user = $association_resource->get_user();

            if (FALSE === $this->respond_to_coll->exists_user($association_user))
            {
                $trigger_actor = $this->get_user();

                $this->_CI_load('library', 'kals_actor/Notification_responded', 'notification_responded');
                $notification = $this->CI->notification_responded
                        ->create_notification($association_user, $trigger_resource, $trigger_actor);
                if (is_null($notification))
                {
                    handle_error($this->lang->line('notification.responded.create_notification.exception'));
                }
            }   //if (FALSE === $this->respond_to_coll->exists_user($association_user))
        }   //if ($topic_id !== NULL && $topic_id !== '')
    }
    public function add_like($user_id)
    {
        $this->like_coll->set_item_data($user_id, 'FALSE');
        $this->like_coll->update();
        return $this;
    }
    
    public function add_read($user_id)
    {
        $this->read_coll->set_item_data($user_id, 'FALSE');
        $this->read_coll->update();
        return $this;
    }

    public function is_liked($user_id)
    {
        $this->_CI_load('library', 'kals_actor/User', 'user');
        $user_id = $this->CI->user->filter_id($user_id);

        return $this->like_coll->exists($user_id);
    }

    public function is_readd($user_id)
    {
        $this->_CI_load('library', 'kals_actor/User', 'user');
        $user_id = $this->CI->user->filter_id($user_id);

        return $this->read_coll->exists($user_id);
    }

    public function remove_like($user_id)
    {
        $this->like_coll->set_item_data($user_id, 'TRUE');
        $this->like_coll->update();
        return $this;
    }

    public function remove_read($user_id)
    {
        $this->read_coll->set_item_data($user_id, 'TRUE');
        $this->read_coll->update();
        return $this;
    }


    public function get_like_count()
    {
        return $this->like_coll->get_like_count();
    }

    public function get_read_count()
    {
        return $this->read_coll->get_read_count();
    }

    //------------------------------------------------
    //跟Annotation_score_collection相關


    public function set_score_coll($score_coll)
    {
        $this->score_coll->set_members($score_coll);
        return $this;
    }

    public function set_score($type_id, $score)
    {
        $this->score_coll->set_item_data($type_id, $score);
        return $this;
    }

    public function set_scores($scores)
    {
        $this->score_coll->set_scores($scores);
        return $this;
    }

    /**
     * @return Annotation_scope_collection
     */
    public function get_score_coll()
    {
        return $this->score_coll;
    }

    /**
     * @param int $type_id
     * @return Annotation_score
     */
    public function get_score($type_id)
    {
        return $this->score_coll->get_item($type_id);
    }
    
    //-------------------------------------------------
    //跟recommend相關

    public function set_recommend(Annotation_recommend $recommend)
    {
        $this->recommend = $recommend;
    }

    /**
     * @return Annotation_recommend
     */
    public function get_recommend()
    {
        if (is_null($this->recommend))
        {
            $this->_CI_load('library', 'recommend/Annotation_recommend', 'annotation_recommend');
            if (isset($this->id))
                $this->recommend = $this->CI->annotation_recommend->find(array('recommended_annotation_id' => $this->get_id()));
        }
        return $this->recommend;
    }
    
    public function has_recommend()
    {
        $recommend = $this->get_recommend();
        return isset($recommend);
    }

    /**
     * @return Annotation
     */
    public function get_recommend_by()
    {
        $recommend_by = NULL;
        $recommend = $this->get_recommend();
        if (isset($recommend))
        {
            $recommend_by = $recommend->get_recommend_by();
        }
        return $recommend_by;
    }

    public function get_tip_text_array()
    {
        $array = NULL;
        if (isset($this->recommend))
        {
            $array = $this->recommend->get_tips_text_array();
        }
        return $array;
    }

    /**
     * 接受變更，如果願意接受變更，則回傳變更過後的標註
     * @param boolean $accept
     * @return Annotation
     */
    public function set_accept($accept = TRUE)
    {
        $annotation = NULL;
        
        if (isset($this->recommend))
        {
            $annotation = $this->recommend->set_accept($accept);
        }

        return $annotation;
    }

    //--------------------------------------------------
    //跟標註共識相關

    public function get_consensus_coll()
    {
        $this->_CI_load('library', 'search/Search_annotation_collection', 'search_annotation_collection');

        $type = 'Search_annotation_collection';
        $key = 'annotation_get_consensus_coll';
        $value = $this->get_id();

        $search = get_cache($type, $key, $value);
        if (is_null($search))
        {
            
            $search = new Search_annotation_collection();
            
            $search->set_check_authorize(false);
            
            $search->set_limit(NULL);
            
            $search->set_target_scope($this->scope_coll);
            $search->set_exclude_annotation($this->get_id());
            $search->set_exclude_user($this->get_user());
            $search->set_target_topic(TRUE);    //只有topic才有分數
            $search->add_order(1);
            set_cache($search, $key, $value);
        }
        return $search;
    }

    public function get_consensus_count()
    {
        $this->_CI_load('library', 'search/Search_annotation_user_collection', 'search_annoation_user_collection');

        $type = 'Search_annotation_user_collection';
        $key = $this->get_id().'_annotation_get_consensus_count';
        $value = $this->get_id();

        $search = get_cache($type, $key, $value);
        if (is_null($search))
        {
            //$search = new Search_annotation_id_collection();
            $search = new Search_annotation_user_collection();  //只算人頭

            $search->set_check_authorize(false);
            $search->set_limit(NULL);
            $search->set_target_scope($this->scope_coll);
            $search->set_exclude_annotation($this->get_id());

            //排除自己的
            $search->set_exclude_user($this->get_user());

            //回應也算是在範圍共識裡面喔！

            set_cache($search, $key, $value);
        }
        return $search->length();
    }

    /**
     * 匯入。當推薦標註更改時，把原本的資料匯入，除了範圍、使用者之外
     * @param Annotation $annotation
     * @return Annotation
     */
    public function import(Annotation $annotation)
    {
        $this->set_type($annotation->get_type());
        $this->set_note($annotation->get_note());

        $featrues_type_id = $this->feature_coll->get_types_id();
        foreach ($featrues_type_id AS $feature_type_id)
        {
            $value = $annotation->get_feature($feature_type_id)->get_value();
            if (isset($value))
                $this->set_feature($feature_type_id, $value);
        }

        return $this;
    }

    /**
     * 輸出資料
     * @param NULL|String[] $fields 限定要輸出的欄位，沒有的話就用預設的欄位輸出
     * @return Object
     */
    public function export_data($fields = NULL)
    {
        $data = array();

        if (FALSE === is_array($fields))
        {
            //$data['class'] = get_class($this);
            $data['annotation_id'] = $this->get_id();
            $note = $this->get_note();
            if (isset($note))
                $data['note'] = $note;
            $data['user'] = $this->get_user()->export_simple_data();
            $data['type'] = $this->get_type()->export_data();
            $data['scope'] = $this->get_scopes()->export_data();

            $respond_to_topic= $this->get_respond_to_topic();
            if (isset($respond_to_topic))
                $data['topic'] = $respond_to_topic->export_respond_to_data();
            $respond_to_coll = $this->get_respond_to_coll();
            if (isset($respond_to_coll))
                $data['respond_to_coll'] = $respond_to_coll->export_respond_to_data();

            $current_user = get_context_user();
            if (is_class($current_user, 'User'))
                $data['is_like'] = $this->is_liked($current_user);
                
            if (is_class($current_user, 'User'))
                $data['is_read'] = $this->is_readd($current_user);
            
        }
        else
        {
            foreach ($fields AS $field)
            {
                switch ($field)
                {
                    case 'user':
                        $data[$field] = $this->get_user()->export_data();
                        break;
                    default :
                        $data[$field] = $this->get_field($field);
                }
            }
        }

        return $data;
    }

    public function export_simple_data()
    {
        $data = array();
        $data['annotation_id'] = $this->get_id();
        $data['user'] = $this->get_user()->export_simple_data();

        return $data;
    }

    public function export_webpage_data($url)
    {
        $data = array();

        //$data['class'] = get_class($this);
        $data['annotation_id'] = $this->get_id();
        $note = $this->get_note();
        if (isset($note))
            $data['note'] = $this->get_note();
        $data['user'] = $this->get_user()->export_simple_data();
        $data['type'] = $this->get_type()->export_data();
        $data['scope'] = $this->get_scopes()->export_webpage_data($url);
        $data['timestamp'] = $this->get_create_epoch();

        $respond_to_topic= $this->get_respond_to_topic();
        if (isset($respond_to_topic))
        {
            $data['topic'] = $respond_to_topic->export_simple_data();
        }

        $respond_to_coll = $this->get_respond_to_coll();
        if (isset($respond_to_coll) && $respond_to_coll->length() > 0)
        {
            $data['respond_to_coll'] = $respond_to_coll->export_respond_to_data();
        }

        $current_user = get_context_user();
        $is_my_annotation = FALSE;
        if (isset($current_user) && $this->get_user()->equals($current_user))
            $is_my_annotation = TRUE;

        if ($this->is_respond() === FALSE)
        {
            
            if (is_class($current_user, 'User') && $is_my_annotation === FALSE)
                $data['is_like'] = $this->is_liked($current_user);
            if (is_class($current_user, 'User') && $is_my_annotation === FALSE)
                $data['is_read'] = $this->is_readd($current_user);
                
            $data['like_count'] = $this->get_like_count();
            $data['read_count'] = $this->get_read_count();
        }

        if ($is_my_annotation === TRUE)
        {
            $data['policy_type'] = 'public';

            $this->_CI_load('libraries', 'policy/Authorize_manager');
            $auth = new Authorize_manager();
            $auth->set_resource($this);
            $action = 5;
            $actors = $auth->get_actors($action);

            //test_msg($actors);

            if (count($actors) == 1
                && $this->get_user()->equals($actors[0]))
            {
                $data['policy_type'] = 'private';
            }
            else if (count($actors) > 0)
            {
                $data['policy_type'] = 'share';
                $actors_data = array();
                foreach ($actors AS $actor)
                {
                    $actors_data[] = $actor->export_simple_data();
                }
                $data['share_list'] = $actors_data;
            }

            if ($this->is_respond() === FALSE)
            {
                //匯出建議
                $recommend = $this->get_recommend();
                if (isset($recommend))
                {
                    $recommend_data = $recommend->export_webpage_data($url);
                    if (isset($recommend_data))
                        $data['recommend'] = $recommend_data;
                }
            }
        }

        return $data;
    }

    public function export_webpage_recommend_data($url)
    {
        $data = array();

        //$data['class'] = get_class($this);
        $data['annotation_id'] = $this->get_id();
        $note = $this->get_note();
        if (isset($note))
            $data['note'] = $this->get_note();
        $data['user'] = $this->get_user()->export_simple_data();
        $data['type'] = $this->get_type()->export_data();
        $data['scope'] = $this->get_scopes()->export_webpage_data($url);

        $current_user = get_context_user();
        $is_my_annotation = FALSE;
        if (isset($current_user) && $this->get_user()->equals($current_user))
            $is_my_annotation = TRUE;
        if ($this->is_respond() === FALSE)
        {

            if (is_class($current_user, 'User') && $is_my_annotation === FALSE)
                $data['is_like'] = $this->is_liked($current_user);
            if (is_class($current_user, 'User') && $is_my_annotation === FALSE)
                $data['is_read'] = $this->is_readd($current_user);
                
            $data['like_count'] = $this->get_like_count();
            $data['read_count'] = $this->get_read_count();
        }

        return $data;
    }

    public function export_json()
    {
        $data = $this->export_data();

        $json = json_encode($data);
        return $json;
    }
}


/* End of file Annotation.php */
/* Location: ./system/application/libraries/kals_resource/Annotation.php */