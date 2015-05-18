<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>KALS!標註工具說明</title>
<style type="text/css">
a img {
	border-width: 0;
}

.label	{
	text-align:center;
	font-size: small;
}
.figure-table {
	text-align:center;
	color: gray;
}

.selection.my_annotation {
	border-bottom:2px solid #CCCC00;
}
.selection.nav_great {
	color: #F00;
}
.selection.view {
	color: blue;
}
.selection.select {
	border: 3px solid blue;
    position:relative;
    z-index:1;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
}
.selection.recommended {
		border: 3px solid green;
    position:relative;
    z-index:1;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
}
.selection.recommend-by {
	color: green;
}



.type-option {
    /*padding: 5px 10px;*/
    padding: 1px 5px;
	margin: 0 5px;
    color: white;
    background-color: gray;
    font-size: small;
    
    border-bottom: 1px solid #555;
    border-left: 1px solid #AAA;
    border-right: 1px solid #555;
    border-top: 1px solid #AAA;
    cursor: pointer;
    
    font-weight: bold;
}


.type-option.importance {
    background-color: yellow;
    color: black;
}

.type-option.concept {
    background-color: blue;
}

.type-option.confusion {
    background-color: #800080;
}

.type-option.question {
    background-color: red;
}

.type-option.example {
    background-color: green;
}

.type-option.summary {
    background-color: #670808;
}

.type-option.custom {
    background-color: white;
    color: black;
}
.annotation-id {
	color: gray;
}


.submit-option {
	padding: 3px;
    margin: 0;
    
    background: -moz-linear-gradient(#FDDC6C 0%, #FEDC69 50%
        , #FDD654 51%, #FED448 100%);
    background-image: -webkit-gradient(linear, 0% 0, 0% 100%, from(#FDDC6C)
        , color-stop(0.00, #FDDC6C), color-stop(0.5, #FEDC69)
        , color-stop(0.51, #FDD654), to(#FED448));    
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FDDC6C'
        , endColorstr='#FED448');
    background-color: #FED448;
        
    border: 1px solid #D19405;
    color: #4C3000;
    font-weight: bold;
    outline: medium none;
    font-size: 0.8em;
    font-family: Segoe UI,Arial,sans-serif;
    
    display: inline-block;
    margin-right: 0.1em;
    overflow: visible;
    padding:0.2em;
    position:relative;
    text-align:center;
    text-decoration: none !important;
    
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
}
.submit-option1 {	padding: 3px;
    margin: 0;
    
    background: -moz-linear-gradient(#FDDC6C 0%, #FEDC69 50%
        , #FDD654 51%, #FED448 100%);
    background-image: -webkit-gradient(linear, 0% 0, 0% 100%, from(#FDDC6C)
        , color-stop(0.00, #FDDC6C), color-stop(0.5, #FEDC69)
        , color-stop(0.51, #FDD654), to(#FED448));    
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FDDC6C'
        , endColorstr='#FED448');
    background-color: #FED448;
        
    border: 1px solid #D19405;
    color: #4C3000;
    font-weight: bold;
    outline: medium none;
    font-size: 0.8em;
    font-family: Segoe UI,Arial,sans-serif;
    
    display: inline-block;
    margin-right: 0.1em;
    overflow: visible;
    padding:0.2em;
    position:relative;
    text-align:center;
    text-decoration: none !important;
    
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
}

.go-to-top {
	font-size:small;
	float:right;
}
</style>
</head>

<body>
    <h1><a name="top" id="top"></a>歡迎使用KALS!標註工具</h1>
    <h2>目錄</h2>
    <ul>
      <li><a href="#what_is_kals">什麼是KALS!標註工具？</a></li>
      <li><a href="#support">操作上遇到問題要聯絡誰？</a> </li>
      <li>操作介面介紹
        <ul>
          <li><a href="#kals_interface">KALS!操作介面</a></li>
          <li><a href="#kals_toolbar">工具列</a></li>
          <li><a href="#filter">標註顯示</a></li>
          <li><a href="#annotation_tool">標註工具</a></li>
          <li><a href="#annotation_editor">標註編輯器</a></li>
          <li><a href="#annotation_list">標註列表</a></li>
          <li><a href="#annotation_view">標註討論視窗</a></li>
          <li><a href="#recommend_tooltip">建議工具</a></li>
        </ul>
      </li>
      <li>操作步驟介紹
        <ul>
          <li>帳號操作
            <ul>
              <li><a href="#how_to_login">如何登入？</a></li>
              <li><a href="#how_to_logout">如何登出？</a></li>
              <li><a href="#how_to_change_name">如何修改名字？</a></li>
              <li><a href="#how_to_change_password">如何修改密碼？</a></li>
            </ul>
          </li>
          <li>標註操作
            <ul>
              <li><a href="#how_to_select">如何選取標註範圍？</a></li>
              <li><a href="#how_to_find_other_annotation">如何其他人的瀏覽標註？</a></li>
              <li><a href="#how_to_create_annotation">如何新增標註？</a></li>
              <li><a href="#how_to_edit_annotation">如何編輯您的標註？</a></li>
              <li><a href="#how_to_delete_annotation">如何刪除您的標註？</a></li>
              <li><a href="#how_to_respond_to_annotation">如何回應別人的標註？</a></li>
              <li><a href="#what_is_like">標註列表上的<img src="../../images/set-is-liked.png" />愛心圖示的用處是？</a></li>
              <li><a href="#what_is_recommend">標註列表上的<img src="../../images/has-recommend.gif" />對話與筆圖示的用處是？</a></li>
              <li><a href="#am_i_must_accept_recommend">一定要贊成建議與推薦嗎？</a></li>
              <li><a href="#recommend_is_incorrect">建議的內容與實際情況不符合，這樣正常嗎？例如我選擇名詞來標註，KALS!卻建議我標註名詞，發生這樣的矛盾情況。</a></li>
              <li><a href="#how_to_hide_annotation">如何關閉標註顯示？</a></li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <hr />
	<a class="go-to-top" href="#top">&lt;TOP&gt;</a>
    <h2><a name="what_is_kals" id="what_is_kals"></a>什麼是KALS!標註工具？</h2>
    <p>KALS!標註工具是一種附掛在HTML網頁上的標註工具。他可以剖析、調整HTML的內文，將原本靜態的網頁加上「標註」的功能。</p>
    <p>使用者可以透過KALS!標註工具為網頁上的文字<a href="#how_to_create_annotation">新增標註</a>並填寫補充的筆記，也可以<a href="#how_to_find_other_annotation">瀏覽其他人的標註</a>、<a href="#how_to_respond_to_annotation">針對其他人的標註進行討論</a>，或是<a href="#what_is_like">將其他人的標註加入「喜愛清單」</a>，給予他一個鼓勵。</p>
    <p>KALS!標註工具會在網頁上將重要性較高的範圍文字標示為<a href="#filter">「<span class="selection nav_great">紅色的文字</span>」</a>，並根據使用者的標註行為，適時地提供閱讀技巧的<a href="#recommend_tooltip">「建議」與「推薦標註」</a>，進而提昇使用者的閱讀能力。</p>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="support" id="support"></a>操作上遇到問題要聯絡誰？</h2>
    <p>在職專班的學生如果在操作上遇到了問題，請到<a href="http://elearn.nccu.edu.tw/" target="_blank">數位學習平台</a>的討論區中向作業助教反應您的問題。</p>
    <hr />
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="kals_interface" id="kals_interface"></a>KALS!操作介面</h2>
    <p class="figure-table"><a target="_blank" href="../../images/help/kals_interface.png"><img src="../../images/help/kals_interface_thumbnail.png" border="0" /></a></p>
    <p class="label">KALS!操作介面</p>
    <ol>
      <li><a href="#kals_toolbar">工具列</a>：畫面最上方會顯示工具列，您可以在工具列中進行「登入」、「註冊」、「登出」、設定「帳號資料」 與「標註顯示」，或是查閱「說明」。</li>
      <li><a href="#filter">標註顯示</a>：使用KALS!標註工具的網頁文字上會顯示標註的狀況。<span class="selection my_annotation">畫底線的文字</span>表示是現在登入帳號的標註，也就是您標註過的部分；<span style="color:red;">紅色的文字</span>是KALS!的指示，表示比較重要的部份。此外，在選取標註範圍、顯示標註範圍、顯示推薦標註飯範圍時，皆會有不同的字體顏色與框線。以下介紹到各工具時會一併說明。</li>
      <li><a href="#how_to_select">選取提示</a>：當您滑鼠移到網頁文字上時就會顯示選取提示，如果您要選取這個文字，請點選這個選取提示以確定。您也可以直接點選網頁文字來選取。</li>
      <li><a href="#annotation_tool">標註工具</a>：新增、管理、瀏覽標註的主要工具。選擇標註範圍之後就會顯示標註工具。</li>
      <li><a href="#recommend_tooltip">建議工具</a>：顯示建議、推薦標註的工具。在新增標註之後，或是瀏覽標註時點下建議圖示就會顯示。</li>
    </ol>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="kals_toolbar" id="kals_toolbar"></a>工具列</h2>
    <p class="figure-table"><a target="_blank" href="../../images/help/kals_toolbar_fig1.png"><img src="../../images/help/kals_toolbar_fig1_thumbnail.png" border="0" /></a></p>
    <p class="label">工具列介面：未登入的狀態	</p>
    <p>使用KALS!標註工具的網頁上方會固定顯示工具列。工具列在未登入之前的顯示狀態如上圖，左方是KALS!標題，右邊則是可以使用的功能，包括「登入」、「註冊」、「標註顯示」與「說明」。請以滑鼠點選各功能開啟。</p>
    <ul>
      <li><a href="#how_to_logout">登入</a>：以您註冊過的電子信箱地址與密碼來登入KALS!。登入之後才能進行新增標註及更多的動作。</li>
      <li>註冊：用電子信箱地址與密碼來建立一個新的帳號。</li>
      <li><a href="#how_to_hide_annotation">標註顯示</a>：設定網頁上顯示的標註，包括您的標註與推薦的標註。</li>
      <li>說明：開啟KALS!的說明視窗。</li>
    </ul>
    <p class="figure-table"><a target="_blank" href="../../images/help/kals_toolbar_fig2.png"><img src="../../images/help/kals_toolbar_fig2_thumbnail.png" border="0" /></a></p>
    <p class="label">工具列介面：登入之後的狀態 </p>
    <p>當您<a href="#how_to_login">登入</a>或註冊之後，工具列會隨著您的帳號而改變。左方是KALS!標題，右邊則是會顯示您的「名字」，以及其他可以使用的功能，包括「帳號資料」、「登出」、「標註顯示」、「說明」。</p>
    <ul>
      <li><a href="#how_to_change_name">帳號資料</a>：設定此帳號的名字、性別及變更密碼。</li>
      <li><a href="#how_to_logout">登出</a>：將目前登入的帳號登出。</li>
    </ul>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="filter" id="filter"></a>標註顯示</h2>
    <p class="figure-table"><a target="_blank" href="../../images/help/filter_fig1.png"><img src="../../images/help/filter_fig1_thumbnail.png" border="0" /></a></p>
    <p class="label">網頁文字上的標註顯示</p>
    <p>KALS!會依照您的登入狀況而在網頁上呈現不同的標註顯示。各種標註顯示如下：</p>
    <ol>
      <li><span class="selection my_annotation">畫底線的文字</span>：表示自己的標註，不同顏色的底線表示不同的標註類型。當您在重複的位置標註，並使用不同的標註類型時，KALS!只會顯示您最新的標註。</li>
      <li><span class="selection nav_great">紅色的文字</span>：表示KALS!推薦的標註，可能是很重要的部分喔。</li>
      <li><span class="selection select">藍色框線的文字</span>：表示您<a href="#how_to_select">目前選取的範圍</a>。</li>
      <li><span class="selection view">藍色的文字</span>：表示您目前瀏覽的標註的範圍。詳細介紹請見<a href="#annotation_tool">標註工具</a>的說明。</li>
    </ol>
    <p class="figure-table"><a target="_blank" href="../../images/help/filter_fig2.png"><img src="../../images/help/filter_fig2_thumbnail.png" border="0" /></a></p>
    <p class="label">建議工具的標註顯示</p>
    <p>在使用建議工具時，則會顯示需要建議的標註與推薦標註的範圍。</p>
    <ol>
      <li><span class="selection recommended">綠色框線的文字</span>：表示您<a href="#recommend_tooltip">需要建議的標註的範圍</a>。</li>
      <li><span class="selection recommend-by">綠色的文字</span>：表示<a href="#recommend_tooltip">推薦給您的標註的範圍</a>。</li>
    </ol>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="annotation_tool" id="annotation_tool"></a>標註工具</h2>
    <p class="figure-table"><a target="_blank" href="../../images/help/annotation_tool.png"><img src="../../images/help/annotation_tool_thumbnail.png" border="0" /></a></p>
    <p class="label">標註工具介面</p>
    <p>當您在網頁上選取要標註或瀏覽的範圍之後，標註工具便會自動顯示在您選取範圍的附近。</p>
    <p>標註工具的功能包括：</p>
    <ol>
      <li>標註工具標頭：標頭有「移動」跟「關閉」功能。您可以在「移動」上拖曳標註工具，或是點選「關閉」以關閉標註工具。</li>
      <li><a href="#annotation_editor">標註編輯器</a>：您可以在此新增、編輯標註。詳細介紹請見標註編輯器的說明。</li>
      <li>編輯器顯示切換開關</li>
      <li><a href="#annotation_list">標註列表</a>：列出您標註範圍重疊的所有標註，以您的標註、您喜愛清單的標註以及其他標註的順序條列。詳細介紹請見標註列表的說明。</li>
    </ol>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="annotation_editor" id="annotation_editor"></a>標註編輯器</h2>
    <p class="figure-table"><a target="_blank" href="../../images/help/annotation_editor_fig1.png"><img src="../../images/help/annotation_editor_fig1_thumbnail.png" border="0" /></a></p>
    <p class="label">標註編輯器介面</p>
    <p>您能透過標註編輯器新增、編輯標註。標註編輯器的功能包括：</p>
    <ol>
      <li>顯示作者的名字，也就是您的名字。</li>
      <li><span class="type-option importance">標註類型</span>選擇。</li>
      <li>編輯筆記。</li>
      <li>遞交標註的「<span class="submit-option">新增</span>」。如果是編輯標註中，則可以「<span class="submit-option">更新</span>」完成編輯，或是「<span class="submit-option">取消</span>」編輯。</li>
    </ol>
    <p class="figure-table"><a target="_blank" href="../../images/help/annotation_editor_fig2.png"><img src="../../images/help/annotation_editor_fig2_thumbnail.png" border="0" /></a></p>
    <p class="label">標註編輯器的標註類型選單</p>
    <p>點下標註類型(預設是顯示「重要」)，右邊就會帶出標註類型選單。每個標註類型都表示不同的標註策略，目前有五種標註類型：</p>
    <ul>
      <li><span class="type-option importance">重要</span>：標示文章中重要的段落。要熟知這篇文章，就必須要熟讀的部份。</li>
      <li><span class="type-option confusion">困惑</span>：標示您對文章內文產生困惑的地方。</li>
      <li><span class="type-option question">質疑</span>：標示您質疑文章內文是否正確的地方。</li>
      <li><span class="type-option example">舉例</span>：記錄或補充與文章內容的相關資料、舉例。</li>
      <li><span class="type-option summary">摘要</span>：用自己的話來歸納文章的摘要內容，像是註明原因、影響、特色等等。</li>
    </ul>
    <p class="figure-table"><a target="_blank" href="../../images/help/annotation_editor_fig3.png"><img src="../../images/help/annotation_editor_fig3_thumbnail.png" border="0" /></a></p>
    <p class="label">標註編輯器的筆記編輯器</p>
    <p>您可以利用筆記編輯器補充標註的內容。筆記編輯器具備所見即得的功能，您可以為您的筆記添加格式，像是字體粗細、大小、顏色。</p>
    <p class="figure-table"><a target="_blank" href="../../images/help/annotation_editor_fig4.png"><img src="../../images/help/annotation_editor_fig4_thumbnail.png" border="0" /></a></p>
    <p class="label">全螢幕的筆記編輯器</p>
    <p>點選筆記編輯器左上角的「<img src="../../images/help/annotation_editor_maximum.png" />最大化」按鈕，就可以放大筆記編輯器的編輯空間。除此之外，筆記編輯器也會顯示完整的工具列。放大的筆記編輯器中還可以插入表格、圖片、甚至是<a href="http://www.youtube.com/" target="_blank">YouTube</a>的影片。</p>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="annotation_list" id="annotation_list"></a>標註列表</h2>
    <p class="figure-table"><a target="_blank" href="../../images/help/annotation_list_fig1.png"><img src="../../images/help/annotation_list_fig1_thumbnail.png" border="0" /></a></p>
    <p class="label">標註工具中的標註列表與標註選單</p>
    <p>標註列表是條列您選擇範圍之下重疊的所有標註。條列的規則為：</p>
    <ol>
      <li>您的標註：依照更新日期由新到舊排序。</li>
      <li>您喜愛清單的標註。</li>
      <li>其他標註：依照重要性由高到低排序。</li>
    </ol>
    <p class="figure-table"><a target="_blank" href="../../images/help/annotation_list_fig2.png"><img src="../../images/help/annotation_list_fig2_thumbnail.png" border="0" /></a></p>
    <p class="label">標註列表介面</p>
    <p>標註列表的介面中包含以下功能：</p>
    <ol>
      <li><a href="#filter"><span class="view">標註顯示藍色的文字</span></a>：將滑鼠移至標註列表的標註中的時候，網頁文字上會以「<span class="view">藍色的文字</span>」來標示。</li>
      <li>作者的名字。如果作者是您現在登入的帳號，那麼<span style="text-decoration:underline;">名字會加上底線</span>。</li>
      <li><span class="type-option importance">標註類型</span></li>
      <li><a href="#what_is_like"><img src="../../images/set-is-liked.png" />加入/<img src="../../images/set-is-not-liked.png" />移出喜愛清單</a>：您只能對不是您的標註進行加入/移出喜愛清單的動作。當您將該標註加入喜愛清單之後，這個功能就會變成移出喜愛清單。</li>
      <li>喜愛人數：當有人將此標註加入喜愛清單之後，此處會顯示已經加入喜愛清單的人數。</li>
      <li><a href="#what_is_recommend"><img src="../../images/has-recommend.gif" />觀看建議提示</a>：如果標註上有顯示建議提示的圖示，表示有建議要給這篇標註。請點選此圖示來開啟建議工具，觀看建議的內容吧。</li>
      <li><span class="annotation-id">#標註編號</span>：引言討論的時候可以參考用。</li>
      <li>筆記：該篇標註的筆記。</li>
      <li><a href="#annotation_view">討論列表</a>：每個標註底下會列出頭五篇回應他的討論，您可以看到其他人對於這篇的回應。討論列表會縮排，用來跟非討論列表的標註作為區隔。</li>
      <li>標註選單：可以進行標註列的管理。</li>
    </ol>
    <p class="figure-table"><a target="_blank" href="../../images/help/annotation_list_fig3_1.png"><img src="../../images/help/annotation_list_fig3_1_thumbnail.png" border="0" /></a></p>
    <p class="label">標註選單介面之您自己的標註</p>
    <p class="figure-table"><a target="_blank" href="../../images/help/annotation_list_fig3_2.png"><img src="../../images/help/annotation_list_fig3_2_thumbnail.png" border="0" /></a></p>
    <p class="label">標註選單介面之別人的標註</p>
    <p>當滑鼠移至標註列表的標註上時，標註旁邊會顯示標註選單。標註選單會依照標註的狀況而有不同的功能，包括：</p>
    <ol>
      <li>顯示此標註更新到距離現在的時間。</li>
      <li>如果是您的標註，則可以進行「<a href="#how_to_edit_annotation">編輯</a>」、「<a href="#how_to_delete_annotation">刪除</a>」的動作。</li>
      <li>如果是別人的標註，則可以進行「<a href="#how_to_respond_to_annotation">回應</a>」的動作。</li>
      <li>用「<a href="#annotation_view">瀏覽討論</a>」來開啟該標註的標註討論視窗。</li>
    </ol>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="annotation_view" id="annotation_view"></a>標註討論視窗</h2>
    <p class="figure-table"><a target="_blank" href="../../images/help/annotation_view.png"><img src="../../images/help/annotation_view_thumbnail.png" border="0" /></a></p>
    <p class="label">標註討論視窗介面</p>
    <p>當您在標註列標中要「<a href="#how_to_respond_to_annotation">回應</a>」某個標註、或是點選「瀏覽討論」時，就會開啟標註討論視窗。標註討論視窗的功能包含：</p>
    <ol>
      <li>錨點文字預覽：顯示該標註範圍的網頁文字，以<span class="selection view select">藍色框線與藍色文字</span>標示的位置就是這個標註所指定的範圍。</li>
      <li><a href="#annotation_list">標註列表</a>：以一個主題標註及其討論標註為主的標註列表，功能與標註工具中的標註列表相同。</li>
      <li>編輯器顯示切換開關</li>
      <li><a href="#annotation_editor">標註編輯器</a>：與標註工具中的標註編輯器相同。當您指定要回應哪篇標註時，編輯器會註明該篇標註的名字與標註編號。</li>
    </ol>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="recommend_tooltip" id="recommend_tooltip"></a>建議工具</h2>
    <p class="figure-table"><a target="_blank" href="../../images/help/recommend_tooltip.png"><img src="../../images/help/recommend_tooltip_thumbnail.png" border="0" /></a></p>
    <p class="label">建議工具介面</p>
    <p>當您<a href="#how_to_create_annotation">新增標註</a>之後，KALS!會在適當的時機提供您標註的建議。您也可以在標註工具的標註列表中點選<a href="#what_is_recommend"><img src="../../images/has-recommend.gif" />觀看建議提示</a>，以顯示該標註的建議。建議工具的功能包括：</p>
    <ol>
      <li>需要建議的位置：網頁上以<span class="selection recommended">綠框標示的範圍</span>是KALS!給您需要建議的標註的位置。</li>
      <li>推薦標註的位置：網頁上以<span class="selection recommend-by">綠色文字標示的範圍</span>是KALS!給您的推薦標註的位置。當標註工具沒有推薦標註時，則不會顯示推薦標註的位置。</li>
      <li>建議工具標頭：標頭有「移動」跟「關閉」功能。您可以在「移動」上拖曳標註工具，或是點選「關閉」以關閉建議工具。</li>
      <li>需要建議的標註：這是KALS!認為您需要建議的標註。</li>
      <li>建議：KALS!會依據您的標註資料提供建議。</li>
      <li>推薦標註：KALS!會找尋合適的標註並推薦給您。如果您覺得不錯的話，別忘記將他加入喜愛清單喔！如果KALS!找不到合適的標註，則不會顯示推薦標註。</li>
      <li>建議回饋：請您參考以上的建議與推薦並選擇回饋的動作，送出回饋之後，此建議就會隱藏起來。回饋分成「<span class="submit-option">贊成</span>」與「<span class="submit-option">不贊成</span>」，不贊成的情況下會保留您的標註，贊成的情況下，如果有推薦標註，則會把您的標註移動到推薦標註的位置，如果沒有建議標註，則會刪除您的標註，請您重新撰寫標註。</li>
    </ol>
    <hr />
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="how_to_login" id="how_to_login"></a>如何登入？</h2>
    <p>要使用KALS!撰寫標註的話，一定要先登入才行喔！</p>
    <p class="figure-table"><a target="_blank" href="../../images/help/how_to_login.png"><img src="../../images/help/how_to_login_thumbnail.png" border="0" /></a></p>
    <p class="label">登入視窗介面</p>
    <ol>
      <li>      在<a href="#kals_toolbar">工具列</a>上找到「登入」選項，點選開啟登入視窗。</li>
      <li> 輸入電子信箱地址(或是您的帳號)與密碼，再點選「登入」，就完成登入動作。</li>
    </ol>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="how_to_logout" id="how_to_logout"></a>如何登出？</h2>
    <p>如果您要切換帳號的話，請使用登出功能。</p>
    <p class="figure-table"><a target="_blank" href="../../images/help/how_to_logout.png"><img src="../../images/help/how_to_logout_thumbnail.png" border="0" /></a></p>
    <p class="label">登出視窗介面</p>
    <ol>
      <li>      在<a href="#kals_toolbar">工具列</a>上找到「登出」選項，點選開啟登出視窗。</li>
      <li>點選「登出」，就完成登出動作。</li>
    </ol>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="how_to_change_name" id="how_to_change_name"></a>如何修改名字？</h2>
    <p>您帳號的名字會顯示在標註上，預設是使用電子信箱地址中帳號的名字，您也可以自訂您的名字。</p>
    <p class="figure-table"><a target="_blank" href="../../images/help/how_to_change_name.png"><img src="../../images/help/how_to_change_name_thumbnail.png" border="0" /></a></p>
    <p class="label">帳號資料視窗介面</p>
    <ol>
      
      <li>如果您沒有登入的話，請先進行<a href="#how_to_login">登入動作</a>。</li>
      <li>在<a href="#kals_toolbar">工具列</a>上找到「帳號資料」選項，點選開啟帳號資料視窗。</li>
      <li>      請在「名字」欄位填寫您想要設定的名字，然後按下「儲存」按鈕就完成修改名字的動作。</li>
</ol>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="how_to_change_password" id="how_to_change_password"></a>如何修改密碼？</h2>
    <p class="figure-table"><a target="_blank" href="../../images/help/how_to_change_password_fig1.png"><img src="../../images/help/how_to_change_password_fig1_thumbnail.png" border="0" /></a></p>
    <p class="label">帳號資料視窗中的開啟密碼變更視窗連結</p>
    <p class="figure-table"><a target="_blank" href="../../images/help/how_to_change_password_fig2.png"><img src="../../images/help/how_to_change_password_fig2_thumbnail.png" border="0" /></a></p>
    <p class="label">密碼變更視窗介面</p>
    <ol>
      <li>如果您沒有登入的話，請先進行<a href="#how_to_login">登入動作</a>。</li>
      <li>在<a href="#kals_toolbar">工具列</a>上找到「帳號資料」選項，點選開啟帳號資料視窗。</li>
      <li>      請點選「開啟密碼變更視窗」。</li>
      <li>      請輸入您新的密碼，並再輸入第二次密碼，確認無誤之後按下「儲存」按鈕，就完成密碼變更的動作。</li>
    </ol>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="how_to_select" id="how_to_select"></a>如何選取標註範圍？</h2>
    <p>KALS!標註操作相關的所有動作，都是從選取標註範圍開始。</p>
    <p class="figure-table"><a target="_blank" href="../../images/help/how_to_select.png"><img src="../../images/help/how_to_select.png" border="0" /></a></p>
    <p class="label">選取提示介面</p>
    <ol>
      <li>選取範圍開頭：
      請將滑鼠移至您要選取範圍的網頁文字上，KALS!會在該文字旁顯示「選取提示」。如果您確定要選擇此文字為範圍開頭，請點選「選取提示」。</li>
      <li>選取範圍結尾：跟選取範圍開頭一樣的動作。您也可以點選跟開頭一樣的文字，表示您選取的只有一個字。</li>
      <li>顯示<a href="#annotation_tool">標註工具</a>，完成<a href="#filter">選取標註範圍</a>的動作。</li>
    </ol>
    <p>附帶一提，英文文字會依據空格斷開成為一個一個的字，標點符號也是可以選取的喔。</p>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="how_to_find_other_annotation" id="how_to_find_other_annotation"></a>如何其他人的瀏覽標註？</h2>
    <p><a href="#how_to_select">選取標註範圍</a>之後，便可以在<a href="#annotation_tool">標註工具</a>的<a href="#annotation_list">標註列表</a>中瀏覽跟此範圍重疊的標註，而標註列表下方則是會顯示其他人的標註。</p>
    <p>當您在撰寫標註時，別忘了看一下這段範圍有誰標註過。如果您覺得別人的標註寫得很不錯，您可以把他<a href="#what_is_like"><img src="../../images/set-is-liked.png" />加入「喜愛清單」</a>。下次顯示標註列表時，他的標註就會排在更上方。</p>
    <p>KALS!只會將<span class="selection nav_great"><a href="#filter">推薦的標註</a></span>顯示在網頁文字上，而不是顯示所有人的標註。因此一般來說是不容易知道別人的標註在哪邊。這是為了避免大量標註造成使用者的混亂而作的過濾。</p>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="how_to_create_annotation" id="how_to_create_annotation"></a>如何新增標註？</h2>
    <ol>
      <li><a href="#how_to_select">選取標註範圍</a>。由於新增標註之後就不能修改範圍，請務必慎選您的標註範圍。</li>
      <li>在<a href="#annotation_tool">標註工具</a>中的<a href="#annotation_editor">標註編輯器</a>撰寫您的標註內容，包括選擇標註類型、撰寫筆記，完成後按下「<span class="submit-option">新增</span>」按鈕遞交。</li>
      <li>完成標註。</li>
      <li>如果KALS!沒有建議，則標註編輯器會切換成編輯模式，您可以調整您新增的標註內容。</li>
      <li>如果KALS!有建議，則會顯示<a href="#recommend_tooltip">建議工具</a>。</li>
    </ol>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="how_to_edit_annotation" id="how_to_edit_annotation"></a>如何編輯您的標註？</h2>
    <ol>
      <li><a href="#how_to_select">選取您標註的範圍</a>。</li>
      <li>在<a href="#annotation_tool">標註工具</a>中的<a href="#annotation_list">標註列表</a>找到您的標註。</li>
      <li>請將滑鼠移到該標註上，標註旁邊會顯示標註選單，請點選「編輯」功能。</li>
      <li>標註工具的<a href="#annotation_editor">標註編輯器</a>會切換成編輯模式，請在此編輯您的標註。</li>
      <li>完成之後，請按下標註編輯器的「<span class="submit-option">更新</span>」按鈕，完成編輯動作。</li>
      <li>如果您想要取消編輯，則請按下「<span class="submit-option">取消</span>」按鈕即可。</li>
    </ol>
    <p>已經新增的標註範圍是無法編輯的，所以在新增標註的時候要慎選標註範圍，否則就只能刪除重寫囉。</p>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="how_to_delete_annotation" id="how_to_delete_annotation"></a>如何刪除您的標註？</h2>
    <ol>
      <li><a href="#how_to_select">選取您標註的範圍</a>。</li>
      <li>在<a href="#annotation_tool">標註工具</a>中的<a href="#annotation_list">標註列表</a>找到您的標註。</li>
      <li>請將滑鼠移到該標註上，標註旁邊會顯示標註選單，請點選「刪除」功能。</li>
      <li>看到您的標註消失，就完成了刪除動作。</li>
    </ol>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="how_to_respond_to_annotation" id="how_to_respond_to_annotation"></a>如何回應別人的標註？</h2>
    <ol>
      <li><a href="#how_to_select">選取標註範圍</a>。</li>
      <li>在<a href="#annotation_tool">標註工具</a>中的<a href="#annotation_list">標註列表</a>找到您想回應的標註。</li>
      <li>請將滑鼠移到該標註上，標註旁邊會顯示標註選單，請點選「回應」功能，接著會開啟「標註討論視窗」。</li>
      <li>請<a href="#annotation_view">標註討論視窗</a>的<a href="#annotation_editor">標註編輯器</a>裡撰寫您要回應的內容。</li>
      <li>完成之後，請按下標註編輯器的「<span class="submit-option1">新增</span>」按鈕，即可完成回應動作。</li>
    </ol>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="what_is_like" id="what_is_like"></a>標註列表上的<img src="../../images/set-is-liked.png" />愛心圖示的用處是？</h2>
    <p>愛心的意思是<img src="../../images/set-is-liked.png" />加入或<img src="../../images/set-is-not-liked.png" />移出喜愛清單。加入喜愛清單，表示您對他的標註的認同。</p>
    <p>您可以對別人的標註進行加入/移出喜愛清單的動作。當您將該標註加入喜愛清單之後，這個功能就會變成移出喜愛清單。</p>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="what_is_recommend" id="what_is_recommend"></a>標註列表上的<img src="../../images/has-recommend.gif" />對話與筆圖示的用處是？</h2>
    <p>對話與筆的意思是<img src="../../images/has-recommend.gif" />建議提示。如果標註上有顯示建議提示的圖示，表示有建議要給這篇標註。如果您要查看給您的標註的建議，請點選此圖示來開啟<a href="#recommend_tooltip">建議工具</a>並觀看建議的內容吧。</p>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="am_i_must_accept_recommend" id="am_i_must_accept_recommend"></a>一定要贊成建議與推薦嗎？</h2>
    <p><a href="#recommend_tooltip">建議與推薦</a>只是供您參考，並不是強制性的規則，您也可以選擇不贊成，並隱藏建議。</p>
    <p>不過，無論您是贊成或是不贊成，都請盡量選擇建議回饋的其中之一。您的建議回饋會改善KALS!的建議與推薦的方式，讓之後的建議與推薦更為準確。</p>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="recommend_is_incorrect" id="recommend_is_incorrect"></a>建議的內容與實際情況不符合，這樣正常嗎？例如我選擇名詞來標註，KALS!卻建議我標註名詞，發生這樣的矛盾情況。</h2>
    <p>由於電腦技術無法完美地剖析中文語法，因此難以避免的是會發生誤判的情況。如果您遇到了類似的建議錯誤，請回報給系統管理者以求得改善。</p>
    <a class="go-to-top" href="#top">&lt;TOP&gt;</a><h2><a name="how_to_hide_annotation" id="how_to_hide_annotation"></a>如何關閉標註顯示？</h2>
    <p>如果您覺得網頁文字上的標註顯示太過雜亂，您也可以關閉標註顯示。</p>
    <p class="figure-table"><a target="_blank" href="../../images/help/how_to_hide_annotation.png"><img src="../../images/help/how_to_hide_annotation_thumbnail.png" border="0" /></a></p>
    <p class="label">標註顯示視窗介面</p>
    <ol>
      <li>      在<a href="#kals_toolbar">工具列</a>上找到「標註選項」選項，點選開啟標註顯示視窗。</li>
      <li>標註顯示中可以設定顯示您<a href="#filter">自己的標註或是KALS的推薦標註</a>，請取消勾選您不想要顯示的標註顯示，再按下「確定」按鈕即可。</li>
</ol>
    <hr />
<p class="label"><a href="http://pulipuli.blogspot.com" target="_blank">布丁布丁吃布丁</a> - <a href="https://sites.google.com/site/puddingkals/" target="_blank">KALS!</a> &copy; 2010</p>
</body>
</html>
