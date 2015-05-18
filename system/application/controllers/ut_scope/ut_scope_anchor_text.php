<?php
/**
 * ut_scope_anchor_text
 *
 * ut_scope_anchor_text full description.
 *
 * @package		KALS
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/4 下午 05:42:47
 * @property Scope_anchor_text $scope_anchor_text
 */
class ut_scope_anchor_text extends Controller {

    function ut_scope_anchor_text()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->library('scope/Scope_anchor_text');
        create_context(TRUE);
    }

    function index()
    {
        $text = "而且NetBeans寫習慣之後，回頭用這RJ Text來寫PHP真是有夠痛苦的。";
        $text2 = "複雜的程式大概1天完成1支";
        $text3 = '這種天氣喝黑糖薑母茶真是有種爽快感
            ';
        $text3_fixed = '這種天氣喝黑糖薑母茶真是有種爽快感';
        $seg = '而且/C NetBeans/FW 寫/Vt 習慣/N 之後/POST ，/COMMACATEGORY 回頭/ADV 用/P 這/DET RJ/FW Text/FW 來/ADV 寫/Vt PHP/FW 真是/ADV 有夠/ADV 痛苦/Vi 的/T 。/PERIODCATEGORY';
        $query = '( 而且 ) | ( NetBeans ) | ( 寫 ) | ( 習慣 ) | ( 之後 ) | ( ， ) | ( 回頭 ) | ( 用 ) | ( 這 ) | ( RJ ) | ( Text ) | ( 來 ) | ( 寫 ) | ( PHP ) | ( 真是 ) | ( 有夠 ) | ( 痛苦 ) | ( 的 ) | ( 。 )';
        $speech = '0 => C | 1 => FW | 2 => Vt | 3 => N | 4 => POST | 5 => COMMACATEGORY | 6 => ADV | 7 => P | 8 => DET | 9 => Vi | 10 => T | 11 => PERIODCATEGORY |';
        /**
         * @var Scope_anchor_text $at
         */
        $at = $this->scope_anchor_text->create_anchor_text($text);

        $at_id = $at->get_id();
        $this->unit->run(is_int($at->get_id())
                , TRUE
                , '真的有存入資料庫嗎？');

        $this->unit->run($at->get_text()
                , $text
                , '測試create()跟get_text()');

        $this->unit->run($at->get_segment()
                , $seg
                , '測試get_segment()');

        $this->unit->run($at->get_segment_query()
                , $query
                , '測試get_segment()');

        $this->unit->run(test_array($at->get_speechs())
                , $speech
                , '測試get_speechs()');

        $at2 = $this->scope_anchor_text->create_anchor_text($text);
        $at2_id = $at2->get_id();

        $this->unit->run($at_id
                , $at2_id
                , '測試Create看看是不是同一個ID');

        $at3 = $this->scope_anchor_text->create_anchor_text($text2);
        $at3_id = $at3->get_id();

        $this->unit->run_false($at_id
                , $at3_id
                , '測試Create不同$text，看看是不是同一個ID');

        $at3->set_field('text', $text3);
        $at3->update();

        $this->unit->run($at3->get_text()
                , $text3_fixed
                , '測試$at3 update()之後索引是否有更新？而且多餘的空行也有清除掉？');



//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        unit_test_report($this);
    }
}
/* End of file ut_scope_anchor_text.php */
/* Location: ./system/application/controllers/ut_.../ut_scope_anchor_text.php */