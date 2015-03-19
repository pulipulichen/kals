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
class dashboard extends KALS_model {

     
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
        
//        $webpage_id = $this->get_current_webpage()->get_id();
//        $query = $this->db->query('select title from webpage where webpage_id = '.$webpage_id);
//        $row = $query->row_array();
//        
//        $data["from_R"] = $row['title'];
        
//        $output = "";
//        
//        foreach (true) {
//            $result["a"] = 1;
//            $result["b"] = 2;
//            
//            $output = $output . $result["a"] . "," . $result["b"] . "\n";
//        }
        $webpage_id = $this->get_current_webpage()->get_id();
        //$query = $this->db->query('SELECT W2A.annotation_id FROM webpage2annotation W2A WHERE webpage_id = '.$webpage_id.' ORDER BY 1 ASC');
        $query = $this->db->query('SELECT max(W2A.annotation_id) FROM webpage2annotation W2A WHERE webpage_id = '.$webpage_id.' ORDER BY 1 ASC');
        $max_annotation_id_row = $query->row_array();
        $max = implode("",$max_annotation_id_row);
        
        $query = $this->db->query('SELECT min(W2A.annotation_id) FROM webpage2annotation W2A WHERE webpage_id = '.$webpage_id.' ORDER BY 1 ASC');
        $min_annotation_id_row = $query->row_array();
        $min = implode("",$min_annotation_id_row);
        
        
        //$file = "D:/tmp/o1u2qtput.csv";
        $date = date("Y_m_d_H_i_s");
        //$file = "D:/tmp/output".$date.".csv";
        $file = "D:/tmp/output_".$date.".csv";
        
        //抓出user_id
        $query = $this->db->query('SELECT DISTINCT AN.user_id FROM annotation AN, annotation TOP WHERE AN.annotation_id >= '.$min.' AND AN.annotation_id <= '.$max.' ORDER BY 1 ASC');
        $usr_id_row = $query->row_array();
        
        foreach ($query->result_array() as $usr_id_row)
        {
            $i = 0;
            $usrlist[$i] = $row['user_id'];
            $i++;
            
            }
        
        //$query = $this->db->query('select * from stuin');
        //$row = $query->row_array();
        $query = $this->db->query('SELECT AN.user_id "user1", TOP.user_id "user2" FROM annotation AN, annotation TOP WHERE AN.annotation_id = TOP.topic_id AND TOP.topic_id is not NULL AND AN.deleted IS FALSE AND AN.annotation_id >= '.$min.' AND AN.annotation_id <= '.$max.' ORDER BY 1 ASC');
                
        $fp = fopen($file, 'w');

        //測試使用者
        //$usrlist = array(11, 12, 13, 14, 15);
        foreach ($query->result_array() as $row)
        {
            
            //$row1[0] = $row['user1'] - 10;
            //$row1[1] = $row['user2'] - 10;
            $row1[0] = array_search($row['user_id1'], $usrlist) + 1;
            $row1[1] = array_search($row['user_id2'], $usrlist) + 1;
         fputcsv($fp, $row1);
            }

         
         fclose($fp);
        
        $this->load->library("exec_cli/R_betweenness");
        $b_output = $this->r_betweenness->insert_data($file);
        
        $this->load->library("exec_cli/R_indegree");
        $id_output = $this->r_indegree->insert_data($file);
        //$data["from_R"] = $result;
        
        //儲存
        for($j = 1; $j < count($b_output); $j++){
        //$a = 1;    
	//$usr_id = 1;
	$b_output_array = array_map('floatval', explode(" ",$b_output[$j]));
        $id_output_array = array_map('floatval', explode(" ",$id_output[$j]));
        $array_count = count($b_output_array);
        
        for($x = 1; $x < $array_count; $x++){
		$caculateb1 = ($array_count-1) * ($array_count-2);
		$caculateb2 = $caculateb1 / 2;
		$input_b = $b_output_array[$x]/$caculateb2;
                
                $caculateid1 = $array_count-1;
		$input_id = $id_output_array[$x]/$caculateid1;
		
                $y = $x - 1;
                $usr_id = $usrlist[$y]; //出啥問題
                
                 $data = array(
               'user_id' => $usr_id,
               'betweenness' => $input_b,
               'indegree' => $input_id
                );
                $this->db->insert('stusna', $data);    
		//$usr_id++;
 }
	
    }  
    
    
        //$data["from_R"] = $usr_id;
        //return $data;
        
        //選出來
        $query = $this->db->query('SELECT * FROM stusna');
        //$row = $query->row_array();
        $OrigiArray= array("學習成果不良者為");
        foreach ($query->result_array() as $row)
        {
            if($row['betweenness']>=0.3)
                $stu_status1 = "A";
            else
                $stu_status1 = "B";
            
           if($row['indegree']>=0.4)
                $stu_status2 = "A";
            else
                $stu_status2 = "B";
            
        
            $stu_status = $stu_status1."、".$stu_status2;
            $str_count_a = substr_count($stu_status, "A");
            $str_count_b = substr_count($stu_status, "B");
 
            
            if($str_count_a >= 2 ){
            //echo "<br>使用者『".$row['user_id']."』學習狀況良好<br>";
            }else{
            //echo "<br>使用者『".$row['user_id']."』學習狀況很差，需特別注意<br>";
            array_push($OrigiArray, "<br>",$row['user_id']);
            } 
        //echo $row['name'];
        //echo $row['body'];
        }


        $data["from_R"] = $OrigiArray;
        return $data;
        
    }
}

/* End of file dashboard.php */
/* Location: ./system/application/controllers/web_apps/rest/dashboard.php */