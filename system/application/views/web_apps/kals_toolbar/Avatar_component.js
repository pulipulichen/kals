/**
 * Avatar_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 09:42:52
 * @memberOf {Avatar_component}
 * @extends {KALS_user_interface}
 * @constructor
 */
function Avatar_component(_common_windows) {
    
    KALS_user_interface.call(this);
    
    this.child('notification', new Notification_component());
    this.child('profile', new Profile_navigation(_common_windows));
    this.child('profile_admin', new Profile_admin_navigation(_common_windows));
    this.child('embed', new Embed_navigation(_common_windows));
}

// Extend from KALS_user_interface
Avatar_component.prototype = new KALS_user_interface();

/**
 * Create UI
 * @memberOf {Avatar_component}
 * @type {jQuery} UI
 */
Avatar_component.prototype._$create_ui = function () {
    var _ui = $('<table align="right"><tbody><tr>'
            + '<td class="photo"></td>'
            + '<td class="name"></td>'
            + '<td class="notification"></td>'
            + '<td class="navigation profile"></td>'
            + '<td class="navigation profile-admin"></td>'
            + '<td class="navigation embed"></td>'
            + '</tr></tbody></table>')
        .addClass('avatar-component');
    
    var _notification = this.notification.get_ui();
        _ui.find('td.notification:first').append(_notification);
        
        //2010.11.23 因為通知還沒完成，所以先關掉 
        _notification.hide();
    
    var _profile_nav = this.profile.get_ui();
        _ui.find('td.profile.navigation:first').append(_profile_nav);
        
    var _profile_admin_nav = this.profile_admin.get_ui();
        _ui.find('td.profile-admin.navigation:first').append(_profile_admin_nav);
    
    var _embed_nav = this.embed.get_ui();
        _ui.find('td.embed.navigation:first').append(_embed_nav)
            .hide();    // Embed_navigation預設是隱藏的
    
    var _this = this;
    KALS_context.user.add_attr_listener('has_photo', function (_user, _has_photo) {
        var _url = null;
        if (_has_photo === true) {
            _url = 'user_profile/photo/';    //controller應該會根據登入的使用者給予預設的id
        }
        _this.set_photo(_url);
    }, false);
    
    KALS_context.user.add_attr_listener('name', function(_user, _name) {
        _this.set_name(_name);
    }, false);
    
    
    KALS_context.auth.add_listener(function (_auth, _data) {
        
        var _is_embed = _auth.is_embed();
        
        if (_is_embed === true) {
            _this.toggle_navigation('embed');
        }
        else {
            _this.toggle_navigation('profile');
        }
        var _is_admin = _auth.is_admin();
        if (_is_admin === true) {
            _this.toggle_navigation('profile-admin');
        }
    });
    
    return _ui;
};

/**
 * @memberOf {Avatar_component}
 * @type {Notification_component}
 */
Avatar_component.prototype.notification = null;

/**
 * @type {Profile_navigation}
 */
Avatar_component.prototype.profile = null;

/**
 * @type {Embed_navigation}
 */
Avatar_component.prototype.embed = null;

/**
 * 設置Avatar元件的照片。注意_url本身不需要加上base_url
 * @param {null|string} _url 如果_url === null，則隱藏photo
 */
Avatar_component.prototype.set_photo = function (_url) {
    
    if (_url === null) {
		this.toggle_photo(false);
		return this;
	}
	else {
		this.toggle_photo(true);
	}
    
    var _full_url = KALS_context.get_base_url(_url);
    var _ui = this.get_ui();
    var _photo_td = _ui.find('td.photo:first');
    var _photo_img = _photo_td.find('img:first');
    if (_photo_img.length === 0) {
		_photo_img = $('<img />').appendTo(_photo_td);
	}
    _photo_img.attr('src', _full_url);
    
    return this;
};

Avatar_component.prototype.toggle_photo = function (_display) {
    
    var _ui = this.get_ui();
    var _photo_td = _ui.find('td.photo:first');
    var _photo_hide_classname = 'hide';
    if (_display === null) {
		_display = _photo_td.hasClass(_photo_hide_classname);
	}
    
    if (_display) {
		_photo_td.addClass(_photo_hide_classname);
	}
	else {
		_photo_td.removeClass(_photo_hide_classname);
		_photo_td.find('img').remove();
	}
    return this;
};

Avatar_component.prototype.set_name = function (_name) {
    var _name_td = this.get_ui('td.name:first');
    
    if (_name === null) {
		_name_td.empty();
	}
	else {
		_name_td.html(_name);
	}
};

Avatar_component.prototype.toggle_navigation = function (_classname) {
    
    if ($.is_null(_classname)) {
		return this;
	}
    
    var _ui = this.get_ui();
    
    _ui.find('td.navigation').hide();
    _ui.find('td.navigation.' + _classname).show();
    
    return this;
};

/* End of file Avatar_component */
/* Location: ./system/application/views/web_apps/Avatar_component.js */