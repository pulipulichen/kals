<?php
include_once 'kals_model.php';
/**
 * reading_guide
 *
 * 導讀精靈
 * 
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2013, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2013/11/19 下午 03:51:22
 */
class reading_guide extends KALS_model {

    
    /**
     * 建立分割區
     * @param Array $division_array
     * @return Array
     */
    private function _create_division_scopes($division_array) {
        $scopes = array();
        $from_index = 0;
        foreach ($division_array AS $to_index) {
            $scopes[] = array(
                $from_index,
                $to_index
            );
            
            $from_index = $to_index + 1;
        }
        
        return $scopes;
    }
    
    private function _match_division_scope_by_from_index($scopes,$index) {
        if (count($scopes) == 0) {
            return NULL;
        }
        
        $output_scope = $scopes[0];
        foreach ($scopes AS $s => $scope) {
            $from_index = $scope[0];
            if ($index > $from_index) {
                $output_scope = $scope;
            }
            else {
                break;
            }
            
        }
        return $output_scope;
    }
    
    private function _match_division_scope_index_by_from_index($scopes, $index) {
        if (count($scopes) == 0) {
            return NULL;
        }
        
        $output_scope = 0;
        foreach ($scopes AS $s => $scope) {
            $from_index = $scope[0];
            if ($index > $from_index) {
                $output_scope = $s;
            }
            else {
                break;
            }
            
        }
        return $output_scope;
    }
    
    private function _match_last_scope($scopes, $scope) {
        if (count($scopes) === 0) {
            return false;
        }
        
        $last_scope = $scopes[(count($scopes) - 1)];
        if ($last_scope[0] == $scope[0]
                && $last_scope[1] == $scope[1]) {
            return true;
        }
        else {
            return false;
        }
    }
    
    
    private function _get_user_sentences($division_scopes, $user) {
        
        $webpage = $this->get_current_webpage();
        
        $search = new Search_annotation_collection();
        $search->set_target_webpage($webpage->get_id());
        
        //$limit = 5;
        //$search->set_limit($limit);
        
        $order_type_id = 6;
        $desc = FALSE;
        $search->add_order($order_type_id, $desc);
        
        $is_topic = true;
        $search->set_target_topic($is_topic);
        
        $search->set_target_user($user);
        
        //print_r($data["sentence_structure"]);
        
        // ---------------------------
        
        $steps = array();
        foreach ($search AS $index => $annotation) {
            $scopes = $annotation->get_scopes();
            $from_index = $scopes->get_first_index();
            $scope_index = $this->_match_division_scope_index_by_from_index($division_scopes, $from_index);
            
            if (count($steps) === 0) {
                $steps[] = $scope_index;
            }
            else if ($steps[(count($steps) -1)] != $scope_index) {
                $steps[] = $scope_index;
            }
        }
        
        return $steps;
    }
        
    // -------------------------------
     
    /**
     * 回傳所有標註的範圍
     * 
     * @param Array $data 傳入sentence_structure
     * @return Array 要回傳給KALS_controller的資料
     * 一樣是以關聯式陣列組成
     */
    public function whole_annotations($data) {
        
        $webpage = $this->get_current_webpage();
        
        $search = new Search_annotation_collection();
        $search->set_target_webpage($webpage->get_id());
        
        //$limit = 5;
        //$search->set_limit($limit);
        
        $order_type_id = 6;
        $desc = FALSE;
        $search->add_order($order_type_id, $desc);
        
        $is_topic = true;
        $search->set_target_topic($is_topic);
        
        //print_r($data["sentence_structure"]);
        
        $data = array();
        $data["steps"] = $search;
        
        return $data;
    }
    
    /**
     * 回傳所有標註的範圍，以句子切割
     * 
     * @param Array $data 傳入sentence_structure
     * @return Array 要回傳給KALS_controller的資料
     * 一樣是以關聯式陣列組成
     */
    public function whole_annotations_by_sentence($data) {
        
        $sentence_structure = $data["sentence_structure"];
        
        $sentence_scopes = $this->_create_division_scopes($sentence_structure);
        
        // -------------------------
        
        $webpage = $this->get_current_webpage();
        
        $search = new Search_annotation_collection();
        $search->set_target_webpage($webpage->get_id());
        
        //$limit = 5;
        //$search->set_limit($limit);
        
        $order_type_id = 6;
        $desc = FALSE;
        $search->add_order($order_type_id, $desc);
        
        $is_topic = true;
        $search->set_target_topic($is_topic);
        
        //print_r($data["sentence_structure"]);
        
        // ---------------------------
        
        $from_index_array = array();
        $steps = array();
        foreach ($search AS $index => $annotation) {
            $scopes = $annotation->get_scopes();
            $from_index = $scopes->get_first_index();
            $scope = $this->_match_division_scope_by_from_index($sentence_scopes, $from_index);
            $from_index_array[] = $from_index;
            
            // 比對是否跟上一個scope相同
            if ($this->_match_last_scope($steps, $scope) === FALSE) {
                $steps[] = $scope;
            }
        }
        
        $data = array();
        $data["steps"] = $steps;
        $data["from_index_array"] = $from_index_array;
        
        //$data["steps"] = $sentence_scopes;
        
        return $data;
    }
    
    /**
     * 回傳所有標註的範圍，以句子切割
     * 
     * @param Array $data 傳入sentence_structure
     * @return Array 要回傳給KALS_controller的資料
     * 一樣是以關聯式陣列組成
     */
    public function apriori_all($data) {
        
        $sentence_structure = $data["sentence_structure"];
        $sentence_scopes = $this->_create_division_scopes($sentence_structure);
        
        // -------------------------
        
        $webpage = $this->get_current_webpage();
        $users = $webpage->get_written_users();
        $users_steps = [];
        
        
        $arff_data = array();
        foreach ($users AS $user) {
            $steps = $this->_get_user_sentences($sentence_scopes, $user);
            $user_id = $user->get_id();
            $users_steps[$user_id] = $steps;
            foreach ($steps AS $step) {
                $arff_data[] = array($user_id, $step);
            }
        }
        
        $this->load->library('exec_cli/Weka_gsp');
        
        //echo "<pre>";
        //print_r($arff_data);
        //echo "</pre>";
        
        // 最小序列數量是文章句字的20%
        $min = count($sentence_scopes) * 0.2 ;
        
        $weka_gsp = new Weka_gsp($arff_data, $webpage->get_id());
        $weka_gsp->set_step_min($min);
        $scope_index = $weka_gsp->get_output();
        
        $steps = array();
        foreach ($scope_index AS $scope) {
            $steps[] = $sentence_scopes[$scope];
        }
        
        $data = array();
        //$data["steps"] = $users_steps;
        $data["steps"] = $steps;
        
        //$data["steps"] = $sentence_scopes;
        
        return $data;
    }
    
}

/* End of file reading_guide.php */
/* Location: ./system/application/controllers/web_apps/rest/reading_guide.php */