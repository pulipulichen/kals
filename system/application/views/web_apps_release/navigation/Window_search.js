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
    
	this._setup_submit(new Window_search_submit()); // send keyword and searchrange
	
	this.child("list", new List_collection_search());
}

Window_search.prototype = new Window_content();

Window_search.prototype.name = 'Search';

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
Window_search.prototype.list;

/**
 * Create UI
 * @memberOf {Window_profile}
 * @type {jQuery} UI
 */
Window_search.prototype._$create_ui = function (){  //建立UI

    var _ui = KALS_window.ui.panel('window-search');//建立search版面

    var _factory = KALS_window.ui;
      
	 // 新增一層subplan來畫SEARCH表單	
	 var _subpanel = _factory.subpanel('range').appendTo(_ui);
	 var _this = this;
    
	
 
   // searchrange為radio選單
   
  	var _searchrange_param_list = [ "note","author","annotation_type","annotation_anchor" ];
	var _searchrange_options = [];
	var _searchrange_default_value = null;
	
	for (var _r in _searchrange_param_list) {
		// _type_param = new Annotation_type_param();
		var _searchrange_param = _searchrange_param_list[_r];
		var _value =_searchrange_param_list [_r];
		//預設值
		if (_searchrange_default_value === null) {
			_searchrange_default_value = _value;
		}
		var _lang = new KALS_language_param(
                _value,
                'window.content.search.field.' + _value
            );
		var _option = _factory.radio_option(_lang, _value);
		
        _searchrange_options.push(_option);
	}
	
	
	
	var _searchrange_radio = _factory.radio_list('searchrange', _searchrange_options , _searchrange_default_value);
	_searchrange_radio.addClass("searchrange");
	
	//將 _searchrange_row畫上去 
     var _searchrange_row = _factory.row(
         new KALS_language_param('searchrange', 'window.content.searchrange'),
         _searchrange_radio	
       ).appendTo(_subpanel);
	
	 _searchrange_row.find("dt:first").css("margin-bottom", "1em");
	
	
	


	// 標註類型radio選單
	var _type_param_list = KALS_text.tool.editor_container.editor.type.menu.create_type_param_list();
	var _type_options = [];
	var _default_type = null;
	for (var _r in _type_param_list) {
		// _type_param = new Annotation_type_param();
		var _type_param = _type_param_list[_r];
		var _value = _type_param.get_id();
		//預設值
		if (_default_type === null) {
			_default_type = _value;
		}
		var _lang = _type_param.get_type_name_lang();
		
		var _option = _factory.radio_option(_lang, _value);
		
        _type_options.push(_option);
	}
	
	var _type_radio = _factory.radio_list('type', _type_options, _default_type);
	_type_radio.addClass("searchrange-type");
	
	//_searchrange_list.after(_type_radio); //_type_radio緊接在_searchrange_list
	var _type_radio_row = _factory.row(
    new KALS_language_param('type_radio', 'window.content.type_radio'),
		 _type_radio).appendTo(_ui); 

    // 隱藏標註類型選單 
    _type_radio_row.hide(); // 平常時候把_type_radio隱藏起來
	_type_radio_row.find("dt:first").css("margin-bottom", "1em");
	
	
     // 當使用者有點選動作時的事件
	 _searchrange_radio.find("input")
		.click(function () {
		
			// 現在在option下用this，去找上面名為.searchrange-type的層別，在此層級下找:radio:checked，選擇現在所點選的值
			var _value = $("[name='searchrange']:checked").attr("value");
			// 在option下用parents去找上面名為window-panel的層別，在此層級下找到要代入的search-keyword，將value代入
			$(this).parents(".window-panel").find(".search-keyword:first").val(_value);
			
			
			// 如果點選到類別就秀出標註類型radio選單
			var _panel = $(this).parents(".window-panel:first");
			
			if (_value !== "annotation_type") {
		        _type_radio_row.hide();
		        _panel.find(".search-keyword:first").val(""); 
	
		       // $.test_msg("_searchrange_list.change", $(this).parents(".window-panel").find(".search-keyword:first").length);
	
		        _searchkey_row.show();
	     
	           } 
   	       else {
               _type_radio_row.show();
		      _searchkey_row.hide();
	
	
	
	      // 切換標註類型選項 
		  
		 if ( _panel.find(".radio-list.list.searchrange-type input:radio:first").length === 1){
		 
		 // 預設值   
		    var _type_value =1 ;
		    _panel.find(".search-keyword:first").val(_type_value);
		    
		 // 切換選項	
			_type_radio.click(function (){
		   		  
			    _type_value = _panel.find(".radio-list.list.searchrange-type input:radio:checked").val(); //要找到下一層input有點選的部分
			    
				//$.test_msg("_.searchrange-type", _panel.find(".radio-list.list.searchrange-type input:radio:checked").val() );
				
				_panel.find(".search-keyword:first").val(_type_value);
				
			 });  
		     
			 }
		
	}	
   });
	
		
   
   
    // 輸入關鍵字
	var _keyword_input = _factory.input('keyword');
	
	_keyword_input.addClass("search-keyword");
	
	var _searchkey_row = _factory.row(
        new KALS_language_param('Searchkey', 'window.content.searchkey'),
        _keyword_input).appendTo(_ui); //"關鍵字"標題	
        

	
	// 選擇排序方式-update,create,scope
	
	var _subpanel = _factory.subpanel('order').appendTo(_ui); //新增一層subplan	
	 var _this = this;
  
  
   // order_by為radio選單

	var _order_by_config = [ "update","create","scope" ];
	var _order_by_options = [];
	var _order_by_default_value = null;
	
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

	
_factory.hr_row().appendTo(_ui);	
	
	
  	
 /* 換頁功能 
	var _callback = function (_page) {
		alert(_page);
	};
	
	_factory.create_pager(9, 10, _callback).appendTo(_ui);

*/
   
   // 搜尋結果標題	 
	var _searchresult_row = _factory.heading_row(
        new KALS_language_param('Searchresult', 'window.content.searchresult')).appendTo(_ui); //"搜尋結果"標題	
  
    _searchresult_row.css("font-size","medium");
  
    var _list_ui = this.list.get_ui();
	_list_ui.appendTo(_ui);
	
	return _ui;
};	
	
	


/* End of file Window_profile */
/* Location: ./system/application/views/web_apps/Window_profile.js */