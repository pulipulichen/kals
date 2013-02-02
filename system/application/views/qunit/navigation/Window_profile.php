<?php
/**
 * Window_profile Unit Test
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
//@load_scripts('Window_profile', $load_raw);

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "Window_profile";
//QUNIT_ASSERT = 5;

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(1, false);

//prepare_iframe();
//可使用的參數
//CONTENTS: 等於IFRAME裡面的$(body)
//IFRAME.compact() IFRAME.compact_width() IFRAME.compact_height()

//0: Window_profile
unit(function () {

    $('.kals-toolbar a.Login').click();
    
    setTimeout(function() {
        
        var _window = $('.window-login');
        
        _window.find('.text[name="email"]').val('kals@test.kals.idv');
        _window.find('.text[name="password"]').val('kals');
        
        $('.dialog-modal.window .window-content-submit:first').click();
        
        unit(3000);
        
    }, 5000);
    
});

unit(function () {
    
    $('.kals-toolbar a.Profile').click();
    
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

 <!--
 
 -->

<?php
/* End of file Window_profile.php */
/* Location: ./system/application/views/qunit/core/Window_profile.php */