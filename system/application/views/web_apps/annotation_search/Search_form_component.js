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

    var _field = this._create_query_field_input();
            //.appendTo(_init_container);

    var _type = this._create_annotation_type_input()
            .hide()
            .appendTo(_init_container);
		
    var _input = this._create_query_value_input();
		//.appendTo(_init_container);
    
    var _search_submit_button = this._create_search_submit_button();
		//.appendTo(_init_container);
    this._search_submit_button = _search_submit_button;
    
    var _search_container = $("<span></span>").addClass("ui action mini icon input")
            .append(_input)
            .append(_field)
            .append(_search_submit_button)
            .appendTo(_init_container);
    
    var _init_searched = $("<div />").addClass(this._classname_searched)
            .appendTo(_input_td);
    
    var _reset = this._create_reset_search_button()
		.appendTo(_init_searched);
        
    var _open = this._create_open_search()
		.appendTo(_init_searched);
    
    this._init_listener();
    
    return _ui;
};

///**
// * 開啟搜尋視窗按鈕
// * @author Pulipuli Chen 20131113
// * @return {jQuery}
// */
//Search_form_component.prototype._create_advanced_link = function () {
//    
//    var _ui = $('<span class="link"></span>');
//    
//    KALS_context.lang.add_listener(_ui, new KALS_language_param('ADVANCED SEARCH'
//        , 'toolbar.search.advanced_search'));
//    
//    _ui.addClass('advanced-link');
//	
//    var _this = this;
//    _ui.click(function () {
//        //$.test_msg("Search_component advanced");
//        _this._window_search.open_window();
//    });
//	
//    return _ui;
//};

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
Search_form_component.prototype._create_query_value_input = function () {
    var _ui = this._window_search.create_query_value_input();
    this._query_value_input = _ui;
    
    var _this = this;
    _ui.keypress(function (_e) {
        
        if (_e.which === 13) {   //13表示enter鍵
        
//            var _submit = _ui.parents('.input:first')
//                .find('.dialog-option:first')
//                //.focus()
//                .click();
            //_this._search_submit.click();
            _this._submit_search();
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
Search_form_component.prototype._query_field_input = null;

/**
 * 關鍵字的輸入
 * @author Pulipuli Chen 20141113
 * @type jQuery
 */
Search_form_component.prototype._query_value_input = null;

/**
 * 建立按鈕：開啟搜尋視窗，進行搜尋
 * @returns {jQuery}
 * @author Pulipuli Chen
 */
Search_form_component.prototype._create_search_submit_button = function () {
    
    var _this = this;
    var _click_callback = function () {
        
        _this._submit_search();
        
        //$.test_msg("Search_component advanced");
        //_this._window_search.open_window();

//        var _ui = _this.get_ui();
//
//        var _query_field = _this._query_field_input.val();
//        var _query_value = _this._query_value_input.val();
//        if (_query_field === "annotation_type") {
//            _query_value = _this._annotation_type_input.val();
//        }
//
//        if (_query_value !== "") {
//            _this._window_search.search({
//                "query_field": _query_field,
//                "query_value": _query_value
//            });	
//        }
//        else {
//            _this._window_search.open_window(function () {
//                KALS_window.loading_complete();
//            });
//        }
        
//        _this.find("." + _this._classname_init).hide();
//        _this.find("." + _this._classname_searched).show();
    };

    
    var _lang = new KALS_language_param(
                '<i class="search icon"></i>',
                'window_search.search_icon'
            );
    
    //var _submit = (new Dialog_option(_lang, _click_callback)).get_ui();
    var _submit = $('<button class="ui icon button" .type="button"><i class="search icon"></i></button>')
            .click(_click_callback);
//    _submit.empty()
//       .addClass("search-form-submit");
    
//    _submit.addClass("search-form-submit")
//            //.html('<i class="fa fa-search"></i>');
//            .html('<i class="search icon"></i>');
    
    _submit.addClass("search-form-submit")
            .addClass(KALS_CONFIG.theme.button);
    
    //var _submit = $('<button type="button" class="search-form-submit"></button>')
    //    .append(KALS_context.get_image_url('search.gif'));
    
    return _submit;
};

/**
 * 開啟搜尋視窗，進行搜尋
 * @author Pulipuli Chen 20141114
 */
Search_form_component.prototype._submit_search = function () {
    
    //$.test_msg("Search_component advanced");
    //_this._window_search.open_window();

//    var _ui = this.get_ui();

    var _query_field = this._query_field_input.val();
    var _query_value = this._query_value_input.val();
    if (_query_field === "annotation_type") {
        _query_value = this._annotation_type_input.val();
    }

    if (_query_value !== "") {
        this._window_search.search({
            "query_field": _query_field,
            "query_value": _query_value
        });	
    }
    else {
        this._window_search.open_window(function () {
            KALS_window.loading_complete();
        });
    }
    
    return this;
};

/**
 * 開啟搜尋視窗，不重新搜尋
 * @returns {jQuery}
 * @author Pulipuli Chen 20141113
 * @author Pulipuli Chen 20141113 rename checked
 */
Search_form_component.prototype._create_open_search = function () {
    
    var _this = this;
    var _click_callback = function () {
        _this._window_search.open_window();
    };
    
    var _lang = new KALS_language_param(
                '<i class="search icon"></i>',
                'window_search.search_icon'
            );
    
    var _submit = (new Dialog_option(_lang, _click_callback)).get_ui();
    _submit.addClass("search-form-submit")
            .addClass("compact");
//            .html('<i class="fa fa-search"></i>');
	
    return _submit;
};

/**
 * 重置搜尋功能
 * @returns {jQuery}
 * @author Pulipuli Chen 20141113
 * @author Pulipuli Chen 20141113 rename checked
 */
Search_form_component.prototype._create_reset_search_button = function () {
    
    var _this = this;
    var _click_callback = function () {
//        
//        
//        
//        //_this._window_search.open_window();
        _this._window_search.reset_search();
    };
    
    var _lang = new KALS_language_param(
                "Reset Search Result",
                "window_search.reset_search_result"
            );
    
    var _submit = (new Dialog_option(_lang, _click_callback)).get_ui();
    _submit.addClass("search-form-reset")
        .addClass("compact");

    return _submit;
};

/**
 * 建立搜尋範圍的選單
 * @tyep {jQuery}
 * @author Pulipuli Chen 20141113 rename checked
 */
Search_form_component.prototype._create_query_field_input = function () {

    var _search = this._window_search;

    var _input = _search.create_query_field_input("dropdown");
    _input.addClass("ui compact selection dropdown");
    
    var _this = this;
    _input.change(function () {
        if (this.value === "annotation_type") {
            _this._query_value_input.hide();
            _this._annotation_type_input.show();
        }
        else {
            _this._query_value_input.show();
            _this._annotation_type_input.hide();
        }
    });
    
    this._query_field_input = _input;

    return _input;
};
    
/**
 * 建立標註類別的選單
 * @tyep {jQuery}
 * @author Pulipuli Chen 20141113 rename checked
 */
Search_form_component.prototype._create_annotation_type_input = function () {

    var _search = this._window_search;

    var _search_type = _search.create_annotation_type_input("dropdown").hide();
    this._annotation_type_input = _search_type;

    return _search_type;
};

/**
 * 選擇類型
 * @author Pulipuli Chen 20141113
 * @tyep {jQuery}
 * @author Pulipuli Chen 20141113 rename checked
 */
Search_form_component.prototype._annotation_type_input = null;

/**
 * 初始化監聽者
 * @author Pulipuli Chen 20141113
 * @returns {Search_form_component.prototype}
 * @author Pulipuli Chen 20141113 rename checked
 */
Search_form_component.prototype._init_listener = function () {
    
    var _this = this;
    this._window_search.add_listener("search", function () {
        //$.test_msg("切換");
        _this._toggle_mode(_this._classname_searched);
        var _search_option = KALS_context.search.get_search_option();
        _this._setup_search_option(_search_option);
    });
    
    this._window_search.add_listener("reset", function () {
        //$.test_msg("切換 2");
        _this._toggle_mode(_this._classname_init);
    });
    
    return this;
};

/**
 * 切換搜尋模式
 * @param {String} _mode
 * @returns {Search_form_component.prototype}
 * @author Pulipuli Chen 20141113 rename checked
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
 * @author Pulipuli Chen 20141113 rename checked
 */
Search_form_component.prototype._setup_search_option = function (_search_option) {
    
    //$.test_msg("Search_form_component._setup_search_option()", _search_option);
    
    this._query_field_input.val(_search_option.query_field);
    
    if (_search_option.query_value === "*") {
        _search_option.query_value = "";
    }
    
    if (_search_option.query_field === "annotation_type") {
        this._query_value_input.hide();
        this._annotation_type_input.show();
        this._annotation_type_input.val(_search_option.query_value);
    }
    else {
        this._query_value_input.show();
        this._annotation_type_input.hide();
        this._query_value_input.val(_search_option.query_value);
    }
    
    if (typeof(_search_option.annotation_type) === "undefined") {
        this._annotation_type_input.val(_search_option.annotation_type);
    }
    return this;
};

/* End of file Search_form_component */
/* Location: ./system/application/views/web_apps/Search_form_component.js */