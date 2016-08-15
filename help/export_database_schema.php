<?php 
if (isset($_POST["user"]) && isset($_POST["password"])) {
    
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