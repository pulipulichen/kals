<?php
include_once 'kals_model.php';
/**
 * Stamp_list
 *
 * KALS Framework範例：Model的設定
 * 計算階級名單排行榜
 * 
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2013, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2013/11/19 下午 03:51:22
 */
class KALS_stamp extends KALS_model {

     
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
     * 取得各階級的USER 名單
     */
    public function get_stamps_list($data) {
        
        // -----------------------
        // 取得現在的網頁ID
        $webpage = $this->get_current_webpage();
        $webpage_id = $webpage->get_id();
        //return array("id"=>$webpage_id);
        //$webpage_id = 1573
        //------------------------
        //依條件查詢stamp_user_list
        switch ($data["stamp"]) {
            case "士兵":
                $query = $this->db->select('annotation.user_id')
                    ->from('annotation')
                    ->join('webpage2annotation', 'annotation.annotation_id = webpage2annotation.annotation_id')
                    ->where('webpage_id', $webpage_id)
                    ->where('annotation.topic_id', NULL)
                    ->where('annotation.deleted', 'false')
                    ->group_by('annotation.user_id')
                    ->having('count(annotation.annotation_id) > 3')
                    ->get();
                $user_list = array();
                foreach ($query->result() as $row) {
                    $user_list[] = $row->user_id;
                }            
                return $user_list;
                break;

            default:
                break;
        }
    }
}

/* End of file dashboard.php */
/* Location: ./system/application/controllers/web_apps/rest/dashboard.php */