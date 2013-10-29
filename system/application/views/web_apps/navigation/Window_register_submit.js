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

Window_register_submit.prototype.submit = function () {
    
    var _data = this.get_data();
    var _inputs = this.get_inputs();
    
    if (this.validate(_inputs, _data) == false)
        return;
    
    this._setup_auth(_data);
    
    // ---------
    // 接下來要準備登入囉
    
    if (this._lock_submit() == false)
        return this;
    
    var _this = this;
    
    var _auth = KALS_context.auth;
    KALS_window.toggle_loading(true, function () {
        _auth.register(true, function (_auth, _data) {
            
            //$.test_msg('Window_register_submit()', $.is_class(_data, 'KALS_language_param'));
            
            if ($.is_class(_data, 'KALS_language_param'))
            {
                _this._content.set_error(_data);
                KALS_window.toggle_loading(false, function () {
                    _this._unlock_submit();
                });
            }
            else
            {
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

/* End of file Window_register_submit */
/* Location: ./system/application/views/web_apps/Window_register_submit.js */