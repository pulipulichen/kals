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

class Statistics extends Web_apps_controller {

    protected $controller_enable_cache = FALSE;
    protected $login_require = FALSE;

    function __construct() {
        parent::__construct();
        //parent::Controller();
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
    
    /**
     * 統整所有要丟給Context_user的資料
     * 
     * @param User $user
     * @param Webpage $webpage
     * @return JSON
     */
    public function user_params( $callback = NULL ) {
        //echo "!!!!";
        if (isset($GLOBALS['context']) === TRUE) {
            //test_msg("globals context = true", is_null($GLOBALS['context']));
        }
        $user = get_context_user();
        if (is_null($user) === TRUE) {
            test_msg("user is null");
        }
        
        $webpage = get_context_webpage();
        
        $this->load->library("kals_actor/User_statistic", "user_statistic");
        $this->user_statistic = new User_statistic();
        
        if(is_null($user)){
            test_msg("user is null", $user);
        }
        else{
            $data =  array(
                "responded_count" => $this->user_statistic->get_responded_count($user, $webpage),
                //"responded_count" => 5,
                "responded_users_count" =>$this->user_statistic->get_responded_users_count($user, $webpage),
                "respond_to_users_count" =>$this->user_statistic->get_respond_to_users_count($user, $webpage)
            );
        }
        // 將資料再放進user屬性中
        $output = array(
            "user" => $data
        );
        
        //打包成json丟回去 
        return $this->_display_jsonp($output, $callback);       
    }
}

/* End of file statistics.php */
/* Location: ./system/application/controllers/statistics.php */