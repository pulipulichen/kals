<?php
/**
 * jQuery Unit Test Header
 *
 * @package     KALS
 * @category    QUnit
 * @author      Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) 2014, Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2014/5/2 上午 12:17:29
 */

if (isset($title) === FALSE) {
    $title = "KALS! QUnit Test";
}
else {
    $title = $title . " - " . "KALS! QUnit Test";
}

$loader_uri = base_url() . "web_apps/generic/loader/";

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $title ?></title>
</head>

<body>
    <script type="text/javascript" src="<?= base_url() ?>/libraries/qunit/jquery.js"></script>
    <script type="text/javascript" src="<?= base_url() ?>/libraries/qunit/qunit.js"></script>
    <script type="text/javascript" src="<?= base_url() ?>/libraries/qunit/qunit-helper.js"></script>
    <script type="text/javascript" src="<?= base_url() ?>/libraries/qunit/unit.js"></script>
    <link type='text/css' rel='stylesheet' href='<?= base_url() ?>/libraries/qunit/qunit.css' />
    <script type="text/javascript" src="<?php echo $loader_uri ?>"></script>
    <script type="text/javascript">
        //基本設定
        KALS_CONFIG = {
            debug: {
                kals_context_disable: true
                //kals_context_disable
            }
        };
    </script>
    <script type="text/javascript">
        QUNIT_TITLE = "<?= $title ?>";
        var _test_subject;
        
        // ----------------------------------------------------

        QUNIT = function () {
        test("<?= $title ?>", function() {
            $.test_msg("==============================");
        // ----------------------------------------------------

<?php
        // 以下開始是Qunit的正文