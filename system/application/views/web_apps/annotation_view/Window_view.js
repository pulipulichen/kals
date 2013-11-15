/**
 * Window_view
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/6 下午 10:30:51
 * @extends {Window_content}
 */
function Window_view() {
    
    Window_content.call(this);
    
    var _this = this;
    setTimeout(function () {
        _this.get_ui().appendTo($('body')).hide();
    }, 1000);
}

Window_view.prototype = new Window_content();

Window_view.prototype.name = 'View';

Window_view.prototype.heading = new KALS_language_param (
    'Annotation Thread',
    'window.view.heading'
);

//Window_view.prototype.width = 640;
Window_view.prototype.height = 480;


// --------
// Topic Param
// --------

/**
 * @type {Annotation_param}
 */
Window_view.prototype._topic_param = null;

/**
 * @type {number}
 */
Window_view.prototype._focus_id = null;

Window_view.prototype.set_focus_id = function (_annotation_id) {
	//$.test_msg("view focus", _annotation_id);
    this._focus_id = _annotation_id;
    return this;
};

/**
 * @type {Annotation_param}
 */
Window_view.prototype._respond_param = null;

Window_view.prototype.set_respond_param = function (_param) {
	//$.test_msg("view set respond", _param.annotation_id);
    this._respond_param = _param;
    return this;
};

/**
 * @type {Annotation_param}
 */
Window_view.prototype._edit_param = null;

Window_view.prototype.set_edit_param = function (_param) {
    this._edit_param = _param;
    return this;
};

Window_view.prototype._stop_select = false;

Window_view.prototype.set_stop_select = function () {
    this._stop_select = true;
    return this;
};

Window_view.prototype._temp_logout = false;
Window_view.prototype.set_temp_logout = function () {
    this._temp_logout = true;
    return this;
};


// --------
// Topic Param
// --------

Window_view.prototype._load_url = 'annotation_getter/list';

/**
 * @param {number|Annotation_param} _topic_id
 */
Window_view.prototype.load_topic_param = function (_topic_id) {
    if ($.isset(this._topic_param)) {
		return this;
	}
    
    if ($.is_number(_topic_id) || $.is_string(_topic_id)) {
        try {
            _topic_id = parseInt(_topic_id, 10);
        }
        catch (e) {}
        
        var _data = {
            target_id: _topic_id
        };
        
        var _this = this;
        var _config = {
            url: this._load_url,
            data: _data,
            callback: function (_data) {
                if (typeof(_data.annotation_collection) != 'undefined'
                    && $.is_array(_data.annotation_collection)
                    && _data.annotation_collection.length > 0) {
                    var _topic_data = _data.annotation_collection[0];
                    var _topic_param = new Annotation_param(_data);
                    _this.set_topic_param(_topic_param);    
                }
            }
        };
    }
    else if ($.is_class(_topic_param, 'Annotation_param')) {
        this.set_topic_param(_topic_id);
    }
    
    return this;
};

Window_view.prototype.load_view = function (_annotation_id, _callback) {
    var _this = this;
    
    KALS_text.tool.load_annotation_param(_annotation_id, function (_param) {
        
        if (_param.is_respond() === false) {
            _this.set_topic_param(_param);
            KALS_window.setup_window(_this, function () {
                //KALS_context.hash.set_field('view', _param.annotation_id);
                $.trigger_callback(_callback);
            });
        }
        else {
            var _topic_id = _param.topic.annotation_id;
            
            _this.set_focus_id(_param.annotation_id);
            _this.load_view(_topic_id, function () {
                //KALS_context.hash.set_field('view', _param.annotation_id);
                $.trigger_callback(_callback);
            });
        }
    });
    
    return this;
};

Window_view.prototype.set_topic_param = function (_topic_param) {
    
    this._topic_param = _topic_param;
    
    this.anchor.set_topic_param(_topic_param);
    this.list.set_topic_param(_topic_param);
    this.editor_container.set_topic(_topic_param);
    
    //this.set_selection();
    KALS_context.hash.set_field('view', _topic_param.annotation_id);
    
    return this;
};

Window_view.prototype.set_selection = function () {
    
    if ($.isset(this._topic_param)) {
        var _this = this;
        setTimeout(function () {
            KALS_text.selection.select.set_scope_coll(_this._topic_param.scope);
        }, 1000);
    }
    
    return this;
};

Window_view.prototype.reset = function () {
    
    var _topic_param = this._topic_param; 
    this._topic_param = null;
    this._focus_id = null;
    this._respond_param = null;
    this._modified = false;
    
    this.anchor.reset();
    this.list.reset();
    this.editor_container.reset();
    
    this._loaded = false;
    
    //if (this._modified === true)
    if (KALS_context.policy.writable()) {
        //連帶Annotation_tool的list也reset吧
        var _this = this;
        KALS_text.tool.list.set_focus(_topic_param, true);
        KALS_text.tool.list.reload(function () {
            //KALS_text.tool.list.focus(_topic_param, true);
        });
    }
    else {
        KALS_text.tool.list.focus(_topic_param, true);
    }
    
    KALS_context.hash.delete_field('view');
    
    return this;
};

/*
Window_view.prototype._modified = false;

Window_view.prototype.set_modified = function () {
    this._modified = true;
    return this;
};
*/
Window_view.prototype.onclose = function () {
    this.reset();
};

// --------
// UI
// --------

Window_view.prototype._classname = 'window-view-content';

/**
 * Create UI
 * @memberOf {Window_view}
 * @type {jQuery} UI
 */
Window_view.prototype._$create_ui = function () {
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
Window_view.prototype.anchor = null;

Window_view.prototype._setup_anchor = function () {
    if ($.is_null(this.anchor)) {
        this.anchor = new View_anchor_text_component(this._topic_param);
    }
    return this.anchor;
};

Window_view.prototype._list_container = null;

Window_view.prototype._create_list_container = function () {
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
Window_view.prototype.list = null;

Window_view.prototype._setup_list = function () {
    if ($.is_null(this.list)) {
        this.list = new View_list_collection(this._topic_param);
        
        /*
        var _this = this;
        this.list.add_listener(function (_list) {
            if (_list.is_totally_load())
                _this.onload();
        });
        */
    }
    return this.list;
};

/**
 * @type {View_editor_container}
 */
Window_view.prototype.editor_container = null;

Window_view.prototype._setup_editor_container = function () {
    if ($.is_null(this.editor_container)) {
        var _list = this._setup_list();
        this.editor_container = new View_editor_container(this._topic_param, _list);
    }
    return this.editor_container;
};

Window_view.prototype._loaded = false;

Window_view.prototype.onload = function () {
    
    //$.test_msg('設定！！')
    this.editor_container.editor.note.set_text(' ');    
    
    
    //$.test_msg('Window_view.onload()');
    
    var _focus_anchor = true;
    if ($.isset(this._focus_id)) {
        var _result = this.list.focus(this._focus_id, true);
        //var _result = this.list.focus(this._focus_id);
        //if (_result != null)
        //    _result.get_ui().css('color', 'red');
        
        //$.test_msg('Window_view.onload() focus id', $.isset(_result));
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
    
    $.test_msg("isset respond_param", $.isset(this._respond_param));
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

Window_view.prototype.setup_content = function (_callback) {
    /*    
    var _this = this;
    this.list.add_listener(function (_list) {
       
       $.test_msg('Window_view.setup_content() ', _list.is_ready());
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

Window_view.prototype.focus = function (_param) {
    
    if (this._loaded === false) {
        this.set_focus_id(_param);
    }
    else {
        this.list.focus(_param);
    }
    return this;
};

Window_view.prototype.add_respond_to = function (_param) {
    
    this.editor_container.add_respond_to(_param);
    
    return this;
};

/* End of file Window_view */
/* Location: ./system/application/views/web_apps/Window_view.js */