/**
 * Loading_component
 *
 * @package		KALS
 * @category		Webpage Application Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/8/20 下午 08:53:35
 */

/**
 * @memberOf {Loading_component}
 * @extends {Other_class}
 * @constructor
 */
function Loading_component(_callback) {
    
    this.setup_ui(_callback);
    
    return this;
}

/**
 * UI
 * @memberOf {Loading_component}
 * @type {jQuery}
 */
Loading_component.prototype.ui = null;

/**
 * Method Name
 *
 * @memberOf {Loading_component}
 * @param {function} _callback
 */
Loading_component.prototype._setup_ui = function (_callback)
{
    var _loading_img = KALS_context.get_image_url('ajax-loader.gif')
        .css('margin-right', '5px'); 
    var _loading_lang = KALS_context.lang.create_listener('NOW LOADING...', 'toolbar.loading_message');
    var _ui = $('<span></span>')
        .addClass('toolbar-loading')
        .append(_loading_img)
        .append(_loading_lang);
    
    this.ui = _ui;
    
    if ($.is_function(_callback))
        _callback();
    return this;
};
/* End of file Loading_component */
/* Location: ./system/application/views/web_apps/Loading_component.js */