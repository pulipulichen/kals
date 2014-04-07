/**
 * KALS_view_manager
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pulipuli Chen <pulipuli.chen@gmai.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license	   http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2013/11/21 下午 09:02:21
 * @extends {JSONP_dispatcher}
 */
function KALS_view_manager(){
    
    JSONP_dispatcher.call(this);
}

KALS_view_manager.prototype = new JSONP_dispatcher();

KALS_view_manager.prototype._$context_register = 'KALS_view_manager';

/**
 * 取得樣板
 * @param {String} _index
 * @type {String}
 */
KALS_view_manager.prototype.get_view = function (_index) {
    //$.test_msg('KALS_view_manager', this._data);
	//return JSONP_dispatcher.prototype.get_field.call(this, _index);
	var _view = JSONP_dispatcher.prototype.get_field.call(this, _index);
        if (_view === undefined) {
            _view = "{{kals-lang:kals_framework.view_config_error}}";
        }
	var _classname = this._get_view_classname(_index);
	_view = $("<span>" + _view + "<span>")
	   .addClass('KALS')
	   .addClass("kals-view")
	   .addClass(_classname);
	_view = this._view_initialize(_view, _index);
	return _view;
};

/**
 * 將index轉換成classname
 * @param {String} _index
 * @param {String} _replace 要取代的變數
 */
KALS_view_manager.prototype._get_view_classname = function (_index, _replace) {
	if (_replace === undefined) {
		_replace = '-';
	}
	return _index.replace(/[\W|\_]/g, _replace).toLowerCase();
};

/**
 * KALS自訂的事件
 */
KALS_view_manager.prototype._kals_events = KALS_CONFIG.view.kals_events;

/**
 * 取得語言
 * @param {jQuery} _view
 * @param {String}
 * @type {jQuery}
 */
KALS_view_manager.prototype._view_initialize_language = function(_view, _index) {
	
	//var _container = $("<div></div>").append(_view);
	var _kals_lang = _view.find('*[kals-lang]');
	var _view_classname = this._get_view_classname(_index, '_');
	_view_classname = 'view.' + _view_classname + '.';
	//$.test_msg('parse lang', [_kals_lang.length, _view.html()]);
	
	_kals_lang.each(function (_index, _ele) {
		_ele = $(_ele);
		
		var _text = _ele.html();
		var _line = _ele.attr('kals-lang');
		
		if (KALS_context.lang.has_line(_line)) {
			KALS_context.lang.add_listener(_ele, new KALS_language_param(_text, _line));
		}
		else if (KALS_context.lang.has_line(_view_classname + _line)) {
			KALS_context.lang.add_listener(_ele, new KALS_language_param(_text, _view_classname + _line));
		}
	});
	
	return _view;
};

/**
 * 特殊樣板初始化
 * @param {jQuery} _view
 * @param {String} _index
 */
KALS_view_manager.prototype._view_initialize = function (_view, _index) {
	
	_view = this._view_initialize_text(_view);
	
	var _init_attrs = this._init_attrs;
	//$.test_msg('init template', _init_attrs);
	for (var _i in _init_attrs) {
		//$.test_msg('init template', _init_attrs[_i]);
		_view = this._view_initialize_attr(_view, _init_attrs[_i]);
	}
	
    _view = this._view_initialize_language(_view, _index);
	
	return _view;
};

/**
 * 需要初始化的屬性
 */
KALS_view_manager.prototype._init_attrs = KALS_CONFIG.view.init_attrs;

/**
 * 取得使用的屬性名稱
 */
KALS_view_manager.prototype.get_attr_names = function () {
	return this._init_attrs();
};

/**
 * KALS自訂的屬性名稱
 * @type {jQuery}
 */
KALS_view_manager.prototype._kals_attrs = KALS_CONFIG.view.kals_attrs;

/**
 * 取得KALS自訂的屬性名稱
 * @type {jQuery}
 */
KALS_view_manager.prototype.get_kals_atts = function () {
	return this._kals_attrs;
};

/**
 * 需要初始化的事件名稱
 */
KALS_view_manager.prototype._event_names = KALS_CONFIG.view.event_names;

/**
 * 取得需要初始化的事件名稱
 */
KALS_view_manager.prototype.get_event_names = function () {
	return this._event_names;
};

/**
 * 找尋變數的規則
 * @type {RegExp}
 */
KALS_view_manager.prototype._view_regular_expression = KALS_CONFIG.view.regular_expression;

/**
 * 初始化文字的部份
 * @param {Object} _view
 */
KALS_view_manager.prototype._view_initialize_text = function (_view) {
	
	var _this = this;
	var _lang_prefix = 'kals-lang:';
	_view.find(':contains("{{")').filter(':contains("}}")').each(function (_index, _ele) {
        var _jquery_ele = $(_ele);
        
        _jquery_ele.contents()
          .filter(function () {
            return this.nodeType !== 1;
          })
          .filter(function () {
            return ((this.textContent.indexOf("{{") !== -1) 
			 && (this.textContent.indexOf("}}") !== -1) );
          })
          .wrap("<span class='kals-field-parent'></span>")
          .each(function (_content_index, _content_ele) {
            
            var _jquery_content_ele = $(_content_ele);
            var _text = _jquery_content_ele.text();
            //alert(_text);
            //_text = _text.replace(/\{\$[]}/g);
            //_jquery_content_ele.text("??");
            //_jquery_content_ele.remove();
            
            _text = _text.replace(_this._view_regular_expression, function (_match) {
                var _field_name = _match.substr(2, _match.length-4);
				/*
				var _needle = 'kals-lang:';
				return '<span kals-field="' + _field_name + '" kals-field-origin-value="'+_match+'">' + _match + "</span>";
				*/
				if ($.starts_with(_field_name, _lang_prefix)) {
					var _line_index = _field_name.substr(_lang_prefix.length, _field_name.length - _lang_prefix.length);
					var _line = KALS_context.lang.line(_line_index);
					
					return '<span kals-lang="' + _line_index + '">' + _line + "</span>";
				}
				else {
					return '<span kals-field="' + _field_name + '">' + _match + "</span>";
				}
            });
            
            //_text = "???";
            
            _jquery_content_ele.parent().html(_text);
        });
    });
	
	_view.find('[kals-field]').each(function (_index, _ele) {
		var _j_ele = $(_ele);
		_j_ele.attr('kals-field-origin-value', _j_ele.html());
	});
	
	return _view;
};

/**
 * 初始化class的部份
 * @param {Object} _view
 */
KALS_view_manager.prototype._view_initialize_attr = function (_view, _attr_name) {
	
	var _this = this;
	/*
	if (_attr_name == 'style') {
		
		//$.test_msg('init attr', [_attr_name, _view.find('['+_attr_name+'*="{{"]')
        //    .filter('['+_attr_name+'*="}}"]').length]);
		var _found = _view.find('['+_attr_name+'*="{{"]');
		$.test_msg('init attr', [_attr_name, _found.length]);
		
		_found.eq(0).each(function(_i, _e) {
			$.test_msg('style', _e.style);
			
		});
	}  
	*/
    _view.find('['+_attr_name+'*="{{"]')
	   .filter('['+_attr_name+'*="}}"]')
	   .each(function (_index, _ele) {
	   	   $.test_msg('init attr', [_attr_name]);
	       var _jquery_ele = $(_ele);
	       var _origin_value = _jquery_ele.attr(_attr_name);
	       var _field_name_array = _origin_value.match(_this._view_regular_expression);
	       
	       
	       for (var _i in _field_name_array) {
	          var _name = _field_name_array[_i];
	          _name = _name.substr(2, _name.length -3); 
	          _field_name_array[_i] = _name;
	       }
	       
	       var _field_name = _field_name_array.join(' '); 
	       
	       _jquery_ele.attr("kals-attr-" + _attr_name , _field_name);
	       _jquery_ele.attr("kals-attr-" + _attr_name + "-origin-value", _origin_value);
	   });
    
    return _view;
};

/* End of file KALS_view_manager */
/* Location: ./system/application/views/web_apps/KALS_view_manager.js */