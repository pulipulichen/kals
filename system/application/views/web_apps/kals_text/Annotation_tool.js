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
        //.insertBefore($('.selectable-text:first'));
        .appendTo("body");
        
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
        var _ui_top = $.get_offset_top(_ui);
        if (_ui_top < _body_top) {
            _ui.css('top', _body_top + 'px');
        } 
    });
    
    _ui.mouseover(function () {
        $('.draggable-tool.hover').removeClass('hover');
        $(this).addClass('hover');
        //_this.recommend.get_ui().removeClass('tool-hover');
    });
    
    this.setup_view();
    
    this._init_listener(_ui, _topic_list);
    
    this._setup_recommend();
    this._setup_recommend_hint();
    
    /**
     * @author 20140907 Pulipuli
     * 註冊事件，點選文字其他地方關閉時才遞交
     */
    this._listen_submit();
    
    return _ui;
};

/**
 * 初始化要監聽的事件
 * @param {jQuery} _ui 主要物件
 * @param {Topic_list} _topic_list 標題列表
 * @returns {Annotation_tool}
 */
Annotation_tool.prototype._init_listener = function (_ui, _topic_list) {
    
    var _this = this;
    
    var _not_login = 'not-login';
    
    KALS_context.ready(function () {
        KALS_context.auth.add_listener(function (_auth) {
            //if (_auth.is_login_checked()) {
            //if (this._first_open === false) {
            //$.test_msg("gogo close");
            _this.reopen();
            //}
            //}
        });

        KALS_context.policy.add_attr_listener('write', function (_policy) {
            if (_policy.writable()) {
                _ui.removeClass(_not_login);
            }
            else {
                _ui.addClass(_not_login);
            }

            _topic_list.reload();
        }, true);
        
        /**
         * @version 20140702 Pulipuli Chen
         * 如果是pdf2htmlEx，則不啟動自動捲動功能
         */
        KALS_context.site_reform.add_instant_listener(function (_site_reform) {
            var _is_pdf2htmlex = _site_reform.is_site("pdf2htmlEx");
            //$.test_msg("是pdf2htmlEx嗎？", _is_pdf2htmlex);
            _this._scroll_into_enable = (_is_pdf2htmlex === false);
        });
    });
    
    KALS_context.module_ready("KALS_text.selection.select", function(_select) {
        //$.test_msg('Annotation_tool onselect listen', $.isset(_selector));
        _select.add_listener('select', function (_select) {
            //$.test_msg('Annotation_tool onselect listen', $.isset(_selector));
            _this.onselect();
        });

        _select.add_listener('clear', function () {
            _this.onselectcancel();
        });  
    });
    
    return this;
};

Annotation_tool.prototype.setup_list = function () {
    var _component = new Topic_list();
    this.child('list', _component);
	
    var _tool = this;
    //註冊一下
    _component.add_listener(function () {
        //$.test_msg("Annotation_tool.setup_list", [_component.is_totally_loaded(), _component.has_list_item()]);
        
        
//        // 如果讀取已經完成，而且沒有標註的話，則開啟標註
        if (_tool._close_editor_onopen 
                && _component.is_totally_loaded() 
                && _component.has_list_item() === false) {
            _tool.editor_container.toggle_container(true);
        }
        
        //else {
        //	_tool.editor_container.toggle_container(false);
        //}
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

/**
 * 選取後的觸發事件
 * @returns {Annotation_tool}
 */
Annotation_tool.prototype.onselect = function () {
    var _this = this;
    //$.test_msg('Annotation_tool.onselect() before reset');
        
    //$.save_scroll_position();
    
    /**
     * @version 20140703 Pulipuli Chen
     * 改成強制重置容器
     */
    //var _reset_container = false;
    var _reset_container = true;
    
    this.editor_container.reset(function () {
        //$.test_msg('Annotation_tool.onselect() open');
        //_this.open(function() {
        //    $.load_scroll_position();    
        //});
        
        _this.open();
        
    }, _reset_container);
    
    return this;
};

Annotation_tool.prototype.onselectcancel = function () {
    
    //$.test_msg('Annotation_tool.onselectcancel()', typeof(this.close));
    
    return this.close();    
};

/**
 * 是否是第一次開啟
 * @type Boolean
 */
//Annotation_tool.prototype._first_open = true;

/**
 * 是否要在開啟時關閉編輯器
 * @type Boolean
 */
Annotation_tool.prototype._close_editor_onopen = false;

/**
 * 下次開啟時是否要關閉編輯器
 * @type Boolean
 */
Annotation_tool.prototype._once_close_editor = false;

/**
 * 設定下次開啟時關閉編輯器
 * @returns {Annotation_tool}
 */
Annotation_tool.prototype.set_once_close_editor = function () {
    this._once_close_editor = true;
    return this;
};

/**
 * 開啟動作
 * 
 * 覆寫了KALS_modal的open，比較複雜
 * @param {Function} _callback
 * @returns {Annotation_tool}
 */
Annotation_tool.prototype.open = function (_callback) {
    
    this.get_ui().show();
    
    this.setup_position();
    
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
    if (this._close_editor_onopen === true
            || this._once_close_editor === true) {
        //$.test_msg("暫時關閉編輯器", [this._close_editor_onopen, this._once_close_editor]);
        this.editor_container.toggle_container(false);
        this._once_close_editor = false;
    }
	
    KALS_modal.prototype.open.call(this, function () {
        
        _this.scroll_into_view();
        
        //_this._first_open = false;
        $.trigger_callback(_callback);
        
        _this.notify_listeners("open");
    });
    
    return this;
};

/**
 * 重新開啟
 * @param {Function} _callback
 * @returns {Annotation_tool}
 */
Annotation_tool.prototype.reopen = function (_callback) {
    if (this.is_opened()) {
        //$.test_msg("Annotation_tool.reopen");
        var _scope_coll = KALS_text.selection.select.get_scope_coll();
        this.close();
        KALS_text.selection.select.set_scope_coll(_scope_coll);
    }
    return this;
};

/**
 * 捲到可顯示的位置
 * @returns {Annotation_tool}
 */
Annotation_tool.prototype.scroll_into_view = function () {
    //var _offset = this.get_ui().offset();
    
    if (this._scroll_into_enable === false) {
        return this;
    }
    
    var _y;
    //var _offset = $.get_offset(this.get_ui());
    //_y = _offset.top - 60;
    _y = KALS_text.selection.select.get_offset_top() - 60;
    
    var _position = {
        y: _y
    };
	//$.test_msg("Annotation_tool.scroll_into_view", _position);
    $.scroll_to(_position);
    
    return this;
};

/**
 * 是否啟用捲動捲軸的功能
 * @type Boolean
 */
Annotation_tool.prototype._scroll_into_enable = true;

/**
 * 關閉標註工具
 * @param {Function} _callback
 * @returns {Annotation_tool.prototype}
 */
Annotation_tool.prototype.close = function (_callback) {
    
    //$.test_msg("Annotation_tool close", [_param.note, (_note === ""), (_note === null)]);
    
    var _this = this;
    
    var _close_action = function (_overlay_close_action) {
        _this.list.reset();
        
        /**
         * @author Pulipuli 20140907
         * 關閉時，也把編輯器reset
         */
        //_this.editor_container.reset();
        //KALS_modal.prototype.close.call(this, _callback);

        var _ui = _this.get_ui();
        _ui.css('top', '-1000px');
        _ui.css('left', '-1000px');
        _ui.hide();

        //$.test_msg("annotation tool close action");
        
        $.trigger_callback(_callback);
        $.trigger_callback(_overlay_close_action);
        
        setTimeout(function () {
            _this.notify_listeners("close");
        }, 300);
    };
    
    /**
     * 關閉Annotation_tool的時候，檢查是否有note，如果有note則遞交。
     * @deprecated 20140907 不應該從這裡判斷
     * @author 20140907 Pulipuli
     */
//    var _param = this.get_annotation_param();
//    var _note = _param.note;
//    if (_note === null) {
//        _close_action();
//    }
//    else {
////        var _heading_lang = new KALS_language_param(
////                "Your annotation is not saved.",
////                "annotation_tool.close_confirm.annotation_not_save.heading"
////                );
////        var _body_lang = new KALS_language_param(
////                "You have not save this annotation. Do you want to save it?",
////                "annotation_tool.close_confirm.annotation_not_save.body"
////                );
////        
////        KALS_util.confirm(_heading_lang, _body_lang, function (_result, _overlay_close_action) {
////            //return;
////            if (_result === true) {
////                $.test_msg("儲存資料", _this._close_lock);
////                //_this.submit_annotation(function () {
////                    _close_action(_overlay_close_action);
////                //});
////            }
////            else {
////                _close_action(_overlay_close_action);
////            }
////        });
//        _close_action();
//        _this.submit_annotation();
//    }
    
    /**
     * 直接關閉訊息
     * @author 20140907 Pulipuli
     */
    _close_action();
    
    return this;
};

/**
 * 取得正在編輯的標註資料
 * @returns {Annotation_param}
 */
Annotation_tool.prototype.get_annotation_param = function () {
    return this.editor_container.get_annotation_param();
};

/**
 * 儲存標註資料
 * @param {function} _callback
 * @returns {Annotation_tool}
 */
Annotation_tool.prototype.submit_annotation = function (_callback) {
    this.editor_container.submit_annotation(_callback);
    return this;
};

/**
 * 設置標註工具的位置
 */
Annotation_tool.prototype.setup_position = function () {
    
    //$.test_msg('Annotation_tool.setup_position()');
    
    var _ui = this.get_ui();
    if ($.is_tiny_width()) {
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
        if (_mode === 'foot') {
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
        else if ($.is_small_height() === false 
                && _t < KALS_toolbar.get_ui().height()) {
            _t = KALS_toolbar.get_ui().height();
        }
        
        _ui.css('top', _t + 'px')
            .css('left', _l + 'px');
    
        //$.test_msg('Annotation_tool.setup_position() 最後定位', [_t, _l]);
    }
    return this;
};

/**
 * 取得標註工具的寬度
 * @returns {Int}
 */
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

/**
 * 註冊KALS_text，當點選時則進行啟動
 * @author 20140907 Pulipuli
 * @returns {Annotation_tool.prototype}
 */
Annotation_tool.prototype._listen_submit = function () {
    var _this = this;
    this._text.click(function () {
        //if (_this.is_opened() === false) {
        //    return;
        //}
        
        var _note = _this.get_annotation_param().note;
        if (_note !== null && typeof(_note) === "string") {
            $.test_msg("text click submit note=", _note);
            
            _this.submit_annotation();
        }
    });
    return this;
};

/**
 * 是否開啟編輯器
 * @author Pulipuli Chen 20151018
 * @param {boolean} _display
 * @param {function} _callback
 * @returns {Annotation_tool.prototype}
 */
Annotation_tool.prototype.toggle_editor = function (_display, _callback) {
    this.editor_container.toggle_container(_display, _callback);
    return this;
};

/**
 * 重設編輯器
 * @author Pulipuli Chen 20151018
 * @param {Function} _callback
 * @param {Boolean} _reset_container 預設 true
 * @returns {Annotation_tool.prototype}
 */
Annotation_tool.prototype.reset_editor = function (_callback, _reset_container) {
    this.editor_container.reset(_callback, _reset_container);
    return this;
};

/* End of file Annotation_tool */
/* Location: ./system/application/views/web_apps/Annotation_tool.js */