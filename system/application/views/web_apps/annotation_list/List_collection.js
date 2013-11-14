/**
 * List_collection
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/27 下午 07:27:52
 * @extends {JSONP_dispatcher}
 */
function List_collection() {
    
    JSONP_dispatcher.call(this);
    
    this._list_items = [];
    
}

List_collection.prototype = new JSONP_dispatcher();

List_collection.prototype._$load_url = 'annotation_getter/list_annotation';

List_collection.prototype._$name = 'list';

List_collection.prototype.get_name = function () {
    return this._$name;
};

/**
 * @type {number|null} 如果是null，表示讀取全部
 */
List_collection.prototype._$limit = 10;

/**
 * 是否排除或只含括登入的該使用者。null表示不限定。
 * 如果在未登入的狀態下設定此項，則永遠會回傳空結果。
 * @type {Boolean|null}
 */
List_collection.prototype._$target_my = null;

/**
 * 是否排除或只含括喜歡的標註。null表示不限定。
 * 如果在未登入的狀態下設定此項，則永遠會回傳空結果。
 * @type {Boolean|null}
 */
List_collection.prototype._$target_like = null;

/**
 * 是否鎖定主題的標註
 * @type {boolean|null}
 */
List_collection.prototype._$target_topic = true;

/**
 * 是否要限定標註的ID。
 * 用於view模式中，觀察單一主題的時候。
 * @type {number|null}
 */
List_collection.prototype._$topic_id = null;

/**
 * 排序方式。選項為預設的'score'或'update'。
 * @type {String}
 */
List_collection.prototype._$order_by = 'score';

List_collection.prototype._$need_login = false;

// --------
// Private Attributes
// --------

/**
 * 
 * @type {List_item[]}
 */
List_collection.prototype._list_items = [];

/**
 * @type {jQuery}
 */
List_collection.prototype._list_container = null;

/**
 * @type {jQuery}
 */
//List_collection.prototype._load_component = null;

/**
 * 是否已經完全讀取
 * @type {boolean}
 */
List_collection.prototype._totally_loaded = false;

/**
 * @type {Scope_collection_param}
 */
List_collection.prototype._scope_coll = null; 

/**
 * 每次讀取時，都會變更這個offset，以方便下一次load時指定offset
 */
List_collection.prototype._offset = null;


// --------
// UI Methods
// --------

/**
 * Create UI
 * @memberOf {List_collection}
 * @type {jQuery} UI
 */
List_collection.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass('list-collection')
        .addClass(this._$name);
    
    var _container = $('<div></div>')
        .addClass('list-container')
        .appendTo(_ui);
    this._list_container = _container;
      
    // 2010.11.5 取消所有_loading_component元件，由上層的Topic_list來判斷即可  
    //var _loading = this._create_loading_component()
    //    .appendTo(_ui);
    
    //if (this._$limit === null
    //    || this.is_totally_loaded() === true)
    //{
    //    _loading.hide();
    //}
        
    return _ui;
};

/**
 * @type {jQuery}
 */
/*
List_collection.prototype._create_loading_component = function() {
    var _ui = jQuery('<div></div>')
        .addClass('loading-component');
    
    var _loading_lang = new KALS_language_param(
        'Now Loading...',
        'list_collection.loading'
    );
    
    KALS_context.lang.add_listener(_ui, _loading_lang);
    
    this._load_component = _ui;
        
    return _ui;
};
*/


/**
 * @param {Boolean|null} _display
 */
/*
List_collection.prototype._toggle_loading = function(_display) {
    if ($.is_null(_display)) {
        _display = (this._load_component.css('display') != 'block');
    }
    
    if (_display === true)
        this._list_container.show();
    else
        this._list_container.hide();
    
    return this;
};
*/

// --------
// Load
// --------

List_collection.prototype._load_lock = false;

List_collection.prototype.load_list = function(_data, _callback) {
    if ($.is_function(_data) && $.is_null(_callback)) {
        _callback = _data;
        _data = null;
    }
    
    if ($.isset(_data)) {
        if ($.is_class(_data, 'Annotation_param')) {
            var _annotation_param = _data.export_json();
            _data = {
                annotation_collection: [ _annotation_param ],
                totally_loaded: true
            };    
        }
        else if ($.is_class(_data, 'Annotation_collection_param')) {
            var _coll_param = _data.export_json();
            _data = {
                annotation_collection: _coll_param,
                totally_loaded: true
            };
        }
        
        //$.test_msg('List_collection.load_list() has data', _data);
        
        var _this = this;
        this.setup_load_list(_data, function () {
            $.trigger_callback(_callback);
            _this.notify_listeners(_data);
        });
        
        return this;
    }
    
    if (this.is_totally_loaded() === true
        || this._check_login() === false) {
        $.trigger_callback(_callback);
        //$.test_msg("is_totally_loaded check_login", [this.is_totally_loaded(), this._check_login()]);
        return this;
    }
    
    if (this._load_lock === true) {
        //$.test_msg("_load lock ed");
        return this;
    }
    
    //$.test_msg('List_coll.load_list check pre _search_data', this.get_name());
    
    var _search_data = this.get_search_data();
    
    //$.test_msg('List_coll.load_list check _search_data', [_search_data, this.get_name()]);
    if ($.isset(_search_data)) {
        this._load_lock = true;
        
        //$.test_msg('List_coll.load_list  pre-load()');
        this.load(_search_data, function (_this, _data) {
            //$.test_msg('List_coll.load_list load()', _data);
            _this.setup_load_list(_data, function () {
                $.trigger_callback(_callback);
                _this._load_lock = false;    
            });
        });
        return this;
    }
    
    //$.test_msg("List_coll do nothing");
    return this;
};

/**
 * 取得要搜尋的資料
 */
List_collection.prototype.get_search_data = function () {
    //$.test_msg("List_coll get_search_data start");
    
    var _search_data = {};
    
    //如果有指定target id，則就不需要其他參考資料
    if ($.isset(this._$topic_id)) {
        _search_data.topic_id = this._$topic_id;
        
        if ($.isset(this._$limit)) {
			_search_data.limit = this._$limit;
		}
            
        if ($.isset(this._$target_topic)) {
			_search_data.target_topic = this._$target_topic;
		}
        if ($.isset(this._$order_by) && this._$order_by != 'score') {
			_search_data.order_by = this._$order_by;
		}
            
        if ($.isset(this._offset)) {
			_search_data.offset = this._offset;
		}
        
        //$.test_msg("get_search_data first", _search_data);
        return _search_data;
    }
    
    //一定要有範圍資料！
    if ($.is_null(this._scope_coll) && this._$need_login === false) {
        //$.test_msg("get_search_data no scope coll", [this.get_name(), this._$need_login]);
        return null;
    }
    else {
        if ($.isset(this._scope_coll)) {
            _search_data.scope = this._scope_coll.export_json(false);
        }
    }
    
    //if (this._scope_coll != null) {
    //    _search_data.scope = this._scope_coll.export_json(false);
    //}
   
    //需要登入身分的兩個參數
    if (this._$need_login === true) {
        if (($.isset(this._$target_like) || $.isset(this._$target_my)) &&
            KALS_context.auth.is_login() === false) {
            //$.test_msg("get_search_data", [this._$target_like, this._$target_my, KALS_context.auth.is_login()]);
            return null;
        }
    }
    
    if ($.isset(this._$target_like)) {
		_search_data.target_like = this._$target_like;
	}
    if ($.isset(this._$target_my)) {
		_search_data.target_my = this._$target_my;
	}
    
    if ($.isset(this._$limit)) {
		_search_data.limit = this._$limit;
	}
    
    if ($.isset(this._$target_topic)) {
		_search_data.target_topic = this._$target_topic;
	}
    if ($.isset(this._$order_by) && this._$order_by != 'score') {
		_search_data.order_by = this._$order_by;
	}
        
    if ($.isset(this._offset)) {
		_search_data.offset = this._offset;
	}
    
    //$.test_msg("get_search_data final", _search_data);
    return _search_data;
    
};

List_collection.prototype._check_login = function () {
    
    //$.test_msg('List_coll._check_login()', [this._$name, this._$need_login, KALS_context.auth.is_login()]);
    
    if (this._$need_login === null || this._$need_login === false) {
            //$.test_msg('List_coll._check_login() is_null');
            return true;
    }
    
    var _pass = (this._$need_login == KALS_context.auth.is_login());
    if (_pass === false) {
        this._totally_loaded = true;
    } 
    return _pass;
};


List_collection.prototype._check_load_id = false;
List_collection.prototype._load_id = null;
List_collection.prototype._load_id_dispatcher = null;

List_collection.prototype.set_load_id = function (_dispatcher) {
    this._load_id_dispatcher = _dispatcher;
    this._load_id = _dispatcher.get_load_id();
    this._check_load_id = true;
};

List_collection.prototype.check_load_id = function (_load_id) {
    if (this._check_load_id === true) {
		if ($.is_null(_load_id)) {
			return (this._load_id_dispatcher.get_load_id() == this._load_id);
		}
		else {
			return (this._load_id_dispatcher.get_load_id() == _load_id);
		}
	}
	else {
		return true;
	}
};

List_collection.prototype.setup_load_list = function (_data, _callback) {
    
    //$.test_msg('List_coll.setup_load_list()', _data);
    //$.test_msg('List_coll.setup_load_list()', $.is_array(_data.annotation_collection));
    
    if (this._check_login() === false) {
        $.trigger_callback(_callback);
        return this;
    }
    
    var _this = this;
    
    var _setup_list_complete = function () {
        
        if (typeof(_data.totally_loaded) == 'boolean' && _data.totally_loaded === true) {
			_this._totally_loaded = _data.totally_loaded;
		}

        //_this._ready = true;
        _this._check_load_id = false;
        
        if (_this._set_focus_param !== null) {
            _this.focus(_this._set_focus_param, _this._set_focus_scrollto);
            
            _this._set_focus_param = null;
            _this._set_focus_scrollto = null;
        }
        $.trigger_callback(_callback);
    };
    
    if ($.is_array(_data.annotation_collection)) {
        //要先把_data.annotation_collection轉換成Anntation_collection_param()
        
        var _loop_annotation_complete = function () {
            _this._mark_first();
        
            var _length = _annotation_coll.length();
            
            if (_this._offset === null) {
				_this._offset = 0;
			}
            _this._offset = _this._offset + _length;
            
            //$.test_msg('List_collection.setup_load_list()', 'before complete');
            
            _setup_list_complete();
        };
        
        var _annotation_coll = new Annotation_collection_param(_data.annotation_collection);
        
        /*
        for (var _i = 0; _i < _annotation_coll.length(); _i++) {
            var _param = _annotation_coll.get(_i);
            var _list_item = this.add_list_item(_param);
            
            //if (typeof(_list_item.respond_list) != 'undefined'
            //    && _list_item.respond_list != null)
            //{
            //    //$.test_msg('List_collection.setup_load_list() listen respond list', _param.annotation_id);
            //    _list_item.respond_list.add_listener(function (_respond_list) {
            //        //$.test_msg('List_collection.setup_load_list() _respond_list.is_ready()', _respond_list.is_ready());
            //        if (_respond_list.is_ready())
            //        {
            //            _this.notify_ready();
            //        }
            //    }, true);
            //}
        }
        */
       
        var _load_id = this._load_id;
        var _loop_annotation = function (_i) {
            if (_this.check_load_id(_load_id) === false) {
                //$.test_msg('List_collection.setup_load_list()', 'lost load id');
                return;
            }
            
            if (_i < _annotation_coll.length()) {
                var _param = _annotation_coll.get(_i);
                //var _list_item = _this.add_list_item(_param);
				
				if (KALS_context.policy.allow_show_navigation() === false) {
					var _user_name = KALS_context.user.get_name();
					//$.test_msg("setup_load_list", _param.user);
					
					
					if (_param.user.name === _user_name) {
						_this.add_list_item(_param);
					}
					else if (typeof(_data.total_count) !== "undefined") {
						// @20130603 Pudding Chen
						// 有個Bug，我必須要在這邊說清楚
						// 當列表未顯示，卻又有超過數量的非自己標註時，數字上就會大於0，Bug就會出現
						// 目前還沒有想法可以解決，先擺著
						_data.total_count--;
					}
				}
				else {
					_this.add_list_item(_param);
				}
                
                
                setTimeout(function () {
                    _i++;
                    _loop_annotation(_i);
                }, 0);
            }
            else {
                _loop_annotation_complete();
            }
        };
        
        _loop_annotation(0);
    }
    else {
        _setup_list_complete();
    }
    
    return this;
};

/**
 * 將設定回歸原始 
 */
List_collection.prototype.reset = function() {
    if ($.isset(this._list_container)) {
		this._list_container.empty();
	}
    this._list_items = [];
    this._offset = null;
    this._totally_loaded = false;
    this._load_lock = false;
    
    this._set_focus_param = null;
    this._set_focus_scrollto = null;
    
    return this;
};

List_collection.prototype.reload = function(_callback) {
    this.reset();
    return this.load_list(_callback);
};

/**
 * 根據this._$target_topic來判斷要建立哪一種物件
 * @param {Annotation_param} _param
 * @type {List_item_topic|List_item_repond|List_item} 
 */
List_collection.prototype.create_list_item = function(_param) {
    if (this._$target_topic === true) {
		return new List_item_topic(_param);
	}
	//else if (this._$target_topic === false)
	//    return new List_item_respond(_param);
	else {
		return new List_item(_param);
	}
};

/**
 * 
 * @param {Boolean} _is_totally
 */
List_collection.prototype._set_is_totally = function(_is_totally) {
    this._totally_loaded = _is_totally;
};

List_collection.prototype.is_totally_loaded = function() {
    return this._totally_loaded;
};

List_collection.prototype.set_topic_id = function(_id) {
    this._$topic_id = _id;
    
    return this;
};

// --------
// Setup List
// --------

/**
 * 
 * @param {Annotation_param} _param
 * @param {Boolean} _from_head = false; 是否從頭加入，或是從尾加入
 */
List_collection.prototype.add_list_item = function(_param, _from_head) {
    var _list_item = this.create_list_item(_param);
    
    if (_list_item !== null) {
        this._list_items.push(_list_item);
        
        var _list_item_ui = _list_item.get_ui();
        
        if ($.is_null(_from_head) || _from_head === false) {
            this._list_container.append(_list_item_ui);
        }
        else {
            this._list_container.prepend(_list_item_ui);
        }
        
    }
    return _list_item;
};

List_collection.prototype.editor_add_list_item = function (_param, _from_head) {
    this._set_focus_param = null;
    this._set_focus_scrollto = null;
    return this.add_list_item(_param, _from_head);
};

/**
 * 移除指定的List_item
 * @param {Annotation_param|number} _param
 */
List_collection.prototype.remove_list_item = function (_param) {
    
    var _delete_index;
    for (var _i in this._list_items) {
        var _list_item = this._list_items[_i];
        if (_list_item.equals(_param)) {
            _list_item.remove();
            _delete_index = _i;
            break;
        }
    }
    
    if ($.isset(_delete_index)) {
        this._list_items = $.array_remove(this._list_items, _delete_index);
    }
    return this;
};

/**
 * 
 * @param {Annotation_param|Number} _param
 * @type {List_item|null} 找不到的話就會回傳null
 */
List_collection.prototype.focus = function(_param, _scrollto) {
    if ($.is_null(_param)) {
		return null;
	}
    
    for (var _i in this._list_items) {
        var _list_item = this._list_items[_i];
        /*
        var _list_id = _list_item.get_annotation_id();
        
        if (_list_id == _annotation_id) {
            var _list_item_ui = _list_item.get_ui();
            
            //讓他focus
            _list_item_ui.attr('scrollIntoView')(true);
            
            return _list_item;
        }
        */
        if (_list_item.equals(_param)) {
            //2010.10.29 這些工作交給List_item.focus()去做
            //var _list_item_ui = _list_item.get_ui();
            
            //讓他focus
            //_list_item_ui.attr('scrollIntoView')(true);
            
            //$.test_msg('List_collection.focus() match item', [_list_item.get_annotation_id(), _scrollto]);
            _list_item.focus(_scrollto);
            
            return _list_item;
        }
        else if (typeof(_list_item.respond_list) != 'undefined'
            && _list_item.respond_list !== null) {
            //$.test_msg('List_collection.focus() has respond list', _list_item.get_annotation_id());
            var _result = _list_item.respond_list.focus(_param, _scrollto);
            if (_result !== null) {
				return _result;
			}
        }
		
    }
    
    //如果到最後都沒找到的話
    return null;
};

List_collection.prototype._set_focus_param = null;
List_collection.prototype._set_focus_scrollto = null;

List_collection.prototype.set_focus = function(_param, _scroll_to) {
    this._set_focus_param = _param;
    this._set_focus_scrollto = _scroll_to;
};

List_collection.prototype.set_scope_coll = function (_scope_coll) {
    this._scope_coll = _scope_coll;
    return this;
};

List_collection.prototype.count_list_item = function () {
    if (this._list_items === null) {
		return 0;
	}
	else {
		return this._list_items.length;
	}
};

List_collection.prototype._is_marked_first = false;

List_collection.prototype._mark_first = function () {
    if (this._is_marked_first === true) {
		return this;
	}
    
    if (this._list_items.length > 0) {
        var _list_item = this._list_items[0];
        _list_item.get_ui().addClass('first');
        this._is_marked_first = true;    
    }   
    return this; 
};

/**
 * @deprecated
 */
//List_collection.prototype._ready = false;

/**
 * @deprecated
 */
/*
List_collection.prototype.is_ready = function () {
    if (this._ready === false)
        return false;
    
    for (var _i in this._list_items) {
        if (this._list_items[_i].is_ready() === false)
            return false;
    }
    
    return true;
};
*/

/**
 * @deprecated
 */
/*
List_collection.prototype.notify_ready = function () {
    this._ready = true;
    return this.notify_listeners();
};
*/

/* End of file List_collection */
/* Location: ./system/application/views/web_apps/List_collection.js */