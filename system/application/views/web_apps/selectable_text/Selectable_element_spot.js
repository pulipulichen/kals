/**
 * Selectable_element_spot
 * 
 * 建立Selectable_text中的Spot
 * 
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) Expression year is undefined on line 7, column 33 in Templates/KALS/KALS_JavaScript_Class.js., Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2015/11/11 下午 08:25:49
 */
/*global KALS_CONFIG:false */ /*global KALS_context:false */ /*global KALS_util:false */ /*global KALS_text:false */ /*global KALS_toolbar:false */
/*global Selectable_element:false */

/**
 * @memberOf {Selectable_element_spot}
 * @extends {Selectable_element}
 * @constructor
 * @param {Selectable_text} _selectable_text 父物件
 */
function Selectable_element_spot(_selectable_text) {
    // 初始化時做的事情
    Selectable_element.call(this, _selectable_text);
}

/**
 * Extends from Selectable_element.
 * @memberOf {Selectable_element_spot}
 */
Selectable_element_spot.prototype = new Selectable_element();

// -----------------------------------
// 內部參數設定
// -----------------------------------

/**
 * 列入特殊標註點的classname
 * @type {String}
 */
Selectable_element_spot.prototype.classname = 'kals-spot';

/**
 * 列入特殊標註點的classname，私人
 * @type {String}
 */
Selectable_element_spot.prototype.private_classname = 'private';

/**
 * 可選取文字的ID前置
 * @type {String}
 * @author Pudding 20140102 尚未更新相關使用的程式碼 this.word_id_prefix
 */
Selectable_element_spot.prototype.id_prefix = 'kals_spot_';

// -----------------------------------
// 方法
// -----------------------------------

/**
 * 取得spot_id_prefix
 * @returns {String}
 */
Selectable_element_spot.prototype.get_spot_id_prefix = function () {
    return this.get_id_prefix();
};

/**
 * 從ID取得Spot
 * @param {number} _index
 * @return {jQuery}
 */
Selectable_element_spot.prototype.get_spot_by_index = function(_index) {
    return this.get_ele_by_index(_index);
};

/**
 * 取得指定ID的spot
 * @param {int} _spot_id
 * @returns {jQuery}
 */
Selectable_element_spot.prototype.get_spot = function (_spot_id) {
    return this.get_ele_by_index(_spot_id);
};

/**
 * 取得spot id，但似乎沒有人使用他
 * @param {jQuery} _spot
 */
Selectable_element_spot.prototype.get_spot_id = function (_spot) {
    return this.get_element_id(_spot);
};

/**
 * 建立一個可選取的元素
 * 
 * @param {number} _para_id Paragraph ID
 * @param {number} _point_id Word ID
 * @param {string} _obj 內容文字
 * @type {jQuery}
 * @author Pudding 20151029
 */
Selectable_element_spot.prototype.create_selectable_element = function(_para_id, _point_id, _obj) {
    
//    _obj.className = $.trim(_obj.className 
//                + ' '
//                + this.classname);
//    
//    if (_obj.className.indexOf(this.word_spot_classname) !== -1) {
//        _obj.className = $.trim(_obj.className 
//                + ' '
//                + this._selectable_text.tooltip.trigger_classname);
//    }
//    
    _obj.className = $.trim(_obj.className 
                + ' '
                + this._selectable_text.tooltip.trigger_classname);

    var _id = this.id_prefix + _point_id; 

    _obj.id = _id;

    //KALS_context.progress.add_count();
 
    return _obj;
};

Selectable_element_spot.prototype.KALS_SELECT_MOUSEDOWN_LOCK;
Selectable_element_spot.prototype.KALS_SELECT_LOCK;

/**
 * 設定文字的滑鼠事件
 * @param {jQuery} _words
 * @param {Function} _callback
 * @returns {Selectable_element_spot}
 */
Selectable_element_spot.prototype.setup_spot_mouse_event = function (_words, _callback) {
    
    
    /**
     * @type Selection_select
     */
    var _select = KALS_text.selection.select;
    
    // @20130612 Pudding Chen
    // 加入了拖曳選取時也能用的選取範圍功能
    if (typeof(this.KALS_SELECT_MOUSEDOWN_LOCK) === "undefined") {
        this.KALS_SELECT_MOUSEDOWN_LOCK = null;
        this.KALS_SELECT_LOCK = false;
    }

    var _this = this;
    
    // -----------------------------
    
    var _mouseout_event = function () {
        
        // 如果不啟用滑鼠事件，則關閉這整個事件
        if (_this._mouse_event_enable === false) {
            return;
        }
        
        // 單點按壓選擇
        _this.KALS_SELECT_LOCK = false;
    };
    
    _words.mouseout(_mouseout_event);

    // -----------------------------
    
    var _mousedown_event = function (_event) {
        
        // 如果不啟用滑鼠事件，則關閉這整個事件
        if (_this._mouse_event_enable === false) {
            return;
        }

        // 限制只能用左鍵選取
        if (_event.which !== 1) {
            return;
        }

        /**
         * 先做超連結偵測
         * @author Pulipuli Chen <pulipuli.chen@gmail.com> 
         */
        var _md_this = this;
        var _word = $(_md_this);
        var _is_link = false;

        var _link_tag = _word.parents("a[href]:first");
        if (_link_tag.length === 1) {
            // 如果是超連結的話
            
            _mousedown_link_event(_link_tag);

            return;
        }

        _this.KALS_SELECT_LOCK = true;
        _this.KALS_SELECT_MOUSEDOWN_LOCK = 1;

        // 短時間點選事件
        _mousedown_click_event(_md_this);

        // 單點按壓選擇
        _mousedown_hold_press_event(_md_this);
    };
    
    /**
     * 點選位置是連結的事件
     * @param {jQuery} _link_tag
     */
    var _mousedown_link_event = function (_link_tag) {
        var _is_link = true;

        var _link_url = _link_tag.attr("href");

        //alert(_link_tag.attr("target"));
        /*
        var _target = "_blank";
        if (_link_url.substr(0,1) != "#"
                && (_link_tag.hasAttr("target") === false || _link_tag.attr("target") == "") ) {
            _link_tag.attr("target", "_blank");
        }
        else {
            _target = _link_tag.attr("target");
        }
        */
        var _target = "_self";
        if (_link_tag.hasAttr("target") === false 
                || _link_tag.attr("target") === "") {
            _target = _link_tag.attr("target");
        }
        //_link_url = "//";

        var _log_data = {
            "url": _link_url,
            "target": _target
        };

        //$.test_msg("送出超連結", _log_data);
        var _action = 39;
        KALS_util.log(_action, _log_data);
    };
    
    var _mousedown_click_event = function (_md_this) {
        setTimeout(function () {
            if (_this.KALS_SELECT_MOUSEDOWN_LOCK === 1) {
                var _word = $(_md_this);

                _select.cancel_select();
                _select.set_select(_word);	

                _this.KALS_SELECT_MOUSEDOWN_LOCK = 2;
            }
        }, 300);
    };
    
    var _mousedown_hold_press_event = function (_md_this) {
        setTimeout(function () {
            if (_this.KALS_SELECT_MOUSEDOWN_LOCK === 2 
                    && _this.KALS_SELECT_LOCK === true) {
                //$.test_msg("單點按壓選擇");
                
                // 相同位置選擇
                var _word = $(_md_this);
                
                //_select.set_select(_word);
                
                var _sentence_start_word = _this.get_setence_start_word(_word);
                var _sentence_end_word = _this.get_setence_end_word(_word);
                
                _select.cancel_select();
                
                _select.set_select(_sentence_start_word);
                _select.set_select(_sentence_end_word);
                
                _this.KALS_SELECT_MOUSEDOWN_LOCK = null;
            }
        }, 1000);
    };
    
    _words.mousedown(_mousedown_event);

    // -----------------------------
    
    var _mouseup_event = function () {
        
        // 如果不啟用滑鼠事件，則關閉這整個事件
        if (_this._mouse_event_enable === false) {
            return;
        }
        
        var _mu_this = this;
        setTimeout(function () {
            if (_this.KALS_SELECT_MOUSEDOWN_LOCK === 2) {
                var _word = $(_mu_this);
                _select.set_select(_word);	
            }
            _this.KALS_SELECT_MOUSEDOWN_LOCK = null;
        }, 100);

        if (_this.KALS_SELECT_MOUSEDOWN_LOCK === 1) {

            //表示這是一個Click事件
            _this.KALS_SELECT_MOUSEDOWN_LOCK = null;

            if (_this.initialized === false) {
                return this;
            }

            var _word = $(this);
            setTimeout(function () {
                _word.tooltip().hide();
            }, 100);

            //_manager.listen_select(_word);
            _select.set_select(_word);

            if ($.is_function(_callback)) {
                _callback();
            }
        }
    };
    
    _words.mouseup(_mouseup_event);
    
    // ---------------------------------------

    if ($.is_function(_callback)) {
        _callback();
    }
    return this;
};

/**
 * 加上單一選取的功能
 * @author Pudding 20151029
 * @param {jQuery} _words
 */
Selectable_element_spot.prototype._setup_word_spot_annotation_event = function (_words) {
    
    /**
     * @type Selection_select
     */
    //var _select = KALS_text.selection.select;
    
    //$.test_msg("已經設定");
    _words.click(function () {
        var _word = $(this);
        KALS_context.module.get_module("Annotation_spot").set_select(_word);
    });
};

/**
 * 檢查是否啟用滑鼠事件
 * @type Boolean
 */
Selectable_element_spot.prototype._mouse_event_enable = true;

/**
 * 初始化這個文字的事件
 * @param {jQuery} _word
 * @returns {Selectable_element_spot}
 */
Selectable_element_spot.prototype._init_word_spot_selectable_event = function (_word) {
    
    if ($.is_jquery(_word) === false) {
        _word = $(_word);
    }
    
    this._setup_word_spot_annotation_event(_word);
    
    return this;
};

/**
 * 可以接受的標籤名稱
 * @type Array|String[]
 */
//Selectable_element_spot.prototype.spot_tag_name_list = ["img"];

/**
 * 是標註討論點
 * 
 * @author Pudding 20151112 只判斷kals-spot
 * @param {jQuery} _obj
 * @returns {Boolean}
 */
Selectable_element_spot.prototype.is_spot = function (_obj) {
//    if ($.is_jquery(_obj) === false) {
//        //$.test_msg("is_spot not jquery");
//        //return false;
//        _obj = $(_obj);
//    }
//    
//    //$.test_msg("is_spot", _obj.attr("className"));
//    if (_obj.hasClass(this.word_spot_classname)) {
//        return true;
//    }
//    
//    var _tag_name = _obj.attr("tagName");
//    if (_tag_name === undefined) {
//        return false;
//    }
//    
//    _tag_name = _tag_name.toLowerCase();
//    //$.test_msg("is_spot", [_tag_name, ($.inArray(_tag_name, this.spot_tag_name_list) > -1)]);
//    
//    return ($.inArray(_tag_name, this.spot_tag_name_list) > -1);
    
    if ($.is_jquery(_obj) === false) {
        //$.test_msg("is_spot not jquery");
        //return false;
        _obj = $(_obj);
    }
    
    //$.test_msg("is_spot", _obj.attr("className"));
    return _obj.hasClass(this.spot_classname);
};


/**
 * 讓所有文字都保持在可選取的狀態
 * 
 * 2254 轉接完畢，檢查完畢
 * @param {function} _callback
 */
Selectable_element_spot.prototype.setup_word_spot_selectable = function (_callback) {
    
    var _select = KALS_text.selection.select;
    
    //$.test_msg("已經設定");
    
    // 如果是一般模式
    if ($.is_mobile_mode() === true) {
        $.trigger_callback(_callback);
        return this;
    }
    
    if (typeof(this.locks.word_click) !== 'undefined') {
        return this;
    }
    var _this = this;

    var _words = this._text.find('.'+ this.word_spot_classname + ':not(.' + this.span_classname + ')');

    var _i = 0;
    var _wait_i = 1000;
    var _loop = function () {

        var _word = _words.eq(_i);

        /**
         * 在滑鼠移上去的時候才開始設定事件
         * @author Pudding 20151029
         */
        var _lock_name = "kals_spot_selectable";

        _word.one("mouseover", function () {
            if ($(this).hasAttr(_lock_name)) {
                return;
            }
            $(this).attr(_lock_name, 1);
            _this._init_word_spot_selectable_event(this);
            $(this).trigger("mouseover");
        });

        _word.one("click", function () {
            if ($(this).hasAttr(_lock_name)) {
                return;
            }
            $(this).attr(_lock_name, 1);
            _this._init_word_spot_selectable_event(this);
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
    
    return this;
};

// ------------------------------------------

/**
 * 初始化next_element，只用於setup_selectable_element
 * @param {jQuery} _child_obj
 * @returns {HTMLNode}
 * @author Pudding 20151029
 */
Selectable_element_spot.prototype.setup_selectable_element_clone_next_element = function (_child_obj) {
    // 變數簡化
    var _selectable_text_paragraph = this._selectable_text.paragraph;
    //var _selectable_text_word = this._selectable_text.word;
    var _selectable_text_spot = this;
    //var _selectable_text_sentence = this._selectable_text.sentence;
    //var _sentence_punctuation_class_name = this._selectable_text.sentence.sententce_punctuation_classname;
    //var _punctuation_classname = this._selectable_text.sentence.punctuation_classname;
    
    
    var _next_element = $(_child_obj).clone().get(0);
    _next_element = _selectable_text_spot.create_selectable_element(
        _selectable_text_paragraph.paragraph_count, 
        _selectable_text_spot.count, _next_element
    );
    
    _selectable_text_spot.count++;
    
    return _next_element;
};
/* End of file Selectable_element_spot */
/* Location: ./system/application/views/web_apps/Selectable_element_spot.js */