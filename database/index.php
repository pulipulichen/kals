<?php 
if (isset($_POST["user"]) && isset($_POST["password"])) {
    
    $pg_dump_path = "/usr/bin/pg_dump";
        if (DIRECTORY_SEPARATOR == "\\") {
            $possible_list = array(
                'D:\\Program Files\\PostgreSQL\\9.5\bin\\pg_dump.exe',
                'D:\\Program Files\\PostgreSQL\\9.2\bin\\pg_dump.exe',
                'C:\\Program Files\\PostgreSQL\\9.2\bin\\pg_dump.exe',
                'D:\\Program Files\\PostgreSQL\\8.4\bin\\pg_dump.exe',
                'C:\\Program Files\\PostgreSQL\\8.4\bin\\pg_dump.exe',
                'D:\\Program Files\\PostgreSQL\\8.3\bin\\pg_dump.exe',
                'C:\\Program Files\\PostgreSQL\\8.3\bin\\pg_dump.exe'
            );
            foreach ($possible_list AS $path) {
                if (is_file($path)) {
                    $pg_dump_path = $path;
                    break;
                }
            }
        }
        
    //pg_dump kals -U kals -s -f kals-db-20131029-schema.backup.sql
    $sql_file = realpath("./kals-database.sql");
    $exec = 'SET PGPASSWORD=' . $_POST["password"] . '
"' . $pg_dump_path . '" -U ' . $_POST["user"] . ' -s -f "' . $sql_file . '" kals';
    $bat = "script.bat";
    file_put_contents($bat, $exec);
    exec($bat);
    unlink($bat);
    
    // ------------------------------------------------------------
    
    // 附加檔案到後面
    $sql = file_get_contents("kals-database.sql");
    $lock = "-- KALS export completed";
    
    function endsWith($haystack, $needle) {
        // search forward starting from end minus needle length characters
        return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== false);
    }
    
    // 防止重複附加檔案
    if (endsWith($sql, $lock) === FALSE) {
        $append = file_get_contents("append.sql");
        $append .= "\n" . $lock;
        file_put_contents("kals-database.sql", $sql . $append);
    }
    
}
else {
    ?>
<form method="post" action=".">
    <h1>Export Database Schema</h1>
    <label>
        User <input type="text" name="user" />
    </label>
    <label>
        Password <input type="text" name="password" />
    </label>
    <button type="submit">Submit</button>
</form>
    <?php
}