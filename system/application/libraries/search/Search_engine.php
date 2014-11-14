<?php
/**
 * Search_engine
 *
 * 搜尋Annotation或Scope等，並將結果以Collection的形式回傳
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/13 下午 03:33:36
 * @property Annotation_scope_collection $target_scope
 * @property Annotation_scope_collection $overlap_scope
 * @property Annotation_scope_collection $exclude_scope
 * @property Search_order_collection $order_coll
 * @property Segmentor $segmentor
 */
class Search_engine extends Generic_collection {

    //------------------------------------
    // Generic Collection

    //protected $limit = 20;

    protected $members_readonly = TRUE;
    protected $segmentor;
    protected $other_from = array();
    
    protected $order_coll;
    function  __construct() {
        parent::__construct();
        $this->_CI_load('library', 'search/Search_order_collection', 'search_order_collection');
        $this->order_coll = new Search_order_collection();
        $this->is_loaded = FALSE;
        return $this;
    }

    public function load_default()
    {
        //$db = $this->setup_search();

        //基本上不作其他事情，其他事情是要交由子類別去完成

        return TRUE;
    }

    public function setup_search()
    {
        //--------------------------------------------------
        // 先取得設定，再進行查詢

        //------------------------------------
        //第一關 check auth * 設定
        $annotation_type_id = NULL;
        $action_id = NULL;

        $current_user_id = NULL;
        $current_user_type_id = NULL;
        $current_group_id_list = array();
        $current_group_type_id = NULL;
        if ($this->check_auth === TRUE)
        {
            //SELECT *
            //FROM annotation
            //LEFT JOIN policy
            //  ON policy.resource_id = annotation.annotation_id
            //  AND policy.resource_type_id = 3
            //  AND policy.action_id = 5
            //LEFT JOIN policy2actor
            //  ON policy.policy_id = policy2actor.policy_id
            //	AND policy2actor.actor_type_id = 1
            //WHERE
            //	(policy2actor.actor_id IS NULL OR
            //      policy2actor.actor_id = 123)

            $this->_CI_load('library', 'kals_resource/Annotation', 'annotation');
            $annotation_type_id = $this->CI->annotation->get_type_id();
            $this->_CI_load('library', 'policy/Action_annotation_read', 'action_annotation_read');
            $action_id = $this->CI->action_annotation_read->get_id();

            $current_user = get_context_user();
            if (is_class($current_user, 'User'))
            {
                $current_user_id = $current_user->get_id();
                $current_user_type_id = $current_user->get_type_id();

                $groups = $current_user->get_parent_groups();
                foreach ($groups AS $group)
                {
                    if (is_null($current_group_type_id))
                        $current_group_type_id = $group->get_type_id();
                    $current_group_id_list[] = $group->get_id();
                }

                
            }
        }   //if ($this->check_auth)

        //-------------------------------------
        //第三關 target_scope * 設定

        $target_scope_in_sql = NULL;
        if (isset($this->target_scope) && $this->target_scope->length() > 0)
        {
            //SELECT annotation.annotation_id
            //FROM annotation
            //JOIN
            //  (SELECT distinct a2s.annotation_id
            //  FROM annotation
            //  JOIN annotation2scope AS a2s
            //      ON a2s.annotation_id = annotation.annotation_id
            //  LEFT OUTER JOIN scope AS s1
            //      ON s1.scope_id = a2s.scope_id
            //      AND s1.from_index = 3
            //      AND s1.to_index = 20
            //  LEFT OUTER JOIN scope AS s2
            //      ON s2.scope_id = a2s.scope_id
            //      AND s2.from_index = 26
            //      AND s2.to_index = 40
            //  GROUP BY a2s.annotation_id
            //  HAVING count(a2s.annotation_id) >= 2 )
            //AS target_scope ON annotation.annotation_id = target_scope.annotation_id

            $in_sql = 'SELECT DISTINCT a2s.annotation_id '
                .' FROM annotation2scope AS a2s ';
            $where = '';
            foreach ($this->target_scope AS $key => $scope)
            {
                $from = $scope->get_from_index();
                $to = $scope->get_to_index();
                $webpage_id = $scope->get_webpage_id();

                $table_name = 's'.$key;
                $in_sql = $in_sql . ' LEFT JOIN scope AS '.$table_name
                    . ' ON '.$table_name.'.scope_id = a2s.scope_id'
                    . ' AND '.$table_name.'.webpage_id = '.$webpage_id
                    . ' AND '.$table_name.'.from_index = '.$from
                    . ' AND '.$table_name.'.to_index = '.$to;

                if ($where != '')
                    $where .= ' OR ';
                $where .= $table_name.'.scope_id IS NOT NULL ';
            }
            $in_sql = $in_sql
                . ' WHERE '.$where
                . ' GROUP BY a2s.annotation_id '
                . ' HAVING count(a2s.annotation_id) = '.$this->target_scope->length();
            $target_scope_in_sql = $in_sql;
        }

        //------------------------------------------------------
        // 第四關 exclude_scope * 設定

        $exclude_scope_in_sql = NULL;
        if (isset($this->exclude_scope) && $this->exclude_scope->length() > 0)
        {
            $in_sql = 'SELECT DISTINCT a2s.annotation_id '
                .' FROM annotation2scope AS a2s ';
            $where = '';
            foreach ($this->exclude_scope AS $key => $scope)
            {
                $from = $scope->get_from_index();
                $to = $scope->get_to_index();
                $webpage_id = $scope->get_webpage_id();

                $table_name = 's'.$key;
                $in_sql = $in_sql . ' LEFT JOIN scope AS '.$table_name
                    . ' ON '.$table_name.'.scope_id = a2s.scope_id'
                    . ' AND '.$table_name.'.webpage_id = '.$webpage_id
                    . ' AND '.$table_name.'.from_index = '.$from
                    . ' AND '.$table_name.'.to_index = '.$to;
                if ($where != '')
                    $where .= ' OR ';
                $where .= $table_name.'.scope_id IS NOT NULL ';
            }
            $in_sql = $in_sql
                . ' WHERE '.$where
                . ' GROUP BY a2s.annotation_id '
                . ' HAVING count(a2s.annotation_id) = '.$this->exclude_scope->length();

            //減去現有的查詢
            $in_sql = 'SELECT annotation.annotation_id FROM annotation EXCEPT '.$in_sql;
            $exclude_scope_in_sql = $in_sql;
        }   //if (isset($this->exclude_scope))

        //------------------------------------------------
        // 第五關 overlap_scope * 設定

        $overlap_scope_where = NULL;
        $overlap_scope_join = array();
        
        if (isset($this->overlap_scope) && $this->overlap_scope->length())
        {
            //SELECT distinct annotation.annotation_id
            //FROM annotation
            //JOIN annotation2scope AS a2s
            //	ON a2s.annotation_id = annotation.annotation_id
            //JOIN scope AS s1
            //	ON s1.scope_id = a2s.scope_id
            //	AND ( (s1.from_index >= 23 AND s1.from_index <= 44)
            //	  OR (s1.to_index >= 23 AND s1.to_index <= 44)
            //	  OR (s1.from_index <= 23 AND s1.to_index >= 44))

            $where = '';
            $join_scopes = array();
            
            foreach ($this->overlap_scope AS $key => $scope)
            {
                $webpage_id = $scope->get_webpage_id();
                $from = $scope->get_from_index();
                $to = $scope->get_to_index();
                $table = 'overlap_scope_'.$key;

                $join_scopes[] = array(
                    'webpage_id' => $webpage_id,
                    'from' => $from,
                    'to' => $to,
                    'table' =>$table
                );

                if ($where != '')
                    $where .= ' OR ';
                $where .= $table.'.scope_id IS NOT NULL ';
            }

            $overlap_scope_where = $where;
            $overlap_scope_join = $join_scopes;
        }

        //------------------------------------------------
        //第十關 search_note * 設定
        //test_msg($this->search_note);    //this->search_note空值

        $search_note_query = NULL;
        if (isset($this->search_note))
        {
            $query = $this->search_note;
            $query_with_segment = TRUE;
            if ($query_with_segment)
            {
                if (is_null($this->segmentor))
                {
                    $this->_CI_load('library', 'scope/Segmentor_factory', 'segmentor_factory');
                    $this->segmentor = Segmentor_factory::create_search_segmentor();
                }
                $query = $this->segmentor->text_to_query($query);
            }
            else
            {
                $this->_CI_load('library', 'scope/Segmentor', 'segmentor');
                $query = Segmentor::segment_to_query($query);
            }
            $search_note_query = $query;
        }

        //------------------------------------------------
        // 第十二關 search_anchor_text * 設定

        $search_anchor_text_query = NULL;
        $segmentor = $this->CI->config->item('segmentor.default');
            
        if ($segmentor !== "segmentor.disable" && isset($this->search_anchor_text))
        {
            $query = $this->search_anchor_text;
            $query_with_segment = TRUE;
            if ($query_with_segment)
            {
                if (is_null($this->segmentor))
                {
                    $this->_CI_load('library', 'scope/Segmentor_factory', 'segmentor_factory');
                    $this->segmentor = Segmentor_factory::create_search_segmentor();
                }
                $query = $this->segmentor->text_to_query($query);
            }
            else
            {
                $this->_CI_load('library', 'scope/Segmentor', 'segmentor');
                $query = Segmentor::segment_to_query($query);
            }
            $search_anchor_text_query = $query;
        }   //if (isset($this->search_anchor_text))

        //------------------------------------------------
        // 第十三關 target_over_score * 設定

        $target_over_score_type_id = NULL;
        if (isset($this->target_over_score) && $this->target_over_score > 0)
        {
            $this->_CI_load('library', 'score/Annotation_score_integrated', 'annotation_score_integrated');
            $score_type_id = $this->CI->annotation_score_integrated->get_type_id();
            $target_over_score_type_id = $score_type_id;
        }

        //-----------------------------------------------
        //接著才是進入查詢

        $db = $this->db;
        
        //$db->from('annotation');
        $db->where('annotation.deleted', 'FALSE');
        if (isset($this->limit))
            $db->limit($this->limit);
        if (isset($this->offset))
            $db->offset($this->offset);

        //------------------------------------
        //第一關 check auth * 查詢
        if ($this->check_auth === TRUE)
        {
            $db->join('policy'
                , 'policy.resource_id = annotation.annotation_id '
                    . 'AND policy.resource_type_id = '.$annotation_type_id.' '
                    . 'AND policy.action_id = '.$action_id
                , 'left');
            $db->join('policy2actor'
                , 'policy.policy_id = policy2actor.policy_id '
                    //. 'AND policy2actor.actor_type_id = '.$user_type_id
                , 'left');

            if (isset($current_user_id))
            {
                $where = '(policy2actor.actor_id IS NULL '
                    . 'OR (policy2actor.actor_type_id = '.$current_user_type_id
                        . ' AND policy2actor.actor_id = '.$current_user_id.')';
                foreach ($current_group_id_list AS $group_id)
                {
                    $where .= ' OR (policy2actor.actor_type_id = '.$current_group_type_id
                        .'AND policy2actor.actor_id = '.$group_id.' )';
                }
                $where .= ')';
                $db->where($where);
            }
            else
                $db->where('policy2actor.actor_id IS NULL');
        }   //if ($this->check_auth)

        //-------------------------------------
        // 第二關 設定webpage_id(取得目前的webpage_id資料)

        if (isset($this->target_webpage_id))
        {
            $db->join('webpage2annotation'
                , 'webpage2annotation.annotation_id = annotation.annotation_id '
                . ' AND webpage2annotation.webpage_id = '.$this->target_webpage_id);
        }   //if (isset($this->webpage_id))

        //-------------------------------------
        //第三關 target_scope * 查詢

        if (isset($target_scope_in_sql))
        {
            $db->join('('.$target_scope_in_sql.') AS target_scope', 'target_scope.annotation_id = annotation.annotation_id');
        }   //if (isset($this->target_scope))

        //------------------------------------------------------
        // 第四關 exclude_scope * 查詢
        if (isset($exclude_scope_in_sql))
        {
            $db->join('('.$exclude_scope_in_sql.') AS exclude_scope', 'annotation.annotation_id = exclude_scope.annotation_id');
        }   //if (isset($this->exclude_scope))

        //------------------------------------------------
        // 第五關 overlap_scope * 查詢
        if (isset($overlap_scope_where))
        {
            $db->join('annotation2scope AS overlap_scope_annotation2scope', 'overlap_scope_annotation2scope.annotation_id = annotation.annotation_id');
            $where = $overlap_scope_where;
            $join_scopes = $overlap_scope_join;
            foreach ($join_scopes AS $scope)
            {
                $webpage_id = $scope['webpage_id'];
                $from = $scope['from'];
                $to = $scope['to'];
                $table = $scope['table'];
                
                $db->join('scope AS '.$table, $table.'.scope_id = overlap_scope_annotation2scope.scope_id '
                    . ' AND '.$table.'.webpage_id = '.$webpage_id
                    . ' AND ('
                        . ' ('.$table.'.from_index >= '.$from.' AND '.$table.'.from_index <= '.$to.') '
                        . ' OR ('.$table.'.to_index >= '.$from.' AND '.$table.'.to_index <= '.$to.') '
                        . ' OR ('.$table.'.from_index <= '.$from.' AND '.$table.'.to_index >= '.$to.') '
                    . ' ) '
                    , 'left');
            }


            $db->where('('.$where.')');
        }   //if (isset($this->overlap_scope))

        //------------------------------------------------
        // 第六關 target_type_id

        if (isset($this->target_type_id))
        {
            $db->where('annotation.annotation_type_id', $this->target_type_id);
        }   //if (isset($this->target_type_id))

        //------------------------------------------------
        // 第七關 target_user_id

        if (isset($this->target_user_id))
        {
            $db->where('annotation.user_id', $this->target_user_id);
        }   //if (isset($this->target_type_id))

        //------------------------------------------------
        // 第八關 exclude_user_id

        if (isset($this->exclude_user_id))
        {
            $db->where('annotation.user_id != '.$this->exclude_user_id);
        }   //if (isset($this->exclude_user_id))

        //------------------------------------------------
        // 第九關 exclude_annotaiton_id

        if (isset($this->exclude_annotation_id))
        {
            $db->where('annotation.annotation_id != '.$this->exclude_annotation_id);
        }   //if (isset($this->exclude_annotation_id))

        
        //------------------------------------------------
        //第十關 search_note * 查詢  -分成使用斷詞器和不使用的情況(參考search_anchor_text)
        //1.使用斷詞器
      /* if (isset($this->search_note))
        {
            test_msg($this->search_note);
        }
        else {
            $this->search_note = 0;
            echo $this->search_note;
        }*/
        
        
        if ($segmentor !== "segmentor.disable" && isset($search_note_query))
        {
            $query = $search_note_query;
            //$db->from('to_tsquery(\''.$query.'\') search_note_query');
            $this->other_from[] = 'to_tsquery(\''.$query.'\') search_note_query';
            $db->where('annotation.note_index @@ search_note_query', NULL, FALSE);
        }   //if (isset($this->search_note))
        //2.不使用斷詞器的情況
        
        //test_msg(array($segmentor, $this->search_note)); 
        if($segmentor === "segmentor.disable" && isset($this->search_note))
         {
                       
             $db->like('note',  $this->search_note );  // 生成: WHERE title LIKE '%match%'
             $db->limit(10);
             //判斷this->search_note裡面有抓到值嗎？
            /*if (isset($this->search_note))
               {
                 test_msg($this->search_note);
               }
           else {
                 $this->search_note = 0;
                 echo $this->search_note;
                }*/
           
            
         }
        //------------------------------------------------
        // 第十一關 target_over_like 查詢

        if (isset($this->target_over_like_count) && $this->target_over_like_count > 0)
        {
            $db->join('annotation2like_count AS target_over_like', 'annotation.annotation_id = target_over_like.annotation_id '
                . ' AND target_over_like.like_count > '.$this->target_over_like_count);
        }
        
        //------------------------------------------------
        // 第十二關 search_anchor_text * 查詢
        if ($segmentor !== "segmentor.disable" && isset($search_anchor_text_query)) //如果使用斷詞器
        {
            $query = $this->search_anchor_text_query;
            
            $db->join('annotation2anchor_text AS search_anchor_text', 'search_anchor_text.annotation_id = annotation.annotation_id '
            . 'AND search_anchor_text.indexed @@ to_tsquery(\''.$query.'\')');
            $this->other_from[] = 'to_tsquery(\''.$query.'\') search_anchor_text_query';

        }   
        //如果不使用斷詞器，就直接使用$this->search_anchor_text進行查詢，不使用query，搭配第二關 target_url 查詢使用
        //test_msg(array($segmentor, $this->search_anchor_text)); 
        if ($segmentor === "segmentor.disable" && isset($this->search_anchor_text)) 
        {
            $db->join('annotation2anchor_text AS search_anchor_text', 'search_anchor_text.annotation_id = annotation.annotation_id '
            . "AND search_anchor_text.text like '%".$this->search_anchor_text."%'");    
            $db->limit(5);
            //echo $this->webpage_id;
            
        }   //if (isset($this->search_anchor_text))

        //------------------------------------------------
        // 第十三關 target_over_score * 查詢

        if (isset($this->target_over_score) && $this->target_over_score > 0)
        {
            $score_type_id = $target_over_score_type_id;
            $db->join('score AS target_over_score', 'annotation.annotation_id = target_over_score.annotation_id '
                . ' AND target_over_score.score_type_id = '.$score_type_id
                . ' AND target_over_score.score >= '.$this->target_over_score);
        }

        //------------------------------------------------
        // 第十四關 target_newer_update * 查詢

        if (isset($this->target_newer_update))
        {
            $db->where("annotation.update_timestamp > TIMESTAMP WITH TIME ZONE 'epoch' + "  . $this->target_newer_update . " * INTERVAL '1 second'");
        }
        
        if (isset($this->target_newer_create))
        {
            $db->where("annotation.create_timestamp > TIMESTAMP WITH TIME ZONE 'epoch' + "  . $this->target_newer_create . " * INTERVAL '1 second'");
        }
        
        if (isset($this->target_older_create))
        {
            $db->where("annotation.create_timestamp < TIMESTAMP WITH TIME ZONE 'epoch' + "  . $this->target_older_create . " * INTERVAL '1 second'");
        }

        //------------------------------------------------
        // 第十五關 target_topic * 查詢

        if (isset($this->target_topic))
        {
            if ($this->target_topic === TRUE) {
                $db->where("annotation.topic_id IS NULL");
            }
            else {
                $db->where("annotation.topic_id IS NOT NULL");
            }
        }

        //------------------------------------------------
        // 第十五.5關 target_topic_id * 查詢

        if (isset($this->target_topic_id))
        {
            $db->where("annotation.topic_id", $this->target_topic_id);
        }

        //------------------------------------------------
        // 第十六關 target_like * 查詢

        if (isset($this->target_like))
        {
            if ($this->target_like === TRUE)
            {
                $db->join('annotation2like AS target_like', 'annotation.annotation_id = target_like.annotation_id '
                    . ' AND target_like.user_id = ' . $this->target_like_user_id
                    . ' AND target_like.canceled IS FALSE');
            }
            else
            {
                /*
                $db->join('annotation2like AS target_like'
                    , 'annotation.annotation_id = annotation.annotation_id '
                    , 'left');
                $db->where('((annotation.annotation_id = target_like.annotation_id '
                        . ' AND target_like.user_id = ' . $this->target_like_user_id
                        . ' AND target_like.canceled IS TRUE)'
                        . ' OR (target_like.annotation2like_id IS NULL))');
                 */
                $db->join('annotation2like AS target_like'
                    , 'annotation.annotation_id = target_like.annotation_id '
                    , 'left');
                /*
                $db->where('( ( ( (target_like.user_id != ' . $this->target_like_user_id . ') OR'
                        . '( target_like.user_id = ' . $this->target_like_user_id . ' AND target_like.canceled IS TRUE) )'
                        . ' OR (target_like.annotation2like_id IS NULL) ) )');
                 *
                 */
                $db->where('( target_like.annotation_id IS NULL OR  target_like.annotation_id NOT IN (SELECT annotation_id FROM annotation2like WHERE user_id = ' . $this->target_like_user_id . ' AND canceled = FALSE) )');

            }
        }

        //------------------------------------------------
        // 第十七關 target_url 查詢
        //if (isset($this->target_url)) 
        //{
            //@todo
            //1.要把url轉成id再搜尋：先從表中用url找出webpage_id->使用filter_webpage_object來轉換url->webpage_id
            //in webpage.php
            //$this->webpage_id = $this->CI->webpage->filter_webpage_id($this->target_url);
            //2.設定search條件
            /* $db->join('webpage2annotation', 'webpage2annotation.annotation_id = annotation.annotation_id'
            . 'AND webpage2annotation.webpage_id = '.$this->webpage_id);*/
                      
        //}
        
        //------------------------------------------------
        //第十八關 search_username 查詢
 
        if (isset($this->search_username))
        {

            $db->join('user AS search_username', 'search_username.user_id = annotation.user_id '. "AND search_username.name like '%".$this->search_username."%'" );
            
            // 20131113 Pudding Chen
            // 為什麼要在這裡加limit？
            //$db->limit(15);
        }
  
        //------------------------------------------------
        // 大魔王 order *

        $this->order_coll->setup_order($db);

        return $db;
    }

    //-------------------------------------------
    // Annotation_search_collection

    protected $check_auth = TRUE;
    public function set_check_authorize($check)
    {
        $this->check_auth = $check;
        return $this;
    }

    protected $target_webpage_id;
    
    /**
     * 設定目標網頁
     * @param Webpage|Int $webpage_id
     * @return \Search_engine
     */
    public function set_target_webpage($webpage_id)
    {
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $this->target_webpage_id = $this->CI->webpage->filter_webpage_id($webpage_id);
        return $this;
    }
    
    /**
     * 設定目前的網頁作為預設的搜尋對象
     * 
     * @author Pudding Chen 20131113
     * @return boolan
     */
    public function set_target_referer_webpage() {
        $webpage = get_context_webpage();
        if (isset($webpage)) {
            return $this->set_target_webpage($webpage->get_id());
        }
        else {
            return false;
        }
    }

    //-----------------------------------------
    //scope系列

    protected $target_scope;
    public function set_target_scope(Annotation_scope_collection $scope)
    {
        $this->target_scope = $scope;
        return $this;
    }

    protected $overlap_scope;
    public function set_overlap_scope(Annotation_scope_collection $scope)
    {
        $this->overlap_scope = $scope;
        return $this;
    }
    
    /**
     * 根據$from跟$to來指定覆蓋範圍
     * @param int $from
     * @param int $to
     * @param Webpage $webpage
     * @return \Search_engine
     */
    public function set_overlap_scope_index($from, $to, Webpage $webpage = null)
    {
        if (is_null($webpage)) {
            $webpage = get_context_webpage();
        }
        
        $scope_coll = new Annotation_scope_collection();
        $scope_coll_data = array(
            array($from, $to)
        );
        $scope_coll = $scope_coll->import_webpage_search_data($webpage, $scope_coll_data);
        
        $this->overlap_scope = $scope_coll;
        return $this;
    }

    protected $exclude_scope;
    public function set_exclude_scope(Annotation_scope_collection $scope)
    {
        $this->exclude_scope = $scope;
        return $this;
    }

    //-----------------------------------------------
    //annotation直接相關屬性

    protected $target_type_id;
    /**
     * 查詢目標的標註類型
     * @param Int|String $type_id 標註編號或是標註名稱都可以
     * @author Pulipuli Chen <pulipuli.chen@gmail.com> 20141114
     * @return \Search_engine
     */
    public function set_target_type($type_id)
    {
        $this->_CI_load('library', 'type/Annotation_type_factory', 'annotation_type_factory');
        $this->target_type_id = $this->CI->annotation_type_factory->filter_type_id($type_id);
        return $this;
    }
    
    protected $target_user_id;
    public function set_target_user(User $user)
    {
        $this->target_user_id = $user->get_id();
        return $this;
    }

    protected $exclude_user_id;
    public function set_exclude_user(User $user)
    {
        $this->exclude_user_id = $user->get_id();
        return $this;
    }

    protected $exclude_annotation_id;
    public function set_exclude_annotation($annotation_id)
    {
        $this->_CI_load('library', 'kals_resource/Annotation', 'annotation');
        $this->exclude_annotation_id = $this->CI->annotation->filter_id($annotation_id);
        return $this;
    }

    protected $search_note;
    public function set_search_note($note)
    {
        $this->search_note = $note;
        return $this;
    }
    
    protected $search_username; //設定要尋找的username
    public function set_search_user_name($username)      
     {
       $this->search_username = $username; 
       return $this;
       
     }
     
    //-------------------------------------------------------
    //annotation周遭屬性

    // @todo target_like不知道要幹嘛用的
    protected $target_over_like_count;
    public function set_target_over_like_count($like_count)
    {
        $this->target_over_like_count = $like_count;
        return $this;
    }

    protected $search_anchor_text;
    public function set_search_anchor_text($text)
    {
        $this->search_anchor_text = $text;
        return $this;
    }

    protected $target_over_score;
    public function set_target_over_score($score)
    {
        $this->target_over_score = $score;
        return $this;
    }

    protected $target_newer_update;
    /**
     * 目標是時間大於這個項目的類別
     * @param int $epoch 從1970/1/1到現在的秒數(注意是秒數，而非毫秒數)
     * 詳細的文件請參考此網頁http://www.epochconverter.com/
     */
    public function set_target_newer_update($epoch)
    {
       $this->target_newer_update = $epoch;
       return $this;
    }
    
    protected $target_newer_create;
    /**
     * 目標是建立時間大於這個項目的類別
     * @param int $epoch 從1970/1/1到現在的秒數(注意是秒數，而非毫秒數)
     * 詳細的文件請參考此網頁http://www.epochconverter.com/
     */
    public function set_target_newer_create($epoch)
    {
       $this->target_newer_create = $epoch;
       return $this;
    }
    
    protected $target_older_create;
    /**
     * 目標是建立時間晚於這個項目的類別
     * @param int $epoch 從1970/1/1到現在的秒數(注意是秒數，而非毫秒數)
     * 詳細的文件請參考此網頁http://www.epochconverter.com/
     */
    public function set_target_older_create($epoch)
    {
       $this->target_older_create = $epoch;
       return $this;
    }

    protected $target_like;
    protected $target_like_user_id;

    /**
     * 設定喜愛
     * @param Boolean $is_like
     * @param User $user
     * @return Search_engine
     */
    public function set_target_like($is_like, $user)
    {
        if (is_null($user))
            $user = get_context_user();

        if (is_bool($is_like) && isset($user))
        {
            $this->target_like = $is_like;
            $this->target_like_user_id = $user->get_id();
        }
        return $this;
    }

    protected $target_topic;

    /**
     * 設定是否限定是topic
     * @param boolean $is_topic
     *  TRUE 限定只能是topic
     *  FALSE 限定不能是topic
     *  NULL 不限定
     * @return Search_engine
     */
    public function set_target_topic($is_topic)
    {
        if (is_bool($is_topic))
        {
            $this->target_topic = $is_topic;
        }

        return $this;
    }

    protected $target_topic_id;

    public function set_target_topic_id($topic_id)
    {
        if (is_numeric($topic_id))
        {
            $this->target_topic_id = $topic_id;
        }

        return $this;
    }
    
    /**
     * Webpage的URL
     * @var String 
     */
    protected $target_url; //宣告設定參數
    
    /**
     * 設定要搜尋的URL
     * @param String $url Webpage的URL
     * @return Search_engine
     */
    public function set_target_url($url)
    {
        /*
        if ($url !== NULL)
        {
           $this->target_url = $url;
        }
         * return $this;
         */
        
        return $this->set_target_webpage($url);
    }



    //---------------------------------------------------------
    //以下是order篇

    public function add_order($order_type_id, $desc = NULL)
    {
        $this->order_coll->add_order($order_type_id, $desc);
        return $this;
    }
}


/* End of file Search_engine.php */
/* Location: ./system/application/libraries/search/Search_engine.php */