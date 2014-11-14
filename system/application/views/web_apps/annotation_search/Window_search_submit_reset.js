/**
 * Window_search_submit_reset
 * 視窗內容中，遞交表單設定
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2014/11/13 下午 01:27:17
 * @extends {Dialog_option}
 */
function Window_search_submit_reset(){
    
    Window_content_submit.call(this);
    
}

Window_search_submit_reset.prototype = new Window_content_submit();

/**
 * 遞交表單的名稱
 * @type String
 */
Window_search_submit_reset.prototype.name = "reset";

/**
 * 遞交按鈕的語系參數。
 * @type {KALS_language_param}
 */
Window_search_submit_reset.prototype.lang = new KALS_language_param(
    "Reset Search Result",
    "window_search.reset_search_result"
);

/**
 * 建立UI
 * @returns {jQuery}
 */
Window_search_submit_reset.prototype._$create_ui = function () {
    //var _ui = Window_content_submit.prototype._$create_ui.call(this);
    //_ui.attr("disabled", "disabled");
    
    Window_content_submit.prototype._$create_ui.call(this);
    var _ui = Dialog_option.prototype._$create_ui.call(this);
    _ui.addClass('window-content-submit');
    
    return _ui;
};

/**
 * 遞交時，清除搜尋功能
 * @returns {Window_search_submit}
 */
Window_search_submit_reset.prototype.submit = function () {
    //KALS_context.search.reset_search();
    this._content.reset_search();
    return this;
};

/* End of file Window_search_submit_reset */
/* Location: ./system/application/views/web_apps/Window_search_submit_reset.js */