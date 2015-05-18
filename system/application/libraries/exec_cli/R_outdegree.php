<?php
include_once 'Exec_r.php';
/**
 * R_outdegree
 *
 * 執行R計算outdegree
 *
 * @package         KALS
 * @category        Libraries
 * @author         red mao hong <r3dmaohong@gmail.com>
 * @copyright       Copyright (c) 2015, red mao hong
 * @license         http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link            https://github.com/pulipulichen/kals
 * @version         1.0 2015/04/22
 */
class R_outdegree extends Exec_r {
    
//    protected $rscript = "D:/outdegree_rscript.r";
//    
//    protected $algorithm = "";
//    protected $options = array();

    public function insert_data($file) {
        
//        $CI =& get_instance();
//        $CI->load->config('sna_analysis');
//        $this->base_command = $CI->config->item("r_base_command");
        //throw  new Exception($this->base_command);


        exec($this->base_command . " system/application/libraries/exec_cli/libraries/R/outdegree_rscript.r $file", $od_output, $return_var);

        return $od_output;

    }
}
/* End of file Weka.php */
/* Location: ./system/application/libraries/.../Weka.php */
