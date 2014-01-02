/**
 * Selectable_text
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/15 下午 05:05:14
 * @extends {KALS_user_interface}
 */
function Selectable_text(_selector) {
    
    KALS_user_interface.call(this);
    
    this.locks = [];
    this.child('tooltip', new Select_tooltip());
    
    if ($.isset(_selector)) {
        this.set_text(_selector);
    }
    
    // Selectable_text_component
    this.child('word', new Selectable_text_word(this));
    this.child('offset', new Selectable_text_offset(this));
    this.child('scope', new Selectable_text_scope(this));
    this.child('anchor', new Selectable_text_anchor(this));
    this.child('sentence', new Selectable_text_sentence(this));
    this.child('paragraph', new Selectable_text_paragraph(this));
    this.child('location', new Selectable_text_location(this));
    this.child('chapter', new Selectable_text_chapter(this));
}

// Extend from KALS_user_interface
Selectable_text.prototype = new KALS_user_interface();

/**
 * 可選取的範圍
 * @type {jQuery};
 */
Selectable_text.prototype._text = null;

/**
 * @type {Select_tooltip}
 */
Selectable_text.prototype.tooltip = null;

// -------------------------
// Selectable_text_component
// -------------------------

/**
 * @type {Selectable_text_word}
 */
Selectable_text.prototype.word;

/**
 * @type {Selectable_text_offset}
 */
Selectable_text.prototype.offset;

/**
 * @type {Selectable_text_scope}
 */
Selectable_text.prototype.scope;

/**
 * @type {Selectable_text_anchor}
 */
Selectable_text.prototype.anchor;

/**
 * @type {Selectable_text_sentence}
 */
Selectable_text.prototype.sentence;

/**
 * @type {Selectable_text_paragraph}
 */
Selectable_text.prototype.paragraph;

/**
 * @type {Selectable_text_location}
 */
Selectable_text.prototype.location;

/**
 * @type {Selectable_text_chapter}
 */
Selectable_text.prototype.chapter;

// -------------------------
// End of Selectable_text_component
// -------------------------

/**
 * 設置選取區域
 * @param {jQuery} _selector 先前會經過Selection_manager過濾變數，所以此處可以確定是安全的範圍
 */
Selectable_text.prototype.set_text = function (_selector) {
    this._text = _selector;
    
    //調整速度
    if ($.browser.msie) {
        this.excute_interval = this.excute_interval_ie;
    }
    return this;
};


// --------
// 參數設定
// --------

Selectable_text.prototype.selected_classname = 'selected';
Selectable_text.prototype.selected_from_classname = 'from';
Selectable_text.prototype.selected_to_classname = 'to';
Selectable_text.prototype.selected_middle_classname = 'middle';

/**
 * 各種鎖
 * @type Array
 */
Selectable_text.prototype.locks = [];

// --------
// Initialize
// --------

Selectable_text.prototype.initialized = false;

/**
 * 將可選取範圍初始化
 * 
 * 只會執行一次，不會給其他人使用
 * @memberOf {Selection_manager}
 * @param {function} _callback
 */
Selectable_text.prototype.initialize = function (_callback) {
    
    var _element = this._text;
    
    // ---------
    // 開始作初始化
    // ---------
    var _this = this;
    
    /**
     * 加入預測進度的功能
     * @author Pulipuli Chen 20131227 
     */
    var _estimate_words = _element.text();
    _estimate_words_length = this.word.get_estimate_total_words(_estimate_words);
    
    KALS_context.progress.set_total(_estimate_words_length);
    
    /*
    this._estimate_words_length = _estimate_words_length;
    */
    //$.test_msg("預測字數", _estimate_words_length);
    
    this.setup_selectable_element(_element, function () {
        
        // 全部處理完了
        //$.test_msg("paragraph feature", _this.paragraph_feature);
        
        KALS_context.progress.set_finished();
        
        // ---------
        // 開始標示段落位置
        // ---------
        _this.setup_paragraph_location(function () {
            
            // --------
            // 讓文字變成可選取
            // --------
            _this.setup_word_selectable(function () {
                
                KALS_context.init_profile.add_listener(function () {
                    _this.initialized = true;    
                });
                
                //2010.11.22 為了計算字數而使用，正式時不用
                //_this.count_paragraph_words_avg();
                
                //$.test_msg('Selectable_text.initialize() complete', _callback);
                
                $.trigger_callback(_callback);    
            });
        });        
    });    
    
    return this; 
};

/**
 * 執行間隔參數
 * 
 * 初始化速度設定
 * @type {JSON}
 */
Selectable_text.prototype.excute_interval = {
    /**
     * 批次執行的數量
     * 
     * 若批次執行的數量越多，則效能越好
     * 但設定太高的話，可能會導致瀏覽器回應速度下降
     * 
     * 20131228 設為200已經差不多沒什麼差別了
     * @type Number
     */
    batch_excute: 1000,
    /**
     * 中間等待時間
     * @type Number
     */
    wait: 0
};

/**
 * 執行間隔參數
 * 
 * 初始化速度設定，給IE用的版本
 * @type {JSON}
 */
Selectable_text.prototype.excute_interval_ie = {
    batch_excute: 1,
    wait: 0
};

Selectable_text.prototype.excute_timer = null;

/**
 * 停止初始化動作
 * @author Pulipuli Chen <pulipuli.chen@gmail.com>
 */
Selectable_text.prototype.stop_initialize = function () {
    try {
        clearTimeout(this.excute_timer);
    }
    catch (e) {}
};

// -----------------------------------------------

/**
 * 將選取範圍設定為可以選取的型態
 * 
 * 這是最重要的一個函式，KALS如何認識文本就靠這隻函式
 * @param {jQuery} _element 指範圍scope的元素
 * @param {function} _callback
 */
Selectable_text.prototype.setup_selectable_element = function (_element, _callback) {
    /**
     * @type {Array}
     */
    var _child_nodes = _element.attr('childNodes');
    if (typeof(_child_nodes) === 'undefined') {
        //$.test_msg('Selectable_text.setup_selectable_element() callback');
        
        if ($.is_function(_callback)) {
            _callback();
        }
        return this;
    }
    
    var _para_classname = this.paragraph.paragraph_classname;
    var _para_tag_names = this.paragraph.paragraph_tag_names;
    var _selectable_text_paragraph = this.paragraph;
    
    var _punctuation_classname = this.sentence.punctuation_classname;
    var _sentence_punctuation_class_name = this.sentence.sententce_punctuation_classname;
    var _selectable_text_sentence = this.sentence;
    
    var _selectable_text_word = this.word;
    
    var _this = this;
    
    var _batch_excute = this.excute_interval.batch_excute;
    var _wait = this.excute_interval.wait;
    
    /**
     * 用來儲存任務的變數
     * @type Array
     */
    var _task_stack = [];
    
    /**
     * 實際執行的迴圈
     * 
     * @param {number} _i 迴圈編號
     * @param {jQuery} _child_nodes 子節點
     * @param {function} _cb 迴呼函數
     */
    var _loop = function (_i, _child_nodes, _cb) {
        
        // 完成迴圈了，停止迴圈的判定
        if (_i === _child_nodes.length || _i > _child_nodes.length) {
            //$.test_msg('Selectable_text.setup_selectable_element() cb', _cb);
            
            // 把剩餘的任務執行完
            //if (_task_stack.length > 00) {
                //$.test_msg("剩餘的任務？", _task_stack.length);
                //for (var _t = 0; _t < _task_stack.length; _t++) {
                for (var _t in _task_stack) {
                    //if ($.is_function(_task_stack[_t])) {
                        _task_stack[_t]();
                    //}
                }
                _task_stack = [];
            //}
                
            
            if ($.is_function(_cb)) {
                _cb();
            }
            return;
        }
        
        /**
         * _child_obj
         * @type {jQuery}
         */
        var _child_obj = _child_nodes.item(_i);
        if (_this.element_has_class(_child_obj, _para_classname)) {
            _i++;
            _loop(_i, _child_nodes, _cb);
            return;
        }
		
        if (_child_obj.nodeName !== '#text' &&
            _this.element_has_class(_child_obj, _para_classname) === false) {
        
            var _check_word_count = _selectable_text_word.word_count;
            
            var _deeper_parse = function () {
                var _node_name = _child_obj.nodeName;
                if (_check_word_count < _selectable_text_word.word_count
                    && typeof(_node_name) === 'string' 
                    && $.inArray(_node_name.toLowerCase(), _para_tag_names) !== -1) {
                    // 20131231 連續加兩次是刻意的
                    _selectable_text_paragraph.paragraph_count++;
                    _selectable_text_paragraph.paragraph_count++;
                    
                    //$.test_msg("deeper parse 1", _selectable_text_word.word_count);
                    _selectable_text_paragraph.paragraph_structure.push(_selectable_text_word.word_count);
                }   
                else if (typeof(_node_name) === 'string'
                    && _node_name.toLowerCase() === 'br') {
                    _selectable_text_paragraph.paragraph_count++;
                    
                    //$.test_msg("deeper parse 2", _selectable_text_word.word_count);
                    _selectable_text_paragraph.paragraph_structure.push(_selectable_text_word.word_count);
                }
				
                _i++;
                
                if (_i % _batch_excute === 0) {
                    _this.excute_timer = setTimeout(function () {
                        _loop(_i, _child_nodes, _cb);
                        return;
                    }, _wait);    
                }
                else {
                    _loop(_i, _child_nodes, _cb);
                    return;
                }
            };
            
            _this.setup_selectable_element($(_child_obj), _deeper_parse);
            return;
        }
        else {
            var _text = _this.get_element_content(_child_obj);
            
            if (_text === "") {
                _i++;
                _loop(_i, _child_nodes, _cb);
                return;
            }

            var _next_element = null;
            
            _next_element = _this.create_selectable_paragraph(_selectable_text_paragraph.paragraph_count);
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
                
                if ($.match_space(_t) === false) {
                    
                    _t_element = _selectable_text_word.create_selectable_word(
                            _selectable_text_paragraph.paragraph_count, 
                            _selectable_text_word.word_count, _t
                    );
                    
                    if ($.match_sentence_punctuation(_t)) {
                        if ($.match_english_sentence_punctuation(_t)) {
                            if (_t_next === '') {
                                $(_t_element).addClass(_sentence_punctuation_class_name);
                            }
                            else if ($.match_space(_t_next)) {
                                if (_s < _text.length - 2) {
                                    //檢測下下個字是否是大寫英文
                                    var _t_nnext = _text.substr(parseInt(_s, 10) + 2, 1);
                                    if ($.match_upper_english(_t_nnext)) {
                                        $(_t_element).addClass(_sentence_punctuation_class_name);
                                    }   //if ($.match_upper_english(_t_nnext)) {
                                    else {
                                        $(_t_element).addClass(_punctuation_classname);
                                    }
                                }   //if (_s < _text.length - 2) {
                                else {
                                        $(_t_element).addClass(_sentence_punctuation_class_name);
                                }
                            }   // else if ($.match_space(_t_next)) {
                            else {
                                    $(_t_element).addClass(_punctuation_classname);
                            }
                        }   //if ($.match_sentence_punctuation(_t)) {
                        else {
                                $(_t_element).addClass(_sentence_punctuation_class_name);
                        }
                    }   //if ($.match_sentence_punctuation(_t)) {
                    else if ($.match_punctuation(_t)) {
                            $(_t_element).addClass(_punctuation_classname);
                    }   //else if ($.match_punctuation(_t)) {
                    _selectable_text_word.word_count++;
                }   //if ($.match_space(_t) === false) {
                else {
                    _t_element = _this.create_span_word(_t);
                }
                
                _next_element.appendChild(_t_element);
            }    //for (var _s = 0; _s < _text.length; _s++)
    	
            var _insert_action = function () {
                _child_obj.parentNode.insertBefore(_next_element, _child_obj);
                $(_next_element).css("display", "inline");
                $(_child_obj).remove();
            };
            _task_stack.push(_insert_action);
            
            _i++;
            if (_i % _batch_excute === 0) {
                
                // 開始批次執行
                /*
                if (_task_stack.length > 0) {
                    for (var _t in _task_stack) {
                        _task_stack[_t]();
                    }
                    _task_stack = [];
                }
                */
                
                _this.excute_timer = setTimeout(function () {
                    _loop(_i, _child_nodes, _cb);
                    return;
                }, _wait);    
            }
            else {
                _loop(_i, _child_nodes, _cb);
                return;
            }
        }    //else if (_child_obj.nodeName != '#text' &&
	};    //var _loop = function (_i, _child_nodes, _callback)
    
    // 開始進行設定化
    this.excute_timer = setTimeout(function () {
        _loop(0, _child_nodes, _callback);
    }, 0);
    return this;
    
};    //Selectable_text.prototype.setup_scope

/*
Selectable_text.prototype.add_task = function (_task) {
    this._task_stack.push(_task);
    
    if (this._task_stack.length > 100) {
        for (var _i in this._task_stack) {
            this._task_stack[_i]();
        }
        
        this._task_stack = [];
    }
};

Selectable_text.prototype._task_stack = [];
*/

/**
 * 記錄估算的字數
 * @type {number} _estimate_words_length 記錄估算的字數
 * @author Pulipuli Chen <pulipuli.chen@gmail.com> 20131227 
 * @deprecated 不使用，以Initialization_progress取代之
 */
//Selectable_text.prototype._estimate_words_length = null;

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
Selectable_text.prototype.setup_paragraph_location = function(_callback) {
    
    var _word_class_name = this.word.word_classname;
    var _span_classname = this.word._span_classname;
    var _word_id_prefix = this.word.word_id_prefix;
    var _sentence_punctuation_class_name = this.sentence.sententce_punctuation_classname;
    var _location_class_names = this.location.location_classnames;
    
    var _paragraph_class_name = this.paragraph.paragraph_classname;
    var _paragraph_id_prefix = this.paragraph.paragraph_id_prefix;
    
    var _first_paragraph = this._text.find('.' + _paragraph_class_name + ':first');
    var _last_paragraph = this._text.find('.' + _paragraph_class_name + ':last');
    
    var _first_paragraph_id = this.paragraph.get_paragraph_id(_first_paragraph);
    var _last_paragraph_id = this.paragraph.get_paragraph_id(_last_paragraph);
    
    //$.test_msg('selectable.setup_paragraph_location()', [ _first_paragraph_id , _last_paragraph_id]);
    
    var _batch_excute = this.excute_interval.batch_excute;
    var _wait = this.excute_interval.wait;
    
    var _continue = function (_i, _callback) {
        
        _i++;
        
        if (_i % _batch_excute === 0) {
            _this.excute_timer = setTimeout(function () {
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
    
    var _this = this;
    var _loop = function (_i) {
        _first_paragraph = _this._text.find('.' + _paragraph_id_prefix + _i + ':first');
        _last_paragraph = _this._text.find('.' + _paragraph_id_prefix + _i + ':last');
        
        //沒有段落了，結束了，所以呼叫完結的函數
        //$.test_msg('selectable.setup_paragraph_location()', [_i, _last_paragraph_id]);
        if (_i === _last_paragraph_id + 1 || _i > _last_paragraph_id + 1) {
            _complete();
            return;
        }
        
        //如果找不到下一個段落，則結束迴圈
        if (false === _first_paragraph.exists()) {
            //$.test_msg('_text.setup_paragraph_location()',' Cannot found ' + _i);
           _continue(_i);
           return;
        }
        
        //取得段落頭尾的編號
        var _first_word = _first_paragraph.find('.' + _word_class_name + ':not(.' + _span_classname +'):first');
        var _last_word = _last_paragraph.find('.' + _word_class_name + ':not(.' + _span_classname +'):last');
        
        if (false === _first_word.exists()
            || false === _last_word.exists()) {
            _continue(_i, _callback);
            return;
        }
        
        var _first_id = $.get_prefixed_id(_first_word.attr('id'));
        var _last_id = $.get_prefixed_id(_last_word.attr('id'));
        
        //標示段落開頭的部份
        var _location = 0;
        for (var _w = _first_id; _w < _last_id + 1; _w++) {
            var _word = $('#' + _word_id_prefix + _w + ':first');
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
        
        _this.excute_timer = setTimeout(function () {
            
            //標示段落結尾的部份
            _location = 1;
            for (var _w = _last_id; _w > _first_id - 1; _w--) {
                var _word = $('#' + _word_id_prefix + _w + ':first');
                
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
                
            //處理完畢，進行下一個迴圈
            _continue(_i);
            return;
        }, 0);
    };
    
    _loop(0);
    return this;
};

// --------
// Initialize Helpers
// --------

/**
 * 檢查HTML元素是否有_class_name
 * @param {Object} _element
 * @param {String} _class_name
 * @type {boolean}
 */
Selectable_text.prototype.element_has_class = function (_element, _class_name) {
    if ($.is_object(_element) === false
        || typeof(_element.className) === 'undefined') {
        return false;
    }
    else {
        var _class_names = _element.className.split(' ');
        return ($.inArray(_class_name, _class_names) > -1);
    }
};

/**
 * 取得_element的內容資料。如果_element不是HTML內容，則回傳空字串
 * @param {Object} _element
 */
Selectable_text.prototype.get_element_content = function (_element) {
    if ($.is_object(_element) === false) {
        return '';
	}
    else if (typeof(_element.nodeValue) !== 'undefined' &&
            $.trim(_element.nodeValue) !== '') {
        //2010.10.15 還是保留空格好了
        //return $.trim(_element.nodeValue);
        return _element.nodeValue;
    }
    else {
        return '';
    }
};

// -------------------------------------
// Selectable_text_scope
// -------------------------------------

/**
 * 取得推薦的範圍
 * @param {Scope_collection_param} _scope_coll
 * @type {Scope_collection_param}
 */
Selectable_text.prototype.get_recommend_scope_coll = function (_scope_coll) {
    return this.scope.get_recommend_scope_coll(_scope_coll);
};

/**
 * 從classname取回scope_coll
 * @param {String} _classname
 * @type {Scope_collection_param}
 */
Selectable_text.prototype.retrieve_scope_coll = function (_classname) {
    return this.scope.retrieve_scope_coll(_classname);
};

/**
 * 對指定範圍加上_classname
 * 
 * @param {Scope_collection_param} _scope_coll
 * @param {String} _classname
 */
Selectable_text.prototype.add_class = function(_scope_coll, _classname, _callback) {
    this.scope.add_class(_scope_coll, _classname, _callback);
};

/**
 * 取消_classname，或是針對_scope取消_classname
 * 
 * @param {Scope_collection_param|String} _scope_coll
 * @param {String|null} _classname
 */
Selectable_text.prototype.remove_class = function (_scope_coll, _classname, _callback) {
    return this.scope.remove_class(_scope_coll, _classname, _callback);
};

/**
 * 取消_classname，並針對_scope加上_classname
 * @param {Scope_collection_param} _scope_coll
 * @param {String} _classname
 */
Selectable_text.prototype.set_class = function (_scope_coll, _classname) {
    return this.scope.set_class(_scope_coll, _classname);
};

// ---------------------------------------
// Selectable_text_paragraph
// ---------------------------------------

/**
 * 建立一個可以選取Word的容器
 * @param {number} _id
 * @type {HTMLElementSpan}
 */
Selectable_text.prototype.create_selectable_paragraph = function (_id) {
    return this.paragraph.create_selectable_paragraph(_id);
};

/**
 * 取得段落的ID
 * @param {number|string|Object} _word
 */
Selectable_text.prototype.get_paragraph_id = function(_word) { 
    return this.paragraph.get_paragraph_id(_word);
};

/**
 * 計算段落的平均字數
 * 
 * 測試用，結果顯示在console端
 */
Selectable_text.prototype.count_paragraph_words_avg = function () {
    return this.paragraph.count_paragraph_words_avg();
};


// --------------------------
// Selectable_text_location
// --------------------------

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
 * @param {Scope_collection_param} _scope_coll
 */
Selectable_text.prototype.get_location_feature = function (_scope_coll) {
    return this.location.get_location_feature(_scope_coll);
};

// -------------------------------------
// Selectable_text_sentence
// -------------------------------------

/**
 * 取得句子位置的索引
 * 
 * 用來分析標註所在句子，跟段落paragraph是不一樣的。
 * @author Pudding Chen 20121228
 * @return {Array}
 */
Selectable_text.prototype.get_sentence_index = function () {
    return this.sententce.get_sentence_index();
};

// -------------------------------------
// Selectable_text_word
// -------------------------------------

/**
 * 取得word_id_prefix
 * @returns {Selectable_text_word.word_id_prefix}
 */
Selectable_text.prototype.get_word_id_prefix = function () {
    return this.word.get_word_id_prefix();
};

/**
 * 讓所有文字都保持在可選取的狀態
 * 
 * @param {function} _callback
 */
Selectable_text.prototype.setup_word_selectable = function (_callback) {
    return this.word.setup_word_selectable(_callback);
};

/**
 * 從ID取得Word
 * @param {number} _id
 * @return {jQuery}
 */
Selectable_text.prototype.get_word_by_index = function(_index) {
    return this.word.get_word_by_index(_index);
};

/**
 * 取得指定ID的word
 * @param {int} _word_id
 * @returns {jQuery}
 */
Selectable_text.prototype.get_word = function (_word_id) {
    return this.text.get_word(_word_id);
};

// -------------------------------------
// Selectable_text_anchor
// -------------------------------------

/**
 * 取得該範圍的文字
 * 
 * @param {Scope_collection_param} _scope_coll
 * @type {String}
 */
Selectable_text.prototype.get_anchor_text = function (_scope_coll) {
    return this.anchor.get_anchor_text(_scope_coll);
};

/**
 * 取得部份的標註範圍文字
 * 
 * @param {Scope_collection_param} _scope_coll 要選取的範圍
 * @param {Number} _max_length 最長字數，預設是50個字。低於這個數字以下不省略
 * @return {String}
 */
Seleactable_text.prototype.get_abbreviated_anchor_text = function (_scope_coll, _max_length) {
    return this.get_abbreviated_anchor_text(_scope_coll, _max_length);
};

// -------------------------------------
// Selectable_text_offset
// -------------------------------------

/**
 * 取得選取範圍的top位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text.prototype.get_offset_top = function (_scope_coll) {
    return this.offset.get_offset_top(_scope_coll);
};

/**
 * 取得選取範圍最底部的位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text.prototype.get_offset_bottom = function (_scope_coll) {
    return this.offset.get_offset_bottom(_scope_coll);
};

/**
 * 取得標註範圍最左邊的位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text.prototype.get_offset_left = function (_scope_coll) {
    return this.offset.get_offset_left(_scope_coll);
};


/**
 * 取得現在標註範圍最右邊的位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text.prototype.get_offset_right = function (_scope_coll) {
    return this.offset.get_offset_right(_scope_coll);
};

/**
 * 取得標註範圍中，第一個範圍的第一個字的左邊位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text.prototype.get_offset_first_left = function (_scope_coll) {
    return this.offset.get_offset_first_left(_scope_coll);
};

/**
 * 取得標註範圍中，最後一個範圍的最後一個字的右邊位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text.prototype.get_offset_last_right = function (_scope_coll) {
    return this.offset.get_offset_last_right(_scope_coll);
};

/* End of file Selectable_text */
/* Location: ./system/application/views/web_apps/Selectable_text.js */