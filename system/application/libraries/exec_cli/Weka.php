<?php
include_once 'Exec_java.php';
/**
 * Weka
 *
 * 執行Weka
 *
 * @package         KALS
 * @category        Libraries
 * @author          Pudding Chen <pulipuli.chhn@gmail.com>
 * @copyright       Copyright (c) 2014, Pudding Chen
 * @license         http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link            https://github.com/pulipulichen/kals
 * @version         1.0 2014/1/17 下午 08:29:12
 */
class Weka extends Exec_java {

    protected $algorithm = "";
    protected $options = array();
    
    public function __construct($input = NULL, $cache_key = NULL, $options = NULL) {
        $this->set_input($input);
        $this->set_cache_key($cache_key);
        $this->set_option($options);
    }
    
    public function set_option($option, $value = NULL) {
        if (is_null($option)) {
            return $this;
        }
        
        if (is_array($option)) {
            $options = $option;
            foreach ($options AS $option => $value) {
                $this->set_option($option, $value);
            }
            return $this;
        }
        
        $option = trim($option);
        $value = trim($value);
        $this->options[$option] = $value;
        return $this;
    }
    
    public function set_input($input_array) {
        if (is_null($input_array)) {
            return $this;
        }
        
        $this->input_array = $input_array;
        return $this;
    }
    
    public function set_cache_key($key) {
        if (is_null($key)) {
            return $this;
        }
        
        $this->cache_key = $key;
        return $this;
    }
    
    public function get_output() {
        if ($this->_is_output_cache_expired()) {
            $output = $this->_execute();
            
            $this->_write_output_cache($output);
        }
        else {
            $output = $this->_get_output_cache_content();
        }
        
        $output = json_decode($output);
        return $output;
    }
    
    /**
     * 過濾最後取得的資訊
     * 
     * 請覆寫這段
     * @param String $output
     * @return String
     */
    protected function _filter_output($output) {
        return $output;
    }
    
    protected function result_verify() {
        return TRUE;
    }
    
    protected function threshold_decrease() {
        return TRUE;
    }

    // ---------------------------
        
    private $jar_path = "system/application/libraries/exec_cli/libraries/weka/weka.jar";
    
    private $input_array;
    private $output_array;
    private $output_cache;
    private $checked = FALSE;
    
    private $cache_key = "";

    /**
     * 快取過期的時間，單位是分鐘
     * @var int
     */
    protected $output_cache_expire_limit = 0;

    
    private function _get_jar_path() {
        $path = realpath($this->jar_path);
        //echo $this->jar_path;
        return $path;
    }
    
    private function _get_cache_key_base() {
        $key = $this->base_command.".".$this->algorithm.".".$this->cache_key;
        return $key;
    }
    
    private function _get_cache_key_input() {
        return $this->_get_cache_key_base().".input.arff";
    }
    
    private function _get_cache_key_output() {
        return $this->_get_cache_key_base().".output.txt";
    }
    
    private function _get_input_file() {
        $input_arff = $this->array_to_arff($this->input_array);
        $input_cache = new Cache_file($this->_get_cache_key_input(), $input_arff, 0);
        return $input_cache->get_path();
    }
    
    public function set_cache_expire_limit($min) {
        $this->output_cache_expire_limit = $min;
        return $this;
    }
    
    
    private function _get_options_cmd () {
        $parameters = $this->options;
        $parameters_cmd = "";
        foreach ($parameters AS $key => $value) {
            if ($parameters_cmd != "") {
                $parameters_cmd .= " ";
            }

            $parameters_cmd .= "-" . $key;

            if (!is_null($value)) {
                $parameters_cmd .= " " . $value;
            }
        }
        
        return $parameters_cmd;
    }
    
    private function _get_command() {
        $cmd = trim($this->base_command) . " ";
        
        $cmd .= "-classpath " . $this->_get_jar_path() . " ";
        $cmd .= $this->algorithm . " ";
        $cmd .= $this->_get_options_cmd() . " ";
        
        $cmd .= "-t " . $this->_get_input_file();
        
        return $cmd;
    }
    
    private function _execute() {
        $cmd = $this->_get_command();
        
        //echo $cmd;
        exec($cmd, $output, $return_var);
        
        if ($return_var !== 0) {
            throw new Exception("Weka execute failed! ($return_var)");
            return FALSE;
        }
        else {
            $output = $this->_filter_output($output);
            
            if (FALSE === $this->result_verify($output)) {
                if ($this->threshold_decrease()) {
                    return $this->_execute();
                }
                else {
                    return $output;
                }
            }
            
            return $output;
        }
    }

    public function array_to_arff($data_array) {
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

    private function _is_output_cache_expired() {
        if (!isset($this->output_cache)) {
            $output_key = $this->_get_cache_key_output();
            $this->output_cache = new Cache_file($output_key);
        }
        return $this->output_cache->is_expired();
    }
    
    private function _write_output_cache($content) {
        $output_key = $this->_get_cache_key_output();
        $this->output_cache = new Cache_file($output_key, $content, $this->output_cache_expire_limit);
        $this->output_cache->save();
        return $this;
    }
    
    private function _get_output_cache_content() {
        $output_key = $this->_get_cache_key_output();
        $this->output_cache = new Cache_file($output_key);
        return $this->output_cache->get_content();
    }
    
        }

/* End of file Weka.php */
/* Location: ./system/application/libraries/.../Weka.php */