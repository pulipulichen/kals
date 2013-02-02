<?php
/**
 * ut_segmentor
 *
 * ut_segmentor full description.
 *
 * @package		KALS
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/1 下午 03:26:38
 */
class ut_segmentor extends Controller {

    function ut_segmentor()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');

        $this->load->library('scope/Segmentor_factory');
        //create_context(TRUE);
    }

    function index()
    {
        $segmentor_name1 = 'segmentor.scws';
        $segmentor_name2 = 'segmentor.ckip';
        $segmentor_name3 = 'segmentor.yahoo';
        $text = '今天今天繼續做昨天未完成的投影片。然後接續D11進度把Authorize Manager跟Context加入Domain跟Webpage中。';
        $test_eng = 'Since learning English is very popular in non-English speaking countries, developing modern assisted-learning tools that support effective English learning is a critical issue in the English-language education field.';
        $ex = '';
        //$ex = '';

        $text_scws1 = '今天 今天 繼續 做 昨天 未 完成 投影片 然後 接續 D11 進度 Authorize Manager 跟 Context 加入 Domain 跟 Webpage 中';
        $text_scws2 = '今天/n 今天/n 繼續/vn 做/v 昨天/n 未/d 完成/un 投影片/n 然後/d 接續/v D11/en 進度/n Authorize/en Manager/en 跟/v Context/en 加入/un Domain/en 跟/v Webpage/en 中/f';

        $text_ckip1 = '今天 今天 繼續 做 昨天 未 完成 的 投影片 。 然後 接續 D 11 進度 把 Authorize Manager 跟 Context 加入 Domain 跟 Webpage 中 。';
        $text_ckip2 = '今天/N 今天/N 繼續/Vt 做/Vt 昨天/N 未/ADV 完成/Vt 的/T 投影片/N 。/PERIODCATEGORY 然後/ADV 接續/Vt D/FW 11/DET 進度/N 把/P Authorize/FW Manager/FW 跟/P Context/FW 加入/Vt Domain/FW 跟/P Webpage/FW 中/N 。/PERIODCATEGORY';

        /*
        $segmentor = Segmentor_factory::create($segmentor_name1);

        $this->unit->run($segmentor->get_name()
                , $segmentor_name1
                , '測試Segmentor的get_name()');

        $this->unit->run($segmentor->ignore_stopword
                , FALSE
                , '測試Segmentor的ignore_stopword');

        $segmentor->set_ignore_stopword(TRUE);
        $this->unit->run($segmentor->ignore_stopword
                , TRUE
                , '測試Segmentor的set_ignore_stopword()');

        $this->unit->run($segmentor->text_to_segment($text, FALSE)
                , $text_scws1.$ex
                , '測試SCWS斷詞器');

        $this->unit->run($segmentor->text_to_segment($text, TRUE)
                , $text_scws2.$ex
                , '測試SCWS斷詞器，包含詞性');

        
        $segmentor = Segmentor_factory::create($segmentor_name2);
        $this->unit->run($segmentor->text_to_segment($text, FALSE)
                , $text_ckip1.$ex
                , '測試CKIP斷詞器');

        $this->unit->run($segmentor->text_to_segment($text, TRUE)
                , $text_ckip2.$ex
                , '測試CKIP斷詞器，包含詞性');
*/
        $segmentor = Segmentor_factory::create($segmentor_name3);
        $this->unit->run($segmentor->text_to_segment($text, FALSE)
                , $text_ckip1.$ex
                , '測試CKIP斷詞器');

        $this->unit->run($segmentor->text_to_segment($text, TRUE)
                , $text_ckip2.$ex
                , '測試CKIP斷詞器，包含詞性');

        $segmentor = Segmentor_factory::create('segmentor.disable');
        $this->unit->run($segmentor->text_to_segment($text, FALSE)
                , NULL
                , '測試disable斷詞器');

        $this->unit->run($segmentor->text_to_segment($text, TRUE)
                , NULL
                , '測試disable斷詞器，包含詞性');


//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        unit_test_report($this);
    }
}
/* End of file ut_segmentor.php */
/* Location: ./system/application/controllers/ut_.../ut_segmentor.php */