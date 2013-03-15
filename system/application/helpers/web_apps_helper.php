<?php
/**
 * web_apps_helper
 *
 * 剖析回呼函式(callback)名稱，並將輸入參數以JSON的方式回傳。
 * 這個作法來自於Simple Complexity http://tiramisu1983.spaces.live.com/blog/cns!A030B8E246FEC75B!1164.entry
 *
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://pulipuli.blogspot.com/
 * @version		1.0 2010/6/22 下午 02:07:49
 */


if ( ! function_exists('json_to_object'))
{
    function json_to_object($json)
    {
        return json_decode($json);
    }
}

if ( ! function_exists('json_to_array'))
{
    function json_to_array($json)
    {
        if (is_object($json))
            return (array) $json;
        if (is_array($json))
            return $json;
        else
            return json_decode($json, TRUE);
    }
}

if ( ! function_exists('display_jsonp'))
{
    function display_jsonp($callback, $json)
    {
        $json = json_encode($json);
        $pos = stripos($callback, '='); // 取得 = 號的位置
        $jsonp = ($pos === false) ?  '' : substr($callback, $pos+1);  // 擷取 = 後面的字串
        echo "{$jsonp}({$json})"; // 輸出
    }
}

if ( ! function_exists('send_js_header'))
{
    function send_js_header(CI_Output $output)
    {
        //header('Content-type: text/javascript');
        $header = 'Content-type: text/javascript';
        $output->set_header($header, TRUE);
    }
}

if ( ! function_exists('send_css_header'))
{
    function send_css_header(CI_Output $output)
    {
        //header('Content-type: text/css');
        $header = 'Content-type: text/css';
        $output->set_header($header, TRUE);
    }
}

if ( ! function_exists('send_png_header'))
{
    function send_png_header(CI_Output $output)
    {
        //header('Content-type: text/css');
        $header = 'Content-type: image/png';
        $output->set_header($header, TRUE);
    }
}

if ( ! function_exists('create_json_excpetion'))
{
    function create_json_excpetion($header, $message)
    {
        $data = array(
            'exception' => array(
                'heading' => $header,
                'message' => $message,
                'request_uri' => get_referer_url(FALSE)
            )
        );
        
        //log區
        $array_data = $data;

        $user = get_context_user();
        $user_id = NULL;
        if (isset($user))
            $user_id = $user->get_id();

        $action = 27;
        $CI =& get_instance();
        kals_log($CI->db, $action, array('memo'=>$array_data, 'user_id' => $user_id));
        context_complete();

        return $data;
    }
}

if ( ! function_exists('get_client_ip'))
{
    function get_client_ip()
    {
        $myip = NULL;
        if (empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $myip = $_SERVER['REMOTE_ADDR'];
        } else {
            $myip = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $myip = $myip[0];
        }
        return $myip;
    }
}

/*if ( ! function_exists('get_tscore'))
{
    function get_tscore()
    {
		$CI =& get_instance();
        
		$sql88 = "SELECT t_score FROM top";
               
        $arr88 = pg_query($CI->db, $sql88);
        
		$data88 = pg_fetch_all_columns($arr88, pg_field_num($arr88, 't_score'));

		return $data88;

    }
}*/

if ( ! function_exists('kals_log'))
{
    function kals_log($db, $action, $data = array())
    {
        $url = get_referer_url(FALSE);

        $webpage_id = NULL;
        if ($url !== FALSE)
        {
            /*
            $CI =& get_instance();
            if (isset($CI->webpage) == FALSE || is_null($CI->webpage))
                $CI->load->library('kals_resource/Webpage');
            $webpage_id = $CI->webpage->filter_webpage_id($url);
             */
            //$webpage_id = get_context_webpage()->get_id();
        }
        
        $user_id = NULL;
        $memo = NULL;

        if (isset($data['user_id']))
            $user_id = $data['user_id'];
        if (isset($data['memo']))
        {
            $memo = $data['memo'];
            if (is_array($memo) || is_object($memo))
            {
                $memo = json_encode($memo);
            }

            if ($memo == '')
                $memo = NULL;
        }

        $db->insert('log', array(
            'webpage_id' => $webpage_id,
            'user_id' => $user_id,
            'user_ip' => get_client_ip(),
            'action'=> $action,
            'note'=>$memo
        ));
    }
}

if ( ! function_exists('kals_log2'))
{
    function kals_log2($db, $action, $topic_id, $data = array())
    {
        //$url = get_referer_url(FALSE);


        
        $user_id = NULL;
        
        //$topic_id = NULL;
        

       
        if (isset($data['user_id']))
            $user_id = $data['user_id'];
            

 
        $db->insert('top', array(
            //'webpage_id' => $webpage_id,
            'user_id' => $user_id,
            'topic_id' => $topic_id,
            'action'=> $action,
            'count' => 1
            //'note'=>$memo
        ));
        
        $cchaha2 = "now()";
        
        $sql2 = "UPDATE top SET top_c = extract(epoch FROM ($cchaha2 - create_timestamp) / count) , top_u = extract(epoch FROM $cchaha2 - u_time)";
        
        $db->query($sql2);
        
               $sql3 = "UPDATE top SET a_score = score.score FROM score WHERE topic_id = score.annotation_id AND score.score_type_id = 0";
               
        $db->query($sql3);
        
        
    }
}
if ( ! function_exists('kals_log3'))
{
    function kals_log3($db, $topic_id)
    {

        $cchaha = "now()";


        $sql2 = "UPDATE top SET top_c = extract(epoch FROM ($cchaha - create_timestamp) / count) , top_u = extract(epoch FROM $cchaha - u_time)";
        
        $db->query($sql2);
        
        
        $sql = "UPDATE top SET u_time = $cchaha , count = count + 1 WHERE topic_id = $topic_id";
        
        $db->query($sql);
        
       $sql3 = "UPDATE top SET a_score = score.score FROM score WHERE topic_id = score.annotation_id AND score.score_type_id = 0";
               
        $db->query($sql3);
        
        

        
        //$this->_CI_load('library', 'fuzzy/Clustering', 'clustering');
        $CI =& get_instance();
        $CI->load->library('fuzzy/Clustering', 'clustering');
        $clustering = Clustering::get_clustering();
        $clustering2 = Clustering::get_clustering();


        $sql4 = "SELECT top_c, top_u FROM top ORDER BY create_timestamp";
               

        $arr = pg_query($sql4);
        

        //$data =array(3, 3, 3, 2, 2, 2, 1, 1, 1);

		$data = pg_fetch_all_columns($arr, pg_field_num($arr, 'top_c'));
		$data2 = pg_fetch_all_columns($arr, pg_field_num($arr, 'top_u'));

        //$sql999 = "SELECT MIN(top_c) FROM top";
        //$abc = pg_query($sql999);
        //$data999 = pg_fetch_row($abc);

                
        $clustering->set_data($data);
        $clustering->set_clusters_number(3);
        $result = $clustering->get_result();
        $positions = $clustering->get_result_positions();
        
        $db->update('c_score', array(
            'c1' => $positions[0],
            'c2' => $positions[1],
            'c3' => $positions[2]
         ));
         
        $clustering2->set_data($data2);
        $clustering2->set_clusters_number(3);
        $result2 = $clustering2->get_result();
        $positions2 = $clustering2->get_result_positions();
        
        $db->update('c_score', array(
            'uc1' => $positions2[0],
            'uc2' => $positions2[1],
            'uc3' => $positions2[2]
         ));

         
         
         
        //$sql99 = "SELECT top_c FROM top";
        //$ccc = pg_query($sql99);
        //$cccc = pg_fetch_all_columns($ccc, pg_field_num($ccc, 'top_c'));

        for($j = 0; $j < count($data); $j++){
        	
			$t1 = $data[$j];
			$t2 = $data2[$j];   
        	fuzzy_score($db, $t1, $t2);
        }
		
        $sq = "UPDATE top SET t_score = a_score * f_score";
               
        $db->query($sq);
         
    }
    
}


//模糊推論器 	
if ( ! function_exists('fuzzy_score'))
{
    function fuzzy_score($db, $t1, $t2)
    {
    	//$sqla1 = "SELECT c1 FROM c_score";         
        $ccc1 = pg_query("SELECT c1 FROM c_score");
        $cc1 = pg_fetch_row($ccc1);
        $c1 = $cc1[0];
        //$sqla2 = "SELECT c2 FROM c_score";         
        $ccc2 = pg_query("SELECT c2 FROM c_score");
        $cc2 = pg_fetch_row($ccc2);
        $c2 = $cc2[0];
        //$sqla3 = "SELECT c3 FROM c_score";         
        $ccc3 = pg_query("SELECT c3 FROM c_score");
        $cc3 = pg_fetch_row($ccc3);
        $c3 = $cc3[0];        
        
        //$sqla4 = "SELECT uc1 FROM c_score";         
        $uccc1 = pg_query("SELECT uc1 FROM c_score");
        $ucc1 = pg_fetch_row($uccc1);
        $uc1 = $ucc1[0];               
        //$sqla5 = "SELECT uc2 FROM c_score";         
        $uccc2 = pg_query("SELECT uc2 FROM c_score");
        $ucc2 = pg_fetch_row($uccc2);
        $uc2 = $ucc2[0];           
        //$sqla6 = "SELECT uc3 FROM c_score";         
        $uccc3 = pg_query("SELECT uc3 FROM c_score");
        $ucc3 = pg_fetch_row($uccc3);
        $uc3 = $ucc3[0];             
    
        //$sqla7 = "SELECT MIN(top_c) FROM top";         
        $ccmin1 = pg_query("SELECT MIN(top_c) FROM top");
        $cmin1 = pg_fetch_row($ccmin1);
        $min1 = $cmin1[0];          
        //$sqla8 = "SELECT MAX(top_c) FROM top";         
        $ccmax1 = pg_query("SELECT MAX(top_c) FROM top");
        $cmax1 = pg_fetch_row($ccmax1);
        $max1 = $cmax1[0];         
        //$sqla9 = "SELECT MIN(top_u) FROM top";         
        $ccmin2 = pg_query("SELECT MIN(top_u) FROM top");
        $cmin2 = pg_fetch_row($ccmin2);
        $min2 = $cmin2[0];             
        //$sqla10 = "SELECT MAX(top_u) FROM top";         
        $ccmax2 = pg_query("SELECT MAX(top_u) FROM top");
        $cmax2 = pg_fetch_row($ccmax2);
        $max2 = $cmax2[0];        
        
    	$vlcd = array(0, 0.25, 0, 0, 0);
		$lcd = array(0, 0.25, 0.5, 0, 0);
		$mcd = array(0, 0.25, 0.5, 0.75, 0);
		$hcd = array(0, 0, 0.5, 0.75, 1);
		$vhcd = array(0, 0, 0, 0.75, 1);
		
		/*
		$fout_put = float();
		float = map_i, v_i, area, score;
		float = t001;
		float $c1, $c2, $c3, $uc1, $uc2, $uc3;
		float $min1, $max1, $min2, $max2;
		float $ct_s, $ct_m, $ct_l, $ut_s, $ut_m, $ut_l;
		float $o_score = array();
		*/

//void FC_out(float $t1, float $t2){

//t1 is S
	if($t1 >= $min1 && $t1 <= $c2)
		@$ct_s = ($c2 - $t1) / ($c2 - $min1);

//t1 is M
	if($t1 >= $c1 && $t1 <= $c2)
		@$ct_m = ($t1 - $c1) / ($c2 - $c1);
	if($t1 > $c2 && $t1 <= $c3)
		@$ct_m = ($c3 - $t1) / ($c3 - $c2);

//t1 is L
	if($t1 >= $c2 && $t1 <= $max1)
		@$ct_l = ($t1 - $c2) / ($max1 - $c2);

//t2 is S
	if($t2 >= $min2 && $t2 <= $uc2)
		@$ut_s = ($uc2 - $t2) / ($uc2 - $min2);

//t2 is M
	if($t2 >= $uc1 && $t2 <= $uc2)
		@$ut_m = ($t2 - $uc1) / ($uc2 - $uc1);
	if($t2 > $uc2 && $t2 <= $uc3)
		@$ut_m = ($uc3 - $t2) / ($uc3 - $uc2);

//t2 is L
	if($t2 >= $uc2 && $t2 <= $max2)
		@$ut_l = ($t2 - $uc2) / ($max2 - $uc2);

// Rule1 t1 is S , t2 is S = vhcd
		$t001 = min(@$ct_s, @$ut_s);
	if($t001 !== 0.0){
		for($i = 0; $i < 5; $i++){
			$map_i = $vhcd[$i];
			@$o_score[$i] = max($o_score[$i], min($t001, $map_i));
		}
	}

//Rule2 t1 is M, t2 is S = hcd
		$t001 = min(@$ct_m, @$ut_s);
	if($t001 !== 0.0){
		for($i = 0; $i < 5; $i++){
			$map_i = $hcd[$i];
			$o_score[$i] = max($o_score[$i], min($t001, $map_i));
		}
	}

//Rule3 t1 is L, t2 is S = mcd
		$t001 = min(@$ct_l, @$ut_s);
	if($t001 !== 0.0){
		for($i = 0; $i < 5; $i++){
			$map_i = $mcd[$i];
			$o_score[$i] = max($o_score[$i], min($t001, $map_i));
		}
	}
	
//Rule4 t1 is S, t2 is M = hcd
		$t001 = min(@$ct_s, @$ut_m);
	if($t001 !== 0.0){
		for($i = 0; $i < 5; $i++){
			$map_i = $hcd[$i];
			$o_score[$i] = max($o_score[$i], min($t001, $map_i));
		}
	}

//Rule5 t1 is M, t2 is M = mcd
		$t001 = min(@$ct_m, @$ut_m);
	if($t001 !== 0.0){
		for($i = 0; $i < 5; $i++){
			$map_i = $mcd[$i];
			$o_score[$i] = max($o_score[$i], min($t001, $map_i));
		}
	}

//Rule6 t1 is L, t2 is M = lcd
		$t001 = min(@$ct_l, @$ut_m);
	if($t001 !== 0.0){
		for($i = 0; $i < 5; $i++){
			$map_i = $lcd[$i];
			$o_score[$i] = max($o_score[$i], min($t001, $map_i));
		}
	}

//Rule7 t1 is S, t2 is L = mcd
		$t001 = min(@$ct_s, @$ut_l);
	if($t001 !== 0.0){
		for($i = 0; $i < 5; $i++){
			$map_i = $mcd[$i];
			$o_score[$i] = max($o_score[$i], min($t001, $map_i));
		}
	}

//Rule8 t1 is M, t2 is L = lcd
		$t001 = min(@$ct_m, @$ut_l);
	if($t001 !== 0.0){
		for($i = 0; $i < 5; $i++){
			$map_i = $lcd[$i];
			$o_score[$i] = max($o_score[$i], min($t001, $map_i));
		}
	}

//Rule9 t1 is L, t2 is L = vlcd
		$t001 = min(@$ct_l, @$ut_l);
	if($t001 !== 0.0){
		for($i = 0; $i < 5; $i++){
			$map_i = $vlcd[$i];
			$o_score[$i] = max($o_score[$i], min($t001, $map_i));
		}
	}

//計算score
		$v_i = array(0, 0.25, 0.5, 0.75, 1);
	for($i = 0; $i < 5; $i++){
		@$map_i = $o_score[$i];
		@$area = $area + $map_i;
		@$moment = @$moment + ($map_i * $v_i[$i]);
	}
	if($area == 0)
		$fout_put = 1;
	else
		$fout_put = ($moment / $area);
//}
    
		$sqq = "UPDATE top SET f_score = $fout_put WHERE top_c = $t1";
               
        $db->query($sqq);
            //$db->update('top', array(
            //	'f_score' => $fout_put
         	//));
        
    }
}
/* End of file web_apps_helper.php */
/* Location: ./system/application/helpers/web_apps_helper.php */