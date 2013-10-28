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
 * Create UI
 * @memberOf {Toolbar_padding_component}
 * @type {jQuery} UI
 */
Toolbar_padding_component.prototype._$create_ui = function () {
    var _ui = $('<div class="toolbar-padding"></div>');
    return _ui;
};

/* End of file Toolbar_padding_component */
/* Location: ./system/application/views/web_apps/Toolbar_padding_component.js */