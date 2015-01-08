/**
 * Policy_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/22 下午 03:07:24
 * @extends {KALS_user_interface}
 * @param {Annotation_editor} _editor
 */
function Policy_component(_editor) {
    
    KALS_user_interface.call(this);
    
    if ($.isset(_editor)) {
        this._editor = _editor;
        this._listen_editor();
    }
    
    this._share_list = null;
    
    this._default_policy_type = this._config_default_policy_type();
}

// Extend from KALS_user_interface
Policy_component.prototype = new KALS_user_interface();

/**
 * @type {Annotation_editor}
 */
Policy_component.prototype._editor = null;

/**
 * 現在的type
 * @type {String}
 */
Policy_component.prototype._policy_type = null;

/**
 * 可用選項。
 * 腰斬掉「share」的這個功能。但是大架構還是要坐上去。
 * @type {String[]}
 */
Policy_component.prototype._policy_type_options = ['public', 'private'];

Policy_component.prototype.get_options = function () {
    return this._policy_type_options;
};

Policy_component.prototype._default_policy_type = 'public';

/**
 * @type {User_collection_param}
 */
Policy_component.prototype._share_list = null;

/**
 * 是否可以變更
 */
Policy_component.prototype._policy_changable = false;

// --------
// UI Methods
// --------

/**
 * Create UI
 * @memberOf {Policy_component}
 * @type {jQuery} UI
 */
Policy_component.prototype._$create_ui = function () {
    var _ui = $('<span></span>')
        .addClass('policy-component');
    
    var _this = this;
    
    for (var _i in this._policy_type_options) {
        var _type = this._policy_type_options[_i];
        
        var _option = $('<span></span>')
            .addClass('policy-option')
            .addClass(_type)
            .hide();
        
        var _lang = new KALS_language_param(
            _type,
            'policy_type.' + _type
        );
        
        KALS_context.lang.add_listener(_option, _lang);
        
        _option.appendTo(_ui);
    }
	
	_ui.click(function () {
        _this.open_window();
    });
    
    setTimeout(function() {
        _this.set_policy_type();
    }, 0);
    
    return _ui;
};

/**
 * 變更權限
 * @param {string|null} _type = this._default_policy_type
 */
Policy_component.prototype.set_policy_type = function(_type) {
    
    if ($.is_null(_type)) {
        _type = this._default_policy_type;
    }
    
    //$.test_msg('set_policy_type', [_type, this._policy_type]);
    
    //防止重複變更
    if (_type === this._policy_type) {
        return this;
    }
    
    this._policy_type = _type;
    
    var _ui = this.get_ui();
    
    //$.test_msg('set_policy_type2', [_type, this._policy_type]);
    
    _ui.children('.policy-option:not(.'+_type+')').hide();
    _ui.children('.policy-option.'+_type).css('display', 'inline');
    
    var _lock_classname = 'lock';
    
    _ui.addClass('test' + _type);
    
    if (_type === 'public') {
        this._share_list = null;
        _ui.removeClass(_lock_classname);
    }
    else if (_type === 'private') {
        
        var _user_coll = new User_collection_param();
        _user_coll.add(KALS_context.user.get_data());
        this._share_list = _user_coll;
        _ui.addClass(_lock_classname);
        //$.test_msg('Policy.set_policy_type', _type);
    }
    else if (_type === 'share') {
        _ui.addClass(_lock_classname);
    }
    
    return this;
};

Policy_component.prototype.get_policy_type = function () {
    return this._policy_type;
};


Policy_component.prototype.get_default_type = function () {
    return this._default_policy_type;
};


// --------
// Attributes Methods
// --------

Policy_component.prototype.set_policy_changable = function (_changable) {
    
    //$.test_msg("set_policy_changable", [_changable, this._config_policy_changable()]);
    
    if (_changable === true && this._config_policy_changable() === false) {
		_changable = false;
	}
    
    
    this._policy_changable = _changable;
    
    var _ui = this.get_ui();
    var _deny_change_classname = 'deny-change';
    
    if (_changable === false) {
        _ui.addClass(_deny_change_classname);    
    }
    else {
        _ui.removeClass(_deny_change_classname);
    }
    return this;
};

Policy_component.prototype.set_share_list = function (_user_coll, _policy_type) {
    
    if ($.is_class(_user_coll, 'User_collection_param')) {
        this._share_list = _user_coll;
        this.set_policy_type('share');
    }
    /*
    else if (_policy_type == 'private') {
        //什麼都不做！
    }
    else {
        this._share_list = null;
        this.set_policy_type('public');
    }
    */
    return this;
};

Policy_component.prototype.get_share_list = function () {
    return this._share_list;
};

Policy_component.prototype.get_data = function () {
    
    var _data = {
        policy_type: this.get_policy_type(),
        share_list: this.get_share_list()
    };
    return _data;
};

Policy_component.prototype.reset = function () {
    return this.set_policy_type(this._default_policy_type);
};

Policy_component.prototype._listen_editor = function () {
    
    var _this = this;
    
    this._editor.add_listener('reset', function () {
        _this.reset();
    });
    
    this._editor.add_listener('set', function (_editor, _param) {
        _this.set_data(_param);
    });
    
    this._editor.add_listener('get', function (_editor, _param) {
        
        var _policy_type = _this.get_policy_type();
        
        //如果是預設值，則由伺服器端去取得預設值
        if (_policy_type != this._default_policy_type) {
            //var _policy_type_id = _this.filter_policy_type_id(_policy_type);
            _param.policy_type = _policy_type;
        }
        
        //要注意到，如果type='private'，則是由伺服器端去設定只有該使用者才擁有readable的權限。而不是從這邊指名share_list為該使用者。
        var _share_list = _this.get_share_list();
        if ($.isset(_share_list) && _policy_type == 'share') {
			_param.share_list = _share_list;
		}
    });
};

/**
 * 過濾Policy_type變成簡單的ID
 * 1    public
 * 2    private
 * 3    share
 * @deprecated 2010.11.2 交給Annotation_param去做
 * @param {Object} _policy_type
 */
/*
Policy_component.prototype.filter_policy_type_id = function (_policy_type) {
    if (_policy_type == 'public') {
        return 1;
    }
    else if (_policy_type == 'private') {
        return 2;
    }
    else if (_policy_type == 'share')
        return 3;
    }
    else {
        return 1;
    }
        
};
*/

/**
 * 從Annotation_param設置資料
 * @param {Annotation_param} _annotation_param
 */
Policy_component.prototype.set_data = function (_annotation_param) {
    if ($.is_null(_annotation_param)) {
		return this;
	}

    var _policy_type = _annotation_param.policy_type;
    //$.test_msg('Policy.set_data()', [_policy_type, typeof(_policy_type)]);
    this.set_policy_type(_policy_type);
    
    var _share_list = _annotation_param.share_list;
    if ($.isset(_share_list)) {
		this.set_share_list(_share_list);
	}
    
    return this;
};

/**
 * 開啟視窗
 */
Policy_component.prototype.open_window = function () {
    
    //$.test_msg('Policy_component.open_window()', this._policy_changable);
    
    if (this._policy_changable === false) {
		return this;
	}
    
    var _content = new Window_policy(this);
    
    KALS_window.setup_window(_content);
    
    return this;
};

/**
 * 確認KALS_CONFIG是否有預設的權限，有的話則把這個權限功能鎖死
 * @version 2011/11/3 Pudding Chen
 */
Policy_component.prototype._config_default_policy_type = function () {
    return KALS_CONFIG.default_policy_type;
};

Policy_component.prototype._config_policy_changable = function () {
    return KALS_CONFIG.policy_changable;
};

/* End of file Policy_component */
/* Location: ./system/application/views/web_apps/Policy_component.js */