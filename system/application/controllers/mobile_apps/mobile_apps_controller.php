<?php
/**
 * Mobile_apps_controller
 *
 * 讀取Mobile_apps所需要的資料，Controller的原形
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/23 上午 11:16:40
 */

class Mobile_apps_controller extends Web_apps_controller {

    var $dir = 'mobile_apps/';
    var $release_dir = 'mobile_apps/';
    
    var $_login_path = "mobile_apps/login";
    var $_webpage_path = "mobile_apps/webpage_list";
    
    var $CI;
    var $session;
    
    var $client_ip;
    
    function  __construct()
    {
        parent::Controller();
        
        
        $this->load->library('kals_actor/User');
             
        $this->lang->load('kals_mobile_apps');
        $this->lang->load('kals_web_apps');
        
         $this->client_ip = array(
           'ip' => get_client_ip(),
           'browser' => $_SERVER['HTTP_USER_AGENT']
        );
    }
}

/* End of file mobile_apps.php */
/* Location: ./system/application/controllers/mobile_apps.php */