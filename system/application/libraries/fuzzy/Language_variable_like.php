<?php
include_once 'Language_variable.php';
/**
 * Language_variable_like
 *
 * 模糊語言變數：喜愛
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/14 下午 11:32:00
 */
class Language_variable_like extends Language_variable {

    protected $type_id = 2;
    protected $name = 'langvar.like';
    protected $renewable = TRUE;
    protected $nominal_feature = FALSE;

    protected function get_feature(Annotation $annotation)
    {
        $feature = $annotation->get_like_count();
        return $feature;
    }

}


/* End of file Language_variable_like.php */
/* Location: ./system/application/libraries/fuzzy/Language_variable_like.php */