<?php
/**
 * annotation_thread_view
 * 
 * @version 20140423 wyfan
 */
$anchor_text = '';
if (isset($topic_annotation["anchor_text"])) {
    $anchor_text = $topic_annotation["anchor_text"];
    if (mb_strlen($anchor_text,"utf-8") > 8) {
        $anchor_text = mb_substr($anchor_text, 0, 8,"utf-8") . "...";
    }
    $anchor_text = '"' . $anchor_text . '"';
}

$user = get_context_user();
$user_login = isset($user);

$annotation_thread_uri = site_url("mobile_apps/annotation_thread/topic_id/" . $topic_annotation["topic_id"]);

?>
<!--top bar-->
<div data-role="header" data-position="fixed" data-theme="a" data-ajax="false">
    <?php
    $backward_href = site_url("mobile_apps/annotation_topics/webpage_id/" . $webpage["id"]);
    $forward_href = $webpage["url"] . "#view=" . $topic_annotation["topic_id"];

    
    ?>
    <a href ="<?php echo $backward_href; ?>" 
       class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-carat-l" 
       data-ajax="false">
        <?php
        //上一頁
        echo $lang->line("mobile_apps.annotation_thread.back");
        ?>
    </a>
    <h1>
        <?php 
        echo $anchor_text;
        ?>
    </h1> 
    <a href="<?php echo $forward_href; ?>" 
       class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-carat-r" 
       data-ajax="false">
        <?php
        //詳見全文
        echo $lang->line("mobile_apps.annotation_thread.fullpage");
        ?>
    </a>
</div>
<!--/top bar-->

<!--topic_annotation-->
<div class="ui-block-a" style="width: 100%; font-size: x-large">
    <div class="ui-bar ui-bar-a" style="text-align: center;">
        <h2>
        <?php
        if (isset($topic_annotation["anchor_text"])) {
            echo '"'. $topic_annotation["anchor_text"] . '"'; 
        }
        ?>
        </h2>
    </div>
</div> 
   
<ul data-role="listview" data-inset="true" style=" text-indent: 1em">
    <!--$annotation_topic -->      
    <li style="border-bottom-width: 1px;">
    <?php 
    //if(isset($user_name) && isset($note)){
    if (isset($topic_annotation)) {
        $annotation_id = "annotation_" . $topic_annotation["topic_id"];
        $style = "";
        if ($topic_annotation["is_my"]) {
            $style = 'text-decoration: underline';
        }
        ?>
        <span class="name-container" 
              id="<?php echo $annotation_id; ?>" 
                  style="font-weight:bold;<?php echo $style; ?>"><?php 
            echo $topic_annotation["user_name"]; 
        ?></span>
        <span class="type-option <?php echo $topic_annotation["type_classname"] ?>" ><?php
            echo $topic_annotation["type_name_lang"];
        ?></span>
        <span style=" font-size: x-large">
            <?php 
            echo $topic_annotation["note"];
            ?>
        </span>
        <div style ="color: gray; font-size: 8px; text-align: right"> 
            (<?php echo $topic_annotation["timestamp"]; ?>) 
        </div>
        <?php 
    }
    ?>
    </li>



   <!-- respones -->
   <!--<ul data-role="listview" data-inset="true" class="list-header-component"> -->
    <?php    
    foreach ( $respond_annotations AS $respond_annotation ){
        $annotation_id = "annotation_".$respond_annotation["annotation_id"];
        
        $style = "";
        if ($respond_annotation["is_my"]) {
            $style = 'text-decoration: underline';
        }
        ?>
        <li style="margin-left: 2em">
            <span class="name-container" 
                  style="font-weight:bold;<?php echo $style; ?>"
                  id="<?php echo $annotation_id ?>"><?php 
                echo $respond_annotation["user_name"];
             ?></span>
            <span class="type-option <?php echo $respond_annotation["type_classname"] ?>"><?php 
                echo $respond_annotation["type_name_lang"]; 
            ?></span>
            <span style="font-size: large;margin-left: 0.5em; ">
                <?php echo $respond_annotation["note"]; ?>
            </span>
            <div style="color: gray; font-size: 8px; text-align: right">
                (<?php echo $respond_annotation["timestamp"] ?>)
            </div> 
         </li>
         <?php
     }   

    // TEST 
    /*if(isset($note_massage) && isset($pop_type)){
       echo '<li style = " margin-left: 15% ">' . "demo"."[". $pop_type."]".'<br>'.$note_massage.'<br>'."(".$timestamp.")" ;
    } */
     ?> 
</ul> 


