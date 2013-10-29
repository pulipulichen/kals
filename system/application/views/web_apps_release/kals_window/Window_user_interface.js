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
        
        if (e.which == 13)    //13表示enter鍵
        {
            var _submit = _input.parents('.dialog-table:first')
                .find('.dialog-options .window-content-submit:first')
                .focus()
                .click();
        }
    });
    
    return _input;
};

Window_user_interface.prototype.check_input = function (_input) {
    
    //$.test_msg('win ui.check_input()', _input.length);
    
    _input.change(function () {
        var _input = $(this);
        
        //$.test_msg('window ui.check_input()', _input.val());
        
        if (_input.val() === '')
        {
            _input.addClass('empty');
        }
        else
        {
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
Window_user_interface.prototype.dropdown = function (_name, _options, _default_value)
{
    var _select = $('<select></select>')
        .attr('name', _name)
        .addClass('dropdown');
        
    if ($.is_array(_options) === false) {
		_options = [_options];
	}
    
    for (var _i in _options)
    {
        _options[_i].appendTo(_select); 
    }
    
    //選擇預設的選項
    if ($.isset(_default_value))
    {
        _select.children('[value="' + _default_value + '"]').attr('selected', 'selected');
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
    if ($.is_null(_value))
    {
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
    
    if ($.is_null(_value))
    {
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

Window_user_interface.prototype.radio_list = function (_name, _options, _default_value) {
    
    var _list = $('<span></span>')
        .addClass('radio-list')
        .addClass('list');
    
    if ($.is_array(_options) === false) {
		_options = [_options];
	}
    
    for (var _i in _options)
    {
        var _option = _options[_i];
        
        var _input = $('<input type="radio" name="'+_name+'" />')
            .prependTo(_option);
        var _value = _option.find('.heading:first').attr('value');
        _input.attr('value', _value);
        
        _option.appendTo(_list);
    }
    
    //選擇預設的選項
    if ($.isset(_default_value))
    {
        //$.test_msg('window ui.radio_list() _default_value', _default_value);
        
        _list.find('[value="' + _default_value + '"]').attr('checked', true);
    }
    
    return _list;
};

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
Window_user_interface.prototype.row = function (_title, _data)
{
    if ($.is_null(_data))
    {
        _data = '';
        //return this.message_row(_title);
    }
    
    var _ui = $('<dl class="row"></dl>');
    
    var _dt = $('<dt></dt>').appendTo(_ui);
    var _dd = $('<dd></dd>').appendTo(_ui);
    
    _dt.click(function () {
        
        var _dt = $(this);
        var _dd = _dt.nextAll('dd:first');
        if (_dd.length > 0)
        {
            var _input = _dd.find('input:first');
            if (_input.length > 0)
            {
                var _type = _input.attr('type');
                if (_type == 'text' || _type == 'password') {
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
Window_user_interface.prototype.message_row = function (_message)
{
    if ($.is_null(_message))
    {
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
    
    if ($.is_null(_heading))
    {
        return this.hr_row();
    }
    
    var _ui = $('<h2 class="heading-row"></h2>');
    this._setup_content(_ui, _heading);
    return _ui;
};

Window_user_interface.prototype.tip = function (_lang_param) {
    var _tip = KALS_context.lang.create_listener(_lang_param);
    _tip.addClass('tip');
    return _tip;
};

Window_user_interface.prototype._setup_content = function (_container, _content) {
    
    if ($.is_class(_content, 'KALS_language_param'))
    {
        KALS_context.lang.add_listener(_container, _content);
    }
    else
    {
        _container.append(_content);
    }
    return _container;
};
/* End of file Window_user_interface */
/* Location: ./system/application/views/web_apps/Window_user_interface.js */