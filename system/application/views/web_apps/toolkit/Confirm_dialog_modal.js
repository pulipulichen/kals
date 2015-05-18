/**
 * Confirm_dialog_modal
 * 
 * 確認專用的Dialog
 * 
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2014/6/30 下午 03:36:17
 * @extends {Dialog_modal}
 */
function Confirm_dialog_modal() {
    
    Dialog_modal.call(this);
    
}

Confirm_dialog_modal.prototype = new Dialog_modal();

Confirm_dialog_modal.prototype._$modal_name = 'Confirm_dialog_modal';
Confirm_dialog_modal.prototype._default_modal_name = 'Confirm_dialog_modal';

/**
 * 標頭
 * @type {KALS_language_param}
 */
Confirm_dialog_modal.prototype._default_heading = new KALS_language_param(
    'INFORMATION', 
    'window.noheading'
);

/**
 * 需要背景遮罩
 */
Confirm_dialog_modal.prototype._$exposable = true;

/**
 * 用來擺放回呼函數使用
 * @type {function}
 */
Confirm_dialog_modal.prototype.confirm_callback = null;

Confirm_dialog_modal.prototype._$create_ui = function () {
    
    var _ui = Dialog_modal.prototype._$create_ui.call(this);
    
    var _yes_lang = new KALS_language_param('YES', 'dialog.option.yes');
    var _no_lang = new KALS_language_param('NO', 'dialog.option.no');

    var _modal = this;
    var _yes_option = new Dialog_close_option(_yes_lang, function (_overlay_close_action) {
        //$.test_msg("yes option");
        _modal._confirm_action(true, _overlay_close_action);
    });
    _yes_option.set_enable_close_callback(true);

    var _no_option = new Dialog_close_option(_no_lang, function (_overlay_close_action) {
        _modal._confirm_action(false, _overlay_close_action);
    });
    _no_option.set_enable_close_callback(true);

    _ui.addClass('confirm');
    
    setTimeout(function () {
        _modal.set_options([_yes_option, _no_option]);
    }, 0);
    return _ui;
};

/**
 * 關閉視窗
 * @param {Boolean} _value
 * @param {Function} _overlay_close_action
 * @returns {Confirm_dialog_modal}
 */
Confirm_dialog_modal.prototype._confirm_action = function (_value, _overlay_close_action) {
    var _modal = this;
    if (typeof(_modal.confirm_callback) === 'function') {
        //$.test_msg("Confirm_dialog_modal confirm_callback", _modal.confirm_callback);
        //$.test_msg("Confirm_dialog_modal confirm_callback", _overlay_close_action);
        _modal.confirm_callback(_value, _overlay_close_action);
    }
    return this;
};

/* End of file Confirm_dialog_modal */
/* Location: ./system/application/views/web_apps/Confirm_dialog_modal.js */