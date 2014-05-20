/**
 * Topic_list
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/27 下午 08:51:16
 * @extends {Event_dispatcher}
 */
function Topic_list() {
    
    Event_dispatcher.call(this);
    this._list_colls = [];
}

Topic_list.prototype = new Event_dispatcher();

/**
 * @type {List_collection[]}
 */
Topic_list.prototype._list_colls = [];

/**
 * @type {List_collection_my}
 */
Topic_list.prototype.my = null;

/**
 * Create UI
 * @memberOf {Topic_list}
 * @type {jQuery} UI
 */
Topic_list.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass('topic-list');
    
    var _loading = this._create_loading_component();
    _loading.appendTo(_ui);
    
    var _my = new List_collection_my();
    _my.get_ui().appendTo(_ui);
    this._list_colls.push(_my);
    this.child('my', _my);
    
    var _like = new List_collection_like();
	var _like_ui = _like.get_ui();
    _like_ui.appendTo(_ui);
    this._list_colls.push(_like);
    
    var _other = new List_collection_other();
	var _other_ui = _other.get_ui();
    _other_ui.appendTo(_ui);
    this._list_colls.push(_other);
	
    var _anonymous = new List_collection_anonymous();
	var _anonymous_ui = _anonymous.get_ui(); 
    _anonymous_ui.appendTo(_ui);
    this._list_colls.push(_anonymous);
    
	// @20130603 Pudding Chen
	// Isolation Mode
	if (KALS_context.policy.allow_show_navigation() === false) {
		_like_ui.hide();
		_other_ui.hide();
		_anonymous_ui.hide();
	}
	
    var _blank = this._create_blank_component();
    _blank.appendTo(_ui);
    
    var _complete = this._create_complete_component();
    _complete.appendTo(_ui);
    
    var _this = this;
    
    var _endless_scroll_callback = function (p) {
        if (_this.is_totally_loaded() === false) {
            if (_this.is_loading() === false) {
                clearTimeout(_this._endless_scroll_timer);
                _this._endless_scroll_timer = null;
                
                _this.load_list();
            }
            else {
                _this._endless_scroll_timer = setTimeout(_endless_scroll_callback, 3000);
            }
        }
        else {
            clearTimeout(_this._endless_scroll_timer);
            _this._endless_scroll_timer = null;
        }   
    };
    
    _ui.endlessScroll({
        bottomPixels: 50,
        fireOnce: false,
        fireDelay: false,
        callback: _endless_scroll_callback 
    });
    
    return _ui;
};

Topic_list.prototype._endless_scroll_timer = null;

// --------
// UI Components
// --------

Topic_list.prototype._loading_component = null;

Topic_list.prototype._create_loading_component = function () {
    var _ui = $('<div></div>')
        .addClass('topic-list-loading');
        
    var _lang = new KALS_language_param(
        'NOW LOADING',
        'list_collection.loading'
    );
    
    KALS_context.lang.add_listener(_ui, _lang);
    
    this._loading_component = _ui;
    
    return _ui;
};

Topic_list.prototype._toggle_loading = function (_is_loading, _callback) {
    
    var _loading_classname = 'loading';
    var _ui = this.get_ui();
    
    if ($.is_null(_is_loading)) {
		_is_loading = !(_ui.hasClass(_loading_classname));
	}
        
    if (_is_loading === true) {
		_ui.addClass(_loading_classname);
	}
	else {
		this._loading_component.slideUp(function(){
			$(this).removeAttr('style');
			_ui.removeClass(_loading_classname);
			$.trigger_callback(_callback);
		});
	}        
    
    return this;
};

Topic_list.prototype.is_loading = function () {
    var _loading_classname = 'loading';
    var _ui = this.get_ui();
    return _ui.hasClass(_loading_classname);
};

Topic_list.prototype._complete_component = null;

Topic_list.prototype._create_complete_component = function () {
    var _ui = $('<div></div>')
        .addClass('topic-list-complete');
        
    var _lang = new KALS_language_param(
        'THERE IS ALL.',
        'list_collection.complete'
    );
    
    KALS_context.lang.add_listener(_ui, _lang);
    
    this._complete_component = _ui;
        
    return _ui;
};

Topic_list.prototype._toggle_complete = function (_is_complete) {
    
    var _classname = 'complete';
    var _ui = this.get_ui();
    
    if ($.is_null(_is_complete)) {
		_is_complete = !(_ui.hasClass(_classname));
	}
        
    if (_is_complete === true) {
        this._complete_component.hide();
        _ui.addClass(_classname);
        this._complete_component.fadeIn('fast', function () {
            $(this).removeAttr('style');
        });
        
    }   
    else {
        _ui.removeClass(_classname);
    }   
    
    return this;
};

Topic_list.prototype._blank_component = null;

Topic_list.prototype._create_blank_component = function () {
    var _ui = $('<div></div>')
        .addClass('topic-list-blank');
        
    var _lang = new KALS_language_param(
        'There is no annotation.',
        'list_collection.blank'
    );
    
    KALS_context.lang.add_listener(_ui, _lang);
    
    this._blank_component = _ui;
    
    return _ui;
};

Topic_list.prototype._toggle_blank = function (_is_blank) {
    
    var _classname = 'blank';
    var _ui = this.get_ui();
    
    if ($.is_null(_is_blank)) {
		_is_blank = !(_ui.hasClass(_classname));
	}
        
    if (_is_blank === true) {
		this._blank_component.hide();
		_ui.addClass(_classname);
		this._blank_component.fadeIn('fast', function(){
			$(this).removeAttr('style');
		});
	}
	else {
		_ui.removeClass(_classname);
	}
    
    return this;
};

Topic_list.prototype.is_totally_loaded = function () {
    for (var _i in this._list_colls) {
        var _coll = this._list_colls[_i];
        if (_coll.is_totally_loaded() === false) {
            //$.test_msg(_coll._$name);
            return false;
        }
    }
    return true;
};

// --------
// Methods
// --------

/**
 * 
 * @param {Annotation_param|Number} _param
 * @type {List_item}
 */
Topic_list.prototype.focus = function(_param, _scollto) {
    this.reset_focus();
    
    //$.test_msg('Topic_list.focus()', [_scollto, this.is_overflow()]);
    if (this.is_overflow() === false) {
		_scollto = false;
	}
    
    var _list_item;
    for (var _i in this._list_colls) {
        var _list_coll = this._list_colls[_i];
        
        /*
        _list_coll.add_once_listener(function (_list_coll) {
            var _list_item = _list_coll.focus(_param);
            
            if ($.is_function(_callback)) {
                _callback(_list_item);
            }
        });
        */
        _list_item = _list_coll.focus(_param, _scollto);
        if ($.isset(_list_item)) {
            //_callback(_list_item);
            //return this;
            return _list_item;
        }
    }
    //如果到最後都沒找到的話
    return null;
};

Topic_list.prototype._set_focus_param = null;
Topic_list.prototype._set_focus_scrollto = null;
Topic_list.prototype._set_focus_callback = null;

Topic_list.prototype.set_focus = function(_param, _scroll_to, _callback) {
    this._set_focus_param = _param;
    this._set_focus_scrollto = _scroll_to;
    this._set_focus_callback = _callback;
};

Topic_list.prototype.reset_focus = function() {
    //$.test_msg('Topic_list.reset_focus()');
    this._set_focus_param = null;
    this._set_focus_scrollto = null;
    this._set_focus_callback = null;
};

/**
 * 
 * @param {Annotation} _param
 * @param {String} _name
 */
Topic_list.prototype.move = function(_param, _name) {
    for (var _i in this._list_colls) {
        var _list_coll = this._list_colls[_i];
        var _list_coll_name = _list_coll.get_name();
        
        if (_list_coll_name == _name) {
            _list_coll.add_list_item(_param, true);
        }
        else {
            _list_coll.remove_list_item(_param);
        }
    }
};

/**
 * 設定範圍
 * @param {Scope_collection_param} _scope_coll
 */
Topic_list.prototype.set_scope_coll = function (_scope_coll) {
    for (var _i in this._list_colls) {
        var _list_coll = this._list_colls[_i];
        _list_coll.set_scope_coll(_scope_coll);
    }
    return this;
};

Topic_list.prototype.reset = function (_callback) {
    //$.test_msg('Topic_list_reset()', window.location.hash);
	
    //KALS_text.selection.select.clear();
    //KALS_text.selection.view.clear();
    
    this._first_load = true;
    this._toggle_blank(false);
    this._toggle_loading(true);
    this._toggle_complete(false);
    this._reset_load_id();
    
    this._set_focus_param = null;
    this._set_focus_scrollto = null;
    
    for (var _i in this._list_colls) {
        var _list_coll = this._list_colls[_i];
        _list_coll.reset();
    }
    
    KALS_text.selection.select.clear(function () {
        KALS_text.selection.view.clear();
        $.trigger_callback(_callback);
    });
    
    return this;
};

/**
 * Reload是保留tool原本的位置，直接讀取標註的內容
 */
Topic_list.prototype.reload = function (_callback) {
    this._toggle_blank(false);
    this._toggle_loading(true);
    this._toggle_complete(false);
    
    /*
    for (var _i in this._list_colls) {
        var _coll = this._list_colls[_i];
        _coll.reload();
    }
    */
    for (var _i in this._list_colls) {
        var _list_coll = this._list_colls[_i];
        _list_coll.reset();
    }
    
    this.load_list(_callback);
    
    return this;
};


// --------
// Load
// --------

Topic_list.prototype._first_load = true;

Topic_list.prototype._load_id = null;

Topic_list.prototype.get_load_id = function () {
    return this._load_id;
};
Topic_list.prototype._reset_load_id = function () {
    this._load_id = null;
    return this;
};

Topic_list.prototype.load_list = function (_callback) {
    
    if (this._first_load === true) {
        this._toggle_blank(false);
        this._toggle_loading(true);
    }
    
    // 2010.11.11 改用一個load一個的作法
    /*
    var _count = 0;
    var _limit = this._list_colls.length - 1;
    
    var _this = this;
    var _call_complete = function () {
        _count++;
        
        if (_count == _limit
            || _count > _limit) {
            _this._first_load = false;
            
            _this._load_list_complete(_callback);
        }
    };
    
    for (var _i in this._list_colls) {
        var _list_coll = this._list_colls[_i];
        _list_coll.load_list(function () {
            _call_complete();
        });
    }
    */
    
    this._load_id = $.create_id();
    //$.test_msg('Topic_list.load_list() set load id', this._load_id);
    var _this = this;
    var _loop = function (_i, _load_id) {
        //$.test_msg('Topic_list.load_list()', [_load_id, _this._load_id]);
        if (_load_id != _this._load_id || _this._load_id === null) {
			return;
		}
        
        if (_i < _this._list_colls.length) {
            var _coll = _this._list_colls[_i];
            _coll.set_load_id(_this); 
            _coll.load_list(function () {
                setTimeout(function () {
                    _i++;
                    _loop(_i, _load_id);
                }, 0);
            });
        }
        else {
            _this._load_list_complete(_callback);
        }
    };
    _loop(0, this._load_id);
   
    return this;
};

Topic_list.prototype._load_list_complete = function (_callback) {
    //自動重新讀取，避免endless scroll無法觸發的情況
    if (this.is_overflow() === false && this.is_totally_loaded() === false) {
        this.load_list(_callback);
    }
    else {
        var _this = this;
        setTimeout(function() {
            if (_this.has_list_item() === false) {
				_this._toggle_blank(true);
			}
            
            //$.test_msg([_this.has_list_item() , _this.is_totally_loaded()]);
            
            if (_this.has_list_item() && _this.is_totally_loaded()) {
				_this._toggle_complete(true);
			}
            
            _this.check_editing();
            _this._toggle_loading(false, function () {
                
                //$.test_msg('Topic_list._load_list_complete()', _this._set_focus_param);
                
                if (_this._set_focus_param !== null) {
                    
                    var _item = _this.focus(_this._set_focus_param, _this._set_focus_scrollto);
                    if ($.is_function(_this._set_focus_callback)) {
                        _this._set_focus_callback(_item);
                    }
                    
                    _this.reset_focus();
                }
                
                $.trigger_callback(_callback);
                _this.notify_listeners();    
                
            });
            
        }, 1000);
    }
};

/**
 * @param {Annotation_param} _param
 */
Topic_list.prototype.add_list_item = function (_param, _scrollto) {
    
    this._set_focus_param = null;
    this._set_focus_scrollto = null;
    
    if ($.is_null(_scrollto)) {
		_scrollto = true;
	}
    
    this._toggle_blank(false);
    
    //加在List_collection_my的範圍
    var _item = this.my.add_list_item(_param, true);
    
    if (_scrollto === true) {
		this.my.focus(_param, true);
	}
    return _item;
};

Topic_list.prototype.editor_add_list_item = function (_param) {
    return this.add_list_item(_param, false);
};

Topic_list.prototype.is_overflow = function () {
    
    var _max_height = this.get_ui().css('max-height');
    _max_height = $.strip_unit(_max_height);
    
    var _colls_height = 0;
    
    for (var _i in this._list_colls) {
        var _coll = this._list_colls[_i];
        var _coll_height = _coll.get_ui().height();
        _colls_height = _colls_height + _coll_height;
    }
    
    //$.test_msg('Topic_list.is_overflow()', [_colls_height, _max_height, (_colls_height < _max_height || _colls_height == _max_height)]);
    
    if (_colls_height < _max_height ||
	_colls_height == _max_height) {
		return false;
	}
	else {
		return true;
	}
    
};

Topic_list.prototype.has_list_item = function () {
    return (this.count_list_item() > 0);
};

Topic_list.prototype.count_list_item = function () {
    var _count = 0;
    
    for (var _i in this._list_colls) {
        var _coll = this._list_colls[_i];
        var _coll_count = _coll.count_list_item();
        _count = _count + _coll_count;
    }
    
    return _count;
};

/**
 * 編輯中的標註
 * @type {Annotation_param}
 */
Topic_list.prototype._editing_param = null;

/**
 * 設為編輯對象
 * @param {Object} _editing_param
 */
Topic_list.prototype.set_editing_param = function (_editing_param) {
    this._editing_param = _editing_param;
    KALS_text.tool.editor_container.toggle_loading(true);
};

Topic_list.prototype.check_editing = function () {
    
    if ($.isset(this._editing_param)) {
        var _list_item = this.focus(this._editing_param, false);
        
        if ($.isset(_list_item)) {
            _list_item.edit_annotation();
            KALS_text.tool.editor_container.toggle_loading(false);
        }
        
        this._editing_param = null;
    }
    return this;
    
};

/* End of file Topic_list */
/* Location: ./system/application/views/web_apps/Topic_list.js */