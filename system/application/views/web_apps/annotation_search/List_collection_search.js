/**
 * List_collection_search-由此送出做查尋並接收result畫出無限捲軸
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/27 下午 09:03:09
 * @extends {List_collection}
 */
function List_collection_search() {
    
    List_collection.call(this);
    
}

List_collection_search.prototype = new List_collection();

List_collection_search.prototype._$name = 'search';

List_collection_search.prototype._$target_my = false;

List_collection_search.prototype._$target_like = false;

List_collection_search.prototype._$need_login = false;

//接收資料的來源
List_collection_search.prototype._$load_url = 'annotation_getter/search_annotation'; 

List_collection_search.prototype._$limit = null;

/**
 * 是否啟用登入檢查
 * @type boolean
 */
List_collection_search.prototype._$enable_check_login = false;

/**
 * 搜尋範圍
 * @type {String}
 */
List_collection_search.prototype._search_range = null;

/**
 * 關鍵字
 * @type {String}
 */
List_collection_search.prototype._keyword = null;

/**
 * 設定搜尋範圍
 * @param {string} _search_range
 */
List_collection_search.prototype.set_search_range = function (_search_range) {
	this._search_range = _search_range;
};

/**
 * 設定關鍵字
 * @param {string} _keyword
 */
List_collection_search.prototype.set_keyword = function (_keyword) {
	this._keyword = _keyword;
};

/**
 * 設定排序
 * @param {string} _order_by
 */
List_collection_search.prototype.set_order_by = function (_order_by) {
	this._$order_by = _order_by;
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

List_collection_search.prototype.get_search_data = function () {
    //$.test_msg("List_coll search get_search_data");
    var _search_data = {};
       
    //需要登入身分的兩個參數
    //if (($.isset(this._$target_like) || $.isset(this._$target_my)) &&
    //  KALS_context.auth.is_login() === false) {
    //            return null;
    //}
    
    if ($.isset(this._$target_like)) {
		_search_data.target_like = this._$target_like;
	}
    if ($.isset(this._$target_my)) {
		_search_data.target_my = this._$target_my;
	}
    
    if ($.isset(this._$limit)) {
		_search_data.limit = this._$limit;
	}
    
    if ($.isset(this._$target_topic)) {
		_search_data.target_topic = this._$target_topic;
	}
    if ($.isset(this._$order_by) && this._$order_by != 'score') {
		_search_data.order_by = this._$order_by;
	}
        
    if ($.isset(this._offset)) {
		_search_data.offset = this._offset;
	}
    
    //$.test_msg('Respond_list_collection.get_search_data()', _data);
    _search_data.search_range = this._search_range;
	_search_data.keyword = this._keyword;
	_search_data.order_by = this._$order_by;
	
    _search_data.show_total_count = true;
    
        //$.test_msg("List_coll get_search_data", _search_data);
	return _search_data;
};

// 呈現結果數量
List_collection_search.prototype.setup_load_list = function(_data, _callback){
	
	// 做一個假的_this，讓function中使用
	var _this = this;
	
        //$.test_msg("search.setup_load_list", _data);
        //$.test_msg("search.setup_load_list", this.get_name());
	return List_collection.prototype.setup_load_list.call(this, _data, function () {

		// 取得UI
	   var _ui = _this.get_ui();
		
	   var _search_count =_data.total_count;
	   var _search_loaded = _data.totally_loaded;
	   
	   //var _show_result_row = _ui.find(".totally-loaded"); //全部讀完
	   var _show_no_result_row = _ui.find(".no-result");  //無查詢結果
	   var _reset_button = _ui.find(".reset-button");  //無查詢結果
	  
	   //顯示查詢訊息
	   if (_search_loaded === true && _search_count === 0){ 
		    _show_no_result_row.show();
			//_show_result_row.hide();
			_reset_button.hide();
		  }
		else if(_search_loaded === true && _search_count !== 0 ) {
		    //_show_result_row.show();
		    _show_no_result_row.hide();
			_reset_button.show();
		}
	
                //顯示查詢結果	
                _ui.find(".result-count-tip").show();
		_ui.find(".result-count-tip .result-count").html(_search_count);
 		
		//$.test_msg('_search_count', _search_count);
		//$.test_msg('_search_loaded',_search_loaded);
		
		// ------------
		
		var _search_scope = _data.scope_collection;
		
		KALS_text.selection.search.set_scope_coll(_search_scope);
		
		_ui.show();
		
		// ------------

		// 要改用$._trigger，以免_callback不是function
		// @20131114 Pulipuli Chen
		$.trigger_callback(_callback);
	});
	
};

/**
 * 這樣可以跑嗎？
 */
List_collection_search.prototype.load_list = function(_data, _callback) {
    if ($.is_function(_data) && $.is_null(_callback)) {
        _callback = _data;
        _data = null;
    }
    
    if ($.isset(_data)) {
        if ($.is_class(_data, 'Annotation_param')) {
            var _annotation_param = _data.export_json();
            _data = {
                annotation_collection: [ _annotation_param ],
                totally_loaded: true
            };    
        }
        else if ($.is_class(_data, 'Annotation_collection_param')) {
            var _coll_param = _data.export_json();
            _data = {
                annotation_collection: _coll_param,
                totally_loaded: true
            };
        }
        
        //$.test_msg('List_collection.load_list() has data', _data);
        
        var _this = this;
        this.setup_load_list(_data, function () {
            $.trigger_callback(_callback);
            _this.notify_listeners(_data);
        });
        
        return this;
    }
    
    if (this.is_totally_loaded() === true
        || this._check_login() === false) {
        $.trigger_callback(_callback);
        //$.test_msg("is_totally_loaded check_login", [this.is_totally_loaded(), this._check_login()]);
        return this;
    }
    
    if (this._load_lock === true) {
        //$.test_msg("_load lock ed");
        return this;
    }
    
    //$.test_msg('List_coll.load_list check pre _search_data', this.get_name());
    
    var _search_data = this.get_search_data();
    
    //$.test_msg('List_coll.load_list check _search_data', [_search_data, this.get_name()]);
    if ($.isset(_search_data)) {
        this._load_lock = true;
        
        //$.test_msg('List_coll.load_list  pre-load()');
        this.load(_search_data, function (_this, _data) {
            //$.test_msg('List_coll.load_list load()', _data);
            _this.setup_load_list(_data, function () {
                $.trigger_callback(_callback);
                _this._load_lock = false;    
            });
        });
        return this;
    }
    
    //$.test_msg("List_coll do nothing");
    return this;
};

/**
 * 設定UI介面
 * @tyep {jQuery}
 */
List_collection_search.prototype._$create_ui = function () {
    
    var _factory = KALS_window.ui; 

    var _ui = $('<div></div>')
    .addClass('list-collection')
    .addClass(this._$name);

    // 搜尋結果標題	 
    var _searchresult_row = _factory.heading_row(new KALS_language_param('Searchresult', 'window.content.searchresult'))
        .appendTo(_ui); //"搜尋結果"標題	
    _searchresult_row.css("font-size","medium");
    
    var _header_panel = _factory.panel("header")
		.appendTo(_ui);

    // 建立清除搜尋結果的按鈕
    var _reset_button = this.create_reset_button();
    _reset_button.appendTo(_header_panel);
    
    // 建立導覽的按鈕
    var _guide_button = this.create_guiding_button();
    _guide_button.appendTo(_header_panel);

    //_factory.hr_row().appendTo(_ui);	
    	
    //結果數量
    //var _result_number; 
    var _result_count_tip = _factory.tip(
    new KALS_language_param('Search Result Count','window.content.searchnumber'), '0')
        .addClass('result-count-tip')
        .hide()
        .appendTo(_header_panel); 

    var _result_count = $("<span></span>")
        .addClass("result-count")
        .appendTo(_result_count_tip);
  
    // -------------
    var _container = $('<div></div>')
        .addClass('list-container')
        .appendTo(_ui);
	
	// --------------
  	// _search_number_row.parent(".list-collection search").find('dd').addClass('number');

	var _footer_panel = _factory.panel("footer")
		.appendTo(_ui);
	/*
	var _result_row =_factory.message_row(new KALS_language_param('no-else-result','window.content.loaded_already'))
		.addClass('totally-loaded')
		.addClass('foot-tip')
		.appendTo(_footer_panel);
    */
	var _no_result_row =_factory.message_row(new KALS_language_param('no-result','window.content.noresult'))
		.addClass('no-result')
		.addClass('foot-tip')
		.css("display", "block")
		.appendTo(_footer_panel);
  
	// 隱藏,再由totally_loaded與 total_count來判斷是否顯示
	//_result_row.hide(); 
	_no_result_row.hide();
	
	//_reset_button.clone(true).appendTo(_footer_panel);
	
    this._list_container = _container;

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
		"window.search.clear_search_result"
	))
		.addClass("reset-button");
	
	
	var _this = this;
	_button.click(function () {
		_this.reset();
	});
	
	return _button;
};

/**
 * 建立搜尋結果導讀按鈕
 * @author Pulipuli Chen  
 * @type {jQuery}
 */
List_collection_search.prototype.create_guiding_button = function () {
    var _factory = KALS_window.ui;
    var _button = _factory.button(new KALS_language_param(
            "Guiding Reading",
            "window.search.guiding_reading"
    ))
            .addClass("guiding-button");

    var _this = this;
    _button.click(function () {
            //_this.reset();
    });

    return _button;
};

/**
 * 修改預設的重設動作
 */
List_collection_search.prototype.reset = function () {
    //$.test_msg("List_collection_search.prototype.reset");
    
    this.get_ui().hide();
    KALS_text.selection.search.clear();
    return List_collection.prototype.reset.call(this);
};

/* End of file List_collection_search */
/* Location: ./system/application/views/web_apps/List_collection_search.js */