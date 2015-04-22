<?php
include_once 'Exec_r.php';
/**
 * R_in-degree
 *
 * 執行R計算in degree
 *
 * @package         KALS
 * @category        Libraries
 * @author         red mao hong <r3dmaohong@gmail.com>
 * @copyright       Copyright (c) 2015, red mao hong
 * @license         http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link            https://github.com/pulipulichen/kals
 * @version         1.0 2015/04/22
 */
class R_indegree extends Exec_r {
    
//    protected $rscript = "D:/indegree_rscript.r";
//    
//    protected $algorithm = "";
//    protected $options = array();

    public function insert_data($file) {

    exec("C:/R/bin/Rscript.exe  system/application/libraries/exec_cli/libraries/R/betweenness_rscript.r $file", $id_output, $return_var);
    return $id_output;

}
}
/* End of file Weka.php */
/* Location: ./system/application/libraries/.../Weka.php */
