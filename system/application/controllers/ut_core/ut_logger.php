<?php
/**
 * ut_logger
 *
 * 用來測試Model/Logger. A part of KALS
 * @author Pudding Chen <puddingchen.35@gmail.com>
 * @version 1.0 2010/6/18 下午 03:18:24
 * @copyright Copyright (c) 2010, Pudding Chen
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 *
 */
class Ut_logger extends Controller {

    var $logger;

    function Ut_logger()
    {
        parent::Controller();

        $this->load->library('core/Logger');
        echo gettype($this->logger);
        $this->logger->set_class($this);
    }

    function index()
    {
        $this->logger->info("test2");
    }
}

/* End of file .php */
/* Location: ./system/application/controller/ut_logger.php */