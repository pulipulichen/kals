/**
 * KALS_window
 * 由KALS_context來執行實體化的動作
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version	   1.0 2010/9/8 下午 10:57:44
 * @extends {Dialog_modal}
 */
function KALS_window() {
    
    Dialog_modal.call(this);

    this._default_onopen = this._$onopen;
    this._default_onclose = this._$onclose;
    this._default_onviewportmove = this._$onviewportmove;
    
    this.child('loading', new Window_loading_component());
    this.child('ui', new Window_user_interface());
    
    //記得要是要在物件建立完成之後再呼叫完成事件
    KALS_context.init_component.complete('KALS_window');
    
    //$.test_msg('KALS_window.constructor', this._$modal_name);
    
}

KALS_window.prototype = new Dialog_modal();
KALS_window.prototype.base = Dialog_modal; 

KALS_window.prototype._$modal_name = 'KALS_window';
KALS_window.prototype._default_modal_name = 'KALS_window';

/**
 * 內容
 * @type {Window_content}
 */
KALS_window.prototype._content = null;

/**
 * 讀取中顯示的元件
 * @type {Window_loading_component}
 * @memberOf {KALS_window}
 * @property
 */
KALS_window.prototype.loading = null;

/**
 * 建立視窗中元件的工廠
 * @type {Window_user_interface}
 * @property
 * @memberOf {KALS_window}
 */
KALS_window.prototype.ui = null;

/**
 * 標頭
 * @type {KALS_language_param}
 */
KALS_window.prototype._default_heading = new KALS_language_param(
    'INFORMATION',
    'window.noheading'
);

/**
 * 預設寬度
 * @type {string|number} = null: 如果是數字，則單位預設為px
 */
KALS_window.prototype._default_width = null;

/**
 * 寬度
 * @type {string|number} = null: 如果是數字，則單位預設為px
 */
KALS_window.prototype._width = null;

/**
 * 預設高度
 * @type {string|number} = 'inherit': 如果是數字，則單位預設為px
 */
KALS_window.prototype._default_height = 'inherit';

/**
 * 高度
 * @type {string|number} = null: 如果是數字，則單位預設為px
 */
KALS_window.prototype._height = null;

/**
 * 溢版設定
 * @type {string} = 'inherit': 請參考CSS的overflow設定
 */
KALS_window.prototype._default_overflow = 'inherit';

/**
 * 需要背景遮罩
 */
KALS_window.prototype._$exposable = true;

// ---------

KALS_window.prototype._$get_config = function () {
    var _config = this.base.prototype._$get_config.call(this);
    
    //$.test_msg('KALS_window._$get_config()', [ this._$modal_name , _config.onLoad]);
    
    var _parent_onbeforeload;
    if (typeof(_config.onBeforeLoad) !== 'undefined') {
        _parent_onbeforeload = _config.onBeforeLoad;
    }
    
    var _this = this;
    _config.onBeforeLoad = function () {
        
        var _ui = _this.get_ui();
    
        if ($.is_small_width() === false) {
            _ui.css('width', _this._width);
        }
        else {
            _ui.css('width', $.get_viewport_width());
            
            var _content_max_width = $.get_viewport_width();
            /*
            _content_max_width -= $.strip_unit(_ui.css('padding-left'));
            _content_max_width -= $.strip_unit(_ui.css('padding-right')); 
            _content_max_width -= $.strip_unit(_ui.css('margin-left'));
            _content_max_width -= $.strip_unit(_ui.css('margin-right'));
            */
            _content_max_width -= 60;
            //$.test_msg(_content_max_width);
            _ui.find('.dialog-content').css('max-width', _content_max_width);
        }
        
        /*
        if ($.is_small_height() === false) {
            _ui.css('height', _this._height);    
        }
        else {
            _ui.css('height', $.get_viewport_height());
        }
        */
        _ui.css('height', _this._height);
        
        if ($.is_function(_parent_onbeforeload)) {
            _parent_onbeforeload();
        }
    };
    
    return _config;
};

KALS_window.prototype._setup_ui = function (_callback) {
    
    Dialog_modal.prototype._setup_ui.call(this, _callback);
    
    //$.test_msg('KALS_window._setup_ui()', this._$modal_name);
    
    var _close_option = new Dialog_close_option();
    this.set_forward_option(_close_option);
        
    return this;    
};

//KALS_window.prototype._parent_create_ui = KALS_window.prototype._$create_ui;

KALS_window.prototype._$create_ui = function () {
    
    var _ui = this.base.prototype._$create_ui.call(this);
    
    _ui.addClass('window')
        .addClass("KALS");
    
    var _content_tr = _ui.find('.dialog-content-tr:first');
    var _loading_tr = $('<tr class="window-loading-tr"><td></td></tr>')
        .insertBefore(_content_tr);
    
    var _loading_ui = this.loading.get_ui();
    
    _loading_tr.find('td:first').append(_loading_ui);
    
    //$.test_msg('KALS_window._$create_ui()', this._$modal_name);
    
    return _ui;
    
};

KALS_window.prototype._default_onopen = null;
KALS_window.prototype._default_onclose = null;
KALS_window.prototype._default_onviewportmove = null;
 
/**
 * 將Window_content輸入KALS_window中
 * @param {Window_content} _content
 * @param {function} _callback
 */
KALS_window.prototype.setup_window = function (_content, _callback) {
    
    if (typeof(_content) === 'string') {
        eval('_content = new ' + _content + '();');
    }
    
    //$.test_msg('KALS_window.setup_window() ready to reset_window');
    
    var _this = this;    
    
    if (this._content === _content) {
        //$.test_msg("KALS_window.setup_window()", "不必重新設定");
        this.open(function () {
            $.trigger_callback(_callback);
        });
        return this;
    }
    
    this._reset_window(function () {
        
        //$.test_msg('KALS_window.setup_window() ready to set window');
        
        _this._content = _content;
        _content._window = _this;
        
        if ($.is_string(_content.name)) {
            _this.set_modal_name(_content.name);
        }
        if ($.isset(_content.width)) {
            _this.set_width(_content.width);
        }
        if ($.isset(_content.height)) {
            _this.set_height(_content.height);
        }
        //if ($.isset(_content.overflow))
        //    _this.set_overflow(_content.overflow);
        
        if ($.isset(_content.heading)) {
            _this.set_heading(_content.heading);
        }
        // -------------
        // 加上_$的參數
        if ($.is_string(_content._$name)) {
            _this.set_modal_name(_content._$name);
        }
        if ($.isset(_content._$width)) {
            _this.set_width(_content._$width);
        }
        if ($.isset(_content._$height)) {
            _this.set_height(_content._$height);
        }
        //if ($.isset(_content.overflow))
        //    _this.set_overflow(_content.overflow);
        
        if ($.isset(_content._$heading)) {
            _this.set_heading(_content._$heading);
        }
            
        // -------------
        
        //$.test_msg('KALS_window.setup_window() setting window 1');
        
        if ($.is_object(_content.submit)) {
            /*
            var _submit_option = new Dialog_option(_content.submit.heading
                , function () {
                    _content.submit.submit();
                });
            
            _this.set_options(_submit_option);
            */
            //$.test_msg('set submit', typeof(_content.submit.get_ui));
            
            _this.set_options(_content.get_submit());
            //_this.set_options(_content.get_submit_array());
            _this.toggle_options(false);
            
            //_content.submit.get_ui().hide();
        }
        
        //$.test_msg('KALS_window.setup_window() setting window 2');
        
        var _content_ui = _content.get_ui();
        _this.set_content(_content_ui);
        
        _this.get_ui().find('.dialog-content').hide();
        
        if ($.is_function(_content.onopen)) {
            _this.set_onopen(function () {
                _content.onopen();
            });
        }   
            
        if ($.is_function(_content.onclose)) {
            _this.set_onclose(function () {
                _content.onclose();
            });
        }
            
        if ($.is_function(_content.onviewportmove)) {
            _this.set_onviewportmove(_content.onviewportmove);
        }
        
        //$.test_msg('準備檢查window open之後的callback', _this._$modal_name);
        
        // 準備開啟囉！
        _this.open(function () {
            
            //$.test_msg('檢查window open之後的callback', $.is_function(_content.setup_content));
            
            if ($.is_function(_content.setup_content)) {
                
                // 開始設定內容囉
                _content.setup_content(function () {
                    // 設定完成囉
                    $.trigger_callback(_callback);
                });
            }   
            else {
                $.trigger_callback(100, _callback);
            }
            
        });
        
        //$.test_msg('KALS_window.setup_window() set window complete');
            
    });
        
    return this;
};

/**
 * 重新設置KALS_window
 * @private
 * @param {function} _callback
 */
KALS_window.prototype._reset_window = function (_callback) {
    
    var _this = this;
    var _setup = function () {
        
        _this._content = null;
        _this.set_modal_name(_this._default_modal_name);
        
        
        _this.set_width(_this._default_width);
        _this.set_height(_this._default_height);
        /*
        _this.set_overflow(_this._default_overflow);
        */
        _this.set_heading(_this._default_heading);
        _this.set_options();    //傳入空資料，就會刪除既有按鈕
        //_this.set_content();    //傳入空資料，就會隱藏content欄位
        _this.set_content_temp();
        
        _this.set_onopen(_this._default_onopen);
        _this.set_onclose(_this._default_onclose);
        _this.set_onviewportmove(_this._default_onviewportmove);
        
        _this.toggle_toolbar_option(false);
        
        _this.toggle_loading(true, function () {
            $.trigger_callback(_callback);
        });
    };
    
    
    if (this.is_opened()) {
        this.close(function () {
            _setup();
        });    
    }
    else {
        _setup();
    }
    
    return this;
};

/**
 * 設置寬度
 * @param {string|number} _width = 'auto': 如果是number，則預設單位為px
 */
KALS_window.prototype.set_width = function(_width) {
    if ($.is_null(_width)) {
        _width = this._default_width;
    }
    else  if ($.is_number(_width)) {
        _width = _width + 'px';
    }
   
    this._width = _width;
   
    return this;
};

/**
 * 設置高度
 * @param {string|number} _height = 'auto': 如果是number，則預設單位為px
 */
KALS_window.prototype.set_height = function(_height) {
    if ($.is_null(_height)) {
        _height = this._default_height;
    }
    else if ($.is_number(_height)) {
        _height = _height + 'px';
    }
   
    this._height = _height;
    return this;
};

/**
 * 設置溢版設定
 * @param {string} _overflow = 'auto': 請參考CSS的overflow設定
 */
/*
KALS_window.prototype.set_overflow = function(_overflow) {
    
    //2010.9.28
    //不使用此功能
    return;
    
    if ($.is_null(_overflow))
        _overflow = this._default_overflow;
        
    var _ui = this.get_ui();
    
    //var _this = this;
    var _content_td = _ui.find('.dialog-content-td:first');
    if (_content_td.css('overflow') != _overflow) {
        _content_td.css('overflow', _overflow);
        
        //setTimeout(function () {
        //    if ($.is_function(_this._$onviewportmove))
        //        _this._$onviewportmove(_ui);    
        //});    
    }
    
    return this;
};
*/

// --------

/**
 * 設置是否為loading中
 * @param {null|boolean} _is_loading 如果是null，則會切換到另一種狀態 
 * @param {function} _callback
 */
KALS_window.prototype.toggle_loading = function (_is_loading, _callback) {
    
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
        //if (_submit.length > 0)
        //{
            //_submit.slideDown(_speed);
        //    _submit.fade();
        //}
        _this.toggle_options(true);
        _this.toggle_toolbar_option(true);
    };
    
    var _open_loading = function () {
        _loading.slideDown(_speed);
        _content.slideUp(_speed, function () { _content.hide(); });
        //if (_submit.length > 0)
        //{
            //_submit.slideUp(_speed, function () { _submit.hide(); });
        //    _submit.hide();
        //}
        _this.toggle_options(false);
        _this.toggle_toolbar_option(false);   
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
        
        _this.focus_input();
        
        if ($.is_function(_this._$onviewportmove)) {
            _this._$onviewportmove(_ui);
            _ui.animate({}, {
                complete: function () {
                    //_this._$onviewportmove(_ui);
                    //_ui.animate({}, {
                    //    complete: function () {
                            setTimeout(function () {
                                $.trigger_callback(_callback);        
                            }, 0);        
                        //}
                    //});
                }
            }); 
        }
        else {
            $.trigger_callback(_callback);
        }
        
    }, (_speed * 1.2));
    
    return this;
};

/**
 * 讀取完成，將Loading狀態關閉。
 * @param {function} _callback
 */
KALS_window.prototype.loading_complete = function (_callback) {
    this.toggle_loading(false, _callback);
//    $.throw_msg("KALS_window", "loading_complete");
    return this;
};

KALS_window.prototype.is_loading = function () {
    var _ui = this.get_ui();
    var _loading = _ui.find('.window-loading:first');
    
    return (!(_loading.css('display') === 'none'));
};

// ------------------------------------------------------------
// 聚焦 focus
// ------------------------------------------------------------

KALS_window.prototype.focus_option = function (_offset) {
    //覆寫原本的動作
    //變成不做任何事情
};

/**
 * 當讀取結束之後，跳到content中的第一個可輸入欄位吧
 */
KALS_window.prototype.focus_input = function () {
    var _ui = this.get_ui();
	
    var _content = this._content;
    if (_content === null) {
        return;
    }
	
    var _first_input = _ui.find(_content.default_focus_input);
    var _first_submit = _ui.find(_content.default_focus_submit);
    
    //$.test_msg('KALS_window.toggle_loading() focus', [_first_input.length, _first_submit.length]);
    
    if (_first_input.length > 0) {
        _first_submit.blur();
        _first_input.eq(0).focus();
    }
    else {
        _first_submit.focus();
    }
	
    return this;
};
/* End of file KALS_window */
/* Location: ./system/application/views/web_apps/KALS_window.js */