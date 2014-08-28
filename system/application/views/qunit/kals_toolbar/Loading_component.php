<?php
/**
 * Loading_component Unit Test
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
//@load_scripts('Loading_component', $load_raw);

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "Loading_component";
QUNIT_ASSERT = 4;

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(1, false);

prepare_iframe();

//0: Loading_component
unit(function () {
    
    setTimeout(function () {
    
        test_equals(CONTENTS.find('.search-form-input:first').visible(), true
            , '正常顯示Search Form Input');
        
        
        IFRAME.compact();
        unit(1000);
    }, 1000);
    
});

unit(function () {
    
    test_equals(CONTENTS.find('.advanced-button:first').visible(), true
        , '縮小畫面，應該要顯示advanced button');
    
    test_not_equals(CONTENTS.find('.search-form-input:first').attr('placeholder'), 'Search...'
        , '讀取語系之後，不應該是預設的Placeholder');
    
    unit();
});

unit(function() {
    
    KALS_toolbar.toggle_loading(true);
    
    setTimeout(function() {
        test_equals($('.loading-component:visible').length, 1
            , 'KALS_toolbar.toggle_loading(true); 應該要出現讀取中的字樣');    
    }, 100);
    
    
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
<?php
/* End of file Loading_component.php */
/* Location: ./system/application/views/qunit/core/Loading_component.php */