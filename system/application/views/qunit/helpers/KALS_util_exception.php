<?php
/**
 * KALS_util_exception Unit Test
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
//@load_scripts('KALS_util_exception', $load_raw);

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "KALS_util_exception";
QUNIT_ASSERT = 4;

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(1, false);

unit(function () {
    //錯誤擷取
    //var test = TEST;
    unit();
});

//0: KALS_util_exception
unit(function () {
    //讀取一個錯誤的例子
    
    KALS_util.ajax_get('/there_are_no_page', function () {
        test_equals( false
            , true
            , "不應該出現這個測試！" );
    });
    
    setTimeout(function () {
        
        test_equals( $('.alert:visible').length
            , 1
            , "檢查看看Alert有沒有打開？" );    
        
        HEADING =  $('.alert:visible .dialog-heading').html();
        
        unit();
        
    }, 3000);
    
});

unit(function () {
    
    //載入語系檔之後再讀取一次
    
    
    KALS_context.load(function () {
        
        KALS_util.ajax_get('/there_are_no_page', function () {
        test_equals( false
            , true
            , "不應該出現這個測試！" );
        });
        
        setTimeout(function () {
            
            test_equals( $('.alert:visible').length
                , 1
                , "再次檢查看看Alert有沒有打開？" );
                
            
            test_not_equals($('.alert:visible .dialog-heading').html()
                , HEADING
                , '標頭有沒有改變呢？');
                
            test_equals($('.alert.exception:visible').length, 1
                , 'Excpetion的Alert有沒有正確地設置Exception的ClassName呢');
            
            unit();
            
        }, 1000);    
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

<?php
/* End of file KALS_util_exception.php */
/* Location: ./system/application/views/qunit/core/KALS_util_exception.php */