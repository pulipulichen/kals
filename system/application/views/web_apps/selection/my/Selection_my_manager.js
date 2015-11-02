/**
 * Selection_my_manager
 *
 * @deprecated Pudding 20151102 用 Selection_types_manager 取代
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/24 下午 01:57:42
 * @extends {KALS_user_interface}
 */
function Selection_my_manager(_text) {
    
    KALS_user_interface.call(this);
    
//    this.child('importance', new Selection_my_importance(_text));
//    this.child('concept', new Selection_my_concept(_text));
//    this.child('confusion', new Selection_my_confusion(_text));
//    this.child('question', new Selection_my_question(_text));
//    this.child('example', new Selection_my_example(_text));
//    this.child('summary', new Selection_my_summary(_text));
//    this.child('custom', new Selection_my_custom(_text));
    
    var _children_names = [
        'importance',
        'concept',
        'confusion',
        'question',
        'example',
        'summary',
        'custom'
    ];
    
    var _name_prefix = "my_"
    for (var _i in _children_names) {
        var _name = _name_prefix + _children_names[_i];
        this.child(_children_names[_i], new Selection_basic_factory(_text, {name: _name, select_once: false}));
    }
	
    return this;
}

// Extend from KALS_user_interface
Selection_my_manager.prototype = new KALS_user_interface();

Selection_my_manager.prototype._my_selections = {
	1: 'importance',
	2: 'question',
	3: 'confusion',
	4: 'summary',
	5: 'concept',
	6: 'example',
	7: 'custom'
};

/**
 * @type {Selection_my_importance}
 */
Selection_my_manager.prototype.importance = null;

/**
 * @type {Selection_my_concept}
 */
Selection_my_manager.prototype.concept = null;

/**
 * @type {Selection_my_confusion}
 */
Selection_my_manager.prototype.confusion = null;

/**
 * @type {Selection_my_question}
 */
Selection_my_manager.prototype.question = null;

/**
 * @type {Selection_my_example}
 */
Selection_my_manager.prototype.example = null;

/**
 * @type {Selection_my_summary}
 */
Selection_my_manager.prototype.summary = null;


/**
 * @type {Selection_my_custom}
 */
Selection_my_manager.prototype.custom = null;

/**
 * 
 * @param {String} _type
 * @param {Scope_collection_param} _scope_coll
 * @param {boolean} _is_initialize
 */
Selection_my_manager.prototype.set_scope_coll = function (_type, _scope_coll, _is_initialize) {
    
    //if (typeof(_scope_coll) !== "object" 
    //        || _scope_coll.length() === 0) {
    if (_scope_coll.length() === 0) {
        return this;
    }
        
    if ($.is_null(_is_initialize)) {
		_is_initialize = false;
	}
    
    
    //$.test_msg('Selection_my_manager.set_scope_coll()', [_type, $.is_number(_type), typeof(this._my_selections[_type])]);
    //if (typeof(this._my_selections[_type]) == 'string')
    //{
    //    _type = this._my_selections[_type];
    //}
    
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
        
        
        //$.test_msg('Selection_my_manager.set_scope_coll()', [_type, _type_name, _i]);
        
        if (_type_name === _type) {
            //如果是現在這個類型，則設置
            this[_type].set_scope_coll(_scope_coll);
            //$.test_msg('Selection_my_manager.set_scope_coll()',[ _scope_coll.length(), typeof(this[_type].set_scope_coll), _type]);
            continue;
        }   
        else if (_is_initialize === false) {
            //其他的則是刪除標註
            this[_type_name].clear_scope_coll(_scope_coll);
        }
    }
    
    return this;
};

Selection_my_manager.prototype.clear = function () {
    
    for (var _i in this._my_selections) {
        var _type = this._my_selections[_i];
        //$.test_msg('Selection_my_manager.clear()', _type);
        this[_type].clear();
    }
    return this;
};

/**
 * 這個文字是否是我的標註？
 * @param {jQuery} _word
 * @returns {Boolean}
 */
Selection_my_manager.prototype.is_my = function (_word) {
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

/* End of file Selection_my_manager */
/* Location: ./system/application/views/web_apps/Selection_my_manager.js */