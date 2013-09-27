/**
 * List_collection_gesture
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
function List_collection_gesture() {
    
    List_collection_other.call(this);
    
}

List_collection_gesture.prototype = new List_collection();

List_collection_gesture.prototype._$name = 'gesture';

List_collection_gesture.prototype._$target_my = null;

List_collection_gesture.prototype._$target_like = null;

List_collection_gesture.prototype._$need_login = null;

/* End of file List_collection_gesture */
/* Location: ./system/application/views/web_apps/List_collection_gesture.js */