/**
 * Context_loader
 *
 * 分擔KALS_context中關於網址部分的工作
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2014/5/19 下午 03:36:17
 * @extends {Multi_event_dispatcher}
 */
function Context_loader(){
   
   Event_dispatcher.call(this);
   
}

Context_loader.prototype = new Multi_event_dispatcher(); 

/**
 * 讀取模組設定資料的位置
 * @type {string}
 */
Context_loader.prototype._modules_config_url = 'generic/modules_config';


/**
 * 讀取模組會用到的資料
 * @param {Function} _callback
 * @returns {KALS_context}
 */
Context_loader.prototype.load_modules_config = function (_callback) {
    
    var _this = this;
    var _loaded_callback = function (_data) {
        
        if (typeof(_data.KALS_view_manager) !== 'undefined') {
            KALS_context.view_manager.set_data(_data.KALS_view_manager);
        }
        
        $.trigger_callback(_callback);
    };
    
    var _config = {
        "url": this._modules_config_url,
        "callback": _loaded_callback,
        "fixed_callback": "modules_config",
        "retry_wait": 3 * 1000
    };
    
    KALS_util.ajax_get(_config);
    
    return this;
};

/**
 * 讀取網頁設定資料的位置
 * @type {string}
 */
Context_loader.prototype._webpage_info_url = 'generic/webpage_info';

/**
 * 讀取網頁設定資料
 * @param {Function} _callback
 * @returns {KALS_context}
 */
Context_loader.prototype.load_webpage_info = function (_callback) {
    
    var _this = this;
    var _loaded_callback = function (_data) {
        
        if (typeof(_data.webpage_id) !== 'undefined') {
            _this.webpage_id = _data.webpage_id;
        }
        
        $.trigger_callback(_callback);
    };
    
    var _config = {
        "url": this._webpage_info_url,
        "callback": _loaded_callback
    };
    
    KALS_util.ajax_get(_config);
    
    return this;
};

/* End of file Context_loader */
/* Location: ./system/application/views/web_apps/Context_loader.js */