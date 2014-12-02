<?php
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$action_url = site_url("mobile_apps/login");
?>
<?php
// --------------------------------
?>
<div class="login_form ui-field-contain" style="padding: 0 2em;">
<form id="login_form" data-ajax="false" action="<?php echo $action_url; ?>" method="post" >
<?php
// --------------------------------
?>
    
<h2 style="text-align: center;">
    <?php
        // <!-- KALS Login -->
        echo $lang->line("mobile_apps.login.title");
    ?>
    <?php 
        /*
        echo $referer_url.'<br>';
        echo $do_login.'<br>';
        echo $email.'/'.$password.'<br>';
        echo 'has_url:'.$has_url.'<br>';
        if (isset($user)){
            echo $user['success'];
        }
        else {
            echo 'user not get';
        }
        */
    ?>
</h2>

<?php
if (isset($message)) {
    ?>
    <div class="message" style="color: red;
font-weight: bold;
text-align: center;
">
        <?php echo $message; ?>
    </div>
    <?php
}
?>

<?php
// ----------------------------------------------------------------

$hide_domain = "";
//if (isset($domain) && $domain !== "" && isset($message) === FALSE){
//    $hide_domain = ' style="display:none"'; 
//}
?>

<div <?php echo $hide_domain  ?>>
    <label for="domain">
        <?php 
            //Domain name:
            echo $lang->line("mobile_apps.login.domain");
        ?>
    </label>

    <input type="text" name="domain" id="domain"
           value="<?php echo $domain; ?>" data-ajax="false" />    
</div>

<?php
// ----------------------------------------------------------------
?>

<label for="email">
    <?php
        //Username(email):
        echo $lang->line("mobile_apps.login.email");
    ?>
</label>

<input type="text" name="email" value="<?php echo $email ?>" id="email"
       data-clear-btn="true" data-mini="true" />

<?php
// ----------------------------------------------------------------
?>

<label>
    <?php
        //Password:
        echo $lang->line("mobile_apps.login.password");
    ?>
    <input type="password" name="password" value="<?php echo $password; ?>" 
           data-clear-btn="true" autocomplete="off" data-mini="true" />
</label>            

<?php
// ----------------------------------------------------------------
?>

<input type="hidden" name="referer_url" value="<?php echo $referer_url; ?>" />

<?php
// ----------------------------------------------------------------
// 底部的按鈕
?>
<button type="submit" name="do_login" value="true" 
        class="ui-btn ui-btn-a ui-shadow ui-corner-all" data-ajax="false">
    <?php 
        // Login
        echo $lang->line("mobile_apps.login.do_login");
    ?>
</button>

<a href="<?php echo site_url("mobile_apps/webpage_list"); ?>" 
   class="ui-btn ui-btn-b ui-shadow ui-corner-all" data-ajax="false">
    <?php
        //Skip
        if (isset($do_redirect) === FALSE) {
            echo $lang->line("mobile_apps.login.guest_login");
        }
        else {
            echo $lang->line("mobile_apps.login.back_to_redirect");
        }
    ?>
</a>

<?php
// --------------------------------
?>    
</form>
</div>
<?php
// --------------------------------