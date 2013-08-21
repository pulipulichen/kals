<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title> add a node </title>
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
print '--->add a new node';
print '<pre>';
print '--->start';
print '<pre>';
print '===========================================================================';

 $body_text = $_POST["bodytext"];
 $vp = $_POST["vp"];
$titlee = $_POST["title"];
  $node = new stdClass();
  $node->type = 'viewsphpcontenttype';
 
  node_object_prepare($node);
  
  $node->title    = $titlee;
  $node->language = LANGUAGE_NONE;
  $node->uid = 1;
  $node->body[$node->language][0]['value']   = $body_text;
  $node->body[$node->language][0]['summary']   = text_summary($body_text);
  $node->body[$node->language][0]['format']  = 'filtered_html';
  $node->field_vp[$node->language][0]['value'] = $vp;
  
  $path = 'content/programmatically_created_node_' . date('YmdHis');
  $node->path = array('alias' => $path);

  node_save($node);

  print '<pre>';
  print 'node with nid:'.$node->nid.' saved!';
  print '<pre>';

    print '<pre>';
    print 'load node with nid:'.$node->nid;
    print '<pre>';
    print_r(node_load($node->nid));


  }

?>
<br>
<hr>
<form action="" method="post" name="form1">
title<INPUT TYPE = "TEXT" NAME="title" VALUE ="">
bodytext<INPUT TYPE = "TEXT" NAME="bodytext" VALUE ="">
vp<INPUT TYPE = "TEXT" NAME="vp" VALUE ="">
<input name="submit" type="submit" value="submit"></form>
</body>
</html>