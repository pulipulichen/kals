<?php
/**
 * Output_language_variable_collection
 *
 * 輸出語言變數合集
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/11 下午 11:39:44
 */
class Output_language_variable_collection extends Collection {

    private $types = array(
        0 => 'Output_language_variable_low',
        1 => 'Output_language_variable_medium',
        2 => 'Output_language_variable_high'
    );

    private $type_dir = 'fuzzy/';

    private $recommend_threshold;

    public function  __construct() {
        parent::__construct();
        foreach ($this->types AS $type_id => $class_name)
        {
            $item = $this->create_item($type_id);
            $this->members[$type_id] = $item;
        }
    }

    /**
     * @param int $type_id
     * @param double $membership
     * @return Output_language_variable
     */
    public function create_item($type_id, $membership = NULL)
    {
        if (FALSE === isset($this->types[$type_id]))
            return NULL;
        $class_name = $this->types[$type_id];
        $class_path = $this->type_dir.$class_name;
        $this->_CI_load('library', $class_path, strtolower($class_name));
        
        $item = new $class_name();
        if (isset($membership))
            $item->membership = $membership;
        return $item;
    }

    public function get_members()
    {
        return $this->members;
    }

    public function get_membership($type_id)
    {
        $item = $this->get_item($type_id);
        if (isset($item))
            return $item->membership;
        else
            return NULL;
    }

    public function set_membership($type_id, $membership)
    {
        $item = $this->get_item($type_id);
        if (isset($item))
            $item->membership = $membership;
        return $this;
    }

    public function set_memberships($memberships)
    {
        foreach ($memberships AS $type_id => $membership)
        {
            $this->set_membership($type_id, $membership);
        }
        return $this;
    }

    /**
     * @return array
     */
    public function get_membership_array()
    {
        $ms_array = array();
        foreach ($this->types AS $type_id => $class_name)
        {
            $membership = $this->get_membership($type_id);
            $ms_array[$type_id] = $membership;
        }
        return $ms_array;
    }

    /**
     * 解模糊：將member以重心法解模糊計算
     * @return double 解模糊結果
     */
    public function get_defuzzy_code()
    {
        //利用重心法來計算！！

        $numerator = 0;     //分子，membership * code的總和
        $denominato = 0;    //分母，membership的總和

        foreach ($this->members AS $member)
        {
            $numerator = $numerator + $member->membership * $member->code;
            $denominato = $denominato + $member->membership;
        }
        $fuzzy_code = $numerator / $denominato;
        return $fuzzy_code;
    }

    /**
     * 以某種方法計算成員之後，得出推薦的門檻
     * @return double
     */
    public function get_recommend_threshold()
    {
        if (is_null($this->recommend_threshold))
        {
            $sum = 0;
            foreach ($this->members AS $member)
                $sum = $sum + $member->code;
            $this->recommend_threshold = $sum / count($this->members);
        }
        return $this->recommend_threshold;
    }

    public function get_number()
    {
        return count($this->types);
    }

    public function set_zero()
    {
        foreach ($this->types AS $type_id => $type)
        {
            $this->set_membership($type_id, 0);
        }
        return $this;
    }
}

/* End of file Output_language_variable_collection.php */
/* Location: ./system/application/libraries/fuzzy/Output_language_variable_collection.php */