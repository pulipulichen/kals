/**
 * Selectable_text_scope
 *
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) Expression year is undefined on line 7, column 33 in Templates/KALS/KALS_JavaScript_Class.js., Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2014/1/2 下午 08:48:13
 */

/**
 * @memberOf {Selectable_text_scope}
 * @extends {KALS_user_interface}
 * @constructor
 * @param {Selectable_text} _selectable_text 父物件
 */
function Selectable_text_scope(_selectable_text) {
    
    this._selectable_text = _selectable_text;
    //this._selectable_text_word = _selectable_text.word;
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Selectable_text_word}
 */
Selectable_text_scope.prototype = new KALS_user_interface();

/**
 * 父物件
 * @type {Selectable_text}
 */
Selectable_text_scope.prototype._selectable_text;

/**
 * 父物件的Selectable_text_word
 * @type {Selectable_text_word}
 * @deprecated Pudding 201511112
 */
//Selectable_text_scope.prototype._selectable_text_word;

// -----------------------------------
// 內部參數設定
// -----------------------------------

Selectable_text_scope.prototype.selected_classname = 'selected';
Selectable_text_scope.prototype.selected_from_classname = 'from';
Selectable_text_scope.prototype.selected_to_classname = 'to';
Selectable_text_scope.prototype.selected_middle_classname = 'middle';

// -----------------------------------
// 方法
// -----------------------------------

/**
 * 從classname取回scope_coll
 * 
 * 2207 轉接完成
 * 2207 檢查完成
 * @param {String} _classname
 * @type {Scope_collection_param}
 */
Selectable_text_scope.prototype.retrieve_scope_coll = function (_classname) {
    
    var _selectable_text_word = this._selectable_text.word;
    var _word_classname = _selectable_text_word.classname;
    
    var _classnames = _classname.split(' ');
    _classname = _classnames.join('.');
    
    var _words = $('.' + _word_classname + '.' + _classname);
    
    var _scope_coll = new Scope_collection_param();
    
    var _from, _to, _last_to;
    for (var _i = 0; _i < _words.length; _i++) {
        var _id = $.get_prefixed_id(_words.eq(_i));
        
        if (_from === null) {
            _from = _id;
        }
        else {
            if ((_id - _from) === 1) {
                _to = _id;
            }
            else if (_to !== null 
                    && (_id - _to) === 1) {
                _to = _id;
            }
            else {
                _scope_coll.add(_from, _to);
                _from = _id;
                _to = null;
            }
        }
    }
    
    return _scope_coll;
};


/**
 * 對指定範圍加上_classname
 * 
 * 2208 檢查完成
 * @param {Scope_collection_param} _scope_coll
 * @param {String} _classname
 * @param {function} _callback
 */
Selectable_text_scope.prototype.add_class = function(_scope_coll, _classname, _callback) {
    
    var _selectable_text_word = this._selectable_text.word;
    var _selectable_text_spot = this._selectable_text.spot;
    
    var _words = this.get_words_by_scope_coll(_scope_coll);
    
    var _classnames = this._filter_classname(_classname);
    
    var _this = this;
    var _add_class = function (_i, _j) {
        var _word = _words[_i][_j];
            
        // 如果標註位置有kals-annotation-spot，那就不加classname
        if (_selectable_text_spot.is_spot(_word)) {
            return;
        }
        
        for (var _c in _classnames) {
            
            _classname = _classnames[_c];
            _word.addClass(_classname);
            
            //_word.css('color', 'red');
            //$.test_msg('Selectable_text.add_class()', [_classname, _word.length]);
            
            if (_j === 0) {
                _word.addClass(_classname + '_from');
            }
            else if (_j === _words[_i].length - 1) {
                _word.addClass(_classname + '_to');
            }
            else {
                _word.addClass(_classname + '_middle');
            }
            
            if (_word.hasClass(_classname + '_to') === false
                && _selectable_text_word.is_word_next_span(_word)) {
                var _span = _selectable_text_word.get_word_next_span(_word); 
                _span.addClass(_classname + '_middle');
                _span.addClass(_classname);
                //$.test_msg('text.add_class()', [_span.length, _span.css('')]);
            }
            
            if (_words[_i].length === 1) {
                _word.addClass(_classname + '_to');
            }    
        }
    };
    
    
    var _loop_i = function (_i) {
        if (_i < _words.length) {
            
        var _loop_j = function (_j) {
            if (_j < _words[_i].length) {
                for (_j; _j < _j + 5 && _j < _words[_i].length; _j++) {
                    _add_class(_i, _j);
                }

                setTimeout(function () {
                    //_j++;
                    _loop_j(_j);
                }, 1);
            }
            else {
                setTimeout(function () {
                    _i++;
                    _loop_i(_i);
                }, 1);
            }
        };
    
            _loop_j(0);
        }
        else {
            $.trigger_callback(_callback);
        }
    };
    
    _loop_i(0);
    
    return this;
};

/**
 * 先過濾classname
 * 
 * 2209 不需要檢查，也不需要轉接
 * @param {String|String[]} _classname
 * @type {String[]}
 */
Selectable_text_scope.prototype._filter_classname = function (_classname) {
    var _classnames;
    if ($.is_array(_classname)) {
        _classnames = _classname;
    }
    else if (_classname.indexOf(' ') > -1) {
        _classnames = _classname.split(' ');
    }
    else {
        _classnames = [_classname];
    }
    
    return _classnames;
};

/**
 * 取消_classname，或是針對_scope取消_classname
 * 
 * 2210 轉接完成
 * 2212 檢查完成
 * @param {Scope_collection_param|String} _scope_coll
 * @param {String|null} _classname
 * @param {function} _callback
 */
Selectable_text_scope.prototype.remove_class = function (_scope_coll, _classname, _callback) {
    
    // 取得word元件
    var _selectable_text_word = this._selectable_text.word;
    
    if ($.is_string(_scope_coll) && $.is_null(_classname)) {
        _classname = _scope_coll;
        _scope_coll = null;
    }
    
    var _classnames = this._filter_classname(_classname);
    
    if ($.isset(_scope_coll)) {
        var _words = this.get_words_by_scope_coll(_scope_coll);
        for (var _i in _words) {
            for (var _j in _words[_i]) {
                var _word = _words[_i][_j];
                for (var _c in _classnames) {
                    _classname = _classnames[_c];
                    
                    if (_word.hasClass(_classname + '_to') === false
                        && _selectable_text_word.is_word_next_span(_word)) {
                        var _span = _selectable_text_word.get_word_next_span(_word);
                        _span.removeClass(_classname + '_middle');
                        _span.removeClass(_classname);
                    }
                    
                    if (_j === 0) {
                        _word.removeClass(_classname + '_from');
                    } 
                    else if (_j === _words[_i].length - 1) {
                        _word.removeClass(_classname + '_to');
                    }
                    else {
                        _word.removeClass(_classname + '_middle');
                    }
                    
                    _word.removeClass(_classname);
                    
                }   //for (var _c in _classnames) {
            }   //for (var _j in _words[_i]) {
        }   //for (var _i in _words) {
    }   //if ($.isset(_scope_coll)) {
    else {
        
        for (_j in _classnames) {
            _classname = _classnames[_j];
            //要記得是限定在選取範圍喔！
            $('.' + _selectable_text_word.classname + '.' + _classname)
                .removeClass(_classname)
                .removeClass(_classname + '_from')
                .removeClass(_classname + '_to')
                .removeClass(_classname + '_middle');
        }   //for (_j in _classnames) {
    }   //else {
    return this._selectable_text;
};

/**
 * 取消_classname，並針對_scope加上_classname
 * 
 * 2212 轉接完成，不需檢查
 * @param {Scope_collection_param} _scope_coll
 * @param {String} _classname
 */
Selectable_text_scope.prototype.set_class = function (_scope_coll, _classname) {
    this.remove_class(_classname);
    return this.add_class(_scope_coll, _classname);
};


/**
 * 取得推薦的範圍
 * 
 * 2205 轉接完成
 * 2217 檢查完畢
 * @param {Scope_collection_param} _scope_coll
 * @type {Scope_collection_param}
 */
Selectable_text_scope.prototype.get_recommend_scope_coll = function (_scope_coll) {
    
    if ($.is_null(_scope_coll)) {
        return null;
    }
    
    var _selectable_text_word = this._selectable_text.word;
    var _selectable_text_sentence = this._selectable_text.sentence;
    var _selectable_text_paragraph = this._selectable_text.paragraph;
    
    var _word_id_prefix = _selectable_text_word.id_prefix;
    var _sentence_punctuation_class_name = _selectable_text_sentence.sententce_punctuation_classname;
    
    var _recommend_scope_coll = new Scope_collection_param();
    var _sentence = 0;
    var _paragraph_id;
    
    for (var _i = 0; _i < _scope_coll.length(); _i++) {
        var _s = _scope_coll.get(_i);
        var _from_index = _s.get_from();
        var _from = _selectable_text_word.get_word_by_index(_from_index);
        var _to_index = _s.get_to();
        var _to = _selectable_text_word.get_word_by_index(_to_index);
        
        //在此做調整
        
        //調整from
        _sentence = 0;
        _paragraph_id = _selectable_text_paragraph.get_paragraph_id(_from);
        var _from_id = $.get_prefixed_id(_from.id());
        var _prev_word = $('#' + _word_id_prefix + (_from_id) );
        
        while (_prev_word.exists()
            && _selectable_text_paragraph.get_paragraph_id(_prev_word) === _paragraph_id) {
            if (_prev_word.hasClass(_sentence_punctuation_class_name)) {
                if (_sentence === 0) {
                    _sentence++;
                }
                else {
                    break;
                }
            }
            
            _from_id = $.get_prefixed_id(_prev_word);
            _prev_word = $('#' + _word_id_prefix + (_from_id-1) );
        }        
        
        //調整to
        _sentence = 0;
        _paragraph_id = _selectable_text_paragraph.get_paragraph_id(_to);
        var _to_id = $.get_prefixed_id(_to.id());
        var _next_word = $('#' + _word_id_prefix + (_to_id) );
        if (_next_word.hasClass(_sentence_punctuation_class_name)) {
            _sentence++;
        }
                    
        while (_next_word.exists()
            && _selectable_text_paragraph.get_paragraph_id(_next_word) === _paragraph_id) {
            _to_id = $.get_prefixed_id(_next_word);
            _next_word = $('#' + _word_id_prefix + (_to_id+1) );
            
            if (_next_word.hasClass(_sentence_punctuation_class_name)) {
                if (_sentence === 0) {
                    _sentence++;
                }
                else {
                    _to_id = $.get_prefixed_id(_next_word);
                    break;
                }
            }
        }
        
        //_recommend_scope.push([_from_id, _to_id]);
        _recommend_scope_coll.add(_from_id, _to_id);
    }
    
    return _recommend_scope_coll;
};

/**
 * 將範圍轉換成jQuery陣列來選取
 * 
 * 2322 檢查完成，轉接完成
 * @param {Scope_collection_param} _scope_coll
 * @type {jQuery[][]} 注意，陣列是兩階層喔！
 */
Selectable_text_scope.prototype.get_words_by_scope_coll = function (_scope_coll) {
    
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
            var _word = this._selectable_text.word.get_word_by_index(_index);
            _ary.push(_word);
        }
        _coll.push(_ary);
    }
    
    return _coll;
};

/* End of file Selectable_text_scope */
/* Location: ./system/application/views/web_apps/Selectable_text_scope.js */