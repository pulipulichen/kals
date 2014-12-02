/**
 * Window_loading_component
 * Window中顯示讀取畫面的元件
 * 
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/9/9 下午 01:27:02
 * @extends {KALS_user_interface}
 */
function Window_loading_component() {
    
    this.base();
    
}

Window_loading_component.prototype = new KALS_user_interface();
Window_loading_component.prototype.base = KALS_user_interface;

Window_loading_component.prototype._$create_ui = function () {
        
    var _loading_img = KALS_context.get_image_url('ajax-loader.gif');
    var _ui = $('<div class="window-loading"></div>')
        .append(_loading_img);
    
    var _loading_span = $('<span></span>')
            .addClass("window-loading-message")
            .prependTo(_ui);
    var _loading_lang = new KALS_language_param(
        'NOW LOADING...',
        'window.loading'
    );
    KALS_context.lang.add_listener(_loading_span, _loading_lang);
    
    return _ui;
};    //Window_loading_component = KALS_user_interface.extend({

/* End of file Window_loading_component */
/* Location: ./system/application/views/web_apps/Window_loading_component.js */