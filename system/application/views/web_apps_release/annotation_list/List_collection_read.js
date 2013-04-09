/**
 * List_collection_read
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
function List_collection_read() {
    
    List_collection.call(this);
    
}

List_collection_read.prototype = new List_collection();

List_collection_read.prototype._$name = 'read';

List_collection_read.prototype._$target_read = true;

List_collection_read.prototype._$limit = null;

List_collection_read.prototype._$target_topic = true;

List_collection_read.prototype._$target_my = false;

List_collection_read.prototype._$need_login = true;

/* End of file List_collection_read */
/* Location: ./system/application/views/web_apps/List_collection_read.js */