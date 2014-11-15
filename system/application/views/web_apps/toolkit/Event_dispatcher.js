/**
 * Event_dispatcher
 *
 * 實作觀察者模式
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
function Event_dispatcher() {
    
    KALS_user_interface.call(this);
    
    this._listeners = [];
    this._once_listeners = [];
}

Event_dispatcher.prototype = new KALS_user_interface();

/**
 * 監聽者
 * @type {function[]|object[]}
 */
Event_dispatcher.prototype._listeners = [];

/**
 * 只有一次的監聽者
 * @type {function[]|object[]}
 */
Event_dispatcher.prototype._once_listeners = [];

/**
 * 是否有改變
 */
Event_dispatcher.prototype._change = false;

Event_dispatcher.prototype._$enable_changed_lock = false;

/**
 * 辨別事件的名稱
 * @type String
 */
Event_dispatcher.prototype._$event_name = 'update';

/**
 * 新增觀察者
 * 
 * 輸入參數可以為：
 * add_listener(_obj, _function, _trigger)
 * add_listener(_obj, _function)
 * add_listener(_obj)
 * add_listener(_obj, _trigger)
 * add_listener(_function, _trigger)
 * add_listener(_function)
 * 
 * @param {Object} _obj
 * @param {Object} _function
 * @param {Object} _trigger
 */
Event_dispatcher.prototype.add_listener = function (_obj, _function, _trigger) {
    if ($.is_function(_obj) 
        && ($.is_null(_function) || $.is_boolean(_function))) {
        _trigger = _function;
        //_function = _obj;
        //_obj = new Object;
    }
    else if ($.is_object(_obj) && $.is_boolean(_function) && $.is_null(_trigger)) {
        _trigger = _function;
        _function = null;
    }
    
    if ($.is_null(_trigger)) {
        _trigger = false;
    }
    
    if ($.inArray(_obj, this._listeners) === -1) {
        if ($.isset(_function)) {
            _obj[this._$event_name] = _function;
        }
        
        this._listeners.push(_obj);
        
        if (_trigger === true) {
            this._notify_listener(_obj);
        }
    }
    return this;
};

/**
 * 新增立即啟動的觀察者
 * 
 * 輸入參數可以為：
 * add_listener(_obj, _function, _trigger)
 * add_listener(_obj, _function)
 * add_listener(_obj)
 * add_listener(_obj, _trigger)
 * add_listener(_function, _trigger)
 * add_listener(_function)
 * 
 * @param {Object} _obj
 * @param {Object} _function
 * @param {Object} _trigger
 */
Event_dispatcher.prototype.add_instant_listener = function (_obj, _function) {
    if ($.is_function(_obj) && _function === undefined) {
        return this.add_listener(_obj, true);
    }
    else {
        return this.add_listener(_obj, _function, true);
    }
};

/**
 * 新增一次觀察者
 * 
 * 輸入參數可以為：
 * add_listener(_obj, _function, _trigger)
 * add_listener(_obj, _function)
 * add_listener(_obj)
 * add_listener(_obj, _trigger)
 * add_listener(_function, _trigger)
 * add_listener(_function)
 * 
 * @param {Object} _obj
 * @param {Object} _function
 * @param {boolean} _trigger = false 是否馬上啟動
 */
Event_dispatcher.prototype.add_once_listener = function (_obj, _function, _trigger) {
    //參數初始化
    if ($.is_function(_obj) 
        && ($.is_null(_function) || $.is_boolean(_function))) {
        _trigger = _function;
        //_function = _obj;
        //_obj = new Object;
    }
    else if ($.is_object(_obj) && $.is_boolean(_function) && $.is_null(_trigger)) {
        _trigger = _function;
        _function = null;
    }
    
    //$.test_msg("增加了一次事件", _obj);
    
    if ($.is_null(_trigger)) {
        _trigger = false;
    }
    
    //接下來開始進行事件觸發
    if ($.inArray(_obj, this._once_listeners) === -1) {
        if ($.isset(_function)) {
            _obj[this._$event_name] = _function;
        }
        
        //if (this._$load_url === 'generic/info') {
        //    $.test_msg("註冊 (啟動=" + _trigger + ")", _obj);
        //}
        //$.test_msg("註冊 (啟動=" + _trigger + ")", _obj);
        //$.test_msg("註冊 (啟動=" + _trigger + ")");
        this._once_listeners.push(_obj);
        
        //$.test_msg("註冊once_listeners", [this._once_listeners.length, _obj]);
        
        if (_trigger === true) {
            this._notify_once_listener(_obj);
        }
    }
    //$.test_msg("Event_dispatcher.add_once_listener()", "end 註冊 (啟動=" + _trigger + ")");
    return this;
};

Event_dispatcher.prototype._notify_once_listener = function(_obj, _complate) {
    var _complete = this._notify_listener(_obj);
            
    if (!(typeof(_complete) === 'boolean'
        && _complete === false)) {
        //除非回傳false，否則一律刪除
        this.delete_once_listener(_obj);
    }
};

Event_dispatcher.prototype._trigger_listener = function (_listener) {
    if ($.is_object(_listener)) {
		return _listener[this._$event_name](this);
	}
	else {
		return _listener(this);
	}
};

/**
 * 刪除觀察者
 * @param {Object|function} _obj
 */
Event_dispatcher.prototype.delete_listener = function (_obj) {
    this._listeners = this._delete_listener_data(
        this._listeners,
        _obj
    );
    return this;
};

/**
 * 刪除一次觀察者
 * @param {Object} _obj
 */
Event_dispatcher.prototype.delete_once_listener = function (_obj) {
    this._once_listeners = this._delete_listener_data(
        this._once_listeners,
        _obj
    );
    return this;
};

/**
 * 依據觀察者跟參數來刪除資料的動作
 * @param {function[]|Object[]} _listeners
 * @param {Object|function} _obj
 */
Event_dispatcher.prototype._delete_listener_data = function (_listeners, _obj) {
    var _key;
    if ($.is_object(_obj)) {
        _key = $.inArray(_obj, _listeners);
        //if (_key > -1)
        //    delete _listeners[_key];
        if (_key > -1) {
			_listeners = $.array_remove(_listeners, _key);
		}
    }
    else if ($.is_function(_obj)) {
        var _func = _obj;
        for (_key in _listeners) {
            _obj = _listeners[_key];
            
            if ($.is_object(_obj)) {
                if (typeof(_obj[this._$event_name] === 'function')
                    && _obj[this._$event_name] === _func) {
                    //delete _listeners[_key];
                    _listeners = $.array_remove(_listeners, _key);
                }
                    
            }
            else if ($.is_function(_obj)) {
                if (_obj === _func) {
                    //delete _listeners[_key];
                    _listeners = $.array_remove(_listeners, _key);
                }
            }
        }
    }
    return _listeners;
};

/**
 * 通知所有觀察者
 * @param {Object} _arg
 */
Event_dispatcher.prototype.notify_listeners = function (_arg) {
    if (this._$enable_changed_lock === false 
        || (this._$enable_changed_lock === true && this._changed)) {
        //var _event_name = this._$event_name;
        
        //$.test_msg('Event_dispatcher.notify_listeners()', this._listeners.length);
        
        var _listener;
        for (var _i in this._listeners) {
            _listener = this._listeners[_i];
            this._notify_listener(_listener, _arg);
        }
        
        //if (this._$load_url === 'generic/info') {
        //    $.test_msg("預備通知once_listeners [" + $.get_class(this) + "]", this._once_listeners.length);
        //}
        //for (_i in this._once_listeners) {
        while (this._once_listeners.length > 0) {
            _listener = this._once_listeners.pop();
            //if (this._$load_url === 'generic/info') {
            //    $.test_msg("預備通知once_listeners", _listener);
            //}
            this._notify_once_listener(_listener, _arg);
        }
        
        if (this._$enable_changed_lock === true) {
            this._changed = false;
        }
    }
    return this;
};

Event_dispatcher.prototype._notify_listener = function (_listener, _arg) {
    
    var _event_name = this._$event_name;
    var _result;
    
    if ($.is_function(_listener)) {
        if ($.isset(_arg)) {
			_result = _listener(this, _arg);
		}
		else {
			_result = _listener(this);
		}
    }
    else if (typeof(_listener[_event_name]) == 'function') {
        //$.test_msg('Event_dispatcher.notify_listeners() has event', _event_name);
        
        if ($.isset(_arg)) {
			_result = _listener[_event_name](this, _arg);
		}
		else {
			_result = _listener[_event_name](this);
		}    
    }
    
    return _result;
};

/**
 * 設定已變更
 * 
 * 如果this._$enable_changed_lock有開啟，那麼在作notify_lis
 */
Event_dispatcher.prototype.set_changed = function () {
    this._changed = true;
    return this;
};

/* End of file Event_dispatcher */
/* Location: ./system/application/views/web_apps/Event_dispatcher.js */