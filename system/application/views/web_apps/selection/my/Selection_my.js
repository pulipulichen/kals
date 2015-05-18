/**
 * Selection_my
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/20 下午 08:42:59
 * @extends {Selection}
 * @param {Selectable_text} _text
 */
function Selection_my(_text) {
    
    Selection.call(this, _text);
    
}

Selection_my.prototype = new Selection();

Selection_my.prototype._$name = 'my';

Selection_my.prototype._$select_once = false;

/* End of file Selection_my */
/* Location: ./system/application/views/web_apps/Selection_my.js */