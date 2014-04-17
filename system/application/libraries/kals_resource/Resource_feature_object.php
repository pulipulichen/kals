<?php
/**
 * Resource_feature_object
 *
 * 標註特徵
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/6 下午 09:47:16
 * @example
 * 資料表建立：<code>

 * </code>
 */
class Resource_feature_object extends Generic_attribute_object {

    # Memver Varibles
    protected $resource_type_id;
    protected $type_id;
    protected $name;

    //------------------------------------
    # Generic Attribute Object

    protected $table_name = 'resource_feature';
    protected $primary_key = 'resource_feature_id';
    protected $table_fields = array('resource_feature_id', 'resource_id', 'resource_type_id','feature_type_id', 'value');
    protected $not_null_field = array('resource_id', 'resource_type_id' , 'feature_type_id');
    protected $default_field = 'value';

    protected $type_field = 'feature_type_id';

    public function  _pre_update($data) {

        if (isset($data['value']) && is_int($data['value'])) {
            $data['value'] = $data['value'].'';
        }
        return $data;
    }

    public function get_value() {
        return $this->get_field('value');
    }
}


/* End of file Resource_feature_object.php */
/* Location: ./system/application/libraries/annotation/Resource_feature_object.php */