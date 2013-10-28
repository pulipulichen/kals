<?php
/**
 * Action_factory
 *
 * 負責取出Action的Action Factory
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/25 下午 05:30:29
 */
class Action_factory extends KALS_object {

    /**
     * 取得對應ID的Action
     * @param int $action_id
     * @return Action
     */
    function create($action_id)
    {
        if (!is_int($action_id) && !is_string($action_id))
            return NULL;
        $action = NULL;
        switch ($action_id)
        {
            case 1:
            case 'action.domain.administration':
                $this->CI->load->library('policy/Action_domain_administration');
                $action = $this->CI->action_domain_administration;
                break;
            case 2:
            case 'action.webpage.administration':
                $this->CI->load->library('policy/Action_webpage_administration');
                $action = $this->CI->action_webpage_administration;
                break;
            case 3:
            case 'actopm.webpage.read':
            	$this->CI->load->library('policy/Action_webpage_read');
                $action = $this->CI->action_webpage_read;
                break;
            case 4:
            case 'action.webpage.recommend_show':
                $this->CI->load->library('policy/Action_webpage_recommend_show');
                $action = $this->CI->action_webpage_recommend_show;
                break;
            case 5:
            case 'action.annotation.read':
                $this->CI->load->library('policy/Action_annotation_read');
                $action = $this->CI->action_annotation_read;
                break;
            default :
                $action = NULL;
        }
        return $action;
    }

    /**
     * 確認輸入的是Action ID還是Action物件
     * @param int|Action $action
     * @return Action|NULL
     */
    function check($action)
    {
        if (is_int($action))
        {
            $action_id = $action;
            $action = $this->create ($action_id);
        }
        if (is_object($action))
            return $action;
        else
            return NULL;
    }

    function find_all($resource = NULL)
    {
        $actions = array();

        if ($resource == NULL || $resource->get_type_id() == 1)
        {
            array_push($actions, $this->create(1));
        }
        if ($resource == NULL || $resource->get_type_id() == 2)
        {
            array_push($actions, $this->create(2));
            array_push($actions, $this->create(3));
            array_push($actions, $this->create(4));
        }
        if ($resource == NULL || $resource->get_type_id() == 3)
        {
            array_push($actions, $this->create(5));
        }
        return $actions;
    }

    public function filter_action_id($action_id)
    {
        if (is_object($action_id))
            $action_id = $action_id->get_id();
        return $action_id;
    }
}


/* End of file Action_factory.php */
/* Location: ./system/application/libraries/.../Action_factory.php */