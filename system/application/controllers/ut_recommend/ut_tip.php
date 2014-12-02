<?php
/**
 * ut_tip
 *
 * ut_tip full description.
 *
 * @package		KALS
 * @category		Unit Tests
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/18 上午 12:56:26
 * @property Tip $tip
 * @property Tip_speech $tip_speech
 * @property Tip_location $tip_location
 * @property Tip_length $tip_length
 */
class Ut_tip extends Controller {

    function __construct()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->library('recommend/Tip');
        $this->load->library('recommend/Tip_speech');
        $this->load->library('recommend/Tip_location');
        $this->load->library('recommend/Tip_length');

        $this->load->library('recommend/Tip_collection');

        $this->load->library('kals_resource/Annotation');
        $this->load->library('kals_resource/Webpage');
        $this->load->library('kals_actor/User');
        $this->load->library('scope/Annotation_scope_collection');
        $this->load->library('scope/Annotation_scope');



        create_context(TRUE);
        $this->unit->set_benchmark('Construc Complete');
    }

    function index()
    {
        $url = 'http://www.plurk.com/p/6e8ya0#response-1797906026';
        $annotation = new Annotation(1017);

        $this->tip_speech->set_webpage($url);
        $this->tip_speech->set_annotation($annotation);

        $this->unit->run($this->tip_speech->match()
                , TRUE
                , 'tip_speech match()');

        $this->unit->run($this->tip_speech->get_tip_text()
                , 'is_string'
                , 'tip_speech get_tip_text()');

        $this->tip_length->set_webpage($url);
        $this->tip_length->set_annotation($annotation);

        $this->unit->run($this->tip_length->match()
                , TRUE
                , 'tip_length match()');

        $this->unit->run($this->tip_length->get_tip_text()
                , 'is_string'
                , 'tip_length get_tip_text()');

        $this->tip_location->set_webpage($url);
        $this->tip_location->set_annotation($annotation);

        $this->unit->run($this->tip_location->match()
                , TRUE
                , 'tip_location match()');

        $this->unit->run($this->tip_location->get_tip_text()
                , 'is_string'
                , 'tip_location get_tip_text()');

        //-----------------------------------------

        $tip_coll = new Tip_collection();
        $tip_coll->set_webpage($url);
        $tip_coll->set_annotation($annotation);

        $matched = $tip_coll->has_matched();
        $this->unit->run($matched
                , TRUE
                , 'tip_collection has_matched()');

        $tip_texts = $tip_coll->get_tip_text_array();

        $this->unit->run(count($tip_texts)
                , 3
                , 'tip_collection get_tip_text_array() count()');

        foreach ($tip_texts AS $key => $text)
        {
            $this->unit->run($text
                , 'is_string'
                , 'tip_collection get_tip_text_array() foreach'.$key.' is_string');
        }

//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        //context_complete();
        unit_test_report($this, __METHOD__);
    }
}
/* End of file ut_tip.php */
/* Location: ./system/application/controllers/ut_.../ut_tip.php */