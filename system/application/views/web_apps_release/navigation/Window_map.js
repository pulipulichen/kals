/**
 * Window_filter
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
function Window_map() {
    
    Window_content.call(this);
    
    this._setup_submit(new Window_filter_submit());
    
}

Window_map.prototype = new Window_content();

Window_map.prototype.name = 'Map';

Window_map.prototype.width = 500;

Window_map.prototype.heading = new KALS_language_param (
    'Map',
	'window.map.nav_heading'
);

Window_map.prototype.nav_heading = new KALS_language_param (
    'Map',
	'window.map.nav_heading'
);

Window_map.prototype._$load_config = 'Window_map';


/**
 * Create UI
 * @memberOf {Window_profile}
 * @type {jQuery} UI
 */

Window_map.prototype._$create_ui = function () {
    
    var _ui = KALS_window.ui.panel('window-map');

    var _factory = KALS_window.ui; 

 
    
    return _ui;
};

/* End of file Window_filter */
/* Location: ./system/application/views/web_apps/Window_filter.js */
