<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title> add a user </title>
</head>
<body>


<?php
if($_POST["submit"]=="submit"){

header ('Content-Type: text/html; charset=utf-8');
define('DRUPAL_ROOT', getcwd());

require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);


//Your code will go here.
print '<pre>';
print '--->add a new user';
print '<pre>';
print '--->start';
print '<pre>';
print '===========================================================================';

 //This will generate a random password, you could set your own here
  $password = $_POST["password"];
    $name = $_POST["name"];
      $eemail = $_POST["eemail"];
 
  //set up the user fields
  $fields = array(
    'name' => $name,
    'mail' =>  $eemail,
    'pass' => $password,
    'status' => 1,
    'init' => 'email address',
    'roles' => array(
      DRUPAL_AUTHENTICATED_RID => 'authenticated user',
    ),
  );
 
  //the first parameter is left blank so a new user is created
  $account = user_save('', $fields);
 
  // If you want to send the welcome email, use the following code
 
  // Manually set the password so it appears in the e-mail.
  $account->password = $fields['pass'];
 
  // Send the e-mail through the user module.
  drupal_mail('user', 'register_no_approval_required', $email, NULL, array('account' => $account), variable_get('site_mail', 'noreply@example..com'));
  
  
  
  print '<pre>';
  print 'user with name:'.$account->name.' saved!';
  print '<pre>';




  }

?>
<br>
<hr>
<form action="" method="post" name="form1">
name<INPUT TYPE = "TEXT" NAME="name" VALUE ="">
email<INPUT TYPE = "TEXT" NAME="eemail" VALUE ="">
password<INPUT TYPE = "TEXT" NAME="password" VALUE ="">
<input name="submit" type="submit" value="submit"></form>
</body>
</html>