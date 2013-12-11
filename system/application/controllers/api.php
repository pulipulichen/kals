<?php
/**
 * Api
 *
 * 以REST形式，回傳資料的方法
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2013, Pulipuli Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		https://github.com/pulipulichen/kals
 * @version		1.0 2013/12/26 上午 11:16:40
 */

class Api extends Controller {

    function  __construct()
    {
        parent::Controller();
        $this->load->helper('url');
        $this->load->helper('web_apps');
        $this->load->config('kals');

        create_context();
    }
    
    function index($message) {
        
    }
    
}

/* End of file api.php */
/* Location: ./system/application/controllers/api.php */