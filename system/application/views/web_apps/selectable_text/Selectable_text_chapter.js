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
 * 類別名稱
 * @type String
 */
Selectable_text_chapter.prototype.classname = "kals-heading";

/**
 * 增加句子的結構
 * 
 * 要取得句子的第一部分
 * @param {jQuery} _child_obj 子節點
 * @returns {Selectable_text_chapter}
 */
Selectable_text_chapter.prototype.add_structure = function (_child_obj) {
    
    var _word_count = this._selectable_text.word.word_count;
    
    var _temp_heading = false;
    if (_child_obj === undefined) {
        _temp_heading = true;
        _child_obj = this.get_temp_top_heading(_word_count);
    }
    
    if (_child_obj !== undefined
            && _temp_heading === false) {
        var _selectable_text_word = this._selectable_text.word;
        _child_obj = $(_child_obj);
        var _word_classname = _selectable_text_word.word_classname;
        var _first_word = _child_obj.find("." + _word_classname + ":first");
        var _first_word_id = _selectable_text_word.get_word_id(_first_word);
        _word_count = _first_word_id - 1;
        
        this.heading_list.push(_child_obj);
    }
    
    var _this = this;
    var _add_class = function (_child_obj, _structure_count) {
        var _classname = _this.classname + "-" + _structure_count;
        $(_child_obj).addClass(_classname).addClass(_this.classname);
        _this.heading_selector.push(_classname);
    };
    
    var _structure_count;
    if (_word_count < 1) {
        if (typeof(this.structure) === "undefined"
                || this.structure === null) {
            KALS_util.show_exception("Cannot Found Selectable_text_cahpter.structure");
        }
        _structure_count = this.structure.length;
        //$(_child_obj).addClass(this.classname + "-" + _structure_count)
        //       .addClass(this.classname);
        _add_class(_child_obj, _structure_count);
        return _structure_count;
    }
    else {
        if (this.structure.length === 0) {
            this.structure.push(_word_count);
        }
        else if (_word_count !== this.structure[this.structure.length-1]) {
            this.structure.push(_word_count);
        }
        _structure_count = (this.structure.length - 1);
        //$(_child_obj).addClass(this.classname + "-" + (_structure_count + 1))
        //        .addClass(this.classname);
        _add_class(_child_obj, (_structure_count+1));

        return _structure_count;
    }
};

/**
 * 增加句子的結構
 * 
 * 要取得句子的第一部分
 * @param {jQuery} _child_obj 子節點
 * @returns {Selectable_text_chapter}
 */
Selectable_text_chapter.prototype.add_ending_structure = function () {
    
    var _word_count = this._selectable_text.word.word_count;
    
    var _temp_heading = false;
    
    var _structure_count;
    if (_word_count < 1) {
        if (typeof(this.structure) === "undefined"
                || this.structure === null) {
            KALS_util.show_exception("Cannot Found Selectable_text_cahpter.structure");
        }
    }
    else {
        if (this.structure.length === 0) {
            this.structure.push(_word_count);
        }
        else if (_word_count !== this.structure[this.structure.length-1]) {
            this.structure.push(_word_count);
        }
    }
    _structure_count = this.structure.length;
    
    if (_structure_count > this.heading_list.length) {
        var _heading = this.get_temp_top_heading();
        var _heading_selector = this.classname + "-top-heading";
        this.heading_list.unshift(_heading);
        this.heading_selector.unshift(_heading_selector);
    }
    
    return _structure_count;
};

/**
 * 建立暫存的標題
 * @param {int} _word_count
 * @returns {jQuery}
 */
Selectable_text_chapter.prototype.get_temp_top_heading = function (_word_count) {
    var _text = document.title;
    var _heading = $("<span></span>")
            .html(_text)
            .addClass(this.classname + "-top-heading");
    
    return _heading;
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

/**
 * 儲存章節標題
 * @type Array
 */
Selectable_text_chapter.prototype.heading_list = [];

/**
 * 儲存章節標題的選取器
 * @type Array
 */
Selectable_text_chapter.prototype.heading_selector = [];

/**
 * 取得標題列表
 * @returns Array|每個heading的jQuery
 */
Selectable_text_chapter.prototype.get_heading_list = function () {
    return this.heading_list;
};

/**
 * 是否有標題
 * @returns Array|每個heading的jQuery
 */
Selectable_text_chapter.prototype.has_heading = function () {
    //$.test_msg("chapter has_heading", this.heading_list.length);
    //return false;
    return (this.heading_list.length > 0);
};

/**
 * 取得標題列表
 * @param {Int} heading
 * @returns heading的jQuery
 */
Selectable_text_chapter.prototype.get_heading = function (_heading_id) {
    if (typeof(this.heading_list[_heading_id]) !== "undefined") {
        return this.heading_list[_heading_id];
    }
    else {
        return null;
    }
};

/**
 * 取得標題列表
 * @param {Int} heading
 * @returns heading的文字
 */
Selectable_text_chapter.prototype.get_heading_text = function (_heading_id) {
    //$.test_msg("chapter", this.heading_list);
    if (typeof(this.heading_list[_heading_id]) !== "undefined") {
        return this.heading_list[_heading_id].text();
    }
    else {
        return null;
    }
};

/**
 * 捲動到指定標題
 * @param {Int} _heading_id
 * @param {Function} _callback
 * @returns {Selectable_text_chapter.prototype}
 */
Selectable_text_chapter.prototype.scroll_to = function (_heading_id, _callback) {
    
    if (_heading_id === undefined) {
        return this;
    }
    
    var _position = {
        selector: "." + this.classname + "-" + _heading_id + ":first"
    };
    
    var _speed = 500;
    //$.test_msg("chapter scroll_to", _position);
    $.scroll_to(_position, _speed, _callback);
    
    return this;
};

///**
// * 儲存到快取中
// * @param {String} _cache_id
// * @param {funciton} _callback
// * @returns {Selectable_text_word}
// */
//Selectable_text_chapter.prototype.cache_save = function (_cache_id, _callback) {
//    _cache_id = _cache_id + '_chapter';
////    
////    this.structure = [1,2,4];
////    $.test_msg("========================\nchapter cache_save structure", this.structure);
////    
////    var _stroage = KALS_context.storage;
//    
//    var _this = this;
//    KALS_context.storage.set_json(_cache_id + "_structure"
//        , this.structure
//        , function () {
////            _stroage.get_json(_cache_id + "_structure", function  (_value) {
////                $.test_msg("structure", [_value, typeof(_value)]);
////                //_value = $.json_decode(_value);
////                //$.test_msg("structure 2", [_value, typeof(_value)]);
////                $.test_msg("==================================");
////            });
//            
//            
////            $.test_msg("chapter cache_save heading_selector", _this.heading_selector);
//            
//            KALS_context.storage.set_json(_cache_id + "_heading_selector"
//                , _this.heading_selector
//                , _callback);
//    });
//    return this;
//};
//
//
///**
// * 從快取中復原
// * @param {String} _cache_id
// * @param {funciton} _callback
// * @returns {Selectable_text_word}
// */
//Selectable_text_chapter.prototype.cache_restore = function (_cache_id, _callback) {
//    _cache_id = _cache_id + '_chapter';
//    var _this = this;
//    KALS_context.storage.get_json(_cache_id + "_structure", function (_structure) {
//        KALS_context.storage.get_json(_cache_id + "_heading_selector", function (_heading_selector) {
////            $.test_msg("chapter cache_restore _structure", _structure);
////            $.test_msg("chapter cache_restore _structure type", typeof(_structure));
//            
//            //var _heading_selector = $.json_decode(_heading_selector);
////            $.test_msg("chapter cache_restore _heading_selector", _heading_selector);
////            $.test_msg("chapter cache_restore _heading_selector type", typeof(_heading_selector));
////            
//            //_value = $.json_decode(_value);
//            //_value = {"structure":[437],"heading_selector":["kals-heading-0","kals-heading-1"]};
//            //$.test_msg("chapter cache_restore _value 2", [_value, typeof(_value), _value.structure]);
//            if (typeof(_structure) === "object") {
//                _this.structure = _structure;
//            }
//            if (typeof(_heading_selector) === "object") {
//                _this.heading_selector = _heading_selector;
//            }
//            for (var _s in _this.heading_selector) {
//                //$.test_msg("chapter cache_restore", _this.heading_selector[_s]);
//                _this.heading_list.push($("." + _this.heading_selector[_s]));
//            }
//            $.trigger_callback(_callback);
//        });
//        
//    });
//    return this;
//};


/**
 * 取得要快取的資料
 * @returns {Number}
 */
Selectable_text_chapter.prototype.get_data = function () {
    var _data = {
        structure: this.structure,
        heading_selector: this.heading_selector,
        heading_list: this.heading_list.length
    };
    $.test_msg("chapter.get_data()", _data);
    return _data;
};

/**
 * 設定被快取的資料
 * @param {Int} _data 從快取中取回的資料
 * @returns {Selectable_text_paragraph}
 */
Selectable_text_chapter.prototype.set_data = function (_data) {
    if ($.is_object(_data)) {
        this.structure = _data.structure;
        this.heading_selector = _data.heading_selector;
        for (var _s in this.heading_selector) {
            //$.test_msg("chapter cache_restore", _this.heading_selector[_s]);
            
            var _selector = this.heading_selector[_s];
            var _heading;
            if (_selector === this.classname + "-top-heading") {
                _heading = this.get_temp_top_heading();
            }
            else {
                _heading = $("." + _selector);
            }
            this.heading_list.push(_heading);
        }
    }
    return this;
};

/* End of file Selectable_text_chapter */
/* Location: ./system/application/views/web_apps/Selectable_text_chapter.js */