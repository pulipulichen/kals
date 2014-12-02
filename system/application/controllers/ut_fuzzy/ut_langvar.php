<?php
/**
 * Ut_langvar
 *
 * ut_langvar full description.
 *
 * @package		KALS
 * @category		Unit Tests
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/17 下午 02:04:21
 * @property Language_variable $langvar
 * @property Annotation $annotation
 * @property Annotation_score_calculator $annotation_score_calculator
 */
class Ut_langvar extends Controller {

    private $langvar;
    private $annotaion;
    private $annotaion2;
    private $annotaion3;
    private $url = 'http://www.plurk.com/p/6e8ya0';

    function __construct()
    {
        parent::Controller();
        $this->load->library('unit_test');
        $this->load->helper('unit_test');
        $this->load->library('fuzzy/Language_variable');
        $this->load->library('fuzzy/Language_variable_consensus');
        $this->load->library('fuzzy/Language_variable_length');
        $this->load->library('fuzzy/Language_variable_like');
        $this->load->library('fuzzy/Language_variable_location');
        $this->load->library('fuzzy/Language_variable_speech');
        $this->load->library('fuzzy/Language_variable_type');

        $this->load->library('fuzzy/Annotation_score_calculator');

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
        $url = $this->url;
        $this->create_annotation();

        $annotation = $this->annotation;


        //---------------------------------------

        $webpage = $this->webpage->create($url);
        $langvar_coll = $webpage->get_langvar_coll();

        $langvar_coll->set_annotation($annotation);

        $defuzzy_array = $langvar_coll->get_defuzzy_array();
        $test_defuzzy_array = array(1 =>1.2, 2 =>1, 3 =>3, 4 =>3, 5 =>1, 6 =>2);
        for ($i = 1; $i < 4; $i++)
        {
            $this->unit->run($defuzzy_array[$i].''
                    , $test_defuzzy_array[$i].''
                    , 'langvar_coll，get_defuzzy_array()，測試第'.$i.'個');
        }

        $matrix = $langvar_coll->get_membership_matrix();

        $this->draw_table($matrix);
        test_msg($langvar_coll->get_weight_array());

        $this->unit->run(count($matrix)
                , 6
                , 'langvar_coll，get_membership_matrix()，count第一層');
        $this->unit->run(count($matrix[0])
                , 3
                , 'langvar_coll，get_membership_matrix()，count第二層');

        //----------------------------------

        $this->unit->run($langvar_coll->get_inference_result()->get_membership_array()
                , array(0.24,0.2,0.15)
                , 'Fuzzy_inference_engine get_inference_result()');

        $this->unit->run($langvar_coll->get_integrated_score().""
                , 1.84745762712.""
                , 'Fuzzy_inference_engine get_integrated_score()');

        //----------------------------------

        $this->unit->run($annotation->get_consensus_count()
                , 2
                , '看一下標註是否有共識');

        $langvar = $this->langvar;
        $langvar = $this->language_variable_consensus->find_langvar($url);

        $membership = $langvar->get_membership($annotation);
        $ms_array = $membership->get_membership_array();

        $this->unit->run($ms_array
                , array(0.8, 0.2, 0)
                , 'language_variable_consensus是否有取得到正確的membership？');
        $this->unit->run($langvar->get_membership_array()
                , array(0.8, 0.2, 0)
                , '再取得一次，language_variable_consensus是否有記錄membership？');
        $this->unit->run($langvar->get_record()
                , 2
                , 'language_variable_consensus是否有正確set_record?');

        $langvar->set_field('function_variables', '1,3,5');
        $membership = $langvar->get_membership($annotation);
        $ms_array = $membership->get_membership_array();

        $this->unit->run($ms_array
                , array(0.5, 0.5, 0)
                , 'language_variable_consensus設定function_variables之後，是否有取得到正確的membership？');

        //-------------------------------------

        
        $this->unit->run($annotation->get_like_count()
                , 2
                , '看一下標註喜愛是否如預期的');

        $langvar = $this->language_variable_like->find_langvar($url);
        $this->unit->run($langvar->get_membership_array($annotation)
                , array(1, 0, 0)
                , 'language_variable_like，是否有取得到正確的membership？');

        //--------------------------------

        $this->unit->run($annotation->get_type()->get_type_id()
                , 1
                , '看一下標註類型是否如預期的');

        $langvar = $this->language_variable_type->find_langvar($url);
        $this->unit->run($langvar->get_membership_array($annotation)
                , array(0, 0, 1)
                , 'language_variable_type，是否有取得到正確的membership？');

        //--------------------------------

        $this->unit->run($annotation->get_scopes()->get_anchor_speech()
                , 'is_array'
                , '看一下標註範圍詞性是否為陣列');

        $langvar = $this->language_variable_speech->find_langvar($url);
        $this->unit->run($langvar->get_membership_array($annotation)
                , array(0, 0, 1)
                , 'language_variable_speech，是否有取得到正確的membership？');

        //--------------------------------

        $this->unit->run($annotation->get_scopes()->get_scope_length()
                , 33
                , '看一下標註範圍長度是否符合預期');

        $langvar = $this->language_variable_length->find_langvar($url);
        $this->unit->run($langvar->get_membership_array($annotation)
                , array(1, 0, 0)
                , 'language_variable_length，是否有取得到正確的membership？');

        //--------------------------------

        $this->unit->run($annotation->get_feature(1)->get_value()
                , NULL
                , '看一下標註特徵位置是否符合預期');

        $langvar = $this->language_variable_location->find_langvar($url);
        $this->unit->run($langvar->get_membership_array($annotation)
                , array(1, 0, 0)
                , 'language_variable_location，是否有取得到正確的membership？');

        $annotation->set_feature(1, 1);
        $this->unit->run($langvar->get_membership_array($annotation)
                , array(0, 1, 0)
                , 'language_variable_location，重新設定featrue為1，是否有取得到正確的membership？');



//        $this->unit->run($test_result
//                , $expected_result
//                , $test_name);

        //context_complete();
        unit_test_report($this, __METHOD__);
    }

    public function calculator()
    {
        $url = $this->url;
        $this->create_annotation();

        $webpage = $this->webpage->create($url);
        $annotation = $this->annotation;
        $annotation3 = $this->annotation3;

        $this->unit->run($annotation->get_score(0)->get_score()
                , NULL
                , '先看看$annotation是否有分數？');

        $this->unit->run($annotation3->get_score(0)->get_score()
                , NULL
                , '先看看$annotation3是否有分數？');

        //----------------------------------

        //$this->annotation_score_calculator->set_webpage($url);
        $annotation_score_calculator = $webpage->get_score_calculator();

        //$annotation_score_calculator->set_annotation($annotation);
        //$annotation_score_calculator->set_annotation_scores();
        //
//        $scores = $annotation_score_calculator->calculate_scores($annotation);
//        $annotation->set_scores($scores);
//        $annotation->update();
        $annotation_score_calculator->setup_annotation_scores($annotation);
        $annotation_id = $annotation->get_id();

        //annotation3要重新讀取，才能取得分數
        $annotation3 = new Annotation($annotation3->get_id());

        $this->unit->run($annotation->get_score(0)->get_score()
                , 'is_float'
                , '看一下是否有存入資料庫？');

        $this->unit->run($annotation3->get_score(0)->get_score()
                , 'is_float'
                , '看一下共識範圍的是否也一併有了分數？');
        
        $score_coll = $annotation->get_score_coll();

        $this->unit->run($score_coll->length()
                , 7
                , '看一下是否有取得正確7個分數？');

        $scores_array = $score_coll->get_scores_array();


        $annotation_new = new Annotation($annotation_id);

        $this->unit->run($annotation_new->get_score(0)->get_score()
                , 'is_float'
                , 'find之後，看一下是否有存入資料庫？');

        $score_coll = $annotation_new->get_score_coll();

        $this->unit->run($score_coll->length()
                , 7
                , 'find之後，看一下是否有取得正確7個分數？');

        $this->unit->run($score_coll->get_scores_array()
                , $scores_array
                , 'find之後，比對一下是否跟儲存之前的分數一樣？');

        unit_test_report($this, __METHOD__);
    }

    public function create_annotation()
    {
        $url = $this->url;
        $email = 'ut_langvar@test.kals.idv.tw';
        $email2 = 'ut_langvar2@test.kals.idv.tw';
        $email3 = 'ut_langvar3@test.kals.idv.tw';

        $user = $this->user->create_user($url, $email);
        $user2 = $this->user->create_user($url, $email2);
        $user3 = $this->user->create_user($url, $email3);

        $text1 = '[CODING D27] 喝了萊爾富的咖啡，玩了一下流浪者之歌，今天很有精神地繼續挑戰模糊理論！其實已經寫一段時間了，作業用BGM播到「閃光」才想起來要記錄一下XDD';
        $text2 = '感謝José，k-means分群器運作成效良好。雖然k-means天生無法擺脫極端值的影響，但此例中效率高於準確度，所以還是派得上用場的。';
        $scope1 = $this->annotation_scope->create_scope(103, 120, $text1, $url);    //18
        $scope2 = $this->annotation_scope->create_scope(126, 140, $text2, $url);    //15

        $scope_coll = new Annotation_scope_collection();
        $scope_coll->add_scope($scope1);
        $scope_coll->add_scope($scope2);

        $annotation = $this->annotation->create_annotation($user, $scope_coll);
        $annotation2 = $this->annotation->create_annotation($user2, $scope_coll);
        $annotation3 = $this->annotation->create_annotation($user3, $scope_coll);

        $annotation->add_like($user2);
        $annotation->add_like($user3);

        $this->annotation = $annotation;
        $this->annotation2 = $annotation2;
        $this->annotation3 = $annotation3;
    }

    function draw_table($matrix)
    {
        ?>
        <table border="1">
            <tbody>
           <?php
            for ($y = 0; $y < count($matrix); $y++)
            {
                ?>
                <tr>
                    <?php
                    for ($x = 0; $x < count($matrix[$x]); $x++)
                    {
                        echo '<td>'.$matrix[$y][$x].'</td>';
                    }
                    ?>
                </tr>
                <?php
            }
            ?>
            </tbody>
        </table>
        <?php
    }
}
/* End of file ut_langvar.php */
/* Location: ./system/application/controllers/ut_.../ut_langvar.php */