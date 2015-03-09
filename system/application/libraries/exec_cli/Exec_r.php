<?php
include_once 'Exec_cli.php';
/**
 * Exec_r
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
class Exec_r extends Exec_cli {

    protected $base_command = "C:/R/bin/Rscript.exe";
    protected $rscript = "";
            
    public function executable() {
        
        
        exec($this->base_command . " " . $this->rscript, $output, $return_var);
        return ($return_var === 0);
    }
    
    public function array_to_csv($data_array) {
        return "D:\\tmp\\o1u2qtput.csv";
        /*
        @relation annotation

        @attribute user_id {1701, 2002}
        @attribute scope {0, 1, 2, 7, 10, 12}
        @data
        1701,1
        1701,0
        1701,1
        1701,0
        1701,10
        1701,0
        2002,1
        2002,12
        2002,10
        2002,2
        2002,7
         * 
         */
        
        $attrs = array(
        );

        foreach ($data_array AS $item) {
            foreach ($item AS $field_id => $value) {
                if (array_key_exists($field_id, $attrs) === false) {
                    $attrs[$field_id] = array();
                }

                if (in_array($value, $attrs[$field_id]) === false) {
                    $attrs[$field_id][] = $value;
                }
            }
        }

        // output

        $arff_text = "";

        $attrs_text = "@relation annotation\n";
        foreach ($attrs AS $field_id => $value) {
            $value_array = implode(",", $value);
            $attrs_text .= "@attribute $field_id {".$value_array."}\n";
        }
        $arff_text .= $attrs_text;

        $data_text = "@data\n";
        foreach ($data_array AS $value) {
            $value_array = implode(",", $value);
            $data_text .= "$value_array\n";
        }
        $arff_text .= $data_text;
        
        return $arff_text;
    }
    
    
    protected function _get_input_file() {
        return "D:\\tmp\\o1u2qtput.csv";
        
        $input_arff = $this->array_to_arff($this->input_array);
        $input_cache = new Cache_file($this->_get_cache_key_input(), $input_arff, 0);
        return $input_cache->get_path();
    }
}

/* End of file Exec_java.php */
/* Location: ./system/application/libraries/.../Exec_java.php */