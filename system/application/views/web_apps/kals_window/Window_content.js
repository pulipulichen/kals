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
 * @extends {KALS_user_interface}
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
            _data = _context._data;
            
            //$.test_msg('Window_content load context data', _data);
            
            if (_data !== null
                && typeof(_data[_this._$load_config]) != 'undefined') {
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
 * KALS_window的保存位置
 * @type {KALS_window}
 */
Window_content.prototype._window = null;

/**
 * Window_content_submit的保存位置
 * @type {Window_content_submit}
 */
Window_content.prototype.submit = null;

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
    
    KALS_window.loading_complete(_callback);
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
 * @param {Window_content_submit} _submit
 */
Window_content.prototype._setup_submit = function (_submit) {
    this.submit = _submit;
    this.submit._content = this;
    return this;
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
    
    if (_ui.length == 1) {
		return _ui.attr('value');
	}
	else {
		var _type = _ui.eq(0).attr('type').toLowerCase();
		var _checked = _ui.filter(':checked');
		if (_type == 'radio') {
			if (_checked.length == 1) {
				return _checked.val();
			}
			else {
				return null;
			}
		}
		else 
			if (_type == 'checkbox') {
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
	
	if (typeof(_json) != "object") {
		return this;
	}
	
	var _ui = this.get_ui();
	for (var _name in _json) {
		var _value = _json[_name];
		
		var _input = _ui.find("[name='"+_name+"']");
		
		if (_input.length == 1) {
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
	typeof(this._config[_index]) != 'undefined') {
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
    
    if (_error_row.length == 1) {
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
Window_content.prototype.open_window = function () {
	var _content = this;
            
	if (_content.is_absolute() === false) {
        KALS_window.setup_window(_content);
	}
	else {
		_content.open();
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