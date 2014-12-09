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
    
    this.child('loading', new Window_loading_component());
    
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
 * 指定Module的名稱
 * 
 * 也是顯示在Hash的名稱。如果是null，則會顯示KALS_modal._$modal_name
 * @type {null|string}
 */
KALS_controller_window.prototype.name = 'Content';

/**
 * 標頭
 * @type {KALS_language_param}
 */
KALS_controller_window.prototype._$heading = new KALS_language_param(
    '-',
    'window.noheading'
);

/**
 * 顯示在導覽列的位置
 * @type KALS_language_param
 */
KALS_controller_window.prototype._$nav_heading = new KALS_language_param(
    'Option',
    'window.noheading'
);

/**
 * 導覽列相關的設定
 * @type JSON
 */
KALS_controller_window.prototype.nav_config = {
    /**
     * 顯示資料
     * @type Boolean
     */
    display: false,
    
    /**
     * 決定顯示導覽列的位置
     * 
     * 類型包括：
     * - common: 不管什麼類型都會顯示(在以下三種類型中都會顯示)
     * - login: 已經登入的使用者就會顯示
     * - profile: 以手動登入的使用者才會顯示
     * - embed: 以內嵌登入的使用者才會顯示
     * - anonymous: 未登入的使用者才會顯示
     * @type String
     */
    nav_type: "common",
    
    /**
     * 排序順序
     * 
     * 數字越大，越往左邊靠
     * 數字最小的是1
     * @type Number
     */
    order: 1
};


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
        return this;
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
 * 是否可開啟
 * @param {function} _callback
 * @returns {false}
 */
KALS_controller_window.prototype.disable_menu = function () {
    KALS_toolbar.toolbar.get_ui().find(".navigation-list ." + this.name).parent().hide();
    return this;
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
    var _this = this;
    
    KALS_util.log(this.name + ".close");
    
    return KALS_controller.prototype.close.call(this, function () {
        
        /**
         * 依照視窗是否獨立，判斷是否要延後呼叫callback
         * @author Pulipuli Chen 20141110
         */
        KALS_window.close(function () {
            if (_this._$absolute === true) {
                $.trigger_callback(_callback);
            }
            else {
                setTimeout(function () {
                    $.trigger_callback(_callback);
                }, 500);
            }
        });
    });
};

/**
 * 覆寫KALS_controller的disable_controller，加入視窗關閉功能
 * @param {function} _callback
 * @returns {KALS_controller_window}
 */
KALS_controller_window.prototype.disable_controller = function (_callback) {
    
    if (typeof(KALS_window) === "object" 
            && typeof(KALS_window.is_opened) === "function"
            && KALS_window.is_opened()) {
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
KALS_controller_window.prototype.adjust_note = function () {
    
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
 * @return {KALS_controller_window}
 */
KALS_controller_window.prototype.set_input_value = function (_json) {
	
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
 * 獨立開啟視窗
 * @author Pulipuli Chen 20131113
 * @return {KALS_controller_window}
 */
KALS_controller_window.prototype.open_kals_window = function (_callback) {
    var _content = this;
    
    //this.debug('open kals window');
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
	typeof(this._config[_index]) !== 'undefined') {
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
    
    this._lang_filter();
    
    if (this.is_absolute()) {
        _view = this._initialize_absolute_window(_view);
    }
    
    return _view;
};

KALS_controller_window.prototype._lang_filter_flag = false;

KALS_controller_window.prototype._lang_filter = function () {
    if (this._lang_filter_flag === false) {
        var _check_lang = ['_$heading', '_$nav_heading'];
        for (var _i in _check_lang) {
            var _attr = _check_lang[_i];
            var _lang = this[_attr];
            var _line = _lang;
            
            if ($.is_class(_lang, 'KALS_language_param')) {
                _line = _lang.line;
            }
            
            if (KALS_context.lang.has_line(_line) === false) {
                var _view_index = KALS_context.view_manager._get_view_classname(this._$view, '_');
                _line = 'view.' + _view_index + '.' + _line;
                //this.debug('_lang_filter', _line);
                //"view.kals_framework_example_view_dashboard.heading":"資訊版"
                if (KALS_context.lang.has_line(_line) === true) {
                    this[_attr] = new KALS_language_param(
                         _lang.msg,
                         _line
                    );
                }
            }
        }
    }
    return this;
};

/**
 * 建立小型視窗
 * @param {jQuery} _view
 * @returns {jQuery}
 */
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
            + '<td class="dialog-heading"><span class="heading"></span></td>'
            //+ '<td class="toolbar-options toolbar-forward"></td>'
            //+ '<td class="resize-handler vertical right"></td>'
            + '</tr></tbody></table>'
        + '</th></tr>' 
        + "</tbody></tbable>"
        + '<table align="center" class="dialog-table content" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody>'
        + '<tr class="dialog-content-tr"><td class="dialog-content-td">'
            + '<div class="dialog-content"></div>'
            + '</td></tr>'
        // @20140119 Pulipuli Chen
        // 加入讀取條的功能
        + '<tr class="window-loading-tr"><td></td></tr>'
        //+ "<tr><td class='resize-handler horizontal top' colspan='3'></td></tr>"
        + '</tbody></table></div>');
    
    
    if (this._$width !== null) {
        _ui.css('width', this._$width + 'px');
    }
    if (this._$height !== null) {
        _ui.css('height', this._$height + 'px');
    }
    
    if (this._$max_height !== null) {
        _ui.find(".dialog-content:first").css('max-height', this._$max_height + 'px');
    }
    
    if ($.browser.msie6) {
        _ui.css('width', '480px');
        //_ui.css('font-size', '1.5em');
    }
    
    //this.get_ui().after(_ui);
    //_ui.appendTo($('body'));
    //_ui.find('.dialog-content').append(this.get_ui());
    _ui.find('.dialog-content:first').append(_view);
    
    //$.test_msg('Dialog_modal._$create_ui()', this._$modal_name);
    
    var _container = _ui.find('.dialog-heading:first .heading');
    if (_container.length === 1) {
        if (this.heading !== undefined && this.heading !== null) {
            KALS_context.lang.add_listener(_container, this.heading);
        }
        else {
            KALS_context.lang.add_listener(_container, this._$heading);
        }
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
   
    // 20140119 Pulipuli Chen
    // 加上Loading的功能
    var _loading_tr = _ui.find(".window-loading-tr:first");
    var _loading_ui = this.loading.get_ui();
    _loading_tr.find('td:first').append(_loading_ui);
    if (this._$default_status_loading) {
        _ui.addClass("loading");
    }
        
    return _ui;
};

/**
 * 預設狀態是讀取中
 * @type Boolean
 */
KALS_controller_window.prototype._$default_status_loading = false;

/**
 * 視窗寬度
 * @type Number|null null表示未設定，單位是px
 */
KALS_controller_window.prototype._$width = null;

/**
 * 視窗高度
 * @type Number|null null表示未設定，單位是px
 */
KALS_controller_window.prototype._$height = null;

/**
 * 視窗最大高度
 * @type Number|null null表示未設定，單位是px
 */
KALS_controller_window.prototype._$max_height = null;



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
    if (_container.length === 1) {
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
    var _container = _ui.find('.dialog-heading:first .heading');
    return _container;
};


/**
 * 設定toolbar上的右方按鈕
 * @param {Dialog_option} _option
 */
KALS_controller_window.prototype.set_forward_option = function (_option) {
    var _ui = this.get_ui();
    
    if (typeof(_option.get_ui) !== 'function') {
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
    
    if (_container.length === 1) {
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
            if (typeof(KALS_context) !== 'undefined') {
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
        left: "center",
        closeOnClick: false,
        load: false,
        onBeforeLoad: function() {
            //跟Modal_controller註冊開啟
            if (typeof(KALS_context) === 'object' 
                    && typeof(KALS_context.overlay) === 'object') {
                KALS_context.overlay.add_opened(_this);
            }
            
            //if (_this._adjust_position_checked === false) {
                if ($.is_function(_this._adjust_position_top)) {
                    _this._adjust_position_top();
                }
                if ($.is_function(_this._adjust_position_left)) {
                    _this._adjust_position_left();
                }
                var _ui = _this.get_ui();
                setTimeout(function () {
                    _ui.css("visibility", "visible");
                }, 1);
                
                //_this._adjust_position_checked = true;
            //}
                
            
            if ($.is_function(_this._$onviewportmove)) {
                var _ui = _this.get_ui();
                _this._$onviewportmove(_ui);
            }
        },
        onLoad: function () {
            
            //$.test_msg('Overlay_modal._$get_config() onLoad', [_this._$temp_callback, _this.call_temp_callback]);
            
            var _ui = _this.get_ui();
            
            //2010.10.16 將定位移至onBeforeLoad執行
            //if ($.is_function(_this._$onviewportmove))
            //    _this._$onviewportmove(_ui);
            
            /**
             * @version 20140516 Pulipuli Chen
             * 不知道為什麼還是有辦法執行_$onopen，所以這個功能暫時不使用
             */
            _ui.animate({});
            /*
            _ui.animate({}, {
                //$.test_msg("KALS_controller_window onLoad", []);
                complete: function () {
                    setTimeout(function () {
                        if ($.is_function(_this._$onopen)) {
                            _this._$onopen(_ui);
                        }
                        _this.call_temp_callback(_ui);    
                    }, 0);
                }
            });
            */
        },
        onBeforeClose: function () {
            //跟Modal_controller註冊關閉
            if (typeof(KALS_context) === 'object' 
                    && typeof(KALS_context.overlay) === 'object') {
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

/**
 * 設定視窗的左右位置
 * 
 * 可用參數：
 *  null: 預設center
 *  left: 置左
 *  right: 置右
 *  center: 置中
 *  middle: 置中
 *  10px: 靠左距離10px
 *  -10px: 靠右距離10px
 *  10%: 靠左距離視窗寬度的10%
 *  -10%: 靠右距離視窗寬度的10%
 * @type String
 */
KALS_controller_window.prototype._$position_left = null;

/**
 * 設定視窗的上下位置
 * 
 * 可用參數：
 *  null: 預設10%
 *  top: 置頂
 *  bottom: 置底
 *  center: 置中
 *  middle: 置中
 *  10px: 靠頂距離10px
 *  -10px: 靠底距離10px
 *  10%: 靠頂距離視窗寬度的10%
 *  -10%: 靠底距離視窗寬度的10%
 * @type String
 */
KALS_controller_window.prototype._$position_top = null;

KALS_controller_window.prototype._adjust_position_checked = false;

/**
 * 調整視窗上下位置
 * 
 * 要看物件的this._$position_top參數來決定
 * @author Pulipuli Chen 20140118
 * @returns {KALS_controller_window}
 */
KALS_controller_window.prototype._adjust_position_top = function () {
    
    var _ui = this.get_ui();
    
    var _top = null;
    if ( $.isset(this._$position_top) ) {
        _top = this._$position_top;
        _top = $.trim(_top);
        
        var _window_height = $(window).height();
        var _ui_height = _ui.height();
        //var _ui_height = 300;
        
        if ($.ends_with(_top, "px")) {
            //相素類型
            _top = _top.substr(0, _top.length -2);
            _top = parseInt(_top, 10);
            
            if (_top < 0) {
                // 如果是負數的情況
                _top = _window_height - _ui_height + _top;
            }
            _top = _top + "px";
        }
        else if ($.ends_with(_top, "%") && $.starts_with(_top, "-")) {
            _top = _top.substr(1, _top.length-1);
            _top = parseInt(_top, 10);
            var _bottom_margin = _window_height / 100 * _top;
            _top = _window_height - _ui_height -_bottom_margin;
            _top = _top + "px";
        }
        else if ($.is_number(_top)) {
            if (_top < 0) {
               _top = _window_height - _ui_height + _top; 
            }
            _top = _top + "px";
        }
        
        
        if (_top === "top") {
            _top = "0px";
        }
        else if (_top === "bottom") {
            _top = _window_height - _ui_height;
            _top = _top + "px";
        }
        else if (_top === "middle" || _top === "center") {
            _top = (_window_height / 2) - (_ui_height / 2);
            _top = parseInt(_top, 10);
            _top = _top + "px";
        }
        
        //$.test_msg("最後算出來的top是：", _top);
        setTimeout(function () {
            if ($.isset(_top)) {
                _ui.css("top", _top);
            }
        }, 0);
    }
    
    
    return this;
};

/**
 * 調整視窗上下位置
 * 
 * 要看物件的this._$position_left參數來決定
 * @author Pulipuli Chen 20140118
 * @returns {KALS_controller_window}
 */
KALS_controller_window.prototype._adjust_position_left = function () {
    
    var _ui = this.get_ui();
    
    var _left = null;
    if ( $.isset(this._$position_left) ) {
        _left = this._$position_left;
        _left = $.trim(_left);
        
        var _window_width = $(window).width();
        var _ui_width = _ui.width();
        
        if ($.ends_with(_left, "px")) {
            //相素類型
            _left = _left.substr(0, _left.length -2);
            _left = parseInt(_left, 10);
            
            if (_left < 0) {
                // 如果是負數的情況
                _left = _window_width - _ui_width + _left;
            }
            _left = _left + "px";
        }
        else if ($.ends_with(_left, "%") && $.starts_with(_left, "-")) {
            _left = _left.substr(1, _left.length-1);
            _left = parseInt(_left, 10);
            var _bottom_margin = _window_width / 100 * _left;
            _left = _window_width - _ui_width -_bottom_margin;
            _left = _left + "px";
        }
        else if ($.is_number(_left)) {
            if (_left < 0) {
               _left = _window_width - _ui_width + _left; 
            }
            _left = _left + "px";
        }
        
        
        if (_left === "left") {
            _left = "0px";
        }
        else if (_left === "right") {
            _left = _window_width - _ui_width;
            _left = _left + "px";
        }
        else if (_left === "middle" || _left === "center") {
            _left = (_window_width / 2) - (_ui_width / 2);
            _left = parseInt(_left, 10);
            _left = _left + "px";
        }
        
        //$.test_msg("最後算出來的left是：", _left);
        setTimeout(function () {
            if ($.isset(_left)) {
                _ui.css("left", _left);
            }
        }, 0);

    }
    
    return this;
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
            if (typeof(_ui.overlay) === 'function') {
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
                
                if (this.is_exposable() && typeof(this.expose) === "function") {
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
            if (typeof(_ui.overlay) === 'function') {
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

// ------------------------------------------------------------
// 讀取狀態 loading
// ------------------------------------------------------------

/**
 * 設置是否為loading中
 * @param {null|boolean} _is_loading 如果是null，則會切換到另一種狀態 
 * @param {function} _callback
 */
KALS_controller_window.prototype.toggle_loading = function (_is_loading, _callback) {
    
    var _this = this;
    
    if ($.is_function(_is_loading) && $.is_null(_callback)) {
        _callback = _is_loading;
        _is_loading = null;
    }
    
    if (_is_loading !== null
       && this.is_loading() === _is_loading) {
        $.trigger_callback(_callback);
        return;
    }
    var _ui = this.get_ui();
    
    var _loading = _ui.find('.window-loading:first');
    var _content = _ui.find('.dialog-content:first');
    var _submit = _ui.find('.window-content-submit:first');
    
    var _close_loading = function () {
        _loading.slideUp(_speed, function () { _loading.hide(); });
        _content.slideDown(_speed);
        _ui.removeClass("loading");
        //_this.toggle_options(true);
        //_this.toggle_toolbar_option(true);
    };
    
    var _open_loading = function () {
        _loading.slideDown(_speed);
        _content.slideUp(_speed, function () { _content.hide(); });
        //_this.toggle_options(false);
        //_this.toggle_toolbar_option(false);   
        _ui.addClass("loading");
    };
    
    //var _speed = 1000;
    var _speed = 0;    //2010.9.10 取消動畫
    
    if (_is_loading === null) {
        if (this.is_loading()) {
            _close_loading();
        }
        else {
            _open_loading();
        }
    }
    
    if (_is_loading === true) {
        _open_loading();
    }
    else {
        _close_loading();
    }
    
    if ($.is_function(this._$onviewportmove)) {
        this._$onviewportmove(_ui);
    }
    
    setTimeout(function () {
        if ($.is_function(_this._$onviewportmove)) {
            _this._$onviewportmove(_ui);
            _ui.animate({}, {
                complete: function () {
                    setTimeout(function () {
                        $.trigger_callback(_callback);        
                    }, 0);
                }
            }); 
        }
        else {
            $.trigger_callback(_callback);
        }
        _this.focus_input();
    }, (_speed * 1.2));
    
    return this;
};

/**
 * 讀取完成，將Loading狀態關閉。
 * @param {function} _callback
 */
KALS_controller_window.prototype.loading_complete = function (_callback) {
    return this.toggle_loading(false, _callback);
};

KALS_controller_window.prototype.is_loading = function () {
    var _ui = this.get_ui();
    var _loading = _ui.find('.window-loading:first');
    
    return (!(_loading.css('display') === 'none'));
};

/**
 * 切換顯示工具列的按鈕
 * @param {boolean} _display
 * @returns {Dialog_modal}
 */
KALS_controller_window.prototype.toggle_toolbar_option = function(_display) {
    
    var _toolbar = this.get_ui('.dialog-toolbar:first');
    
    var _classname = 'hide-option';
    if ($.is_null(_display)) {
        _toolbar.toggleClass(_classname);
    }
    else if (_display) {
        _toolbar.removeClass(_classname);
    }
    else {
        _toolbar.addClass(_classname);
    }
        
    return this;
};

/**
 * 當讀取結束之後，跳到content中的第一個可輸入欄位吧
 * 
 * @todo 20140119 無法正常運作
 * @return {KALS_controller_window}
 */
KALS_controller_window.prototype.focus_input = function () {
    var _ui = this.get_ui();
    
    var _input = _ui.find(".default-focus:first");
    
    if (_input.length === 0) {
        _input = _ui.find("input:first");
    }
    if (_input.length === 0) {
        _input = _ui.find("button:first");
    }
    if (_input.length === 0) {
        _input = _ui.find("textarea:first");
    }
    
    //$.test_msg("focus_input", _input.length);
    if (_input.length > 0) {
        _input.css("border", "3px solid red");
        _input.css("color", "red");
        _input.focus();
        //_input.remove();
    }
    
    return this;
};

/**
 * 導覽列點一下去的動作
 * @type {Function}
 */
KALS_controller_window.prototype._$nav_click_callback = null;

/**
 * 取得目前的submit
 * 
 * @author Pulipuli Chen 20141111
 * @return {Window_content_submit} 
 */
KALS_controller_window.prototype.get_submit = function () {
    return this.submit;
};

/* End of file KALS_controller_window */
/* Location: ./system/application/views/web_apps/kals_framework/KALS_controller_window.js */
