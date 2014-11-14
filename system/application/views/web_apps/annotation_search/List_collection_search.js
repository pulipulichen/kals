/**
 * List_collection_search-由此送出做查尋並接收result畫出無限捲軸
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2014/11/13 下午 09:03:09
 * @extends {List_collection}
 */
function List_collection_search() {
    
    List_collection.call(this);
    
}

List_collection_search.prototype = new List_collection();

List_collection_search.prototype._$name = 'list_collection_search';

//List_collection_search.prototype._$target_my = null;
//
//List_collection_search.prototype._$target_like = null;
//
//List_collection_search.prototype._$need_login = null;

/**
 * 是否鎖定主題的標註
 * @type {boolean|null}
 */
List_collection_search.prototype._$target_topic = null;

//接收資料的來源
List_collection_search.prototype._$load_url = 'annotation_getter/search_annotation'; 

List_collection_search.prototype._$limit = 3;

/**
 * 是否啟用登入檢查
 * @type boolean
 */
List_collection_search.prototype._$enable_check_login = false;

/**
 * 搜尋範圍
 * @type {String}
 * @author Pulipuli Chen 20141113 rename checked
 */
List_collection_search.prototype._query_field = null;

/**
 * 關鍵字
 * @type {String}
 * @author Pulipuli Chen 20141113 rename checked
 */
List_collection_search.prototype._query_value = null;

/**
 * 導讀按鈕
 * @type {jQuery}
 * @author Pulipuli Chen 20141110
 */
List_collection_search.prototype._guide_button = null;

/**
 * 查詢條件的資訊欄位
 * @type {jQuery}
 * @author Pulipuli Chen 20141113
 */
List_collection_search.prototype._query_info = null;

/**
 * 設定搜尋範圍
 * @param {string} _search_range
 * @author Pulipuli Chen 20141113 rename checked
 */
List_collection_search.prototype.set_query_field = function (_value) {
    //$.test_msg("List_collection_search.prototype.set_query_field", _value);
    this._query_field = _value;
    return this;
};

/**
 * 設定關鍵字
 * @param {string} _keyword
 * @author Pulipuli Chen 20141113 rename checked
 */
List_collection_search.prototype.set_query_value = function (_value) {
    //$.test_msg("List_collection_search.prototype.set_query_value", _value);
    this._query_value = _value;
    return this;
};

/**
 * 設定排序
 * @param {string} _order_by
 */
List_collection_search.prototype.set_order_by = function (_order_by) {
    this._$order_by = _order_by;
    return this;
};

/**
 * 設定搜尋參數
 * @param {JSON} _search_option
 * @author Pulipuli Chen 20141114
 */
List_collection_search.prototype.set_search_option = function (_search_option) {
    //$.test_msg("List_collection_search.prototype.set_query_field", _value);
    this._query_field = _search_option.query_field;
    this._query_value = _search_option.query_value;
    this._$order_by = _search_option.order_by;
    return this;
};

// 開始建立List_item-topic & respond
List_collection_search.prototype.create_list_item = function(_param) {
    if (_param.is_respond() === false) {
        return new List_item_search_topic(_param);
    }
    else {
        return new List_item_search_respond(_param);
    }
};

/**
 * 必須要填入範圍資訊
 * @author Pulipuli Chen 20141114
 * @type Boolean
 */
List_collection_search.prototype._search_data_scope_require = false;

/**
 * @author Pulipuli Chen 20141113 rename checked
 * @returns {List_collection_search}
 */
List_collection_search.prototype.get_search_data = function () {

    var _search_data = List_collection.prototype.get_search_data.call(this);
    
    _search_data.query_field = this._query_field;
    _search_data.query_value = this._query_value;
    _search_data.show_total_count = true;
    
    $.test_msg("List_coll get_search_data()", _search_data);
    
    return _search_data;
};

//List_collection_search.prototype.load_list = function(_data, _callback) {
//    
//    return List_collection.prototype.load_list.call(this, _data, function () {
//        $.trigger_callback(_callback);
//    });
//};

// -------------------------------------

/**
 * 呈現結果數量
 * @param {Object} _data
 * @param {Function} _callback
 * @returns {unresolved}
 */ 
List_collection_search.prototype.setup_load_list = function(_data, _callback){

//    //if (this._first_load === true) {
//        this._toggle_blank(false);
//        this._toggle_loading(true);
//    //}
    
    // 做一個假的_this，讓function中使用
    var _this = this;
    var _guide_button = this._guide_button;
    var _list_container = this._list_container;

    //$.test_msg("search.setup_load_list", _data);
    //$.test_msg("search.setup_load_list", this.get_name());
    return List_collection.prototype.setup_load_list.call(this, _data, function () {
        
//        _this._toggle_loading(false);

        // 取得UI
        var _ui = _this.get_ui();

        var _search_count =_data.total_count;
        var _search_loaded = _data.totally_loaded;

        //var _show_result_row = _ui.find(".totally-loaded"); //全部讀完
//        var _show_no_result_row = _ui.find(".no-result");  //無查詢結果
//        var _reset_button = _ui.find(".reset-button");  //無查詢結果

        //顯示查詢訊息
        if (_search_loaded === true 
               && _search_count === 0){ 
//            _show_no_result_row.show();
            //_show_result_row.hide();
//            _reset_button.hide();
            _list_container.hide();
            if (_guide_button !== null) {
                _guide_button.hide();
            }
        }
        else if (_search_loaded === true 
                && _search_count !== 0 ) {
            //_show_result_row.show();
//            _show_no_result_row.hide();
//            _reset_button.show();
            _list_container.show();
            if (_guide_button !== null) {
                _guide_button.show();
            }
        }

        //顯示查詢結果	
//        _ui.find(".result-count-tip").show();
//        _ui.find(".result-count-tip .result-count").html(_search_count);

        //$.test_msg('_search_count', _search_count);
        //$.test_msg('_search_loaded',_search_loaded);
        _this._setup_query_info(_search_count);

        // ------------

        var _search_scope = _data.scope_collection;

        KALS_text.selection.search.set_scope_coll(_search_scope);
        _this._last_search_scope = _search_scope;

        //_ui.show();
        // ------------

        // 要改用$._trigger，以免_callback不是function
        // @20131114 Pulipuli Chen
        $.trigger_callback(_callback); 
    });
};

/**
 * 查詢語句
 * @type KALS_language_param
 * @author Pulipuli Chen 20141113
 */
List_collection_search.prototype._lang_query_info_single = new KALS_language_param(
        'Search query is {0}: {1}. {2} result(s) found, order by {3}:',
        //搜尋條件"{0}"：{1}，結果共有{2}筆資料：
        'window_search.list.query_info_single'
);

/**
 * 查詢語句
 * @type KALS_language_param
 * @author Pulipuli Chen 20141113
 */
List_collection_search.prototype._lang_query_info_mass = new KALS_language_param(
        'Search query is {0}: {1}. {2} result found, order by {3}:',
        //搜尋條件"{0}"：{1}，結果共有{2}筆資料：
        'window_search.list.query_info_mass'
);

/**
 * 查詢語句
 * @type KALS_language_param
 * @author Pulipuli Chen 20141113
 */
List_collection_search.prototype._lang_query_info_empty = new KALS_language_param(
        'Search query is {0}: {1}. No result found.',
        //搜尋條件"{0}"：{1}，結果共有{2}筆資料：
        'window_search.list.query_info_empty'
);

/**
 * 設定查詢條件
 * @param {Number} _result_count
 * @returns {List_collection_search.prototype}
 * @author Pulipuli Chen 20141113
 * @author Pulipuli Chen 20141113 rename checked
 */
List_collection_search.prototype._setup_query_info = function (_result_count) {
    
    var _search_option = KALS_context.search.get_search_option();
    
    var _query_field = _search_option.query_field;
    
    var _query_value = _search_option.query_value;
    
    if (_query_field === "annotation_type") {
        // 標註類型要怎麼取得呢……
        //_query_value = new Annotation_type_param(_query_field).get_custom_name();
        var _lang = "annotation.type." + _query_value;
        
        //$.test_msg("有標註資料嗎？", [_query_value, _lang, KALS_context.lang.has_line(_lang)]);
        
        if (KALS_context.lang.has_line(_lang)) {
            _query_value = KALS_context.lang.line(_lang);
        }
    }
    
    // 取得欄位的名稱
    _query_field = KALS_context.lang.line(new KALS_language_param(
                _query_field,
                "window_search.query_field." + _query_field
            ));
    
    var _order_by = _search_option.order_by;
    _order_by = KALS_context.lang.line(new KALS_language_param(
                _order_by,
                "window_search.oreder_by." + _order_by
            ));
    
    var _lang;
    if (_result_count === 0) {
        _lang = this._lang_query_info_empty;
    } 
    else if (_result_count === 1) {
        _lang = this._lang_query_info_single;
    }
    else {
        _lang = this._lang_query_info_mass;
    }
    _lang.arg = [_query_field, _query_value, _result_count, _order_by];
    var _line = KALS_context.lang.line(_lang);
    
    this._query_info.html(_line);
    
    return this;
};

/**
 * 最後的搜尋範圍
 * @author Pulipuli Chen 20141113
 * @type Scope_collection_param
 */
List_collection_search.prototype._last_search_scope = null;

/**
 * @author Pulipuli Chen 20141113
 * @returns {List_collection_search.prototype}
 */
List_collection_search.prototype.restore_last_search_scope = function () {
    KALS_text.selection.search.set_scope_coll(this._last_search_scope);
    return this;
};

///**
// * 這樣可以跑嗎？
// */
//List_collection_search.prototype.load_list = function(_data, _callback) {
//    if ($.is_function(_data) && $.is_null(_callback)) {
//        _callback = _data;
//        _data = null;
//    }
//    
//    if ($.isset(_data)) {
//        if ($.is_class(_data, 'Annotation_param')) {
//            var _annotation_param = _data.export_json();
//            _data = {
//                annotation_collection: [ _annotation_param ],
//                totally_loaded: true
//            };    
//        }
//        else if ($.is_class(_data, 'Annotation_collection_param')) {
//            var _coll_param = _data.export_json();
//            _data = {
//                annotation_collection: _coll_param,
//                totally_loaded: true
//            };
//        }
//        
//        //$.test_msg('List_collection.load_list() has data', _data);
//        
//        var _this = this;
//        this.setup_load_list(_data, function () {
//            $.trigger_callback(_callback);
//            _this.notify_listeners(_data);
//        });
//        
//        return this;
//    }
//    
//    if (this.is_totally_loaded() === true
//        || this._check_login() === false) {
//        $.trigger_callback(_callback);
//        //$.test_msg("is_totally_loaded check_login", [this.is_totally_loaded(), this._check_login()]);
//        return this;
//    }
//    
//    if (this._load_lock === true) {
//        //$.test_msg("_load lock ed");
//        return this;
//    }
//    
//    //$.test_msg('List_coll.load_list check pre _search_data', this.get_name());
//    
//    var _search_data = this.get_search_data();
//    
//    //$.test_msg('List_coll.load_list check _search_data', [_search_data, this.get_name()]);
//    if ($.isset(_search_data)) {
//        this._load_lock = true;
//        
//        //$.test_msg('List_coll.load_list  pre-load()');
//        this.load(_search_data, function (_this, _data) {
//            //$.test_msg('List_coll.load_list load()', _data);
//            _this.setup_load_list(_data, function () {
//                $.trigger_callback(_callback);
//                _this._load_lock = false;    
//            });
//        });
//        return this;
//    }
//    
//    //$.test_msg("List_coll do nothing");
//    return this;
//};

/**
 * 設定UI介面
 * @tyep {jQuery}
 */
List_collection_search.prototype._$create_ui = function () {
    
    var _factory = KALS_window.ui; 

//    var _ui = $('<div></div>')
//    .addClass('list-collection')
//    .addClass(this._$name);
    var _ui = _factory.panel(this._$name);

    // 搜尋結果標題	 
    var _searchresult_row = _factory.heading_row(
            new KALS_language_param(
                'Search result', 
                'window_search.list.search_result'
            )
        )
        .appendTo(_ui); //"搜尋結果"標題	
    //_searchresult_row.css("font-size","medium");
    
    var _info_subpanel = _factory.subpanel("info-subpanel")
		.appendTo(_ui);
    
    var _query_info = $("<span />")
            .addClass("query-info")
            .appendTo(_info_subpanel);
    
    this._query_info = _query_info;

    // 建立清除搜尋結果的按鈕
//    var _reset_button = this.create_reset_button();
//    _reset_button.appendTo(_header_panel);
    
    // 建立導覽的按鈕
    if (KALS_context.module.has_module("Reading_guide")) { 
        var _guide_button = this.create_guide_button();
        _guide_button.appendTo(_info_subpanel);
        this._guide_button = _guide_button;
    }

    //_factory.hr_row().appendTo(_ui);	
    	
    //結果數量
    //var _result_number; 
//    var _result_count_tip = _factory.tip(
//            new KALS_language_param(
//                'Search query is {0}: {1}. {2} result(s) found:',
//                //搜尋條件"{0}"：{1}，結果共有{2}筆資料：
//                'window.content.search_number'
//        ), '0')
//        .addClass('result-count-tip')
//        .hide()
//        .appendTo(_header_panel); 

//    var _result_count = $("<span></span>")
//        .addClass("result-count")
//        .appendTo(_result_count_tip);
  
    // -------------
    
//    var _topic_list = $("<div />")
//            .addClass("topic-list")
//            .appendTo(_ui);
//    
//    _topic_list = Topic_list.prototype._setup_endless_scroll.call(this, _topic_list);
//    
    var _container = $('<div></div>')
        .addClass('list-container')
        .appendTo(_ui);

    this._list_container = _container;
    

    // --------------
    // _search_number_row.parent(".list-collection search").find('dd').addClass('number');
//
//    var _loading = this._create_loading_component()
//            .appendTo(_topic_list);
//    this._loading_component = _loading;

//    var _footer_panel = _factory.panel("footer")
//            .appendTo(_ui);
    /*
    var _result_row =_factory.message_row(new KALS_language_param('no-else-result','window.content.loaded_already'))
            .addClass('totally-loaded')
            .addClass('foot-tip')
            .appendTo(_footer_panel);
    */
   
//    var _no_result_row =_factory.message_row(new KALS_language_param('no-result','window_search.list.noresult'))
//            .addClass('no-result')
//            .addClass('foot-tip')
//            .css("display", "block")
//            .appendTo(_footer_panel);
  
    // 隱藏,再由totally_loaded與 total_count來判斷是否顯示
    //_result_row.hide(); 
//    _no_result_row.hide();

    //_reset_button.clone(true).appendTo(_footer_panel);
	
    
    
    
    return _ui;
};

/**
 * 建立清除搜尋結果按鈕
 * @return jQuery
 */
List_collection_search.prototype.create_reset_button = function () {
    var _factory = KALS_window.ui;
    
    var _button = _factory.button(new KALS_language_param(
        "Clear search result",
        "window_search.reset_search_result"
    ))
        .addClass("reset-button");

    //var _content = this;
    _button.click(function () {
        KALS_context.search.reset_search();
    });

    return _button;
};

/**
 * 建立搜尋結果導讀按鈕
 * @author Pulipuli Chen  
 * @type {jQuery}
 */
List_collection_search.prototype.create_guide_button = function () {
    var _factory = KALS_window.ui;
    
    var _button = _factory.button(new KALS_language_param(
                "Reading Guide",
                "window_search.reading_guide"
            ))
            .addClass("guide-button");

    var _this = this;
    _button.click(function () {
        //_this.reset();
        var _coll = _this.get_annotation_collection_param();
        
        // @20131230 要輸出到導讀的功能中
        KALS_text.guide.setup_steps(_coll);
        KALS_window.close();
        
        //$.test_msg("create guiding button", _coll.annotations.length);
    });

    return _button;
};

///**
// * 修改預設的重設動作
// * @author Pulipuli Chen 20141113
// * @param {Function} _callback
// */
//List_collection_search.prototype.reset = function (_callback) {
//    //$.test_msg("List_collection_search.prototype.reset");
//    
//    this.get_ui().hide();
//    KALS_text.selection.search.clear();
//    
//    return List_collection.prototype.reset.call(this, _callback);
//};

///**
// * 監聽Window_search
// * @author Pulipuli Chen 20141113
// * @type {List_collection_search}
// */
//List_collection_search.prototype._init_listener = function () {
//    var _search = KALS_context.search;
//    var _ui = this.get_ui();
//    
//    _search.add_listener("search", function () {
//        _ui.show();
//    });
//    
//    _search.add_listener("clear", function () {
//        _ui.hide();
//    });
//    
//    return this;
//};

// ---------------------

/**
 * 加入讀取中的元件
 * @author Pulipuli Chen 20141114
 * @returns {jQuery}
 */
List_collection_search.prototype._create_loading_component = function () {
    return Topic_list.prototype._create_loading_component.call(this);
     //return _loading_component;
};

/**
 * 讀取中的元件
 * @type jQuery
 * @author Pulipuli Chen 20141114
 */
List_collection_search.prototype._loading_component = null;

/**
 * 現在是否是在讀取中
 * @returns {Boolean}
 * @author Pulipuli Chen 20141114
 */
List_collection_search.prototype.is_loading = function () {
    return Topic_list.prototype.is_loading.call(this);
};

/**
 * 切換讀取中
 * @returns {Boolean}
 * @author Pulipuli Chen 20141114
 */
List_collection_search.prototype._toggle_loading = function (_is_loading, _callback) {
    $.test_msg("_toggle_loading", _is_loading);
    return Topic_list.prototype._toggle_loading.call(this, _is_loading, _callback);
};

// ------------------------------------------

/**
 * 加入沒有結果的元件
 * @author Pulipuli Chen 20141114
 * @returns {jQuery}
 */
List_collection_search.prototype._create_blank_component = function () {
    return Topic_list.prototype._create_blank_component.call(this);
     //return _loading_component;
};

/**
 * 讀取中的元件
 * @type jQuery
 * @author Pulipuli Chen 20141114
 */
List_collection_search.prototype._blank_component = null;


/**
 * 切換讀取完成
 * @returns {Boolean}
 * @author Pulipuli Chen 20141114
 */
List_collection_search.prototype._toggle_blank = function (_is_loading, _callback) {
    return Topic_list.prototype._toggle_complete.call(this, _is_loading, _callback);
};

// --------------------------------------

/**
 * 加入沒有結果的元件
 * @author Pulipuli Chen 20141114
 * @returns {jQuery}
 */
List_collection_search.prototype._create_complete_component = function () {
    return Topic_list.prototype._create_complete_component.call(this);
     //return _loading_component;
};

/**
 * 切換讀取完成
 * @returns {Boolean}
 * @author Pulipuli Chen 20141114
 */
List_collection_search.prototype._toggle_complete = function (_is_loading, _callback) {
    return Topic_list.prototype._toggle_complete.call(this, _is_loading, _callback);
};

// ----------------------------------

/* End of file List_collection_search */
/* Location: ./system/application/views/web_apps/List_collection_search.js */