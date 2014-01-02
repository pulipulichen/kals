/**
 * Selectable_text_word
 * 
 * 建立Selectable_text中的Word
 * 
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) Expression year is undefined on line 7, column 33 in Templates/KALS/KALS_JavaScript_Class.js., Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2014/1/2 下午 08:25:49
 */

/**
 * @memberOf {Selectable_text_word}
 * @extends {KALS_user_interface}
 * @constructor
 */
function Selectable_text_word() {
    
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Selectable_text_word}
 */
Selectable_text_word.prototype = new KALS_user_interface();


/**
 * 文字記數，初始化時使用。
 * @type {number}
 * @TODO 20140102 尚未更新相關使用的程式碼 this.word_count
 */
Selectable_text_wordprototype.word_count = 0;


/**
 * 可選取文字的classname
 * @type {String}
 * @TODO 20140102 尚未更新相關使用的程式碼 this.word_classname
 */
Selectable_text_word.prototype.word_classname = 'kals-word';

/**
 * 可選取文字的ID前置
 * @type {String}
 * @TODO 20140102 尚未更新相關使用的程式碼 this.word_id_prefix
 */
Selectable_text_word.prototype.word_id_prefix = 'kals_word_';


Selectable_text_word.prototype._span_classname = 'span';

// ----------------------------------

/**
 * 從ID取得Word
 * @param {number} _id
 * @type {jQuery}
 * @TODO 20140102 尚未更新相關使用的程式碼 this.get_word_by_index
 */
Selectable_text_word.prototype.get_word_by_index = function(_index) {
    
    var _word_id_prefix = this.word_id_prefix;
    var _word_id = _word_id_prefix + _index;
    var _word = $('#' + _word_id);
    return _word;
};


/**
 * 取得word id，但似乎沒有人使用他
 * @param {jQuery} _word
 * @TODO 20140102 尚未更新相關使用的程式碼 this.get_word_id
 */
Selectable_text_word.prototype.get_word_id = function (_word) {
    if ($.is_object(_word)) {
        if ($.is_jquery(_word)) {
            _word = _word.attr('id');
        }
        else {
            _word = _word.id;
        }
    }
       
    var _id_prefix = this.word_id_prefix;
    if ($.starts_with(_word, _id_prefix)) {
        _word = _word.substring(_id_prefix.length, _word.length);
    }
    return parseInt(_word,10);
};


/**
 * 如果下一個字是英文的話
 * @param {jQuery} _word
 * @returns {Boolean}
 * @TODO 20140102 尚未更新相關使用的程式碼 this.get_word_id
 */
Selectable_text_word.prototype.is_word_next_english = function (_word) {
    var _word_id = this.get_word_id(_word);
    _word_id++;
    var _next = this.get_word_by_index(_word_id);
    var _text = _next.text();
    if (_text.length > 1) {
        // 如果超過一個字，那大概就是英文了
        return true;
    }
    else if ($.match_english(_text)) {
        return true;
    }
    
    return false;
};

/**
 * 如果下一個字是空格的話
 * @param {jQuery} _word
 * @returns {Boolean}
 * @TODO 20140102 尚未更新相關使用的程式碼 this.get_word_id
 */
Selectable_text_word.prototype.is_word_next_span = function (_word) {
    var _next = _word.next();
    if (_next.length === 0) {
        return false;
    }
    else {
        return _next.hasClass(this._span_classname);
    }
};

Selectable_text_word.prototype.get_word_next_span = function (_word) {
    var _next = _word.next();
    //_next.css('background-color', 'red');
    //$.test_msg('Selectable_text.is_word_next_span()', _next.length);
    if (_next.length === 0) {
        return null;
    }
    else {
        return _next;
    }
};

/**
 * 將範圍轉換成jQuery陣列來選取
 * @param {Scope_collection_param} _scope_coll
 * @type {jQuery[][]} 注意，陣列是兩階層喔！
 * @TODO 20140102 尚未更新相關使用的程式碼 this.get_word_id
 */
Selectable_text_word.prototype.get_words_by_scope_coll = function (_scope_coll) {
    
    var _coll = [];
    
    if ($.is_null(_scope_coll)) {
        return _coll;
    }
    
    var _index_array = _scope_coll.get_index_array();
    
    //$.test_msg('Selectable_text.get_words_by_scope_coll()', _index_array);
    
    for (var _i in _index_array) {
        var _ary = [];
        var _index_ary = _index_array[_i];
        for (var _j in _index_ary) {
            var _index = _index_ary[_j];
            var _word = this.get_word_by_index(_index);
            _ary.push(_word);
        }
        _coll.push(_ary);
    }
    
    return _coll;
};

/**
 * 建立一個不可選取的文字
 * @param {String} _text
 * @type {jQuery}
 */
Selectable_text_word.prototype.create_span_word = function(_text) {
    var _word = document.createElement("span");
    _word.className = this._span_classname + ' ' + this.word_classname;
	
    var _t_text = document.createTextNode(_text);
    _word.appendChild(_t_text);

    return _word;
};


// --------
// Offset
// --------

/**
 * 取得選取範圍的top位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text_word.prototype.get_offset_top = function (_scope_coll) {
    
    var _offset = null;
    if ($.is_null(_scope_coll)) {
        return _offset;
    }
    
    var _index = _scope_coll.get_first_index();
    if ($.isset(_index)) {
        var _word = this.get_word_by_index(_index);
        _offset = _word.offset().top;
    }
    
    return _offset;
};

/**
 * 取得選取範圍最底部的位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text_word.prototype.get_offset_bottom = function (_scope_coll) {
    var _offset = null;
    if ($.is_null(_scope_coll)) {
        return _offset;
    }
    
    var _index = _scope_coll.get_last_index();
    if ($.isset(_index)) {
        var _word = this.get_word_by_index(_index);
        _offset = _word.offset().top + _word.height();
    }
    
    return _offset;
};

/**
 * 取得標註範圍最左邊的位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text_word.prototype.get_offset_left = function (_scope_coll) {
    var _offset = null;
    
    var _words = this.get_words_by_scope_coll(_scope_coll);
    for (var _i in _words) {
        for (var _j in _words[_i]) {
            var _word = _words[_i][_j];
            
            var _o = _word.offset().left;
            
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
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text_word.prototype.get_offset_right = function (_scope_coll) {
    var _offset = null;
    
    var _words = this.get_words_by_scope_coll(_scope_coll);
    for (var _i in _words) {
        for (var _j in _words[_i]) {
            var _word = _words[_i][_j];
            
            var _o = _word.offset().left + _word.width();
            
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
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text_word.prototype.get_offset_first_left = function (_scope_coll) {
    var _offset = null;
    
    var _index = _scope_coll.get_first_index();
    
    if ($.is_number(_index)) {
        var _word = this.get_word_by_index(_index);
        _offset = _word.offset().left;
    }
    
    return _offset;
};

/**
 * 取得標註範圍中，最後一個範圍的最後一個字的右邊位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text_word.prototype.get_offset_last_right = function (_scope_coll) {
    var _offset = null;
    
    var _index = _scope_coll.get_last_index();
    
    if ($.is_number(_index)) {
        var _word = this.get_word_by_index(_index);
        _offset = _word.offset().left + _word.width();
    }
    
    return _offset;
};

/* End of file Selectable_text_word */
/* Location: ./system/application/views/web_apps/Selectable_text_word.js */