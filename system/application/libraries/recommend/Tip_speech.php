<?php
include_once 'Tip.php';
/**
 * Tip_speech
 *
 * 標註建議的提示：詞性
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
class Tip_speech extends Tip {

    //------------------------------------
    // Generic_attribute_object
    
    // Member Varibles
    protected $type_id = 1;
    protected $name = 'tip.speech';

    //------------------------------------
    // Tip
    
    protected $langvar_name = 'speech';

    /**
     * 產生提示文字
     * @return String
     */
    public function _produce_tip_text()
    {
        //langvar.speech.tip.recommend_by_threshold
        $threshold = $this->CI->config->item('langvar.'.$this->langvar_name.'.tip.recommend_by_threshold');

        $membership_function = $this->_get_membership_function();
        $anchor_speech = $this->annotation->get_anchor_speech();

        $this->_CI_load('library', 'fuzzy/Output_language_variable_collection');

        $tip_text_header = $this->name.'.';
        $recommend_langs = array();
        foreach ($membership_function AS $speech => $ms)
        {
            if (FALSE === in_array($speech, $anchor_speech))
            {
                //先計算是否高過recommend_by_threshold
                $ms_langcoll = new Output_language_variable_collection();
                $ms_langcoll->set_memberships($ms);
                $score = $ms_langcoll->get_defuzzy_code();

                $lang = $this->lang->line($tip_text_header.$speech);

                //test_msg($score, array($this->langvar_name.'.tip.recommend_by_threshold', $lang, $threshold, ($score < $threshold)));
                if ($score < $threshold)
                    break;

                if (FALSE === $lang)
                    continue;
                
                $recommend_langs[] = $lang;
                if (count($recommend_langs) > 4)
                    break;
            }
        }

        $recommend = '';
        foreach ($recommend_langs AS $lang)
        {
            if ($recommend != '')
                $recommend .= $this->lang->line('tip.comma');
            $recommend .= $lang;
        }
        
        $text =  $this->lang->line($this->name.'.text', $recommend);
        return $text;
    }
}


/* End of file Tip_speech.php */
/* Location: ./system/application/libraries/recommend/Tip_speech.php */