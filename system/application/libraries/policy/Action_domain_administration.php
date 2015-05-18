<?php
require_once 'Action.php';
/**
 * Action_domain_administration
 *
 * 可以管理Domain的Action
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/25 下午 04:21:08
 */
class Action_domain_administration extends Action {

    var $action_id = 1;
    var $lang = 'action.domain.administration';
    var $applicable_resource_type_id = 1;
    var $default_allow = FALSE;

}


/* End of file Action_domain_administration.php */
/* Location: ./system/application/libraries/policy/Action_domain_administration.php */