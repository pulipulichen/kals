<?php
/**
 * KALS_setup Unit Test
 *
 * @package             KALS
 * @category		QUnit
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 上午 12:17:29
 */

$title = 'KALS_loader';
@load_scripts('core/KALS_loader', $load_raw);
?>
<script type="text/javascript" src="<?= base_url() ?>web_apps/general/setup"></script>
<script type="text/javascript">
QUNIT_TITLE = "<?= $title ?>";

test("KALS_setup", function() {
    KALS_loader.load(function () {
    	KALS_util.alert('ALERT HEADING', 'ok，讓我們來看看這個Alert到底能做到些什麼？<br /><br /><span style="color:red;">HTML格式如何？</span>', function () {
    	});
	
    	testEquals($('.kals-modal').exists()
	       , true
	       , '測試alter()');


	    setTimeout(function () {
			KALS_context.get_lang().set_lang({'modal.close': '有沒有改變？'});
		}, 3* 1000);


	    setTimeout(function () {
	    	//KALS_util.alert('ok，讓我們來看看這個Alert到底能做到些什麼？<br /><br /><span style="color:red;">HTML格式如何？</span>', 'ALERT HEADING');
		}, 5* 1000);
    });

});

</script>

<!--
你可以在此寫入HTML內容
-->

<?php
/* End of file KALS_setup.php */
/* Location: ./system/application/views/qunit/KALS_setup.php */