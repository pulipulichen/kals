<?php
/**
 * KALS_util Unit Test
 *
 * @package             KALS
 * @category		QUnit
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 上午 12:17:29
 */

$title = 'KALS_units';
/*
@load_scripts('toolkit/flexcroll', $load_raw);
@load_scripts('toolkit/yui', $load_raw);
@load_scripts('toolkit/jquery.extends', $load_raw);
@load_scripts('toolkit/jQuery_mousewheel_plugin', $load_raw);
@load_scripts('toolkit/jquery.tools', $load_raw);
@load_scripts('toolkit/Event_dispatcher', $load_raw);
@load_scripts('toolkit/Viewportmove_dispatcher', $load_raw);
@load_scripts('toolkit/JSONP_dispatcher', $load_raw);
@load_scripts('core/KALS_language', $load_raw);
@load_scripts('core/KALS_context', $load_raw);
@load_scripts('toolkit/Modal_factory', $load_raw);
@load_scripts('helpers/KALS_util', $load_raw);
@load_styles('general-screen');
@load_styles('flexcrollstyles');
*/
load_toolkit();
load_core();
?>

<script type="text/javascript">
QUNIT_TITLE = "<?= $title ?>";
//var _head = $('head');
//var _new_viewport = $('<meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes" />')
//        .appendTo(_head);
//test("KALS_units", function() {

$(function () {
   

KALS_context.viewportmove.lock_viewport();
for (var i = 0; i < 100; i++)
    $('<div>1</div>').appendTo($('body'));
     
    //測試錯誤訊息 
    if (true) {
        KALS_util.ajax_get('/CodeIgniter_1.7.2/qunit/load/kals_text/Selection_m', function (_data) {
            alert('沒偵測到錯誤……');
        });
            
        KALS_context.lang.load();    
    }
   
   
    //測試通知
    if (false)
    {
        KALS_util.notify('測試看看？');
        setTimeout(function () {
            KALS_util.notify('測試看看？2');    
        }, 3000);
        
        setTimeout(function () {
            KALS_util.notify('測試看看？3');
        }, 15000);
    }
    
   //KALS_util.alert('ALERT HEADING', 'ok，讓我們來些什麼？<br /><br /><span style="color:red;">HTML格式如何？</span>');
   
   
   //測試confirm
   if (false)
   {
       KALS_util.confirm('關於金柯啦', '您是否聽過金柯啦？<br />'
        + '<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />'
        + '有了金柯啦，一袋能抵兩袋灑，在也不用種庄稼！金咖啦真是太神奇了。 <br /><br /><br /> 來自於美國‧聖地牙哥！',
           [{lang: '是', value: 'yes', callback: function (_modal, _value) { alert(_value); }},
            {lang: '否', value: 'no', callback: function (_modal, _value) { alert(_value); }}]
           , function () {
               alert('關閉');
           });
   }
    
    
//});

$('.flexscroll').bind('touchstart', function (_event) {
    _event.preventDefault();
});

});    //$(function () {
</script>
<style type='text/css'>
</style>

<div style="overflow:auto;height: 200px;" class="flexcroll1212">您是否聽過金柯啦？<br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        有了金柯啦，一袋能抵兩袋灑，在也不用種庄稼！金咖啦真是太神奇了。 <br /><br /><br /> 來自於美國‧聖地牙哥！</div>

<!--
你可以在此寫入HTML內容
-->
<?php
/* End of file KALS_util.php */
/* Location: ./system/application/views/qunit/kals_util.php */
