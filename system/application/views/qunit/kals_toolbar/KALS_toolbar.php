<?php
/**
 * KALS_toolbar Unit Test
 *
 * @package             KALS
 * @category		Webpage Application QUnit
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 上午 12:17:29
 */

load_toolkit(); //讀取常用工具
load_core();    //讀取核心類別
load_component();    //讀取元件類別
?>
<script type="text/javascript">
QUNIT_TITLE = "KALS_toolbar";
//QUNIT_ASSERT = 5;

$(function() {

$.lock_viewport();

for (var i = 0; i < 100; i++)
{
    $('<div>1</div>').appendTo($('body'));
}

KALS_toolbar = new KALS_toolbar(function () {
    
//KALS_toolbar.set_loading(false);

test("KALS_toolbar", function() {

    var result = null;
    var expected = null;

    equals( result
        , expected
        , "KALS_toolbar" );

//    equals( result
//        , expected
//        , "KALS_toolbar" );

});

}); //$(function() {

});    //KALS_toolbar = new KALS_toolbar(function () {
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
/* End of file KALS_toolbar.php */
/* Location: ./system/application/views/qunit/core/KALS_toolbar.php */