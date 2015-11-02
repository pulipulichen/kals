/**
 * Window_annotation_spot
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2015, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2015/11/2 下午 10:30:51
 * @extends {Window_content}
 */
function Window_annotation_spot() {
    
    Window_content.call(this);
    
    this._initialize_ui();
}

Window_annotation_spot.prototype = new Window_content();

/**
 * 初始化先隱藏視窗
 * @author Pudding 20151102
 * @returns {Window_view.prototype}
 */
Window_annotation_spot.prototype._initialize_ui = function () {
    
    var _this = this;
    setTimeout(function () {
        _this.get_ui().appendTo($('body')).hide();
    }, 1000);
    
    return this;
};

Window_annotation_spot.prototype.name = 'Window_annotation_spot';

Window_annotation_spot.prototype.heading = new KALS_language_param (
    'Annotation Spot Thread',
    'window.annotation_spot.heading'
);

/**
 * 要有一個範圍，可供查詢
 * @type {Scope_collection_param}
 */
Window_annotation_spot.prototype._scope_coll = null;

// --------
// UI
// --------

Window_annotation_spot.prototype._classname = 'window-annotation-spot-content';

/**
 * Create UI
 * @memberOf {Window_annotation_spot}
 * @type {jQuery} UI
 */
Window_annotation_spot.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass(this._classname);
    
    var _container = this._create_list_container();
    _container.appendTo(_ui);
    
    var _anchor = this._setup_anchor();
    _anchor.get_ui().appendTo(_container);
    
    var _list = this._setup_list();
    _list.get_ui().appendTo(_container);
    
    var _editor_container = this._setup_editor_container();
    _editor_container.get_ui().appendTo(_ui);
    
    var _not_login_classname = 'not-login';
    /*
    KALS_context.auth.add_listener(function (_auth) {
        if (_auth.is_login())
            _ui.removeClass(_not_login_classname);
        else
            _ui.addClass(_not_login_classname);
    }, true);
    */
    KALS_context.policy.add_attr_listener('write', function (_policy) {
        if (_policy.writable()) {
            _ui.removeClass(_not_login_classname);
        }
        else {
            _ui.addClass(_not_login_classname);
        }
    }, true);
    
    return _ui;
};


/**
 * @type {View_anchor_text_component}
 */
Window_annotation_spot.prototype.anchor = null;

/**
 * @author Pudding 20151102 修改完成
 * @returns {View_anchor_text_component}
 */
Window_annotation_spot.prototype._setup_anchor = function () {
    if ($.is_null(this.anchor)) {
        this.anchor = new View_anchor_text_component(this._scope_coll);
    }
    return this.anchor;
};

/**
 * 擺放列表的位置
 * @type {jQuery}
 */
Window_annotation_spot.prototype._list_container = null;

Window_annotation_spot.prototype._create_list_container = function () {
    if ($.is_null(this._list_container)) {
        var _ui = $('<div></div>')
            .addClass('view-list-container');
        
        this._list_container = _ui;    
    }
    return this._list_container;
};

/**
 * @type {View_list_collection}
 */
Window_annotation_spot.prototype.list = null;

Window_annotation_spot.prototype._setup_list = function () {
    if ($.is_null(this.list)) {
        this.list = new View_list_collection(this._topic_param);
    }
    return this.list;
};

/**
 * @type {View_editor_container}
 */
Window_annotation_spot.prototype.editor_container = null;

Window_annotation_spot.prototype._setup_editor_container = function () {
    if ($.is_null(this.editor_container)) {
        var _list = this._setup_list();
        this.editor_container = new View_editor_container(this._topic_param, _list);
    }
    return this.editor_container;
};

Window_annotation_spot.prototype._loaded = false;

Window_annotation_spot.prototype.onload = function () {
    
    //$.test_msg('設定！！')
    this.editor_container.editor.note.set_text(' ');    
    
    
    //$.test_msg('Window_annotation_spot.onload()');
    
    var _focus_anchor = true;
    if ($.isset(this._focus_id)) {
        var _result = this.list.focus(this._focus_id, true);
        //var _result = this.list.focus(this._focus_id);
        //if (_result != null)
        //    _result.get_ui().css('color', 'red');
        
        //$.test_msg('Window_annotation_spot.onload() focus id', $.isset(_result));
        //_result.get_ui().css('color', 'red');
        
        if ($.isset(_result)) {
            _focus_anchor = false;
            KALS_context.hash.set_field('view', this._focus_id);
        }
        
        this._focus_id = null;
    }
    
    if (_focus_anchor === true) {
        this.anchor.focus();
    }
    
    //$.test_msg("isset respond_param", $.isset(this._respond_param));
    if ($.isset(this._respond_param)) {

        this.editor_container.add_respond_to(this._respond_param);
        this.editor_container.toggle_container(true);
		
        this._respond_param = null;
    }
    else if ($.isset(this._edit_param)) {
        //var _editor = this.editor_container.editor; 
        //_editor.set_editing(this._edit_param);
        //_editor.set_editing(this._edit_param);

        var _item = this.list.get_list_item(this._edit_param);
        if (_item !== null) {
                _item.edit_annotation();
        }

        this._edit_param = null;
    }            
    
    this._loaded = true;
    
    if (this._stop_select === false) {
        this.set_selection();
    }
    else {
        this._stop_select = false;
    }
    
    var _ui = this.get_ui();
    var _temp_logout = 'temp-logout';
    if (this._temp_logout === true) {
        _ui.addClass(_temp_logout);
        this._temp_logout = false;
    }
    else {
        _ui.removeClass(_temp_logout);
    }
    
    if ($.isset(this._topic_param)) {
        KALS_text.selection.select.set_scope_coll(this._topic_param.scope);
        //KALS_text.selection.select.scroll_into_view();
    }
	
    return this;
};

Window_annotation_spot.prototype.setup_content = function (_callback) {
    /*    
    var _this = this;
    this.list.add_listener(function (_list) {
       
       $.test_msg('Window_annotation_spot.setup_content() ', _list.is_ready());
       if (_list.is_ready()) {
           _this.onload();
       }
        
    });
    */
   
    var _this = this;
    setTimeout(function () {
       Window_content.prototype.setup_content.call(_this, _callback);
       _this.onload();
    }, 500);
    
    return this;
};

// --------
// Public Methods
// --------

Window_annotation_spot.prototype.focus = function (_param) {
    
    if (this._loaded === false) {
        this.set_focus_id(_param);
    }
    else {
        this.list.focus(_param);
    }
    return this;
};

Window_annotation_spot.prototype.add_respond_to = function (_param) {
    
    this.editor_container.add_respond_to(_param);
    
    return this;
};

/* End of file Window_annotation_spot */
/* Location: ./system/application/views/web_apps/Window_annotation_spot.js */