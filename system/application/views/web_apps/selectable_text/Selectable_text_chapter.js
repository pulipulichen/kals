/**
 * Selectable_text_chapter
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
 * @memberOf {Selectable_text_chapter}
 * @extends {KALS_user_interface}
 * @constructor
 * @param {Selectable_text} _selectable_text 父物件
 */
function Selectable_text_chapter(_selectable_text) {
    
    this._selectable_text = _selectable_text;
    this._text = _selectable_text._text;
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Selectable_text_chapter}
 */
Selectable_text_chapter.prototype = new KALS_user_interface();

/**
 * 父物件
 * @type {Selectable_text}
 */
Selectable_text_chapter.prototype._selectable_text;

/**
 * 主要可以選擇的物件
 * @type {jQuery}
 */
Selectable_text_chapter.prototype._text;

// -----------------------------------
// 內部參數設定
// -----------------------------------

/**
 * 章節結構
 * @type Array|Int
 */
Selectable_text_chapter.prototype.structure = [];

/**
 * 如果元素標籤在此之中，則會被視為章節
 * 
 * @type {Array}
 */
Selectable_text_chapter.prototype.chapter_tag_names = ["h1", "h2", "h3", "h4", "h5", "h6"];

// -----------------------------------
// 方法
// -----------------------------------


/**
 * 增加句子的結構
 * 
 * 要取得句子的第一部分
 * @param {jQuery} _child_obj 子節點
 * @returns {Selectable_text_chapter}
 */
Selectable_text_chapter.prototype.add_structure = function (_child_obj) {
    var _word_count = this._selectable_text.word.word_count;
   
    if (_child_obj !== undefined) {
        var _selectable_text_word = this._selectable_text.word;
        _child_obj = $(_child_obj);
        var _word_classname = _selectable_text_word.word_classname;
        var _first_word = _child_obj.find("." + _word_classname + ":first");
        var _first_word_id = _selectable_text_word.get_word_id(_first_word);
        _word_count = _first_word_id - 1;
    }
   
    if (_word_count < 1) {
        return this;
    }
    if (this.structure.length === 0) {
        this.structure.push(_word_count);
    }
    else if (_word_count !== this.structure[this.structure.length-1]) {
        this.structure.push(_word_count);
    }
    return this;
};

/**
 * 取得目前計算的句子數量
 * @returns {number}
 */
Selectable_text_chapter.prototype.count_strucutre = function () {
    return this.structure.length;
};

/**
 * 取得句子的結構
 * @returns {Selectable_text_sentence.prototype}
 */
Selectable_text_chapter.prototype.get_structure = function () {
    return this.structure;
};

/* End of file Selectable_text_chapter */
/* Location: ./system/application/views/web_apps/Selectable_text_chapter.js */