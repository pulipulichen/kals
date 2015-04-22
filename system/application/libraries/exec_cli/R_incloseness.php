<?php
include_once 'Exec_r.php';
/**
 * R_in-closeness
 *
 * 執行R計算in closeness
 *
 * @package         KALS
 * @category        Libraries
 * @author         red mao hong <r3dmaohong@gmail.com>
 * @copyright       Copyright (c) 2015, red mao hong
 * @license         http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link            https://github.com/pulipulichen/kals
 * @version         1.0 2015/04/22
 */
class R_incloseness extends Exec_r {
    
//    protected $rscript = "D:/incloseness_rscript.r";
//    
//    protected $algorithm = "";
//    protected $options = array();
 
    public function insert_data($file) {

    exec($this->base_command . " system/application/libraries/exec_cli/libraries/R/incloseness_rscript.r $file", $ic_output, $return_var);
    return $ic_output;

}
}
/* End of file Weka.php */
/* Location: ./system/application/libraries/.../Weka.php */
