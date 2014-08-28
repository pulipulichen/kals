<?php
include_once 'web_apps_controller.php';
/**
 * annotation_setter
 *
 * annotation_setter full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/10/23 下午 03:54:59
 */

class Annotation_setter extends Web_apps_controller {

    protected $controller_enable_cache = FALSE;
    protected $login_require = TRUE;

    var $user = NULL;
    var $url = NULL;
    var $action_id = 2;
    var $annotation_score_calculator = NULL;

    /**
     * @var {annotation_getter}
     */
    var $annotation_getter = NULL;

    function __construct() {
        parent::__construct();

        $this->load->library('scope/Annotation_scope_collection');
        $this->load->library('scope/Annotation_scope');
        $this->load->library('kals_resource/Annotation');

        $this->load->library('kals_actor/User');
        $this->user = get_context_user();
        $this->url = get_referer_url(TRUE);
        
        require_once 'annotation_getter.php';
        $this->annotation_getter = new annotation_getter();
    }

    /**
     * create_get的別名
     * @param String $json
     * @param String $callback
     */
    public function create ($json, $callback) {
        $this->create_get($json, $callback);
    }
    
    /**
     * 這是用get去建立標註的方法
     * 
     * 但是因為GET有資料長度限制，所以此方法不使用
     * 改用create_post
     * @deprecated 20140408 布丁
     * @param type $json
     * @param type $callback
     */
    public function create_get ($json, $callback) {

        $data = $this->_create_process($json);

        $this->_display_jsonp($data, $callback);
    }

    /**
     * 實際上進行建立檔案的過程
     * @param Object $json
     * @return Object
     */
    private function _create_process($json)
    {
        // 是否啟用偵錯
        $debug = FALSE;
        if ($debug) {
            $this->output->enable_profiler(TRUE);
        }
        
        $data = json_to_object($json);
        
        //檢視資料
        //test_msg('annotation_setter._create_process', $json);
        //{
        //  "feature_location":[0,2,4],
        //  "note":"%3Cp%3E%0A%09test%3C%2Fp%3E%0A",
        //  "policy_type":1,
        //  "is_like":false,
        //  "like_count":0,
        //  "feature_recommend_scope":[[6391,6434]],
        //  "scope":[
        //      [6391,6433,"3.%20This%20distraction%20effect%20of%20the%20visual%20cue%20map%20has%20not%20been%20proven.%20In%20the%20future%2C%20a%20systematic%20experimental%20design%20should%20be%20conducted%20to%20examine%20whether%20the%20visual%20cue%20map%20distracts%20learners\'%20reading%2C%20thus%20affecting%20their%20reading%20comprehension"]
        //      ],
        //  "type":1
        //   }
            
        //先將權限設成管理者
        set_ignore_authorize(true);

        //取得參考網址資料跟位於session的user
        $url = $this->url;
        $user = $this->user;

        //取得來自$json的範圍資料
        $scope_coll_data = $data->scope;
        $scope_coll = $this->annotation_scope_collection->import_webpage_data($url, $scope_coll_data);

        //建立標註
        $annotation = $this->annotation->create_annotation($user, $scope_coll);
        $data = $this->_setup_annotation($annotation, $data);
        set_ignore_authorize(true);
        
        $annotation = new Annotation($annotation->get_id());
        
        // 建立推薦標註
        //test_msg("_create_process", 'before create recommend');
        
        if ($annotation->is_respond() === FALSE) {
            
            //test_msg("_create_process", 'before _setup_scores_recommend($annotation)');
            $annotation = $this->_setup_scores_recommend($annotation);

            //test_msg("_create_process", 'before get_recommen()');
            $recommend = $annotation->get_recommend();
            //test_msg("_create_process", 'after get_recommen()');
            
            if (isset($recommend)) {
                $recommend_data =  $recommend->export_webpage_data($this->url);
                if (isset($recommend_data)) {
                    $data['recommend'] = $recommend_data;
                }
            }
        }
        //test_msg("_create_process", 'after create recommend');
        
        // 標註共識的分數都重新計算
        $annotation = new Annotation($annotation->get_id());
        $consensus_coll = $annotation->get_consensus_coll();
        foreach ($consensus_coll AS $consensus) {
            $this->_setup_scores($consensus);
            $consensus->update();
        }

        //log區
        $array_data = $annotation->export_webpage_data($this->url);

        $action = 13;
        if (isset($data['recommend'])) {
            $action = 14;
        }
        if ($annotation->is_respond())
        {
            $action = 20;
            //如果是回自己，那就改成27
            $topic = $annotation->get_respond_to_topic();
            if ($topic->get_user()->equals($annotation->get_user())) {
                $action = 27;
            }
        }
        $user_id = NULL;
        if (isset($user)) {
            $user_id = $user->get_id();
        }
        kals_log($this->db, $action, array('memo'=>$array_data, 'user_id' => $user_id));
        
        //test_msg("_create_process", 'before context_complete()');
        
        //context_complete();
        
        set_ignore_authorize(false);

        return $data;
    }

    /**
     * 建立標註的主要方法
     * @param String $json
     */
    public function create_post ($json = NULL) {
        $index = 'create_post';
        if ($this->_is_callback($json) == false)
        {
            //test_msg("create_post", 1);
            //從POST中取得JSON的資料
            $json = $this->_get_post_json();

            //test_msg("create_post", 2);
            $data = $this->_create_process($json);

            //test_msg("create_post", 3);
            //然後把data存入session中
            $this->_set_post_session($index, $data);
            
            //test_msg("create_post", 4);
            $this->_display_post_complete();
        }
        else
        {
            $callback = $json;
            $data = $this->_get_post_session($index);

            $this->_display_jsonp($data, $callback);
        }
        context_complete();
    }

    public function edit($json, $callback)
    {
        $data = $this->_edit_process($json);

        $this->_display_jsonp($data, $callback);
    }

    private function _edit_process($json)
    {
        $data = json_to_object($json);

        //先將權限設成管理者
        set_ignore_authorize(true);

        //取得參考網址資料跟位於session的user
        $user = $this->user;

        $annotation = NULL;
        if (isset($data->annotation_id))
        {
            $annotation = new Annotation($data->annotation_id);

            $annotation_user = $annotation->get_user();
            if ($user->get_id() == $annotation_user->get_id())
            {
                $data = $this->_setup_annotation($annotation, $data);

                //edit之後重算分數
                set_ignore_authorize(true);
                $annotation = new Annotation($annotation->get_id());

                if ($annotation->is_respond() === FALSE) {
                    $annotation = $this->_setup_scores($annotation);
                    //$annotation->update();
                }
                context_complete();
                set_ignore_authorize(false);
            }
            else {
                $data = create_json_excpetion('Edit Annnotation Error', 'You cannot edit annotation whick is not yours.');
            }
        } else
        {
            $data = create_json_excpetion('Edit Annnotation Error', 'Annotation ID is NULL');
        }

        //log區
        $array_data = NULL;
        if (isset($annotation)) {
            $array_data = $annotation->export_webpage_data($this->url);
        }

        $action = 15;
        if ($annotation->is_respond())
        {
            $action = 21;
        }
        $user_id = NULL;
        if (isset($user)) {
            $user_id = $user->get_id();
        }
        kals_log($this->db, $action, array('memo'=>$array_data, 'user_id' => $user_id));

        return $data;
    }

    public function edit_post ($json = NULL) {
        $index = 'edit_post';
        if ($this->_is_callback($json) == false)
        {
            //從POST中取得JSON的資料
            $json = $this->_get_post_json();
            $data = $this->_edit_process($json);

            //然後把data存入session中
            $this->_set_post_session($index, $data);
        }
        else
        {
            $callback = $json;
            $data = $this->_get_post_session($index);
            $this->_display_jsonp($data, $callback);
        }
        context_complete();
    }

    /**
     *
     * @param Annotation $annotation
     * @param Object $data
     * @param String $callback
     */
    private function _setup_annotation(& $annotation, $data)
    {
        //$this->output->enable_profiler(TRUE);

        $url = $this->url;
        $user = $this->user;
        $auth = $this->authorize_manager;

        //設定標註細節
        //test_msg('設定標註細節');
            //type
            if (isset($data->type))
            {
                if (is_string($data->type))
                {
                    $data->type = trim($data->type);
                    if ($data->type != '') {
                        $data->type = urldecode($data->type);
                    }
                    else {
                        //如果是空白的話，則視為自訂
                        $data->type = 7;
                    }
                }

                $annotation->set_type($data->type);
            }

            //note
            if (isset($data->note) && $data->note != '')
            {
                $note = $data->note;
                if (is_string(($note))) {
                    $note = urldecode($note);
                }

                $annotation->set_note($note);
            }
            else
            {
                $note = $annotation->get_note();

                if (isset($note) && $note !== '') {
                    $annotation->set_note(NULL);
                }
            }

            //test_msg($annotation->get_note(), $data->note);

            //feature location
            //標註錨點範圍的特徵 
            if (isset ($data->feature_location)
                && is_array($data->feature_location)
                && count($data->feature_location) > 0)
            {
                //$this->load->library('annotation/Annotation_feature_location');
                //$feature_type_id = $this->annotation_feature_location->get_type_id();
                //Featrue Location Type ID = 1
                //$annotation->set_feature($feature_type_id, $data->feature_location);
                $annotation->set_feature_location($data->feature_location);
            }

            //feature recommend scope
            if (isset($data->feature_recommend_scope))
            {
                $recommend_scope_coll_data = $data->feature_recommend_scope;
                $recommend_scope_coll = $this->annotation_scope_collection->import_webpage_search_data($url, $recommend_scope_coll_data);
                //test_msg('recommend scope', $recommend_scope_coll->export_webpage_json($url));
                $annotation->set_recommend_scopes($recommend_scope_coll);
            }

        //設定respond
        //test_msg('設定respond');
            //topic
            if (isset($data->topic))
            {
                //理論上topic只會有一個，並設定他的ID
                $topic_id = $data->topic->annotation_id;
                $annotation->set_respond_to_topic($topic_id);
            }

            //respond_coll
            if (isset($data->respond_to_coll))
            {
                $respond_to_annotations = array();
                foreach ($data->respond_to_coll AS $respond_to)
                {
                    $respond_to_annotation_id = $respond_to->annotation_id;
                    $respond_to_annotation = new Annotation($respond_to_annotation_id);
                    $respond_to_annotations[] = $respond_to_annotation;
                }
                $annotation->set_respond_to_coll($respond_to_annotations);
            }

        //-----------------------
        //設定policy
        
        //test_msg('設定policy');
        $policy_type = 1;
        if (isset($data->policy_type)) {
            $policy_type = $data->policy_type;
        }
        // 1    public
        // 2    private    private特別是指只有自己能閱讀
        // 3    share
        $share_user_coll = NULL;

        if ($policy_type == 1)
        {
            //什麼都不用作
        }
        else if ($policy_type == 2)
        {
            $share_user_coll = array(
                $user
            );
        }
        else if ($policy_type == 3)
        {
            $share_list = $data->share_list;

            $share_user_coll = array();
            foreach ($share_list AS $share_user_data)
            {
                $share_user_id = $share_user_data->id;
                $share_user = new User($share_user_id);
                array_push($share_user_coll, $share_user);
            }
        }

        $this->load->library('policy/Authorize_manager');

        $ACTION_ANNOTATION_READ = 5;

        $auth->set_resource($annotation);

        if (is_array($share_user_coll))
        {
            foreach ($share_user_coll AS $share_user)
            {
                //在這邊為該$annotation設定policy readable
                $auth->policy_add_actor($ACTION_ANNOTATION_READ, $share_user);
            }
        }
        else
        {
            //清除該$annotation的policy
            $auth->policy_remove_actor($ACTION_ANNOTATION_READ);
        }
        
        //-------------------

        //回傳標註建立的ID跟timestamp
        $annotation->update();

        $data = array(
            'annotation_id' => $annotation->get_id(),
            'timestamp' => $annotation->get_update_epoch(),
            'nav' => $this->annotation_getter->parse_navigation_level($annotation->get_score(0)->get_score())

            //,'note' => $annotation->get_note()
            //,'noteset' => $data->note
        );

        /*
        else
        {
            $topic_annotation = $annotation->get_topic();
            $this->_setup_scores_recommend($topic_annotation);
        }
        */

        set_ignore_authorize(false);

        // 寫入資料庫
        context_complete();

        return $data;
    }

    /**
     * 設定推薦分數
     * @param Annotation $annotation
     * @return Annotation
     */
    private function _setup_scores_recommend($annotation) {

        // 是否啟用偵錯
        $debug = FALSE;
        if ($debug) {
            $this->output->enable_profiler(TRUE);
        }
        
        //test_msg("_setup_scores_recommend", 1);
        $annotation = $this->_setup_scores($annotation);
        //test_msg("_setup_scores_recommend", 2);
        $annotation = $this->_setup_recommend($annotation);

        //test_msg("_setup_scores_recommend", 3);
        $annotation->update();
        //test_msg("_setup_scores_recommend", 4);
        
        return $annotation;
    }

    private function _setup_scores($annotation) {

        $this->load->library('kals_resource/Webpage');
        //if ($this->annotation_score_calculator == NULL)
        //{
            //$webpage = $this->webpage->filter_webpage_object($this->url);
            $webpage = get_context_webpage();
            $this->annotation_score_calculator = $webpage->get_score_calculator();
        //}

        $this->annotation_score_calculator->setup_annotation_scores($annotation);
        return $annotation;
    }

    /**
     * 設定推薦的標註
     * @param Annotation $annotation
     * @return Annotation
     */
    private function _setup_recommend($annotation) {
        // 是否啟用偵錯
        $debug = FALSE;
        if ($debug) {
            $this->output->enable_profiler(TRUE);
        }
        
        if ($this->config->item("recommend_enable") === FALSE) {
            /**
             * 如果不開啟推薦，則不使用
             */
            return $annotation;
        }
        
        $this->load->library('kals_resource/Webpage');
        //$webpage = $this->webpage->filter_webpage_object($this->url);
        
        //test_msg("_setup_recommend", 1);
        $webpage = get_context_webpage();
        //test_msg("_setup_recommend", 2);
        $tutor = $webpage->get_tutor();
        //test_msg("_setup_recommend", 3);
        $tutor->setup_recommend($annotation);
        //test_msg("_setup_recommend", 4);
        return $annotation;
    }

    public function delete($json, $callback = NULL)
    {
        $annotation_id = json_to_object($json);

        if (is_null($annotation_id))
        {
            $data = FALSE;
            return $this->_display_jsonp($data, $callback);
        }

        //set_ignore_authorize(true);
        $annotation = new Annotation($annotation_id);

        $consensus_coll = $annotation->get_consensus_coll();
        $this->_delete_annotation($annotation);
        set_ignore_authorize(true);
        //刪除時，重新計算分數
        foreach ($consensus_coll AS $consensus)
        {
            $this->_setup_scores($consensus);
        }

        context_complete();

        //讀取更新後的範圍
        $data = $this->_load_my();

        /**
         * @todo 20111106 如果有必要的話，在此讀取nav
         */
        $data['nav'] = $this->_load_nav();
        //$data['nav'] = array();

        return $this->_display_jsonp($data, $callback);
    }

    private function _delete_annotation($annotation) {
        $annotation_user = $annotation->get_user();

        //test_msg('delete', $annotation_user->get_id());
        if (is_null($annotation_user->get_id()))
        {
            $data = show_error('No annotation.');
            return $this->_display_jsonp($data, $callback);
        }

        $user = $this->user;
        if ($user->equals($annotation_user) === FALSE)
        {
            $data = show_error('Permission deny.');
            return $this->_display_jsonp($data, $callback);
        }


        //log區
        $array_data = $annotation->get_id();

        $action = 19;
        $user_id = NULL;
        if (isset($user))
            $user_id = $user->get_id();
        kals_log($this->db, $action, array('memo'=>$array_data, 'user_id' => $user_id));

        set_ignore_authorize(true);
        //連共識分數也要一起計算
        /*
        $consensus_coll = $annotation->get_consensus_coll();
        $annotation->delete();
        foreach ($consensus_coll AS $consensus)
        {
            $this->_setup_scores_recommend($consensus);
        }
        */
        $annotation->delete();
        context_complete();
        set_ignore_authorize(false);
    }

    private function _load_my() {
        $data = $this->annotation_getter->my();
        return $data;
    }
    private function _load_nav() {
        $data = $this->annotation_getter->navigation();
        return $data;
    }

    public function like($json, $callback)
    {
        $data = json_to_object($json);
        $annotation_id = $data->annotation_id;
        $annotation = new Annotation($annotation_id);
        $is_like = $data->is_like;
        $user = $this->user;
        if (is_null($annotation_id) || is_null($is_like)
            || is_null($user)
            || $annotation->get_user()->equals($user)
            //|| $annotation->is_respond()
                )
        {
            $data = show_error('Permission deny.');
            return $this->_display_jsonp($data, $callback);
        }
        
        //test_msg("before like", $annotation->get_like_count());

        set_ignore_authorize(true);
        
        if ($is_like === TRUE) {
            $annotation->add_like($user);
        }
        else {
            $annotation->remove_like($user);
        }
        
        //test_msg("after like", $annotation->get_like_count());

        //計算分數吧
        $this->_setup_scores($annotation);

        //log區
        $array_data = $annotation_id;

        $action = 22;
        if ($is_like == FALSE) {
            $action = 23;
        }
        $user_id = NULL;
        if (isset($user)) {
            $user_id = $user->get_id();
        }
        kals_log($this->db, $action, array('memo'=>$array_data, 'user_id' => $user_id));

        //$annotation->update();
        context_complete();
        set_ignore_authorize(false);
        $data = TRUE;
        return $this->_display_jsonp($data, $callback);
    }

    public function recommend_accept($json, $callback = NULL)
    {
        //$data = json_to_object($json);
        //$annotation_id = $data->id;

        $annotation_id = $json;
        $annotation = new Annotation($annotation_id);

        $user = $this->user;
        $annotation_user = $annotation->get_user();
        if ($annotation_user->equals($user) == false)
        {
            //test_msg($annotation_user->get_id().'-'.$annotation_id, $user->get_id());
            $data = create_json_excpetion('Set Annnotation Recommend Error', 'You cannot set annotation recommend whick is not yours.');
            return $this->_display_jsonp($data, $callback);
        }

        $recommend = $annotation->get_recommend();

        //log區
        $array_data = $recommend->get_id();

        $action = 24;
        if ($recommend->has_recommend_by()) {
            $action = 25;
        }
        $user_id = NULL;
        if (isset($user)) {
            $user_id = $user->get_id();
        }
        kals_log($this->db, $action, array('memo'=>$array_data, 'user_id' => $user_id));

        set_ignore_authorize(true);
        $annotation = $recommend->set_accept(TRUE);

        if (isset($annotation))
        {
            $consensus_coll = $annotation->get_consensus_coll();
            foreach ($consensus_coll AS $consensus)
            {
                $this->_setup_scores($consensus);
            }
        }

        set_ignore_authorize(false);

        //return $this->delete($json, $callback);
        $data = array(
            'my' => $this->_load_my()
        );

        $data['nav'] = $this->_load_nav();

        if (isset($annotation))
        {
            $data['annotation_id'] = $annotation->get_id();
        }

        context_complete();
        return $this->_display_jsonp($data, $callback);
    }

    public function recommend_reject($json, $callback)
    {
        $annotation_id = $json;

        $annotation = new Annotation($annotation_id);

        $annotation_user = $annotation->get_user();
        $user = $this->user;
        if ($annotation_user->equals($user) == false)
        {
            $data = create_json_excpetion('Set Annnotation Recommend Error', 'You cannot set annotation recommend whick is not yours.');
            return $this->_display_jsonp($data, $callback);
        }

        $recommend = $annotation->get_recommend();

        //log區
        $array_data = $recommend->get_id();

        $action = 26;
        $user_id = NULL;
        if (isset($user))
            $user_id = $user->get_id();
        kals_log($this->db, $action, array('memo'=>$array_data, 'user_id' => $user_id));

        set_ignore_authorize(true);
        $recommend->set_accept(FALSE);
        set_ignore_authorize(false);
        context_complete();

        $data = TRUE;
        return $this->_display_jsonp($data, $callback);
    }
}

/* End of file annotation_setter.php */
/* Location: ./system/application/controllers/annotation_setter.php */