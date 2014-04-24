<?php
/**
 * annotation_thread_view
 * 
 * @version 20140423 wyfan
 */

/*
    <!--test msg--style="display: none"-->
    <form name="f1" id="f1" action="<?php echo $annotataion_id; ?>" method="post" style="display: none" data-ajax="false"> 
        <textarea name="note_text"></textarea>
        <input name="annotation_type">

/*
if (isset($note_massage) && isset($pop_type)) {
    echo "[". $pop_type . "]";
    echo "[". $note_massage . "] ". '<br>';      
}
echo "[".$webpage_id. "]".$webpage_url.'<br>';  
foreach ($webpage AS $value){
echo $value.'<br>';}
echo $type_id.'<br>';
echo $topic_id.'<br>';
if(isset($respond_json)){
    foreach ($respond_json AS $json) {
            echo "test-msg = [".$json['timestamp']."] <br>";
    }          
 }
 echo $log_webpage_id.'<br>';
    </form>
    <!-- </form> -->
    <!--/test msg-->
<?php 
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
        ?>
        <span class="name-container" 
              id="<?php echo $annotation_id ?>" 
              style="font-weight:bold; text-decoration: underline">
            <?php echo $topic_annotation["user_name"]; ?>
        </span>
        <span class="type-option <?php echo $topic_annotation["type_classname"] ?>" >
            <?php
            echo $topic_annotation["type_name_lang"];
            ?>
        </span>
        <span style = "font-size: x-large">
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
        ?>
        <li style="margin-left: 2em">
            <span class="name-container" 
                  style="font-weight:bold; text-decoration: underline"
                  id="<?php echo $annotation_id ?>">
                <?php echo $respond_annotation["user_name"] ?>
            </span>
            <span class="type-option <?php echo $respond_annotation["type_classname"] ?>">
                <?php echo $respond_annotation["type_name_lang"]; ?>
            </span>
            <span style="font-size: large">
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

<?php 
// --------------------------------------
?>
   <!--annotation-->

<!--回應標註 FOOTER--> 
<div data-role="footer" data-position="fixed" data-theme="a" 
     data-overlay-theme="a" data-transition="fade">

    <!--POP UP href="#popupCloseRight"-->    
    <a href="#popupCloseRight" data-rel="popup" data-position-to="window" 
        class="ui-btn ui-corner-all ui-shadow" style="width:100%">
        <?php
        //新增標註回應
        echo $lang->line("mobile_apps.annotation_thread.add_respond");
        ?>
    </a>
    <?php
    if ($user_login === FALSE) {
        $login_uri = site_url("mobile_apps/login");
        ?>
        <a href="<?php echo $login_uri;?>" 
            class="ui-btn ui-btn-b ui-corner-all ui-shadow" 
            data-ajax="false" 
            style="width:100%;">
            <?php
            // 登入
            echo $lang->line("mobile_apps.login.do_login");
            ?>
        </a>
        <?php
    }
    ?>
    
</div>
<!-- 先檢查是否有登入-->

<?php
// ----------------------------------------------
?>

<div>
<!--/回應標註 FOOTER-->
    <div data-role="popup" id="popupCloseRight" data-overlay-theme="a" 
         class="ui-content" style="max-width:100%" >
        <a href="#" data-rel="back" 
           class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">
            <?php
            //Close
            echo $lang->line("mobile_apps.annotation_thread.close");
            ?>
        </a>  

        <!--內部-->
        <fieldset data-role="controlgroup" data-type="horizontal">
            <?php
            $is_first = TRUE;
            foreach ($types AS $key => $type) {
                $checked = "";
                if ($is_first) {
                    $checked = 'checked="checked"';
                }
                $is_first = FALSE;
                
                ?>
                <label for="<?php echo $type->get_classname(); ?>">
                    <?php
                    //重要
                    $type_name_lang = $type->get_name();
                    if ($type->is_basic()) {
                        $type_name_lang = $this->lang->line("web_apps.".$type_name_lang);
                    }
                    echo $type_name_lang;
                    ?>
                </label>
                <input type="radio" 
                       name="annotation_type" 
                       id="<?php echo $type->get_classname(); ?>"
                       value="<?php echo $type->get_type_id(); ?>" 
                       <?php echo $checked; ?> />
                <?php
            }
           /*
           <label for="type_concept">
               概念
           </label>
           <input type="radio" 
                  name="annotation_type" id="type_concept" value="concept" />
           
           <label for="type_confusion">
               困惑
           </label>
           <input type="radio" 
                  name="annotation_type" id="type_confusion" value="confusion" />
           
           <label for="type_question">
               質疑
           </label>
           <input type="radio" 
                  name="annotation_type" id="type_question" value="question" />
           
           <label for="type_example">
               舉例
           </label>
           <input type="radio" 
                  name="annotation_type" id="type_example" value="example" />
           
           <label for="type_summary">
               摘要
           </label>
           <input type="radio" 
                  name="annotation_type" id="type_summary" value="summary" />  
           <label for="type_other">其他</label>
           <input type="radio" name="annotation_type" id="type_other" value="other" />
           */
           ?>
       </fieldset>
        
<?php
/*
<script type="text/javascript">  
  function trans_to_form1() { 
      var _form1 = document.getElementById("f1");
      var _note = $("#note_text").val();

      var _type = $('input[name="annotation_type"]:checked').val();

      $("#f1 textarea[name='note_text']").val(_note); //jQuery
      $("#f1 input[name='annotation_type']").val(_type); //jQuery
      _form1.submit();

  }      
  </script>
*/
?>
    <label for="note">
        <?php
        //請輸入回應
        echo $lang->line("mobile_apps.annotation_thread.label.note");
        ?>
    </label>
    <?php
    $disabled = "";
    if ($user_login === FALSE) {
        $disabled = ' disabled="disabled"';
    }
    ?>
    <textarea name="note" <?php echo $disabled ?>
        id="note"></textarea>  

    <?php
    if ($user_login) {
        $button_value = $lang->line("mobile_apps.annotation_thread.add_respond");
        ?>
        <input type="submit"
               name="do_respond"
               value="<?php echo $button_value; ?>"
               data-ajax="false" /> 
        <?php
    }
    else {
        $login_lang = $lang->line("mobile_apps.annotation_thread.login_hint");
        ?>
        <a href="<?php echo $login_lang ?>">
            <?php echo $login_lang ?>
        </a>
        <?php
    }
    ?>
    
  <!-- alert($('input[name=annotation_type]:checked').val());-->
      <!--/內部-->

</div>

</div>


