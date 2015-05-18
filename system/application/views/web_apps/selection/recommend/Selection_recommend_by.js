/**
 * Selection_recommend_by
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
function Selection_recommend_by(_text) {
    
    Selection.call(this, _text);
    
}

Selection_recommend_by.prototype = new Selection();

Selection_recommend_by.prototype._$name = 'recommend_by';

//Selection_recommend_by.prototype._$select_once = false;

Selection_recommend_by.prototype._$logout_clear = false;

/* End of file Selection_recommend_by */
/* Location: ./system/application/views/web_apps/Selection_recommend_by.js */