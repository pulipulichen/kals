/**
 * Injection_event_dispatcher
 *
 * 實作觀察者模式，多重模式
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2014/7/1 下午 05:28:30
 * @extends {Multi_event_dispatcher}
 */
function Injection_event_dispatcher(_object){
    
    Multi_event_dispatcher.call(this);
    
    this._types = [];
    this._type_listeners = {};
    this._$enable_types = [];
    
    if (_object !== undefined) {
        this.add_dispatcher_object(_object);
    }
}

Injection_event_dispatcher.prototype = new Multi_event_dispatcher();

/**
 * 預備要注入的資料
 * @type Object
 */
Injection_event_dispatcher.prototype._dispatcher_object = null;

/**
 * 新增要監聽的物件
 * @param {Object} _object
 * @returns {Injection_event_dispatcher}
 */
Injection_event_dispatcher.prototype.add_dispatcher_object = function (_object) {
    if (_object === undefined 
            || _object === null
            || $.is_object(_object) === false) {
        KALS_util.throw_exception("Object is not defined");
        return this;
    }
    
    this._dispatcher_object = _object;
    return this;
}

/**
 * 檢查物件是否相同
 * @param {Object} _object
 * @returns {Injection_event_dispatcher}
 */
Injection_event_dispatcher.prototype.is_object_equals = function (_object) {
    if (_object === undefined 
            || _object === null
            || $.is_object(_object) === false) {
        return false;
    }
    
    return (this._dispatcher_object === _object);
}

/**
 * 通知監聽者
 * @param {String} _type
 * @param {JSON} _arg
 * @returns {Injection_event_dispatcher}
 */
Injection_event_dispatcher.prototype.notify_listeners = function (_type, _arg) {
    if (false === this.has_type(_type)) {
        return this;
    }
    
    var _listeners = this._type_listeners[_type];
    
    for (var _i in _listeners) {       
        var _listener = _listeners[_i];
        if ($.is_function(_listener)) {
            _listener(this._dispatcher_object, _arg);
        }
    }
    return this;
};
      
/* End of file Injection_event_dispatcher */
/* Location: ./system/application/views/web_apps/toolkit/Injection_event_dispatcher.js */