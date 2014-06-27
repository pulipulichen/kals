<?php
/**
 * QUnit
 *
 * JavaScript的測試環境
 *
 * @package		KALS
 * @category		Unit Tests
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 下午 03:26:32
 */
class QUnit extends Controller {

    public $ut_title;
    public $script;

    function __construct()
    {
        parent::Controller();
        $this->load->helper('unit_test');
        $this->load->helper('url');
    }

    function index() {
        //$this->js_files[] = 'xxs_getter.js';
        //$this->load->view('web_apps/qunit/index.php');
        
        //$this->load();
        $data = array(
            "path_list" => $this->_get_path_list()
        );
        $this->load->view('web_apps/qunit/path_list', $data);
    }
    
    /**
     * 讀取指定路徑的測試檔案
     * @param String $path1
     * @param String $path2
     */
    function load($path1 = NULL, $path2 = NULL, $path3 = NULL) {
        
        $title = $path1;
        $path = $path1;
        if (isset($path1) && isset($path2) && isset($path3)) {
            $path = $path1 . "/" . $path2 . "/" . $path3;
            $title = $path3;
        }
        else if (isset($path1) && isset($path2)) {
            $path = $path1 . "/" . $path2;
            $title = $path2;
        }
        
        $path = ends_strip($path, ".js");
        
        if (ends_with($path, "_test.js") === FALSE) {
            $path = $path . "_test.js";
        }
        
        $data = array(
            'title' => $title
        );
        
        $this->load->view('web_apps/qunit/header.php', $data);
        $this->load->view('web_apps/' . $path, $data);
        $this->load->view('web_apps/qunit/text.php', $data);
        $this->load->view('web_apps/qunit/footer.php');
    }
    
    private function _get_path_list() {
        $root_dir = "./system/application/views/web_apps/";
        
        $this->load->helper('directory');
        
        // 列出該目錄底下的所有檔案
        $files = directory_map($root_dir, false);
        $dir = "";
        
        //print_r($file);
        $test_files = array();
        //test_msg("1");
        $test_files = $this->_get_files_from_dir($test_files, $files);
        /*
        foreach ($files AS $index => $file) {
            if (is_numeric($index)) {
                // 這是一個檔案
                if (ends_with($file, "_test.js")) {
                    $file = ends_strip($file, "_test.js");
                    array_push($test_files, $file);
                }
            }
            else {
                // 這是一個目錄
                $dir_name = $index . "/";
                $dir_array = $file;
                foreach ($dir_array AS $dir_index => $dir_file) {
                    if (is_numeric($dir_index) 
                            && ends_with($dir_file, "_test.js")) {
                        $dir_file = $dir_name . $dir_file;
                        $dir_file = ends_strip($dir_file, "_test.js");
                        array_push($test_files, $dir_file);
                    }
                    else {
                        // 這又是一個目錄
                        
                    }
                }
            }
        }
        */
        //print_r($test_files);
        return $test_files;
    }
    
    private function _get_files_from_dir($result_files, $dir_files, $dir_name = "") {
        //test_msg($dir_name);
        foreach ($dir_files AS $index => $file) {
            if (is_numeric($index)) {
                // 這是一個檔案
                
                if (ends_with($file, "_test.js")) {
                    $file = ends_strip($file, "_test.js");

                    if ($dir_name !== "") {
                        $file = $dir_name . "/" . $file;
                    }

                    array_push($result_files, $file);
                }
            }
            else {
                $deeper_dir_name = $dir_name .$index;
                $deeper_dir_files = $file;
                $result_files = $this->_get_files_from_dir($result_files, $deeper_dir_files, $deeper_dir_name);
            }
        }
        return $result_files;
    }
        
    /*
    public function load($path, $path2 = NULL)
    {
        if (isset($path2))
            $path .= '/'.$path2;

        $this->script = $this->load->view('qunit/'.$path, array('load_raw'=>TRUE), TRUE);
        $this->ut_title = $path;
        if (isset($path2))
            $this->ut_title = $path2;
//        $data = array(
//            'script' => $script
//        );
//        $this->load->view('qunit/qunit_template', $data);
        $this->_public_output();
    }

    public function demo()
    {
       $this->load->view('qunit/demo');
    }

    public function pack($path, $path2 = NULL)
    {
        if (isset($path2))
            $path .= '/'.$path2;

        $this->script = $this->load->view('qunit/'.$path, null, TRUE);
        $this->ut_title = $path;
        if (isset($path2))
            $this->ut_title = $path2;

        $this->_public_output();
    }

    public function setup()
    {
        $path = 'core/KALS_setup';

        $this->script = $this->load->view('qunit/'.$path, array('load_raw'=>TRUE), TRUE);
        $this->ut_title = $path;

        $data = array(
            'title' => get_class($this),
            'function' => $this->ut_title,
            'script' => $this->script
        );
        $this->load->view('qunit/qunit_setup_template', $data);
    }

    function _public_output($output = null)
    {
        if (isset($this->ut_title))
            $this->qunit_report($this, $this->ut_title);
        else
            $this->qunit_report($this);
        //$outout =  . $output;
        //if (isset($output))
        //    echo $output;
    }

    function qunit_report(QUnit &$object, $function_name = NULL)
    {
        $data = array(
            'title' => get_class($object),
            'function' => $function_name,
            'script' => $object->script
        );
        $object->load->view('qunit/qunit_template', $data);
    }
    */
}
/* End of file Utjs.php */
/* Location: ./system/application/controllers/Utjs.php */