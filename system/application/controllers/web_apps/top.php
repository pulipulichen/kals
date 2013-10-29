<?php
include_once 'web_apps_controller.php';
/**
 * annotation_getter
 *
 * annotation_getter full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/10/23 下午 03:51:22
 */

class Top extends Web_apps_controller {

    protected $controller_enable_cache = FALSE;
    protected $login_require = FALSE;

    var $url = NULL;
    var $action_id = 3;

    function __construct() {
        parent::__construct();

        $this->load->library('scope/Annotation_scope_collection');
        $this->load->library('scope/Annotation_scope');
        $this->load->library('kals_resource/Domain');
        $this->load->library('kals_resource/Webpage');
        $this->load->library('kals_resource/Annotation');

        $this->load->library('kals_actor/User');

        $this->load->library('search/Search_annotation_collection');
        $this->load->library('search/Search_annotation_id_collection');
        $this->load->library('search/Search_annotation_user_collection');
        $this->load->library('search/Search_scope_collection');

        $this->load->library('type/Type_factory');

        $this->url = get_referer_url(TRUE);

    }

    function get_top($callback = NULL)
    {
        //$webpage_id = $this->get_webpage_id();
        $webpage_id = get_context_webpage()->get_id();
        
        //$qry = "select user_id, user_name from top_ranking where webpage_id = $webpage_id limit 10";
        $qry = "select user_id, user_name from total_score where webpage_id = $webpage_id limit 10";
        $top5 = pg_query($qry);
        $data = pg_fetch_all($top5);
        
        /*
        $data = array(
        	array(
        		"user_id" => 1700,
        		"name" => "布丁"
        	),
        	array(
        		"user_id" => 1701,
        		"name" => "北極熊"
        	),
        	array(
        		"user_id" => 1702,
        		"name" => "陳老師"
        	)
        );
        */
                
        return $this->_display_jsonp($data, $callback);
    }
	
function get_user_id($callback = NULL)
    {
        //$webpage_id = $this->get_webpage_id();
        $user = get_context_user();
    	$user_id = $user->get_id();
        
        $qry2 = "select user_id from top_ranking where user_id = $user_id";
        $iid = pg_query($qry2);
        $data = pg_fetch_all($iid);
        
        /*
        $data = array(
        	array(
        		"user_id" => 1700,
        		"name" => "布丁"
        	),
        	array(
        		"user_id" => 1701,
        		"name" => "北極熊"
        	),
        	array(
        		"user_id" => 1702,
        		"name" => "陳老師"
        	)
        );
        */
                
        return $this->_display_jsonp($data, $callback);
    }
    
}

/* End of file annotation_getter.php */
/* Location: ./system/application/controllers/annotation_getter.php */