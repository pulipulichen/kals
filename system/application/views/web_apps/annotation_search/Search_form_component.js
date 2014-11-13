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
    
    var _ui = $('<table class="search-form"><tbody><tr><td class="input"></td></tr></tbody></table>')
		.addClass("search-component");
    
    if ($.is_null(this._window_search)) {
        this._window_search = KALS_context.search;
    }

//    var _tr = _ui.find("tr:first");
//
//    //var _range_td = $("<td></td>")
//    //	.addClass("range")
//    //	.appendTo(_tr); 
//
//    var _input_td = $("<td></td>")
//            .addClass("input")
//            .appendTo(_tr);
    
    var _input_td = _ui.find("td.input:first");

    var _init_container = $("<div />").addClass(this._classname_init)
            .appendTo(_input_td);

    var _range = this._create_range_ui()
            .appendTo(_init_container);

    var _type = this._create_type_ui()
            .hide()
            .appendTo(_init_container);
		
    var _input = this._create_input()
		.appendTo(_init_container);
    
    var _submit = this._create_submit()
		.appendTo(_init_container);
    
    var _init_searched = $("<div />").addClass(this._classname_searched)
            .appendTo(_input_td);
    
    var _clear = this._create_clear_search()
		.appendTo(_init_searched);
        
    var _open = this._create_open_search()
		.appendTo(_init_searched);
    
    this._init_listener();
    
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
 * @type {Window_search}
 */
Search_form_component.prototype._window_search = null;

/**
 * 初始化的表單
 * @type String
 */
Search_form_component.prototype._classname_init = "search-form-init";

/**
 * 搜尋完之後的表單
 * @type String
 */
Search_form_component.prototype._classname_searched = "search-form-searched";

/**
 * 建立輸入框
 * 
 * 採用Window_search.create_keyword_ui
 * @author 20131114 Pulipuli Chen
 * @type {jQuery}
 */
Search_form_component.prototype._create_input = function () {
    var _ui = this._window_search.create_keyword_ui();
    this._keyword = _ui;
    _ui.keypress(function (_e) {
        
        if (_e.which === 13) {   //13表示enter鍵
        
            var _submit = _ui.parents('.input:first')
                .find('.dialog-option:first')
                .focus()
                .click();
        }
    });
    return _ui;
	/*
    var _input = $('<input type="text" placeholder="Search..." name="keyword" class="search-form-input" />');
    
    KALS_context.lang.add_listener(_input, new KALS_language_param('Search...'
        , 'toolbar.search.input_placeholder'));
    
    _input.placeHeld();
    
    return _input;
    */
};

/**
 * 關鍵字的輸入
 * @author Pulipuli Chen 20141113
 * @type jQuery
 */
Search_form_component.prototype._keyword = null;

/**
 * 開啟搜尋視窗，進行搜尋
 * @returns {jQuery}
 * @author Pulipuli Chen
 */
Search_form_component.prototype._create_submit = function () {
    
    var _this = this;
    var _click_callback = function () {
        //$.test_msg("Search_component advanced");
        //_this._window_search.open_window();

        var _ui = _this.get_ui();

        var _range = _ui.find("[name='search_range']").val();
        var _type = _ui.find("[name='type']").val();
        var _keyword = _ui.find("[name='keyword']").val();

        if (_keyword !== "") {
            _this._window_search.search({
                "search_range": _range,
                "keyword": _keyword,
                "type": _type
            });	
        }
        else {
            _this._window_search.open_window();
        }
        
//        _this.find("." + _this._classname_init).hide();
//        _this.find("." + _this._classname_searched).show();
    };

    
    var _submit = (new Dialog_option("", _click_callback)).get_ui();
//    _submit.empty()
//       .addClass("search-form-submit");
    
    _submit.addClass("search-form-submit")
            .empty();
    
    //var _submit = $('<button type="button" class="search-form-submit"></button>')
    //    .append(KALS_context.get_image_url('search.gif'));
    
    return _submit;
};

/**
 * 開啟搜尋視窗，不重新搜尋
 * @returns {jQuery}
 * @author Pulipuli Chen 20141113
 */
Search_form_component.prototype._create_open_search = function () {
    
    var _this = this;
    var _click_callback = function () {
        _this._window_search.open_window();
    };
    
    var _submit = (new Dialog_option('', _click_callback)).get_ui();
    _submit.addClass("search-form-submit")
            .empty();
	
    return _submit;
};

/**
 * 重置搜尋功能
 * @returns {jQuery}
 * @author Pulipuli Chen 20141113
 */
Search_form_component.prototype._create_clear_search = function () {
    
    var _this = this;
    var _click_callback = function () {
//        
//        
//        
//        //_this._window_search.open_window();
        _this._window_search.clear_search_result();
    };
    
    var _lang = new KALS_language_param(
                "Clear Search Result",
                "window.search.clear_search_result"
            );
    
    var _submit = (new Dialog_option(_lang, _click_callback)).get_ui();
    _submit.addClass("search-form-reset");

    return _submit;
};

/**
 * 建立搜尋範圍的選單
 * @tyep {jQuery}
 */
Search_form_component.prototype._create_range_ui = function () {

    var _search = this._window_search;

    var _search_range = _search.create_range_ui("dropdown");
    this._search_range = _search_range;

    return _search_range;
};

/**
 * 範圍
 * @author Pulipuli Chen 20141113
 * @type jQuery
 */
Search_form_component.prototype._search_range = null;

/**
 * 建立標註類別的選單
 * @tyep {jQuery}
 */
Search_form_component.prototype._create_type_ui = function () {

    var _search = this._window_search;

    var _search_type = _search.create_annotation_type_ui("dropdown").hide();
    this._type = _search_type;

    return _search_type;
};

/**
 * 選擇類型
 * @author Pulipuli Chen 20141113
 * @tyep {jQuery}
 */
Search_form_component.prototype._type = null;

/**
 * 初始化監聽者
 * @author Pulipuli Chen 20141113
 * @returns {Search_form_component.prototype}
 */
Search_form_component.prototype._init_listener = function () {
    
    var _this = this;
    this._window_search.add_listener("search", function () {
        //$.test_msg("切換");
        _this._toggle_mode(_this._classname_searched);
        var _search_option = KALS_context.search.get_search_option();
        _this._setup_search_option(_search_option);
    });
    
    this._window_search.add_listener("clear", function () {
        //$.test_msg("切換 2");
        _this._toggle_mode(_this._classname_init);
    });
    
    return this;
};

/**
 * 切換搜尋模式
 * @param {String} _mode
 * @returns {Search_form_component.prototype}
 */
Search_form_component.prototype._toggle_mode = function (_mode) {
    
    if (_mode === this._classname_init) {
        this.find("." + this._classname_init).show();
        this.find("." + this._classname_searched).hide();
    }
    else {
        this.find("." + this._classname_init).hide();
        this.find("." + this._classname_searched).show();
    }
    
    return this;
};

/**
 * 設定參數
 * @param {JSON} _search_option
 * @returns {Search_form_component}
 */
Search_form_component.prototype._setup_search_option = function (_search_option) {
    
    //$.test_msg("Search_form_component._setup_search_option()", _search_option);
    
    this._search_range.val(_search_option.search_range);
    this._keyword.val(_search_option.keyword);
    
    if (typeof(_search_option.type) === "undefined") {
        this._type.val(_search_option.type);
    }
    return this;
};

/* End of file Search_form_component */
/* Location: ./system/application/views/web_apps/Search_form_component.js */