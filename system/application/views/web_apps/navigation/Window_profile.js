/**
 * Window_profile
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/5 下午 07:51:43
 * @extends {Window_content}
 */
function Window_profile() {
    
    Window_content.call(this);
    
    this._setup_submit(new Window_profile_submit());
}

Window_profile.prototype = new Window_content();

Window_profile.prototype.name = 'Profile';

Window_profile.prototype.heading = new KALS_language_param (
    'Profile',
    'window.profile.heading'
);

Window_profile.prototype.nav_heading = new KALS_language_param (
    'Profile',
    'window.profile.nav_heading'
);

Window_profile.prototype._$load_config = 'Window_profile';

Window_profile.prototype.width = 500;

/**
 * Create UI
 * @memberOf {Window_profile}
 * @type {jQuery} UI
 */
Window_profile.prototype._$create_ui = function () {
    var _ui = KALS_window.ui.panel('window-profile');
    
    var _factory = KALS_window.ui;
    
    //2010.10.8 應該不用多餘的帳號資料標題orz
    /*
    var _heading_row = _factory.heading_row(this.heading);
    _heading_row.appendTo(_ui);
    */
    
    var _email_data = $('<div></div>').append(KALS_context.user.get_email());
    var _email_hint = _factory.tip(new KALS_language_param(
        '(E-mail cannot change.)',
        'window.profile.content.email_cannot_change'
    )).appendTo(_email_data);
    
    var _email_row = _factory.row(
        new KALS_language_param('E-mail', 'window.content.email'),
        _email_data
    ).appendTo(_ui);

    var _name_row = _factory.row(
        new KALS_language_param('Name', 'window.content.name'),
        _factory.input('name', KALS_context.user.get_name())
    ).appendTo(_ui);
    
    var _subpanel = _factory.subpanel('locale_sex').appendTo(_ui);
    
    var _this = this;
    this.set_config_onload(function () {
        var _locale_config = _this.get_config('locale');
        var _locale_options = [];
        for (var _i in _locale_config) {
            var _value = _locale_config[_i];
            var _lang_param = new KALS_language_param(
                _value,
                'window.content.locale.' + _value
            );
            
            var _option = _factory.dropdown_option(_lang_param, _value);
            _locale_options.push(_option);
        }
        var _locale_default_value = KALS_context.user.get_locale();
        var _locale_dropdown = _factory.dropdown('locale', _locale_options, _locale_default_value);
        
        var _locale_row = _factory.row(
            new KALS_language_param('Locale', 'window.content.locale'),
            _locale_dropdown
        ).appendTo(_subpanel);
        
        //2010.11.23 由於修改語系的功能上未完成，所以暫時不給使用者修改語系
        _locale_row.hide();
        
        
        var _sex_config = _this.get_config('sex');
        var _sex_options = [];
        for (_i in _sex_config) {
            _value = _sex_config[_i];
            _lang_param = new KALS_language_param(
                _value,
                'window.content.sex.' + _value
            );
            
            _option = _factory.list_option(_lang_param, _value);
            _sex_options.push(_option);
        }
        var _sex_default_value = KALS_context.user.get_sex();
        var _sex_list = _factory.radio_list('sex', _sex_options, _sex_default_value);
        
        var _sex_row = _factory.row(
            new KALS_language_param('Sex', 'window.content.sex'),
            _sex_list
        ).appendTo(_subpanel);
    });
    
    
    var _password_link_data = $('<div></div>');
    
    /*var _password_link = new Dialog_close_link(
        new KALS_language_param('Open password change window.'
            , 'window.profile.content.password_change.link'),
        function () {
            var _content = new Window_password_change();
            KALS_window.setup_window(_content);
        }
    );
    _password_link.get_ui().appendTo(_password_link_data);
    */
    
    var _password_link = _factory.window_change_link(
        new KALS_language_param('Open password change window.'
            , 'window.profile.content.password_change.link'),
        'Window_password_change'
    ).appendTo(_password_link_data);
    
    var _password_tip = _factory.tip(new KALS_language_param(
        ' (ATTENTION: If you want to chage password, the profile you changed will be lost.)',
        'window.profile.content.password_change.tip'
    )).appendTo(_password_link_data);
    
    var _password_row = _factory.row(
        new KALS_language_param('Password Change', 'window.profile.content.password_change.heading'),
        _password_link_data
    ).appendTo(_ui);
    
    var _check_embed = function (_is_embed) {
        if (_is_embed === true) {
            _password_link_data.hide();
            _password_row.hide();
        }
        else {
            _password_link_data.show();
            _password_row.show();
        }
    };
    
    KALS_context.auth.add_listener(function (_auth, _data) {
        
        var _is_embed = _auth.is_embed();
        _check_embed(_is_embed);
    });
    
    _check_embed(KALS_context.auth.is_embed());
    
    return _ui;
};

/* End of file Window_profile */
/* Location: ./system/application/views/web_apps/Window_profile.js */