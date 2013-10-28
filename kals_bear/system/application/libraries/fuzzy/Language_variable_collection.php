<?php
/**
 * Language_variable_collection
 *
 * 標註的其他特徵
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/10 上午 01:35:59
 * @property Annotation $annotation
 */
class Language_variable_collection extends Generic_attribute_collection {

    # Member Varibles
    protected $table_name = 'langvar';
    protected $index_field = 'webpage_id';
    protected $type_field = 'langvar_type_id';
    protected $data_fields = array('langvar_id', 'webpage_id','langvar_type_id', 'function_variables', 'threshold', 'record', 'weight', 'updated');

    protected $class_name = array(
        1 => 'Language_variable_consensus',
        2 => 'Language_variable_like',
        3 => 'Language_variable_type',
        4 => 'Language_variable_speech',
        5 => 'Language_variable_length',
        //6 => 'Language_variable_location'
    );
    protected $class_dir = 'fuzzy/';

    private $annotation;
    public function set_annotation(Annotation $annotation)
    {
        $this->integrated_score = NULL;
        $this->annotation = $annotation;
        foreach ($this->class_name AS $type_id => $type)
        {
            $langvar = $this->get_item($type_id);
            $langvar->set_annotation($annotation);
        }
        return $this;
    }

    public function get_membership_matrix(Annotation $annotation = NULL)
    {
        if (isset($annotation))
            $this->set_annotation ($annotation);

        $matrix = array();

        foreach ($this->class_name AS $type_id => $type)
        {
            $membership = $this->get_item($type_id)->get_membership()->get_membership_array();
            $matrix[] = $membership;
        }
        
        return $matrix;
    }

    public function get_defuzzy_array(Annotation $annotation = NULL)
    {
        if (isset($annotation))
            $this->set_annotation ($annotation);

        $ary = array();

        foreach ($this->class_name AS $type_id => $type)
        {
            $defuzzy = $this->get_item($type_id)->get_membership()->get_defuzzy_code();
            $ary[$type_id] = $defuzzy;
        }

        return $ary;
    }

    public function get_weight_array()
    {
        $ary = array();

        foreach ($this->class_name AS $type_id => $type)
        {
            $langvar = $this->get_item($type_id);
            $ary[] = $langvar->get_weight();
        }

        return $ary;
    }

    public function has_updated()
    {
        $updated = FALSE;
        foreach ($this->class_name AS $type_id => $type)
        {
            $langvar = $this->get_item($type_id);
            if ($langvar->has_updated())
            {
                $updated = TRUE;
                break;
            }
        }
        return $updated;
    }

    private $inference_result;
    private $integrated_score;

    /**
     * @return Output_language_variable_collection
     */
    public function get_inference_result()
    {
        if (is_null($this->inference_result))
        {
            $this->calculate_inference_result();
        }
        return $this->inference_result;
    }
    public function get_integrated_score()
    {
        if (is_null($this->integrated_score))
        {
            $this->calculate_inference_result();
        }
        return $this->integrated_score;
    }


    private function calculate_inference_result()
    {
        $method = $this->CI->config->item('fuzzy_inference_engine');

        $this->_CI_load('library', 'fuzzy/Fuzzy_inference_engine', 'fuzzy_inference_engine');
        $this->inference_result = Fuzzy_inference_engine::get_inference_result($this, $method);
        $this->integrated_score = $this->inference_result->get_defuzzy_code();
    }

//    public function  update() {
//        //不作update，由langvar自己決定
//        return $this;
//    }
}


/* End of file Language_variable_collection.php */
/* Location: ./system/application/libraries/fuzzy/Language_variable_collection.php */