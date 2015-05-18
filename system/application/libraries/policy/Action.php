<?php
/**
 * Action
 *
 * Policy的種類，包含管理、讀取等等
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/25 下午 04:01:50
 */

class Action {

    var $action_id;
    var $lang = 'action.prototype';
    var $applicable_resource_type_id;
    var $default_allow = TRUE;

    function get_id()
    {
        return $this->action_id;
    }

    function get_lang()
    {
        return $this->lang;
    }

    function get_exception_lang()
    {
        return $this->lang.'.excpetion';
    }

    function get_applicable_id()
    {
        return $this->applicable_resource_type_id;
    }

    function get_default_allow()
    {
        return $this->default_allow;
    }

    function is_applicable($resource = NULL)
    {
        if (is_null($resource))
            return FALSE;
        $type_id = $resource->get_type_id();
        return ($type_id == $this->applicable_resource_type_id);
    }

    function  __toString() {
        return get_class($this) . '::$id=' . $this->get_id() ;
    }
}


/* End of file Action.php */
/* Location: ./system/application/libraries/policy/Action.php */