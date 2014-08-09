<?php
include_once 'web_apps_controller.php';
/**
 * style
 *
 * style full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/11/18 上午 05:41:28
 */

class style extends Web_apps_controller {

    protected $controller_enable_cache = FALSE;
    protected $login_require = FALSE;

    function __construct() {
        parent::__construct();
    }

    public function custom($json) {

        $output = '';

        $data = json_decode($json, TRUE);

        foreach ($data AS $d)
        {
            $selector = $d['selector'];
            $rule = $d['rule'];

            $rule = $this->_create_rule($selector, $rule);

            $output = $output . $rule;
        }

        send_css_header($this->output);
        $this->load->view('web_apps/display', array('data'=>$output));
    }

    private function _create_rule($selector, $rule)
    {

        if (is_array($selector))
        {
            $temp = '';
            foreach ($selector AS $s)
            {
                if ($temp != '')
                    $temp = $temp . ', ';
                $temp = $temp . $s;
            }
            $selector = $temp;
        }

        if (is_array($rule))
        {
            $style_temp = '';
            $first = true;
            foreach ($rule AS $field => $value)
            {
                $formal_field = str_replace('_', '-', $field);
                $r = $formal_field . ':' . $value;

                if ($first == false)
                    $style_temp = $style_temp . '; ';
                $style_temp = $style_temp . $r;
                $first = false;
            }
            $rule = $style_temp;
        }
        else if (is_string($rule))
        {
            $rule = trim($rule);
            if (substr($rule, 0, 1) == '{')
                $rule = substr($rule, 1, strlen($rule));

            if (substr($rule, -1) == '}')
                $rule = substr($rule, 0, strlen($rule)-1);
        }

        $rule = $selector . '{' . $rule . '}';
        return $rule;
    }
}

/* End of file style.php */
/* Location: ./system/application/controllers/style.php */