/**
 * Dialog_close_icon
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2015, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2015/10/28 下午 09:58:04
 * @extends {Dialog_close_option}
 * @param {KALS_language_param} _lang
 * @param {function} _callback
 */
function Dialog_close_icon(_lang, _callback, _arg) {
    
    Dialog_close_option.call(this, _lang, _callback, _arg);
 
}

Dialog_close_icon.prototype = new Dialog_close_option();

/**
 * 預設的關閉語系參數
 * @type {KALS_language_param}
 */
Dialog_close_icon.prototype._default_lang = new KALS_language_param(
    '<i class="remove icon"></i>',
    'dialog.option.close'
);

Dialog_close_icon.prototype._$create_ui = function () {
    
    var _ui = Dialog_option.prototype._$create_ui.call(this);
    
    _ui.addClass('dialog-close')
            .addClass("inverted")
            .addClass("circular")
            .addClass("icon")
            .addClass("mini")
            .removeClass(KALS_CONFIG.theme.button);
    
    return _ui;
};
    
/* End of file Dialog_close_icon */
/* Location: ./system/application/views/web_apps/Dialog_close_icon.js */