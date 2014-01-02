/**
 * Selectable_text_classname
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
 * @memberOf {Selectable_text_classname}
 * @extends {KALS_user_interface}
 * @constructor
 * @param {Selectable_text} _selectable_text 父物件
 */
function Selectable_text_classname(_selectable_text) {
    
    this._selectable_text = _selectable_text;
    this._word = _selectable_text.word;
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Selectable_text_word}
 */
Selectable_text_classname.prototype = new KALS_user_interface();

/**
 * 父物件
 * @type {Selectable_text}
 */
Selectable_text_classname.prototype._selectable_text;

/**
 * 父物件的Selectable_text_word
 * @type {Selectable_text_word}
 */
Selectable_text_classname.prototype._selectable_text_word;


/**
 * 
 * @param {String} _classname
 * @type {Scope_collection_param}
 */
Selectable_text_classname.prototype.retrieve_scope_coll = function (_classname) {
    
    var _selectable_text_word = this._selectable_text_word;
    var _word_classname = _selectable_text_word.word_classname;
    
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
            else if (_to !== null && (_id - _to) === 1) {
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
 * @param {Scope_collection_param} _scope_coll
 * @param {String} _classname
 */
Selectable_text_classname.prototype.add_class = function(_scope_coll, _classname, _callback) {
    
    var _selectable_text_word = this._selectable_text_word;
    var _words = _selectable_text_word.get_words_by_scope_coll(_scope_coll);
    
    var _classnames = this._filter_classname(_classname);
    
    var _this = this;
    var _add_class = function (_i, _j) {
        var _word = _words[_i][_j];
        
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
    
    var _loop_i = function (_i) {
        if (_i < _words.length) {
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
 * @param {String|String[]} _classname
 * @type {String[]}
 */
Selectable_text_classname.prototype._filter_classname = function (_classname) {
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
 * @param {Scope_collection_param|String} _scope_coll
 * @param {String|null} _classname
 */
Selectable_text_classname.prototype.remove_class = function (_scope_coll, _classname, _callback) {
    
    var _selectable_text_word = this._selectable_text_word;
    if ($.is_string(_scope_coll) && $.is_null(_classname)) {
        _classname = _scope_coll;
        _scope_coll = null;
    }
    
    var _classnames = this._filter_classname(_classname);
    
    if ($.isset(_scope_coll)) {
        var _words = _selectable_text_word.get_words_by_scope_coll(_scope_coll);
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
                    
                }
            }
        }
    }
    else {
        
        for (_j in _classnames) {
            _classname = _classnames[_j];
            //要記得是限定在選取範圍喔！
            $('.' + _selectable_text_word.word_classname + '.' + _classname)
                .removeClass(_classname)
                .removeClass(_classname + '_from')
                .removeClass(_classname + '_to')
                .removeClass(_classname + '_middle');
        }
    }
    
};

/**
 * 取消_classname，並針對_scope加上_classname
 * @param {Scope_collection_param} _scope_coll
 * @param {String} _classname
 */
Selectable_text_classname.prototype.set_class = function (_scope_coll, _classname) {
    this.remove_class(_classname);
    return this.add_class(_scope_coll, _classname);
};

/* End of file Selectable_text_classname */
/* Location: ./system/application/views/web_apps/Selectable_text_classname.js */