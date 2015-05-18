<?php
/**
 * Unit Test Index
 *
 * 單元測試集合頁
 * 
 * @package		KALS
 * @category		Views
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/19 上午 12:17:29
 */
$this->load->helper('url');

$title = 'Unit Test Index';
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?= $title ?></title>
<script type="text/javascript" src="<?= base_url() ?>/js/jquery.js"></script>
<script type="text/javascript">
$(function () {
    var links = $('.unit-test-link');
    for (var i = 0; i < links.length; i++)
    {
        get_failed_count(links, i, false);
    }
    //get_failed_count(links, 0);

});

function get_failed_count(links, index, do_callback)
{
    if (index == links.length)
        return;

    var link = links.eq(index);

    var url = link.attr('href');
    var output = link.parent().find('.failed-count:first');
    var outputTotal = link.parent().find('.total-count:first');
    /*
    
    output.load(url+" .failed-count:first", {limit:25}, function () {

    });
    */
    $.get(url, null, function (data) {
        var data = $(data);
        var failed = data.find('.failed-count:first');
        var total = data.find('.total-count:first').html();
        
        if (failed.length == 0)
        {
            if (output.hasClass('try') == false)
            {
                setTimeout(function () {
                    get_failed_count(links, index, false);
                }, 1000);

                output.html('ERROR')
                    .addClass('try');
            }
            else
            {
                output.html('ERROR')
                    .addClass('failed')
                    .addClass('try');
                return;
            }
        }
        else
        {
            var count = failed.html();
            output.html(count);
            outputTotal.html("/" + total);

            var tpages= $('.total-page-count').html();
            tpages = parseInt(tpages) + 1;
            $('.total-page-count').html(tpages);

            
            var ttests = $('.total-test-count').html();
            ttests = parseInt(ttests) + parseInt(total);
            $('.total-test-count').html(ttests);

            if (count == 0)
                output.addClass('success');
            else
            {
                var pages = $('.failed-page-count').html();
                pages = parseInt(pages) + 1;
                $('.failed-page-count').html(pages);
                if (pages > 0)
                    $('.failed-page-count').addClass('failed');

                var tests = $('.failed-test-count').html();
                tests = parseInt(tests) + parseInt(failed.html());
                $('.failed-test-count').html(tests);
                if (tests > 0)
                    $('.failed-test-count').addClass('failed');
                
                output.addClass('failed');
            }
        }
        if (typeof(do_callback) != 'undefined' && do_callback == true)
        {
            index++;
            get_failed_count(links, index);
        }
    });
}
</script>
<style type="text/css">
    .failed-count { font-weight: bold;padding-left: 0.5em; }
    .success {
        color:green;
}
.failed {
    color:red;
}
.total-count {
    color: green;
}
.total-count.failed {
    color: red;
}
</style>
</head>

<body>
    <h1><?= $title ?></h1>
    <div>FAILED PAGES: <span class="failed-page-count total-count">0</span> / <span class="total-page-count">0</span>
        <br />
        FAILED TESTS: <span class="failed-test-count total-count">0</span> / <span class="total-test-count">0</span>

    </div>
    <hr />

<ul>
    <?php
    foreach ($test_items AS $dir => $items)
    {
        ?>
    <li>
        <?= $dir ?>
        <ul>
        <?php
        foreach($items AS $item)
        {
            ?>
    <li>
        <!-- <a href="<?= base_url().'index.php/'.$dir.'/'.$item ?>" class="unit-test-link"><?= $item ?></a> -->
        <a href="<?= base_url().''.$dir.'/'.$item ?>" class="unit-test-link"><?= $item ?></a>
        <span class="failed-count">
            <img src="<?= base_url() ?>/images/ajax-loader.gif" /></span>
        <span class="total-count"></span>
    </li>
            <?php
        }
        ?>
        </ul>
    </li>
        <?php


    }
    ?>
</ul>

</body>
</html><?php
/* End of file unit_test.php */
/* Location: ./system/application/views/misc/unit_test.php */