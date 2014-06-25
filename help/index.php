<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>KALS!標註工具 設定說明 </title>
</head>

<body>
    
<h1>KALS!標註工具</h1>
<hr />
<h2>展示頁面</h2>    
<ul>
    <li><a href="demo/index.html">範例pdf2htmlEX網頁</a></li>
  <li>Chen, C.-M., Chen, Y.-T., Hong, C.-M., Liao, C.-W., &amp; Huang, C.-M. (2012). 
      <a href="demo/Developing_a_Taiwan_library_history_digital_library_with_reader_knowledge_archiving_and_sharing_mechanisms_based_on_the_DSpace_platform.html"
         target="_blank">
          Developing a Taiwan library history digital library with reader knowledge archiving and sharing mechanisms based on the DSpace platform.</a> 
      <i>Electronic Library, The</i>, <i>30</i>(3), 426–442. doi:10.1108/02640471211241681</li>
    <li><a href="debug/20140625-pdf-public-library/index.html">公共圖書館數位閱讀新體驗－以國立公共資訊圖書館為例</a></li>
</ul>
<hr />
<h2>設定說明 (兼簡單的展示頁面)</h2>

<ul>
  <li><a href="config_annotation_scope.html">設定標註範圍</a></li>
  <li><a href="config_annotation_type_basic.html">設定基本標註類型</a></li>
  <li><a href="predefined_annotation_type.html">新增預先定義標註類型</a></li>
  <li><a href="enable_custom_annotation_type.html">設定「自訂」標註類型</a></li>
  <li><a href="config_toolbar.html">設定工具列</a></li>
  <li><a href="embed_email.html">指定預設登入帳號</a></li>
  <li><a href="embed_email_url.html">指定預設登入帳號的網址</a></li>
  <li><a href="config_policy.html">設定標註閱讀權限</a></li>
  <li><a href="config_login.html">設定註冊與登入訊息</a></li>
  <li><a href="config_navigation.html">設定標註指引</a></li>
  <li><a href="config_recommend.html">設定標註建議</a></li>
  <li><a href="config_web_search.html">設定網頁搜尋</a></li> 
</ul>

<hr />
<h2>KALS網路資源</h2>
<ul>
	<li><a href="https://github.com/pulipulichen/kals">GitHub</a> 主要程式碼典藏庫</li>
	<li><a href="https://sites.google.com/site/puddingkals/">Google Stie</a> 舊的程式碼典藏庫</li>
</ul>

<hr />
<h2>KALS使用的框架：CodeIgnitor 1.7.2 使用說明</h2>
<ul>
	<li><a href="../user_guide_zh/">中文</a></li>
	<li><a href="../user_guide/">English</a></li>
</ul>
<hr />

<h2>KALS系統管理</h2>
<ul>
        <li><a href="../web_apps/qunit/" target="_blank">KALS view web_apps的單元測試</a></li>
        <li><a href="../unit_test" target="_blank">KALS controller的單元測試</a></li>
        <li><a href="../phppgadmin" target="_blank">PostgreSQL資料庫 phpPgAdmin</a></li>
</ul>
<hr />

<h2>KALS其他資源</h2>
<ul>
        <li><a href="../web_apps/help/" target="_blank">KALS操作說明</a></li>
	<li><a href="../document/KALS UML.uml" target="_blank">UML規劃圖</a> (以<a href="http://sourceforge.net/projects/whitestaruml/" target="_blank">WhiteStarUML</a>開啟)</li>
	<li><a href="../document/Webpage Application.ep" target="_blank">網頁應用端草圖構想</a> (以<a href="http://pencil.evolus.vn/" target="_blank">Pencil</a>開啟)</li>
</ul>
<hr />
<!-- <p class="text-align:center;">KALS! - <a href="mailto:pulipuli.chen@gmail.com">Pudding Chen</a> </p> -->
<?php 
include_once '../libraries/php-markdown-lib/markdown.php';

$readme = file_get_contents("../README.md");
$readme = Markdown($readme);
echo $readme;
?>
</body>
</html>
