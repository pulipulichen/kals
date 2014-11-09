/**
 * Toolbar_toggle_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/9/14 下午 07:22:53
 * @extends {KALS_user_interface}
 */
function Toolbar_toggle_component() {
    
    KALS_user_interface.call(this);

}

Toolbar_toggle_component.prototype = new KALS_user_interface();

Toolbar_toggle_component.prototype._$create_ui = function () {
    
    var _ui = $('<div class="toolbar-toggle"></div>');
    
    var _button = $('<button type="button"  class="toolbar-toggle-button"> : : : : </button>')
        .appendTo(_ui);
    
    //var _this = this;
    _button.click(function () {
        KALS_toolbar.toggle_toolbar();
    });
    
    return _ui;  
};

Toolbar_toggle_component.prototype.hide = function (_instant) {
    
    var _ui = this.get_ui();
    _ui.addClass('hidden');
    
    if (_instant === true) {
        _ui.hide();
    }
    else {
        //_ui.slideUp();
        _ui.fadeOut();
    }
    
    return this;
};

Toolbar_toggle_component.prototype.show = function (_instant) {
    
    var _ui = this.get_ui();
    _ui.removeClass('hidden');
    
    if (_instant === true) {
        _ui.show();
    }
    else {
        //_ui.slideDown();
        _ui.fadeIn();
    }
    
    return this;
};

Toolbar_toggle_component.prototype.is_show = function () {
    var _ui = this.get_ui();
    
    return !_ui.hasClass('hidden');
};

/* End of file Toolbar_toggle_component */
/* Location: ./system/application/views/web_apps/Toolbar_toggle_component.js */