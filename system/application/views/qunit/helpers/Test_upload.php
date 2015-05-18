<?php
/**
 * Test_upload Unit Test
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
load_core();    //讀取核心物件
@load_scripts('Test_upload', $load_raw);
?>
<script type="text/javascript">
QUNIT_TITLE = "Test_upload";
//QUNIT_ASSERT = 5;

$(function() {

test("Test_upload", function() {

    var result = null;
    var expected = null;

    equals( result
        , expected
        , "Test_upload" );

//    equals( result
//        , expected
//        , "Test_upload" );

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
<form enctype="multipart/form-data" action="http://ppt.cc/cut/index.php" method="POST">
<table border="0" width="100%" id="table1" cellpadding="6" cellspacing="0">
	<tr>
        <td>
        檔名 : <input name="uploaded" type="file" value="http://tw.mabinogi.gamania.com/image/download/download.gif" /><input type="submit" value="上傳檔案" />  /
        圖片網址 : <input name="urlfile" type="text" size="30" /><input type="submit" value="讀入圖片" />
        </td>
        </tr>
</table>
</form>
<?php
/* End of file Test_upload.php */
/* Location: ./system/application/views/qunit/core/Test_upload.php */