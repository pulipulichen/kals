/**
 * Dialog_option
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/31 下午 09:46:08
 * @extends {KALS_user_interface}
 * @param {KALS_language_param} _lang
 * @param {function} _callback
 * @param {Object} _arg
 */
function Dialog_option(_lang, _callback, _arg) {
    
    KALS_user_interface.call(this);
    
    if ($.is_function(_lang)) {
        _arg = _callback;
        _callback = _lang;
        _lang = null;
    }
    
    if ($.is_class(_lang, 'KALS_language_param')) {
        this.lang = _lang;
    }
    if ($.is_function(_callback)) {
        this.callback = _callback;
    }
    this.arg = _arg;
}

Dialog_option.prototype = new KALS_user_interface();

Dialog_option.prototype._$multi_instence = true;

Dialog_option.prototype.lang = null;
Dialog_option.prototype.callback = null;
Dialog_option.prototype.arg = null;

Dialog_option.prototype._default_lang = new KALS_language_param(
    'BUTTON',
    'dialog.option.button'
);

/**
 * 建立按鈕
 * @type {jQuery}
 */
Dialog_option.prototype._$create_option = function () {
    //return $('<button class="button"></button>');
    return $('<button type="button" class="ui ' + KALS_CONFIG.theme.button + ' button"></button>');
}; 
Dialog_option.prototype._$create_ui = function () {
    
    var _button = this._$create_option()
        .addClass('dialog-option');
    
    var _lang = this.lang;
    if ($.is_null(_lang)) {
        _lang = this._default_lang;
    }
    
    KALS_context.lang.add_listener(_button, _lang);
    
    if ($.is_function(this.callback)) {
        var _this = this;
        _button.click(function () {
            _this.callback(_this.arg);
            return false;
        });
    }
    
    _button.hover(function () {
        $(this).addClass('hover');
    }, function () {
        
        if ($(this).hasClass('focus') === false) {
            $(this).removeClass('hover');
        }
        
    });
    
    _button.focus(function () {
        //var _other_button = 
        $('.KALS .dialog-option.hover.focus')
            .removeClass('hover')
            .removeClass('focus');
        
        $(this).addClass('hover');
        $(this).addClass('focus');
    });
    
    _button.blur(function () {
        $(this).removeClass('hover');
        $(this).removeClass('focus');
    });
    
    return _button;
};

/* End of file Dialog_option */
/* Location: ./system/application/views/web_apps/Dialog_option.js */