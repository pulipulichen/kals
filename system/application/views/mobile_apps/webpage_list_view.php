<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>
<div data-role="header" data-position="fixed">
    <a href ="<?php echo base_url(); ?>mobile/mobile_user_login" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-arrow-l">回首頁</a>
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
                      .'<span style="display: '.$webpage_array['is_unread']
                      .'"><img src="'.base_url().'images/new_icon.gif">  </span>'     
                      .$webpage_array['webpage_title']
                      .'<span class="ui-li-count">'
                      .$webpage_array['annotation_count']                         
                      .'</span></a></li>'   ;                
             }              
        ?>

    </ul>
</div>   
<div data-role="header">
    <?php
    if ($prev_page !== -1) {
        ?>
    <a href="<?php echo base_url(); ?>mobile/webpage_list/<?php echo $prev_page;?>" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-arrow-l" data-ajax="false">上一頁</a>
        <?php
    } 
    ?>
    
    <h1>Page <?php echo $page; ?></h1>
    
    <?php
    if ($next_page !== -1) {
        ?>
    
    <a class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-arrow-r" href="<?php echo base_url(); ?>mobile/webpage_list/<?php echo $next_page;?>" data-ajax="false">下一頁</a>
    <?php
    } 
    ?>
</div>
