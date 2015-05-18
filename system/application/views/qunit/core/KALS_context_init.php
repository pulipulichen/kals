<?php
/**
 * KALS_context_init Unit Test
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
//@load_scripts('KALS_context_init', $load_raw);

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "KALS_context_init";
QUNIT_ASSERT = 1;

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(1, false);

//0: KALS_context_init
unit(function () {
    
    setTimeout(function() {
        test_equals(KALS_context.completed, true
            , '測試KALS_context是否正常初始化完成');    
        unit();
    }, 3000);

    
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
/* End of file KALS_context_init.php */
/* Location: ./system/application/views/qunit/core/KALS_context_init.php */