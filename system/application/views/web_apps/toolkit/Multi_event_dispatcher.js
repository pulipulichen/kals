/**
 * Multi_event_dispatcher
 *
 * 實作觀察者模式，多重模式
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/7/28 下午 03:36:17
 * @extends {KALS_user_interface}
 */
function Multi_event_dispatcher(){
    
    KALS_user_interface.call(this);
    
    this._types = [];
    this._type_listeners = {};
    this._$enable_types = [];
}

Multi_event_dispatcher.prototype = new KALS_user_interface();
        
/**
 * 監聽類型
 * @type {Array}
 */
Multi_event_dispatcher.prototype._types = [];

/**
 * 該監聽類型的監聽者
 * @type {Object}
 * @example 
 * _type_listeners = {
 *   'trigger': [function1, function2, function3]
 * };
 */
Multi_event_dispatcher.prototype._type_listeners = {};

/**
 * 允許的監聽類型
 * @type {String[]}
 */
Multi_event_dispatcher.prototype._$enable_types = [];

/**
 * 預設的監聽類型
 * @type {string}
 */
Multi_event_dispatcher.prototype._default_type = 'trigger';

/**
 * 增加監聽者
 * 
 * @param {string} _type 監聽類型
 * @param {function} _function 回呼函數。
 * _function = function (_dispatcher) { //... }
 * @param {boolean} _trigger 是否立刻啟動
 */
Multi_event_dispatcher.prototype.add_listener = function (_type, _function, _trigger) {
    
    if ($.is_array(_type)) {
        var _types = _type;
        for (var _t in _types) {
            this.add_listener(_types[_t], _function, _trigger);
        }
        return this;
    }
    
    if ($.is_function(_type) 
        && ($.is_null(_function) || $.is_boolean(_function))) {
        _trigger = _function;
        _type = _function;
        _type = this._default_type;
    }
    
    if ($.is_null(_trigger)) {
        _trigger = false;
    }
    
    if ($.inArray(_type, this._types) === -1) {
        this._types.push(_type);
        this._type_listeners[_type] = [];
        
        //if (_type == 'select')
        //    $.test_msg('Multi_event_dispatcher.add_listener() create new type', this._type_listeners[_type].length);
    } 
    
    if ($.inArray(_function, this._type_listeners[_type]) === -1) {
        
        this._type_listeners[_type].push(_function);
        
        if (_trigger === true) {
            _function(this);
        }
    }
    return this;
};

/**
 * 是否擁有此類型的監聽者
 * @param {string} _type
 */
Multi_event_dispatcher.prototype.has_type = function (_type) {
    if ($.is_null(_type)) {
		_type = this._default_type;
	}
    
    return ($.inArray(_type, this._types) > -1);
};

/**
 * 刪除監聽者
 * @param {string} _type
 * @param {function} _function
 */
Multi_event_dispatcher.prototype.delete_listener = function (_type, _function) {
    if ($.is_function(_type) && $.is_null(_function)) {
        _function = _type;
        _type = this._default_type;
    }
    
    if (false === this.has_type(_type)) {
        return this;
    }
    
    var _key = $.inArray(_function, this._type_listeners[_type]);
    if (_key > -1) {
        delete this._type_listeners[_type][_key];
    }
    return this;
};

/**
 * 通知監聽者
 * @param {function} _type
 */
Multi_event_dispatcher.prototype.notify_listeners = function (_type, _arg) {
    if (false === this.has_type(_type)) {
        return this;
    }
    
    var _this = this;
    
    var _listeners = this._type_listeners[_type];
    
    for (var _i in _listeners) {       
        var _listener = _listeners[_i];
        if ($.is_function(_listener)) {
            _listener(_this, _arg);
        }
    }
    return _this;
};

/* End of file Multi_event_dispatcher */
/* Location: ./system/application/views/web_apps/toolkit/Multi_event_dispatcher.js */