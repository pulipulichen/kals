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
    public function get_stamps_list($stamps) {
        
        //$stamps = $stamps["stamps"];
        //var_dump($stamps);
        
        // -----------------------
        // 取得現在的網頁ID, user_id
        $webpage = $this->get_current_webpage();
        $webpage_id = $webpage->get_id();
        $user = $this->get_current_user();
        $user_id = $user->get_id();
        //return array("id"=>$webpage_id);
        //$webpage_id = 1573
        //------------------------
        //依條件查詢stamp_user_list
        $qualifier_tables = array();
       //-假資料----
       /* $qualifier_rules = array(
                    "topic_annotation_count" => array( 
                        "_total" => array(
                            "count" => "2"
                        )
                    ) 
         );*/
        //-----------------
        $stamps_result = array();
        foreach ($stamps AS $stamp ){
            
            $qualifier = $stamp["qualifier"];
            var_dump($qualifier); //show qualifer data
            
            
            // 查詢
            foreach ($qualifier AS $type => $rule){
                test_msg("key = ",$type);
                test_msg("value = ",$rule);
                //if($type === ""){
                    
                    
               // };
            }  
                
                
              /*  foreach ($qualifier_rules AS $type => $rule) {
                    if ($type === "topic_annotation_count") {
                        $table = "SELECT ....";
                        array_push($qualifier_tables, $table);
                    }
                    else if ($type === "...?") {
                        $table = "SELECT ....";
                        array_push($qualifier_tables, $table);
                    }
                }
                
                // --------------------
                
                $this->db->select('table_01.user_id')->from("user");
                
                foreach ($qualifier_tables AS $table) {
                    $this->db->join($table);
                }
                
                $query = $this->db->get();*/
                
                // ---------------------            
            //---------
            $result = array(
                111,222,333
            );
      
            $name = $stamp["name"];
            $stamps_result[] = array(
                "name" => $name,
                "user_id" => $result
            );
            //$stamp_name[] = $stamp->name;
            test_msg("name = ",$name);
            test_msg("result = ",$result);
        };
        
        return $stamps_result;
            
        //----------------------
               

                
               
        
    }
}

/* End of file dashboard.php */
/* Location: ./system/application/controllers/web_apps/rest/dashboard.php */