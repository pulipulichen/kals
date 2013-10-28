/**
 * Selectable_blank_word
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/19 下午 03:11:24
 * @extends {KALS_user_interface}
 */
function Selectable_blank_word() {
    
    KALS_user_interface.call(this);
    
}

// Extend from KALS_user_interface
Selectable_blank_word.prototype = new KALS_user_interface();

/**
 * Create UI
 * @memberOf {Selectable_blank_word}
 * @type {jQuery} UI
 */
Selectable_blank_word.prototype._$create_ui = function ()
{
    var _ui = $('<div></div>');
    return _ui;
};

/**
 * Attribute description about attribute.
 * @memberOf {Selectable_blank_word}
 * @type {Object}
 */
Selectable_blank_word.prototype.attribute = null;

//Selectable_blank_word.prototype.attribute = null;

/* End of file Selectable_blank_word */
/* Location: ./system/application/views/web_apps/Selectable_blank_word.js */