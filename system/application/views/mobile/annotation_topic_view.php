<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */?>

<div data-role="header" data-position="fixed">
    <a href ="<?php echo base_url(); ?>mobile/webpage_list" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-arrow-l">上一頁</a>
    <span class="ui-title">Annotation Topics List</span>
    <a href="<?php if($this->session->userdata('logged_in') == TRUE){
                        echo '#';
                    }else{
                        echo base_url().'mobile/mobile_user_login';
                    }
              ?>" 
       class="ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right">
            <?php   if($this->session->userdata('logged_in') == TRUE){
                        echo $this->session->userdata('user_name');
                    }else{
                        echo '訪客你好！';
                    }
             ?></a>
</div>
<div>
    <h3 class="ui-bar ui-bar-a ui-corner-all" style="text-align: center"><?php echo $title; ?></h3>
 
</div>
<div>
    <ul data-role="listview" data-count-theme="b" data-inset="true">
    
         <?php  //列出該page中all topic
                foreach ($written_annotations AS $array){
                 echo '<li><a href ="'.base_url().'mobile/annotation_thread/'
                     .$array['annotation_id'].'">'                     
                     .'<span style="display: '
                     .$array['is_unread']
                     .'"><img src="'.base_url().'images/new_icon.gif">  </span>'                       
                     .$array['anchor_text']
                     .'<span class="ui-li-count">'
                     .$array['respond_count']                 
                     .'</span>   <span style="font-size: small; font-style:  italic; color: gray">'                           
                     .$array['timestamp']
                     .'</span></a></li>';
             }
         ?>
       
    </ul>
</div>   