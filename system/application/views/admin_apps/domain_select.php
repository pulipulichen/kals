<form action="webpage_select" method="get" onsubmit="location.href='<?= base_url() ?>admin_apps/statistics/webpage_select/' + this.domain_id.value;return false;">

    Domain Select: 
        <select name="domain_id">
            <?php
            foreach ($all_domains AS $domain)
            {
                if (isset($selected_domain) && $selected_domain->get_id() == $domain->get_id())
                    echo '<option value="'.$domain->get_id().'" selected="selected">'.$domain->get_host();
                else
                    echo '<option value="'.$domain->get_id().'">'.$domain->get_host();
                $title = $domain->get_title();
                if ($title != '' && $title != NULL)
                    echo ': '.$domain->get_title();
                echo '</option>';
            }
            ?>
        </select>
    <button type="submit">確定</button>
</form>

