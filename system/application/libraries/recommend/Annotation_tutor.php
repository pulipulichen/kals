<?php
/**
 * Annotation_tutor
 *
 * 設定推薦標註的教師
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/18 下午 04:07:54
 * @property Webpage $webpage
 */
class Annotation_tutor extends KALS_object {

    // Member Varibles
    private $webpage;

    // Methods
    function  __construct($webpage = NULL) {
        parent::__construct();

        if (isset($webpage))
            $this->set_webpage ($webpage);
        return $this;
    }

    public function set_webpage($webpage)
    {
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $webpage = $this->CI->webpage->filter_webpage_object($webpage);
        $this->webpage = $webpage;
        return $this;
    }

    public function setup_recommend(Annotation $annotation)
    {
        $threshold = $this->_get_recommended_threshold();
        $score = $this->_get_integrated_score($annotation);

        if ($score < $threshold)
        {
            //如果分數到達門檻，才進行推薦，否則不作推薦
            $recommend_annotation = $this->_find_recommend_annotation($annotation);

            $this->_CI_load('library', 'recommend/Annotation_recommend', 'annotation_recommend');
            $cond = array(
                'recommended_annotation_id' => $annotation->get_id(),
                'recommended_webpage_id' => $this->webpage->get_id()
            );
            $recommend = $this->CI->annotation_recommend->find($cond);
            
            if (is_null($recommend))
            {
                $recommend = new Annotation_recommend();

                $recommend->set_webpage($this->webpage);
                $recommend->set_recommended($annotation);
            }

            if (isset($recommend_annotation)) {
                $recommend->set_recommend_by($recommend_annotation);
            }
            
            $recommend->update();

            //加入通知
            $trigger_resource = $annotation;
            $association_user = $annotation->get_user();

            
            $this->_CI_load('library', 'kals_actor/Notification_recommended', 'ntification_recommended');
            $notification = $this->CI->ntification_recommended
                        ->create_notification($association_user, $trigger_resource);
            if (is_null($notification))
            {
                handle_error($this->lang->line('notification.recommend.create_notification.exception'));
            }
            $annotation->set_recommend($recommend);
        }
        return $this;
    }

    private $recommended_threshold;
    private function _get_recommended_threshold()
    {
        if (is_null($this->recommended_threshold))
        {
            /*
            $this->_CI_load('library', 'fuzzy/Output_language_variable_collection', 'output_language_variable_collection');
            $this->recommend_threshold = $this->CI->output_language_variable_collection->get_recommend_threshold();
             */
            $this->recommended_threshold =$this->CI->config->item('recommended_threshold');
        }
        return $this->recommended_threshold;
    }

    private $recommend_by_threshold;
    private function _get_recommend_by_threshold()
    {
        if (is_null($this->recommend_by_threshold))
        {
            /*
            $this->_CI_load('library', 'fuzzy/Output_language_variable_collection', 'output_language_variable_collection');
            $this->recommend_threshold = $this->CI->output_language_variable_collection->get_recommend_threshold();
             */
            $this->recommend_by_threshold =$this->CI->config->item('recommend_by_threshold');
        }
        return $this->recommend_by_threshold;
    }

    private $integrated_score_type_id = 0;
    private function _get_integrated_score(Annotation $annotation)
    {
        $score = $annotation->get_score($this->integrated_score_type_id)->get_score();
        return $score;
    }

    private function _find_recommend_annotation(Annotation $annotation)
    {
        $scope_coll = $annotation->get_scopes();
        $user = $annotation->get_user();

        $recommend_scope = $annotation->get_recommend_by_scopes();
        if (is_null($recommend_scope))
            $recommend_scope = $scope_coll;
        
        $target_over_score = $this->_get_recommend_by_threshold();

        $this->_CI_load('library', 'search/Search_order_score', 'search_order_score');
        $order_type_id = $this->CI->search_order_score->get_type_id();

        $this->_CI_load('library', 'search/Search_annotation_collection', 'search_annotation_collection');
        $search = new Search_annotation_collection();
        $search->set_limit(1);
        $search->add_order($order_type_id, TRUE);
        $search->set_overlap_scope($recommend_scope);
        $search->set_exclude_scope($scope_coll);
        $search->set_exclude_user($user);
        $search->set_target_over_score($target_over_score);

        if ($search->length() == 1)
            return $search->get_item(0);
        else
            return NULL;
    }
}


/* End of file Annotation_tutor.php */
/* Location: ./system/application/libraries/recommend/Annotation_tutor.php */