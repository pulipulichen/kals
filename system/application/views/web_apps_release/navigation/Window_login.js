/**
 * Window_login
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 10:56:17
 * @extends {Window_content}
 */
function Window_login() {
    
    Window_content.call(this);
    
    this._setup_submit(new Window_login_submit());
    
}

Window_login.prototype = new Window_content();

Window_login.prototype.name = 'Login';

Window_login.prototype.heading = new KALS_language_param (
    'Login',
    'window.login.heading'
);

Window_login.prototype.nav_heading = new KALS_language_param (
    'Login',
    'window.login.nav_heading'
);

Window_login.prototype.width = 400;

Window_login.prototype._$create_ui = function () {
    
    var _ui = KALS_window.ui.panel(this.name);
    _ui.addClass('window-login');
    
    /*
    var _error_row = KALS_window.ui.message_row('');
    _error_row.addClass('error')
        .appendTo(_ui);
    */
    var _email_lang = new KALS_language_param(
        'E-mail',
        'window.content.email'
    );
    var _email_row = KALS_window.ui.row(_email_lang
        //, KALS_window.ui.input('email', 'auth@test.kals.idv') );
        , KALS_window.ui.input('email') );
    _email_row
        .addClass('email')
        .appendTo(_ui);
    
    var _password_lang = new KALS_language_param(
        'Password',
        'window.content.password'
    );
    var _password_row = KALS_window.ui.row(_password_lang
        //, KALS_window.ui.password('password', 12121) );
        , KALS_window.ui.password('password') );
    _password_row
        .addClass('password')
        .appendTo(_ui);
    
        
    var _register_lang = new KALS_language_param(
        'Click here to register.',
        'window.login.content.register_link'
    );
    
    // 2010.11.21 在職專班實驗專用訊息
    if (typeof(KALS_CONFIG.login_hint) == 'string')
    {
        var _login_hint = $('<div></div>')
            .css({
                fontSize: 'small',
                'margin': '10px 0',
                'padding': '10px',
                'border': '1px solid gray'
            })
            .html(KALS_CONFIG.login_hint)
            .appendTo(_ui);
        
        
        //KALS_context.lang.add_listener(_experiment_message, new KALS_language_param(
        //    'If you are E-learning Master Program\'s student, please login with your school e-mail and student ID. <br /><br />For example, student with ID "96155001" will write "96155001@nccu.edu.tw" in e-mail address and "96155001" in password.',
        //    'login.experiment_message.201012'
        //));
    }
    
    
    /*
    var _register_link = new Dialog_close_link(_register_lang, function () {
        
        var _register_content = new Window_register();
        KALS_window.setup_window(_register_content);
        
    });
    */
   
    var _register_link = KALS_window.ui.window_change_link(_register_lang
        , KALS_toolbar.anonymous_nav.register);
        //, new Window_register());
    var _register_row = KALS_window.ui.message_row(_register_link);
    _register_row.addClass('register-link')
        .appendTo(_ui);
        
    if (KALS_CONFIG.deny_register === true)
    {
        _register_row.hide();
    }
    
    return _ui;
};

/**
 * 設定錯誤
 * @param {KALS_language_param|null} _lang_param
 */
/*
Window_login.prototype.set_error = function (_lang_param) {
    
    var _error = this.get_ui('.error:first');
    
    _error.empty();
    if ($.is_null(_lang_param))
        _error.hide();
    else
    {
        var _error_msg = KALS_context.lang.create_listener(_lang_param);
        _error.append(_error_msg).show();
    }
    return this;
};
*/

/* End of file Window_login */
/* Location: ./system/application/views/web_apps/Window_login.js */