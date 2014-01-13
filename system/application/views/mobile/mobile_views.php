<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

?>

<form action="mobile_setter" method="post">
    <?php 
    if (isset($note_massage)) {
        echo $note_massage;
        echo $webpage_url;
    }
    ?>
    <div class="ui-grid-b" style="width: 100%" >
      <div class="ui-block-a" style="width: 100%">
          <div class="ui-body ui-body-d" > 
              <!--ui-bar ui-bar-a-->
         <h2 >

        <!-- $anchor_text --> 圖書館自動化系統
        </h2>
        <p>
            annotation_topic</p> 
      </div>
          </div>
      <div class="ui-block-a" style="width: 100%">
          <div class="ui-bar ui-bar-a" style="height:60px">

        <!--$annotation_topic -->
        demo[困惑]
         是什麼
         </div>
      </div>
     </div>  
    
 <div>
    <div class="ui-block-a">
        <div class="ui-body ui-body-d">
            <h2>圖書館自動化系統 </h2>
            <!--<?php echo $anchor_text ?> -->
            <p>annotation_topic</p>
            <!--<?php echo $annotation_topic ?> -->
        </div>
    </div>
    <div>
        <div class="ui-body ui-body-d">
            <h4>demo [困惑]</h4>
            <!--<?php echo $user ; echo $type_name ?> -->
            <p>what' it ?</p>
            <!--<?php echo $user_response ?> -->
            <p style="text-align:right">2013.01.10</p>
        </div>
    </div>

    </div>       
      
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

    <label for="note_input">請輸入回應</label>
    <textarea name="note_text" id="note_text">  </textarea>
    
    <input type="submit" value="新增標註回應" />
<!--
    <ul data-role="listview" style="text-align:center">
        <li style="text-align:center"><a  href="<?php echo $webpage_url ?>" > 詳見全文 </a> </li>
   </ul>
-->
  <a href="<?php echo $webpage_url ?>" class="ui-btn ui-icon-carat-r ui-btn-icon-right">詳見全文</a>
</form>