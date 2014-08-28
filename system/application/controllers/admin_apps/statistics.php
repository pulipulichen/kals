<?php
include_once 'admin_apps_controller.php';
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

class statistics extends Admin_apps_controller {

    protected $controller_enable_cache = FALSE;
    protected $login_require = FALSE;

    function __construct() {
        parent::__construct();
        $this->load->helper('url');
    }

    function index() {
        $this->domain_select();
    }

    public function domain_select() {

        //取出domain list
        $this->load->library('kals_resource/Domain');
        $all_domains = $this->domain->find_all();
        
        $title = 'domain_select';
        $this->load->view('admin_apps/header', array('title'=> $title));
        $this->load->view('admin_apps/domain_select', array('all_domains'=> $all_domains) );
        $this->load->view('admin_apps/footer');
    }

    public function webpage_select($domain_id) {

        //取出domain list
        $this->load->library('kals_resource/Domain');
        $all_domains = $this->domain->find_all();

        $domain = new Domain($domain_id);
        $all_webpages = $domain->get_webpages();

        $title = 'webpage_select';
        $this->load->view('admin_apps/header', array('title'=> $title));
        $this->load->view('admin_apps/domain_select', array('all_domains'=> $all_domains, 'selected_domain' => $domain) );
        $this->load->view('admin_apps/webpage_select', array('all_webpages'=> $all_webpages) );

        $this->load->view('admin_apps/footer');

    }

    public function webpage_statistics($webpage_id)
    {
        //取出domain list
        $this->load->library('kals_resource/Domain');
        $all_domains = $this->domain->find_all();

        $this->load->library('kals_resource/Webpage');
        $webpage = new Webpage($webpage_id);

        $domain = $webpage->get_domain();
        $all_webpages = $domain->get_webpages();

        //取出domain list
        $this->load->library('kals_resource/Domain');
        $all_domains = $this->domain->find_all();

        $title = 'webpage_view';
        $this->load->view('admin_apps/header', array('title'=> $title));
        $this->load->view('admin_apps/domain_select', array('all_domains'=> $all_domains, 'selected_domain' => $domain) );
        $this->load->view('admin_apps/webpage_select', array('all_webpages'=> $all_webpages, 'selected_webpage'=> $webpage) );

        
        $this->load->view('admin_apps/webpage_statistics', array('webpage'=> $webpage) );
        $this->load->view('admin_apps/footer');
    }
}

/* End of file statistics.php */
/* Location: ./system/application/controllers/statistics.php */