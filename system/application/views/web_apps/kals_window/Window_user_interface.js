/**
 * Window_user_interface
 * 以Factory的模式建立各種用於Window中的元件
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/6 上午 08:24:23
 * @extend {KALS_user_interface}
 */
function Window_user_interface() {
    KALS_user_interface.call(this);
}

Window_user_interface.prototype = new KALS_user_interface();

Window_user_interface.prototype.panel = function (_classname) {
    var _ui = $('<div class="window-panel"></div>');
    if ($.isset(_classname)) {
        _ui.addClass(_classname);
    }
    return _ui; 
};

Window_user_interface.prototype.subpanel = function (_classname) {
    var _ui = $('<div class="window-subpanel"></div>');
    if ($.isset(_classname)) {
        _ui.addClass(_classname);
    }
    return _ui; 
};

Window_user_interface.prototype._input_text_classname = 'text';

Window_user_interface.prototype.input = function (_name, _default_value) {
    var _ui = $('<input type="text" name="' + _name + '" />');
    return this._setup_text_input(_ui, _default_value);
};

Window_user_interface.prototype.password = function (_name, _default_value) {
    var _ui = $('<input type="password" name="' + _name + '" />');
    return this._setup_text_input(_ui, _default_value);
};

/**
 * 設定text型的表單
 * @param {jQuery} _input 要設定的表單
 * @param {Object} _default_value 預設值
 */
Window_user_interface.prototype._setup_text_input = function (_input, _default_value) {
    
    _input.addClass(this._input_text_classname);
    
    if ($.isset(_default_value)) {
        _input.val(_default_value);
    }
    
    _input.keypress(function (e) {
        
        //$.test_msg('Window ui._setup_text_input()', e.which);
        
        if (e.which === 13) {   //13表示enter鍵
        
            var _submit = _input.parents('.dialog-table:first')
                .find('.dialog-options .window-content-submit:first')
                .focus()
                .click();
        }
    });
    
    return _input;
};

Window_user_interface.prototype.check_input = function (_input, _force_empty) {
    
    //$.test_msg('win ui.check_input()', _input.length);
    
    if (_force_empty === undefined || typeof _force_empty !== "boolean") {
        _force_empty = true;
    }
    
    _input.change(function () {
        var _input = $(this);
        
        //$.test_msg('window ui.check_input()', _input.val());
        
        if (_input.val() === '' || _force_empty) {
            _input.addClass('empty');
        }
        else {
            _input.removeClass('empty');
        }
    });
    _input.change();
    return this;
};

/**
 * 建立下拉式選單
 * @param {jQuery[]} _option_lang_params
 * @param {String} _default_value 會去找options的value對應
 */
Window_user_interface.prototype.dropdown = function (_name, _options, _default_value) {
    var _select = $('<select></select>')
        .attr('name', _name)
        .addClass('dropdown');
        
    if ($.is_array(_options) === false) {
        _options = [_options];
    }
    
    for (var _i in _options) {
        _options[_i].appendTo(_select); 
    }
    
    //選擇預設的選項
    if ($.isset(_default_value)) {
        //_select.children('[value="' + _default_value + '"]').attr('selected', 'selected');
        _select.attr("value", _default_value);

        //$.test_msg('win ui.dropdown()' , [_default_value
        //    , _select.children('[value="' + _default_value + '"]').length
        //    , _select.children('[value="' + _default_value + '"]:selected').length]);
    }
    
    return _select;
};

/**
 * 建立下拉式選單的選項
 * @param {KALS_language_param} _lang_param
 * @param {Object} _value
 */
Window_user_interface.prototype.dropdown_option = function (_lang_param, _value) {
    
    var _option = $('<option></option>');
    
    KALS_context.lang.add_listener(_option, _lang_param);
    if ($.is_null(_value)) {
        if ($.is_class(_lang_param, 'KALS_language_param')) {
            _value = _lang_param.lang;
        }
        else {
            _value = _lang_param;
        }
    }
    
    _option.attr('value', _value);
    
    return _option;
};

/**
 * 條列式清單的選項
 * @param {KALS_language_param} _lang_param
 * @param {Object} _value
 */
Window_user_interface.prototype.list_option = function (_lang_param, _value) {
    
    var _option = $('<label><span></span></label>')
        .addClass('list-option');
    
    var _heading = _option.find('span').addClass('heading');
    
    KALS_context.lang.add_listener(_heading, _lang_param);
    
    if ($.is_null(_value)) {
        if ($.is_class(_lang_param, 'KALS_language_param')) {
            _value = _lang_param.lang;
        }
        else {
            _value = _lang_param;
        }
    }
    
    _heading.attr('value', _value);
    
    return _option;
};

/**
 * list_option的別名
 * 
 * @param {KALS_language_param} _lang_param
 * @param {Object} _value
 */
Window_user_interface.prototype.radio_option = function(_lang_param, _value){
    return this.list_option(_lang_param, _value);
};

Window_user_interface.prototype.radio_list = function (_name, _options, _default_value) {
    
    var _list = $('<span></span>')
        .addClass('radio-list')
        .addClass('list');
    
    if ($.is_array(_options) === false) {
        _options = [_options];
    }

    for (var _i in _options) {
        var _option = _options[_i];
        
        var _input = $('<input type="radio" name="'+_name+'" />')
            .prependTo(_option);
        var _value = _option.find('.heading:first').attr('value');
        _input.attr('value', _value);
        
        _option.appendTo(_list);
    }
    
    //選擇預設的選項
    if ($.isset(_default_value)) {
        //$.test_msg('window ui.radio_list() _default_value', _default_value);
        
        _list.find('[value="' + _default_value + '"]').attr('checked', true);
    }
    
    return _list;
};

/**
 * 修改指定列表的值
 * @type {jQuery} _list
 * @type {String} _value 要設定的值 
 */
Window_user_interface.prototype.change_list_value = function (_list, _value) {
	
	if (_list.length === 1) {
            //$.test_msg("Window_search change_annotation_type", _ui.attr("className"));
            var _classname = _list.attr("className");
            if (_classname.indexOf("radio-list") !== -1) {
                _list.find("input:radio").attr("checked", false);
                _list.find("input:radio[value='"+_value+"']").attr("checked", true);
            }
            else {
                _list.attr("value", _value);
            }
	}
	else {
            /*
            var _this = this;
            _list.each(function (_index, _l) {
                    _this.change_list_value(_l, _value);
            });
            */
            for (var _i = 0; _i < _list.length; _i++) {
                this.change_list_value(_list.eq(_i), _value);
            }
	}
};

/**
 * 取得指定列表的值
 * @type {jQuery} _list 
 */
Window_user_interface.prototype.get_list_value = function (_list) {
	
	if (_list.length > 1) {
            _list = _list.eq(0);
	}
	
	var _value;
	//$.test_msg("Window_search change_annotation_type", _ui.attr("className"));
	var _classname = _list.attr("className");
	if (_classname.indexOf("radio-list") !== -1) {
            _value = _list.find("input:radio:checked").attr("value");
	}
	else {
            _value = _list.attr("value");
	}
	return _value;
};


//------------------------------------------

Window_user_interface.prototype.window_change_link = function (_lang_param, _content_name) {
    
    var _link = new Window_change_link(
        _lang_param,
        _content_name
    );
    
    var _ui = _link.get_ui();
    return _ui;
};

/**
 * 行。有表格頭跟內容。
 * @param {KALS_language_param|jQuery|string} _title
 * @param {KALS_language_param|jQuery|string|null} _data
 */
Window_user_interface.prototype.row = function (_title, _data) {
    if ($.is_null(_data)) {
        _data = '';
        //return this.message_row(_title);
    }
    
    var _ui = $('<dl class="row"></dl>');
    
    var _dt = $('<dt></dt>').appendTo(_ui);
    var _dd = $('<dd></dd>').appendTo(_ui);
    
    _dt.click(function () {
        
        var _dt = $(this);
        var _dd = _dt.nextAll('dd:first');
        if (_dd.length > 0) {
            var _input = _dd.find('input:first');
            if (_input.length > 0) {
                var _type = _input.attr('type');
                if (_type === 'text' || _type === 'password') {
                    _input.select();
                }
                else {
                    _input.focus();
                }
            }                
        }
    });
    
    this._setup_content(_dt, _title);
    this._setup_content(_dd, _data);
    
    return _ui;
};

/**
 * 訊息行
 * @param {KALS_language_param|jQuery|string|null} _message = <hr />
 */
Window_user_interface.prototype.message_row = function (_message) {
    if ($.is_null(_message)) {
        _message = '';
    }
    
    var _ui = $('<div class="message-row"></div>');
    this._setup_content(_ui, _message);
    return _ui;
};

Window_user_interface.prototype.error_row_classname = 'error-row';

Window_user_interface.prototype.error_row = function (_message) {
    var _ui = this.message_row(_message);
    _ui.addClass(this.error_row_classname);
    return _ui;
};

Window_user_interface.prototype.hr_row = function () {
    var _ui = $('<div class="hr-row"><hr /></div>');
    return _ui;
};

Window_user_interface.prototype.heading_row = function (_heading) {
    
    if ($.is_null(_heading)) {
        return this.hr_row();
    }
    
    var _ui = $('<h2 class="heading-row"></h2>');
    this._setup_content(_ui, _heading);
    return _ui;
};

/**
 * 建立Span的HTML物件
 * @param {KALS_language_param} _lang_param
 * @type {jQuery}
 */
Window_user_interface.prototype.tip = function (_lang_param) {
    var _tip = KALS_context.lang.create_listener(_lang_param);
    _tip.addClass('tip');
    return _tip;
};

/**
 * 建立button的HTML物件
 * @param {KALS_language_param} _lang_param
 * @type {jQuery}
 */
Window_user_interface.prototype.button = function (_lang_param) {
	var _btn = $("<button type='button'></button>");
	KALS_context.lang.add_listener(_btn, _lang_param);
    _btn.addClass('button')
        .addClass('dialog-option');
    return _btn;
};

Window_user_interface.prototype._setup_content = function (_container, _content) {
    
    if ($.is_class(_content, 'KALS_language_param')) {
        KALS_context.lang.add_listener(_container, _content);
    }
    else {
        _container.append(_content);
    }
    return _container;
};

/**
 * 製造換頁的選單
 * @param {number} _now_page 現在頁數
 * @param {number} _all_page 所有頁數
 * @param {function} _callback 點下按鈕之後呼叫的功能
 * _callback = function (_page) {
 * 	//看你要用page作什麼事情
 * }
 */

Window_user_interface.prototype.create_pager = function (_now_page, _all_page, _callback) {
    var _factory = this;
    var _ui = _factory.panel('pager');

    var _first = new KALS_language_param (
        'First',
        'window.pager.first'
    );
    var _first_value = 1;

    var _prev = new KALS_language_param (
        'Prev',
        'window.pager.prev'
    );
    var _prev_value = _now_page - 1;

    var _next = new KALS_language_param (
        'Next',
        'window.pager.next'
    );
    var _next_value = parseInt(_now_page) + 1;

    var _last = new KALS_language_param (
        'Last',
        'window.pager.last'
    );
    var _last_value = _all_page;

    var _now = new KALS_language_param (
        _now_page,
        'window.pager.now'
    );
    var _now_value = _now_page;

    var _now_prev = new KALS_language_param (
        parseInt(_now_page) - 1,
        'window.pager._now_prev'
    );
    var _now_prev_value = parseInt(_now_page) - 1;

    var _now_prev2 = new KALS_language_param (
        parseInt(_now_page) - 2,
        'window.pager._now_prev2'
    );
    var _now_prev2_value = parseInt(_now_page) - 2;

    var _now_next = new KALS_language_param (
        parseInt(_now_page) + 1,
        'window.pager._now_next'
    );
    var _now_next_value = parseInt(_now_page) + 1;

    var _now_next2 = new KALS_language_param (
        parseInt(_now_page) + 2,
        'window.pager._now_next2'
    );
    var _now_next2_value = parseInt(_now_page) + 2;

    //var _lastnum = _all_page;

    // Prev First ... 3 4 5 6 7 ... Last Next
    // [1       ] [2] [3][4][5] [6] [7      ]

    // Part 1
    if (_now_page != 1) {
            this.create_pager_button(_prev, _prev_value, _callback).appendTo(_ui);
            this.create_pager_button(_first, _first_value, _callback).appendTo(_ui);
    } 
if (_now_page ==2){

            this.create_pager_button('1', _first_value, _callback).appendTo(_ui);
            }


    //Part2
if (_now_page > 3){

            this.create_pager_button('...').appendTo(_ui);

    }

    //PART3
    if (_now_page > 3) {
            this.create_pager_button(_now_prev2, _now_prev2_value, _callback).appendTo(_ui);
    }

if (_now_page === 3){

            this.create_pager_button('1', _first_value, _callback).appendTo(_ui);
            }
    if (_now_page > 2) {
            this.create_pager_button(_now_prev, _now_prev_value, _callback).appendTo(_ui);
    }



    //PART4 //當前頁面
    this.create_pager_button(_now).appendTo(_ui);


    //PART5
    if (_now_page < _all_page - 1) {
            this.create_pager_button(_now_next, _now_next_value, _callback).appendTo(_ui);
    }

    if (_now_page < _all_page - 2) {
            this.create_pager_button(_now_next2, _now_next2_value, _callback).appendTo(_ui);
    }

    //PART6
    if (_now_page < _all_page - 3){

            this.create_pager_button('...').appendTo(_ui);

    }


    //PART7	

        if (_now_page === _all_page - 1) {
            this.create_pager_button(_all_page, _last_value, _callback).appendTo(_ui);
        }
        if (_now_page === _all_page - 2) {
            this.create_pager_button(_all_page, _last_value, _callback).appendTo(_ui);
        }
        if (_now_page !== _all_page) {
        this.create_pager_button(_last, _last_value, _callback).appendTo(_ui);
        this.create_pager_button(_next, _next_value, _callback).appendTo(_ui);
    } 

    return _ui;
};


/**
 * 製作換頁按鈕
 * @param {KALS_language_param} _lang 按鈕顯示樣貌
 * @param {string} _value 要輸入callback的值
 * @param {Function} _callback 案下去的動作
 * _callback = function (_value) {
 * 	//_value...
 * }
 */

 
 Window_user_interface.prototype.create_pager_button = function (_lang, _value, _callback) {
	var _button = $("<button></button>")
		.addClass("pager-button");
	
	if ($.is_function(_callback)) {
		_button.click(function () {
			_callback(_value);
		});
		_button.addClass("link");
	}
	
	this._setup_content(_button, _lang);
	
	return _button;
}; 


/* End of file Window_user_interface */
/* Location: ./system/application/views/web_apps/Window_user_interface.js */