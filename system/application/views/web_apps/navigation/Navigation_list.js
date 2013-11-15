/**
 * Navigation_list
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 09:44:10
 * @memberOf {Navigation_list}
 * @extends {KALS_user_interface}
 * @constructor
 */
function Navigation_list() {
    
    KALS_user_interface.call(this);
    
    this._$nav_items = [];
    
}

// Extend from KALS_user_interface
Navigation_list.prototype = new KALS_user_interface();

Navigation_list.prototype._ui_nav = null;
Navigation_list.prototype._ui_menu = null;
Navigation_list.prototype._$classname = null;

/**
 * 決定是否要顯示說明
 * @type {boolean} 
 */
Navigation_list.prototype._$show_help = true;
Navigation_list.prototype._help_lang = new KALS_language_param(
    'Help',
    'toolbar.navigation_list.help'
);


/**
 * 決定是否要顯示錯誤回報
 * @type {boolean} 
 */
Navigation_list.prototype._$show_feedback = true;
Navigation_list.prototype._feedback_lang = new KALS_language_param(
    'Feedback',
    'toolbar.navigation_list.feedback'
);

/**
 * 主要設定。子類別請覆寫此屬性。
 * @type {Window_content[]}
 */
Navigation_list.prototype._$nav_items = [];

/**
 * Create UI
 * @memberOf {Navigation_list}
 * @type {jQuery} UI
 */
Navigation_list.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass('navigation-list');
    
    if (this._$classname !== null) {
		_ui.addClass(this._$classname);
	}
    
    var _nav = this._create_nav();
    var _menu_button = this._create_menu();
    
    _ui.append(_nav)
        .append(_menu_button);
    
    return _ui;
};

Navigation_list.prototype._create_nav = function() {
    
    var _ui = $('<table align="right"><tbody><tr></tr></tbody></table>')
        .addClass('nav');
    
    var _tr = _ui.find('tr:first');
    var _this = this;
    for (var _i in this._$nav_items) {
        var _content = this._get_window_content(_i); 
        
        var _td = $('<td></td>')
            .addClass('item')
            .appendTo(_tr);
        
        //if (_i === 0)
        //    _td.addClass('first');
        
        var _a = $('<a href="#"></a>')
            .appendTo(_td)
            .addClass(_content.name)
            .attr('content_index', _i);

        KALS_context.lang.add_listener(_a, _content.nav_heading);
        
        _a.click(function() {
            
            var _i = $(this).attr('content_index');
            //var _content = _this._$nav_items[_i];
            var _content = _this._get_window_content(_i);
            
			if (_content.is_absolute() === false) {
                //$.test_msg('Navigation_list._create_nav call content', [$.get_class(_content), _content.nav_heading.msg]);

                KALS_window.setup_window(_content);
			}
			else {
				//KALS_util.confirm('test', "content");
				_content.open();
			}
            
            return false;
        });
    }
    
    if (this._$show_help === true) {
        this._setup_help().appendTo(_tr);
    }
	if (this._$show_feedback === true) {
        this._setup_feedback().appendTo(_tr);
    }
    
	_ui.find('td:last').addClass('last');
    
    return _ui;
};

/**
 * 建立說明按鈕
 * @type jQuery
 */
Navigation_list.prototype._setup_help = function () {
	_td = $('<td></td>')
        .addClass('item');
            
    _a = $('<a href="#"></a>')
        .appendTo(_td)
        .addClass('help');

    KALS_context.lang.add_listener(_a, this._help_lang);
    
    _a.click(function() {
        
        KALS_util.help();
        
        return false;
    });
	
	return _td;
};

/**
 * 建立錯誤回報按鈕
 * @type jQuery
 */
Navigation_list.prototype._setup_feedback = function () {
    _td = $('<td></td>')
        .addClass('item');
            
    _a = $('<a href="#"></a>')
        .appendTo(_td)
        .addClass('feedback');

    KALS_context.lang.add_listener(_a, this._feedback_lang);
    
    _a.click(function() {
        
        KALS_context.feedback.open();
        
        return false;
    });
    
    return _td;
};

Navigation_list.prototype._get_window_content = function (_index) {
    
    if (typeof(this._$nav_items[_index]) == 'undefined') {
		return null;
	}
	else 
		if (typeof(this._$nav_items[_index]) == 'string') {
			var _window_content = this._$nav_items[_index];
			eval('var _content = new ' + _window_content + '()');
			return _content;
		}
		else 
			if (typeof(this._$nav_items[_index]) == 'object') {
				_window_content = this._$nav_items[_index];
				return _window_content;
			}
			else {
				return null;
			}
}; 

Navigation_list.prototype._create_menu = function() {
    
    var _ui = $('<button></button>')
        .addClass('menu');
    
    var _lang_param = new KALS_language_param(
        'Options',
        'toolbar.navigation_list.menu'
    );
    
    KALS_context.lang.add_listener(_ui, _lang_param);
    
    var _options = [];
    for (var _i in this._$nav_items) {
        //var _content = this._$nav_items[_i];
        var _content = this._get_window_content(_i);
        var _option = new Dialog_close_option(_content.nav_heading, function (_content) {
            
            //setTimeout(function() {
                // TODO Navigation_list.create_menu() 這邊很有可能出錯，請務必檢查
                KALS_window.setup_window(_content);    
            //}, 1000);
            
            
        }, _content);
        
        //$.test_msg('Navigation_list._create_menu() option classname', _content.name);
        _option.add_class(_content.name);
        
        _options.push(_option);
    }
    
    if (this._$show_help === true) {
        _option = new Dialog_close_option(this._help_lang, function () {
            KALS_util.help();
        });
        _option.add_class('help');
        _options.push(_option);
    }
    
    var _config = {
        heading: _lang_param,
        options: _options
    };
    
    _ui.click(function () {
        KALS_util.select_menu(_config);
    });
    
    return _ui;
};

/**
 * @type {Array|KALS_window}
 */
Navigation_list.prototype.get_nav_items = function () {
	return this._$nav_items;
};

/* End of file Navigation_list */
/* Location: ./system/application/views/web_apps/Navigation_list.js */
