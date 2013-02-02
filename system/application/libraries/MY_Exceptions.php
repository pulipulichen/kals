<?php
/**
 * MY_Exceptions
 *
 * 將Exceptions加入json判斷的方法
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/21 下午 04:53:15
 */
class MY_Exceptions extends CI_Exceptions {

	function show_error($heading, $message, $template = 'error_general', $status_code = 500)
	{
		set_status_header($status_code);

		$message = '<p>'.implode('</p><p>', ( ! is_array($message)) ? array($message) : $message).'</p>';

		if (ob_get_level() > $this->ob_level + 1)
		{
			ob_end_flush();
		}
		ob_start();
                if (strpos($_SERVER["REQUEST_URI"], '/callback=') === FALSE)
                {
                    include(APPPATH.'errors/'.$template.EXT);
                }
                else
                {
                    //set_status_header(200);
                    include(APPPATH.'errors/error_json'.EXT);
                    //header('Content-type: text/javascript');
                }
                $buffer = ob_get_contents();
		ob_end_clean();
		return $buffer;
	}
        
}

/* End of file MY_Exceptions.php */
/* Location: ./system/application/libraries/.../MY_Exceptions.php */