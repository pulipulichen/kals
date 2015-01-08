/**
 * Selection_navigation_good
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
function Selection_navigation_good(_text) {
    
    Selection_navigation.call(this,_text);
    
}

Selection_navigation_good.prototype = new Selection_navigation();

Selection_navigation_good.prototype._$name = 'nav_good';

/* End of file Selection_navigation_good */
/* Location: ./system/application/views/web_apps/Selection_navigation_good.js */