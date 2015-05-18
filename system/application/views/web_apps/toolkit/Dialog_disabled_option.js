/**
 * Dialog_disabled_option
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2014/11/11 下午 09:58:04
 * @extends {Dialog_option}
 * @param {KALS_language_param} _lang
 * @param {function} _callback
 */
function Dialog_disabled_option(_lang) {
    Dialog_option.call(this, _lang);
}

Dialog_disabled_option.prototype = new Dialog_option();

/**
 * 預設的關閉語系參數
 * @type {KALS_language_param}
 */
Dialog_disabled_option.prototype._default_lang = new KALS_language_param(
    'DISABLED',
    'dialog.option.disabled'
);

Dialog_disabled_option.prototype._$create_ui = function () {
    
    var _ui = Dialog_option.prototype._$create_ui.call(this);
    
    _ui.addClass('dialog-option-disabled');
    _ui.attr("disabled", "disabled");
    
    return _ui;
};
    
/* End of file Dialog_disabled_option */
/* Location: ./system/application/views/web_apps/Dialog_disabled_option.js */