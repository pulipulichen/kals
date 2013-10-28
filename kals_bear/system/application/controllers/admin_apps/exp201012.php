<?php
include_once 'admin_apps_controller.php';
/**
 * exp201012
 *
 * exp201012 full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/12/15 上午 11:05:30
 */

class exp201012 extends Admin_apps_controller {

    /**
     * 標題列表
     * @var Array
     */
    private $title_list = array(
        'mix_scores' => '混合分數計算',
        'recommend' => '建議推薦接受程度',

        'score_list' => '標註分數、六種因素分數',
        'annotation_skill_type' => '標註策略類別',
        'annotation_skill_length' => '標註範圍長度',
        'like' => '喜愛清單',
        'location' => '標註位置',
        'speech' => '標註詞性',

        'respond' => '回應狀況',

        'annotation_behavior' => '標註行為',

        'scope_consensus' => '範圍共識統計',
        'social_model' => '加權社群行為模型',
    );

    /**
     * 要觀察的網址
     * @var String
     */
    private $obs_webpage_url;

    /**
     * 要觀察的網址ID
     * @var int
     */
    private $obs_webpage_id;

    /**
     * 要觀察的網域ID
     * @var int
     */
    private $obs_domain_id;
    
    /**
     * 要觀察的起始日期
     * @var String 使用PostgreSQL的日期格式
     */
    private $obs_date_from;

    /**
     * 要觀察的結束日期
     * @var String 使用PostgreSQL的日期格式
     */
    private $obs_date_to;

    /**
     * 要觀察的名單
     * @var String[]
     */
    private $obs_email;

    private $in_email;

    /**
     * 要觀察的分組名單
     * @var Array[String[]]
     */
    private $obs_group;

    /**
     * 綜合分數
     * @var Array[String] => float
     */
    private $obs_mix_score;

    /**
     * 報告分數
     * @var Array[String] => float
     */
    private $obs_report_score;

    /**
     * 測驗分數
     * @var Array[String] => float
     */
    private $obs_test_score;

    /**
     * 段落位置
     * @var Array[Number[]]
     */
    private $paragraph_scope;

    /**
     * 章節位置
     * @var Array[Number[]]
     */
    private $chapter_scope;

    private $code_mapping = array(
        '0' => 0,
        '1' => 1,
        '2' => 2,
        '3' => 3,
        '4' => 4,
        '5' => 5,
        '6' => 6,
        '7' => 7,
        '8' => 8,
        '9' => 9,
        'A' => 10,
        'B' => 11,
        'C' => 12,
        'D' => 13,
        'E' => 14,
        'F' => 15
    );

    /**
     * 文章長度
     * @var int
     */
    private $text_length = 9909;

    function __construct() {
        parent::__construct();

        $this->load->config('kals_exp_201012');

        $this->obs_webpage_url = $this->config->item('obs_webpage_url');

        $this->load->library('kals_resource/Annotation');
        $this->load->library('kals_resource/Webpage');
        $this->obs_webpage_id = $this->webpage->filter_webpage_id($this->obs_webpage_url);
        //$this->load->library('kals_resource/Domain');
        //$this->obs_domain_id = $this->domain->filter_id($this->obs_webpage_url);

        $this->obs_date_from = $this->config->item('obs_date_from');
        $this->obs_date_to = $this->config->item('obs_date_to');

        $this->obs_email = $this->config->item('obs_email');
        $this->in_email = 'in (';
        foreach ($this->obs_email AS $email)
        {
            if ($this->in_email != 'in (')
            {
                $this->in_email .= ',';
            }
            $this->in_email .= "'".$email."'";
        }
        $this->in_email .= ')';

        $this->obs_group = $this->config->item('obs_group');
        $this->obs_mix_score = $this->config->item('obs_mix_score');
        $this->obs_report_score = $this->config->item('obs_report_score');
        $this->obs_test_score = $this->config->item('obs_test_score');
        $this->paragraph_scope = $this->config->item('paragraph_scope');
        $this->chapter_scope = $this->config->item('chapter_scope');
    }

    function index() {
        $this->_display_header();
        $this->_display_footer();
    }

    private function _display_header ($title = NULL)
    {
        if (is_null($title))
            $title = "首頁";
        else if (isset($this->title_list[$title]))
            $title = $this->title_list[$title];
        $this->load->view('admin_apps/exp201012_header', array('title' => $title, 'title_list' => $this->title_list));
    }

    private function _display_body($title, $thead, $tbody)
    {
        if (isset($this->title_list[$title]))
            $title = $this->title_list[$title];
        $this->load->view('admin_apps/exp201012_body', array('title' => $title, 'thead' => $thead, 'tbody' => $tbody));
    }

    private function _display_footer()
    {
        $this->load->view('admin_apps/exp201012_footer');
    }

    private function _display_hr()
    {
        $this->load->view('admin_apps/hr');
    }

    function score_list()
    {

//SELECT
//annotation.annotation_id
//, "user"."email", "score_table0".score AS score0
//, "score_table1".score AS score1
//, "score_table2".score AS score2
//, "score_table3".score AS score3
//, "score_table4".score AS score4
//, "score_table5".score AS score5
//, "score_table6".score AS score6
//, (accept_recommend.accept = 't' AND accept_recommend.accept IS NOT NULL) as accept
//, (accept_recommend.accept = 'f' AND accept_recommend.accept IS NOT NULL) as reject
//, (accept_recommend.accept IS NULL) as not_confirm
//FROM score AS score_table0,
//score AS score_table1,
//score AS score_table2,
//score AS score_table3,
//score AS score_table4,
//score AS score_table5,
//score AS score_table6,
//webpage2annotation, "user" AS "user"
//, annotation LEFT JOIN recommend AS accept_recommend ON recommended_annotation_id = annotation.annotation_id
//WHERE webpage2annotation.webpage_id = 1142
//AND score_table0.score_type_id = 0
//AND score_table1.score_type_id = 1
//AND score_table2.score_type_id = 2
//AND score_table3.score_type_id = 3
//AND score_table4.score_type_id = 4
//AND score_table5.score_type_id = 5
//AND score_table6.score_type_id = 6
//AND score_table0.annotation_id = annotation.annotation_id
//AND score_table1.annotation_id = annotation.annotation_id
//AND score_table2.annotation_id = annotation.annotation_id
//AND score_table3.annotation_id = annotation.annotation_id
//AND score_table4.annotation_id = annotation.annotation_id
//AND score_table5.annotation_id = annotation.annotation_id
//AND score_table6.annotation_id = annotation.annotation_id
//AND webpage2annotation.annotation_id = annotation.annotation_id
//AND annotation.user_id = "user"."user_id"

        $title = __FUNCTION__;

        $this->_display_header($title);

        $thead = array(
            '撰寫者',
            '標註編號',
            '標註評分(0)',
            '標註範圍共識(1)',
            '標註喜愛共識(2)',
            '標註策略類型(3)',
            '標註範圍詞性(4)',
            '標註範圍字數(5)',
            '標註範圍位置(6)',
            '報告分數', '測驗分數', '綜合分數', '分組');

        $tbody = array();
        $query = $this->db->select('annotation.annotation_id
, "user"."email", "score_table0".score AS score0
, "score_table1".score AS score1
, "score_table2".score AS score2
, "score_table3".score AS score3
, "score_table4".score AS score4
, "score_table5".score AS score5
, "score_table6".score AS score6')
                ->from('score AS score_table0,
score AS score_table1,
score AS score_table2,
score AS score_table3,
score AS score_table4,
score AS score_table5,
score AS score_table6,
webpage2annotation, annotation, "user" AS "user"')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND score_table0.score_type_id = 0
AND score_table1.score_type_id = 1
AND score_table2.score_type_id = 2
AND score_table3.score_type_id = 3
AND score_table4.score_type_id = 4
AND score_table5.score_type_id = 5
AND score_table6.score_type_id = 6
AND score_table0.annotation_id = annotation.annotation_id
AND score_table1.annotation_id = annotation.annotation_id
AND score_table2.annotation_id = annotation.annotation_id
AND score_table3.annotation_id = annotation.annotation_id
AND score_table4.annotation_id = annotation.annotation_id
AND score_table5.annotation_id = annotation.annotation_id
AND score_table6.annotation_id = annotation.annotation_id
AND annotation.topic_id IS NULL
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.deleted IS FALSE
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'
AND annotation.user_id = "user"."user_id"')
                ->where('email '. $this->in_email)
                ->order_by('email')
                ->get();

        foreach ($query->result_array() AS $row)
        {
            $id = $row['annotation_id'];
            $email = $row['email'];
            $tbody[] = array(
                $email,
                $id,
                $row['score0'],
                $row['score1'],
                $row['score2'],
                $row['score3'],
                $row['score4'],
                $row['score5'],
                $row['score6'],
                $this->obs_report_score[$email],
                $this->obs_test_score[$email],
                $this->obs_mix_score[$email],
                $this->obs_group[$email]
            );
        }
        $this->_display_body($title, $thead, $tbody);

        // ------------------

        $thead = array(
            '撰寫者',
            '標註分數(0)平均',
            '標註分數(0)標準差',
            '標註範圍共識(1)平均',
            '標註範圍共識(1)標準差',
            '標註喜愛共識(2)平均',
            '標註喜愛共識(2)標準差',
            '標註策略類型(3)平均',
            '標註策略類型(3)標準差',
            '標註範圍詞性(4)平均',
            '標註範圍詞性(4)標準差',
            '標註範圍字數(5)平均',
            '標註範圍字數(5)標準差',
            '標註範圍位置(6)平均',
            '標註範圍位置(6)標準差');

        $tbody = array();
        $query = $this->db->select(' "user"."email"
, avg("score_table0".score) AS score0_avg
, avg("score_table1".score) AS score1_avg
, avg("score_table2".score) AS score2_avg
, avg("score_table3".score) AS score3_avg
, avg("score_table4".score) AS score4_avg
, avg("score_table5".score) AS score5_avg
, avg("score_table6".score) AS score6_avg
, stddev("score_table0".score) AS score0_stddev
, stddev("score_table1".score) AS score1_stddev
, stddev("score_table2".score) AS score2_stddev
, stddev("score_table3".score) AS score3_stddev
, stddev("score_table4".score) AS score4_stddev
, stddev("score_table5".score) AS score5_stddev
, stddev("score_table6".score) AS score6_stddev')
                ->from('score AS score_table0,
score AS score_table1,
score AS score_table2,
score AS score_table3,
score AS score_table4,
score AS score_table5,
score AS score_table6,
webpage2annotation, annotation, "user" AS "user"')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND score_table0.score_type_id = 0
AND score_table1.score_type_id = 1
AND score_table2.score_type_id = 2
AND score_table3.score_type_id = 3
AND score_table4.score_type_id = 4
AND score_table5.score_type_id = 5
AND score_table6.score_type_id = 6
AND score_table0.annotation_id = annotation.annotation_id
AND score_table1.annotation_id = annotation.annotation_id
AND score_table2.annotation_id = annotation.annotation_id
AND score_table3.annotation_id = annotation.annotation_id
AND score_table4.annotation_id = annotation.annotation_id
AND score_table5.annotation_id = annotation.annotation_id
AND score_table6.annotation_id = annotation.annotation_id
AND annotation.topic_id IS NULL
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.deleted IS FALSE
AND annotation.user_id = "user"."user_id"')
                ->where('email '. $this->in_email)
                ->group_by('email')
                ->order_by('email')
                ->get();

        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];
            $tbody[] = array(
                $email,
                $row['score0_avg'],
                $row['score0_stddev'],
                $row['score1_avg'],
                $row['score1_stddev'],
                $row['score2_avg'],
                $row['score2_stddev'],
                $row['score3_avg'],
                $row['score3_stddev'],
                $row['score4_avg'],
                $row['score4_stddev'],
                $row['score5_avg'],
                $row['score5_stddev'],
                $row['score6_avg'],
                $row['score6_stddev'],
            );
        }
        $this->_display_body($title, $thead, $tbody);

        // ------------------

        $thead = array(
            '標註分數(0)平均',
            '標註分數(0)標準差',
            '標註範圍共識(1)平均',
            '標註範圍共識(1)標準差',
            '標註喜愛共識(2)平均',
            '標註喜愛共識(2)標準差',
            '標註策略類型(3)平均',
            '標註策略類型(3)標準差',
            '標註範圍詞性(4)平均',
            '標註範圍詞性(4)標準差',
            '標註範圍字數(5)平均',
            '標註範圍字數(5)標準差',
            '標註範圍位置(6)平均',
            '標註範圍位置(6)標準差');

        $tbody = array();
        $query = $this->db->select(' avg("score_table0".score) AS score0_avg
, avg("score_table1".score) AS score1_avg
, avg("score_table2".score) AS score2_avg
, avg("score_table3".score) AS score3_avg
, avg("score_table4".score) AS score4_avg
, avg("score_table5".score) AS score5_avg
, avg("score_table6".score) AS score6_avg
, stddev("score_table0".score) AS score0_stddev
, stddev("score_table1".score) AS score1_stddev
, stddev("score_table2".score) AS score2_stddev
, stddev("score_table3".score) AS score3_stddev
, stddev("score_table4".score) AS score4_stddev
, stddev("score_table5".score) AS score5_stddev
, stddev("score_table6".score) AS score6_stddev')
                ->from('score AS score_table0,
score AS score_table1,
score AS score_table2,
score AS score_table3,
score AS score_table4,
score AS score_table5,
score AS score_table6,
webpage2annotation, annotation, "user" AS "user"')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND score_table0.score_type_id = 0
AND score_table1.score_type_id = 1
AND score_table2.score_type_id = 2
AND score_table3.score_type_id = 3
AND score_table4.score_type_id = 4
AND score_table5.score_type_id = 5
AND score_table6.score_type_id = 6
AND score_table0.annotation_id = annotation.annotation_id
AND score_table1.annotation_id = annotation.annotation_id
AND score_table2.annotation_id = annotation.annotation_id
AND score_table3.annotation_id = annotation.annotation_id
AND score_table4.annotation_id = annotation.annotation_id
AND score_table5.annotation_id = annotation.annotation_id
AND score_table6.annotation_id = annotation.annotation_id
AND annotation.topic_id IS NULL
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.deleted IS FALSE
AND annotation.user_id = "user"."user_id"')
                ->where('email '. $this->in_email)
                ->group_by('webpage_id')
                ->get();

        foreach ($query->result_array() AS $row)
        {
            $tbody[] = array(
                $row['score0_avg'],
                $row['score0_stddev'],
                $row['score1_avg'],
                $row['score1_stddev'],
                $row['score2_avg'],
                $row['score2_stddev'],
                $row['score3_avg'],
                $row['score3_stddev'],
                $row['score4_avg'],
                $row['score4_stddev'],
                $row['score5_avg'],
                $row['score5_stddev'],
                $row['score6_avg'],
                $row['score6_stddev'],
            );
        }
        $this->_display_body('網頁整體標註分數分析', $thead, $tbody);

        $this->_display_footer();
    }

    function recommend() {

//SELECT
//annotation.annotation_id
//, "user"."email", "score_table0".score AS score0
//, recommend.accept
//FROM score AS score_table0,
//webpage2annotation, "user" AS "user"
//, annotation RIGHT JOIN recommend ON recommended_annotation_id = annotation.annotation_id
//WHERE webpage2annotation.webpage_id = 1142
//AND score_table0.score_type_id = 0
//AND score_table0.annotation_id = annotation.annotation_id
//AND webpage2annotation.annotation_id = annotation.annotation_id
//AND annotation.user_id = "user"."user_id"

        $title = __FUNCTION__;

        $thead = array(
            '撰寫者',
            '標註編號',
            '標註評分0',
            '建議推薦接受度',
            '報告分數', '測驗分數', '綜合分數', '分組');

        $tbody = array();
        $query = $this->db->select('annotation.annotation_id
, "user"."email", "score_table0".score AS score0
, recommend.accept')
                ->from('score AS score_table0,
webpage2annotation, "user" AS "user"
, annotation JOIN recommend ON recommended_annotation_id = annotation.annotation_id')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND score_table0.score_type_id = 0
AND score_table0.annotation_id = annotation.annotation_id
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.topic_id IS NULL
AND annotation.user_id = "user"."user_id"
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'')
                ->where('email '. $this->in_email)
                ->order_by('email')
                ->distinct()
                ->get();

        //$acceptance = array();
        //$recommend = array();

        $null_list = array();
        $reject_list = array();
        $accept_list = array();

        foreach ($query->result_array() AS $row)
        {
            $id = $row['annotation_id'];
            $email = $row['email'];

            if (isset($null_list[$email]) == FALSE )
            {
                $null_list[$email] = 0;
                $reject_list[$email] = 0;
                $accept_list[$email] = 0;
            }

            $accept = $row['accept'];
            if ($accept == '')
            {
                $accept = 0;
                $null_list[$email]++;
            }
            else if ($accept == 'f')
            {
                $accept = 1;
                $reject_list[$email]++;
            }
            else if ($accept == 't')
            {
                $accept = 2;
                $accept_list[$email]++;
            }

            $tbody[] = array(
                $email,
                $id,
                $row['score0'],
                $accept,
                $this->obs_report_score[$email],
                $this->obs_test_score[$email],
                $this->obs_mix_score[$email],
                $this->obs_group[$email]
            );
        }

        $this->_display_header($title);

        $this->_display_body('建議推薦列表', $thead, $tbody);

        // -------------

        $thead = array(
            '實驗對象',
            '閱讀理解分數',
            '未確認次數',
            '拒絕次數',
            '接受次數'
        );

        $tbody = array();
        foreach ($this->obs_email AS $email)
        {
            $null = 0;
            if (isset($null_list[$email]))
                $null = $null_list[$email];

            $reject = 0;
            if (isset($reject_list[$email]))
                $reject = $reject_list[$email];

            $accept = 0;
            if (isset($accept_list[$email]))
                $accept = $accept_list[$email];

            $tbody[] = array(
                $email,
                $this->obs_mix_score[$email],
                $null,
                $reject,
                $accept
            );
        }

        $this->_display_body('標註建議回饋統計表', $thead, $tbody);
        
        // --------

//SELECT
//"user"."email"
//, count(annotation.annotation_id) AS annotation_count
//FROM webpage2annotation, "user" AS "user"
//, annotation 
//WHERE webpage2annotation.webpage_id = 1142
//AND webpage2annotation.annotation_id = annotation.annotation_id
//AND annotation.user_id = "user"."user_id"
//GROUP BY email
//ORDER BY email

        $query = $this->db->select('email,
(count(recommend_id)) AS count')
                ->from('webpage2annotation,
annotation,
"user",
recommend')
                ->where('webpage2annotation.annotation_id = annotation.annotation_id
AND "user".user_id = annotation.user_id
AND recommend.recommended_annotation_id = annotation.annotation_id
AND annotation.topic_id IS NULL
AND webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'
AND (recommend.accept IS NULL AND annotation.deleted IS TRUE) IS FALSE')
                ->where('email '. $this->in_email)
                ->group_by('email')
                ->get();
        $recommend_count = array();
        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];
            $recommend_count[$email] = $row['count'];
        }

        $query = $this->db->select('email,
(count(recommend_id)) AS count')
                ->from('webpage2annotation,
annotation,
"user",
recommend')
                ->where('webpage2annotation.annotation_id = annotation.annotation_id
AND "user".user_id = annotation.user_id
AND recommend.recommended_annotation_id = annotation.annotation_id
AND annotation.topic_id IS NULL
AND webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND accept IS TRUE
AND (recommend.accept IS NULL AND annotation.deleted IS TRUE) IS FALSE')
                ->where('email '. $this->in_email)
                ->group_by('email')
                ->get();
        $accept_count = array();
        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];
            $accept_count[$email] = $row['count'];
        }

//SELECT
//email, avg(score)
//FROM annotation join score using (annotation_id)
//, webpage2annotation, "user"
//WHERE
//webpage2annotation.annotation_id = annotation.annotation_id
//AND "user".user_id = annotation.user_id
//AND annotation.topic_id IS NULL
//AND annotation.deleted IS FALSE
//GROUP BY email
//ORDER BY email

        $query = $this->db->select('email, avg(score) AS avg, max(score), min(score), stddev(score)')
                ->from('annotation join score using (annotation_id)
, webpage2annotation, "user"')
                ->where('webpage2annotation.annotation_id = annotation.annotation_id
AND score_type_id = 0
AND "user".user_id = annotation.user_id
AND annotation.topic_id IS NULL
AND annotation.deleted IS FALSE
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'
AND webpage2annotation.webpage_id = '.$this->obs_webpage_id.'')
                ->where('email '. $this->in_email)
                ->group_by('email')
                ->get();
        $score_avg = array();
        $score_max = array();
        $score_min = array();
        $score_stddev = array();
        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];
            $score_avg[$email] = $row['avg'];
            $score_min[$email] = $row['min'];
            $score_max[$email] = $row['max'];
            $score_stddev[$email] = $row['stddev'];
        }

        // --------

        $thead = array(
            '撰寫者',
            '標註次數',
            '平均標註分數',
            '最小標註分數',
            '最大標註分數',
            '標註分數標準差',
            '推薦次數',
            '接受次數',
            '建議推薦接受比率',
            '報告分數', '測驗分數', '綜合分數', '分組');

        $tbody = array();

        $query = $this->db->select('"user"."email"
, count(annotation.annotation_id) AS annotation_count')
            ->from('webpage2annotation, "user" AS "user"
, annotation')
            ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.topic_id IS NULL
AND annotation.user_id = "user"."user_id"
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'')
            ->where('email '. $this->in_email)
            ->order_by('email')
            ->group_by('email')
            ->get();

        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];

            $r_count = 0;
            if (isset($recommend_count[$email]))
                $r_count = $recommend_count[$email];
            $a_count = 0;
            if (isset($accept_count[$email]))
                $a_count = $accept_count[$email];

            $rate = 0;
            if ($r_count > 0)
                $rate = $a_count / $r_count;
            //if (isset($recommend[$email]) && $recommend[$email] != 0)
            //{
            //    $rate = $acceptance[$email] / $recommend[$email];
            //}

            $avg = 0;
            $min = 0;
            $max = 0;
            $stddev = 0;
            if (isset($score_avg[$email]))
            {
                $avg = $score_avg[$email];
                $min = $score_min[$email];
                $max = $score_max[$email];
                $stddev = $score_stddev[$email];
            }
                

            $tbody[] = array(
                $email,
                $row['annotation_count'],
                $avg,
                $min,
                $max,
                $stddev,
                $r_count,
                $a_count,
                $rate,
                $this->obs_report_score[$email],
                $this->obs_test_score[$email],
                $this->obs_mix_score[$email],
                $this->obs_group[$email]
            );
        }

        $this->_display_body($title, $thead, $tbody);

        $this->_display_footer();

    }

    function mix_scores() {

        $title = __FUNCTION__;

        $this->_display_header($title);

        $thead = array(
            '受試者',
            '報告分數',
            '測驗分數',
            '混合分數',
            '分組'
        );

        $tbody = array();
        $mix_scores = array();

        $report_min = min($this->obs_report_score);
        $report_max = max($this->obs_report_score);
        $report_interval = $report_max - $report_min;

        $test_min = min($this->obs_test_score);
        $test_max = max($this->obs_test_score);
        $test_interval = $test_max - $test_min;

        foreach ($this->obs_email AS $email)
        {
            $score = 0;

            $report_score = $this->obs_report_score[$email];
            $adjust_report_score = 0;
            if ($report_interval > 0)
                $adjust_report_score = (($report_score - $report_min) / $report_interval) / 2;
            $score = $score + $adjust_report_score;

            $test_score = $this->obs_test_score[$email];
            $adjust_report_score = 0;
            if ($test_interval > 0)
                $adjust_test_score = (($test_score - $test_min) / $test_interval) / 2;
            $score = $score + $adjust_test_score;

            $mix_scores[$email] = $score;

            $tbody[] = array(
                $email,
                $report_score,
                $test_score,
                $score,
                $this->obs_group[$email]
            );
        }

        $this->_display_body($title, $thead, $tbody);

        $this->_display_footer();
    }

    function annotation_skill_type() {

        $title = __FUNCTION__;

        $this->_display_header($title);

        $query = $this->db->select('annotation.annotation_id, "user"."email"
, annotation.annotation_type_id, score')
                ->from('"user"
, webpage2annotation
, annotation
, score')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.user_id = "user"."user_id"
AND annotation.deleted IS FALSE
AND annotation.topic_id IS NULL
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'
AND score.annotation_id = annotation.annotation_id
AND score.score_type_id = 3')
            ->where('email '. $this->in_email)
            ->order_by('email')
            ->get();


        $type_serial = array();
        $type_norepeat_serial = array();

        $type_skill = array();
        $annotation_count = array();

        $social_function = array(
            1 => 1.448036458,
3 =>1.405454481,
2 => 1.396553566,
6 => 1.458005483,
4 => 1.291950012
        );

        $freq_count = array();
        $freq_total = 0;
        $comp_count = array();
        $comp_total = 0;

        $thead = array(
            '受試者',
            '閱讀理解分數',
            '閱讀理解分數高低分組_1低_2高',
            '標註編號',
            '標註策略類型編號',
            '專家調查',
            '加權社群行為'
        );

        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];
            $type = $row['annotation_type_id'];
            $annotation_id = $row['annotation_id'];

            if (isset($annotation_count[$email]) == FALSE)
                $annotation_count[$email] = 0;
            $annotation_count[$email]++;

            if (isset($type_skill[$email]) == FALSE)
                $type_skill[$email] = array(
                    '1' => 0,
                    '2' => 0,
                    '3' => 0,
                    '4' => 0,
                    '6' => 0
                );
            if (isset($type_skill[$email][$type]) == FALSE)
                $type_skill[$email][$type] = 0;
            $type_skill[$email][$type]++;

            //次數與加權次數
            $count = $type;
            if (isset($comp_count[$count]) == FALSE)
            {
                $freq_count[$count] = 0;
                $comp_count[$count] = 0;
            }
            $freq_count[$count]++;
            $comp_count[$count] += $this->obs_mix_score[$email];

            $freq_total++;
            $comp_total += $this->obs_mix_score[$email];

            $tbody[] = array(
                $email,
                $this->obs_mix_score[$email],
                $this->obs_group[$email],
                $annotation_id,
                $count,
                $row['score'],
                $social_function[$count]
            );

            if (isset($type_serial[$email]) === FALSE)
            {
                $type_serial[$email] = '';
            }
            $type_serial[$email] .= $type;

            if (isset($type_norepeat_serial[$email]) === FALSE)
            {
                $type_norepeat_serial[$email] = '';
            }
            if (substr($type_norepeat_serial[$email], -1, 1) != $type.'')
                $type_norepeat_serial[$email] .= $type;
        }

        $this->_display_body('標註列表with標註策略類別', $thead, $tbody);
        
        // ----------------------------

        $thead = array(
            '標註策略類型編號',
            '次數',
            '次數百分比_除以'.$freq_total.'',
            '加權次數',
            '加權次數百分比_除以'.$comp_total.''
        );

        $tbody = array();
        foreach ($freq_count AS $consensus => $freq)
        {

            $comp_freq = $comp_count[$consensus];

            $tbody[] = array(
                $consensus,
                $freq,
                ($freq/$freq_total)*100,
                $comp_freq,
                ($comp_freq/$comp_total)*100
            );

        }

        $this->_display_body('標註策略類別次數分配表', $thead, $tbody);


        $this->_display_hr();
        
        // --------------

        $thead = array('受試者', '重複序列', '不重複序列');
        $tbody = array();

        foreach ($this->obs_email AS $email)
        {
            $serial = '';
            if (isset($type_serial[$email]))
                $serial = $type_serial[$email];

            $norepeat_serial = '';
            if (isset($type_norepeat_serial[$email]))
                $norepeat_serial = $type_norepeat_serial[$email];

            $tbody[] = array(
                $email,
                $serial,
                $norepeat_serial
            );
        }

        $this->_display_body('標註策略類別序列分析', $thead, $tbody);

        $this->_display_hr();

        // --------------

        $thead = array(
            '撰寫者',
            '分組',
            '標註次數',
            '重要(1)',
            '重要(1) 百分比',
            '質疑(2)',
            '質疑(2) 百分比',
            '困惑(3)',
            '困惑(3) 百分比',
            '摘要(4)',
            '摘要(4) 百分比',
            '舉例(6)',
            '舉例(6) 百分比',
            '報告分數',
            '測驗分數',
            '綜合分數'
        );

        $tbody = array();
        foreach ($this->obs_email AS $email)
        {
            $count = $annotation_count[$email];

            $tbody[] = array(
                $email,
                $this->obs_group[$email],
                $annotation_count[$email],
                $type_skill[$email][1],
                ($type_skill[$email][1] / $count),
                $type_skill[$email][2],
                ($type_skill[$email][2] / $count) ,
                $type_skill[$email][3],
                ($type_skill[$email][3] / $count),
                $type_skill[$email][4],
                ($type_skill[$email][4] / $count),
                $type_skill[$email][6],
                ($type_skill[$email][6] / $count),
                $this->obs_report_score[$email],
                $this->obs_test_score[$email],
                $this->obs_mix_score[$email]
            );
        }

        $this->_display_body($title, $thead, $tbody);

        $this->_display_footer();

    }

    function annotation_skill_length() {

        $title = __FUNCTION__;

        $this->_display_header($title);

//SELECT email
//, count(annotation.annotation_id)
//, max(scope_length)
//, min(scope_length)
//, avg(scope_length)
//FROM "user"
//, annotation join annotation2scope_length using(annotation_id)
//, webpage2annotation
//WHERE
//annotation.user_id = "user".user_id
//AND webpage_id = 1142
//AND webpage2annotation.annotation_id = annotation.annotation_id
//AND annotation.topic_id IS NULL
//AND annotation.deleted IS FALSE
//GROUP BY email

        $query = $this->db->select('email
, count(annotation.annotation_id) AS count
, max(scope_length) AS max
, min(scope_length) AS min
, avg(scope_length) AS avg
, stddev(scope_length) AS stddev')
                ->from('"user"
, annotation join annotation2scope_length using(annotation_id)
, webpage2annotation')
                ->where('annotation.user_id = "user".user_id
AND webpage_id = '.$this->obs_webpage_id.'
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.topic_id IS NULL
AND annotation.deleted IS FALSE
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'')
            ->where('email '. $this->in_email)
            ->group_by('email')
            ->order_by('email')
            ->get();

        $thead = array(
            '撰寫者',
            '分組',
            '標註次數',
            '最大範圍長度',
            '最小範圍長度',
            '平均範圍長度',
            '範圍長度標準差',
            '報告分數',
            '測驗分數',
            '綜合分數'
        );

        $tbody = array();

        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];

            $tbody[] = array(
                $email,
                $this->obs_group[$email],
                $row['count'],
                $row['max'],
                $row['min'],
                $row['avg'],
                $row['stddev'],
                $this->obs_report_score[$email],
                $this->obs_test_score[$email],
                $this->obs_mix_score[$email]
            );
        }

        $this->_display_body($title, $thead, $tbody);


        // -----------

        $thead = array(
            '長度',
            '次數',
            '次數百分比',
            '累積次數',
            '累積次數百分比'
        );

//select scope_length, count(annotation2scope_length.annotation_id)
//from annotation2scope_length join annotation using (annotation_id),
//"user", webpage2annotation
//where
//annotation.user_id = "user".user_id
//AND webpage2annotation.annotation_id = annotation.annotation_id
//AND annotation.topic_id IS NULL
//AND annotation.deleted IS FALSE
//GROUP BY scope_length
//ORDER BY scope_length

        $query = $this->db->select('scope_length, count(annotation2scope_length.annotation_id)')
                ->from('annotation2scope_length join annotation using (annotation_id),
"user", webpage2annotation')
                ->where('annotation.user_id = "user".user_id
AND webpage2annotation.annotation_id = annotation.annotation_id
AND webpage_id = '.$this->obs_webpage_id.'
AND annotation.topic_id IS NULL
AND annotation.deleted IS FALSE
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'')
                ->where('email '. $this->in_email)
                ->group_by('scope_length')
                ->order_by('scope_length')
                ->get();

        $accumulate_count = 0;

        $tbody = array();
        foreach ($query->result_array() AS $row)
        {
            $count = $row['count'];
            $accumulate_count = $accumulate_count + $count;

            $tbody[] = array(
                $row['scope_length'],
                $row['count'],
                //($row['count'] / $all_count),
                $accumulate_count
                //($accumulate_count / $all_count)
            );
        }

        $all_count = $accumulate_count;
        foreach ($tbody AS $key => $row)
        {
            $tbody[$key] = array(
                $row[0],
                $row[1],
                ($row[1] / $all_count),
                $row[2],
                ($row[2] / $all_count)
            );
        }

        $this->_display_body('標註範圍次數分配表', $thead, $tbody);

        // --------

        $revise_score = array(
1 => 0.022596367,
2 => 0.04546965,
3 => 0.080970315,
4 => 0.183983163,
5 => 0.083739477,
6 => 0.038103677,
7 => 0.056214001,
8 => 0.057432432,
9 => 0.035611431,
10 => 0.020879486,
11 => 0.036663713,
12 => 0.018885689,
13 => 0.014842712,
14 => 0.01140895,
15 => 0.010024369,
16 => 0.008307488,
17 => 0.020048737,
18 => 0.021821001,
19 => 0.007809039,
20 => 0.010910501,
23 => 0.008695171,
24 => 0.014344262,
25 => 0.012239699,
26 => 0.002990696,
27 => 0.009082853,
28 => 0.002990696,
29 => 0.006202924,
30 => 0.005538325,
31 => 0.00476296,
32 => 0.001772264,
33 => 0.013291981,
34 => 0.001716881,
35 => 0.002990696,
39 => 0.002990696,
40 => 0.002990696,
41 => 0.000553833,
45 => 0.006535224,
46 => 0.004707576,
48 => 0.001772264,
54 => 0.007642889,
56 => 0.006092158,
57 => 0.005759858,
58 => 0.010190518,
60 => 0.002990696,
61 => 0.003710678,
64 => 0.002990696,
67 => 0.002270713,
70 => 0.001772264,
73 => 0.004818343,
77 => 0.000553833,
83 => 0.004375277,
88 => 0.003101462,
91 => 0.003101462,
94 => 0.000553833,
95 => 0.001550731,
100 => 0.00426451,
101 => 0.002270713,
104 => 0.001716881,
108 => 0.003101462,
109 => 0.005538325,
122 => 0.003433762,
133 => 0.004486043,
186 => 0.001550731,
232 => 0.002990696,
237 => 0.01107665,
273 => 0.003101462,
340 => 0.001550731,
359 => 0.001550731
        );

        $thead = array(
            '撰寫者',
            '標註編號',
            '閱讀理解分數',
            '閱讀理解分數高低分組_1低_2高',
            '標註長度',
            '專家模糊隸屬度',
            '社群模糊隸屬度'
            );

        $tbody = array();
        $query = $this->db->select('annotation.annotation_id
, "user"."email", "scope_length, "score"')
                ->from('annotation2scope_length,
webpage2annotation, annotation, "user" AS "user", score')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND annotation2scope_length.annotation_id = annotation.annotation_id
AND annotation.topic_id IS NULL
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.deleted IS FALSE
AND annotation.user_id = "user"."user_id"
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'
AND score.annotation_id = annotation.annotation_id
AND score.score_type_id = 5')
                ->where('email '. $this->in_email)
                ->order_by('scope_length')
                ->get();

        $length_count = array();
        $total_count = 0;
        foreach ($query->result_array() AS $row)
        {
            $id = $row['annotation_id'];
            $scope_length = intval($row['scope_length']);
            $email = $row['email'];
            $tbody[] = array(
                $email,
                $id,
                $this->obs_mix_score[$email],
                $this->obs_group[$email],
                $row['scope_length'],
                $row['score'],
                $revise_score[$scope_length]
            );

            if (isset($length_count[$scope_length]) === FALSE)
            {
                $length_count[$scope_length] = 0;
            }
            $length_count[$scope_length] += $this->obs_mix_score[$email];
            $total_count += $this->obs_mix_score[$email];
        }
        $this->_display_body('標註與標註範圍列表', $thead, $tbody);

        // ---------

        $thead = array(
            '標註長度',
            '加權次數',
            '加權次數百分比',
            '累減次數',
            '累減次數百分比',);

        $title = '標註加權長度次數分配表 (總次數='. $total_count .')';

        $tbody = array();
        $remain_count = $total_count;
        foreach ($length_count AS $length => $count)
        {
            $tbody[] = array(
                $length,
                $count,
                ($count / $total_count) * 100,
                $remain_count,
                ($remain_count / $total_count) * 100
            );

            $remain_count -= $count;
        }
        $this->_display_body($title, $thead, $tbody);

        $this->_display_footer();

    }

    function like() {

        $title = __FUNCTION__;

        $this->_display_header($title);

        // -------------------------

        $social_function = array(
            0 => 1,
1 => 2.64,
2 => 2.97,
3 => 2.98,
4 => 2.99
        );

        $thead = array(
            '受試者',
            '標註編號',
            '閱讀理解分數',
            '閱讀理解分數高低分組_1低_2高',
            '標註喜愛共識',
            '專家模糊隸屬度',
            '社群模糊隸屬度'
            );

        $tbody = array();
        $query = $this->db->select('annotation.annotation_id
, "user"."email", "like_count, "score"')
                ->from('annotation2like_count,
webpage2annotation, annotation, "user" AS "user", score')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND annotation2like_count.annotation_id = annotation.annotation_id
AND annotation.topic_id IS NULL
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.deleted IS FALSE
AND annotation.user_id = "user"."user_id"
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'
AND score.annotation_id = annotation.annotation_id
AND score.score_type_id = 2')
                ->where('email '. $this->in_email)
                ->order_by('like_count')
                ->get();


        $freq_count = array();
        $freq_total = 0;
        $comp_count = array();
        $comp_total = 0;

        foreach ($query->result_array() AS $row)
        {
            $id = $row['annotation_id'];
            $count = intval($row['like_count']);
            $email = $row['email'];
            $tbody[] = array(
                $email,
                $id,
                $this->obs_mix_score[$email],
                $this->obs_group[$email],
                $count,
                $row['score'],
                $social_function[$count]
            );

            //次數與加權次數
            if (isset($comp_count[$count]) == FALSE)
            {
                $freq_count[$count] = 0;
                $comp_count[$count] = 0;
            }
            $freq_count[$count]++;
            $comp_count[$count] += $this->obs_mix_score[$email];

            $freq_total++;
            $comp_total += $this->obs_mix_score[$email];
        }
        $this->_display_body('標註列表_標註喜愛共識', $thead, $tbody);

        // ---------------------------

        $thead = array(
            '標註喜愛共識',
            '次數',
            '次數百分比_除以'.$freq_total.'',
            '累加次數',
            '累加次數百分比_除以'.$freq_total.'',
            '加權次數',
            '加權次數百分比_除以'.$comp_total.'',
            '累加加權次數',
            '累加加權次數百分比_除以'.$comp_total.''
        );

        $freq_plus = 0;
        $comp_plus = 0;

        ksort($freq_count);

        $tbody = array();
        foreach ($freq_count AS $consensus => $freq)
        {

            $comp_freq = $comp_count[$consensus];

            $tbody[] = array(
                $consensus,
                $freq,
                ($freq/$freq_total)*100,
                $freq_plus,
                ($freq_plus/$freq_total)*100,
                $comp_freq,
                ($comp_freq/$comp_total)*100,
                $comp_plus,
                ($comp_plus/$comp_total)*100
            );

            $freq_plus += $freq;
            $comp_plus += $comp_freq;

        }

        $this->_display_body('標註喜愛共識次數分配表', $thead, $tbody);

        
        $this->_display_hr();

        // --------------------------

//SELECT
//do_like.email AS like_actor,
//liked.email AS liked,
//annotation2like.canceled
//FROM
//annotation2like join annotation using (annotation_id),
//"user" AS do_like,
//"user" AS liked,
//webpage2annotation
//WHERE webpage2annotation.webpage_id = 1142
//AND webpage2annotation.annotation_id = annotation.annotation_id
//AND do_like.user_id = annotation2like.user_id
//AND liked.user_id = annotation.user_id
//AND annotation.deleted IS FALSE
//AND annotation.topic_id IS NULL

        $query = $this->db->select('do_like.email AS do_like,
liked.email AS liked,
annotation2like.canceled')
                ->from('annotation2like join annotation using (annotation_id),
"user" AS do_like,
"user" AS liked,
webpage2annotation')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND webpage2annotation.annotation_id = annotation.annotation_id
AND do_like.user_id = annotation2like.user_id
AND liked.user_id = annotation.user_id
AND annotation.deleted IS FALSE
AND annotation.topic_id IS NULL
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'')
                ->where('do_like.email '. $this->in_email)
                ->order_by('do_like.email')
                ->get();

        $do_like_count = array();
        $do_like_cancel_count = array();
        $liked_count = array();
        $liked_cancel_count = array();

        foreach ($query->result_array() AS $row)
        {
            $do_like = $row['do_like'];

            

            // ----

            $liked = $row['liked'];

            

            // ----
            $canceled = $row['canceled'];

            if ($canceled == 't')
            {
                if (isset($do_like_cancel_count[$do_like]) == false)
                    $do_like_cancel_count[$do_like] = 0;
                $do_like_cancel_count[$do_like]++;

                if (isset($liked_cancel_count[$do_like]) == false)
                    $liked_cancel_count[$do_like] = 0;
                $liked_cancel_count[$do_like]++;
            }
            else
            {
                if (isset($do_like_count[$do_like]) == false)
                    $do_like_count[$do_like] = 0;
                $do_like_count[$do_like]++;

                if (isset($liked_count[$liked]) == false)
                    $liked_count[$liked] = 0;
                $liked_count[$liked]++;
            }
        }

        $thead = array(
            '受試者',
            '加入喜歡標註次數',
            '移出喜愛標註次數',
            '標註被加入喜愛次數',
            '標註被移除喜愛次數',
            '標註被加入喜愛比率',
            '標註次數',
            '報告分數',
            '測驗分數',
            '綜合分數'
        );

        $query = $this->db->select('email, count(annotation.annotation_id)')
                ->from('annotation join "user" using (user_id), webpage2annotation')
                ->where('webpage_id = '.$this->obs_webpage_id.'
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.topic_id IS NULL
AND annotation.deleted IS FALSE
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'')
                ->where('email '. $this->in_email)
                ->group_by('email')
                ->order_by('email')
                ->get();

        $tbody = array();
        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];
            $count = $row['count'];

            if (isset($do_like_count[$email]) == FALSE)
                $do_like_count[$email] = 0;
            if (isset($do_like_cancel_count[$email]) == FALSE)
                $do_like_cancel_count[$email] = 0;
            if (isset($liked_count[$email]) == FALSE)
                $liked_count[$email] = 0;
            if (isset($liked_cancel_count[$email]) == FALSE)
                $liked_cancel_count[$email] = 0;

            $tbody[] = array(
                $email,
                $do_like_count[$email],
                $do_like_cancel_count[$email],
                $liked_count[$email],
                $liked_cancel_count[$email],
                ($liked_count[$email] / $count),
                $row['count'],
                $this->obs_report_score[$email],
                $this->obs_test_score[$email],
                $this->obs_mix_score[$email]
            );
        }

        $this->_display_body($title, $thead, $tbody);

        // -----------


//SELECT email
//, count(annotation.annotation_id)
//, max(like_count)
//, min(like_count)
//, avg(like_count)
//FROM "user"
//, annotation join annotation2like_count using(annotation_id)
//, webpage2annotation
//WHERE
//annotation.user_id = "user".user_id
//AND webpage_id = 1142
//AND webpage2annotation.annotation_id = annotation.annotation_id
//AND annotation.topic_id IS NULL
//AND annotation.deleted IS FALSE
//GROUP BY email

        $query = $this->db->select('email
, count(annotation.annotation_id) AS count
, max(like_count) AS max
, min(like_count) AS min
, avg(like_count) AS avg
, stddev(like_count) AS stddev')
                ->from('"user"
, annotation join annotation2like_count using(annotation_id)
, webpage2annotation')
                ->where('annotation.user_id = "user".user_id
AND webpage_id = '.$this->obs_webpage_id.'
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.topic_id IS NULL
AND annotation.deleted IS FALSE
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'')
            ->where('email '. $this->in_email)
            ->group_by('email')
            ->order_by('email')
            ->get();

        $thead = array(
            '撰寫者',
            '分組',
            '標註次數',
            '最大被喜愛共識次數',
            '最小被喜愛共識次數',
            '平均被喜愛共識次數',
            '被喜愛共識 次數標準差',
            '報告分數',
            '測驗分數',
            '綜合分數'
        );

        $tbody = array();

        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];

            $tbody[] = array(
                $email,
                $this->obs_group[$email],
                $row['count'],
                $row['max'],
                $row['min'],
                $row['avg'],
                $row['stddev'],
                $this->obs_report_score[$email],
                $this->obs_test_score[$email],
                $this->obs_mix_score[$email]
            );
        }

        $this->_display_body('標註喜愛共識次數個人統計表', $thead, $tbody);


        // -----------


        $thead = array(
            '喜愛次數',
            '次數',
            '次數百分比',
            '累積次數',
            '累積次數百分比'
        );

//select like_count, count(annotation2like_count.annotation_id)
//from annotation2like_count join annotation using (annotation_id),
//"user", webpage2annotation
//where
//annotation.user_id = "user".user_id
//AND webpage2annotation.annotation_id = annotation.annotation_id
//AND annotation.topic_id IS NULL
//AND annotation.deleted IS FALSE
//GROUP BY like_count
//ORDER BY like_count DESC

        $query = $this->db->select('like_count, count(annotation2like_count.annotation_id)')
                ->from('annotation2like_count join annotation using (annotation_id),
"user", webpage2annotation')
                ->where('annotation.user_id = "user".user_id
AND webpage2annotation.annotation_id = annotation.annotation_id
AND webpage_id = '.$this->obs_webpage_id.'
AND annotation.topic_id IS NULL
AND annotation.deleted IS FALSE
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'')
                ->where('email '. $this->in_email)
                ->group_by('like_count')
                ->order_by('like_count', 'DESC')
                ->get();

        $accumulate_count = 0;

        $tbody = array();
        foreach ($query->result_array() AS $row)
        {
            $count = $row['count'];
            $accumulate_count = $accumulate_count + $count;

            $tbody[] = array(
                $row['like_count'],
                $row['count'],
                //($row['count'] / $all_count),
                $accumulate_count
                //($accumulate_count / $all_count)
            );
        }

        $all_count = $accumulate_count;
        foreach ($tbody AS $key => $row)
        {
            $tbody[$key] = array(
                $row[0],
                $row[1],
                ($row[1] / $all_count),
                $row[2],
                ($row[2] / $all_count)
            );
        }

        $this->_display_body('喜愛次數分配表', $thead, $tbody);

        $this->_display_footer();

    }

    function location()
    {
        $title = __FUNCTION__;

        $this->_display_header($title);

        // ----------------------

        $social_function = array(
            0 => 0.444339832,
            3 => 0.339222419,
            4 => 0.218653079,
            1 => 0.177835623,
            5 => 0.147596367,
            6 => 0.079641117,
            2 => 0.039709792
        );

//select email, annotation.annotation_id, value
//from annotation join feature using (annotation_id)
//, "user", webpage2annotation
//where
//annotation.user_id = "user".user_id
//AND webpage2annotation.annotation_id = annotation.annotation_id
//AND feature_type_id = 1
//AND annotation.topic_id IS NULL
//AND annotation.deleted IS FALSE
//ORDER BY email

        $query = $this->db->select('email, annotation.annotation_id, value, score')
                ->from('annotation join feature using (annotation_id)
, "user", webpage2annotation, score')
                ->where('annotation.user_id = "user".user_id
AND webpage2annotation.annotation_id = annotation.annotation_id
AND feature_type_id = 1
AND webpage_id = '.$this->obs_webpage_id.'
AND annotation.topic_id IS NULL
AND annotation.deleted IS FALSE
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'
AND score.annotation_id = annotation.annotation_id
AND score.score_type_id = 6')
                ->where('email '. $this->in_email)
                ->order_by('email')
                ->get();

        $location_type_list = array();
        $annotation_count = array();

        $freq_count = array();
        $freq_total = 0;
        $comp_count = array();
        $comp_total = 0;

        $thead = array(
            '受試者',
            '閱讀理解分數',
            '閱讀理解分數高低分組_1低_2高',
            '標註編號',
            '標註位置',
            '專家調查'
        );
        $tbody = array();

        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];

            if (isset($annotation_count[$email]) == FALSE)
                $annotation_count[$email] = 0;
            $annotation_count[$email]++;

            if (isset($location_type_list[$email]) == FALSE)
                $location_type_list[$email] = array();

            $count_text = '';
            $social_score = 0;

            if ($row['value'] != '')
            {
                $value = json_decode( $row['value'] );

                if (is_array($value))
                {
                    foreach ($value AS $type)
                    {
                        if (isset($location_type_list[$email][$type]) == false)
                            $location_type_list[$email][$type] = 0;
                        $location_type_list[$email][$type]++;

                        $count = $type;
                        //次數與加權次數
                        if (isset($comp_count[$count]) == FALSE)
                        {
                            $freq_count[$count] = 0;
                            $comp_count[$count] = 0;
                        }
                        $freq_count[$count]++;
                        $comp_count[$count] += $this->obs_mix_score[$email];

                        $count_text .= $count.' ';

                        $social_score = $social_function[$count];

                        if (in_array($count, array(1,2,3,5)))
                            continue;

                        $tbody[] = array(
                            $email,
                            $this->obs_mix_score[$email],
                            $this->obs_group[$email],
                            $row['annotation_id'],
                            $count,
                            $row['score']
                        );
                    }
                }   //if (is_array($value))
                else
                {
                    if (isset($location_type_list[$email][6]) == false)
                        $location_type_list[$email][6] = 0;
                    $location_type_list[$email][6]++;

                    $count = 6;

                    //次數與加權次數
                    if (isset($comp_count[$count]) == FALSE)
                    {
                        $freq_count[$count] = 0;
                        $comp_count[$count] = 0;
                    }
                    $freq_count[$count]++;
                    $comp_count[$count] += $this->obs_mix_score[$email];

                    $count_text .= $count.' ';

                    $social_score = $social_function[$count];

                    $tbody[] = array(
                        $email,
                        $this->obs_mix_score[$email],
                        $this->obs_group[$email],
                        $row['annotation_id'],
                        $count,
                        $row['score']
                    );
                }
            }   //if ($row['value'] != '')
            else
            {
                if (isset($location_type_list[$email][6]) == false)
                    $location_type_list[$email][6] = 0;
                $location_type_list[$email][6]++;

                $count = 6;

                //次數與加權次數
                if (isset($comp_count[$count]) == FALSE)
                {
                    $freq_count[$count] = 0;
                    $comp_count[$count] = 0;
                }
                $freq_count[$count]++;
                $comp_count[$count] += $this->obs_mix_score[$email];

                $count_text .= $count.' ';

                $social_score = $social_function[$count];

                $tbody[] = array(
                    $email,
                    $this->obs_mix_score[$email],
                    $this->obs_group[$email],
                    $row['annotation_id'],
                    $count,
                    $row['score']
                );
            }

            $freq_total++;
            $comp_total += $this->obs_mix_score[$email];

            
        }   //foreach ($query->result_array() AS $row)

        $this->_display_body('標註列表feature標註範圍位置', $thead, $tbody);

        return;

        // ----------------------

        $social_function = array(
            0 => 0.444339832,
            3 => 0.339222419,
            4 => 0.218653079,
            1 => 0.177835623,
            5 => 0.147596367,
            6 => 0.079641117,
            2 => 0.039709792
        );

//select email, annotation.annotation_id, value
//from annotation join feature using (annotation_id)
//, "user", webpage2annotation
//where
//annotation.user_id = "user".user_id
//AND webpage2annotation.annotation_id = annotation.annotation_id
//AND feature_type_id = 1
//AND annotation.topic_id IS NULL
//AND annotation.deleted IS FALSE
//ORDER BY email

        $query = $this->db->select('email, annotation.annotation_id, value, score')
                ->from('annotation join feature using (annotation_id)
, "user", webpage2annotation, score')
                ->where('annotation.user_id = "user".user_id
AND webpage2annotation.annotation_id = annotation.annotation_id
AND feature_type_id = 1
AND webpage_id = '.$this->obs_webpage_id.'
AND annotation.topic_id IS NULL
AND annotation.deleted IS FALSE
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'
AND score.annotation_id = annotation.annotation_id
AND score.score_type_id = 6')
                ->where('email '. $this->in_email)
                ->order_by('email')
                ->get();

        $location_type_list = array();
        $annotation_count = array();

        $freq_count = array();
        $freq_total = 0;
        $comp_count = array();
        $comp_total = 0;

        $thead = array(
            '受試者',
            '閱讀理解分數',
            '閱讀理解分數高低分組_1低_2高',
            '標註編號',
            '標註位置',
            '專家調查',
            '加權社群行為'
        );
        $tbody = array();

        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];

            if (isset($annotation_count[$email]) == FALSE)
                $annotation_count[$email] = 0;
            $annotation_count[$email]++;

            if (isset($location_type_list[$email]) == FALSE)
                $location_type_list[$email] = array();

            $count_text = '';
            $social_score = 0;

            if ($row['value'] != '')
            {
                $value = json_decode( $row['value'] );

                if (is_array($value))
                {
                    foreach ($value AS $type)
                    {
                        if (isset($location_type_list[$email][$type]) == false)
                            $location_type_list[$email][$type] = 0;
                        $location_type_list[$email][$type]++;

                        $count = $type;
                        //次數與加權次數
                        if (isset($comp_count[$count]) == FALSE)
                        {
                            $freq_count[$count] = 0;
                            $comp_count[$count] = 0;
                        }
                        $freq_count[$count]++;
                        $comp_count[$count] += $this->obs_mix_score[$email];

                        $count_text .= $count.' ';

                        $social_score = $social_function[$count];
                    }
                }   //if (is_array($value))
                else
                {
                    if (isset($location_type_list[$email][6]) == false)
                        $location_type_list[$email][6] = 0;
                    $location_type_list[$email][6]++;

                    $count = 6;

                    //次數與加權次數
                    if (isset($comp_count[$count]) == FALSE)
                    {
                        $freq_count[$count] = 0;
                        $comp_count[$count] = 0;
                    }
                    $freq_count[$count]++;
                    $comp_count[$count] += $this->obs_mix_score[$email];

                    $count_text .= $count.' ';

                    $social_score = $social_function[$count];
                }
            }   //if ($row['value'] != '')
            else
            {
                if (isset($location_type_list[$email][6]) == false)
                    $location_type_list[$email][6] = 0;
                $location_type_list[$email][6]++;

                $count = 6;

                //次數與加權次數
                if (isset($comp_count[$count]) == FALSE)
                {
                    $freq_count[$count] = 0;
                    $comp_count[$count] = 0;
                }
                $freq_count[$count]++;
                $comp_count[$count] += $this->obs_mix_score[$email];

                $count_text .= $count.' ';

                $social_score = $social_function[$count];
            }

            $freq_total++;
            $comp_total += $this->obs_mix_score[$email];

            $tbody[] = array(
                $email,
                $this->obs_mix_score[$email],
                $this->obs_group[$email],
                $row['annotation_id'],
                $count_text,
                $row['score'],
                $social_score
            );
        }   //foreach ($query->result_array() AS $row)

        $this->_display_body('標註列表feature標註範圍位置', $thead, $tbody);

        // ------------------

        $thead = array(
            '標註範圍位置',
            '次數',
            '次數百分比_除以'.$freq_total.'',
            '加權次數',
            '加權次數百分比_除以'.$comp_total.''
        );

        arsort($freq_count);

        $tbody = array();
        foreach ($freq_count AS $consensus => $freq)
        {

            $comp_freq = $comp_count[$consensus];

            $tbody[] = array(
                $consensus,
                $freq,
                ($freq/$freq_total)*100,
                $comp_freq,
                ($comp_freq/$comp_total)*100
            );
        }

        $this->_display_body('標註範圍位置次數分配表', $thead, $tbody);

        $this->_display_hr();

        // ---------

        $thead = array(
            '受試者',
            '標註次數',
            '開頭(0)',
            '開頭百分比',
            '接近開頭(1)',
            '接近開頭百分比',
            '接近開頭結尾(2)',
            '接近開頭結尾百分比',
            '接近結尾(3)',
            '接近結尾百分比',
            '開頭結尾(5)',
            '開頭結尾百分比',
            '其他(6)與無法判斷',
            '其他百分比'
        );

        $tbody = array();
        foreach ($this->obs_email AS $email)
        {
            $location0 = 0;
            if (isset($location_type_list[$email][0]))
                $location0 = $location_type_list[$email][0];

            $location1 = 0;
            if (isset($location_type_list[$email][1]))
                $location1 = $location_type_list[$email][1];

            $location2 = 0;
            if (isset($location_type_list[$email][2]))
                $location2 = $location_type_list[$email][2];

            $location3 = 0;
            if (isset($location_type_list[$email][3]))
                $location3 = $location_type_list[$email][3];

            $location5 = 0;
            if (isset($location_type_list[$email][5]))
                $location5 = $location_type_list[$email][5];

            $location6 = 0;
            if (isset($location_type_list[$email][6]))
                $location6 = $location_type_list[$email][6];

            $count = 0;
            if (isset($annotation_count[$email]))
                $count = $annotation_count[$email];

            $tbody[] = array(
                $email,
                $count,
                $location0,
                ($location0/$count),
                $location1,
                ($location1/$count),
                $location2,
                ($location2/$count),
                $location3,
                ($location3/$count),
                $location5,
                ($location5/$count),
                $location6,
                ($location6/$count)
            );
        }

        $this->_display_body($title, $thead, $tbody);

        $this->_display_footer();
    }


    function speech()
    {
        $title = __FUNCTION__;

        $this->_display_header($title);

        // -----------------------

        $social_function = array(
            "N" => 1,
"Vt" => 2,
"T" => 3,
"Vi" => 4,
"Nv" => 5,
"DET" => 6,
"COMMACATEGORY" => -1,
"ADV" => 8,
"P" => 9,
"FW" => 10,
"C" => 11,
"default" => 12,
"A" => 13,
"PARENTHESISCATEGORY" => -1,
"POST" => 15,
"M" => 16,
"PERIODCATEGORY" => -1,
"PAUSECATEGORY" => -1,
"ASP" => 19,
"COLONCATEGORY" => -1,
"SEMICOLONCATEGORY" => -1,
"DASHCATEGORY" => -1,
"QUESTIONCATEGORY" => -1
        );

//select email, annotation.annotation_id, segmented
//from annotation join annotation2anchor_text using (annotation_id)
//, "user", webpage2annotation
//where
//annotation.user_id = "user".user_id
//AND webpage2annotation.annotation_id = annotation.annotation_id
//AND annotation.topic_id IS NULL
//AND annotation.deleted IS FALSE
//ORDER BY email

        $query = $this->db->select('email, annotation.annotation_id, segmented, score')
                ->from('annotation join annotation2anchor_text using (annotation_id)
, "user", webpage2annotation, score')
                ->where('annotation.user_id = "user".user_id
AND webpage2annotation.annotation_id = annotation.annotation_id
AND webpage_id = '.$this->obs_webpage_id.'
AND annotation.topic_id IS NULL
AND annotation.deleted IS FALSE
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'
AND score.annotation_id = annotation.annotation_id
AND score.score_type_id = 4')
                ->where('email '. $this->in_email)
                ->order_by('email')
                ->get();

        $speech_type_list = array();
        $annotation_count = array();

        $freq_count = array();
        $freq_total = 0;
        $comp_count = array();
        $comp_total = 0;

        $thead = array(
            '受試者',
            '閱讀理解分數',
            '閱讀理解分數高低分組_1低_2高',
            '標註編號',
            '標註詞性代號',
            '專家調查',
            '加權社群行為'
        );
        $tbody = array();

        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];

            if (isset($annotation_count[$email]) == FALSE)
                $annotation_count[$email] = 0;
            $annotation_count[$email]++;

            if (isset($speech_type_list[$email]) == FALSE)
                $speech_type_list[$email] = array();

            $segmented = $row['segmented'];

            $list = array();

            $splited_array = explode(' ', $segmented);

            foreach ($splited_array AS $splited)
            {
                $slash = strrpos($splited, '/');

                if ($slash === FALSE)
                    continue;

                $speech = substr($splited, $slash + 1);

                if (in_array($speech, $list) == FALSE)
                    $list[] = $speech;
            }

            if (isset($speech_type_list[$email]) === FALSE)
                $speech_type_list[$email] = array();

            $count_text = '';
            $social_score = 0;

            if (count($list) == 0)
            {
                if (isset($speech_type_list[$email]['default']) == FALSE)
                    $speech_type_list[$email]['default'] = 0;
                $speech_type_list[$email]['default']++;

                $speech = 'default';
                //次數與加權次數
                if (isset($comp_count[$speech]) == FALSE)
                {
                    $freq_count[$speech] = 0;
                    $comp_count[$speech] = 0;
                }
                $freq_count[$speech]++;
                $comp_count[$speech] += $this->obs_mix_score[$email];

                $count_text .= $speech.' ';

                $social_score = $social_function[$speech];

                if ($social_function[$speech] == -1)
                    continue;

                $tbody[] = array(
                    $email,
                    $this->obs_mix_score[$email],
                    $this->obs_group[$email],
                    $row['annotation_id'],
                    $social_function[$speech],
                    //$count_text//,
                    $row['score'],
                    $social_score
                );
            }
            else
            {
                foreach ($list AS $speech)
                {
                    if (isset($speech_type_list[$email][$speech]) == FALSE)
                        $speech_type_list[$email][$speech] = 0;
                    $speech_type_list[$email][$speech]++;

                    //次數與加權次數
                    if (isset($comp_count[$speech]) == FALSE)
                    {
                        $freq_count[$speech] = 0;
                        $comp_count[$speech] = 0;
                    }
                    $freq_count[$speech]++;
                    $comp_count[$speech] += $this->obs_mix_score[$email];

                    $count_text .= $speech.' ';

                    if ($social_score < $social_function[$speech])
                        $social_score = $social_function[$speech];


                if ($social_function[$speech] == -1)
                    continue;
                
                                $tbody[] = array(
                                    $email,
                                    $this->obs_mix_score[$email],
                                    $this->obs_group[$email],
                                    $row['annotation_id'],
                                    $social_function[$speech],
                                    //$count_text,
                                    $row['score'],
                                    $social_score
                                );
                }
            }

            $freq_total++;
            $comp_total += $this->obs_mix_score[$email];

//
//            $tbody[] = array(
//                $email,
//                $this->obs_mix_score[$email],
//                $this->obs_group[$email],
//                $row['annotation_id'],
//                $count_text,
//                $row['score'],
//                $social_score
//            );
        }

        $this->_display_body('標註列表feature標註範圍詞性', $thead, $tbody);

        return;

        // -----------------------

        $social_function = array(
            "N" => 0.746953921,
"Vt" => 0.553998671,
"T" => 0.348582189,
"Vi" => 0.30942623,
"Nv" => 0.303389455,
"DET" => 0.262405848,
"COMMACATEGORY" => 0.237317235,
"ADV" => 0.231446611,
"P" => 0.185312362,
"FW" => 0.168974302,
"C" => 0.155682322,
"default" => 0.135135135,
"A" => 0.134082853,
"PARENTHESISCATEGORY" => 0.115141781,
"POST" => 0.115031015,
"M" => 0.099689854,
"PERIODCATEGORY" => 0.053334072,
"PAUSECATEGORY" => 0.047352681,
"ASP" => 0.028633141,
"COLONCATEGORY" => 0.021654852,
"SEMICOLONCATEGORY" => 0.005981391,
"DASHCATEGORY" => 0.005538325,
"QUESTIONCATEGORY" => 0.002990696
        );

//select email, annotation.annotation_id, segmented
//from annotation join annotation2anchor_text using (annotation_id)
//, "user", webpage2annotation
//where
//annotation.user_id = "user".user_id
//AND webpage2annotation.annotation_id = annotation.annotation_id
//AND annotation.topic_id IS NULL
//AND annotation.deleted IS FALSE
//ORDER BY email

        $query = $this->db->select('email, annotation.annotation_id, segmented, score')
                ->from('annotation join annotation2anchor_text using (annotation_id)
, "user", webpage2annotation, score')
                ->where('annotation.user_id = "user".user_id
AND webpage2annotation.annotation_id = annotation.annotation_id
AND webpage_id = '.$this->obs_webpage_id.'
AND annotation.topic_id IS NULL
AND annotation.deleted IS FALSE
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'
AND score.annotation_id = annotation.annotation_id
AND score.score_type_id = 4')
                ->where('email '. $this->in_email)
                ->order_by('email')
                ->get();

        $speech_type_list = array();
        $annotation_count = array();

        $freq_count = array();
        $freq_total = 0;
        $comp_count = array();
        $comp_total = 0;

        $thead = array(
            '受試者',
            '閱讀理解分數',
            '閱讀理解分數高低分組_1低_2高',
            '標註編號',
            '標註詞性',
            '專家調查',
            '加權社群行為'
        );
        $tbody = array();

        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];

            if (isset($annotation_count[$email]) == FALSE)
                $annotation_count[$email] = 0;
            $annotation_count[$email]++;

            if (isset($speech_type_list[$email]) == FALSE)
                $speech_type_list[$email] = array();

            $segmented = $row['segmented'];

            $list = array();

            $splited_array = explode(' ', $segmented);

            foreach ($splited_array AS $splited)
            {
                $slash = strrpos($splited, '/');

                if ($slash === FALSE)
                    continue;

                $speech = substr($splited, $slash + 1);

                if (in_array($speech, $list) == FALSE)
                    $list[] = $speech;
            }

            if (isset($speech_type_list[$email]) === FALSE)
                $speech_type_list[$email] = array();

            $count_text = '';
            $social_score = 0;

            if (count($list) == 0)
            {
                if (isset($speech_type_list[$email]['default']) == FALSE)
                    $speech_type_list[$email]['default'] = 0;
                $speech_type_list[$email]['default']++;

                $speech = 'default';
                //次數與加權次數
                if (isset($comp_count[$speech]) == FALSE)
                {
                    $freq_count[$speech] = 0;
                    $comp_count[$speech] = 0;
                }
                $freq_count[$speech]++;
                $comp_count[$speech] += $this->obs_mix_score[$email];

                $count_text .= $speech.' ';

                $social_score = $social_function[$speech];
            }
            else
            {
                foreach ($list AS $speech)
                {
                    if (isset($speech_type_list[$email][$speech]) == FALSE)
                        $speech_type_list[$email][$speech] = 0;
                    $speech_type_list[$email][$speech]++;

                    //次數與加權次數
                    if (isset($comp_count[$speech]) == FALSE)
                    {
                        $freq_count[$speech] = 0;
                        $comp_count[$speech] = 0;
                    }
                    $freq_count[$speech]++;
                    $comp_count[$speech] += $this->obs_mix_score[$email];

                    $count_text .= $speech.' ';

                    if ($social_score < $social_function[$speech])
                        $social_score = $social_function[$speech];
                }
            }

            $freq_total++;
            $comp_total += $this->obs_mix_score[$email];

            $tbody[] = array(
                $email,
                $this->obs_mix_score[$email],
                $this->obs_group[$email],
                $row['annotation_id'],
                $count_text,
                $row['score'],
                $social_score
            );
        }

        $this->_display_body('標註列表feature標註範圍詞性', $thead, $tbody);

        // ----------------------------

        $thead = array(
            '標註範圍詞性',
            '次數',
            '次數百分比_除以'.$freq_total.'',
            '加權次數',
            '加權次數百分比_除以'.$comp_total.''
        );

        arsort($freq_count);

        $tbody = array();
        foreach ($freq_count AS $consensus => $freq)
        {

            $comp_freq = $comp_count[$consensus];

            $tbody[] = array(
                $consensus,
                $freq,
                ($freq/$freq_total)*100,
                $comp_freq,
                ($comp_freq/$comp_total)*100
            );
        }

        $this->_display_body('標註範圍詞性次數分配表', $thead, $tbody);

        $this->_display_hr();

        return;


        $this->_display_hr();

        // ------------------------------


        $thead = array(
            '受試者',
            '標註次數',
            '名詞(N)',
            '名詞百分比',
            '及物動詞(Vt)',
            '及物動詞百分比',
            '量詞(M)',
            '量詞百分比',
            '外文標記(FW)',
            '外文標記百分比',
            '不及物動詞(Vi)',
            '不及物動詞百分比',
            '非謂形容詞(A)',
            '非謂形容詞百分比',
            '副詞(ADV)',
            '副詞百分比',
            '定詞(DET)',
            '定詞百分比',
            '時態標記(ASP)',
            '時態標記百分比',
            '連接詞(POST)',
            '連接詞百分比',
            '對等連接詞(C)',
            '對等連接詞百分比',
            '感嘆詞(T)',
            '感嘆詞百分比',
            '無法辨識(default)',
            '無法辨識百分比'
        );


        $tbody = array();
        foreach ($this->obs_email AS $email)
        {
            $count = 0;
            if (isset($annotation_count[$email]))
                $count = $annotation_count[$email];

            $speechN = 0;
            if (isset($speech_type_list[$email]['N']))
                $speechN = $speech_type_list[$email]['N'];

            $speechVt = 0;
            if (isset($speech_type_list[$email]['Vt']))
                $speechVt = $speech_type_list[$email]['Vt'];

            $speechM = 0;
            if (isset($speech_type_list[$email]['M']))
                $speechM = $speech_type_list[$email]['M'];

            $speechFW = 0;
            if (isset($speech_type_list[$email]['FW']))
                $speechFW = $speech_type_list[$email]['FW'];

            $speechVi = 0;
            if (isset($speech_type_list[$email]['Vi']))
                $speechVi = $speech_type_list[$email]['Vi'];

            $speechA = 0;
            if (isset($speech_type_list[$email]['A']))
                $speechA = $speech_type_list[$email]['A'];

            $speechADV = 0;
            if (isset($speech_type_list[$email]['ADV']))
                $speechADV = $speech_type_list[$email]['ADV'];

            $speechDET = 0;
            if (isset($speech_type_list[$email]['DET']))
                $speechDET = $speech_type_list[$email]['DET'];

            $speechASP = 0;
            if (isset($speech_type_list[$email]['ASP']))
                $speechASP = $speech_type_list[$email]['ASP'];

            $speechPOST = 0;
            if (isset($speech_type_list[$email]['POST']))
                $speechPOST = $speech_type_list[$email]['POST'];

            $speechC = 0;
            if (isset($speech_type_list[$email]['C']))
                $speechC = $speech_type_list[$email]['C'];

            $speechT = 0;
            if (isset($speech_type_list[$email]['T']))
                $speechT = $speech_type_list[$email]['T'];

            $speechdefault = 0;
            if (isset($speech_type_list[$email]['default']))
                $speechdefault = $speech_type_list[$email]['default'];

            $tbody[] = array(
                $email,
                $count,
                $speechN,
                ($speechN / $count),
                $speechVt,
                ($speechVt / $count),
                $speechM,
                ($speechM / $count),
                $speechFW,
                ($speechFW / $count),
                $speechVi,
                ($speechVi / $count),
                $speechA,
                ($speechA / $count),
                $speechADV,
                ($speechADV / $count),
                $speechDET,
                ($speechDET / $count),
                $speechASP,
                ($speechASP / $count),
                $speechPOST,
                ($speechPOST / $count),
                $speechC,
                ($speechC / $count),
                $speechT,
                ($speechT / $count),
                $speechdefault,
                ($speechdefault / $count)
            );
        }

        $this->_display_body($title, $thead, $tbody);

        $this->_display_footer();
    }

    function respond()
    {
        $title = __FUNCTION__;

        $this->_display_header($title);

        $query = $this->db->select('annotation.annotation_id, "user"."email"
, topic_responded_count AS count')
                ->from('"user"
, webpage2annotation
, annotation join annotation2topic_respond_count using (annotation_id)')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.user_id = "user"."user_id"
AND annotation.deleted IS FALSE
AND annotation.topic_id IS NULL
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'')
            ->where('email '. $this->in_email)
            ->order_by('email')
            ->get();


        $type_skill = array();
        $annotation_count = array();

        $freq_count = array();
        $freq_total = 0;
        $comp_count = array();
        $comp_total = 0;

        $thead = array(
            '受試者',
            '閱讀理解分數',
            '閱讀理解分數高低分組_1低_2高',
            '標註編號',
            '標註回應次數'
        );

        $tbody = array();

        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];
            $count = $row['count'];
            $annotation_id = $row['annotation_id'];

            //次數與加權次數
            if (isset($comp_count[$count]) == FALSE)
            {
                $freq_count[$count] = 0;
                $comp_count[$count] = 0;
            }
            $freq_count[$count]++;
            $comp_count[$count] += $this->obs_mix_score[$email];

            $freq_total++;
            $comp_total += $this->obs_mix_score[$email];

            $tbody[] = array(
                $email,
                $this->obs_mix_score[$email],
                $this->obs_group[$email],
                $annotation_id,
                $count
            );
        }

        $this->_display_body('標註列表with標註回應次數', $thead, $tbody);

        return;

        // ----------------------------

        $thead = array(
            '標註回應次數',
            '次數',
            '次數百分比_除以'.$freq_total.'',
            '加權次數',
            '加權次數百分比_除以'.$comp_total.''
        );

        $tbody = array();
        foreach ($freq_count AS $consensus => $freq)
        {

            $comp_freq = $comp_count[$consensus];

            $tbody[] = array(
                $consensus,
                $freq,
                ($freq/$freq_total)*100,
                $comp_freq,
                ($comp_freq/$comp_total)*100
            );

        }

        $this->_display_body('標註回應次數分配表', $thead, $tbody);


        $this->_display_hr();

        // --------

        $thead = array(
            '受試者',
            '標註次數',
            '總共被回應的次數',
            '被回應的最大次數',
            '被回應的最小次數',
            '平均每篇標註被回應的次數',
            '被回應次數標準差',
            '回應別人的次數',
            '擁有回應的標註次數',
            '報告分數',
            '測驗分數',
            '綜合分數'
        );

        // -------
        // 計算有回應的標註數量

//SELECT "user"."email", count(annotation.annotation_id)
//FROM annotation join "user" using (user_id)
//, annotation2topic_respond_count
//, webpage2annotation
//WHERE webpage2annotation.webpage_id = 1142
//AND annotation.annotation_id = annotation2topic_respond_count.annotation_id
//AND topic_responded_count > 0
//AND webpage2annotation.annotation_id = annotation.annotation_id
//AND annotation.deleted IS FALSE
//AND annotation.topic_id IS NULL
//GROUP BY email
//ORDER BY email

        $has_respond_count = array();
        $query = $this->db->select('"user"."email", count(annotation.annotation_id)')
                ->from('annotation join "user" using (user_id)
, annotation2topic_respond_count
, webpage2annotation')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND annotation.annotation_id = annotation2topic_respond_count.annotation_id
AND topic_responded_count > 0
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.deleted IS FALSE
AND annotation.topic_id IS NULL
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'')
                ->where('email '. $this->in_email)
                ->group_by('email')
                ->order_by('email')
                ->get();

        foreach ($query->result_array() AS $row)
        {
            $has_respond_count[$row['email']] = $row['count'];
        }

        // --------
        // 回應給別人

//SELECT "user"."email", count(annotation.annotation_id)
//FROM annotation join "user" using (user_id)
//, webpage2annotation
//WHERE webpage2annotation.webpage_id = 1142
//AND webpage2annotation.annotation_id = annotation.annotation_id
//AND annotation.deleted IS FALSE
//AND annotation.topic_id IS NOT NULL
//GROUP BY email
//ORDER BY email

        $respond_to_count = array();
        $query = $this->db->select('"user"."email", count(annotation.annotation_id)')
                ->from('annotation join "user" using (user_id)
, webpage2annotation')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.deleted IS FALSE
AND annotation.topic_id IS NOT NULL
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'')
                ->where('email '. $this->in_email)
                ->group_by('email')
                ->order_by('email')
                ->get();

        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];
            $count = $row['count'];
            $respond_to_count[$email] = $count;
        }

        // --------
        // 自身收到的回應

        $query = $this->db->select('"user"."email", count(annotation.annotation_id), sum(topic_responded_count), max(topic_responded_count), min(topic_responded_count), avg(topic_responded_count), stddev(topic_responded_count)')
                ->from('annotation join annotation2topic_respond_count using (annotation_id)
, "user"
, webpage2annotation')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND webpage2annotation.annotation_id = annotation.annotation_id
AND "user"."user_id" = annotation.user_id
AND annotation.deleted IS FALSE
AND annotation.topic_id IS NULL
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'')
                ->where('email '. $this->in_email)
                ->group_by('email')
                ->order_by('email')
                ->get();
        
        $tbody = array();
        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];

            $respond_to = 0;
            if (isset($respond_to_count[$email]))
                $respond_to = $respond_to_count[$email];

            $has_respond = 0;
            if (isset($has_respond_count[$email]))
                $has_respond = $has_respond_count[$email];

            $tbody[] = array(
                $email,
                $row['count'],
                $row['sum'],
                $row['max'],
                $row['min'],
                $row['avg'],
                $row['stddev'],
                $respond_to,
                $has_respond,
                $this->obs_report_score[$email],
                $this->obs_test_score[$email],
                $this->obs_mix_score[$email]
            );
        }

        $this->_display_body($title, $thead, $tbody);

        $this->_display_footer();
    }

    function annotation_behavior() {

        $title = __FUNCTION__;

        $this->_display_header($title);

        $thead = array(
            '受試者',
            '登入_1_3',
            '選擇_12',
            '新增_13_14',
            '刪除_19',
            '修改_15_21',
            '瀏覽討論_16',
            '回覆_20',
            '加入喜愛清單_22',
            '移除喜愛清單_23',
            '查看說明_28',
            '報告分數',
            '測驗分數',
            '綜合分數',
            '行為編碼_A選擇_B新增_E討論_F回覆_G喜愛',
            '行為編碼_不重複',
            '選擇範圍段落編碼',
            '選擇範圍段落編碼_章節單位',
            '選擇範圍段落編碼_章節單位_不重複'
        );

//SELECT "user"."email", "action", "note"
//FROM log join "user" using ("user_id")
//WHERE webpage_id = 1142
//AND action IN (1,3,12,13,14,19,15,21,16,20,22,23,28)
//ORDER BY email, log_timestamp

        $query = $this->db->select('"user"."email", "action", "note"')
                ->from('log join "user" using ("user_id")')
                ->where('webpage_id = '.$this->obs_webpage_id.'
AND action IN (1,3,12,13,14,19,15,21,16,20,22,23,28)')
                ->where('log_timestamp > \'' . $this->obs_date_from  .'\'
AND log_timestamp < \'' . $this->obs_date_to  .'\'')
                ->where('email '. $this->in_email)
                ->order_by('email, log_timestamp')
                ->get();

        $action_count = array();
        $coding_list = array();
        $codingI_list = array();

        $last_scope = NULL;
        $last_email = NULL;
        $last_topic = NULL;

        $select_seq_list = array();
        $select_chapter_list = array();
        $select_chapter_change_list = array();
        $select_last_chapter = array();

        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];
            if ($last_email != $email)
            {
                $last_scope = NULL;
                $last_topic = NULL;
                $last_email = $email;
            }

            $action = $row['action'];

            if ($action == '3')
                $action = '1';
            else if ($action == '14')
                $action = '13';
            else if ($action == '21')
                $action = '15';

            //如果是選擇的話
            if ($action == '12')
            {
                $data = json_decode($row['note'], TRUE);
                if (isset($data['scope'][0]))
                {
                    $scope = $data['scope'][0];

                    if (is_null($last_scope))
                    {
                        $last_scope = $scope;



                        if (is_array($last_scope[0]))
                            $last_scope = $last_scope[0];

                        //test_msg('last scope', $last_scope);
                    }
                    else
                    {


                        if (is_array($last_scope[0]))
                            $last_scope = $last_scope[0];

                        //test_msg($scope[0].'-'.$scope[1], array($last_scope[0].'-'.$last_scope[1], ( $scope[0].'' == $last_scope[0].''
                        //    && $scope[1].'' == $last_scope[1].''), $email));
                        if ($scope[0].'' == $last_scope[0].''
                            && $scope[1].'' == $last_scope[1].'')
                        {
                            //test_msg('continue', $action_count[$email][$action]);
                            continue;
                        }
                        else
                        {
                            //test_msg('count', $action_count[$email][$action]);
                            $last_scope = $scope;
                        }
                    }
                }
                else
                {
                    //test_msg('continue', $action_count[$email][$action]);
                    continue;
                }
            }

            //如果是登入的話
            if ($action == '1')
            {
                $last_scope = NULL;
            }

            //如果是瀏覽討論的話
            if ($action == '16')
            {
                $data = json_decode($row['note'], TRUE);
                $topic_id = intval($data['topic_id']);

                if ($last_topic == $topic_id)
                {
                    continue;
                }
                else
                {
                    $last_topic = $topic_id;
                }

                $topic_annotation = new Annotation($topic_id);
                $scope_collection = $topic_annotation->get_scopes();
                $scope_object = $scope_collection->export_json();
                $scope_data = json_decode($scope_object, TRUE);
                $last_scope = array_pop($scope_data);
                //$last_scope = array($scope_object->get_from_index(), $$scope_object->get_to_index());
            }

            if (isset($action_count[$email]) === FALSE)
                $action_count[$email] = array();

            if (isset($action_count[$email][$action]) === FALSE)
                $action_count[$email][$action] = 0;

            $action_count[$email][$action]++;

            // --------------------------------


            $code = NULL;
            if ($action == 12) $code = 'A';
            if ($action == 13) $code = 'B';
            //if ($action == 19) $code = 'C';
            //if ($action == 15) $code = 'D';
            if ($action == 16) $code = 'E';
            if ($action == 20) $code = 'F';
            if ($action == 22) $code = 'G';

            if (isset($code))
            {
                if (isset($coding_list[$email]) == FALSE)
                    $coding_list[$email] = '';
                $coding_list[$email] = $coding_list[$email] . $code;

                if (isset($codingI_list[$email]) == FALSE)
                    $codingI_list[$email] = '';

                if (strlen($codingI_list[$email]) == 0)
                    $codingI_list[$email] = $code;
                else
                {
                    $last_code = substr($codingI_list[$email], -1, 1);
                    if ($code != $last_code)
                        $codingI_list[$email] = $codingI_list[$email] . $code;
                }
            }

            //選擇序列分析
            if ($action == 12)
            {
                //表示是選擇
                $data = json_decode($row['note'], TRUE);
                if (isset($data['scope'][0]))
                {
                    $scope = $data['scope'][0];
                    $from_index = NULL;
                    $to_index = NULL;

                    if (count($scope) == 1)
                    {
                        $from_index = $scope[0];
                        $to_index = $scope[0];
                    }
                    else if (count($scope) == 2)
                    {
                        $from_index = $scope[0];
                        $to_index = $scope[1];
                    }


                    if (isset($from_index) && isset($to_index))
                    {
                        if (isset($select_seq_list[$email]) == FALSE)
                            $select_seq_list[$email] = '';

                        //取得段落的ID
                        $para_code = '';

                        foreach ($this->paragraph_scope AS $para_scope)
                        {
                            if ($this->in_scope($para_scope, $from_index, $to_index))
                            {
                                $para_code = $para_scope[2];
                                break;
                            }
                            else if ($this->from_in_scope($para_scope, $from_index, $to_index)
                                || $this->at_scope($para_scope, $from_index, $to_index))
                            {
                                $para_code = $para_code . $para_scope[2];
                            }
                            else if ($this->to_in_scope($para_scope, $from_index, $to_index))
                            {
                                $para_code = $para_code . $para_scope[2];
                                break;
                            }
                        }

                        $last_para_code = NULL;
                        if (strlen($select_seq_list[$email]) > 0)
                            $last_para_code = substr($select_seq_list[$email], -1, 1);

                        /*
                         * //改用()來表示多段落
                        if (isset($last_para_code) && $para_code != '')
                        {
                            //看最後一個code是靠近$para_code的頭還是$para_code的尾
                            $last_para_index = $this->code_mapping[$last_para_code];

                            $para_from_index = $this->code_mapping[substr($para_code, 0, 1)];
                            $para_to_index = $this->code_mapping[substr($para_code, -1, 1)];

                            if (abs($last_para_index - $para_from_index) > abs($last_para_index - $para_to_index))
                            {
                                //離尾端比較近的意思
                                $temp = '';
                                for ($i = 0; $i < strlen($para_code); $i++)
                                {
                                    $temp = substr($para_code, $i, 1) . $temp;
                                }
                                $para_code = $temp;
                            }
                        }
                         */
                        if (strlen($para_code) > 1)
                            $para_code = '(' . $para_code . ')';
                        $select_seq_list[$email] = $select_seq_list[$email] . $para_code;
                    }
                }
            }   //if ($action == 12)

            //選擇序列分析
            if ($action == 12)
            {
                //表示是選擇
                //$data = json_decode($row['note'], TRUE);
                if (isset($data['scope'][0]))
                {

                    if (isset($from_index) && isset($to_index))
                    {
                        if (isset($select_chapter_list[$email]) == FALSE)
                            $select_chapter_list[$email] = '';

                        //取得段落的ID
                        $para_code = '';

                        foreach ($this->chapter_scope AS $para_scope)
                        {
                            if ($this->in_scope($para_scope, $from_index, $to_index))
                            {
                                $para_code = $para_scope[2];
                                break;
                            }
                            else if ($this->from_in_scope($para_scope, $from_index, $to_index)
                                || $this->at_scope($para_scope, $from_index, $to_index))
                            {
                                $para_code = $para_code . $para_scope[2];
                            }
                            else if ($this->to_in_scope($para_scope, $from_index, $to_index))
                            {
                                $para_code = $para_code . $para_scope[2];
                                break;
                            }
                        }

                        $last_para_code = NULL;
                        if (strlen($select_chapter_list[$email]) > 0)
                            $last_para_code = substr($select_chapter_list[$email], -1, 1);

                        if (strlen($para_code) > 1)
                            $para_code = '(' . $para_code . ')';
                        $select_chapter_list[$email] = $select_chapter_list[$email] . $para_code;

                        //---------------------------------------
                        if (isset($select_chapter_change_list[$email]) == FALSE)
                        {
                            $select_chapter_change_list[$email] = '';
                            $select_last_chapter[$email] = NULL;
                        }

                        if ($select_last_chapter[$email] != $para_code)
                        {
                            $select_last_chapter[$email] = $para_code;
                            $select_chapter_change_list[$email] = $select_chapter_change_list[$email] . $para_code;
                        }
                    }
                }
            }   //if ($action == 12)

        }

        $tbody = array();
        foreach ($this->obs_email AS $email)
        {
            $email_action_count = array();
            if (isset($action_count[$email]))
                $email_action_count = $action_count[$email];

            $action1 = 0;
            if (isset($email_action_count['1']))
                $action1 = $email_action_count['1'];
            
            $action12 = 0;
            if (isset($email_action_count['12']))
                $action12 = $email_action_count['12'];
            
            $action13 = 0;
            if (isset($email_action_count['13']))
                $action13 = $email_action_count['13'];

            $action19 = 0;
            if (isset($email_action_count['19']))
                $action19 = $email_action_count['19'];

            $action15 = 0;
            if (isset($email_action_count['15']))
                $action15 = $email_action_count['15'];

            $action16 = 0;
            if (isset($email_action_count['16']))
                $action16 = $email_action_count['16'];

            $action20 = 0;
            if (isset($email_action_count['20']))
                $action20 = $email_action_count['20'];

            $action22 = 0;
            if (isset($email_action_count['22']))
                $action22 = $email_action_count['22'];

            $action23 = 0;
            if (isset($email_action_count['23']))
                $action23 = $email_action_count['23'];

            $action28 = 0;
            if (isset($email_action_count['28']))
                $action28 = $email_action_count['28'];

            $code = '';
            if (isset($coding_list[$email]))
                $code = $coding_list[$email];

            $codeI = '';
            if (isset($codingI_list[$email]))
                $codeI = $codingI_list[$email];

            $select_seq = '';
            if (isset($select_seq_list[$email]))
                $select_seq = $select_seq_list[$email];

            $select_chapter = '';
            if (isset($select_chapter_list[$email]))
                $select_chapter = $select_chapter_list[$email];

            $select_chapter_change = '';
            if (isset($select_chapter_change_list[$email]))
                $select_chapter_change = $select_chapter_change_list[$email];

            $tbody[] = array(
                $email,
                $action1,
                $action12,
                $action13,
                $action19,
                $action15,
                $action16,
                $action20,
                $action22,
                $action23,
                $action28,
                $this->obs_report_score[$email],
                $this->obs_test_score[$email],
                $this->obs_mix_score[$email],
                $code,
                $codeI,
                $select_seq,
                $select_chapter,
                $select_chapter_change
            );
        }

        $this->_display_body($title, $thead, $tbody);

        $this->_display_footer();
    }

    function scope_consensus()
    {
        $title = __FUNCTION__;

        $this->_display_header($title);

        // ---------

        $social_function = array(
            0 => 0,
            1 => 68.41493132,
            2 => 82.31058928,
            3 => 89.40518387,
            4 => 91.31036774,
            5 => 92.55095259,
            7 => 94.7275144,
            8 => 97.06468764
        );

            $query = $this->db->select('email, annotation.annotation_id, score')
                ->from('annotation
, "user", webpage2annotation, score')
                ->where('annotation.user_id = "user".user_id
AND webpage2annotation.annotation_id = annotation.annotation_id
AND webpage_id = '.$this->obs_webpage_id.'
AND annotation.topic_id IS NULL
AND annotation.deleted IS FALSE
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'
AND score.annotation_id = annotation.annotation_id
AND score.score_type_id = 1')
                ->where('email '. $this->in_email)
                ->order_by('email')
                ->get();
            
        $consensus_count = array();
        $annotation_count = array();
        $consensus_max = array();
        $consensus_min = array();

        $total_count = 0;
        $total_annotation_count = 0;
        $total_max = 0;
        $total_min = NULL;

        $freq_count = array();
        $freq_total = 0;
        $comp_count = array();
        $comp_total = 0;

        $thead = array(
            '受試者',
            '閱讀理解分數',
            '閱讀理解分數高低分組_1低_2高',
            '標註編號',
            '標註範圍共識',
            '專家調查',
            '加權社群行為'
        );

        $tbody = array();

        foreach ($query->result_array() AS $row)
        {
            $email = $row['email'];
            $annotation_id = intval($row['annotation_id']);
            $annotation = new Annotation($annotation_id);
            $count = $annotation->get_consensus_count();
            
            if (isset($consensus_count[$email]) == false)
            {
                $consensus_count[$email] = 0;
                $annotation_count[$email] = 0;
                $consensus_max[$email] = 0;
                $consensus_min[$email] = $count;
            }
            
            $annotation_count[$email]++;
            $consensus_count[$email] += $count;
            if ($count > $consensus_max[$email])
                $consensus_max[$email] = $count;
            if ($count < $consensus_min[$email])
                $consensus_min[$email] = $count;

            $total_annotation_count++;
            $total_count += $count;
            if ($count > $total_max)
                $total_max = $count;
            if ($total_min == NULL ||$count < $total_min)
                $total_min = $count;

            //次數與加權次數
            if (isset($comp_count[$count]) == FALSE)
            {
                $freq_count[$count] = 0;
                $comp_count[$count] = 0;
            }
            $freq_count[$count]++;
            $comp_count[$count] += $this->obs_mix_score[$email];

            $freq_total++;
            $comp_total += $this->obs_mix_score[$email];

            $tbody[] = array(
                $email,
                $this->obs_mix_score[$email],
                $this->obs_group[$email],
                $annotation_id,
                $count,
                $row['score'],
                $social_function[$count]
            );
        }

        $this->_display_body('標註與標註範圍共識列表', $thead, $tbody);

        // ----------------------------

        $thead = array(
            '標註範圍共識人數',
            '次數',
            '次數百分比_除以'.$freq_total.'',
            '累加次數',
            '累加次數百分比_除以'.$freq_total.'',
            '加權次數',
            '加權次數百分比_除以'.$comp_total.'',
            '累加加權次數',
            '累加加權次數百分比_除以'.$comp_total.''
        );

        $freq_plus = 0;
        $comp_plus = 0;
        
        ksort($freq_count);

        $tbody = array();
        foreach ($freq_count AS $consensus => $freq)
        {

            $comp_freq = $comp_count[$consensus];

            $tbody[] = array(
                $consensus,
                $freq,
                ($freq/$freq_total)*100,
                $freq_plus,
                ($freq_plus/$freq_total)*100,
                $comp_freq,
                ($comp_freq/$comp_total)*100,
                $comp_plus,
                ($comp_plus/$comp_total)*100,
            );

            $freq_plus += $freq;
            $comp_plus += $comp_freq;

        }

        $this->_display_body('標註範圍共識次數分配表', $thead, $tbody);

        $this->_display_hr();

        return;

        // ----------------------------

        $thead = array(
            '使用者',
            '標註次數',
            '共識次數累積質',
            '共識次數平均值',
            '共識次數最大值',
            '共識次數最小值'
        );

        $tbody = array();

        foreach ($this->obs_email AS $email)
        {
            $a_count = 0;
            if (isset($annotation_count[$email]))
                $a_count = $annotation_count[$email];

            $c_count = 0;
            if (isset($consensus_count[$email]))
                $c_count = $consensus_count[$email];

            $max = 0;
            if (isset($consensus_max[$email]))
                $max = $consensus_max[$email];

            $min = 0;
            if (isset($consensus_min[$email]))
                $min = $consensus_min[$email];

            $tbody[] = array(
                $email,
                $a_count,
                $c_count,
                ($c_count / $a_count),
                $max,
                $min
            );

        }

        $tbody[] = array(
                '整體',
                $total_annotation_count,
                $total_count,
                ($total_count / $total_annotation_count),
                $total_max,
                $total_min
            );

        $this->_display_body('標註範圍共識統計(以受試者為單位)', $thead, $tbody);

        // ------------------------------------------------------

//select from_index, to_index
//from annotation join annotation2scope using (annotation_id)
//, scope
//, webpage2annotation
//where webpage2annotation.webpage_id = 1142
//and scope.scope_id = annotation2scope.scope_id
//and webpage2annotation.annotation_id = annotation.annotation_id
//order by from_index

        $query = $this->db->select('from_index, to_index')
                ->from('annotation join annotation2scope using (annotation_id)
, scope
, webpage2annotation
, "user"')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
and scope.scope_id = annotation2scope.scope_id
and webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.topic_id IS NULL
AND annotation.deleted IS FALSE
and "user".user_id = annotation.user_id
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'')
                ->where('email '. $this->in_email)
                ->get();

        $scope_count = array();

        $paragraph_count = array();

        $annotation_count = 0;

        foreach ($query->result_array() AS $row)
        {
            $annotation_count++;

            $from_index = intval($row['from_index']);
            $to_index = intval($row['to_index']);

            for ($i = $from_index; $i < $to_index + 1; $i++)
            {
                if (isset($scope_count[$i]) == false)
                    $scope_count[$i] = 0;
                $scope_count[$i]++;
            }

            foreach ($this->paragraph_scope AS $para_id => $para_scope)
            {
                if ($this->in_scope($para_scope, $from_index, $to_index))
                {
                    if (isset($paragraph_count[$para_id]) == FALSE)
                        $paragraph_count[$para_id] = 0;
                    $paragraph_count[$para_id]++;

                    break;
                }
                else if ($this->from_in_scope($para_scope, $from_index, $to_index)
                    || $this->at_scope($para_scope, $from_index, $to_index))
                {
                    if (isset($paragraph_count[$para_id]) == FALSE)
                        $paragraph_count[$para_id] = 0;
                    $paragraph_count[$para_id]++;
                }
                else if ($this->to_in_scope($para_scope, $from_index, $to_index))
                {
                    if (isset($paragraph_count[$para_id]) == FALSE)
                        $paragraph_count[$para_id] = 0;
                    $paragraph_count[$para_id]++;

                    break;
                }
            }
        }

        $consensus_count = array();

        foreach ($scope_count AS $index => $count)
        {
            if (isset($consensus_count[$count]) == false)
                $consensus_count[$count] = 0;
            $consensus_count[$count]++;
        }

        //幫排序
        krsort($consensus_count);

        $title1 = '標註範圍共識次數分配表';

        $thead = array(
            '共識次數',
            '文字長度',
            '累積文字長度',
            '佔文章比率',
            '累積佔文章比率'
        );

        $tbody = array();
        $accumulate_length = 0;
        $accumulate_rate = 0;

        foreach ($consensus_count AS $count => $length)
        {
            $accumulate_length = $accumulate_length + $length;
            $accumulate_rate = $accumulate_rate + ($length / $this->text_length);
            $tbody[] = array(
                $count,
                $length,
                $accumulate_length,
                ($length / $this->text_length),
                $accumulate_rate
            );
        }

        $tbody[] = array(
            0,
            ($this->text_length - $accumulate_length),
            $this->text_length,
            (1- $accumulate_rate),
            1
        );
        
        $this->_display_body($title1, $thead, $tbody);

        // -------------------------------------

        $title2 = '標註段落分配表';

        $thead = array(
            '段落編號',
            '段落標題',
            '標註次數',
            '比率'
        );

        $tbody = array();
        foreach ($this->paragraph_scope AS $para_id => $para_scope)
        {
            $count = 0;
            if (isset($paragraph_count[$para_id]))
                $count = $paragraph_count[$para_id];

            $tbody[] = array(
                $para_scope[2],
                $para_scope[3],
                $count,
                ($count / $annotation_count)
            );
        }

        $this->_display_body($title2, $thead, $tbody);

        $this->_display_footer();
    }

    public function social_model() {

        $title = __FUNCTION__;

        $this->_display_header($title);

        $length_function = array(
1 => array(0 , 0, 1),
2 => array(0 , 0.045192734, 0.954807266),
3 => array(0 , 0.136132034, 0.863867966),
4 => array(0 , 0.298072663, 0.701927337),
5 => array(0 , 0.66603899, 0.33396101),
6 => array(0 , 0.833517944, 0.166482056),
7 => array(0 , 0.909725299, 0.090274701),
8 => array(0.022153301, 0.977846699, 0),
9 => array(0.137018166, 0.862981834, 0),
10 => array(0.208241028, 0.791758972, 0),
11 => array(0.25, 0.75, 0),
12 => array(0.323327426, 0.676672574, 0),
13 => array(0.361098804, 0.638901196, 0),
14 => array(0.390784227, 0.609215773, 0),
15 => array(0.413602127, 0.586397873, 0),
16 => array(0.433650864, 0.566349136, 0),
17 => array(0.45026584, 0.54973416, 0),
18 => array(0.490363314, 0.509636686, 0),
19 => array(0.534005317, 0.465994683, 0),
20 => array(0.549623394, 0.450376606, 0),
23 => array(0.571444395, 0.428555605, 0),
24 => array(0.588834736, 0.411165264, 0),
25 => array(0.617523261, 0.382476739, 0),
26 => array(0.642002658, 0.357997342, 0),
27 => array(0.64798405, 0.35201595, 0),
28 => array(0.666149756, 0.333850244, 0),
29 => array(0.672131148, 0.327868852, 0),
30 => array(0.684536996, 0.315463004, 0),
31 => array(0.695613646, 0.304386354, 0),
32 => array(0.705139566, 0.294860434, 0),
33 => array(0.708684094, 0.291315906, 0),
34 => array(0.735268055, 0.264731945, 0),
35 => array(0.738701817, 0.261298183, 0),
39 => array(0.744683208, 0.255316792, 0),
40 => array(0.750664599, 0.249335401, 0),
41 => array(0.75664599, 0.24335401, 0),
45 => array(0.757753655, 0.242246345, 0),
46 => array(0.770824103, 0.229175897, 0),
48 => array(0.780239256, 0.219760744, 0),
54 => array(0.783783784, 0.216216216, 0),
56 => array(0.799069561, 0.200930439, 0),
57 => array(0.811253877, 0.188746123, 0),
58 => array(0.822773593, 0.177226407, 0),
60 => array(0.84315463, 0.15684537, 0),
61 => array(0.849136021, 0.150863979, 0),
64 => array(0.856557377, 0.143442623, 0),
67 => array(0.862538768, 0.137461232, 0),
70 => array(0.867080195, 0.132919805, 0),
73 => array(0.870624723, 0.129375277, 0),
77 => array(0.880261409, 0.119738591, 0),
83 => array(0.881369074, 0.118630926, 0),
88 => array(0.890119628, 0.109880372, 0),
91 => array(0.896322552, 0.103677448, 0),
94 => array(0.902525476, 0.097474524, 0),
95 => array(0.903633141, 0.096366859, 0),
100 => array(0.906734603, 0.093265397, 0),
101 => array(0.915263624, 0.084736376, 0),
104 => array(0.919805051, 0.080194949, 0),
108 => array(0.923238813, 0.076761187, 0),
109 => array(0.929441737, 0.070558263, 0),
122 => array(0.940518387, 0.059481613, 0),
133 => array(0.947385911, 0.052614089, 0),
186 => array(0.956357997, 0.043642003, 0),
232 => array(0.959459459, 0.040540541, 0),
237 => array(0.965440851, 0.034559149, 0),
273 => array(0.987594152, 0.012405848, 0),
340 => array(0.993797076, 0.006202924, 0),
359 => array(0.996898538, 0.003101462, 0)
        );

        $type_function = array(
            1 => array(0.017279575, 0.982720425, 0),
            2 => array(0.821112096, 0.178887904, 0),
            3 => array(0.703588835, 0.296411165, 0),
            4 => array(0.70026584, 0.29973416, 0),
            6 => array(0.757753655, 0.242246345, 0)
        );

        $weight = array(
            'length_function' => 0.58,
            'type_function' => 0.42
        );

        $thead = array(
            '撰寫者',
            '標註編號',
            '閱讀理解分數',
            '閱讀理解分數高低分組_1低_2高',
            '標註範圍長度',
            '標註策略類型',
            '專家調查',
            '加權社群行為',
            '標註範圍長度解模糊化',
            '標註策略類別解模糊化'
            );

        $tbody = array();
        $query = $this->db->select('annotation.annotation_id
, "user"."email", "scope_length, "score", annotation.annotation_type_id')
                ->from('annotation2scope_length,
webpage2annotation, annotation, "user" AS "user", score')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND annotation2scope_length.annotation_id = annotation.annotation_id
AND annotation.topic_id IS NULL
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.deleted IS FALSE
AND annotation.user_id = "user"."user_id"
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'
AND score.annotation_id = annotation.annotation_id
AND score.score_type_id = 0')
                ->where('email '. $this->in_email)
                ->order_by('email')
                ->get();

        foreach ($query->result_array() AS $row)
        {
            $social_score = 0;

            $id = $row['annotation_id'];
            $scope_length = intval($row['scope_length']);
            $type_id = intval($row['annotation_type_id']);
            $email = $row['email'];

            //模糊綜合決策
            $length_membership = $length_function[$scope_length];
            $type_membership = $type_function[$type_id];

            $membership = array();
            for ($i = 0; $i < 3; $i++)
            {
                $m = 0;
                foreach ($weight AS $function => $w)
                {
                    if ($function == 'length_function')
                        $m += ($w * $length_membership[$i]);
                    else
                        $m += ($w * $type_membership[$i]);
                }

                $membership[$i] = $m;
            }

            //解模糊化
            $social_score = ($membership[0] + $membership[1]*2 + $membership[2]*3) / ($membership[0] + $membership[1] + $membership[2]);
            $length_score = ($length_membership[0] + $length_membership[1]*2 + $length_membership[2]*3) / ($length_membership[0] + $length_membership[1] + $length_membership[2]);
            $type_score = ($type_membership[0] + $type_membership[1]*2 + $type_membership[2]*3) / ($type_membership[0] + $type_membership[1] + $type_membership[2]);


            $tbody[] = array(
                $email,
                $id,
                $this->obs_mix_score[$email],
                $this->obs_group[$email],
                $scope_length,
                $type_id,
                $row['score'],
                $social_score,
                $length_score,
                $type_score
            );

        }
        $this->_display_body('標註feature加權社群行為模型', $thead, $tbody);

        $this->_display_footer();
    }

    private function in_scope($scope, $from_index, $to_index)
    {
        return ($from_index > $scope[0] && $from_index < $scope[1]
                && $to_index > $scope[0] && $to_index < $scope[1]);
    }

    private function from_in_scope($scope, $from_index, $to_index)
    {
        return ($from_index > $scope[0] && $from_index < $scope[1]
                && !($to_index > $scope[0] && $to_index < $scope[1]));
    }

    private function to_in_scope($scope, $from_index, $to_index)
    {
        return ( !($from_index > $scope[0] && $from_index < $scope[1])
                && ($to_index > $scope[0] && $to_index < $scope[1]));
    }

    private function at_scope($scope, $from_index, $to_index)
    {
        return ($from_index < $scope[0] && $to_index > $scope[1]);
    }
}
/* End of file exp201012.php */
/* Location: ./system/application/controllers/admin_apps/exp201012.php */