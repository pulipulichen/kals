<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>
<div data-role="header" data-position="fixed">
    <a data-rel="back" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-arrow-l">回首頁</a>
    <span class="ui-title">Webpage List</span>
    <a class="ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right">Hello你好嗎</a>
</div>
<div>
  <h3 class="ui-bar ui-bar-a ui-corner-all">請點想要查看的文章唷！</h3> 
</div>
<div>
    <ul data-role="listview" data-count-theme="b" data-inset="true">

        <?php //列出所有page
             foreach ($all_webpages AS $webpage_array ){
                 echo '<li><a href="http://localhost/kals/mobile/annotation_topics/'
                      .$webpage_array['webpage_id']
                      .'">'
                      .$webpage_array['webpage_title']
                      .'<span class="ui-li-count">'
                      .$webpage_array['annotation_count']
                      .'</span></a></li>'   ;                
             }
               
        ?>

    </ul>
</div>   
