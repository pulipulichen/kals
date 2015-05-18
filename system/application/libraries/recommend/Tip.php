<?php
/**
 * Tip
 *
 * 標註建議的提示
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
class Tip extends Generic_attribute_object {

    //------------------------------------
    // Generic Object

    // Member Varibles
//    protected $table_name = 'recommend2tip';
//    protected $primary_key = 'recommend2tip_id';
    protected $table_fields = array('recommend2tip_id', 'recommend_id', 'tip_type_id');
//    protected $not_null_field = array('recommend_id', 'tip_type_id');
//
//    protected $unique_restriction = array('recommend_id', 'tip_type_id');

    //------------------------------------
    // Generic_attribute_object
    
    // Member Varibles
    protected $type_id;
//    protected $type_field = 'tip_type_id';

    protected $name;

    //------------------------------------
    // Tip

    // Member Variables
    protected $annotation;
    protected $webpage;

    // Methods
    public function set_webpage($webpage)
    {
        $this->_CI_load('library', 'recommend/Webpage', 'webpage');
        $webpage = $this->CI->webpage->filter_webpage_object($webpage);
        $this->webpage = $webpage;
        return $this;
    }

    public function set_annotation(Annotation $annotation)
    {
        $this->annotation = $annotation;
        return $this;
    }

    /**
     * 確認是否使用此提示
     * 請子類別覆寫此方法
     * @param Annotation $annotation
     * @return Boolean
     */
    public function match(Annotation $annotation = NULL)
    {

        if (isset($annotation))
            $this->set_annotation ($annotation);

        $langvar_type_id = $this->_get_langvar_type_id();
        $score = $this->annotation->get_score($langvar_type_id)->get_score();
        $threshold = $this->_get_recommend_threshold();

        if ($score < $threshold)
            return TRUE;
        else
            return FALSE;
    }

    private $langvar_type_id;
    protected $langvar_name;
    protected function _get_langvar_type_id()
    {
        if (is_null($this->langvar_type_id))
        {
            $langvar_name = $this->langvar_name;
            $this->_CI_load('library', 'score/Annotation_score_'.$langvar_name, 'annotation_score_'.$langvar_name);
            $score_class = 'annotation_score_'.$langvar_name;
            $this->langvar_type_id = $this->CI->$score_class->get_type_id();
        }
        return $this->langvar_type_id;
    }

    private $membership_function;
    protected function _get_membership_function()
    {
        if (is_null($this->membership_function))
        {
            $this->CI->config->load('kals');
            $langvar_name = $this->langvar_name;
            $this->membership_function = $this->CI->config->item('langvar.'.$langvar_name.'.membership_function_variables');
        }
        return $this->membership_function;
    }

    public function get_tip_text(Annotation $annotation = NULL)
    {
        //test_msg($this->name,$this->match($annotation));

        if ($this->match($annotation))
        {
            return $this->_produce_tip_text();
        }
        else
            return NULL;
    }

    public function get_tip_index(Annotation $annotation = NULL)
    {
        if ($this->match($annotation))
        {
            return $this->langvar_name;
        }
        else
            return NULL;
    }

    /**
     * 產生提示文字
     * 請子類別覆寫此方法
     * @return String
     */
    public function _produce_tip_text()
    {
        return NULL;
    }

    protected $recommend_threshold;
    protected function _get_recommend_threshold()
    {
        if (is_null($this->recommend_threshold))
        {
            //$this->_CI_load('library', 'fuzzy/Output_language_variable_collection', 'output_language_variable_collection');
            //$default_recommend_threshold = $this->CI->output_language_variable_collection->get_recommend_threshold();
        
            //改用各自設定的threshold
            $this->recommend_threshold = $this->CI->config->item('langvar.'.$this->langvar_name.'.tip.threshold');
            //test_msg('Tip::_get_recommend_threshold', 'langvar.'.$this->langvar_name.'.tip.threshold');
        }
        return $this->recommend_threshold;
    }

    public function  update() {
        //tip不作update
        return $this;
    }
}


/* End of file Tip.php */
/* Location: ./system/application/libraries/recommend/Tip.php */