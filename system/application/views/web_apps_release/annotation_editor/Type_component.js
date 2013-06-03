/**
 * Type_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/18 下午 03:31:54
 * @extends {Event_dispatcher}
 * @param {Annotation_editor} _editor
 */
function Type_component(_editor) {
    
    Event_dispatcher.call(this);
    if ($.isset(_editor)) {
        this._editor = _editor;
        this._default_type = new Annotation_type_param();
        //this._type = new Annotation_type_param();
        //$.test_msg('Type_component() _type', this._type.export_json());
    }
}

// Extend from KALS_user_interface
Type_component.prototype = new Event_dispatcher();

Type_component.prototype._$enable_changed_lock = false;

/**
 * @type {Annotation_editor}
 */
Type_component.prototype._editor = null;

/**
 * 預設顯示的標註類型
 * @type {Annotation_type_param}
 */
Type_component.prototype._default_type = null;

/**
 * @type {Type_menu}
 */
Type_component.prototype.menu = null;

/**
 * 現在所選擇的type
 * @type {Annotation_type_param}
 */
Type_component.prototype._type = null;

/**
 * Create UI
 * @memberOf {Type_component}
 * @type {jQuery} UI
 */
Type_component.prototype._$create_ui = function () {
    var _ui = $('<span></span>')
        .addClass('type-component');
    
    var _this = this;
    
    setTimeout(function () {
        _this.set_type();
    }, 0);
    
    var _menu = this._setup_menu();
    _menu.get_ui().appendTo(_ui);
    var _config = _menu._$get_config();
    
    //$.test_msg('Type_component._$create_ui()', _config);
    
    var _options = _menu.create_type_option_list();
    
    for (var _i in _options) {
        var _option = _options[_i];
        
        _option.tooltip(_config);
        
        if (_i == 'custom') {
            _option = this._create_custom_type_option(_option);
        }
        _option.hide().appendTo(_ui);
    }
    
    _ui.tooltip(_config);
    //_ui.setup_hover();
    
	// 20130603 Pudding Chen
	// 預設選單
	var _default_type = null;
	if (typeof(KALS_CONFIG.default_annotation_type) == "string") {
		var _default_type_name = KALS_CONFIG.default_annotation_type;
		for (_i in _options) {
			_option = _options[_i];
			var _type_name = _i;
			//$.test_msg("[Type_component]", [_i, _default_type_name]);
			if (_default_type_name == _type_name) {
				this._default_type = KALS_context.custom_type.find_type(_i); 
				break;
			}
		}
	}
	if (_default_type === null) {
		for (_i in _options) {
			_option = _options[_i];
			var _type_name = _i;
			this._default_type = KALS_context.custom_type.find_type(_i);
			break;
		}
	}
    this._listen_editor();
    
    return _ui;
};

/**
 * 設定標註類型
 * 
 * @param {Annotation_type_param} _type
 * @param {boolean} _is_manual = false 是人為選擇的，預設是false。如果是人為選擇的，則會記錄起來
 */
Type_component.prototype.set_type = function (_type, _is_manual) {
    
    //$.test_msg('Type_component.set_type() start', _type);
    
    //if (_type == this._type
    //    && _type != null)
    
    //改變UI
    //var _ui = this.get_ui();
    //_ui.empty();
    
	/**
	 * 過濾_type參數
	 */
    var _is_custom_type = false;
    if ($.is_null(_type)) {
		_type = this.get_type();
	}
	else 
		if (_type === '') {
			_type = new Annotation_type_param(7);
		}
		else {
			_custom_type = KALS_context.custom_type.find_type(_type);
			
			if (_custom_type !== null) {
				_type = _custom_type;
			}
			else {
				//$.test_msg('Type_component.set_type() [add_custom_type]', _type);
				_type = KALS_context.custom_type.add_custom_type(_type);
				_is_custom_type = true;
			}
		}
    
	/**
	 * 20130603 Pudding Chen
	 * 如果是人為選擇的，則記錄起來
	 */
	if (typeof(_is_manual) == "boolean" && _is_manual === true) {
		KALS_context.last_select_annotation_type = _type;
	}
	
    //$.test_msg('Type_component.set_type()', [$.isset(this._type), _type.equals(this._type)]);
    
    if ($.isset(this._type) &&
		_type.equals(this._type) &&
		_is_custom_type === false) {
		return this;
	}
    
    //$.test_msg('Type_component.set_type() pass', [_type.export_json(), _type.export_json()
    //    , _type.get_id(), _type.get_type_name()
    //    , _type.is_custom(), _type.has_custom_name()]);
    
    //$.test_msg('Type_component.set_type() [get_type_name]', [_type.get_type_name(), _type.is_basic()]);
    
    //_type = this.menu.filter_type(_type);
    
    //var _type_ui = this.menu.create_type_option(_type)
    //    .appendTo(_ui);
    
    var _ui = this.get_ui();
    var _classname = _type.get_classname();
    
    if (_ui.children('.' + _classname).length > 0) {
        _ui.children(':not(.' + _type.get_classname() + ')').hide();
        _ui.children('.' + _type.get_classname()).css('display', 'inline');
    }
    else {
        _ui.children(':not(.custom:first)').hide();
        _ui.children('.custom:first').css('display', 'inline');
    }
    
    if (_type.is_basic() === false) {
        //如果不是基本類型，則設置custom_name
        this.set_custom_name(_type.get_type_name());
    }
    else {
        this.reset_custom_name();
    }
    
    this._type = _type;
    
    return this.notify_change();
};

Type_component.prototype.notify_change = function () {
    
    //通知監聽者
    this.notify_listeners(this._type);
    
    return this;
};

/**
 * @type {Annotation_type_param}
 */
Type_component.prototype.get_type = function () {
    if ($.is_null(this._type)) {
        return this._default_type;
    }
    else {
        if (this._custom_name === null) {
			return this._type;
		}
		else {
			return this._custom_name;
		}
    }    
};


Type_component.prototype.get_default_type = function () {
    return this._default_type;
};

/**
 * 重設標註類型
 */
Type_component.prototype.reset_type = function () {
    this.reset_custom_name();
	/**
	 * 20130603 Pudding Chen
	 * 改成記錄最後一次選擇的標註類型
	 */
	//return this.set_type(this._default_type);
	var _last_select_annotation_type = KALS_context.last_select_annotation_type;
	
	if (_last_select_annotation_type === null && typeof(KALS_CONFIG.default_annotation_type) == "string") {
		
	}
	
    return this.set_type(_last_select_annotation_type);
};

Type_component.prototype._setup_menu = function () {
    
    var _menu = new Type_menu(this);
    this.menu = _menu;
    return _menu;
    
};

/**
 * 監聽Editor的動作來反應
 */
Type_component.prototype._listen_editor = function () {
    
    var _this = this;
    
    this._editor.add_listener('reset', function () {
        _this.reset_type();
    });
    
    this._editor.add_listener('set', function (_editor, _param) {
        _this.set_data(_param);
    });
    
    this._editor.add_listener('get', function (_editor, _annotation_param) {
        
        var _type = _this.get_type();
        
        //如果是預設值，則不回傳，由伺服器去取得預設值
        if (_type != _this._default_type) {
            _annotation_param.set_type(_type);
        }   
    });
};

/**
 * 設置標註參數
 * @param {Annotation_param} _param
 */
Type_component.prototype.set_data = function (_param) {
    
    if ($.isset(_param)
        && typeof(_param.type) != 'undefined') {
        this.set_type(_param.type);
    }
    return this;
};

/**
 * 自訂選項
 */
Type_component.prototype._custom_type_option = null;

Type_component.prototype._custom_type_option_classname = "custom-type-option";

Type_component.prototype._create_custom_type_option = function (_option) {
    
    var _ui = $('<span></span>')
        .addClass('type-option')
        .addClass('custom');
        
    _ui.append(_option);
    
    //var _custom = $('<input type="text" class="' +  this._custom_type_option_classname + '"></input>')
    var _custom = $('<span class="' +  this._custom_type_option_classname + '"></span>')
        .hide()
        .focus(function () {
            this.blur();
        })
        .appendTo(_ui);
    
    var _config = this.menu._$get_config();
    //_custom.tooltip(_config);
    _ui.tooltip(_config);
    
    _custom.mouseover(function () {
        _ui.tooltip().show();
    });
    
    this._custom_type_option = _ui;
    
    return _ui;
};

Type_component.prototype._custom_name = null;

/**
 * 設置自訂類型的名稱
 * @param {String|Annotation_type_param} _name
 */
Type_component.prototype.set_custom_name = function (_name) {
    
    //$.test_msg('Type_component.set_custom_name 1', _name);
    
    if ($.is_string(_name)) {
		_name = $.trim(_name);
	}
	else {
		if ($.is_class(_name, 'Annotation_type_param')) {
			_name = _name.get_type_name();
		}
	}
    if (_name === '') {
		_name = null;
	}
    
    if (this._custom_type_option === null) {
		return this;
	}
    
    var _classname = '.' + this._custom_type_option_classname + ':first';
        
    //$.test_msg('Type_component.set_custom_name 2', [_name, $.isset(_name), (_name != null), _classname]);
    if ($.isset(_name) && _name !== null) {
        //this._type.set_type(_name);
        
        this._custom_type_option.children(_classname)
            //.val(_name)
            .html(_name)
            .css('display', 'inline');
            
        this._custom_type_option.children(':not(' + _classname + ')')
            .hide();
        
    }
    else {   
        this._custom_type_option.find(_classname)
            //.val('')
            .html('')
            .hide();
        this._custom_type_option.children(':not(' + _classname + ')')
            .css('display', 'inline');
    }
    return this;
};

/**
 * 重設自訂類型的名稱
 */
Type_component.prototype.reset_custom_name = function () {
    
    if (this._custom_type_option === null) {
		return this;
	}
    
    return this.set_custom_name();
};

/* End of file Type_component */
/* Location: ./system/application/views/web_apps/Type_component.js */