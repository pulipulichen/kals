<?php
include_once 'kals_model.php';
/**
 * Annotation_navigation_map
 *
 * KALS Framework範例：Model的設定
 * 輸出網頁標註資訊的位置
 * 
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2013, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2013/11/19 下午 03:51:22
 */
class annotation_navigation_map extends KALS_model {

     
    /**
     * Action範例
     * 
     * @param Array $data 由KALS_controller傳入的資料，組成是關連式的陣列
     * 
     * [Controller的JSON格式]
     * _data = {
     *  "field": "value"
     * };
     * 
     * //取用範例
     * _data["field];   //回傳value
     * 
     * [Model的Array格式]
     * $data = array(
     *  "field" => "value"
     * );
     * 
     * $data["field"];  //回傳value
     * 
     * @return Array 要回傳給KALS_controller的資料
     * 一樣是以關聯式陣列組成
     * 
     */
    public function get_heading_annotation($data) {
        
        $structure = $data["structure"];
        // [14, 56, 70]
        
        $current_type = $data["current_type"];
        
        // 1. 搜尋指定類型的標註
        $search = new Search_annotation_collection();
        
        // 1.1. 指定現在的網頁
        $webpage = $this->get_current_webpage();
        $search->set_target_webpage($webpage->get_id());
        
        // 1.2. 指定現在要搜尋的標註類型
        $search->set_target_type($current_type);
        
        // 2. 取得一個Annotation_collection
        $annotation_collection = $search;
        
        // 2.1. 準備一下待會要儲存標題與標註數量的陣列
        $heading_list = array();
        
        // 3. 迴圈，一一檢查每一個Annotation
        foreach ($annotation_collection AS $index => $annotation) {
            
            // 4. 取出Annotation的位置，找出from_index
            $scope_coll = $annotation->get_score_coll();
            $from_index = $scope_coll->get_first_index();

            // 5. 判斷他是位於哪一個章節
            // [14, 56, 70]
            $current_heading_number = 0;
            foreach ($structure AS $heading_number => $last_index) {
                if ($from_index < $last_index) {
                    $current_heading_number = $heading_number;
                    break;
                }
            }

            // 6. 組成回傳的資料
            $count = 1;
            if (key_exists($current_heading_number, $heading_list) === TRUE) {
                $count = $heading_list[$current_heading_number];
                $count = $count + 1 ;
            }
            $heading_list[$current_heading_number] = $count;
        }
        
        // array(
        //      1 => 4,
        //      5 => 9,
        //      12 => 1
        // )
        
        // 7. 排序
        arsort($heading_list);
        
        // array(
        //      5 => 9,
        //      1 => 4,
        //      12 => 1
        // )
        
        // 7.1. 排序之後，輸出成JavaScript要得data形式
        $return_data = array();
        foreach ($heading_list AS $heading_number => $count ) {
            $item = array(
                "heading_number" => $heading_number,
                "type_count" => $count
            );
            $return_data[] = $item;
        }
        
        // 8. 回傳
        return $data;
        
        /*
        // -----------------------
        // 從現在的網頁來計算標註跟使用者
        $webpage = $this->get_current_webpage();
        
        $data["annotation_count"] = $webpage->get_written_annotations_count();
        
        $data["user_count"] = $webpage->get_written_users_count();
        
        // ------------------
        // 取出最近的標註
        
        $search = new Search_annotation_collection();
        $search->set_target_webpage($webpage->get_id());
        $search->set_check_authorize(FALSE);
        
        $limit = 5;
        $search->set_limit($limit);
        
        $order_type_id = 6;
        $desc = TRUE;
        $search->add_order($order_type_id, $desc);
        
        $data["last_annotation"] = array();
        foreach ($search AS $index => $annotation) {
            //$json = $annotation->export_data();
            $json = $annotation;
            if ($index == 0) {
                //$last_annotation = $json;
                $data["last_annotation_id"] = $annotation->get_id();
                $data["last_annotation_timestamp"] = $annotation->get_update_timestamp();
            }
            
            // 一一加入標註
            $data["last_annotation"][] = $json;
        }
        
        // 也可以最後一口氣取出所有標註
        $data["last_annotation"] = $search;
        
        // -------------------
        // 依照標註數量來判斷熱門程度
        
        $activity = "bad";
        if ($data["annotation_count"] > 20) {
            $activity = "good";
        }
        else if ($data["annotation_count"] > 5) {
            $activity = "normal";
        }
        
        $data["activity"] = "Good";
        */
        return $data;
    }
}

/* End of file dashboard.php */
/* Location: ./system/application/controllers/web_apps/rest/dashboard.php */