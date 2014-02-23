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
 * 加上字串壓縮
 * http://pieroxy.net/blog/pages/lz-string/index.html
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
    
    var _this = this;
    $(function () {
        _this._init();
    });
    
    //$.localStorage.removeAll(true);
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
        
        var _this = this;
        /*
        // Request Quota (only for File System API)  
        if (navigator.webkitPersistentStorage !== undefined) {
            navigator.webkitPersistentStorage.requestQuota(PERSISTENT, 1024*1024, function(_grantedBytes) {
                _this.quota = _grantedBytes;
                var _on_init_fs = function () {
                    
                };
                var _error_handler = function () {
                    
                };
                window.webkitRequestFileSystem(PERSISTENT, _grantedBytes, _on_init_fs, _error_handler); 
            }, function(e) {
                console.log('Error', e); 
            });
        }
        */
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
 * 幫key加上namespace
 * @param {String} _key
 * @returns {String}
 */
KALS_storage.prototype._append_namespace = function (_key) {
    var _namespace = KALS_context.create_namespace();
    _key = _namespace + _key;
    return _key;
};

/**
 * 取得資料
 * @param {String} _key
 * @param {function } _callback
 * @returns {KALS_storage.prototype}
 */
KALS_storage.prototype.get = function (_key, _callback) {
    if (this._is_enable() === false) {
        $.trigger_callback(_callback);
        return undefined;
    }
    else {
        //$.test_msg('storage get', _key);
        _key = this._append_namespace(_key);
        
        //var _compressed;
        //$.test_msg('storage get isSet :' + _key, this._storage.isSet(_key));
        if (this._storage.isSet(_key)) {
            var _value = this._storage.get(_key);
            
            _value = LZString.decompress(_value);

            if ($.is_function(_callback)) {
                _callback(_value);
            }
            return _value;
        }
        else {
            this._merge_get(_key, function (_value) {
                _value = LZString.decompress(_value);

                if ($.is_function(_callback)) {
                    _callback(_value);
                }
            });
            //$.test_msg('storage get isSet get from _compressed:', _value.length);
        }
    }
};

/**
 * 設定資料
 * @param {String} _key
 * @param {Object} _value
 * @param {function} _callback
 * @returns {KALS_storage.prototype}
 */
KALS_storage.prototype.set = function (_key, _value, _callback) {
    if (this._is_enable() === false) {
        $.trigger_callback(_callback);
        return this;
    }
    else {
        if ($.is_object(_value)) {
            _value = $.json_encode(_value);
        }
        
        _key = this._append_namespace(_key);
        
        var _orig_size = _value.length;
        
        _value = LZString.compress(_value);
        var _compressed_size = _value.length;
        
        var _percent = parseInt(((_orig_size - _compressed_size) / _orig_size)*100 , 10);
        
        $.test_msg('stroage set', _orig_size + ' > ' + _compressed_size 
                + ' (壓縮率: ' + _percent  + '%) ');
        
        if (_compressed_size < this._quota_pre_item) {
            this._storage.set(_key, _value);
        }
        else {
            var _parts = this._value_split(_value);
            this._split_set(_key, _parts);
        }
        /*
        else if (_compressed_size < this._quota_max) {
            var _parts = this._value_split(_value);
            this._split_set(_key, _parts);
        }
        else {
            var _parts = this._value_split(_value);
            this._chrome_split_set(_key, _parts);
        }*/
        
        //this._storage.set(_key, _value);
        //try {
            
        //}
        //catch (_e) {
            
        //}
        
        $.trigger_callback(_callback);
        return this;
    }
};

/**
 * 取得JSON
 * @param {String} _key
 * @param {Function} _callback
 * @returns {JSON}
 */
KALS_storage.prototype.get_json = function (_key, _callback) {
    _key = this._append_namespace(_key);
    /*var _value = this.get(_key);
    if (_value !== undefined) {
        _value = $.json_decode(_value);
    }
    */
    this.get(_key, function (_value) {
        if (_value !== undefined) {
            _value = $.json_decode(_value);
        }
        if ($.is_function(_callback)) {
            _callback(_value);
        }
    });
    //return _value;
    return this;
};

/**
 * 設置JSON
 * @param {String} _key
 * @param {JSON} _value
 * @param {funciton} _callback
 * @returns {KALS_storage}
 */
KALS_storage.prototype.set_json = function (_key, _value, _callback) {
    _key = this._append_namespace(_key);
    return this.set(_key, _value, _callback);
};

/**
 * 是否設定此key
 * @param {String} _key
 * @param {Funciton} _callback
 * @returns {Boolean}
 */
KALS_storage.prototype.is_set = function (_key, _callback) {
    if (this._is_enable() === false) {
        $.trigger_callback(_callback);
        return false;
    }
    else {
        _key = this._append_namespace(_key);
        //$.test_msg('storage is set', _key);
        var _isset = false;
        _isset = this._storage.isSet(_key);
        if (_isset === false) {
            _isset = this._storage.isSet(_key + '0');
        } 
        
        if ($.is_function(_callback)) {
            _callback(_isset);
        }
        return _isset;
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

KALS_storage.prototype._quota_max = 10000;

KALS_storage.prototype._quota_pre_item = 10000;
//KALS_storage.prototype._quota_pre_item = 1000;

KALS_storage.prototype._value_split = function (_value) {
    var _parts = [];
    
    var _split_unit = this._quota_pre_item;
    while (_value.length > _split_unit) {
        var _part = _value.substr(0, _split_unit);
        _parts.push(_part);
        _value = _value.substring(_split_unit, _value.length);
    }
    
    _parts.push(_value);
    
    //$.test_msg('storage value split', _parts.length);
    
    return _parts;
};

KALS_storage.prototype._split_set = function (_key, _parts, _callback) {
    
    $.test_msg('storage split set', _parts.length);
    
    var _this = this;
    var _loop = function (_i, _parts) {
        if (_i === _parts.length) {
            $.trigger_callback(_callback);
            return;
        }
        else {
            var _part_key = _key + _i;
            $.test_msg('storage split set key', _part_key);
            var _part_value = _parts[_i];

            _this._check_quota();

            _this._storage.set(_part_key, _part_value, function () {
                _i++;
                _loop(_i, _parts);
            });
        }
    }
    _loop(0, _parts);
    /*
    for (var _i in _parts) {
        var _part_key = _key + _i;
        $.test_msg('storage split set key', _part_key);
        var _part_value = _parts[_i];
        
        this._check_quota();
        
        this._storage.set(_part_key, _part_value);
    }
    */
    return this;
};

KALS_storage.prototype._check_quota = function () {
    
    // Request storage usage and capacity left
    /*
    window.webkitStorageInfo.queryUsageAndQuota(webkitStorageInfo.TEMPORARY, 
    //the type can be either TEMPORARY or PERSISTENT
        
        function(used, remaining) {
            //console.log("Used quota: " + used + ", remaining quota: " + remaining);
        }, function(e) {
            //console.log('Error', e); 
        }
    );
    */
};
KALS_storage.prototype._value_merge = function (_parts) {
    var _value = '';
    
    for (var _i in _parts) {
        _value = _value + _parts[_i];
    }
    
    return _value;
};

KALS_storage.prototype._merge_get = function (_key, _callback) {
    
    var _value = '';
    var _index = 0;
    var _part_key = _key + _index;
    
    var _this = this;
    var _loop = function (_index) {
        if (this._storage.isSet(_part_key)) {
            _this._storage.get(_part_key, function (_part_value) {
                _value = _value + _part_value;
                _index++;
                _part_key = _key + _index;
                _loop(_index);
            });
        }
        else {
            if ($.is_function((_callback))) {
                _callback(_value);
            }
        }
    };
    _loop(0);
    /*
    while (this._storage.isSet(_part_key)) {
        //$.test_msg('storage merge get key', _part_key);
        var _part_value = this._storage.get(_part_key);
        _value = _value + _part_value;
        _index++;
        _part_key = _key + _index;
    }
    //$.test_msg('storage merge get', _index);
    
    return _value;
    */
};

/* End of file KALS_storage */
/* Location: ./system/application/views/web_apps/core/KALS_storage.js */