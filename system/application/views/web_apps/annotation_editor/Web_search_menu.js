/**
 * Web_search_menu
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2013/7/1 下午 02:59:42
 */
function Web_search_menu() {
    Tooltip_modal.call(this);
}

// Extend from KALS_user_interface
Web_search_menu.prototype = new Tooltip_modal();

/**
 * Create UI
 * @memberOf {Web_search_menu}
 * @type {jQuery} UI
 */
Web_search_menu.prototype._$create_ui = function () {

    var _ui = $("<ul></ul>")
            .addClass("web-search")
            .addClass("menu")
            .hide()
            .attr("id" , this._menu_id);
    //var _ui = this._create_tooltip_prototype({
    //    id: this._menu_id,
    //    classname: 'web-search-menu'
    //});
    
    var _first = true;
    
    var _li;
    var _first_li;
    for (var _label in KALS_CONFIG.web_search_url) {
        var _url = KALS_CONFIG.web_search_url[_label];
        _li = this._create_option(_label, _url);
        _li.appendTo(_ui);
        
        if (_first === true) {
            var _this = this;
            _first_li = _li;
            KALS_context.ready(function () {
                _this._set_select_option(_first_li);
            });
        }
        
        _first = false;
    }
    _li.addClass("last");
    
    // 測試用
    _ui.appendTo($("body"));

    return _ui;
};

/**
 * 建立選項
 * @param {String} _label
 * @param {String} _url
 * @returns {jQuery}
 */
Web_search_menu.prototype._create_option = function (_label, _url) {
    var _li = $("<li></li>")
        .addClass("option");
    
    _li.html($('<div class="label">' + _label +"</div>"));
    
    _li.attr("web_search_url", _url);
    
    var _this = this;
    _li.click(function () {
        _this._set_select_option($(this));
    });
    
    _li.hover(function() {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });
    
    return _li;
};

/**
 * 設定要選擇的選項
 * @param {HTMLElement} _option
 * @returns {Web_search_menu}
 */
Web_search_menu.prototype._set_select_option = function (_option) {
    var _selected_classname = "selected";
    this.get_ui("." + _selected_classname).removeClass(_selected_classname);
    $(_option).addClass(_selected_classname);
    this._selected_option = _option;
    
    //$.test_msg("設定了！", _option.html());
    
    this.notify_listeners("change");
    return this;
};

/**
 * 被選擇的項目
 * @type jQuery
 */
Web_search_menu.prototype._selected_option = null;

/**
 * 取得被選擇的項目
 * @returns {jQuery}
 */
Web_search_menu.prototype.get_selected_option = function () {
    return this._selected_option;
};

// ---------------------------------------

/**
 * type menu id
 * @type {String}
 */
Web_search_menu.prototype._menu_id = 'editor_web_search_menu';

/**
 * 改寫設定
 * @returns {JSON}
 */
Web_search_menu.prototype._$get_config = function () {
    
    var _selector = '#' + this._menu_id + ':first';
    
    var _config = Tooltip_modal.prototype._$get_config.call(this, _selector);
    
    _config.position = 'bottom right';
    //_config.offset = [-50, -13];
    _config.offset = [-30, -18];
    _config.events = {def: 'mouseover, mouseleave' };
    
//    var _onbeforeshow;
//    if (typeof(_config.onBeforeShow) === 'function') {
//        _onbeforeshow = _config.onBeforeShow;
//    }
//        
//    var _this = this;
//    _config.onBeforeShow = function () {
//        _this._on_before_show(this, _onbeforeshow);
//    };
    
    _config.relative = true;
    
    return _config;
};

/* End of file Web_search_menu */
/* Location: ./system/application/views/web_apps/Web_search_menu.js */