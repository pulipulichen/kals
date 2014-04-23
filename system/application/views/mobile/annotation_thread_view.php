<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


?>
    <!--test msg--style="display: none"-->
    <form name="f1" id="f1" action="<?php echo $annotataion_id; ?>" method="post" style="display: none" data-ajax="false"> 
        <textarea name="note_text"></textarea>
        <input name="annotation_type">
    
   <!--test msg  style="display: none" --> 
   <?php 
    if (isset($note_massage) && isset($pop_type)) {
        echo "[". $pop_type . "]";
        echo "[". $note_massage . "] ". '<br>';      
    }
    echo "[".$webpage_id. "]".$webpage_url.'<br>';  
    foreach ($webpage AS $value){
    echo $value.'<br>';}
    echo $css_type.'<br>';
    echo $annotataion_id.'<br>';
    if(isset($respond_json)){
        foreach ($respond_json AS $json) {
                echo "test-msg = [".$json['timestamp']."] <br>";
        }          
     }
     echo $log_webpage_id.'<br>';
     
    ?></form>
    <!-- </form> -->
    <!--/test msg-->
    <!--top bar-->
<div data-role="header" data-position="fixed" data-theme="a" data-ajax="false">
 
    <a href ="<?php echo base_url(); ?>mobile/annotation_topics/<?php echo $webpage_id; ?>" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-carat-l" data-ajax="false">上一頁</a>
    <h1><?php 
         if(isset($anchor_text)){
            echo '"'.$anchor_text.'"';
         } 
         ?></h1> 
    <a href="<?php echo $webpage_url; ?>#view=<?php echo $annotataion_id; ?>" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-carat-r" data-ajax="false">詳見全文</a>

</div>
<!--/top bar-->
   <!--annotation-->
 <div class="ui-block-a" style="width: 100%; font-size: x-large">
    <div class="ui-bar ui-bar-a">
       <h2><?php 
         if(isset($anchor_text)){
            echo '"'.$anchor_text.'"';
         } 
         ?></h2>
    </div>
 </div> 
   
   <ul data-role="listview" data-inset="true" style=" text-indent: 1em">
      <!--$annotation_topic -->      
      <li style="border-bottom-width: 1px;">
      <?php 
         if(isset($user)&&isset($note)){
             echo '<span class = "name-container" id = "annotation_'.$annotataion_id.'"><b><u>'
                 .$user.'</u></b>  </span>'
                 .'<span class = "type-option '.$css_type.'" annotation_type = "'.$css_type.'">'
                 .$type_name
                 .'</span>'
                 .'<span style = "font-size: x-large">'.$note.'</span>'
                 .'<div style ="color: gray; font-size: 8px; text-align: right"> (' .$timestamp. ') </div>' ; 
         }
      ?>
        </li>



   <!-- respones -->
   <!--<ul data-role="listview" data-inset="true" class="list-header-component"> -->
    <?php    
        foreach ( $respond_json AS $json ){
          echo '<li style = " margin-left: 2em ">'
             .'<span class = "name-container" id ="annotation_'.$json['annotation_id'].'"><b><u>'.$json['user'].'</u></b>   <span>'
             .'<span class = "type-option ' .$json['css_type'].'" annotation_type = "'.$json['css_type'].'">'
             .$json['type'].'</span>  '
             .'<span style = "font-size: large">'.$json['note'].'</span>'
             .'<div style ="color: gray; font-size: 8px; text-align: right"> (' .$json['timestamp']. ') </div>' 
             .'</li>' ;                   
         }   
        
        // TEST 
        /*if(isset($note_massage) && isset($pop_type)){
           echo '<li style = " margin-left: 15% ">' . "demo"."[". $pop_type."]".'<br>'.$note_massage.'<br>'."(".$timestamp.")" ;
        } */
         ?> 
   </ul> 
  
   
   <!--annotation-->

   <!--回應標註 FOOTER--> 
    <div data-role="footer" data-position="fixed" data-theme="a" data-overlay-theme="a" data-transition="fade">
    
    <!--POP UP href="#popupCloseRight"-->    
    <a href="#popupCloseRight" data-rel="popup" data-position-to="window" class="ui-btn ui-corner-all ui-shadow" style="width:100%">新增標註回應</a>
    <a href="<?php echo base_url();?>mobile/mobile_user_login" class="ui-btn ui-btn-b ui-corner-all ui-shadow" data-ajax="false" style="width:100%; display: <?php if($this->session->userdata('logged_in') == TRUE){
                                  echo 'none';}?>">登入</a>
    </div>
   
  <!-- 先檢查是否有登入-->
  <div>
  <!--/回應標註 FOOTER-->
    <div data-role="popup" id="popupCloseRight"  data-overlay-theme="a" class="ui-content" style="max-width:100%" >
     <a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>  
   
     <!--內部-->
     <fieldset data-role="controlgroup" data-type="horizontal">
        <label for="type_importance">重要</label>
        <input type="radio" name="annotation_type" id="type_importance" value="importance" checked="checked" />
        <label for="type_concept">概念</label>
        <input type="radio" name="annotation_type" id="type_concept" value="concept" />
        <label for="type_confusion">困惑</label>
        <input type="radio" name="annotation_type" id="type_confusion" value="confusion" />
        <label for="type_question">質疑</label>
        <input type="radio" name="annotation_type" id="type_question" value="question" />
        <label for="type_example">舉例</label>
        <input type="radio" name="annotation_type" id="type_example" value="example" /> 
        <label for="type_summary">摘要</label>
        <input type="radio" name="annotation_type" id="type_summary" value="summary" />  
        <label for="type_other">其他</label>
        <input type="radio" name="annotation_type" id="type_other" value="other" />       
    </fieldset>
  <script>  
    function trans_to_form1() { 
        var _form1 = document.getElementById("f1");
        var _note = $("#note_text").val();
        
        var _type = $('input[name="annotation_type"]:checked').val();
        
        $("#f1 textarea[name='note_text']").val(_note); //jQuery
        $("#f1 input[name='annotation_type']").val(_type); //jQuery
        _form1.submit();
        
    }      
    </script>
       
    <label for="note_text" >請輸入回應</label>
    <textarea name="note_text" <?php if($this->session->userdata('logged_in') == FALSE){
                                     echo 'disabled="disabled"';}?> 
       id="note_text"><?php if($this->session->userdata('logged_in') !== TRUE){
                                     echo '請先登入喔！';}?></textarea>  

    <input type="submit" <?php if($this->session->userdata('logged_in') === FALSE){
                                  echo 'disabled="disabled"';}?>
           onclick="trans_to_form1()" value="新增標註回應"  data-ajax="false" /> 
    <!-- alert($('input[name=annotation_type]:checked').val());-->
        <!--/內部-->
    
  </div>.
</div>


