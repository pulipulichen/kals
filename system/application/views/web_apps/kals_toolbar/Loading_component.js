/**
 * Loading_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/9/16 上午 10:57:33
 * @extends {KALS_user_interface}
 */
function Loading_component() {
    
    KALS_user_interface.call(this);
}

Loading_component.prototype = new KALS_user_interface();

/**
 * 建立讀取中的清單
 * @returns {jQuery}
 */
Loading_component.prototype._$create_ui = function () {
    
    var _ui = $('<div class="loading-component">'
        + '<span class="progress"></span>'
        + '<span class="message"></span>'
        + '<span class="image"></span>'
        + '</div>');
    
    //加入計算Percent數量
    var _progress_ui = _ui.find(".progress");
    setTimeout(function () {
        KALS_context.progress.add_listener(function (_progress) {
            var _percent = _progress.get_percent(true);
            _progress_ui.html(_percent);
        });
    }, 5000);
        
    
    var _message = _ui.find('.message');
    KALS_context.lang.add_listener(_message, new KALS_language_param('LOADING...',
        'toolbar.loading_message'));
    
    _ui.find('.image').append(KALS_context.get_image_url('ajax-loader.gif'));
    //$.test_msg('loading component');
    
    
    return _ui;
    
};

/* End of file Loading_component */
/* Location: ./system/application/views/web_apps/Loading_component.js */