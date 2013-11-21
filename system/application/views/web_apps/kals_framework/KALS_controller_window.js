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
    if (this._enable_controller_flag === false) {
        //this.debug('open', 'controller disabled');
        //return $.trigger_callback(_callback);
        return;
    }
    
    var _this = this;
    //this.debug('win open', _callback);
    return KALS_controller.prototype.open.call(this, function () {
        
        if (_this.is_absolute() === false) {
            _this.open_kals_window(_callback);
        }
        else {
            _this.open_absolute_window(_callback);
        }
    });
};

/**
 * 關閉視窗
 * @param {function} _callback
 * @returns {KALS_controller_window}
 */
KALS_controller_window.prototype.close = function (_callback) {
    if (this._enable_controller_flag === false) {
        //this.debug('close', 'controller disabled');
        //return $.trigger_callback(_callback);
        return;
    }
    return KALS_controller.prototype.close.call(this, function () {
        KALS_window.close(_callback);
    });
};

/**
 * 覆寫KALS_controller的disable_controller，加入視窗關閉功能
 * @param {function} _callback
 * @returns {KALS_controller_window}
 */
KALS_controller_window.prototype.disable_controller = function (_callback) {
    
    if (KALS_window.is_opened()) {
        KALS_window.close(_callback);
    }
        
    return KALS_controller.prototype.disable_controller.call(this);
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
 * @return {KALS_controller_window}
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
 * @return {KALS_controller_window}
 */
KALS_controller_window.prototype.open_kals_window = function (_callback) {
    var _content = this;

    KALS_window.setup_window(_content, function () {
            $.trigger_callback(_callback);
    });
    
    return this;
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

/**
 * 增加設定值
 * @param {type} _config
 * @returns {KALS_controller_window.prototype}
 */
KALS_controller_window.prototype.set_config = function (_config) {
    this._config = _config;
    return this;
};

/**
 * 取得設定值
 * @param {type} _index
 * @returns {KALS_controller_window._config}
 */
KALS_controller_window.prototype.get_config = function (_index) {
    
    if ($.isset(_index) &&
	typeof(this._config[_index]) != 'undefined') {
		return this._config[_index];
	}
	else {
		return this._config;
	}
};

/**
 * 
 * @returns {KALS_controller_window.prototype}
 */
KALS_controller_window.prototype.set_config_loaded = function () {
    if (this._config_loaded === false) {
        this._config_loaded = true;
        $.trigger_callback(this._config_onload);
        this._config_onload = null;
    }
    return this;
};

/**
 * 確定設定值已經讀取
 * @param {type} _callback
 * @returns {KALS_controller_window.prototype}
 */
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

/**
 * 設置錯誤資訊
 * @param {String} _message
 * @returns {KALS_controller_window.prototype}
 */
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

KALS_controller_window.prototype._initialize_view_data = function (_view) {
    _view = KALS_controller.prototype._initialize_view_data.call(this, _view);
    _view = this._initialize_absolute_window(_view);
    return _view;
};

KALS_controller_window.prototype._initialize_absolute_window = function (_view) {
    
    var _ui = this._$create_ui_prototype();
    
    _ui.addClass('dialog-modal')
		.addClass('KALS').addClass('window')
                .addClass('kals-controller-window')
                .addClass('absolute')
        .html('<div class="dialog-table container"><table align="center" class="dialog-table heading" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody>'
        //+ "<tr><td class='resize-handler horizontal top' colspan='3'></td></tr>"
        + '<tr class="dialog-toolbar-tr">'
           // + '<td class="resize-handler vertical left"></td>'
            + '<th class="dialog-toolbar" valign="middle">'
            + '<table class="dialog-toolbar-table" width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tbody><tr>'
            //+ '<td class="toolbar-options toolbar-backward"></td>'
            + '<td class="dialog-heading"></td>'
            //+ '<td class="toolbar-options toolbar-forward"></td>'
            //+ '<td class="resize-handler vertical right"></td>'
            + '</tr></tbody></table>'
        + '</th></tr>' 
        + "</tbody></tbable>"
        + '<table align="center" class="dialog-table content" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody>'
        + '<tr class="dialog-content-tr"><td class="dialog-content-td">'
            + '<div class="dialog-content"></div></td></tr>'
        //+ "<tr><td class='resize-handler horizontal top' colspan='3'></td></tr>"
        + '</tbody></table></div>');
    
    if ($.browser.msie6) {
        _ui.css('width', '480px');
        //_ui.css('font-size', '1.5em');
    }
    
    //this.get_ui().after(_ui);
    //_ui.appendTo($('body'));
    //_ui.find('.dialog-content').append(this.get_ui());
    _ui.find('.dialog-content:first').append(_view);
    
    //$.test_msg('Dialog_modal._$create_ui()', this._$modal_name);
    
    var _container = _ui.find('.dialog-heading:first');
    if (_container.length == 1) {
        KALS_context.lang.add_listener(_container, this.heading);
    }
    
    // 設置關閉按鈕
    var _option = new Dialog_close_option();
    var _close_ui = _option.get_ui();
    _close_ui.css("float", "right").prependTo(_ui.find(".dialog-heading:first"));
    _close_ui.clone()
            .css("float", "left")
            .css("visibility", "hidden")
            .prependTo(_ui.find(".dialog-heading:first"));
    
    
    //同時擁有.with-backward-option.with-forward-option的.dialog-modal，會改變min-width
    _ui.addClass('with-forward-option');
    
    // 設定overlay
    var _config = this._$get_config();
    
    //_config.load = true;
    this._setup_effect();
    _config.effect = 'fade';
    _ui.overlay(_config);	//jQuery TOOL Overlay
    
    //設定可拖曳
    var _draggable_config = {
        handle: _ui.find('.dialog-heading')	//TODO 請調整handle
        
    };
    
    //設定游標變成手指
    _ui.find('.dialog-heading').css( 'cursor', 'pointer' );
	
    if ($('body').height() > _ui.height() + 100) {
        _draggable_config.containment = 'parent';
    }
    
    _ui.draggable(_draggable_config);
    /*
    var _resizable_config = {
        containment: "body",
        minWidth: 300,
        minHeight: 300,
        resize:function (_event, _ui) {
            _ui = _ui.element;
            var _content = _ui.find('.dialog-table.container:first');
            _ui.resizable({minHeight: _content.height()});
            //if ()
        }
    };
    _ui.resizable(_resizable_config);
    */
    /*
    if ($.is_mobile_mode()) {
        _ui.addClass('mobile');
        //var _el = _ui.find('.dialog-content');  
        //this.enable_touch_scroll(_el);
        this.enable_touch_scroll(_ui);
    }
    */
    
    return _ui;
};

/**
 * 開啟視窗
 * 
 * 加入一些設定，才能順利開啟視窗
 * @param {function} _callback
 */
KALS_controller_window.prototype.open_absolute_window = function (_callback) {
    //this.overlay_open(_callback);
    //this.debug('open absolute window', _config);
    this.get_ui().overlay().load();
    return this;
};


/**
 * 設定標頭
 * @param {string|KALS_language_param} _lang_param
 */
KALS_controller_window.prototype.set_heading = function (_lang_param) {
    var _container = this.get_heading();
    if (_container.length == 1) {
        if ($.is_string(_lang_param)) {
            _container.html(_lang_param);
        }
        else {
           KALS_context.lang.add_listener(_container, _lang_param);
        }
    }
    return this;
};

/**
 * 取得標頭
 * @type (jQuery)
 */
KALS_controller_window.prototype.get_heading = function () {
    var _ui = this.get_ui();
    var _container = _ui.find('.dialog-heading:first');
    return _container;
};


/**
 * 設定toolbar上的右方按鈕
 * @param {Dialog_option} _option
 */
KALS_controller_window.prototype.set_forward_option = function (_option) {
    var _ui = this.get_ui();
    
    if (typeof(_option.get_ui) != 'function') {
		return this;
	}
    
    var _option_ui = _option.get_ui();
    var _container = _ui.find('.toolbar-forward:first');
    
    _container
        .show()
        .append(_option_ui);
    
    /*
    _option_ui.ready(function() {
        
        setTimeout(function () {
            var _width = _option_ui.width();
            if (_width != 0)
                _ui.find('.toolbar-options').css('max-width', _width + 'px').show();    
        }, 100);
    });
    */
   
    this.set_backward_option(_option_ui.clone().css('visibility', 'hidden'));
    
    
    //同時擁有.with-backward-option.with-forward-option的.dialog-modal，會改變min-width
    _ui.addClass('with-forward-option');
    
    return this;
};


/**
 * 設定內文
 * @param {string|KALS_language_param|jQuery} _lang
 */
KALS_controller_window.prototype.set_content = function (_lang) {
    var _container = this.get_content();
    
    if (_container.length == 1) {
        this.toggle_content(true);
        this.get_ui().addClass('with-content');
        if ($.is_null(_lang)) {
            //如果是空物件，則隱藏
            _container.empty();
            this.toggle_content(false);
            this.get_ui().removeClass('with-content');  
        }
        else if ($.is_string(_lang)) {
            _container.html(_lang);
        }
        else if ($.is_class(_lang, 'KALS_language_param')) {
            if (typeof(KALS_context) != 'undefined') {
                KALS_context.lang.add_listener(_container, _lang);
            }
        }
        else {
            _container.empty();
            
            if ($.isset(_lang)) {
                _container.append(_lang);
                _lang.show();
            }
        }
        
    }
    return this;
};


/**
 * 是否需要使用jQuery Tools中的expose功能
 */
KALS_controller_window.prototype._$need_expose = true;

/**
 * 此Overlay是否需要Mask的設定
 * @type {boolean}
 */
KALS_controller_window.prototype._$exposable = false;

/**
 * Overlay的共通輸入參數。實際上設定是在建構子時設定的。
 * @type {object}
 */
KALS_controller_window.prototype._$get_config = function () {
    
    //$.test_msg('Overlay_modal._$get_config()', this._$modal_name);
    
    var _this = this;
    
    var _config = {
        //top: '10%',
        left: 'center',
        closeOnClick: false,
        load: false,
        onBeforeLoad: function() {
            //跟Modal_controller註冊開啟
            if (typeof(KALS_context) == 'object' && typeof(KALS_context.overlay) == 'object') {
				KALS_context.overlay.add_opened(_this);
			}
            
            var _ui = _this.get_ui();
            if ($.is_function(_this._$onviewportmove)) {
				_this._$onviewportmove(_ui);
			}
        },
        onLoad: function () {
            
            //$.test_msg('Overlay_modal._$get_config() onLoad', [_this._$temp_callback, _this.call_temp_callback]);
            
            var _ui = _this.get_ui();
            
            //2010.10.16 將定位移至onBeforeLoad執行
            //if ($.is_function(_this._$onviewportmove))
            //    _this._$onviewportmove(_ui);
            
            _ui.animate({}, {
                complete: function () {
                    setTimeout(function () {
                        if ($.is_function(_this._$onopen)) {
							_this._$onopen(_ui);
						}
                        _this.call_temp_callback(_ui);    
                    }, 1000);
                       
                }
            });
        },
        onBeforeClose: function () {
            //跟Modal_controller註冊關閉
            if (typeof(KALS_context) == 'object' && typeof(KALS_context.overlay) == 'object') {
                KALS_context.overlay.delete_opened(_this);
            }
        },
        onClose: function () {
            
            var _ui = _this.get_ui();
            if ($.is_function(_this._$onclose)) {
				_this._$onclose(_ui);
			}
            _this.call_temp_callback(_ui);
            
            
            //$.test_msg('Overlay_modal._$get_config() onClose 應該已經關閉了吧？');
            _ui.hide();
        },
        oneInstance: false
    };   
    return _config; 
};

KALS_controller_window.prototype._setup_effect_flag = false;

/**
 * 設定好effect
 */
KALS_controller_window.prototype._setup_effect = function () {
    if (this._setup_effect_flag === false) {
	$.tools.overlay.addEffect("fade", function(position, done) {
	      this.getOverlay().css(position).fadeIn(this.getConf().speed, done);
	   },// close function
	   function(done) {
	      // fade out the overlay
	      this.getOverlay().fadeOut(this.getConf().closeSpeed, done);
	   }
	); 
    }
    return this;
};

/**
 * open的時候，focus在第一顆按鈕上
 * @param {Object} _callback
 */
KALS_controller_window.prototype.dialog_open = function (_callback) {
    
    var _this = this;
    this._setted_focus = false;
    var _open_callback = function (_ui) {
        
        //$.test_msg('Dialog_modal.open() _open_callback');
        
        _this.focus_option();
        
        if ($.is_function(_callback)) {
			_callback(_ui);
		}
    };
    
    //2010.10.1 不使用Base庫
    //return this.base(_open_callback);
    
    //$.test_msg('檢查Dialog_modal.open的_callback', [ this._$modal_name ,_open_callback]);
    return this.overlay_open(_open_callback);
};

/**
 * Overlay的開啟動作
 * @param {function|null} _callback
 */
KALS_controller_window.prototype.overlay_open = function (_callback) {
    
    if (this.is_opened() === false) {
        var _ui = this.get_ui();
        var _this = this;
        
        //$.test_msg('Overlay_modal.open() check _ui', [(_ui != null), (typeof(_ui.overlay) == 'function'), _callback]);
        
        if (_ui !== null) {
            if (typeof(_ui.overlay) == 'function') {
                //$.test_msg('Overlay_modal.open() 設置this._$temp_callback', _callback);
                this._$temp_callback = _callback;
                //$.test_msg('Overlay_modal.open() 設置了this._$temp_callback', this._$temp_callback);
                
                //此處的callback會在load的時候就呼叫了
                var _api = _ui.data("overlay");
				//$.test_msg('Overlay_modal.open() 有API嗎?', $.isset(_api));
				
                if ($.isset(_api)) {
                    _api.setOpened(false);
					try {
						_api.load();
					}
					catch (_e) {
						_this._setup_effect();
						try {
							//再試著讀取一次
							_api.load();
						}
						catch (_final_e) {
							$.test_msg('open Overlay failed: ' , _final_e);
						}
					}
                      
                }
                _ui.show();
                
                if (this.is_exposable() && typeof(this.expose) == "function") {
                    this.expose();
                }
            }
            else {
                _ui.show();
                
                //$.test_msg('Overlay_modal.open() after show');
                
                if ($.is_function(_callback)) {
					_callback(_ui);
				}
            }
        }
    }
    else {
        $.trigger_callback(_callback);
    }
    
    return this;
};


/**
 * Overlay的關閉動作
 * @param {function|null} _callback
 */
KALS_controller_window.prototype.overlay_close = function (_callback) {
    if (this._$closable && this.is_opened()) {
        var _ui = this.get_ui();
        
        var _this = this;
        
        if (_ui !== null) {
            if (typeof(_ui.overlay) == 'function') {
                //$.test_msg('close set temp callback', [this.get_modal_name(), typeof(_callback)]);
                //$.test_msg('close set temp callback', _ui.overlay().close);
                this._$temp_callback = _callback;
                
                //if (typeof(_ui.overlay().isOpened()) != 'undefined')
                var _api = _ui.data("overlay");
                if ($.isset(_api)) {
                    _api.setOpened(true);
                    _api.close();    
                }
                _ui.hide();
                //else
                //{
                    
                //}
            }
            else {
                _ui.hide();
                if ($.is_function(_callback)) {
					_callback(_ui);
				}
            }
        }
    }
    return this;
};


/**
 * 此Overlay是否需要Mask
 * @type {boolean}
 */
KALS_controller_window.prototype.is_exposable = function () {
    return this._$exposable;
};

/**
 * Mask的z-index
 * @type {number}
 * @property
 * @private
 */
KALS_controller_window.prototype._mask_z_index = 9998;

/**
 * 讓此Overlay背後顯示mask
 * @param {Object} _callback
 */
KALS_controller_window.prototype.expose = function (_callback) {
    if (this._$exposable === false) {
		return this;
	}
    
    var _ui = this.get_ui();
    
    if ($.isset(_ui) && typeof(_ui.expose) == "function") {
        _ui.expose({
            color: '#333333',
            loadSpeed: 200,
            opacity: 0.5,
            zIndex: this._mask_z_index,
            closeOnClick: false,
            closeOnEsc: false
        });
        _ui.css('z-index', (this._mask_z_index+1));
    }
    
    setTimeout(function () {
        $.trigger_callback(_callback);
    }, 200);
    return this;
};

/**
 * 讓此Overlay隱藏到Mask之後
 * @param {function} _callback
 */
KALS_controller_window.prototype.cover = function (_callback) {
    if (this._$exposable === false) {
		return this;
	}
    
    var _ui = this.get_ui();
    
    if ($.isset(_ui)) {
        _ui.css('z-index', (this._mask_z_index-1));
    }
    
    $.trigger_callback(_callback);
    
    return this;
};
/* End of file KALS_controller_window */
/* Location: ./system/application/views/web_apps/kals_framework/KALS_controller_window.js */