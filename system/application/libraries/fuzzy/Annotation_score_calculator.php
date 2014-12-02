<?php
/**
 * Annotation_score_calculator
 *
 * 標註分數計算機
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/17 下午 08:45:17
 * @property Annotation $annotation
 * @property Webpage $webpage
 * @property Language_variable_collection $langvar_coll
 */
class Annotation_score_calculator extends KALS_object {

    private $webpage;
    private $annotation;
    private $langvar_coll;
    private $ready = FALSE;

    function  __construct($webpage = NULL) {
        parent::__construct();

        if (isset($webpage))
            $this->set_webpage($webpage);
    }

    public function set_webpage($webpage)
    {
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $webpage = $this->CI->webpage->filter_webpage_object($webpage);
        $this->webpage = $webpage;
        $this->langvar_coll = $webpage->get_langvar_coll();
        $this->check_annotation();
    }

    public function set_annotation(Annotation $annotation)
    {
        $this->annotation = $annotation;
        $this->check_annotation();
    }

    protected function check_annotation()
    {
        if (isset($this->annotation) && isset($this->langvar_coll))
        {
            //test_msg('Annotation_score_calculator->check_annotation()', $this->annotation);
            $this->langvar_coll->set_annotation($this->annotation);
            $this->ready = TRUE;
        }
        else
            $this->ready = FALSE;
    }

    public function calculate_scores(Annotation $annotation)
    {
        //if (isset($annotation))
        //    $this->set_annotation ($annotation);

        if (FALSE === $this->ready)
            return array();

        $scores = $this->langvar_coll->get_defuzzy_array();

        $integrated_score = $this->langvar_coll->get_integrated_score();
        $scores[0] = $integrated_score;
        //test_msg($this->annotation->get_id(), array($scores[0]));
        //$this->annotation->set_scores($scores);
        return $scores;
    }

    public function setup_annotation_scores(Annotation $annotation = NULL)
    {
        if (isset($annotation))
        {
            $this->set_annotation($annotation);
        }

        $scores = $this->calculate_scores($annotation);
        //test_msg($annotation->get_id(), array($this->ready, $scores));
        $annotation->set_scores($scores);
        $annotation->update();

        /*
        $consensus_annotations = $annotation->get_consensus_coll();
        //test_msg('consensus length', $consensus_annotations->length());
        
        foreach ($consensus_annotations AS $con_anno)
        {
            $scores = $this->calculate_scores($con_anno);
            $con_anno->set_scores($scores);
            $con_anno->update();
        }
         */
        return $this;
    }
}


/* End of file Annotation_score_calculator.php */
/* Location: ./system/application/libraries/fuzzy/Annotation_score_calculator.php */