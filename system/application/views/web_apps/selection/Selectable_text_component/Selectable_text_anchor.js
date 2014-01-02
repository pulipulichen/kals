/**
 * Selectable_text_anchor
 *
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) Expression year is undefined on line 7, column 33 in Templates/KALS/KALS_JavaScript_Class.js., Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2014/1/2 下午 08:40:23
 */

/**
 * @memberOf {Selectable_text_anchor}
 * @extends {KALS_user_interface}
 * @constructor
 * @param {Selectable_text} _selectable_text 父物件
 */
function Selectable_text_anchor(_selectable_text) {
    
    this._selectable_text = _selectable_text;
    return this;
    
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Selectable_text_anchor}
 */
Selectable_text_anchor.prototype = new KALS_user_interface();

/**
 * 父物件
 * @type {Selectable_text}
 */
Selectable_text_anchor.prototype._selectable_text;

/**
 * 取得該範圍的文字
 * @param {Scope_collection_param} _scope_coll
 * @type {String}
 */
Selectable_text_anchor.prototype.get_anchor_text = function (_scope_coll) {
    
    if ($.is_null(_scope_coll)) {
        return null;
    }
    
    var _anchor_text = '';
    
    for (var _i = 0; _i < _scope_coll.length(); _i++) {
        var _sentence = '';
        
        var _scope = _scope_coll.get(_i);
        var _from = _scope.get_from();
        var _to = _scope.get_to();
        
        for (var _j = _from; _j < _to + 1; _j++) {
            var _index = _j;
            var _word = this._selectable_text.word.get_word_by_index(_index);
            var _text = _word.text();
            		
            _sentence = _sentence + _text;
            
            if (_j < _to
                && this._selectable_text.word.is_word_next_span(_word)) {
                _sentence = _sentence + ' ';
            }
            
            // @author Pulipuli Chen <pulipuli.chen@gmail.com> 20131230
            // 如果這裡面很多字的話，表示這是一個英文，應該加上空格
            if (_j < _to
                && this.is_word_next_english(_word)) {
                _sentence = _sentence + ' ';
                
                //$.test_msg("is_word_next_english", _sentence);
            }
        }
        
        _sentence = $.trim(_sentence);
        
        //不同範圍之間，以空格斷句！
        if (_i > 0) {
            _anchor_text = _anchor_text + ' ';
        }
           
        _anchor_text = _anchor_text + _sentence;
    }
    
    _anchor_text = $.trim(_anchor_text);
    
    //把' "轉換掉
    //_anchor_text = $.str_replace("'", " ", _anchor_text);
    //_text= $.str_replace("'", "&amp;", _text);
	
    return _anchor_text;
};

/**
 * 取得部份的標註範圍文字
 * @param {Scope_collection_param} _scope_coll 要選取的範圍
 * @param {Number} _max_length 最長字數，預設是50個字。低於這個數字以下不省略
 * @return {String}
 */
Seleactable_text_anchor.prototype.get_abbreviated_anchor_text = function (_scope_coll, _max_length) {
    
    if (_max_length === undefined) {
        _max_length = 50;
    }
    
    var _text = this.get_anchor_text(_scope_coll);

    if (_text.length > _max_length) {
        var _half = parseInt(_max_length / 2);

        var _first_part = _text.substr(0, _half);
        var _last_part = _text.substr(_text.length - _half, _half);
        _text = _first_part + "..." + _last_part; 
    }
    return _text;
};

/**
 * 取得該範圍的文字
 * @param {Scope_collection_param} _scope_coll
 * @param {Scope_collection_param} _focus_coll
 */
Selectable_text_anchor.prototype.get_display_anchor_text = function (_scope_coll, _focus_coll) {
    
    if ($.is_null(_scope_coll)) {
        return null;
    }
    
    var _anchor_text = $('<span></span>');
    
    var _focus_index = [];
    var _focus_head_index = [];
    var _focus_foot_index = [];
    if ($.is_class(_focus_coll, 'Scope_collection_param')) {
        _focus_index = _focus_coll.get_index_array();
        _focus_head_index = _focus_coll.get_from_index_array();
        _focus_foot_index = _focus_coll.get_to_index_array();
    }
    
    var _focus_text = function (_index, _text) {
        if ($.inArray(_index, _focus_head_index) > -1) {
                _text = '<span class="select select_from view">' + _text + '</span>';
        }
        else if ($.inArray(_index, _focus_foot_index) > -1) {
                _text = '<span class="select select_to view">' + _text + '</span>';
        }
        else {
                _text = '<span class="select select_middle view">' + _text + '</span>';
        }
        return _text;
    };
	
    var _focus_single_text = function (_index, _text) {
        if ($.inArray(_index, _focus_head_index) > -1) {
                    _text = '<span class="select select_from select_to view">' + _text + '</span>';
            }
        return _text;
    };
    
    var _word = this._selectable_text.word;
    var _ellipsis = '<span class="ellipsis">...</span>';
    var _last_id = _word.word_count;
    for (var _i = 0; _i < _scope_coll.length(); _i++) {
        var _sentence = '';
        
        var _scope = _scope_coll.get(_i);
        var _from = _scope.get_from();
        var _to = _scope.get_to();
        
        for (var _j = _from; _j < _to + 1; _j++) {
            var _index = _j;
            var _word = _word.get_word_by_index(_index);
            var _text = _word.text();
            
            if (_j < _to
                && _word.is_word_next_span(_word)) {
                _text = _text + ' ';
            }
            else if ($.is_ascii(_text.substr(_text.length-1, 1))) {
                _text = _text + ' ';
            }
            
			
            for (var _k in _focus_index) {
                if ($.inArray(_j, _focus_index[_k]) > -1) {
                    if (_focus_index.length > 1) {
                            _text = _focus_text(_j, _text);
                    }
                    else {
                            _text = _focus_single_text(_j, _text);
                    }
                }    
            }
            
            _sentence = _sentence + _text; 
        }
        
        _sentence = $.trim(_sentence);
        
        //不同範圍之間，以空格斷句！
        if (_from > 0) {
            _sentence = _ellipsis + _sentence;
        }
        if (_i === _scope_coll.length() - 1 && _to < _last_id) {
            _sentence = _sentence + _ellipsis;
        }
           
        //var _sentence_span = $('<span></span>')
        //    .html(_sentence)
        //    .appendTo(_anchor_text);
        $('<span></span>')
            .html(_sentence)
            .appendTo(_anchor_text);
    }
    
    return _anchor_text;
};

/* End of file Selectable_text_anchor */
/* Location: ./system/application/views/web_apps/Selectable_text_anchor.js */