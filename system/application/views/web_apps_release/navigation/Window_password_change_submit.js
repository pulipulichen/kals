/**
 * Window_password_change_submit
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/8 下午 10:39:21
 * @extends {Window_content_submit}
 */
function Window_password_change_submit() {
    
    Window_content_submit.call(this);
    
    this._$input_names = ['password', 'password_confirm'];
    
}

Window_password_change_submit.prototype = new Window_content_submit();

Window_password_change_submit.prototype.complete_notification = new KALS_language_param(
    'Password changed.',
    'window.password_change.submit.complete'
);

Window_password_change_submit.prototype.failed_notification = new KALS_language_param(
    'Password not changed.',
    'window.password_change.submit.failed'
);

Window_password_change_submit.prototype.lang = new KALS_language_param(
    'Save',
    'window.save'
);

Window_password_change_submit.prototype.url = 'user_profile/change_password';

Window_password_change_submit.prototype.validate = function (_inputs, _data) {
    
    //$.test_msg('Window_password_change_submit.validate() _data', _data);
    
    if (_data.password === '')
    {
        this.set_error(new KALS_language_param(
            'Please write password.',
            'window.password_change.submit.error.password_emtpy'
        ));
        _inputs.password.focus();
        return false;
    }
    else if (_data.password_confirm === '')
    {
        this.set_error(new KALS_language_param(
            'Please write password confirm.',
            'window.password_change.submit.error.password_confirm_empty'
        ));
        _inputs.password_confirm.focus();
        return false;
    }
    else if (_data.password != _data.password_confirm)
    {
        _inputs.password_confirm.val('');
        _inputs.password.select();
        
        this.set_error(new KALS_language_param(
            'Password not match.',
            'window.password_change.submit.error.password_not_match'
        ));
        return false;
    }
    else
    {
        return true;
    }
};

/* End of file Window_password_change_submit */
/* Location: ./system/application/views/web_apps/Window_password_change_submit.js */