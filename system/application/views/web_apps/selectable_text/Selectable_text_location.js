/**
 * Selectable_text_location
 *
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) Expression year is undefined on line 7, column 33 in Templates/KALS/KALS_JavaScript_Class.js., Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2014/1/2 下午 09:45:35
 */

/**
 * @memberOf {Selectable_text_location}
 * @extends {KALS_user_interface}
 * @constructor
 * @param {Selectable_text} _selectable_text 父物件
 */
function Selectable_text_location(_selectable_text) {
    
    this._selectable_text = _selectable_text;
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Selectable_text_location}
 */
Selectable_text_location.prototype = new KALS_user_interface();

/**
 * 父物件
 * @type {Selectable_text}
 */
Selectable_text_location.prototype._selectable_text;

/**
 * 主要可以選擇的物件
 * @type {jQuery}
 */
Selectable_text_location.prototype._text;

// -----------------------------------
// 內部參數設定
// -----------------------------------

/**
 * 標註相對位置的classname，以及其代號
 * 
 * 2221 檢查完畢
 * @type {Array} 
 */
Selectable_text_location.prototype.location_classnames = [
                             //view modal
    'location-head',         //0    0 表示開頭
    'location-foot',         //1    4 表示結尾
    null,                    //2    2 表示同時是接近開頭與結尾
    'location-near-head',    //3    1 表示接近開頭
    'location-near-foot'     //4    3 標示接近結尾
                             //     6 表示同時是開頭與結尾
                             //     5 其他位置
];


// -----------------------------------
// 方法
// -----------------------------------

/**
 * 取得段落的特徵
 *                           //view modal
 *  'location-head',         //0    0
 *  'location-foot',         //1    4
 *  'location-near-head-foot'//2    2
 *  'location-near-head',    //3    1
 *  'location-near-foot'     //4    3
 *  'location-head-foot'     //     5
 *  (other)                  //     6
 *  
 *  2221 檢查完畢，轉接完畢
 * @param {Scope_collection_param} _scope_coll
 */
Selectable_text_location.prototype.get_location_feature = function (_scope_coll) {
	
    var _classnames = this.location_classnames;
    var _words = this._selectable_text.scope.get_words_by_scope_coll(_scope_coll);
    
    var _location_id_ary = [];
    
    var _push_location = function (_id) {
        if ($.inArray(_id, _location_id_ary) === -1) {
            _location_id_ary.push(_id);
        }
    };
    
    for (var _i in _words) {
        for (var _j in _words[_i]) {
            var _word = _words[_i][_j];
            
            if (_word.hasClass(_classnames[0]) 
                && _word.hasClass(_classnames[1])) {
                _push_location(5);
            }
            else {
                if (_word.hasClass(_classnames[0])) {
                    _push_location(0);
                }
                
                if (_word.hasClass(_classnames[1])) {
                    _push_location(4);
                }    
            }   
            
            if (_word.hasClass(_classnames[3])
                && _word.hasClass(_classnames[4])) {
                _push_location(2);
            }
            else {
                if (_word.hasClass(_classnames[3])) {
                    _push_location(1);
                }
                
                if (_word.hasClass(_classnames[4])) {
                    _push_location(3);
                }    
            }
        }
    }
    
    //if (_location_id_ary.length === 0)
    //    _location_id_ary.push(5);    //預設是5
    
    return _location_id_ary;
    
};

/**
 * 設定各個字在段落中的位置
 * 
 * 備註：位置與代號
 * 0 => head : location-head
 * 1 => foot : location-foot
 * 2 => near head & foot : 此情況並不標示，由get_paragraph_location()去判斷
 * 3 => near head : location-near-head
 * 4 => near foot : location-near-foot
 * 5 => body : 沒有標示
 * 
 * 2220 檢查完畢
 * @param {function} _callback
 */
Selectable_text_location.prototype.setup_paragraph_location = function(_callback) {
    
    var _selectable_text = this._selectable_text;
    
    var _selectable_text_word = _selectable_text.word;
    
    var _word_class_name = _selectable_text_word.word_classname;
    var _span_classname = _selectable_text_word._span_classname;
    var _word_id_prefix = _selectable_text_word.word_id_prefix;
    
    //--- 
    
    var _selectable_text_sentence = _selectable_text.sentence;
    
    var _sentence_punctuation_class_name = _selectable_text_sentence.sententce_punctuation_classname;
    
    //--- 
    
    var _location_class_names = this.location_classnames;
    
    //--- 
    
    var _selectable_text_paragraph = _selectable_text.paragraph;
    
    var _paragraph_class_name = _selectable_text_paragraph.paragraph_classname;
    var _paragraph_id_prefix = _selectable_text_paragraph.paragraph_id_prefix;
    
    //--- 
    
    var _text = _selectable_text._text;
    
    var _paragraphs = _text.find('.' + _paragraph_class_name);
    var _first_paragraph = _text.find('.' + _paragraph_class_name + ':first');
    var _last_paragraph = _text.find('.' + _paragraph_class_name + ':last');
    
    var _first_paragraph_id = _selectable_text_paragraph.get_paragraph_id(_first_paragraph);
    var _last_paragraph_id = _selectable_text_paragraph.get_paragraph_id(_last_paragraph);
    
    $.test_msg('selectable.setup_paragraph_location()', [ _text.find('.' + _paragraph_class_name).length, _first_paragraph_id , _last_paragraph_id]);
    
    var _batch_excute = _selectable_text.excute_interval.batch_excute;
    var _wait = _selectable_text.excute_interval.wait;
    
    var _excute_timer;
    var _this = this;
    
    var _continue = function (_i, _callback) {
        
        _i++;
        
        /**
         * 加入統計目前字串次數的功能
         * @author Pulipuli Chen  20140518
         */
        KALS_context.progress.add_count(2);
        
        if (_i % _batch_excute === 0) {
            _excute_timer = setTimeout(function () {
                _loop(_i, _callback);
            }, _wait);    
        }
        else {
            _loop(_i, _callback);
        }
    };
    
    var _complete = function () {
        if ($.is_function(_callback)) {
            _callback();
        }
        return;
    };
    
    var _loop = function (_i) {
        //_first_paragraph = _text.find('.' + _paragraph_id_prefix + _i + ':first');
        //_last_paragraph = _text.find('.' + _paragraph_id_prefix + _i + ':last');
        
        //沒有段落了，結束了，所以呼叫完結的函數
        //$.test_msg('selectable.setup_paragraph_location()', [_i, _last_paragraph_id]);
        //if (_i === _last_paragraph_id + 1 || _i > _last_paragraph_id + 1) {
        //    _complete();
        //    return;
        //}
        if (_i === _paragraphs.length) {
            _complete();
            return;
        }
        
        //如果找不到下一個段落，則結束迴圈
        //if (false === _first_paragraph.exists()) {
            //$.test_msg('_text.setup_paragraph_location()',' Cannot found ' + _i);
        //   _continue(_i);
        //   return;
        //}
        
        //取得段落頭尾的編號
        //var _first_word = _first_paragraph.find('.' + _word_class_name + ':not(.' + _span_classname +'):first');
        //var _last_word = _last_paragraph.find('.' + _word_class_name + ':not(.' + _span_classname +'):last');
        var _paragraph = _paragraphs.eq(_i);
        var _words_selector = '.' + _word_class_name + ':not(.' + _span_classname +')';
        var _paragraph_words = _paragraph.find(_words_selector);
        var _first_word = _paragraph_words.filter(':first');
        var _last_word = _paragraph_words.filter(':last');
        
        //_first_word.css("color", "blue");
        //_last_word.css("color", "red");
        //$.test_msg("location", [_first_word.text(), _last_word.text(), _words_selector]);
        
        if (false === _first_word.exists()
            || false === _last_word.exists()) {
            _continue(_i, _callback);
            return;
        }
        
        var _first_id = $.get_prefixed_id(_first_word.attr('id'));
        var _last_id = $.get_prefixed_id(_last_word.attr('id'));
        
        //$.test_msg("location word_id", [_first_id, _last_id]);
        
        //標示段落開頭的部份
        var _location = 0;
        //for (var _w = _first_id; _w < _last_id + 1; _w++) {
        if (_paragraph_words.filter("." + _sentence_punctuation_class_name).length === 0) {
            var _word = _paragraph_words.eq(0);
            _word.addClass(_location_class_names[_location]);
        }
        else {
            for (var _w = 0; _w < _paragraph_words.length; _w++) {
                //var _word = $('#' + _word_id_prefix + _w + ':first');
                var _word = _paragraph_words.eq(_w);

                //$.test_msg('location 1', [_w, _word.length, '#' + _word_id_prefix + _w + ':first']);
                _word.addClass(_location_class_names[_location]);

                if (_word.hasClass(_sentence_punctuation_class_name)) {
                    if (_location === 0) {
                        _location = 3;
                    }
                    else {
                        //迴圈結束
                        break;
                    }
                }
            }
        }
        
        _excute_timer = setTimeout(function () {
            
            //標示段落結尾的部份
            _location = 1;
            
            if (_paragraph_words.filter("." + _sentence_punctuation_class_name).length === 0) {
                var _word = _paragraph_words.eq(_paragraph_words.length -1);
                _word.addClass(_location_class_names[_location]);
            }
            else {
                //for (var _w = _last_id; _w > _first_id - 1; _w--) {
                for (var _w = _paragraph_words.length -1; _w === 0; _w--) {
                    //var _word = $('#' + _word_id_prefix + _w + ':first');
                    var _word = _paragraph_words.eq(_w);

                    if (_w < _last_id - 3
                        && _word.hasClass(_sentence_punctuation_class_name)) {
                        if (_location === 1) {
                            _location = 4;
                        }
                        else {
                            //迴圈結束
                            break;
                        }
                    }

                    _word.addClass(_location_class_names[_location]);
                }
            }
                
            //處理完畢，進行下一個迴圈
            _continue(_i);
            return;
        }, 0);  //_excute_timer = setTimeout(function () {
    };
    
    _loop(0);
    return this;
};


/* End of file Selectable_text_location */
/* Location: ./system/application/views/web_apps/Selectable_text_location.js */