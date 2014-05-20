/**
 * List_item
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/30 上午 11:23:45
 * @extends {Multi_event_dispatcher}
 * @param {Annotation_param} _param
 */
function List_item(_param) {
    
    Multi_event_dispatcher.call(this);
    
    if ($.isset(_param)) {
        this.set_annotation_param(_param);
        
        if ($.browser.msie) {
            this._menu_style_default = 'block';
        }
    }
}

// Extend from KALS_user_interface
List_item.prototype = new Multi_event_dispatcher();

/**
 * @type {Annotation_param}
 */
List_item.prototype._annotation_param = null;


// --------
// UI Methods
// --------

List_item.prototype._classname = 'list-item';

/**
 * Create UI
 * @memberOf {List_item}
 * @type {jQuery} UI
 */
List_item.prototype._$create_ui = function () {
    var _this = this;
    
    var _ui = $('<div></div>')
        .addClass(this._classname)
        .addClass('list-item');
    
    if ($.isset(this._annotation_param)) {
        _ui.attr('annotation_id', this._annotation_param.annotation_id);
        
        var _topic_id = this.get_topic_id();
        _ui.attr('topic_id', _topic_id);
    }
    
    var _header = this._setup_header();
    _header.get_ui().appendTo(_ui);
    
	//var _anchor_text = this._setup_anchor_text_component()
	//	.get_ui().appendTo(_ui);
	
    var _note = this._setup_note();
    _note.get_ui().appendTo(_ui);
    
    var _menu_block, _menu_tooltip;
    if (this._menu_style_default === null) {
        _menu_block = this._setup_menu_block();
        _menu_block.get_ui().appendTo(_ui);
        
        _menu_tooltip = this._setup_menu_tooltip();
        _menu_tooltip.get_ui().appendTo(_ui);
    }
    else if (this._menu_style_default === 'block') {
        _menu_block = this._setup_menu_block();
        _menu_block.get_ui().appendTo(_ui);
    }
    
    _ui.mouseover(function() {
        _this.focus(false);
    });
    _ui.mouseout(function () {
        _this.blur();
    }); 
    
    // @20130609 Pudding Chen
    // 只有在不顯示全文的情況下，按下內容才會顯示thread
    if (this._note_show_fulltext === false) {
        _ui.find(".name-container, .type-container, .list-note-component").click(function () {
            _this.view_thread();
        });
    }       
	
    setTimeout(function() {
        //$.test_msg('List_item._$create_ui()', _config);
        
        if (_this._menu_style_default === null 
            || _this._menu_style_default === 'tooltip') {
            var _config = _menu_tooltip._$get_config();
            _ui.tooltip(_config);        
        }
            
        _this._toggle_menu_style();
    }, 0);
    
    
    this.notify_listeners('set');
    
    /**
     * @version 20140512 Pulipuli Chen
     * 初始化權限監聽器
     */
    setTimeout(function () {
        _this._init_readable_policy_listener();
        _this._init_writable_policy_listener();
    }, 0);
    
    
    //this._ready = true;
    
    return _ui;
};


/**
 * @type {List_header_component}
 */
List_item.prototype.header = null;


/**
 * @type {List_header_component}
 */
List_item.prototype._setup_header = function () {
    var _header = new List_header_component(this);
    this.child('header', _header);
    return _header;
};


/**
 * @type {List_note_component}
 */
List_item.prototype.note = null;

List_item.prototype._note_show_fulltext = false;

/**
 * 設定筆記顯示的元件
 * @type {List_note_component}
 */
List_item.prototype._setup_note = function () {
    var _component = new List_note_component(this, this._note_show_fulltext);
    this.child('note', _component);
    return _component;
};

List_item.prototype._$max_width = 300;

/**
 * 調整筆記的內容
 */
List_item.prototype.adjust_note = function (_callback) {
    if (this.note !== null) {
        this.note.adjust_note(_callback);
    }
    return this;
};

// --------
// Menu
// --------

List_item.prototype.menu_block = null;

List_item.prototype.menu_tooltip = null;

List_item.prototype._menu_style_classname = 'menu-style-block';

List_item.prototype._menu_style_default = null;

List_item.prototype._disable_option = [];

List_item.prototype._setup_menu_block = function () {
    var _component = new List_menu_block(this, this._disable_option);
    this.child('menu_block', _component);
    return _component;  
};

List_item.prototype._setup_menu_tooltip = function () {
    var _component = new List_menu_tooltip(this, this._enable_view_thread);
    this.child('menu_tooltip', _component);
    return _component;  
};

/**
 * 茅點文字最大長度
 * @type {int}
 */
List_item.prototype.max_anchor_text_length = 20;

/**
 * 設定Anchor Text
 * @type {List_anchor_text}
 */
List_item.prototype._setup_anchor_text_component = function () {
    var _component = new List_anchor_text_component(this);
    this.child('anchor_text', _component);
    return _component;  
};

List_item.prototype.is_enable = function (_option_name) {
    if (_option_name === null || this._disable_option === null) {
		return true;
	}
	else {
		return ($.inArray(_option_name, this._disable_option) == -1);
	}
};

List_item.prototype._$onviewportmove = function (_ui) {
    
    if ($.is_null(this._menu_style_default)) {
        if ($.is_small_width()) {
            this._toggle_menu_style('block');
        }
        else {
            this._toggle_menu_style('float');
        }   
    }
};

List_item.prototype.get_list_item_ui = function () {
    var _ui = this.get_ui('.list-item:first');
    if (_ui.length === 0) {
		_ui = this.get_ui();
	}
    return _ui;
};

List_item.prototype._toggle_menu_style = function (_style) {
    
    if ($.isset(this._menu_style_default)) {
		_style = this._menu_style_default;
	}
    if ($.is_null(_style) || _style == 'none') {
		return this;
	}
    
    var _block_classname = this._menu_style_classname;
    var _ui = this.get_list_item_ui();
    if (_style == 'block') {
        _ui.addClass(_block_classname);
    }
    else {
        _ui.removeClass(_block_classname);
    }
    return this;
};

// --------
// Other Methods
// --------

/**
 * @param {Annotation_param} _param
 */
List_item.prototype.set_annotation_param = function (_param) {
    this._annotation_param = _param;
    return this;
};

/**
 * 取得標註參數
 * @returns {Annotation_param}
 */
List_item.prototype.get_annotation_param = function () {
    return this._annotation_param;
};

List_item.prototype.get_annotation_id = function () {
    
    if ($.is_class(this._annotation_param, 'Annotation_param')) {
        return this._annotation_param.annotation_id;
    }
    else {
        return null;
    }
};

List_item.prototype.get_topic_param = function () {
    return this.get_annotation_param();
};

List_item.prototype.get_topic_id = function () {
    return this.get_annotation_id();
};

/**
 * 是否是回應
 * @returns {Boolean}
 */
List_item.prototype.is_respond = function () {
    if (this._annotation_param === null) {
        return false;
    }
    else {
        return this._annotation_param.is_respond();
    }
};

List_item.prototype.get_menu_style = function () {
    var _style = 'tooltip';
    
    var _ui = this.get_ui();
    if (_ui.hasClass(this._menu_style_classname)) {
		_style = 'block';
	}
    return _style;
};

/**
 * 取得標註參數
 * @returns {Annotation_param}
 */
List_item.prototype.get_data = function () {
    return this.get_annotation_param();
};

List_item.prototype.set_data = function (_param) {
    this.set_annotation_param(_param);
    this.notify_listeners('set');
    return this;
};

List_item.prototype.editor_set_data = function (_param) {
    return this.set_data(_param);
};

List_item.prototype.get_scope_coll = function () {
    if ($.is_class(this._annotation_param, 'Annotation_param')) {
        return this._annotation_param.scope;
    }
    else {
        return null;
    }
};

/**
 * 選擇指定的位置
 */
List_item.prototype.set_selection = function () {
    var _scope = this.get_scope_coll();
	//$.test_msg('List_item.set_selection', _scope);
    KALS_text.selection.view.set_scope_coll(_scope);
    return this;
};

List_item.prototype.clear_selection = function () {
    KALS_text.selection.view.clear();
    return this;
};

/**
 * 擺放標註位置
 * 
 * @param {Function} _callback 回呼函數
 */
List_item.prototype.select = function (_callback) {
    var _scope = this.get_scope_coll();
    
    var _this = this;
    KALS_text.tool.close(function () {
        //$.test_msg('List_item.select', this.get_annotation_param());
        KALS_text.tool.list.set_focus(_this.get_annotation_param(), true);

        KALS_text.selection.select.set_scope_coll(_scope, _callback);
    });
    
    
    return this;
};

/**
 * 
 * @param {Annotation_list|List_item|Number} _param
 */
List_item.prototype.equals = function (_param) {
    var _annotation_id;
    if ($.is_class(_param, 'Annotation_param')) {
        _annotation_id = _param.annotation_id;
    }
    else if ($.is_number(_param)) {
        _annotation_id = _param;
    }
    else 
    if ($.is_string(_param)) {
        _annotation_id = parseInt(_param, 10);
    }
    else if ($.is_class(_param, 'List_item')) {
        _annotation_id = _param.get_annotation_id();
    }
				
    return (_annotation_id === this.get_annotation_id());
};

List_item.prototype._focus_classname = 'focus';

List_item.prototype.focus = function (_scrollto) {
    
    if ($.is_null(_scrollto)) {
        _scrollto = false;
    }
    
    var _ui = this.get_ui('.list-item:first');
    if (_ui.length === 0) {
        _ui = this.get_ui();
    }
    
    //如果已經是在focus狀態，則不做任何事情
    if (_ui.hasClass(this._focus_classname)) {
        return this;
    }
    
    this.blur_other_focus();
    this.set_selection();
    
    _ui.addClass(this._focus_classname);
    
    if (_scrollto === true) {
        _ui.scrollIntoView();
    }
    return this;
};

/**
 * 寫成靜態物件，用來取消選取範圍的定時器。
 */
List_item._blur_timer = null;

List_item.prototype.blur = function () {
    
    if (List_item._blur_timer !== null) {
		clearTimeout(List_item._blur_timer);
	}
    
    var _this = this;
    List_item._blur_timer = setTimeout(function () {
        _this.blur_other_focus();
        
        List_item._blur_timer = null;
    }, 5000);
};

List_item.prototype.blur_other_focus = function () {
    //先檢查是否有其他的focus
    var _other_focus = this.get_other_focus();
    
    if (_other_focus.length > 0) {
        _other_focus.removeClass(this._focus_classname);
    }
    
    //$.test_msg('List_item.blur_other_focus()', this.clear_selection);
    
    return this.clear_selection();
};

List_item.prototype.get_other_focus = function () {
    //檢查是否有其他的focus
    var _selector = '.' + 'list-item' + '.' + this._focus_classname;
    var _other_focus = $(_selector);
    return _other_focus;
};

List_item.prototype.remove = function () {
    KALS_text.selection.view.clear();
    return KALS_user_interface.prototype.remove.call(this);
};

// ---------
// Edit Respond View
// ---------

List_item.prototype.get_editor = function () {
    return KALS_text.tool.editor_container.editor;
};

List_item.prototype.get_list = function () {
    return KALS_text.tool.list;
};

List_item.prototype.set_editing = function() {
    var _ui = this.get_ui();
    var _editing_classname = 'editing';
    
    if (_ui.hasClass(_editing_classname)) {
		return this;
	}
    
    //將其他為編輯中的item取消
    var _selector = '.' + this._classname + '.' + _editing_classname;
    $(_selector).removeClass(_editing_classname);
    
    _ui.addClass(_editing_classname);
    return this;
};

List_item.prototype.view_thread = function (_callback) {
    
    //$.test_msg('TODO List_item.view_thread()', _callback);
    
    var _content = KALS_text.tool.view;
    var _topic_param = this.get_topic_param();
    _content.set_topic_param(_topic_param);
    KALS_window.setup_window(_content);
    return this;
};

//List_item.prototype._ready = false;

//List_item.prototype.is_ready = function () {
//    return this._ready = true;
//};


List_item.prototype.focus_respond = function (_respond_to_id) {
    
    var _list = this.get_list();
    
    var _result = _list.focus(_respond_to_id, true);
    
    if ($.is_null(_result)
        && this.is_enable('view')) {
        var _content = KALS_text.tool.view;
        _content.set_focus_id(_respond_to_id);
        
        this.view_thread();
    }
    return this;
};

/**
 * 從列表中回應標註
 */
List_item.prototype.respond_annotation = function () {
    
    var _respond_to = this.get_data();
    
    var _editor = this.get_editor();
    
    if ($.isset(_respond_to)) {
        _editor.respond_coll.add_respond_to(_respond_to);
    }
    
    return this;
};

List_item.prototype.edit_annotation = function () {
    
    //var _param = this.get_data();
    //var _editor = this.get_editor();
    
    //_editor.set_editing(_param);
    
    var _editor = this.get_editor();
    
    var _param = this.get_data();
    _editor.set_editing(_param);
    
    _editor.set_editing_item(this);    
    return this;
};

// ---------------------------------

/**
 * 設定Note是否閱讀
 * @param {Boolean} _readable 設定是否可閱讀
 * @returns {List_item.prototype}
 */
List_item.prototype.set_note_readable = function (_readable) {
    this.note.set_readable(_readable);
    return this;
};

/**
 * 是我的標註
 * @returns {Boolean}
 */
List_item.prototype.is_my_annotation = function () {
    return this._annotation_param.is_my_annotation();
};

/**
 * 初始化讀取權限監聽器
 * @returns {List_item}
 */
List_item.prototype._init_readable_policy_listener = function () {
    
    var _readable_policy_name;
    if (this.is_my_annotation() && this.is_respond()) {
        _readable_policy_name = "my_respond_readable";
    }
    else if (this.is_my_annotation() === false) {
        if (this.is_respond()) {
            _readable_policy_name = "other_respond_readable";
        }
        else {
            _readable_policy_name = "other_topic_readable";
        }
    }

    var _this = this;
    if (_readable_policy_name !== undefined) {
        KALS_context.policy.add_attr_listener(_readable_policy_name, function (_policy) {
            var _enable = _policy[_readable_policy_name]();
            _this.set_note_readable(_enable);
        });
    }
    
    return this;
};

/**
 * 初始化撰寫權限監聽器
 * @returns {List_item}
 */
List_item.prototype._init_writable_policy_listener = function () {
    
    var _policy_name;
    if (this.is_my_annotation()) {
        _policy_name = "respond_my_topic_wrtiable";
    }
    else {
        _policy_name = "respond_other_topic_wrtiable";
    }
    
    var _this = this;
    if (_policy_name !== undefined) {
        KALS_context.policy.add_attr_listener(_policy_name, function (_policy) {
            var _enable = _policy[_policy_name]();
            _this.set_respond_writable(_enable);
        });
    }
    return this;
};

/**
 * 設定是否可以撰寫標註
 * @param {Boolean} _readable 設定是否可閱讀
 * @returns {List_item.prototype}
 */
List_item.prototype.set_respond_writable = function (_writable) {
    /*
    var _ui = this.get_ui().find(".list-item:first");
    $.test_msg("List_item.set_respond_writable", [_writable, this._deny_respond_writable_classname]);
    if (_writable === true) {
        _ui.removeClass(this._deny_respond_writable_classname);
    }
    else {
        _ui.addClass(this._deny_respond_writable_classname);
    }
    */
    if (this.menu_block !== null) {
        this.menu_block.set_respond_writable(_writable);
    }
    if (this.menu_tooltip !== null) {
        this.menu_tooltip.set_respond_writable(_writable);
    }
    return this;
};

/* End of file List_item */
/* Location: ./system/application/views/web_apps/List_item.js */