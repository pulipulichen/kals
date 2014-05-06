<?php
/**
 * annotation_topic_view
 * 
 * @version 20140423 wyfan
 */


$user = get_context_user();

$webpage_list_uri = site_url('mobile_apps/webpage_list/page/' . $webpage_list_page);
$login_uri = site_url("mobile_apps/login");

?>

<div data-role="header" data-position="fixed">
    <a href ="<?php echo $webpage_list_uri; ?>" 
       class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-arrow-l">
        <?php
        //上一頁
        echo $lang->line("mobile_apps.annotation_topics.back");
        ?>
        
    </a>
    <span class="ui-title">
        <?php
        //Annotation Topics List
        echo $lang->line("mobile_apps.annotation_topics.title");
        ?>
        
    </span>
    
    <?php 
    // --------------------------
    // 決定是否顯示註冊按鈕
    // --------------------------
    if (isset($user) && is_object($user)) {
        ?>
        <a class="ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right"
           style="cursor: default">
            <?php echo $user->get_name(); ?>
        </a>
        <?php
    }
    else {
        ?>
        <form action="<?php echo $login_uri ?>" method="post" data-ajax="false">
            <input type="hidden" name="domain" value="<?php echo $webpage->get_url() ?>" />
            <button type="submit" name="do_redirect"
                   class="ui-btn ui-btn-b ui-corner-all ui-shadow" 
                    data-ajax="false" 
                    id="redirect_to_login"
                    style="width:100%; display: none">
                <?php echo $lang->line("mobile_apps.login.do_login"); ?>
            </button>
        </form>
        <a href="#" 
           onclick="$('#redirect_to_login').click()"
           class="ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right">
            <?php 
            echo $lang->line('mobile_apps.hello_guest');
            ?>
        </a>
        <?php
    }
    
    ?>
</div>

<?php
// ---------------------------------------------------------
?>

<div>
    <h3 class="ui-bar ui-bar-a ui-corner-all" style="text-align: center">
        <?php echo $webpage_title; ?>
    </h3>
</div>
<div>
    <ul data-role="listview" data-count-theme="b" data-inset="true">
    
         <?php  //列出該page中all topic
            foreach ($written_annotations AS $annotation){
                
                $annotation_thread_uri = site_url("mobile_apps/annotation_thread/topic_id/" 
                        . $annotation['annotation_id']);
                
                $new_icon = "";
                if ($annotation["is_unread"] === TRUE) {
                    $new_icon_uri = site_url("images/new_icon.gif");
                    $new_icon = '<span>
                        <img src="'.$new_icon_uri.'">
                    </span>';
                }
                
                ?>
                <li>
                    <a href ="<?php echo $annotation_thread_uri ?>">                 
                        <span class="anchor-text">
                            <?php 
                            echo $new_icon;
                            echo $annotation['anchor_text'];
                            ?>
                        <span>
                        <span class="ui-li-count">
                            <?php echo $annotation['respond_count']; ?>
                        </span>
                        <span style="font-size: small; font-style:  italic; color: gray">
                            <?php echo $annotation['timestamp']; ?>
                        </span>
                    </a>
                </li>
                <?php
             }  //foreach ($written_annotations AS $annotation){
         ?>
       
    </ul>
</div>   