<?php
/**
 * KALS_resource
 *
 * Domain、Webpage、Annotation的基本型態
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/27 下午 09:00:44
 */
class KALS_resource extends Generic_object {

    public $types = array(
        1 => 'Domain',
        2 => 'Webpage',
        3 => 'Annotation'
    );

    public function get_type_id()
    {
        return $this->resource_type_id;
    }

    public function find_resource($type_id, $id)
    {
        if (!isset($this->types[$type_id]))
            return NULL;
        
        $class_name = $this->types[$type_id];

        $resource = get_cache($class_name, $class_name.'_id', $id);
        if (is_null($resource))
        {
            $resource = new $class_name($id);
            set_cache($resource, $class_name.'_id', $id);
        }
        return $resource;
    }
}


/* End of file KALS_resource.php */
/* Location: ./system/application/libraries/kals_resource/KALS_resource.php */