/**
 * Annotation_scope_loader_manager
 * 負責做My_basic_annotation_loader跟My_custom_annotation_loader的中介者
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2015, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2015/11/02 上午 00:19:07
 * @extends {Annotation_scope_loader}
 */
function Annotation_scope_loader_manager() {
    
    Annotation_scope_loader.call(this);
    
    this._$init_loaders();
    
    return this;
}

Annotation_scope_loader_manager.prototype = new Annotation_scope_loader();

// ------------------------------
// 設定區
// ------------------------------

/**
 * 設定標註範圍讀取器
 * [需要自訂]
 * 
 * @returns {Annotation_scope_loader_manager.prototype}
 */
Annotation_scope_loader_manager.prototype._$init_loaders = function () {
    
    //this.basic = new My_basic_annotation_loader();
    //this.custom = new My_custom_annotation_loader();
    return this;
};

/**
 * 基本標註的關鍵字
 * @type String
 */
Annotation_scope_loader_manager.prototype._$basic_key = "my_basic";

/**
 * 預訂標註的關鍵字
 * @type String
 */
Annotation_scope_loader_manager.prototype._$custom_key = "my_custom";

// --------------------------------------
// 函式庫區，沒特別事情請不要更動
// --------------------------------------

/**
 * 基本的標註範圍
 * @return {Annotation_subscope_loader}
 */
Annotation_scope_loader_manager.prototype.basic = null;

/**
 * 特殊的標註範圍
 * @return {Annotation_subscope_loader}
 */
Annotation_scope_loader_manager.prototype.custom = null;

//----------------------------

Annotation_scope_loader_manager.prototype.setup_loader = function (_data, _callback) {
    var _this = this;
    var _basic_data = _data.basic;
    var _custom_data = _data.custom;
    this.basic.setup_loader(_basic_data, function () {
        _this.custom.setup_loader(_custom_data, function(){

            if ($.is_function(_callback)) {
                _callback();
            }
        });
    });
    return this;
};

Annotation_scope_loader_manager.prototype.stop_loader = function () {
    this.basic.stop_loader();
    this.custom.stop_loader();
    return this;
};

Annotation_scope_loader_manager.prototype.is_loaded = function () {
    return (this.basic.is_loaded() && this.custom.is_loaded());
};

Annotation_scope_loader_manager.prototype.load = function (_callback) {
    var _this = this;
    this.basic.load(function () {
        _this.custom.load(_callback);
    });
    return this;
};

Annotation_scope_loader_manager.prototype.load_annotation = function () {
    this.basic.load_annotation();
    this.custom.load_annotation();
    return this;
};

Annotation_scope_loader_manager.prototype.clear = function () {
    this.basic.clear();
    this.custom.clear();
    return this;
};

Annotation_scope_loader_manager.prototype.reset = function () {
    this.basic.reset();
    this.custom.reset();
    return this;
};

Annotation_scope_loader_manager.prototype.initialize = function () {
    this.basic.initialize();
    this.custom.initialize();
};

Annotation_scope_loader_manager.prototype.reload = function (_data, _callback) {
    var _this = this;
    var _basic_data, _custom_data;

    //$.test_msg("Annotation_scope_loader_manager.reload()", _data);

    if (typeof(_data) !== "undefined") {
        if (typeof(_data.my_basic) !== "undefined") {
            _basic_data = _data[_this._$basic_key];
        }
        if (typeof(_data.my_custom) !== "undefined") {
            _custom_data = _data[_this._$custom_key];
        }
    }
	
    this.basic.reload(_basic_data, function () {
        _this.custom.reload(_custom_data, _callback);
    });
    return this;
};

Annotation_scope_loader_manager.prototype.is_initialized = function () {
    return (this.basic.is_initialized() && this.custom.is_initialized());
};

/* End of file Annotation_scope_loader_manager */
/* Location: ./system/application/views/web_apps/Annotation_scope_loader_manager.js */