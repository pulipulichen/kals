/**
 * Window_logout_submit
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 11:04:46
 * @extends {Window_content_submit}
 */
function Window_logout_submit() {
    
    Window_content_submit.call(this);
    
}

Window_logout_submit.prototype = new Window_content_submit();

Window_logout_submit.prototype.lang = new KALS_language_param(
    'Logout',
    'window.logout.submit'
);

Window_logout_submit.prototype.complete_notification = new KALS_language_param(
    'Logout success!',
    'window.logout.submit.complete'
);

Window_logout_submit.prototype.submit = function () {
    if (this._lock_submit() === false) {
        return this;
    }
    
    var _this = this;
    var _auth = KALS_context.auth;
    KALS_window.toggle_loading(true, function () {
        _auth.logout(function (_auth, _data) {
            _this._unlock_submit();
            KALS_util.notify(_this.complete_notification);
            KALS_window.close(function () {
                //_this._unlock_submit();
            });
        });    
    });
};

/* End of file Window_logout_submit */
/* Location: ./system/application/views/web_apps/Window_logout_submit.js */