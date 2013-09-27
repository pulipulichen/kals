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
    
    Window_content.call(this);
    
    //this._setup_submit(new Window_filter_submit());
    
}

Window_map.prototype = new Window_content();

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
 /*   
    var _my_input = $('<label><input type="checkbox" name="map" value="my" checked="true" /> <span></span></label>')
        .appendTo(_my_div);
    
    var _my_label = _my_input.find('span')
        .addClass('kals-word my_importance');
    var _my_lang = new KALS_language_param(
        'My annotations',
        'window.map.content.option.my'
    ); 
    KALS_context.lang.add_listener(_my_label, _my_lang);
    
    // ---------
    
    //設定勾選my_input時，就勾選底下全部選項，或是取消全部選項
    var _my_checkbox = _my_input.find('input');
    
    // ---------
    
    var _my_type_div = $('<table><tbody></tbody></table>')
        .addClass('my-type-div')
        .appendTo(_my_div);
        
    // 2010.11.16 因為指定type顯示的功能很麻煩，所以先不作
    _my_type_div.hide();
    
    var _types = Annotation_type_param._type_mapping;
    var _type_lang_header = Type_menu.prototype._type_lang_header;
    
    var _type_inputs = [];
    for (var _i in _types)
    {
        var _type = _types[_i];
        
        var _type_input = $('<td><label><input type="checkbox" name="map" value="my_'+_type+'" checked="true" /> <span></span></label></td>');
        _type_inputs.push(_type_input);
            
        var _type_label = _type_input.find('span')
            .addClass('my_' + _type + ' kals-word');
        
        var _type_lang = new KALS_language_param(
            _type,
            _type_lang_header + _type
        );
        
        KALS_context.lang.add_listener(_type_label, _type_lang);
        
        var _type_checkbox = _type_input.find('input');
        _type_checkbox.change(function () {
            var _inputs = _my_type_div.find('input');
            var _state = null;
            for (var _i = 0; _i < _inputs.length; _i++)
            {
                var _checked = _inputs.eq(_i).attr('checked');
                if (_state == null)
                {
                    _state = _checked;
                }
                else if (_state != _checked)
                {
                    _state = 'half';
                    break;
                }
            }
            
            if (_state != 'half')
            {
                _my_checkbox.attr('checked', _state);
            }
            else
            {
                _my_checkbox.attr('checked', false);
                _my_checkbox.attr('disabled', true);
            }
        });
    }
    
    var _tr;
    for (var _i in _type_inputs)
    {
        if (_i % 2 == 0)
        {
            _tr = $('<tr></tr>')
                .appendTo(_my_type_div);
        }
        
        var _type_input = _type_inputs[_i];
        _type_input.appendTo(_tr);
        
        if (_i == _type_inputs && _i % 2 == 0)
        {
            _type_input.attr('colspan', 2);
        }
    }
    
    // ---------
    
    //勾選全部
    _my_checkbox.change(function () {
        var _checked = this.checked;
        
        var _inputs =  _my_type_div.find('input');
        _inputs.attr('checked', _checked);
    });
    /*
    _my_input.click(function (_event) {
        var _disabled = _my_checkbox.attr('disabled');
        
        if (_disabled == true)
        {
            _event.preventDefault();
            
            _my_checkbox.attr('disabled', false)
                .attr('checked', true)
                .change();
        }
    });
    */
  /*  
    //如果登出狀態，則隱藏
    KALS_context.auth.add_listener(function (_auth) {
        var _inputs = _my_div.find('input');
        if (_auth.is_login())
            _inputs.attr('disabled', false);
        else
            _inputs.attr('disabled', true);
    }, true);
    
    // ---------
    
    //設定登入跟權限檢查
    
    var _nav_div = $('<div></div>')
        .addClass('nav-div')
        .appendTo(_ui);
    
    var _nav_input = $('<label><input type="checkbox" name="map" value="nav" checked="true" /> <span></span></label>')
        .appendTo(_nav_div);
    
    var _nav_label = _nav_input.find('span')
        .addClass('kals-word nav_great');
    
    var _nav_lang = new KALS_language_param(
        'Recommend annotations',
        'window.map.content.option.navigation'
    ); 
    KALS_context.lang.add_listener(_nav_label, _nav_lang);
    
    KALS_context.policy.add_attr_listener('show_navigation', function (_policy) {
        var _input = _nav_div.find('input');
        if (_policy.allow_show_navigation())
            _input.attr('disabled', false);
        else
            _input.attr('disabled', true);
    });
*/    
    return _ui;
};

/* End of file Window_filter */
/* Location: ./system/application/views/web_apps/Window_filter.js */