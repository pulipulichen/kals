<?php
/**
 * Display
 *
 *
 * @package		KALS
 * @category		Views
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/26 下午 18:17:29
 */

if (isset($callback_hash) && isset($json))
{
    echo $callback_hash.'('.$json.')';
}
else
    echo $json;