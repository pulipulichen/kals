/**
 * KALS_module_manager
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2014/4/28 下午 02:28:30
 * @extends {Multi_event_dispatcher}
 */
function KALS_module_manager(){
   
   Multi_event_dispatcher.call(this);
   
}

/**
 * 繼承自Multi_event_dispatcher
 */
KALS_module_manager.prototype = new Multi_event_dispatcher(); 

/**
 * 已經讀取過的模組
 * @type Array
 */
KALS_module_manager.prototype._loaded_modules = {};

/**
 * 預先載入模組
 */
KALS_module_manager.prototype.init = function() {
    if (typeof(KALS_CONFIG) === "object"
            && typeof(KALS_CONFIG.modules) === "object") {
        
        var _modules = KALS_CONFIG.modules;
        
        for (var _name in _modules) {
            //$.test_msg("KALS_module 載入", _name);
            this.load(_name);
            //$.test_msg("KALS_module 載入後", typeof(this._loaded_modules[_name]));
        }
        
        // 載入完之後，登錄到KALS_context當中？
        //$.test_msg("KALS_module.init()", typeof(KALS_context));
        
        //$.test_msg("KALS_module. loaded count", this._loaded_modules.length);
        
        /*
        for (var _i in this._loaded_modules) {
            var _item = this._loaded_modules[_i];
            //$.test_msg("prepare register_item", [_i, typeof(_item)]);
            KALS_context.navigation.register_item(_item);
        }
        */
    }
    
    return this._loaded_modules;
};

/**
 * 載入模組
 * @param {String} _name 模組的名稱，注意要用字串
 * @param {Object} _param 搭配模組載入的參數
 * @param {Function} _callback 回呼函式
 * @returns {Object|Boolean} 回傳載入的模組的物件。如果是False，則表示載入失敗。
 */
KALS_module_manager.prototype.load = function (_name, _param, _callback) {
    
    // 參數調整
    if (typeof(_param) === "function" 
            && typeof(_callback) === "undefined") {
        _callback = _param;
        _param = undefined; 
    }
    
    var _module = false;
    
    // 先讀取已經載入的模組
    _module = this._get_loaded_module(_name);
    if (typeof(_module) === "object") {
        return _module;
    }
    
    if (_name === undefined) {
        return false;
    }
    else if (typeof _name === "function") {
        // @TODO 尚未確定功能是否可以運作
        _name = _name.toString();
    }
    
    try {
        var _command = '_module = new ' + _name + "(_param)";
        eval(_command);

        //$.test_msg("eval過後", typeof(_module));
        
        if (typeof(_module) === "object") {
            
            // 讀取KALS_CONFIG
            var _config = this._load_config(_name);
            if (typeof(_config.enable) === "boolean"
                    && _config.enable === false) {
                return false;
            }
            
            _module = this._add_loaded_module(_name, _module);
            
            _module = this._init_module_config(_module, _config);
            
            $.test_msg("init config過後", [_name, typeof(_module)]);
            
            if (typeof(_callback) === "function") {
                _callback(_module);
            }
            
            return _module;
        }
    }
    catch (_e) {
        // do nothing
    }
    
    return false;
};

/**
 * 檢查模組是否存在
 * @param {String} _name 模組名稱
 * @returns {Boolean} 是否存在
 */
KALS_module_manager.prototype.has_module = function (_name) {
    var _exist = false;
    
    // 讀取已經載入的模組看看
    _exist = this._get_loaded_module(_name);
    if (typeof(_exist) === "object") {
        //$.test_msg("讀取已經載入的模組看看", typeof(_exist));
        return true;
    }
    
    if (_name === undefined) {
        return false;
    }
    else if (typeof(_name) === "function") {
        return true;
    }
    else {
        try {
            var _module = false;
            var _command = '_module = new ' + _name + "(_param)";
            eval(_command);
            //$.test_msg("eval過後", typeof(_module));
            if (typeof(_module) === "object") {
                this._add_loaded_module(_name, _module);
                return true;
            }
        }
        catch (_e) {
            return false;
        }
    }
    return _exist;
};

/**
 * 加入已經儲存的模組
 * @param {String} _name
 * @param {Object} _module
 */
KALS_module_manager.prototype._add_loaded_module = function (_name, _module) {
    if (typeof(this._loaded_modules[_name]) === "undefined") {
        //$.test_msg("加入已經儲存的模組", typeof(_module));
        this._loaded_modules[_name] = _module;
    }
    return _module;
};

/**
 * 取得已經儲存的模組
 * @param {String} _name
 * @returns {Object}
 */
KALS_module_manager.prototype._get_loaded_module = function (_name) {
    if (typeof(this._loaded_modules[_name]) === "undefined") {
        return false;
    }
    else {
        return this._loaded_modules[_name];
    }
};

/**
 * 從KALS_CONFIG中取得模組參數 
 * @param {String|Function} _name
 * @returns {JSON}
 */
KALS_module_manager.prototype._load_config = function (_name) {
    
    //$.test_msg("module load_config", [typeof(KALS_CONFIG), typeof(KALS_CONFIG.modules), typeof(KALS_CONFIG.modules[_name])]);
    if (typeof(KALS_CONFIG) === "object"
            && typeof(KALS_CONFIG.modules) === "object"
            && typeof(KALS_CONFIG.modules[_name]) === "object") {
        return KALS_CONFIG.modules[_name];
    }
    
    return false;
};

/**
 * 將讀取的設定初始化到模組中
 * @param {KALS_controller_window} _module 各種載入的模組
 * @param {JSON} _config
 * @returns {Ojbect}
 */
KALS_module_manager.prototype._init_module_config = function (_module, _config) {
    //$.test_msg("init module config", [typeof(_module), typeof(_config)]);
    if (typeof(_module) !== "object" 
            || typeof(_config) !== "object") {
        return _module;
    }
    
    for (var _key in _config) {
        //$.test_msg("init module config key", [_key, _config[_key]]);
        _module[_key] = _config[_key];
    }
    
    $.test_msg("init module ", [_module.name, _module.nav_config.display]);
        
    
    return _module;
};

/**
 * 取得已經讀取的模組
 * @returns {Object} = {
 *  "Dashboard": [Object]
 * }
 */
KALS_module_manager.prototype.get_loaded_modules = function () {
    return this._loaded_modules;
};

/* End of file KALS_module_manager */
/* Location: ./system/application/views/web_apps/core/KALS_module_manager.js */