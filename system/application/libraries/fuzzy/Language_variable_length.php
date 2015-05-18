<?php
include_once 'Language_variable.php';
/**
 * Language_variable_length
 *
 * 模糊語言變數：標註範圍長度
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/14 下午 11:32:00
 */
class Language_variable_length extends Language_variable {

    protected $type_id = 5;
    protected $name = 'langvar.length';
    protected $renewable = FALSE;
    protected $nominal_feature = FALSE;

    protected function get_feature(Annotation $annotation)
    {
        $feature = $annotation->get_scopes()->get_scope_length();
        return $feature;
    }

}


/* End of file Language_variable_length.php */
/* Location: ./system/application/libraries/fuzzy/Language_variable_length.php */