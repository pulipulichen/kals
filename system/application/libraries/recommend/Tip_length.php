<?php
include_once 'Tip.php';
/**
 * Tip_length
 *
 * 標註建議的提示：長度
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
class Tip_length extends Tip {

    //------------------------------------
    // Generic_attribute_object
    
    // Member Varibles
    protected $type_id = 2;
    protected $name = 'tip.length';

    //------------------------------------
    // Tip
    
    protected $langvar_name = 'length';

    /**
     * 產生提示文字
     * @return String
     */
    public function _produce_tip_text()
    {
        $membership_function = $this->_get_membership_function();
        $keys = array_keys($membership_function);
        $recommend_length = $keys[0];

        

        if (is_string($recommend_length))
        {
            $recommend_length = intval($recommend_length);
        }

        if ($recommend_length < 2 && isset($keys[1]))
        {
            $recommend_length = $keys[1];
        }
        $length = $this->annotation->get_scope_length();
        if ($length > $recommend_length)
            $text =  $this->lang->line($this->name.'.text', $recommend_length);
        else
            $text = NULL;
        return $text;
    }
}


/* End of file Tip_length.php */
/* Location: ./system/application/libraries/recommend/Tip_length.php */