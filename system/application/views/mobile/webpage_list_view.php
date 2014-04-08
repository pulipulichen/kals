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
    <a href="<?php if($this->session->userdata('logged_in') == TRUE){
                        echo '#';
                    }else{
                        echo 'mobile_user_login';
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
  <h3 class="ui-bar ui-bar-a ui-corner-all">請點想要查看的文章唷！</h3> 
</div>
<div>
    <ul data-role="listview" data-count-theme="b" data-inset="true">

        <?php //列出所有page
             foreach ($all_webpages AS $webpage_array ){
                 echo '<li><a href="'.base_url().'mobile/annotation_topics/'
                      .$webpage_array['webpage_id']
                      .'">'
                      .$webpage_array['webpage_title'].'  '
                      .'<span style="display: '.$webpage_array['is_unread']
                      .'"><img src="'.base_url().'images/new_icon.gif"></span>'     
                      .'<span class="ui-li-count">'
                      .$webpage_array['annotation_count']                         
                      .'</span></a></li>'   ;                
             }              
        ?>

    </ul>
</div>   
