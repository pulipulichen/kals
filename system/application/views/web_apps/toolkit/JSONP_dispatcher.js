/**
 * JSONP_dispatcher
 *
 * 以JSONP實作觀察者模式
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/7/28 下午 03:36:17
 * @extends {Event_dispatcher}
 */
function JSONP_dispatcher(_url) {
    
    Event_dispatcher.call(this);
    
    this._default_reset_data = null;
    
    //this._data = null;
    if ($.isset(_url)) {
		this.set_load_url(_url);
	}
    
	this._register_context();
}

JSONP_dispatcher.prototype = new Event_dispatcher();

/**
 * 取得資料之後，保存在這個屬性中。請讓他留空。
 * @type {Object}
 * @private
 */
//JSONP_dispatcher.prototype._data = {};

/**
 * 此類別要讀取的url網址。
 * 
 * 要注意的是，前置基本網址會在KALS_util.ajax_get當中自動加入，所以此處並不需要前置網址
 * 例如：load_url = 'login';
 * 實際上送出時會變成 'http://192.168.11.2/CodeIgniter_1.7.2/web_apps/login'
 * @type {string}
 * @protected
 */
JSONP_dispatcher.prototype._$load_url = null;

/**
 * 指定此類別要讀取的網址
 * @param {string} _url
 * 要注意的是，前置基本網址會在KALS_util.ajax_get當中自動加入，所以此處並不需要前置網址
 * 例如：_url = 'login';
 * 實際上送出時會變成 'http://192.168.11.2/CodeIgniter_1.7.2/web_apps/login'
 */
JSONP_dispatcher.prototype.set_load_url = function (_url) {
    this._$load_url = _url;
    return this;
};

JSONP_dispatcher.prototype.get_load_url = function () {
	var _url = this._$load_url;
	if ($.is_null(_url)) {
		return _url;
	}
	
	if ($.ends_with(_url, '/')) {
		_url = _url.substr(0, _url.length-1);
	}
	return _url;
};

/**
 * 開始讀取資料
 * @param {Object} _arg
 * @param {Function} _callback 可以指定參數
 * _callback = function (_dispatcher, _data) {
 *     //可以利用_data跟_dispatcher來做點事情，像是_dispatcher.get_data()
 * };
 */
JSONP_dispatcher.prototype.load = function (_arg, _callback) {
    
    if ($.is_function(_arg) && $.is_null(_callback)) {
        _callback = _arg;
        _arg = null;
    }
    var _this = this;
    
    //$.test_msg('JSONP_dispatcher load', this._$load_url);
    
    var _config = {
        url: this._$load_url, 
        data: _arg, 
        callback: function(_data){
            
            //$.test_msg('JSONP_dispatcher.load() ajax_get', _data);
            
            if ($.is_function(_callback)) {
                    _callback(_this, _data);
            }
                
            _this.set_data(_data);
        },
        retry: 1
    };
    
    if ($.is_function(this._$exception_handle)) {
        _config.exception_handle = function (_data) {
            _this._$exception_handle(_data);    
        }; 
    }
    
    KALS_util.ajax_get(_config);
    return this;
};

JSONP_dispatcher.prototype._$exception_handle = null;

JSONP_dispatcher.prototype._notify_listener = function (_obj, _arg) {
    if ($.is_null(_arg)) {
		_arg = this.get_data();
	}
    return Event_dispatcher.prototype._notify_listener.call(this, _obj, _arg);
};

/**
 * 在回傳資料時，設定資料
 * 
 * 設定資料的同時，會告知所有監聽者
 * @param {Object} _data
 */
JSONP_dispatcher.prototype.set_data = function (_data) {
    
    this._data = _data;
    this.set_changed();
    
    //$.test_msg('JSONP set_data ('+this._listeners.length+' listeners)', _data);
    
    this.notify_listeners(_data);
    return this;
};

/**
 * 取得資料
 * @type {Object} JSON資料
 */
JSONP_dispatcher.prototype.get_data = function () {
    return this._data;
};

/**
 * 重置取得的資料
 */
JSONP_dispatcher.prototype.reset_data = function () {
    this._data = this._default_reset_data;
    return this._data;
};

/**
 * 取得指定欄位的資料
 * @param {String} _field
 * @type {Object}
 */
JSONP_dispatcher.prototype.get_field = function (_field) {
	if (this._data !== null && typeof(this._data[_field]) !== 'undefind') {
		return this._data[_field];
	}
	else {
		return;
	}
};

/**
 * 如果要向KALS_context註冊，則填入自己的Class Name
 * 設定null表示不註冊
 */
JSONP_dispatcher.prototype._$context_register = null;

/**
 * 向KALS_context註冊，索取資料
 */
JSONP_dispatcher.prototype._register_context = function () {
	if (this._$context_register !== null) {
		
		var _register = this._$context_register;
		var _this = this;
		//Context訂閱一下
	    if (typeof(KALS_context) != 'undefined') {
	        KALS_context.add_listener(function (_dispatcher, _data) {
	            if (typeof(_data[_register]) != 'undefined') {
	                _this.set_data(_data[_register]);
	            }
	        });
	    }
	};
};

JSONP_dispatcher.prototype._default_reset_data = null;

/* End of file JSONP_dispatcher */
/* Location: ./system/application/views/web_apps/JSONP_dispatcher.js */