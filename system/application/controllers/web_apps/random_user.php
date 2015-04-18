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
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2013, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2013/11/19 下午 03:51:22
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
    
        //$usr_id = 1362;
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

//                        $usr_name_list = array();
//                        
//    $query = $this->db->query('SELECT user_id ' 
//        . 'FROM webpage2annotation ' 
//        . 'JOIN annotation USING (annotation_id)' 
//        . 'WHERE webpage_id = '.$webpage_id.' ' 
//        . 'GROUP BY user_id');
//    $usr_id_row = $query->row_array();
//    
//        foreach ($query->result_array() as $usr_id_row){
//        $query2 = $this->db->query('SELECT name FROM public.user WHERE user_id = '.$usr_id_row['user_id']);
//        $row_name2 = $query2->row_array();
//        array_push($usr_name_list, $row_name2['name']);
//    }
    
    

                        $tags = array_diff($data_good, $who_to_react);
                        
                        $tags2 = array_values($tags);
                        //$rnd_tags2 = count($tags2) - 1;
                        
                        
                        //$this->none_interection_user_list($usr_id, $webpage_id, $usrlist, $array_count);
                        if($tags != NULL){
                            
                            //$rand_user = $tags2[rand(0, $rnd_tags2)];
                            //$rand_user = $tags;
                            $data["random_user"] = $tags2;
                            //$data["random_user"] = array("bp6bp6bp6");
                        }  else {
                            $data["random_user"] = array("暫無推薦人選<br>");    
                            
                        }
                        
                        //$rand_user_array = array($rand_user);
                        //$data["random_user"] = $rand_user_array;
                       // $data["random_user"] = $tags;
                        //$data["random_user"] = $data_good;
                        return $data;
        
    }else{
        //$rand_user = "暫無推薦人選!!!!!!!!!!!<br>";
        $rand_user_array = array("暫無推薦人選!!!!!!!!!!!<br>");
        $data["random_user"] = $rand_user_array;
        return $data;
    }
    
    }
    
}

/* End of file random_user.php */
/* Location: ./system/application/controllers/web_apps/rest/random_user.php */