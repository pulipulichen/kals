<?php
/**
 * Javascript Unit Test
 *
 * Javascript單元測試集合頁
 *
 * @package		KALS
 * @category		Views
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/19 上午 12:17:29
 */
$this->load->helper('url');
$title = 'Javascript 單元測試集合頁';
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?= $title ?></title>
<script type="text/javascript" src="<?= base_url() ?>js/jquery.js"></script>
<script type="text/javascript" src="<?= base_url() ?>js/qunit.js"></script>
<script type="text/javascript" src="<?= base_url() ?>js/qunit-helper.js"></script>
<link type='text/css' rel='stylesheet' href='<?= base_url() ?>js/qunit.css' />
<script type="text/javascript">
QUNIT_TITLE = "<?= $title ?>";

 $(document).ready(function(){

test("a basic test example", function() {
  ok( true, "this test is fine" );
  var value = "hello";
  equals( "hello", value, "We expect value to be hello" );
});

module("Module A");

test("first test within module", function() {
  ok( true, "all pass" );
});

test("second test within module", function() {
  ok( true, "all pass" );
});

module("Module B");

test("some other test", function() {
  expect(2);
  equals( true, false, "failing test" );
  equals( true, true, "passing test" );
});

  });
</script>
</head>

<body>
</body>
</html><?php
/* End of file unit_test.php */
/* Location: ./system/application/views/misc/unit_test.php */