/**
 * Selectable_text_word
 * 
 * 建立Selectable_text中的Word
 * 
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) Expression year is undefined on line 7, column 33 in Templates/KALS/KALS_JavaScript_Class.js., Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2014/1/2 下午 08:25:49
 */

/**
 * @memberOf {Selectable_text_word}
 * @extends {KALS_user_interface}
 * @constructor
 * @param {Selectable_text} _selectable_text 父物件
 */
function Selectable_text_word(_selectable_text) {
    
    this._selectable_text = _selectable_text;
    this._text = _selectable_text._text;
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Selectable_text_word}
 */
Selectable_text_word.prototype = new KALS_user_interface();

/**
 * 父物件
 * @type {Selectable_text}
 */
Selectable_text_word.prototype._selectable_text;

// -----------------------------------
// 內部參數設定
// -----------------------------------

/**
 * 文字記數，初始化時使用。
 * @type {number}
 */
Selectable_text_word.prototype.word_count = 0;

/**
 * 可選取文字的classname
 * @type {String}
 * @TODO 20140102 尚未更新相關使用的程式碼 this.word_classname
 */
Selectable_text_word.prototype.word_classname = 'kals-word';

/**
 * 可選取文字的ID前置
 * @type {String}
 * @TODO 20140102 尚未更新相關使用的程式碼 this.word_id_prefix
 */
Selectable_text_word.prototype.word_id_prefix = 'kals_word_';


Selectable_text_word.prototype._span_classname = 'span';

/**
 * 鎖
 * @type Array
 */
Selectable_text_word.prototype.locks = [];

// -----------------------------------
// 方法
// -----------------------------------

/**
 * 取得word_id_prefix
 * @returns {Selectable_text_word.word_id_prefix}
 */
Selectable_text_word.prototype.get_word_id_prefix = function () {
    return this.word_id_prefix;
};

/**
 * 從ID取得Word
 * @param {number} _id
 * @return {jQuery}
 */
Selectable_text_word.prototype.get_word_by_index = function(_index) {
    
    var _word_id_prefix = this.word_id_prefix;
    var _word_id = _word_id_prefix + _index;
    var _word = $('#' + _word_id);
    return _word;
};

/**
 * 取得指定ID的word
 * 
 * 2307 轉接完成，不需檢查
 * @param {int} _word_id
 * @returns {jQuery}
 */
Selectable_text_word.prototype.get_word = function (_word_id) {
    return this.get_word_by_index(_word_id);
};

/**
 * 取得word id，但似乎沒有人使用他
 * 
 * 2317 轉接完成，檢查完成
 * @param {jQuery} _word
 */
Selectable_text_word.prototype.get_word_id = function (_word) {
    if ($.is_object(_word)) {
        if ($.is_jquery(_word)) {
            _word = _word.attr('id');
        }
        else {
            _word = _word.id;
        }
    }
       
    var _id_prefix = this.word_id_prefix;
    if ($.starts_with(_word, _id_prefix)) {
        _word = _word.substring(_id_prefix.length, _word.length);
    }
    return parseInt(_word,10);
};


/**
 * 如果下一個字是英文的話
 * 
 * 2316 檢查完成
 * 2317 轉接完成
 * @param {jQuery} _word
 * @returns {Boolean}
 */
Selectable_text_word.prototype.is_word_next_english = function (_word) {
    var _word_id = this.get_word_id(_word);
    _word_id++;
    var _next = this.get_word_by_index(_word_id);
    var _text = _next.text();
    if (_text.length > 1) {
        // 如果超過一個字，那大概就是英文了
        return true;
    }
    else if ($.match_english(_text)) {
        return true;
    }
    
    return false;
};

/**
 * 如果下一個字是空格的話
 * 
 * 2318 轉接完成，檢查完成
 * @param {jQuery} _word
 * @returns {Boolean}
 */
Selectable_text_word.prototype.is_word_next_span = function (_word) {
    var _next = _word.next();
    if (_next.length === 0) {
        return false;
    }
    else {
        return _next.hasClass(this._span_classname);
    }
};

/**
 * 取得下一個span
 * 
 * 2319 檢查完成，轉接完成
 * @param {jQuery} _word
 * @returns {jQuery|null}
 */
Selectable_text_word.prototype.get_word_next_span = function (_word) {
    var _next = _word.next();
    //_next.css('background-color', 'red');
    //$.test_msg('Selectable_text.is_word_next_span()', _next.length);
    if (_next.length === 0) {
        return null;
    }
    else {
        return _next;
    }
};

/**
 * 建立一個不可選取的文字
 * 
 * 2323 轉接完成，檢查完成
 * @param {String} _text
 * @type {jQuery}
 */
Selectable_text_word.prototype.create_span_word = function(_text) {
    var _word = document.createElement("span");
    _word.className = this._span_classname + ' ' + this.word_classname;
	
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
Selectable_text_word.prototype.create_selectable_word = function(_para_id, _point_id, _text) {
    var _word = document.createElement("span");

    _word.className = this.word_classname
    + ' ' + this._selectable_text.tooltip.trigger_classname;

    var _word_id = this.word_id_prefix + _point_id; 

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
 * 讓所有文字都保持在可選取的狀態
 * 
 * 2254 轉接完畢，檢查完畢
 * @param {function} _callback
 */
Selectable_text_word.prototype.setup_word_selectable = function (_callback) {
    
    var _select = KALS_text.selection.select;
    
	// 如果是一般模式
    if ($.is_mobile_mode() === false) {
        if (typeof(this.locks.word_click) === 'undefined') {
            var _this = this;
			
            var _words = this._text.find('.'+ this.word_classname + ':not(.' + this._span_classname + ')');
            
            // 20140223 Pudding Chen
            // 轉移到這邊做tooltip
            _this.setup_word_tooltip(_words);
			
            // @20130612 Pudding Chen
            // 加入了拖曳選取時也能用的選取範圍功能
            if (typeof(KALS_SELECT_MOUSEDOWN_LOCK) === "undefined") {
                    KALS_SELECT_MOUSEDOWN_LOCK = null;
                    KALS_SELECT_LOCK = false;
            }

            _words.mouseout(function () {
                KALS_SELECT_LOCK = false;
            });

            _words.mousedown(function (_event) {
                
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
                    _is_link = true;

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

                    return;
                }

                KALS_SELECT_LOCK = true;
                KALS_SELECT_MOUSEDOWN_LOCK = 1;


                setTimeout(function () {
                    if (KALS_SELECT_MOUSEDOWN_LOCK === 1) {
                        _word = $(_md_this);

                        _select.cancel_select();
                        _select.set_select(_word);	

                        KALS_SELECT_MOUSEDOWN_LOCK = 2;
                    }
                }, 300);

                setTimeout(function () {
                    if (KALS_SELECT_MOUSEDOWN_LOCK === 2
                        && KALS_SELECT_LOCK === true) {
                            _word = $(_md_this);
                            _select.set_select(_word);	
                            KALS_SELECT_MOUSEDOWN_LOCK = null;
                    }
                }, 1000);
            });

            _words.mouseup(function () {
                var _mu_this = this;
                setTimeout(function () {
                    if (KALS_SELECT_MOUSEDOWN_LOCK === 2) {
                        var _word = $(_mu_this);
                        _select.set_select(_word);	
                    }

                    KALS_SELECT_MOUSEDOWN_LOCK = null;
                }, 100);

                if (KALS_SELECT_MOUSEDOWN_LOCK === 1) {

                    //表示這是一個Click事件
                    KALS_SELECT_MOUSEDOWN_LOCK = null;

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
            });

            /*
            _words.mousemove(function () {
                    if (KALS_SELECT_MOUSEDOWN_LOCK !== 2) {
                            KALS_SELECT_MOUSEDOWN_LOCK = null;	
                    }
            });
            */			
            /**
             * 滑鼠放在文字上的自動選取功能
             * 
             * @author Pudding Chen 20121228
             * @param {function} _callback
             * @deprecated 不佳，太麻煩了，不使用
             */
            /*
            var _hover_evt = function (_callback) {
                    _select.set_hover();
            };

            var _last_word = null;
            var _HOVER_TIMER = null;

            _words.mouseover(function () {
                    var _word = $(this);
                            _HOVER_TIMER = setTimeout(function () {
                                    setTimeout(function () {
                        _word.tooltip().hide();
                    }, 100);
                                    _select.set_select(_word);
                            }, 1500);
                    })
                    .mouseout(function () {
                            clearTimeout(_HOVER_TIMER);
                    });
            */
            /*
            var _HOVER_TIMER = null;
            _words.mouseover(function () {
                    if (_HOVER_TIMER != null)
                            clearTimeout(_HOVER_TIMER);

                    var _word = $(this);
                    _HOVER_TIMER = setTimeout(function () {
                            _word.click();
                            setTimeout(function () {}, 200);
                                    _word.click();
                                    clearTimeout(_HOVER_TIMER);
                                    _HOVER_TIMER = null;
                    }, 800);

            })
                    .mouseout(function () {
                            clearTimeout(_HOVER_TIMER);
                            _HOVER_TIMER = null;
                    });
            */
			
            this.locks.word_click = true;
        }
    }
    $.trigger_callback(_callback);
    
    return this;
};


/**
 * 設定Word的Tooltip
 * 
 * 2325 轉接完畢，檢查完畢
 * @deprecated 不使用逐字設定toolip，改用on
 * @param {jQuery|HTMLElement} _word
 * @returns {jQuery}
 */
Selectable_text_word.prototype.setup_word_tooltip = function (_word) {
    
    var _tooltip_config = this._selectable_text.tooltip.get_tooltip_config();
    
    $(_word).tooltip(_tooltip_config);
    
    return _word;
};

/**
 * 設定Word的Tooltip
 * 
 * 2325 轉接完畢，檢查完畢
 * 未完成，目前不使用
 * @deprecated 不使用逐字設定toolip，改用on
 * @param {jQuery|HTMLElement} _word
 * @returns {jQuery}
 */
/*
Selectable_text_word.prototype._init_word_tooltip = function () {
    
    var _tooltip_config = this._selectable_text.tooltip.get_tooltip_config();
    
    var _word_classname = this.word_classname;
    var _paragraph_classname = this._selectable_text.paragraph.paragraph_classname;
    var _selector = '.' + _paragraph_classname + ' .' + _word_classname;
    //$(_word).tooltip(_tooltip_config);
    this._text.on('append', _selector , function () {
        
    });
    //return _word;
};
*/
/**
 * 估算大概會多少字
 * 
 * 2326 檢查完畢，轉接完畢
 * @param {String} _text
 * @returns {Number}
 */
Selectable_text_word.prototype.get_estimate_total_words = function (_text) {
    
    //$.test_msg("預測字 1", _text);
    
    // 濃縮英數
    _text = _text.replace(/[\w]{1,}/gi, "_");
    
    // 去掉空格
    _text = _text.replace(/([\s|\t]*)/g, "");
    
    //$.test_msg("預測字 2", _text);
    
    var _total = 0;
    _total = _text.length;
    
    return _total;
};

/**
 * 儲存到快取中
 * @param {String} _cache_id
 * @param {funciton} _callback
 * @returns {Selectable_text_word}
 */
Selectable_text_word.prototype.cache_save = function (_cache_id, _callback) {
    _cache_id = _cache_id + '_word';
    //$.test_msg('word save: ' + _cache_id, this.word_count);
    KALS_context.storage.set(_cache_id, this.word_count, _callback);
    return this;
};

/**
 * 從快取中復原
 * @param {String} _cache_id
 * @param {funciton} _callback
 * @returns {Selectable_text_word}
 */
Selectable_text_word.prototype.cache_restore = function (_cache_id, _callback) {
    _cache_id = _cache_id + '_word';
    var _this = this;
    KALS_context.storage.get(_cache_id, function (_value) {
        _this.word_count = _value;
        $.trigger_callback(_callback);
    });
    //this.word_count = $.localStorage.get(_cache_id);
    //$.test_msg('word restore: ' + _cache_id, this.word_count);
    return this;
};

/**
 * 捲動到指定文字
 * @param {Int} _heading_id
 * @param {Function} _callback
 * @returns {Selectable_text_chapter.prototype}
 */
Selectable_text_word.prototype.scroll_to = function (_target_id, _callback) {
    
    if (_target_id === undefined) {
        return this;
    }
    
    var _position = {
        selector: "#" + this.word_id_prefix + _target_id
    };
    
    var _speed = 500;
    //$.test_msg("chapter scroll_to", _position);
    $.scroll_to(_position, _speed, _callback);
    
    return this;
};
/**
 * 取得現在捲軸的位置的first word id
 * @return {int} word_id
 */

Selectable_text_word.prototype.get_current_progress_word = function () {

    // 1.先比對kals_paragraph_i
    // 2.再比對該層內的word_id 直到比現在捲軸位置還大(y)的 記錄id
    var _scroll_top = $(window).scrollTop();
    _scroll_top = _scroll_top + KALS_toolbar.get_height();

    // 取得所有的kals_paragraph(array)
    var _paragraph_collection = $('.kals-paragraph');
    
    //$.test_msg('save_reading_progress, para length', _paragraph_len);

    var _target_paragraph;
    
    for (var _index = 0; _index < _paragraph_collection.length; _index++ ) {
        var _paragraph = _paragraph_collection.eq(_index);
        //var _paragraph_height = parseInt($('.kals_paragraph_' + _i).offset().top, 10);        
        //取得每個paragraph的第一個word的top
        var _paragraph_height = $.get_offset_top(_paragraph.find(".kals-word:first")); 
        //$.test_msg('save_reading_progress', [_paragraph_height, _scroll_top, _index]);
            
        if (_paragraph_height > _scroll_top) {
            //找前一段
            _target_paragraph = _paragraph_collection.eq(_index-1);
            break;
        }
            //$.test_msg('i', _i);
    }
        
    var _target_word;
    //已經找到該段落
    if (_target_paragraph !== undefined) {
        //段落中所有的word
        var _words = _target_paragraph.find(".kals-word");
            
        for (var _w = 0; _w < _words.length; _w++) {
            _target_word = _words.eq(_w);
            //比較每個字與現在捲軸位置的高度
            var _word_height = $.get_offset_top(_target_word);
            if (_word_height > _scroll_top) {
                break;
            }
            // 如果在這一段裡面都沒有找到位置比捲軸還低的word，表示實際上是下一個paragraph
            if (_w === _words.length - 1) {
                // get_prefixed_id 只取ID的值
                var _word_id = $.get_prefixed_id(_target_word.attr("id"));
                // id裡的值為"kals-word_id"
                _target_word = $("#kals_word_" + (_word_id+1));
                break;
            }
        };
    }
    else {
        _target_word = $(".kals-word:last");
    }
        
    var _word_id = 1;
    if (_target_word !== undefined) {
        _word_id = _target_word.attr("id");
        _word_id = $.get_prefixed_id(_word_id);
    }
    //$.test_msg("get_current_progress_word", [_word_id, _target_paragraph.attr("className")]);
    return _word_id;
};

/* End of file Selectable_text_word */
/* Location: ./system/application/views/web_apps/Selectable_text_word.js */