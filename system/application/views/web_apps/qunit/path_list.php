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
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Web Apps QUnit Path List</title>
</head>

<body>
    <h1>Web Apps QUnit Path List</h1>
    <ul>
        <?php
        foreach ($path_list AS $index => $path) {
            $uri = base_url() . "web_apps/qunit/load/" . $path;
            ?>
        <li>
            <a href="<?= $uri ?>" target="_blank">
                <?= $path ?>
            </a>
        </li>
            <?php
        }
        ?>
    </ul>
    <hr />
    <h1>QUnit教學資源</h1>
    <ul>
        <li><a href="http://qunitjs.com/" target="_blank">QUnit: jQuery Unit Test 單元測試框架</a></li>
    </ul>
</body>
</html>