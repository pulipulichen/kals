<?php
/**
 * Anonymous_navigation Unit Test
 *
 * @package     KALS
 * @category    Webpage Application QUnit
 * @author      Pudding Chen <puddingchen.35@gmail.com>
 * @copyright   Copyright (c) 2010, Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        http://sites.google.com/site/puddingkals/
 * @version     1.0 2010/10/4 下午 03:46:16
 */

//load_toolkit();     //讀取常用工具
//load_core();        //讀取核心類別
//load_component();   //讀取元件類別
//@load_scripts('Anonymous_navigation', $load_raw);

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "Anonymous_navigation";
QUNIT_ASSERT = 5;

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(1, false);

prepare_iframe();
//可使用的參數
//CONTENTS: 等於IFRAME裡面的$(body)
//IFRAME.compact() IFRAME.compact_width() IFRAME.compact_height()

//0: Anonymous_navigation
unit(function () {

    test_equals( CONTENTS.find('.navigation-list:visible').length 
        , 1
        , "Anonymous_navigation 有出現？" );
        
    test_not_equals( CONTENTS.find('.navigation-list:visible .nav .item:first a').html() 
        , 'Login'
        , "語系檔讀取完畢，應該是「登入」而非「Login」" );
    
    IFRAME.compact_width(function() {
        
        test_equals( CONTENTS.find('.navigation-list:visible .menu:visible').length 
            , 1
            , "Anonymous_navigation的menu button 有出現？" );
        
        unit();
        
    })
});

unit(function () {
    
    $('.navigation-list .nav .item:first a').click();
    
    $.trigger_callback(3000, function () {
        
        test_equals($('.kals-modal.window:visible .dialog-content:visible').length, 1
            , '點下登入按鈕有出現視窗！');
        
        $('.kals-modal.window:visible .dialog-toolbar .dialog-option.close').click();
        
        $.trigger_callback(2000, function () {
        
            test_equals($('.kals-modal.window:visible .dialog-content:visible').length, 0
                , '點下關閉按鈕會將視窗關掉！');    
            
        });
        
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
/* End of file Anonymous_navigation.php */
/* Location: ./system/application/views/qunit/core/Anonymous_navigation.php */