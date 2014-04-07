<?php
    $pos = strpos($_SERVER["REQUEST_URI"], 'callback=');
    $callback = substr($_SERVER["REQUEST_URI"], $pos+9);

    $data = array();
    $data['exception'] = array(
        'heading' => $heading,
        'message' => $message,
        'request_uri' => $_SERVER["REQUEST_URI"]
    );

    $json = json_encode($data);

    //log區
    $array_data = $data;

    if (function_exists("get_context_user"))
    {
        $user = get_context_user();
        $user_id = NULL;
        if (isset($user))
            $user_id = $user->get_id();
    
        $action = 27;
        $CI =& get_instance();
        if (isset($CI->db)) {
            kals_log($CI->db, $action, array('memo'=>$array_data, 'user_id' => $user_id));
        }
        context_complete();
    }
    

    set_status_header(200);
    header("Content-type: application/x-javascript");

    ?>
<?= $callback ?>(<?= $json ?>);
<?php
