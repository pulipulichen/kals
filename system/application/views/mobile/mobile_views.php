<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


?>
    <!--test msg  style="display: none" -->
    <form name="f1" id="f1" action="10851" method="post" style="display: none" > 
        <textarea name="note_text"></textarea>
        <input name="annotation_type">
 </form>
    <?php 
    if (isset($note_massage) && isset($type)) {
        echo "[". $type . "]";
        echo "[". $note_massage . "] ";
        echo "[ webpage = ". $webpage_url . "] ";
        echo "[anchor_text_id = " .$anchor_text_id . "]";
    }
    ?>
    <!--/test msg-->
    <!--top bar-->
<div data-role="header" data-position="fixed" data-theme="a">
 
    <a href="#" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-carat-l">上一頁</a>
    <h1>anchor text</h1> <!-- $annotation_ancor_text-->
    <a href="<?php echo $webpage_url ?>" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-carat-r">詳見全文</a>

</div>
<!--/top bar-->
   <!--annotation-->
 <div class="ui-block-a" style="width: 100%">
    <div class="ui-bar ui-bar-a" style="height:60px">
       <h1>
           "圖書館自動化系統(anchor text)"
          <?php echo "[anchor_text_id = " .$anchor_text_id . "]"; ?>
        <!--<?php echo $anchor_text ?> -->  
       </h1>
    </div>
 </div> 
   
   <ul data-role="listview" data-inset="true">
    <!--<?php echo $annotation_topic ?> -->
      <!--$annotation_topic -->      
    <li style ="margin-left: 8%">demo[困惑] 是什麼(annotation_topic)</li>

 </ul> 

   <!-- res -->
   <ul data-role="listview" data-inset="true">
    <!--<?php echo $annotation_respones ?> -->
    <li style ="margin-left: 15%">TRY</li>
    <li style ="margin-left: 15%">IT</li>
    <li style ="margin-left: 15%">
        <span style="color: red"> user[
            <?php  if (isset($type))
                       echo $type ?>]  
        </span><br>                              
        
        <span>text: 
            <?php if (isset($note_massage))
                     echo $note_massage ?>  
        </span><br>
        <span style="text-align: right">20140211  </span>        
    </li>
 </ul> 
  
   
   <!--annotation-->

   <!--回應標註 FOOTER--> 
    <div data-role="footer" data-position="fixed" data-theme="a" data-overlay-theme="a" data-transition="fade">
    
    <!--POP UP href="#popupCloseRight"-->    
    <a href="#popupCloseRight" data-rel="popup" data-position-to="window" class="ui-btn ui-corner-all ui-shadow" style="width:100%" >新增標註回應</a>
    </div>
   
   <!--/回應標註 FOOTER-->
    <div data-role="popup" id="popupCloseRight"  data-overlay-theme="a" class="ui-content" style="max-width:100%">
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
       
    <label for="note_text">請輸入回應</label>
    <textarea name="note_text" id="note_text"></textarea>  

    <input type="submit" onclick="trans_to_form1()" value="新增標註回應" /> 
    <!-- alert($('input[name=annotation_type]:checked').val());-->
        <!--/內部-->
    
  </div>

