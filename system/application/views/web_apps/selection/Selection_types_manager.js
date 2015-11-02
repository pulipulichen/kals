/**
 * Selection_types_manager
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2015, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2015/11/2 
 * @extends {KALS_user_interface}
 * 
 * @param {String} _name_prefix
 */
function Selection_types_manager(_text, _name_prefix) {
    
    KALS_user_interface.call(this);
    
    var _children_names = [
        'importance',
        'concept',
        'confusion',
        'question',
        'example',
        'summary',
        'custom'
    ];
    
    //var _name_prefix = "my_";
    var _name_prefix = _name_prefix;
    
    for (var _i in _children_names) {
        var _name = _name_prefix + _children_names[_i];
        this.child(_children_names[_i], new Selection_basic_factory(_text, {name: _name, select_once: false}));
    }
	
    return this;
}

// Extend from KALS_user_interface
Selection_types_manager.prototype = new KALS_user_interface();

Selection_types_manager.prototype._my_selections = {
    1: 'importance',
    2: 'question',
    3: 'confusion',
    4: 'summary',
    5: 'concept',
    6: 'example',
    7: 'custom'
};

/**
 * @type {Selection_basic_factory}
 */
Selection_types_manager.prototype.importance = null;

/**
 * @type {Selection_basic_factory}
 */
Selection_types_manager.prototype.concept = null;

/**
 * @type {Selection_basic_factory}
 */
Selection_types_manager.prototype.confusion = null;

/**
 * @type {Selection_basic_factory}
 */
Selection_types_manager.prototype.question = null;

/**
 * @type {Selection_basic_factory}
 */
Selection_types_manager.prototype.example = null;

/**
 * @type {Selection_basic_factory}
 */
Selection_types_manager.prototype.summary = null;


/**
 * @type {Selection_basic_factory}
 */
Selection_types_manager.prototype.custom = null;

/**
 * 
 * @param {String} _type
 * @param {Scope_collection_param} _scope_coll
 * @param {boolean} _is_initialize
 */
Selection_types_manager.prototype.set_scope_coll = function (_type, _scope_coll, _is_initialize) {
    
    //$.test_msg("Selection_types_manager.prototype.set_scope_coll", [_type, _scope_coll, _is_initialize]);
    
    if (_scope_coll.length() === 0) {
        return this;
    }
        
    if ($.is_null(_is_initialize)) {
        _is_initialize = false;
    }
    
    
    //加入基本標註類型檢查
    var _type_param = KALS_context.predefined_type.find_type(_type);
    if (_type_param.is_basic() === true) {
        _type = _type_param.get_type_name();
    }
    else {
        return KALS_text.selection.my_custom.set_scope_coll(_type, _scope_coll, _is_initialize);
    }
    
    for (var _i in this._my_selections) {
        var _type_name = this._my_selections[_i];
        
        if (_type_name === _type) {
            //如果是現在這個類型，則設置
            this[_type].set_scope_coll(_scope_coll);
            //$.test_msg('Selection_types_manager.set_scope_coll()',[ _scope_coll.length(), typeof(this[_type].set_scope_coll), _type]);
            continue;
        }   
        else if (_is_initialize === false) {
            //其他的則是刪除標註
            this[_type_name].clear_scope_coll(_scope_coll);
        }
    }
    
    return this;
};

Selection_types_manager.prototype.clear = function () {
    
    for (var _i in this._my_selections) {
        var _type = this._my_selections[_i];
        //$.test_msg('Selection_types_manager.clear()', _type);
        this[_type].clear();
    }
    return this;
};

/**
 * 這個文字是否是我的標註？或是其他人的標註？
 * @author Pudding 20151102
 * @param {jQuery} _word
 * @returns {Boolean}
 */
Selection_types_manager.prototype.is_contained = function (_word) {
    if (_word === undefined) {
        return false;
    }
    //$.test_msg("開始檢查 is_my", _word.attr("className"));
    for (var _i in this._my_selections) {
        var _selection_name = this._my_selections[_i];
        var _selection = this[_selection_name];
        var _selection_classname = _selection._$name;
        if (_word.hasClass(_selection_classname)) {
            return true;
        }
    }
    return false;
};

/**
 * @see is_contained
 * @param {jQuery} _word
 * @returns {Boolean}
 * @author Pudding 20151102
 */
Selection_types_manager.prototype.is_my = function (_word) {
    return this.is_contained(_word);
};

/**
 * @see is_contained
 * @param {jQuery} _word
 * @returns {Boolean}
 * @author Pudding 20151102
 */
Selection_types_manager.prototype.is_other = function (_word) {
    return this.is_contained(_word);
};


/* End of file Selection_types_manager */
/* Location: ./system/application/views/web_apps/Selection_types_manager.js */