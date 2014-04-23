<?php
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

?>


<div class="ui-field-contain">

    <form class="login_form" id="login_form" data-ajax="false" action="mobile_user_login" method="post" >
        <h2>KALS Login <br>
            <!--msg = <?php  echo $referer_url.'<br>';
                         echo $do_login.'<br>';
                         echo $email.'/'.$password.'<br>';
                         echo 'has_url:'.$has_url.'<br>';
                         if (isset($user)){
                             echo $user['success'];
                         }
                         else echo 'user not get';
                   ?>--></h2>           
        <label for="input_url" style="display: <?php  if (isset($referer_url) && $has_url){echo 'none'; }  ?>">
            Domain name:</label>        
        <input type="text" name="input_url" id="input_url" 
               style="display: <?php  if (isset($referer_url) && $has_url){echo 'none'; }  ?>"
               value="<?php echo $referer_url?>" data-ajax="false"/>    
        
        <label for="name">Username(email):</label>
        <input type="text" name="email" id="email" value="" data-clear-btn="true" data-mini="true">
        <label for="password">Password:</label>            
        <input type="password" name="password" id="password" value="" data-clear-btn="true" autocomplete="off" data-mini="true">
                    <!-- do_login 是否登入-->
        <input type="hidden" name="do_login" id="do_login" value="true" />
      
        <button type="submit" value="true" class="ui-btn ui-btn-a ui-shadow ui-corner-all" data-ajax="false">Login</button>
        <a href="<?php echo base_url(); ?>mobile/webpage_list" class="ui-btn ui-btn-b ui-shadow ui-corner-all" data-ajax="false">Skip</a>       
     </form>
    </div>
