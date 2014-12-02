<?php
/**
 * Generic_object_collection
 *
 * 大部分集合(Collection)的原形
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/28 下午 09:16:54
 */
class Generic_object_collection extends KALS_object {

    // Properties (Member Variables)
    public $table_name;
    public $class_name;
    public $primary_key;

    private $items_pre_page;
    private $item_count = 0;

    private $id_array;
    private $obj_array;

    public function  __construct($table_name, $class_name)
    {
        parent::__construct();
        $this->table_name = $table_name;
        $this->class_name = $class_name;
        return $this;
    }

    public function add_tuple($id)
    {
        if (is_null($this->id_array))
        {
            $this->id_array = array();
        }
        array_push($this->id_array, $id);
        $this->item_count = count($this->id_array);
        return $this;
    }

    public function set_page_size($items_per_page)
    {
        $this->items_pre_page = $items_per_page;
        return $this;
    }

    public function get_item_count()
    {
        return $this->item_count;
    }

    public function get_num_pages()
    {
        return (ceil($this->item_count / $this->items_pre_page));
    }

    private function _get_comma_separated_id_list($start_lim = 0, $end_lim = -1)
    {
        $s = '';
        if ($end_lim == -1)
            $end_lim = count($this->id_array) -1;
        for ($i = $start_lim; $i <= $end_lim; $i++)
        {
            if (is_numeric($this->id_array[$i]))
            {
                $s = $s.$this->id_array[$i].',';
            }
        }
        if (strlen($s) > 0)
        {
            $s = substr($s, 0, strlen($s) - 1);
        }
        return $s;
    }

    private function _get_index_from_tuple_id($tuple_id)
    {
        $index = -1;
        if (is_array($this->id_array))
        {
            foreach ($this->id_array AS $key => $id)
            {
                if ($value == $tuple_id)
                    $index = $key;
            }
        }
        return $index;
    }

    public function populate_object_array($page_num = 0)
    {
        
        if ($this->item_count > 0)
        {
            $pk = $this->_get_pk();

            $db = $this->db;
            $db->from($this->table_name);

            if ($page_num > 0)
            {
//                $items_per_page = $this->items_pre_page;
//
//                $start_lim = ($items_per_page * ($page_num - 1));
//                $end_lim = ($start_lim + $items_per_page) - 1;
//                if ($end_lim > ($this->item_count-1))
//                    $end_lim = $this->item_count - 1;
                $lim = $this->_calculate_page_limit($page_num);

                $list = $this->_get_comma_separated_id_list($lim['start'], $lim['end']);
                
                $db->where_in($pk, $list);
            }
            else
            {
                $list = $this->_get_comma_separated_id_list();
                $db->where_in($pk, $list);
            }

            $query = $db->get();

            foreach ($query->result_array() AS $row)
            {
                $this_db_row_id = $row[$pk];
                $this_index = $this->_get_index_from_tuple_id($this_db_row_id);
                if ($this_index >= 0)
                {
                    $ref_obj_array_index_obj = &$this->obj_array[$this_index];
                    $script = "\$ref_obj_array_index_obj = new ".$this->class_name.'('.$this_db_row_id.');';
                    eval ($script);

                    $ref_obj_array_index_obj->force_loaded();
                    $ref_obj_array_index_obj->set_field($row);
                }
            }
        }   //if ($this->item_count > 0)
        return $this;
    }

    public function retrieve_populated_objects($page_num = 0)
    {
        if ($page_num > 0)
        {
            $lim = $this->_calculate_page_limit($page_num);
            $return_array = array();
            $counter = 0;
            for ($i = $lim['start']; $i <= $lim['end']; $i++)
            {
                /**
                 * @var Generic_object $obj
                 */
                $obj = $this->obj_array[$i];
                $return_array[$counter] = $obj;
                $counter++;
            }
            return ($return_array);
        }
    }

    public function retrieve_objects($page_num = 0)
    {
        $this->populate_object_array($page_num);
        return $this->retrieve_populated_objects($page_num);
    }

    private function _calculate_page_limit($page_num = 0)
    {
        $items_per_page = $this->items_pre_page;

        //計算開始與結束的頁數
        $start_lim = ($items_per_page * ($page_num -1));
        $end_lim = ($start_lim + $items_per_page) - 1;
        if ($end_lim > ($this->item_count - 1))
            $end_lim = $this->item_count -1;
        else
        {
            $start_lim = 0;
            $end_lim = $this->item_count - 1;
        }
        return array(
            'start' => $start_lim,
            'end' => $end_lim
        );
    }

    private  function _get_pk()
    {
        if (FALSE === is_null($this->primary_key))
            return $this->primary_key;
        else if (FALSE === is_null($this->table_name))
            return $this->table_name.'_id';
        else
            return 'id';
    }
}



/* End of file Generic_object_collection.php */
/* Location: ./system/application/libraries/Generic_object_collection.php */