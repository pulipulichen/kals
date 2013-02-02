<?php
/**
 * Annotation_type
 *
 * 標註類型
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/6 下午 08:52:39
 */
class Annotation_type {

    protected $annotation_type_id;
    protected $name;
    protected $_is_basic_annotation_type = true;

    public function get_type_id()
    {
        return $this->annotation_type_id;
    }

    public function get_name()
    {
        return $this->name;
    }

    public function get_custom_name()
    {
        return $this->name;
    }

    public function export_data()
    {
        return $this->get_type_id();
    }

    /**
     * 是否是基本的標註類型
     * 像是重點、質疑、舉例等等。沒有自訂其他標註類型的「自訂」，也算是基本類型喔。
     * @version 20111104 Pudding Chen
     * @return boolean
     */
    public function is_basic()
    {
        return $this->_is_basic_annotation_type;
    }
}


/* End of file Annotation_type.php */
/* Location: ./system/application/libraries/type/Annotation_type.php */