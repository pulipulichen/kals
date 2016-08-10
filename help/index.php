<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>KALS!標註工具 設定說明 </title>
</head>

<body>
 <h1>KALS!標註工具說明頁面</h1>

<hr />

<h2>展示頁面</h2>

<ul>
  <li><a href="demo/index.html">範例網頁</a>：由pdf2htmlEX製作的PDF網頁 </li>

  <li>Chen, C.-M., Chen, Y.-T., Hong, C.-M., Liao, C.-W., &amp; Huang, C.-M. (2012). <a href="demo/Developing_a_Taiwan_library_history_digital_library_with_reader_knowledge_archiving_and_sharing_mechanisms_based_on_the_DSpace_platform.html" target="_blank">Developing a Taiwan library history digital library with reader knowledge archiving and sharing mechanisms based on the DSpace platform.</a> <i>Electronic Library, The</i>, <i>30</i>(3), 426–442. doi:10.1108/02640471211241681 </li>
</ul>

<hr />

<h2>設定說明 (兼簡單的展示頁面)</h2>

<ul>
  <li><a href="config_annotation_scope.html">設定標註範圍</a> </li>

  <li><a href="config_annotation_type_basic.html">設定基本標註類型</a> </li>

  <li><a href="predefined_annotation_type.html">新增預先定義標註類型</a> </li>

  <li><a href="enable_custom_annotation_type.html">設定「自訂」標註類型</a> </li>

  <li><a href="config_toolbar.html">設定工具列</a> </li>

  <li><a href="embed_email.html">指定預設登入帳號</a> </li>

  <li><a href="embed_email_url.html">指定預設登入帳號的網址</a> </li>

  <li><a href="config_policy.html">設定標註閱讀權限</a> </li>

  <li><a href="config_login.html">設定註冊與登入訊息</a> </li>

  <li><a href="config_navigation.html">設定標註指引</a> </li>

  <li><a href="config_recommend.html">設定標註建議</a> </li>

  <li><a href="config_web_search.html">設定網頁搜尋</a> </li>

  <li><a href="config_annotation_navigation_map.html">設定標註地圖</a> </li>

  <li><a href="config_windows_map.html">設定章節地圖</a> </li>

  <li><a href="night.html">設定獎章機制</a> </li>

  <li><a href="embed_config_url.html">指定設定檔KALS_CONFIG的網址</a> </li>

  <li><a href="kals_annotation_spot.html">指定標註討論點</a> </li>

  <li><a href="annotate-image.html">標註在圖片上</a> </li>
</ul>

<hr />

<h2>KALS網路資源</h2>

<ul>
  <li><a href="https://github.com/pulipulichen/kals">GitHub</a>：主要程式碼典藏庫。如果要加入開發的行列，請先<a href="https://github.com/" target="_blank">建立GitHub帳號</a>並聯絡<a href="mailto:pulipuli.chen+github-kals@gmail.com" target="_blank">布丁</a>。 </li>

  <li><a href="https://github.com/pulipulichen/kals/issues">GitHub 問題發佈區</a>：必須先有GitHub帳號才能發問。<a href="https://github.com/" target="_blank">GitHub帳號申請</a>。 </li>

  <li><a href="https://sites.google.com/site/puddingkals/">Google <g id="49" class="gr_ gr_49 gr-alert gr_spell gr_run_anim ContextualSpelling ins-del multiReplace" data-gr-id="49">Stie</g></a>：舊的程式碼典藏庫，不再維護。 </li>
</ul>

<hr />

<h2>KALS使用的框架與函式庫說明</h2>

<ul>
  <li><a href="user_guide_zh/" target="_blank">CodeIgnitor 1.7.2 使用說明 中文</a> </li>

  <li><a href="user_guide/" target="_blank">CodeIgnitor 1.7.2 使用說明 English</a> </li>

  <li><a href="http://jquery.com/" target="_blank">jQuery 1.4.2</a> </li>

  <li><a href="http://jquerytools.github.io/download/" target="_blank">jQuery TOOLS</a> </li>

  <li><a href="http://jqueryui.com/" target="_blank">jQuery UI</a> </li>

  <li><a href="http://semantic-ui.com/">Semantic UI 樣式表</a> </li>
</ul>

<hr />

<h2>KALS系統管理</h2>

<ul>
  <li><a href="../web_apps/qunit/" target="_blank">KALS view web_apps的單元測試</a> </li>

  <li><a href="../unit_test" target="_blank">KALS controller的單元測試</a> </li>

  <li><a href="../phppgadmin/" target="_blank">PostgreSQL資料庫 phpPgAdmin</a> (<a href="../phppgadmin/redirect.php?server=localhost%3A5432%3Aallow&amp;subject=schema&amp;database=kals&amp;schema=public" target="_blank">KALS資料表</a>, <a href="../phppgadmin/display.php?server=localhost%3A5432%3Aallow&amp;database=kals&amp;schema=public&amp;table=log&amp;subject=table&amp;return=table&amp;sortkey=1&amp;sortdir=desc&amp;strings=collapsed&amp;page=1">行為記錄</a>) </li>
</ul>

<hr />

<h2>KALS專案資源</h2>

<ul>
  <li><a href="../web_apps/help/" target="_blank">KALS操作說明</a> </li>

  <li><a href="../document/KALS UML.uml" target="_blank">UML規劃圖</a> (以<a href="http://sourceforge.net/projects/whitestaruml/" target="_blank">WhiteStarUML</a>開啟) </li>

  <li><a href="../document/Webpage Application.ep" target="_blank">網頁應用端草圖構想</a> (以<a href="http://pencil.evolus.vn/" target="_blank">Pencil</a>開啟) </li>
</ul>

<hr />

<h2>偵錯使用資料</h2>

<ul>
  <li><a href="debug/20140625-pdf-public-library/index.html">公共圖書館數位閱讀新體驗－以國立公共資訊圖書館為例</a> </li>

  <li><a href="debug/20140627-moodle_ctes_03/index.html">數位時代公共圖書館虛擬參考服務之發展</a> </li>
</ul>

<hr />

<h2><!-- <p class="text-align:center;">KALS! - <a href="mailto:pulipuli.chen@gmail.com">Pudding Chen</a> </p> --><!--?php 
include_once '../libraries/php-markdown-lib/markdown.php';

$readme = file_get_contents("../README.md");
$readme = Markdown($readme);
echo $readme;
?-->KALS的相關搭配工具</h2>

<ul>
  <li><a href="https://github.com/coolwanglu/pdf2htmlEX" target="_blank">pdf2htmlE</a>X: 由於KALS只能在HTML的環境下運作，如果要在PDF上使用的話，必需要先將它轉換為HTML檔案。pdfhtmlEX是Linux指令工具，可以將PDF完美地轉換成HTML。唯轉換後的尺寸是固定的，就像網頁一樣，放大文字會造成版面跑掉。 </li>

  <li><a href="https://moodle.org/" target="_blank">Moodle</a>: 由於KALS只能用於單篇網頁上，並不具備任何內容管理平臺的工具。因此通常要搭配其他系統來保存要閱讀的網頁。本實驗室許多論文採用Moodle課程管理平臺來管理提供給學生閱讀的教材，並在這之中搭配KALS運作。 </li>
</ul>

<hr />

<h2>KALS的相關論文</h2>

<p><a href="https://drive.google.com/a/mail2.nccu.tw/folderview?id=0B5UXWzdIPpm0V1lLaWtIeU5LV0k&amp;usp=sharing" target="_blank">Google Drive 相關檔案下載</a>：這是非公開的空間，如需要下載請您跟布丁請求檔案存取權並說明您的身份與用途。</p>

<ul>
  <li><strong>系統開發的初始論文，使用模糊綜合決策來過濾優質標註</strong>： </li>

  <ul>
    <li>陳勇汀（2011年3月）。合作式閱讀標註之知識萃取機制研究（碩士論文）。國立政治大學圖書資訊與檔案學研究所，臺北市。檢自：<a href="http://pulipuli.blogspot.tw/2011/06/blog-post_24.html" target="_blank">http://pulipuli.blogspot.tw/2011/06/blog-post_24.html</a> </li>

    <li>陳勇汀（2009）。基於閱讀標註策略之知識萃取在支援數位學習上的應用研究。第一屆圖資系所論文聯合發表暨觀摩研討會。</li>

    <li>陳勇汀、陳志銘（2013）。合作式閱讀標註學習之標註特徵與閱讀理解能力研究。<em>第二屆數位合作學習與個人化學習研討會</em>。檢自：<a href="http://csclcspl2013.dlll.nccu.edu.tw/csclcspl/big5/" target="_blank">http://csclcspl2013.dlll.nccu.edu.tw/csclcspl/big5/</a></li>
  </ul>

  <li><strong>使用決策樹預測英文閱讀焦慮</strong>：</li>

  <ul>
    <li>吳志豪（2011）。基於數位閱讀標註行為探勘影響閱讀焦慮因素 提升閱讀成效（碩士論文）。國立政治大學，台北市。檢自：<a href="http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi?o=dnclcdr&amp;s=id=%22099NCCU5447015%22.&amp;searchmode=basic" target="_blank">http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi?o=dnclcdr&amp;s=id=%22099NCCU5447015%22.&amp;searchmode=basic</a></li>

    <li>Chen, C.-M., Wang, J.-Y., Chen, Y.-T., &amp; Wu, J.-H. (2013). Forecasting Reading Anxiety to Promote Reading Performance Based on Annotation Behavior. Interactive Learning Environments. doi:10.1109/COMPSACW.2013.132 </li>
  </ul>

  <li><strong>將點閱時間納入模糊綜合評判機制來過濾優質標註</strong>： </li>

  <ul>
    <li>黃柏翰（2012）。優質標註萃取機制提昇閱讀成效之研究：以合作式閱讀標註系統為例（碩士論文）。國立政治大學圖書資訊與檔案學研究所，國立政治大學。上網日期：2016年8月10日，檢自：<a href="http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=18&amp;h1=0" target="_blank">http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=18&amp;h1=0</a></li>

    <li>(還有一篇期刊論文)</li>
  </ul>
<!--EndFragment-->

  <li><strong>使用決策樹搭配社會網路分析預測閱讀學習成效</strong>： </li>

  <ul>
    <li>洪維均（2014）。閱讀理解成效形成性評量預測暨回饋機制之合作閱讀標註系統對於學習成效之影響研究（碩士論文）。國立政治大學圖書資訊與檔案學研究所，國立政治大學。上網日期：2016年8月10日，檢自：<a href="http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=3&amp;h1=0" target="_blank">http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=3&amp;h1=0</a> </li>

    <li>許筑婷、陳志銘、洪維均、顏琳、黃儀甄、劉鎮宇（2016年7月）。基於資料探勘技術發展輔助數位閱讀之閱讀理解成效評量預測暨回饋機制。第十三屆海峽兩岸圖書資訊學學術研討會，武漢 華中師範大學。 (<a href="http://www.gilis.nchu.edu.tw/index.php/2014-10-28-08-05-26/2014-10-30-05-53-10/594-20160712-20160714" target="_blank">錄取資訊</a>)</li>
  </ul>

  <li><strong>使用標註地圖與文章地圖來導覽文章</strong>： </li>

  <ul>
    <li>呂婷芸（2014）。具閱讀導覽地圖之合作式閱讀標註系統對於提升文章結構理解的影響研究（碩士論文）。國立臺灣師範大學應用電子科技學系，國立臺灣師範大學。上網日期：2015年12月16日，檢自：<a href="http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi" target="_blank">http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi /ccd=lT3QJ0/record?r1=1&amp;h1=1</a> </li>
  </ul>

  <li><strong>設計獎章機制的遊戲式閱讀</strong>： </li>

  <ul>
    <li>陳姿君（2014）。合作閱讀標註系統之遊戲化激勵機制對於提升同儕互動與閱讀理解成效的影響研究（碩士論文）。國立政治大學圖書資訊學數位碩士在職專班，國立政治大學。上網日期：2016年8月10日，檢自：<a href="http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=6&amp;h1=0" target="_blank">http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=6&amp;h1=0</a> </li>
  </ul>

  <li><strong>設計閱讀認知策略鷹架輔助學生閱讀英文</strong>： </li>

  <ul>
    <li>林美秀（2016）。閱讀認知策略鷹架對於國中生英語閱讀理解成效之影響研究（碩士論文）。國立政治大學圖書資訊學數位碩士在職專班，國立政治大學。上網日期：2016年8月10日。</li>
  </ul>

  <li><strong>搭配行動載具實作互動通知功能</strong>： </li>

  <ul>
    <li>周嘉瑩（2014）。具行動閱讀機制支援之合作閱讀標註系統對於閱讀歷程及成效的影響研究（碩士論文）。國立政治大學圖書資訊學數位碩士在職專班，國立政治大學。上網日期：2016年8月10日，檢自：<a href="http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=5&amp;h1=0" target="_blank">http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=5&amp;h1=0</a> <!--EndFragment--></li>
  </ul>

  <li><strong>搭配Kinnect實作體感操作閱讀界面</strong>： </li>

  <ul>
    <li>蔡懷恩（2013）。閱讀具標註數位文本之體感互動閱讀模式及其學習成效評估研究（碩士論文）。國立政治大學圖書資訊與檔案學研究所，國立政治大學。上網日期：2016年8月10日，檢自：<a href="http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=8&amp;h1=0" target="_blank">http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=8&amp;h1=0</a> </li>
  </ul>

  <li><strong>搭配眼動儀實作眼動互動閱讀界面</strong>： </li>

  <ul>
    <li>(林裕傑碩士論文，2016年，尚未出版) </li>
  </ul>

  <li><strong>以PRILS為閱讀文本，研究不同合作模式差異</strong>：</li>

  <ul>
    <li>陳芳雅（2012）。不同合作模式對國小學童閱讀學習影響之研究（碩士論文）。國立政治大學圖書資訊學數位碩士在職專班，國立政治大學。上網日期：2016年8月10日，檢自：<a href="http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=16&amp;h1=0" target="_blank">http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=16&amp;h1=0</a></li>

    <li>Chen, C.-M., Chen, Y.-T., &amp; Chen, F.-Y. (2014). A Collaborative Reading Annotation System with Reading Annotation and Interactive Discussion Scaffolding for Enhancing Digital Reading Performance. In <em>CSCL &amp; CSPL 2014</em>.</li>
  </ul>

  <li><strong>以中文文言文為閱讀文本</strong>： </li>

  <ul>
    <li>林雅婷（2011）。標註系統輔助提昇文言文閱讀學習成效之研究（碩士論文）。國立政治大學圖書資訊學數位碩士在職專班，國立政治大學。上網日期：2016年8月10日，檢自：<a href="http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=21&amp;h1=0" target="_blank">http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=21&amp;h1=0</a> </li>
  </ul>

  <li><strong>以英文為閱讀文本，用來改善英文閱讀模糊容忍程度</strong>： </li>

  <ul>
    <li>林秀芩（2011）。標註系統輔助不同模糊容忍度國小學童英語閱讀之研究（碩士論文）。國立政治大學圖書資訊學數位碩士在職專班，國立政治大學。上網日期：2016年8月10日，檢自：<a href="http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=21&amp;h1=0" target="_blank">http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=31&amp;h1=0</a> </li>
  </ul>

  <li><strong>以英文為閱讀文本，用於英文發音練習</strong>： </li>

  <ul>
    <li>李懿融（2014）。不同多媒體合作標註對於國小學童英語字彙學習成效的影響研究（碩士論文）。國立政治大學圖書資訊學數位碩士在職專班，國立政治大學。上網日期：2016年8月10日，檢自：<a href="http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=4&amp;h1=0">http://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=nqMbvC/record?r1=4&amp;h1=0</a> </li>
  </ul>

  <li><strong>應用於數位典藏系統</strong>： </li>

  <ul>
    <li>Chen, C.-M., Chen, Y.-T., Hong, C.-M., Liao, C.-W., &amp; Huang, C.-M. (2012). Developing a Taiwan library history digital library with reader knowledge archiving and sharing mechanisms based on the DSpace platform. <em>Electronic Library, The</em>, <em>30</em>(3), 426-442. doi:10.1108/02640471211241681</li>

    <li><a href="http://blog.pulipuli.info/2013/12/the-electronic-library-2013-highly.html?m=1" target="_blank">布丁布丁吃什麼：論文獲得了「The Electronic Library 2013 Highly Commended Paper Award」</a>&#160;</li>
  </ul>
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
