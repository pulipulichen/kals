<?php
include_once 'Language_variable.php';
/**
 * Language_variable_speech
 *
 * 模糊語言變數：標註範圍的詞性
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/14 下午 11:32:00
 */
class Language_variable_speech extends Language_variable {

    protected $type_id = 4;
    protected $name = 'langvar.speech';
    protected $renewable = FALSE;
    protected $nominal_feature = TRUE;

    protected function get_feature(Annotation $annotation)
    {
        $feature = $annotation->get_scopes()->get_anchor_speech();
        return $feature;
    }

    /**
     * 預設計算關係度的方法
     * @param Annotation $annotation
     * @return Output_language_variable_collection
     */
    protected function _get_membership_default(Annotation $annotation)
    {
        //請由子類別來覆寫此方法
        $speech_array = $this->get_feature($annotation);

        $this->_CI_load('library', 'fuzzy/Output_language_variable_collection', 'output_language_variable_collection');
        $membership = new Output_language_variable_collection();

        $this->CI->config->load('kals');
        $membership_function_variables = $this->CI->config->item($this->name.'.membership_function_variables');

        $membership->set_memberships(array(1,0,0));
        foreach ($membership_function_variables AS $speech => $ms_var)
        {
            if (in_array($speech, $speech_array))
            {
                $var = $membership_function_variables[$speech];
                $membership->set_memberships($var);
                break;
            }
        }

        return $membership;
    }

}


/* End of file Language_variable_like.php */
/* Location: ./system/application/libraries/fuzzy/Language_variable_like.php */