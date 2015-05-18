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
<meta content="width=device-width, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes" id="kals_viewport_lock" name="viewport">
<title><?= $title ?></title>
<script type="text/javascript" src="<?= base_url() ?>js/jquery.js"></script>
<script type="text/javascript" src="<?= base_url() ?>js/qunit.js"></script>
<script type="text/javascript" src="<?= base_url() ?>js/qunit-helper.js"></script>
<script type="text/javascript" src="<?= base_url() ?>js/unit.js"></script>
<link type='text/css' rel='stylesheet' href='<?= base_url() ?>js/qunit.css' />
<link type='text/css' rel='stylesheet' href='<?= base_url() ?>web_apps/generic/style' />
<!--meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" /-->
<!-- script type="text/javascript" src="<?= base_url() ?>js/jquery.tools.min.js"></script>
<link type='text/css' rel='stylesheet' href='<?= base_url() ?>web_apps/pack_css/general' /-->
<?php
/*
<script type="text/javascript" src="<?= base_url() ?>libraries/helpers/jquery.extends.js"></script>
<script type="text/javascript" src="<?= base_url() ?>libraries/helpers/kals_util.js"></script>
*/
?>
<script type="text/javascript" src="<?= base_url() ?>libraries/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="<?= base_url() ?>libraries/ckeditor/adapters/jquery.js"></script>
<script type="text/javascript" src="<?= base_url() ?>libraries/jquery-ui/js/jquery-ui-1.8.5.custom.min.js"></script>
<script type="text/javascript">
QUNIT_TITLE = "<?= $title ?>";
</script>
</head>

<body>
<?= $script ?>

    <div id="selectable">

        <p><a href="http://cssdoc.net/" target="_blank">CSSDOC</a>是<a href="http://zh.wikipedia.org/zh-tw/CSS" target="_blank">階層樣式表(Cascading Style Sheets&#65292;簡稱CSS)</a>的一種寫作風格&#65292;可以幫助個人開發者與開發團隊改善CSS檔案的寫作/整理/管理等各方面的問題&#12290;CSSDOC使用知名的<a href="http://www.oracle.com/technetwork/java/javase/documentation/index-jsp-135444.html" target="_blank">JavaDoc</a>作法&#65292;以<a href="http://cssdoc.net/wiki/DocBlock" target="_blank">註解區塊(DocBlock</a>)形式為原始碼寫作註解&#12290;它將CSS的格式&#12289;DocBlock註解以及註解使用的標籤(tag)整合在一起&#65292;為CSS檔案規範統一的寫作風格&#12290;</p>
        <?php //<ul> <li><a href="http://cssdoc.net/" target="_blank">CSSDOC計畫網站</a>  <li><a href="http://cssdoc.net/attachment/wiki/CssdocDraft/cssdoc%20-%200.2.22.pdf">CSSDOC Second Public Draft PDF-File</a> (2008-11-16) (<a href="http://cid-7113c88187767b01.office.live.com/self.aspx/public/2010/10/cssdoc%20-%200.2.22.pdf" target="_blank">SkyDrive備份</a>)</li></ul> <p>目前CSSDOC發展到2008年11月的<a href="http://cssdoc.net/wiki/CssdocDraft" target="_blank">第二次公開草案</a>&#12290;CSSDOC的知名度不高&#65292;實際上這份草案也有很多未完成的部份&#12290;儘管如此&#65292;CSSDOC對於統一CSS的文件註解格式來說&#65292;已經是個可以參考的寫作指南&#12290;</p> <p>就如CSSDOC所說&#65292;通常設計師撰寫CSS的風格並沒有統一&#65292;因此在交流CSS時會造成許多不方便&#12290;所以我想簡單地介紹一下CSSDOC的特色與用法&#65292;藉此也好好學習良好的CSS寫作風格&#12290;</p> <p>&nbsp;</p> <h4>使用CSSDOC的好處</h4> <p>儘管CSS寫作跟一般的物件導向式的程式語言不同&#65292;使用CSSDOC仍可以為程式設計師帶來幾個點好處&#65306;</p> <h5>統一寫作風格&#65292;促進程式交流</h5> <p>CSS設計師可以用CSSDOC來美化CSS檔案的版面&#65292;依此作為寫作風格的參考&#65292;以方便跟其他作者&#12289;作家&#12289;設計師&#12289;網頁開發者&#12289;創意指導等相關人員分享程式&#12290; </p> ?>

    </div>

</body>
</html><?php
/* End of file utjs-template.php */
/* Location: ./system/application/views/misc/utjs-template.php */