/**
 * Window_login_submit
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 11:04:39
 * @extends {Window_content_submit}
 */
function Window_login_submit() {
    
    Window_content_submit.call(this);
    
    this._$input_names = ['email', 'password'];
}

Window_login_submit.prototype = new Window_content_submit();

Window_login_submit.prototype.lang = new KALS_language_param(
    'Login',
    'window.login.submit'
);

Window_login_submit.prototype.complete_notification = new KALS_language_param(
    'Welcome, {0}!',
    'window.login.submit.complete'
);

/**
 * 取得email跟password
 * @type {Object}
 */
/*
Window_login_submit.prototype.get_data = function () {
    //var _content_ui = this._get_content_ui();
    //
    //var _email_input = _content_ui.find('input.text[name="email"]:first'); 
    //var _email = _email_input.val();
    //var _password_input = _content_ui.find('input.text[name="password"]:first'); 
    //var _password = _password_input.val();
    
    var _email_input = this._content.get_input('email');
    var _email = this._content.get_input_value('email');
    var _password_input = this._content.get_input('password');
    var _password = this._content.get_input_value('password');
    
    return {
        email: _email,
        email_input: _email_input,
        password: _password,
        password_input: _password_input
    };
};
*/

Window_login_submit.prototype.validate = function (_inputs, _data) {
    
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
        
        KALS_window.ui.check_input(_email_input);
        KALS_window.ui.check_input(_password_input);
        _email_input.focus();
    }
    else if (_email === '') {
        _error_lang = new KALS_language_param(
            'Please write E-mail',
            'window.content.error_no_email'
        );
        _email_input.focus();
        KALS_window.ui.check_input(_email_input);
    }
    else if (_password === '') {
        _error_lang = new KALS_language_param(
            'Please write Password',
            'window.content.error_no_password'
        );
        _password_input.focus();
        KALS_window.ui.check_input(_password_input);
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

Window_login_submit.prototype._setup_auth = function (_data) {
    
    if (_data === null) {
		_data = this.get_data();
	}
    
    var _auth = KALS_context.auth;
    _auth.set_email(_data.email);
    _auth.set_password(_data.password);
};

Window_login_submit.prototype.submit = function () {
    
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
    
    //$.test_msg('Window_login_submit.submit() 準備登入');
    var _auth = KALS_context.auth;
    KALS_window.toggle_loading(true, function () {
        _auth.login(true, function (_auth, _data) {
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

/* End of file Window_login_submit */
/* Location: ./system/application/views/web_apps/Window_login_submit.js */