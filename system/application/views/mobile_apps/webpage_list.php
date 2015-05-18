<?php
$logout_path = site_url('mobile_apps/logout');
?>
<div data-role="header" data-position="fixed">
    
    <a href ="<?php echo $logout_path ?>" 
       data-ajax="false"
       class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-arrow-l">
        <?php
        //回首頁
        $user = get_context_user();
        if (isset($user)) {
           echo $lang->line("mobile_apps.webpage_list.back");
        }else{
           echo $lang->line("mobile_apps.webpage_list.do_login");
        }
        ?>
        
    </a>
    <span class="ui-title">
        <?php
        //Webpage List
        echo $lang->line("mobile_apps.webpage_list.title");
        ?>
        
    </span>
    
    <?php
        $href = site_url('mobile_apps/login');
        $text = $lang->line("mobile_apps.hello_guest");
        
        $user = get_context_user();
        if (isset($user)) {
            $href = site_url('mobile_apps/logout');
            $text = $user->get_name();
        }
    ?>
    <a href="<?php 
     if (isset($user)) {
        echo '#';
     }else{
        echo $href;
     }
    ?>" 
       class="ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right">
            <?php
                echo $text
            ?>
    </a>
</div>
<div>
  <h3 class="ui-bar ui-bar-a ui-corner-all">
      <?php
      //請點想要查看的文章唷！
      echo $lang->line("mobile_apps.webpage_list.hint");
      ?>
  </h3> 
</div>
<div>
    <ul data-role="listview" data-count-theme="b" data-inset="true">

        <?php 
        //列出所有page
        foreach ($all_webpages AS $webpage_array ){
            $annotation_topics_uri = site_url('mobile_apps/annotation_topics/webpage_id/'
                 .$webpage_array['webpage_id']);
            
            $new_icon = "";
            if ($webpage_array["is_unread"] === TRUE) {
                $new_icon_uri = site_url("images/new_icon.gif");
                $new_icon = '<span>
                    <img src="'.$new_icon_uri.'">
                </span>';
            }

            ?>
            <li>
                <a href="<?php echo $annotation_topics_uri ?>">
                    <span class="webpage_title">
                        <?php
                        echo $new_icon;
                        echo $webpage_array['webpage_title'];
                        ?>
                    </span>
                    <span class="ui-li-count">
                        <?php
                        echo $webpage_array['annotation_count'];
                        ?>
                    </span>
                </a>
            </li> 
            <?php
        }   // foreach ($all_webpages AS $webpage_array ){         
        ?>

    </ul>
</div>   
<div data-role="header">
    <?php
    if ($prev_page !== -1) {
        $href = site_url('mobile_apps/webpage_list/page/'.$prev_page);
        ?>
        <a href="<?php echo $href; ?>" 
            class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-arrow-l" 
            data-ajax="false">
            <?php
                //上一頁
                echo $lang->line('mobile_apps.webpage_list.prev_page');
            ?>
        </a>
        <?php
    } 
    ?>
    
    <h1>
        <?php 
        //Page 
        echo $lang->line('mobile_apps.webpage_list.page.1');
        echo $page; 
        echo $lang->line('mobile_apps.webpage_list.page.2');
        ?>
    </h1>
    
    <?php
    if ($next_page !== -1) {
        $href = site_url('mobile_apps/webpage_list/page/'.$next_page);
        ?>
            <a class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-arrow-r" 
               href="<?php echo $href;?>" 
               data-ajax="false">
                <?php
                //下一頁
                echo $lang->line('mobile_apps.webpage_list.next_page');
                ?>
            </a>
        <?php
    } 
    ?>
</div>
