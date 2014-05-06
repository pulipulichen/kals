<?php
include_once 'kals_model.php';
/**
 * Dashboard
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
class frag_reading extends KALS_model {

     
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
    public function open($data) {
        
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
        
        return $data;
    }
}

/* End of file frag_reading.php */
/* Location: ./system/application/controllers/web_apps/rest/dashboard.php */