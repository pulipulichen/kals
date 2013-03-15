<?php
//$pound_cfg_path = "pound.cfg";
$pound_cfg_path = "/etc/pound.cfg";
$pound_excute_path = "/etc/init.d/pound";

$pound_content = $_POST["pound_content"];
$saved = false;

if (isset($pound_content))
{
    file_put_contents($pound_cfg_path, $pound_content);

    //Restart
    //Apache user cannot restart Pound. So it's not work.
    
    //if (file_exists($pound_excute_path))
    //{
    //    $cmd = $pound_excute_path.' restart';
    //    shell_exec($cmd);
    //}
    $saved = true;
}
else
{
    $pound_content = file_get_contents($pound_cfg_path);
}

$pound_content = stripslashes($pound_content);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>pound.cfg editor</title>
</head>

<body>
    <h1>pound.cfg editor</h1>
    <form method="post" style="text-align: center;width: 320px;">
    <?php
    if ($saved === TRUE)
    {
        ?>
        <span style="color:red;">Saved successfully. Please restart server manually to make the configuration effective.</span>
        <?php
    }
    ?>
        <textarea name="pound_content" style="display:block;width: 320px;height: 480px;"><?php echo $pound_content; ?></textarea>
        <button type="submit">Save</button>
    </form>
</body>
</html>