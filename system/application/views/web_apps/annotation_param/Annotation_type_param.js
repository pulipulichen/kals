/**
 * Annotation_type_param
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/26 下午 02:07:24
 * @param {Annotation_type_param|JSON|String} _param 預先匯入的資料
 */
function Annotation_type_param(_param) {
    
    this._enable_config = {
        topic: true,
        respond: true
    };
    
    if ($.isset(_param)) {
        return this.set(_param);
    }
}

Annotation_type_param.prototype.id = 1;
Annotation_type_param.prototype.custom_name = null;

Annotation_type_param._type_mapping = {
    1: 'importance',
    2: 'question',
    3: 'confusion',
    4: 'summary',
    5: 'concept',
    6: 'example',
    7: 'custom'
};

Annotation_type_param.current_custom_id = 100;

/**
 * 標註顯示的類型
 * @version 20111105 Pudding Chen 
 * @type String 自訂類型，有以下兩個選項可選
 *     "underline": 底線(預設)
 *     'dashedline': 底線虛線
 *     'dottedline': 底線虛線
 *     'doubleline': 底線雙線
 *     "background": 背景顏色
 *     "none": 沒有特別的格式
 */
Annotation_type_param.prototype._anchor_style = 'underline';

/**
 * 標註類型顯示的顏色
 * @version 20111105 Pudding Chen
 * @type {String} 以CSS的顏色表示法為主，開頭要有井字號「#」。也可以用CSS接受的英文。
 *     預設是my_custom的綠色
 */
Annotation_type_param.prototype._anchor_color = '#7EFF7E';

/**
 * 標註類型顯示的字型顏色
 * @version 20111105 Pudding Chen
 * @type {String} 以CSS的顏色表示法為主，開頭要有井字號「#」。也可以用CSS接受的英文。
 *     預設是原本文字的顏色
 */
Annotation_type_param.prototype._anchor_font_color = null;


/**
 * 標註類型的說明
 * @version 20111105 Pudding Chen
 * @type {String|null} 請寫上說明。盡量不要超過50個中文字，不然版面會很奇怪。
 */
Annotation_type_param.prototype._hint = null;

/**
 * 標註類型按鈕的背景顏色
 * @type {string} CSS的顏色表示法
 */
Annotation_type_param.prototype._option_background_color = 'white';

/**
 * 標註類型按鈕的字體顏色
 * @type {string} CSS的顏色表示法
 */
Annotation_type_param.prototype._option_font_color = 'black';

/**
 * 是否是基礎標註類型
 * @version 20111105 Pudding Chen
 * @type {boolean} = true
 */
Annotation_type_param.prototype._is_basic_annotation_type = true;

/**
 * 是否是預先標註類型
 * @version 20111105 Pudding Chen
 * @type {boolean} = true
 */
Annotation_type_param.prototype._is_predefined_annotation_type = true;

// ---------------------------------------------------------------

/**
 * 設定標註類型
 * @param {Object} _param
 */
Annotation_type_param.prototype.set = function (_param) {
    
    var _id = Annotation_type_param.filter_basic_id(_param);
    
    //$.test_msg('Annotation_type_param.set()', [_param, _id, $.is_number(_id)]);
    
    if ($.is_number(_id)) {
        //表示是基本的ID
        this.id = _id;
        this.custom_name = null;
    } 
    else if ($.is_class(_param, 'Annotation_type_param')) {
        //this.id = _param.get_id();
        //this.custom_name = _param.get_custom_name();
        return _param;
    }
    else if (_param === "[object Object]") {
        this.id = 7;
        this.custom_name = null;
    }
    else {
        //如果是字串的話，那表示是自訂類型囉
        //this.id = 7;
        this.custom_name = _param;
        this.set_custom();
    }
    
    return this;
};

/**
 * 等同於this.set()的功能
 * @param {Object} _param
 */
Annotation_type_param.prototype.set_type = function (_param) {
    return this.set(_param);
};

Annotation_type_param.prototype.reset_custom_name = function () {
    this.custom_name = null;
    return this;
};

Annotation_type_param.prototype.get_id = function () {
    return this.id;
};

/**
 * 設置標註類型的type_id
 * @param {int} _type_id
 * @version 20111105 Pudding Chen
 */
Annotation_type_param.prototype.set_id = function (_type_id) {
    this.id = _type_id;
    return this;
};

/**
 * 配給自訂標註類型的ID (這跟資料庫的ID不一樣喔
 * @version 20111105 Pudding Chen
 */
Annotation_type_param.prototype.set_custom_id = function () {
    var _custom_id = Annotation_type_param.current_custom_id + 1;
    this.set_id(_custom_id);
    Annotation_type_param.current_custom_id++;
    return this;
};

/**
 * 將這個標註類型設定為「自訂」的類別
 */
Annotation_type_param.prototype.set_custom = function () {
    this.set_custom_id();
    this._is_basic_annotation_type = false;
    return this;
};

/**
 * get_type_name的別名
 */
Annotation_type_param.prototype.get_name = function () {
    /*
    if (this.custom_name === null) {
        return Annotation_type_param.filter_name(this.id);
    }
    else {
        return this.custom_name;
    } 
    */
    return this.get_type_name();
};

/**
 * 標註類型的名字
 * 
 * @return {String} 
 */
Annotation_type_param.prototype.get_type_name = function () {
    /*
    var _id = this.get_id();
    if (_id > 7)
        _id = 7;
    
    //$.test_msg('Annotation_type_param.get_type_name()', [this.get_id(), _id, Annotation_type_param.filter_name(_id)]);
    
    return Annotation_type_param.filter_name(_id);
    */
    if (this.custom_name === null) {
        return Annotation_type_param.filter_name(this.id);
    }
    else {
        return this.custom_name;
    }
};

/**
 * 標註類型的語系檔
 * 
 * @return {KALS_language_param}
 */
Annotation_type_param.prototype.get_type_name_lang = function () {
    var _name = this.get_type_name();

    var _lang;
    if (this.is_basic()) {
        _lang = new KALS_language_param(
            _name,
            "annotation.type." + _name
        );
    }
    else {
        //如果是自訂類型的話
        _lang = new KALS_language_param(
            _name
        );
    }

    return _lang;
};

/**
 * 直接顯示標註名字的翻譯字串
 * 
 * @return {String}
 */
Annotation_type_param.prototype.get_type_name_display = function () {
    var _lang = this.get_type_name_lang();
    if (this.is_basic()) {
        return KALS_context.lang.line(_lang);
    }
    else {
        return this.get_custom_name();
    }
};

Annotation_type_param.prototype.get_custom_name = function () {
    return this.custom_name;
};

/**
 * @deprecated 20111106 Pudding Chen 不應該使用，應該使用is_basic
 * @return {boolean}
 */
Annotation_type_param.prototype.is_custom = function () {
    return (this.id === 7);
};

Annotation_type_param.prototype.has_custom_name= function () {
    return (this.custom_name !== null);
};

/**
 * 相等
 * @param {Annotation_type_param} _type
 * @returns {Boolean}
 */
Annotation_type_param.prototype.equals = function (_type) {
    if ($.is_null(_type)) {
        return false;
    }
    if ($.is_class(_type, 'Annotation_type_param') === false) {
        _type = new Annotation_collection_param(_type);
    }
    
    return (_type.get_id() === this.get_id()
            && _type.get_custom_name() === this.get_custom_name());
};

Annotation_type_param.prototype.export_json = function () {
    
    var _json = this.get_id();
    
    if (this.is_basic() === false) {
        var _name = this.get_name();
        if (_name !== 'custom') {
            _json = encodeURIComponent(_name);
        }
    }
    
    return _json;
};

Annotation_type_param.filter_basic_id = function (_param) {
    
    if ($.is_number(_param)) {
        if (typeof(Annotation_type_param._type_mapping[_param]) === 'string') {
            return _param;
        }
        else {
            return null;
        }
    }
    else if ($.is_string(_param)) {
        for (var _i in Annotation_type_param._type_mapping) {
            var _typename = Annotation_type_param._type_mapping[_i];
            if (_typename === _param) {
                return parseInt(_i,10);
            }
        }
    }
    
    return null;
};

Annotation_type_param.filter_name = function (_param) {
    
    if ($.is_string(_param)) {
        return _param;
    }
    else if ($.is_number(_param) 
            && typeof(Annotation_type_param._type_mapping[_param]) === 'string') {
        return Annotation_type_param._type_mapping[_param];
    }
    else {
        return _param;
    }
};

/**
 * 設定標註顯示的類型
 * @version 20111105 Pudding Chen
 * @param {string} _style 標註類型
 *     'underline': 底線(預設)
 *     'dashedline': 底線虛線
 *     'dottedline': 底線點線
 *     'doubleline': 底線雙線
 *     'background': 背景顏色
 */
Annotation_type_param.prototype.set_anchor_style = function (_style) {
    if (_style === 'background') {
        this._anchor_style = _style;
    }
    else {
        this._anchor_style = 'underline';
    }
    return this;
};

/**
 * 設定標註類型顯示的顏色
 * @version 20111105 Pudding Chen
 * @param {string} _color 以CSS的顏色表示法為主，開頭要有井字號「#」。也可以用CSS接受的英文。
 *     預設是my_custom的綠色
 */
Annotation_type_param.prototype.set_anchor_color = function (_color) {
    this._anchor_color = _color;
    return this;
};

/**
 * 設定標註類型顯示的字型顏色
 * @version 20111105 Pudding Chen
 * @param {string} _color 以CSS的顏色表示法為主，開頭要有井字號「#」。也可以用CSS接受的英文。
 *     預設是my_custom的綠色
 */
Annotation_type_param.prototype.set_anchor_font_color = function (_color) {
    this._anchor_font_color = _color;
    return this;
};

/**
 * 根據custom style & color取得css設定
 * @return {string}
 */
Annotation_type_param.prototype.get_anchor_css = function () {
    var _css;
    var _style = this._anchor_style;
    var _color = this._anchor_color;
    
    if (_style === 'underline') {
        _css = 'border-bottom:1px solid ' + _color;
    }
    else if (_style === 'dottedline') {
        _css = 'border-bottom:1px dotted ' + _color;
    }
    else if (_style === 'doubleline') {
        _css = 'border-bottom:1px double ' + _color;
    }
    else if (_style === 'hashedline') {
        _css = 'border-bottom:1px dashed ' + _color;
    }
    else if (_style === 'background') {
        _css = 'background-color:' + _color;
    }
    else if (_style === 'none') {
        //_css = 'color:' + _color;
    }
    else {
        _css = 'border-bottom:1px solid ' + _color;
    }
    _css = _css + ' !important';
    
    if (typeof(this._anchor_font_color) === 'string') {
        _css = _css + ';color:' + this._anchor_font_color + ' !important';
    }
    //_css = ' {' + _css + '} ';
    return _css;
};

/**
 * 設定標註類型的說明
 * @version 20111105 Pudding Chen
 * @param {String} _hint 說明
 */
Annotation_type_param.prototype.set_hint = function(_hint) {
    if ($.is_string(_hint)) {
		_hint = $.trim(_hint);
	}
    this._hint = _hint;
    return this;
};

/**
 * 取得標註類型的說明
 * @version 20111105 Pudding Chen
 * @return {string}
 */
Annotation_type_param.prototype.get_hint = function () {
    if ($.is_null(this._hint)) {
        var _type = this.get_type_name();
        var _lang = new KALS_language_param(
        '',
        'annotation.type.' + _type + '.hint'
    );
        var _hint = KALS_context.lang.line(_lang);
        this._hint = _hint;
    }
    return this._hint;
};

/**
 * 確認是否是基礎標註類型
 * @version 20111105 Pudding Chen
 * @return {boolean}
 */
Annotation_type_param.prototype.is_basic = function () {
    return this._is_basic_annotation_type;
};

/**
 * 確認是否是預先定義的標註類型
 * @version 20111106 Pudding Chen
 * @return {boolean}
 */
Annotation_type_param.prototype.is_predefined = function () {
    return this._is_predefined_annotation_type;
};

/**
 * 設定是否是預先定義的函式
 * @version 20111106 Pudding Chen
 * @param {boolean} _is_prefined
 */
Annotation_type_param.prototype.set_predefined = function (_is_prefined) {
    if ($.is_boolean(_is_prefined)) {
        this._is_predefined_annotation_type = _is_prefined;
    }
    return this;
};

/**
 * 取得標註類型的classname
 * @param {string|null} _prefix
 * @param {string|null} _postfix
 * @return {string}
 */
Annotation_type_param.prototype.get_classname = function (_prefix, _postfix) {
    
    if (typeof(_prefix) === 'undefined') {
        _prefix = '';
    } 
    if (typeof(_postfix) === 'undefined') {
        _postfix = '';
    }
    
    var _type_id = this.get_id();
    var _type_classname = '';
    
    if (typeof(Annotation_type_param._type_mapping[_type_id]) === 'string') {
        _type_classname = Annotation_type_param._type_mapping[_type_id];
    }
    else {
        _type_classname = 'custom_type_' + _type_id;
    }
    
    return _prefix + _type_classname + _postfix;
};

/**
 * 取得標註類型的classname，以「my_」開頭
 * @param {string|null} _prefix
 * @param {string|null} _postfix
 * @return {string}
 */
Annotation_type_param.prototype.get_my_classname = function (_prefix, _postfix) {
    return 'my_' + this.get_classname(_prefix, _postfix);
};

/**
 * 設置按鈕的背景顏色
 * @param {string} _color CSS顏色表示法
 */
Annotation_type_param.prototype.set_option_background_color = function (_color) {
    this._option_background_color = _color;
    return this;
};

/**
 * 設置按鈕的字體顏色
 * @param {string} _color CSS顏色表示法
 */
Annotation_type_param.prototype.set_option_font_color = function (_color) {
    this._option_font_color = _color;
    return this;
};

/**
 * 取得設置按鈕的style參數
 * @return {String} CSS的style rule
 */
Annotation_type_param.prototype.get_option_style = function () {
    var _style = 'background-color:' + this._option_background_color
        + ';color:' + this._option_font_color;
    return _style;
};

//-----------------------------------------------------------

/**
 * 建立標註類別的按鈕
 * @returns {jQuery}
 */
Annotation_type_param.prototype.get_ui = function () {
    return this.get_option_ui();
};

/**
 * 建立標註類別的按鈕
 * @returns {jQuery}
 */
Annotation_type_param.prototype.get_option_ui = function () {
    if (this._option_ui === undefined) {
        var _view = new View_annotation_type_option(this);
        _view = _view.get_ui();
        this._option_ui = _view;
    }
    return this._option_ui;
};

/**
 * 標註類別的按鈕
 */
Annotation_type_param.prototype._option_ui;

//-----------------------------------------------------------

/**
 * 啟用標註類型的功能
 * @type type
 */
Annotation_type_param.prototype._enable_config = null;

/**
 * 設定自己的適用類型
 * @param {String|JSON} _type
 * @param {Boolean} _option
 * @returns {Annotation_type_param.prototype}
 */
Annotation_type_param.prototype.set_enable_config = function (_type, _option) {
    
    if (typeof(_type) === "object") {
        var _config = _type;
        for (var _type in _config) {
            _option = _config[_type];
            this.set_enable_config(_type, _option);
        }
        return this;
    }
    
    //$.test_msg("set_enable_config", [_type, _option]);
    this._enable_config[_type] = _option;
    
    return this;
};

/**
 * 取得標註類型的啟用設定
 * @returns {JSON}
 */
Annotation_type_param.prototype.get_enable_config = function() {
    return this._enable_config;
};

/**
 * 是否啟用於該類型底下
 * 
 * get_enable_config()的別名
 * @param {String} _type
 * @returns {Boolean}
 */
Annotation_type_param.prototype.is_enable = function (_type) {
    var _option = true;
    
    if (typeof(this._enable_config[_type]) === "boolean"
            && this._enable_config[_type] === false) {
        _option = false;
    }
    
    return _option;
};

// --------------------------------------------------

/**
 * 排序參數
 * 
 * 數字越大，越往上排
 * 數字越小，越往下排
 * 預設是1
 * @type Number
 */
Annotation_type_param.prototype._order = 5;

/**
 * 設定排序
 * @param {Number} _order
 * @returns {Annotation_type_param}
 */
Annotation_type_param.prototype.set_order = function (_order) {
    if (typeof(_order) === 'number') {
        this._order = _order;
    }
    return this;
}

/**
 * 取得排序
 * @returns {Number} _order
 */
Annotation_type_param.prototype.get_order = function () {
    return this._order;
}
/* End of file Annotation_type_param */
/* Location: ./system/application/views/web_apps/Annotation_type_param.js */