<?php
/**
 * Resource_feature_collection
 *
 * 標註的其他特徵
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/10 上午 01:35:59
 */
class Resource_feature_collection extends Generic_attribute_collection {

    # Memver Varibles
    protected $table_name = 'resource_feature';
    protected $index_field = 'resource_feature_id';
    protected $type_field = 'feature_type_id';
    protected $data_fields = array('resource_feature_id', 'resource_id', 'resource_type_id','feature_type_id', 'value');

    //protected $class_name = array(
    //    1 => 'Annotation_feature_location',
    //    2 => 'Annotation_feature_recommend_scope'
    //);
    //protected $class_dir = 'annotation/';
}


/* End of file Resource_feature_collection.php */
/* Location: ./system/application/libraries/annotation/Resource_feature_collection.php */