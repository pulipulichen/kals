<?php
/**
 * Authorize_manager
 *
 * 管理KALS的權限
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/25 下午 03:26:32
 * @property CI_DB_active_record $db
 * @property CI_Base $CI
 * @property Action_factory $action_factory
 */

class Authorize_manager extends KALS_object {

    var $resource;
    var $action_factory;
    var $throw_exception = TRUE;

    function Authorize_manager($resource = NULL, $actor = NULL)
    {
        parent::__construct();
        $this->_CI_load('library', 'policy/Policy', 'policy');
        $this->_CI_load('library', 'policy/Action_factory', 'action_factory');
        $this->action_factory = $this->CI->action_factory;

        if (is_object($resource))
            $this->set_resource($resource);
        if (is_object($actor))
            $this->set_actor($actor);
        else
            $this->set_context_actor ();
        return $this;
    }
    function set_resource($resource)
    {
        //test_msg('auth->set_resource()', $resource);
        $this->resource = $resource;
        return $this;
    }
    
    function set_actor($actor)
    {
        if ($actor != NULL)
            $this->actor = $actor;
        $this->actor = $actor;
        return $this;
    }

    function set_context_actor()
    {
        $actor = get_current_user();
        $this->actor = $actor;
        return $this;
    }

    function get_actor()
    {
        return $this->actor;
    }

    function _filter_actor($actor = NULL)
    {
        if ($actor != NULL)
            $this->set_actor($actor);
        return $this->get_actor();
    }

    function get_actors($action)
    {
        $actors = array();
        if ($this->has_policy($action))
        {
            $policy = $this->get_policy($action);
            $actors = $policy->get_actors();
        }
        return $actors;
    }

    function set_throw_exception($throw)
    {
        $this->throw_exception = $throw;
        return $this;
    }
    
    function allow($action, $actor = NULL)
    {
        $action = $this->action_factory->check($action);
        $actor = $this->_filter_actor($actor);
        if ($this->_is_applicable($action) === FALSE)
            return FALSE;
        if (get_ignore_authorize())
            return TRUE;

        $allow = FALSE;
        if ($this->has_policy($action))
        {
            $policy = $this->get_policy($action);
            //test_msg('到底是有什麼啦', array($policy->get_id(), $policy->get_action(), $policy->get_resource()));
            $allow = $policy->allow($actor);
        }
        else
        {
            $allow = $action->get_default_allow();
        }

        if ($allow === FALSE && $this->throw_exception)
        {
            handle_error($this->lang->line($action->lang.'.exception'));
        }
        return $allow;
    }

    /**
     * 檢查該actor是否能夠管理該resource。也就是allow的管理版
     * @param KALSActor $actor
     * @return boolean 
     */
    function is_admin($actor = NULL)
    {
        if (get_ignore_authorize ())
            return TRUE;

        $actor = $this->_filter_actor($actor);
        $is_admin = FALSE;

        $resource = $this->resource;
        switch ($resource->get_type_id())
        {
            case 1:
                $action = $this->action_factory->create(1);
                $is_admin = $this->allow($action);
                break;
            case 2:
                $action = $this->action_factory->create(2);
                $is_admin = $this->allow($action);
                break;
            case 3:
                $author = $resource->get_user();
                $is_admin = $author->equals($actor);
                if ($is_admin === FALSE && $this->throw_exception)
                {
                    handle_error($this->lang->line('action.annotation.administration.exception'));
                    return FALSE;
                }
                break;
            default :
                $is_admin = FALSE;
        }
        return $is_admin;
    }

    /**
     * 新增權限，直接進資料庫更新。
     * @param int|Action $action
     * @param KALSActor|array $actor
     */
    function policy_add_actor($action, $actor = NULL)
    {
        $action = $this->action_factory->check($action);
        if ($this->_is_applicable($action) === FALSE)
            return FALSE;
        $actor = $this->_filter_actor($actor);
        if ($actor == NULL)
            return FALSE;

        $policy = $this->get_policy($action);
        $policy->add_actor($actor);
        $policy->update();
        return TRUE;
    }

    /**
     * 刪除權限。
     * @param int|Action $action
     * @param KALSActor|array $actor
     */
    function policy_remove_actor($action, $actor = NULL)
    {
        $action = $this->action_factory->check($action);
        if ($this->_is_applicable($action) === FALSE)
            return FALSE;
        $actor = $this->_filter_actor($actor);

        if ($this->has_policy($action))
        {
            $policy = $this->get_policy($action);
            $policy->remove_actor($actor);
            //$policy->update();
            return TRUE;
        }
        else
        {
            return FALSE;
        }
    }

    /**
     * 刪除該條權限。
     * @param int|Action $action
     * @param KALSActor|array $actor
     */
    function remove_entrie_policy($action)
    {
        $action = $this->action_factory->check($action);
        if ($this->_is_applicable($action) === FALSE)
            return FALSE;

        if ($this->has_policy($action))
        {
            $policy = $this->get_policy($action);
            $policy->delete();
            return TRUE;
        }
        else
        {
            return FALSE;
        }
    }

    /**
     * 取得該Action的Policy細節
     * @param int|Action $action
     * @return Policy|null
     */
    function get_policy($action)
    {
        $action = $this->action_factory->check($action);
        if ($this->_is_applicable($action) === FALSE)
            return NULL;

        $policy = $this->CI->policy->create_policy($this->resource, $action);
        if ($policy != NULL)
        {
            $policy->set_throw_exception($this->throw_exception);
        }
        return $policy;
    }

    function get_policies()
    {
        $policies = array();

        $actions = $this->action_factory->find_all($this->resource);
        foreach ($actions AS $action)
        {
            if ($this->has_policy($action))
            {
                $policy = $this->get_policy($action);
                array_push($policies, $policy);
            }
        }
        return $policies;
    }

    /**
     * 確認是否有該Action的Policy在
     * @param int|Action $action
     * @return boolean
     */
    function has_policy($action)
    {
        $action = $this->action_factory->check($action);
        
        if ($this->resource == NULL || $action == NULL)
            return FALSE;

        $db = $this->db;
        $db->where(array(
            'resource_id' => $this->resource->get_id(),
            'resource_type_id' => $this->resource->get_type_id(),
            'action_id' => $action->get_id()
        ));
        $db->from('policy');
        $db->join('policy2actor', 'policy2actor.policy_id = policy.policy_id');
        $count = $db->count_all_results();

        //test_msg('auth->has_policy() count', array($count, $this->resource->get_id(), $this->resource->get_type_id(),  $this->resource->resource_type_id, $action->get_id()));
        
        return ($count > 0);
    }

    /**
     * 作為靜態函數使用
     * @param KALSResource $resource
     * @param Action $action
     * @param KALSActor $actor
     * @return boolean
     */
    function auth($resource, $action, $actor)
    {
        $auth = new Authorize_manager();
        $auth->set_resource($resource);
        $auth->set_actor($actor);
        return $auth->allow($action);
    }

    function _check_action($action)
    {
        return $this->action_factory->check($action);
    }

    function _is_applicable($action)
    {
        $action = $this->action_factory->check($action);
        if ($this->resource == NULL
            OR $action == NULL)
            return FALSE;
        else
        {
            $result = $action->is_applicable($this->resource);
            return $result;
        }
    }
}


/* End of file Authorize_manager.php */
/* Location: ./system/application/libraries/policy/Authorize_manager.php */