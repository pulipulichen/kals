/**
 * KALS_util
 *
 * KALS程式使用到的工具箱，KALS_util
 *
 * @package    KALS
 * @category   JavaScript Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/7/20 下午 10:17:42
 */
KALS_util = {};

/**
 *  改寫jQuery的$.getJSON方法
 *
 * @param _config = {
 *   url: String (without base_url),
 *   data: JSON,
 *   callback: function (_data),
 *   exception_handle: function (_data), //可省略，省略則自動使用KALS_util.show_exception來處理
 *   retry: 3, //可省略，預設嘗試次數
 *   retry_wait: 3000 //預設嘗試等待時間，單位是毫秒
 * };
 */
KALS_util.ajax_get = function (_config) {
    var _url = $.get_parameter(_config, 'url');
    var _data = $.get_parameter(_config, 'data');
    var _callback = $.get_parameter(_config, 'callback', function() {});
    var _exception_handle = $.get_parameter(_config, 'exception_handle');
    
    var _retry = $.get_parameter(_config, 'retry', 3);
    var _retry_wait = $.get_parameter(_config, 'retry_wait', 60 * 1000);
    var _retry_counter = 0;
    
    _url = $.appends_with(_url, '/');
    
    if (_data !== null) {
        if ($.is_object(_data)) {
            _data = $.json_encode(_data);
            _data = encodeURIComponent(_data);
            _data = escape(_data);
        }
        else if ($.is_string(_data)) {
            _data = encodeURIComponent(_data);
            _data = escape(_data);
        }
		
        _url = _url + _data + '/callback=?';
    }
    else {
        _url = _url + 'callback=?';
    }
    
	if (_url.indexOf('http') === 0 
                || _url.indexOf('%22') === 0) {
            $.test_msg('ajax get exception', 'KALS_util.ajax_get try to load exception url: ' + _url);
            //throw ;
            return this;
	}
	
    if (typeof(KALS_context) !== 'undefined') {
        //while ($.starts_with(_url, '/'))
        //    _url = _url.substring(1, _url.length);
        //_url = KALS_context.get_base_url() + _url;
        
        //$.test_msg('KALS_util.ajax_get()'
        //    , [_url, KALS_context.get_base_url(), KALS_context.base_url, KALS_context.get_base_url(_url)]);
        
        _url = KALS_context.get_base_url(_url);
    }
    var _this = this;
    
    //檢查網址是否超過最大長度
    if (_url.length > 2000) {
        if ($.is_function(_exception_handle)) {
            _exception_handle();
        }
        else {
			
            $.test_msg('KALS_util.ajax_get()'+'超過最大長度囉', _url.length);
			
            this.show_exception({
                heading: KALS_context.lang.line(new KALS_language_param(
                    'Data error.',
                    'exception.url_too_large.heading'
                )),
                message: KALS_context.lang.line(new KALS_language_param(
                    'Request-URL too large.',
                    'exception.url_too_large.message'
                )),
                request_uri: _url
            });
        }
        return this;
    }
    
    if (KALS_CONFIG.debug.ajax_get_message) {
        $.test_msg('ajax_get', _url);
    }
    
    var _retry_timer;
    //var _retry_exception = function () {
    //    $.test_msg('retry exception', [_url, KALS_context.get_base_url()]);
    //    var _exception = new KALS_exception('exception.retry_exception');
    //    _this.show_exception(_exception, _url);
    //};
    //var _retry_exception = this.re
    
    var _get_json = function() {
        
        //if (_retry_counter == 999)
        //    return;
        
        $.getJSON(_url, function (_data) {

                if (KALS_context !== undefined
                    && KALS_context.completed === true) {
		    if (KALS_CONFIG.debug.ajax_get_message) {			
                        $.test_msg('ajax_get from ' + _url + ' \n return data', _data);
                    }
                }
			
			
            if (typeof(_retry_timer) === 'undefined' 
                    || _retry_timer === null) {
                return this;
            }
            else if ($.isset(_retry_timer)) {
                clearInterval(_retry_timer);
                _retry_timer = null;
                delete _retry_timer;
            }
            
            if (typeof(_data.exception) !== 'undefined') {            
                if ($.is_function(_exception_handle)) {
                    _exception_handle(_data.exception);
                }
                else {
                    _this.show_exception(_data.exception);
                }
            }
            else {
                _callback(_data);
            }
        }); 
    };
    
    try {
        _get_json();
        
        
        if (_retry !== null && _retry > 0) {
            _retry_timer = setInterval(function () {
                
                if (_retry_counter === _retry || _retry_counter > _retry
                    || typeof(_retry_timer) === 'undefined') {
                    if (typeof(_retry_timer) !== 'undefined') {
                        clearInterval(_retry_timer);
                        _retry_timer = null;
                        delete _retry_timer;
                    }
                    _this._retry_exception(_url);
                    return this;
                }
                
                _get_json();
                
                _retry_counter++;
                
            }, _retry_wait);    
        }
    }
    catch (e) {
        if ($.isset(_retry_timer)) {
            clearInterval(_retry_timer);
            _retry_timer = null;
            delete _retry_timer;
        }
        
        if ($.is_function(_exception_handle)) {
            _exception_handle(e);
        }
        else {
            _this.show_exception(e);
        }
    }
    
    return this;
};

/**
 *  改寫jQuery的$.getJSON方法，變成可以傳遞大量資料的POST寫法
 *
 * @param _config = {
 *   url: String (without base_url),
 *   data: JSON,
 *   callback: function (_data),
 *   exception_handle: function (_data) //可省略，省略則自動使用KALS_util.show_exception來處理
 * };
 */	
KALS_util.ajax_post = function (_config) {
    //如果要檢查資料，請將_debug設為true
    var _debug = KALS_CONFIG.debug.ajax_post;
    //_debug = true;
    
    var _url = $.get_parameter(_config, 'url');
    var _data = $.get_parameter(_config, 'data');
    var _callback = $.get_parameter(_config, 'callback', function() {});
    var _exception_handle = $.get_parameter(_config, 'exception_handle');
    
    _action = $.appends_with(_url, '/');
    
    if (typeof(KALS_context) !== 'undefined') {   
        _action = KALS_context.get_base_url(_action);
    }
    //$.test_msg('ajax_post action: ' + '<a href="'+_action+'" target="_blank">' + _action + '</a>', _data);
    
    //取得現在時間作為id
    var _id = $.create_id();
    var _name = 'name_' + _id;
    
    var _layer = $('<div></div>')
        .css('position', 'absolute')
        .css('top', '-1000px')
        .appendTo($('body'));
    
    //建立一個暫存的iframe
    var _iframe = $('<iframe></iframe')
        .css('width', '0')
        .css('height', '0')
        .id(_id)
        .attr('name', _name)
        .appendTo(_layer);
    
    if (_debug === true) {
        _iframe.css('width', '640px')
            .css('height', '480px');
        _layer.css('top', '50px')
            .css('position', 'fixed')
            .css('background-color', 'white');
    }

    //建立一個FORM
    //然後讓form target到該iframe
    var _form = $('<form></form>')
        .attr('target', _name)
        .attr('method', 'post')
        .attr('action', _action)
        .attr('enctype', 'multipart/form-data')
        .appendTo(_layer);
        
    //擺放檔案input並指定成_file_path，
    //建立一個json的input
    if ($.isset(_data)) {
        _data = $.json_encode(_data);
        //_data = encodeURIComponent(_data);
        //_data = escape(_data);
        
        var _input = $('<input type="text" name="json" />')
            .attr('value', _data)
            .appendTo(_form);
    }
    
    
    var _this = this;
    var _post_retry_count = 0;
    var _post_retry_max = 3;
    
    var _iframe_load_callback = function () {
        //以同樣路徑，用ajax_get去取得資料，並回傳給callback
        _this.ajax_get({
            url: _url, 
            callback: function (_data) {
                
                // 如果回傳了false，表示要重新讀取一次
                if (_data === false) {
                    _post_retry_count++;
                    if (_post_retry_count > _post_retry_max) {
                        _this._retry_exception(_url);
                    }
                    else {
                        _form.submit();
                    }
                    return;
                }

                if (_debug === false) {
                    _layer.remove();
                }

                if ($.is_function(_callback)) {
                    _callback(_data);
                }
            },
            exception_handle: _exception_handle 
        });
    };
    
    _iframe.load(function () {
        setTimeout(function () {
            _iframe_load_callback();
        }, 500);
    });    //_iframe.load(function () {
    
    //準備完畢，遞交
    _form.submit();
    
    return this;
};

KALS_util._retry_exception = function (_url) {
    $.test_msg('retry exception', [_url, KALS_context.get_base_url()]);
    var _exception = new KALS_exception('exception.retry_exception');
    this.show_exception(_exception, _url);
};

/**
 * 跨網域檔案上傳的方法
 * 
 * @param {Object} _config = {
 *   url: String (without base_url),
 *   userfile: jQuery //<input type="file">的表單
 *   userdata: JSON,
 *   callback: function (_data),
 *   exception_handle: function (_data) //可省略，省略則自動使用KALS_util.show_exception來處理
 * };
 */
KALS_util.ajax_upload = function (_config) {
    
    var _url = $.get_parameter(_config, 'url');
    var _userfile = $.get_parameter(_config, 'userfile');
    var _userdata = $.get_parameter(_config, 'userdata');
    var _callback = $.get_parameter(_config, 'callback');
    var _exception_handle = $.get_parameter(_config, 'exception_handle');
    
    _url = $.appends_with(_url, '/');
    
    var _action = _url;
    if (typeof(KALS_context) != 'undefined') {
        _action = KALS_context.get_base_url(_action);
    }
    
    //取得現在時間作為id
    var _id = $.create_id();
    var _name = 'name_' + _id;
    
    var _layer = $('<div></div>')
        .css('position', 'absolute')
        .css('top', '-1000px')
        .appendTo($('body'));
    
    //建立一個暫存的iframe
    var _iframe = $('<iframe></iframe')
        .css('width', '0')
        .css('height', '0')
        .id(_id)
        .attr('name', _name)
        .appendTo(_layer);
    
    //建立一個FORM
    //然後讓form target到該iframe
    var _form = $('<form></form>')
        .attr('target', _name)
        .attr('method', 'post')
        .attr('action', _action)
        .attr('enctype', 'multipart/form-data')
        .appendTo(_layer);
        
    //擺放檔案input並指定成_file_path，
    //建立一個json的input
    var _file = $(_userfile).clone()
        .attr('name', 'userfile')
        .appendTo(_form);
        
    var _check = $('<input name="fileupload" value="true" type="hidden" />')
        .appendTo(_form);
    
    if ($.isset(_userdata)) {
        _userdata = $.json_encode(_userdata);
        var _input = $('<input type="text" name="userdata" />')
            .attr('value', _userdata)
            .appendTo(_form);
    }
    
    var _this = this;
    //當iframe讀取完畢時，等待三秒鐘
    _iframe.load(function () {
        
        setTimeout(function () {
    
            //以同樣路徑，用ajax_get去取得資料，並回傳給callback
            _this.ajax_get({
                url: _url, 
                callback: function (_data) {
                    
                    _layer.remove();
                    
                    var _exception = {
                        'heading': 'Upload File Failed',
                        'request_uri': _url
                    };
                    
                    if (typeof(_data) == 'undefined'
                        || typeof(_data.completed) == 'undefined') {
					    $.test_msg("show_exception 1");
                        _this.show_exception(_exception, _url);
                    }
                    else if (_data.completed === false) {
                        if (_data.data !== false) {
							_exception.message = _data.data;
						}
						$.test_msg("show_exception 2");
                        _this.show_exception(_exception, _url);
                    }
                    
                    if ($.is_function(_callback)) {
						_callback(_data);
					}
                },
                exception_handle: _exception_handle 
            });
            
        }, 3000);    //setTimeout(function () {
        
    });    //_iframe.load(function () {
    
    //準備完畢，遞交
    _form.submit();
};

/**
 * 顯示錯誤參數
 * @param {KALS_exception} _exception 這個是來自於伺服器回傳_data中的exception屬性。
 * 在ajax_get()的時候發生錯誤時，會自動將_data.exception送到此方法。
 * 這是處理例外的預設方法，您可以在ajax_get()當中設定exception_handle
 */
KALS_util.show_exception = function (_exception, _uri) {
    //var _heading = $.get_parameter(_exception, 'heading');
    //var _message = $.get_parameter(_exception, 'message');
    //var _request_uri = $.get_parameter(_exception, 'request_uri');
    
    if ($.is_class(_exception, 'KALS_exception') === false) {
        _exception = new KALS_exception(_exception);
    }
        
    var _heading = _exception.heading;
    var _message = _exception.message;
    var _request_uri = _exception.request_uri;
    if (_request_uri === null || _request_uri === undefined) {
        _request_uri = _uri;
    }
    if (_request_uri !== undefined
            && _request_uri.substr(0,4) !== "http" 
            && _request_uri.substr(0,1) !== "/") {
        _request_uri = KALS_context.get_base_url(_request_uri);
    }
    
    $.test_msg('KALS_util.show_exception()', [_heading, _message, '<a href="'+_request_uri+'" target="_blank">' + _request_uri + '</a>']);
    
    var _exception_heading = new KALS_language_param('Sorry! System has got some trouble!', 'exception.alert.heading');
    var _exception_content = $('<dl></dl>').addClass('exception');
    
    //先加入關閉視窗提示吧
    var _dt = $('<dt>Hint: </dt>')
        .appendTo(_exception_content);
    KALS_context.lang.add_listener(_dt, new KALS_language_param('Hint: ', 'exception.hint.heading'));
    
    var _dd = $('<dd></dd>')
            .appendTo(_exception_content);
    KALS_context.lang.add_listener(_dd, new KALS_language_param('You can press "ESC" key to close message.', 'exception.hint.message'));
        
    
    if ($.isset(_heading)) {
        _dt = $('<dt>HEADING: </dt>')    //.html(_lang.create_listener('exception.message_heading.heading'))
            .appendTo(_exception_content);
        KALS_context.lang.add_listener(_dt, new KALS_language_param('HEADING: ', 'exception.message_heading.heading'));
        
        _dd = $('<dd></dd>')
            .appendTo(_exception_content)
            .html(_heading);
    }
    
    if ($.isset(_message)) {
        _dt = $('<dt>MESSAGE: </dt>')    //.html(_lang.create_listener('exception.message_heading.message'))
            .appendTo(_exception_content);
        KALS_context.lang.add_listener(_dt, new KALS_language_param('MESSAGE: ', 'exception.message_heading.message'));
        _dd = $('<dd></dd>')
            .html(_message)
            .appendTo(_exception_content);
    }
    
    if ($.isset(_request_uri)) {
        _dt = $('<dt>REQUEST URI: </dt>')    //.html(_lang.create_listener('exception.message_heading.request_uri'))
            .appendTo(_exception_content);
        KALS_context.lang.add_listener(_dt, new KALS_language_param('REQUEST URI: ', 'exception.message_heading.request_uri'));
        _dd = $('<dd></dd>')
            .appendTo(_exception_content)
            .html('<a href="' + _request_uri + '" target="_blank">' + _request_uri + '</a>');
    }
    
    
    var _this = this;
    setTimeout(function () {
        var _alert = _this.alert(_exception_heading, _exception_content);
        _alert.get_ui().addClass('exception');    
    }, 1000);
	
	throw _message;
    //$.test_msg('KALS_util.show_exception() end');
    
    //return _alert;
};

/**
 * @type {Dialog_modal}
 * @memberOf {KALS_util}
 * @property
 */
KALS_util._alert_modal = null;

/**
 * @type {Dialog_modal}
 * @memberOf {KALS_util}
 * @property
 */
KALS_util._confirm_modal = null;

/**
 * @method [_get_alert_modal]
 * @memberOf {KALS_util}
 * @type {Dialog_modal}
 */
KALS_util._get_alert_modal = function () {
    if ($.is_null(this._alert_modal)) {
        var _modal = new Dialog_modal();
        //var _close_option = _modal.create_close_option();
        var _close_option = new Dialog_close_option();
        _modal.set_options(_close_option);
        _modal.get_ui().addClass('alert');
        
        this._alert_modal = _modal;
    }
    
    //this._alert_modal.set_modal_name('Alert_' + $.create_id());
    var _id = 'Alert_' + $.create_id();
    this._alert_modal.set_modal_name(_id);
    this._alert_modal.get_ui().attr('id', _id);
    
    return this._alert_modal;
};

/**
 * KALS專案使用的Alter用法
 * @param {KALS_language_param|string} _heading
 * @param {KALS_language_param|string|jQuery} _content
 * @param {function} _callback
 * @memberOf {KALS_util}
 * @method [alert]
 */
KALS_util.alert = function (_heading, _content, _callback) {
    var _modal = this._get_alert_modal();
    _modal.set_heading(_heading);
    _modal.set_content(_content);
    
    if ($.is_function(_callback)) {
		_modal.set_onclose(_callback);
	}
	else {
		_modal.set_onclose(false);
	}
    _modal.open();
    
    return _modal;
};

/**
 * @method [_get_alert_modal]
 * @memberOf {KALS_util}
 * @type {Dialog_modal}
 */
KALS_util._get_confirm_modal = function () {
    if ($.is_null(this._confirm_modal)) {
        var _modal = new Dialog_modal();
        /**
         * 用來擺放回呼函數使用
         * @type {function}
         */
        _modal.confirm_callback = null;
        
        var _yes_lang = new KALS_language_param('YES', 'dialog.option.yes');
        var _no_lang = new KALS_language_param('NO', 'dialog.option.no');
        
        var _yes_option = new Dialog_close_option(_yes_lang, function () {
            if (typeof(_modal.confirm_callback) == 'function') {
				_modal.confirm_callback(true);
			}
        });
        
        var _no_option = new Dialog_close_option(_no_lang, function () {
            if (typeof(_modal.confirm_callback) == 'function') {
				_modal.confirm_callback(true);
			}
        });
        
        _modal.set_options([_yes_option, _no_option]);
        _modal.get_ui().addClass('confirm');
        
        this._confirm_modal = _modal;
    }
    
    var _id = 'Confirm_' + $.create_id();
    this._confirm_modal.set_modal_name(_id);
    this._confirm_modal.get_ui().attr('id', _id);
    
    return this._confirm_modal;
};

/**
 * KALS專案使用的confirm用法
 * @param {KALS_language_param|string} _heading
 * @param {KALS_language_param|string|jQuery} _content
 * @param {function} _callback
 * @memberOf {KALS_util}
 * @method [confirm]
 */
KALS_util.confirm = function (_heading, _content, _callback) {   
    var _modal = this._get_confirm_modal();
    _modal.set_heading(_heading);
    _modal.set_content(_content);
    
    if ($.is_function(_callback)) {
		_modal.confirm_callback = _callback;
	}
	else {
		_modal.confirm_callback = null;
	}
        
    _modal.open();
    
    return _modal;
};

/**
 * 通知功能的Modal
 * @type {Notify_modal}
 * @memberOf {KALS_util}
 * @property
 */
KALS_util._notify_modal = null;

KALS_util._get_notify_modal = function () {
    if (this._notify_modal === null) {
        this._notify_modal = new Notify_modal();
        
        //$.test_msg('KALS_util._get_notify_modal() 有建立Modal嗎？', this._notify_modal);
    }
    return this._notify_modal;
};

/**
 * KALS專案使用的通知功能
 * @param {KALS_language_param|String} _message
 */
KALS_util.notify = function (_message, _wait) {
    var _notify_modal = this._get_notify_modal();
    
	if (_wait === undefined) {
		_wait = 10000;
	}
	
	// @20130610 Pudding Chen
	// 修正不知道為什麼不會自動關閉的問題
	//_notify_modal.set_message(_message, 10000);
	_notify_modal.set_message(_message, _wait);
    
    //$.test_msg('KALS_util.notify()', _message);
    
    return _notify_modal;
};

/**
 * 選單的對話視窗
 * 
 * 選項可省略_content:
 * @param {Object} _config = {
 *     heading: 'KALS_language_param|String|jQuery',
 *     content: 'KALS_language_param|String|jQuery',
 *     options: 'Array|Dialog_close_option',
 *     onclose: 'function',
 *     heading_close: true
 * };
 * @type {Dialog_modal}
 */
KALS_util.select_menu = function (_config) {
    
    var _heading = $.get_parameter(_config, 'heading');
    var _content = $.get_parameter(_config, 'content');
    var _options = $.get_parameter(_config, 'options');
    var _onclose = $.get_parameter(_config, 'onclose');
    var _heading_close = $.get_parameter(_config, 'heading_close', true);
    
    var _menu = new Dialog_modal();
    _menu.set_heading(_heading);
    _menu.set_content(_content);
    _menu.set_options(_options, false);
    _menu.set_onclose(_onclose);
    
    if (_heading_close === true) {
        var _close_option = new Dialog_close_option();
        _menu.set_forward_option(_close_option);    
    }
    
    _menu.add_class('select-menu');
    _menu.open();
    
    return _menu;
};

/**
 * 顯示說明視窗
 * @param {String} _url 未含base_url，未含help的網址
 * @type {Object} Window物件
 * @memberOf {KALS_util}
 */
KALS_util.help = function (_url) {
    
    if ($.is_null(_url)) {
		_url = '';
	}
    
    if (_url.substr(0, 1) == '/') {
		_url = _url.substr(1, _url.length);
	}
    
    var _base_url = KALS_CONFIG.help_base_url;
    var _needle = 'http';
    var _help_url = KALS_context.get_base_url([KALS_CONFIG.help_base_url, _url]);
    if (_base_url.substr(0, _needle.length) == _needle) {
        if (_base_url.substr(_base_url.length - 1, _base_url.length) != '/') {
			_base_url = _base_url + '/';
		}
        _help_url = _base_url + _url;
    }
    
    var _help_win = window.open(_help_url, '_blank', 'width=480,height=640,scrollbars=1');
    
    return _help_win;
};

/**
 * 改良原本的decodeURIComponent
 * @deprecated 20130222 不採用，請用jQuery.decodeURIComponent()
 * @param  {String} _str 要轉換的字串
 * @return {String}      轉換完成的字串
 */
KALS_util.decodeURIComponent = function (_str) {
    var _result;
    /*
    try {
        _result = decodeURIComponent(_str);
    }
    catch (_e) {
        _str = $.str_replace("%", "%25", _str);
        _result = decodeURIComponent(_str);
    }
    */
    _str = $.str_replace("%", "%25", _str);
    _result = decodeURIComponent(_str);
    return _result;
};

/**
 * 將log傳到伺服器
 * 
 * @author Pulipuli Chen <pulipuli.chen@gmail.com>
 * 20131225 將傳遞資料改成用Post傳遞
 * @param number _action 動作的ID。關於動作的編號，請查看[KALS]/applications/controllers/web_apps/log.php
 * @param JSON _note 任意要儲存的資料
 * @param function _callback 回呼函數 
 */
KALS_util.log = function (_action, _note) {
    
    //_note = null;
    var _data = {
        "action": _action,
        "note": _note
    };

    $.test_msg("KALS_util.log", _data);

    var _config = {
        "url": "log/create",
        "data": _data
    };
    //KALS_util.ajax_get(_config);
    KALS_util.ajax_post(_config);
};

/* End of file KALS_unit */
/* Location: ./libraries/helpers/kals_unit.js */