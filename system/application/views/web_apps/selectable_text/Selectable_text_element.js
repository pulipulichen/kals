/**
 * Selectable_text_element
 * 
 * 建立Selectable_text中各種Element的父類別
 * 
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) Expression year is undefined on line 7, column 33 in Templates/KALS/KALS_JavaScript_Class.js., Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2015/11/12 下午 08:25:49
 */
/*global KALS_CONFIG:false */ /*global KALS_context:false */ /*global KALS_util:false */ /*global KALS_text:false */ /*global KALS_toolbar:false */

/**
 * @memberOf {Selectable_text_element}
 * @extends {KALS_user_interface}
 * @constructor
 * @param {Selectable_text} _selectable_text 父物件
 */
function Selectable_text_element(_selectable_text) {
    
    if (_selectable_text !== undefined) {
        this._selectable_text = _selectable_text;
        this._text = _selectable_text._text;
    }
    
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Selectable_text_element}
 */
Selectable_text_element.prototype = new KALS_user_interface();

/**
 * 父物件
 * @type {Selectable_text}
 */
Selectable_text_element.prototype._selectable_text;

// -----------------------------------
// 內部參數設定
// -----------------------------------

/**
 * 文字記數，初始化時使用。
 * @type {number}
 */
Selectable_text_element.prototype.count = 0;

/**
 * 可選取文字的classname
 * @type {String}
 * @author Pudding 20140102 尚未更新相關使用的程式碼 this.word_classname
 */
Selectable_text_element.prototype.classname = 'kals-word';

/**
 * 可選取文字的ID前置
 * @type {String}
 * @author Pudding 20140102 尚未更新相關使用的程式碼 this.word_id_prefix
 */
Selectable_text_element.prototype.id_prefix = 'kals_word_';

/**
 * 空白元素的類別名稱
 * @type String
 */
Selectable_text_element.prototype.span_classname = 'span';

/**
 * 鎖
 * @type Array
 */
Selectable_text_element.prototype.locks = [];

// -----------------------------------
// 方法
// -----------------------------------

/**
 * 取得word_id_prefix
 * @returns {Selectable_text_element.word_id_prefix}
 * @author Pudding 20151112
 */
Selectable_text_element.prototype.get_id_prefix = function () {
    return this.id_prefix;
};

/**
 * 從ID取得Word
 * @param {number} _index
 * @return {jQuery}
 * @author Pudding 20151112
 */
Selectable_text_element.prototype.get_ele_by_index = function(_index) {
    var _ele_id_prefix = this.id_prefix;
    var _ele_id = _ele_id_prefix + _index;
    var _ele = $('#' + _ele_id);
    return _ele;
};

/**
 * 取得指定ID的word
 * 
 * @param {int} _word_id
 * @returns {jQuery}
 * @author Pudding 20151112
 */
Selectable_text_element.prototype.get_element = function (_word_id) {
    return this.get_ele_by_index(_word_id);
};

/**
 * 取得word id，但似乎沒有人使用他
 * 
 * @param {jQuery} _ele
 * @author Pudding 20151112
 */
Selectable_text_element.prototype.get_element_id = function (_ele) {
    if ($.is_object(_ele)) {
        if ($.is_jquery(_ele)) {
            _ele = _ele.attr('id');
        }
        else {
            _ele = _ele.id;
        }
    }
       
    var _id_prefix = this.id_prefix;
    if ($.starts_with(_ele, _id_prefix)) {
        _ele = _ele.substring(_id_prefix.length, _ele.length);
    }
    return parseInt(_ele,10);
};

/**
 * 建立一個不可選取的文字
 * 
 * 2323 轉接完成，檢查完成
 * @param {String} _text
 * @type {jQuery}
 */
Selectable_text_element.prototype.create_span_word = function(_text) {
    //$.test_msg("Selectable_text_element.prototype.create_span_word");
    
    var _word = document.createElement("span");
    _word.className = this.span_classname + ' ' + this.classname;
	
    var _t_text = document.createTextNode(_text);
    _word.appendChild(_t_text);

    return _word;
};

/**
 * 建立一個可選取的文字
 * 
 * 2324 轉接完畢，檢查完畢
 * @param {number} _para_id Paragraph ID
 * @param {number} _point_id Word ID
 * @param {string} _text 內容文字
 * @type {jQuery}
 */
Selectable_text_element.prototype.create_selectable_word = function(_para_id, _point_id, _text) {
    
    //$.test_msg("Selectable_text_element.prototype.create_selectable_word");
    
    var _word = document.createElement("span");

    _word.className = this.classname
        + ' ' + this._selectable_text.tooltip.trigger_classname;

    var _word_id = this.id_prefix + _point_id; 

    _word.id = _word_id;

    var _t_text = document.createTextNode(_text);
    _word.appendChild(_t_text);

    // 20140223 Pudding Chen
    // 停止在這裡設定事件，移到setup_word_selectable去做
    //_word = this.setup_word_tooltip(_word);

    /**
     * 加入統計目前字串次數的功能
     * @author Pulipuli Chen  20131227
     */
    KALS_context.progress.add_count();
    
    /*
    var _progress = _point_id;
    //每10統計一次
    if (_progress % 10 === 0) {
        _progress = (_progress / this._estimate_words_length) * 100;
        _progress = parseInt(_progress, 10);
        $.test_msg("[create_selectable_word] _point_id", _progress + "%");
    }
    */
    return _word;
};

/**
 * 建立一個可選取的文字
 * 
 * 2324 轉接完畢，檢查完畢
 * @param {number} _para_id Paragraph ID
 * @param {number} _point_id Word ID
 * @param {HTMLElement} _ele 內容文字
 * @type {jQuery}
 * @author Pudding 20151029
 */
Selectable_text_element.prototype.create_selectable_element = function(_para_id, _point_id, _ele) {
    
    _ele.className =  $.trim(_ele.className + " " + this.classname
        + ' ' + this._selectable_text.tooltip.trigger_classname);

    var _id = this.id_prefix + _point_id; 

    _ele.id = _id;

    KALS_context.progress.add_count();
 
    return _ele;
};

/**
 * 初始化這個文字的事件
 * @param {jQuery} _word
 * @returns {Selectable_text_element}
 * @author Pudding 20151112
 */
Selectable_text_element.prototype._init_ele_selectable_event = function (_word) {
    
    if ($.is_jquery(_word) === false) {
        _word = $(_word);
    }
    
    // 暫時還沒設定
    
    return this;
};

/**
 * 讓所有文字都保持在可選取的狀態
 * 
 * 2254 轉接完畢，檢查完畢
 * @param {function} _callback
 */
Selectable_text_element.prototype.setup_ele_selectable = function (_callback) {
    
    var _select = KALS_text.selection.select;
    
	// 如果是一般模式
    if ($.is_mobile_mode() === false) {
        if (typeof(this.locks.word_click) === 'undefined') {
            var _this = this;
			
            var _words = this._text.find('.'+ this.classname + ':not(.' + this.span_classname + ')');
            
            var _i = 0;
            var _wait_i = 1000;
            var _loop = function () {
                
                var _word = _words.eq(_i);
                
                /**
                 * 在滑鼠移上去的時候才開始設定事件
                 * @author Pudding 20151029
                 */
                var _lock_name = "kals_word_selectable";
                
                _word.one("mouseover", function () {
                    if ($(this).hasAttr(_lock_name)) {
                        return;
                    }
                    $(this).attr(_lock_name, 1);
                    _this._init_word_selectable_event(this);
                    $(this).trigger("mouseover");
                });
                
                _word.one("click", function () {
                    if ($(this).hasAttr(_lock_name)) {
                        return;
                    }
                    $(this).attr(_lock_name, 1);
                    _this._init_word_selectable_event(this);
                    $(this).trigger("click");
                });
                
                KALS_context.progress.add_count(2);
                
                _continue();
            };
            
            var _continue = function () {
                _i++;
                if (_i < _words.length) {
                    
                    if (_i % _wait_i === 0) {
                        setTimeout(function () {
                            _loop();
                        }, 10);
                    }
                    else {
                        _loop();
                    }
                }
                else {
                    _complete();
                }
            };
            
            var _complete = function () {
                _this.locks.word_click = true;
                $.trigger_callback(_callback);
            };
			
            _loop();
        }
    }
    else {
        $.trigger_callback(_callback);
    }
    
    return this;
};

/**
 * 取得要快取的資料
 * @returns {Number}
 */
Selectable_text_element.prototype.get_data = function () {
    return this.count;
};

/**
 * 設定被快取的資料
 * @param {Int} _data 從快取中取回的資料
 * @returns {Selectable_text_element}
 */
Selectable_text_element.prototype.set_data = function (_data) {
    if ($.is_number(_data)) {
        this.count = _data;
    }
    return this;
};

/**
 * 捲動到指定文字
 * @param {Int} _target_id
 * @param {Function} _callback
 * @returns {Selectable_text_chapter.prototype}
 */
Selectable_text_element.prototype.scroll_to = function (_target_id, _callback) {
    
    if (_target_id === undefined) {
        return this;
    }
    
    var _position = {
        selector: "#" + this.id_prefix + _target_id
    };
    
    var _speed = 500;
    //$.test_msg("chapter scroll_to", _position);
    $.scroll_to(_position, _speed, _callback);
    
    return this;
};

/* End of file Selectable_text_element */
/* Location: ./system/application/views/web_apps/Selectable_text_element.js */