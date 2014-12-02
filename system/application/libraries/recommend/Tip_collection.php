<?php
/**
 * Tip_collection
 *
 * 標註集合
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/18 上午 01:10:33
 * @property Annotaiton $annotation
 */
class Tip_collection extends Generic_attribute_collection {

    //------------------------------------
    // Generic Collection

    protected $table_name = 'recommend2tip';
    protected $index_field = 'recommend_id';
    protected $type_field = 'tip_type_id';

    protected $class_name = array(
        1 => 'Tip_speech',
        2 => 'Tip_length',
        3 => 'Tip_location'
    );
    protected $class_dir = 'recommend/';
    protected $data_fields = array('recommend2tip_id', 'recommend_id', 'tip_type_id');
    
    protected $members_readonly = TRUE;

    //private $annotation;
    public function set_annotation(Annotation $annotation)
    {
        //$this->annotation = $annotation;
        foreach ($this->class_name AS $type_id => $tip)
        {
            $tip = $this->get_item($type_id);
            $tip->set_annotation($annotation);
        }
        return $this;
    }

    public function set_webpage($webpage)
    {
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $webpage = $this->CI->webpage->filter_webpage_object($webpage);

        foreach ($this->class_name AS $type_id => $tip)
        {
            $tip = $this->get_item($type_id);
            $tip->set_webpage($webpage);
        }
        return $this;
    }

    public function get_tip_text_array()
    {
        $text_array = array();
        foreach ($this->class_name AS $type_id => $tip)
        {
            $tip = $this->get_item($type_id);
            $text = $tip->get_tip_text();
            if (isset($text))
                $text_array[] = $text;
        }

        if (count($text_array) == 0)
        {
            $text_array[] = $this->CI->lang->line('tip.general');
        }

        return $text_array;
    }

    public function get_tip_index_array()
    {
        $text_array = array();
        foreach ($this->class_name AS $type_id => $tip)
        {
            $tip = $this->get_item($type_id);
            $text = $tip->get_tip_index();
            if (isset($text))
                $text_array[] = $text;
        }
        return $text_array;
    }

    public function has_matched()
    {
        $matched = FALSE;
        foreach ($this->class_name AS $type_id => $tip)
        {
            $tip = $this->get_item($type_id);
            if ($tip->match())
            {
                $matched = TRUE;
                break;
            }
        }
        return $matched;
    }
}


/* End of file Tip_collection.php */
/* Location: ./system/application/libraries/.../Tip_collection.php */