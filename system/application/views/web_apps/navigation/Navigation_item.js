/**
 * Navigation_item
 * 
 * 選單按鈕
 *
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) Expression year is undefined on line 7, column 33 in Templates/KALS/KALS_JavaScript_Class.js., Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2014/1/18 下午 12:19:43
 */

/**
 * @memberOf {Navigation_item}
 * @extends {KALS_user_interface}
 * @param {KALS_language_param|String} _lang 語系檔
 * @param {String} _classname 設定類別名稱
 * @constructor
 */
function Navigation_item(_lang, _classname) {
    
    if ($.isset(_lang)) {
        //$.test_msg("nav item 安裝 lang", _lang);
        this.set_lang(_lang);
    }
    if ($.isset(_classname)) {
        this.set_classname(_classname);
    }
    
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Navigation_item}
 */
Navigation_item.prototype = new KALS_user_interface();

/**
 * 顯示在標題列的語系檔
 * @memberOf {Navigation_item}
 * @type {KALS_language_param}
 */
Navigation_item.prototype._lang;

//Navigation_item.prototype.attribute = null;

/**
 * 設定語系檔
 * @param {KALS_language_param} _lang 語系檔
 * @memberOf {Navigation_item}
 */
Navigation_item.prototype.set_lang = function (_lang) {
    //$.test_msg("nav_item.set_lang()", _lang.msg);
    if (_lang === undefined) {
        return this;
    }
    else if ($.is_string(_lang)) {
        _lang = new KALS_language_param(_lang);
    }
    
    this._lang = _lang;
    return this;
};


/**
 * Create UI
 * @memberOf {Navigation_item}
 * @type {jQuery} UI
 */
Navigation_item.prototype._$create_ui = function () {
    var _ui = $("<a href='#'></a>")
            //.html(1212)
            .addClass("navigation-item");
            //.append(KALS_context.lang.create_listener(this._lang));
    
    KALS_context.lang.add_listener(_ui, this._lang);
    //$.test_msg("Nav item $create_ui", _ui.html());
    
    if ($.is_string(this._classname)) {
        _ui.addClass(this._classname);
    }
    
    var _this = this;
    _ui.click(function () {
//        
//        /**
//         * 加上Log記錄
//         * @author Pulipuli Chen 20141210
//         */
//        KALS_util.log('navigation_item.click', {
//            classname: _this.name
//        });
//        
        _this.callback();
    });
    
    return _ui;
};

/**
 * 設定回呼函數
 * @param {Function} _func
 * @returns {Navigation_item}
 */
Navigation_item.prototype.set_callback = function (_func) {
    if ($.is_function(_func)) {
        this.callback = _func;
    }
    else if ($.is_string(_func) && $.is_link(_func)) {
        this.callback = function () {
            location.href = _func;
        };
    }
    return this;
};

/**
 * 設定連結
 * @param {String} _link
 * @returns {Navigation_item.prototype}
 */
Navigation_item.prototype.set_link = function (_link) {
    if ($.is_string(_link) && $.is_link(_link)) {
        this.callback = function () {
            location.href = _link;
        };
    }
    return this;
};

/**
 * 設定開啟新視窗的連結
 * @param {String} _link
 * @returns {Navigation_item.prototype}
 */
Navigation_item.prototype.set_link_new_window = function (_link) {
    if ($.is_string(_link) && $.is_link(_link)) {
        this.callback = function () {
            window.open(_link, "_blank");
        };
    }
    return this;
};

/**
 * 回呼函數
 */
Navigation_item.prototype.callback = function () {};

Navigation_item.prototype._classname = null;

/**
 * 設定類別名稱
 * @param {String} _classname
 * @returns {Navigation_item.prototype}
 */
Navigation_item.prototype.set_classname = function (_classname) {
    if ($.is_string(_classname)) {
        this._classname = _classname;
    }
    return this;
};

Navigation_item.prototype.nav_item = true;

/* End of file Navigation_item */
/* Location: ./system/application/views/web_apps/Navigation_item.js */