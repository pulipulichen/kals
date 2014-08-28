<?php
/**
 * unit_test_helper
 *
 * unit_test_helper full description.
 *
 * @package		KALS
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/22 下午 02:07:49
 */

if ( ! function_exists('unit_test_report'))
{
    function unit_test_report(&$object, $function_name = NULL)
    {
        $data = array(
            'title' => get_class($object),
            'unit' => $object->unit,
            'function' => $function_name
        );
        $object->load->view('misc/unit_test', $data);
    }
}

if ( ! function_exists('qunit_report'))
{
    function qunit_report(QUnit &$object, $function_name = NULL)
    {
        $data = array(
            'title' => get_class($object),
            'function' => $function_name,
            'script' => $object->script
        );
        return $object->load->view('qunit/qunit_template', $data, TRUE);
    }
}

if ( ! function_exists('load_scripts'))
{
    function load_scripts($scripts, $load_raw = FALSE)
    {
        if (FALSE === is_array($scripts))
            $scripts = array($scripts);
        
        foreach ($scripts AS $script)
        {
            //echo '<script type="text/javascript" src="'.base_url().'libraries/'.$script.'.js"></script>'."\n";
            if ($load_raw === FALSE OR is_null($load_raw))
                echo '<script type="text/javascript" src="'.base_url().'web_apps/web_apps_controller/pack_js/'.$script.'"></script>'."\n";
            else
                echo '<script type="text/javascript" src="'.base_url().'web_apps/web_apps_controller/load_js/'.$script.'"></script>'."\n";
        }
    }
}

if ( ! function_exists('load_package'))
{
    function load_package()
    {
        echo '<script type="text/javascript" src="'.base_url().'web_apps/generic/package"></script>'."\n";
    }
}

if ( ! function_exists('load_toolkit'))
{
    function load_toolkit()
    {
        echo '<script type="text/javascript" src="'.base_url().'web_apps/generic/toolkit"></script>'."\n";
    }
}

if ( ! function_exists('load_core'))
{
    function load_core()
    {
        //echo '<script type="text/javascript" src="'.base_url().'web_apps/generic/core"></script>'."\n";
        echo '<script type="text/javascript">
$.getScript("'.base_url().'web_apps/generic/core");
</script>';
    }
}

if ( ! function_exists('load_component'))
{
    function load_component()
    {
        echo '<script type="text/javascript" src="'.base_url().'web_apps/generic/component"></script>'."\n";
    }
}

if ( ! function_exists('load_styles'))
{
    function load_styles($styles = NULL, $load_raw = FALSE)
    {
        if (FALSE === is_array($styles) && isset($styles))
            $styles = array($styles);

        if (isset($styles))
        {
            foreach ($styles AS $style)
            {
                if ($load_raw === FALSE OR is_null($load_raw))
                    echo '<link type="text/css" rel="stylesheet" href="'.base_url ().'web_apps/web_apps_controller/pack_css/'.$style.'" />'."\n";
                else
                    echo '<link type="text/css" rel="stylesheet" href="'.base_url ().'web_apps/web_apps_controller/load_css/'.$style.'" />'."\n";
            }
        }
        else
        {
            //如果沒有預定要load哪一個style，則讀取generic的style吧
             echo '<link type="text/css" rel="stylesheet" href="'.base_url ().'web_apps/generic/style" />'."\n";
        }
    }
}

/* End of file unit_test_helper.php */
/* Location: ./system/application/helpers/unit_test_helper.php */