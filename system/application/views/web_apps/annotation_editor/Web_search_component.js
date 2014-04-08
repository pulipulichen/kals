/**
 * Web_search_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2013/6/3 下午 02:59:42
 */
function Web_search_component() {
    
    Event_dispatcher.call(this);
	
}

// Extend from KALS_user_interface
Web_search_component.prototype = new Event_dispatcher();

/**
 * Create UI
 * @memberOf {Web_search_component}
 * @type {jQuery} UI
 */
Web_search_component.prototype._$create_ui = function () {
	
	var _ui = $("<span></span>")
		.addClass("web-search")
		.addClass("button")
		.addClass("dialog-option");
	
	if (typeof(KALS_CONFIG.web_search_url) != "undefined"
		&& (KALS_CONFIG.web_search_url === false
			|| KALS_CONFIG.web_search_url == "disable")) {
				_ui.hide();
				return _ui;
			}
	
	var _this = this;
	
	// 設定語系
	var _lang = new KALS_language_param(
		"Web Search",
		"web_search"
	);
	
	KALS_context.lang.add_listener(_ui, _lang);
	
	//設定按下去之後的效果
	var _web_search_url = "http://www.google.com/search?q={query}";
	if (typeof(KALS_CONFIG.web_search_url) == "string") {
		_web_search_url = KALS_CONFIG.web_search_url;
	}
	//https://www.google.com.tw/#safe=off&site=&source=hp&q=test&oq=test&gs_l=hp.3..0l10.1094.1687.0.2052.4.4.0.0.0.0.45.155.4.4.0.eqrwrth..0.0.0..1.1.15.hp.rh1WD0sToJU&qscrl=1&bav=on.2,or.r_cp.&bvm=bv.47244034,d.dGI&fp=543fd01eff5ed8d6&biw=950&bih=934
	
	_ui.click(function () {
		//var _query = "test";
		var _query = KALS_text.selection.select.get_anchor_text();
		_query = encodeURI(_query);
		var _url = $.str_replace("{query}", _query, _web_search_url) ;
		
		var _search_win = window.open(_url, '_blank');
	});
	
	_ui.hover(function () {
		$(this).addClass("hover");
	}, function () {
		$(this).removeClass("hover");
	});
	
	return _ui;
};

/* End of file Web_search_component */
/* Location: ./system/application/views/web_apps/Web_search_component.js */