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
        
        /*
        <a href="<?php echo $login_uri;?>" 
            class="ui-btn ui-btn-b ui-corner-all ui-shadow" 
            data-ajax="false" 
            style="width:100%;">
            <?php
            // 登入
            echo $lang->line("mobile_apps.login.do_login");
            ?>
        </a>
         */
        ?>
<form action="<?php echo $login_uri ?>" method="post" data-ajax="false">
    <input type="hidden" name="domain" value="<?php echo $webpage["url"] ?>" />
    <button type="submit" name="do_redirect"
           class="ui-btn ui-btn-b ui-corner-all ui-shadow" 
            data-ajax="false" 
            id="redirect_to_login"
            style="width:100%;">
        <?php echo $lang->line("mobile_apps.login.do_login"); ?>
    </button>
</form>
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
                       class="data-source"
                       id="<?php echo $type->get_classname(); ?>"
                       value="<?php echo $type->get_type_id(); ?>" 
                       <?php echo $checked; ?> />
                <?php
            }
           ?>
       </fieldset>
        
  
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
              class="data-source"
        id="note"></textarea>  

    <?php
    if ($user_login) {
        $button_value = $lang->line("mobile_apps.annotation_thread.add_respond");
        ?>
        <input type="submit"
               name="do_respond"
               value="<?php echo $button_value; ?>"
               class="data-source"
               onclick="submit_to_target_form()"
               data-ajax="false" /> 
        
        
<script type="text/javascript">  
  function submit_to_target_form() { 
      var _note = $("textarea.data-source[name='note']").val();
      var _type = $('input.data-source[name="annotation_type"]:checked').val();

      $("#target_form textarea[name='note']").val(_note); //jQuery
      $("#target_form input[name='annotation_type']").val(_type); //jQuery
      $("#target_form").submit();
}      
</script>
        <form id="target_form" action="<?php echo $annotation_thread_uri; ?>" 
              method="post" style="display: none" 
              data-ajax="false"> 
            <textarea name="note"></textarea>
            <input name="annotation_type" />
        </form>
        <?php
    }
    else {
        $login_lang = $lang->line("mobile_apps.annotation_thread.login_hint");
        
        /*
        <a href="<?php echo $login_lang ?>">
            <?php echo $login_lang ?>
        </a>
        */
        ?>
        <input type="button"
               name="do_respond"
               value="<?php echo $login_lang; ?>"
               class="data-source"
               onclick="$('#redirect_to_login').click();"
               data-ajax="false" /> 
        <?php
    }
    ?>
<!--/內部-->

</div>

</div>


