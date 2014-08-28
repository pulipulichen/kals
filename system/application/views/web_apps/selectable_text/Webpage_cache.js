/**
 * Webpage_cache
 *
 * 結合樣板的控制器
 * KALS Framework的Controller示範
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2013/11/19 下午 03:36:17
 * @extends {KALS_controller_window}
 */
function Webpage_cache() {
    // 繼承宣告的步驟之一
    KALS_controller_window.call(this);
    
    if (typeof(KALS_CONFIG.selectable_text_cache) === "boolean") {
        this.enable_cache = KALS_CONFIG.selectable_text_cache;
    }
    if (typeof(KALS_CONFIG.selectable_text_clean_overwrite) === "boolean") {
        this.enable_cache_overwrite = KALS_CONFIG.selectable_text_clean_overwrite;
    }
}

/**
 * ===========================
 * 開頭宣告
 * ===========================
 */

/**
 * 繼承自KALS_controller_window
 * 
 * KALS_controller 是部分元件
 * KALS_controller_window 是獨立視窗
 */
Webpage_cache.prototype = new KALS_controller();

/**
 * ====================
 * Model設定
 * ====================
 */

/**
 * 指定Model
 * @type String
 */
Webpage_cache.prototype._$model = 'webpage_cache';

/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 是否開啟偵錯功能
 * @type Boolean
 */
Webpage_cache.prototype._$enable_debug = true;

/**
 * ====================
 * Action設定
 * ====================
 */

/**
 * 是否啟用快取
 * @type String
 */
Webpage_cache.prototype.enable_cache = true;

/**
 * 儲存資料的網址
 * @type String
 */
Webpage_cache.prototype._save_url = "webpage_cache/save";

/**
 * 儲存快取資料到伺服器
 * 
 * @param {String} _data 要儲存的資料
 * @param {Function} _callback 回呼函數
 * @returns {Webpage_cache}
 */
Webpage_cache.prototype.save = function (_data, _callback) {
    
    _data = $.json_encode(_data);
    
    _data = this.compress_data(_data);
    var _data_parts = this.split_data(_data);
    
    //$.test_msg("總共分割成份數", _data_parts.length);
    var _i = 0;
    
    //var _clean_save_url = KALS_context.get_base_url("/webpage_cache/clean_save");
    
    //$.get(_clean_save_url, function () {
    //    _loop();
    //});
    
    var _clean_save_action = "clean_save";
    this.request_get(_clean_save_action, function () {
        _loop();
    });
    
    var _save_url = this._save_url;
    var _loop = function () {
        var _post_config = {
            url: _save_url + "/" + _i,
            data: _data_parts[_i],
            callback: _loop_callback
        };
        
        if (typeof(KALS_CONFIG.debug.webpage_cache_save_enable) === "boolean"
                && KALS_CONFIG.debug.webpage_cache_save_enable === false) {
            _loop_callback();
        }
        else {
            KALS_util.ajax_post(_post_config);
        }
    };
    
    var _loop_callback = function () {
        _i++;
        
        if (_i < _data_parts.length) {
            _loop();
        }
        else {
            _complete();
        }
    };
    
    var _complete = function () {
        //$.test_msg("Webpage_cache 儲存了資料");
        if (_callback !== undefined) {
            $.trigger_callback(_callback);
        }
    };
    
    return this;
};

/**
 * 儲存快取資料到伺服器，物件版本
 * 
 * @param {JSON} _data 要儲存的資料
 * @param {Function} _callback 回呼函數
 * @returns {Webpage_cache}
 */
Webpage_cache.prototype.save_json = function (_data, _callback) {
    return this.save(_data, _callback);
};

/**
 * 讀取網頁的前置資料
 * @type String
 */
Webpage_cache.prototype._load_url_prefix = "webpage_cache/load/";

/**
 * 讀取網頁實際內容的前置資料
 * @type String
 */
Webpage_cache.prototype._load_parts_url_prefix = "webpage_cache/load_parts/";


/**
 * 讀取網頁快取的資料
 * @param {Function} _callback
 * @returns {Webpage_cache}
 */
Webpage_cache.prototype.load = function (_callback) {
    
    if (this.get_cache_data() !== undefined) {
        //$.test_msg("直接取用快取");
        if ($.is_function(_callback)) {
            _callback(this.get_cache_data());
        }
        return this;
    }
    
    //$.test_msg("Webpage_cache.load 開始讀取", (this._cache_data !== undefined));
    
    /*
    var _url = this._load_url_prefix;
    _url = _url + KALS_context.get_webpage_id();
    _url = KALS_context.get_base_url(_url);
    
    var _this = this;
    $.get(_url, function (_parts_count) {
        _parts_count = _this._remove_cache_prefix(_parts_count);
        //$.test_msg("份數", _parts_count);
        _parts_count = parseInt(_parts_count);
        
        if (_parts_count === 0) {
            if ($.is_function(_callback)) {
                _callback(false);
            }
            return;
        }
        
        _this._load_parts(_parts_count, _callback);
    });
    */
    
    var _action = "load";
    var _data = {
        webpage_id: KALS_context.get_webpage_id()
    };
    var _this = this;
    this.request_get(_action, _data, function (_data) {
        var _parts_count = _data.parts_count;
        //_parts_count = _this._remove_cache_prefix(_parts_count);
        //$.test_msg("份數", _parts_count);
        _parts_count = parseInt(_parts_count);
        
        if (_parts_count === 0
                || _this.enable_cache_overwrite) {
            if ($.is_function(_callback)) {
                _callback(false);
            }
            return;
        }
        
        _this._load_parts(_parts_count, _callback);
    });
    
    return this;
};


/**
 * 讀取網頁快取的資料，取得JSON資料
 * @param {Function} _callback
 * @returns {Webpage_cache}
 */
Webpage_cache.prototype.load_json = function (_callback) {
    this.load(function (_data) {
        //$.test_msg("webpage_cache.load_json", _data);
        _data = $.json_decode(_data);
        if ($.is_function(_callback)) {
            _callback(_data);
        }
    });
    return this;
};

/**
 * 一一讀取各個部分
 * @param {Function} _callback
 * @returns {Webpage_cache}
 */
Webpage_cache.prototype._load_parts = function (_parts_count, _callback) {
    
    var _i = 0;
    
    var _this = this;
    var _loop = function () {
        _this._load_part(_i, _continue);
    };
    
    var _continue = function () {
        _i++;
        
        if (_i < _parts_count) {
            _loop();
        }
        else if (_this._need_clean_save && _this.enable_cache_clean) {
            _this._clean_save();
        }
        else {
            _complete();
        }
    };
    /*
    var _clean_save = function () {
        
        var _clean_save_url = KALS_context.get_base_url("/webpage_cache/clean_save");

        $.get(_clean_save_url, function () {
            _complete();
        });
    };
    */
    var _complete = function () {
        var _data = _this.get_cache_data();
        _data = _this.decompress_data(_data);
        _this.set_cache_data(_data);
        
        if ($.is_function(_callback)) {
            _callback(_data);
        }
    };
    
    _loop();
    
    return this;
};

/**
 * 清理儲存
 * @param {Function} _callback
 */
Webpage_cache.prototype._clean_save = function (_callback) {
    var _clean_save_action = "clean_save";
    this.request_get(_clean_save_action, function () {
        //$.test_msg("清理了資料", typeof(_callback));
        if ($.is_function(_callback)) {
            _callback();
        }
    });
    
    return this;
};

/**
 * 清理儲存
 * @param {Function} _callback
 */
Webpage_cache.prototype.clean_save = function (_callback) {
    return this._clean_save(_callback);
};

/**
 * 讀取部分資料
 * 
 * @param {Function} _callback 回呼函數，以callback回傳資料
 *  如果沒有讀取到資料，則會回傳false
 * @returns {Webpage_cache}
 */
Webpage_cache.prototype._load_part = function (_part, _callback) {
    
    //var _url = this._load_parts_url_prefix;
    //_url = _url + KALS_context.get_webpage_id() + "/" + _part;
    //_url = KALS_context.get_base_url(_url);
    
    var _this = this;
    var _load_callback = function (_data) {
        
        //$.test_msg("Webpage_cache 取得了資料 1 (" + _data.length + ")");
        
        //_data = _this._remove_cache_prefix(_data);
        _data = _data.cache;
        
        //$.test_msg("Webpage_cache 取得了資料 2 (" + _data.length + ")");
        
        if (_data.length === 0) {
            _data = false;
            if ($.is_function(_callback)) {
                _callback();
            }
            return;
        }
            
        //_data = _this.decompress_data(_data);
        
        //$.test_msg("Webpage_cache 取得了資料 3 (" + _data.length + ")");
        
        _this.append_cache_data(_data);
        
        if ($.is_function(_callback)) {
            _callback();
        }
        return;
    };
    
    //$.get(_url, _load_callback);
    var _action = "load_parts";
    var _data = {
        webpage_id: KALS_context.get_webpage_id(),
        start_index: _part
    };
    this.request_get_cache(_action, _data, _load_callback);
    
    return this;
};

/**
 * 刪除快取資料前面的額外資料
 * 
 * @param {String} _data 取得的快取資料
 * @returns {String}
 */
Webpage_cache.prototype._remove_cache_prefix = function (_data) {
    // 額外資料是：/*Content-type: text/html*/
    
    if ($.starts_with(_data, "/*Content-type: text/html*" + "/")) {
        _data = $.substr(_data, 27);
        this._need_clean_save = false;
    }
    //_data = $.trim(_data);
    return _data;
};

/**
 * 取要清理儲存
 * @type Boolean
 */
Webpage_cache.prototype._need_clean_save = true;

/**
 * 取要清理儲存
 * @type Boolean
 */
Webpage_cache.prototype.enable_cache_clean = false;

/**
 * 取要清理儲存
 * @type Boolean
 */
Webpage_cache.prototype.enable_cache_overwrite = false;


// ----------------------------------
// 內部快取
// ----------------------------------

/**
 * 儲存快取資料
 * @type String
 */
Webpage_cache.prototype._cache_data;

/**
 * 設定快取資料
 * @param {String} _data
 * @returns {Webpage_cache}
 */
Webpage_cache.prototype.set_cache_data = function (_data) {
    this._cache_data = _data;
    return this;
};

/**
 * 添加快取資料
 * @param {String} _data
 * @returns {Webpage_cache}
 */
Webpage_cache.prototype.append_cache_data = function (_data) {
    if (this._cache_data === undefined) {
        this._cache_data = '';
    }
    this._cache_data = this._cache_data + _data;
    return this;
};

/**
 * 取得快取資料
 * @returns {String}
 */
Webpage_cache.prototype.get_cache_data = function () {
    return this._cache_data;
};

// ----------------------------------
// 壓縮與解壓縮
// ----------------------------------

/**
 * 壓縮資料
 * @version 20140518 Pulipuli Chen
 * 先不採用壓縮與解壓縮策略
 * @param {String} _data
 * @returns {String}
 */
Webpage_cache.prototype.compress_data = function (_data) {
    //_data = " " + _data + " ";
    
    /*
    for (var _i = 0; _i < 3; _i++) {
        _data = _data + _data;
    }
    */
    
    // 極限長度：450000
    
    //$.test_msg("cache 壓縮前：" + _data.length);
    //_data = LZString.compress(_data);
    //_data = LZString.compressToBase64(_data);
    //_data = encodeURIComponent(_data);
    //_data = $.addslashes(_data);
    
    //_data = LZString.decompressFromBase64(_data);
    //_data_json = $.json_decode(_data);
    
    //throw "錯誤中斷";
    
    //$.test_msg("cache 壓縮後：" + _data.length);
    return _data;
};

/**
 * 分割資料
 * 
 * 極限長度：450000
 * 不可以儲存超過這個大小的資料
 * @param {String} _data
 * @returns {Array<String>}
 */
Webpage_cache.prototype.split_data = function (_data) {
    var _parts = [];
    var _limit = this._split_limit;
    
    while (_data.length > _limit) {
        var _part = _data.substr(0, _limit);
        _parts.push(_part);
        _data = _data.substr(_limit, _data.length);
    }
    
    if (_data.length > 0) {
        _parts.push(_data);
    }
    
    return _parts;
};

/**
 * 分割的單位
 * 
 * 最大值是450000
 * @type Number
 */
Webpage_cache.prototype._split_limit = 450000;

/**
 * 解壓縮資料
 * 
 * @version 20140518 Pulipuli Chen
 * 先不採用壓縮與解壓縮策略
 * @param {String} _data
 * @returns {String}
 */
Webpage_cache.prototype.decompress_data = function (_data) {
    
    //$.test_msg("cache 解壓縮前：" + _data.length);
    //_data = decodeURIComponent(_data);
    //_data = LZString.decompressFromBase64(_data);
    //$.test_msg("cache 解壓縮後：" + _data.length);
    //_data = $.trim(_data);
    return _data;
};

/* End of file Webpage_cache */
/* Location: ./system/application/views/web_apps/extension/Webpage_cache/Webpage_cache.js */