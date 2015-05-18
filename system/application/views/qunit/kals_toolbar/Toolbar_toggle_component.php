<?php
/**
 * Toolbar_toggle_component Unit Test
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
//@load_scripts('Toolbar_toggle_component', $load_raw);

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "Toolbar_toggle_component";
QUNIT_ASSERT = 16;

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(4, false);

prepare_iframe();

//0: Toolbar_toggle_component
unit(function () {
    
    var _kals_toolbar = CONTENTS.find('.kals-toolbar');
    
    test_equals( $('#exposeMask:visible').length
        , 0
        , "不能有遮罩出現" );
    
    test_equals( _kals_toolbar.length
        , 1
        , "有一個Toolbar!" );
        
    test_equals( _kals_toolbar.css('top')
        , '0px'
        , "而且他置頂了！" );
        
    test_equals( _kals_toolbar.css('left')
        , '0px'
        , "也置左了！" );

    unit();
});

unit(function () {
    
   //IFRAME.css('height', '320px');
   IFRAME.compact_height();
   
   setTimeout(function () {
       
       var _kals_toolbar = CONTENTS.find('.kals-toolbar');
            
        test_equals( _kals_toolbar.find('.toolbar-component:visible').length
            , 0
            , "改變視窗範圍，他縮起來了！" );
        
        test_equals( _kals_toolbar.find('.toolbar-toggle-button:visible').length
            , 1
            , '有toggle了！');
        
        test_not_equals( _kals_toolbar.css('left')
            , '0px'
            , "而且沒有置左了！" );
        
        
        setTimeout(function () {
            unit();    
        }, 1000);    
        
       
   }, 3000); 
    
});

unit(function () {
    
    TOGGLE = CONTENTS.find('.kals-toolbar .toolbar-toggle-button');
    
    TOGGLE.click();
    
    setTimeout(function () {
        
        var _kals_toolbar = CONTENTS.find('.kals-toolbar');
            
        test_equals( _kals_toolbar.css('top')
            , '0px'
            , "他置頂了！" );
            
        test_equals( TOGGLE.filter(':visible').length
            , 1
            , "toggle還在" );
        
        test_equals( _kals_toolbar.css('left')
            , '0px'
            , "也置左了！" );
        
        //return;
         
        TOGGLE.click();
        
        setTimeout(function() {
            
            test_equals( _kals_toolbar.find('.toolbar-component:visible').length
                , 0
                , "再按一次，他縮起來了！" );
                
            test_not_equals( _kals_toolbar.css('left')
                , '0px'
                , "也沒有置左了！" );
        
        
            test_equals( TOGGLE.filter(':visible').length
                , 1
                , "再按一次，toggle還在" );
        
            unit();    
            
        }, 1000);
    
        
        
    }, 3000);
    
    
});

unit(function() {
    
    //IFRAME.css('height', '600px');
    IFRAME.compact_height(false);
   
   setTimeout(function () {
       
       var _kals_toolbar = CONTENTS.find('.kals-toolbar');
            
        test_equals( _kals_toolbar.css('top')
            , '0px'
            , "放大視窗範圍，他又恢復了！" );
        
        test_equals( _kals_toolbar.find('.toolbar-toggle-button:visible').length
            , 0
            , 'toggle隱藏了！');
            
        unit();
       
   }, 3000); 
    
});

unit(function () {
    
    IFRAME.compact_height(function () {
        
        var _left = CONTENTS.find('.kals-toolbar').css('left');
        
        IFRAME.compact_width(function () {
            
            var _left2 = CONTENTS.find('.kals-toolbar').css('left');
            
            test_not_equals(_left, _left2
                ,'縮小視窗寬度之後，Toggle應該會跟畫面一起置中');
            
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

<?php
/* End of file Toolbar_toggle_component.php */
/* Location: ./system/application/views/qunit/core/Toolbar_toggle_component.php */