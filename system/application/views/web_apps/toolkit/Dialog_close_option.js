/**
 * Dialog_close_option
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/31 下午 09:58:04
 * @extends {Dialog_option}
 * @param {KALS_language_param} _lang
 * @param {function} _callback
 */
function Dialog_close_option(_lang, _callback, _arg) {
    
    if ($.is_function(_callback)) {
        this._close_callback = _callback;
    }
    
    var _this = this;
    var _close_callback = function () {
        //$.test_msg("Dialog_close_option click");
        var _ui = _this.get_ui();
        _this.close_handle(_ui);
    };
    
    Dialog_option.call(this, _lang, _close_callback, _arg);
}

Dialog_close_option.prototype = new Dialog_option();

/**
 * 真實的關閉
 * @type {Function}
 */
Dialog_close_option.prototype._close_callback = null;

/**
 * 是否以callback來關閉視窗
 * @type Boolean
 */
Dialog_close_option.prototype._enable_close_callback = false;

/**
 * 設定是否啟用關閉回呼
 * @param {Boolean} _boolean_value
 * @returns {Dialog_close_option}
 */
Dialog_close_option.prototype.set_enable_close_callback = function (_boolean_value) {
    if ($.is_boolean(_boolean_value)) {
        this._enable_close_callback = _boolean_value;
    }
    return this;
};

/**
 * 預設的關閉語系參數
 * @type {KALS_language_param}
 */
Dialog_close_option.prototype._default_lang = new KALS_language_param(
    //'CLOSE',
    '<i class="remove icon"></i>',
    'dialog.option.close'
);

Dialog_close_option.prototype._$create_ui = function () {
    
    var _ui = Dialog_option.prototype._$create_ui.call(this);
    
    _ui.addClass('dialog-close');
    
    return _ui;
};

/**
 * 處理關閉的事件
 * @param {jQuery} _ui
 * @param {Function} _callback
 * @returns {Dialog_close_option}
 */
Dialog_close_option.prototype.close_handle = function (_ui) {
    
    var _enable_close_callback = this._enable_close_callback;
    var _callback = this._close_callback;
    
    var _overlay_close_action = function () {
        var _overlay = $(_ui).parents('.dialog-modal:first').overlay();
        if (typeof(_overlay.close) === 'function') {
            setTimeout(function () {
                //$.test_msg("Dialog_close_option 準備關閉overlay");
                _overlay.close();
            }, 0);
        }
    };
    
    setTimeout(function () {
        //$.test_msg("Dialog_close_option close_handle", [_enable_close_callback, $.is_function(_callback)]);
        if (_enable_close_callback === false) {
            //$.test_msg("Dialog_close_option 要準備關閉囉");
            _overlay_close_action();
            $.trigger_callback(_callback);
        } 
        else {
            if ($.is_function(_callback) === false) {
                _overlay_close_action();
            }
            else {
                //$.test_msg("Dialog_close_option close_handle check", _callback);
                _callback(_overlay_close_action);
            }
        }
    }, 0);
    return this;
};
    
/* End of file Dialog_close_option */
/* Location: ./system/application/views/web_apps/Dialog_close_option.js */