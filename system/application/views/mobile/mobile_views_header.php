<?php
/**
 * mobile_views_header
 * 
 * @package		KALS
 * @category		View
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2013, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2013/11/19 下午 03:51:22
 */

?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0 ,user-scalable = 0" >
	<title>KALS標註編輯</title> 
      
        
        <!-- load jQuery & css & jQuery mobile -->
        <script type="text/javascript" src="<?php echo base_url(); ?>libraries/jquery-mobile/jquery.js"></script>
        <script type="text/javascript" src="<?php echo base_url(); ?>libraries/jquery-mobile/index.js"></script>
        <script type="text/javascript" src="<?php echo base_url(); ?>libraries/jquery-mobile/jquery.mobile-1.4.1.min.js"></script>
        
        <link rel="stylesheet" href="<?php echo base_url(); ?>libraries/jquery-mobile/jquery.mobile-1.4.0.min.css" />
        <link rel="stylesheet" href="<?php echo base_url(); ?>libraries/jquery-mobile/jqm-demos.css" />
        <link rel="stylesheet" href="<?php echo base_url(); ?>libraries/jquery-mobile/jquery-mobile-kals.css" />
        <link type ="text/css" rel="stylesheet" href="<?php echo base_url(); ?>web_apps/generic/style" />
        <script>

         $(function(){
	      $( "[data-role='header'], [data-role='footer']" ).toolbar();
          });
       </script>
        
   </head>
   <body class="KALS">
<!-- header -->