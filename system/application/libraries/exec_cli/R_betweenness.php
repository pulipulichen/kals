<?php
include_once 'Exec_r.php';
/**
 * R_betweenness
 *
 * 執行R計算betweenness
 *
 * @package         KALS
 * @category        Libraries
 * @author         red mao hong <r3dmaohong@gmail.com>
 * @copyright       Copyright (c) 2015, red mao hong
 * @license         http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link            https://github.com/pulipulichen/kals
 * @version         1.0 2015/04/22
 */
class R_betweenness extends Exec_r {
    
//    protected $rscript = "D:/betweenness_rscript.r";
//    
//    protected $algorithm = "";
//    protected $options = array();
//    
//   public function __construct($input = NULL, $cache_key = NULL, $options = NULL) {
//        $this->set_input($input);
//        $this->set_cache_key($cache_key);
//        $this->set_option($options);
//    }
//    
//    public function set_option($option, $value = NULL) {
//        if (is_null($option)) {
//            return $this;
//        }
//        
//        if (is_array($option)) {
//            $options = $option;
//            foreach ($options AS $option => $value) {
//                $this->set_option($option, $value);
//            }
//            return $this;
//        }
//        
//        $option = trim($option);
//        $value = trim($value);
//        $this->options[$option] = $value;
//        return $this;
//    }
//    
//    public function set_input($input_array) {
//        if (is_null($input_array)) {
//            return $this;
//        }
//        
//        $this->input_array = $input_array;
//        return $this;
//    }
//    
//    public function set_cache_key($key) {
//        if (is_null($key)) {
//            return $this;
//        }
//        
//        $this->cache_key = $key;
//        return $this;
//    }
//    
//    public function get_output() {
////        if ($this->_is_output_cache_expired()) {
////            $output = $this->_execute();
////            
////            $this->_write_output_cache($output);
////        }
////        else {
////            $output = $this->_get_output_cache_content();
////        }
//        
//        $output = $this->_execute();
//        //$output = json_decode($output);
//        return $output;
//    }
//    
//    /**
//     * 過濾最後取得的資訊
//     * 
//     * 請覆寫這段
//     * @param String $output
//     * @return String
//     */
//    protected function _filter_output($output) {
//        return $output;
//    }
//    
//    protected function result_verify() {
//        return TRUE;
//    }
//    
//    protected function threshold_decrease() {
//        return TRUE;
//    }
//
//    // ---------------------------
//        
//    private $jar_path = "system/application/libraries/exec_cli/libraries/weka/weka.jar";
//    
//    private $input_array;
//    private $output_array;
//    private $output_cache;
//    private $checked = FALSE;
//    
//    private $cache_key = "";
//
//    /**
//     * 快取過期的時間，單位是分鐘
//     * @var int
//     */
//    protected $output_cache_expire_limit = 0;
//
//    
//    private function _get_jar_path() {
//        $path = realpath($this->jar_path);
//        //echo $this->jar_path;
//        return $path;
//    }
//    
//    private function _get_cache_key_base() {
//        $key = $this->base_command.".".$this->algorithm.".".$this->cache_key;
//        return $key;
//    }
//    
//    private function _get_cache_key_input() {
//        return $this->_get_cache_key_base().".input.arff";
//    }
//    
//    private function _get_cache_key_output() {
//        return $this->_get_cache_key_base().".output.txt";
//    }
////    
////    private function _get_input_file() {
////        $input_arff = $this->array_to_arff($this->input_array);
////        $input_cache = new Cache_file($this->_get_cache_key_input(), $input_arff, 0);
////        return $input_cache->get_path();
////    }
//    
//    public function set_cache_expire_limit($min) {
//        $this->output_cache_expire_limit = $min;
//        return $this;
//    }
//    
//    
//    private function _get_options_cmd () {
//        $parameters = $this->options;
//        $parameters_cmd = "";
//        foreach ($parameters AS $key => $value) {
//            if ($parameters_cmd != "") {
//                $parameters_cmd .= " ";
//            }
//
//            $parameters_cmd .= "-" . $key;
//
//            if (!is_null($value)) {
//                $parameters_cmd .= " " . $value;
//            }
//        }
//        
//        return $parameters_cmd;
//    }
//    
//    private function _get_command() {
//        $cmd = trim($this->base_command) . " ";
//        
//        $cmd .= $this->rscript . " ";
//        $cmd .= $this->_get_input_file();
//        
//        return $cmd;
//    }
//    
//    private function _execute() {
//        $cmd = $this->_get_command();
//        
//        //echo $cmd;
//        exec($cmd, $output, $return_var);
// 
//    }
//
//    private function _is_output_cache_expired() {
//        if (!isset($this->output_cache)) {
//            $output_key = $this->_get_cache_key_output();
//            $this->output_cache = new Cache_file($output_key);
//        }
//        return $this->output_cache->is_expired();
//    }
//    
//    private function _write_output_cache($content) {
//        $output_key = $this->_get_cache_key_output();
//        $this->output_cache = new Cache_file($output_key, $content, $this->output_cache_expire_limit);
//        $this->output_cache->save();
//        return $this;
//    }
//    
//    private function _get_output_cache_content() {
//        $output_key = $this->_get_cache_key_output();
//        $this->output_cache = new Cache_file($output_key);
//        return $this->output_cache->get_content();
//    }
    public function insert_data($file) {
    
    
    
//        $date = date("Y_m_d_H_i_s");
//        $file = "D:/tmp/output".$date.".csv";
//        
//        $query = $this->db->query('select * from stuin');
//        $row = $query->row_array();
//        $file = "sna".$date.".csv";
//
//        $fp = fopen($file, 'w');
//        foreach ($db_data as $fields) {
//                fputcsv($fp, $fields);
//         }
//
//         fclose($fp);
//            
//        exec("C:/R/bin/Rscript.exe D:/betweenness_rscript.r $file", $b_output, $return_var);
    
    exec($this->base_command . " system/application/libraries/exec_cli/libraries/R/betweenness_rscript.r $file", $b_output, $return_var);
//exec("C:/R/bin/Rscript.exe D:/betweenness_rscript.r $file", $b_output, $return_var);
//    for($j = 1; $j < count($b_output); $j++){
//	$usr_id = 1;
//	$b_output_array = array_map('floatval', explode(" ",$b_output[$j]));	
//        $array_count = count($b_output_array);
//        
//        for($x = 1; $x < $array_count; $x++){
//		$caculateb1 = ($array_count-1) * ($array_count-2);
//		$caculateb2 = $caculateb1 / 2;
//		$input_b = $b_output_array[$x]/$caculateb2;
//		
//                 $data = array(
//               'user_id' => $usr_id,
//               'betweenness' => $input_b
//                );
//                $this->db->insert('stusna', $data);    
//		$usr_id++;
// }
//	
//    }
    return $b_output;

}
}
/* End of file Weka.php */
/* Location: ./system/application/libraries/.../Weka.php */
