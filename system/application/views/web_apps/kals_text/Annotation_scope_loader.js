/**
 * Annotation_scope_loader
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/24 下午 06:39:55
 * @extends {JSONP_dispatcher}
 */
function Annotation_scope_loader() {
    
    JSONP_dispatcher.call(this);
    
}

Annotation_scope_loader.prototype = new JSONP_dispatcher();

Annotation_scope_loader.prototype._refresh_timer = null;

/**
 * 間隔確認時間，預設是5分鐘(5*60*1000)
 * @type {number}
 */
Annotation_scope_loader.prototype._refresh_interval = 30 * 60 * 1000;

Annotation_scope_loader.prototype._last_check_time = null;

Annotation_scope_loader.prototype.setup_loader = function (_data, _callback) {
    
    var _this = this;
    
    if ($.is_function(_data) && $.is_null(_callback)) {
        _callback = _data;
        _data = null;
    }
    
    var _interval_action = function (_c) {
        
        //$.test_msg('Annotation_scope_loader.setup_loader()', _this._refresh_interval);
        
        _this.load(function () {
            $.trigger_callback(_c);
        });
    };
    
    if ($.isset(this._refresh_timer)) {
		this.stop_loader();
	}
    
    this._refresh_timer = setInterval(_interval_action, this._refresh_interval);
    
    if ($.is_null(_data)) {
        _interval_action(_callback);
    }
    else {
        _this._load_callback(null, _data, _callback);
    }
    
    
    return this;
    
};

Annotation_scope_loader.prototype.stop_loader = function () {
    
    if ($.is_null(this._refresh_timer)) {
		return this;
	}
    
    clearInterval(this._refresh_timer);
    this._refresh_timer = null;
    
    //$.test_msg('Annotation_scope_loader.stop_loader()', typeof(this._refresh_interval));
    
    return this;
    
};

Annotation_scope_loader.prototype._loaded = false;

Annotation_scope_loader.prototype.is_loaded = function () {
    return this._loaded;
};

Annotation_scope_loader.prototype.load = function (_callback) {
    
    var _time = this._last_check_time;
    
    var _this = this;
    JSONP_dispatcher.prototype.load.call(this, _time, function (_dispatcher, _data) {
        _this._load_callback(_dispatcher, _data, _callback);
    });
    return this;
};

Annotation_scope_loader.prototype._load_callback = function (_dispatcher, _data, _callback) {
    
    var _this = this;
    this._loaded = true;
    return this.load_annotation(_data, function () {
        //_this._last_check_time = (new Date()).getTime();
        _this._last_check_time = $.get_epoch_time();
    
        $.trigger_callback(_callback);    
    });
};

/**
 * 讀取標註並設置。請子類別覆寫此方法。
 */
Annotation_scope_loader.prototype.load_annotation = function () {
    return this;
};

/**
 * 清除標註。請子類別覆寫此方法。
 */
Annotation_scope_loader.prototype.clear = function () {
    return this;
};

Annotation_scope_loader.prototype.reload = function (_data, _callback) {
    
    this.stop_loader();
    this.clear();
    this.setup_loader(_data, _callback);
    
    return this;
};

Annotation_scope_loader.prototype.reset = function () {
    
    this.stop_loader();
    this._last_check_time = null;
    this._loaded = false;
    this.clear();
    
    return this;
    
};

Annotation_scope_loader.prototype.is_initialized = function () {
    return (this._last_check_time !== null);
};

/* End of file Annotation_scope_loader */
/* Location: ./system/application/views/web_apps/Annotation_scope_loader.js */