/**
 * Template_controller
 *
 * 結合樣板的控制器
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2011/11/19 下午 03:36:17
 * @extends {JSON_dispatcher}
 */
function Template_controller() {
    
    JSONP_dispatcher.call(this);
    
}

/**
 * ===========================
 * 開頭宣告
 * ===========================
 */

Template_controller.prototype = new JSONP_dispatcher();

/**
 * 繼承自KALS_modal，要結合起來
 */
var _modal_prototype = new KALS_modal();
for (var _i in _modal_prototype) {
	Template_controller.prototype[_i] = _modal_prototype[_i];
}

/**
 * ===========================
 * 請覆寫的屬性
 * ===========================
 */

/**
 * 此類別要讀取的url網址。
 * ※ 請覆寫這個類別
 * 
 * 要注意的是，前置基本網址會在KALS_util.ajax_get當中自動加入，所以此處並不需要前置網址
 * 例如：load_url = 'login';
 * 實際上送出時會變成 'http://192.168.11.2/CodeIgniter_1.7.2/web_apps/login'
 * @type {string}
 * @protected
 */
Template_controller.prototype._$request_url = null;

/**
 * ===========================
 * 允許讓外部可用的方法
 * ===========================
 */

/**
 * Request GET方法
 * @param {Function} _callback
 */
Template_controller.prototype.request_get = function (_callback) {
	
    //$.test_msg('temp, request_get');
    return this._request('get', 'get', _callback);
};

/**
 * Request POST方法
 * @param {Function} _callback
 */
Template_controller.prototype.request_post = function (_callback) {
    return this._request('post', 'post', _callback);
};

/**
 * Request PUT方法
 * @param {Function} _callback
 */
Template_controller.prototype.request_put = function (_callback) {
    return this._request('get', 'put', _callback);
};

/**
 * Request DELETE方法
 * @param {Function} _callback
 */
Template_controller.prototype.request_delete = function (_callback) {
    return this._request('get', 'delete', _callback);
};

/**
 * 取得request_url
 * @type {String}
 */
Template_controller.prototype.get_request_url = function () {
	var _url = this._$request_url;
    
	if ($.is_null(_url)) {
        return _url;
    }
    
	if ($.ends_with(_url, '/')) {
        _url = _url.substr(0, _url.length-1);
    }
    return _url;
};

/**
 * ===========================
 * 內部設定的方法
 * ===========================
 */

/**
 * 送出請求
 * @param {String} _method get|post
 * @param {String} _rest_type get|post|put|delete
 * @param {Function} _callback
 */
Template_controller.prototype._request = function (_method, _rest_type, _callback) {
	var _url = this.get_request_url();
	
	if ($.is_null(_url)) {
		$.test_msg('temp', 'url is null');
		return $.trigger_callback(_callback);
	}
	
	_url = _url + '/' + _rest_type;
	
	var _data = this.get_data();
    
	
	var _this = this;
	var _ajax_config = {
		url: _url,
		data: _data,
		callback: function (_data) {
			_this.set_data(_data);
			$.trigger_callback(_callback);
		}
	};
	
	if (_method == 'get') {
		KALS_util.ajax_get(_ajax_config);
	}
	else {
		KALS_util.ajax_post(_ajax_config);
	}
	
	return this;
};

/**
 * 在回傳資料時，設定資料
 * 
 * 設定資料的同時，會告知所有監聽者
 * @param {Object} _data
 */
Template_controller.prototype.set_data = function (_data) {
    JSONP_dispatcher.prototype.set_data.call(this, _data);
	this.set_sub_field(_data);
    return this;
};

/**
 * 重置取得的資料
 */
Template_controller.prototype.reset_data = function () {
    this._data = this._default_reset_data;
    return this._data;
};


/**
 * 開啟UI
 * @param {function|null} _callback
 */
/*
Template_controller.prototype.open = function (_callback) {
	var _this = this;
	
	if (this._$request_url !== null) {
		//this.request_get(function() {
	        KALS_modal.prototype.open.call(_this, _callback);
	    });
	}
	else {
		$.trigger_callback(_callback);
	}
	
	//http://localhost/kals/help/config_annotation_scope.html#modal=Dashboard&select=69,127
    return this;
};
*/
/**
 * 初始化樣板資料，覆寫KALS_user_interface的作法
 * @param {jQuery} _template
 */
Template_controller.prototype._initialize_template_data = function (_template) {
	var _this = this;
	
	if (this._$request_url !== null) {
        this.request_get(function () {
			$.test_msg('temp, init data');
			KALS_user_interface.prototype._initialize_template_data.call(_this, _template);
		});
    }
	
    return _template;
};

/* End of file Template_controller */
/* Location: ./system/application/views/web_apps/toolkit/Template_controller.js */