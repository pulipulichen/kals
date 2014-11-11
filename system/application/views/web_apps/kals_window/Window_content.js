/**
 * Window_content
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/9/9 下午 01:27:09
 * @extends {JSONP_dispatcher}
 */
function Window_content(){
    
    JSONP_dispatcher.call(this);
    
    this._window = null;
    this.submit = null;
    
    // TODO 2010.9.21 這個是幹嘛用的？
    //this._$setup_content = null;
    if ($.isset(this._$load_config)) {
        var _this = this;
        KALS_context.add_listener(function (_context) {
            var _data = _context._data;
            
            //$.test_msg('Window_content load context data', _data);
            
            if (_data !== null
                && typeof(_data[_this._$load_config]) !== 'undefined') {
                _this.set_config(_data[_this._$load_config]);
                _this.set_config_loaded();
            }
        }, true);
    }
}

/**
 * 改為繼承自JSONP_dispatcher
 */
Window_content.prototype = new JSONP_dispatcher();

/**
 * 顯示在Hash的名稱。如果是null，則會顯示KALS_modal._$modal_name
 * @type {null|string}
 */
Window_content.prototype.name = 'Content';

/**
 * 標頭
 * @type {KALS_language_param}
 */
Window_content.prototype.heading = new KALS_language_param(
    '-',
    'window.noheading'
);

Window_content.prototype.nav_heading = new KALS_language_param(
    'Option',
    'window.noheading'
);

/**
 * 寬度
 * @type {string|number} = 'auto': 如果是數字，則單位預設為px
 */
Window_content.prototype.width = null;

/**
 * 高度
 * @type {string|number} = 'auto': 如果是數字，則單位預設為px
 */
Window_content.prototype.height = null;

/**
 * 溢版設定
 * @deprecated 2010.9.28 後來KALS_window統一overflow設定，不允許content來修改，故此設定廢除
 * @type {string} = 'auto': 請參考CSS的overflow設定
 */
//Window_content.prototype.overflow = null;

// --------

/**
 * 開啟window
 * @param {Function} _callback
 * @returns {Window_content}
 */
Window_content.prototype.open = function (_callback) {
    return this.open_window(_callback);
};

Window_content.prototype.close = function (_callback) {
    KALS_window.close(_callback);
};

/**
 * KALS_window的保存位置
 * @type {KALS_window}
 */
Window_content.prototype._window = null;

/**
 * Window_content_submit的保存位置
 * @type {Window_content_submit}
 */
Window_content.prototype.submit = null;

/**
 * 多重Window_content_submit的保存位置
 * @type {JSON<Window_content_submit>}
 * @author Pulipuli Chen 20141111
 */
Window_content.prototype.submit_list = null;

// --------

/**
 * 建立KALS_window中content處的UI。請覆寫此方法。
 */
/*
Window_content.prototype._$create_ui = function () {
    return null;
};
*/

/**
 * 設定KALS_window的內容，預設是在設置完成之後直接完成loading。請覆寫此方法。
 * @param {function} _callback
 */
Window_content.prototype.setup_content = function (_callback) {
    
    //2010.9.9 觀察loading狀態測試用
    //return;
    
    var _this = this;
    KALS_window.loading_complete(function () {
        // 調整內部的物件
        _this.adjust_note();
        
        $.trigger_callback(_callback);
    });
    return this;
};



/**
 * 調整視窗內部的note大小
 * @returns {KALS_window.prototype}
 */
Window_content.prototype.adjust_note = function () {
    
    var _ui = this.get_ui();
    
    //$.test_msg("有嗎？", _ui.find(".note-container").length);
    var _this = this;
    _ui.find(".note-container").each(function (_index, _value) {
        var _node_container = $(_value);
        //_node_container.css("border", "1px solid red");
        List_note_component.prototype.adjust_note.call(_this, _node_container);
    });
    
    return this;
};

/**
 * 設定KALS_window開啟時的動作。請覆寫此方法。
 */
Window_content.prototype.onopen = null;

/**
 * 設定KALS_window關閉時的動作。請覆寫此方法。
 */
Window_content.prototype.onclose = null;

/**
 * 設定KALS_window移動時的動作。請覆寫此方法。
 */
Window_content.prototype.onviewportmove = null;

/**
 * 設定遞交按鈕
 * 
 * @author Pulipuli Chen 20141111
 * 增加可以輸入多個submit的功能
 * 
 * @param {Window_content_submit|JSON<Window_content_submit>} _submit
 *  或是 _submit = [_submit1, _submit2]
 */
Window_content.prototype._setup_submit = function (_submit) {
    
//    if ($.is_array(_submit)) {
//        var _submit_json = {};
//        for (var _i in _submit) {
//            var _name = _submit[_i].name;
//
//            if (typeof(_submit_json[_name]) !== "undefined") {
//                $.throw_msg("Window_content._setup_submit() 重複的名稱", _name );
//            }
//
//            _submit_json[_name] = _submit[_i];
//        }
//        
//        //_submit = _submit_json;
//    }
//    
//    this.submit = _submit;
//    this.submit._content = this;
//    
//    
//    if (typeof(this.submit._content) !== "undefined" 
//            && this.submit._content === null) {
//        this.submit._content = this;
//        //$.test_msg("Window_content._setup_submit() 設定submit._content 單一object");
//    }
//    else if ($.is_object(this.submit)) {
//        for (var _i in this.submit) {
//            this.submit[_i]._content = this;
//        }
//    }
//    else {
//        $.throw_msg("Window_content._setup_submit() 設定this.submit._content失敗");
//    }
    
    var _submit_list = {};
    if ($.is_array(_submit)) {
        for (var _i in _submit) {
            var _name = _submit[_i].name;

            if (typeof(_submit_list[_name]) !== "undefined") {
                $.throw_msg("Window_content._setup_submit() 重複的名稱", _name );
            }
            _submit_list[_name] = _submit[_i];
        }
    }
    else if ($.is_string(_submit.name)) {
        _submit_list[_submit.name] = _submit;
    }
    else {
        _submit_list = _submit;
    }
    
    var _first_submit;
    
    for (var _i in _submit_list) {
        _first_submit = _submit_list[_i];
        break;
    }
    
    this.submit = _first_submit;
    this.submit._content = this;
    
    this.submit_list = _submit_list;
    
    return this;
};

/**
 * 變更目前的submit按鈕
 * 
 * @author Pulipuli Chen 20141111
 * 
 * @param {String} _name
 */
Window_content.prototype.change_submit = function (_name) {
    
    if (typeof(this.submit_list[_name]) !== "undefined") {
        var _current_submit = this.submit.get_ui();
        var _target_submit = this.submit_list[_name].get_ui();
        
        _current_submit.hide();
        _current_submit.before(_target_submit);
        _target_submit.show();
        
        this.submit = this.submit_list[_name];
    }
    
    return this;
};

/**
 * 取得目前的submit
 * 
 * @author Pulipuli Chen 20141111
 * @return {Window_content_submit} 
 */
Window_content.prototype.get_submit = function () {
    return this.submit;
};

/**
 * 取得所有的submit，以陣列形態回傳
 * 
 * @author Pulipuli Chen 20141111
 * @return {Array<Window_content_submit>} 
 */
Window_content.prototype.get_submit_array = function () {
    var _array = [];
    for (var _i in this.submit_list) {
        _array.push(this.submit_list[_i]);
    }
    
    return _array;
};

// --------
// 表單設定相關
// --------

/**
 * 取得指定_name的值
 * @param {String} _name
 */
Window_content.prototype.get_input_value = function (_name) {
    
    if ($.is_null(_name)) {
        return _name;
    }
    
    var _ui = this.get_ui('[name="'+_name+'"]');
    
    if (_ui.length === 1) {
        return _ui.attr('value');
    }
    else {
        var _type = _ui.eq(0).attr('type').toLowerCase();
        var _checked = _ui.filter(':checked');
        if (_type === 'radio') {
            if (_checked.length === 1) {
                return _checked.val();
            }
            else {
                return null;
            }
        }
        else if (_type === 'checkbox') {
            var _result = [];
            for (var _i = 0; _i < _checked.length; _i++) {
                _result.push(_checked.eq(_i).val());
            }
            return _result;
        }
    }
};

/**
 * 設定name對應的值
 * @param {Object} _json 格式是 {name1: value1, name2: value2}
 */
Window_content.prototype.set_input_value = function (_json) {

    if (typeof(_json) !== "object") {
        return this;
    }
	
    var _ui = this.get_ui();
    for (var _name in _json) {
        var _value = _json[_name];

        var _input = _ui.find("[name='"+_name+"']");

        if (_input.length === 1) {
            _input.attr("value", _value);
        }
        else if (_input.length > 1) {
            _input.attr("checked", false);
            _input.filter("[value='"+_value+"']").attr("checked", true);
        }
    }

    return this;
};


/**
 * 取得指定的input
 * @param {String} _name
 * @type {jQuery}
 */
Window_content.prototype.get_input = function (_name) {
    if ($.is_null(_name)) {
        return _name;
    }
    
    var _ui = this.get_ui('[name="'+_name+'"]');
    return _ui;
};

/**
 * 取得第一個input
 * @param {String} _name
 * @type {jQuery}
 */
Window_content.prototype.get_first_input = function (_name) {
    return this.get_input(_name).eq(0);
};

// --------
// 選項設定
// --------

/**
 * 向Context訂閱設定 
 */
Window_content.prototype._$load_config = null;
Window_content.prototype._config_loaded = false;
Window_content.prototype._config_onload = null;

/**
 * 保存可用選項的資料
 */
Window_content.prototype._config = {};

Window_content.prototype.set_config = function (_config) {
    this._config = _config;
    return this;
};

Window_content.prototype.get_config = function (_index) {
    
    if ($.isset(_index) &&
	typeof(this._config[_index]) !== 'undefined') {
        return this._config[_index];
    }
    else {
        return this._config;
    }
};

Window_content.prototype.set_config_loaded = function () {
    if (this._config_loaded === false) {
        this._config_loaded = true;
        $.trigger_callback(this._config_onload);
        this._config_onload = null;
    }
    return this;
};

Window_content.prototype.set_config_onload = function (_callback) {
    
    this._config_onload = _callback;
    
    //$.test_msg('Window_content.set_config_onload()', this._config_loaded);
    
    if (this._config_loaded === true) {
        $.trigger_callback(this._config_onload);
        this._config_onload = null;
    }
    return this;
};

// --------
// 設置錯誤訊息
// --------

Window_content.prototype.set_error = function (_message) {
    
    var _ui = this.get_ui();
    
    var _error_row = _ui.find('.' + KALS_window.ui.error_row_classname + ':first');
    
    if (_error_row.length === 1) {
        _error_row.remove();
    }
    
    if ($.isset(_message)) {
        _error_row = KALS_window.ui.error_row(_message)
            .prependTo(_ui);
    }
    
    return this;
};

/**
 * 獨立視窗
 * 
 * 如果是false，則會依附在KALS_window底下
 * 如果是true，則會直接open
 */
Window_content.prototype._$absolute = false;

Window_content.prototype.is_absolute = function () {
    return this._$absolute;
};

/**
 * 獨立開啟視窗
 * @author Pulipuli Chen 20131113
 */
Window_content.prototype.open_window = function (_callback) {
    var _content = this;

    if (_content.is_absolute() === false) {
    KALS_window.setup_window(_content, function () {
            $.trigger_callback(_callback);
        });
    }
    else {
        _content.open(function() {
            $.trigger_callback(_callback);
        });
    }
};

/**
 * 開啟視窗後預設要聚焦的可輸入元件
 * @type {String} jQuery Selector
 */
Window_content.prototype.default_focus_input = '.dialog-content:first input:first';

/**
 * 開啟視窗後預設要聚焦的遞交元件
 * @type {String} jQuery Selector
 */
Window_content.prototype.default_focus_submit = '.dialog-options button.window-content-submit:first';


/* End of file Window_content */
/* Location: ./system/application/views/web_apps/Window_content.js */