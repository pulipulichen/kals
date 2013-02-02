<?php
include_once 'Language_variable.php';
/**
 * Language_variable_consensus
 *
 * 模糊語言變數：共識
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/14 下午 11:32:00
 */
class Language_variable_consensus extends Language_variable {

    protected $type_id = 1;
    protected $name = 'langvar.consensus';
    protected $renewable = TRUE;
    protected $nominal_feature = FALSE;

    protected function get_feature(Annotation $annotation)
    {
        //if ($annotation->get_id() == 2363)
        //    test_msg('Language_variable_consensus', array($annotation->get_id(), $annotation->get_consensus_count()));
        $feature = $annotation->get_consensus_count();
        return $feature;
    }
}


/* End of file Language_variable_consensus.php */
/* Location: ./system/application/libraries/fuzzy/Language_variable_consensus.php */