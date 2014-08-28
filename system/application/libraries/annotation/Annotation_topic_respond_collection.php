<?php
include_once 'Annotation_collection.php';
/**
 * Annotation_respond_collection
 *
 * 標註回應的集合
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/8 下午 05:10:18
 */
class Annotation_topic_respond_collection extends Annotation_collection {

    protected $table_name = 'annotation';
    protected $index_field = 'topic_id';
    protected $foreign_field = 'annotation_id';

    protected $class_table_name = 'annotation';
    protected $class_foreign_field = 'annotation_id';
    protected $class_name = 'Annotation';
    protected $class_path = 'kals_resource/Annotation';
    protected $class_fake_delete = 'deleted';
}


/* End of file Annotation_respond_collection.php */
/* Location: ./system/application/libraries/annotation/Annotation_respond_collection.php */