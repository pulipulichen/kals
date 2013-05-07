/**
 * Attribute_event_dispatcher
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/11 下午 09:43:22
 * @extends {Multi_event_dispatcher}
 */
function Attribute_event_dispatcher(){
    
    this._attributes = {};
    
}

Attribute_event_dispatcher.prototype = new Multi_event_dispatcher(); 

/**
 * 屬性保存
 * @type {Object}
 */
Attribute_event_dispatcher.prototype._attributes = {};

/**
 * 設定屬性
 * @param {string} _type 屬性類型
 * @param {Object} _value 值
 */
Attribute_event_dispatcher.prototype.set_attr = function (_type, _value) {
    
    this._attributes[_type] = _value;
    //$.test_msg('Attr .set_attr', _type, _value);
    return this.notify_listeners(_type, _value);
};

/**
 * 取消屬性
 * @param {string} _type 屬性類型
 */
Attribute_event_dispatcher.prototype.unset_attr = function (_type) {
    this._attributes[_type] = null;
    return this.notify_listeners(_type);
};

Attribute_event_dispatcher.prototype.reset = function () {
    for (var _type in this._attributes) {
        this.unset_attr(_type);
    }
    return this;
};

/**
 * 取得屬性
 * @param {string} _type 屬性類型
 * @param {Object} _default 預設值
 * @param {number|null} _length 最大長度
 */
Attribute_event_dispatcher.prototype.get_attr = function (_type, _default, _length) {
    if ($.is_null(_type)
        || typeof(this._attributes[_type]) == 'undefined') {
        if ($.is_null(_default))
            return null;
        else
            return _default;
    }   
    else {
        var _value = this._attributes[_type];
        
        //$.test_msg('Atrr get_attr()', [_type, _default, _length]);
        
        if ($.isset(_value)
            && $.is_number(_length)
            && _value.length > _length) {
            _value = _value.substr(0, _length) + '...';
        }
        return _value;
    }
        
};

/**
 * 增加屬性監聽者
 * @param {string} _type
 * @param {function} _attr_function 屬性回呼函數。會回傳屬性的值。
 * _attr_function = function (_dispatcher, _attr) { //... }
 * @param {boolean} _trigger 是否立即啟動，預設是true。
 */
Attribute_event_dispatcher.prototype.add_attr_listener = function (_type, _attr_function, _trigger) {
    if ($.is_null(_trigger))
        _trigger = true;
    
    var _function = function(_dispatcher) {
        var _attr = _dispatcher.get_attr(_type);
        
        if ($.is_function(_attr_function))
            _attr_function(_dispatcher, _attr);
        else if (typeof(_attr_function.innerHTML))
            _attr_function.innerHTML = _attr;
        else if ($.is_function(_attr_function.html))
            _attr_function.html(_attr);
    };
    
    return this.add_listener(_type, _function, _trigger);
},

/**
 * 通知所有監聽者
 */
Attribute_event_dispatcher.prototype.notify_total_listeners = function () {
    for (var _type in this._attributes) {
        this.notify_listeners(_type);
    }
    return this;
};

/**
 * 取得參數的索引名稱
 * @type {string}
 * @property
 */
Attribute_event_dispatcher.prototype._$data_key = 'data';

/**
 * 更新資料
 * 
 * 通常其他人利用JSONP_dispatcher.add_listener來訂閱資料
 * @param {JSONP_dispatcher} _dispatcher
 * @param {Object} _data 從伺服器回傳的JSON資料
 */
Attribute_event_dispatcher.prototype.update = function (_dispatcher, _data) {
    
    var _data_key = this._$data_key;
    if (_data_key === null)
        return this;
    
    //$.test_msg('Attribute_event_dispatcher.update()', _data);
    //$.test_msg('Attribute_event_dispatcher.update()', [_data_key, typeof(_data[_data_key])]);
    
    if (typeof(_data[_data_key]) != 'undefined') {
        //$.test_msg('Attribute_event_dispatcher.update()', _data);
        //$.test_msg('Attribute_event_dispatcher.update()', [_data_key, typeof(_data[_data_key])]);
    
        for (var _key in _data[_data_key]) {
            //$.test_msg('Attribute_event_dispatcher.update()', [_key, _data[_data_key][_key]]);
            this.set_attr(_key, _data[_data_key][_key]);
        }
    }
    else {
        this.reset();
    }
    
    //$.test_msg('attr name' , this.get_attr('name', 'NULL'));
    return this;
};

/* End of file Attribute_event_dispatcher */
/* Location: ./system/application/views/web_apps/Attribute_event_dispatcher.js */