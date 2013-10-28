<?php
include_once 'web_apps_controller.php';
/**
 * help
 *
 * help full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/9/1 下午 03:17:08
 */

class Top extends Web_apps_controller {

    function __construct()
    {
        parent::__construct();

        //檢查是否已經登入，未登入則丟出例外訊息
        login_require();
    }
    
    function get_top($json = NULL, $callback = NULL)
    {
        //$webpage_id = $this->get_webpage_id();
        $webpage_id = get_context_webpage()->get_id();
        
        $qry = "select user_id, user_name from top_ranking where webpage_id = $webpage_id limit 5";
        $top5 = pg_query($qry);
        $data = pg_fetch_all($top5);
        
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
                
        return $this->_display_jsonp($data, $callback);
    }
	
	
}

/* End of file top.php */
/* Location: ./system/application/controllers/top.php */