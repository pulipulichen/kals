<form method="POST">
    <?php
    if (isset($message)) {
        echo $message;
    }
    ?>
    <textarea name="note">測試</textarea>
    <button type="submit">儲存</button>
</form>