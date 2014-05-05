/**
 * Context_basic_type
 * 控制自訂標註類別的管理器
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2014/5/5 下午 3:59:43
 * @extends {Attribute_event_dispatcher}
 */
function Context_basic_type(){
    
    Attribute_event_dispatcher.call(this);
    
    var _this = this;
    //setTimeout(function () {
        _this.initialize();  
    //}, 0);
}

Context_basic_type.prototype = new Attribute_event_dispatcher();

Context_basic_type.prototype._$data_key = 'basic_type';

/**
 * 擺放標註類型資料
 * @type {JSON} 注意資料格式
 *     _type_list = {
 *         "標註類型一": new Annotation_type_paray(),
 *         "標註類型二": new Annotation_type_paray(),
 *         "標註類型三": new Annotation_type_paray()
 *     }
 */
Context_basic_type.prototype._type_list = {};

//-----------------------------------------------

/**
 * 初始化，從KALS_CONFIG載入資料
 */
Context_basic_type.prototype.initialize = function () {
    
    var _basic_type = null;
    if (typeof(KALS_CONFIG.annotation_type_config) !== "undefined") {
        _basic_type = KALS_CONFIG.annotation_type_config;
    }
    else if (typeof(KALS_CONFIG.annotation_type_option) !== "undefined") {
        _basic_type = KALS_CONFIG.annotation_type_option;
    }
    
    if (_basic_type !== null) {
        var _type_list = {};
        
        for (var _type_name in _basic_type) {
            var _type_config = _basic_type[_type_name];
            
            var _type_param = this._initialize_type(_type_name, _type_config);
            
            //$.test_msg("Context_basic_type._initialize_type 3: " + _type_name, _type_param.is_enable("topic"));
            _type_list[_type_name] = _type_param;
            
            //$.test_msg("Context_basic_type._initialize_type 4: " + _type_name, _type_list[_type_name].is_enable("topic"));
            //$.test_msg("Context_basic_type._initialize_type 4.4: ", _type_list["importance"]._enable_config);
        }
        //$.test_msg("Context_basic_type._initialize_type 4.4: ", _type_list["importance"]);
        // $.test_msg("Context_basic_type._initialize_type 4.5: ", _type_list["importance"].is_enable("topic"));
        this._type_list = _type_list;
    }
    //this.get_type_list("topic");
    
    return this;
};

/**
 * 初始化個別的標註
 * @param {String} _type_name
 * @param {JSON} _type_config
 * @returns {Annotation_type_param}
 */
Context_basic_type.prototype._initialize_type = function (_type_name, _type_config) {
    
    var _type_param = new Annotation_type_param(_type_name);

    if (typeof(_type_config["enable"]) === 'object') {
        //$.test_msg("Context_basic_type._initialize_type: " + _type_name, _enable_config);
        var _enable_config = _type_config["enable"];
        
        //$.test_msg("Context_basic_type._initialize_type 2: " + _type_name, _type_param.is_enable("topic"));
        _type_param.set_enable_config(_enable_config);
    }
    
    if (typeof(_type_config["order"]) === "number") {
        var _order = _type_config["order"];
        _type_param.set_order(_order);
    }
    return _type_param;
};

/**
 * 取得自訂標註類型的名稱清單
 * @return {string[]}
 */
Context_basic_type.prototype.get_type_name_list = function (_enable_type) {
    
    var _type_name_list = [];
    for (var _type_name in this._type_list) {
        
        var _type_param = this._type_list[_type_name];
        // 檢查啟用類型
        if (typeof(_enable_type) === "string"
            && _type_param.is_enable(_enable_type) === false) {
            continue;
        }
        
        _type_name_list.push(_type_name);
    }
    return _type_name_list;
    
};

/**
 * 取得自訂標註的資料
 * @param {String} _enable_type 要啟用的類型
 * @return {Annotation_type_param[]}
 */
Context_basic_type.prototype.get_type_list = function (_enable_type) {
    
    //var _type_name = "importance";
    //$.test_msg("Context_basic_type._initialize_type 5: " + _type_name, this._type_list[_type_name].is_enable("topic"));
    
    var _type_list = [];
    for (var _type_name in this._type_list) {
        var _type_param = this._type_list[_type_name];
        
        //$.test_msg("Context_basic_type.get_type_list: " + _type_name, [_enable_type, this._type_list[_type_name].is_enable(_enable_type)]);
        
        // 檢查啟用類型
        if (typeof(_enable_type) === "string"
            && _type_param.is_enable(_enable_type) === false) {
            continue;
        }
        
        _type_list.push(_type_param);
    }
    return _type_list;
};

/**
 * 從標註類型名稱取得type_id
 * @param {string} _type_name 標註類型的名稱，也可以直接就是數字
 * @param {number}
 */
Context_basic_type.prototype.filter_id = function (_type_name) {
    var _type_id = null;
    
    if ($.is_number(_type_name)) {
        _type_id = _type_name;
    }
    else {
        var _type = this._type_list[_type_name];
        _type_id = _type.get_id();
    }
    
    return _type_id;
};

/**
 * 得知現在自訂標註類型的數量
 * @return {number}
 */
Context_basic_type.prototype.length = function () {
    var _number = 0;
    for (var _i in this._type_list) {
        _number++;
    }
    return _number;
};

/**
 * 從標註類別名稱找到標註類別變數
 * @param {String|number} _type_name
 * @return {Annotation_type_param}
 */
Context_basic_type.prototype.find_type = function (_type_name) {
    var _output_type = null;
    
    var _test_number = parseInt(_type_name,10);
    if (_type_name === _test_number + '') {
        _type_name = _test_number;
    }
    
    var _basic_id = Annotation_type_param.filter_basic_id(_type_name);
    
    if ($.is_number(_basic_id)) {
        //$.test_msg("custom.find_type()", "基本資料");
		
        //表示是基本資料
        _output_type = new Annotation_type_param(_basic_id);
    }
    else if ($.is_number(_type_name)) {
        //$.test_msg("custom.find_type()", "數字");
		
        var _target_type_id = _type_name;
        //$.test_msg('Context_basic_type.find_type ready search', this._type_list);
        for (var _t in this._type_list) {
            var _type = this._type_list[_t];
            var _type_id = _type.get_id();
            //$.test_msg('Context_basic_type.find_type search', [_type_name, _type_id]);
            if (_type_id === _target_type_id) {
                _output_type = _type;
                break;
            }
        }
        
        if (_output_type === null) {
            _output_type = new Annotation_type_param(_target_type_id);
        }
    }
    else {
        //$.test_msg("custom.find_type()", "其他" + typeof(this._type_list[_type_name]));
		
        if (typeof(this._type_list[_type_name]) !== 'undefined') {
            _output_type = this._type_list[_type_name];
        }
    }
    
    //$.test_msg('Context_basic_type.find_type', [_type_name, (_output_type === null)]);
    
    return _output_type;
};

/**
 * find_type的交接口
 * @param {String} _json
 */
Context_basic_type.prototype.import_json = function (_json) {
    var _type_param = this.find_type(_json);
    if ($.is_null(_type_param)) {
        _type_param = this.add_predefined_type(_json);
    } 
    return _type_param;
};

/**
 * 取得type選項的按鈕
 * @param {Annotation_type_param|string|number} _type_data
 * @return {Annotation_type_param}
 */
Context_basic_type.prototype.get_type_option = function (_type_data) {
    return _type_data.get_option_ui();
    /*
    var _option = $('<span></span>')
        .addClass('type-option');
    
    //取得參數    
    var _type_param = null;
    
    //$.test_msg('Context_basic_type.get_type_option [_type_data]', _type_data);
    
    if ($.is_class(_type_data, 'Annotation_type_param')) {
        _type_param = _type_data;
    }
    else {
        _type_param = this.find_type(_type_data);
    }
    
    if (_type_param === null) {
        _type_param = this.add_custom_type(_type_data);
    }
    
    //$.test_msg('Context_basic_type.get_type_option [_type_name]', [_type_param.get_name(), _type_param.is_basic(), _type_param.get_option_style()]);
    
    //設置外觀
    _option.addClass(_type_param.get_classname());
    if (_type_param.is_basic() === false) {
        _option.attr('style', _type_param.get_option_style());
    }
    
    //接下來是內文的部份
    var _type_name = _type_param.get_type_name();
    _option.html(_type_name);
    
    if (_type_param.is_basic()) {
        var _type_lang_header = Type_menu.prototype._type_lang_header;
        var _lang = new KALS_language_param(
            _type_name,
            _type_lang_header + _type_name
        );
        
        KALS_context.lang.add_listener(_option, _lang);
    }
    
    //額外的參數
    _type_name = _type_param.get_type_name();
    _option.attr('annotation_type', _type_name);
    
    return _option;
    */
};

/* End of file Context_basic_type */
/* Location: ./system/application/views/web_apps/core/Context_basic_type.js */