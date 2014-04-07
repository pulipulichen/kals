/**
 * List_like_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/30 下午 02:24:45
 * @extends {JSONP_dispatcher}
 * @param {List_item}
 */
function List_like_component(_item) {
    
    JSONP_dispatcher.call(this);
    
	//$.test_msg("set item了嗎？", $.isset(_item));
    this._set_list_item(_item);
}

List_like_component.prototype = new JSONP_dispatcher();

// --------
// List Item
// --------

/**
 * @type {List_item}
 */
List_like_component.prototype._item = null;

List_like_component.prototype._set_list_item = function (_item) {
	//$.test_msg("set item了嗎？", this._item._annotation_param.annotation_id);
    if ($.isset(_item)) {
        this._item = _item;
        var _this = this;
        this._item.add_listener('set', function (_item) {
            _this.set_param();
        });
		//$.test_msg("設進去了嗎？set item了嗎？", $.isset(this._item._annotation_param.annotation_id));
    }
    return this;
};


List_like_component.prototype.set_param = function () {
    
    var _param = this._item.get_data();
    var _is_like = _param.is_like;
    this._toggle_like(_is_like);
    this._set_like_count(_param.like_count);
    return this;
};

// --------
// Private Attributes
// --------

List_like_component.prototype._$load_url = 'annotation_setter/like';

List_like_component.prototype.like_classname = 'liked';

List_like_component.prototype._hover_classname = 'hover';

// --------
// UI
// --------

/**
 * Create UI
 * @memberOf {List_like_component}
 * @type {jQuery} UI
 */
List_like_component.prototype._$create_ui = function () {
    var _ui = $('<span></span>')
        .addClass('list-like-component');
    
    var _hover_classname = this._hover_classname;
    _ui.hover(function () {
        $(this).addClass(_hover_classname);
    }, function () {
        $(this).removeClass(_hover_classname);
    });
    
    var _icon = this._create_icon_component();
    _icon.appendTo(_ui);
    
    var _count = this._create_count_component();
    _count.prependTo(_ui);
    
    //如果沒有登入，則不顯示like
    var _this = this;
    
    _ui.click(function () {
        _this.set_is_like();
    });
    
    
    return _ui;
};

List_like_component.prototype._count_component = null;

List_like_component.prototype._create_count_component = function () {
    
    var _ui = $('<span></span>')
        .addClass('count-component');
    this._count_component = _ui;
    return _ui;
};

List_like_component.prototype._icon_component = null;

List_like_component.prototype._create_icon_component = function () {
    
    var _ui = $('<span></span>')
        .addClass('icon-component');
    this._icon_component = _ui;
    return _ui;
};

/**
 * @param {boolean} _is_like
 */
List_like_component.prototype.set_is_like = function (_is_like) {
    
    if (this._lock === true) {
		return;
	}
	
    if ($.is_null(_is_like)) {
		_is_like = !(this.is_liked());
	}
    
    //$.test_msg("set_is_like", [_is_like, this.is_liked()]);
                
    var _annotation_id = this._item.get_annotation_id();
    
    var _data = {
        is_like: _is_like,
        annotation_id: _annotation_id
    };
    
    this._lock = true;
    
    this.load(_data, function (_this, _data) {
        
        if (_this._lock === false) {
			return;
		}
            
        _this._lock = false;
        
        //_this._toggle_like(_is_like);
        
        //var _param = _this._item.get_data();
        var _lang;
        if (_is_like === true) {
			_lang = _this._lang.set_like;
		}
		else {
			_lang = _this._lang.set_not_like;
		}
            
        KALS_util.notify(_lang);
        
        //調整次數
        if (_is_like === true) {
            _this.add_like_count();
        }
        else {
            _this.reduce_like_count();
        }
    });
    return this;
};

List_like_component.prototype._lock = false;

List_like_component.prototype._lang = {
    'set_like': new KALS_language_param(
            'Add to like list',
            'list_like_component.set_like'
        ),
    'set_not_like': new KALS_language_param(
            'Remove from like list',
            'list_like_component.set_not_like'
        )
}; 


List_like_component.prototype.is_liked = function () {
    var _ui = this.get_ui();
    return _ui.hasClass(this.like_classname);
};

List_like_component.prototype._toggle_like = function (_is_like) {
    
    var _ui = this.get_ui();
    //$.test_msg('List_like_component.toggle_like 1', [_is_like, _ui.hasClass(this.like_classname), this.is_liked()]);
    
    if ($.is_null(_is_like)) {
		_is_like = (!(this.is_liked()));
	}
	
    if (_is_like === true) {
		_ui.addClass(this.like_classname);
	}
	else {
		_ui.removeClass(this.like_classname);
	}
        
    //$.test_msg('List_like_component.toggle_like 2', [_is_like, _ui.hasClass(this.like_classname), this.is_liked()]);
    
    return this;
};

List_like_component.prototype._like_count = 0;

List_like_component.prototype._set_like_count = function (_count) {
    if ($.is_null(_count) || _count < 1) {
        this._count_component.hide();
        this._count_component.empty();
        this._like_count = 0;
    }
    else {
        this._count_component.show();
        
        var _lang = new KALS_language_param(
            '{0} like',
            'list_like_component.like_count',
            _count
        );
        
        var _msg = KALS_context.lang.line(_lang);
        
        this._count_component.html(_msg);
        this._like_count = _count;
		
		//要修改item的param參數
		//var _param = this._item.get_annotation_param();
		//_param.like_count = _count;
		//this._item.editor_set_data(_param);
    }
    return this;
};

List_like_component.prototype.add_like_count = function () {
    
    this._like_count++;
    this._toggle_like(true);
	this._set_list_item_count();
    return this._set_like_count(this._like_count);
}; 

List_like_component.prototype.reset_like_count = function () {
    return this._set_like_count(0);
};

List_like_component.prototype.reduce_like_count = function () {
    this._like_count--;
	this._toggle_like(false);
	this._set_list_item_count();
    return this._set_like_count(this._like_count);
};

/**
 * 設定list item的參數
 * @param {number} _count
 */
List_like_component.prototype._set_list_item_count = function () {
	if ($.is_null(this._item)) {
		return this;
	}
	var _count = this._like_count;
	var _param = this._item.get_annotation_param();
    _param.like_count = _count;
	_param.is_like = this.is_liked();
    this._item.editor_set_data(_param);
	
	return this;
};

/* End of file List_like_component */
/* Location: ./system/application/views/web_apps/List_like_component.js */