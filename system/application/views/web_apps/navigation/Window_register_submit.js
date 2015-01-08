/**
 * Window_register_submit
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 11:04:39
 * @extends {Window_login_submit}
 */
function Window_register_submit() {
    
    Window_login_submit.call(this);
    
    this._$input_names = ['email', 'password'];
}

Window_register_submit.prototype = new Window_login_submit();

Window_register_submit.prototype.lang = new KALS_language_param(
    'Register',
    'window.register.submit'
);

Window_register_submit.prototype.complete_notification = new KALS_language_param(
    'Register success! Welcome, {0}!',
    'window.register.submit.complete'
);

/**
 * 送出註冊訊息
 * @returns {Window_register_submit}
 */
Window_register_submit.prototype.submit = function () {
    
    var _data = this.get_data();
    var _inputs = this.get_inputs();
    
    if (this.validate(_inputs, _data) === false) {
        return this;
    }
    
    this._setup_auth(_data);
    
    // ---------
    // 接下來要準備登入囉
    
    if (this._lock_submit() === false) {
        return this;
    }
    
    var _this = this;
    
    var _auth = KALS_context.auth;
    KALS_window.toggle_loading(true, function () {
        _auth.register(true, function (_auth, _data) {
            
            //$.test_msg('Window_register_submit()', $.is_class(_data, 'KALS_language_param'));
            
            if ($.is_class(_data, 'KALS_language_param')) {
                _this._content.set_error(_data);
                KALS_window.toggle_loading(false, function () {
                    _this._unlock_submit();
                });
            }
            else {
                var _username = KALS_context.user.get_name();
                _this.complete_notification.arg = _username;
                KALS_util.notify(_this.complete_notification);
                KALS_window.close(function () {
                    _this._unlock_submit();
                });
            }
            
        });    
    });
};

/**
 * 檢查email是否正確
 * @param {Object} _inputs 通常是來自於this.get_inputs();
 * @param {Object} _data 通常是來自於this.get_data();
 */
/*
Window_register_submit.prototype.validate = function (_inputs, _data) {
    
    var _email = _data["email"];
    //$.test_msg("register email check", _email);
    
    var _is_email = $.is_email(_email);
    
    if (_is_email === false) {
        _inputs["email"].focus();
        
    }
    else {
        return true;
    }
};
*/

/**
 * 檢查email是否正確
 * @param {Object} _inputs 通常是來自於this.get_inputs();
 * @param {Object} _data 通常是來自於this.get_data();
 */
Window_register_submit.prototype.validate = function (_inputs, _data) {
    
    if (_inputs === null) {
        _inputs = this.get_inputs();
    }
    if (_data === null) {
        _data = this.get_data();
    }
    
    var _email = _data.email;
        _email = $.trim(_email);
    var _password = _data.password;    
    var _email_input = _inputs.email;
    var _password_input = _inputs.password;
    
    var _error_lang = null;
    
    if (_email === '' && _password === '') {
        _error_lang = new KALS_language_param(
            'Please write E-mail and Password',
            'window.content.error_no_email_password'
        );
        
        KALS_window.ui.check_input(_email_input, true);
        KALS_window.ui.check_input(_password_input, true);
        _email_input.focus();
    }
    else if (_email === '' || $.is_email(_email) === false) {
        _error_lang = new KALS_language_param(
            'Please write E-mail',
            'window.content.error_no_email'
        );
        _email_input.focus();
        KALS_window.ui.check_input(_email_input, true);
    }
    else if (_password === '') {
        _error_lang = new KALS_language_param(
            'Please write Password',
            'window.content.error_no_password'
        );
        _password_input.focus();
        KALS_window.ui.check_input(_password_input, true);
    }
    
    if (_error_lang !== null) {
        this._content.set_error(_error_lang);
        this._unlock_submit();
        return false;
    }
    else {
        return true;
    }
};

/* End of file Window_register_submit */
/* Location: ./system/application/views/web_apps/Window_register_submit.js */