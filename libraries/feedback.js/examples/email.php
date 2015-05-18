<?php
if(isset($_GET['p2'])  && isset($_POST['p1'])) {
        $text=$_GET['p2'];
        $imageData=$_POST['p1'];
}

$text = "test";
$imageData = json_decode($_POST["data"]);
$parts = explode(',', $imageData[1]);
$encodedData = str_replace(' ','+',$parts[1]); 
$data = base64_decode($encodedData);  
$data = $imageData[1];
//file_put_contents("log.js", $imageData);
//file_put_contents("log.js", $_POST["data"]);
//file_put_contents("log.js", $imageData[1]);
file_put_contents("log.js", $data);

$filename="test.png"; 
$encoding = "base64"; 
$type = "image/png";

$subject = $_POST["data"][0]['Issue'];

if($text==NULL) {
        $text = "The user has not entered any message.";
}

require("PHPMailer_5.2.0/class.phpmailer.php");

$mail= new PHPMailer();
$mail->IsSendmail();
$mail->FromName= "布丁布丁吃布丁";
$mail->AddAddress("pulipuli.chen@gmail.com", "Support Team");
$mail->From= "puddingchen.35@gmail.com";
//$mail->AddStringAttachment($data, $filename, $encoding, $type);
$mail->Body ="Issue:".'<br/><br/>'.$text.'<br/><br/>';
$mail->IsHTML(true);
$mail->Subject= $subject;

$mail->Send();

//file_put_contents("log.txt", json_encode($data));
