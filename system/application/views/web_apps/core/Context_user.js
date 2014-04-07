/**
 * Context_user
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/11 下午 10:40:29
 * @extends {Attribute_event_dispatcher}
 */
function Context_user(){
    
    Attribute_event_dispatcher.call(this);
    
    //$.test_msg('Context_user() 確認KALS_context.auth', $.object_isset('KALS_context.auth.add_listener'));
    
    //if ($.object_isset('KALS_context.auth.add_listener'))
    //{        
        KALS_context.auth.add_listener(this);
    //}
    
    var _this = this;
    setTimeout(function () {
        _this.set_anchor_navigation_type(KALS_CONFIG.anchor_navigation_type);
    }, 0);
}

Context_user.prototype = new Attribute_event_dispatcher();

Context_user.prototype._$data_key = 'user';
    
Context_user.prototype.set_email = function (_value) {
    this.set_attr('email', _value);
};

Context_user.prototype.set_name = function (_name) {
    this.set_attr('name', _name);
};

Context_user.prototype.set_id = function (_value) {
    this.set_attr('id', _value);
};

Context_user.prototype.set_photo = function (_value) {
    this.set_attr('has_photo', _value);
};

Context_user.prototype.set_locale = function (_value) {
    this.set_attr('locale', _value);
};

Context_user.prototype.set_sex = function (_value) {
    this.set_attr('sex', _value);
};

Context_user.prototype.get_name = function (_length) {
    return this.get_attr('name', null, _length);
};

Context_user.prototype.get_id = function () {
    return this.get_attr('id');
};

Context_user.prototype.get_locale = function () {
    return this.get_attr('locale');
};

Context_user.prototype.get_sex = function () {
    return this.get_attr('sex');
};

/**
 * 設定標註指引類型
 * 有all、recommend、none三種
 * @param {String} _type 標註指引類型
 * @version 20111106 Pudding Chen
 */
Context_user.prototype.set_anchor_navigation_type = function (_type) {
    return this.set_attr('anchor_navigation_type', _type);
};

/**
 * 取得標註指引類型
 * 預設存放在KALS_CONFIG.anchor_navigation_type當中
 * 有all、recommend、none三種
 * @type {String}
 * @version 20111106 Pudding Chen
 */
Context_user.prototype.get_anchor_navigation_type = function () {
    return this.get_attr('anchor_navigation_type', KALS_CONFIG.anchor_navigation_type);
};

/**
 * 是否擁有照片
 * @type {boolean}
 * @memberOf {Context_user}
 */
Context_user.prototype.has_photo = function () {
    var _has_photo = this.get_attr('has_photo');
    if ($.is_null(_has_photo)) {
		return false;
	}
	else {
		return _has_photo;
	}
};

Context_user.prototype.get_email = function () {
    return this.get_attr('email');
};

Context_user.prototype.has_login = function () {
    var _id = this.get_id();
    return ($.isset(_id));
};

/**
 * 取得目前使用者的User_param
 * @type {User_param}
 */
Context_user.prototype.get_data = function () {
    if (KALS_context.auth.is_login() === false) {
		return null;
	}
    
    var _id = this.get_id();
    var _name = this.get_name();
    
    if (_id === null) {
		return null;
	}
    
    var _param = new User_param(_id, _name);
    return _param;
};

Context_user.prototype.get_user_param = function () {
    if (this.has_login()) {
        return new User_param(this.get_id(), this.get_name());
    }
    else {
        return null;
    }
};

/* End of file Context_user */
/* Location: ./system/application/views/web_apps/Context_user.js */