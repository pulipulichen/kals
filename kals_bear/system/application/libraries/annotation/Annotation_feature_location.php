<?php
include_once 'Annotation_feature.php';
/**
 * Annotation_feature_location
 *
 * 標註特徵：所在位置
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/10 下午 12:29:28
 */
class Annotation_feature_location extends Annotation_feature {

    # Memver Varibles
    protected $type_id = 1;
    protected $name = 'annotation.feature.location';

    //value:
    //0 => head
    //1 => foot
    //2 => near head & foot
    //3 => near head
    //4 => near foot
    //5 => body

}


/* End of file Annotation_feature_location.php */
/* Location: ./system/application/libraries/annotation/Annotation_feature_location.php */