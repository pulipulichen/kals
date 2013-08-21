<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title> load a node </title>
</head>
<body>


<?php
if($_POST["submit"]=="submit"){

header ('Content-Type: text/html; charset=utf-8');
define('DRUPAL_ROOT', getcwd());

require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);


//Your code will go here.

$nid = $_POST["nid"];
print '<pre>';
print '--->loads a node';
print '<pre>';
print '--->start';
print '<pre>';
print '===========================================================================';
print '<pre>';
print_r(node_load($nid));
print '--->End';
print '</pre>';
  }

?>
<br>
<hr>
<form action="" method="post" name="form1"><INPUT TYPE = "TEXT" NAME="nid" VALUE =""><input name="submit" type="submit" value="submit"></form>
</body>
</html>