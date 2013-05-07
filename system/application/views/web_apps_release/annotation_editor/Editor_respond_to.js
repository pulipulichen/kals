/**
 * Editor_respond_to
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/20 下午 02:28:26
 * @extends {KALS_user_interface}
 * @param {Annotation_editor} _editor
 * @param {Annotation_param} _param
 */
function Editor_respond_to(_editor, _param, _removable) {
    
    KALS_user_interface.call(this);
    
    this._editor = _editor;
    
    if ($.isset(_param)) {
		this.set_respond_to(_param);
	}
    
    //$.test_msg('Editor_respond_to()', _removable);
    
    if ($.isset(_removable)) {
		this._removable = _removable;
	}
}

// Extend from KALS_user_interface
Editor_respond_to.prototype = new KALS_user_interface();

/**
 * @type {Annotation_editor}
 */
Editor_respond_to.prototype._editor = null;

/**
 * 回應的標註資料
 * @type {Annotation_param}
 */
Editor_respond_to.prototype._respond_to = null;

/**
 * Create UI
 * @memberOf {Editor_respond_to}
 * @type {jQuery} UI
 */
Editor_respond_to.prototype._$create_ui = function () {
    var _ui = $('<span></span>')
        .addClass('editor-respond-to');
    return _ui;
};

/**
 * 設置回應的參數
 * @param {Annotation_param} _param
 */
Editor_respond_to.prototype.set_respond_to = function (_param) {
    
    var _this = this;
    var _ui = this.get_ui();
    
    //名稱的部份
    var _name, _annotation_id;
    
    if (typeof(_param.annotation_id) != 'undefined') {
		_annotation_id = _param.annotation_id;
	}
	else {
		return this;
	}
    
    if (typeof(_param.user) == 'object'
        && typeof(_param.user.name) != 'undefined') {
        _name = _param.user.name;
        
        //避免名稱太長
        if (_name === null) {
            _name = '';
        }
        if (_name.length > 7) {
            _name = _name.substr(0, 7) + '...';
        }
    }
    else {
        var _anonymous = KALS_context.lang.create_listener(new KALS_language_param(
            'anonymous',
            'user.anonymous'
        ));
        
        _name = $('<span></span>')
            .append(_anonymous);
    } 
    
    var _data_ui = $('<span></span>')
        .addClass('data')
        .attr('id', this._respond_to_id_prefix + _annotation_id)
        .click(function () {
            _this.focus_respond_to_annotation(this.id);
        });
    
    var _name_ui = $('<span></span>')
        .addClass('name')
        .append(_name)
        .appendTo(_data_ui);
        
    var _id_ui = $('<span></span>')
        .addClass('id')
        .html('#' + _annotation_id)
        .appendTo(_data_ui);
    
    //$.test_msg('Editor_respond_to._$create_ui()', this._removable);
    if (this._removable === true) {
        //刪除的部份
        var _delete_ui = $('<span></span>').html('x')
            .addClass('delete')
            .click(function () {
                _this.remove();
            })
            .hover(function () {
                $(this).addClass('hover');
            }, function () {
                $(this).removeClass('hover');
            });
        _delete_ui.appendTo(_ui);
    }
    
    //設置
    this._respond_to = _param;
    
    _data_ui.prependTo(_ui);
    
    
    return this;
};

Editor_respond_to.prototype._removable = true;

Editor_respond_to.prototype._respond_to_id_prefix = 'editor_respond_to_';

Editor_respond_to.prototype.focus_respond_to_annotation = function (_id) {
    
    if (_id === null) {
		return this;
	}
	else {
		_id = $.get_prefixed_id(_id);
	}
    
    this._editor.list_coll.focus(_id, true);
};

/**
 * @type {Annotation_param}
 */
Editor_respond_to.prototype.get_respond_to = function () {
    return this._respond_to;
};

/*
Editor_respond_to.prototype.get_data = function () {
    return this._respond_to;
};
*/

Editor_respond_to.prototype.remove = function () {
    
    KALS_user_interface.prototype.remove.call(this);
    
    this._respond_to = null;
    return this;
};

/* End of file Editor_respond_to */
/* Location: ./system/application/views/web_apps/Editor_respond_to.js */