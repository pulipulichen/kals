<?php
/**
 * KALS_util_notify Unit Test
 *
 * @package     KALS
 * @category    Webpage Application QUnit
 * @author      Pudding Chen <puddingchen.35@gmail.com>
 * @copyright   Copyright (c) 2010, Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        http://sites.google.com/site/puddingkals/
 * @version     1.0 2010/10/8 下午 03:06:36
 */

//load_toolkit();     //讀取常用工具
//load_core();        //讀取核心類別
//load_component();   //讀取元件類別
//@load_scripts('KALS_util_notify', $load_raw);

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "KALS_util_notify";
QUNIT_ASSERT = 7;

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(1, false);

//prepare_iframe();
//可使用的參數
//CONTENTS: 等於IFRAME裡面的$(body)
//IFRAME.compact() IFRAME.compact_width() IFRAME.compact_height()

NOTIFY_MESSAGE = '測試！';

//0: KALS_util_notify
unit(function () {

    KALS_util.notify(NOTIFY_MESSAGE);
    
    setTimeout(function() {
        
        test_equals($('.notify-modal:visible').length, 1
            , '有看到通知');
        
        var _message = $('.notify-modal:visible .message:first');
        
        test_equals(_message.html(), NOTIFY_MESSAGE
            , '通知內的內容為[' + NOTIFY_MESSAGE + ']');
        
        setTimeout(function () {
            
            _message.click();
            
            setTimeout(function () {
                
                test_equals($('.notify-modal:visible').length, 0
                    , '通知已經消失');
                
                unit();
                
            }, 2000);
            
        }, 1000);
        
    }, 1000);

    
});

unit(function () {

    KALS_util.notify(NOTIFY_MESSAGE);
    
    setTimeout(function() {
        
        test_equals($('.notify-modal:visible').length, 1
            , '有看到通知');
        
        KALS_util.notify(NOTIFY_MESSAGE);
        
        var _messages = $('.notify-modal:visible .message');
        
        test_equals(_messages.length, 2
            , '應該有兩個通知了');
        
        var _message = $('.notify-modal:visible .message:first');
        
        test_equals(_message.html(), NOTIFY_MESSAGE
            , '通知內的內容為[' + NOTIFY_MESSAGE + ']');
        
        setTimeout(function () {
            
            _message.click();
            
            setTimeout(function () {
                
                test_equals($('.notify-modal:visible').length, 1
                    , '通知尚未消失');
                
                unit();
                
            }, 2000);
            
        }, 1000);
        
    }, 1000);

    
});

</script>
<style type="text/css">
/**
 * 您可以在此寫入CSS內容
 */
</style>

<!--
  您可以在此寫入HTML內容
  -->

 <!--
 
 -->

<?php
/* End of file KALS_util_notify.php */
/* Location: ./system/application/views/qunit/core/KALS_util_notify.php */