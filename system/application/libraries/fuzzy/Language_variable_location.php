<?php
include_once 'Language_variable.php';
/**
 * Language_variable_location
 *
 * 模糊語言變數：標註範圍位置
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/14 下午 11:32:00
 */
class Language_variable_location extends Language_variable {

    protected $type_id = 6;
    protected $name = 'langvar.location';
    protected $renewable = FALSE;
    protected $nominal_feature = TRUE;

    protected function get_feature(Annotation $annotation)
    {
        $feature = $annotation->get_feature_location();
        //test_msg('lang location get_feature ' . $annotation->get_id(), $feature);
        return $feature;
    }

    /**
     * 預設計算關係度的方法
     * @param Annotation $annotation
     * @return Output_language_variable_collection
     */
    protected function _get_membership_default(Annotation $annotation)
    {
        $location_array = $this->get_feature($annotation);

        $this->_CI_load('library', 'fuzzy/Output_language_variable_collection', 'output_language_variable_collection');
        $membership = new Output_language_variable_collection();

        $this->CI->config->load('kals');
        $membership_function_variables = $this->CI->config->item($this->name.'.membership_function_variables');

        $membership->set_memberships(array(1,0,0));
        if (is_null($location_array))
            return $menbership;

        //test_msg('lang location ', array(count($location_array), $location_array[0], is_array($location_array)));
        foreach ($membership_function_variables AS $location_id => $ms_var)
        {
            if (in_array($location_id, $location_array) === TRUE)
            {
                $membership->set_memberships($ms_var);
                break;
            }
        }

        return $membership;
    }

}


/* End of file Language_variable_length.php */
/* Location: ./system/application/libraries/fuzzy/Language_variable_length.php */