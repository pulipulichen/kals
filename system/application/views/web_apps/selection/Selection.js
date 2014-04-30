/**
 * Selection
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/20 下午 08:42:47
 * @extends {Multi_event_dispatcher}
 * @param {Selectable_text} _text
 */
function Selection(_text) {
    
    Multi_event_dispatcher.call(this);
    
    this._scope_coll = null;
    this._$enable_types = ['select', 'clear'];
    
    if ($.isset(_text)) {
        this._text = _text;
        
		/*
        var _this = this;
        KALS_context.auth.add_listener(function (_auth) {
            //if (_this._$logout_clear && _auth.is_login() === false)
            //if ((_this._$login_clear === true && _auth.is_login() === true)
            //    || (_this._$logout_clear === true && _auth.is_login() === false))
            //    _this.clear();
        });
        */
    }
}

Selection.prototype = new Multi_event_dispatcher();

/**
 * @type {Selectable_text}
 */
Selection.prototype._text = null;

Selection.prototype._$name = 'select';

Selection.prototype._$login_clear = false;

Selection.prototype._$logout_clear = true;

/**
 * @type {Scope_collection_param}
 */
Selection.prototype._scope_coll = null;

/**
 * 一次性選取。
 * 如果是true，每次新增選取時，都會先進行clear()指令。
 * 
 */
Selection.prototype._$select_once = true;

Selection.prototype._classname = null;

/**
 * 設定選擇的範圍
 * @param {Scope_collection_param} _scope
 */
Selection.prototype.set_scope_coll = function (_scope_coll) {
    
    //$.test_msg('Selection.set_scope_coll()', [$.is_class(_scope_coll, 'Scope_collection_param'), $.get_class(_scope_coll), _scope_coll.length()]);
    
	if ($.is_array(_scope_coll)) {
		_scope_coll = new Scope_collection_param(_scope_coll);
	}
	
    if ($.is_class(_scope_coll, 'Scope_collection_param') === false
        || _scope_coll.length() === 0) {
        //$.test_msg('Selection.set_scope_coll()', [($.is_class(_scope_coll, 'Scope_collection_param') === false), $.get_class(_scope_coll), _scope_coll.length()]);
        return this;
    }
    
    //if ($.isset(this._scope_coll))
    //    $.test_msg('Selection.set_scope_coll()', [this._scope_coll.equals(_scope_coll), this._scope_coll.export_json(), _scope_coll.export_json()]);
    
    //如果範圍一樣，則不用重置
    if ($.isset(this._scope_coll)
        && this._scope_coll.equals(_scope_coll)) {
        //$.test_msg('Selection.set_scope_coll()', [this._scope_coll.equals(_scope_coll), this._scope_coll.export_json(), _scope_coll.export_json()]);
        return this;
    }
        
    
    if (this._$select_once === true) {
		this.clear();
	}
    
    this._scope_coll = _scope_coll;
    
    var _classname = this.get_classname();
    
    //$.test_msg('Selection.set_scope_coll() text add class', [_classname, _scope_coll.length(), _scope_coll.export_json()]);
    
    var _this = this;
    this._text.add_class(_scope_coll, _classname, function () {
        //$.test_msg('Selection.set_scope_coll() select', [this._type_listeners.select.length]);
    
        //_this.notify_listeners('select', _scope_coll);    
    });
    
    _this.notify_listeners('select', _scope_coll);
    
    return this;
};

/**
 * @type {Scope_collection_param}
 */
Selection.prototype.get_scope_coll = function () {
    return this._scope_coll;
};

/**
 * @type {Scope_collection_param}
 */
Selection.prototype.get_recommend_scope_coll = function () {
    var _scope_coll = this._scope_coll;
    var _recommend_scope_coll = this._text.get_recommend_scope_coll(_scope_coll);
    return _recommend_scope_coll;
};

Selection.prototype.clear = function () {
    //如果本來就是清空的狀態，則不做任何改變
    if (this._scope_coll === null) {
        //$.test_msg('Selection.clear() no scope coll' , [this.get_classname()]);
        return this;
    }
    
    var _classname = this.get_classname();
    var _scope_coll = this.get_scope_coll();
    //$.test_msg('Selection.clear()' , [_scope_coll.export_json(), _classname]);
    //this._text.remove_class(_scope_coll, _classname);
    this._text.remove_class(_classname);
    this._scope_coll = null;
    
    //2010.10.20 不確定是否要重置classname，先確定重置好了
    this.set_classname();
    
    this.notify_listeners('clear', _scope_coll);
    
    return this;
    
};

Selection.prototype.clear_scope_coll = function (_scope_coll) {
    
    var _classname = this.get_classname();
    this._text.remove_class(_scope_coll, _classname);
    
    //這個動作太浪費資源了，不採用
    //this._scope_coll = this._text.retrive_scope_coll(_classname);
    
    return this;
};

Selection.prototype.set_classname = function (_classname) {
    this._classname = _classname;
    return this;
};

Selection.prototype.get_classname = function () {
    
    var _classname = this._$name;
    
    if ($.isset(this._classname)) {
        _classname = _classname + ' ' + this._classname;
    }
    
    return _classname;
};

Selection.prototype.get_offset_top = function () {
    
    var _scope_coll = this.get_scope_coll();
    var _top = this._text.get_offset_top(_scope_coll);
    return _top;
};

Selection.prototype.get_offset_bottom = function () {
    var _scope_coll = this.get_scope_coll();
    var _bottom = this._text.get_offset_bottom(_scope_coll);
    return _bottom;
};

Selection.prototype.get_offset_right = function () {
    
    var _scope_coll = this.get_scope_coll();
    var _offset = this._text.get_offset_right(_scope_coll);
    return _offset;
};

Selection.prototype.get_offset_left = function () {
    
    var _scope_coll = this.get_scope_coll();
    var _offset = this._text.get_offset_left(_scope_coll);
    return _offset;
};

Selection.prototype.get_offset_first_left = function () {
    
    var _scope_coll = this.get_scope_coll();
    var _offset = this._text.get_offset_first_left(_scope_coll);
    return _offset;
};

Selection.prototype.get_offset_last_right = function () {
    
    var _scope_coll = this.get_scope_coll();
    var _offset = this._text.get_offset_last_right(_scope_coll);
    return _offset;
};

Selection.prototype.get_anchor_text = function () {
    var _scope_coll = this.get_scope_coll();
    var _anchor_text = this._text.get_anchor_text(_scope_coll);
    return _anchor_text; 
};

/**
 * @type {number} 各數字代表的意思如下：
 * 0 => head : location-head
 * 1 => foot : location-foot
 * 2 => near head & foot : 此情況並不標示，由get_paragraph_location()去判斷
 * 3 => near head : location-near-head
 * 4 => near foot : location-near-foot
 * 5 => body : 沒有標示
 */
Selection.prototype.get_location_feature = function () {
    var _scope_coll = this.get_scope_coll();
    var _location = this._text.get_location_feature(_scope_coll);
    return _location;
};

/**
 * @type {Scope_collection_param}
 */
Selection.prototype.get_recommend_scope_coll = function () {
    var _scope_coll = this.get_scope_coll();
    var _recommend = this._text.get_recommend_scope_coll(_scope_coll);
    return _recommend;
};

/**
 * 是否有選取範圍？
 * @type {boolean}
 */
Selection.prototype.has_selected = function () {
    return !(this._scope === null);
};

Selection.prototype._scroll_lock = false;

/**
 * 讓捲軸捲到選取範圍位置
 */
Selection.prototype.scroll_into_view = function (_callback) {
    
    //$.test_msg("Selection.scroll_into_view", this._$name);
    //return;
    
    if (this._scroll_lock === true) {
        //$.test_msg("!!!!!!!!!Selection.scroll_into_view _scoll_lock === true", this._$name);
        $.trigger_callback(_callback);
        return this;
    }
    
    //var _x = this.get_offset_left();
    var _y = this.get_offset_top();
    
    /*
    if ($.is_null(_x) && $.is_null(_y)) {
        return this;
    }
    */
    
    if ($.is_null(_y)) {
        $.trigger_callback(_callback);
        return this;
    }
    
    var _config = {};
    /*
    if ($.isset(_x)) {
        _x = _x - 100;
        _config['x'] = _x;
    }
    */
    if ($.isset(_y)) {
        _y = _y - KALS_toolbar.get_height() - 100;
        //$.test_msg('Selection.scroll_into_view()', [this._$name, _y, KALS_toolbar.get_height()]);
        _config.y = _y;
    }
    
    //$.test_msg("要準備捲動囉", _config);
    
    var _this = this;
    this._scroll_lock = true;
    $.scroll_to(_config, 200, function () {
        _this._scroll_lock = false;
        $.trigger_callback(_callback);
    });
    
    return this;
};

Selection.prototype.equals = function (_scope_coll) {
    
    if (this._scope_coll === null || _scope_coll === null) {
        return false;
    }
    else {
        return this._scope_coll.equals(_scope_coll);
    }
};

/* End of file Selection */
/* Location: ./system/application/views/web_apps/Selection.js */