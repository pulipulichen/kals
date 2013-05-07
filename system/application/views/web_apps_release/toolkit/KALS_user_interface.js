/**
 * KALS使用者介面的原形  
 * @memberOf {KALS_user_interface}
 * @class {KALS_user_interface}
 * @return {KALS_user_interface}
 */
function KALS_user_interface() {
    
    this._children = [];
    
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
 * 取得UI
 * @memberOf {KALS_user_interface}
 * @type {jQuery}
 * @param {null|string} _selector 選取UI裡面的特定物件
 */
KALS_user_interface.prototype.get_ui = function (_selector) {
    if (this.has_setup_ui() === false) {
        this._setup_ui();
    }
    
    if (_selector === null) {
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
    return null;
};

/**
 * 利用jQuery的toggle()、show()與hide()來切換UI的顯示狀態 
 * @param {boolean} _display
 */
KALS_user_interface.prototype.toggle_ui = function (_display) {
    var _ui = this.get_ui();
    
    if ($.isset(_ui)) {
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
    if ($.is_string(_class_name)) {
        var _ui = this.get_ui();
        if ($.isset(_ui)) {
			_ui.addClass(_class_name);
		}
    }        
    return this;
};

/**
 * 幫UI移除Class Name
 * @param {String} _class_name
 */
KALS_user_interface.prototype.remove_class = function (_class_name) {
    if ($.is_string(_class_name)) {
        var _ui = this.get_ui();
        if ($.isset(_ui)) {
			_ui.removeClass(_class_name);
		}
    }        
    return this;
};

/**
 * 幫UI切換Class Name
 * @param {String} _class_name
 */
KALS_user_interface.prototype.toggle_class = function (_class_name) {
    if ($.is_string(_class_name)) {
        var _ui = this.get_ui();
        if ($.isset(_ui)) {
			_ui.toggleClass(_class_name);
		}
    }        
    return this;
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
    if (_child !== null) {
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
    if (this.has_child(_name)) {
        var _child = this.child(_name);
        if ($.is_function(_child.get_ui)) {
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
    if (this.has_child(_name)) {
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
    if (_parent === null) {
        return this._parent;
    }
    else {
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
    if (this._ui !== null) {
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

/* End of file KALS_user_interface */
/* Location = ./system/application/views/web_apps/toolkit/KALS_user_interface.js */