<?php
/**
 * Task_event_dispatcher Unit Test
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
//load_core();    //讀取核心物件
//@load_scripts('Task_event_dispatcher', $load_raw);
?>
<script type="text/javascript">
QUNIT_TITLE = "Task_event_dispatcher";
QUNIT_ASSERT = 1;

$(function() {

test("Task_event_dispatcher", function() {

    var task = new Task_event_dispatcher();
    task.schedule_task = ['a'];
    task.add_listener(function () {
        test_equals( true
        , true
        , "有完成任務！" );
    });
    
    task.complete('a');

//    equals( result
//        , expected
//        , "Task_event_dispatcher" );

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
/* End of file Task_event_dispatcher.php */
/* Location: ./system/application/views/qunit/core/Task_event_dispatcher.php */