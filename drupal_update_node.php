<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title> update a node </title>
</head>
<body>

<?php
if($_POST["submit"]=="submit"){

header ('Content-Type: text/html; charset=utf-8');
define('DRUPAL_ROOT', getcwd());

require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

//Code will go here.

$nid = $_POST["nid"];
$vp = $_POST["vp"];
$node = node_load($nid);
$node->field_vp[$node->language][0]['value'] = $vp;
node_save($node);}

?>

<br>
<hr>
<form action="" method="post" name="form1">
Nid<INPUT TYPE = "TEXT" NAME="nid" VALUE ="">
Vp<INPUT TYPE = "TEXT" NAME="vp" VALUE ="">
<input name="submit" type="submit" value="submit"></form>
</body>
</html>