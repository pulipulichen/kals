/**
 * KALS_context
 * 情境物件
 * 
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/7/28 下午 04:42:00
 * @extends {JSONP_dispatcher}
 */
KALS_context = new JSONP_dispatcher();

KALS_context.initialize = function () {
    
    
    //設定基本網址
    if (typeof(KALS_loader) != 'undefined') {
		this.base_url = KALS_loader.get_base_url();
	}
	else {
		// TODO 2010.8 KALS_context.setup_base_url: 只能在測試時使用
		this.setup_base_url();
	}
    if (this.base_url === null || this.base_url === '') {
		this.base_url = 'http://192.168.11.2/kals/web_apps/';
	}
    //$.test_msg('KALS_context() base url', this.base_url);
    
    //基礎元件 Basic Components
    this.view = new Viewportmove_dispatcher();
    this.auth = new KALS_authentication();
    this.hash = new URL_hash_dispatcher();
    this.hotkey = new KALS_hotkey_manager();
    this.style = new Style_manager();
    this.custom_type = new Context_custom_type();
	this.feedback = new Feedback_manager();
	this.view_manager = new KALS_view_manager();
    
    //初始化元件 Initialize Component
    this.init_context = new Init_context();
    this.init_component = new Init_component();
    this.init_profile = new Init_profile();
    
    //以下會牽涉到登入相關的，要記得先設定auth喔☆
    var _this = this;
    
    //確保選取位置。必須要在所有元件加入body之前確保完畢
    setTimeout(function () {
        _this.check_text_selector(function () {
            
            //資料元件 Data Components
            _this.lang = new KALS_language();
            _this.user = new Context_user();
            _this.policy = new Context_policy();
            
			//_this.search = new Context_search();
			_this.search = new Window_search();
			
            _this.overlay = new Overlay_manager();
            
            _this.init_context.start();
        });    
    }, 0);
    
};

/**
 * 讀取基本資料的位置
 * @type {string}
 * @property [_$load_url]
 * @private
 */
KALS_context._$load_url = 'generic/info';

/**
 * @example http://192.168.11.2/kals/web_apps/
 * @example /kals/web_apps/
 * @type {string}
 */
KALS_context.base_url = null;

/**
 * 測試時使用限定
 * 偵測基本網址的用法
 * 
 * @type {string} base_url
 */
KALS_context.setup_base_url = function () {
    if (this.base_url !== null) {
		return this;
	}
    
    var _scripts = $('script');
    
    //$.test_msg('KALS_context.setup_base_url()', _scripts.length);
    
    var _needle = '/web_apps/';
    for (var _i in _scripts) {
        var _src = _scripts.eq(_i).attr('src');
        if (typeof(_src) != 'string') {
			continue;
		}
        
        var _pos = _src.indexOf(_needle); 
        if (_pos > 0) {
            this.base_url = _src.substring(0, _pos + _needle.length);
            
            //$.test_msg('KALS_context.setup_base_url()', this.base_url);
            
            return this.base_url;
        }
    }
    return null;
};

/**
 * 供其他物件取用基礎網址
 * @param {string|array} _file
 * @type {string}
 */
KALS_context.get_base_url = function (_file) {
    if ($.is_null(_file)) {
        _file = '';
    }
    else if ($.is_array(_file)) {
        var _temp = '';
        for (var _i in _file) {
            var _f = _file[_i];
            if ($.starts_with(_f, '/')) {
				_f = _f.substr(1, _f.length);
			}
            if (_i < _file.length - 1) {
				$.appends_with(_f, '/');
			}
            
            _temp = _temp + _f;
        }
        _file = _temp;
    }
    
    if (this.base_url === null) {
		return _file;
	}
    
    if ($.is_string(_file) && $.starts_with(_file, '/')) {
		_file = _file.substring(1, _file.length);
	}
    
    if ($.ends_with(this.base_url, '/') === false) {
		this.base_url = this.base_url + '/';
	}
    
    var _url = this.base_url + _file;
    //$.test_msg('KALS_context.get_base_url()', [_url, this.base_url, _file]); 
    
    return _url;
};

/**
 * 回傳圖片網址
 * @param {string} _img 圖片的檔案名稱
 * @type {string} 圖片的完整網址
 */
KALS_context.get_image_url = function (_img) {
    
    if ($.is_null(_img)) {
		_img = '';
	}
    
    if ($.is_string(_img) && $.starts_with(_img, '/')) {
		_img = _img.substring(1, _img.length);
	}
    
    if (this.base_url === null) {
		return _img;
	}
        
    var _img_url = this.get_base_url();
    var _pos = _img_url.lastIndexOf('/web_apps');
    if (_pos == -1) {
		return _img;
	}
    
    _img_url = _img_url.substring(0, _pos + 1);
    _img_url = _img_url + 'images/' + _img;
    
    if (_img === '') {
		return _img_url;
	}
	else {
		return $('<img src="' + _img_url + '" border="0" />');
	}
};


/**
 * 回傳libraries網址
 * @param {string} _file 檔案名稱
 * @type {string} 檔案的完整網址
 */
KALS_context.get_library_url = function (_file) {
    
	var _img = _file;
    if ($.is_null(_img)) {
        _img = '';
    }
    
    if ($.is_string(_img) && $.starts_with(_img, '/')) {
        _img = _img.substring(1, _img.length);
    }
    
    if (this.base_url === null) {
        return _img;
    }
        
    var _img_url = this.get_base_url();
    var _pos = _img_url.lastIndexOf('/web_apps');
    if (_pos == -1) {
        return _img;
    }
    
    _img_url = _img_url.substring(0, _pos + 1);
    _img_url = _img_url + 'libraries/' + _img;
    
    return _img_url;
};

/**
 * 將KALS_context.load()讀取進來的資料清空
 * @param {function} _callback
 */
KALS_context.reset = function (_callback) {
    
    this.set_data({
        KALS_language: {}
    });
    
    setTimeout(function () {
        $.trigger_callback(_callback);
    }, 100);
    
    return this;
};

/**
 * 語系檔
 * @type {KALS_language}
 */
KALS_context.lang = null;

/** 
 * @memberOf {KALS_context}
 * @type {Context_user} user
 */
KALS_context.user = null;

/**
 * @type {Context_policy}
 */
KALS_context.policy = null;

/**
 * @type {Context_search}
 */
KALS_context.search = null;

/**
 * @type {Overlay_manager}
 */
KALS_context.overlay = null;

/**
 * @type {KALS_authentication}
 */
KALS_context.auth = null;

/**
 * @type {URL_hash_dispatcher}
 */
KALS_context.hash = null;

/**
 * @type {Style_manager}
 */
KALS_context.style = null;

/**
 * @type {Viewportmove_dispatcher}
 */
KALS_context.view = null;

/**
 * @type {Context_custom_type}
 */
KALS_context.custom_type = null;

/**
 * @type Feedback_manager
 */
KALS_context.feedback = null;

/**
 * @type {KALS_view_manager}
 */
KALS_context.view_manager = null;

/**
 * @type {Init_context}
 */
KALS_context.init_context = null;

/**
 * @type {Init_component}
 */
KALS_context.init_component = null;

/**
 * @type {Init_profile}
 */
KALS_context.init_profile = null;

/**
 * 確認所有任務是否完成。此屬性會在Init_component跟Init_profile完成時變成true。
 * @type {boolean}
 * @property
 */
KALS_context.completed = false;

// --------
// Text Selector
// --------

/**
 * @type {jQuery|null}
 * @version 20111105 Pudding Chen
 */
KALS_context._text_selector = null;

/**
 * 確保選取位置。
 * 必須要在所有元件加入body之前確保完畢
 * @param {function} 回呼函數
 * @version 20111105 Pudding Chen
 */
KALS_context.check_text_selector = function (_callback) {
    
    if (this._text_selector === null) {
        // TODO 2010.10.16 KALS_context._text_selector：測試時設置預設值
        //this._text_selector = '#selectable';
        
        //this._text_selector = 'body';
        
        //$.test_msg('KALS_context.check_text_selector()', $('.selectable-text').legnth);
        if ($('#articleContent').length !== 0) {
            //this._text_selector = $('#articleContent');
            /*
            var _text_container = $('<div></div>')
                .addClass('selectable-text')
                .($('body'));
        
            $('body').find('#articleContent')
                .appendTo(_text_container);
            //$('body').children('p')
            //    .appendTo(_text_container);
            */
            this._text_selector = $('#articleContent').addClass('selectable-text');
        }
        else if ($('.selectable-text').length === 0) {
            /*
            var _text_container = $('<div></div>')
                .addClass('selectable-text')
                .prependTo($('body'));
        
            var _move = function (_selector) {
                var _content = $('body').children(_selector);
                
                _content.find('script').remove();
                
                _content.appendTo(_text_container);
            };
            
            //_move('div:not(.selectable-text)');
            //_move('p');
            //_move('table');
            for (var _i in KALS_CONFIG.selectable_text) {
                _move(KALS_CONFIG.selectable_text[_i]);
            }
            */
           
            
            var _text_container;
            
            var _default_scope = function () {
                var _text_container = $('<div></div>')
                    .addClass('selectable-text');
        
                var _content = $('body').children(":not(.selectable-text):not(script)");
                _content.find('script').remove();
                _content.appendTo(_text_container);
                
                _text_container.appendTo($('body'));
                return _text_container;
            };
            
            if (KALS_CONFIG.annotation_scope_selector === null) {
                _text_container = _default_scope();
            }
            else {
                var _scope_selector = KALS_CONFIG.annotation_scope_selector;
                _scope_content = $(_scope_selector);
                
                if (_scope_content.length === 0) {
					_text_container = _default_scope();
				}
				else 
					if (_scope_content.length > 1) {
						_scope_content = _scope_content.filter(':first');
					}
                
                var _children_content = _scope_content.children();
                
                _text_container = $('<div></div>')
                    .addClass('selectable-text');
                
                _children_content.find('script').remove();
                
                //_text_container.insertBefore(_scope_content);
                //_scope_content.appendTo(_text_container);
                
                _text_container.prependTo(_scope_content);
                _children_content.appendTo(_text_container);
                
                /*
                else if (_scope_content.length == 1) {
                    _text_container = $('<div></div>')
                        .addClass('selectable-text');
                    
                    _scope_content.find('script').remove();
                    
                    _text_container.insertBefore(_scope_content);
                    _scope_content.appendTo(_text_container);
                }
                else {
                    for (var _i = 0; _i < _scope_content.length; _i++) {
                        var _content = _scope_content.eq(_i);
                        
                        var _container = $('<div></div>')
                            .addClass('selectable-text');
                        
                        _content.find('script').remove();
                        _container.insertBefore(_content);
                        _content.appendTo(_container);
                    }
                    
                    _text_container = $('.selectable-text');
                }
                */
            }
            
            this._text_selector = _text_container;
        }
        else {
            this._text_selector = $('.selectable-text:last');
        }
    }
    
    this.init_context.complete('selector');
    
    $.trigger_callback(_callback);
    return this;
};

/**
 * 取得可選取的文字區
 * @param {jQuery} 要選取的範圍
 * @version 20111105 Pudding Chen
 */
KALS_context.get_text_selector = function () {
    return this._text_selector;
};

/**
 * 設定可選取的文字區
 * @param {Object} _selector
 */
KALS_context.set_text_selector = function (_selector) {
    this._text_selector = _selector;
    return this;
};

KALS_context.load_info = function (_callback) {
    
    //2009 不準備資料的版本
    //this.load(_callback);
    
    //------------------------------
    //20111106 Pudding Chen 準備資料的版本
    
    //先準備資料
    var _data = {};
        
        //指引預設
        _data.anchor_navigation_type = KALS_CONFIG.anchor_navigation_type;
    
    this.load(_data, _callback);
    
};

/**
 * 記住最後選擇的標註類型
 * @type {Annotation_type_param}
 */
KALS_context.last_select_annotation_type = null;

/**
 * 取得標註類型列表
 * @type {Array} 包含標註類型的列表
 */
KALS_context.create_type_param_list = function() {
	var _list = {};
	var _type_options = KALS_CONFIG.annotation_type_option;
    for (var _i in _type_options) {
        var _type_string = _type_options[_i];
		var _type_param = new Annotation_type_param(_type_string);
        _list[_type_string] = _type_param;
    }
    
    //$.test_msg('Type_menu.create_type_option_list _list.length', _length);
    
	/**
	 * 20130603 Pudding Chen 
	 * 加入自訂的標註類型
	 */
    var _custom_type_list = KALS_context.custom_type.get_type_list();
    for (var _j in _custom_type_list) {
        _type = _custom_type_list[_j];
        var _type_name = _type.get_name();
        _list[_type_name] = _type;
    }
    
    return _list;
};

// ------------------------------------------------

/**
 * 網頁讀完之後就開始執行初始化的動作。他會先讀取generic/info網址喔。
 * @version 20111105 Pudding Chen
 */
$(function() {
    KALS_context.initialize();
});

/* End of file KALS_context */
/* Location: ./system/application/views/web_apps/core/KALS_context.js */