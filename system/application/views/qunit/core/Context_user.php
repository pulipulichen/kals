<?php
/**
 * KALS_context Unit Test
 *
 * @package             KALS
 * @category		Webpage Application QUnit
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 上午 12:17:29
 */

$title = 'KALS_context';
load_toolkit(); //讀取常用工具
load_core();    //讀取核心物件
?>
<script type="text/javascript">
QUNIT_TITLE = "<?= $title ?>";
//QUNIT_ASSERT = 5;

$(function() {

test("KALS_context", function() {

    equals(KALS_context.user.get_id()
        , null
        , '沒設定之前，get user id看看');
        
    var user_name = $.create_once('<div id="user_name" style="border:1px solid green;"></div>');
    
    equals(user_name.html()
        , ''
        , '建立一個空的user_name殼子');
        
    KALS_context.user.add_attr_listener('name', function (_attr) {
        user_name.html(_attr);
    });
    
    equals(user_name.html()
        , ''
        , '設定殼子的內容，但因為資料是空的，所以什麼都沒有！');
        
    var name = 'pudding';
    KALS_context.user.set_name(name);
    
    equals(user_name.html()
        , name
        , '設定名字之後，殼子自然應該有值了？');
    
    var user_name2 = $.create_once('<div id="user_name2" style="border:1px solid red;"></div>');
    
    KALS_context.user.add_attr_listener('name', function (_attr) {
        user_name2.html(_attr);
    });
    
    equals(user_name2.html()
        , name
        , '建立一個空的user_name2殼子，並設定事件，應該馬上有值？');
        
    var has_login = $.create_once('<div id="has_login" style="border:1px solid green;"></div>');
    KALS_context.user.add_attr_listener('id', function (_attr, _dispatcher) {
        if (_dispatcher.has_login())
            has_login.html('true');
        else
            has_login.html('false');
    });
    
    equals(has_login.html()
        , 'false'
        , '檢查has_login，現在尚未login喔');
        
    KALS_context.user.set_id(1212);
    
    equals(has_login.html()
        , 'true'
        , '檢查has_login，現在login了喔');

//    equals( result
//        , expected
//        , "KALS_context" );

}); //$(function() {

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
/* End of file KALS_context.php */
/* Location: ./system/application/views/qunit/core/KALS_context.php */