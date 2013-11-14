/**
 * Selection_search
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
function Selection_search(_text) {
    
    Selection.call(this, _text);
    
}

Selection_search.prototype = new Selection();

Selection_search.prototype._$name = 'search_result';

/* End of file Selection_search */
/* Location: ./system/application/views/web_apps/Selection_search.js */