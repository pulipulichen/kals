<?php
/**
 * Overlay_manager Unit Test
 *
 * @package             KALS
 * @category		Webpage Application QUnit
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 上午 12:17:29
 */

//load_toolkit();     //讀取常用工具
//load_core();        //讀取核心類別
//load_component();   //讀取元件類別
//@load_scripts('Overlay_manager', $load_raw);

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "Overlay_manager";
QUNIT_ASSERT = 15;

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(4, false);

//0: Overlay_manager
unit(function () {
    
    KALS_context.hash.clear_hash();
    
    test_equals(location.href.indexOf('modal')
        , -1
        , '網址上目前沒有modal name');
    
    ALERT = KALS_util.alert('test', 'content');
    
    setTimeout(function () {
        
        test_not_equals(location.href.indexOf(ALERT.get_modal_name())
            , -1
            , '網址上有出現Alert的Modal Name喔！');
        
        setTimeout(function () {
            //KALS_context.hash.clear_hash();
            //$.test_msg('預備下一個');
            
            setTimeout(function () {
                unit();    
            }, 1000);
                
        }, 1000);
        
        
    }, 1000);
});

unit(function () {
    
    
    CONFIRM = KALS_util.confirm('confirm test', 'confirm content');
    
    setTimeout(function () {
        
        test_equals(location.href.indexOf(ALERT.get_modal_name())
            , -1
            , '網址已經沒有Alert的Modal Name了！');
        
        test_not_equals(location.href.indexOf(CONFIRM.get_modal_name())
            , -1
            , '網址上有出現CONFIRM的Modal Name喔！');
        
        var confirm_z = CONFIRM.get_ui().css('z-index');
        var alert_z = ALERT.get_ui().css('z-index');
        
        test_equals((confirm_z > alert_z), true
            , '檢查一下confirm是否有在alert之前');
        
        setTimeout(function () {
            
            var CLOSE = $('.alert button.close');
    
            test_equals(CLOSE.hasClass('hover'), false
                , 'confrim開啟之後，alert應該是沒有hover的class');
            
            test_equals(CLOSE.hasClass('focus'), false
                , 'confrim開啟之後，alert應該是沒有focus的class');
            
            unit();    
        }, 1000);
        
    }, 1000);
});

unit(function() {
    
    CONFIRM.close(function () {
        
        setTimeout(function () {
            
            test_equals(ALERT.is_opened(), true
            , 'ALERT還開著，對');
        
            test_equals($('#exposeMask:visible').length, 1
                , '關掉CONFIRM之後，應該還要有ALERT的mask才對。');
            
            unit();    
        }, 3000);
    });
    
});

unit(function () {
    
    var CLOSE = $('.alert button.close');
    
    test_equals(CLOSE.hasClass('hover') && CLOSE.hasClass('focus'), true
        , 'confrim關掉之後，alert應該是仍保持focus跟hover的ass');
    
    ALERT.close(function () {
        setTimeout(function() {
            unit();    
        }, 3000);
    }); 
    
});

unit(function () {
    
    ALERT = KALS_util.alert('test', 'content');
    CONFIRM = KALS_util.confirm('confirm test', 'confirm content');
    //$.test_msg('開啟alert跟confirm');
    setTimeout(function () {
        test_equals(ALERT.is_opened(), true
            , 'ALERT正常開啟中');
            
        test_equals(CONFIRM.is_opened(), true
            , 'CONFIRM正常開啟中');    
        
        setTimeout(function () {
            unit();    
        }, 3000);  
    }, 1000);
});

unit(function () {
    
    //$.test_msg('準備後退');
    //history.back();
    history.go(-1);
    
    setTimeout(function () {
        test_equals(ALERT.is_opened(), false
            , 'ALERT正常關閉');
        
        test_equals(CONFIRM.is_opened(), false
            , 'CONFIRM正常關閉');
        
        unit();    
    }, 1000);
    
});

unit(function () {
    test_equals(location.href.indexOf('backward'), -1
        , 'hash不應該出現backward');
    //test_equals(location.href.indexOf('#'), -1
    //    , 'url不應該出現#');
    
    unit();
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
<a href='?' target="_blank">new page</a>
<?php
/* End of file Overlay_manager.php */
/* Location: ./system/application/views/qunit/core/Overlay_manager.php */