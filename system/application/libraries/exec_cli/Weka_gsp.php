<?php
include_once 'Weka.php';
/**
 * Weka_gsp
 *
 * weka.associations.GeneralizedSequentialPatterns
 *
 * @package         KALS
 * @category        Libraries
 * @author          Pudding Chen <pulipuli.chhn@gmail.com>
 * @copyright       Copyright (c) 2014, Pudding Chen
 * @license         http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link            https://github.com/pulipulichen/kals
 * @version         1.0 2014/1/17 下午 11:58:09
 */
class Weka_gsp extends Weka {
    
    protected $algorithm = "weka.associations.GeneralizedSequentialPatterns";
    protected $options = array(
        "S" => 0.5,
        "I" => 0,
        "F" => -1
    );
    
    private $step_min = 7;
    
    /**
     * 設定最小執行的步驟
     * @param int $min
     */
    public function set_step_min($min) {
        $this->step_min = $min;
    }

    protected function threshold_decrease() {
        
        $this->options["S"] = $this->options["S"] - 0.05;
        echo $this->options["S"] . " | "; 
        return ($this->options["S"] > 0.06) ;
    }
    
    protected function result_verify($result) {
        $result = json_decode($result);
        return (count($result) > $this->step_min);
    }

    protected function _filter_output($output) {
        
        $debug = FALSE;
        //$debug = TRUE;
        
        $result = $output;
        
        if ($debug) {
            print_r($output);
        }
        
        $pattern_line = null;
        $patterns_array = array();
        foreach ($result AS $line) {
            $line = trim($line);
            if ($line == "") {
                continue;
            }
            if ($line == "=== Evaluation ===") {
                //$line
                $start_pos = strpos($pattern_line, "{")+1;
                $end_pos = strrpos($pattern_line, "}");
                $pattern_line = substr($pattern_line, $start_pos, ($end_pos - $start_pos));
                $pattern_line = str_replace("{", "", $pattern_line);
                $patterns_array = explode("}", $pattern_line);
                break;
            }
            $pattern_line = $line;
        }
        
        $output = json_encode($patterns_array);
        
        if ($debug) {
            $output;
        }
        
        return parent::_filter_output($output);
    }
}

/* End of file Weka_gsp.php */
/* Location: ./system/application/libraries/.../Weka_gsp.php */