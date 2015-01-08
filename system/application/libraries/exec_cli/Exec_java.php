<?php
include_once 'Exec_cli.php';
/**
 * Exec_java
 *
 * 執行Java
 *
 * @package         KALS
 * @category        Libraries
 * @author          Pudding Chen <pulipuli.chhn@gmail.com>
 * @copyright       Copyright (c) 2014, Pudding Chen
 * @license         http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link            https://github.com/pulipulichen/kals
 * @version         1.0 2014/1/17 上午 11:07:24
 */
class Exec_java extends Exec_cli {

    protected $base_command = "java";
    
    public function executable() {
        exec($this->base_commmand, $output, $return_var);
        return ($return_var === 0);
    }
}

/* End of file Exec_java.php */
/* Location: ./system/application/libraries/.../Exec_java.php */