<form action="webpage_select" method="get" onsubmit="location.href='<?= base_url() ?>admin_apps/statistics/webpage_statistics/' + this.webpage_id.value;return false;">

    Webpage Select:
        <select name="webpage_id">
            <?php
            foreach ($all_webpages AS $webpage)
            {
                if (isset($selected_webpage) && $selected_webpage->get_id() == $webpage->get_id())
                    echo '<option value="'.$webpage->get_id().'" selected="selected">'.$webpage->get_url();
                else
                    echo '<option value="'.$webpage->get_id().'">'.$webpage->get_url();
                $title = $webpage->get_title();
                if ($title != '' && $title != NULL)
                    echo ': '.$webpage->get_title();
                echo '</option>';
            }
            ?>
        </select>
    <button type="submit">確定</button>
</form>

