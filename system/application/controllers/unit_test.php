<?php
/**
 * unit_test
 *
 * 全系統的集合測試
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/12 下午 07:36:13
 */

class Unit_test extends Controller {

    function  __construct()
    {
        parent::Controller();
    }

    function index()
    {
        $data = array();
        $test_items = array(
            'ut_core' => array(
                'ut_context'
            ),
            'ut_fuzzy' => array(
                'ut_output_lang_var',
                'ut_clustering',
                'ut_langvar',
                'ut_langvar/calculator'
            ),
            'ut_kals_actor' => array(
                'ut_group',
                //'ut_kasl_actor',
                'ut_notification',
                'ut_user',
                'ut_user/friend'
            ),
            'ut_kals_resource' => array(
                'ut_domain',
                'ut_webpage',
                'ut_annotation',
                'ut_annotation/consensus',
                'ut_annotation/like',
                'ut_annotation/anchor_speech',
                'ut_annotation/update',
                'ut_annotation/json'
            ),
            'ut_misc' => array(
                'ut_kals_helper/test'
            ),
            'ut_policy' => array(
                'ut_action',
                'ut_auth'
            ),
            'ut_scope' => array(
                'ut_scope',
                'ut_scope_anchor_text',
                'ut_scope_collection',
                'ut_scope_collection/webpage',
                'ut_segmentor'
            ),
            'ut_type' => array(
                'ut_type'
            ),
            'ut_search' => array(
                'ut_search',
                'ut_search/search_without_context',
                'ut_search/check_auth'
            ),
            'ut_recommend' => array(
                'ut_tip',
                'ut_recommend',
                'ut_recommend/no_recommend',
                'ut_recommend/not_accept',
                'ut_tutor'
            )
        );
        $data['test_items'] = $test_items;

        $this->load->view('misc/unit_test_index', $data);
    }
}


/* End of file unit_test.php */
/* Location: ./system/application/controllers/unit_test.php */