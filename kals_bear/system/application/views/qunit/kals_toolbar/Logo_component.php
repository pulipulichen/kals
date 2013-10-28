<?php
/**
 * Logo_component Unit Test
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
//@load_scripts('Logo_component', $load_raw);

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "Logo_component";
QUNIT_ASSERT = 3;

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(1, false);

prepare_iframe();

//0: Logo_component
unit(function () {
    
    LOGO = CONTENTS.find('.logo-component');
    
    test_equals(LOGO.visible(), true,
        '有看到logo嗎？');

    IFRAME.compact(true);

    unit(2000);
});

unit(function () {
    
    test_equals(LOGO.visible(), false,
        '縮小後應該看不到logo了');

    IFRAME.compact(false);
    
    unit(2000);
});

unit(function () {
    
    test_equals(LOGO.visible(), true,
        '放大後又可以看到Logo了');
    
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
/* End of file Logo_component.php */
/* Location: ./system/application/views/qunit/core/Logo_component.php */