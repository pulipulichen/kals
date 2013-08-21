<?php
// gsynuh image uploader config file

require_once('secure.php');

//White list of accepted file extensions (in lowercase) :
$ext_whitelist = array("jpg","gif","png","jpeg");

//White list of accepted file types (mime) :
$mime_whitelist = array("image/jpeg","image/gif","image/png","image/jpg");

//max file size in Kb (1Mb = 1024kb remember :D)
//warning php's ini is usually 2Mb by default and changing the value here will not override it. (in case you want a bigger file size
$max_file_size = 1024*4 ;

//upload directory relative to upload.php directory.<br>
// /../../../ -> this pattern gets you on the same level as tiny_mce's folder.
// "/" will be replaced with "\" automatically.
$upload_folder = "/../../../../../content/uploads/";

//The url that will prepend the filename in the img src
$upload_url = "http://127.0.0.1/site/content/uploads/";

/*

THUMBNAILS SETTINGS

*/

$do_thumb = true;

$thumb[0]["max_width"] = 400 ;
$thumb[0]["max_height"] = 300 ;
$thumb[0]["suffix"] = "_medium" ;

?>