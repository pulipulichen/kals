/**
 * Selection_editor
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
function Selection_editor(_text) {
    
    Selection.call(this, _text);
    
}

Selection_editor.prototype = new Selection();

Selection_editor.prototype._$name = 'editor';

/* End of file Selection_editor */
/* Location: ./system/application/views/web_apps/Selection_editor.js */