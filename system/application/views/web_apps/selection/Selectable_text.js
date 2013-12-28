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


Selectable_text.prototype.paragraph_id_prefix = 'kals_paragraph_';

/**
 * 段落的classname
 * @type {String}
 */
Selectable_text.prototype.paragraph_classname = 'kals-paragraph';

/**
 * 如果元素標籤在此之中，則會被視為段落
 * @type {Array}
 */
Selectable_text.prototype.paragraph_tag_names = ["h1", "h2", "h3", "h4", "h5", "h6", "div", "p", "ol", 'li', "ul", 'dl', 'dd', 'dt', "table", "code", "blockquote"];

/**
 * 可選取文字的classname
 * @type {String}
 */
Selectable_text.prototype.word_classname = 'kals-word';

/**
 * 可選取文字的ID前置
 * @type {String}
 */
Selectable_text.prototype.word_id_prefix = 'kals_word_';

/**
 * 標點符號的classname
 * @type {String}
 */
Selectable_text.prototype.punctuation_classname = 'kals-punctuation';

/**
 * 分句用的標點符號classname
 * @type {String}
 */
Selectable_text.prototype.sententce_punctuation_classname = 'kals-sentence-punctuation';

/**
 * 分句用索引的classname
 * @type {String}
 */
Selectable_text.prototype.sententce_index_classname = 'kals-sentence-index';

Selectable_text.prototype.selected_classname = 'selected';
Selectable_text.prototype.selected_from_classname = 'from';
Selectable_text.prototype.selected_to_classname = 'to';
Selectable_text.prototype.selected_middle_classname = 'middle';

// --------
// Initialize
// --------

/**
 * 段落記數，初始化時使用。
 * @type {number}
 */
Selectable_text.prototype.paragraph_count = 0;

/**
 * 文字記數，初始化時使用。
 * @type {number}
 */
Selectable_text.prototype.word_count = 0;

Selectable_text.prototype.initialized = false;

/**
 * 將可選取範圍初始化
 * @memberOf {Selection_manager}
 * @param {Object} _selector
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
    _estimate_words_length = this.get_estimate_total(_estimate_words);
    
    KALS_context.progress.set_total(_estimate_words_length);
    
    /*
    this._estimate_words_length = _estimate_words_length;
    */
    //$.test_msg("預測字數", _estimate_words_length);
    
    this.setup_selectable_element(_element, function () {
        
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

/**
 * 將選取範圍設定為可以選取的型態
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
    
    var _para_classname = this.paragraph_classname;
    var _para_tag_names = this.paragraph_tag_names;
    var _punctuation_classname = this.punctuation_classname;
    var _sentence_punctuation_class_name = this.sententce_punctuation_classname;
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
        
            var _check_word_count = _this.word_count;
            
            var _deeper_parse = function () {
                var _node_name = _child_obj.nodeName;
                if (_check_word_count < _this.word_count
                    && typeof(_node_name) === 'string' 
                    && $.inArray(_node_name.toLowerCase(), _para_tag_names) !== -1) {
                    _this.paragraph_count++;
                    _this.paragraph_count++;
                }   
                else if (typeof(_node_name) === 'string'
                    && _node_name.toLowerCase() === 'br') {
                    _this.paragraph_count++;
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
            
            _next_element = _this.create_selectable_paragraph(_this.paragraph_count);
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
                    
                    _t_element = _this.create_selectable_word(_this.paragraph_count, _this.word_count, _t);
                    
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
                    _this.word_count++;
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
 * @param {function} _callback
 */
Selectable_text.prototype.setup_paragraph_location = function(_callback) {
    
    var _word_class_name = this.word_classname;
    var _span_classname = this._span_classname;
    var _word_id_prefix = this.word_id_prefix;
    var _sentence_punctuation_class_name = this.sententce_punctuation_classname;
    var _location_class_names = this.location_classnames;
    
    var _paragraph_class_name = this.paragraph_classname;
    var _paragraph_id_prefix = this.paragraph_id_prefix;
    
    var _first_paragraph = this._text.find('.' + _paragraph_class_name + ':first');
    var _last_paragraph = this._text.find('.' + _paragraph_class_name + ':last');
    
    var _first_paragraph_id = this.get_paragraph_id(_first_paragraph);
    var _last_paragraph_id = this.get_paragraph_id(_last_paragraph);
    
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
        if (_i == _last_paragraph_id + 1 || _i > _last_paragraph_id + 1) {
            _complete();
            return;
        }
        
        //如果找不到下一個段落，則結束迴圈
        if (false == _first_paragraph.exists()) {
            //$.test_msg('_text.setup_paragraph_location()',' Cannot found ' + _i);
           _continue(_i);
           return;
        }
        
        //取得段落頭尾的編號
        var _first_word = _first_paragraph.find('.' + _word_class_name + ':not(.' + _span_classname +'):first');
        var _last_word = _last_paragraph.find('.' + _word_class_name + ':not(.' + _span_classname +'):last');
        
        if (false == _first_word.exists()
            || false == _last_word.exists()) {
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
                    if (_location == 1) {
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


/**
 * 標註相對位置的classname，以及其代號
 * @type {Array} 
 */
Selectable_text.prototype.location_classnames = [
                             //view modal
    'location-head',         //0    0 表示開頭
    'location-foot',         //1    4 表示結尾
    null,                    //2    2 表示同時是接近開頭與結尾
    'location-near-head',    //3    1 表示接近開頭
    'location-near-foot'     //4    3 標示接近結尾
                             //     6 表示同時是開頭與結尾
                             //     5 其他位置
];

/**
 * 取得選取位置的代號。
 * 以下代號會由先而後選擇最先出現的一項
 * 
 * 2010.11.26 不使用了
 * 
 * 0 => head : location-head
 * 1 => foot : location-foot
 * 2 => near head & foot : 此情況並不標示，由get_paragraph_location()去判斷
 * 3 => near head : location-near-head
 * 4 => near foot : location-near-foot
 * 5 => body : 沒有標示
 * 
 * @type {number} 位置代號
 * 
 */
/*
Selectable_text.prototype.get_paragraph_location = function () {
    
    var _selected_classname = this.selected_classname;
    var _location_classnames = this.location_classnames;
    
    var _selected = $('.' + _selected_class_name);
    
    if (_selected.filter('.' + _location_classnames[0]).exists())
        return 0;
    else if (_selected.filter('.' + _location_classnames[1]).exists())
        return 1;
    else if (_selected.filter('.' + _location_classnames[3]).exists()
        && _selected.filter('.' + _location_classnames[4]).exists())
        return 2;
    else if (_selected.filter('.' + _location_classnames[3]).exists())
        return 3;
    else if (_selected.filter('.' + _location_classnames[4]).exists())
        return 4;
    else
        return 5;
};
*/

Selectable_text.prototype.count_paragraph_words_avg = function () {
    
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
        || typeof(_element.className) == 'undefined') {
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
    else if (typeof(_element.nodeValue) != 'undefined' &&
            $.trim(_element.nodeValue) !== '') {
        //2010.10.15 還是保留空格好了
        //return $.trim(_element.nodeValue);
        return _element.nodeValue;
    }
    else {
        return '';
    }
};

/**
 * 建立一個可以選取Word的容器
 * @param {number} _id
 * @type {HTMLElementSpan}
 */
Selectable_text.prototype.create_selectable_paragraph = function (_id) {
    var _ele = document.createElement('span');
    
	_ele.className = this.paragraph_classname 
        + ' ' + this.paragraph_id_prefix + _id;
        
    return _ele;
};

/**
 * 建立一個可選取的文字
 * @param {number} _para_id Paragraph ID
 * @param {number} _point_id Word ID
 * @param {string} _text 內容文字
 * @type {jQuery}
 */
Selectable_text.prototype.create_selectable_word = function(_para_id, _point_id, _text) {
    var _word = document.createElement("span");

    _word.className = this.word_classname
    + ' ' + this.tooltip.trigger_classname;

    var _word_id = this.word_id_prefix + _point_id; 

    _word.id = _word_id;

    var _t_text = document.createTextNode(_text);
    _word.appendChild(_t_text);

    _word = this.setup_word_tooltip(_word);

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
 * 設定Word的Tooltip
 * @param {jQuery|HTMLElement} _word
 * @returns {jQuery}
 */
Selectable_text.prototype.setup_word_tooltip = function (_word) {
    
    var _tooltip_config = this.tooltip.get_tooltip_config();
    
    $(_word).tooltip(_tooltip_config);
    
    return _word;
};

/**
 * 讓所有文字都保持在可選取的狀態
 * @param {function} _callback
 */
Selectable_text.prototype.setup_word_selectable = function (_callback) {
    
    var _select = KALS_text.selection.select;
    
	// 如果是一般模式
    if ($.is_mobile_mode() === false) {
        if (typeof(this.locks.word_click) == 'undefined') {
            var _this = this;
			
			var _words = this._text.find('.'+ this.word_classname + ':not(.' + this._span_classname + ')');
                        
                        
			/*
			var _click_evt = function(_callback) {
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
            };
			_words.click(_click_evt);
			*/
			
			// @20130612 Pudding Chen
			// 加入了拖曳選取時也能用的選取範圍功能
			if (typeof(KALS_SELECT_MOUSEDOWN_LOCK) === "undefined") {
				KALS_SELECT_MOUSEDOWN_LOCK = null;
                                KALS_SELECT_LOCK = false;
			}
                        
                        _words.mouseout(function () {
                            KALS_SELECT_LOCK = false;
                        });
                        
			_words.mousedown(function () {
                            /**
                             * 先做超連結偵測
                             * @author Pulipuli Chen <pulipuli.chen@gmail.com> 
                             */
                            var _md_this = this;
                            var _word = $(_md_this);
                            var _is_link = false;
                            
                            var _link_tag = _word.parents("a[href]:first");
                            if (_link_tag.length == 1) {
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
                                if (_link_tag.hasAttr("target") === false || _link_tag.attr("target") == "") {
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

Selectable_text.prototype._span_classname = 'span';

/**
 * 建立一個不可選取的文字
 * @param {String} _text
 * @type {jQuery}
 */
Selectable_text.prototype.create_span_word = function(_text) {
	var _word = document.createElement("span");
    _word.className = this._span_classname + ' ' + this.word_classname;
	
	var _t_text = document.createTextNode(_text);
	_word.appendChild(_t_text);

	return _word;
};

/**
 * 取得段落的ID
 * @param {number|string|Object} _word
 */
Selectable_text.prototype.get_paragraph_id = function(_word) { 
    
    if ($.is_number(_word)) {
        _word = this.word_id_prefix + _word;
    }
    if ($.is_string(_word)) {
        _word = $('#' + _word);
    }
    if ($.is_object(_word) && false == $.is_jquery(_word)) {
        _word = $(_word);
    }
    
    var _paragraph_class_name = this.paragraph_classname;
    var _paragraph;
    if (false == _word.hasClass(_paragraph_class_name)) {
        _paragraph = _word.parents( '.' + this.paragraph_classname + ':first');
    }
    else {
        _paragraph = _word;
    }
        
    if (false == _paragraph.exists()) {
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
 * 取得word id，但似乎沒有人使用他
 * @param {Object} _word
 * @deprecated
 */
Selectable_text.prototype.get_word_id = function (_word) {
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

Selectable_text.prototype.locks = [];

/**
 * 從ID取得Word
 * @param {number} _id
 * @type {jQuery}
 */
Selectable_text.prototype.get_word_by_index = function(_index) {
    
    var _word_id_prefix = this.word_id_prefix;
    var _word_id = _word_id_prefix + _index;
    var _word = $('#' + _word_id);
    return _word;
};

Selectable_text.prototype.is_word_next_span = function (_word) {
    var _next = _word.next();
    if (_next.length === 0) {
        return false;
    }
    else {
        return _next.hasClass(this._span_classname);
    }
};

Selectable_text.prototype.get_word_next_span = function (_word) {
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
 * 將範圍轉換成jQuery陣列來選取
 * @param {Scope_collection_param} _scope_coll
 * @type {jQuery[][]} 注意，陣列是兩階層喔！
 */
Selectable_text.prototype.get_words_by_scope_coll = function (_scope_coll) {
    
    var _coll = [];
    
    if ($.is_null(_scope_coll)) {
		return _coll;
	}
    
    var _index_array = _scope_coll.get_index_array();
    
    //$.test_msg('Selectable_text.get_words_by_scope_coll()', _index_array);
    
    for (var _i in _index_array) {
        var _ary = [];
        var _index_ary = _index_array[_i];
        for (var _j in _index_ary) {
            var _index = _index_ary[_j];
            var _word = this.get_word_by_index(_index);
            _ary.push(_word);
        }
        _coll.push(_ary);
    }
    
    return _coll;
    
};

// --------
// Selection
// --------

/**
 * 取得推薦的範圍
 * @param {Scope_collection_param} _scope_coll
 * @type {Scope_collection_param}
 */
Selectable_text.prototype.get_recommend_scope_coll = function (_scope_coll) {
    
    if ($.is_null(_scope_coll)) {
		return null;
	}
    
    var _word_id_prefix = this.word_id_prefix;
    var _sentence_punctuation_class_name = this.sententce_punctuation_classname;
    
    var _recommend_scope_coll = new Scope_collection_param();
    var _sentence = 0;
    var _paragraph_id;
    
    
    for (var _i = 0; _i < _scope_coll.length(); _i++) {
        var _s = _scope_coll.get(_i);
        var _from_index = _s.get_from();
        var _from = this.get_word_by_index(_from_index);
        var _to_index = _s.get_to();
        var _to = this.get_word_by_index(_to_index);
        
        //在此做調整
        
        //調整from
        _sentence = 0;
        _paragraph_id = this.get_paragraph_id(_from);
        var _from_id = $.get_prefixed_id(_from.id());
        var _prev_word = $('#' + _word_id_prefix + (_from_id) );
        
        while (_prev_word.exists()
            && this.get_paragraph_id(_prev_word) == _paragraph_id) {
            if (_prev_word.hasClass(_sentence_punctuation_class_name)) {
                if (_sentence === 0) {
                    _sentence++;
                }
                else {
                    break;
                }
            }
            
            _from_id = $.get_prefixed_id(_prev_word);
            _prev_word = $('#' + _word_id_prefix + (_from_id-1) );
        }        
        
        //調整to
        _sentence = 0;
        _paragraph_id = this.get_paragraph_id(_to);
        var _to_id = $.get_prefixed_id(_to.id());
        var _next_word = $('#' + _word_id_prefix + (_to_id) );
        if (_next_word.hasClass(_sentence_punctuation_class_name)) {
			_sentence++;
		}
                    
        while (_next_word.exists()
            && this.get_paragraph_id(_next_word) == _paragraph_id) {
            _to_id = $.get_prefixed_id(_next_word);
            _next_word = $('#' + _word_id_prefix + (_to_id+1) );
            
            if (_next_word.hasClass(_sentence_punctuation_class_name)) {
                if (_sentence === 0) {
					_sentence++;
				}
				else {
					_to_id = $.get_prefixed_id(_next_word);
					break;
				}
            }
        }
        
        //_recommend_scope.push([_from_id, _to_id]);
        _recommend_scope_coll.add(_from_id, _to_id);
    }
    
    return _recommend_scope_coll;
};

/**
 * 對指定範圍加上_classname
 * @param {Scope_collection_param} _scope_coll
 * @param {String} _classname
 */
Selectable_text.prototype.add_class = function(_scope_coll, _classname, _callback) {
    
    var _words = this.get_words_by_scope_coll(_scope_coll);
    
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
			else 
				if (_j == _words[_i].length - 1) {
					_word.addClass(_classname + '_to');
				}
				else {
					_word.addClass(_classname + '_middle');
				}
            
            if (_word.hasClass(_classname + '_to') === false
                && _this.is_word_next_span(_word)) {
                var _span = _this.get_word_next_span(_word); 
                _span.addClass(_classname + '_middle');
                _span.addClass(_classname);
                //$.test_msg('text.add_class()', [_span.length, _span.css('')]);
            }
            
            if (_words[_i].length == 1) {
				_word.addClass(_classname + '_to');
			}    
        }
    };
    
    var _loop_i = function (_i) {
        if (_i < _words.length) {
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
Selectable_text.prototype._filter_classname = function (_classname) {
    var _classnames;
    if ($.is_array(_classname)) {
		_classnames = _classname;
	}
	else 
		if (_classname.indexOf(' ') > -1) {
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
Selectable_text.prototype.remove_class = function (_scope_coll, _classname, _callback) {
    
    if ($.is_string(_scope_coll) && $.is_null(_classname)) {
        _classname = _scope_coll;
        _scope_coll = null;
    }
    
    var _classnames = this._filter_classname(_classname);
    
    if ($.isset(_scope_coll)) {
        var _words = this.get_words_by_scope_coll(_scope_coll);
        for (var _i in _words) {
            for (var _j in _words[_i]) {
                var _word = _words[_i][_j];
                for (var _c in _classnames) {
                    _classname = _classnames[_c];
                    
                    if (_word.hasClass(_classname + '_to') === false
                        && this.is_word_next_span(_word)) {
                        var _span = this.get_word_next_span(_word);
                        _span.removeClass(_classname + '_middle');
                        _span.removeClass(_classname);
                    }
                    
                    if (_j === 0) {
						_word.removeClass(_classname + '_from');
					}
					else 
						if (_j == _words[_i].length - 1) {
							_word.removeClass(_classname + '_to');
						}
						else {
							_word.removeClass(_classname + '_middle');
						}
                        
                    
                    _word.removeClass(_classname);
                    
                }
            }
        }
        /*
        var _remove_class = function (_i, _j) {
            var _word = _words[_i][_j];
            for (var _c in _classnames) {
                _classname = _classnames[_c];
                
                _word.removeClass(_classname);
                
                if (_j === 0)
                    _word.removeClass(_classname + '_from');
                else if (_j == _words[_i].length - 1)
                    _word.removeClass(_classname + '_to');
                else
                    _word.removeClass(_classname + '_middle');
            }
        };
        
        var _loop_j = function (_i, _j) {
            if (_j < _words[_i].length) {
                for (var _k = _j; _k < _j+5 && _k < _words[_i].length; _k++) {
                    _remove_class(_i, _k);    
                }
                _j = _k - 1;
                
                setTimeout(function () {
                    _j++;
                    _loop_j(_i, _j);
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
                _loop_j(_i, 0);
            }
            else {
                $.trigger_callback(_callback);
            }
        };
        
        _loop_i(0);
        */
    }
    else {
        
        for (_j in _classnames) {
            _classname = _classnames[_j];
            //要記得是限定在選取範圍喔！
            $('.' + this.word_classname + '.' + _classname)
                .removeClass(_classname)
                .removeClass(_classname + '_from')
                .removeClass(_classname + '_to')
                .removeClass(_classname + '_middle');
        }
        
        /*
        var _words = $('.' + this.word_classname + '.' + _classname);
        
        var _remove_class = function (_word) {
            for (var _j in _classnames) {
                _classname = _classnames[_j];
                //要記得是限定在選取範圍喔！
                _word.removeClass(_classname + '_from')
                    .removeClass(_classname + '_to')
                    .removeClass(_classname + '_middle')
                    .removeClass(_classname);
            }
        };
        
        var _loop = function (_i) {
            if (_i < _words.length) {
                for (_i; _i < _i+5 && _i < _words.length; _i++) {
                    var _word = _words.eq(_i);
                    _remove_class(_word);    
                }
                
                setTimeout(function () {
                    //_i++;
                    _loop(_i);
                }, 1);
            }
            else {
                $.trigger_callback(_callback);
            }
        }; 
        
        _loop(0);
        */
    }
    
};

/**
 * 取消_classname，並針對_scope加上_classname
 * @param {Scope_collection_param} _scope_coll
 * @param {String} _classname
 */
Selectable_text.prototype.set_class = function (_scope_coll, _classname) {
    this.remove_class(_classname);
    return this.add_class(_scope, _classname);
};

/**
 * 取得該範圍的文字
 * @param {Scope_collection_param} _scope_coll
 * @type {String}
 */
Selectable_text.prototype.get_anchor_text = function (_scope_coll) {
    
    if ($.is_null(_scope_coll)) {
		return null;
	}
    
    var _anchor_text = '';
    
    for (var _i = 0; _i < _scope_coll.length(); _i++) {
        var _sentence = '';
        
        var _scope = _scope_coll.get(_i);
        var _from = _scope.get_from();
        var _to = _scope.get_to();
        
        for (var _j = _from; _j < _to + 1; _j++) {
            var _index = _j;
            var _word = this.get_word_by_index(_index);
            var _text = _word.text();
			
            _sentence = _sentence + _text;
            
            if (_j < _to
                && this.is_word_next_span(_word)) {
                _sentence = _sentence + ' ';
            }
        }
        
        _sentence = $.trim(_sentence);
        
        //不同範圍之間，以空格斷句！
        if (_i > 0) {
			_anchor_text = _anchor_text + ' ';
		}
           
        _anchor_text = _anchor_text + _sentence;
    }
    
    _anchor_text = $.trim(_anchor_text);
    
	//把' "轉換掉
	//_anchor_text = $.str_replace("'", " ", _anchor_text);
	//_text= $.str_replace("'", "&amp;", _text);
	
    return _anchor_text;
};

/**
 * 取得該範圍的文字
 * @param {Scope_collection_param} _scope_coll
 * @param {Scope_collection_param} _focus_coll
 */
Selectable_text.prototype.get_display_anchor_text = function (_scope_coll, _focus_coll) {
    
    if ($.is_null(_scope_coll)) {
		return null;
	}
    
    var _anchor_text = $('<span></span>');
    
    var _focus_index = [];
    var _focus_head_index = [];
    var _focus_foot_index = [];
    if ($.is_class(_focus_coll, 'Scope_collection_param')) {
        _focus_index = _focus_coll.get_index_array();
        _focus_head_index = _focus_coll.get_from_index_array();
        _focus_foot_index = _focus_coll.get_to_index_array();
    }
    
    var _focus_text = function (_index, _text) {
        if ($.inArray(_index, _focus_head_index) > -1) {
			_text = '<span class="select select_from view">' + _text + '</span>';
		}
		else if ($.inArray(_index, _focus_foot_index) > -1) {
			_text = '<span class="select select_to view">' + _text + '</span>';
		}
		else {
			_text = '<span class="select select_middle view">' + _text + '</span>';
		}
        return _text;
    };
	
	var _focus_single_text = function (_index, _text) {
        if ($.inArray(_index, _focus_head_index) > -1) {
			_text = '<span class="select select_from select_to view">' + _text + '</span>';
		}
        return _text;
    };
        
    var _ellipsis = '<span class="ellipsis">...</span>';
    var _last_id = this.word_count;
    for (var _i = 0; _i < _scope_coll.length(); _i++) {
        var _sentence = '';
        
        var _scope = _scope_coll.get(_i);
        var _from = _scope.get_from();
        var _to = _scope.get_to();
        
        for (var _j = _from; _j < _to + 1; _j++) {
            var _index = _j;
            var _word = this.get_word_by_index(_index);
            var _text = _word.text();
            
            if (_j < _to
                && this.is_word_next_span(_word)) {
                _text = _text + ' ';
            }
            else if ($.is_ascii(_text.substr(_text.length-1, 1))) {
                _text = _text + ' ';
            }
            
			
            for (var _k in _focus_index) {
                if ($.inArray(_j, _focus_index[_k]) > -1) {
					if (_focus_index.length > 1) {
						_text = _focus_text(_j, _text);
					}
					else {
						_text = _focus_single_text(_j, _text);
					}
                }    
            }
            
            _sentence = _sentence + _text; 
        }
        
        _sentence = $.trim(_sentence);
        
        //不同範圍之間，以空格斷句！
        if (_from > 0) {
			_sentence = _ellipsis + _sentence;
		}
        if (_i == _scope_coll.length() - 1 && _to < _last_id) {
			_sentence = _sentence + _ellipsis;
		}
           
        var _sentence_span = $('<span></span>')
            .html(_sentence)
            .appendTo(_anchor_text);
    }
    
    return _anchor_text;
};

/**
 * 
 * @param {String} _classname
 * @type {Scope_collection_param}
 */
Selectable_text.prototype.retrieve_scope_coll = function (_classname) {
    
    var _word_classname = this.word_classname;
    
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
            if ((_id - _from) == 1) {
                _to = _id;
            }
            else if (_to !== null && (_id - _to) == 1) {
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

// --------
// Offset
// --------

/**
 * 取得選取範圍的top位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text.prototype.get_offset_top = function (_scope_coll) {
    
    var _offset = null;
    if ($.is_null(_scope_coll)) {
		return _offset;
	}
    
    var _index = _scope_coll.get_first_index();
    if ($.isset(_index)) {
        var _word = this.get_word_by_index(_index);
        _offset = _word.offset().top;
    }
    
    return _offset;
};

/**
 * 取得選取範圍最底部的位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text.prototype.get_offset_bottom = function (_scope_coll) {
    var _offset = null;
    if ($.is_null(_scope_coll)) {
		return _offset;
	}
    
    var _index = _scope_coll.get_last_index();
    if ($.isset(_index)) {
        var _word = this.get_word_by_index(_index);
        _offset = _word.offset().top + _word.height();
    }
    
    return _offset;
};

/**
 * 取得標註範圍最左邊的位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text.prototype.get_offset_left = function (_scope_coll) {
    var _offset = null;
    
    var _words = this.get_words_by_scope_coll(_scope_coll);
    for (var _i in _words) {
        for (var _j in _words[_i]) {
            var _word = _words[_i][_j];
            
            var _o = _word.offset().left;
            
            if (_offset === null ||
			_o < _offset) {
				_offset = _o;
			}
        }
    }
    
    return _offset;
};

/**
 * 取得現在標註範圍最右邊的位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text.prototype.get_offset_right = function (_scope_coll) {
    var _offset = null;
    
    var _words = this.get_words_by_scope_coll(_scope_coll);
    for (var _i in _words) {
        for (var _j in _words[_i]) {
            var _word = _words[_i][_j];
            
            var _o = _word.offset().left + _word.width();
            
            if (_offset === null ||
			_o > _offset) {
				_offset = _o;
			}
        }
    }
    
    return _offset;
};

/**
 * 取得標註範圍中，第一個範圍的第一個字的左邊位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text.prototype.get_offset_first_left = function (_scope_coll) {
    var _offset = null;
    
    var _index = _scope_coll.get_first_index();
    
    if ($.is_number(_index)) {
        var _word = this.get_word_by_index(_index);
        _offset = _word.offset().left;
    }
    
    return _offset;
};

/**
 * 取得標註範圍中，最後一個範圍的最後一個字的右邊位置
 * @param {Scope_collection_param} _scope_coll
 * @type {int}
 */
Selectable_text.prototype.get_offset_last_right = function (_scope_coll) {
    var _offset = null;
    
    var _index = _scope_coll.get_last_index();
    
    if ($.is_number(_index)) {
        var _word = this.get_word_by_index(_index);
        _offset = _word.offset().left + _word.width();
    }
    
    return _offset;
};

// --------
// Data mining
// --------

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
 * @param {Object} _scope_coll
 */
Selectable_text.prototype.get_location_feature = function (_scope_coll) {
    
    /*
    var _classnames = this.location_classnames;
    var _words = this.get_words_by_scope_coll(_scope_coll);
    
    var _location = 5;
    var _location_id = 5;
    
    for (var _i in _words) {
        for (var _j in _words[_i]) {
            var _word = _words[_i][_j];
            
            var _l = 5;
            var _id = 5;    //modal端的代號
            
            if (_word.hasClass(_classnames[0])) {
                _l = 0;
                _id = 0;
                return 0;
            }
            else if (_word.hasClass(_classnames[1])) {
                _l = 1;
                _id = 4;
            }
            else if (_location > 2
                && _word.hasClass(_classnames[3])
                && _word.hasClass(_classnames[4])) {
                _l = 2;
                _id = 2;
            }
            else if (_location > 3
                && _word.hasClass(_classnames[3])) {
                _l = 3;
                _id = 1;
            }
            else if (_location > 4
                && _word.hasClass(_classnames[4])) {
                _l = 4;
                _id = 3;
            }
            else {
                //5的話就不用判斷啦，直接看下一個迴圈
                continue;
            }
            
            //更新_location
            if (_l < _location) {
                _location = _l;
                _location_id = _id;
            }
        }
    }
    
    return _location_id;
    
    */
	
    var _classnames = this.location_classnames;
    var _words = this.get_words_by_scope_coll(_scope_coll);
    
    var _location_id_ary = [];
    
    var _push_location = function (_id) {
        if ($.inArray(_id, _location_id_ary) == -1) {
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
 * 取得句子位置的索引
 * 
 * 用來分析標註所在句子，跟段落paragraph是不一樣的。
 * @author Pudding Chen 20121228
 * @return {Array}
 */
Selectable_text.prototype.get_sentence_index = function () {
	
	//如果已經作過這樣的分析的話
	if (this._text.find('.'+this.sententce_index_classname).length > 0)
	{
		var _sentences = this._text.find('.'+this.sententce_index_classname);
		var _sentence_index = [];
		for (var _i = 0; _i < _sentences.length; _i++)
		{
			var _sentence = _sentences.eq(_i);
			var _word_id = _sentence.attr('id');
			_word_id = _word_id.substr(this.word_id_prefix.length, _word_id);
			_word_id = parseInt(_word_id,10);
			_sentence_index.push(_word_id);
		}
		
		return _sentence_index;
	}
	
	//先來看被視為分句的標點符號位置
	_sentence_index = [0];
	var _sentence_punctuation =  $('.'+this.sententce_punctuation_classname);
	
	for (var _s = 0; _s < _sentence_punctuation.length; _s++)
	{
		var _id = _sentence_punctuation.eq(_s).attr('id');
		//kals_word_953
		//_id = _id.substring(10, _id.length);
		_id = $.get_prefixed_id(_id);
		_sentence_index.push(parseInt(_id,10));	
	}
	
	//再來看段落的最後一個字
	var _last_word = this._text.find('.'+this.word_classname+':last');
	var _last_paragraph = _last_word.parents("."+this.paragraph_classname+":first");
	
	//var _last_paragraph_classname = _last_paragraph.attr('className');
	//var _paragraph_classname_header = this.paragraph_classname + ' ' + this.paragraph_id_prefix;  
	//var _last_pid = _last_paragraph_classname.substring(_paragraph_classname_header.length , _last_paragraph_classname.length);
	//_last_pid = parseInt(_last_pid);
	var _last_pid = $.get_class_prefixed_id(_last_paragraph, this.paragraph_id_prefix);
	
	for (_i = 0; _i < _last_pid+1; _i++)
	{
		var _paragraph = $('.' + this.paragraph_id_prefix + _i + ":last");
		
		if (_paragraph.length == 1) 
		{
			_last_word = _paragraph.find('.'+this.word_classname+'.tooltip-trigger:last:not(.'+this.sententce_punctuation_classname+')');
			
			if (_last_word.length > 0) {
				_id = _last_word.attr('id');
				
				//_id = _id.substring(this.word_id_prefix.length, _id.length);
				_id = $.get_prefixed_id(_id);
				_sentence_index.push(parseInt(_id,10));
				
				if (isNaN(_id))
				{
					_last_word.css('color', 'blue')
						.attr('title', _id);
				}
			}
		}
	}
	
	//檢查測試結果用
	for (_i = 0; _i < _sentence_index.length; _i++) {
		
		var _sentense_index_word = $('#' + this.word_id_prefix + _sentence_index[_i]);
		_sentense_index_word.addClass(this.sententce_index_classname);
		
		//檢測找到的字是否真的是分句點，平時不使用應關掉
		//_sentense_index_word.css("color", "red");
		//alert([$('#kals_word_' + _i).length, _i]);
	}
	
	//排序
	//_sentence_index.sort(function (_a, _b) {
	//	return (_a - _b);
	//});
	
	return _sentence_index;
};

/**
 * 估算大概會多少字
 * @param {String} _text
 * @returns {Number}
 */
Selectable_text.prototype.get_estimate_total = function (_text) {
    
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

/* End of file Selectable_text */
/* Location: ./system/application/views/web_apps/Selectable_text.js */