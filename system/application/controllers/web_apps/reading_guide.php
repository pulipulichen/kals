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
}

/* End of file reading_guide.php */
/* Location: ./system/application/controllers/web_apps/rest/reading_guide.php */