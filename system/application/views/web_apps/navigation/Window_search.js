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
    
	this._setup_submit(new Window_search_submit()); // send keyword and search_range
	
	this.child("list", new List_collection_search());
}

Window_search.prototype = new Window_content();

Window_search.prototype.name = 'search';

Window_search.prototype.heading = new KALS_language_param (
    'Search',
    'window.search.nav_heading'
);

Window_search.prototype.nav_heading = new KALS_language_param (
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
	range: "author",
	type: null,
	order_by: null
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
	var _this = this;
    
   	// search_range為radio選單
   
  	var _search_range_param_list = [ "note","author","annotation_type","annotation_anchor" ];
	var _search_range_options = [];
	var _search_range_default_value = this._search_default_option.range;
	
	var _r;
	for (_r in _search_range_param_list) {
		// _type_param = new Annotation_type_param();
		var _search_range_param = _search_range_param_list[_r];
		var _value =_search_range_param_list [_r];
		//預設值
		if (_search_range_default_value === null) {
			_search_range_default_value = _value;
		}
		var _lang = new KALS_language_param(
                _value,
                'window.content.search.field.' + _value
            );
		var _option = _factory.radio_option(_lang, _value);
		
        _search_range_options.push(_option);
	}
	
	var _search_range_radio = _factory.radio_list('search_range', _search_range_options , _search_range_default_value);
	_search_range_radio.addClass("search-range");
	
	//將 _search_range_row畫上去 
     var _search_range_row = _factory.row(
         new KALS_language_param('search_range', 'window.content.search_range'),
         _search_range_radio	
       ).appendTo(_subpanel);
	
	 _search_range_row.find("dt:first").css("margin-bottom", "1em");
	
	// 標註類型radio選單
	var _type_param_list = KALS_text.tool.editor_container.editor.type.menu.create_type_param_list();
	var _type_options = [];
	var _default_type = this._search_default_option.type;
	for (_r in _type_param_list) {
		// _type_param = new Annotation_type_param();
		var _type_param = _type_param_list[_r];
		var _value = _type_param.get_id();
		
		//預設值
		if (_default_type === null) {
			_default_type = _value;
		}
		
		_lang = _type_param.get_type_name_lang();
		
		_option = _factory.radio_option(_lang, _value);
		
        _type_options.push(_option);
	}
	
	var _type_radio = _factory.radio_list('type', _type_options, _default_type);
	_type_radio.addClass("search-range-type");
	
	//_search_range_list.after(_type_radio); //_type_radio緊接在_search_range_list
	var _type_radio_row = _factory.row(
    new KALS_language_param('type_radio', 'window.content.type_radio'),
		 _type_radio).appendTo(_ui); 

    // 隱藏標註類型選單 
    _type_radio_row.hide(); // 平常時候把_type_radio隱藏起來
	_type_radio_row.find("dt:first").css("margin-bottom", "1em");
	
	
     // 當使用者有點選動作時的事件
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
   
    // 輸入關鍵字
	var _keyword_input = _factory.input('keyword');
	
	_keyword_input.addClass("search-keyword");
	
	// 測試
	//_keyword_input.val("test");
	
	var _searchkey_row = _factory.row(
        new KALS_language_param('Searchkey', 'window.content.searchkey'),
        _keyword_input).appendTo(_ui); //"關鍵字"標題	
        
	// 選擇排序方式-update,create,scope
	
	var _subpanel = _factory.subpanel('order').appendTo(_ui); //新增一層subplan	
	 var _this = this;
  
  
   // order_by為radio選單

	var _order_by_config = [ "update","create","scope" ];
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
    //var _result_number = _search_data.item_number;
	
	/*var _search_number_row = _factory.row(
	    new KALS_language_param('Searchnumber','window.content.searchnumber'), '1'
	).appendTo(_ui); */

    
   
    var _result = _factory.subpanel("search-result-subpanel")
        .appendTo(_ui)
        .hide();
    
    _factory.hr_row().appendTo(_result);	
        
        // 搜尋結果標題	 
    var _searchresult_row = _factory.heading_row(
    new KALS_language_param('Searchresult', 'window.content.searchresult')).appendTo(_result); //"搜尋結果"標題	
    _searchresult_row.css("font-size","medium");
    
    var _list_ui = this.list.get_ui();
	_list_ui.appendTo(_result);
	
	return _ui;
};

/**
 * 顯示最近的標註
 * @memberOf {window_search}
 */
Window_search.prototype.show_recent_annotation = function(){
	var _content = this;
	var _list = _content.list;
	var _data = this.get_data();
	
	//$.test_msg("Window_search_submit.prototype.submit", _data);
	var _default_option = this._search_default_option;
	_list.set_search_range(_default_option.range);
	_list.set_keyword("");
	_list.set_order_by(_default_option.order_by);
	
	_list.reset();
	    
	// 我們要叫List_collection_search進行搜尋
	var _this = this;
	_list.load_list(function () {
        //$.test_msg("Window_search_submit.prototype.submit");
		_this.complete_handle();
        _content.get_ui().find(".search-result-subpanel").show();
	});
};


/**
 * 回傳一個目前的狀態
 * @memberOf {window_search}
 * @author Pulipuli Chen 20131113
 */
Window_search.prototype.setup_recent = function(){
	this.nav_heading = new KALS_language_param (
	    'Search',
	    'window.search_recent.nav_heading'
	);
	
	var _this = this;
	this.onopen = function () {
		_this.submit.submit();
	};
};

/* End of file Window_profile */
/* Location: ./system/application/views/web_apps/Window_profile.js */