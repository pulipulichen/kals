/**
 * Window_style
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 10:56:17
 * @extends {Window_content}
 */
function Window_style() {
    
    Window_content.call(this);
    
    this.submit = new Window_style_submit();
    
}

Window_style.prototype = new Window_content();

Window_style.prototype.name = 'Login';

Window_style.prototype.lang = new KALS_language_param (
    'Style Setting',
    'window.style.heading'
);

Window_style.prototype.nav_heading = new KALS_language_param (
    'Style Setting',
    'window.style.nav_heading'
);

Window_style.prototype._$create_ui = function () {
    
    var _ui = $('<div>' + 'Window_style' +  '</div>');
    
    // TODO Window_style._$create_ui();
    
    return _ui;
};

/* End of file Window_style */
/* Location: ./system/application/views/web_apps/Window_style.js */