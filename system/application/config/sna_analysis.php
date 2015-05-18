<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * sna_analysis
 *
 * 維均的SNA設定檔案
 *
 * @package		KALS
 * @category		Config
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/22 下午 10:41:19
 */

//要觀察的網址

if (is_file("'C:/R/bin/Rscript.exe'")) {
    $config['r_base_command'] = 'C:/R/bin/Rscript.exe';
}
else if (is_file("/usr/lib/R/bin/Rscript")) {
    $config['r_base_command'] = "/usr/lib/R/bin/Rscript";
}


/* End of file kals.php */
/* Location: ./system/application/config/kals.php */