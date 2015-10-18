/**
 * Toolbar_padding_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/4 下午 09:22:02
 * @extends {KALS_user_interface}
 */
function Toolbar_padding_component() {
    
    KALS_user_interface.call(this);
    
}

// Extend from KALS_user_interface
Toolbar_padding_component.prototype = new KALS_user_interface();

/**
 * 開頭隔開的空格，高度要設定跟Toolbar一樣高
 * @author Pudding 20151018
 * @memberOf {Toolbar_padding_component}
 * @type {jQuery} UI
 */
Toolbar_padding_component.prototype._$create_ui = function () {
    var _ui = $('<div class="toolbar-padding KALS"></div>')
            .css("height", 0);
    
    var _set_height_from_toolbar = function () {
        var _height = KALS_toolbar.get_height();
        _ui.height(_height);
    };
    
    $(window).resize(_set_height_from_toolbar);
    KALS_context.add_once_listener(_set_height_from_toolbar);
    return _ui;
};

/* End of file Toolbar_padding_component */
/* Location: ./system/application/views/web_apps/Toolbar_padding_component.js */