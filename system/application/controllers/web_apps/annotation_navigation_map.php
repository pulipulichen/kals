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
        
        //test_msg($data);
        
        // 1. 搜尋指定類型的標註
        $search = new Search_annotation_collection();
        
        // 1.1. 指定現在的網頁
        $webpage = $this->get_current_webpage();
        $search->set_target_webpage($webpage->get_id());
        
        // 1.2. 指定現在要搜尋的標註類型
        //test_msg("current_type", $current_type);
        //$current_type = intval($current_type);
        $search->set_target_type($current_type);
        // 2. 取得一個Annotation_collection
        $annotation_collection = $search;
        
        //test_msg("Data found?", $search->length() );
        // 2.1. 準備一下待會要儲存標題與標註數量的陣列
        $heading_list = array();
        // 3. 迴圈，一一檢查每一個Annotation
        foreach ($search AS $index => $annotation) {
            
            // 4. 取出Annotation的位置，找出from_index
            $scope_coll = $annotation->get_scopes();
            $from_index = $scope_coll->get_first_index();
            
            //test_msg($from_index);

            // 5. 判斷他是位於哪一個章節
            // [14, 56, 70]
            $current_heading_number = 0;
            foreach ($structure AS $heading_number => $last_index) {
                //test_msg("foreach", array($from_index, $last_index, $heading_number));
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
            //test_msg("heading_list", array($current_heading_number, $count));
            $heading_list[$current_heading_number] = $count;
        }
        
        // array(
        //      1 => 4,
        //      5 => 9,
        //      12 => 1
        // )
        
        // 7. 排序
        if (isset($data["order_by_article"]) && $data["order_by_article"] !== TRUE) {
            arsort($heading_list);
        }
        
        // array(
        //      5 => 9,
        //      1 => 4,
        //      12 => 1
        // )
        
        // 7.1. 排序之後，輸出成JavaScript要的data形式
        $return_data = array();
        foreach ($heading_list AS $heading_number => $count ) {
            $item = array(
                "heading_number" => $heading_number,
                "type_count" => $count
            );
            
            //test_msg("item", $item);
            //$return_data[] = $item;
            array_push($return_data, $item);
        }
        
        // 8. 回傳
        //test_msg($return_data);
        return $return_data;
        //test_msg($data);
        //return $heading_list;
    }
}

/* End of file dashboard.php */
/* Location: ./system/application/controllers/web_apps/rest/dashboard.php */