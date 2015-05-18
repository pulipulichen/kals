<?php
/**
 * KALS_user_interface Unit Test
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
//@load_scripts('KALS_user_interface', $load_raw);

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "KALS_user_interface";
//QUNIT_ASSERT = 5;

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(1, false);

//prepare_iframe();

//0: KALS_user_interface
unit(function () {

    //var A = new KALS_user_interface();
    var A = new KALS_user_interface();
    
    test_equals(A.has_setup_ui(), false
        , '測試看看has_setup_ui()有沒有正常運作');
        
    
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
/* End of file KALS_user_interface.php */
/* Location: ./system/application/views/qunit/core/KALS_user_interface.php */