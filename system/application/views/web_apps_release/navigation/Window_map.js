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
    
    Dialog_modal.call(this);
    
	//var _this = this;
	//setTimeout(function () {
	//	_this.open();
	//	$.test_msg("Open MAP!!");
	//}, 1000);
    //this._setup_submit(new Window_filter_submit());
	
}


//Window_map.prototype = new Window_content();
// 先繼承Overlay_modal
Window_map.prototype = new Dialog_modal();

// 多重繼承自Window_content
var _windows_content_prototype = new Window_content();
for (var _i in _windows_content_prototype) {
	Window_map.prototype[_i] = _windows_content_prototype[_i];
}
	
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

/**
 * 獨立視窗
 * 
 * 如果是false，則會依附在KALS_window底下
 * 如果是true，則會直接open
 */
Window_map.prototype._$absolute = true;

Window_map.prototype._$create_ui = function () {
    
    var _factory = KALS_window.ui;
	
    var _ui = this._$create_ui_prototype();
	_ui.addClass("overlay-map");
    _ui.append(_factory.panel('window-map'));

	
	_ui.addClass('dialog-modal')
		.addClass('KALS').addClass('window')
        .html('<table align="center" class="dialog-table" height="100%" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody>'
        + '<tr class="dialog-toolbar-tr"><th class="dialog-toolbar" valign="middle">'
            + '<table class="dialog-toolbar-table" width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tbody><tr>'
            + '<td class="toolbar-options toolbar-backward"></td>'
            + '<td class="dialog-heading"></td>'
            + '<td class="toolbar-options toolbar-forward"></td>'
            + '</tr></tbody></table>'
        + '</th></tr>' 
        + '<tr class="dialog-content-tr"><td class="dialog-content-td">'
            + '<div class="dialog-content"></div></td></tr>'
        + '</tbody></table>');
	
	//_ui.css('font-size', '20pt');
	

        
    var _map = $('<div></div>')
        .addClass('content')
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
			
			if( _offset >= _header_array[_count]-10 
				&& ( (_header_array.length == _count+1) || (_offset < _header_array[_count+1]-10) ) ){
				
				$(_ele).addClass("highlight");
				
				//_highlight = $("#header"+count+"").position().top;
				
				
				var _div = _map;
				//.parents(".dialog-content:first");
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

	//$("<div>121212112121</div>").appendTo(_ui);
	
	_ui.appendTo("body");
    var _config = this._$get_config();
    _ui.overlay(_config);	//jQuery TOOL Overlay
	
	var _this = this;
	setTimeout(function () {
		
		var _close_option = new Dialog_close_option();
	    _this.set_forward_option(_close_option);
	}, 0);
	
	//設定可拖曳
    var _draggable_config = {
        handle: 'div.annotation-tool-header'	//TODO 請調整handle
        
    };
    
	//設定游標變成手指
	$('.dialog-heading').css( 'cursor', 'pointer' );
	
    if ($('body').height() > _ui.height() + 100) {
        _draggable_config.containment = 'parent';
    }
    
    _ui.draggable(_draggable_config);
	
    return _ui;
};



/**
 * 開啟視窗
 * 
 * 加入一些設定，才能順利開啟視窗
 * @param {function} _callback
 */
Window_map.prototype.open = function (_callback) {
	
	// 加入open()之前需要的設定
	// 參考KALS_util.confirm()

    var _modal = this;
    /**
     * 用來擺放回呼函數使用
     * @type {function}
     */
    _modal.confirm_callback = null;

    
    var _id = 'Confirm_' + $.create_id();
    this.set_modal_name(_id);
	var _ui = this.get_ui();
    _ui.attr('id', _id);

    _modal.set_heading("map");
    //_modal.set_content("asasa");
    
    if ($.is_function(_callback)) {
		_modal.confirm_callback = _callback;
	}
	else {
		_modal.confirm_callback = null;
	}
        
    //_modal.open();
	
	// 用原來的方式執行open
	//$.test_msg("Window_map.open()", this.is_opened());
	return Dialog_modal.prototype.open.call(this, _callback);
};

/**
 * @type {object}
 */
Window_map.prototype._$get_config = function () {
    
	var _config = Dialog_modal.prototype._$get_config.call(this);
	
	// http://jquerytools.org/documentation/overlay/
	_config.top = "5px";
	_config.left = "800px";
	
    return _config; 
};

/* End of file Window_filter */
/* Location: ./system/application/views/web_apps/Window_filter.js */