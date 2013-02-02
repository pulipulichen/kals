<?php
require_once 'Annotation_type.php';
/**
 * Annotation_type_custom
 *
 * 標註類型：自訂
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/6 下午 08:54:45
 */
class Annotation_type_custom extends Annotation_type {

    # Memver Varibles
    protected $annotation_type_id = 7;
    protected $name = 'annotation.type.custom';

    private $custom_name = NULL;

    public function set_type_id($type_id)
    {
        $this->annotation_type_id = $type_id;
        return $this;
    }

    public function  get_custom_name()
    {
        if (is_null($this->custom_name))
            return parent::get_custom_name();
        else
            return $this->custom_name;
    }

    /**
     * 設定自定名稱
     * @version 20111104 Pudding Chen 存入資料庫的工作交給TypeFactory吧。這邊的Annotation_type只是一個單純的Framework而已喔。
     * @param String $custom_name
     * @return Annotation_type_custom
     */
    public function set_custom_name($custom_name)
    {
        $this->custom_name = $custom_name;
        return $this;
    }

    public function export_data()
    {
        $type_id = $this->get_type_id();
        if ($type_id == 7)
        {
            return $type_id;
        }
        else
        {
            return $this->get_custom_name();
        }
    }

    public function  is_basic() {

        if (is_null($this->custom_name))
            return true;
        else
            return false;

    }
}


/* End of file Annotation_type_custom.php */
/* Location: ./system/application/libraries/type/Annotation_type_custom.php */