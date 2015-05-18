/**
 * Window_register
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 10:56:17
 * @extends {Window_login}
 */
function Window_register() {
    
    Window_login.call(this);
    
    this._setup_submit(new Window_register_submit());
    
}

Window_register.prototype = new Window_login();

Window_register.prototype.name = 'Register';

Window_register.prototype.heading = new KALS_language_param (
    'Register',
    'window.register.heading'
);

Window_register.prototype.nav_heading = new KALS_language_param (
    'Register',
    'window.register.nav_heading'
);

/**
 * 高度。直接繼承Window_login，所以不重新設定
 */
//Window_register.prototype.width = 400;

Window_register.prototype._$create_ui = function () {
    
    var _ui = KALS_window.ui.panel(this.name);
    _ui.addClass('window-register');
    
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
        //, KALS_window.ui.input('email', 'register@test.kals.idv') );
        , KALS_window.ui.input('email') );
    _email_row
        .addClass('email')
        .appendTo(_ui);
    
    var _password_lang = new KALS_language_param(
        'Password',
        'window.content.password'
    );
    var _password_row = KALS_window.ui.row(_password_lang
        //, KALS_window.ui.password('password', 'kals') );
        , KALS_window.ui.password('password') );
    _password_row
        .addClass('password')
        .appendTo(_ui);
        
    var _login_lang = new KALS_language_param(
        'Click here to login.',
        'window.register.content.login_link'
    );
    
    /*
    var _login_link = new Dialog_close_link(_login_lang, function () {
        
        var _login_content = new Window_login();
        KALS_window.setup_window(_login_content);
        
    });
    */
    var _login_link = KALS_window.ui.window_change_link(_login_lang
        , KALS_toolbar.anonymous_nav.login);
        //, new Window_login());
    var _login_row = KALS_window.ui.message_row(_login_link);
    _login_row.addClass('login-link')
        .appendTo(_ui);
    
    //KALS_context.overlay.lock_mask();
    return _ui;
};

/* End of file Window_register */
/* Location: ./system/application/views/web_apps/Window_register.js */
