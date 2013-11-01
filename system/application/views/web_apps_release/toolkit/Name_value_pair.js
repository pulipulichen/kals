/**
 * Name_value_pair
 *
 * 名值配對
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/21 下午 01:47:12
 * @param {String} _string_data 要輸入的解序列化資料
 */
function Name_value_pair(_string_data) {
    
    this._data = {};
    
    this.unserialize(_string_data);
        
}

/**
 * 保存名值對的資料
 * @memberOf {Name_value_pair}
 * @type {Object}
 */
Name_value_pair.prototype._data = {};

/**
 * 分割字串的指示符號
 * @type {string}
 */
Name_value_pair.prototype._splitter = '&';

/**
 * 指定值的符號
 * @type {string}
 */
Name_value_pair.prototype._indicator = '=';

/**
 * 解序列
 * @memberOf {Name_value_pair}
 * @param {string} _string_data 要解序列化的字串資料
 * @type {Object} 解序列化之後的物件資料 
 */
Name_value_pair.prototype.unserialize = function (_string_data) {
    if (false == $.is_string(_string_data)) {
        return this.reset();
    }
    
    var _string_array = _string_data.split(this._splitter);
    var _object_data = {};
    for (var _i in _string_array) {
        var _data = _string_array[_i];
        var _pos = _data.indexOf(this._indicator);
        
        if (_pos == -1) {
			continue;
		}
            
        var _key = _data.substring(0, _pos);
        var _value = _data.substring((_pos+1), _data.length);
        
        _object_data[_key] = _value;
    }
    
    this._data = _object_data;
    
    return _object_data;
};

/**
 * 將this._data序列化成字串之後回傳
 * @type {string}
 */
Name_value_pair.prototype.serialize = function () {
    var _object_data = this._data;
    var _string_data = '';
    
    for (var _key in _object_data) {
        var _value = _object_data[_key];
        
        _string_data = _string_data + _key + this._indicator + _value + this._splitter;
    }
    
    _string_data = _string_data.substring(0, _string_data.length-1);
    
    return _string_data;
};

/**
 * 等同this.serialize
 * @type {string}
 */
Name_value_pair.prototype.to_string = function () {
    return this.serialize();
};

/**
 * 取得this._data欄位的值
 * @param {String} _key
 * @param {Object} _default
 * @type {Object}
 */
Name_value_pair.prototype.get_field = function (_key, _default) {
    if (typeof(this._data[_key]) !== undefined) {
        return this._data[_key];
    }
    else {
        return _default;
    }
};

Name_value_pair.prototype.has_field = function (_key) {
    return (typeof(this._data[_key]) != 'undefined');
};

/**
 * 設置欄位的值
 * @param {String} _key
 * @param {Object} _value
 */
Name_value_pair.prototype.set_field = function (_key, _value) {
    this._data[_key] = _value;
    return this;
};

/**
 * 刪除欄位
 * @param {String} _key
 */
Name_value_pair.prototype.delete_field = function (_key) {
    if (typeof(this._data[_key]) != 'undefined') {
		delete this._data[_key];
	}
    return this;
};

/**
 * 取得this._data
 * @type {Object}
 */
Name_value_pair.prototype.get_data = function () {
    return this._data;
};

/**
 * 清除this._data
 */
Name_value_pair.prototype.reset = function () {
    this._data = {};
    return this;
};

/**
 * 回傳this._data
 * @type {Object}
 */
Name_value_pair.prototype.get_data = function () {
    return this._data;
};

/* End of file Name_value_pair */
/* Location: ./system/application/views/web_apps/Name_value_pair.js */