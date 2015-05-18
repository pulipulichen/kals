/**
 * List_menu_search
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/30 下午 08:11:03
 * @extends {List_menu_block}
 * @param {List_item} _item
 * @param {String[]} _disable_option
 */
function List_menu_search(_item, _disable_option) {
    
    List_menu_block.call(this, _item, _disable_option);
    
}

List_menu_search.prototype = new List_menu_block();

///**
// * 顯示完整的日期
// */
//List_menu_search.prototype.timestamp_full_dispaly = true;

///**
// * Create UI
// * @memberOf {List_menu_search}
// * @type {jQuery} UI
// */
//List_menu_search.prototype._$create_ui = function () {
//    var _ui = List_menu.prototype._$create_ui.call(this);
//    _ui.addClass('list-menu-block');
//    return _ui;
//};

/**
 * 預設不使用的功能
 * @author Pulipuli Chen 20141111
 * @type Array<String>
 */
List_menu_search.prototype._default_disable_option = [];

/* End of file List_menu_search */
/* Location: ./system/application/views/web_apps/List_menu_search.js */