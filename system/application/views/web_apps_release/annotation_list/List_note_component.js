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
    if ($.isset(_item))
    {
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

List_note_component.prototype._simple_max_length = 150;

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
List_note_component.prototype._$create_ui = function ()
{
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
    if ($.is_null(_respond_to_coll))
    {
        _respond_to_coll = this._item.get_data().respond_to_coll;
    }
    
    if ($.is_null(_respond_to_coll)) {
		return this;
	}
    
    if ($.is_null(this._respond_container)) {
		this.get_ui();
	}
    
    this._respond_container.empty();
    
    for (var _i = 0; _i < _respond_to_coll.length(); _i ++)
    {
        if (_i > 0)
        {
            var _comma = this._create_respond_comma();
            _comma.appendTo(this._respond_container);
        }
        
        var _param = _respond_to_coll.get(_i);
        var _respond_to = this._create_respond_ui(_param);
        _respond_to.appendTo(this._respond_container);
    }
    
    if (_respond_to_coll.length() > 0)
    {
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


List_note_component.prototype.set_note = function (_note) {
    if ($.is_null(_note))
    {
        _note = this._item.get_data().note;
    }
    
    if ($.is_null(_note)) {
		_note = '';
	}
    
    //$.test_msg('List_note.set_note()', [_note, typeof(_note)]);
    
    if ($.is_null(this._note_container)) {
		this.get_ui();
	}
    
    this._note_container.html(_note);
    
    if (this._show_fulltext === false)
    {
        var _text = this._note_container.text();
        _text = $.trim(_text);
        if (_text.length > this._simple_max_length) {
			_text = _text.substr(0, this._simple_max_length) + '...';
			this._note_container.html(_text);
			
			var _view = this._create_view_thread();
			_view.appendTo(this._note_container);
		}
		else {
			this._note_container.html(_text);
		}
    }
    
    return this;
};

List_note_component.prototype._create_view_thread = function () {
    var _ui = $('<span></span>')
        .addClass('view-thread');
    
    var _lang = new KALS_language_param(
        '(VIEW DETAIL)',
        'list_note_component.view_thread'
    );
    
    var _msg = KALS_context.lang.line(_lang);
    _ui.html(_msg);
    
    var _this = this;
    _ui.click(function () {
        _this.view_thread();
    });
    
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