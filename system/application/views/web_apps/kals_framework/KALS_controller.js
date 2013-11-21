/**
 * KALS_controller
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
function KALS_controller() {
    
    JSONP_dispatcher.call(this);
}

/**
 * ===========================
 * 開頭宣告
 * ===========================
 */

KALS_controller.prototype = new JSONP_dispatcher();

/**
 * 繼承自KALS_modal，要結合起來
 */
var _modal_prototype = new KALS_modal();
for (var _i in _modal_prototype) {
    KALS_controller.prototype[_i] = _modal_prototype[_i];
}

/**
 * ===========================
 * 請覆寫的屬性
 * ===========================
 */

/**
 * 使用要使用的VIEW
 * ※ 請覆寫這個類別
 * 
 * @type {string}
 * @protected
 */
KALS_controller.prototype._$view = null;

/**
 * 指定要使用的MODEL
 * ※ 請覆寫這個類別
 * 
 * @type {string}
 * @protected
 */
KALS_controller.prototype._$model = null;

/**
 * 允許未登入使用者
 * @type {Boolean}
 */
KALS_controller.prototype._$auth_allow_anonymous = false;

KALS_controller.prototype._enable_flag = true;

KALS_controller.prototype._$enable_debug = true;

/**
 * ===========================
 * 允許讓外部可用的方法
 * ===========================
 */

/**
 * 取得request_url
 * @type {String}
 */
KALS_controller.prototype.get_request_url = function () {
	var _url = this._$model;
    
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
 * @param {string} _method get|post
 * @param {string} _action
 * @param {JSON} _data
 * @param {function} _callback
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.request = function (_method, _action, _data, _callback) {
    if (this._enable_flag === false) {
        this.debug('request', 'enable flag is false');
        return this;
    }
    
    var _url = this.get_request_url();

    if ($.is_null(_url)) {
        $.test_msg('temp', 'url is null');
        return $.trigger_callback(_callback);
    }

    _url = _url + '/request';

    if (this._enable_debug_flag === true) {
        _data["_enable_debug"] = true;
        this._enable_debug_flag = false;
    }
    if (this._enable_cache_flag === true) {
        _data["_enable_cache"] = true;
        this._enable_cache_flag = false;
    }
    
    _data["_action"] = _action;

    var _this = this;
    var _ajax_config = {
        url: _url,
        data: _data,
        callback: function (_data) {
            if (typeof(_callback) === 'function') {
                _callback(_data);
            }
        }
    };

    if (_method === 'get') {
            KALS_util.ajax_get(_ajax_config);
    }
    else {
            KALS_util.ajax_post(_ajax_config);
    }

    return this;
};

/**
 * 開啟偵錯模式
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.enable_debug = function () {
    this._enable_debug_flag = true;
    return this;
};

KALS_controller.prototype._enable_debug_flag = false;

/**
 * 開啟快取模式
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.enable_cache = function () {
    this._enable_cache_flag = true;
    return this;
};

KALS_controller.prototype._enable_cache_flag = false;


/**
 * 在回傳資料時，設定資料
 * 
 * 設定資料的同時，會告知所有監聽者
 * @param {Object} _data
 */
KALS_controller.prototype.set_data = function (_data) {
    JSONP_dispatcher.prototype.set_data.call(this, _data);
	this.set_sub_field(_data);
    return this;
};

/**
 * 重置取得的資料
 */
KALS_controller.prototype.reset_data = function () {
    this._data = this._default_reset_data;
    return this._data;
};


/**
 * 開啟UI
 * @param {function|null} _callback
 */
/*
KALS_controller.prototype.open = function (_callback) {
	var _this = this;
	
	if (this._$model !== null) {
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
 * 初始化要執行的action
 * @type {String} null表示不做初始化
 */
KALS_controller.prototype._$init_request_action = null;

/**
 * 開啟要執行的action
 * @type {String} null表示不做初始化
 */
KALS_controller.prototype._$open_request_action = null;

/**
 * 關閉時要執行的action
 * @type {String} null表示不做初始化
 */
KALS_controller.prototype._$close_request_action = null;

/**
 * 初始化樣板資料，覆寫KALS_user_interface的作法
 * @param {jQuery} _view
 */
KALS_controller.prototype._initialize_view_data = function (_view) {
    var _this = this;
	
    if (this._$model !== null
        && this._$init_request_action !== null) {
        this.request('get', this._$init_request_action, this.get_data(), function (_data) {
                _this.debug('VIEW, init data', _data);
                _this.set_data(_data);
                KALS_user_interface.prototype._initialize_view_data.call(_this, _view);
        });
    }
    else {
        KALS_user_interface.prototype._initialize_view_data.call(_this, _view);
    }	
    return _view;
};

/**
 * 覆寫開啟時的動作
 * @param {funciton} _callback
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.open = function (_callback) {
    if (this._enable_flag === false) {
        return $.trigger_callback(_callback);
    }
    
    //this.debug('open', this._enable_flag);
    if (this._$model !== null
        && this._$open_request_action !== null) {
        var _this = this;
        this.request('get', this._$open_request_action, this.get_data(), function (_data) {
                _this.debug('VIEW, open data', _data);
                _this.set_data(_data);
                KALS_modal.prototype.open.call(_this, _callback);
        });
    }
    else {
        KALS_modal.prototype.open.call(this, _callback);
    }
    return this;
};

/**
 * 覆寫關閉時的動作
 * @param {funciton} _callback
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.close = function (_callback) {
    if (this._enable_flag === false) {
        return $.trigger_callback(_callback);
    }
    
    if (this._$model !== null
        && this._$close_request_action !== null) {
        var _this = this;
        this.request('get', this._$close_request_action, this.get_data(), function (_data) {
                _this.debug('VIEW, close data', _data);
                _this.set_data(_data);
                KALS_modal.prototype.close.call(_this, _callback);
        });
    }
    else {
        KALS_modal.prototype.close.call(this, _callback);
    }
    return this;
};

/**
 * 以GET方式
 * @param {String} _action
 * @param {JSON} _data
 * @param {function} _callback
 * @returns {KALS_controller.prototype@call;request}
 */
KALS_controller.prototype.request_get = function(_action, _data, _callback) {
    return this.request('get', _action, _data, _callback);
};

/**
 * 以POST方式
 * @param {String} _action
 * @param {JSON} _data
 * @param {function} _callback
 * @returns {KALS_controller.prototype@call;request}
 */
KALS_controller.prototype.request_post = function(_action, _data, _callback) {
    return this.request('post', _action, _data, _callback);
};

/**
 * 建立UI的動作
 */
KALS_controller.prototype._setup_ui = function () {
    this._ui = this._$create_ui();
    this._auth_check();
    return this;
};

// --------------------------
// 內部方法
// --------------------------

/**
 * 取得現在的使用者
 * @type {User_param}
 */
KALS_controller.prototype.get_user = function () {
    return KALS_context.user.get_user_param();
};

/**
 * 設定快速鍵
 * @param {int} _hotkey
 * 請參考 http://unixpapa.com/js/key.html
 * @param {function} _callback
 */
KALS_controller.prototype.set_hotkey = function (_hotkey, _callback) {
	// @TODO
};

/**
 * 輸入搜尋條件，開啟搜尋視窗搜尋標註
 * @param {JSON} _param
 * _param = {
 *  range: "note|author|type|anchor_text",
 *  keyword:"keyword",
 *  order_by: "update|create"
 * }
 * @returns {KALS_controller.protoype}
 */
KALS_controller.prototype.search_annotation = function (_param) {
    // @TODO
    return this;
};

/**
 * 取得現在使用的標註類型
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.get_annotation_types = function () {
    // @TODO
    return this;
};

/**
 * 觀看標註的詳細資料
 * @param {int} _annotation_id
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.view_annotation = function (_annotation_id) {
    // @TODO
    return this;
};

/**
 * 選擇頁面上指定的標註
 * @param {int} _annotation_id
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.select_annotation = function (_annotation_id) {
    // @TODO
    return this;
};

/**
 * 偵錯
 * @param {String} _header
 * @param {Object} _message
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.debug = function (_header, _message) {
    if (this._$enable_debug === true) {
        $.test_msg(_header, _message);
    }
    return this;
};

/**
 * 檢查權限
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype._auth_check = function () {
    $.test_msg('check auth', this._$auth_allow_anonymous);
    if (this._$auth_allow_anonymous === false) {
        $.test_msg('check anonymous');
        if (this.get_user() === null) {
            this.hide();
            this._enable_flag = false;
            this.debug('not allow anonymous');
        }
    }
    return this;
};

KALS_controller.prototype.disable_controller = function () {
    this.hide();
    this._enable_flag = false;
    //this.debug('not allow anonymous');
};

KALS_controller.prototype.enable_controller = function () {
    this.show();
    this._enable_flag = true;
    //this.debug('allow anonymous');
};

/* End of file KALS_controller */
/* Location: ./system/application/views/web_apps/toolkit/KALS_controller.js */