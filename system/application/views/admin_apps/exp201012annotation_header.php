<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?= $title ?> - 標註筆記</title>
<script type="text/javascript" src="<?= base_url() ?>js/jquery.js"></script>
<link rel="stylesheet" type="text/css" href="<?= base_url() ?>libraries/exp201012.css" />
</head>

<body>
    <div class="header">
        <h2>標註筆記 (<a href="<?= site_url('/admin_apps/exp201012/') ?>">標註資料分析</a>)</h2>
        <h1><?= $title ?></h1>
        <?php
            foreach ($title_list AS $link => $t)
            {
                if ($t != $title)
                {
                    ?>
                    [<a href="<?= site_url('/admin_apps/exp201012annotation/'.$link) ?>"><?= $t ?></a>]
                    <?php
                }
                else
                {
                    ?>
                    [<strong><?= $t ?></strong>]
                    <?php
                }
            }
        ?>
        <hr />
    </div>
