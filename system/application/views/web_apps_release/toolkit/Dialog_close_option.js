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
    
    Dialog_option.call(this, _lang, _callback, _arg);
    
}

Dialog_close_option.prototype = new Dialog_option();

/**
 * 預設的關閉語系參數
 * @type {KALS_language_param}
 */
Dialog_close_option.prototype._default_lang = new KALS_language_param(
    'CLOSE',
    'dialog.option.close'
);

Dialog_close_option.prototype._$create_ui = function () {
    
    var _ui = Dialog_option.prototype._$create_ui.call(this);
    
    _ui.addClass('dialog-close');
    
    var _this = this;
    _ui.click(function () {
        var _ui = this;
        _this.close_handle(_ui);
        return false;
    });
    
    return _ui;
};

Dialog_close_option.prototype.close_handle = function (_ui, _callback) {
    
    setTimeout(function () {
            
        var _overlay = $(_ui).parents('.dialog-modal:first').overlay();
        if (typeof(_overlay.close) == 'function') {
			_overlay.close();
		}
        
        $.trigger_callback(_callback);
        
    }, 300);
    
};
    
/* End of file Dialog_close_option */
/* Location: ./system/application/views/web_apps/Dialog_close_option.js */