<?php
include_once 'kals_model.php';
/**
 * random_user
 *
 * KALS Framework範例：Model的設定
 * 輸出網頁標註資訊的位置
 * 
 * @package		KALS
 * @category		Controllers
 * @author		red mao hong <r3dmaohong@gmail.com>
 * @copyright		Copyright (c) 2015, red mao hong
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2015/04/20 下午 04:22
 */
class random_user extends KALS_model {

     
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
    public function open() {
    $webpage_id = $this->get_current_webpage()->get_id();    
    $query = $this->db->query("SELECT note " 
            . "FROM log " 
            . "WHERE log_timestamp > CURRENT_TIMESTAMP - INTERVAL '3 minutes' " 
            . "AND webpage_id = ".$webpage_id. " " 
            . "AND action_key = 'sna_counting_good.cache'");
        
    if ($query->num_rows() > 0) {
        
        $log_row = $query->row_array();
        
        $data_good = $log_row["note"];
        $data_good = json_to_array($data_good);
    
        $usr_id = $this->get_current_user()->get_id();    
        
        $query = $this->db->query('SELECT name FROM public.user WHERE user_id = '.$usr_id);
        $row_name = $query->row_array();
        $who_to_react = array($row_name['name']);

        $query = $this->db->query('SELECT DISTINCT topic.user_id "user_topic" '
            .'FROM annotation topic ' 
                . 'JOIN webpage2annotation USING (annotation_id) '
                . 'JOIN annotation reply '
                    .'ON topic.annotation_id = reply.topic_id '
                    . 'AND reply.topic_id IS NOT NULL ' 
                    . 'AND topic.deleted IS FALSE ' 
                    . 'AND reply.deleted IS FALSE '
            . 'WHERE webpage_id = '.$webpage_id
                . 'AND reply.user_id = '.$usr_id);  

        foreach ($query->result_array() as $row){ 
            $query = $this->db->query('SELECT name FROM public.user WHERE user_id = '.$row['user_topic']);
            $row_name = $query->row_array();
            array_push($who_to_react, $row_name['name']);
                    }

        $tags = array_diff($data_good, $who_to_react);
                        
        $tags2 = array_values($tags);
        
        if($tags != NULL){
            if(count($tags2)<=3){
                $data["random_user"] = $tags2;
                        }  else {
                               $random_keys=array_rand($tags2,3);
                               $data["random_user"] = $random_keys;
                        }
                        }  else {
                            $data["random_user"] = $data_good;    
                        }
                return $data;
        
        }else{

            $rand_user_array = array("功能尚未開啟<br>");
            $data["random_user"] = $rand_user_array;
            return $data;
            }
    
     }
    
}

/* End of file random_user.php */
/* Location: ./system/application/controllers/web_apps/rest/random_user.php */