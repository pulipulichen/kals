/**
 * Selection_select
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/20 下午 08:42:59
 * @extends {Selection}
 * @param {Selectable_text} _text
 */
function Selection_select(_text) {
    
    Selection.call(this, _text);
	if (KALS_context.hash.has_field('select')) {
            this._setted_hash = true;
	}
	
	var _this = this;
	KALS_context.policy.add_attr_listener('read', function (_policy) {
        //$.test_msg('Selection_select()', _policy.readable());
        _this._selectable = _policy.readable();
    }, true);
    
    var _this = this;
    KALS_context.ready(function () {
        //$.test_msg("準備 ok");
        KALS_text.tool.add_listener(["open", "close"], function (_tool) {
            _this._tool_open = _tool.is_opened();
        });
    });
}

Selection_select.prototype = new Selection();

/**
 * 開始選取的位置。如果空值，表示1. 尚未選取；2. 選取完畢；
 * @type {int|null}
 */
Selection_select.prototype._select_from = null;
Selection_select.prototype._select_from_word = null;

Selection_select.prototype._select_timer = null;
Selection_select.prototype._setted_hash = false;

Selection_select.prototype._$login_clear = true;

Selection_select.prototype.auto_cancel_wait = 10000;

Selection_select.prototype._selectable = true;

Selection_select.prototype._tool_open = false;

/**
 * 設定選取
 * @param {jQuery} _word
 */
Selection_select.prototype.set_select = function (_word) {
    // 如果標註工具是開啟的狀態下，不啟用此功能
    //$.test_msg("set_select 標註工具有開啟嗎？", this._tool_open);
    if (this._tool_open === true) {
        //$.test_msg("set_select 標註工具沒有開啟", this._tool_open);
        return this;
    }
    
    // 如果輸入參數是範圍，那就改成用Scope_collection_param吧
    if ($.is_class(_word, "Scope_collection_param")) {
        return this.set_scope_coll(_word);
    }
    
    //$.test_msg("Selection_select.set_select()", KALS_context.policy.readable());
    if (this._selectable === false) {
        //$.test_msg("delete_field select 3");
        KALS_context.hash.delete_field('select');
        return this;
    }
    
    var _id = $.get_prefixed_id(_word);
	
	//第一次點選
    if (this._select_from === null) {
        var _classname = this.get_classname();
        this.clear();
        this._select_from = _id;
        this._select_from_word = _word;
        _word.addClass(_classname);
        //$.test_msg(KALS_text.selection.has_annotation(_id));
        
        //2010.11.3 取消自動取消選取功能
        //var _this = this;
        //this._select_timer = setTimeout(function () {
        //    //$.test_msg('Selection_select.set_select() autocancel');
        //    _this._select_from = null;
        //    _word.removeClass(_classname);
        //    _this._select_timer = null;
        //}, this.auto_cancel_wait);
    }
    else {
        //第二次點選，顯示Editor_contrainer
		
        //2010.11.3 取消自動取消選取功能
        //if ($.isset(this._select_timer))
        //    clearTimeout(this._select_timer);
        
        //$.test_msg('Selection_select.set_select()', [this._select_from, _id]);
        
        //在做add_select的時候，就會進行通知
        var _scope_coll = new Scope_collection_param(this._select_from, _id);
        
        if (_scope_coll.length() > 0) {
            var _anchor_text = this._text.get_anchor_text(_scope_coll);
            
            //$.test_msg('Selection_select.set_select()', [_anchor_text.length, KALS_CONFIG.anchor_length_max]);
            
            //2010.12.3 改用ajax_post之後就突破字數限制了
            //if (_anchor_text.length > KALS_CONFIG.anchor_length_max)
            //{
            //    _anchor_text = _anchor_text.substring(0, KALS_CONFIG.anchor_length_max);
            //}
			
            _scope_coll.get(0).set_anchor_text(_anchor_text);
        
            this.set_scope_coll(_scope_coll);
            
            this._setted_hash = true;
			
        }
        
        this._select_from = null;
        this._select_from_word = null;
        
        //$.test_msg('Selection_select.set_select()', [this._select_from, _id]);
    }
    return this;
};

/**
 * 選取物件時加上hash，這是覆蓋Selection的功能
 * @author Pulipuli Chen 20131115
 */
Selection_select.prototype.set_scope_coll = function (_scope_coll) {
    Selection.prototype.set_scope_coll.call(this, _scope_coll);

    var _from = _scope_coll.get_from();
    var _to = _scope_coll.get_to();

    //$.test_msg("select set_scope_coll", [_from, _to]);
    KALS_context.hash.set_field('select', _from + ',' + _to);

    return this;
};

Selection_select.prototype.cancel_select = function () {
    
    if ($.isset(this._select_from_word)) {
        this._select_from_word.removeClass(this.get_classname());
    }
    
    this._select_from = null;
    this._select_from_word = null;
    this._setted_hash = false;
	
    //$.test_msg("delete_field select 1");
    KALS_context.hash.delete_field('select');
    
    return this;
};

Selection_select.prototype.clear = function () {
    if (this._setted_hash === true) {
        //$.test_msg("delete_field select 2");
        KALS_context.hash.delete_field('select');
    }
    
    return Selection.prototype.clear.call(this);
};

/**
 * 載入指定位置
 * @param {String} _scope_text = "638,641"
 * @returns {Selection_select}
 */
Selection_select.prototype.load_select = function (_scope_text) {
    
    if ($.is_null(_scope_text)) {
        return this;
    }
    
    var _scopes = _scope_text.split(',');
    
    var _first_index = _scopes[0];
    var _last_index = _first_index;
    if (_scopes.length > 1) {
        _last_index = _scopes[1];
    }

    var _scope_coll = new Scope_collection_param(_first_index, _last_index);
    var _anchor_text = this._text.get_anchor_text(_scope_coll);
    _scope_coll.get(0).set_anchor_text(_anchor_text);
    this.set_scope_coll(_scope_coll);
    
    //$.test_msg('Selection_select.load_select()');
    
    //var _this = this;
    //setTimeout(function () {
    //    _this.scroll_into_view();    
    //}, 500);
    
    KALS_context.hash.set_field('select', _first_index + ',' + _last_index);
    
    return this;
};

/* End of file Selection_select */
/* Location: ./system/application/views/web_apps/Selection_select.js */