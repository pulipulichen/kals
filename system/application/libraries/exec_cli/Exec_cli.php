<?php
include_once 'Cache_file.php';
/**
 * Exec_cli
 *
 * 可外部執行的CLI
 *
 * @package         KALS
 * @category        Libraries
 * @author          Pudding Chen <pulipuli.chhn@gmail.com>
 * @copyright       Copyright (c) 2014, Pudding Chen
 * @license         http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link            https://github.com/pulipulichen/kals
 * @version         1.0 2014/1/17 上午 11:00:25
 */
class Exec_cli extends KALS_object {
    
    protected $base_commmand = "";
    protected $command = "";


    public function append_command($cmd) {
        if ($this->commmand != "") {
            $this->commmand .= " ";
        }
        $this->commmand .= $cmd;
    }
    
    public function get_command () {
        return $this->base_commmand . " " . $this->commmand;
    }
    
    public function executable() {
        return FALSE;
    }
}

/* End of file Exec_cli.php */
/* Location: ./system/application/libraries/.../Exec_cli.php */