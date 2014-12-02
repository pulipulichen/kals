/**
 * KALS_context
 * 情境物件
 * 
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/7/28 下午 04:42:00
 * @extends {JSONP_dispatcher}
 */
KALS_context = new JSONP_dispatcher();

/**
 * 初始化KALS_context
 */
KALS_context.initialize = function () {
    
    if (KALS_CONFIG.enable_kals === false) {
        return this;
    }
    
    //$.test_msg('KALS_context() base url', this.base_url);
    
    //基礎元件 Basic Components
    this.view = new Viewportmove_dispatcher();
    this.auth = new KALS_authentication();
    this.hash = new URL_hash_dispatcher();
    this.hotkey = new KALS_hotkey_manager();
    this.style = new Style_manager();
    this.url = new URL_dispatcher();
    this.loader = new Context_loader();
    
    this.basic_type = new Context_basic_type();
    this.predefined_type = new Context_predefined_type();
    this.custom_type = this.predefined_type;
    
    this.feedback = new Feedback_manager();
    this.view_manager = new KALS_view_manager();
    this.progress = new Initialization_progress();
    this.site_reform = new Site_reform();
    this.storage = new KALS_storage();
    this.module = new KALS_module_manager();
    this.navigation = new KALS_navigation();
    
    //初始化元件 Initialize Component
    this.init_context = new Init_context();
    this.init_component = new Init_component();
    this.init_profile = new Init_profile();
    
    //以下會牽涉到登入相關的，要記得先設定auth喔☆
    var _this = this;
    
    //確保選取位置。必須要在所有元件加入body之前確保完畢
    setTimeout(function () {
        //_this.check_text_selector(function () {
            
            //資料元件 Data Components
            _this.lang = new KALS_language();
            _this.user = new Context_user();
            _this.policy = new Context_policy();
            
            //_this.search = new Context_search();
            _this.search = new Window_search();
			
            _this.overlay = new Overlay_manager();
            
            //var _loaded_modules = _this.module.init();
            //_this.navigation.init(_loaded_modules);
            
            if (_this._is_kals_context_disable() === false) {
                _this.init_context.start();
            }
        //});    
    }, 0);
};

/**
 * 是否阻止啟用
 * @returns {Boolean}
 */
KALS_context._is_kals_context_disable = function () {
    
    // 阻止啟用
    if (typeof(KALS_CONFIG.debug) === "object"
        && typeof(KALS_CONFIG.debug.kals_context_disable) === "boolean"
        && KALS_CONFIG.debug.kals_context_disable === true) {

        if (typeof(QUNIT) === "function") {
            $.test_msg("QUNIT");
            test("KALS! QUnit Test", function() {
                equals( 1+1, 2, "KALS 初始化完成" );
            });
            
            QUNIT();
        }
        return true;
    }
    else {
        return false;
    }
};

/**
 * 讀取基本資料的位置
 * @type {string}
 * @property [_$load_url]
 * @private
 */
KALS_context._$load_url = 'generic/info';

/**
 * 測試時使用限定
 * 偵測基本網址的用法
 * 
 * @type {string} base_url
 */
KALS_context.setup_base_url = function () {
    return this.url.setup_base_url();
};

/**
 * 供其他物件取用基礎網址
 * @param {string|array} _file
 * @param {Boolean} _from_root = false 是否從根目錄開始(/kals)，而非從/kals/web_apps開始
 * @type {string}
 */
KALS_context.get_base_url = function (_file, _from_root) {
    return this.url.get_base_url(_file, _from_root);
};

/**
 * 回傳圖片網址
 * @param {string} _img 圖片的檔案名稱
 * @type {string} 圖片的完整網址
 */
KALS_context.get_image_url = function (_img) {
    return this.url.get_image_url(_img);
};

/**
 * 回傳libraries網址
 * @param {string} _file 檔案名稱
 * @type {string} 檔案的完整網址
 */
KALS_context.get_library_url = function (_file) {
    return this.url.get_library_url();
};

/**
 * 將KALS_context.load()讀取進來的資料清空
 * @param {function} _callback
 */
KALS_context.reset = function (_callback) {
    
    this.set_data({
        KALS_language: {}
    });
    
    setTimeout(function () {
        $.trigger_callback(_callback);
    }, 100);
    
    return this;
};

/**
 * 確認完成
 * @returns {KALS_context}
 */
KALS_context.set_completed = function () {
    this.completed = true;
    this.notify_listeners(this);
    
    var _this = this;
    setTimeout(function () {
        _this._ready_event_dispatcher.notify_listeners(_this);
    }, 500);
    
    return this;
};

/**
 * 準備好的時候呼叫
 * 
 * @author Pulipuli Chen 20141109
 * @param {Function} _callback
 * @returns {KALS_context}
 */
KALS_context.ready = function (_callback) {
    
     if ($.is_function(_callback) === false) {
         return this;
     }
    
    if (this.completed === false) {
        //$.test_msg("KALS_context, 尚未準備好", _callback);
        //$.test_msg("KALS_context, 尚未準備好");
        //var _this = this;
        //this.add_once_listener(_callback);
        this._ready_event_dispatcher.add_once_listener(_callback);
    }
    else {
        setTimeout(function () {
            _callback(this);
        }, 0);
    }
    return this;
};

/**
 * 當KALS_context完成之後，可以用這個呼叫
 * @type Event_dispatcher
 */
KALS_context._ready_event_dispatcher = new Event_dispatcher();

/**
 * 模組準備好的時候呼叫
 * @param {String} _load_module
 * @param {Function} _callback
 * @returns {KALS_context}
 */
KALS_context.module_ready = function (_load_module, _callback) {
    if ($.is_string(_load_module) === false
            && $.is_function(_callback) === false) {
        return this;
    }
    
    var _module_stacks = _load_module.split(".");
    var _base_obj = window;
    var _module_loaded = true;

    for (var _m in _module_stacks) {
        var _module_name = _module_stacks[_m];
        if (typeof(_base_obj[_module_name]) !== "undefined") {
            _base_obj = _base_obj[_module_name];
        }
        else {
            _module_loaded = false;
            break;
        }
    }

    if (_module_loaded === true) {
        setTimeout(function () {
            _callback(_base_obj);
        }, 0);
    }
        
    return this;
};

/**
 * 語系檔
 * @type {KALS_language}
 */
KALS_context.lang = null;

/** 
 * 使用者資訊
 * @type {Context_user} user
 */
KALS_context.user = null;

/**
 * @type {Context_policy}
 */
KALS_context.policy = null;

/**
 * @author Pulipuli Chen 20141111
 * 捨棄@type {Context_search}，改用Window_search
 * @type {Window_search}
 */
KALS_context.search = null;

/**
 * @type {Overlay_manager}
 */
KALS_context.overlay = null;

/**
 * @type {KALS_authentication}
 */
KALS_context.auth = null;

/**
 * @type {URL_hash_dispatcher}
 */
KALS_context.hash = null;

/**
 * @type {Style_manager}
 */
KALS_context.style = null;

/**
 * @type {Viewportmove_dispatcher}
 */
KALS_context.view = null;

/**
 * @type {Context_basic_type}
 */
KALS_context.basic_type = null;

/**
 * @type {Context_predefined_type}
 */
KALS_context.predefined_type = null;

/**
 * @type {Context_predefined_type}
 * @deprecated Pulipuli Chen 20130502 盡量不要使用
 */
KALS_context.custom_type = null;

/**
 * @type Feedback_manager
 */
KALS_context.feedback = null;

/**
 * @type {KALS_view_manager}
 */
KALS_context.view_manager = null;

/**
 * @type {Initialization_progress}
 */
KALS_context.progress = null;

/**
 * @type {Site_reform}
 */
KALS_context.site_reform = null;

/**
 * @type {KALS_storage}
 */
KALS_context.storage = null;

/**
 * @type {KALS_module_manager}
 */
KALS_context.module = null;

/**
 * @type {KALS_navigation}
 */
KALS_context.navigation = null;

/**
 * @type {Init_context}
 */
KALS_context.init_context = null;

/**
 * @type {Init_component}
 */
KALS_context.init_component = null;

/**
 * @type {Init_profile}
 */
KALS_context.init_profile = null;

// ------------------------

/**
 * 確認所有任務是否完成。此屬性會在Init_component跟Init_profile完成時變成true。
 * @type {boolean}
 * @property
 */
KALS_context.completed = false;

/**
 * 讀取模組設定資料的位置
 * @type {string}
 */
//KALS_context._modules_config_url = 'generic/modules_config';

/**
 * 讀取模組會用到的資料
 * @param {Function} _callback
 * @returns {KALS_context}
 */
//KALS_context.load_modules_config = function (_callback) {
//    
//    var _this = this;
//    var _loaded_callback = function (_data) {
//        
//        if (typeof(_data.KALS_view_manager) !== 'undefined') {
//            _this.view_manager.set_data(_data.KALS_view_manager);
//        }
//        
//        $.trigger_callback(_callback);
//    };
//    
//    var _config = {
//        "url": this._modules_config_url,
//        "callback": _loaded_callback,
//        "fixed_callback": true,
//        "retry_wait": 3 * 1000
//    };
//    
//    KALS_util.ajax_get(_config);
//    
//    return this;
//};

/**
 * 讀取網頁設定資料的位置
 * @type {string}
 */
//KALS_context._webpage_info_url = 'generic/webpage_info';


/**
 * 讀取網頁設定資料
 * @param {Function} _callback
 * @returns {KALS_context}
 */
//KALS_context.load_webpage_info = function (_callback) {
//    
//    var _this = this;
//    var _loaded_callback = function (_data) {
//        
//        if (typeof(_data.webpage_id) !== 'undefined') {
//            _this.webpage_id = _data.webpage_id;
//        }
//        
//        $.trigger_callback(_callback);
//    };
//    
//    var _config = {
//        "url": this._webpage_info_url,
//        "callback": _loaded_callback
//    };
//    
//    KALS_util.ajax_get(_config);
//    
//    return this;
//};

KALS_context.load_info = function (_callback) {
    
    //2009 不準備資料的版本
    //this.load(_callback);
    
    //------------------------------
    //20111106 Pudding Chen 準備資料的版本
    
    //先準備資料
    var _data = {};
        
    //指引預設
    _data.anchor_navigation_type = KALS_CONFIG.anchor_navigation_type;
    
    this.load(_data, _callback);
};

/**
 * 記住最後選擇的標註類型
 * @type {Annotation_type_param}
 */
KALS_context.last_select_annotation_type = null;

/**
 * 取得標註類型列表
 * @param {String} _enable_type 啟用的標註類型
 * topic: 只有主題標註使用
 * respond: 只有回覆時使用
 * 預設：全部啟用
 * @return {Array<Annotation_type_param>} 包含標註類型的陣列
 */
KALS_context.create_type_param_list = function(_enable_type) {
    var _list = {};
    var _order_list = {};
    
    var _add_order = function (_order, _type_param) {
        if (typeof(_order_list[_order]) !== "object") {
            _order_list[_order] = [];
        }
        _order_list[_order].push(_type_param);
    };
    
    var _get_ordered_list = function () {
        
        // 先取得order_index
        var _order_index_array = [];
        for (var _order in _order_list) {
            _order_index_array.push(_order);
        }
        _order_index_array.sort(function(_a, _b){return _b-_a});
        
        var _list = {};
        for (var _order_index in _order_index_array) {
            var _order = _order_index_array[_order_index];
            var _ordered_array = _order_list[_order];
            for (var _index in _ordered_array) {
                var _type_param = _ordered_array[_index];
                var _type_name = _type_param.get_name();
                _list[_type_name] = _type_param;
            }
        }
        return _list;
    };
    
    //var _type_options = KALS_CONFIG.annotation_type_option;
    /**
     * 標註選項。注意此選項會影響順序。
     * @type {String[]}
     */
    //var _type_options = this.get_basic_type_options();
    var _type_options = this.basic_type.get_type_list(_enable_type);
    
    for (var _i in _type_options) {
        //var _type_string = _type_options[_i];
        //var _type_param = new Annotation_type_param(_type_string);
        var _type_param = _type_options[_i];
        var _order = _type_param.get_order();
        _add_order(_order, _type_param);
    }
    /*
    for (var _type_name in _type_options) {
        var _type_config = _type_options[_type_name];
        if (typeof(_enable_type) === "string"
                && typeof(_type_config[_enable_type]) === "boolean"
                && _type_config[_enable_type] === false) {
            continue;
        }
        var _type_param = new Annotation_type_param(_type_name);
        //_list[_type_name] = _type_param;
    }
    */
    //$.test_msg('Type_menu.create_type_option_list _list.length', _length);
    
    /**
     * 20130603 Pudding Chen 
     * 加入自訂的標註類型
     */
    var _custom_type_list = KALS_context.predefined_type.get_type_list();
    for (var _j in _custom_type_list) {
        var _type_param = _custom_type_list[_j];
        var _order = _type_param.get_order();
        //var _type_name = _type.get_name();
        //_list[_type_name] = _type;
        _add_order(_order, _type_param);
    }
    
    _list = _get_ordered_list();
    
    return _list;
};

/**
 * 取得基本的標註類型
 * @returns 基本的標註類型
 */
/*
KALS_context.get_basic_type_options = function () {
    var _type_options;
    if (typeof(KALS_CONFIG.annotation_type_basic) !== "undefined") {
        _type_options = KALS_CONFIG.annotation_type_basic;
    }
    else if (typeof(KALS_CONFIG.annotation_type_option) !== "undefined") {
        _type_options = KALS_CONFIG.annotation_type_option;
    }
    return _type_options;
};
*/

/**
 * 取得根據網址建立的Domain
 * @returns {String}
 */
KALS_context.create_namespace = function () {
    return $.create_namespace();
};

/**
 * 重新引導網頁到其他地方
 * @param {String} _url
 * @param {Boolean} _from_root
 * @returns {KALS_context}
 */
KALS_context.redirect = function (_url, _from_root) {
    this.url.redirect(_url, _from_root);
    return this;
};

// ----------------
// Webpage_id
// ----------------

KALS_context.get_webpage_id = function () {
    return this.loader.webpage_id;
};

// ------------------------------------------------

/**
 * 網頁讀完之後就開始執行初始化的動作。他會先讀取generic/info網址喔。
 * @version 20111105 Pudding Chen
 */
$(function() {
    KALS_context.initialize();
});

/* End of file KALS_context */
/* Location: ./system/application/views/web_apps/core/KALS_context.js */