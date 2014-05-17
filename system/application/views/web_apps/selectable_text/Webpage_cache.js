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
Webpage_cache.prototype._$model = 'Webpage_cache';

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
    var _post_config = {
        url: this._save_url,
        data: _data
    };
    
    if ($.is_function(_callback)) {
        _post_config.callback = _callback;
    }

    KALS_util.ajax_post(_post_config);
    
    $.test_msg("Webpage_cache 儲存了資料");
    
    return this;
};

Webpage_cache.prototype._load_url_prefix = "webpage_cache/load/";

/**
 * 讀取網頁快取的資料
 * 
 * @param {Function} _callback 回呼函數，以callback回傳資料
 *  如果沒有讀取到資料，則會回傳false
 * @returns {Webpage_cache}
 */
Webpage_cache.prototype.load = function (_callback) {
    
    if (this._cache_data !== undefined) {
        if ($.is_function(_callback)) {
            _callback(this._cache_data);
        }
        return this;
    }
    
    var _url = this._load_url_prefix;
    _url = _url + KALS_context.get_webpage_id();
    _url = KALS_context.get_base_url(_url);
    
    var _this = this;
    var _load_callback = function (_data) {
        _data = _this._remove_cache_prefix(_data);
        
        $.test_msg("Webpage_cache 取得了資料 (" + _data.length + ")", _data);
        
        if (_data.length === 0) {
            _data = false;
        }
        
        if ($.is_function(_callback)) {
            _callback(_data);
        }
        
        _this._cache_data = _data;
    };
    
    $.get(_url, _load_callback);
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
    _data = $.substr(_data, 27);
    //_data = $.trim(_data);
    return _data;
};

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
 * 取得快取資料
 * @returns {String}
 */
Webpage_cache.prototype.get_cache_data = function () {
    return this._cache_data;
};

/* End of file Webpage_cache */
/* Location: ./system/application/views/web_apps/extension/Webpage_cache/Webpage_cache.js */