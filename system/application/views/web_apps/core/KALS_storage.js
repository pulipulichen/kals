/**
 * KALS_storage
 * 本地端儲存空間
 * 
 * HTML5的特殊功能
 * http://www.dotblogs.com.tw/jimmyyu/archive/2011/03/27/html5-client-storage.aspx
 * 
 * 基本上是使用jQuery-Storage-API來操作
 * https://github.com/julien-maurel/jQuery-Storage-API
 * 我下載了 jquery.storageapi.min.js (https://github.com/julien-maurel/jQuery-Storage-API/blob/master/jquery.storageapi.min.js)
 * 放到[VIEW]/libraries/min/jquery.storageapi.min.js
 *
 * @package     KALS
 * @category    JavaScript Libraries
 * @author      Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) 2014, Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        http://github.com/pulipulichen/kals
 * @version     1.0 2014/3/23 下午 06:47:21
 * @extends {Event_dispatcher}
 */
function KALS_storage() {
    
    Event_dispatcher.call(this);
    
    this._init();
}

KALS_storage.prototype = new Event_dispatcher();

/**
 * 本地端資料庫
 * @type Object
 */
KALS_storage.prototype._storage;

/**
 * 初始化可以用的參數
 * @returns {KALS_storage.prototype}
 */
KALS_storage.prototype._init = function () {
    if (localStorage !== undefined) {
        this._storage = $.localStorage;
    }
    return this;
};

/**
 * 確認是否可以使用
 * @returns {Boolean}
 */
KALS_storage.prototype._is_enable = function () {
    return (this._storage !== undefined);
};

/**
 * 取得資料
 * @param {String} _key
 * @returns {KALS_storage.prototype}
 */
KALS_storage.prototype.get = function (_key) {
    if (this._is_enable() === false) {
        return undefined;
    }
    else {
        this._storage.get(_key);
        return this;
    }
};

/**
 * 設定資料
 * @param {String} _key
 * @param {Object} _value
 * @returns {KALS_storage.prototype}
 */
KALS_storage.prototype.set = function (_key, _value) {
    if (this._is_enable() === false) {
        return this;
    }
    else {
        if ($.is_object(_value)) {
            _value = $.json_encode(_value);
        }
        this._storage.set(_key, _value);
        return this;
    }
};

/**
 * 取得JSON
 * @param {String} _key
 * @returns {JSON}
 */
KALS_storage.prototype.get_json = function (_key) {
    var _value = this.get(_key);
    if (_value !== undefined) {
        _value = $.json_decode(_value);
    }
    return _value;
};

/**
 * 設置JSON
 * @param {String} _key
 * @param {JSON} _value
 * @returns {KALS_storage}
 */
KALS_storage.prototype.set_json = function (_key, _value) {
    return this.set(_key, _value);
};

/**
 * 是否設定此key
 * @param {String} _key
 * @returns {Boolean}
 */
KALS_storage.prototype.is_set = function (_key) {
    if (this._is_enable() === false) {
        return false;
    }
    else {
        return this._storage.isSet(_key);
    }
};

/**
 * 建立隨機字串
 * @param {String} _prefix 前置詞
 * @returns {String}
 */
KALS_storage.prototype.create_id = function (_prefix) {
    return $.create_id(_prefix);
};

/* End of file KALS_storage */
/* Location: ./system/application/views/web_apps/core/KALS_storage.js */