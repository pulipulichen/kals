/**
 * View_respond_list_collection
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/8 下午 04:23:50
 * @extends {Respond_list_collection}
 */
function View_respond_list_collection(_topic_item) {
    
    Respond_list_collection.call(this, _topic_item);

}

View_respond_list_collection.prototype = new Respond_list_collection();

View_respond_list_collection.prototype._$limit = null;

View_respond_list_collection.prototype.create_list_item = function(_param) {
    return new View_list_item_respond(_param, this._topic_item);
};

/**
 * 排序的方向。
 * @type {string} desc|asc，如果是null，則由系統預設
 */
View_respond_list_collection.prototype._$direction = 'asc';

View_respond_list_collection.prototype._$enable_check_login = false;

/**
 * 新增時從頭新增嗎？
 * @type boolean
 */
View_respond_list_collection.prototype._$default_add_item_from_head = false;

/* End of file View_respond_list_collection */
/* Location: ./system/application/views/web_apps/View_respond_list_collection.js */