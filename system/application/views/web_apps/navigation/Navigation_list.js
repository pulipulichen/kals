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
 * 導覽類型
 * 
 * 類型包括：
 * - common: 不管什麼類型都會顯示(在以下三種類型中都會顯示)
 * - profile: 以手動登入的使用者才會顯示
 * - embed: 以內嵌登入的使用者才會顯示
 * - anonymous: 未登入的使用者才會顯示
 * - null: 不列入在目前的導覽列
 * @type String
 */
Navigation_list.prototype._$nav_type = null;

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
    
    //$.test_msg("Nav_list._$create_ui", _ui.html());
    return _ui;
};

/**
 * 建立導覽列
 * @returns {jQuery}
 */
Navigation_list.prototype._create_nav = function() {
    
    var _ui = $('<table align="right"><tbody><tr></tr></tbody></table>')
        .addClass('nav');
    
    var _tr = _ui.find('tr:first');
    //var _this = this;
    //$.test_msg("$nav_items_count", [this._$nav_type, this._$nav_items.length]);
    for (var _i in this._$nav_items) {
        var _td = $('<td></td>')
            .addClass('item')
            .appendTo(_tr);
        
        var _content = this._get_window_content(_i); 
        
        var _a;
        
        //$.test_msg("nav item " + _i + " content ", [this._$nav_type, _i, _content === null, _content.name, _content._$name]);
        if ($.is_null(_content) === false
                && _content.nav_item !== undefined 
                && $.is_boolean(_content.nav_item) 
                && _content.nav_item === true) {
            //$.test_msg("nav item " + _i, 1);
            _a = this._create_nav_item(_content, _i);
            //$.test_msg("Nav_list._create_nav_item", _a.html());
        }
        else {
            //$.test_msg("nav item " + _i, 2);
            _a = this._create_window_nav_item(_content, _i);
        }
        
        _a.appendTo(_td);
    }
    
    if (this._$show_help === true) {
        this._setup_help().appendTo(_tr);
    }
	
    // 插入錯誤回報功能
    //if (this._$show_feedback === true) {
    //    if (KALS_CONFIG.)
    //    this._setup_feedback().appendTo(_tr);
    //}
    
    _ui.find('td:last').addClass('last');
    
    return _ui;
};

/**
 * 建立Windows_content系列的按鈕
 * @param {type} _i
 * @returns {jQuery}
 */
Navigation_list.prototype._create_window_nav_item = function (_content, _i) {
        
    //if (_i === 0)
    //    _td.addClass('first');

    var _a = $('<a href="#"></a>')
        .addClass(_content.name)
        .attr('content_index', _i);

    if ($.isset(_content.nav_heading)) {
        //$.test_msg("Nav_list._create_window_nav_item() nav_heading", _content.nav_heading);
        KALS_context.lang.add_listener(_a, _content.nav_heading);
    }
    else if ($.isset(_content._$nav_heading)) {
        //$.test_msg("Nav_list._create_window_nav_item() _$nav_heading", _content._$nav_heading);
        _content._lang_filter();
        KALS_context.lang.add_listener(_a, _content._$nav_heading);
    }

    var _this = this;
    _a.click(function() {

        var _i = $(this).attr('content_index');
        //var _content = _this._$nav_items[_i];
        var _content = _this._get_window_content(_i);
        
        /**
         * 加上Log記錄
         * @author Pulipuli Chen 20141210
         */
        KALS_util.log( _content.name + '.open');

        if (typeof(_content.callback) === "function") {
            _content.callback();
        }
        else if (typeof(_content._$nav_click_callback) === "function") {
            _content._$nav_click_callback();
        }
        else if (_content.is_absolute() === false) {
            //$.test_msg('Navigation_list._create_nav call content', [$.get_class(_content), _content.nav_heading.msg]);
            //KALS_window.setup_window(_content);
            _content.open();
        }
        else {
            //KALS_util.confirm('test', "content");
            _content.open();
        }

        return false;
    });
    
    return _a;
};

/**
 * 建立Navigation系列的按鈕
 * @param {Navigation_item} _content
 * @param {Number} _i
 * @returns {jQuery}
 */
Navigation_list.prototype._create_nav_item = function  (_content, _i) {
    var _ui = _content.get_ui();
    _ui.attr("content_index", _i);
    //$.test_msg("Nav_list._create_nav_item", _ui.html());
    return _ui.clone(true);
    //return _content.get_ui();
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
    
    if (typeof(this._$nav_items[_index]) === 'undefined') {
        return null;
    }
    else if (typeof(this._$nav_items[_index]) === 'string') {
        var _window_content = this._$nav_items[_index];
        eval('var _content = new ' + _window_content + '()');
        return _content;
    }
    else if (typeof(this._$nav_items[_index]) === 'object') {
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

/**
 * 從KALS_config.navigation取得資料，加入_$nav_items中
 * @returns {Navigation_list}
 */
Navigation_list.prototype._init_module_nav_items = function () {
    var _nav_type = this._$nav_type;
    
    if (typeof(_nav_type) !== "string" 
            && $.is_array(_nav_type) === false) {
        return this;
    }
    
    //return this;
    
    var _list = KALS_context.navigation.get_list(_nav_type);

    //$.test_msg("_init_module_nav_items", [_nav_type, _list.length]);
    for (var _i in _list) {
        //$.test_msg("_init_module_nav_items", _i);
        var _item = _list[_i];
        //$.test_msg("init $nav_items.length", [_nav_type, this._$nav_items.length, _item.name]);
        this._$nav_items.push(_item);
    }
    
    return this;
};

/* End of file Navigation_list */
/* Location: ./system/application/views/web_apps/Navigation_list.js */
