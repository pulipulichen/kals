<?php 
if (isset($_POST["user"]) && isset($_POST["password"])) {
    
    $pg_dump_path = "/usr/bin/pg_dump";
        if (DIRECTORY_SEPARATOR == "\\") {
            $possible_list = array(
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
                }
            }
        }
        
    //pg_dump kals -U kals -s -f kals-db-20131029-schema.backup.sql
    $sql_file = realpath("./kals-database.sql");
    echo '"' . $pg_dump_path . '" kals -U ' . $_POST["user"] . ' -s -f "' . $sql_file . '"';
    
    // 附加檔案到後面
    
}
else {
    ?>
<form method="post" action="export_database_schema.php">
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