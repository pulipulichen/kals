/**
 * Window_profile_submit
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
function Window_profile_submit() {
    
    Window_content_submit.call(this);
    
    this._$input_names = ['name', 'locale', 'sex'];
}

Window_profile_submit.prototype = new Window_content_submit();

Window_profile_submit.prototype.url = 'user_profile/update_profile';

Window_profile_submit.prototype.lang = new KALS_language_param(
    'Save',
    'window.save'
);

Window_profile_submit.prototype.complete_notification = new KALS_language_param(
    'Profile updated.',
    'window.profile.submit.complete'
);

Window_profile_submit.prototype.failed_notification = new KALS_language_param(
    'Profile not updated.',
    'window.profile.submit.failed'
);

Window_profile_submit.prototype.complete_handle = function (_data) {
    
    if (_data === true)
    {
        var _input_data = this.get_data();
        
        var _user = KALS_context.user;
        _user.set_name(_input_data.name);
        _user.set_sex(_input_data.sex);
        _user.set_locale(_input_data.locale);
    }
    
    return Window_content_submit.prototype.complete_handle.call(this, _data);
};

Window_profile_submit.prototype.validate = function (_inputs, _data) {
    
    //$.test_msg('Window_profile_submit.validate()', _data);
    
    if (_data.name === null || _data.name === '')
    {
        this.set_error(new KALS_language_param(
            'Please write name.',
            'window.profile.submit.error.name_empty'
        ));
        return false;
    }
    return true;
};


/* End of file Window_profile_submit */
/* Location: ./system/application/views/web_apps/Window_profile_submit.js */