/**
 * Selection_custom_manager
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/24 下午 01:57:42
 * @extends {KALS_user_interface}
 * 
 * @param {Selectable_text} _text
 * @param {String} _prefix 
 */
function Selection_custom_manager(_text, _prefix) {
    
    KALS_user_interface.call(this);
    
    this._text = _text;
//    
//    if (typeof(_config.custom_type_name) === "string") {
//        //$.test_msg("Selection_custom_manager", _config);
//        this._$custom_type_name = _config.custom_type_name;
//    }
//    
//    if (typeof(_config.custom_type_name_prefix) === "string") {
//        //$.test_msg("Selection_custom_manager", _config);
//        this._$custom_type_name_prefix = _config.custom_type_name_prefix;
//    }
    
    this._$custom_type_name = _prefix + "_custom";
    this._$custom_type_name_prefix = _prefix + "_";
    
    this._initialize_auth();
}

// --------------------------------------

// Extend from KALS_user_interface
Selection_custom_manager.prototype = new KALS_user_interface();

// --------------------------------------
// 設定區
// --------------------------------------

/**
 * 自訂的標註名稱
 * @type String
 */
Selection_custom_manager.prototype._$custom_type_name = 'my_custom';

/**
 * 自訂的標註名稱的開頭
 * @type String
 */
Selection_custom_manager.prototype._$custom_type_name_prefix = 'my_';


Selection_custom_manager.prototype._initialize_auth = function () {
    var _this = this;
    KALS_context.auth.add_listener(function (_auth) {
        if (_auth.is_login() === false) {
            _this.clear();
        }
    });
};

/**
 * @type {KALS_text}
 */
Selection_custom_manager.prototype._text = null;

Selection_custom_manager.prototype._my_selections = {
};

/**
 * 
 * @param {String} _type_id 現在標註類型
 * @param {Scope_collection_param} _scope_coll
 * @param {boolean} _is_initialize
 */
Selection_custom_manager.prototype.set_scope_coll = function (_type_id, _scope_coll, _is_initialize) {
    
    if (_scope_coll.length() === 0) {
        return this;
    }
        
    if ($.is_null(_is_initialize)) {
        _is_initialize = false;
    }
    
    //$.test_msg('my_custom_manager set_scope_coll 1'
    //    , typeof(this._my_selections[_type_id]));
    
    //var _my_custom_type_name = 'my_custom_type_' + _type_id;
    
    var _my_custom_type_name = this._$custom_type_name;
    var _custom_type_name_prefix = this._$custom_type_name_prefix;
    
    //$.test_msg('my_custom_manager set_scope_coll', _type_id);
    _type_id = decodeURIComponent(_type_id);
    
    var _my_type = KALS_context.predefined_type.find_type(_type_id);
    //$.test_msg('my_custom_manager 轉換成_my_custom_type_name', [_type_id, $.isset(_my_type) , _my_type.is_predefined(), _my_type.get_my_classname()]);
    if ($.isset(_my_type) && _my_type.is_predefined()) {
        _my_custom_type_name = _my_type.get_predefined_classname(_custom_type_name_prefix);
        $.test_msg("get_my_classname", [_my_type.get_my_classname(), _my_type.get_predefined_classname(_custom_type_name_prefix), this._$custom_type_name_prefix]);
        //_my_custom_type_name = _my_type.get_predefined_classname(_custom_type_name_prefix);
    }
    
    //$.test_msg('Selection_custom_manager.set_scope_coll', [_type_id, _my_custom_type_name, typeof(_my_type)]);
    if (typeof(this._my_selections[_type_id]) === 'undefined') {
        this._my_selections[_type_id] = _my_custom_type_name;
        this.child(_my_custom_type_name, new Selection_custom_type(this._text, _my_custom_type_name));
    }
    
    //$.test_msg('my_custom_manager set_scope_coll 2'
    //    , typeof(this._my_selections[_type_id]));
    
    for (var _i in this._my_selections) {
        var _type_name = this._my_selections[_i];
        
        //$.test_msg('my_custom_manager', [_type_name, _i, _type_id, typeof(this[_type_name])]);
        if (_i === _type_id) {
            this[_type_name].set_scope_coll(_scope_coll);
            continue;
        }   
        else if (_is_initialize === false) {
            //其他的則是刪除標註
            this[_type_name].clear_scope_coll(_scope_coll);
        }
    }
    
    return this;
};

Selection_custom_manager.prototype.clear = function () {
    
    for (var _i in this._my_selections) {
        var _type_name = this._my_selections[_i];
        this[_type_name].clear();
    }
    return this;
};

/* End of file Selection_my_manager */
/* Location: ./system/application/views/web_apps/Selection_my_manager.js */