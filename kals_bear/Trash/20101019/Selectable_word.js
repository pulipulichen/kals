/**
 * Selectable_word
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/19 下午 03:10:12
 */
function Selectable_word(_word_id, _text, _tooltip_config) {
    
    
    
}

/**
 * HTML的原形
 */
Selectable_word.prototype._ui = null;

Selectable_word.prototype.word_id_prefix = 'kals_word_';

Selectable_word.prototype.get_ui_jquery = function () {
    return $(this._ui);
};

Selectable_word.prototype.get_ui_element = function () {
    return this._ui;
};

Selectable_word.prototype.set_word_id = function (_word_id)
{
    var _ui = this.get_ui_jquery();
    
    _ui.attr('id', this.word_id_prefix + _word_id);
    
    return this;
};

Selectable_word.prototype.get_word_id = function () {
    
    var _ui = this.get_ui_jquery();
    
    var _id = _ui.attr('id');
    var _word_id = $.get_prefixed_id(_id);
    
    return _word_id;
};

Selectable_word.prototype.set_text = function (_text) {
    
    var _ui = this.get_ui_jquery();
    _ui.html(_text);
    return this;
};

Selectable_word.prototype.get_text = function () {
    
    var _ui = this.get_ui_jquery();
    return _ui.html();
};

Selectable_word.prototype.get_location = function () {
    
};

/* End of file Selectable_word */
/* Location: ./system/application/views/web_apps/Selectable_word.js */