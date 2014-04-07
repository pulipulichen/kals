/**
 * Annotation_editor
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/18 上午 11:45:38
 * @extends {Multi_event_dispatcher}
 * @param {Editor_container} _editor_container
 * @param {List_collection} _list_coll
 * @param {String[]} _disable_option
 */
function Annotation_editor(_editor_container, _list_coll, _disable_option) {
    
    Multi_event_dispatcher.call(this);
    
    if ($.isset(_editor_container)) {
		this._editor_container = _editor_container;
	}
    
    if ($.isset(_list_coll)) {
		this.set_list_coll(_list_coll);
	}
    
    //this.listen_reset();
    //this.setup_note_editor_factory();
    
    if ($.isset(_disable_option)) {
		this._disable_option = _disable_option;
	}
}

Annotation_editor.prototype = new Multi_event_dispatcher();

/**
 * @type {Editor_container}
 */
Annotation_editor.prototype._editor_container = null;

/**
 * 清單。
 * 為了要讓editor跟group_list互動，所以需要設定。
 * @type {List_collection} _list_coll
 */
Annotation_editor.prototype.list_coll = null;

/**
 * 設定目標標註訊息群組
 * @param {List_collection} _list_coll
 */
Annotation_editor.prototype.set_list_coll = function (_list_coll) {
    this.list_coll = _list_coll;
    
    if ($.isset(this.list_coll)) {
        //鎖定該List_item
        var _this = this;
        this.list_coll.add_listener(function (_list_coll) {
            if ($.isset(_this._editing_param)) {
                var _param = _this._editing_param;
                //_list_coll.focus(_param, function (_list_item) {
                //    if ($.isset(_list_item))
                //    {
                //        //_list_item.get_ui().css('color', 'red');
                //        _this._editing_item = _list_item;
                //    }
                //});
                
                //_this.set_editing_item(_list_coll.focus(_param, true));
                _this.set_editing(_param);
            }
        }); 
    }
};


// --------
// Submit
// --------

Annotation_editor.prototype._create_url = 'annotation_setter/create_post';
Annotation_editor.prototype._edit_url = 'annotation_setter/edit_post';

/**
 * @type {Annotation_param}
 */
Annotation_editor.prototype._editing_param = null;

/**
 * @type {List_item}
 */
Annotation_editor.prototype._editing_item = null;

Annotation_editor.prototype._editing_lock = false;

Annotation_editor.prototype._editing_classname = 'editing';

/**
 * @param {Annotation_param} _param
 */
Annotation_editor.prototype.set_editing = function (_param ) {
    //if ($.is_null(_param) || _param.annotation_id === null)
    //    return this;
    
    var _scope_coll = _param.scope;
    
    //分成兩種來看，一種是範圍不同，一種是範圍相同
    
    if (KALS_text.selection.select.equals(_scope_coll)) {
        //this.list_coll.focus(_param, _editing_focus);
        this._editing_param = _param;
        
        var _ui = this.get_ui();
        _ui.addClass(this._editing_classname);
        
        this._editor_container.toggle_container(true);
            
        return this.set_data(_param);
    }
    else {
        this._editing_param = _param;
        this.list_coll.set_editing_param(_param);
        KALS_text.selection.select.set_scope_coll(_scope_coll);
        return this;
    }
    
        
    //if (this.is_enable('editing_focus'))
    //    _editing_focus = true;
    /*
    var _editing_item = this.list_coll.focus(_param, _editing_focus);
    
    if ($.is_null(_editing_item)) {
        var _this = this;
        $.test_msg('Annotation_editor.set_editing() 沒找到item');
        this.list_coll.set_focus(_param, _editing_focus, function (_item) {
            _this.set_editing_item(_item);
        });
        //return this;
    }
    else {
        this.set_editing_item(_editing_item);
    }
    */
};

Annotation_editor.prototype.set_editing_item = function (_item) {
    
    if ($.isset(_item)) {
        this._editing_item = _item;
        this._editing_item.set_editing();    
    }
    
    return this;
};

/**
 * 是否是編輯模式
 * @type {boolean}
 */
Annotation_editor.prototype.is_editing = function () {
    return $.isset(this._editing_param);
};

/**
 * 從各元件取得資料。各元件要跟Annotation_editor註冊，利用傳址的方式，分開各處完成_annotation_param，作法如下：
 * _editor.add_listener('get', function (_editor, _annotation_param) {
 *     //將要增加的資料新增入_annotation_param
 *     //注意，不可以直接覆寫_annotation_param本身。
 * });
 */
Annotation_editor.prototype.get_data = function () {
    
    var _annotation_param = new Annotation_param();
    
    //2010.10.22 不使用user，由伺服器端的session去取得user資料
    //_annotation_param.user = KALS_context.user.get_data();
    
    if (this.is_editing()) {
        _annotation_param.annotation_id = this._editing_param.annotation_id;
    }
    else {
        //在create模式底下，要加入標註範圍的資料
        var _select = KALS_text.selection.select;
        _annotation_param.scope = _select.get_scope_coll();
        
        _annotation_param.feature_location = _select.get_location_feature();
        _annotation_param.feature_recommend_scope = _select.get_recommend_scope_coll();
        //_annotation_param.anchor_text = _select.get_anchor_text();        
    }
    
    _annotation_param.topic = this._topic;
    //$.test_msg('Annotation_editor.get_data()', $.isset(this._topic));
    
    this.notify_listeners('get', _annotation_param);
    
    return _annotation_param;
};

/**
 * 送出標註
 * 
 */
Annotation_editor.prototype.submit = function () {
    
    //讀取中就不設定
    if (this.is_loading() === true) {
		return this;
	}
    
    var _annotation_param = this.get_data();
    
    if (this._check_note(_annotation_param) === false) {
		return this;
	}
    
    var _annotation_json = _annotation_param.export_json();
    
    //檢查取得資料是否正確
    $.test_msg('Annotation_editor.submit()', _annotation_json);
    
    var _load_url;
    var _is_editing_mode = this.is_editing(); 
    if (_is_editing_mode) {
		_load_url = this._edit_url;
	}
	else {
		_load_url = this._create_url;
	}
    
    var _this = this;
    
    var _callback = function (_data) {
        
        //如果已經取消了loading動作，那就不作任何反應。
        if (_this.is_loading() === false) {
			return this;
		}
        
        //補完參數
        _annotation_param.user = KALS_context.user.get_data();
        
        if (_is_editing_mode)    //編輯模式
        {
            if ($.isset(_data)
                && typeof(_data.timestamp) != 'undefined') {
                _annotation_param.timestamp = _data.timestamp;
            }
			var _scope_coll = KALS_text.selection.select.get_scope_coll();
			_annotation_param.scope = _scope_coll;
			
            _this._edit_callback(_annotation_param);
            
            _annotation_param.scope = _this._editing_param.scope;
        }
        else    //新增模式
        {
            if ($.isset(_data)) {
                if (typeof(_data.annotation_id) != 'undefined') {
					_annotation_param.annotation_id = _data.annotation_id;
				}
                
                if (typeof(_data.timestamp) != 'undefined') {
					_annotation_param.timestamp = _data.timestamp;
				}
                    
                if (typeof(_data.recommend) != 'undefined' 
					&& KALS_CONFIG.enable_annotation_recommend === true) {
					_annotation_param.recommend = new Recommend_param(_data.recommend);
				}
                if (typeof(_data.nav) != 'undefined') {
                    //$.test_msg('_data.nav', _data.nav);
                    _annotation_param.navigation_level = _data.nav;
                }
            }
			
            _this._create_callback(_annotation_param);
        }
        
        if (_annotation_param.is_respond() === false) {
            //設置selection
			//$.test_msg("submt之後,檢查標註資料", [_annotation_param.type.get_type_name(), _annotation_param.scope]);
            KALS_text.selection.my_basic.set_scope_coll(_annotation_param.type.get_type_name(), _annotation_param.scope);
            
            //$.test_msg('_data.nav setup', [KALS_context.user.get_anchor_navigation_type(), _annotation_param.get_navigation_level()]);
            if (KALS_context.user.get_anchor_navigation_type() == 'all') {
                //設置指引selection
                KALS_text.selection.navigation.set_scope_coll(_annotation_param.get_navigation_level(), _annotation_param.scope);
            }   
        }
    };
    
    var _get_config = {
        url: _load_url,
        data: _annotation_json,
        callback: _callback,
        retry_wait: 60 * 1000
    };
    
    this.toggle_loading(true, function () {
        
        //2010.10.25 測試時使用，略過伺服器的步驟
        //_callback();return;
        
        KALS_util.ajax_post(_get_config);
    });
    
    return this;
    
};

Annotation_editor.prototype._check_note = function (_annotation_param) {
    
    if (this.is_enable('note_allow_empty')) {
		return true;
	}
    
    if (typeof(_annotation_param.note) == 'undefined' ||
	_annotation_param.note === null) {
		//顯示錯誤
		var _heading = new KALS_language_param('ERROR', 'alert.heading.error');
		
		var _content = new KALS_language_param('You have to write something in note.', 'annotation_editor.note_deny_empty');
		
		var _this = this;
		KALS_util.alert(_heading, _content, function(){
		//_this.note.focus();
		});
		
		return false;
	}
	else {
		return true;
	}
};

/**
 * 建立標註之後，要做的事情包括：
 * 1. 將現在的標註資料加入_list_coll
 * 2. 將該標註的範圍加入KALS_text.selection.my
 * @param {Annotation_param} _annotation_param
 */
Annotation_editor.prototype._create_callback = function (_annotation_param) {
    
    //$.test_msg('Annotation_editor._create_callback()', [_annotation_param.annotation_id, _annotation_param.timestamp, $.is_null(_annotation_param.recommend)]);
    
    //將新增加的資料丟進_list_coll
    var _list_item = this.list_coll.editor_add_list_item(_annotation_param, false);
    this._editing_item = _list_item;
    
    this.toggle_loading(false);
    
    //完成時，要設置notify
    var _notify_lang;
    
    //變成新增模式
    if ($.is_null(_annotation_param.recommend)) {
        //完成時，要設置notify
        _notify_lang = new KALS_language_param(
            'Annotation had been created.',
            'annotation_editor.submit.create_complete'
        );
		
		// @20131115 Pulipuli Chen
		// 不使用編輯模式，改用新增模式
		//this.set_editing(_annotation_param);
		
		this.reset();
    }
    else {
        _notify_lang = new KALS_language_param(
            'Annotation had been created and there is some recommend for you.',
            'annotation_editor.submit.create_complete_with_recommend'
        );
        KALS_text.tool.recommend.setup_recommend(_annotation_param);
    }
    
    KALS_util.notify(_notify_lang);
    
    return this;
};

/**
 * 更新之後的回呼函數。只要更新_list_coll裡面的資料即可。
 * @param {Annotation_param} _annotation_param
 */
Annotation_editor.prototype._edit_callback = function (_annotation_param) {
    
    //$.test_msg('Annotation_editor._edit_callback()', [_annotation_param.timestamp]);
    
    //修改this._editing_item
    if ($.isset(this._editing_item)) {   
        //$.test_msg('Annotation_editor._edit_callback()', _annotation_param.policy_type);
		$.test_msg('Annotation_editor._edit_callback()', _annotation_param);
        this._editing_item.editor_set_data(_annotation_param);
    }
	
    /**
     * 編輯完成之後，還原狀態
     */
    this.reset();
	    
    //完成時，要設置notify
    var _notify_lang = new KALS_language_param(
        'Annotation had been updated.',
        'annotation_editor.submit.edit_complete'
    );
    
    KALS_util.notify(_notify_lang);
    this.toggle_loading(false);
};


// --------
// Event Dispatch
// --------

/**
 * 宣告可以用的事件
 * @type {String[]}
 */
Annotation_editor.prototype._$enable_types = ['reset', 'set'];

/**
 * 重設目前的編輯器
 */
Annotation_editor.prototype.reset = function () {
    
    if (this._editing_lock === false) {
        this.toggle_loading(false);
        
        //this._topic = null;
        this._loading_flag = false;
        this._loading_component.hide();
        
        this._editing_param = null;
        this._editing_item = null;
        var _ui = this.get_ui();
        _ui.removeClass(this._editing_classname);
        
		/**
		 * @20131115 Pulipuli Chen
		 * 改為新增完成之後關閉
		 */
        //this._editor_container.toggle_container(true);
		this._editor_container.toggle_container(this._editor_container._$default_toggle);
        
        return this.notify_listeners('reset');    
    }
    else {
        return this;
    }
};

/**
 * @deprecated 2010.10.21 由Editor_container去決定何時要執行reset。但Annotation_editor底下的子元件還是可以跟它監聽reset事件。
 */
/*
Annotation_editor.prototype.listen_reset = function () {
    
    var _this = this;
    
    //KALS_text.selection.add_listener('cancel_select', function () {
    //    _this.reset();
    //});
};
*/

/**
 * 設置資料。
 * 子元件監聽editor的方式來獲取資料
 * _editor.add_listener('set', function (_editor, _param) {
 *     _this.set_data(_para);
 * })
 * @param {Annotation_param} _param
 */
Annotation_editor.prototype.set_data = function (_param) {
    return this.notify_listeners('set', _param);
};

// --------
// Create UI
// -------

/**
 * Create UI
 * @memberOf {Annotation_editor}
 * @type {jQuery} UI
 */
Annotation_editor.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass('annotation-editor');
        
    var _container = this._create_container();
    _container.appendTo(_ui);
    
    //_ui.html('測試用的編輯器  <br />');
    
    var _user = this._create_user_component();
    _user.appendTo(_container.find('th.left:first'));
    
    var _type = this._setup_type();
    _type.get_ui().appendTo(_container.find('th.left:first'));
    
	// @20130603 Pudding Chen
	// 加入Web Search功能
	var _web_search = new Web_search_component();
	this.web_search = _web_search;
	_web_search.get_ui().appendTo(_container.find('th.left:first'));
	
    var _policy = this._setup_policy();
    _policy.get_ui().appendTo(_container.find('th.right:first'));
    
	// --------
	// 第二列
	
	this._setup_type_hint();
	
	// --------
	// 第三列
	
    var _respond_container = this._create_respond_container()
        .appendTo(_container.find('td.respond:first'));
    
    //$.test_msg('Annotation_editor._$create_ui [setup_note editor]');
    //alert('Annotation_editor._$create_ui [setup_note editor]');
    var _note_editor = this._setup_note_editor();
    _note_editor.get_ui().appendTo(_container.find('td.note:first'));
    
	// ---------
	// 第四列
	
    var _submit = this._create_submit_button()
        .appendTo(_container.find('th.submit:first'));
    
	
    // ---------
    
    var _loading = this._create_loading_component();
    _loading.appendTo(_ui);
    
    var _this = this;
    setTimeout(function () {
        _this._setup_respond();
    }, 0);
    
    return _ui;
};

Annotation_editor.prototype.is_enable = function (_option_name) {
    if (_option_name === null || this._disable_option === null) {
		return true;
	}
	else {
		return ($.inArray(_option_name, this._disable_option) == -1);
	}
};

Annotation_editor.prototype._container = null; 

Annotation_editor.prototype._create_container = function () {
    var _ui = $('<table width="100%" cellspacing="0" cellpadding="0"><tbody>'
            + '<tr class="header">'
                + '<th class="left">&nbsp;</th>'
                + '<th class="right">&nbsp;</th>'
            + '</tr>'
			+ '<tr><td class="annotation-type-hint" colspan="2"></td></tr>'
            + '<tr><td class="respond" colspan="2"></td></tr>'
            + '<tr><td class="note" colspan="2"></td></tr>'
			+ '<tr><th class="submit" colspan="2"></th></tr>'
            + '</tbody></table>')
        .addClass('container');
    
    this._container = _ui;
    
    return _ui;
};

// --------
// Prviate Component
// --------

/**
 * 使用者名稱元件
 * @type {jQuery}
 */
Annotation_editor.prototype._user_component = null;

/**
 * 建立使用者名稱元件
 * @type {jQuery}
 */
Annotation_editor.prototype._create_user_component = function () {
    
    var _user = $('<span></span>')
        .addClass('user-component');
    
    KALS_context.user.add_attr_listener('name', function (_context_user, _name) {
        
        _name = _context_user.get_name(10);
        _user.html(_name);
    }, true);
    
    this._user_component = _user;
    
    return _user;
};

Annotation_editor.prototype._create_submit_button = function () {
    
    var _create_button = $('<button type="submit"></button>')
        .addClass('create')
        .addClass('button dialog-option');
    
    var _create_lang = new KALS_language_param(
        'ADD',
        'annotation_editor.submit.create'
    );
    
    KALS_context.lang.add_listener(_create_button, _create_lang);
    
    var _this = this;
    _create_button.click(function () {
        _this.submit();
    });
    
    var _edit_button = $('<button type="submit"></button>')
        .addClass('edit')
        .addClass('button dialog-option');
    
    var _edit_lang = new KALS_language_param(
        'UPDATE',
        'annotation_editor.submit.edit'
    );
    
    KALS_context.lang.add_listener(_edit_button, _edit_lang);
    
    _edit_button.click(function () {
        _this.submit();
    });
    
    var _cancel_button = $('<button type="button"></button>')
        .addClass('cancel')
        .addClass('button dialog-option');
    
    var _cancel_lang = new KALS_language_param(
        'CANCEL',
        'annotation_editor.submit.cancel'
    );
    
    KALS_context.lang.add_listener(_cancel_button, _cancel_lang);
    
    _cancel_button.click(function () {
        _this.reset();
    });
    
    var _hover_classname = 'hover';
    var _mouseover = function () {
        $(this).addClass(_hover_classname);
    };
    var _mouseout = function () {
        $(this).removeClass(_hover_classname);
    };
    
    _create_button.hover(_mouseover, _mouseout);
    _edit_button.hover(_mouseover, _mouseout);
    _cancel_button.hover(_mouseover, _mouseout);
    
    
    var _ui = $('<span></span>')
        .addClass('submit-container')
        .append(_create_button)
        .append(_edit_button)
        .append(_cancel_button);
    
    return _ui;
    
};

/**
 * @type {jQuery}
 */
Annotation_editor.prototype._loading_component = null;

/**
 * @type {jQuery}
 */
Annotation_editor.prototype._create_loading_component = function () {
    
    var _ui = $('<div></div>')
        .addClass('loading-component');
        
    var _lang = new KALS_language_param(
        'Loading...',
        'annotation_editor.loading'
    );
    
    KALS_context.lang.add_listener(_ui, _lang);
    
    this._loading_component = _ui;
    
    _ui.hide();
    
    return _ui;
};

Annotation_editor.prototype.is_loading = function () {
    //return (this._loading_component.css('display') == 'block');
    return this._loading_flag;
};

Annotation_editor.prototype._loading_flag = false;

Annotation_editor.prototype.toggle_loading = function (_is_loading, _callback) {
    
    if ($.is_function(_is_loading) && $.is_null(_callback)) {
        _callback = _is_loading;
        _is_loading = null;
    }
    
    if (_is_loading === null) {
        _is_loading = (this.is_loading() === false);
    }
    
    
    if (_is_loading == this.is_loading()) {
        $.trigger_callback(_callback);
        return this;
    }
    
    this._loading_flag = _is_loading;
    
    var _complete = function () {
        $.trigger_callback(_callback);
    };
    
    var _container = this._container;
    var _loading = this._loading_component;
    
	//進入讀取狀態
    if (_is_loading === true) {
        //_container.slideUp(function () {
        //    _loading.slideDown(_complete);
        //});
        _container.fadeOut(function () {
            _loading.fadeIn(_complete);
        });
    }
	//讀取完成
    else {
        //_loading.slideUp(function () {
        //    _container.slideDown(_complete);
        //});
        _loading.fadeOut(function () {
            _container.fadeIn(_complete);
        });
    }
    
    return this;
};

// --------
// Type
// --------

/**
 * 標註元件
 * @type {Type_component}
 */
Annotation_editor.prototype.type = null;

/**
 * @type {Type_component}
 */
Annotation_editor.prototype._setup_type = function () {
    
    var _type = new Type_component(this);
    this.child('type', _type);
    return this.type;
};

// --------
// Note Editor
// --------

/**
 * 標註編輯器
 * @type {Note_editor_manager}
 */
Annotation_editor.prototype.note = null;

Annotation_editor.prototype._setup_note_editor = function () {
    
    var _note_editor = new Note_editor_manager(this);
    this.note = _note_editor;
    setTimeout(function () {
        //$.test_msg('Annotation_editor._setup_note_editor [note_editor, initialize]');
        _note_editor.initialize(function () {
            KALS_text.init.complete('Annotation_tool');
        });    
    }, 0);
    
	var _this = this;
	this.type.add_listener(function () {
		_this.note.focus();
	});
    
    return _note_editor;
};

// --------
// Respond
// --------

/**
 * @type {Annotation_param}
 */
Annotation_editor.prototype._topic = null;

/**
 * @type {Annotation_param} _param
 */
Annotation_editor.prototype.set_topic = function (_param) {
	this._topic = _param;
	return this;
};

/**
 * @type {Editor_respond_to_collection}
 */
Annotation_editor.prototype.respond_coll = null;

/**
 * @type {jQuery}
 */
Annotation_editor.prototype._respond_container = null;

Annotation_editor.prototype._create_respond_container = function () {
    var _container = $('<div></div>')
        .addClass('respond-container');
    
    this._respond_container = _container;
    
    return _container;
};

Annotation_editor.prototype._setup_respond = function () {
    
    /*
    var _topic = new Editor_respond_to_topic(this);
    //this.respond_topic = _topic;
    this.child('respond_topic', _topic);
    var _topic_id = _topic.get_ui();
    _topic_id.appendTo(this._respond_container);
    */
    
    var _coll = new Editor_respond_to_collection(this);
    //this.respond_coll = _coll;
    this.child('respond_coll', _coll);
    var _coll_ui = _coll.get_ui();
    _coll_ui.appendTo(this._respond_container);
    
    return this; 
};

// --------
// Policy 
// --------

/**
 * @type {Policy_component}
 */
Annotation_editor.prototype.policy = null;

Annotation_editor.prototype._setup_policy = function() {
    
    var _policy = new Policy_component(this);
    
    var _policy_changable = this.is_enable('policy_changable');
    
    _policy.set_policy_changable(_policy_changable);
    
    this.child('policy', _policy);
    
    return _policy;  
};

// --------
// Web Search
// @copyright 20130603 Pudding Chen 
// --------

/**
 * @type {Web_search_component}
 */
Annotation_editor.prototype.web_search = null;

// --------
// Annotation type hint
// @copyright 20130609 Pudding Chen 
// --------
/**
 * 設定標註類型的說明
 */
Annotation_editor.prototype._setup_type_hint = function () {
	
	var _type_hint = this._container.find("td.annotation-type-hint:first");
	
	this.type.add_listener(function (_type) {
		
		//$.test_msg("Annotation_editor._setup_type_hint()", _type.get_hint());
		
		var _hint = _type.get_hint();
		if ($.is_null(_hint)
			|| typeof(_hint) == "undefined"
			|| _hint === "") {
			_type_hint.hide();
		}
		else {
			_type_hint.show();
			_type_hint.html(_hint);
		}
	});
	
	return this;
};

/* End of file Annotation_editor */
/* Location: ./system/application/views/web_apps/Annotation_editor.js */