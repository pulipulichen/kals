/**
 * Editor_respond_to_collection
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/20 下午 02:28:32
 * @extends {KALS_user_interface}
 * @param {Annotation_editor} _editor
 */
function Editor_respond_to_collection(_editor) {
    
    KALS_user_interface.call(this);
    
    this._responds = [];
    
    this.set_editor(_editor);
}

// Extend from KALS_user_interface
Editor_respond_to_collection.prototype = new KALS_user_interface();

// --------
// Annotation Editor
// --------

/**
 * @type {Annotation_editor}
 */
Editor_respond_to_collection.prototype._editor = null;

Editor_respond_to_collection.prototype.set_editor = function (_editor) {
    if ($.isset(_editor))
    {
        this._editor = _editor;   
        this._listen_editor();    
    }
    return this;
};

/**
 * Create UI
 * @memberOf {Editor_respond_to_collection}
 * @type {jQuery} UI
 */
Editor_respond_to_collection.prototype._$create_ui = function ()
{
    var _ui = $('<span></span>')
        .addClass('editor-respond-to-collection');
      
    return _ui;
};

/**
 * 標註本身
 * @type {Editor_respond_to[]}
 */
Editor_respond_to_collection.prototype._responds = [];

Editor_respond_to_collection.prototype._$removable = true;

/**
 * 新增標註
 * @param {Annotation_param|Annotation_collection_param} _param
 */
Editor_respond_to_collection.prototype.add_respond_to = function (_param) {
    var _i;
    var _removable = this._$removable;
    
    if ($.is_array(_param))
    {
        for (_i in _param)
        {
            this.add_respond_to(_param[_i], _removable);
        }
        return this;
    }
    else if ($.is_class(_param, 'Annotation_collection_param'))
    {
        var _coll = _param.annotations;
        for (_i in _coll) //變數宣告?
        {
            this.add_respond_to(_coll[_i], _removable);
        }
        return this;
    }
    else if ($.is_class(_param, 'Annotation_param') === false)
    {
        return this;
    }
    
    //要先確認是否已經有這個respond
    if (this.has_respond_to(_param) === true) {
		return this;
	}
    
    var _respond = new Editor_respond_to(this._editor, _param, _removable);
    
    var _ui = this.get_ui();
    var _respond_ui = _respond.get_ui();
    _ui.prepend(_respond_ui);
    
    this._responds.push(_respond);
    //$.test_msg('Editor_respond_to_collection.add_respond_to()', this._responds.length);
    return this;
};

/**
 * @param {Annotation_param} _param
 */
Editor_respond_to_collection.prototype.has_respond_to = function (_param) {
    
    //是以id來比較的
    var _annotation_id = _param.annotation_id;
    
    //$.test_msg('Editor_respond_to_colleciton.has_respond_to()', [_annotation_id, this._responds.length]);
    
    for (var _i in this._responds)
    {
        var _respond = this._responds[_i];
        var _respond_param = _respond.get_respond_to();
        
        if ($.is_null(_respond_param))
        {
            continue;
        }
        
        var _respond_id = _respond_param.annotation_id;
        
        //$.test_msg('Editor_respond_to_colleciton.has_respond_to() for loop ', [(_respond_id == _annotation_id), _respond_id]);
        
        if (_respond_id == _annotation_id)
        {
            return true;
        }
    }
    
    return false;
};

Editor_respond_to_collection.prototype.reset = function () {
    
    var _responds = this._responds;
    for (var _i in _responds)
    {
        _responds[_i].remove();
    }
    
    var _ui = this.get_ui();
    _ui.empty();
    
    this._responds = [];
    return this;
};

/**
 * 
 * @param {Annotation_collection_param} _param_coll
 */
Editor_respond_to_collection.prototype.set_respond_to_coll = function(_param_coll) {
    this.reset();
    return this.add_respond_to(_param_coll);
};

/**
 * @type {Annotation_collection_param}
 */
Editor_respond_to_collection.prototype.get_respond_to_coll = function () {
    /*
    var _coll = [];
    
    var _responds = this._responds;
    for (var _i in _responds)
    {
        var _param = _responds[_i].get_respond_to();
        if (_param != null)
            _coll.push(_param);
    }
    
    return _coll;
    */
    if (this._responds.length === 0) {
		return null;
	}
    
    var _coll = new Annotation_collection_param();
    
    for (var _i in this._responds)
    {
        var _respond = this._responds[_i];
        var _param = _respond.get_respond_to();
        _coll.add(_param);
    }
    
    return _coll;
};

Editor_respond_to_collection.prototype._listen_editor = function () {
    
    var _this = this;
    this._editor.add_listener('set', function (_editor, _param) {
        _this.set_data(_param);
    });
    
    this._editor.add_listener('reset', function (_editor) {
        _this.reset();
    });
    
    this._editor.add_listener('get', function (_editor, _param) {
        var _data = _this.get_data();
        //$.test_msg('Editor_respond_to_collection._listen_editor() get', _data);
        
        if ($.isset(_data)) {
			_param[_this._$listen_field] = _data;
		}
    });
};

/**
 * 精簡過的資料
 * @type {Annotation_collection_param}
 */
Editor_respond_to_collection.prototype.get_data = function () {
    
    var _coll = this.get_respond_to_coll();
    if ($.is_null(_coll)) {
		return null;
	}
    
    var _new_coll = new Annotation_collection_param();
    
    for (var _i = 0; _i < _coll.length(); _i++)
    {
        var _param = _coll.get(_i);
        var _annotation_id = _param.annotation_id;
        var _user = _param.user;
        
        var _new_param = new Annotation_param();
        _new_param.annotation_id = _annotation_id;
        _new_param.user = _user;
        _new_coll.add(_new_param);
    }
    
    return _new_coll;
};

/**
 * @param {Annotation_param} _param
 */
Editor_respond_to_collection.prototype.set_data = function (_param) {
    
    if (typeof(_param[this._$listen_field]) == 'undefined') {
		return this;
	}
    
    var _respond_to_coll = _param[this._$listen_field];
    this.reset();
    return this.set_respond_to_coll(_respond_to_coll);
};

Editor_respond_to_collection.prototype._$listen_field = 'respond_to_coll';

/* End of file Editor_respond_to_collection */
/* Location: ./system/application/views/web_apps/Editor_respond_to_collection.js */