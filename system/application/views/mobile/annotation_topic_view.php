<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */?>

<div data-role="header" data-position="fixed">
    <a data-rel="back" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-arrow-l">上一頁</a>
    <span class="ui-title">Annotation Topics List</span>
    <a class="ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right"><?php echo 'user';?></a>
</div>
<div>
    <h3 class="ui-bar ui-bar-a ui-corner-all" style="text-align: center"><?php echo $title; ?></h3>
 
</div>
<div>
    <ul data-role="listview" data-count-theme="b" data-inset="true">
    
         <?php  //列出該page中all topic
                foreach ($written_annotations AS $written_annotations){
                 echo '<li><a href = "http://140.119.61.137/kals/mobile/annotation_thread/'
                     .$written_annotations['annotation_id'].'">'
                     .$written_annotations['anchor_text']
                     .'<span class="ui-li-count">'
                     .$written_annotations['respond_count']
                     .'</span>   <span style="font-size: small; font-style:  italic; color: gray">'    
                     .$written_annotations['timestamp']
                     .'</span></a></li>';
             }
         ?>
       
    </ul>
</div>   