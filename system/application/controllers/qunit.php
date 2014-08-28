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

    function index()
    {
        //$this->js_files[] = 'xxs_getter.js';
        $this->load->view('qunit/index.php');
    }

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
}
/* End of file Utjs.php */
/* Location: ./system/application/controllers/Utjs.php */