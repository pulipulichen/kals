/**
 * List_menu_block
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/30 下午 08:11:03
 * @extends {List_menu}
 * @param {List_item} _item
 * @param {String[]} _disable_option
 */
function List_menu_block(_item, _disable_option) {
    
    List_menu.call(this, _item, _disable_option);
    
}

List_menu_block.prototype = new List_menu();

/**
 * Create UI
 * @memberOf {List_menu_block}
 * @type {jQuery} UI
 */
List_menu_block.prototype._$create_ui = function ()
{
    var _ui = List_menu.prototype._$create_ui.call(this);
    _ui.addClass('list-menu-block');
    return _ui;
};

/* End of file List_menu_block */
/* Location: ./system/application/views/web_apps/List_menu_block.js */