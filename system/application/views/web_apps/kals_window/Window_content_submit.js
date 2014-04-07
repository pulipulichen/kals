/**
 * Window_content_submit
 * 視窗內容中，遞交表單設定
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/9/9 下午 01:27:17
 * @extends {Dialog_option}
 */
function Window_content_submit(){
    
    Dialog_option.call(this);
    
}

Window_content_submit.prototype = new Dialog_option();

/**
 * 遞交按鈕的語系參數。
 * @type {KALS_language_param}
 */
Window_content_submit.prototype.lang = new KALS_language_param(
    'SUBMIT',
    'window.submit'
);

/**
 * 遞交目的的網址。請省略base_url。
 * @type {string}
 */
Window_content_submit.prototype.url = null;

/**
 * 遞交完成時顯示通知的語系參數。
 * @type {KASL_language_param}
 */
Window_content_submit.prototype.complete_notification = new KALS_language_param(
    'Submit successful!',
    'window.submit.success'
);

Window_content_submit.prototype.failed_notification = new KALS_language_param(
    'Submit failed.',
    'window.submit.failed'
);

/**
 * 將Window_content儲存在內部
 * @type {Window_content}
 */
Window_content_submit.prototype._content = null;

/**
 * 預設的表單
 */
Window_content_submit.prototype._$input_names = null;

/**
 * 從Window_content中蒐集資料，輸出成為JSON。
 * 他會參考this._$input_names取出資料。如果有想要取得的資料，請設定this._$input_names
 * @type {JSON}
 */
Window_content_submit.prototype.get_data = function () {
    var _data = {};
    
    //$.test_msg('Window_content_submit.get_data()', this._$input_names);
    
    if ($.is_null(this._$input_names)) {
		return _data;
	}
	else {
		for (var _i in this._$input_names) {
			var _name = this._$input_names[_i];
			var _value = this._content.get_input_value(_name);
			_data[_name] = _value;
		}
		return _data;
	}
};

/**
 * 從Window_content中蒐集input，輸出成為JSON。
 * 他會參考this._$input_names取出資料。如果有想要取得的資料，請設定this._$input_names
 * @type {JSON}
 */
Window_content_submit.prototype.get_inputs = function () {
    var _inputs = {};
    if ($.is_null(this._$input_names)) {
		return _inputs;
	}
	else {
		for (var _i in this._$input_names) {
			//$.test_msg('Window_content_submit.get_inputs()', this._$input_names);
			
			var _name = this._$input_names[_i];
			var _input = this._content.get_input(_name);
			_inputs[_name] = _input;
		}
		return _inputs;
	}
};

/**
 * 取得指定name的input的元件
 * @param {String} _name
 * @type {jQuery}
 */
Window_content_submit.prototype.get_input = function (_name) {
	return this._content.get_input(_name);
};

/**
 * 取得指定name第一個input的元件
 * @param {String} _name
 * @type {jQuery}
 */
Window_content_submit.prototype.get_first_input = function (_name) {
	return this._content.get_first_input(_name);
};

/**
 * 遞交完成時的處理動作。預設是顯示通知並關閉KALS_window。
 * @type {function}
 * @param {Object} _data 從KALS_util.ajax_get()回傳的資料
 */
Window_content_submit.prototype.complete_handle = function (_data) {
    
    //$.test_msg('Window_content_subumit.complete_handle()');
    
    if (_data === true) {
		KALS_util.notify(this.complete_notification);
	}
	else {
		KALS_util.notify(this.failed_notification);
	}
    
    var _this = this;
    KALS_window.close(function () {
        _this._unlock_submit();
    });
    
    return this;
};
/**
 * 遞交錯誤時的處理動作。如果為null，則預設使用KALS_util.show_exception()。
 * @type {null|function} = function (_data) {}: _data是從伺服器上回傳的資料。
 */
Window_content_submit.prototype.exception_handle = null;

/**
 * 處理遞交動作。
 */
Window_content_submit.prototype.submit = function () {
    
    var _data = this.get_data();
    var _inputs = this.get_inputs();
    
    //$.test_msg('Window_content_submit.submit() _data', _data);
    
    //先經過驗證
    if (this.validate(_inputs, _data) === false) {
        return this;
    }
    
    if (this._lock_submit() === false) {
		return this;
	}
    
    //如果沒有要遞交的資料，則回傳完成訊息
    if (this.url === null || this._content === null) {
        if ($.is_function(this.complete_handle)) {
			this.complete_handle(_inputs, _data);
		}
        return this;
    }
    
    //如果有要遞交的資料，則開始蒐集準備遞交的設定
    var _config = {};
    
    _config.url = this.url;
    _config.data = _data;
    
    var _this = this;
    _config.callback = function (_data) {
        _this.complete_handle(_data);    
    }; 
    //$.test_msg('Window_content_submit.submit()', _config['callback']);
    
    if (this.exception_handle !== null) {
        _config.exception_handle = this.exception_handle;
    }
    
    KALS_window.toggle_loading(true, function () {
        KALS_util.ajax_get(_config);
    });    
    
    return this;
};

Window_content_submit.prototype._lock_submit = function () {
    
    var _ui = this.get_ui();
    
    //$.test_msg(typeof(_ui.attr('disabled')), _ui.attr('disabled'));
    if (typeof(_ui.attr('disabled')) != 'undefined'
        && _ui.attr('disabled') === true) {
        //不可以重複執行compelte_handle()！
        return false;
    }
    _ui.attr('disabled', true);
    
    return true;
    
};

Window_content_submit.prototype._unlock_submit = function () {
    
    var _ui = this.get_ui();
    _ui.removeAttr('disabled');
    
    return true;
};

Window_content_submit.prototype._$create_ui = function () {
    var _this = this;
    this.callback = function () {
        _this.submit();
    };
    
    var _ui = Dialog_option.prototype._$create_ui.call(this);
    _ui.addClass('window-content-submit');
    
    return _ui;
};

/**
 * 取得Window_content的UI
 * @param {String} _selector 選取子
 */
Window_content_submit.prototype._get_content_ui = function (_selector) {
    return this._content.get_ui(_selector);
};

/**
 * 檢查是否允許遞交
 * @param {Object} _inputs 通常是來自於this.get_inputs();
 * @param {Object} _data 通常是來自於this.get_data();
 */
Window_content_submit.prototype.validate = function (_inputs, _data) {
    
    //$.test_msg('Window_content_submit.validate() _data', _data);
    
    return true;
};

Window_content_submit.prototype.set_error = function (_message) {
    this._content.set_error(_message);
    return this;
};

/* End of file Window_content_submit */
/* Location: ./system/application/views/web_apps/Window_content_submit.js */