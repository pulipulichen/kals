/**
 * KALS_controller_window
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pulipuli Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2013/11/21 下午 01:27:09
 * @extends {KALS_controller}
 */
function KALS_controller_window(){
    
    KALS_controller.call(this);
    
}

/**
 * 改為繼承自Window_content
 */
KALS_controller_window.prototype = new KALS_controller();

/**
 * 開啟
 * @param {function} _callback
 * @returns {KALS_controller_window}
 */
/*
KALS_controller_window.prototype.open = function (_callback) {
    $.test_msg('window, open');
    var _this = this;
    return KALS_controller.prototype.open.call(this, function () {
        _this.open_window(_callback);
    });
    
};
*/
/**
 * 使用Window_content的close功能
 * @param {Object} _callback
 */
/*
KALS_controller_window.prototype.close = function (_callback) {
    //$.test_msg('window, open');
    return KALS_controller.prototype.close.call(this, function () {
        KALS_window.close(_callback);
    });
};
*/

/**
 * 設定hash url
 * ※請覆寫
 * @type {String}
 */
KALS_controller_window.prototype._$hash_url = null;

/**
 * 設定hash url
 */
KALS_controller_window.prototype._setup_hash_url = function () {
	// @TODO
};

/**
 * 獨立視窗
 * 
 * 如果是false，則會依附在KALS_window底下
 * 如果是true，則會直接open
 */
KALS_controller_window.prototype._$absolute = false;
KALS_controller_window.prototype.is_absolute = function () {
	return this._$absolute;
};


/**
 * 顯示在Hash的名稱。如果是null，則會顯示KALS_modal._$modal_name
 * @type {null|string}
 */
KALS_controller_window.prototype.name = 'Content';

/**
 * 標頭
 * @type {KALS_language_param}
 */
KALS_controller_window.prototype.heading = new KALS_language_param(
    '-',
    'window.noheading'
);

KALS_controller_window.prototype.nav_heading = new KALS_language_param(
    'Option',
    'window.noheading'
);

/**
 * 寬度
 * @type {string|number} = 'auto': 如果是數字，則單位預設為px
 */
KALS_controller_window.prototype.width = null;

/**
 * 高度
 * @type {string|number} = 'auto': 如果是數字，則單位預設為px
 */
KALS_controller_window.prototype.height = null;

/**
 * 開啟視窗
 * @param {function} _callback
 * @returns {KALS_controller_window}
 */
KALS_controller_window.prototype.open = function (_callback) {
    var _this = this;
    this.debug('win open', _callback);
    return KALS_controller.prototype.open.call(this, function () {
        _this.open_window(_callback);
    });
};

/**
 * 關閉視窗
 * @param {function} _callback
 * @returns {KALS_controller_window}
 */
KALS_controller_window.prototype.close = function (_callback) {
    return KALS_controller.prototype.close.call(this, function () {
        KALS_window.close(_callback);
    });
};

/**
 * KALS_window的保存位置
 * @type {KALS_window}
 */
KALS_controller_window.prototype._window = null;

/**
 * Window_content_submit的保存位置
 * @type {Window_content_submit}
 */
KALS_controller_window.prototype.submit = null;


/**
 * 設定KALS_window的內容，預設是在設置完成之後直接完成loading。請覆寫此方法。
 * @param {function} _callback
 */
KALS_controller_window.prototype.setup_content = function (_callback) {
    
    //2010.9.9 觀察loading狀態測試用
    //return;
    
    KALS_window.loading_complete(_callback);
    return this;
};

/**
 * 設定KALS_window開啟時的動作。請覆寫此方法。
 */
KALS_controller_window.prototype.onopen = null;

/**
 * 設定KALS_window關閉時的動作。請覆寫此方法。
 */
KALS_controller_window.prototype.onclose = null;

/**
 * 設定KALS_window移動時的動作。請覆寫此方法。
 */
KALS_controller_window.prototype.onviewportmove = null;

/**
 * 設定遞交按鈕
 * @param {Window_content_submit} _submit
 */
KALS_controller_window.prototype._setup_submit = function (_submit) {
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
KALS_controller_window.prototype.get_input_value = function (_name) {
    
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
KALS_controller_window.prototype.set_input_value = function (_json) {
	
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
 * 獨立開啟視窗
 * @author Pulipuli Chen 20131113
 */
KALS_controller_window.prototype.open_window = function (_callback) {
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
 * 取得指定的input
 * @param {String} _name
 * @type {jQuery}
 */
KALS_controller_window.prototype.get_input = function (_name) {
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
KALS_controller_window.prototype.get_first_input = function (_name) {
	return this.get_input(_name).eq(0);
};

// --------
// 選項設定
// --------

/**
 * 向Context訂閱設定 
 */
KALS_controller_window.prototype._$load_config = null;
KALS_controller_window.prototype._config_loaded = false;
KALS_controller_window.prototype._config_onload = null;

/**
 * 保存可用選項的資料
 */
KALS_controller_window.prototype._config = {};

KALS_controller_window.prototype.set_config = function (_config) {
    this._config = _config;
    return this;
};

KALS_controller_window.prototype.get_config = function (_index) {
    
    if ($.isset(_index) &&
	typeof(this._config[_index]) != 'undefined') {
		return this._config[_index];
	}
	else {
		return this._config;
	}
};

KALS_controller_window.prototype.set_config_loaded = function () {
    if (this._config_loaded === false) {
        this._config_loaded = true;
        $.trigger_callback(this._config_onload);
        this._config_onload = null;
    }
    return this;
};

KALS_controller_window.prototype.set_config_onload = function (_callback) {
    
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

KALS_controller_window.prototype.set_error = function (_message) {
    
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
 * 開啟視窗後預設要聚焦的可輸入元件
 * @type {String} jQuery Selector
 */
KALS_controller_window.prototype.default_focus_input = '.dialog-content:first input:first';

/**
 * 開啟視窗後預設要聚焦的遞交元件
 * @type {String} jQuery Selector
 */
KALS_controller_window.prototype.default_focus_submit = '.dialog-options button.window-content-submit:first';

/* End of file KALS_controller_window */
/* Location: ./system/application/views/web_apps/kals_framework/KALS_controller_window.js */