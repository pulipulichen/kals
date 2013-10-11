<?php
include_once 'web_apps_controller.php';
/**
 * log
 *
 * log full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/10/23 下午 03:54:59
 */

class Log extends Web_apps_controller {

    protected $controller_enable_cache = FALSE;
    protected $login_require = FALSE;

    var $user = NULL;
    var $url = NULL;

    function __construct() {
        parent::__construct();

        $this->load->library('kals_actor/User');
        $this->user = get_context_user();
        $this->url = get_referer_url(TRUE);
    }

    public function create ($json, $callback) {

        //$this->output->enable_profiler(TRUE);
        
        $data = json_to_object($json);
        
        //取得參考網址資料跟位於session的user
        $url = $this->url;
        $user = $this->user;

        //取得來自$json的範圍資料
        $action = $data->action;
        $note = $data->note;

        //log區
        $array_data = $annotation->export_webpage_data($this->url);

        $action = 13;
        if (isset($data['recommend'])) {
            $action = 14;
        }
        if ($annotation->is_respond())
        {
            $action = 20;
            //如果是回自己，那就改成27
            $topic = $annotation->get_respond_to_topic();
            if ($topic->get_user()->equals($annotation->get_user()))
                    $action = 27;
        }
        $user_id = NULL;
        if (isset($user))
            $user_id = $user->get_id();
        kals_log($this->db, $action, array('memo'=>$array_data, 'user_id' => $user_id));

        context_complete();
        
        set_ignore_authorize(false);

        $this->_display_jsonp($data, $callback);
    }
}

/* End of file log.php */
/* Location: ./system/application/controllers/log.php */