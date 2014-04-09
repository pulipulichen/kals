/**
 * Selection_navigation_great
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/24 下午 01:58:03
 * @extends {Selection_navigation}
 */
function Selection_navigation_great(_text) {
    
    Selection_navigation.call(this,_text);
    
}

Selection_navigation_great.prototype = new Selection_navigation();

Selection_navigation_great.prototype._$name = 'nav_great';

/* End of file Selection_navigation_great */
/* Location: ./system/application/views/web_apps/Selection_navigation_great.js */