<?php
/**
 * Alert Unit Test
 *
 * @package             KALS
 * @category		Webpage Application QUnit
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 上午 12:17:29
 */

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "Alert";
QUNIT_ASSERT = 20;

/*
$(function() {
  
setTimeout(function () {
    test1();
}, 0);
*/

//unit(5, false);
//unit();

//var test1 = function() {
unit(function () {
    ALERT = KALS_util.alert(
        '測試',
        '要哭了',
        function () {
            test_equals(true, true, '建立alert modal與onclose成功');
            
            //test2();
            unit();
        }
    );
    
    //2010.9.3 16:07 暫時中斷一下，為了修改Select_menu的版面
    //return;
    
        
    setTimeout(function () {
        $('.dialog-modal button.close').click();
    }, 1000);
});

//var test2 = function () {
unit(function () {
    var heading = '測試關閉按鈕';
    
    ALERT = KALS_util.alert(
        new KALS_language_param(heading, 'authentication.logout_error.heading'),
        new KALS_language_param('測試關閉按鈕內文', 'authentication.logout_error.message'),
        function () {
            
            test_equals(true, true, '以KALS_language_param建立alert modal與onclose成功');
            
        }
    );
    
    setTimeout(function () {
        KALS_context.load(function () {
            
            var text = ALERT.get_heading().text();
            
            //$.test_msg('lang load', [text, heading, (text == heading)]);
            
            test_not_equals(text, heading
                , '檢查語系檔是否有正確讀入(標題應該要有所改變)');
            
            setTimeout(function () {
                $('.dialog-modal button.close').click();
                
                setTimeout(function () {
                    //test3();
                    unit();
                }, 1000);    
            }, 1000);    
        });
    }, 1000);
});

//var test3 = function () {
unit(function () {    

    var content = '請確認看看？';
    
    for (var i = 0; i < 100; i++)
        content = content +  '請確認看看？';
    
    CONFIRM = KALS_util.confirm(
        '標題',
        content,
        function (_value) {
            test_equals(_value, true
                , '按了 是');
            unit();
        }
    );
    
    //2010.9.3 16:07 暫時中斷一下，為了修改Select_menu的版面
    //return;
    
    
    setTimeout(function () {
        
        test_equals($('.dialog-modal.confirm:visible').length, 1
            , 'confirm有正常跑出來嗎？');
        
        setTimeout(function() {
            $('.confirm .dialog-option:first').click();
            
            //test4();
        }, 1000);
    }, 1000);
});

//var test4 = function () {
unit(function () {
    //測試通知功能
    NOTIFY = KALS_util.notify('測試看看有沒有通知消息？');
    setTimeout(function () {
        
        test_equals($('.notify-modal:visible').length, 1
            , 'notify有正常跑出來嗎？');
        
        if ($.is_mobile_mode())
        {
            test_equals($('.notify-modal:visible').css('position'), 'absolute'
                , 'notify是否有套用到正常的CSS？');
        }
        else
        {
            test_equals($('.notify-modal:visible').css('position'), 'fixed'
                , 'notify是否有套用到正常的CSS？');
        }
            
        
        NOTIFY = KALS_util.notify('第二則消息');
        
        setTimeout(function() {
            
            test_equals($('.notify-modal:visible .message').length, 2
            , '應該有2則message');
            
            setTimeout(function () {
                
                test_equals($('.notify-modal:visible').length, 0
                    , 'notify有沒有正確地關閉？');
                
                //test4_2();
                unit();
                
            }, 14000);
            
        }, 1000);
        
    }, 3000);
    
});

//var test4_2 = function () {
unit(function () {
    //測試通知功能
    
    KALS_util.notify('測試之二！');
    
    setTimeout(function () {
        
        test_equals($('.notify-modal:visible').length, 1
            , 'notify有正常跑出來嗎？');
        
        KALS_util.notify('測試之二第二則消息！');
        
        setTimeout(function() {
            
            test_equals($('.notify-modal:visible .message').length, 2
            , '應該有2則message');
            
            setTimeout(function () {
                
                test_equals($('.notify-modal:visible').length, 0
                    , 'notify有沒有正確地關閉？');
                
                //test5();
                unit();
                
            }, 12000);
            
        }, 1000);
        
    }, 1000);
    
});
//var test5 = function () {
unit(function () {
        
    //測試select_menu功能
    
    var options = [
        (new Dialog_close_option(new KALS_language_param('選項1', 'time.month_name.1'), function () {  
            test_equals(true, true
                , '按了第一個選項，ok！');
            
        })),
        (new Dialog_close_option(new KALS_language_param('選項2', 'time.month_name.2'))),
        (new Dialog_close_option(new KALS_language_param('選項3', 'time.month_name.3'))),
        (new Dialog_close_option(new KALS_language_param('選項4', 'time.month_name.4'))),
        (new Dialog_close_option(new KALS_language_param('選項5', 'time.month_name.5'))),
        (new Dialog_close_option(new KALS_language_param('選項6', 'time.month_name.6')))
    ];
    
    MENU = KALS_util.select_menu({
        heading: '測試',
        content: '內容！',
        options: options
    });
    
    //2010.9.4 檢查
    //return;
    
    setTimeout(function () {
        
        test_equals($('.select-menu:visible').length, 1
            , '是否有開起select-menu');
            
        //2010.9.5 觀察menu的樣式
        return;
        
        $('.select-menu .dialog-options .dialog-option:first').click();
        
        setTimeout(function () {
            
            test_equals($('.select-menu:visible').length, 0
                , '是否已關閉select-menu');   
                 
            //test6();
            unit();
            
        }, 1000);
        
    }, 1000);
    
});

//var test6 = function () {
unit(function () {
        
    MENU.open(function () {
        
        test_equals($('.select-menu:visible').length, 1
            , '是否有開起select-menu，使用物件的open()開啟');
        test_equals(MENU.is_opened(), true
            , '是否有開啟select-menu，使用物件的is_opended()偵測');
        
        //2010.9.5 觀察menu的樣式
        return;
        
        setTimeout(function () {
            
            MENU.close(function () {
                
                test_equals(MENU.is_opened(), false
                    , '是否已關閉select-menu，使用物件的is_opended()偵測');
                    
                unit();   
            });    
        }, 1000);    
        
        
    });
    
});

unit(function () {
        
    MENU.open(function () {
        
        test_equals($('.select-menu:visible').length, 1
            , '第二次使用open()開啟，是否有開起select-menu？使用visible來偵測');
        
        setTimeout(function () {
            
            MENU.close(function () {
                
                test_equals($('.select-menu:visible').length, 0
                    , '第二次使用close()來關閉。是否有關閉select-menu，使用visible來偵測');
                    
                unit();   
            });    
        }, 1000);    
        
        
    });
    
});

//}); //$(function() {

</script>

<style type="text/css">
/**
 * 您可以在此寫入CSS內容
 */
</style>

<!--
  您可以在此寫入HTML內容
  -->

<?php
/* End of file Alert.php */
/* Location: ./system/application/views/qunit/core/Alert.php */