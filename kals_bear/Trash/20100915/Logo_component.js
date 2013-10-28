/**
 * Logo_component
 *
 * @package		KALS
 * @category		Webpage Application Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/8/20 下午 08:37:25
 */

/**
 * @memberOf {Logo_component}
 * @extends {Other_class}
 * @constructor
 */
function Logo_component(_callback) {

    this._setup_ui(_callback);

    return this;
}

/**
 * UI
 * @memberOf {Logo_component}
 * @type {jQuery}
 */
Logo_component.prototype.ui = null;

/**
 * 建立UI
 *
 * @memberOf {Logo_component}
 * @param {function} _callback
 */
Logo_component.prototype._setup_ui = function (_callback)
{
    var _ui = $('<div class="kals-logo">KALS!</div>');
    
    this.ui = _ui;
    
    
    if ($.is_function(_callback))
        _callback();
    
    return this;
};

/* End of file Logo_component */
/* Location: ./system/application/views/web_apps/Logo_component.js */