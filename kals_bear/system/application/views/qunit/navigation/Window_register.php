<?php
/**
 * Window_register Unit Test
 *
 * @package     KALS
 * @category    Webpage Application QUnit
 * @author      Pudding Chen <puddingchen.35@gmail.com>
 * @copyright   Copyright (c) 2010, Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        http://sites.google.com/site/puddingkals/
 * @version     1.0 2010/10/7 下午 09:32:18
 */

//load_toolkit();     //讀取常用工具
//load_core();        //讀取核心類別
//load_component();   //讀取元件類別
//@load_scripts('Window_register', $load_raw);

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "Window_register";
QUNIT_ASSERT = 18;

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(4, false);

//prepare_iframe();
//可使用的參數
//CONTENTS: 等於IFRAME裡面的$(body)
//IFRAME.compact() IFRAME.compact_width() IFRAME.compact_height()

REGISTER_EMAIL = 'register@test.kals.idv';
REGISTER_NAME = 'register';
REGISTER_PASSWORD = 'kals';

unit(function () {
    unit(3000);
});


//0: Window_register
unit(function () {

    test_equals($('.kals-toolbar .anonymous-component:visible').length, 1,
        '可以看到登入的導覽列');
    
    var _register_link = $('.kals-toolbar .anonymous-component .item a.Register:visible');
    test_equals(_register_link.length, 1
        , '有找到註冊的功能，準備按下');
    _register_link.click();
    
    setTimeout(function () {
        
        test_equals($('.dialog-modal:visible').length, 1
            , '有開啟dialog');
            
        test_equals($('.window-panel.Register.window-register:visible').length, 1
            , '有看到登入視窗的內容');
            
        unit(3000);
        
    }, 3000);
    
});

unit(function () {
    
    var _window_register = $('.window-register');
    
    _window_register.find('.text[name="email"]').val(REGISTER_EMAIL);
    _window_register.find('.text[name="password"]').val(REGISTER_PASSWORD);
    //_window_login.find('text[name="password"]').val(REGISTER_PASSWORD);
    
    //$.test_msg(1212);
    
    if (_window_register.find('.text[name="email"]').length == 0)
        return;
    
    var _submit = _window_register.parents('.dialog-table:first').find('.window-content-submit:first'); 
    _submit.click();
    
    setTimeout(function () {
        
        test_equals($('.kals-toolbar .anonymous-component:visible').length, 0,
                '已經看不到登入的導覽列');
            
        test_equals($('.kals-toolbar .avatar-component:visible').length, 1,
            '看得到登入之後的帳戶資料');
        
        test_equals($('.avatar-component .name').html(), REGISTER_NAME
            , '登入名字為[' + REGISTER_NAME + ']，沒錯，成功註冊了');
            
        unit(1000);
        
        /*
        test_not_equals(_window_register.find('.error.message-row').html() , ''
            , '有顯示錯誤訊息');
            
        _window_register.find('.text[name="password"]').val(REGISTER_PASSWORD);
        _submit.click();
        
        setTimeout(function () {
            
            test_equals($('.kals-toolbar .anonymous-component:visible').length, 0,
                '已經看不到登入的導覽列');
            
            test_equals($('.kals-toolbar .avatar-component:visible').length, 1,
                '看得到登入之後的帳戶資料');
            
            test_equals($('.avatar-component .name').html(), REGISTER_NAME
                , '登入名字為[' + REGISTER_NAME + ']，沒錯，成功註冊了');
            
            unit(1000);
        }, 3000);
        */
    }, 3000);
       
});

unit(function () {
    
    var _logout_link = $('.kals-toolbar .avatar-component:visible .navigation-list .item a.Logout:visible');
    
    test_equals(_logout_link.length, 1
        , '有找到登出的功能，準備按下');
    _logout_link.click();
    
    setTimeout(function () {
        
        test_equals($('.dialog-modal.window:visible .window-logout:visible').length, 1
            , '有開啟登出視窗')
        
        var _submit = $('.dialog-modal.window .window-content-submit:first');
        
        test_equals(_submit.length, 1
            , '有找到登出按扭，準備按下');
        
        _submit.click();
        
        setTimeout(function () {
            
            test_equals($('.kals-toolbar .avatar-component:visible').length, 0,
                '已經看不到登入之後的帳戶資料');
            
            test_equals($('.kals-toolbar .anonymous-component:visible').length, 1,
                '看得到登入的導覽列');
            
            unit(1000);
            
        }, 5000);
        
    }, 3000);
    
});

unit(function () {
    
    var _login_link = $('.kals-toolbar .anonymous-component .item a.Login:visible');
    
    test_equals(_login_link.length, 1
        , '有找到登入的功能，準備按下');
    _login_link.click();
    
    setTimeout(function () {
        
         test_equals($('.dialog-modal.window:visible .window-login:visible').length, 1
            , '有開啟登入視窗')
        
        var _login = $('.window-login');
    
        _login.find('.text[name="email"]').val(REGISTER_EMAIL);
        _login.find('.text[name="password"]').val(REGISTER_PASSWORD);
        
        var _submit = $('.dialog-modal.window .window-content-submit:first');
        
        test_equals(_submit.length, 1
            , '有找到登出按扭，準備按下');
        
        _submit.click();
        
        setTimeout(function () {
            
            test_equals($('.kals-toolbar .anonymous-component:visible').length, 0,
                '已經看不到登入的導覽列');
            
            test_equals($('.kals-toolbar .avatar-component:visible').length, 1,
                '看得到登入之後的帳戶資料');
            
            //test_equals($('.avatar-component .name').html(), REGISTER_NAME
            //    , '登入名字為[' + REGISTER_NAME + ']，沒錯，成功登入了');
            
            unit(1000);
            
        }, 3000);
        
        
    }, 3000);
    
});


unit(function () {
    
    KALS_context.auth.deregister(function (_auth, _data) {
        
        test_equals( _data, true
            , '已經成功刪除帳號['+ REGISTER_NAME +'] ');
        
        unit(1000);
    });
    
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
/* End of file Window_register.php */
/* Location: ./system/application/views/qunit/core/Window_register.php */