<?php
include_once 'Tip.php';
/**
 * Tip_location
 *
 * 標註建議的提示：位置
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/17 下午 10:32:15
 * @property Annotation $annotation
 * @property Webpage $webpage
 */
class Tip_location extends Tip {

    //------------------------------------
    // Generic_attribute_object
    
    // Member Varibles
    protected $type_id = 3;
    protected $name = 'tip.location';

    //------------------------------------
    // Tip
    
    protected $langvar_name = 'location';

    /**
     * 產生提示文字
     * @return String
     */
    public function _produce_tip_text()
    {
        /*
        $this->_CI_load('library', 'annotation/Annotation_feature_location', 'annotation_feature_location');
        $feature_type_id = $this->CI->annotation_feature_location->get_type_id();

        $location = $this->annotation->get_feature($feature_type_id)->get_value();
        if (is_null($location))
            $location = 5;
        
        $text =  $this->lang->line($this->name.'.text.'.$location);
        return $text;
         */
        $location_id_ary = $this->annotation->get_feature_location();
        //test_msg('Tip_location::_produce_tip_text()', $location_id_ary);
        /*
        $location = 6;
        if (is_array($location) == FALSE || count($location) == 0)
        {
            $location = 6;
        }
        else if (in_array(2, $location_id_ary) == TRUE)
        {
            $location = 2;
        }
        else if (in_array(1, $location_id_ary) == TRUE)
        {
            $location = 1;
        }
        else if (in_array(3, $location_id_ary) == TRUE)
        {
            $location = 3;
        }

        $text =  $this->lang->line($this->name.'.text.'.$location);
         */
        $has_head = in_array(0, $location_id_ary);
        $has_foot = in_array(4, $location_id_ary);

        $has_no_tip = ( ($has_head || $has_foot )
            || in_array(5, $location_id_ary));

        if ($has_no_tip === TRUE)
            return NULL;

         $location = 'head_foot';
        if (in_array(2, $location_id_ary) == TRUE
            || in_array(6, $location_id_ary) == TRUE
            || ((in_array(1, $location_id_ary) == TRUE) && (in_array(3, $location_id_ary) == TRUE)))
        {
            $location = 'head_foot';
        }
        else if (in_array(1, $location_id_ary) == TRUE
                //|| in_array(4, $location_id_ary) == TRUE  //取消尾部建議
                )
        {
            $location = 'head';
        }
        else if (in_array(3, $location_id_ary) == TRUE
                //|| in_array(0, $location_id_ary) == TRUE  //取消頭部建議
                )
        {
            $location = 'foot';
        }

        $text =  $this->lang->line($this->name.'.text.'.$location);
        return $text;
    }
}


/* End of file Tip_location.php */
/* Location: ./system/application/libraries/recommend/Tip_location.php */