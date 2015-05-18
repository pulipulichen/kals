/**
 * List_collection_my
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/27 下午 09:03:09
 * @extends {List_collection}
 */
function List_collection_my() {
    
    List_collection.call(this);
    
}

List_collection_my.prototype = new List_collection();

List_collection_my.prototype._$name = 'my';

List_collection_my.prototype._$target_my = true;

List_collection_my.prototype._$limit = null;

List_collection_my.prototype._$order_by = 'create';

List_collection_my.prototype._$enable_check_login = true;

List_collection_my.prototype._$need_login = true;

/**
 * 新增時從頭新增嗎？
 * @type boolean true=從頭; false=從尾巴
 */
List_collection_my.prototype._$default_add_item_from_head = false;

/* End of file List_collection_my */
/* Location: ./system/application/views/web_apps/List_collection_my.js */