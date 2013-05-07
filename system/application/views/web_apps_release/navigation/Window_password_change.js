/**
 * Window_password_change
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/8 下午 10:39:13
 * @extends {Window_content}
 */
function Window_password_change() {
    
    Window_content.call(this);
    
    this._setup_submit(new Window_password_change_submit());
    
}

Window_password_change.prototype = new Window_content();

Window_password_change.prototype.url = 'user_profile/change_password';

Window_password_change.prototype.width = 400;

Window_password_change.prototype.name = 'Password_change';

Window_password_change.prototype.heading = new KALS_language_param(
    'Password Chage',
    'window.password_change.heading'
);

Window_password_change.prototype.nav_heading = new KALS_language_param(
    'Password Chage',
    'window.password_change.nav_heading'
);

Window_password_change.prototype.onclose = function () {
    var _content = new Window_profile();
    KALS_window.setup_window(_content);
};

/**
 * Create UI
 * @memberOf {Window_password_change}
 * @type {jQuery} UI
 */
Window_password_change.prototype._$create_ui = function () {
    var _factory = KALS_window.ui;
    var _ui = _factory.panel('window-password-change');
    
    var _password_row = _factory.row(
        new KALS_language_param('Password', 'window.content.password'),
        _factory.password('password')
    ).appendTo(_ui);
    
    var _confirm_row = _factory.row(
        new KALS_language_param('Password Confirm', 'window.password_change.content.password_confirm'),
        _factory.password('password_confirm')
    ).appendTo(_ui);
    
    KALS_context.overlay.lock_mask();
    
    return _ui;
};

/* End of file Window_password_change */
/* Location: ./system/application/views/web_apps/Window_password_change.js */