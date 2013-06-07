/**
 * Note_editor
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/19 下午 06:12:11
 * @extends {Event_dispatcher}
 * @param {Annotation_editor} _editor
 */
function Note_editor(_editor) {
    
    Event_dispatcher.call(this);
            
    this._$apply_types = [];
    if ($.isset(_editor)) {
        this._editor = _editor;
        //this.listen_editor();
        
    }
}

Note_editor.prototype = new Event_dispatcher();

/**
 * @type {Annotation_editor}
 */
Note_editor.prototype._editor = null;

Note_editor.prototype._$name = 'textarea';

Note_editor.prototype.get_name = function () {
    return this._$name;
};

Note_editor.prototype._$classname = 'Note_editor';

Note_editor.prototype.get_classname = function () {
    return this._$classname;
};

Note_editor.prototype._$apply_type = [];

/**
 * Create UI
 * @memberOf {Note_editor}
 * @type {jQuery} UI
 */
Note_editor.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .append(this.create_textarea());
    var _this = this;
    this.notify_ready();
    
        _this = this;
        setTimeout(function() {
            _this.notify_ready();    
        }, 0);
        
    return _ui;
};

Note_editor.prototype.create_textarea = function () {
    var _ui = $('<textarea></textarea>')
        .addClass('note-editor-textarea');
    return _ui;
};

Note_editor.prototype.get_text = function () {
    var _ui = this.get_ui('.note-editor-textarea:first');
    var _text = _ui.val();
    
    
    if ($.trim(_text) === '') {
		return null;
	}
	else {
		return _text;
	}
};

/**
 * 設定指定文字到筆記編輯器中
 * @param {string} _text
 */
Note_editor.prototype.set_text = function (_text) {
    var _setted_text = this.get_text();
    
    //$.test_msg('Note_editor.set_text() setted text', [_text, _setted_text]);
    
    if ($.is_null(_text)) {
		_text = '';
	}
    
    if (_text == _setted_text) {
		return this;
	}
    
    var _ui = this.get_ui('.note-editor-textarea:first');
    //$.test_msg('Note_editor.set_text()', [_text, _ui.length]);
    
    _ui.val(_text);
    
    return this;
};

Note_editor.prototype.reset = function () {
    //var _ui = this.get_ui('.note-editor-textarea:first');
    //$.test_msg('Note_editor.set_text()', [_text, _ui.length]);
    
    this.set_text('');
    return this;
};

Note_editor.prototype.notify_ready = function () {
    
    var _this = this;
    
    //$.test_msg('Note_editor.notify_ready()', [this._$name, this._listeners.length, this._listeners[0]]);
    setTimeout(function () {
        _this.notify_listeners();
    }, 0);
    
    return this;
};

Note_editor.prototype.focus = function () {
	var _ui = this.get_ui('.note-editor-textarea:first');
	if (_ui.length > 0) {
		_ui.focus();	
	}
	return this;
};


/* End of file Note_editor */
/* Location: ./system/application/views/web_apps/Note_editor.js */