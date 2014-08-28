<?php
/**
 * Javascript Unit Test Template
 *
 * Javascript單元測試的樣板
 *
 * @package		KALS
 * @category		Views
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 上午 12:17:29
 */

if (isset($function))
    $title = $function;
if (FALSE === isset($title))
    $title = 'Javascript 單元測試';
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
<!--meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" /-->
<!-- script type="text/javascript" src="<?= base_url() ?>js/jquery.tools.min.js"></script>

<link type='text/css' rel='stylesheet' href='<?= base_url() ?>web_apps/pack_css/general' /-->
<?php
/*
<script type="text/javascript" src="<?= base_url() ?>libraries/helpers/jquery.extends.js"></script>
<script type="text/javascript" src="<?= base_url() ?>libraries/helpers/kals_util.js"></script>
*/
?>
<script type="text/javascript">
QUNIT_TITLE = "<?= $title ?>";
</script>
</head>

<body>
<?= $script ?>
</body>
</html><?php
/* End of file utjs-template.php */
/* Location: ./system/application/views/misc/utjs-template.php */