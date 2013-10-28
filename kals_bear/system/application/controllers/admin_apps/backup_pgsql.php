<?php
include_once 'admin_apps_controller.php';
/**
 * backup_pgsql
 *
 * backup_pgsql full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2011/9/30 下午 02:44:08
 */

class backup_pgsql extends Admin_apps_controller {

    function __construct() {
        parent::__construct();
    }

    function index() {
        ?>
<ul>
    <!-- <li><a href="<?php echo site_url("admin_apps/backup_pgsql/tables") ?>">tables</a></li> -->
        <?
        $tables = $this->db->list_tables();
        foreach ($tables as $table)
        {
            if (in_array($table, array('annotation2anchor_text'
                , 'annotation2like_count'
                , 'annotation2respond_count'
                , 'annotation2scope_length'
                , 'annotation2score'
                , 'annotation2topic_respond_count'
                , 'annotation_consensus'
                , 'scope2length'
                , 'webpage2annotation'
                , 'group2actor'
                )))
                    continue;

            ?>
    <li><a href="<?php echo site_url("admin_apps/backup_pgsql/data/".$table) ?>"><?php echo $table ?></a></li>
            <?php
        }
        ?>
</ul>
        <?php
        
    }

    function tables()
    {
        $this->load->view('admin_apps/backup_pqsql_table.php');

    }

    function data($table)
    {
        //echo $table;   //表格名稱

           $select = 'SELECT * FROM "'.$table.'"';

           $query = $this->db->query($select);

           //列出表格欄位名稱

            $fields_data = $this->db->field_data($table);
            $fields_type = array();
            foreach ($fields_data AS $field_data)
            {
                $name = $field_data->name;
                $type = $field_data->type;

                $fields_type[$name] = $type;
            }
            //$fields = $this->db->list_fields($table);

            foreach ($query->result_array() AS $row)
            {
                //INSERT INTO products (product_no, name) VALUES (1, 'Cheese');

                $fields = array_keys($row);

                $insert = 'INSERT INTO "'.$table.'" (';

                $field_list = '';
                $value_list = '';
                foreach ($fields AS $field)
                {
                    if ($field_list != '')
                        $field_list .= ', ';

                    $field_list .= $field;

                    if ($value_list != '')
                        $value_list .= ', ';

                    $type = $fields_type[$field];
                    //echo $type.";\n";
                    $value = $row[$field];
                    if ($value == '' && $field != 'text')
                    {
                        $value_list .= 'NULL';
                    }
                    else if ( in_array($type
                            , array("text", "varchar"))
                         || starts_with($type, "varying")
                        )
                    {
                        $value_list .= "'".addslashes ($row[$field])."'";
                    }
                    else if ($type == 'tsvector')
                    {
                        $value_list .= "TSVECTOR('".str_replace("'", "", $row[$field])."')";
                    }
                    else if ($type == 'timestamptz' || $type == 'timetz')
                    {
                        $value_list .= "timestamp with time zone '" . $row[$field] . "'";
                    }
                    else if ($type == "bool")
                    {
                        if ($value = 'f')
                            $value_list .= 'false';
                        else
                            $value_list .= 'true';
                    }
                    else
                        $value_list .= $row[$field];
                }

                $insert .= $field_list.") VALUES (";
                $insert .= $value_list.");\n\n";

                echo $insert;
                //return;

            }

    }

    /*
    function index() {

        //$this->load->view('admin_apps/backup_pqsql_table.php');

        $tables = $this->db->list_tables();

//        foreach ($tables as $table)
//        {
//           echo $table;
//        }

        foreach ($tables as $table)
        {
           //echo $table;   //表格名稱

           $select = 'SELECT * FROM "'.$table.'"';

           $query = $this->db->query($select);

           //列出表格欄位名稱

            $fields_data = $this->db->field_data($table);
            $fields_type = array();
            foreach ($fields_data AS $field_data)
            {
                $name = $field_data->name;
                $type = $field_data->type;

                $fields_type[$name] = $type;
            }
            //$fields = $this->db->list_fields($table);

            foreach ($query->result_array() AS $row)
            {
                //INSERT INTO products (product_no, name) VALUES (1, 'Cheese');

                $fields = array_keys($row);

                $insert = "INSERT INTO ".$table." (";

                $field_list = '';
                $value_list = '';
                foreach ($fields AS $field)
                {
                    if ($field_list != '')
                        $field_list .= ', ';

                    $field_list .= $field;

                    if ($value_list != '')
                        $value_list .= ', ';

                    $type = $fields_type[$field];
                    //echo $type.';';
                    if ( in_array($type
                            , array("text", "varchar"))
                         || starts_with($type, "varying")
                        )
                        $value_list .= "'".$row[$field]."'";
                    else
                        $value_list .= $row[$field];
                }
                $insert .= $field_list.") VALUE (";
                $insert .= $value_list.");\n\n";

                echo $insert;
                //return;

            }

//            foreach ($fields as $field)
//            {
//               echo $field;
//            }





        }
     */

}

/* End of file backup_pgsql.php */
/* Location: ./system/application/controllers/admin_apps/backup_pgsql.php */