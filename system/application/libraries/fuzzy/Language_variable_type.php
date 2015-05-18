<?php
include_once 'Language_variable.php';
/**
 * Language_variable_type
 *
 * 模糊語言變數：標註類型
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/14 下午 11:32:00
 */
class Language_variable_type extends Language_variable {

    protected $type_id = 3;
    protected $name = 'langvar.type';
    protected $renewable = FALSE;
    protected $nominal_feature = TRUE;

    protected function get_feature(Annotation $annotation)
    {
        $feature = $annotation->get_type()->get_type_id();
        return $feature;
    }

}


/* End of file Language_variable_like.php */
/* Location: ./system/application/libraries/fuzzy/Language_variable_like.php */