/**
 * KALS使用者介面的原形  
 * @memberOf {KALS_user_interface}
 * @class {KALS_user_interface}
 * @return {KALS_user_interface}
 */
function KALS_user_interface() {
    
    this._children = [];
    
	this._kals_attrs = KALS_context.temp.get_kals_attrs();
}

/**
 * UI的本體
 * @property {jQuery}
 * @memberOf {KALS_user_interface}
 * @private
 */
KALS_user_interface.prototype._ui = null;

/**
 * 父物件
 * @type {KALS_user_interface}
 * @private
 */
KALS_user_interface.prototype._parent = null;

/**
 * 子物件
 * @type {Array}
 * @private
 */
KALS_user_interface.prototype._children = [];

/**
 * 保存資料的欄位
 * @type {JSON}
 */
KALS_user_interface.prototype._data = {};

/**
 * 取得UI
 * @memberOf {KALS_user_interface}
 * @type {jQuery}
 * @param {null|string} _selector 選取UI裡面的特定物件
 */
KALS_user_interface.prototype.get_ui = function (_selector) {
    if (this.has_setup_ui() === false)
    {
        this._setup_ui();
    }
    
    if (_selector === undefined  || _selector === null) {
		return this._ui;
	}
	else {
		return this._ui.find(_selector);
	}
};

/**
 * 是否已經建立UI
 * @type {boolean}
 */
KALS_user_interface.prototype.has_setup_ui = function () {
    return (this._ui !== null);
};

/**
 * 建立UI的動作
 */
KALS_user_interface.prototype._setup_ui = function () {
    this._ui = this._$create_ui();
    return this;
};

/**
 * 建立UI的動作，請覆寫它
 * @type {jQuery}
 */
KALS_user_interface.prototype._$create_ui = function () {
    var _ui = this._load_template();
    //$.test_msg('KALS_modal', _ui);
    if (_ui === null) {
        _ui = this._$create_ui_prototype(); 
    }
    return _ui;
};

/**
 * 建立Modal的原形物件
 * @memberOf {KALS_user_interface}
 * @param {string|jQuery|null} _element = div 可以指定原形物件的標籤名稱
 * @type {jQuery}
 */
KALS_user_interface.prototype._$create_ui_prototype = function (_element) {
    
    var _ui;
    if ($.is_null(_element)) {
        _element = 'div';
    }
    
    if ($.is_string(_element)) {
        _ui = $('<' + _element + '></' + _element + '>');
    }
    else {
        _ui =  $(_element);
    }
    
    _ui.addClass(this.class_name)
        .hide()
        .appendTo($('body'));
    
    return _ui;
};

/**
 * 讀取指定的樣板
 * @type {jQuery}
 */
KALS_user_interface.prototype._load_template = function () {
    if (typeof(KALS_context) !== 'undefined' && KALS_context.template !== null) {
        return KALS_context.template.get_template(this._$template);
    }
    else {
        return null;
    }
};


/**
 * 樣板編號
 * 如果有設定的話，預設就會載入樣板
 * @type {String}
 */
KALS_user_interface.prototype._$template = null;

/**
 * 利用jQuery的toggle()、show()與hide()來切換UI的顯示狀態 
 * @param {boolean} _display
 */
KALS_user_interface.prototype.toggle_ui = function (_display) {
    var _ui = this.get_ui();
    
    if ($.isset(_ui))
    {
        if ($.is_null(_display)) {
			_ui.toggle();
		}
		else 
			if (_display === true) {
				_ui.show();
			}
			else {
				_ui.hide();
			}
    }
    
    return this;
};

/**
 * 檢查UI是否可以看到
 * @type {boolean}
 */
KALS_user_interface.prototype.visible = function () {
    var _ui = this.get_ui();
    
    return _ui.visible();
};

/**
 * 幫UI加上Class Name
 * @param {String} _class_name
 */
KALS_user_interface.prototype.add_class = function (_class_name) {
    if ($.is_string(_class_name))
    {
        var _ui = this.get_ui();
        if ($.isset(_ui)) {
			_ui.addClass(_class_name);
		}
    }        
    return this;
};

KALS_user_interface.prototype.addClass = function (_class_name) {
	return this.add_class(_class_name);
};

/**
 * 幫UI移除Class Name
 * @param {String} _class_name
 */
KALS_user_interface.prototype.remove_class = function (_class_name) {
    if ($.is_string(_class_name))
    {
        var _ui = this.get_ui();
        if ($.isset(_ui)) {
			_ui.removeClass(_class_name);
		}
    }        
    return this;
};

/**
 * ----------------------------------------------------------
 * KALS_user_interface 模仿jQuery的行為
 * ----------------------------------------------------------
 */

KALS_user_interface.prototype.removeClass = function (_class_name) {
    return this.remove_class(_class_name);
};

/**
 * 幫UI切換Class Name
 * @param {String} _class_name
 */
KALS_user_interface.prototype.toggle_class = function (_class_name) {
    if ($.is_string(_class_name))
    {
        var _ui = this.get_ui();
        if ($.isset(_ui)) {
			_ui.toggleClass(_class_name);
		}
    }        
    return this;
};

KALS_user_interface.prototype.toggleClass = function (_class_name) {
    return this.toggle_class(_class_name);
};

/**
 * 是否有子物件
 * @param {string} _name
 * @type {boolean}
 */
KALS_user_interface.prototype.has_child = function (_name) {
    //return (typeof(this._children[_name]) != 'undefined'
    //    && this._children[_name] != null);
    return (typeof(this._children[_name]) != 'undefined');
};

/**
 * 取得子物件，或是新增子物件
 * @param {string} _name
 * @param {KALS_user_interface|null} _child
 * @type {KALS_user_interface}
 */
KALS_user_interface.prototype.child = function (_name, _child) {
    if (_child !== undefined &&  _child !== null) {
        if (this.has_child(_name) === false) {
            this[_name] = _child;
            this._children[_name] = _child;
            //$.test_msg('child', [_name, $.get_class(_child)]);
            
            if (typeof(_child.parent) == 'function') {
				_child.parent(this);
			}
        }
        return this;
    }
    else {
        _child = null;
        if (this.has_child(_name)) {
            _child = this._children[_name];
        }
        return _child;    
    }
};

/**
 * 取得子物件的UI
 * @class KALS_user_interface
 * @memberOf KALS_user_interface
 * @param {string} _name
 * @type {jQuery}
 */
KALS_user_interface.prototype.child_ui = function (_name) {
    
    var _ui = null;
    if (this.has_child(_name))
    {
        var _child = this.child(_name);
        if ($.is_function(_child.get_ui))
        {
            _ui = _child.get_ui();
        }
    }
    return _ui;
};

/**
 * 移除子物件
 * @param {string} _name
 */
KALS_user_interface.prototype.remove_child = function (_name) {
    if (this.has_child(_name))
    {
        this._children[_name].remove_parent();
        delete this._children[_name];
    }
    return this;
};

/**
 * 建立父物件，或是取得父物件
 * @param {KALS_user_interface|null} _parent
 */
KALS_user_interface.prototype.parent = function (_parent) {
    if (_parent === undefined || _parent === null) {
        return this._parent;
    } else
    {
        this._parent = _parent;
        return this;
    }
};

/**
 * 移除父物件
 */
KALS_user_interface.prototype.remove_parent = function () {
    this._parent = null;
    return this;
};

/**
 * 移除UI元件
 */
KALS_user_interface.prototype.remove = function () {
    if (this._ui !== null)
    {
        if ($.is_jquery(this._ui)) {
			this._ui.remove();
		}
		else {
			delete this._ui;
		}
        
        this._ui = null;
    }
    return this;
};

/**
 * 等同jQuery的Append
 * @param {Object} _element
 */
KALS_user_interface.prototype.append = function(_element) {
	this.get_ui().append(_element);
	return this;
};

KALS_user_interface.prototype.appendTo = function(_element) {
    this.get_ui().appendTo(_element);
	return this;
};

KALS_user_interface.prototype.prepend = function(_element) {
    this.get_ui().prepend(_element);
	return this;
};

KALS_user_interface.prototype.prependTo = function(_element) {
    this.get_ui().appendTo(_element);
	return this;
};

KALS_user_interface.prototype.after = function(_element) {
    this.get_ui().after(_element);
	return this;
};

KALS_user_interface.prototype.insertAfter = function(_element) {
    this.get_ui().after(_element);
	return this;
};

KALS_user_interface.prototype.before = function(_element) {
    this.get_ui().after(_element);
	return this;
};

KALS_user_interface.prototype.insertBefore = function(_element) {
    this.get_ui().after(_element);
	return this;
};

KALS_user_interface.prototype.find = function(_param) {
    return this.get_ui().find(_param);
};

/**
 * 在UI中設定值
 * @param {String} _field
 * @param {String} _value
 */
KALS_user_interface.prototype.set_field = function (_field, _value) {
	
	// 如果是多個欄位，則使用set_fields
	if ($.is_object(_field)) {
		return this.set_fields(_field);
	}
	
	// 如果是單一欄位，則繼續處理
	this._data[_field] = _value;
	
    this.reset_field_text(_field);
	this.set_field_text(_field, _value);
	
	this.set_field_attrs(_field, _value);
	
	return this;
};

/**
 * 設定下層的值
 * 
 * 下層中不對this._data進行設定
 * @param {String} _field
 * @param {String} _value
 */
KALS_user_interface.prototype.set_sub_field = function (_field, _value) {
    
    // 如果是多個欄位，則使用set_fields
    if ($.is_object(_field)) {
        return this.set_fields(_field);
    }
    
    // 如果是單一欄位，則繼續處理
    
    this.reset_field_text(_field);
    this.set_field_text(_field, _value);
    
    this.set_field_attrs(_field, _value);
    
    return this;
};

/**
 * 設定多個欄位時使用的方式
 * @param {Object} _fields
 */
KALS_user_interface.prototype.set_fields = function (_fields) {
	for (var _field_name in _fields) {
		this.set_field(_field_name, _fields[_field_name]);
	}
};

/**
 * 資料過濾語系節點
 * @param {String} _line
 */
KALS_user_interface.prototype._value_filter_lang = function(_line){
	if ($.starts_with(_line, "kals-lang:")) {
        _line = KALS_context.lang.line(_line);
    }
    return _line;
};


KALS_user_interface.prototype._kals_attrs = {};

/**
 * 設定文字節點
 * @param {String} _field
 * @param {String} _value
 */
KALS_user_interface.prototype.set_field_text = function (_field, _value, _ui) {
	
	if (_ui === undefined) {
		_ui = this.get_ui();
	}
    
	var _this = this;
	var _selector = '['+this._kals_attrs.field+'="'+_field+'"]'; 
	_ui.find(_selector).each(function (_index, _ele) {
        
        _ele = $(_ele);
        //_ele.attr('kals-original-data', _ele.html());
        
		var _parent = _this._get_field_parent(_field, _ele);
		var _i, _child, _parent_clone;
        if ($.is_array(_value)) {
			
            for (_i in _value) {
                _parent_clone = _parent.clone(true);
				
                //var _v = _this._value_filter_lang(_value[_i]);
                _child = _parent_clone.children().children(_selector);
				//_child.html(_v);
				_this.set_sub_field(_field, _value[_i], _parent_clone);
				
                _child.attr(this._kals_attrs.repeat_index, _i);
                _parent_clone.insertBefore(_parent); 
            }
            _parent.remove();
        }
		else if ($.is_object(_value)) {
			for (_i in _value) {
                _parent_clone = _parent.clone(true);
                
				//var _v = _this._value_filter_lang(_i);
                _child = _parent_clone.children().children(_selector);
                //_child.html(_v);
				_this.set_field_text(_field, _i, _parent_clone);
                
				_child.attr(this._kals_attrs.repeat_index, _i);
                _parent_clone.insertBefore(_parent);
				
				var _sub_value = _value[_i];
				if ($.is_object(_sub_value)) {
					
                    //$.test_msg('is_object', _sub_value);
					for (var _sub_field in _sub_value) {
						//$.test_msg('sub_value', [_sub_field, _sub_value[_sub_field]]);
						_this.set_sub_field(_sub_field, _sub_value[_sub_field], _parent_clone);
					}
				}
            }
            _parent.remove();
		}
        else {
            _value = _this._value_filter_lang(_value);
            $(_ele).html(_value);
        }
    }); 
	
	return this;
};

/**
 * 取得上層欄位的資料
 * @param {String} _field
 * @param {jQuery} _ele
 */
KALS_user_interface.prototype._get_field_parent = function (_field, _ele) {
	var _field_parent = _ele.parents("."+this._kals_attrs.field_parent+":first");
	
	var _parent = _field_parent.parents('['+this._kals_attrs.field_repeat+'="'+_field+'"]:first');
	if (_parent.length == 0) {
		_parent = _parent.parent();
	}
	return _parent;
};

/**
 * 設定屬性
 * @param {String} _field
 * @param {String|Object} _value
 */
KALS_user_interface.prototype.set_field_attrs = function (_field, _value) {
	var _attr_names = KALS_context.template.get_attr_names();
	for (var _i in _attr_names) {
        var _attr_name = _attr_names[_i];
		this.set_field_attr(_field, _value, _attr_name);
    }
	return this;
}; 

/**
 * 設定指定的屬性
 * @param {String} _field
 * @param {String} _value
 */
KALS_user_interface.prototype.set_field_attr = function (_field, _value, _attr_name) {
    var _ui = this.get_ui();
    var _this = this;
    var _find = "{{" + _field + "}}";
    _ui.find('['+this._kals_attrs.attr_prefix+_attr_name+'*="'+_field+'"]').each(function (_index, _ele) {
        
        var _jquery_ele = $(_ele);
        
		if ($.is_object(_value)) {
			for (var _i in _value) {
				_this.set_field(_i, _value[_i], _jquery_ele);
			}
		}
		else {
			var _original_value = _jquery_ele.attr(_attr_name);
            
            var _text = _original_value.replace(new RegExp(_find, 'g'), _value);
            //alert(_text);
            _jquery_ele.attr(_attr_name, _text);
		}
    });
	
    return this;
};

/**
 * 重設屬性
 * @param {String} _field
 * @param {String} _value
 */
KALS_user_interface.prototype.reset_field_attr = function (_field, _attr_name) {
    var _ui = this.get_ui();
    
    var _find = "{{" + _field + "}}";
    _ui.find('['+ this._kals_attrs.attr_prefix+_attr_name+'*="'+_field+'"]').each(function (_index, _ele) {
        
        var _jquery_ele = $(_ele);
        
		var _attr_name_origin_value = this._kals_attrs.attr_prefix 
		  + _attr_name 
		  + this._kals_attrs.origin_value_postfix;
        var _original_value = _jquery_ele.attr(_attr_name_origin_value);
        
        //alert(_text);
        _jquery_ele.attr(_attr_name, _original_value);
    });
    
    return this;
};

/**
 * 重設欄位資料
 * @param {String} _field
 */
KALS_user_interface.prototype.reset_field_text = function (_field) {
	var _ui = this.get_ui();
    
    //$.test_msg('reset: ' + '[kals-field="'+_field+'"', _ui.find('[kals-field="'+_field+'"').length);
	
	var _repeat_index = this._kals_attrs.repeat_index;
	var _field_origin_value = this._kals_attrs.field
	   + this._kals_attrs.origin_value_postfix;
	var _this = this;
	this.find('[kals-field="'+_field+'"]').each(function (_index, _ele) {
		_ele = $(_ele);
		if (_ele.hasAttr(_repeat_index) && _ele.attr(_repeat_index) !== '0') {
			var _parent = _this._get_field_parent(_field, _ele); 
			_parent.remove();
			return;
		}
		
		_ele.html(_ele.attr(_field_origin_value));
	});
	
	return this;
};



/**
 * 取得UI中的設定值
 * @param {String} _field
 */
KALS_user_interface.prototype.get_field = function (_field) {
	/*
    var _ui = this.get_ui();
    
	var _data;
	var _fields = _ui.find('['+this._kals_attrs.field+'="'+_field+'"]');
	if (_fields.length === 1) {
		_data = _field.eq(0).html();
	}
	else if (_fields.length > 1) {
		_data = [];
		for (var _i = 0; _i < _field.length; _i++) {
			_data.push(_field.eq(_i));
		}
	}
    */
	if (typeof(this._data[_field]) !== undefined) {
		return this._data[_field];
	}
	else {
		return undefined;
	}
};

/* End of file KALS_user_interface */
/* Location = ./system/application/views/web_apps/toolkit/KALS_user_interface.js */