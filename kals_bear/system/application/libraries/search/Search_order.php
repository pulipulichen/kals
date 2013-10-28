<?php
/**
 * Search_order
 *
 * 搜尋的排序選項
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/13 下午 04:58:24
 */
class Search_order {

    public $type_id;
    public $name;
    public $desc = TRUE;

    public function get_type_id()
    {
        return $this->type_id;
    }

    public function get_name()
    {
        return $this->name;
    }
    public function is_desc()
    {
        return $this->desc;
    }

    public function get_direction()
    {
        if (is_bool($this->desc))
        {
            if ($this->desc)
                return 'desc';
            else
                return 'asc';
        }
        else
            return 'randam';
    }

    public function set_desc($is)
    {
        $this->desc = $is;
        return $this;
    }

    public function setup_order(CI_DB_active_record $db)
    {
        return $db;
    }
}


/* End of file Search_order.php */
/* Location: ./system/application/libraries/search/Search_order.php */