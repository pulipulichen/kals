/**
 * Window_filter
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 10:56:17
 * @extends {Window_content}
 */

function Window_map() {
    
    Overlay_modal.call(this);
    
    //this._setup_submit(new Window_filter_submit());
    
	var _windows_content_prototype = new Window_content();
	for (var _i in _windows_content_prototype) {
		this.prototype[_i] = _windows_content_prototype[_i];
	}
}

//Window_map.prototype = new Window_content();
Window_map.prototype = new Overlay_modal();

Window_map.prototype.name = 'Map';

Window_map.prototype.width = 220;

Window_map.prototype.heading = new KALS_language_param (
    'Annotation Map',
    'window.map.heading'
);

Window_map.prototype.nav_heading = new KALS_language_param (
    'Annotation Map',
    'window.map.nav_heading'
);

Window_map.prototype._$create_ui = function () {
    
    var _factory = KALS_window.ui;
    
    var _ui = _factory.panel('window-map');
        
    var _map = $('<div></div>')
        .addClass('my-div')
        .appendTo(_ui);
 

	_map.hover(function () {
		_map.toggleClass('focus');
	}, function () {
		_map.toggleClass('focus');
	});

	var _map_ol = $("<ul class='H1'></ul>");
	
	
	
	// 4. 把<ol>列表貼到div中
	_map_ol.prependTo(_map);
	var _last_level = "H1";
	var _last_level_number = 1;
	
	var _count = 0;
	
	//建立文章和小地圖中header位置所存放的array
	var _header_array = new Array();
	var _map_array = new Array();
	
	
	// 5. 為所有找到的h1，建立<li>，貼到ol中 (迴圈)
	var _search_scope = KALS_text.get_selector().find("h1,h2,h3");
	_search_scope.each(function (_key, _ele) {
		
		
		//將找到的header加上id
		$(_ele).attr("id", "map-header"+ _count);
		
		var _header = $(_ele);
		var _level = _header.attr("tagName"); 
		var _level_number = parseInt(_level.substr(1));
		
		if (_count == 0) {
			_last_level = _level;
			_last_level_number = _level_number;
		}
		
		var _li = $("<li class=" +_level+ " ></li>");
	

		
		//var _li = $("<li class='" +_level+ "' id=header"+count+"    ></li>");
		var _header_text = _header.text();
		_li.html("<a href='#map-header"+ _count +"'>"+ _header_text + "</a><ul></ul>");
		
		
		_header_array[_count] = _header.offset().top;		
		
		
		//判斷上一個_level是否相同
		if (_count == 0) {
			_li.addClass("map-header");
			_li.appendTo(_map_ol);
			
			_map_array[_count] = _li.offset().top;
		}
		else if (_level != _last_level && _last_level_number < _level_number) {
			_li.addClass("map-header");
			
			var _last_li = _map_ol.find("li."+_last_level+":last");
			var _last_li_ul = _last_li.children("ul:last");
			if (_last_li_ul.length == 0) {
				_last_li_ul = $("<ul></ul>").appendTo(_last_li);
			}
			_li.appendTo(_last_li_ul);
			
			_map_array[_count] = _li.offset().top;
			
			
		}
		else if (_level != _last_level && _last_level_number > _level_number) {
			_li.addClass("map-header");
			
			var _last_li = _map_ol.find("li."+_level+":last");
			_li.insertAfter(_last_li);
			
			_map_array[_count] = _li.offset().top;
		}
		else if (_level != "H1" && _level == _last_level) {
			var _last_li = _map_ol.find("li."+_level+":last");
			_li.addClass("map-header");
			_li.insertAfter(_last_li);
			
			_map_array[_count] = _li.offset().top;
			
		}
		else {
			_li.addClass("map-header");
			_li.appendTo(_map_ol);
			
			_map_array[_count] = _li.offset().top;
		}
		
		_last_level_number = _level_number;
		_last_level = _level;
		
		
		_count++;
		
	});
	
	//$.test_msg("header_array", _header_array);
	//$.test_msg("_map_array", _map_array);
	
	
	//依所瀏覽位置highlight小地圖中的標題
	var _scroll_event = function() {
		var _offset = $( window ).scrollTop();
		
		_count = 0;
		_first_top = null;
		
		_map.find('.map-header').each(function (_key, _ele) {
			
			if (_count == 0) {
				_first_top = $(_ele).offset().top;
			}
			
			if( _offset >= _header_array[_count] 
				&& ( (_header_array.length == _count+1) || (_offset < _header_array[_count+1]) ) ){
				
				$(_ele).addClass("highlight");
				
				//_highlight = $("#header"+count+"").position().top;
				
				
				var _div = _map.parents(".dialog-content:first");
				var _top = $(_ele).offset().top;
				_top = _top - _first_top;
				
				if (_map.hasClass('focus') == false) {
					_div.scrollTop( _top );
				}
				//$.test_msg('scroll map', _top);
				
				//alert("count="+count+"   _highlight="+_highlight);
			}
			
			else {
				$(_ele).removeClass("highlight");
			}

			_count++;
		});
	
	};
	
	$(window).scroll(_scroll_event);
	_scroll_event(); 
    return _ui;
};

/* End of file Window_filter */
/* Location: ./system/application/views/web_apps/Window_filter.js */