/**
 * Window_content_submit_loading
 * 視窗內容中，遞交表單設定
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2014/11/11 下午 01:27:17
 * @extends {Dialog_option}
 */
function Window_content_submit_loading(){
    
    Window_content_submit.call(this);
    
}

Window_content_submit_loading.prototype = new Window_content_submit();

/**
 * 遞交表單的名稱
 * @type String
 */
Window_content_submit_loading.prototype.name = "loading";

/**
 * 遞交按鈕的語系參數。
 * @type {KALS_language_param}
 */
Window_content_submit_loading.prototype.lang = new KALS_language_param(
    'LOADING',
    'window.loading'
);

/**
 * 建立UI
 * @returns {jQuery}
 */
Window_content_submit_loading.prototype._$create_ui = function () {
    //var _ui = Window_content_submit.prototype._$create_ui.call(this);
    //_ui.attr("disabled", "disabled");
    
    Window_content_submit.prototype._$create_ui.call(this);
    var _ui = Dialog_disabled_option.prototype._$create_ui.call(this);
    _ui.addClass('window-content-submit')
            .addClass("brown");
    
    return _ui;
};

/* End of file Window_content_submit_loading */
/* Location: ./system/application/views/web_apps/Window_content_submit_loading.js */