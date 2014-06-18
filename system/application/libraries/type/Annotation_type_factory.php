<?php
/**
 * Annotation_type_factory
 *
 * 製作標註類型的工廠
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/6 下午 09:03:36
 */
class Annotation_type_factory extends KALS_object {

    private $types = array(
        1 => 'importance',
        2 => 'question',
        3 => 'confusion',
        4 => 'summary',
        5 => 'concept',
        6 => 'example',
        7 => 'custom'
    );

    /**
     * @var Type
     */
    private $type;

    public function  __construct() {
        parent::__construct();

        $this->_CI_load('library', 'type/Type_factory', 'type_factory');
        $this->type_factory = $this->CI->type_factory;
    }

    # Methods
    /**
     * @param int|String $type_id
     * @return Annotation_type
     */
    public function create($type_id)
    {
//        $type = NULL;
//        switch ($type_id)
//        {
//            case 1:
//            case 'annotation.type.importance':
//                $this->CI->load->library('type/Annotation_type_importance');
//                $type = $this->CI->annotation_type_importance;
//                break;
//            case 2:
//            case 'annotation.type.question':
//                $this->CI->load->library('type/Annotation_type_question');
//                $type = $this->CI->annotation_type_question;
//                break;
//            case 3:
//            case 'annotation.type.confusion':
//                $this->CI->load->library('type/Annotation_type_confusion');
//                $type = $this->CI->annotation_type_confusion;
//                break;
//            case 4:
//            case 'annotation.type.summary':
//                $this->CI->load->library('type/Annotation_type_summary');
//                $type = $this->CI->annotation_type_summary;
//                break;
//            case 5:
//            case 'annotation.type.concept':
//                $this->CI->load->library('type/Annotation_type_concept');
//                $type = $this->CI->annotation_type_concept;
//                break;
//            case 6:
//            case 'annotation.type.example':
//                $this->CI->load->library('type/Annotation_type_example');
//                $type = $this->CI->annotation_type_example;
//                break;
//            case 7:
//            case 'annotation.type.custom':
//            default:
//                $this->CI->load->library('type/Annotation_type_custom');
//                $type = $this->CI->annotation_type_custom;
//                break;
//        }
        //$type = NULL;
        $name = $type_id;
        
        if (is_int($type_id))
        {
            if (isset($this->types[$type_id]))
            {
                $name = $this->types[$type_id];
            }
            else
            {
                return $this->get_custom_type($type_id);
            }
        }
        else if (is_string($type_id))   //如果$type_id是字串
        {
            $name = $this->get_type_name($type_id);

            if (in_array($name, $this->types) == false)
            {
                return $this->get_custom_type($type_id);
            }
        }
        else if (is_null($name))
        {
            return NULL;
        }

        if (isset($this->CI->annotation_type_object)) {
            unset($this->CI->annotation_type_object);
        }
        $this->CI->load->library('type/Annotation_type_'.$name, NULL, 'annotation_type_object');

        /*
        if (isset($this->CI->annotation_type_object) === FALSE)
        {
            $classname = 'Annotation_type_' . $name;
            $filename = $classname.'.php';

            $is_custom_name = false;

            if (file_exists($filename) == false)
            {
                $name = $this->types[7];    //custom
                $filename = 'Annotation_type_' . $name . '.php';

                $is_custom_name = true;
            }

            require_once $filename;
            $this->CI->annotation_type_object = new $classname();

            if ($is_custom_name == true)
            {
                $custom_type = $this->type->create_type($name);
                $this->CI->annotation_type_object->set_type_id($custom_type->get_id())
                        ->set_custom_name($name);
            }
        }
         */
        return $this->CI->annotation_type_object;
    }

    private function get_type_name($type_name)
    {
        if (!is_string($type_name))
            return NULL;

        $index = strrpos($type_name, '.');
        if (FALSE === $index)
            $name = $type_name;
        else
            $name = substr($type_name, $index + 1);
        return $name;
    }

    /**
     * 取得所有的標註類型
     * @return Array|Annotation_type
     */
    public function get_total_types()
    {
        $total = array();

        foreach ($this->types AS $type_id => $name)
        {
            $type = $this->create($name);
            $total[$type_id] = $type;
        }
        return $total;
    }

    /**
     * 端看輸入的資料，來決定要回傳那種Annotation_type
     * @param int|string $type_id
     * @return Annotation_type
     */
    public function filter_type_id($type_id) {
        $int_type_id = intval($type_id);
        //test_msg("filter_type_id", array(is_string($type_id), intval($type_id), $type_id, $int_type_id,  strval($int_type_id), ($type_id !== strval($int_type_id))  ));
        if (is_string($type_id)
            && $type_id !== strval($int_type_id)  ) {
            $type_id = $this->create($type_id)->get_type_id();
        }
        else if (is_object($type_id)) {
            $type_id = $type_id->get_type_id();
        }
        else if (is_string($type_id)
                && $type_id === strval($int_type_id)) {
            $type_id = $int_type_id;
        }
        //如果是int，則直接回傳吧

        return $type_id;
    }

    /**
     * 計算出自訂標註
     * @param string|int $type_id
     * @return Annotation_type
     */
    public function get_custom_type($type_id)
    {
        //$custom_type, $type;
        $name = NULL;
        $type = NULL;
        if (is_int($type_id))
        {
            $type = $this->type_factory->find('type_id', $type_id);

            if ($type == NULL)
                return NULL;
        }
        else    //字串或其他
        {
            $name = $type_id;
            $type = $this->type_factory->create_type($name);
        }
        
        $filename = 'Annotation_type_custom.php';
        require_once $filename;
        $custom_type = new Annotation_type_custom();

        $custom_type->set_type_id($type->get_id())
                ->set_custom_name($type->get_name());
        return $custom_type;
    }

        
    /**
     * 取得type的Object
     * @version 20140512 Pudding Chen
     * @param number|string $type_name 要查詢的值。
     *  可以是數字(那應該就是type_id)，
     *  也可以是字串，那會查詢並轉換成type_id。
     */
    public function filter_object($type_name) {
        if (is_int($type_name)) {
            return new Annotation_type($type_name);
        }
        else if (is_string($type_name)){
            $type = $this->create($type_name);
            return $type;
        }
        else {
            return null;
        }
    }
    
}


/* End of file Annotation_type_factory.php */
/* Location: ./system/application/libraries/type/Annotation_type_factory.php */