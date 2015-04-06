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
        
        //抓取webpage_id
        $webpage_id = $this->get_current_webpage()->get_id();
        
        //抓取此webpage_id最大的annotation_id
        //此段邏輯不夠完整
        //$query = $this->db->query('SELECT W2A.annotation_id FROM webpage2annotation W2A WHERE webpage_id = '.$webpage_id.' ORDER BY 1 ASC');
        //$query = $this->db->query('SELECT max(W2A.annotation_id) FROM webpage2annotation W2A WHERE webpage_id = '.$webpage_id.' ORDER BY 1 ASC');
        //$max_annotation_id_row = $query->row_array();
        //$max = implode("",$max_annotation_id_row);
        
        //抓取此webpage_id最小的annotation_id
        //此段邏輯不夠完整
        //$query = $this->db->query('SELECT min(W2A.annotation_id) FROM webpage2annotation W2A WHERE webpage_id = '.$webpage_id.' ORDER BY 1 ASC');
        //$min_annotation_id_row = $query->row_array();
        //$min = implode("",$min_annotation_id_row);
                
        //設定file名稱
        //$file = "D:/tmp/o1u2qtput.csv";
        $date = date("Y_m_d_H_i_s");
        //$file = "D:/tmp/output".$date.".csv";
        $file = "D:/tmp/output_".$date.".csv";
        
        //抓出所有標註的user_id
        $query = $this->db->query('SELECT user_id ' 
                . 'FROM webpage2annotation ' 
                . 'JOIN annotation USING (annotation_id)' 
                . 'WHERE webpage_id = '.$webpage_id.' ' 
                . 'GROUP BY user_id');
        $usr_id_row = $query->row_array();
        
        //將抓出來的user_id按照順序丟入陣列
        $userlist = array();
        $r_user_id = 1;
        foreach ($query->result_array() as $usr_id_row)
        {
            $usrlist[$usr_id_row['user_id']] = $r_user_id; //有問題嗎?
            $r_user_id++;
        }
        
//        foreach ($userlist as $user_id => $r_user_id) {
//            
//        }
        
        //抓出互動
        //$query = $this->db->query('select * from stuin');
        //$row = $query->row_array();
        $query = $this->db->query('SELECT topic.user_id "user_topic", reply.user_id "user_reply" '
                .'FROM annotation topic ' 
                    . 'JOIN webpage2annotation USING (annotation_id) '
                    . 'JOIN annotation reply '
                    .'ON topic.annotation_id = reply.topic_id '
                    . 'AND reply.topic_id IS NOT NULL ' 
                    . 'AND topic.deleted IS FALSE ' 
                    . 'AND reply.deleted IS FALSE '
                    . 'WHERE webpage_id = '.$webpage_id);
        
        //寫入csv檔
        $fp = fopen($file, 'w');

        //測試使用者
        //$usrlist = array(11, 12, 13, 14, 15);
        
        $row1 = array();
        
        foreach ($query->result_array() as $row)
        {            
            //$row1[0] = $row['user1'] - 10;
            //$row1[1] = $row['user2'] - 10;
            //以陣列的index取代user_id
//            $row1[0] = array_search($row[0], $usrlist) + 1; //有問題吧還要修改 不知該用啥來row
//            $row1[1] = array_search($row[1], $usrlist) + 1; //有問題吧還要修改
            
            $row1[0] = $usrlist[$row['user_topic']];
            $row1[1] = $usrlist[$row['user_reply']];
            
            fputcsv($fp, $row1);
            }
        
        $query = $this->db->query('SELECT topic.user_id "user_topic", reply.user_id "user_reply" '
                .'FROM annotation topic, annotation reply ' 
                    . 'JOIN webpage2annotation USING (annotation_id) '
                    . 'JOIN annotation2respond ar '
                    . 'ON ar.respond_to = reply.annotation_id '
                    . 'AND reply.deleted IS FALSE ' 
                    . 'WHERE webpage_id = '.$webpage_id.' ' 
                    . 'AND ar.annotation_id = topic.annotation_id '
                    . 'AND topic.deleted IS FALSE ');    
        
        foreach ($query->result_array() as $row)
        {             
            
            $row1[0] = $usrlist[$row['user_topic']];
            $row1[1] = $usrlist[$row['user_reply']];
           
//            
//            $row1[0] = $usrlist[$row['user_topic']];
//            $row1[1] = $usrlist[$row['user_reply']];
            
            fputcsv($fp, $row1);
            }
         
        fclose($fp);
        
        //degree需要另外抓取資料
        $file_degree = "D:/tmp/outputdegree_".$date.".csv";
        
        $query = $this->db->query('SELECT CASE WHEN topic.user_id > reply.user_id '
                . 'THEN topic.user_id ElSE reply.user_id END ' 
                        . 'AS user_main '
                . ', CASE WHEN topic.user_id > reply.user_id '
                . 'THEN reply.user_id ElSE topic.user_id  END '
                        . 'AS user_sub '
                . 'FROM annotation topic '
                    . 'JOIN webpage2annotation USING (annotation_id) '
                    . 'JOIN annotation reply '
                    . 'ON topic.annotation_id = reply.topic_id '
                    . 'AND reply.topic_id IS NOT NULL ' 
                    . 'AND topic.deleted IS FALSE ' 
                    . 'AND reply.deleted IS FALSE '
                    . 'WHERE webpage_id = '.$webpage_id
                    . 'ORDER BY user_main');
        
        //寫入csv檔
        $fp = fopen($file_degree, 'w');

        //測試使用者
        //$usrlist = array(11, 12, 13, 14, 15);
        
        $row1 = array();
        
        foreach ($query->result_array() as $row)
        {            
            //$row1[0] = $row['user1'] - 10;
            //$row1[1] = $row['user2'] - 10;
            //以陣列的index取代user_id
//            $row1[0] = array_search($row[0], $usrlist) + 1; //有問題吧還要修改 不知該用啥來row
//            $row1[1] = array_search($row[1], $usrlist) + 1; //有問題吧還要修改
            if($usrlist[$row['user_main']] > $usrlist[$row['user_sub']]){
                $row1[0] = $usrlist[$row['user_main']];
                $row1[1] = $usrlist[$row['user_sub']];
            }  else {
                $row1[0] = $usrlist[$row['user_sub']];
                $row1[1] = $usrlist[$row['user_main']];
                }
            
//            $row1[0] = $usrlist[$row['user_main']];
//            $row1[1] = $usrlist[$row['user_sub']];
            
            fputcsv($fp, $row1);
            }
        
        $query = $this->db->query('SELECT CASE WHEN topic.user_id > reply.user_id '
                . 'THEN topic.user_id ELSE reply.user_id END ' 
                    . 'AS user_main '
                . ',CASE WHEN topic.user_id > reply.user_id '
                . 'THEN reply.user_id ELSE topic.user_id END '
                    . 'AS user_sub '
                . 'FROM annotation topic, annotation reply '
                    . 'JOIN webpage2annotation USING (annotation_id) '
                    . 'JOIN annotation2respond ar '
                    . 'ON ar.respond_to = reply.annotation_id '
                    . 'AND reply.deleted IS FALSE ' 
                    . 'WHERE webpage_id = '.$webpage_id.' ' 
                    . 'AND ar.annotation_id = topic.annotation_id '
                    . 'AND topic.deleted IS FALSE ');    
        
        foreach ($query->result_array() as $row)
        {             
            if($usrlist[$row['user_main']] > $usrlist[$row['user_sub']]){
                $row1[0] = $usrlist[$row['user_main']];
                $row1[1] = $usrlist[$row['user_sub']];
            }  else {
                $row1[0] = $usrlist[$row['user_sub']];
                $row1[1] = $usrlist[$row['user_main']];
                }
            
            fputcsv($fp, $row1);
            }
         
        fclose($fp);
        
        
        //將file丟給R_berweenness進行計算
        $this->load->library("exec_cli/R_betweenness");
        $b_output = $this->r_betweenness->insert_data($file);
        
        $this->load->library("exec_cli/R_degree");
        $d_output = $this->r_degree->insert_data($file_degree);
        
        $this->load->library("exec_cli/R_pagerank");
        $p_output = $this->r_pagerank->insert_data($file);
        
        $this->load->library("exec_cli/R_outdegree");
        $od_output = $this->r_outdegree->insert_data($file);
        
        $this->load->library("exec_cli/R_indegree");
        $id_output = $this->r_indegree->insert_data($file);

        $this->load->library("exec_cli/R_incloseness");
        $ic_output = $this->r_incloseness->insert_data($file);
        
        
        
        //儲存
        for($j = 1; $j < count($b_output); $j++){
        //$a = 1;    
	//$usr_id = 1;
	$b_output_array = array_map('floatval', explode(" ",$b_output[$j]));
        $d_output_array = array_map('floatval', explode(" ",$d_output[$j]));
        $p_output_array = array_map('floatval', explode(" ",$p_output[$j+1]));
        $od_output_array = array_map('floatval', explode(" ",$od_output[$j]));
        $ic_output_array = array_map('floatval', explode(" ",$ic_output[$j]));
        $id_output_array = array_map('floatval', explode(" ",$id_output[$j]));
        $array_count = count($b_output_array);
        
        $origi_array = array("學習成果不良者為");
        //$stu_why = array("");
        
        for($x = 1; $x < $array_count; $x++){
            
            //正規化
            $caculateb1 = ($array_count-1) * ($array_count-2);
            $caculateb2 = $caculateb1 / 2;
            $input_b = $b_output_array[$x]/$caculateb2;
            
            $caculated1 = $array_count-1;
            $input_d = $d_output_array[$x]/$caculated1;
            
            $input_p = $p_output_array[$x];
            
            $input_od = $od_output_array[$x]/$caculated1;
            
            $input_id = $id_output_array[$x]/$caculated1;
            
            $input_ci = $ic_output_array[$x] * $caculated1;
		
            //抓出user_id以進行儲存
            //$y = $x - 1;
            //$usr_id = $usrlist[$y]; //感覺這裡有問題
             
            $usr_id = array_search($x, $usrlist);
            
            $query = $this->db->query('SELECT sex FROM public.user ' 
                . 'WHERE user_id =  '.$usr_id);
            $sex_row = $query->row_array();
            
            $stu_why1 = "";
            $stu_why2 = "";
            $stu_why3 = "";
            
            if($sex_row['sex'] > 1)
            {
                if($input_b > 0.024469){
                    $stu_status1 = "A";
                }  else {
                    $stu_status1 = "B";
                    $stu_why1 = "betweenness過低<br>";//多跟他人互動
                }
            }  else {
                if($input_d > 0.576923){
                    $stu_status1 = "B";
                    $stu_why1 = "degree過高(女性)<br>";//濫回?
                }  else {
                    if($input_p > 0.035547){
                        $stu_status1 = "A";
                    }  else {
                        if($input_b > 0.02174){
                            $stu_status1 = "A";
                        } else {
                            $stu_status1 = "B";
                            $stu_why1 = "betweenness過低<br>";//多跟他人互動
                        }                       
                    }                    
                }
            }
            
            if($sex_row['sex'] > 1){
                if($input_od > 0.333333){
                    $stu_status2 = "A";
                }  else {
                    $stu_status2 = "B";
                    $stu_why2 = "out-degree過低<br>";//多跟他人互動,挑出名單?
                }
            }  else {
                if($input_id > 0.333333){
                    if($input_p > 0.041894){
                        if($input_id > 0.481481){
                            $stu_status2 = "B";
                            $stu_why2 = "in-degree過高(女性,p為高)<br>";
                        }  else {
                            $stu_status2 = "A";
                        }
                    }  else {
                        $stu_status2 = "B";
                        $stu_why2 = "pagerank過低<br>";//給熱門標註?讓他做回應
                    }
                }  else {
                    $stu_status2 = "A";
                }
            }
            
            if($input_b > 0.067702){
                $stu_status3 = "A";
            }  else {
                if($input_ci > 0.586957){
                    $stu_status3 = "B";
                    $stu_why3 = "in closeness過高(b過低情況下)<br>";
                }  else {
                    if($input_ci > 0.5625){
                        $stu_status3 = "A";
                    }  else {
                        if($input_p > 0.015601){
                            $stu_status3 = "B";
                            $stu_why3 = "pagerank過高（b ic 過低情況下）<br>";
                        }  else {
                            $stu_status3 = "A";
                        }
                    }
                }
            }
//            $data = array(
//               'user_id' => $usr_id,
//               'betweenness' => $input_b,
//               'indegree' => $input_id
//                );
//            $this->db->insert('stusna', $data);    
            //$usr_id++;
            
            $stu_status = $stu_status1."、".$stu_status2."、".$stu_status3;
            $str_count_a = substr_count($stu_status, "A");
            $str_count_b = substr_count($stu_status, "B");
 
            if($str_count_a >= 2 ){
            //echo "<br>使用者『".$row['user_id']."』學習狀況良好<br>";
            }else{
            //echo "<br>使用者『".$row['user_id']."』學習狀況很差，需特別注意<br>";
                $query = $this->db->query('SELECT name FROM public.user WHERE user_id = '.$usr_id);
                $row_name = $query->row_array();
                array_push($origi_array, "<br>", $row_name['name'], "<br>", $stu_why1, $stu_why2, $stu_why3);
            } 
 }
        $data["from_R"] = $origi_array;
        return $data;
	
    }  
    
    
        //$data["from_R"] = $usr_id;
        //return $data;
        
        //選出來SNA指標狀況
//        $query = $this->db->query('SELECT * FROM stusna');
//        //$row = $query->row_array();
//        $origi_array = array("學習成果不良者為");
//        foreach ($query->result_array() as $row)
//        {
//            if($row['betweenness']>=0.3)
//                $stu_status1 = "A";
//            else
//                $stu_status1 = "B";
//            
//           if($row['indegree']>=0.4)
//                $stu_status2 = "A";
//            else
//                $stu_status2 = "B";
//            
//        
//            $stu_status = $stu_status1."、".$stu_status2;
//            $str_count_a = substr_count($stu_status, "A");
//            $str_count_b = substr_count($stu_status, "B");
// 
//            if($str_count_a >= 2 ){
//            //echo "<br>使用者『".$row['user_id']."』學習狀況良好<br>";
//            }else{
//            //echo "<br>使用者『".$row['user_id']."』學習狀況很差，需特別注意<br>";
//                array_push($origi_array, "<br>",$row['user_id']);
//            } 
//        //echo $row['name'];
//        //echo $row['body'];
//        }


//        $data["from_R"] = $origi_array;
//        return $data;
        
    }
}

/* End of file dashboard.php */
/* Location: ./system/application/controllers/web_apps/rest/dashboard.php */