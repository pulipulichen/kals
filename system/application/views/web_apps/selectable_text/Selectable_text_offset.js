/**
 * Selectable_text_offset
 *
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) Expression year is undefined on line 7, column 33 in Templates/KALS/KALS_JavaScript_Class.js., Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2014/1/2 下午 09:04:00
 */

/**
 * @memberOf {Selectable_text_offset}
 * @extends {KALS_user_interface}
 * @constructor
 * @param {Selectable_text} _selectable_text 父物件
 */
function Selectable_text_offset(_selectable_text) {
   
    this._selectable_text = _selectable_text;
    this._selectable_text_word = _selectable_text.word;
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Selectable_text_offset}
 */
Selectable_text_offset.prototype = new KALS_user_interface();

/**
 * 父物件
 * @type {Selectable_text}
 */
Selectable_text_offset.prototype._selectable_text;

/**
 * 父物件的Selectable_text_word
 * @type {Selectable_text_word}
 */
Selectable_text_offset.prototype._selectable_text_word;


// -----------------------------------
// 內部參數設定
// -----------------------------------

// -----------------------------------
// 方法
// -----------------------------------

/**
 * 取得選取範圍的top位置
 * 
 * 2223 轉接完畢
 * 2224 檢查完畢
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text_offset.prototype.get_offset_top = function (_scope_coll) {
    
    var _offset = null;
    if ($.is_null(_scope_coll)) {
        return _offset;
    }
    
    var _index = _scope_coll.get_first_index();
    if ($.isset(_index)) {
        var _word = this._selectable_text_word.get_word_by_index(_index);
        //_offset = _word.offset().top;
        _offset = $.get_offset_top(_word);
    }
    
    return _offset;
};

/**
 * 取得選取範圍最底部的位置
 * 
 * 2224 轉接完畢，檢查完畢
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text_offset.prototype.get_offset_bottom = function (_scope_coll) {
    
    var _offset = null;
    if ($.is_null(_scope_coll)) {
        return _offset;
    }
    
    var _index = _scope_coll.get_last_index();
    if ($.isset(_index)) {
        var _word = this._selectable_text_word.get_word_by_index(_index);
        
        /**
         * @20140110 Pudding Chen
         * 用jQuery的會有很大的問題
         * 所以改用其他方法
         */
        //_offset = _word.offset().top + _word.height();
        _offset = $.get_offset_bottom(_word);
    }
    
    //$.test_msg('取得選取位置底部', [_offset, _word.offset().top, _word.attr("offsetTop")]);
    
    return _offset;
};

/**
 * 取得標註範圍最左邊的位置
 * 
 * 2230 轉接完畢，檢查完畢
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text_offset.prototype.get_offset_left = function (_scope_coll) {
    var _offset = null;
    
    var _words = this._selectable_text.scope.get_words_by_scope_coll(_scope_coll);
    for (var _i in _words) {
        for (var _j in _words[_i]) {
            var _word = _words[_i][_j];
            
            //var _o = _word.offset().left;
            var _o = $.get_offset_left(_word);
            
            if (_offset === null ||
                    _o < _offset) {
                _offset = _o;
            }
        }
    }
    
    return _offset;
};

/**
 * 取得現在標註範圍最右邊的位置
 * 
 * 2231 轉接完畢，檢查完畢
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text_offset.prototype.get_offset_right = function (_scope_coll) {
    var _offset = null;
    
    var _words = this._selectable_text.scope.get_words_by_scope_coll(_scope_coll);
    for (var _i in _words) {
        for (var _j in _words[_i]) {
            var _word = _words[_i][_j];
            
            //var _o = _word.offset().left + _word.width();
            var _o = $.get_offset_right(_word);
            
            if (_offset === null 
                || _o > _offset) {
                _offset = _o;
            }
        }
    }
    
    return _offset;
};

/**
 * 取得標註範圍中，第一個範圍的第一個字的左邊位置
 * 
 * 2233 轉接完畢，檢查完畢
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text_offset.prototype.get_offset_first_left = function (_scope_coll) {
    var _offset = null;
    
    var _index = _scope_coll.get_first_index();
    
    if ($.is_number(_index)) {
        var _word = this._selectable_text_word.get_word_by_index(_index);
        //_offset = _word.offset().left;
        _offset = $.get_offset_left(_word);
    }
    
    return _offset;
};

/**
 * 取得標註範圍中，最後一個範圍的最後一個字的右邊位置
 * 
 * 2233 轉接完畢，檢查完畢
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text_offset.prototype.get_offset_last_right = function (_scope_coll) {
    var _offset = null;
    
    var _index = _scope_coll.get_last_index();
    
    if ($.is_number(_index)) {
        var _word = this._selectable_text_word.get_word_by_index(_index);
        //_offset = _word.offset().left + _word.width();
        _offset = $.get_offset_right(_word);
    }
    
    return _offset;
};


/* End of file Selectable_text_offset */
/* Location: ./system/application/views/web_apps/Selectable_text_offset.js */