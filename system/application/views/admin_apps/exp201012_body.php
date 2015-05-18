<table border="1" class="result-table" cellspacing="0" >
    <?php
    if (isset($title))
    {
        echo '<caption>'.$title.'</caption>';
    }

    if (isset($thead))
    {
        ?>
    <thead>
        <tr>
            <th>No.</th>
            <?php
            foreach ($thead AS $th)
            {
                echo '<th>'.$th.'</th>';
            }
            ?>
        </tr>
    </thead>
        <?php
    }
    if (isset($tbody))
    {
        ?>
    <tbody>
        <?php
        $row_odd = TRUE;
            foreach ($tbody AS $th => $tr)
            {
                if ($row_odd === TRUE)
                {
                    $row_class = 'odd';
                    $row_odd = FALSE;
                }
                else
                {
                    $row_class = 'even';
                    $row_odd = TRUE;
                }
                ?>
        <tr class="<?= $row_class ?>">
            <th><?= $th ?></th>
            <?php
                $col_odd = TRUE;
                foreach ($tr AS $td)
                {
                    if ($col_odd === TRUE)
                    {
                        $col_class = 'odd';
                        $col_odd = FALSE;
                    }
                    else
                    {
                        $col_class = 'even';
                        $col_odd = TRUE;
                    }
                    ?>
            <td class="<?= $col_class ?>"><?= $td ?></td>
                    <?php
                }
            ?>
        </tr>
                <?php
            }
        ?>
    </tbody>
        <?php
    }
    ?>
</table>