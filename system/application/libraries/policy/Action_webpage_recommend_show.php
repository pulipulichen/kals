<?php
require_once 'Action.php';
/**
 * Action_webpage_recommend_show
 *
 * 初始化會讀取Webpage的Recommend Annotation的Action
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/25 下午 04:21:08
 */
class Action_webpage_recommend_show extends Action {

    var $action_id = 4;
    var $lang = 'action.webpage.recommend_show';
    var $applicable_resource_type_id = 2;
    var $default_allow = FALSE;

}


/* End of file Action_webpage_recommend_show.php */
/* Location: ./system/application/libraries/policy/Action_webpage_recommend_show.php */