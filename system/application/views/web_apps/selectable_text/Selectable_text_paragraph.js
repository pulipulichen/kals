/**
 * Selectable_text_paragraph
 *
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) Expression year is undefined on line 7, column 33 in Templates/KALS/KALS_JavaScript_Class.js., Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2014/1/2 下午 09:17:54
 */

/**
 * @memberOf {Selectable_text_paragraph}
 * @extends {KALS_user_interface}
 * @constructor
 * @param {Selectable_text} _selectable_text 父物件
 */
function Selectable_text_paragraph(_selectable_text) {
    
    this._selectable_text = _selectable_text;
    this._text = _selectable_text._text;
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Selectable_text_paragraph}
 */
Selectable_text_paragraph.prototype = new KALS_user_interface();

/**
 * 父物件
 * @type {Selectable_text}
 */
Selectable_text_paragraph.prototype._selectable_text;

/**
 * 主要可以選擇的物件
 * @type {jQuery}
 */
Selectable_text_paragraph.prototype._text;

// -----------------------------------
// 內部參數設定
// -----------------------------------

/**
 * 段落的ID前置詞
 * 
 * 2234 檢查完畢
 * @type String
 */
Selectable_text_paragraph.prototype.paragraph_id_prefix = 'kals_paragraph_';

/**
 * 段落的classname
 * 
 * 2234 檢查完畢
 * @type {String}
 */
Selectable_text_paragraph.prototype.paragraph_classname = 'kals-paragraph';

/**
 * 如果元素標籤在此之中，則會被視為段落
 * 
 * 2234 檢查完畢
 * @type {Array}
 */
Selectable_text_paragraph.prototype.paragraph_tag_names = ["h1", "h2", "h3", "h4", "h5", "h6", "div", "p", "ol", 'li', "ul", 'dl', 'dd', 'dt', "table", "code", "blockquote"];


/**
 * 段落記數，初始化時使用。
 * 
 * 2235 檢查完畢
 * @type {number}
 */
Selectable_text_paragraph.prototype.paragraph_count = 0;

/**
 * 段落特徵，保存段落切割的特徵。
 * 
 * 2235 檢查完畢
 * @type {Array|number}
 */
Selectable_text_paragraph.prototype.paragraph_structure = [];


// -----------------------------------
// 方法
// -----------------------------------

/**
 * 建立一個可以選取Word的容器
 * 
 * 2236 轉接完畢，檢查完畢
 * @param {number} _id
 * @type {HTMLElementSpan}
 */
Selectable_text_paragraph.prototype.create_selectable_paragraph = function (_id) {
    var _ele = document.createElement('span');
    
    _ele.className = this.paragraph_classname 
        + ' '
        + this.paragraph_id_prefix + _id;
        
    return _ele;
};

/**
 * 建立一個空容器
 * 
 * @type {HTMLElementSpan}
 */
Selectable_text_paragraph.prototype.create_span = function () {
    var _ele = document.createElement('span');
    
    return _ele;
};

/**
 * 取得段落的ID
 * 
 * 2237 轉接完畢，檢查完畢
 * @param {number|string|Object} _word
 */
Selectable_text_paragraph.prototype.get_paragraph_id = function(_word) { 
    
    var _selectable_text_word = this._selectable_text.word;
    
    if ($.is_number(_word)) {
        _word = _selectable_text_word.id_prefix + _word;
    }
    if ($.is_string(_word)) {
        _word = $('#' + _word);
    }
    if ($.is_object(_word) && false === $.is_jquery(_word)) {
        _word = $(_word);
    }
    
    var _paragraph_class_name = this.paragraph_classname;
    var _paragraph;
    if (false === _word.hasClass(_paragraph_class_name)) {
        _paragraph = _word.parents( '.' + this.paragraph_classname + ':first');
    }
    else {
        _paragraph = _word;
    }
        
    if (false === _paragraph.exists()) {
        return null;
    }
        
    var _paragraph_class_names = _paragraph.attr('className').split(' ');
    for (var _i in _paragraph_class_names) {
        var _class_name = _paragraph_class_names[_i];
        //$.test_msg('Selectable .get_paragraph_id()', [_class_name, _i, this.paragraph_id_prefix, $.get_prefixed_id(_class_name)]);
        if ($.starts_with(_class_name, this.paragraph_id_prefix)) {
            return $.get_prefixed_id(_class_name);
        }
    }
    return null;
};

/**
 * 計算段落的平均字數
 * 
 * 測試用，結果顯示在console端
 * 
 * 2242 檢查完畢，轉接完畢
 */
Selectable_text_paragraph.prototype.count_paragraph_words_avg = function () {
    
    var _selectable_text_word = this._selectable_text.word;
    
    var _paragraph_class_name = this.paragraph_classname;
    var _paragraph_id_prefix = this.paragraph_id_prefix;
    
    
    var _first_paragraph = this._text.find('.' + _paragraph_class_name + ':first');
    var _last_paragraph = this._text.find('.' + _paragraph_class_name + ':last');
    
    var _first_paragraph_id = this.get_paragraph_id(_first_paragraph);
    var _last_paragraph_id = this.get_paragraph_id(_last_paragraph);
    
    var _word_classname = _selectable_text_word.classname;
    var _punctuation_classname = this._selectable_text.sentence.punctuation_classname;
    var _sententce_punctuation_classname = this._selectable_text.sentence.sententce_punctuation_classname;
    
    var _para_ary = [];
 
    var _this = this;   
    var _loop = function (_i) {
        if (_i < _last_paragraph_id + 1) {
            var _length = _this._text.find('.' 
                    + _paragraph_id_prefix + _i 
                    + ' .' + _word_classname 
                    + ':not(.span):not(.'
                    + _punctuation_classname+'):not(.'
                    +_sententce_punctuation_classname+')').length;
        
            //$.test_msg(_length);
            if (_length > 10) {
                _para_ary.push(_length);
            }
            
            setTimeout(function () {
                _i++;
                _loop(_i);
            }, 0);
        }
        else {
            $.test_msg('Total words', _selectable_text_word.word_count);
    
            var _sum = 0;
            for (_i in _para_ary) {
                _sum = _sum + _para_ary[_i];
            }
            var _avg = _sum / _para_ary.length;
            
            $.test_msg('Per paragraph avg words', _avg);
        }
    };
    
    _loop(_first_paragraph_id);
};

/**
 * 增加句子的結構
 * @returns {Selectable_text_sentence.prototype}
 */
Selectable_text_paragraph.prototype.add_structure = function () {
    var _word_count = this._selectable_text.word.word_count;
    
    if (_word_count < 1) {
        return this;
    }
    if (this.paragraph_structure.length === 0) {
        this.paragraph_structure.push(_word_count);
    }
    else if (_word_count !== this.paragraph_structure[this.paragraph_structure.length-1]) {
        this.paragraph_structure.push(_word_count);
    }
    return this;
};

/**
 * 取得目前計算的句子數量
 * @returns {number}
 */
Selectable_text_paragraph.prototype.count_strucutre = function () {
    return this.paragraph_structure.length;
};

/**
 * 取得句子的結構
 * @returns {Selectable_text_sentence.prototype}
 */
Selectable_text_paragraph.prototype.get_structure = function () {
    return this.paragraph_structure;
};

///**
// * 儲存到快取中
// * @param {String} _cache_id
// * @param {funciton} _callback
// * @returns {Selectable_text_paragraph}
// */
//Selectable_text_paragraph.prototype.cache_save = function (_cache_id, _callback) {
//    _cache_id = _cache_id + '_paragraph';
//    //$.test_msg('paragraph save: ' + _cache_id, this.paragraph_count);
//    KALS_context.storage.set(_cache_id, this.paragraph_count, _callback);
//    return this;
//};
//
///**
// * 從快取中復原
// * @param {String} _cache_id
// * @param {funciton} _callback
// * @returns {Selectable_text_paragraph}
// */
//Selectable_text_paragraph.prototype.cache_restore = function (_cache_id, _callback) {
//    _cache_id = _cache_id + '_paragraph';
//    //this.paragraph_count = $.localStorage.get(_cache_id);
//    var _this = this;
//    KALS_context.storage.get(_cache_id, function (_value) {
//        if (_value !== undefined) {
//            _this.paragraph_count = _value;
//        }
//        $.trigger_callback(_callback);
//    });
//    //$.test_msg('paragraph restore: ' + _cache_id, this.paragraph_count);
//    return this;
//};


/**
 * 取得要快取的資料
 * @returns {Number}
 */
Selectable_text_paragraph.prototype.get_data = function () {
    return this.paragraph_count;
};

/**
 * 設定被快取的資料
 * @param {Int} _data 從快取中取回的資料
 * @returns {Selectable_text_paragraph}
 */
Selectable_text_paragraph.prototype.set_data = function (_data) {
    if ($.is_number(_data)) {
        this.paragraph_count = _data;
    }
    return this;
};

// -------------------------------------------

/**
 * cache storage使用的ID
 * @type type
 */
Selectable_text_paragraph.prototype._cache_id = null;

/**
 * 初始化next_element，只用於setup_selectable_element
 * @param {String} _text
 * @param {jQuery} _child_obj
 * @returns {HTMLNode}
 */
Selectable_text_paragraph.prototype._setup_selectable_element_init_next_element = function (_text, _child_obj) {
    // 變數簡化
    var _selectable_text_paragraph = this;
    var _selectable_text_word = this._selectable_text.word;
    var _selectable_text_sentence = this._selectable_text.sentence;
    var _sentence_punctuation_class_name = this._selectable_text.sentence.sententce_punctuation_classname;
    var _punctuation_classname = this._selectable_text.sentence.punctuation_classname;
    
    var _next_element;
    // ----------------------
    // 設定快取資訊
    
    // 決定是否使用快取
    /*
    var _cache_enable = false;
    //_cache_enable = true;
    
    var _local_storage = KALS_context.storage;
    this._cache_id = 'next_element_' + _selectable_text_word.word_count;
    
    // 嘗試取得快取資料
    
    // 如果有資料
    //if (_next_element !== undefined) {
    if (_local_storage.is_set(this._cache_id) && _cache_enable) {
        _next_element = _local_storage.get(this._cache_id);
        var _jquery_object = $("<span>" + _next_element + "</span>");
        var _html_object = _jquery_object.get(0);
        
        _selectable_text_word.cache_restore(this._cache_id);
        _selectable_text_sentence.cache_restore(this._cache_id);
        _selectable_text_paragraph.cache_restore(this._cache_id);
        // 應該還要加上事件的處理，但現在先暫緩
        
        return _html_object;
    }
    */
    // ----------------------
    // 以下是正式的初始化
    
    if (this.is_paragraph_node(_child_obj)) {
        _next_element = this.create_selectable_paragraph(_selectable_text_word.word_count);
    }
    else {
        _next_element = this.create_span();
    }
    
    
    $(_next_element).hide();
            
    /**
     * @version 20111106 Pudding Chen
     *     先不貼出去，讓他放在記憶體中處理。
     *     處理完一個段落在貼到DOM去。
     */
    //_child_obj.parentNode.insertBefore(_next_element, _child_obj);

    for (var _s = 0; _s < _text.length; _s++) {
        var _t = _text.substr(_s, 1);
        var _t_prev = '',  _t_next = '';
        
        if (_s > 0) {
            _t_prev = _text.substr(parseInt(_s,10) - 1, 1);
        }
        
        if (_s < _text.length - 1) {
            _t_next = _text.substr(parseInt(_s,10) + 1, 1);
        }

        if ($.match_english(_t) === true) {	
            while ($.match_english(_t_next) === true) {
                _t = _t + _t_next;
                _s++;
                _t_next = _text.substr(parseInt(_s,10)+1, 1);
            }
        }
        else if ($.match_number(_t) === true) {
            while ($.match_number(_t_next) === true) {
                _t = _t + _t_next;
                _s++;
                _t_next = _text.substr(parseInt(_s,10)+1, 1);
            }
        }

        var _t_element = null;

        // 如果不是空白的話
        if ($.match_space(_t) === false) {

            _t_element = _selectable_text_word.create_selectable_word(
                _selectable_text_paragraph.paragraph_count, 
                _selectable_text_word.word_count, _t
            );

            if ($.match_sentence_punctuation(_t)) {
                if ($.match_english_sentence_punctuation(_t)) {
                    if (_t_next === '') {
                        $(_t_element).addClass(_sentence_punctuation_class_name);

                        // 20140102 Pulipuli Chen
                        // 增加句子的計算數量
                        _selectable_text_sentence.add_structure();
                    }
                    else if ($.match_space(_t_next)) {
                        if (_s < _text.length - 2) {
                            //檢測下下個字是否是大寫英文
                            var _t_nnext = _text.substr(parseInt(_s, 10) + 2, 1);
                            if ($.match_upper_english(_t_nnext)) {
                                $(_t_element).addClass(_sentence_punctuation_class_name);

                                // 20140102 Pulipuli Chen
                                // 增加句子的計算數量
                                _selectable_text_sentence.add_structure();
                            }   //if ($.match_upper_english(_t_nnext)) {
                            else {
                                $(_t_element).addClass(_punctuation_classname);
                            }
                        }   //if (_s < _text.length - 2) {
                        else {
                            $(_t_element).addClass(_sentence_punctuation_class_name);

                            // 20140102 Pulipuli Chen
                            // 增加句子的計算數量
                            _selectable_text_sentence.add_structure();
                        }
                    }   // else if ($.match_space(_t_next)) {
                    else {
                        $(_t_element).addClass(_punctuation_classname);
                    }
                }   //if ($.match_sentence_punctuation(_t)) {
                else {
                    $(_t_element).addClass(_sentence_punctuation_class_name);

                    // 20140102 Pulipuli Chen
                    // 增加句子的計算數量
                    _selectable_text_sentence.add_structure();
                }
            }   //if ($.match_sentence_punctuation(_t)) {
            else if ($.match_punctuation(_t)) {
                $(_t_element).addClass(_punctuation_classname);
            }   //else if ($.match_punctuation(_t)) {
            
            _selectable_text_word.word_count++;
            
        }   //if ($.match_space(_t) === false) {
        else if ($.match_space(_t) && $.match_space(_t_prev)) {
            // @version 20140702 Pulipuli Chen
            // 如果前一個字也是空白的話，那就略過這個字吧
            continue;
        }
        else {
            // 如果是空白的話
            _t_element = this._selectable_text.create_span_word(_t);
        }

        _next_element.appendChild(_t_element);
    }    //for (var _s = 0; _s < _text.length; _s++)
    
    // ---------------------------
    // 儲存快取資料
    
    /*
    if (_cache_enable) {
        var _next_element_html = $(_next_element).html();
        
        //$.test_msg('cookie next_element: ' +  _cache_id, _next_element_html);
        _local_storage.set(this._cache_id
            , _next_element_html
            //, _cookie_param
            );

        _selectable_text_word.cache_save(this._cache_id);
        _selectable_text_sentence.cache_save(this._cache_id);
        _selectable_text_paragraph.cache_save(this._cache_id);
    }
    */
    // ---------------------------
    // 回傳
    
    return _next_element;
};

/**
 * 初始化next_element，只用於setup_selectable_element
 * @param {String} _text
 * @param {jQuery} _child_obj
 * @returns {HTMLNode}
 * @author Pudding 20151029
 */
Selectable_text_paragraph.prototype._setup_selectable_element_clone_next_element = function (_child_obj, _is_word) {
    // 變數簡化
    var _selectable_text_paragraph = this;
    var _selectable_text_word = this._selectable_text.word;
    var _selectable_text_spot = this._selectable_text.spot;
    //var _selectable_text_sentence = this._selectable_text.sentence;
    //var _sentence_punctuation_class_name = this._selectable_text.sentence.sententce_punctuation_classname;
    //var _punctuation_classname = this._selectable_text.sentence.punctuation_classname;
    
    
    var _next_element = $(_child_obj).clone().get(0);
    if (_is_word === true) {
        _next_element = _selectable_text_word.create_selectable_element(
            _selectable_text_paragraph.paragraph_count, 
            _selectable_text_word.word_count, _next_element
        );
    }
    else {
        _next_element = _selectable_text_spot.create_selectable_element(
            _selectable_text_paragraph.paragraph_count, 
            _selectable_text_spot.spot_count, _next_element
        );
    }
    
    _selectable_text_spot.spot_count++;
    
    return _next_element;
};

/**
 * 檢查是否是段落節點
 * @param {String|HTMLElement|jQuery} _node
 * @returns {Boolean}
 */
Selectable_text_paragraph.prototype.is_paragraph_node = function (_node) {
    var _tags = this.paragraph_tag_names;
    
    var _node_name;
    if (typeof(_node.nodeName) === "string") {
        _node_name = _node.nodeName;
    }
    else if (typeof(_node.attr) === "function") {
        _node_name = _node.attr("nodeName");
    }
    else {
        _node_name = _node;
    }
    
    _node_name = _node_name.toLocaleLowerCase();
    
    if (_node === "#text") {
        return false;
    }
    
    var _result = ($.inArray(_node_name, _tags) !== -1);
    //$.test_msg("is_paragraph_node的結果", [_result, _node_name]);
    if (_result === false) {
        return _result;
    }
    
    // --------------------
    // 條件2，他底下有text_node 之外的東西
    
    var _has_child_element = false;
    var _contents = $(_node).contents();
    //var _contents = _node.length;
    
    //$.test_msg("底下的content", [_node_name, _contents.length]);
    //return false;
    for (var _i = 0; _i < _contents.length; _i++) {
        var _ele = _contents[_i];
        var _node_name = _ele.nodeName.toLowerCase();
        
        //$.test_msg("底下的content", _node_name);
        
        if (_node_name !== "#text"
                && $.inArray(_node_name, _tags) !== -1) {
            //$.test_msg("底下的content", _node_name);
            _has_child_element = true;
            break;
        }
    }
    
    if (_has_child_element === true) {
        return false;
    }
    else {
        return true;
    }
    
    
    //if (_result === false) {
    //    $.test_msg("is_para node", _node);
    //}
};

/**
 * 設定為章節段落
 * @param {HTMLElement} _node
 * @returns {Boolean}
 */
Selectable_text_paragraph.prototype.setup_paragraph_node = function (_node) {
    
    if (typeof(_node.className) === "string"
            && _node.className.indexOf(this.paragraph_classname) === -1
            && this.is_paragraph_node(_node)) {
        // $.test_msg("setup_para node", _node.className);
        
        this.paragraph_count++;
        
        _node.className = _node.className 
                + " " + this.paragraph_classname
                + " " + this.paragraph_id_prefix + this.paragraph_count;
        
        this.add_structure();
    }
    
    //return _node;    
};

/* End of file Selectable_text_paragraph */
/* Location: ./system/application/views/web_apps/Selectable_text_paragraph.js */