/**
 * Editor_container
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/18 上午 01:00:02
 * @extends {KALS_user_interface}
 * @param {List_collection} _list_coll
 */
function Editor_container(_list_coll) {
    
    KALS_user_interface.call(this);
    
    //this.setup_editor(_list_coll, _policy_changable);
    if ($.isset(_list_coll)) {
        this._list_coll = _list_coll;
    }
}

// Extend from KALS_user_interface
Editor_container.prototype = new KALS_user_interface();

/**
 * 清單。
 * 為了要讓editor跟group_list互動，所以需要設定。
 * @type {List_collection}
 */
Editor_container.prototype._list_coll = null;

/**
 * 可改變權限。給editor的設定。
 * @type {boolean}
 */
Editor_container.prototype._disable_option = [];
//_policy_changable = true;


/**
 * toggle的位置，相對於editor。
 * @type {String}
 */
Editor_container.prototype._toggle_position = 'bottom';

/**
 * 預設的開啟狀態
 * @deprecated Pudding 20151102
 * @tyep boolean true=開啟; false=關閉
 */
Editor_container.prototype._$default_toggle = false;

/**
 * 編輯器。
 * @type {Annotation_editor}
 */
Editor_container.prototype.editor = null;

/**
 * @type {jQuery}
 */
Editor_container.prototype._toggle = null;

/**
 * @param {List_collection} _list_coll
 */
Editor_container.prototype.set_list_coll = function (_list_coll) {
    this._list_coll = _list_coll;
};

/**
 * Create UI
 * @memberOf {Editor_container}
 * @type {jQuery} UI
 */
Editor_container.prototype._$create_ui = function () {
    var _ui = $('<table height="100%" width="100%" cellspacing="0"><tbody>'
            + '</tbody></table>')
        .addClass('editor-container');
    
    var _tbody = _ui.find('tbody:first');
    
    var _container = this._create_container();
    _container.appendTo(_tbody);
    
    var _editor = this._setup_editor();
    //$.test_msg('Editor_container._$create_ui [_editor.get_ui()]');
    var _editor_ui = _editor.get_ui();
    _editor_ui.appendTo(_container.find('td:first'));
    //_editor_ui.hide();
    
    this._create_toggle();
    this._set_toggle_position();
    
    var _deny = this._create_deny_conpoment();
    _deny.appendTo(this._toggle.find('td:first'));
    
    var _deny_write_lang = this._deny_write_lang;
    this.set_deny_message(_deny_write_lang);
    
    this._listen_auth();
    
    var _loading = this._create_loading();
    _loading.appendTo(_container.find('td:first'));

    /**
     * 預先狀態不是由她本人控制
     * @author Pudding 20151018
     */
    //if ($.is_boolean(this._$default_toggle)) {
        //$.test_msg("編輯器設定預設狀態", this._$default_toggle);
    //    this.toggle_container(this._$default_toggle);
    //}
    
    //var _this = this;
	
    //setTimeout(function () {
    //    _this.toggle_deny(true);
    //}, 0);
    
    //this.check_policy();
    
    if (KALS_CONFIG.enable_annotation_editor === false) {
        _ui.hide();
    }
    
    return _ui;
};

/**
 * 建立編輯器
 * @type {Annotation_editor}
 */
Editor_container.prototype._setup_editor = function () {
    
    if ($.is_null(this.editor)) {
        var _list_coll = this._list_coll;
        var _disable_option = this._disable_option;
        var _editor = new Annotation_editor(this, _list_coll, _disable_option);
        _editor.get_ui();
        this.child('editor', _editor);    
    }
    return this.editor;
};

// --------
// Toggle
// --------

Editor_container.prototype._create_toggle = function () {
    
    var _toggle = $('<tr><td></td></tr>')
        .addClass('toggle');
    
    this._toggle = _toggle;
    
    _toggle.find('td')
            .append($('<span class="handler">: : : :</span>'))
            .append($('<span class="deny-message"></span>'));
    
    var _this = this;
    _toggle.click(function () {
        _this.toggle_container();
    });
    
    return _toggle;
};

Editor_container.prototype._set_toggle_position = function (_toggle_position) {
    
    if (_toggle_position === this._toggle_position) {
        return this;
    }
    
    if ($.is_null(_toggle_position)) {
        _toggle_position = this._toggle_position;
    }
     
    var _container = this._container;
    var _toggle_ui = this._toggle;
    var _top_classname = 'top';
       
    if (_toggle_position === 'bottom') {
        _container.after(_toggle_ui);
        _toggle_ui.removeClass(_top_classname);
    }
    else {
        _container.before(_toggle_ui);
        _toggle_ui.addClass(_top_classname);
    }
    
    //$.test_msg('Editor_container.set_toggle_position()', [_toggle_ui.html(), _toggle_position]);
    
    return this;
};

/*
Editor_container.prototype.toggle_editor = function (_display, _callback) {
    
    if (this.has_setup_ui() === false) {
        //$.trigger_callback(_callback);
        return this;
    }
    
    var _editor_ui = this.editor.get_ui();
    var _visible = _editor_ui.visible();
    
    if (_display === null) {
        _display = !(_visible);
    }
    
    var _parent = _editor_ui.parents('.annotation-tool:first');
    var _hide_classname = 'hide-editor';
    
    var _complete = function () {
        setTimeout(function () {
            $.trigger_callback(_callback);    
        }, 0);
    };
    
    if (_display === true && _visible === false) {
        _editor_ui.show();  
        _parent.removeClass(_hide_classname);
    }
    else if (_display === false && _visible === true) {
        _editor_ui.hide();
        _parent.addClass(_hide_classname);
    }
    
    _complete();
    
    return this;
};
*/

/**
 * @type {jQuery}
 */
Editor_container.prototype.get_parent_container = function () {
    return this.get_ui().parents('.annotation-tool:first');
};


/**
 * 取得正在編輯的標註資料
 * @returns {Annotation_param}
 */
Editor_container.prototype.get_annotation_param = function () {
    return this.editor.get_data();
};

/**
 * 儲存標註資料
 * @param {function} _callback
 * @returns {Annotation_tool}
 */
Editor_container.prototype.submit_annotation = function (_callback) {
    this.editor.submit(_callback);
    return this;
};

/**
 * 開關編輯器
 * @author Pulipuli Chen 20151018
 * @param {boolean} _display 是否顯示
 * @param {function} _callback
 */
Editor_container.prototype.toggle_container = function (_display, _callback) {
    //$.test_msg('Editor_container.toggle_container()', _display);
	//$.test_msg('Editor_container.toggle_container()', this.has_setup_ui());
    
    if (KALS_CONFIG.enable_annotation_editor === false) {
        _display = false;
    }
    
    if (this.has_setup_ui() === false) {
        //$.test_msg("Editor_container.prototype.toggle_container this.has_setup_ui()", "還沒準備好");
        //$.trigger_callback(_callback);
        return this;
    }
    
    var _container = this._container;
    
    //$.test_msg('Editor_container.toggle_container() visible', [_display, _visible]);
    var _visible = (_container.css('display') !== 'none');
    
    if (_display === undefined || _display === null) {
        _display = !(_visible);
    }
    
    var _parent = this.get_parent_container();
    
    //$.test_msg('Editor_container.toggle_container() parent', [_parent.length, _display, _visible]);
    
    //return $.trigger_callback(_callback);
    
    // 如果是deny狀態，則強制維持_display = false
    if (this.get_ui().hasClass(this._deny_classname)) {
        //$.test_msg("Editor_container.prototype.toggle_container this.has_setup_ui()", "如果是deny狀態，則強制維持_display = false");
        _display = false;
    }
    
    var _hide_editor_classname = 'hide-editor';
    
    /*
    var _complete = function () {
        $.trigger_callback(_callback);
    };
    */
    var _hide_classname = 'hide';
    
    //$.test_msg("toggle_container", [_display, _visible]);
    if (_display === true && _visible === false) {
        
        this.check_policy();
        
        /*
        if (this._toggle_position == 'bottom')
            _container.slideDown(_complete);
        else if (this._toggle_position == 'top')
            _container.slideUp(_complete);
        else
            _complete();
        */
       
        //$.test_msg('Editor_container.toggle_container() if true', _display);
        
        $.lock_scroll_once();
        _container.show();

        _parent.removeClass(_hide_editor_classname);
        this._toggle.removeClass(_hide_classname);
        
        this.editor.note.focus();
        //setTimeout(function () {
        //}, 1000);
        
        //$.test_msg('Editor_container.toggle_container() if true end', _display);
    }
    else if (_display === false && _visible === true) {
        
        /*
        if (this._toggle_position == 'bottom')
            _container.slideUp(_complete);
        else if (this._toggle_position == 'top')
            _container.slideDown(_complete);
        else
            _complete();
        */
        _container.hide();
        _parent.addClass(_hide_editor_classname);
        this._toggle.addClass(_hide_classname);
        
        //$.test_msg('Editor_container.toggle_container() if false end', _display);
    }
    //else {
        //$.test_msg('Editor_container.toggle_container() 不作任何變更', [_display, _visible]);
    //}
    
    //$.test_msg('Editor_container.toggle_container() before callback', _display);
    
    
    $.trigger_callback(_callback);
    
    return this;
};

Editor_container.prototype.is_container_display = function () {
    var _hide_classname = 'hide';
    return !(this._toggle.hasClass(_hide_classname));
};

/**
 * 未登入前顯示的訊息
 * @type {jQuery}
 */
Editor_container.prototype._deny = null;

/**
 * 未登入前，顯示禁止留言的訊息
 * @return {jQuery} 禁止訊息的元件
 */
Editor_container.prototype._create_deny_conpoment = function () {
    
    var _deny = $('<div></div>')
        .addClass('editor-deny');
    
    var _not_login = $('<span></span>')
        .addClass('not-login')
        .appendTo(_deny);

    var _not_login_lang = new KALS_language_param(
        'If you want to write annotation, please click here to login.',
        'editor_container.deny'
    );
    
    KALS_context.lang.add_listener(_not_login, _not_login_lang);
    
    
    _not_login.click(function () {
        KALS_window.setup_window('Window_login');
    });
    
    // --------
    var _deny_write = $('<span></span>')
        .addClass("deny-message")
        .hide()
        .appendTo(_deny);
    
    
    
    /* 
    var _deny_write_lang = new KALS_language_param(
        'You can not write annotation.',
        'editor_container.deny_write'
    );
    
    KALS_context.lang.add_listener(_deny_write, _deny_write_lang);
    */
    // --------
    
    this._deny = _deny;
    
    return _deny;
    
};

/**
 * 尚未登入的classname
 * @type String
 */
Editor_container.prototype._not_login_classname = "not-login";

/**
 * 讀取中的訊息
 * @type {jQuery}
 */
Editor_container.prototype._loading = null;

/**
 * 建立「讀取中」的顯示訊息元件
 * @returns {jQuery}
 */
Editor_container.prototype._create_loading = function () {
    
    var _loading = $('<div></div>')
            .addClass('editor-loading')
            .addClass('editor-message');
        
    var _lang = new KALS_language_param(
        'Loading...',
        'annotation_editor.loading'
    );
    
    this._loading = _loading;
    
    KALS_context.lang.add_listener(_loading, _lang);
    
    return _loading;
};

/**
 * 包含編輯器與未登入訊息的容器
 * @type {jQuery}
 */
Editor_container.prototype._container = null;


Editor_container.prototype._create_container = function () {
    
    var _container = $('<tr><td class="container-td"></td></tr>')
        .addClass('container');
    
    this._container = _container;
    
    return _container;
};

/**
 * 禁止使用的class name
 * @type String
 */
Editor_container.prototype._deny_classname = "deny";

/**
 * 切換無法禁止留言的功能
 * @param {boolean} _is_deny
 */
Editor_container.prototype.toggle_deny = function (_is_deny) {
    
    var _deny = this._deny;
    var _editor = this.editor.get_ui();
    
    //$.test_msg('Editor_container.toggle_deny() 1', _is_deny);
	
    if ($.is_null(_is_deny) || _is_deny === undefined) {
        //_is_deny = !(_deny.visible());
        _is_deny = (KALS_context.policy.writable() === false);
    }
    
    //$.test_msg('Editor_container.toggle_deny() 2', _is_deny);
    
    //如果是一樣的話，那就不用切換啦
    //if (_is_deny === true 
    //        && _deny.css('display') === 'block') {
    //    return this;
    //}
    
    var _this = this;
	
    // @20130603 Pudding Chen
    // 不知道為什麼加入這段就能正常顯示，非常不能理解
    //_editor.show();
       
    setTimeout(function () {
        var _ui = _this.get_ui();
        if (_is_deny === true) {
            _ui.addClass(_this._deny_classname);
        }
        else {
            _ui.removeClass(_this._deny_classname);
        }
        /*
        _this.toggle_container(false, function () {
            //$.test_msg("Editor_container _is_deny", _is_deny);
            if (_is_deny === true) {
                _deny.show();
                _editor.hide();
                _ui.addClass(_this._deny_classname);
            }
            else {
                _deny.hide();
                _editor.show();
                _ui.removeClass(_this._deny_classname);
            }

            
            // @20130610 Pudding Chen
            // 讓下面的編輯器，重置吧
            _this.editor.reset();

            //$.test_msg("toggle editor_container 2", _this._$default_toggle);
            _this.toggle_container(_this._$default_toggle);
        });
        */
    }, 0);
	    
	
    return this;
};  //Editor_container.prototype.toggle_deny = function (_is_deny) {

/**
 * 禁止寫入的訊息
 * @type KALS_language_param
 */
Editor_container.prototype._deny_write_lang = new KALS_language_param(
    'You can not write annotation.',
    'editor_container.deny_write'
);

/**
 * 設定禁止撰寫的語系
 * @param {KALS_language_param} _lang 
 * @returns {Editor_container}
 */
Editor_container.prototype.set_deny_message = function (_lang) {
    
    var _message = KALS_context.lang.line(_lang);
    //this._deny.find(".deny-message:first").html(_message);
    this._toggle.find(".deny-message:first").html(_message);
    
    return this;
};

Editor_container.prototype.toggle_loading = function (_is_loading) {
    
    var _loading = this._loading;
    var _editor = this.editor.get_ui();
    
    if ($.is_null(_is_loading)) {
        _is_loading = !(_loading.visible());
    }
    
    //$.test_msg('Editor_container.toggle_deny()', _is_deny);
    
    //如果是一樣的話，那就不用切換啦
    if (_is_loading === true 
            && _loading.css('display') === 'block') {
        return this;
    }
    
    var _this = this;
    /*
    this.toggle_container(false, function () {
        if (_is_loading === true) {
            _loading.show();
            _editor.hide();
        }
        else {
            _loading.hide();
            _editor.show();
        }
        
        _this.toggle_container(true);
    });
    */
    if (_is_loading === true) {
        _loading.show();
        _editor.hide();
    }
    else {
        _loading.fadeOut(function () {
            _editor.fadeIn();    
        });
    }
    
    return this;
};

/**
 * 設定監聽器
 * @returns {Editor_container}
 */
Editor_container.prototype._listen_auth = function () {
    
    var _this = this;
    /*
    KALS_context.auth.add_listener(function (_auth, _data) {
        
        //$.test_msg('Editor_container.listen_auth()', [_auth.is_login(), _auth._is_login]);
        
        if (_auth.is_login())
            _this.toggle_deny(false);
        else
            _this.toggle_deny(true);
    }, true);
    */
    
    //var _this = this;
    
    var _check_policy = function () {
        var _auth = KALS_context.auth;
        var _policy = KALS_context.policy;
        
        var _ui = _this.get_ui();
        
        var _deny_write = _this._deny.find(".deny-message");
        var _not_login = _this._deny.find(".not-login");
        
        if (_auth.is_login()) {
            _deny_write.show();
            _not_login.hide();
            _ui.removeClass(_this._not_login_classname);
            
            if (_policy.writable()) {
                _this.toggle_deny(false);
            }
            else {
                _this.toggle_deny(true);
            }
        }
        else {
            _deny_write.hide();
            _not_login.show();
            _ui.addClass(_this._not_login_classname);
        }
        
        
    };
    
    KALS_context.ready(function () {
        KALS_context.auth.add_listener(function(_auth) {
            _check_policy();
        });

        KALS_context.policy.add_attr_listener('write', function (_policy) {
            _check_policy();
        }, true);
    });        
    
    return this;
};

/**
 * 重置編輯容器
 * @param {Function} _callback
 * @param {Boolean} _reset_container 預設 true
 * @returns {Editor_container}
 */
Editor_container.prototype.reset = function (_callback, _reset_container) {
    
    if ($.is_null(_reset_container)) {
        _reset_container = true;
    }
    
    var _container_display;
    if (_reset_container === false) {
        _container_display = this.is_container_display();
    }
    
    this.editor.reset();
    
    //$.test_msg('Editor_contaienr.reset()', _reset_container);
    if (_reset_container === true) {
		
        //$.test_msg("toggle editor_container 3", this._$default_toggle);
        //this.toggle_container(this._$default_toggle, function () {
        //    $.trigger_callback(_callback);
        //});
        $.trigger_callback(_callback);
    }
    else {
        this.toggle_container(_container_display, function () {
            $.trigger_callback(_callback);
        });    
    }
    
    this.check_policy();
    
    return this;
};

// ------------------------
// Context_policy
// ------------------------

/**
 * 設定權限監聽器
 * @returns {Editor_container}
 */
Editor_container.prototype.check_policy = function () {
    
    var _write_topic = (this.editor.is_respond() === false);
    var _respond_to_my_topic = (this.editor.is_respond_to_my_annotation());
    
    var _policy = KALS_context.policy;
    var _policy_enable;
    var _policy_lang;
    if (_write_topic === true) {
        _policy_enable = _policy.topic_writable();
        _policy_lang = new KALS_language_param(
                    "You cannot write annotation",
                    "editor_container.deny.topic_wrtiable"
                );
    } 
    else {
        if (_respond_to_my_topic) {
            //_policy_name = "respond_my_topic_wrtiable";
            _policy_enable = _policy.respond_my_topic_wrtiable();
            _policy_lang = new KALS_language_param(
                    "You cannot respond your annotation",
                    "editor_container.deny.respond_my_topic_wrtiable"
                );
        }
        else {
            //_policy_name = "respond_other_topic_wrtiable";
            _policy_enable = _policy.respond_other_topic_wrtiable();
            _policy_lang = new KALS_language_param(
                    "You cannot respond other's annotation",
                    "editor_container.deny.respond_other_topic_wrtiable"
                );
        }
    }
    
    this.set_writable(_policy_enable, _policy_lang);
    
    return this;
};

/**
 * 設定是否可以撰寫
 * @param {Boolean} _writable
 * @param {KALS_language_param} _deny_lang
 * @returns {Editor_container}
 */
Editor_container.prototype.set_writable = function(_writable, _deny_lang) {
    //$.test_msg("Editor_container.set_writable", [_writable, _deny_lang.line, (_writable === true)]);
    if (_writable === true) {
        this.toggle_deny(false);
    }
    else {
        this.toggle_deny(true);
        //$.test_msg("Editor_container.prototype.set_writable", "toggle_deny()");
        this.toggle_container(false);
        if ($.is_class(_deny_lang, "KALS_langauge_param") ) {
            this.set_deny_message(_deny_lang);
        }
    }
    return this;
};


/**
 * 取得編輯器
 * @returns {Annotation_editor}
 * @author Pudding 20151103
 */
Editor_container.prototype.get_editor = function () {
    return this.editor;
};

/* End of file Editor_container */
/* Location: ./system/application/views/web_apps/Editor_container.js */