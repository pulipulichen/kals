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

    this.child("menu", new Web_search_menu());
}

// Extend from KALS_user_interface
Web_search_component.prototype = new Event_dispatcher();

/**
 * Create UI
 * @memberOf {Web_search_component}
 * @type {jQuery} UI
 */
Web_search_component.prototype._$create_ui = function () {
    
    var _ui_container = $("<span></span>")
            .addClass("web-search-container");
    
    var _ui = $("<span></span>")
            .addClass("web-search")
            .addClass("button")
            .addClass("dialog-option")
            .appendTo(_ui_container);

    if (typeof(KALS_CONFIG.web_search_url) !== "undefined"
            && (KALS_CONFIG.web_search_url === false
            || KALS_CONFIG.web_search_url === "disable")) {
        _ui_container.hide();
        return _ui;
    }

    var _this = this;

//    // 設定語系
//    var _lang = new KALS_language_param(
//        "Web Search",
//        "web_search"
//    );
//
//    KALS_context.lang.add_listener(_ui, _lang);
    
//    //設定按下去之後的效果
//    var _web_search_button = _lang;
//    var _web_search_url = "http://www.google.com/search?q={query}";
//    if (typeof(KALS_CONFIG.web_search_url) === "string") {
//        _web_search_url = KALS_CONFIG.web_search_url;
//    }
//    //https://www.google.com.tw/#safe=off&site=&source=hp&q=test&oq=test&gs_l=hp.3..0l10.1094.1687.0.2052.4.4.0.0.0.0.45.155.4.4.0.eqrwrth..0.0.0..1.1.15.hp.rh1WD0sToJU&qscrl=1&bav=on.2,or.r_cp.&bvm=bv.47244034,d.dGI&fp=543fd01eff5ed8d6&biw=950&bih=934

    _ui.click(function () {
        _this._search_action()
    });

    _ui.hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });
    
    var _menu = this.menu;
    _menu.get_ui();
    _menu.appendTo(_ui_container);
    var _config = _menu._$get_config();
    _ui_container.tooltip(_config);
    KALS_context.ready(function () {
        //$.test_msg("準備ok");
        _this._init_listener();
    });

    return _ui_container;
};

// -----------------------------

Web_search_component.prototype._search_action = function () {
    //var _query = "test";
    var _query = KALS_text.selection.select.get_anchor_text();
    _query = encodeURI(_query);
    var _web_search_url = this.get_web_search_url();
    var _url = $.str_replace("{query}", _query, _web_search_url) ;

    var _search_win = window.open(_url, '_blank');
    return this;
};

/**
 * 取得要搜尋的對象
 * @returns {String}
 */
Web_search_component.prototype.get_web_search_url = function () {
    return this.get_button().attr("web_search_url");
};

/**
 * 取得搜尋按鈕
 * @returns {jQuery}
 */
Web_search_component.prototype.get_button = function () {
    return this.get_ui(".button");
};

/**
 * 監聽menu事件
 * @returns {Web_search_component}
 */
Web_search_component.prototype._init_listener = function () {
    var _this = this;
    
    this.menu.add_instant_listener("change", function (_menu) {
        //$.test_msg("Web_search_component _init_listener 設定開始");
        _this._set_button_from_menu();
    });
    
    this.menu.add_listener("click", function (_menu) {
        _this._search_action();
    });
    
    return this;
};

Web_search_component.prototype._set_button_from_menu = function () {
    var _menu = this.menu;
    var _selected_option = _menu.get_selected_option();
    if (_selected_option === null) {
        return this;
    }
    var _label = _selected_option.text();
    var _url = _selected_option.attr("web_search_url");

    this.set_button(_label, _url);
    return this;
};

/**
 * 設定按鈕
 * @param {String} _label
 * @param {String} _url
 * @returns {Web_search_component.prototype}
 */
Web_search_component.prototype.set_button = function (_label, _url) {
    var _ui = this.get_button();
    
    var _label_limit = 10;
    if (_label.length > _label_limit) {
        _label = _label.substring(0, _label_limit) + "...";
    }
    
    _ui.text(_label);
    _ui.attr("web_search_url", _url);
    
    return this;
};

// --------------------------------

/**
 * 選單
 * @type Web_search_menu
 */
Web_search_component.prototype.menu = null;

/* End of file Web_search_component */
/* Location: ./system/application/views/web_apps/Web_search_component.js */