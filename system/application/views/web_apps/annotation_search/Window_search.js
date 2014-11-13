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
 */
function Window_search() {
    
    Window_content.call(this);
    
    //$.test_msg("this._setup_submit(new Window_search_submit());");
    this._setup_submit(new Window_search_submit()); // send keyword and search_range
//    var _submit_array = [
//        new Window_search_submit(),
//        new Window_content_submit_loading()
//    ];
//    this._setup_submit(_submit_array); // send keyword and search_range

    this.child("list", new List_collection_search());
    
    //var _this = this;
}

Window_search.prototype = new Window_content();

Window_search.prototype.name = 'search';
Window_search.prototype._$name = 'search';

Window_search.prototype.heading = new KALS_language_param (
    'Search',
    'window.search.nav_heading'
);

Window_search.prototype.nav_heading = new KALS_language_param (
    'Search',
    'window.search.nav_heading'
);

Window_search.prototype._$nav_heading = new KALS_language_param (
    'Search',
    'window.search.nav_heading'
);

Window_search.prototype._$load_config = 'Window_search';

Window_search.prototype.width = 500;

/**
 * 搜尋結果
 * @type {List_collection_search}
 */
Window_search.prototype.list = null;

/**
 * 搜尋的預設值
 */
Window_search.prototype._search_default_option = {
    range: "note",
    type: null,
    order_by: null
};

/**
 * 搜尋功能選項
 */
Window_search.prototype._search_param = {
    /**
     * 搜尋欄位
     */
    range: [ "note","author","annotation_type","annotation_anchor" ],

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

    var _ui = KALS_window.ui.panel('window-search');//建立search版面

    var _factory = KALS_window.ui;
      
    // 新增一層subplan來畫SEARCH表單	
    var _subpanel = _factory.subpanel('range').appendTo(_ui);
    //var _this = this;
    
    // search_range為radio選單
   
    // -------------------------
	
    var _search_range_radio = this.create_range_ui("radio");
	
    //將 _search_range_row畫上去 
    var _search_range_row = _factory.row(
         new KALS_language_param('search_range', 'window.content.search_range'),
         _search_range_radio	
    ).appendTo(_subpanel);
	
    _search_range_row.find("dt:first").css("margin-bottom", "1em");

    // --------------------------

    // 標註類型radio選單
    var _type_radio = this.create_annotation_type_ui("radio");

    //_search_range_list.after(_type_radio); //_type_radio緊接在_search_range_list
    var _type_radio_row = _factory.row(
            new KALS_language_param('type_radio', 'window.content.type_radio'),
            _type_radio
        )
        .addClass("annotation-type-row")
        .appendTo(_ui); 

    // 隱藏標註類型選單 
    _type_radio_row.hide(); // 平常時候把_type_radio隱藏起來
    _type_radio_row.find("dt:first").css("margin-bottom", "1em");
	
	
    // 當使用者有點選動作時的事件
    /*
	 _search_range_radio.find("input")
		.click(function () {
		
			// 現在在option下用this，去找上面名為.search_range-type的層別，在此層級下找:radio:checked，選擇現在所點選的值
			var _value = $("[name='search_range']:checked").attr("value");
			// 在option下用parents去找上面名為window-panel的層別，在此層級下找到要代入的search-keyword，將value代入
			$(this).parents(".window-panel").find(".search-keyword:first").val(_value);
			
			
			// 如果點選到類別就秀出標註類型radio選單
			var _panel = $(this).parents(".window-panel:first");
			
			if (_value !== "annotation_type") {
		        _type_radio_row.hide();
		        _panel.find(".search-keyword:first").val(""); 
	
		       // $.test_msg("_search_range_list.change", $(this).parents(".window-panel").find(".search-keyword:first").length);
	
		        _searchkey_row.show();
	     
	           } 
   	       else {
               _type_radio_row.show();
		      _searchkey_row.hide();
	
	
	
	      // 切換標註類型選項 
		  
		 if ( _panel.find(".radio-list.list.search-range-type input:radio:first").length === 1){
		 
		 // 預設值   
		    var _type_value =1 ;
		    _panel.find(".search-keyword:first").val(_type_value);
		    
		 // 切換選項	
			_type_radio.click(function (){
		   		  
			    _type_value = _panel.find(".radio-list.list.search-range-type input:radio:checked").val(); //要找到下一層input有點選的部分
			    
				//$.test_msg("_.search_range-type", _panel.find(".radio-list.list.search_range-type input:radio:checked").val() );
				
				_panel.find(".search-keyword:first").val(_type_value);
				
			 });  
		     
			 }
		
	}	
   });
    */
   
   
    // 輸入關鍵字
    var _keyword_input = this.create_keyword_ui();

    // 測試
    //_keyword_input.val("test");

    var _searchkey_row = _factory.row(
    new KALS_language_param('Searchkey', 'window.content.searchkey'),
    _keyword_input)
            .addClass("keyword-row")
            .appendTo(_ui); //"關鍵字"標題	


    var _keyword_empty_hint = _factory.tip(new KALS_language_param('Please input keyword', 'window.search.keyword_empty_hint'))
            .addClass("keyword-empty-hint")
            .appendTo(_searchkey_row.find("dd"));

    // ------------------

    // 選擇排序方式-update,create,scope

    _subpanel = _factory.subpanel('order').appendTo(_ui); //新增一層subplan	
  
   // order_by為radio選單

    var _order_by_config = this._search_param.order_by;
    var _order_by_options = [];
    var _order_by_default_value = this._search_default_option.order_by;

    for (var _k in _order_by_config) {

        var  _order_by_param = _order_by_config[_k];
        var _value =_order_by_config[_k];
        //預設值
        if ( _order_by_default_value === null) {
            _order_by_default_value = _value;
        }
        var _lang = new KALS_language_param(
            _value,
            'window.content.oreder_by.' + _value
        );
        var _option = _factory.radio_option(_lang, _value);

        _order_by_options.push(_option);
    }

    var _order_by_radio = _factory.radio_list('order_by', _order_by_options ,_order_by_default_value);
    _order_by_radio.addClass("order_by");

    var _order_by_row = _factory.row(
        new KALS_language_param('order_by', 'window.content.oreder_by'),
        _order_by_radio	
    ).appendTo(_subpanel);

  	
 /* 換頁功能 
    var _callback = function (_page) {
            alert(_page);
    };

    _factory.create_pager(9, 10, _callback).appendTo(_ui);

*/
   
    // 搜尋結果數量
    /**
     * 移至List_collection_search顯示
     */
    //var _result_number = _search_data.item_number;
	
    /*var _search_number_row = _factory.row(
        new KALS_language_param('Searchnumber','window.content.searchnumber'), '1'
    ).appendTo(_ui); */
   
    var _result = _factory.subpanel("search-result-subpanel")
        .appendTo(_ui)
        .hide();
    
    var _list_ui = this.list.get_ui();
	_list_ui.appendTo(_result);
	
    return _ui;
};



/**
 * 建立搜尋範圍的選單
 * 
 * 注意：這是選單，所以還要搭配_factory.radio_list才能運作
 * 
 * @param _type {String} radio|dropdown 選單類型
 */
Window_search.prototype.create_range_options = function(_type){
    if (_type === undefined) {
        _type = "radio";
    }
	
    var _factory = KALS_window.ui;
	
    var _search_range_options = [];
    var _search_range_default_value = this._search_default_option.range;
    var _search_range_param_list = this._search_param.range;
    
    for (var _r in _search_range_param_list) {
        // _type_param = new Annotation_type_param();
        var _search_range_param = _search_range_param_list[_r];
        var _value = _search_range_param_list[_r];
        //預設值
        if (_search_range_default_value === null) {
            _search_range_default_value = _value;
        }
        var _lang = new KALS_language_param(_value, 'window.content.search.field.' + _value);

        var _option;
        if (_type === "radio") {
            _option = _factory.radio_option(_lang, _value);
        }
        else {
            _option = _factory.dropdown_option(_lang, _value);
        }

        _search_range_options.push(_option);
    }

    return _search_range_options;
};	

/**
 * 建立搜尋選單
 * @param {String} _type radio|dropdown 選單類型
 * @type {jQuery}
 */
Window_search.prototype.create_range_ui = function (_type) {

    if (_type === undefined) {
        _type = "radio";
    }
	
    var _factory = KALS_window.ui;

    //var _options = this.create_range_options(_type);

    var _search_range_options = this.create_range_options(_type);
    var _search_range_default_value = this._search_default_option.range;

    var _search_range;
    if (_type === "radio") {
        _search_range = _factory.radio_list('search_range', _search_range_options, _search_range_default_value);	
    }
    else if (_type === "dropdown") {
        _search_range = _factory.dropdown('search_range', _search_range_options, _search_range_default_value);
    }

    _search_range.addClass(this.range_classname);


    var _this = this;

//    var _check_toggle_input = function (_range) {
//
//    };

    if (_type === "radio") {
        _search_range.find("input").click(function() {
            _this.change_range(this.value);
        });
    }
    else if (_type === "dropdown") {
        _search_range.change(function () {
            _this.change_range(this.value);
        });	
    }

    return _search_range;
};

/**
 * 標註範圍的class名稱
 * @type {String}
 */
Window_search.prototype.range_classname = "search-range";

/**
 * 取得標註範圍的UI
 * @type {jQuery}
 */
Window_search.prototype.get_range_ui = function () {
	return $(".KALS ." + this.range_classname);
};

/**
 * 更換選擇範圍
 * 
 *  @author Pulipuli Chen 20141111
 * 如果範圍一樣，則不重置
 * @param {String} _range
 */
Window_search.prototype.change_range = function (_range) {

    if (this._last_range === null) {
        this._last_range = this._search_default_option.range;
    }
    
    if (this._last_range === _range) {
        return this;
    }

    //$.test_msg("change range", [_range, this.is_input_keyword()]);
    if (_range === "annotation_type" && this.is_input_keyword()) {
        this.toggle_input("annotation_type");
    }
    else if (_range !== "annotation_type" && this.is_input_keyword() === false) {
        this.toggle_input("keyword");
    }	

    var _range_ui = this.get_range_ui();
    KALS_window.ui.change_list_value(_range_ui, _range);

    this._last_range = _range;

    this.list.reset();

    return this;
};

/**
 * 記錄最後使用的range
 */
Window_search.prototype._last_range = null;

/**
 * 建立標註類型選單
 * @param {String} _type radio|dropdown 選單類型
 * @type {jQuery
 */
Window_search.prototype.create_annotation_type_ui = function (_type) {
	
    if (_type === undefined) {
        _type = "radio";
    }

    var _factory = KALS_window.ui;

    // 標註類型radio選單
    var _type_param_list = KALS_context.create_type_param_list();
    var _type_options = [];
    var _default_type = this._search_default_option.type;
    for (var _r in _type_param_list) {
        // _type_param = new Annotation_type_param();
        var _type_param = _type_param_list[_r];
        var _value = _type_param.get_id();

        if (_type_param.is_basic() === false) {
            _value = _type_param.get_name();
        }

        //預設值
        if (_default_type === null) {
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
    }

    var _type_ui;

    var _this = this;
    if (_type === "radio") {
        _type_ui = _factory.radio_list('type', _type_options, _default_type);

        _type_ui.find("input:radio").click(function () {
            _this.change_annotation_type(this.value);
        });	
    }
    else if (_type === "dropdown") {
        _type_ui = _factory.dropdown('type', _type_options, _default_type);

        _type_ui.change(function () {
            _this.change_annotation_type(this.value);
        });	
    }

    _type_ui.addClass(this.type_classname);


    return _type_ui;
};

/**
 * 設定標註類型
 * @param {String} _type
 */
Window_search.prototype.change_annotation_type = function (_type) {
    var _type_ui = this.get_annotation_type_ui();

    var _factory = KALS_window.ui;
    _factory.change_list_value(_type_ui, _type);

    var _type_value = _factory.get_list_value(_type_ui);
    //$.test_msg("change_annotation_type", _type_value);
    this.set_keyword_value(_type_value); 

    this.list.reset();

    return;
};

/**
 * 標註類型的class名稱
 * @type {String}
 */
Window_search.prototype.type_classname = "search-range-type";


/**
 * 建立關鍵字輸入框
 * @type {jQuery}
 */
Window_search.prototype.create_keyword_ui = function(){

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
    var _input = _factory.input("keyword");
    _input.attr("placeholder", "Search...");

    KALS_context.lang.add_listener(_input, new KALS_language_param('Search...'
        , 'toolbar.search.input_placeholder'));
    
    _input.placeHeld();
    _input.addClass(this.keyword_input_classname);

    var _this = this;
    _input.change(function () {
        _this.set_keyword_value(this.value);
    });
    
    return _input;
};

/**
 * 設定關鍵字的值
 * @param {String} _value
 */
Window_search.prototype.set_keyword_value = function (_value) {
	this.get_keyword_ui().val(_value);
	this.list.reset();
	return this;
};

/**
 * 關鍵字輸入框的class名稱
 * @type {String}
 */
Window_search.prototype.keyword_input_classname = "search-keyword";

/**
 * 切換要顯示的輸入框
 * @param {String} _type annotation_type|keyword
 */
Window_search.prototype.toggle_input = function (_type) {

    var _keyword_ui = this.get_keyword_ui();
    var _type_ui = this.get_annotation_type_ui();

    var _ui = this.get_ui();
    var _keyword_row = _ui.find(".keyword-row");
    var _type_row = _ui.find(".annotation-type-row");

    var _factory = KALS_window.ui;

    if (_type === "annotation_type") {
        var _keyword_value = _keyword_ui.eq(0).val();
        this._last_keyword_value = _keyword_value;

        var _type_value = _factory.get_list_value(_type_ui);
        this.set_keyword_value(_type_value);

        _keyword_ui.addClass("use-annotation-type");
        _keyword_ui.hide();
        _keyword_row.hide();
        _type_ui.show();
        _type_row.show();
    }
    else {
        this.set_keyword_value(this._last_keyword_value);

        _keyword_ui.removeClass("use-annotation-type");
        _keyword_ui.show();
        _keyword_row.show();
        _type_ui.hide();
        _type_row.hide();
    }

    return this;
};

/**
 * 現在是顯示關鍵字輸入框嗎？
 * @type {boolean}
 */
Window_search.prototype.is_input_keyword = function () {
    var _keyword_ui = this.get_keyword_ui().eq(0);
    var _classname = _keyword_ui.attr("className");
    var _is_keyword = (_classname.indexOf("use-annotation-type") === -1);
    //$.test_msg("is_input_keyword", _is_keyword);
    return _is_keyword;
};

/**
 * 最後輸入的關鍵字
 */
Window_search.prototype._last_keyword_value = null;


/**
 * 取得關鍵字的UI
 */
Window_search.prototype.get_keyword_ui = function () {
    return $(".KALS ." + this.keyword_input_classname);
};

/**
 * 取得標註類型的UI
 */
Window_search.prototype.get_annotation_type_ui = function () {
    return $(".KALS ." + this.type_classname);
};

// -------------------------------------------------

/**
 * 顯示最近的標註
 * @memberOf {window_search}
 */
Window_search.prototype.show_recent_annotation = function(_callback){
    var _content = this;
    var _list = _content.list;
    //var _data = this.get_data();

    //$.test_msg("Window_search_submit.prototype.submit", _data);
    var _default_option = this._search_default_option;
    _list.set_search_range(_default_option.range);
    _list.set_keyword("");
    _list.set_order_by(_default_option.order_by);

    _list.reset();

    // 我們要叫List_collection_search進行搜尋
//    var _this = this;
//
//    _list.load_list(function () {
//        //$.test_msg("Window_search_submit.prototype.submit");
//        //_this.complete_handle();
//        _content.get_ui().find(".search-result-subpanel").show();
//        $.trigger_callback(_callback);
//    });
    
    var _submit_callback = function () {
        _content.get_ui().find(".search-result-subpanel").show();
        
        //$.test_msg("Window_search.show_recent_annotation()", "讀取完了？") ;
        //$.throw_msg("Window_search.show_recent_annotation()", "讀取完了？") ;
        $.trigger_callback(_callback);
    };
    
    //this.open_window();
    this.submit.submit(_submit_callback, true);
    
    //this.change_submit("loading");
    
    return this;
};


/**
 * 開啟最新標註
 * @param {Function} _callback
 * @returns {Window_search.prototype}
 */
Window_search.prototype.open_recent_annotation = function (_callback) {
    
    if (this.submit.is_submit_locked()) {
        //$.throw_msg("重複呼叫了！");
        return this;
    }
    
    var _this = this;
    _this.open_window();
    _this.show_recent_annotation(function () {
        $.trigger_callback(_callback);
    }); 
    return this;
};

/**
 * 回傳一個目前的狀態
 * @memberOf {window_search}
 * @author Pulipuli Chen 20131113
 */
Window_search.prototype.setup_recent = function(){
	
    this.nav_heading = new KALS_language_param (
        'Recent',
        'window.search_recent.nav_heading'
    );
    
    //this._$nav_heading = this.nav_heading;
    
    this.name = "search_recent";
    //this._$name = this.name;

    //$.test_msg("setup_recent", this.name);
    var _this = this;
    this.onopen = function () {

        var _save_input_value = {
            search_range: _this.get_input_value("search_range"),
            keyword: _this.get_input_value("keyword"),
            order_by: _this.get_input_value("order_by")
        };

        //$.test_msg("setup_recent", _save_input_value);

        //$.test_msg("setup_recent", "keyword *");
        _this.set_input_value({
            search_range: "note",
            keyword: "*",
            order_by: "update"
        });

        _this.submit.submit(function () {
            _this.set_input_value(_save_input_value);
        });
    };
};

/**
 * 設置input的值，覆寫Window_content
 * @param {JSON} _data
 */
Window_search.prototype.set_input_value = function(_data){
    
    if (typeof _data.search_range === 'string') {
        this.toggle_input(_data.search_range);
    }

    return Window_content.prototype.set_input_value.call(this, _data);
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
 *      search_range: "note","author","annotation_type","annotation_anchor",
 *      keyword:"keyword",
 *      order_by: "update|create"
 * }
 * @paam {Boolean} _open_window 預設是true
 */
Window_search.prototype.search = function (_search_option, _open_window) {
    if (typeof(_search_option) === "object") {
        this.set_input_value(_search_option);
    }

    //$.test_msg("開始搜尋");
    this._dispacher.notify_listeners("search");
    
    this.submit.submit();

    if (_open_window === undefined) {
        _open_window = true;
    }

    if (_open_window) {
        this.open_window();
    }
};

/**
 * 設定KALS_window的內容，預設是在設置完成之後直接完成loading。請覆寫此方法。
 * @param {function} _callback
 */
Window_search.prototype.setup_content = function (_callback) {
    
    //2010.9.9 觀察loading狀態測試用
    //return;
    
    var _this = this;
    var _load_callback = function () {
        // 調整內部的物件
        _this.adjust_note();
        
        $.trigger_callback(_callback);
    };
    
    //KALS_window.loading_complete(_load_callback);
    //$.test_msg("Window_search.setup_content()", "讀取狀態=" + this.submit._submit_locked);
    if (this.submit._submit_locked === false) { 
        KALS_window.loading_complete(_load_callback);
    }
    else {
        //$.test_msg("Window_search.setup_content()", "讀取中，請稍候");
        _this.adjust_note();
        $.trigger_callback(_callback);
    }
    return this;
};

/**
 * 清理搜尋結果
 * @author Pulipuli Chen 20141113
 * @returns {Window_search.prototype}
 */
Window_search.prototype.clear_search_result = function () {
    this.list.reset();
    
    $.test_msg("重置");
    this._dispacher.notify_listeners("clear");
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

/* End of file Window_profile */
/* Location: ./system/application/views/web_apps/Window_profile.js */