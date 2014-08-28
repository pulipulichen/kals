<?php
/**
 * Javascript Unit Test Template
 *
 * Javascript單元測試的樣板
 *
 * @package		KALS
 * @category		Views
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 上午 12:17:29
 */

if (isset($function))
    $title = $function;
if (FALSE === isset($title))
    $title = 'Javascript 單元測試';
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta content="width=device-width, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes" id="kals_viewport_lock" name="viewport">
<title>QUnit Center</title>
<script type="text/javascript" src="<?= base_url() ?>js/jquery.js"></script>
<?php
/*
<script type="text/javascript" src="<?= base_url() ?>libraries/helpers/jquery.extends.js"></script>
<script type="text/javascript" src="<?= base_url() ?>libraries/helpers/kals_util.js"></script>
*/
?>
<script type="text/javascript">

qunit_list = {
    'toolkit': [
        'jQuery_kals_plugin'
    ],
    'core': [
        'KALS_authentication',
        'URL_hash_dispatcher',
        'Overlay_manager',
        'KALS_context_init'
    ],
    'kals_window': [
        'KALS_window'
    ],
    'kals_toolbar': [
        'Toolbar_toggle_component',
        'Logo_component',
        'Loading_component'
        
    ]
};

function do_statistic() {
    
    var flags = $('.flag');
    var asserts = $('.assert-flag');
    
    var now = 0;
    var total = 0;
    var over = true;
    var loaded = true;
    for (var i = 0; i < flags.length; i++)
    {
        var f = flags.eq(i);
        
        if (f.hasClass('over') == false)
            over = false;
        
        if (f.html() != '?')
        {
            now = now + parseInt(f.html());
        }
        else
            loaded = false;
    }
    
    for (var i = 0; i < asserts.length; i++)
    {
        var f = asserts.eq(i);
        if (f.html() != '?')
        {
            total = total + parseInt(f.html());
        }
    }
    
    $('#statistic .now').html(now);
    $('#statistic .total').html(total);
    
    if (now == total
        && loaded == true)
    {
        $('#statistic .now')
            .removeClass('doing')
            .addClass('complete');
    }
    else if (over == true)
    {
        $('#statistic .now')
            .removeClass('doing')
            .addClass('fail');
    }
}

/**
 * 
 * @param {jQuery} li_object
 */
function Qunit_item(li_object) {
    
    this.container = li_object;
    this.url = li_object.find('a:first').attr('href');
    this.error = 0;
    this.flag = li_object.find('.flag:first');
    this.assert = li_object.find('.assert-flag:first');
    var _this = this;
    this.toggle = $(' <button>TOGGLE</button>')
        //.css('margin-left', '1em')
        .appendTo(this.container)
        .click(function () {
            if (_this.iframe.length > 0)
                _this.iframe.toggleClass('hide');
        });
    this.iframe = $('<iframe class="item-iframe hide"></iframe>')
        //.css('width', '100%')
        //.css('height', '1px')
        //.css('visibility', 'hidden')
        //.css('display', 'block')
        //.hide()
        .attr('src', this.url)
        .appendTo(this.container);
    
    this.timer;
    this.temp_flag = -1;
    this.temp_assert = -1;
    
    this.detect = function () {
        
        _this.iframe.load(function () {
            
            setTimeout(function () {
                
            
            
            _this.timer = setInterval(function () {
                
                if (_this.timer == null)
                {
                    do_statistic();
                    return;
                }
                
                var remain, remain_object;
                try
                {
                    remain_object = _this.iframe.contents().find('.remain-flag:first');    
                } catch (e) {}
                
                
                try
                {
                    var _assert_object = _this.iframe.contents().find('.assert-flag:first');
                    if (_assert_object.length > 0)
                    {
                        _this.assert.html(_assert_object.html());
                        _this.temp_assert = parseInt(_assert_object.html());
                    }
                }
                catch (e) {}
                
                if (remain_object != null
                    && remain_object.length > 0)
                    remain = parseInt(remain_object.html());
                
                //$('<div>['+remain+']</div>').appendTo($('body'));
                
                if (typeof(remain) != 'undefined'
                    && (_this.temp_flag == -1 || _this.temp_flag > remain))
                {
                    _this.temp_flag = remain;
                    
                    //$('<div>['+_this.temp_assert+', '+parseInt(_this.temp_flag)+']</div>').appendTo($('body'));
                    var flag = _this.temp_assert - parseInt(_this.temp_flag);
                    
                    _this.flag.html(flag);
                    do_statistic();
                    if (_this.temp_flag != '0')
                    {
                        _this.flag.css('color', 'red');
                    }
                    else
                    {
                        _this.flag.css('color', 'green');
                        clearInterval(_this.timer);
                        _this.flag.css('font-weight', 'bold');
                        _this.flag.addClass('over');
                        return;
                    }
                    _this.error = 0;
                }
                else if (typeof(remain) != 'undefined'
                    && _this.temp_flag < remain)
                {
                    var flag = 0;
                    if (_this.temp_flag != -1) 
                        flag = _this.temp_assert - parseInt(_this.temp_flag);
                    
                    _this.flag.html(flag);
                    
                    if (_this.temp_flag != '0')
                    {
                        _this.flag.css('color', '#EF7121');
                    }
                    else
                    {
                        _this.flag.css('color', 'green');
                        _this.flag.css('font-weight', 'bold');
                        
                    }
                    clearInterval(_this.timer);
                    _this.flag.addClass('over');
                    
                    do_statistic();
                    _this.iframe.remove();
                    return;
                }
                else
                {
                    _this.error++;
                }
                
                var complete;
                try
                {
                    complete = _this.iframe.contents().find('.unit-complete').length;
                } catch (e) { }
                
                if ((complete != null && complete > 0)
                    || _this.error > 5)
                {
                    if (_this.temp_flag != '0')
                        _this.flag.css('color', 'red');
                    else
                        _this.flag.css('color', 'green');
                    _this.flag.css('font-weight', 'bold');
                    _this.flag.addClass('over');
                    clearInterval(_this.timer);
                    do_statistic();
                    return;
                }
                
                
            }, 2000);
            
            }, 3000);    //setTimeout(function () {
            
        });
        
    };
    
    this.stop = function () {
        clearInterval(_this.timer);
        _this.timer = null;
        _this.iframe.remove();
        _this.flag.css('font-weight', 'bold');
    };
}

$(function () {

var output = $('#output');
for (var title in qunit_list)
{
    var dir_li = $('<li></li>')
        .appendTo(output);
    
    var dir_title = $('<span></span>')
        .html('/' + title)
        .appendTo(dir_li);
        
    var unit_ul = $('<ul></ul>')
        .appendTo(dir_li);
        
    var unit_list = qunit_list[title];
    
    for (var u in unit_list)
    {
        setup_item(unit_ul, unit_list, u, title);
    }
}


});    //$(function () {

function setup_item(unit_ul, unit_list, u, title) {
    var unit_title = unit_list[u];
        
    var unit_li = $('<li></li>')
        .appendTo(unit_ul)
        .html('<a href="<?= base_url() ?>qunit/load/' + title + '/' + unit_title + '" target="_blank">' 
           + '/' + unit_title + '</a> (<span class="flag doing">?</span>/<span class="assert-flag">?</span>) <button class="reload">RELOAD</button> <button class="stop">STOP</button> ');
    
    var item = new Qunit_item(unit_li);
    item.detect();
    
    unit_li.find('.reload').click(function () {
        
        var li = setup_item(unit_ul, unit_list, u, title);
        li.insertBefore(unit_li);
        
        unit_li.remove();
    });
    
    unit_li.find('.stop').click(function () {
        
        item.stop();
        
    });
    
    return unit_li;
};

</script>
<style type="text/css">

.item-iframe {
    width: 100%;
    height: 200px;
    display: block;
}

.item-iframe.hide {
    height: 1px;
    visibility: hidden;
}

.doing {
    color:#EF7121;
}

.fail {
    color: red;
    font-weight: bold;
}

.complete {
    color: green;
    font-weight: bold;
}

</style>
</head>

<body>

    <h1>QUnit Center</h1>
    
    <ul id="statistic">
        <li>已經通過: <span class="doing now">?</span></li>
        <li>測試項目: <span class="total">?</span></li>
    </ul>

    <hr />

    <ul id="output"></ul>

</body>
</html><?php
