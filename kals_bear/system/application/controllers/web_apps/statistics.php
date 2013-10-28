<?php
include_once 'web_apps_controller.php';
/**
 * statistics
 *
 * statistics full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/12/9 下午 03:28:15
 */

class statistics extends Web_apps_controller {

    protected $controller_enable_cache = FALSE;
    protected $login_require = FALSE;

    function __construct() {
        parent::__construct();
        $this->load->helper('url');
    }

    function index() {

    }

    public function domain_select() {

        //取出domain list

        $this->library('kals_resource/Domain');
        $all_domains = $this->domain->find_all();

        $title = 'domain_select';
        $this->view('admin_apps/header', array('title', $title));
        $this->view('admin_apps/domain_select', array('all_domains', $all_domains) );
        $this->view('admin_apps/footer');
    }
}

/* End of file statistics.php */
/* Location: ./system/application/controllers/statistics.php */