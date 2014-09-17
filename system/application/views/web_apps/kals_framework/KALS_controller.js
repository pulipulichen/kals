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
 * @extends {KALS_modal}
 * @constructor
 * @class {KALS_controller}
 */
function KALS_controller() {
    
    JSONP_dispatcher.call(this);
    
    var _this = this;
    
    if (this._$enable_auth_check === true) {
        //this.debug('init view data', 'check auth');
        
        if (typeof(KALS_context) === 'object') {
            KALS_context.auth.add_listener(function () {
                //_this._auth_check();
            });
        }
        //_this._auth_check();
    }
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
 * @class {KALS_controller}
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

KALS_controller.prototype._$enable_debug = true;

/**
 * 啟用權限檢查機制
 * @type {Boolean}
 */
KALS_controller.prototype._$enable_auth_check = true;

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
 * 權限檢查
 * @param {boolean} _is_login
 * @param {User_param} _user
 * @returns {boolean} true=通過;false=未通過
 */
KALS_controller.prototype._$auth_check = function (_is_login, _user) {
    //this.debug('auth check', _is_login);
    return true;
};

/**
 * 初始化View
 * 
 * 如果要在Controller啟動時為UI做設定，請覆寫這個方法
 * 這個方法只會執行一次
 * 
 * 請覆寫這個方法
 * @return {KALS_controller}
 */
KALS_controller.prototype._$initialize_view = function () {
    return this;
};

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
    
    if (typeof(_data) === "function" 
            && _callback === undefined) {
        _callback = _data;
        _data = {};
    }
    
    if (typeof(_data) !== "object" || $.is_array(_data) === true) {
        _data = {
            "_data": _data
        };
    }
    
    if (this._enable_controller_flag === false) {
        //this.debug('request', 'enable flag is false');
        $.trigger_callback(_callback);
        return this;
    }
    
    var _url = this.get_request_url();

    if ($.is_null(_url)) {
        //$.test_msg('temp', 'url is null');
        return $.trigger_callback(_callback);
    }

    if (_method === 'get') {
        _url = _url + '/request_get';        
    }
    else {
        _url = _url + '/request_post/' + _action;
    }

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

    //this.debug('request', _callback);
    //return;
    if (_method === 'get') {
        KALS_util.ajax_get(_ajax_config);
    }
    else {
        KALS_util.ajax_post(_ajax_config);
    }

    return this;
};

/**
 * 送出請求GET請求，快取起來
 * 
 * @param {string} _action
 * @param {JSON} _data
 * @param {function} _callback
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.request_get_cache = function (_action, _data, _callback) {
    
    var _method = "get";
    
    if (typeof(_data) === "function" 
            && _callback === undefined) {
        _callback = _data;
        _data = {};
    }
    
    if (this._enable_controller_flag === false) {
        //this.debug('request', 'enable flag is false');
        $.trigger_callback(_callback);
        return this;
    }
    
    var _url = this.get_request_url();

    if ($.is_null(_url)) {
        //$.test_msg('temp', 'url is null');
        return $.trigger_callback(_callback);
    }

    _url = _url + '/request_get';

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
        },
        fixed_callback: _action,
        retry_wait: 3000
    };
    
    KALS_util.ajax_get(_ajax_config);
    
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
    //JSONP_dispatcher.prototype.set_data.call(this, _data);
    
    //this._data = _data;
    //this.set_sub_field(_data);
    
    this.set_field(_data);
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
    
    //this.debug('KALS context', typeof(KALS_context));
    if (this._$enable_auth_check === true) {
        //this.debug('init view data', 'check auth');
        
        if (typeof(KALS_context) === 'object') {
            KALS_context.auth.add_listener(function () {
                //$.test_msg("KALS_controller before auth");
                if (KALS_context.completed === true) {
                    _this._auth_check();
                }
            });
        }
       _this._auth_check();
    }
    
    return _view;
};

/**
 * 覆寫開啟時的動作
 * @param {funciton} _callback
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.open = function (_callback) {
    //this.debug('open');
    if (this._enable_controller_flag === false) {
        //this.debug('open', 'controller disabled');
        return $.trigger_callback(_callback);
    }
    
    //this.debug('open', this._enable_flag);
    if (this._$model !== null
        && this._$open_request_action !== null) {
        var _this = this;
        //this.debug('open', [this._$open_request_action, this.get_data()]);
        //return;
        this.request('get', this._$open_request_action, {}, function (_data) {
            //_this.debug('VIEW, open data', _data);
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
    if (this._enable_controller_flag === false) {
        //this.debug('close', 'controller disabled');
        return $.trigger_callback(_callback);
    }
    
    if (this._$model !== null
        && this._$close_request_action !== null) {
        var _this = this;
        this.request('get', this._$close_request_action, this.get_data(), function (_data) {
                //_this.debug('VIEW, close data', _data);
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
 * 以GET方式，跟伺服器取得資料
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
    KALS_context.hotkey.add_listener(_hotkey, _callback);
};

/**
 * 輸入搜尋條件，開啟搜尋視窗搜尋標註
 * @param {JSON} _param
 * _param = {
 *      range: "note","author","annotation_type","annotation_anchor",
 *      keyword:"keyword",
 *      order_by: "update|create"
 * }
 * @returns {KALS_controller.protoype}
 */
KALS_controller.prototype.search_annotation = function (_param) {
    KALS_context.search.search(_param);
    return this;
};

/**
 * 取得現在使用的標註類型
 * @returns {Array|Annotation_type_param} 包含標註類型的陣列
 */
KALS_controller.prototype.get_annotation_types = function () {
    var _type_param_list = KALS_context.create_type_param_list();
    return _type_param_list;
};

/**
 * 觀看標註的詳細資料
 * @param {int} _annotation_id
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.view_annotation = function (_annotation_id) {
    KALS_text.load_annotation(_annotation_id);
    return this;
};

/**
 * 選擇頁面上指定的標註
 * @param {int} _annotation_id
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.select_annotation = function (_annotation_id) {
    if (_annotation_id === undefined) {
        //KALS_util.show_exception('KALS_controller.select_annotation');
        return this;
    }
    
    KALS_util.ajax_get({
        url: 'kals_model/get_annotation',
        data: {
            'annotation_id': _annotation_id
        },
        callback: function (_data) {
            var _annotation_json = _data.annotation;
            var _param = new Annotation_param(_annotation_json);
            var _scope = _param.scope;
            KALS_text.selection.select.set_scope_coll(_scope);
        }
    });
    
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

// ----------------------

/**
 * 檢查權限
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype._auth_check = function () {
    
    //throw "是誰呼叫了_auth_check?";
    if (this._$enable_auth_check === false) {
        return;
    }
    
    //this.debug('_auth_check 1', this._enable_controller_flag);
    //this._$auth_check();
    //this._enable_controller_flag = false;
    
    var _is_login = false; 
    var _user = null;
    if (typeof(KALS_context) === 'object') {
        _is_login = KALS_context.auth.is_login();
        _user = KALS_context.user.get_user_param();
    }
        
    if (this._$auth_check(_is_login, _user)) {
        if (this._enable_controller_flag === false) {
            this.enable_controller();
        }
    }
    else {
        if (this._enable_controller_flag === true) {
            this.disable_controller();
        }
    }
    //this.debug('_auth_check 2', this._enable_controller_flag);
};

/**
 * 關閉控制器
 * 
 * 一旦關閉，則不能使用open(), close(), request()等方法
 * @param {function} _callback
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.disable_controller = function (_callback) {
    //this.addClass('controller-disable');
    this._enable_controller_flag = false;
    $.trigger_callback(_callback);
    //this.debug('disable_controller');
    
    var _this = this;
    //throw "誰設定了我?";
    setTimeout(function () {
        _this.addClass('controller-disable');
    }, 0);
    return this;
    
};

/**
 * 開啟控制器
 * @param {function} _callback
 * @returns {KALS_controller.prototype}
 */
KALS_controller.prototype.enable_controller = function (_callback) {
    this._enable_controller_flag = true;
    //this.debug('enable_controller');
    $.trigger_callback(_callback);
    
    var _this = this;
    setTimeout(function () {
        _this.removeClass('controller-disable');
    }, 0);
    return this;
};


KALS_controller.prototype._enable_controller_flag = true;

// ------------------

/**
 * 檢查是否有欄位
 * @param {String} _field
 * @returns {Boolean}
 */
KALS_controller.prototype.has_field = function (_field) {
    return (typeof(this._data[_field]) !== 'undefined');
};

/**
 * 根據view樣板的語系檔來取得語系
 * @param {String} _view_line
 * @returns {KALS_language_param}
 */
KALS_controller.prototype.get_view_lang = function (_view_line) {
    if (KALS_context.lang.has_line(_view_line)) {
        //KALS_context.lang.add_listener(_ele, new KALS_language_param(_text, _line));
        return new KALS_language_param("", _view_line);
    }
    
    // 先取得key
    var _view_classname = this._$view;
    _view_classname = _view_classname.replace(/[\W|\_]/g, "_").toLowerCase();
    _view_classname = 'view.' + _view_classname;
    _view_classname = _view_classname + "." + _view_line;
    
    //$.test_msg("_view_classname", _view_classname);
    
    if (KALS_context.lang.has_line(_view_classname)) {
        //KALS_context.lang.add_listener(_ele, new KALS_language_param(_text, _line));
        return new KALS_language_param("", _view_classname);
    }
    else {
        return new KALS_language_param(_view_line);
    }
};

/**
 * 根據view樣板的語系檔來取得語系，直接輸出結果
 * @param {String} _view_line
 * @returns {String}
 */
KALS_controller.prototype.get_view_lang_line = function (_view_line) {
    var _lang = this.get_view_lang(_view_line);
    return KALS_context.lang.line(_lang);
}

/* End of file KALS_controller */
/* Location: ./system/application/views/web_apps/toolkit/KALS_controller.js */