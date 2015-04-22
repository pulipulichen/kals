<?php
include_once 'kals_model.php';
/**
 * sna_counting
 *
 * Sna_Counting：Model的設定
 * 計算SNA指標，進行決策樹預測閱讀成效
 * 
 * @package		KALS
 * @category		Controllers
 * @author		red mao hong <r3dmaohong@gmail.com>
 * @copyright		Copyright (c) 2015, red mao hong
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2015/04/10 下午 04:30
 */
class sna_counting extends KALS_model {

public function open($data) {
        
    }
    
//sna_start	
//抓web_id以及判斷是否有cache
public function sna_start(){

    $log_action = "sna_counting.cache";

    //抓取webpage_id
    $webpage_id = $this->get_current_webpage()->get_id();
        
    $query = $this->db->query("SELECT note " 
            . "FROM log " 
            . "WHERE log_timestamp > CURRENT_TIMESTAMP - INTERVAL '3 minutes' " 
            . "AND webpage_id = ".$webpage_id. " " 
            . "AND action_key = 'sna_counting.cache'");
        
    if ($query->num_rows() < 0) {
        $log_row = $query->row_array();
        
        $data = $log_row["note"];
        $data = json_to_array($data);

        return $data;
    
    }else{
        $usrlist = $this->create_user_list($webpage_id);
        $file = $this->create_file($usrlist, $webpage_id);
        $file_degree = $this->create_file_degree($usrlist, $webpage_id);
        
        $b_output = $this->count_betweenness($file);
        $d_output = $this->count_degree($file_degree);
        $ic_output = $this->count_incloseness($file);
        $id_output = $this->count_indegree($file);
        $od_output = $this->count_outdegree($file);
        $p_output = $this->count_pagerank($file);
        
       // $this->csv_to_r($files['file'], $files['file_degree'], $usrlist, $webpage_id);
        
        $data = $this->sna_tree($b_output, $d_output, $p_output, $od_output, $id_output, $ic_output, $usrlist, $webpage_id);
        return $data;
    }
}
	
//create_user_list	
//設定file名稱，抓出標註user_id，產生user_id list
public function create_user_list($webpage_id){

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
    foreach ($query->result_array() as $usr_id_row){
        $usrlist[$usr_id_row['user_id']] = $r_user_id;
        $r_user_id++;
    }
    return $usrlist;
}

	
//interection_to_csv
//抓出互動，寫入csv，抓出degree互動，寫入csv
public function create_file_degree($usrlist, $webpage_id){
	
    //設定file名稱
    $date = date("Y_m_d_H_i_s");
            
    //degree需要另外抓取資料
    $file_degree = sys_get_temp_dir() . "/outputdegree_".$date.".csv";
    //$file_degree = "D:/tmp/outputdegree_".$date.".csv";
    
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
    
    foreach ($query->result_array() as $row){            
        
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
    
    foreach ($query->result_array() as $row){             
 
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
    
    return $file_degree;    
}

//interection_to_csv
//抓出互動，寫入csv，抓出degree互動，寫入csv
public function create_file($usrlist, $webpage_id){
	
    //設定file名稱
    $date = date("Y_m_d_H_i_s");
    $file =  sys_get_temp_dir() . "/output_".$date.".csv";
    //$file = "D:/tmp/output_".$date.".csv";
    
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
        
    foreach ($query->result_array() as $row){            
                    
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
        
    foreach ($query->result_array() as $row){             
        
	$row1[0] = $usrlist[$row['user_topic']];
        $row1[1] = $usrlist[$row['user_reply']];
            
        fputcsv($fp, $row1);
    }
         
    fclose($fp);

    
    return $file;
        
    
}

//csv_to_r	
//file丟給r計算，將結果儲存與正規化
public function csv_to_r($file, $file_degree, $usrlist, $webpage_id){
	
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

    $this->sna_tree($b_output, $d_output, $p_output, $od_output, $id_output, $ic_output, $usrlist, $webpage_id);
}

public function count_betweenness($file){
	
    //將file丟給R_berweenness進行計算
    $this->load->library("exec_cli/R_betweenness");
    $b_output = $this->r_betweenness->insert_data($file);
    
    return $b_output;
}
public function count_degree($file_degree){
	

    $this->load->library("exec_cli/R_degree");
    $d_output = $this->r_degree->insert_data($file_degree);
    
    return $d_output;
}
public function count_pagerank($file){
	
    $this->load->library("exec_cli/R_pagerank");
    $p_output = $this->r_pagerank->insert_data($file);
    
    return $p_output;
}
public function count_outdegree($file){
	
    $this->load->library("exec_cli/R_outdegree");
    $od_output = $this->r_outdegree->insert_data($file);
    
    return $od_output;
    
}
public function count_indegree($file){
	
    $this->load->library("exec_cli/R_indegree");
    $id_output = $this->r_indegree->insert_data($file);
    
    return $id_output;
}
public function count_incloseness($file){
	
    $this->load->library("exec_cli/R_incloseness");
    $ic_output = $this->r_incloseness->insert_data($file);
    
    return $ic_output;
}
//sna_tree	
//判斷樹
public function sna_tree($b_output, $d_output, $p_output, $od_output, $id_output, $ic_output, $usrlist, $webpage_id){
    //儲存
    for($j = 1; $j < count($b_output); $j++){
    
        $b_output_array = array_map('floatval', explode(" ",$b_output[$j]));
        $d_output_array = array_map('floatval', explode(" ",$d_output[$j]));
        $p_output_array = array_map('floatval', explode(" ",$p_output[$j+1]));
        $od_output_array = array_map('floatval', explode(" ",$od_output[$j]));
        $ic_output_array = array_map('floatval', explode(" ",$ic_output[$j]));
        $id_output_array = array_map('floatval', explode(" ",$id_output[$j]));
        $array_count = count($b_output_array);
    
        $stu_list_array = array("");
        $stu_why_array = array();
        $good_usr_list = array();
        
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

            $usr_id = array_search($x, $usrlist);
            
            $query = $this->db->query('SELECT sex FROM public.user ' 
                . 'WHERE user_id =  '.$usr_id);
            $sex_row = $query->row_array();
           
            $stu_why1 = "";
            $stu_why2 = "";
            $stu_why3 = "";
            
            
            if($sex_row['sex'] > 1){
                if($input_b > 0.024469){
                    $stu_status1 = "A";
                }  else {
                    $stu_status1 = "B";
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

                    $usr_name_list = array();
                    
                    for($y = 1; $y < $array_count; $y++){
                        $usr_id2 = array_search($y, $usrlist);

                        $query = $this->db->query('SELECT name FROM public.user WHERE user_id = '.$usr_id2);
                        $row_name2 = $query->row_array();
                        array_push($usr_name_list, $row_name2['name']);
                    }

                    $tags = array_diff($usr_name_list, $who_to_react);
                    if($tags != NULL){
                        $stu_why1 = "過低原因1：別自己埋頭苦幹！多與不同人做回應與互動！（男性betweenness過低）<br>".implode("、",$tags)."<br><br>";
                    }  else {
                        $stu_why1 = "過低原因1：別自己埋頭苦幹！多與不同人做回應與互動！（男性betweenness過低）<br>";    
                    }
               }
        }  else {
            if($input_d > 0.576923){
                $stu_status1 = "B";
                $stu_why1 = "過低原因1：（女性之degree過高）<br>";//濫回?
            }  else {
                if($input_p > 0.035547){
                $stu_status1 = "A";
                }  else {
                    if($input_b > 0.02174){
                    $stu_status1 = "A";
                    } else {
                        $stu_status1 = "B";
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
                        $usr_name_list = array();

                        for($y = 1; $y < $array_count; $y++){
                            $usr_id2 = array_search($y, $usrlist);

                            $query = $this->db->query('SELECT name FROM public.user WHERE user_id = '.$usr_id2);
                            $row_name2 = $query->row_array();
                            array_push($usr_name_list, $row_name2['name']);
                        }

                        $tags = array_diff($usr_name_list, $who_to_react);
                        //$this->none_interection_user_list($usr_id, $webpage_id, $usrlist, $array_count);
                        if($tags != NULL){
                            $stu_why1 = "過低原因1：別自己埋頭苦幹！多與不同人做回應與互動！（女性betweenness過低）<br>";                                
                            //$stu_why1 = "過低原因1：別自己埋頭苦幹！多與不同人做回應與互動！（女性betweenness過低）<br>未互動名單：".implode("、",$tags)."<br><br>";
                        }  else {
                            $stu_why1 = "過低原因1：別自己埋頭苦幹！多與不同人做回應與互動！（女性betweenness過低）<br>";    
                        }
                    }                       
                }                    
            }
        } 
            
        if($sex_row['sex'] > 1){
            if($input_od > 0.333333){
                $stu_status2 = "A";
            }  else {
                $stu_status2 = "B";
                $stu_why2 = "過低原因2：試著多寫些好標註，讓多點人來回應你吧！（男性in-degree過低）<br>";//多跟他人互動,挑出名單?
                
            }
        }  else {
            if($input_id > 0.333333){
                if($input_p > 0.041894){
                   if($input_id > 0.481481){
                        $stu_status2 = "B";
                        $stu_why2 = "過低原因2：（女性，Pagerank過高的情況下，out-degree過高）<br>";
                    }  else {
                        $stu_status2 = "A";
                    }
                }  else {
                    $stu_status2 = "B";
                    $stu_why2 = "過低原因2：看誰的回覆有很多回響，試著去做回應吧！（女性Pagerank過低）<br>";//給熱門標註?讓他做回應
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
                    
                $usr_name_list = array();
                     
                for($y = 1; $y < $array_count; $y++){
                    $usr_id2 = array_search($y, $usrlist);
                     
                    $query = $this->db->query('SELECT name FROM public.user WHERE user_id = '.$usr_id2);
                    $row_name2 = $query->row_array();
                    array_push($usr_name_list, $row_name2['name']);
                }
                     
                $tags = array_diff($usr_name_list, $who_to_react);
                if($tags != NULL){
                    $stu_why3 = "過低原因3：試著多寫些好標註，讓其他人來回應你吧！（Betweenness過低情況下，out-closeness過高）<br>未互動名單：".implode("、",$tags)."<br><br>";
                }  else {
                    $stu_why3 = "過低原因3：試著多寫些好標註，讓其他人來回應你吧！（Betweenness過低情況下，out-closeness過高）<br><br><br>";    
                }
            }  else {
                if($input_ci > 0.5625){
                    $stu_status3 = "A";

                }  else {
                    if($input_p > 0.015601){
                        $stu_status3 = "B";
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
                        $usr_name_list = array();

                        for($y = 1; $y < $array_count; $y++){
                            $usr_id2 = array_search($y, $usrlist);

                            $query = $this->db->query('SELECT name FROM public.user WHERE user_id = '.$usr_id2);
                            $row_name2 = $query->row_array();
                            array_push($usr_name_list, $row_name2['name']);
                        }

                        $tags = array_diff($usr_name_list, $who_to_react);

                        if($tags != NULL){
                            $stu_why3 = "過低原因3：多回覆不同人！（Betweenness與out-closeness過低情況下，Pagerank過高）<br>未互動名單：".implode("、",$tags)."<br><br>";
                        }  else {
                            $stu_why3 = "過低原因3：多回覆不同人！（Betweenness與out-closeness過低情況下，Pagerank過高）<br>";    
                        }
                        
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
            $query = $this->db->query('SELECT name FROM public.user WHERE user_id = '.$usr_id);
            $row_name = $query->row_array();
            array_push($good_usr_list, $row_name['name']);
        }else{
        
            $query = $this->db->query('SELECT name FROM public.user WHERE user_id = '.$usr_id);
            $row_name = $query->row_array();
            array_push($stu_list_array, $row_name['name']);

            if($stu_why1 != "" && $stu_why2 != "" && $stu_why3 != ""){
                array_push($stu_why_array, $row_name['name'], "　　".$stu_why1, "　　".$stu_why2, "　　".$stu_why3);
            }elseif ($stu_why1 != "" && $stu_why2 != "") {
                    array_push($stu_why_array, $row_name['name'], "　　".$stu_why1, "　　".$stu_why2);
                }elseif ($stu_why1 != "" && $stu_why3 != "") {
                    array_push($stu_why_array, $row_name['name'], "　　".$stu_why1, "　　".$stu_why3);
                }elseif ($stu_why2 != "" && $stu_why3 != "") {
                    array_push($stu_why_array, $row_name['name'], "　　".$stu_why2, "　　".$stu_why3);
                }else{
                    //test
                    array_push($stu_why_array, $row_name['name'], "　　".$stu_why1, "　　".$stu_why2, "　　".$stu_why3);
                }
        }            
 }
 
    $data["from_R"] = $stu_list_array;
    
    $data["reason"] = $stu_why_array;
    
    $data["good"] = $good_usr_list;
    
//    $note = array(
//            'from_R' => $data['from_R'],
//            'reason' => $data['reason']
//        );
        
    // $data 寫入 log 資料表中
    $log_action = "sna_counting.cache";
    kals_log($this->db, $log_action, $data);
    
    $log_action = "sna_counting_good.cache";
    kals_log($this->db, $log_action, $data["good"]);
        
    return $data;
	
    }        
}
}

/* End of file sna_counting.php */
/* Location: ./system/application/controllers/web_apps/rest/sna_counting.php */