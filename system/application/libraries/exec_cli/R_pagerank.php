<?php
include_once 'Exec_r.php';
/**
 * R_pagerank
 *
 * 執行R計算pagerank
 *
 * @package         KALS
 * @category        Libraries
 * @author         red mao hong <r3dmaohong@gmail.com>
 * @copyright       Copyright (c) 2015, red mao hong
 * @license         http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link            https://github.com/pulipulichen/kals
 * @version         1.0 2015/04/22
 */
class R_pagerank extends Exec_r {
    
//    protected $rscript = "D:/pagerank_rscript.r";
//    
//    protected $algorithm = "";
//    protected $options = array();
    
    public function insert_data($file) {

    exec("C:/R/bin/Rscript.exe  system/application/libraries/exec_cli/libraries/R/pagerank_rscript.r $file", $p_output, $return_var);
    return $p_output;

}
}
/* End of file Weka.php */
/* Location: ./system/application/libraries/.../Weka.php */
