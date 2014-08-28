<?php
include_once 'admin_apps_controller.php';
/**
 * exp201012annotation
 *
 * exp201012annotation full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2011/1/12 下午 07:13:37
 */

class exp201012annotation extends Admin_apps_controller {

    /**
     * 標題列表
     * @var Array
     */
    private $title_list = array(
        'index' => '首頁',
        'annotation_list' => '全部標註',
        'paragraph_catalog' => '段落列表',
        'paragraph_list' => '段落標註',
        'email_catalog' => '使用者列表',
        'email_list' => '使用者標註'
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

        $this->lang->load('kals_web_apps');
    }

    function index() {

        //$this->output->enable_profiler(TRUE);

        $this->_display_header();

        //$annotation = new Annotation(3078);
        //$text = $annotation->get_consensus_count();

        //$topic_respond_count = $annotation->get_topic_respond_coll()->length();
        //$text .= '-' . $topic_respond_count;

        //$this->_display_text($text);

        $this->_display_footer();
    }

    // ------------------------------ 

    private function _display_header ($title = NULL)
    {
        if (is_null($title))
            $title = "首頁";
        else if (isset($this->title_list[$title]))
            $title = $this->title_list[$title];
        $this->load->view('admin_apps/exp201012annotation_header', array('title' => $title, 'title_list' => $this->title_list));
    }

    private function _display_body($title, $thead, $tbody)
    {
        if (isset($this->title_list[$title]))
            $title = $this->title_list[$title];
        $this->load->view('admin_apps/exp201012_body', array('title' => $title, 'thead' => $thead, 'tbody' => $tbody));
    }

    private function _display_text($text)
    {
        $this->load->view('admin_apps/exp201012_text', array('text' => $text));
    }

    private function _display_footer()
    {
        $this->load->view('admin_apps/exp201012_footer');
    }

    // ------------------------------

    public function annotation_list()
    {
        $this->_display_header(__FUNCTION__);
        $this->print_annotation();

        $this->_display_footer();
    }

    private $limit_paragraph_key = NULL;
    function paragraph_catalog() {
        $this->_display_header(__FUNCTION__);

        $text = '<ul>';

        foreach ($this->paragraph_scope AS $key => $scope)
        {
            $title = $scope[3];

            $text .= '<li><a href="'.site_url('admin_apps/exp201012annotation/paragraph_list/'.$key).'">'.$title.'</a></li>'."\n";
        }

        $text .= '<ul>';

        $this->_display_text($text);

        $this->_display_footer();
    }
    public function paragraph_list($key = NULL)
    {
        if (is_null($key))
        {
            return $this->paragraph_catalog();
        }

        $this->_display_header(__FUNCTION__);

        $this->limit_paragraph_key = intval($key);
        $this->print_annotation();

        $this->_display_footer();
    }

    public function email_catalog() {
        $this->_display_header(__FUNCTION__);

        $text = '<ul>';

        foreach ($this->obs_email AS $key => $email)
        {
            $text .= '<li><a href="'.site_url('admin_apps/exp201012annotation/email_list/'.$key).'">'.$email.'</a></li>'."\n";
        }

        $text .= '<ul>';

        $this->_display_text($text);

        $this->_display_footer();
    }

    private $limit_email = NULL;
    public function email_list($key = NULL)
    {
        if (is_null($key))
        {
            return $this->email_catalog();
        }

        $this->_display_header(__FUNCTION__);

        $this->limit_email = $this->obs_email[intval($key)];
        $this->print_annotation();

        $this->_display_footer();
    }

    private function print_annotation()
    {
        $this->db->select('annotation.annotation_id')
                ->from('webpage2annotation, annotation, "user", annotation2scope join scope using (scope_id), anchor_text')
                ->where('webpage2annotation.webpage_id = '.$this->obs_webpage_id.'
AND "user".user_id = annotation.user_id
AND webpage2annotation.annotation_id = annotation.annotation_id
AND annotation.annotation_id = annotation2scope.annotation_id
AND anchor_text.anchor_text_id = scope.anchor_text_id
AND annotation.topic_id IS NULL
AND annotation.deleted IS FALSE
AND annotation.create_timestamp > \'' . $this->obs_date_from  .'\'
AND annotation.create_timestamp < \'' . $this->obs_date_to  .'\'')
        ->order_by('from_index, annotation.create_timestamp');

        if (isset($this->limit_email))
            $this->db->where('"user".email ', $this->limit_email);

        if (isset($this->limit_paragraph_key))
        {
            $scope = $this->paragraph_scope[$this->limit_paragraph_key];
            $from = $scope[0];
            $to = $scope[1];
            $this->db->where('((from_index >= '.$from. ' AND to_index <= '.$to.')
                OR (from_index >= '.$from. ' AND from_index <= '.$to.')
                OR (to_index >= '.$from. ' AND to_index <= '.$to.') )');
        }

        $query = $this->db->get();
        $paragraph_collection = array();

        foreach ($query->result_array() AS $row)
        {
            $annotation_id = $row['annotation_id'];
            $annotation_id = intval($annotation_id);
            $annotation = new Annotation($annotation_id);
            $this->_push_paragraph_collection($paragraph_collection, $annotation);
            //$t .= $annotation->get_id().' : '.$from_index.'~'.$to_index.'<br />';
        }

        $text = '';
        $last_scope = NULL;
        foreach ($this->paragraph_scope AS $key => $paragraph_scope)
        {
            if (array_key_exists($key, $paragraph_collection) == FALSE)
                continue;

            $paragraph_title = $paragraph_scope[3];

            if ($text != '')
                $text .= "\n<hr />\n";
            $text .= "\n<h3>".$paragraph_title." (".count($paragraph_collection[$key]).") </h3>\n";

            foreach ($paragraph_collection[$key] AS $annotation)
            {
                $text .= $this->_print_annotation_table($annotation, $last_scope);
            }
        }

        $this->_display_text($text);
    }

    private function _push_paragraph_collection(& $paragraph_collection, $annotation)
    {
        $scope_collection = $annotation->get_scopes();
        $scope = $scope_collection->get_item(0);
        $from_index = $scope->get_from_index();
        $to_index = $scope->get_to_index();

        foreach ($this->paragraph_scope AS $key => $paragraph_scope)
        {
            $paragraph_from = $paragraph_scope[0];
            $paragraph_to = $paragraph_scope[1];

            if ($from_index < $paragraph_from)
                continue;

            //if ($from_index > $paragraph_to)
            //    break;

            if ( ((($from_index > $paragraph_from) OR ($from_index == $paragraph_from))
                AND (($from_index < $paragraph_to) OR ($from_index == $paragraph_to)))
                 OR
                 ((($to_index > $paragraph_from) OR ($to_index == $paragraph_from))
                AND (($to_index < $paragraph_to) OR ($to_index == $paragraph_to))) )
            {
                if (array_key_exists($key, $paragraph_collection) == FALSE)
                    $paragraph_collection[$key] = array();
                $paragraph_collection[$key][] = $annotation;
            }
        }
    }

    /**
     * 輸出Annotation的資料
     * @param Annotation $annotation
     * @return string
     */
    private function _print_annotation_table($annotation, & $last_scope) {

        $annotation_id = $annotation->get_id();
        $text = '<a name="annotation_'.$annotation_id.'" id="annotation_'.$annotation_id.'"></a><table class="annotation_table"  cellspacing="0" cellpadding="0"><tbody>';


                $scope_collection = $annotation->get_scopes();
                $scope = $scope_collection->get_item(0);
                $from_index = $scope->get_from_index();
                $to_index = $scope->get_to_index();
       if (is_null($last_scope) OR !($last_scope[0] == $from_index AND $last_scope[1] == $to_index))
       {
                $last_scope = array($from_index, $to_index);

                $scope_length = $annotation->get_scope_length();

                $from_to = $from_index;
                if ($from_index != $to_index)
                    $from_to .= '-' . $to_index;
                $anchor_text = $annotation->get_anchor_text();
                $speech = $annotation->get_anchor_speech();
                $speech_list = '';
                foreach ($speech AS $s)
                {
                    if ($speech_list != '')
                        $speech_list .= ', ';
                    $speech_list .= $s;
                }
                if ($speech_list == '')
                    $speech_list = '(剖析失敗)';

                //位置
                $location = $annotation->get_feature_location();
                $location_list = '';
                foreach ($location AS $l)
                {
                    if ($location_list != '') $location_list .= ', ';
                    $name = '其他';
                    $l = intval($l);
                    if ($l == 4)
                        $name = '結尾';
                    else if ($l == 0)
                        $name = '開頭';
                    else if ($l == 1)
                        $name = '接近開頭';
                    else if ($l == 3)
                        $name = '接近結尾';
                    else if ($l == 5)
                        $name = '只有一句';
                    else if ($l == 2)
                        $name = '三句中間一句';

                    $location_list .= $name.'('.$l.')';
                }
                if ($location_list == '')
                    $location_list = '其他';

        $text .= '<tr> <td> <table class="anchor_row" border="1" cellpadding="0" cellspacing="0"><tbody>'
                . '<tr><th>範圍</th><td>'.$from_to.' ('.$scope_length.'字)</td><th>詞性('.count($speech).')</th><td>'.$speech_list.'</td><th>位置</th><td>'.$location_list.'</td></tr>'
                . '<tr><th>錨點文字</th><td colspan="5">'.$anchor_text.'</td></tr>'
                . '</tbody></table> </td> </tr>';
       }


        //第一列
        //
        // email 發表日期 修改日期 被喜愛 被共識 被回應 編號

                $email = $annotation->get_user()->get_email();
                $print_email = substr($email, 0, 8);
                    $print_email = '<a href="'.site_url('/admin_apps/exp201012annotation/email_list/'.$this->_find_email_key($email)).'">'.$print_email.'</a>';

                //類別
                $type_name = $annotation->get_type()->get_name();
                $type_name_lang = $this->lang->line('web_apps.' . $type_name);
                $type_name_classname = substr($type_name, strrpos($type_name, '.')+1);

                $create_timestamp = $annotation->get_create_timestamp();
                    //2010-12-08 23:17:10.984+08
                    //01234567890123456789
                    $create_timestamp = $this->_trim_timestamp($create_timestamp);
                $update_timestamp = $annotation->get_update_timestamp();
                    $update_timestamp = $this->_trim_timestamp($update_timestamp);
                $liked_count = $annotation->get_like_count();
                $consensus_count = $annotation->get_consensus_count();
                $topic_respond_count = $annotation->get_topic_respond_coll()->length();

        $text .= '<tr> <td> <table class="row" border="1" cellpadding="0" cellspacing="0"><tbody><tr>'
                . '<th class="email">' . $print_email . '</th>'
                . '<th class="type '.$type_name_classname.'">' . $type_name_lang . '</th>'
                . '<th>建立日期:</th><td class="date">' . $create_timestamp . '</td>'
                . '<th>修改日期:</th><td class="date">' . $update_timestamp . '</td>'
                . '<td class="annotation_id">#' . $annotation_id . '</td>'
                . '</tr></tbody></table> </td> </tr>';

        //第二列
        //  標註類別 位置 分數 建議的ID 推薦的ID 接受建議間隔
                //分數
                $score = $annotation->get_score(0)->get_score();

                //是否有建議？顯示建議的ID
                $query = $this->db->select('recommend_id, accept, (checked_timestamp - annotation.create_timestamp) as check_interval, recommend_by_annotation_id')
                            ->from('recommend join annotation on recommended_annotation_id = annotation.annotation_id')
                            ->where('recommended_annotation_id', $annotation_id)
                            ->get();

                $recommend_table;
                if ($query->num_rows() == 0)
                {
                    $recommend_table = '沒有建議';
                }
                else
                {
                    $row = $query->row_array();
                    $recommend_id = $row['recommend_id'];
                    $recommed_by_annotation_id = $row['recommend_by_annotation_id'];
                    $accept = $row['accept'];
                    $recommend_table = '建議ID:' . $recommend_id;
                    if ($accept == '')
                    {
                        //尚未確認
                        $recommend_table .= ' <span class="state">尚未確認</span>';
                    }
                    else
                    {
                        $accept_text = '<span class="state accpet">接受</span>';
                        if ($accept == 'f')
                            $accept_text = '<span class="state reject">拒絕</span>';

                        $check_interval = $row['check_interval'];
                            $point = strrpos($check_interval, '.');
                            if ($point !== FALSE)
                                $check_interval = substr($check_interval, 0, $point );
                        $recommend_table .= '; '.$accept_text.'; 確認間隔: '.$check_interval;
                       
                    }

                    if ($recommed_by_annotation_id != '')
                        $recommend_table .= '; <a href="#annotation_' . $recommed_by_annotation_id . '">推薦標註: '.$recommed_by_annotation_id.'</a>';
                }

        $text .= '<tr> <td> <table class="row" border="1" cellpadding="0" cellspacing="0"><tbody><tr>'
                . '<th>喜愛共識:</th><td>' . $liked_count . '</td>'
                . '<th>範圍共識:</th><td>' . $consensus_count . '</td>'
                . '<th>回應:</th><td>' . $topic_respond_count . '</td>'
                //. '<th>位置</th><td>' . $location_list . '</td>'
                . '<th>分數</th><td>' . $score . '</td>'
                . '<th>建議</th><td class="recommend">' . $recommend_table . '</td>'
                . '</tr></tbody></table> </td> </tr>';

                $note = $annotation->get_note();

        if ($note != '')
            $text .= '<tr><td><table class="note" width="100%" border="1" cellpadding="0" cellspacing="0"><tbody><tr><td>'.$note.'</td></tr></tbody></table></td></tr>';

        if ($topic_respond_count > 0)
        {
            $respond_annotation_table = $this->_print_respond($annotation);
            $text .= '<tr><td>' . $respond_annotation_table . '</td></tr>';
        }

        $text .= '</tbody></table>';

        return $text;
    }

    /**
     * @param Annotation $annotation
     */
    private function _print_respond($annotation) {

        $topic_respond_coll = $annotation->get_topic_respond_coll();

        $text = '';

        foreach ($topic_respond_coll AS $respond_annotation)
        {
            $text .= $this->_print_respond_annotation_table($respond_annotation);
        }

        return $text;
    }

    /**
     * 輸出Respond Annotation的資料
     * @param Annotation $annotation
     * @return string
     */
    private function _print_respond_annotation_table($annotation) {

        $annotation_id = $annotation->get_id();
        $text = '<a name="annotation_'.$annotation_id.'" id="annotation_'.$annotation_id.'"></a><table class="annotation_table respond" cellspacing="0" cellpadding="0" border="0" align="center"><tbody>';

        //第一列
        //
        // email 類別 發表日期 修改日期 被喜愛 被共識 被回應 編號

                $email = $annotation->get_user()->get_email();
                $print_email = substr($email, 0, 8);
                    $print_email = '<a href="'.site_url('/admin_apps/exp201012annotation/email_list/'.$this->_find_email_key($email)).'">'.$print_email.'</a>';

                $type_name = $annotation->get_type()->get_name();
                $type_name_lang = $this->lang->line('web_apps.' . $type_name);
                $type_name_classname = substr($type_name, strrpos($type_name, '.')+1);

                $create_timestamp = $annotation->get_create_timestamp();
                    //2010-12-08 23:17:10.984+08
                    //01234567890123456789
                    $create_timestamp = $this->_trim_timestamp($create_timestamp);
                $update_timestamp = $annotation->get_update_timestamp();
                    $update_timestamp = $this->_trim_timestamp($update_timestamp);

        $text .= '<tr> <td> <table class="row" border="1" cellpadding="0" cellspacing="0"><tbody><tr>'
                . '<th class="email">' . $print_email . '</th>'
                . '<th class="type '.$type_name_classname.'">' . $type_name_lang . '</th>'
                . '<th>建立日期:</th><td class="date">' . $create_timestamp . '</td>'
                . '<th>修改日期:</th><td class="date">' . $update_timestamp . '</td>'
                . '<td class="annotation_id">#' . $annotation_id . '</td>'
                . '</tr></tbody></table> </td> </tr>';

                $note = $annotation->get_note();

                $respond_to_coll = $annotation->get_respond_to_coll();
                $respond_to_text = '';
                foreach ($respond_to_coll AS $respond_to_annotation)
                {
                    if ($respond_to_text != '')
                        $respond_to_text .= '; ';

                    $respond_to_id = $respond_to_annotation->get_id();
                    $respond_to_email = $respond_to_annotation->get_user()->get_email();
                    $respond_to_text .= '<a href="#annotation_'.$respond_to_id.'">'.$respond_to_email.'#'.$respond_to_id."</a>";
                }
        if ($respond_to_text != '')
            $text .= '<tr><td><table border="1" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><th>回應對象</th><td>'.$respond_to_text.'</td></tr></tbody></table></td></tr>';

        if ($note != '')
            $text .= '<tr><td><table class="note" width="100%" border="1" cellpadding="0" cellspacing="0"><tbody><tr><td>'.$note.'</td></tr></tbody></table></td></tr>';

        $text .= '</tbody></table>'. "\n\n";

        return $text;
    }

    private function _trim_timestamp($timestamp)
    {
        return substr($timestamp, 5, 11);
    }

    private function _find_email_key($email)
    {
        foreach ($this->obs_email AS $key => $obs_email)
        {
            if ($obs_email == $email)
                return $key;
        }
        return '';
    }
}

/* End of file exp201012annotation.php */
/* Location: ./system/application/controllers/admin_apps/exp201012annotation.php */