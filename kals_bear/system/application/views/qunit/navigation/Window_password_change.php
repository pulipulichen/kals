<?php
/**
 * Window_password_change Unit Test
 *
 * @package     KALS
 * @category    Webpage Application QUnit
 * @author      Pudding Chen <puddingchen.35@gmail.com>
 * @copyright   Copyright (c) 2010, Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        http://sites.google.com/site/puddingkals/
 * @version     1.0 2010/10/8 下午 05:50:13
 */

//load_toolkit();     //讀取常用工具
//load_core();        //讀取核心類別
//load_component();   //讀取元件類別
//@load_scripts('Window_password_change', $load_raw);

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "Window_password_change";
//QUNIT_ASSERT = 5;

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(1, false);

//prepare_iframe();
//可使用的參數
//CONTENTS: 等於IFRAME裡面的$(body)
//IFRAME.compact() IFRAME.compact_width() IFRAME.compact_height()

PASSWORD = 'kals'
PASSWORD_CHANGE = '0000';

//0: Window_password_change
unit(function () {

    $('.kals-toolbar a.Login').click();
    
    setTimeout(function() {
        
        var _window = $('.window-login');
        
        _window.find('.text[name="email"]').val('kals@test.kals.idv');
        _window.find('.text[name="password"]').val('kals');
        
        $('.dialog-modal.window .window-content-submit:first').click();
        
        unit(5000);
        
    }, 3000);
    
});

unit(function () {
    
    $('.kals-toolbar a.Profile').click();
    
    setTimeout(function () {
        
        $('.window-profile a.link').click();
        
        unit(5000);
    }, 3000);
    
});

unit(function () {
    
    var _window = $('.window-password-change');
    test_equals(_window.length, 1
        , '有顯示密碼變更視窗');
        
    var _submit = $('.dialog-table .window-content-submit:first');
    
    test_equals(_submit.length, 1
        , '有找到儲存按鈕');
        
    _submit.click();
    
    setTimeout(function () {
        
        test_equals(_window.find('.error-row').length, 1
            , '有顯示錯誤訊息');
            
        _window.find('[name="password"]').val(PASSWORD_CHANGE);
        _window.find('[name="password_confirm"]').val(PASSWORD_CHANGE);
        
        _submit.click();
        
        unit(5000);    
    }, 2000); 
    
});

unit(function() {
    
    //關掉帳號登入的視窗
    $('.dialog-modal.window .dialog-toolbar .dialog-option.close').click();
    
    setTimeout(function () {
        
        test_equals($('.dialog-modal.window:visible').length, 0
            , '視窗應該已經關掉了');
        
        //點選登出
        $('.kals-toolbar a.Logout').click();
        
        setTimeout(function () {
            //登出
            KALS_window.get_ui().find('.window-content-submit').click();
            
            unit(3000);    
        }, 3000); 
    }, 3000);
});

unit(function () {
    
    $('.kals-toolbar a.Login').click();
    
    setTimeout(function () {
        
        KALS_window.get_ui('[name="email"]').val('kals@test.kals.idv');
        KALS_window.get_ui('[name="password"]').val(PASSWORD_CHANGE);
        
        KALS_window.get_ui().find('.window-content-submit').click();
        
        setTimeout(function () {
            
            test_equals($('.kals-toolbar .avatar-component:visible').length, 1
                , '已經成功登入');
            
            unit(5000);
        }, 3000);
        
    }, 3000);
    
});


unit(function () {
    
    $('.kals-toolbar a.Profile').click();
    
    setTimeout(function () {
        
        $('.window-profile a.link').click();
        
        unit(5000);
    }, 3000);
    
});


unit(function () {
    
    var _window = $('.window-password-change');
    var _submit = $('.dialog-table .window-content-submit:first');
    
        
    _submit.click();
    
    setTimeout(function () {
        
        test_equals(_window.find('.error-row').length, 1
            , '有顯示錯誤訊息');
            
        _window.find('[name="password"]').val(PASSWORD);
        _window.find('[name="password_confirm"]').val(PASSWORD);
        
        _submit.click();
        
        unit(5000);
        
    }, 3000); 
    
});

unit(function () {
    
    test_equals($('.window-profile:visible').length,1
        , '密碼變更完成');
    
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

<a href="#" onclick="$('.kals-toolbar a.Profile').click();">click</a>

<?php
/* End of file Window_password_change.php */
/* Location: ./system/application/views/qunit/core/Window_password_change.php */