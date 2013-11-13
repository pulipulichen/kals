/**
 * Search_form_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/9/16 上午 10:57:50
 * @extends {KALS_user_interface}
 */
function Search_form_component() {
    
    KALS_user_interface.call(this);

}

Search_form_component.prototype = new KALS_user_interface();

/**
 * 開始繪製表單
 */
Search_form_component.prototype._$create_ui = function () {
    
    var _ui = $('<table class="search-form"><tbody><tr></tr></tbody></table>')
		.addClass("search-component");
    
	if ($.is_null(this._window_search)) {
		this._window_search = new Window_search();
	}
	
	var _tr = _ui.find("tr:first");
	
	//var _range_td = $("<td></td>")
	//	.addClass("range")
	//	.appendTo(_tr); 
	
	var _input_td = $("<td></td>")
		.addClass("input")
		.appendTo(_tr);
	
	var _range = this._create_range()
		.appendTo(_input_td);
		
    var _input = this._create_input()
		.appendTo(_input_td);
    
    var _submit = this._create_submit()
		.appendTo(_input_td);
    
	/*
	var _advanced_td = $("<td></td>")
		.addClass("advanced")
		.appendTo(_tr);
    var _advanced = this._create_advanced_link()
		.appendTo(_advanced_td);
	*/
    // TODO Search_form_component search事件
    
    return _ui;
};

/**
 * 開啟搜尋視窗按鈕
 * @author Pulipuli Chen 20131113
 * @return {jQuery}
 */
Search_form_component.prototype._create_advanced_link = function () {
    
    var _ui = $('<span class="link"></span>');
    
    KALS_context.lang.add_listener(_ui, new KALS_language_param('ADVANCED SEARCH'
        , 'toolbar.search.advanced_search'));
    
    _ui.addClass('advanced-link');
	
	var _this = this;
	_ui.click(function () {
		//$.test_msg("Search_component advanced");
		_this._window_search.open_window();
	});
	
    return _ui;
};

/**
 * 搜尋視窗
 * @type {Windows_search}
 */
Search_form_component.prototype._window_search = null;


Search_form_component.prototype._create_input = function () {
    
    var _input = $('<input type="text" placeholder="Search..." name="keyword" class="search-form-input" />');
    
    KALS_context.lang.add_listener(_input, new KALS_language_param('Search...'
        , 'toolbar.search.input_placeholder'));
    
    _input.placeHeld();
    
    return _input;
};

Search_form_component.prototype._create_submit = function () {
    
    var _submit = $('<button type="button" class="search-form-submit"></button>')
        .append(KALS_context.get_image_url('search.gif'));
    
	var _this = this;
	_submit.click(function () {
		//$.test_msg("Search_component advanced");
		_this._window_search.open_window();
	});
    
	return _submit;
};

/**
 * 建立搜尋範圍的選單
 * @tyep {jQuery}
 */
Search_form_component.prototype._create_range = function () {
	
	var _search = this._window_search;
	
	var _search_range = _search.create_range_ui("dropdown");
	
	return _search_range;
};

/* End of file Search_form_component */
/* Location: ./system/application/views/web_apps/Search_form_component.js */