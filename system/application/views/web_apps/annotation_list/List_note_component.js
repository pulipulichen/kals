/**
 * List_note_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/30 下午 05:02:59
 * @extends {KALS_user_interface}
 * @param {List_item} _item
 * @param {boolean} _show_fulltext 
 */
function List_note_component(_item, _show_fulltext) {
    
    KALS_user_interface.call(this);
    
    this._set_list_item(_item);   
    
	// 20130507 Pudding Chen
	// 測試一下
	//_show_fulltext = true;
	
    if ($.isset(_show_fulltext)) {
		this._show_fulltext = _show_fulltext;
	}
}

// Extend from KALS_user_interface
List_note_component.prototype = new KALS_user_interface();

// --------
// List Item
// --------

/**
 * @type {List_note_component}
 */
List_note_component.prototype._item = null;

List_note_component.prototype._set_list_item = function (_item) {
    if ($.isset(_item)) {
        this._item = _item;
        var _this = this;
        this._item.add_listener('set', function (_item) {
            //_this.item = _item;
            _this.set_data();
        });
    }
};

List_note_component.prototype.set_data = function () {
    //this._show_fulltext = this._item.note_show_fulltext;
    this.set_note();
    this.set_respond_to_coll();
};

// -------
// Private Attributes
// -------

List_note_component.prototype._simple_classname = 'simple';

List_note_component.prototype._show_fulltext = false;

List_note_component.prototype._simple_max_length = KALS_CONFIG.annotation_list.note.simple_max_length;

/**
 * @type {Annotation_collection_param}
 */
List_note_component.prototype._respond_to_coll = null;

// --------
// UI
// --------

/**
 * Create UI
 * @memberOf {List_note_component}
 * @type {jQuery} UI
 */
List_note_component.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass('list-note-component');
    
    if (this._show_fulltext === false) {
		_ui.addClass('simple');
	}
    
    var _respond = this._create_respond_container();
    _respond.appendTo(_ui);
    
    var _note = this._create_note_container();
    _note.appendTo(_ui);
    
    /*
    var _this = this;
    setTimeout(function () {
        _this.set_note();
        _this.set_respond_to_coll();
    }, 0);
    */
    return _ui;
};

// --------
// Respond to collection
// --------

List_note_component.prototype._respond_container = null;

List_note_component.prototype._create_respond_container = function () {
    var _container = $('<div></div>')
        .addClass('respond-container');
    this._respond_container = _container;
    return _container;
};

/**
 * @param {Annotation_param} _param
 * @type {jQuery}
 */
List_note_component.prototype._create_respond_ui = function(_param) {
    var _ui = $('<span></span>')
        .addClass('respond-to');
    
    var _name = _param.user.get_name();
    var _respond_id = _param.annotation_id;
    _ui.html(_name + ' #' + _respond_id);
    
    _ui.attr('respond_to', _param.annotation_id);
    var _this = this;
    _ui.click(function () {
        var _respond_to_id = $(this).attr('respond_to');
        _this.focus_respond(_respond_to_id);
    });
    
    return _ui;
};

List_note_component.prototype._create_respond_comma = function () {
    var _ui = $('<span>,</span>')
        .addClass('comma');
    return _ui;
};

/**
 * 
 * @param {Annotation_collection_param} _respond_to_coll
 */
List_note_component.prototype.set_respond_to_coll = function (_respond_to_coll) {
    if ($.is_null(_respond_to_coll)) {
        _respond_to_coll = this._item.get_data().respond_to_coll;
    }
    
    if ($.is_null(_respond_to_coll)) {
		return this;
	}
    
    if ($.is_null(this._respond_container)) {
		this.get_ui();
	}
    
    this._respond_container.empty();
    
    for (var _i = 0; _i < _respond_to_coll.length(); _i ++) {
        if (_i > 0) {
            var _comma = this._create_respond_comma();
            _comma.appendTo(this._respond_container);
        }
        
        var _param = _respond_to_coll.get(_i);
        var _respond_to = this._create_respond_ui(_param);
        _respond_to.appendTo(this._respond_container);
    }
    
    if (_respond_to_coll.length() > 0) {
        var _to = $('<span></span>')
            .addClass('to')
            .prependTo(this._respond_container);
        var _to_lang = new KALS_language_param(
            'To: ',
            'list_note_component.to'
        );
        KALS_context.lang.add_listener(_to, _to_lang);
    }
    
    return this;
    
};

List_note_component.prototype.focus_respond = function (_respond_to_id) {
    
    //var _list = this._item.get_list();
    
    //var _result = _list.focus(_respond_to_id, true);
    //_list.get_ui().css('color', 'blue');
    //$.test_msg('List_note_component.focus_respond()', [_respond_to_id, $.isset(_result)]);
    
    //_list.focus(_respond_to_id, true);
    
    this._item.focus_respond(_respond_to_id);
    
    return this;
};

// --------
// Note
// --------

List_note_component.prototype._note_container = null;

List_note_component.prototype._create_note_container = function () {
    var _container = $('<div></div>')
        .addClass('note-container');
    this._note_container = _container;
    return _container;
};

/**
 * 把筆記的內容放到List當中
 * @param {String} _note
 */
List_note_component.prototype.set_note = function (_note, _callback) {
    if ($.is_null(_note)) {
        _note = this._item.get_data().note;
		
		//if (this._show_fulltext === true) {
		//	$.test_msg("List_note_component.set_note(), get_data", _note);
		//}
    }
    
    if ($.is_null(_note)) {
		_note = '';
	}
    
    //$.test_msg('List_note.set_note()', [_note, typeof(_note)]);
    
    if ($.is_null(this._note_container)) {
		this.get_ui();
	}
    
	
	//$.test_msg("List_note_component.set_note()", _note);
	//_note = $(_note);
	if (this._show_fulltext === false) {
        _note = this.extract_abstract(_note);
    }
	
	//if ($.is_string(_note)) {
    //    $.test_msg('note', _note);
	//	this._note_container.html(_note);
	//}
    //else {
	//	this._note_container.append(_note);
	//}
    this._note_container.html(_note);
    
	var _this = this;
        _this.adjust_note();
		
    if (true) {
		setTimeout(function () {
            _this.adjust_note(function () {
                $.trigger_callback(_callback);
            });
        }, 200);
	}
		
    
    return this;
};

/**
 * 篩選摘要
 * @author Pulipuli Chen 20131117
 * @param {String} _note
 * @type {String|jQuery}
 */
List_note_component.prototype.extract_abstract = function (_note) {
	//var _text = this._note_container.text();
    var _text = _note;
    var _origin_text = _text;
    var _allow_html_tags = KALS_CONFIG.annotation_list.note.allow_html_tags;
    _text = $.strip_html_tag(_text, _allow_html_tags);
    _text = $.trim(_text);
	
	var _plain_text = $.strip_html_tag(_text);
	
	var _result = _text;
    if (_plain_text.length > this._simple_max_length) {
		_result = $('<span></span>').html(_origin_text);
		/*
		
        if (_text.length > this._simple_max_length) {
            _abstract = _text.substr(0, this._simple_max_length) + '...';
            //this._note_container.html(_abstract);
			_result.html(_abstract);
        } 
        
        var _view = this._create_view_thread(_origin_text.length);
        //_view.appendTo(this._note_container);
		_view.appendTo(_result);
		*/
		
		var _abstract = null;
		
		// 先選出有影片的
		if (_abstract === null) {
			var _video = _result.find('object, iframe').eq(0);
			if (_video.length > 0) {
				_abstract = _video;
			}
		}
		
		// 再選出圖片
		if (_abstract === null) {
			var _img = _result.find('img').eq(0);
            if (_img.length > 0) {
                _abstract = _img;
            }
		}
		
		// 如果沒有只好選出文字
		if (_abstract === null) {
            var _head_part = parseInt((this._simple_max_length * 2 / 3), 10);
			var _foot_part = this._simple_max_length - _head_part;
			 
			_abstract =  _plain_text.substr(0, _head_part)
			     + '...'
				 + _plain_text.substr(_plain_text.length - _foot_part, _foot_part);
				 
			_abstract = $('<span>' + _abstract + '</span>');
        }
		
		if (_abstract !== null) {
			_result = _abstract;
		}
		
		var _view = this._create_view_thread(_plain_text.length);
		_view.appendTo(_result);
    }
	else {
		_result = $('<span>'+_result+'</span>');
	}
	
	//var _max_width = this.get_ui().parents('.KALS').width();
	
	//_result.appendTo($('body'));
	
	return _result;   
};

/**
 * 縮小圖片
 */
List_note_component.prototype.adjust_note = function (_callback) {
	//if (this._note_container.hasClass('adjusted')) {
	//	return this;
	//}
	
	var _max_width = this._note_container.width();
	if (_max_width == 0) {
		//return this;
		var _this = this;
		/*
		setTimeout(function () {
			_this.adjust_note;
		}, 100);
		*/
		$.test_msg('adjust_note', _max_width);
		//this._note_container.ready(function () {
		//setTimeout(function () {
		//	_this.adjust_note();
		//}, 100);
			
		//});
		$.trigger_callback(_callback);
	    return this;
		
		//_max_width = 195;
	}
	//var _safe_margin = 25;
	//_max_width = _max_width - _safe_margin;
	
	var _result = this._note_container;
    // 縮小筆記內的資料
    _result.find('img, iframe, object, embed').each(function (_index, _ele) {
        _ele = $(_ele);
        //_ele.css('border', '1px solid red');
        var _width = _ele.width();
        
        $.test_msg('縮小圖片', [_width, _max_width]);
        if (_width > _max_width) {
            var _height = _ele.height();
            
            var _width_ratio = (_max_width / _width);
            var _adjusted_height = parseInt(_height * _width_ratio, 10);
            
            var _final_width = _max_width;
            var _final_height = _adjusted_height;
            //if (_ele.hasAttr('width')) {
                //_ele.attr('width', _final_width).attr('height', _final_height);
            //}
            //else {
                //_ele.css('width', _final_width + 'px').css('height', _final_height + 'px');
            //}
			_ele.css('width', _final_width + 'px').css('height', _final_height + 'px');
            
            //加上連結
            if (_ele.attr('tagName').toLowerCase() == 'img' && _ele.hasAttr('src')) {
                _ele.click(function (_e) {
                    _e.preventDefault();
                    var _src = this.src;
                    window.open(_src, '_blank');
                });
            }
        }
    });
     
    // 幫超連結加上target=_blank
    _result.find('a').each(function (_index, _a) {
        _a = $(_a);
        _a.attr('target', '_blank');
    });
    
	//this._note_container.addClass('adjusted');
	
	$.trigger_callback(_callback);
	return this;
};

/**
 * 建立 (詳細內容) 的按鈕
 * @param {number} _word_count
 * @type {jQuery}
 */
List_note_component.prototype._create_view_thread = function (_word_count) {
    var _ui = $('<span></span>')
        .addClass('view-thread');
    
    var _lang = new KALS_language_param(
        '(FULL DETAIL {0} WORDS)',
        'list_note_component.view_thread',
		[_word_count]
    );
    
    var _msg = KALS_context.lang.line(_lang);
    _ui.html(_msg);
    
    var _this = this;
	
    //_ui.click(function () {
    //    _this.view_thread();
    //});
    
    return _ui;
};

List_note_component.prototype.view_thread = function (_callback) {
    if ($.isset(this._item)) {
		this._item.view_thread(_callback);
	}
    return this;
};

/* End of file List_note_component */
/* Location: ./system/application/views/web_apps/List_note_component.js */