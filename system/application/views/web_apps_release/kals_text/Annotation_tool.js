/**
 * Annotation_tool
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/16 下午 09:46:28
 * @extends {Overlay_modal}
 * @param {jQuery} _selector
 */
function Annotation_tool(_selector) {
    
    Overlay_modal.call(this);
    
    if ($.isset(_selector)) {
        this._text = _selector;
        //this.child('list', new Topic_list);
        
        var _this = this;
        setTimeout(function () {
            
            
            //$.test_msg('Annotation_tool onselect listen', $.isset(_selector));
            KALS_text.selection.select.add_listener('select', function () {
                //$.test_msg('Annotation_tool onselect listen', $.isset(_selector));
                
				_this.onselect();
            });
            
            KALS_text.selection.select.add_listener('clear', function () {
                _this.onselectcancel();
            });
            
            _this.get_ui();
            
        }, 0);    
    }
}

Annotation_tool.prototype = new Overlay_modal();


/**
 * 選取的範圍
 * @type {jQuery}
 */
Annotation_tool.prototype._text = null;

Annotation_tool.prototype._$modal_name = 'Annotation_tool';

Annotation_tool.prototype._$exposable = false;

/**
 * 編輯器
 * @type {Editor_container}
 */
Annotation_tool.prototype.editor_container = null;

/**
 * 標註清單
 * @type {Topic_list}
 */
Annotation_tool.prototype.list = null;

/**
 * Create UI
 * @memberOf {Annotation_tool}
 * @type {jQuery} UI
 */
Annotation_tool.prototype._$create_ui = function () {
    //var _ui = $('<table height="100%"><tbody>'
    //        + '<tr><td class="editor"></td></tr>'
    //        + '<tr><td class="list"></td></tr>'
    //        + '</tbody></table>')
    var _ui = $('<div></div>')
        .addClass('annotation-tool')
        .addClass('draggable-tool')
        .addClass('kals-modal')
		.addClass("KALS")
        .hide()
        .appendTo($('body'));
        
    var _config = this._$get_config();
    
    //$.test_msg('Annotation_tool._$create_ui()', _config.onBeforeLoad);
    
    _ui.overlay(_config);
    
    //建立標註列表
    // TODO Annotation_tool._$create_ui() _list_group
    var _topic_list = this.setup_list();
    
    var _editor_tool = $('<div></div>')
        .addClass('editor-tool')
        .appendTo(_ui);
    
    //設置標頭
    var _header = this._create_header_component()
        .appendTo(_editor_tool);
    
    //設置編輯器
    var _editor = this._setup_editor(_topic_list);
    //$.test_msg('Annotation_tool._$create_ui [Editor_container]');
    var _editor_ui = _editor.get_ui();
    _editor_ui.addClass('annotation-tool-editor')
        .appendTo(_editor_tool);
    
    //設置標註列表
    var _topic_list_ui = _topic_list.get_ui();
    _topic_list_ui.addClass('annotation-tool-list')
        .appendTo(_ui);
        
    //2010.10.29 替代 List_collection的設置
    /*
    var _padding = ''
    for (var _i = 0; _i < 20; _i++)
        _padding = _padding + ' '+_i+' <br />';
    _ui.append('<div class="annotation-tool-list">' + _padding + '</div>');
    */
   
    //this.setup_list_menu_tooltip();
   
    //設定可拖曳
    var _draggable_config = {
        handle: 'div.annotation-tool-header'
    };
    
    if ($('body').height() > _ui.height() + 100) {
        _draggable_config.containment = 'parent';
    }
    
    _ui.draggable(_draggable_config);
    
    _ui.bind('dragstop', function(_event) {
        var _body_top = 0;
        if ($.is_small_height() === false) {
			_body_top = KALS_toolbar.get_ui().height();
		}
        if (_ui.offset().top < _body_top) {
			_ui.css('top', _body_top + 'px');
		} 
    });
    
    var _this = this;
    _ui.mouseover(function () {
        $('.draggable-tool.hover').removeClass('hover');
        $(this).addClass('hover');
        //_this.recommend.get_ui().removeClass('tool-hover');
    });
    
    var _not_login = 'not-login';
    
    /*
    KALS_context.auth.add_listener(function (_auth) {
        if (_auth.is_login())
            _ui.removeClass(_not_login);
        else
            _ui.addClass(_not_login);
            
        _topic_list.reload();
    }, true);
    */
    KALS_context.policy.add_attr_listener('write', function (_policy) {
        if (_policy.writable()) {
			_ui.removeClass(_not_login);
		}
		else {
			_ui.addClass(_not_login);
		}
            
        _topic_list.reload();
    }, true);
    
    this.setup_view();
    
    this._setup_recommend();
    this._setup_recommend_hint();
    
    return _ui;
};

Annotation_tool.prototype.setup_list = function () {
    var _component = new Topic_list();
    this.child('list', _component);
	
	var _tool = this;
	//註冊一下
	_component.add_listener(function () {
		if (_component.is_totally_loaded()) {
			_tool.editor_container.toggle_container(true);
		}
    });
    return _component;
};

Annotation_tool.prototype._$get_config = function () {
    
    var _config = Overlay_modal.prototype._$get_config.call(this);
    _config.fixed = false;
    return _config;
};

/**
 * @type {jQuery}
 */
Annotation_tool.prototype._header_component = null;

Annotation_tool.prototype._create_header_component = function () {
    
    var _ui = $('<div></div>')
        .addClass('annotation-tool-header');
    
    var _move = $('<span></span>')
        .addClass('move')
        .addClass('dialog-option')
        .setup_hover()
        .appendTo(_ui);
    
    var _move_lang = new KALS_language_param(
        'MOVE',
        'modal.move'
    );
    
    KALS_context.lang.add_listener(_move, _move_lang);
    
    var _this = this;
    var _close = new Dialog_close_link(function () {
        _this.close();
    });
    _close.get_ui().appendTo(_ui);
    _close.add_class('last');
    
    this._header_component = _ui;
    
    return _ui;
};

/**
 * 設置編輯器
 * @param {Topic_list} _list
 */
Annotation_tool.prototype._setup_editor = function (_list) {
    
    this.child('editor_container', new Editor_container(_list));
    return this.editor_container;
};

/*
Annotation_tool.prototype._$onviewportmove = function (_ui) {
    
    var _this = this;
    setTimeout(function () {
        _this.setup_position();
    }, 10);
    
};
*/

Annotation_tool.prototype.onselect = function () {
    var _this = this;
    //$.test_msg('Annotation_tool.onselect() before reset');
        
    //$.save_scroll_position();
    
    this.editor_container.reset(function () {
        //$.test_msg('Annotation_tool.onselect() open');
        //_this.open(function() {
        //    $.load_scroll_position();    
        //});
        
        _this.open();
        
    }, false);
    
    return this;
};

Annotation_tool.prototype.onselectcancel = function () {
    
    //$.test_msg('Annotation_tool.onselectcancel()', typeof(this.close));
    
    return this.close();    
};

Annotation_tool.prototype.open = function (_callback) {
    
    this.setup_position();
    
	var pos_align = 0;
	//體感模式下使用UI左右判斷式
	if(KALS_CONFIG.reading_mode == "gesture"){
		pos_align = Selection.prototype.get_select_align();
	}
	
	this.setup_position(pos_align);   
    var _scope_coll = KALS_text.selection.select.get_scope_coll();
    this.list.set_scope_coll(_scope_coll);
    
    var _this = this;
    this.list.load_list(function () {
        _this.check_editing();
    });
	
	/**
	 * 20121224 Pulipuli Chen
	 * 開啟時自動關閉Editor_contrainer
	 */
	this.editor_container.toggle_container(false);
	
    KALS_modal.prototype.open.call(this, _callback);
};

Annotation_tool.prototype.close = function (_callback) {
    
    this.list.reset();
    //KALS_modal.prototype.close.call(this, _callback);
    
    var _ui = this.get_ui();
    _ui.css('top', '-1000px');
    _ui.css('left', '-1000px');
    
    $.trigger_callback(_callback);
};

/**
 * 設置標註工具的位置
 */
Annotation_tool.prototype.setup_position = function (_align) {
    
    //$.test_msg('Annotation_tool.setup_position()');
    
    var _ui = this.get_ui();

	//css position fixed
	//體感互動模式下執行左右判斷
	if(KALS_CONFIG.reading_mode == "gesture"){
		
		_ui.css("position","fixed");
		
		if (_align !== undefined) {
			if (_align == 6) {
				_ui.css("top", "50px");
				_ui.css("left","0px");
			}
			else if (_align == 4) {
				//偵測螢幕的高度
				//螢幕高度/2
				// – _ui.height()
				_ui.css("top", "50px");
				
				var _left = $(window).width()-_ui.width();
				_ui.css("left",_left+"px");
			}
			return;
		}
		
	}
		


	if ($.is_small_width()) {
        _ui.css('top', '0px');
        _ui.css('left', '0px');
        return this;
    }
    else {
        var _mode = 'foot';
        
        var _tool_height = _ui.height();
        var _tool_width = _ui.width();
        /**
         * @type {Selection_select} _selection
         */
        var _selection = KALS_text.selection.select;
        
        //檢測是否有要更改_mode
        var _selection_bottom = _selection.get_offset_bottom();
        
        //$.test_msg('Annotation_tool.setup_position() _selection_bottom', _selection_bottom);
        
        //如果沒有選取，就不會有_selection_bottom，也就不用定位
        if (_selection_bottom === null) {
            _ui.css('top', '0px');
            _ui.css('left', '0px');
            _ui.hide();
            return this;
        }
        
        var _body_bottom = $('body').height();
        var _margin_bottom = _body_bottom - _selection_bottom;
        
        //如果底下寬度不足的話
        if (_margin_bottom < _tool_height) {
            var _selection_top = _selection.get_offset_top();
            
            //如果上面寬度夠高，則定位於head
            if (_selection_top > _tool_height) {
                //$.test_msg('Annotation_tool.setup_position() head', [ _margin_bottom, _tool_height, _selection_top ]);
                _mode = 'head';
            }   
            //否則仍定位在foot
        }
        
        var _l, _t, _margin = 10;
        if (_mode == 'foot') {
            _t = _selection_bottom + _margin;
            
            var _last_right = _selection.get_offset_last_right();
            var _left = _selection.get_offset_left();
            var _bottom_width = _last_right - _left;
            
            //$.test_msg([_bottom_width , _tool_width]);
            if (_bottom_width > _tool_width) {
                _l = _last_right - _tool_width;
            }
            else {
                _l = _left; 
            }
        }
        else {
            _t = _selection_top - _tool_height - _margin;
            
            var _first_left = _selection.get_offset_first_left();
            //var _right = _selection.get_offset_right();
            //var _top_width = _right - _first_left;
            
            /*
            if (_top_width > _tool_width) {
                _l = _first_left;
            }
            else {
                _l = _right - _tool_width; 
            }
            */
           
            //2010.11.1 一律置左
            _l = _first_left;
        }
        
        //為了防止超出畫面左右的設置
        var _body_right = $('body').width();
        if (_l < 0) {
            _l = 0;
        }
        else if (_l + _tool_width > _body_right) {
            _l = _body_right - _tool_width;
        }
        
        if (_t < 0) {
			_t = 0;
		}
		else 
			if ($.is_small_height() === false && _t < KALS_toolbar.get_ui().height()) {
				_t = KALS_toolbar.get_ui().height();
			}
        
        _ui.css('top', _t + 'px')
            .css('left', _l + 'px');
    }
};

Annotation_tool.prototype.get_width = function () {
    
    var _ui = this.get_ui();
    return _ui.width();
    
};

// --------
// List_menu_tooltip
// --------

/**
 * @type {List_menu_tooltip}
 */
/*
Annotation_tool.prototype.list_menu_tooltip = null;

Annotation_tool.prototype.setup_list_menu_tooltip = function () {
    var _component = new List_menu_tooltip();
    this.child('list_menu_tooltip', _component);
    return _component;
};
*/

// --------
// Annotation View
// --------

/**
 * @type {Window_view}
 */
Annotation_tool.prototype.view = null;

Annotation_tool.prototype.setup_view = function () {
    if ($.is_null(this.view)) {
        var _view = new Window_view();
        this.child('view', _view);
    }
    return this.view;
};

Annotation_tool.prototype._setup_recommend = function () {
    var _component = new Recommend_tooltip();
    this.child('recommend', _component);
    _component.get_ui();
    return _component;
};

Annotation_tool.prototype._setup_recommend_hint = function () {
    var _component = new Recommend_hint();
    this.child('recommend_hint', _component);
    _component.get_ui();
    return _component;
};

Annotation_tool.prototype.load_annotation_param = function (_annotation_id, _callback) {
    
    if ($.is_string(_annotation_id)) {
        try {
            _annotation_id = parseInt(_annotation_id, 10);
        }
        catch(e) {
            _annotation_id = null;
        }
    }        
    
    if ($.is_null(_annotation_id)) {
        $.trigger_callback(_callback);
        return this;
    }
    else if ($.is_class(_annotation_id, 'Annotation_param')) {
        $.trigger_callback(_callback, _annotation_id);
        return this;
    }
    
    var _load_callback = function (_param) {
        
        if (_param !== false) {
            _param = new Annotation_param(_param);
            $.trigger_callback(_callback, _param);    
        }
        else {
            _exception_handle();
        }
    };
    
    var _exception_handle = function () {
        
        var _exception_heading = new KALS_language_param('Sorry! System has got some trouble!', 'exception.alert.heading');
        var _no_annotaiton = new KALS_language_param (
            'ID {0} Annotation is not found. Maybe it is not existed or deleted.',
            'annotation_tool.load_annotation_param.annotation_not_found',
            _annotation_id
        );
        
        KALS_util.alert(_exception_heading, _no_annotaiton);
    };
    
    var _config = {
        url: 'annotation_getter/load_annotation_param',
        data: _annotation_id,
        callback: _load_callback
    };
    
    KALS_util.ajax_get(_config);
    return this;
};

Annotation_tool.prototype._editing_param = null;

/**
 * 設為編輯對象
 * @param {Object} _editing_param
 */
Annotation_tool.prototype.set_editing_param = function (_editing_param) {
    this._editing_param = _editing_param;
    this.editor_container.toggle_loading(true);
};

Annotation_tool.prototype.check_editing = function () {
    
    if ($.isset(this._editing_param)) {
        var _list_item = this.list.focus(this._editing_param, false);
        
        if ($.isset(_list_item)) {
            _list_item.edit_annotation();
        }
        this.editor_container.toggle_loading(false);
        this._editing_param = null;
    }
    return this;
    
};

/* End of file Annotation_tool */
/* Location: ./system/application/views/web_apps/Annotation_tool.js */