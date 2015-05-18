<?php
/**
 * Unit Test
 *
 * 單元測試樣板
 * 
 * @package		KALS
 * @category		Views
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/19 上午 12:17:29
 */

$report = $unit->report();
$result = $this->unit->result();

$failed = 0;
$ut_count = count($result);
for ($i = 0; $i < count($result); $i++)
{
    if ($result[$i]['Result'] == 'Failed')
    {
        $failed++;
    }
}

$benchmark = $this->benchmark->elapsed_time();
$benchmark_display = $benchmark;
//$last_benchmark = get_cookie('last_benchmark');
//
//if (FALSE != $last_benchmark)
//{
//    echo "$benchmark - $last_benchmark";
//    $interval = $benchmark - $last_benchmark;
//    if ($interval < 0)
//        $benchmark_display = $benchmark_display.'<span style="color:green;"> ('.$interval.') </span>';
//    else
//        $benchmark_display = $benchmark_display.'<span style="color:red;"> ('.$interval.') </span>';
//}
//$cookie = array(
//    'name' => 'last_benchmark',
//    'value' => $benchmark.'',
//    'expire' => '86500'
//);
//set_cookie($cookie);
$this->load->helper('url');

if (isset($function))
    $title = $function;

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?= $title ?></title>
<script type="text/javascript" src="<?= base_url() ?>/js/jquery.js"></script>
<script type="text/javascript">

$(function () {
    $('.unit-test-table').dblclick(function () {
        var table = $(this);
        var tr = table.find('tr:eq(1),tr:eq(2),tr:eq(3),tr:eq(4)');
        tr.toggle();
    });

    $('.unit-test-table:has(tr td:contains("Passed"))').find('tr:eq(1),tr:eq(2),tr:eq(3),tr:eq(4)').hide();
    $('.unit-test-table').css('cursor', 'pointer');

    if ($('#codeigniter_profiler').length = 1)
    {
        $('#codeigniter_profiler').hide();

        $profilter_switch = $('<div></div>').html('Open/Close Benchmark Profiler')
            .addClass('profiler-switch')
            .click(function () {
                $('#codeigniter_profiler').toggle();
            })
            .insertAfter($('#codeigniter_profiler'));
        $profilter_switch.clone(true).prependTo($('#codeigniter_profiler'));
        
        var ut_tables = $('.unit-test-table');

        var excute_time = 0;
        $.each(ut_tables, function (key, obj)
            {
                var td = $(obj).find('tbody tr:last td');
                var bm_index = td.html();
                bm_index = parseInt(bm_index) + 1;
                var time = $('.benchmark-index-'+bm_index+' td:last').html();
                excute_time = eval(time) + excute_time;
                td.html(time);
            });
        $('.excute_time:first').html('('+(excute_time+"").substring(0, 6)+')');

        var queries = $('#codeigniter_profiler').find('.database-queries');
        if (queries.length == 1)
            $('.database-queries-output').html(queries.html());

    }
});

</script>
<style type="text/css">
    #codeigniter_profiler {
        display:none;
        padding-top: 0;
    }
    .profiler-switch {
        text-align: center;
        padding: 5px;
        margin: 5px auto;
        width: 400px;
        border: 1px solid gray;
        background-color: gray;
        color: white;
        cursor: pointer;
        text-decoration: underline;
}
</style>
</head>

<body>
    <h1><?= $title ?></h1>
    <div>
        FAILED: <?php
        if ($failed == 0)
        {
            echo '<span style="color:green" class="failed-count">'.$failed.'</span>';
        }
        else
        {
            echo '<span style="color:red" class="failed-count">'.$failed.'</span>';
        }
        ?> / TOTAL: <span class="total-count"><?= $ut_count ?></span>
        <br />RESULT:
        <strong><?php
        if ($failed == 0)
        {
            echo '<span style="color:green">ALL PASSED</span>';
        }
        else
        {
            echo '<span style="color:red">'.$failed.' FAILED!</span>';
        }
        ?></strong>
        <br />QUERIES:
        <strong class="database-queries-output">0</strong>
        / MEMORY USAGE: <strong><?php echo $this->benchmark->memory_usage();?></strong>
    </div>
    <div>TIME: <strong><?= $benchmark_display ?> <span class="excute_time"></span></strong>
    </div>
    <hr />

<?= $report ?>

</body>
</html><?php
/* End of file unit_test.php */
/* Location: ./system/application/views/misc/unit_test.php */