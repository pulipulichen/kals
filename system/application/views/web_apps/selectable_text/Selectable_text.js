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
    this.child('tooltip', new Select_tooltip(this));
    
    if ($.isset(_selector)) {
        this.set_text(_selector);
    }
    
    // Selectable_text_component
    this.child('word', new Selectable_element_word(this));
    this.child('spot', new Selectable_text_spot(this));
    
    this.child('offset', new Selectable_text_offset(this));
    this.child('scope', new Selectable_text_scope(this));
    this.child('anchor', new Selectable_text_anchor(this));
    this.child('sentence', new Selectable_text_sentence(this));
    this.child('paragraph', new Selectable_text_paragraph(this));
    this.child('location', new Selectable_text_location(this));
    this.child('chapter', new Selectable_text_chapter(this));
    this.child('cache', new Webpage_cache());
    
}

// Extend from KALS_user_interface
Selectable_text.prototype = new KALS_user_interface();

/**
 * 可選取的範圍
 * @type {jQuery};
 */
Selectable_text.prototype._text = null;

/**
 * 暫存的可選取的範圍
 * @type {jQuery};
 */
Selectable_text.prototype._cache_text = null;

/**
 * @type {Select_tooltip}
 */
Selectable_text.prototype.tooltip = null;

// -------------------------
// Selectable_text_component
// -------------------------

/**
 * @type {Selectable_element_word}
 */
Selectable_text.prototype.word;

/**
 * @type {Selectable_text_spot}
 * @author Pudding 201151111
 */
Selectable_text.prototype.spot;

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
 * 段落
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

/**
 * 快取機制
 * @type Webpage_cache
 */
Selectable_text.prototype.cache;

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
    //this._cache_text = this._text.clone();
    //var _element = this._cache_text;
    
    
    // ---------
    // 開始作初始化
    // ---------
    var _this = this;
    
    /**
     * 加入預測進度的功能
     * @author Pulipuli Chen 20131227 
     */
    this._predict_progress_total(_element);
            
    /*
    this._estimate_words_length = _estimate_words_length;
    */
    //$.test_msg("預測字數", _estimate_words_length);
    
    // ----------------------------------------------
    // 舊式的寫法
    // 不建議用這麼多層來依序執行任務，讀起來很差
    
//    this.setup_selectable_element(_element, function () {
//        
//        // 全部處理完了
//        _this.sentence.add_structure();
//        _this.paragraph.add_structure();
//        _this.chapter.add_structure();
//        
//        // 全部處理完了
//        //$.test_msg("paragraph feature", _this.paragraph_feature);
//        $.test_msg("sentence structure", _this.sentence.get_structure());
//        $.test_msg("paragraph structure", _this.paragraph.get_structure());
//        $.test_msg("chapter structure", _this.chapter.get_structure());
//        
//        KALS_context.progress.set_finished();
//        
//        // ---------
//        // 開始標示段落位置
//        // ---------
//        _this.setup_paragraph_location(function () {
//            
//            // --------
//            // 讓文字變成可選取
//            // --------
//            _this.setup_word_selectable(function () {
//                
//                KALS_context.init_profile.add_listener(function () {
//                    _this.initialized = true;    
//                });
//                
//                //2010.11.22 為了計算字數而使用，正式時不用
//                //_this.count_paragraph_words_avg();
//                
//                //$.test_msg('Selectable_text.initialize() complete', _callback);
//                
//                $.trigger_callback(_callback);    
//            });
//        });        
//    });    
    
    
    // ------------------------------------
    
    // 是否啟用快取
    //var _cache_enable = KALS_CONFIG.selectable_text_cache;
    var _cache_enable = this.cache.enable_cache;
    //_cache_enable = false;
    
    var _task_clone_text = function (_callback) {
        //$.test_msg("Selectacble_text _task_cache_text_backup");
        
        //_this._text.empty()
        //        .append(_this._cache_text.contents());
        
        _this._fake_text = _this._text.clone();
        _this._text.after(_this._fake_text);
        _this._cache_text = $("<div></div>").append(_this._text);
        /*
        _this._text.after(_this._cache_text);
        _this._text.remove();
        _this._text = _this._cache_text;
        */
        $.trigger_callback(_callback);
    };
    
    var _task_setup_selectable_element = function (_callback) {
        //$.test_msg("Selectacble_text _task_setup_selectable_element");
        return _this.setup_selectable_element(_element, _callback);
    };
    
    var _task_restore_clone_text = function (_callback) {
        //$.test_msg("Selectacble_text _task_cache_text_restore");
        
        //_this._text.empty()
        //        .append(_this._cache_text.contents());
        /*
        _this._text.after(_this._cache_text);
        _this._text.remove();
        _this._text = _this._cache_text;
        */
       
        _this._fake_text.after(_this._text);
        _this._fake_text.remove();
        _this._cache_text.remove();
        
        $.trigger_callback(_callback);
    };
    
    var _task_setup_paragraph_location = function (_callback) {
        //$.test_msg("Selectacble_text _task_location");
        
        // ---------
        // 開始標示段落位置
        // ---------
        _this.setup_paragraph_location(_callback);
    };
    
    var _task_progress = function (_callback) {
        //$.test_msg("Selectacble_text _task_progress");
        
        // 全部處理完了
        _this.sentence.add_structure();
        _this.paragraph.add_structure();
        _this.chapter.add_ending_structure();
        
        // 全部處理完了
        //$.test_msg("paragraph feature", _this.paragraph_feature);
        //$.test_msg("sentence structure", _this.sentence.get_structure());
        //$.test_msg("paragraph structure", _this.paragraph.get_structure());
        //$.test_msg("chapter structure", _this.chapter.get_structure());
        
        KALS_context.progress.set_finished();
        
        $.trigger_callback(_callback);
    };
    
    var _task_cache_save = function (_callback) {
        //$.test_msg("Selectacble_text _task_cache_save");
        
        // 20140223 Pulipuli Chen
        // 儲存快取
        _this.cache_save(function () {
            $.trigger_callback(_callback);
        });
        return;
    };
    
    var _task_cache_restore = function (_callback) {
        //$.test_msg("Selectacble_text _task_cache_restore");
        
        // 20140223 Pulipuli Chen
        // 恢復快取
        if (_cache_enable) {
            _this.cache_restore(function () {
                $.trigger_callback(_callback);
            });
        }
        
        return;
    };
    
    var _task_setup_word_selectable = function (_callback) {
        //$.test_msg("Selectacble_text _task_setup_word_selectable");
        return _this.setup_word_selectable(_callback);
    };
    
    /**
     * @author Pudding 20151111
     */
    var _task_setup_word_spot_selectable = function (_callback) {
        return _this.spot.setup_word_spot_selectable(_callback);
    };
    
    var _task_complete = function (_callback) {
        //$.test_msg("Selectacble_text _task_complete");
        KALS_context.init_profile.add_listener(function () {
            _this.initialized = true;    
        });

        //2010.11.22 為了計算字數而使用，正式時不用
        //_this.count_paragraph_words_avg();

        //$.test_msg('Selectable_text.initialize() complete', _callback);

        $.trigger_callback(_callback);
    };
    
    // -----------------------------
    
    var _task_list;
    
    var _loop = function (_task_list, _i, _callback) {
        //$.test_msg('loop ' + _i , _task_list.length);
        if (_i === _task_list.length || _i > _task_list.length) {
            return $.trigger_callback();
        }
        else {
            _task_list[_i](function () {
                _i++;
                _loop(_task_list, _i, _callback);
            });
        }
    };
    
    //_cache_enable = false;
    
//    if ($.is_mobile_mode()) {
//        _task_list = [
//            _task_progress,
//            _task_complete,
//            _callback
//        ];
//        _loop(_task_list, 0);
//    }
//    else if (_cache_enable) {

    _task_list = [];

    if (_cache_enable === true) {
        //$.test_msg('啟用快取功能');
        this.has_cache(function (_existed) {
            //_existed = false;
            if (_existed) {
                //$.test_msg('取得快取，開始還原文件');
                _task_list.push(_task_cache_restore);
            }
            else {
                //$.test_msg('製作快取，開始初始化文件');
                _task_list.push(_task_clone_text);
                _task_list.push(_task_setup_selectable_element);
                _task_list.push(_task_setup_paragraph_location);
                _task_list.push(_task_restore_clone_text);
                _task_list.push(_task_cache_save);
            }
            
            _task_list.push(_task_setup_word_selectable);
            _task_list.push(_task_setup_word_spot_selectable);
            _task_list.push(_task_progress);
            _task_list.push(_task_complete);
            _task_list.push(_callback);
    
            _loop(_task_list, 0);
        });
    }
    else {
        //$.test_msg('開始初始化文件');
        _task_list.push(_task_clone_text);
        _task_list.push(_task_setup_selectable_element);
        _task_list.push(_task_setup_paragraph_location);
        _task_list.push(_task_restore_clone_text);
        
        _task_list.push(_task_setup_word_selectable);
        _task_list.push(_task_setup_word_spot_selectable);
        _task_list.push(_task_progress);
        _task_list.push(_task_complete);
        _task_list.push(_callback);

        _loop(_task_list, 0);
    }
    
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
 * 移除節點
 * @param {jQuery} _element
 * @returns {Selectable_text.prototype}
 */
Selectable_text.prototype._filter_empty_node = function (_element) {
    
    var _empty_span = _element.find("span._");
    
    if (_empty_span.length === 0) {
        return this;
    }
    
    _empty_span = _empty_span.filter(function () {
        return ($(this).text() === "");
    });
    
    //$.test_msg("找到的空標籤", _empty_span.length);
    
    _empty_span.remove();
    
    return this;
};

/**
 * 結合文字節點
 * @param {jQuery} _element
 * @returns {Selectable_text.prototype}
 */
Selectable_text.prototype._merge_child_text_node = function (_element) {
    
    var _contents = _element.contents();
    
    //$.test_msg("節點數量：", _contents.length);
    for (var _i = 0; _i < _contents.length; _i++) {
        var _node = _contents[_i];
        
        if (_node.nodeName === "#text"
              && _i < _contents.length-1) {
            //var _next_node = _contents[(_i+1)];
            while (_i < _contents.length-1 
                    && _contents[(_i+1)].nodeName === "#text") {
                var _next_node = _contents[(_i+1)];
                var _next_text = _next_node.nodeValue;
                _node.nodeValue = _node.nodeValue + _next_text;
                $(_next_node).remove();
                _i++;
            }
        }
    }
    return this;
};

/**
 * 將選取範圍設定為可以選取的型態
 * 
 * 這是最重要的一個函式，KALS如何認識文本就靠這隻函式
 * @param {jQuery} _element 指範圍scope的元素
 * @param {function} _callback
 */
Selectable_text.prototype.setup_selectable_element = function (_element, _callback) {
    
    this._filter_empty_node(_element);
    this._merge_child_text_node(_element);
    
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
    
    var _chapter_tag_names = this.chapter.chapter_tag_names;
    var _selectable_text_chapter = this.chapter;
    
    var _this = this;
    
    var _batch_excute = this.excute_interval.batch_excute;
    var _wait = this.excute_interval.wait;
    
    /**
     * 用來儲存任務的變數
     * @type Array
     */
    //this._task_stack = [];
    
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
            return _this._setup_selectable_element_loop_complete(_cb);
        }
        
        /**
         * _child_obj
         * @type {jQuery}
         */
        var _child_obj = _child_nodes.item(_i);
        //$.test_msg("_child_obj", _child_obj.nodeName);
        
        if (_this.is_element_has_class(_child_obj, _para_classname)) {
            _i++;
            _loop(_i, _child_nodes, _cb);
            return;
        }   //if (_this.element_has_class(_child_obj, _para_classname)) {
	
        else if (_child_obj.nodeName !== '#text' &&
            _this.is_element_has_class(_child_obj, _para_classname) === false) {
            
            var _check_word_count = _selectable_text_word.count;
            
            var _next_loop = function () {
                	
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
            
            var _deeper_parse = function () {
                var _node_name = _child_obj.nodeName;
                if (_check_word_count < _selectable_text_word.count
                    && typeof(_node_name) === 'string' 
                    && $.inArray(_node_name.toLowerCase(), _para_tag_names) !== -1) {
                    
                    //$.test_msg("是章節", _node_name);
                    _selectable_text_paragraph.setup_paragraph_node(_child_obj);
        
                    // 20140102 Pulipuli Chen
                    // 增加句子的計算數量
                    _selectable_text_sentence.add_structure_last_word();
                    
                    // 20140103 Pulipuli Chen
                    // 是章節嗎？
                    if ($.inArray(_node_name.toLowerCase(), _chapter_tag_names) !== -1) {
                        _selectable_text_chapter.add_structure(_child_obj);
                    }
                }
                else if (typeof(_node_name) === 'string') {
                    _node_name = _node_name.toLowerCase();
                    //$.test_msg("_node_name", _node_name);
                    if (_node_name === 'br') {
                        _selectable_text_paragraph.paragraph_count++;

                        //$.test_msg("deeper parse 2", _selectable_text_word.word_count);
                        //_selectable_text_paragraph.paragraph_structure.push(_selectable_text_word.word_count);
                        _selectable_text_paragraph.add_structure();

                        // 20140102 Pulipuli Chen
                        // 增加句子的計算數量
                        _selectable_text_sentence.add_structure_last_word();
                    }
                    else if (_node_name === "img") {
                        $(_child_obj).css("border", "1px solid red");
                    }
                }
		
                _next_loop();
            };  // var _deeper_parse = function () {
            
            if (_this.spot.is_spot(_child_obj)) {
                var _next_element = _this._setup_selectable_element_clone_next_element(_child_obj, false);
                //$(_next_element).css("border", "3px solid red");
                //$.test_msg("找到");
                _this._setup_selectable_element_insert_action(_child_obj, _next_element);
                _next_loop();
            }
            else {
                _this.setup_selectable_element($(_child_obj), _deeper_parse);
            }
            return;
        }   //if (_child_obj.nodeName !== '#text' &&
        else {
            var _text = _this.get_element_content(_child_obj);

            // 將初始化next_element的動作往外移
            var _next_element = _this._setup_selectable_element_init_next_element(_text, _child_obj);
            _this._setup_selectable_element_insert_action(_child_obj, _next_element);
            
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

/**
 * 初始化next_element，只用於setup_selectable_element
 * @param {String} _text
 * @param {jQuery} _child_obj
 * @returns {HTMLNode}
 */
Selectable_text.prototype._setup_selectable_element_init_next_element = function (_text, _child_obj) {
    return this.paragraph._setup_selectable_element_init_next_element(_text, _child_obj);
};

Selectable_text.prototype._setup_selectable_element_clone_next_element = function (_child_obj, _is_word) {
    return this.paragraph._setup_selectable_element_clone_next_element(_child_obj, _is_word);
};

/**
 * 新增任務
 * @param {HTMLNode} _child_obj
 * @param {HTMLNode} _next_element
 */
Selectable_text.prototype._setup_selectable_element_insert_action = function (_child_obj, _next_element) {
    var _insert_action = function () {
        _child_obj.parentNode.insertBefore(_next_element, _child_obj);
        $(_next_element).css("display", "inline");
        $(_child_obj).remove();
    };
    this._task_stack.push(_insert_action);
    
    return this;
};

/**
 * setup_selectable_element loop完成之後做的事情
 * @param {function} _callback
 */
Selectable_text.prototype._setup_selectable_element_loop_complete = function (_callback) {
    //$.test_msg('Selectable_text.setup_selectable_element() cb', _cb);

    // 把剩餘的任務執行完
    //if (_task_stack.length > 00) {
        //$.test_msg("剩餘的任務？", _task_stack.length);
        //for (var _t = 0; _t < _task_stack.length; _t++) {
        for (var _t in this._task_stack) {
            //if ($.is_function(_task_stack[_t])) {
                this._task_stack[_t]();
            //}
        }
        this._task_stack = [];
    //}


    if ($.is_function(_callback)) {
        _callback();
    }
};

/**
 * 給setup_selectable_element作為儲存任務使用的
 * @type Array
 */
Selectable_text.prototype._task_stack = [];

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
    return this.location.setup_paragraph_location(_callback);
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
Selectable_text.prototype.is_element_has_class = function (_element, _class_name) {
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
    if (_element === undefined 
            || $.is_object(_element) === false) {
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

/**
 * 將範圍轉換成jQuery陣列來選取
 * @param {Scope_collection_param} _scope_coll
 * @type {jQuery[][]} 注意，陣列是兩階層喔！
 */
Selectable_text.prototype.get_words_by_scope_coll = function (_scope_coll) {
    return this.scope.get_words_by_scope_coll(_scope_coll);
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
// Selectable_element_word
// -------------------------------------

/**
 * 取得word_id_prefix
 * @returns {Selectable_element_word.word_id_prefix}
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
    return this.word.get_word(_word_id);
};

/**
 * 取得word id，但似乎沒有人使用他
 * @param {jQuery} _word
 */
Selectable_text.prototype.get_word_id = function (_word) {
    return this.word.get_word_id(_word);
};

/**
 * 如果下一個字是英文的話
 * 
 * @param {jQuery} _word
 * @returns {Boolean}
 */
Selectable_text.prototype.is_word_next_english = function (_word) {
    return this.word.is_word_next_english(_word);
};

/**
 * 如果下一個字是空格的話
 * @param {jQuery} _word
 * @returns {Boolean}
 */
Selectable_text.prototype.is_word_next_span = function (_word) {
    return this.word.is_word_next_span(_word);
};

/**
 * 取得下一個span
 * @param {jQuery} _word
 * @returns {jQuery|null}
 */
Selectable_text.prototype.get_word_next_span = function (_word) {
    return this.word.get_word_next_span(_word);
};

/**
 * 建立一個不可選取的文字
 * 
 * @param {String} _text
 * @type {jQuery}
 */
Selectable_text.prototype.create_span_word = function(_text) {
    return this.word.create_span_word(_text);
};

/**
 * 建立一個可選取的文字
 * @param {number} _para_id Paragraph ID
 * @param {number} _point_id Word ID
 * @param {string} _text 內容文字
 * @type {jQuery}
 */
Selectable_text.prototype.create_selectable_word = function(_para_id, _point_id, _text) {
    return this.word.create_selectable_word(_para_id, _point_id, _text);
};

/**
 * 設定Word的Tooltip
 * @param {jQuery|HTMLElement} _word
 * @returns {jQuery}
 */
Selectable_text.prototype.setup_word_tooltip = function (_word) {
    return this.word.setup_word_tooltip(_word);
};

/**
 * 估算大概會多少字
 * @param {String} _text
 * @returns {Number}
 */
Selectable_text.prototype.get_estimate_total_words = function (_text) {
    return this.word.get_estimate_total_words(_text);
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
Selectable_text.prototype.get_abbreviated_anchor_text = function (_scope_coll, _max_length) {
    return this.anchor.get_abbreviated_anchor_text(_scope_coll, _max_length);
};

/**
 * 取得該範圍的文字
 * @param {Scope_collection_param} _scope_coll
 * @param {Scope_collection_param} _focus_coll
 */
Selectable_text.prototype.get_display_anchor_text = function (_scope_coll, _focus_coll) {
    return this.anchor.get_display_anchor_text(_scope_coll, _focus_coll);
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

/**
 * 快取ID
 * @type String
 */
Selectable_text.prototype._cache_id = 'selectable_text';

/**
 * 儲存到快取中
 * 
 * @version 20140517 Pulipuli Chen
 *  取代了原本使用storage來儲存的作法
 *  改用Webpage_cache的方式從伺服器儲存快取
 * @param {funciton} _callback
 * @returns {Selectable_text}
 */
Selectable_text.prototype.cache_save = function (_callback) {
    
    var _cache_id = this._cache_id;
    
    //var _text_html = this._text.html();
    var _text_html = this._text.html();
    
    // 測試看看是不是因為字串太長的原因
    //_text_html = _text_html.substr(0, 1000);
    //$.test_msg('cache_save ' + _cache_id, _text_html);
    
    var _this = this;
//    KALS_context.storage.set(_cache_id, _text_html, function () {
//        _this.word.cache_save(_cache_id, function () {
//            _this.sentence.cache_save(_cache_id, function () {
//                _this.paragraph.cache_save(_cache_id, _callback);
//            });
//        });
//    });
    
    
//    var _ele = [this.word
//        , this.sentence
//        , this.paragraph
//        , this.chapter
//    ];
//    
//    var _loop = function (_i) {
//        if (_i === undefined) {
//            _i = 0;
//        }
////        $.test_msg('cache_save', _i);
//        if (_i < _ele.length) {
//            _ele[_i].cache_save(_cache_id, function () {
//                _i++;
//                _loop(_i);
//            });
//        }
//        else {
//            $.trigger_callback(_callback);
//        }
//    };
//    _loop();
    
    
//    this.word.cache_save(_cache_id, function () {
//        _this.sentence.cache_save(_cache_id, function () {
//            _this.paragraph.cache_save(_cache_id, function () {
//                _this.chapter.cache_save(_cache_id, _callback);
//            });
//        });
//    });
    
    //this.cache.save(_text_html);
    
    //_text_html = encodeURIComponent(_text_html);
    _text_html = LZString.compressToBase64(_text_html);
    
    var _cache_data = {
        "html": _text_html,
        "word": this.word.get_data(),
        "sentence": this.sentence.get_data(),
        "paragraph": this.paragraph.get_data(),
        "chapter": this.chapter.get_data()
    };
    
    this.cache.save_json(_cache_data, _callback);
    
    return this;
};

/**
 * 從快取中復原
 * 
 * @version 20140517 Pulipuli Chen
 *  取代了原本使用storage來儲存的作法
 *  改用Webpage_cache的方式從伺服器取得快取
 * @param {funciton} _callback
 * @returns {Selectable_element_word}
 */
Selectable_text.prototype.cache_restore = function (_callback) {
    
    
    var _cache_id = this._cache_id;
    var _this = this;
//    var _loaded_callback = function (_text_html) {
//        //$.test_msg('cache_restore ' + _cache_id, _text_html);
//        _this._text.html(_text_html);
//
//        var _ele = [_this.word
//            , _this.sentence
//            , _this.paragraph
//            , _this.chapter
//        ];
//
//        var _loop = function (_i) {
//            if (_i === undefined) {
//                _i = 0;
//            }
////            $.test_msg('cache_restore', _i);
//            if (_i < _ele.length) {
//                _ele[_i].cache_restore(_cache_id, function () {
//                    _i++;
//                    _loop(_i);
//                });
//            }
//            else {
//                $.trigger_callback(_callback);
//            }
//        };
//        _loop();
//
//        //_this.word.cache_restore(_cache_id, function () {
//        //    _this.sentence.cache_restore(_cache_id, function () {
//        //        _this.paragraph.cache_restore(_cache_id, _callback);
//        //    });
//        //});
//    };

    var _loaded_callback = function (_cache_data) {
        //$.test_msg('cache_restore ' + _cache_id, _text_html);
        var _text_html = _cache_data.html;
        
        //_text_html = decodeURIComponent(_text_html);
        _text_html = LZString.decompressFromBase64(_text_html);
        
        _this._text.html(_text_html);
        _this.word.set_data(_cache_data.word);
        _this.sentence.set_data(_cache_data.sentence);
        _this.paragraph.set_data(_cache_data.paragraph);
        _this.chapter.set_data(_cache_data.chapter);
        
        $.trigger_callback(_callback);
    };
    
    /*
    KALS_context.storage.get(_cache_id, _loaded_callback);
    */
   
    this.cache.load_json(_loaded_callback);
    return this;
};

/**
 * 檢查是否有cache
 * 
 * @version 20140517 Pulipuli Chen
 *  取代了原本使用storage來儲存的作法
 *  改用Webpage_cache的方式從伺服器取得快取
 * @param {funciton} _callback
 * @returns {Boolean}
 */
Selectable_text.prototype.has_cache = function (_callback) {
    
    //return KALS_context.storage.is_set(this._cache_id, _callback);
    
    var _loaded_callback = function (_data) {
        var _existed = false;
        if (_data !== false) {
            _existed = true;
        }
        
        if ($.is_function(_callback)) {
            _callback(_existed);
        }
    };
    
    this.cache.load(_loaded_callback);
};

/**
 * 加入預測進度的功能
 * @author Pulipuli Chen 20131227 
 * @param {jQuery} _element
 * @returns {Selectable_text} description
 */
Selectable_text.prototype._predict_progress_total = function (_element) {
    var _total;
    var _estimate_words = _element.text();
    var _estimate_words_length = this.word.get_estimate_total_words(_estimate_words);
    _total = _estimate_words_length;
    
    // 段落
    var _para_tags = this.paragraph.paragraph_tag_names;
    //a=$('[myc="blue"],[myid="1"],[myid="3"]');
    var _para_selector = _para_tags.join(",");
    var _para_length = _element.find(_para_selector).length;
    _para_length = _para_length * 2;
    _total = _total + _para_length;
    
    // 文字
    var _span = _element.find("span");
    _total = _total + _span.length;
    
    //$.test_msg("預測長度", [_total, _estimate_words_length, _para_length]);
    
    KALS_context.progress.set_total(_total);
    
    return this;
};

/* End of file Selectable_text */
/* Location: ./system/application/views/web_apps/Selectable_text.js */