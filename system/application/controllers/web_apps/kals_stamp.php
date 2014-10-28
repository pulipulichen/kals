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
        //test_msg('web_id = ', $webpage_id);
        $user = $this->get_current_user();
        $user_id = $user->get_id();
        //return array("id"=>$webpage_id);
        //$webpage_id = 1573
        //------------------------
        //依條件查詢stamp_user_list
        $qualifier_tables = array();
        $stamps_result = array();
        foreach ($stamps AS $stamp ){
            
            $qualifier = $stamp["qualifier"];
            //var_dump($qualifier); //show qualifer data
            //------------------------          
            // 查詢
            foreach ($qualifier AS $type => $rule){
                //test_msg("key = ",$type);
                //test_msg("value = ",$rule);
                //  type類型
                if($type === "topic_annotation_count"){
                    //查詢的條件要全部都判斷出來！
                    foreach ($rule AS $rule_type => $rule_value ){
                        // 取到最底層的count值
                        test_msg("rule_type = ",$rule_type);
                        test_msg("rule_value =", $rule_value["count"] ); 
                        $rule_count = $rule_value["count"];
                        //條件值取出後開始查詢
                        $table = 'SELECT annotation.user_id
FROM annotation JOIN webpage2annotation ON ( annotation.annotation_id = webpage2annotation.annotation_id )
WHERE webpage_id = '.$webpage_id.' AND annotation.topic_id IS NULL AND annotation.deleted = false
GROUP BY annotation.user_id
HAVING COUNT(annotation.annotation_id) >='.$rule_count;
                       
                        //把查出來的表(array)塞到另一個arry中
                        array_push($qualifier_tables, $table); 
                        
                   }
                }//if($type === "topic_annotation_count"){
                // 回應多少人
                 else if ($type === "respond_to_user_count") {
                     $respond_to_user_count = $rule["count"];
                     $table = 'SELECT respond_to.user_id
FROM user_respond_to_count AS respond_to JOIN webpage ON (webpage.webpage_id = respond_to.webpage_id)
WHERE respond_to.webpage_id = '.$webpage_id.' AND respond_to.count >= '.$respond_to_user_count;
                     
                     //test_msg("user_count =", $user_count );
                         array_push($qualifier_tables, $table);                            
                } //elseif($type === "respond_to_user_count"){
                // 有多少人回應我
                else if( $type === "responded_user_count"){
                    $responded_user_count = $rule["count"];
                    //test_msg("responded_user_count =", $rule["count"] ); 
                    $table = 'SELECT responded.user_id
FROM user_responded_count AS responded JOIN webpage ON (webpage.webpage_id = responded.webpage_id)
WHERE responded.webpage_id = '.$webpage_id.'AND responded.count >= '.$responded_user_count;
                   
                         array_push($qualifier_tables, $table);             
                }//else if( $type === "responded_user_count"){
                //被喜愛的次數
                else if ($type === "liked_count") {
                    $liked_count = $rule["count"];
                    $table = 'SELECT annotation.user_id
FROM annotation JOIN annotation2like_count ON ( annotation.annotation_id = annotation2like_count.annotation_id) JOIN webpage2annotation ON (annotation.annotation_id = webpage2annotation.annotation_id)
WHERE webpage_id = '.$webpage_id.'AND like_count >='.$liked_count; 
                    array_push($qualifier_tables, $table);
                    
                }//else if ($type === "liked_count") {
                //喜愛的次數
                else if ($type === "like_count"){
                    $like_count = $rule["count"];
                    $table = 'SELECT annotation2like.user_id
FROM annotation2like JOIN webpage2annotation ON (annotation2like.annotation_id = webpage2annotation.annotation_id)
WHERE webpage_id = '.$webpage_id.'
AND annotation2like.canceled = false
GROUP BY annotation2like.user_id
HAVING count(user_id) >='.$like_count; 
                    array_push($qualifier_tables, $table);
                }//else if ($type === "like_count"){
                //喜愛的人數
                else if ($type === "like_to_users_count"){
                    $like_to_user_count = $rule["count"];
                    $table = 'SELECT like_to.me AS user_id
FROM (SELECT DISTINCT user_like_to.me, user_like_to.like_to_user
FROM user_like_to JOIN webpage2annotation ON (user_like_to.annotation_id = webpage2annotation.annotation_id) 
WHERE webpage_id = '.$webpage_id.'
ORDER BY user_like_to.me) AS like_to
GROUP BY like_to.me
HAVING count(like_to.me) >='.$like_to_user_count;
                    
                    array_push($qualifier_tables, $table);
                }// else if ($type === "like_to_users_count"){
                // 被多少人喜愛的人數
                else if ($type === "liked_users_count"){
                    $liked_user_count = $rule["count"];
                    $table = 'SELECT liked.me AS user_id
FROM (SELECT DISTINCT user_liked.me, user_liked.liked_user
FROM user_liked JOIN webpage2annotation ON (user_liked.annotation_id = webpage2annotation.annotation_id)
WHERE webpage_id = '.$webpage_id.'
ORDER BY user_liked.me) AS liked
GROUP BY liked.me
HAVING count(liked.me) >='.$liked_user_count;
                    
                     array_push($qualifier_tables, $table);
                }
                
            }  //foreach ($qualifier AS $type => $rule){
            
            // -----------------------------------------------------
            // 把所有條件查好的表合併，找出都符合條件的user_id    
            $this->db->select('user.user_id, user.name')
                    ->from("user");    
            //var_dump($qualifier_tables); //show qualifer data
            foreach ($qualifier_tables AS $key => $table) {
                $cond = 'user.user_id = T'.$key.'.user_id';
                $this->db->join('('.$table.' ) AS "T'.$key.'"' , $cond);
                //test_msg("table = ",$cond);
            }
            
            $query = $this->db->get();
           // var_dump($query);
            /*foreach ($query->result() as $row){ 
                    echo $row->user_id;
                    echo '+';
                    echo $row->name;  
                    echo '||';
            }   */       
            //------------
            //把資料塞進要回傳的ARRAY中
            $user_name_list = array();
            foreach ($query->result() as $key=>$row){ 
                $user_name_list[$key] = $row->name;
            }
            
            // 20141007 不顯示沒有名單的階級
            if (count($user_name_list) === 0) {
                continue;
            }
            
            $stamp_name = $stamp["name"]; //stamp name
            $stamps_result[] = array(
                "stamp_name" => $stamp_name,
                "user_name_list" => $user_name_list // user name
            );                 
        } //foreach ($stamps AS $stamp )
        // 反轉陣列順序
        $stamps_result = array_reverse($stamps_result);    
        
        //20141015 將階級名單中重複的對象刪除
        $stamps_result2 = array();
        $added_user_list = array();
        
        foreach ($stamps_result AS $value){ //$stamp1_list
            
            $new_user_name_list = array();
            
            $user_name_list = $value['user_name_list'];
            $stamp_name = $value['stamp_name'];

            foreach($user_name_list AS $user_name){             
                //var_dump($username);
                if (in_array($user_name, $added_user_list) === FALSE) {
                    $added_user_list[] = $user_name;
                    $new_user_name_list[] = $user_name;
                    //test_msg("user_name " . $user_name, $added_user_list); 
                }
            } 
            
            if (count($new_user_name_list) > 0) {
                //test_msg("new user name list", $new_user_name_list);
                $stamps_result2[] = array(
                    "stamp_name" => $stamp_name,
                    "user_name_list" => $new_user_name_list
                );
                //$stamp1_result2[$stamp_name]["stamp_name"] = $stamp_name;
                //$stamp1_result2[$stamp_name]["user_name_list"] = $new_user_name_list;             
            }
        }
        //var_dump($stamp1_result2);
        
        //return array();
        return $stamps_result2;
    }
}

/* End of file dashboard.php */
/* Location: ./system/application/controllers/web_apps/rest/dashboard.php */