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

Selectable_text_paragraph.prototype.paragraph_id_prefix = 'kals_paragraph_';

/**
 * 段落的classname
 * @type {String}
 */
Selectable_text_paragraph.prototype.paragraph_classname = 'kals-paragraph';

/**
 * 如果元素標籤在此之中，則會被視為段落
 * @type {Array}
 */
Selectable_text_paragraph.prototype.paragraph_tag_names = ["h1", "h2", "h3", "h4", "h5", "h6", "div", "p", "ol", 'li', "ul", 'dl', 'dd', 'dt', "table", "code", "blockquote"];


/**
 * 段落記數，初始化時使用。
 * @type {number}
 */
Selectable_text_paragraph.prototype.paragraph_count = 0;

/**
 * 段落特徵，保存段落切割的特徵。
 * @type {Array|number}
 */
Selectable_text_paragraph.prototype.paragraph_structure = [];


// -----------------------------------
// 方法
// -----------------------------------

/**
 * 建立一個可以選取Word的容器
 * @param {number} _id
 * @type {HTMLElementSpan}
 */
Selectable_text_paragraph.prototype.create_selectable_paragraph = function (_id) {
    var _ele = document.createElement('span');
    
	_ele.className = this.paragraph_classname 
        + ' ' + this.paragraph_id_prefix + _id;
        
    return _ele;
};

/**
 * 取得段落的ID
 * @param {number|string|Object} _word
 */
Selectable_text_paragraph.prototype.get_paragraph_id = function(_word) { 
    
    if ($.is_number(_word)) {
        _word = this.word_id_prefix + _word;
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
 */
Selectable_text_paragraph.prototype.count_paragraph_words_avg = function () {
    
    var _paragraph_class_name = this.paragraph_classname;
    var _paragraph_id_prefix = this.paragraph_id_prefix;
    
    
    var _first_paragraph = this._text.find('.' + _paragraph_class_name + ':first');
    var _last_paragraph = this._text.find('.' + _paragraph_class_name + ':last');
    
    var _first_paragraph_id = this.get_paragraph_id(_first_paragraph);
    var _last_paragraph_id = this.get_paragraph_id(_last_paragraph);
    
    var _word_classname = this.word_classname;
    
    var _para_ary = [];
    
    /*
    for (var _i = _first_paragraph_id; _i < _last_paragraph_id + 1; _i++) {
        _length = this._text.find('.' + _paragraph_id_prefix + _i + ' .' + _word_classname + ':not(.span):not(.'+this.punctuation_classname+'):not(.'+this.sententce_punctuation_classname+')').length;
        
        //$.test_msg(_length);
        if (_length < 10)
            continue;
        else
            _para_ary.push(_length);
    }
    
    //輸出結果
    $.test_msg('Total words', this.word_count);
    
    var _sum = 0;
    for (var _i in _para_ary)
        _sum = _sum + _para_ary[_i];
    var _avg = _sum / _para_ary.length;
    
    $.test_msg('Per paragraph avg words', _avg);
    */

    var _this = this;   
    var _loop = function (_i) {
        if (_i < _last_paragraph_id + 1) {
            _length = _this._text.find('.' + _paragraph_id_prefix + _i + ' .' + _word_classname + ':not(.span):not(.'+_this.punctuation_classname+'):not(.'+_this.sententce_punctuation_classname+')').length;
        
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
            $.test_msg('Total words', _this.word_count);
    
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


/* End of file Selectable_text_paragraph */
/* Location: ./system/application/views/web_apps/Selectable_text_paragraph.js */