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
 * Create UI
 * @memberOf {Window_profile}
 * @type {jQuery} UI
 */
Window_search.prototype._$create_ui = function (){  //建立UI

    var _ui = KALS_window.ui.panel('window-search');//建立search版面

    var _factory = KALS_window.ui;

	//=*===TEST01 FILED========
	//var _searchrange_row = _factory.row(
    //new KALS_language_param('Searchrange', 'window.content.searchrange')).appendTo(_ui); //"搜尋範圍"標題
        
	
	 var _subpanel = _factory.subpanel('range').appendTo(_ui); //新增一層subplan	
	 var _this = this;
    
		var _searchrange_config = [ "note","author","annotation_type","annotation_anchor" ];
        var _searchrange_options = [];
        for (var _i in _searchrange_config) 
        {
            var _value = _searchrange_config[_i];
            var _lang_param = new KALS_language_param(
                _value,
                'window.content.search.field.' + _value
            );
            
            var _option = _factory.dropdown_option(_lang_param, _value);
            _searchrange_options.push(_option);
        }
        var _searchrange_default_value = KALS_context.search.get_field();
		if (_searchrange_default_value === null ||_searchrange_default_value === undefined ) {
			 _searchrange_default_value = _searchrange_config[0];
		}
		var _searchrange_list = _factory.dropdown('searchrange', _searchrange_options, _searchrange_default_value);
        
        var _searchrange_row = _factory.row(
            new KALS_language_param('searchrange', 'window.content.searchrange'),
            _searchrange_list	
        ).appendTo(_subpanel);

			
    //=輸入關鍵字====
	var _searchkey_row = _factory.row(
        new KALS_language_param('Searchkey', 'window.content.searchkey'),
        _factory.input('keyword')).appendTo(_ui); //"關鍵字"標題	
        

	
	//==選擇排序方式===
	
	var _subpanel = _factory.subpanel('order').appendTo(_ui); //新增一層subplan	
	 var _this = this;
    
		var _order_by_config = [ "update","create","scope" ];
        var _order_by_options = [];
        for (var _j in _order_by_config) 
        {
            var _value = _order_by_config[_j];
            var _lang_param = new KALS_language_param(
                _value,
                'window.content.oreder_by.' + _value
            );
            
            var _option = _factory.dropdown_option(_lang_param, _value);
            _order_by_options.push(_option);
        }
      //  var _order_by_default_value = KALS_context.search.get_field();
		//if (_searchrange_default_value === null ||_searchrange_default_value === undefined ) {
			 _order_by_default_value = _order_by_config[0];
		//}
		var _order_by_list = _factory.dropdown('order_by', _order_by_options, _order_by_default_value);
        
        var _order_by_row = _factory.row(
            new KALS_language_param('order_by', 'window.content.oreder_by'),
            _order_by_list	
        ).appendTo(_subpanel);

	
	
	
		_factory.hr_row().appendTo(_ui);	
	
	
  	
 /*=============換頁功能==============
	var _callback = function (_page) {
		alert(_page);
	};
	
	_factory.create_pager(9, 10, _callback).appendTo(_ui);

*/
   
   //=====搜尋結果標題===	   
	var _searchresult_row = _factory.row(
        new KALS_language_param('Searchresult', 'window.content.searchresult')).appendTo(_ui); //"搜尋結果"標題	
    
	
	return _ui;
	};	
	
	


/* End of file Window_profile */
/* Location: ./system/application/views/web_apps/Window_profile.js */