KALS!
======================

閱讀知識合作標註學習系統
Reading Knowledge Collaborative Annotation Learning System

- 專案網站：[https://github.com/pulipulichen/kals](https://github.com/pulipulichen/kals)
- 專案展示網站：[http://demo-kals.dlll.nccu.edu.tw](http://demo-kals.dlll.nccu.edu.tw)
- 專案聯絡人：[布丁布丁吃布丁](http://pulipuli.blogspot.tw)

## 什麼是KALS!標註工具？

KALS!標註工具是一種附掛在HTML網頁上的標註工具。他可以剖析、調整HTML的內文，將原本靜態的網頁加上「標註」的功能。
使用者可以透過KALS!標註工具為網頁上的文字新增標註並填寫補充的筆記，也可以瀏覽其他人的標註、針對其他人的標註進行討論，或是將其他人的標註加入「喜愛清單」，給予他一個鼓勵。
KALS!標註工具會在網頁上將重要性較高的範圍文字標示為「紅色的文字」，並根據使用者的標註行為，適時地提供閱讀技巧的「建議」與「推薦標註」，進而提昇使用者的閱讀能力。

## 特色

- 嵌入JavaScript就可以帶入KALS標註系統
- 可對純HTML頁面上的文字進行標註
- 使用者之間可以看到彼此的標註，並藉此進行討論
- 詳細記錄使用者閱讀的資料，以便進行實驗分析

## 系統需求

- PHP 5.3以上
- PostgreSQL 9.2
- 建議最低硬碟空間：300MB

## 使用元件

- [jQuery](http://jquery.com/)
- [jQuery UI](http://jqueryui.com/)
- [jQuery TOOL](http://jquerytools.org/)
- [CodeIgniter 1.7.2](http://www.codeigniter.org.tw/)
- [CKEditor](http://ckeditor.com/)

## 操作介面

[![KALS操作介面](http://lh5.ggpht.com/_yr4MQB4zDus/TPEhCZg6urI/AAAAAAAAHPc/7bXx9IYbNJA/kals_interface_thumb.png)](http://lh5.ggpht.com/_yr4MQB4zDus/TPEhBQQekEI/AAAAAAAAHPY/9J0bBepTBow/s1600-h/kals_interface%5B2%5D.png)

1. **工具列**：畫面最上方會顯示工具列，您可以在工具列中進行「登入」、「註冊」、「登出」、設定「帳號資料」 與「標註顯示」，或是查閱「說明」。
2. **標註顯示**：使用KALS!標註工具的網頁文字上會顯示標註的狀況。畫底線的文字表示是現在登入帳號的標註，也就是您標註過的部分；紅色的文字是KALS!的指示，表示比較重要的部份。此外，在選取標註範圍、顯示標註範圍、顯示推薦標註飯範圍時，皆會有不同的字體顏色與框線。以下介紹到各工具時會一併說明。
3. **選取提示**：當您滑鼠移到網頁文字上時就會顯示選取提示，如果您要選取這個文字，請點選這個選取提示以確定。您也可以直接點選網頁文字來選取。
4. **標註工具**：新增、管理、瀏覽標註的主要工具。選擇標註範圍之後就會顯示標註工具。
5. **建議工具**：顯示建議、推薦標註的工具。在新增標註之後，或是瀏覽標註時點下建議圖示就會顯示。

## 系統使用教學

- [2009年KALS的使用教學](http://pulipuli.blogspot.tw/2010/11/20101127kals.html)

## 其他參考網頁

- [Markdown 語法說明](http://zh.wikipedia.org/wiki/Markdown/)
- [Markdown 語法編輯器](http://markdown.pioul.fr/)