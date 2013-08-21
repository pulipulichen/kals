<?php
//config
require_once('config.php');
//image
require_once('unsharp.php');



  $done= false;
  $msg = "";
  
if((!empty($_FILES["uploaded_file"])) && ($_FILES['uploaded_file']['error'] == 0)) {

  $filename = basename($_FILES['uploaded_file']['name']);
  $fn = strtolower($filename) ; 
  $ext = split("[/\\.]", $fn) ; 
  $n = count($ext)-1; 
  $ext = $ext[$n]; 
  
  $filen = substr($_FILES['uploaded_file']['name'], 0, -(strlen($ext)+1) ); 
  
  $filen = preg_replace("/[^a-zA-Z0-9]/", "", $filen);
  
  $upload_folder = str_replace("/","\\",$upload_folder);
  
  $final_url = $upload_url.$filen.".".$ext; 
  $thumb_url = $upload_url.$filen.$thumb[0]["suffix"].".".$ext;
  
  if (in_array($ext,$ext_whitelist) && in_array($_FILES["uploaded_file"]["type"],$mime_whitelist) && 
    ($_FILES["uploaded_file"]["size"] < ($max_file_size * 1024))) {
    //path to upload dir
      $newname = dirname(__FILE__).$upload_folder.$filename;
	  $newname = dirname($newname)."\\".$filen.".".$ext;
      //file exists?
      if (!file_exists($newname)) {
		  
		  //create thumbnails.
		  if($do_thumb && !empty($thumb)) {
		  	
			$fullSize = getimagesize($_FILES['uploaded_file']['tmp_name']);
			
			$w = $fullSize[0];
			$h = $fullSize[1];

			
			
			foreach($thumb as $tsetting){
			if ( ($w > $tsetting["max_width"]) or ($h > $tsetting["max_height"]) ) 
			
			{	
				switch($ext) {
 				  case "png" :
 				  $fullImage = imagecreatefrompng($_FILES['uploaded_file']['tmp_name']);
				  break;
 				  case "gif" :
				  $fullImage = imagecreatefromgif($_FILES['uploaded_file']['tmp_name']);
				  break;
				  default :
				  $fullImage = imagecreatefromjpeg($_FILES['uploaded_file']['tmp_name']);
				  break;
				}
		
		$scale=1;
		
			if($fullSize[0]>$fullSize[1]) {
			$scale = $fullSize[0]/$tsetting["max_width"];
			}else{
			$scale = $fullSize[1]/$tsetting["max_height"];
			}
			
			
			$tnImage = imagecreatetruecolor($fullSize[0]/$scale, $fullSize[1]/$scale);
			
			imagecopyresampled($tnImage,$fullImage,0,0,0,0,$fullSize[0]/$scale,$fullSize[1]/$scale,$fullSize[0],$fullSize[1]);
			
			$tnImage = UnsharpMask($tnImage, 80, 0.5, 3); 
			
				switch($ext) {
 				  case "png" :
 				  imagepng($tnImage, dirname(__FILE__).$upload_folder."\\".$filen.$tsetting["suffix"].".png");
				  break;
 				  case "gif" :
				  imagegif($tnImage, dirname(__FILE__).$upload_folder."\\".$filen.$tsetting["suffix"].".gif");
				  break;
				  default :
				  imagejpeg($tnImage, dirname(__FILE__).$upload_folder."\\".$filen.$tsetting["suffix"].".".$ext);
				  break;
				}
				
				 imagedestroy($tnImage);		
			
			}else{
			 //do not create thumbs...
			 $thumb_url = $final_url;
			 }
		  }
		  }else{
		  //do not create thumbs...
			 $thumb_url = $final_url;
		  }
		  
        //move uploaded files from temp to upload dir
        if ((move_uploaded_file($_FILES['uploaded_file']['tmp_name'],$newname))) {
           $msg = "It's done! The file has been saved as: ".$final_url;
		   $done = true;
        } else {
           $msg = "Error: A problem occurred during file upload!";
        }
      } else {
         $msg = "Error: File ".$filen.".".$ext." already exists";
      }
  } else {
     $msg = "Error: File type is wrong or it's not under ".$max_file_size."Kb";
  }
} else {
 $msg = "Something went wrong : php error #".$_FILES['uploaded_file']['error'];
}
?>
<html>
<head>
<script type="text/javascript" src="../../tiny_mce_popup.js"></script>
</head>
<body>
<?php if ($done) { ?>
<script type="text/javascript">
parent.GsImUpDialog.insert('<?php echo $final_url; ?>','<?php echo $thumb_url; ?>');
</script>
<?php }else{ ?>
<script type="text/javascript">
alert("<?php echo htmlentities($msg) ;?>");
parent.tinyMCEPopup.close();
</script>
<?php } ?>
</body>
</html>