/**
 * Top_annotation_loader
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
function Top_annotation_loader() {
    
    Annotation_scope_loader.call(this);
    
    this.basic = new Top_basic_annotation_loader();
    this.custom = new Top_custom_annotation_loader();
}

Top_annotation_loader.prototype = new Annotation_scope_loader();

/**
 * @return {My_basic_annotation_loader}
 */
Top_annotation_loader.prototype.basic = null;

/**
 * @return {My_custom_annotation_loader}
 */
Top_annotation_loader.prototype.custom = null;

/**
 * 目前讀取標註的使用者
 * @type number
 */
Top_annotation_loader.prototype.user_id = null;

/**
 * 不使用自動重新讀取
 * 原本這邊是以毫秒為單位的數字，在Top_anntoation_loader這邊不使用這個功能，所以關掉
 */
Top_annotation_loader.prototype._refresh_interval = null;

//----------------------------

Top_annotation_loader.prototype.setup_loader = function (_data, _callback) {
    var _this = this;
    var _basic_data = _data.basic;
    var _custom_data = _data.custom;
    this.basic.setup_loader(_basic_data, function () {
        _this.custom.setup_loader(_custom_data, _callback);
    });
    return this;
};

Top_annotation_loader.prototype.stop_loader = function () {
    this.basic.stop_loader();
    this.custom.stop_loader();
    return this;
};

Top_annotation_loader.prototype.is_loaded = function () {
    return (this.basic.is_loaded() && this.custom.is_loaded());
};

Top_annotation_loader.prototype.load = function (_callback) {
    var _this = this;
    this.basic.load(function () {
        _this.custom.load(_callback);
    });
    return this;
};

Top_annotation_loader.prototype.load_annotation = function () {
    this.basic.load_annotation();
    this.custom.load_annotation();
    return this;
};

Top_annotation_loader.prototype.clear = function () {
    this.basic.clear();
    this.custom.clear();
    return this;
};

Top_annotation_loader.prototype.reset = function () {
    this.basic.reset();
    this.custom.reset();
    return this;
};

Top_annotation_loader.prototype.initialize = function () {
    this.basic.initialize();
    this.custom.initialize();
};

Top_annotation_loader.prototype.reload = function (_data, _callback) {
    var _this = this;
    var _basic_data = _data.basic;
    var _custom_data = _data.custom;
    this.basic.reload(_basic_data, function () {
        _this.custom.reload(_custom_data, _callback);
    });
    return this;
};

Top_annotation_loader.prototype.is_initialized = function () {
    return (this.basic.is_initialized() && this.custom.is_initialized());
};

/**
 * 設定目前讀取標註的使用者ID
 * @param {number} _user_id
 */
Top_annotation_loader.prototype.set_user_id = function (_user_id) {
	this.user_id = _user_id;
	return this;
};

/**
 * 取得目前讀取標註的使用者ID
 * @return {number}
 */
Top_annotation_loader.prototype.get_user_id = function () {
	return this.user_id;
};

/* End of file Top_annotation_loader */
/* Location: ./system/application/views/web_apps/My_annotation_loader.js */