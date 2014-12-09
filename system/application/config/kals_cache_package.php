<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * kals_cache_package
 *
 * kals設定檔: 快取與壓縮的功能
 *
 * @package		KALS
 * @category		Config
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/22 下午 10:41:19
 */

$config['output.cache.enable'] = true; //是否使用快取功能，預設是true;
$config['output.cache.expiration'] = 5;  //快取的單位是「分鐘」
$config['output.package.enable'] = true; //是否啟用壓縮功能，預設是true;

/* End of file kals_cache_package.php */
/* Location: ./system/application/config/kals_cache_package.php */
