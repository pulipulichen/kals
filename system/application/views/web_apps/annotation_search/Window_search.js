/**
 * Window_profile
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/5 下午 07:51:43
 * @extends {Window_content}
 * 
 * @author Pulipuli Chen 20141113 rename checked
 */
function Window_search() {
    
    Window_content.call(this);
    
    //$.test_msg("this._setup_submit(new Window_search_submit());");
//    this._setup_submit(new Window_search_submit()); // send keyword and field
    var _submit_array = [
        new Window_search_submit(),
        new Window_search_submit_reset()
    ];
    this._setup_submit(_submit_array); // send keyword and field

    //this.child("list", new List_collection_search());
    this.child("list", new Search_topic_list());
}

Window_search.prototype = new Window_content();

Window_search.prototype.name = 'window_search';
Window_search.prototype._$name = 'window_search';

Window_search.prototype.heading = new KALS_language_param (
    'Search',
    'window_search.nav_heading'
);

Window_search.prototype.nav_heading = new KALS_language_param (
    'Search',
    'window_search.nav_heading'
);

Window_search.prototype._$nav_heading = new KALS_language_param (
    'Search',
    'window_search.nav_heading'
);

Window_search.prototype._$load_config = 'Window_search';

/**
 * 開啟KALS_window時，是否預設啟用讀取中
 * @type Boolean
 */
//Window_search.prototype._$kals_window_open_loading = false;

Window_search.prototype.width = 500;

/**
 * 搜尋結果
 * @type {Search_topic_list}
 */
Window_search.prototype.list = null;

/**
 * 搜尋的預設值
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype._default_search_option = {
    query_field: "note",
    annotation_type: "importance",
    order_by: "update"
};

/**
 * 上次搜尋的參數結果
 * @type JSON
 * @author Pulipuli Chen 20141113
 */
Window_search.prototype._last_search_option = null;

/**
 * 搜尋功能選項
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype._search_param = {
    /**
     * 搜尋欄位
     */
    query_field: [ "note"
        ,"annotation_user_name"
        ,"annotation_type"
        ,"annotation_anchor_text" ],

    /**
     * 排序順序
     * 
     * 由於內文順序的排序尚未完成，所以先關閉
     */
    //order_by: ["update","create","scope"]
    order_by: ["update","create"]	
};

Window_search.prototype.nav_config = {
    /**
     * 顯示資料
     * @type Boolean
     */
    display: true,
    
    /**
     * 決定顯示導覽列的位置
     * 
     * 類型包括：
     * - common: 不管什麼類型都會顯示(在以下三種類型中都會顯示)
     * - login: 已經登入的使用者就會顯示
     * - profile: 以手動登入的使用者才會顯示
     * - embed: 以內嵌登入的使用者才會顯示
     * - anonymous: 未登入的使用者才會顯示
     * @type String
     */
    nav_type: "common",
    
    /**
     * 排序順序
     * 
     * 數字越大，越往左邊靠
     * 數字最小的是1
     * @type Number
     */
    order: 1
};

/**
 * Create UI
 * @memberOf {Window_search}
 * @type {jQuery} UI
 */
Window_search.prototype._$create_ui = function (){  //建立UI

    var _ui = KALS_window.ui.panel(this.name);//建立search版面

    var _factory = KALS_window.ui;
    
    
    
    // -----------------------------------
    
    this._search_form_subpanel = _factory.subpanel('search-form').appendTo(_ui);
    
    // 新增一層subplan來畫SEARCH表單	
    //var _subpanel = _factory.subpanel('range').appendTo(this._search_form_subpanel);
    
    //var _this = this;
    
    // field為radio選單
   
    // -------------------------
	
    var _field_radio = this.create_query_field_input("radio");
	
    //將 _field_row畫上去 
    var _field_row = _factory.row(
         new KALS_language_param('Field', 'window_search.query_field'),
         _field_radio	
    ).appendTo(this._search_form_subpanel);
	
    //_query_field_row.find("dt:first").css("margin-bottom", "1em");

    // --------------------------

    // 標註類型radio選單
    var _type_radio = this.create_annotation_type_input("radio");
    this._annotation_type_input = _type_radio;

    //_query_field_list.after(_type_radio); //_type_radio緊接在_query_field_list
    var _type_radio_row = _factory.row(
            new KALS_language_param('Annotation Type', 'window_search.annotation_type_label'),
            _type_radio
        )
        .addClass("annotation-type-row")
        .appendTo(this._search_form_subpanel); 
    this._annotation_type_row = _type_radio_row;
    
    // 隱藏標註類型選單 
    _type_radio_row.hide(); // 平常時候把_type_radio隱藏起來

    // 輸入關鍵字
    var _query_value_input = this.create_query_value_input();
    this._query_value_input = _query_value_input;

    // 測試
    //_keyword_input.val("test");

    var _query_value_row = _factory.row(
                new KALS_language_param('Query: ', 'window_search.query_value_label'),
                _query_value_input
            )
            .addClass("query-value-row")
            .appendTo(this._search_form_subpanel); //"關鍵字"標題
    this._query_value_row = _query_value_row;

    var _value_empty_hint = _factory.tip(new KALS_language_param('Please enter query', 'window_search.query_value_empty_hint'))
            .addClass("query-value-empty-hint")
            .after(_query_value_input);

    // ------------------

    // 選擇排序方式-update,create,scope

    //var _search_form_subpanel = _factory.subpanel('order_by').appendTo(this._search_form_subpanel); //新增一層subplan	
  
   // order_by為radio選單

    var _order_by_config = this._search_param.order_by;
    var _order_by_options = [];
    var _order_by_default_value = this._default_search_option.order_by;

    for (var _k in _order_by_config) {

        var  _order_by_param = _order_by_config[_k];
        var _value =_order_by_config[_k];
        //預設值
        if ( _order_by_default_value === null) {
            _order_by_default_value = _value;
        }
        var _lang = new KALS_language_param(
            _value,
            'window_search.oreder_by.' + _value
        );
        var _option = _factory.radio_option(_lang, _value);

        _order_by_options.push(_option);
    }

    var _order_by_radio = _factory.radio_list('order_by', _order_by_options ,_order_by_default_value);
    _order_by_radio.addClass("order_by");

    var _order_by_row = _factory.row(
        new KALS_language_param('order_by', 'window_search.oreder_by'),
        _order_by_radio	
    ).appendTo(this._search_form_subpanel);

  	
 /* 換頁功能 
    var _callback = function (_page) {
            alert(_page);
    };

    _factory.create_pager(9, 10, _callback).appendTo(_ui);

*/
   
    // ---------------------------------------------------------
    
    // 搜尋結果數量
    /**
     * 移至List_collection_search顯示
     */
    //var _result_number = _search_data.item_number;
	
    /*var _search_number_row = _factory.row(
        new KALS_language_param('Searchnumber','window.content.searchnumber'), '1'
    ).appendTo(_ui); */
   
    var _result = _factory.subpanel("search-result-subpanel")
            //.addClass("topic-list")
            .appendTo(_ui)
            .hide();
    this._search_result_subpanel = _result;
    
    var _list_ui = this.list.get_ui();
    _list_ui.appendTo(_result);
        
    return _ui;
};

/**
 * 搜尋表單面板
 * @author Pulipuli Chen 20141113
 * @type jQuery
 */
Window_search.prototype._search_form_subpanel = null;

/**
 * 搜尋結果面板
 * @author Pulipuli Chen 20141113
 * @type jQuery
 */
Window_search.prototype._search_result_subpanel = null;

/**
 * 查詢字欄位
 * @author Pulipuli Chen 20141113
 * @type jQuery
 */
Window_search.prototype._query_value_input = null;

/**
 * 查詢字列
 * @author Pulipuli Chen 20141113
 * @type jQuery
 */
Window_search.prototype._query_value_row = null;

/**
 * 查詢字欄位
 * @author Pulipuli Chen 20141113
 * @type jQuery
 */
Window_search.prototype._annotation_type_input = null;

/**
 * 標註類型列
 * @author Pulipuli Chen 20141113
 * @type jQuery
 */
Window_search.prototype._annotation_type_row = null;

/**
 * 建立搜尋範圍的選單
 * 
 * 注意：這是選單，所以還要搭配_factory.radio_list才能運作
 * 
 * @param _type {String} radio|dropdown 選單類型
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype.create_query_field_options = function(_type){
    if (_type === undefined) {
        _type = "radio";
    }
	
    var _factory = KALS_window.ui;
	
    var _field_options = [];
    var _field_default_value = this._default_search_option.query_field;
    var _field_param_list = this._search_param.query_field;
    
    for (var _r in _field_param_list) {
        // _type_param = new Annotation_type_param();
        //var _query_field_param = _field_param_list[_r];
        var _value = _field_param_list[_r];
        //預設值
        if (_field_default_value === null) {
            _field_default_value = _value;
        }
        var _lang = new KALS_language_param(_value, 'window_search.query_field.' + _value);

        var _option;
        if (_type === "radio") {
            _option = _factory.radio_option(_lang, _value);
        }
        else {
            _option = _factory.dropdown_option(_lang, _value);
        }

        _field_options.push(_option);
    }

    return _field_options;
};	

/**
 * 建立搜尋選單
 * @param {String} _type radio|dropdown 選單類型
 * @type {jQuery}
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype.create_query_field_input = function (_type) {

    if (_type === undefined) {
        _type = "radio";
    }
	
    var _factory = KALS_window.ui;

    //var _options = this.create_field_options(_type);

    var _field_options = this.create_query_field_options(_type);
    var _field_default_value = this._default_search_option.query_field;

    var _field_input;
    if (_type === "radio") {
        _field_input = _factory.radio_list('query_field', _field_options, _field_default_value);	
    }
    else if (_type === "dropdown") {
        _field_input = _factory.dropdown('query_field', _field_options, _field_default_value);
    }

    _field_input.addClass(this._query_field_classname);

    var _this = this;

//    var _check_toggle_input = function (_range) {
//
//    };

    if (_type === "radio") {
        _field_input.find("input").click(function() {
            _this.change_query_field(this.value);
        });
    }
    else if (_type === "dropdown") {
        _field_input.change(function () {
            //$.test_msg("_query_field.change()", this.value);
            _this.change_query_field(this.value);
        });	
    }

    return _field_input;
};

/**
 * 標註範圍的class名稱
 * @type {String}
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype._query_field_classname = "query-field";

///**
// * 取得標註範圍的UI
// * @type {jQuery}
// */
//Window_search.prototype.get_range_ui = function () {
//	return $(".KALS ." + this.range_classname);
//};

/**
 * 更換選擇範圍
 * 
 * @author Pulipuli Chen 20141111
 * 如果範圍一樣，則不重置
 * @param {String} _field
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype.change_query_field = function (_query_field) {

//    if (this._last_field === null) {
//        this._last_field = this._default_search_option.range;
//    }
//    
//    if (this._last_field === _range) {
//        return this;
//    }
    
    if (this._last_field === null) {
        if (this._last_search_option === null) {
            this._last_field = this._default_search_option.query_field;
        }
        else {
            this._last_field = this._last_search_option.query_field;
        }
    }

//    $.test_msg("Window_search.prototype.change_field", this._last_field);
//    //$.test_msg("change range", [_range, this.is_input_keyword()]);
//    if (_range === "annotation_type" 
//            && this.is_input_keyword()) {
//        this.toggle_input("annotation_type");
//    }
//    else if (_range !== "annotation_type" 
//            && this.is_input_keyword() === false) {
//        this.toggle_input("keyword");
//    }	
//
//    var _range_ui = this.get_range_ui();
//    KALS_window.ui.change_list_value(_range_ui, _range);

    if (_query_field !== this._last_field) {
        if (_query_field === "annotation_type") {
            this.toggle_input("annotation_type");
        }
        else {
            this.toggle_input("query_value");
            this.set_query_value("");
        }
    }

    this._last_field = _query_field;

    //this.list.reset();

    return this;
};

/**
 * 記錄最後使用的range
 */
Window_search.prototype._last_field = null;

/**
 * 建立標註類型選單
 * @param {String} _type radio|dropdown 選單類型
 * @type {jQuery
 */
Window_search.prototype.create_annotation_type_input = function (_type) {
	
    if (_type === undefined) {
        _type = "radio";
    }

    var _factory = KALS_window.ui;

    // 標註類型radio選單
    var _type_param_list = KALS_context.create_type_param_list();
    var _type_options = [];
//    var _default_type = this._default_search_option.annotation_type;
    var _default_type = null;
    var _first_type = null;
    for (var _r in _type_param_list) {
        // _type_param = new Annotation_type_param();
        var _type_param = _type_param_list[_r];
        //var _value = _type_param.get_id();
        var _value = _type_param.get_name();

//        if (_type_param.is_basic() === false) {
//            _value = _type_param.get_name();
//        }

        //預設值
        if (_first_type === null) {
            _first_type = _value;
        }
        if (_value === this._default_search_option.annotation_type) {
            _default_type = _value;
        }

        var _lang = _type_param.get_type_name_lang();

        var _option;
        if (_type === "radio") {
            _option = _factory.radio_option(_lang, _value);
        }
        else if (_type === "dropdown") {
            _option = _factory.dropdown_option(_lang, _value);
        }

        _type_options.push(_option);
    }   //for (var _r in _type_param_list) {
    
    /**
     * 可以從預設標註類型設定一開始開啟的標註類型
     * @author Pulipuli Chen 20141114
     */
    if (_default_type === null) {
        _default_type = _first_type;
    }

    var _type_input;

    var _this = this;
    if (_type === "radio") {
        _type_input = _factory.radio_list('annotation_type', _type_options, _default_type);

        _type_input.find("input:radio").click(function () {
            _this.change_annotation_type(this.value);
        });	
    }
    else if (_type === "dropdown") {
        _type_input = _factory.dropdown('annotation_type', _type_options, _default_type);

        _type_input.change(function () {
            _this.change_annotation_type(this.value);
        });	
    }

    _type_input.addClass(this._annotation_type_classname);


    return _type_input;
};

/**
 * 設定標註類型
 * @param {String} _query_type
 */
Window_search.prototype.change_annotation_type = function (_query_type) {
    var _annotation_type_input = this._annotation_type_input;

    var _factory = KALS_window.ui;
    _factory.change_list_value(_annotation_type_input, _query_type);

    var _type_value = _factory.get_list_value(_annotation_type_input);
    //$.test_msg("change_annotation_type", _type_value);
    
    this.set_query_value(_type_value); 

    //this.list.reset();

    return;
};

/**
 * 標註類型的class名稱
 * @type {String}
 */
Window_search.prototype._annotation_type_classname = "annotation-type";

/**
 * 標註類型選單
 * @type jQuery
 */
Window_search.prototype._annotation_type_input = null;

/**
 * 建立關鍵字輸入框
 * @type {jQuery}
 */
Window_search.prototype.create_query_value_input = function(){

    /*
    var _factory = KALS_window.ui;

    // 輸入關鍵字
    var _keyword_input = _factory.input('keyword');
    */
   
    /**
     * @author Pulipuli Chen 20141111
     * 統一改用factory的input來產生表單內容
     */
    //var _input = $('<input type="text" placeholder="Search..." name="keyword" class="search-form-input" />');
    
    var _factory = KALS_window.ui;
    var _input = _factory.input("query_value");
    _input.attr("placeholder", "Search...");

    KALS_context.lang.add_listener(_input, new KALS_language_param('Search...'
        , 'toolbar.search.input_placeholder'));
    
    _input.placeHeld();
    _input.addClass(this._query_value_classname);

//    var _this = this;
//    _input.change(function () {
//        _this.set_query_value(this.value);
//    });
    
    return _input;
};

/**
 * 設定關鍵字的值
 * @param {String} _value
 */
Window_search.prototype.set_query_value = function (_value) {
    
    if (_value === "*") {
        _value = "";
    }
    
    //this.get_keyword_ui().val(_value);
    this._query_value_input.val(_value);
    //this.list.reset();
    return this;
};

/**
 * 關鍵字輸入框的class名稱
 * @type {String}
 */
Window_search.prototype._query_value_classname = "query-value";

/**
 * 切換要顯示的輸入框
 * @param {String} _type annotation_type|keyword
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype.toggle_input = function (_type) {

//    var _keyword_ui = this.get_keyword_ui();
//    var _type_ui = this.get_annotation_type_ui();

    var _ui = this.get_ui();
    //var _query_value_row = this._query_value_row;
    //var _annotation_type_row = this._annotation_type_row;

    var _factory = KALS_window.ui;

    if (_type === "annotation_type") {
        var _query_value = this._query_value_input.val();
        if (_query_value === "*") {
            _query_value = "";
        }
        this._last_query_value = _query_value;

        var _type_value = _factory.get_list_value(this._annotation_type_input);
        this.set_query_value(_type_value);

        //_keyword_ui.addClass("use-annotation-type");
        //_keyword_ui.hide();
        this._query_value_row.hide();
        //_type_ui.show();
        this._annotation_type_row.show();
    }
    else {
        //this.set_query_value(this._last_query_value);

        //_keyword_ui.removeClass("use-annotation-type");
        //_keyword_ui.show();
        this._query_value_row.show();
        //_type_ui.hide();
        this._annotation_type_row.hide();
    }

    return this;
};

/**
 * 現在是顯示關鍵字輸入框嗎？
 * @type {boolean}
 */
//Window_search.prototype.is_input_keyword = function () {
//    var _keyword_ui = this.get_keyword_ui().eq(0);
//    var _classname = _keyword_ui.attr("className");
//    var _is_keyword = (_classname.indexOf("use-annotation-type") === -1);
//    //$.test_msg("is_input_keyword", _is_keyword);
//    return _is_keyword;
//};

/**
 * 最後輸入的關鍵字
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype._last_query_value = null;


///**
// * 取得關鍵字的UI
// */
//Window_search.prototype.get_keyword_ui = function () {
//    return this.find("." + this._query_value_classname);
//};

///**
// * 取得標註類型的UI
// */
//Window_search.prototype.get_annotation_type_ui = function () {
//    return this.find("." + this.type_classname);
//};

// -------------------------------------------------

///**
// * 顯示最近的標註
// * @deprecated Pulipuli Chen 20141113 不使用
// * @memberOf {window_search}
// */
//Window_search.prototype.show_recent_annotation = function(_callback){
//    var _content = this;
//    var _list = _content.list;
//    //var _data = this.get_data();
//
//    //$.test_msg("Window_search_submit.prototype.submit", _data);
//    var _default_option = this._default_search_option;
//    _list.set_query_field(_default_option.range);
//    _list.set_keyword("");
//    _list.set_order_by(_default_option.order_by);
//
//    _list.reset();
//
//    // 我們要叫List_collection_search進行搜尋
////    var _this = this;
////
////    _list.load_list(function () {
////        //$.test_msg("Window_search_submit.prototype.submit");
////        //_this.complete_handle();
////        _content.get_ui().find(".search-result-subpanel").show();
////        $.trigger_callback(_callback);
////    });
//    
//    var _submit_callback = function () {
//        //_content.get_ui().find(".search-result-subpanel").show();
//        _content._search_result_subpanel.show();
//        
//        //$.test_msg("Window_search.show_recent_annotation()", "讀取完了？") ;
//        //$.throw_msg("Window_search.show_recent_annotation()", "讀取完了？") ;
//        $.trigger_callback(_callback);
//    };
//    
//    //this.open_window();
//    this.submit.submit(_submit_callback, true);
//    
//    //this.change_submit("loading");
//    
//    return this;
//};

/**
 * 開啟最新標註
 * @param {Function} _callback
 * @returns {Window_search.prototype}
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype.open_recent_annotation = function (_callback) {
//    
//    if (this.submit.is_submit_locked()) {
//        //$.throw_msg("重複呼叫了！");
//        return this;
//    }
//    
//    var _this = this;
//    _this.open_window();
//    _this.show_recent_annotation(function () {
//        $.trigger_callback(_callback);
//    }); 
    
    var _search_option = {
        query_field: "note",
        //query_value: "*",
        //query_value: "心願",
        query_value: "we",
        order_by: "update"
    };
    
    this.search(_search_option);
    
    return this;
};

///**
// * 回傳一個目前的狀態
// * @deprecated Pulipuli Chen 20141114
// * @memberOf {window_search}
// * @author Pulipuli Chen 20131113
// */
//Window_search.prototype.setup_recent = function(){
//	
//    this.nav_heading = new KALS_language_param (
//        'Recent',
//        'window.search_recent.nav_heading'
//    );
//    
//    //this._$nav_heading = this.nav_heading;
//    
//    this.name = "search_recent";
//    //this._$name = this.name;
//
//    //$.test_msg("setup_recent", this.name);
//    var _this = this;
//    this.onopen = function () {
//
//        var _save_input_value = {
//            query_field: _this.get_input_value("query_field"),
//            keyword: _this.get_input_value("keyword"),
//            order_by: _this.get_input_value("order_by")
//        };
//
//        //$.test_msg("setup_recent", _save_input_value);
//
//        //$.test_msg("setup_recent", "keyword *");
//        _this.set_input_value({
//            query_field: "note",
//            keyword: "*",
//            order_by: "update"
//        });
//
//        _this.submit.submit(function () {
//            _this.set_input_value(_save_input_value);
//        });
//    };
//};

/**
 * 設置input的值，覆寫Window_content
 * @param {JSON} _data
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype.set_input_value = function(_data){
    
    if (typeof _data.query_field === 'string') {
        this.toggle_input(_data.query_field);
    }
    
    var _filtered_data = {};
    
    for (var _i in _data) {
        var _val = _data[_i];
        
        if (_i === "query_value"
                && _val === "*") {
            _val = "";
        }
        
        _filtered_data[_i] = _val;
    }
    
    if (_filtered_data.query_field === "annotation_type") {
        if (typeof(_filtered_data.query_value) === "string") {
            _filtered_data.annotation_type = _filtered_data.query_value;
        }
        _filtered_data.query_value = "";
        //$.test_msg("set_input_value", _filtered_data);
    }

    return Window_content.prototype.set_input_value.call(this, _filtered_data);
};

/**
 * 開啟視窗後預設要聚焦的可輸入元件
 * @type {String} jQuery Selector
 */
Window_search.prototype.default_focus_input = '.dialog-content:first input:radio:checked';

/**
 * 執行搜尋
 * @param {JSON} _search_option 搜尋選項
 * _param = {
 *      query_field: "note","author","annotation_type","annotation_anchor",
 *      query_value:"keyword",
 *      order_by: "update|create"
 *      _disable_validate: false
 * }
 * @paam {Boolean} _open_window 預設是true
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype.search = function (_search_option, _open_window, _callback) {
    
    
    if (this.submit.is_submit_locked()) {
        $.throw_msg("Window_search.search()", "submit locked");
        return this;
    }
    
    //var _this = this;
    
    if (_open_window === undefined) {
        _open_window = true;
    }
    
    if ($.is_function(_open_window) && _callback === undefined) {
        _callback = _open_window;
        _open_window = true;
    }
    
    // ----------------
    
    if (typeof(_search_option.query_value) !== "undefined") {
        _search_option.query_value = $.trim(_search_option.query_value);
    }
    
    if (typeof(_search_option) === "object") {
        this.set_input_value(_search_option);
    }
    
    var _disable_validate = false;
    if (typeof(_search_option._disable_validate) === "boolean") {
        _disable_validate = _search_option._disable_validate;
    }
    if (this.validate(_search_option) === false 
            && _disable_validate === true) {
        return this;
    }
    
    // -----------------------------------
    
    //$.test_msg("開始搜尋", _search_option);
    //this._dispacher.notify_listeners("search");
    
    KALS_window.toggle_loading(true);
    this.submit._lock_submit();
    
    if (_open_window) {
        this.open_window();
    }
    
    this._setup_search_list(_search_option, _callback);
    
    return this;
};

/**
 * 執行搜尋的動作
 * 
 * @author Pulipuli Chen 20141113
 * @param {JSON} _search_option
 * @param {Function} _callback
 * @returns {Window_search.prototype}
 * 
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype._setup_search_list = function (_search_option, _callback) {
    var _content = this;
    
    var _data = _search_option;
    
    if (_data.query_field === "annotation_type"
            && (typeof(_data.query_value) === "undefined" || _data.query_value === "") ) {
        _data.query_value = _data.annotation_type;
    }
    
    if (typeof(_data.order_by) === "undefined") {
        _data.order_by = this._default_search_option.order_by;
    }

    //$.test_msg("_setup_search_list 1", this._last_search_option);
    //$.test_msg("_setup_search_list 2", _data);
    if (this._last_search_option !== null
            && this._last_search_option.query_field === _data.query_field
            && this._last_search_option.query_value === _data.query_value
            && this._last_search_option.order_by === _data.order_by) {
//        $.test_msg("重複內容！");
        _content._restore_search_scope_coll();
        _content._search_complete_callback(_callback);
        return this;
    }
    
    // --------------------------------------------
    
    this._last_search_option = _data;
    
    var _list = this.list;
    //var _data = this.submit.get_data();
    
    _list.reset();
//    _list.get_ui().show();

    //$.test_msg("Window_search._setup_search_list() 1", _data);
    //$.test_msg("Window_search._setup_search_list() 2", this.get_data());
    
//    _list.set_query_field(_data.query_field);
//    _list.set_query_value(_data.query_value);
//    _list.set_order_by(_data.order_by);
    _list.set_search_option(_data);

    // 我們要叫List_collection_search進行搜尋
    //var _this = this;
    //$.test_msg("Window_search_submit _list.load_list()", _list.get_name());
    
    $.test_msg("before load list");
    
//    _list.load_list(function () {
//        
//    });
    
    _content._list_loaded = false;
    _list.load_list(function () {
        if (_content._list_loaded === false) {
            _content._list_loaded = true;
            _content._search_complete_callback(_callback); 
        }
    });
    
//    _list.load_list();
//    _content._search_complete_callback(_callback); 
    
//    setTimeout(function () {
//    //$(function () {
//        
//    //});
//    }, 1000);
    
    return this;
};

//Window_search.prototype._list_loaded = false; 

/**
 * 搜尋完成之後的動作
 * 
 * @author Pulipuli Chen 20141113
 * @param {Function} _callback
 * @returns {Window_search.prototype}
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype._search_complete_callback = function (_callback) {
    
    if (this.submit.is_submit_locked() === false) {
        $.throw_msg("Window_search.search()", "submit unlocked");
        return this;
    }
    
    this._search_result_subpanel.show();
    this._search_form_subpanel.hide();
    
    this.submit._unlock_submit();
    
//    KALS_window.toggle_loading(false);
//    $.trigger_callback(_callback);
    
    this.change_submit("reset");
    this._dispacher.notify_listeners("search");
    
    $.test_msg("Window_search._search_complete_callback()", "讀取完成");
    
    KALS_window.loading_complete(_callback);
    
    return this;
};

/**
 * 設定KALS_window的內容，預設是在設置完成之後直接完成loading。請覆寫此方法。
 * @param {function} _callback
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype.setup_content = function (_callback) {
//    
//    //2010.9.9 觀察loading狀態測試用
//    //return;
//    
//    var _this = this;
//    var _load_callback = function () {
//        // 調整內部的物件
//        //_this.adjust_note();
//        
//        $.trigger_callback(_callback);
//    };
//    
//    //KALS_window.loading_complete(_load_callback);
//    //$.test_msg("Window_search.setup_content()", "讀取狀態=" + this.submit._submit_locked);
//    if (this.submit.is_submit_locked() === false) { 
//        KALS_window.loading_complete(_load_callback);
//    }
//    else {
//        //$.test_msg("Window_search.setup_content()", "讀取中，請稍候");
//        _load_callback();
//    }
    
    $.trigger_callback(_callback);
    return this;
};

/**
 * 清理搜尋結果
 * @author Pulipuli Chen 20141113
 * @returns {Window_search.prototype}
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype.reset_search = function () {
    
    //var _this = this;
    
    this._search_result_subpanel.hide();
    this._search_form_subpanel.show();
    
    //this.list.reset();
    KALS_text.selection.search.clear();
    this.change_submit("submit");
    this._dispacher.notify_listeners("reset");
    
    //this._last_search_option = null;
    return this;
};

/**
 * 增加監聽者
 * 
 * @author Pulipuli Chen 20141113
 * @param {string} _type 監聽類型
 * @param {function} _function 回呼函數。
 * _function = function (_dispatcher) { //... }
 * @param {boolean} _trigger 是否立刻啟動
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype.add_listener = function (_event_name, _function, _trigger) {
    this._dispacher.add_listener(_event_name, _function, _trigger)
    return this;
};

/**
 * 事件記錄器
 * @type Multi_event_dispatcher
 */
Window_search.prototype._dispacher = new Multi_event_dispatcher();

/**
 * 驗證搜尋資料
 * @author Pulipuli Chen 20141113
 * @returns {Boolean}
 * @author Pulipuli Chen 20141113 rename checked
 */
Window_search.prototype.validate = function (_data) {
    
    var _result = true;

    var _ui = this.get_ui();
    var _empty_hint = _ui.find(".query-value-empty-hint");

    if (_data.query_value === "") {
        _result = false;
        _empty_hint.show();
        this._query_value_input.focus();
    }
    else {
        _empty_hint.hide();
    }
    
    return _result;
};

/**
 * 取得目前的搜尋參數
 * @author Pulipuli Chen 20141113
 * @returns {JSON}
 */
Window_search.prototype.get_search_option = function () {
    
    var _search_option = {
        query_field: this._last_search_option.query_field,
        query_value: this._last_search_option.query_value,
        order_by: this._last_search_option.order_by
    };
    
    if (typeof(_search_option.order_by) === "undefined" ) {
        _search_option.order_by = this._default_search_option.order_by;
    }
    
    return _search_option;
};

/**
 * 最後的搜尋範圍
 * @author Pulipuli Chen 20141115
 * @type Scope_collection_param
 */
Window_search.prototype._search_scope_coll = null;

/**
 * 繪製搜尋結果範圍
 * @author Pulipuli Chen 20141115
 * @returns {List_collection_search.prototype}
 */
Window_search.prototype.set_search_scope_coll = function (_search_scope_coll) {
    //$.test_msg("Window_search.set_search_scope_coll()", "設定範圍");
    this._search_scope_coll = _search_scope_coll;
    KALS_text.selection.search.set_scope_coll(_search_scope_coll);
    return this;
};

/**
 * 重新繪製搜尋結果範圍
 * @author Pulipuli Chen 20141115
 * @returns {List_collection_search.prototype}
 */
Window_search.prototype._restore_search_scope_coll = function () {
    KALS_text.selection.search.set_scope_coll(this._search_scope_coll);
    return this;
};

/* End of file Window_profile */
/* Location: ./system/application/views/web_apps/Window_profile.js */