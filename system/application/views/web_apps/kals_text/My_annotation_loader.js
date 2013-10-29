/**
 * My_annotation_loader
 * 負責做My_basic_annotation_loader跟My_custom_annotation_loader的中介者
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2011/11/06 上午 00:19:07
 * @extends {Annotation_scope_loader}
 */
function My_annotation_loader() {
    
    Annotation_scope_loader.call(this);
    
    this.basic = new My_basic_annotation_loader();
    this.custom = new My_custom_annotation_loader();
	
	return this;
}

My_annotation_loader.prototype = new Annotation_scope_loader();

/**
 * @return {My_basic_annotation_loader}
 */
My_annotation_loader.prototype.basic = null;

/**
 * @return {My_custom_annotation_loader}
 */
My_annotation_loader.prototype.custom = null;

//----------------------------

My_annotation_loader.prototype.setup_loader = function (_data, _callback) {
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

My_annotation_loader.prototype.stop_loader = function () {
    this.basic.stop_loader();
    this.custom.stop_loader();
    return this;
};

My_annotation_loader.prototype.is_loaded = function () {
    return (this.basic.is_loaded() && this.custom.is_loaded());
};

My_annotation_loader.prototype.load = function (_callback) {
    var _this = this;
    this.basic.load(function () {
        _this.custom.load(_callback);
    });
    return this;
};

My_annotation_loader.prototype.load_annotation = function () {
    this.basic.load_annotation();
    this.custom.load_annotation();
    return this;
};

My_annotation_loader.prototype.clear = function () {
    this.basic.clear();
    this.custom.clear();
    return this;
};

My_annotation_loader.prototype.reset = function () {
    this.basic.reset();
    this.custom.reset();
    return this;
};

My_annotation_loader.prototype.initialize = function () {
    this.basic.initialize();
    this.custom.initialize();
};

My_annotation_loader.prototype.reload = function (_data, _callback) {
    var _this = this;
	var _basic_data, _custom_data;
	
	//$.test_msg("My_annotation_loader.reload()", _data);
	
	if (typeof(_data) != "undefined") {
		if (typeof(_data.my_basic) != "undefined") {
			_basic_data = _data.my_basic;	
		}
		if (typeof(_data.my_custom) != "undefined") {
			_custom_data = _data.my_custom;	
		}
	}
	
    this.basic.reload(_basic_data, function () {
        _this.custom.reload(_custom_data, _callback);
    });
    return this;
};

My_annotation_loader.prototype.is_initialized = function () {
    return (this.basic.is_initialized() && this.custom.is_initialized());
};

/* End of file My_annotation_loader */
/* Location: ./system/application/views/web_apps/My_annotation_loader.js */