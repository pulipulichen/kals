/**
 * List_header_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/30 下午 02:24:39
 * @extends {KALS_user_interface}
 * @param {List_item} _item
 */
function List_header_component(_item) {
    
    KALS_user_interface.call(this);
    
    this._set_list_item(_item);    
}

// Extend from KALS_user_interface
List_header_component.prototype = new KALS_user_interface();

// --------
// List Item
// --------

/**
 * @type {List_item}
 */
List_header_component.prototype._item = null;

List_header_component.prototype._set_list_item = function (_item) {
    if ($.isset(_item))
    {
        this._item = _item;
        var _this = this;
        this._item.add_listener('set', function (_item) {
            _this.set_data();
        });
    }
    return this;
};

List_header_component.prototype.set_data = function () {
    this.set_user_name();
    this.set_is_my();
    this.set_type();
    this.set_has_recommend();
    this.set_policy_type();
};

/**
 * Create UI
 * @memberOf {List_header_component}
 * @type {jQuery} UI
 */
List_header_component.prototype._$create_ui = function ()
{
    var _ui = $('<div></div>')
        .addClass('list-header-component');
    
    var _like_component = this._setup_like_component();
    _like_component.get_ui().appendTo(_ui);
    
    if (this._item.is_enable('like') == false)
    {
        _like_component.get_ui().hide();
    }
    
    var _name_container = $('<span></span>')
        .addClass('name-container')
        .appendTo(_ui);
    
    this._name_container = _name_container;
    
    var _type_container = $('<span></span>')
        .addClass('type-container')
        .appendTo(_ui);
    
    this._type_container = _type_container;
    
    var _lock_component = this._create_lock_component();
    _lock_component.prependTo(_ui);
    
    if (this._item.is_enable('policy') == false)
    {
        //_lock_component.hide();
    }
    
    var _recommend_component = this._create_recommend_component();
    _recommend_component.prependTo(_ui);
    
    if (this._item.is_enable('recommend') == false
        || KALS_CONFIG.enable_annotation_recommend == false)
    {
        _recommend_component.hide();
    }
    
    var _id_component = this._create_id_component();
    _id_component.prependTo(_ui);
    
    //2010.11.1 測試用的偵錯訊息
    //var _param = this._item.get_data();
    //_ui.append('<span> ['+_param.annotation_id+'] </span>');
    
    //_ui.append('<span>'+_param.get_interval_time() + ' - ' + _param.timestamp 
    //    + ' - ' + parseInt((new Date()).getTime()/1000) + ' : ' + (parseInt((new Date()).getTime()/1000) - _param.timestamp) + '</span>');
    
    var _this = this;
    /*
    setTimeout(function () {
        _this.set_user_name();
        _this.set_is_my();
        _this.set_type();
        _this.set_has_recommend();
        _this.set_policy_type();
    }, 0);
    */
    return _ui;
};

// --------
// User Name
// --------

List_header_component.prototype._name_container = null;

List_header_component.prototype.set_user_name = function (_name) 
{
    if ($.is_null(_name))
    {
        var _param = this._item.get_data();
        if ($.isset(_param))
            _name = _param.user.get_name();
        else
            return this;
    }
    
    if ($.is_null(this._name_container))
        this.get_ui();
    
    this._name_container.html(_name);
};

// --------
// Is My Annotation?
// --------

List_header_component.prototype.is_my_classname = 'is-my';

/**
 * @param {Boolean} _is_my
 */
List_header_component.prototype.set_is_my = function (_is_my) 
{
    if ($.is_null(_is_my))
    {
        var _param = this._item.get_data();
        if ($.isset(_param)) 
            _is_my = _param.is_my_annotation();
        else
            return this;
    }
    
    var _ui = this.get_ui();
    
    if (_is_my == true)
        _ui.addClass(this.is_my_classname);
    else
        _ui.removeClass(this.is_my_classname);
    
    return this;
};

List_header_component.prototype.is_my = function () {
    var _ui = this.get_ui();
    return _ui.hasClass(this.is_my_classname);
};

// --------
// Recommend
// --------

List_header_component.prototype._recommend_component = null;

List_header_component.prototype._create_recommend_component = function () {
    var _recommend_img = KALS_context.get_image_url('has-recommend.gif');
    
    var _this = this;
    _recommend_img.addClass('header-option')
        .addClass('recommend')
        .click(function () {
            KALS_text.tool.recommend.setup_recommend(_this._item.get_annotation_param());
            //KALS_text.tool.recommend.get_ui().scrollIntoView();
        });
    this._recommend_component = _recommend_img;
    return _recommend_img;
};

List_header_component.prototype.has_recommend_classname = 'has-recommend';

/**
 * @param {Boolean} _is_my
 */
List_header_component.prototype.set_has_recommend = function (_has_recommend) 
{
    if ($.is_null(_has_recommend))
    {
        var _param = this._item.get_data();
        if ($.isset(_param))
            _has_recommend = _param.has_recommend();
        else
            return this;
    }
    
    var _ui = this.get_ui();
    
    if (_has_recommend == true)
        _ui.addClass(this.is_has_recommend);
    else
        _ui.removeClass(this.is_has_recommend);
    
    return this;
};

List_header_component.prototype.has_recommend = function () {
    var _ui = this.get_ui();
    return _ui.hasClass(this.has_recommend_classname);
};

// --------
// Annotation Type
// --------

List_header_component.prototype._type_container = null;

/**
 * 
 * @param {Annotation_type_param} _type
 */
List_header_component.prototype.set_type = function (_type) 
{
    //$.test_msg('List_header_component.set_type', _type);
    
    if ($.is_null(_type))
    {
        var _param = this._item.get_data();
        if ($.isset(_param))
            _type = _param.type;
        else
            return this;
    }
    
    //$.test_msg('List_header_component.set_type [is_null]', _type);
    
    if ($.is_null(this._type_container))
        this.get_ui();
    
    this._type_container.empty();
    
    /*
    //20111105 把建立type_option的工作都統一到某人身上吧
    var _option = $('<span></span>')
        .addClass('type-option')
        .addClass(_type.get_classname())
        .appendTo(this._type_container);
    
    if (_type.is_basic() == false)
    {
        _option.attr('style', _type.get_menu_style());
    }
    
    var _type_lang_header = Type_menu.prototype._type_lang_header;
    var _type_name = _type.get_type_name();
    if (_type.is_custom())
    {
        var _custom_name = _type.get_type_name();
        
        if ($.isset(_custom_name))
        {
            _option.html(_custom_name);
            _option.addClass('other');    
        }
        else
        {
            var _lang = new KALS_language_param(
                _type_name,
                _type_lang_header + _type_name
            );
            
            KALS_context.lang.add_listener(_option, _lang);
        }
    }
    else 
    {
        var _lang = new KALS_language_param(
            _type_name,
            _type_lang_header + _type_name
        );
        
        KALS_context.lang.add_listener(_option, _lang);
    }
    */
   
    var _option = KALS_context.custom_type.get_type_option(_type);
    _option.appendTo(this._type_container);
    
    return this;
};

// -------
// Recommend
// -------

List_header_component.prototype.has_recommend_classname = 'has-recommend';

/**
 * @param {Boolean} _has_recommend
 */
List_header_component.prototype.set_has_recommend = function (_has_recommend) 
{
    //只有我的標註才要設置recommend的喔！
    if (this.is_my() == false)
        return this;
    
    if ($.is_null(_has_recommend))
    {
        var _param = this._item.get_data();
        if ($.isset(_param))
            _has_recommend = _param.has_recommend();
        else
            return this;
    }
    
    var _ui = this.get_ui();
    
    if (_has_recommend == true)
        _ui.addClass(this.has_recommend_classname);
    else
        _ui.removeClass(this.has_recommend_classname);
    
    return this;
};

List_header_component.prototype.has_recommend = function () {
    var _ui = this.get_ui();
    return _ui.hasClass(this.has_recommend_classname);
};

// --------
// Policy Type
// --------

/**
 * @type {jQuery}
 */
List_header_component.prototype._lock_component = null;

List_header_component.prototype._create_lock_component = function () {
    var _lock_img = KALS_context.get_image_url('policy-lock.gif');
    _lock_img.addClass('header-option')
        .addClass('lock');
    this._lock_component = _lock_img;
    return _lock_img;
};

List_header_component.prototype.set_policy_type = function (_policy_type) {
    
    if ($.is_null(_policy_type))
    {
        var _param = this._item.get_data();
        if ($.isset(_param))
            _policy_type = _param.policy_type;
        else
            return this;
    }
    
    var _ui = this.get_ui();
    var _lock_classname = 'policy-type-lock';
    if (_policy_type == 'private' || _policy_type == 'share')
    {
        _ui.addClass(_lock_classname);
    }
    else
    {
        _ui.removeClass(_lock_classname);
    }
    return this;
};

// --------
// Like
// --------

/**
 * @type {List_like_component}
 */
List_header_component.prototype.like = null;

List_header_component.prototype._setup_like_component = function () {
    var _component = new List_like_component(this._item);
    this.child('like', _component);
    return _component;
};

// --------
// ID
// --------

List_header_component.prototype._id_component = null;

List_header_component.prototype._create_id_component = function () {
    var _component = $('<span></span>')
        .addClass('id-component');
        
    var _param = this._item.get_data();
    if ($.isset(_param))
        _component.html('#' + _param.annotation_id);
    
    this._id_component = _component;
    return _component;
};

/* End of file List_header_component */
/* Location: ./system/application/views/web_apps/List_header_component.js */