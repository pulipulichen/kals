<?php
include_once 'kals_model.php';
/**
 * sna_counting
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
class sna_counting extends KALS_model {

     
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
        
          
        //抓取webpage_id
        $webpage_id = $this->get_current_webpage()->get_id();
                        
        //設定file名稱
        $date = date("Y_m_d_H_i_s");
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
                      
        //抓出互動
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

        $row1 = array();
        
        foreach ($query->result_array() as $row)
        {            
        
            
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
            
            if($usrlist[$row['user_main']] > $usrlist[$row['user_sub']]){
                $row1[0] = $usrlist[$row['user_main']];
                $row1[1] = $usrlist[$row['user_sub']];
            }  else {
                $row1[0] = $usrlist[$row['user_sub']];
                $row1[1] = $usrlist[$row['user_main']];
                }
            
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
        
        $stu_list_array = array("");
        $stu_why_array = array();
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
                       
            $stu_status = $stu_status1."、".$stu_status2."、".$stu_status3;
            $str_count_a = substr_count($stu_status, "A");
            $str_count_b = substr_count($stu_status, "B");
 
            if($str_count_a >= 2 ){
            
            }else{
            
                $query = $this->db->query('SELECT name FROM public.user WHERE user_id = '.$usr_id);
                $row_name = $query->row_array();
                //array_push($stu_list_array, "<br><tr><td>", $row_name['name'], "</td><td><br>", $stu_why1, $stu_why2, $stu_why3);
                array_push($stu_list_array, $row_name['name']);
                
                if($stu_why1 != "" && $stu_why2 != "" && $stu_why3 != ""){
                    array_push($stu_why_array, $row_name['name'], "　　".$stu_why1, "　　".$stu_why2, "　　".$stu_why3);
                }elseif ($stu_why1 != "" && $stu_why2 != "") {
                        array_push($stu_why_array, $row_name['name'], "　　".$stu_why1, "　　".$stu_why2);
                    }elseif ($stu_why1 != "" && $stu_why3 != "") {
                        array_push($stu_why_array, $row_name['name'], "　　".$stu_why1, "　　".$stu_why3);
                    }else {
                        array_push($stu_why_array, $row_name['name'], "　　".$stu_why2, "　　".$stu_why3);
                    }
            }            
 }
 
        $data["from_R"] = $stu_list_array;
        
        $data["reason"] = $stu_why_array;
        return $data;
	
    }        
    }
    
    public function test() {
        //$name = $data['name'];
        $name = "pupu";
        $name = $name . $name;
        
        $name_array = array("name", "name2");
        //$data['name'] = $name_array;
        
        //return $data;
        
        }
    
      public function test3($name_array) {
        //$name = $data['name'];
        $name = "pupu";
        //$name = $name . $name;
        
        $name_array = array("name", "name2");
        //$data['from_R'] = $name_array;
        $data['name'] = $name_array;
        $data['reason'] = "reaaaaa";
        return $data;
    }
    
    public function test2(){
          
        //抓取webpage_id
        $webpage_id = $this->get_current_webpage()->get_id();
                        
        //設定file名稱
        $date = date("Y_m_d_H_i_s");
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
                      
        //抓出互動
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

        $row1 = array();
        
        foreach ($query->result_array() as $row)
        {            
        
            
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
            
            if($usrlist[$row['user_main']] > $usrlist[$row['user_sub']]){
                $row1[0] = $usrlist[$row['user_main']];
                $row1[1] = $usrlist[$row['user_sub']];
            }  else {
                $row1[0] = $usrlist[$row['user_sub']];
                $row1[1] = $usrlist[$row['user_main']];
                }
            
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
        
        $stu_list_array = array("");
        $stu_why_array = array();
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
                       
            $stu_status = $stu_status1."、".$stu_status2."、".$stu_status3;
            $str_count_a = substr_count($stu_status, "A");
            $str_count_b = substr_count($stu_status, "B");
 
            if($str_count_a >= 2 ){
            
            }else{
            
                $query = $this->db->query('SELECT name FROM public.user WHERE user_id = '.$usr_id);
                $row_name = $query->row_array();
                //array_push($stu_list_array, "<br><tr><td>", $row_name['name'], "</td><td><br>", $stu_why1, $stu_why2, $stu_why3);
                array_push($stu_list_array, $row_name['name']);
                
                if($stu_why1 != "" && $stu_why2 != "" && $stu_why3 != ""){
                    array_push($stu_why_array, $row_name['name'], "　　".$stu_why1, "　　".$stu_why2, "　　".$stu_why3);
                }elseif ($stu_why1 != "" && $stu_why2 != "") {
                        array_push($stu_why_array, $row_name['name'], "　　".$stu_why1, "　　".$stu_why2);
                    }elseif ($stu_why1 != "" && $stu_why3 != "") {
                        array_push($stu_why_array, $row_name['name'], "　　".$stu_why1, "　　".$stu_why3);
                    }else {
                        array_push($stu_why_array, $row_name['name'], "　　".$stu_why2, "　　".$stu_why3);
                    }
            }            
 }
 
        $data['from_R'] = $stu_list_array;
        
        $data['reason'] = $stu_why_array;
        return $data;
	
    }    
    

}
    
    public function create_file(){
        //抓取webpage_id
        $webpage_id = $this->get_current_webpage()->get_id();
                       
        //設定file名稱
        $date = date("Y_m_d_H_i_s");
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
 
        //抓出互動
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
       
        $row1 = array();
        
        foreach ($query->result_array() as $row)
        {            
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
        
        $row1 = array();
        
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
        
        load_r($file, $file_degree);
    }
    
    public function load_r($file, $file_degree){
        
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
        
        tree($b_output, $d_output, $p_output, $od_output, $id_output, $ic_output);
    }

    
    public function tree($b_output, $d_output, $p_output, $od_output, $id_output, $ic_output){

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
  
        $stu_list_array = array("");
        $stu_why_array = array();
        
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
                //array_push($stu_list_array, "<br><tr><td>", $row_name['name'], "</td><td><br>", $stu_why1, $stu_why2, $stu_why3);
                array_push($stu_list_array, $row_name['name']);
                
                if($stu_why1 != "" && $stu_why2 != "" && $stu_why3 != ""){
                    array_push($stu_why_array, $row_name['name'], "　　".$stu_why1, "　　".$stu_why2, "　　".$stu_why3);
                }elseif ($stu_why1 != "" && $stu_why2 != "") {
                        array_push($stu_why_array, $row_name['name'], "　　".$stu_why1, "　　".$stu_why2);
                    }elseif ($stu_why1 != "" && $stu_why3 != "") {
                        array_push($stu_why_array, $row_name['name'], "　　".$stu_why1, "　　".$stu_why3);
                    }else {
                        array_push($stu_why_array, $row_name['name'], "　　".$stu_why2, "　　".$stu_why3);
                    }
                //array_push($stu_why_array, $row_name['name'], "　　".$stu_why1,"　　".$stu_why2,"　　".$stu_why3);
//                $sna_result[] = array(
//                    "user_name_list" => $row_name['name'],
//                    //"stamp_name" => $stamp_name,
//                    //"reason_list" => $new_user_name_list
//                );
                //$stu_list[$x] = $row_name['name'];
            
            } 
            
 }
        
        //$sna_result = array("t1", "t2","t3");

        //array_push($origi_array, "</tb");
        //$data["from_R"] = $sna_result;
        $data["from_R"] = $stu_list_array;
        
        $data["reason"] = $stu_why_array;
        //return $data;
        //$data["from_R"] = $stu_list_array;
        return $data;
	
    }  
    
    }
}

/* End of file sna_counting.php */
/* Location: ./system/application/controllers/web_apps/rest/sna_counting.php */