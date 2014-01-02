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
}

/* End of file reading_guide.php */
/* Location: ./system/application/controllers/web_apps/rest/reading_guide.php */