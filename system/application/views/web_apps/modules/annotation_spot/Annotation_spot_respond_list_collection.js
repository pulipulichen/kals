/**
 * Annotation_spot_respond_list_collection
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/8 下午 04:23:50
 * @extends {View_respond_list_collection}
 */
function Annotation_spot_respond_list_collection(_topic_item) {
    
    View_respond_list_collection.call(this, _topic_item);

}

Annotation_spot_respond_list_collection.prototype = new View_respond_list_collection();

Annotation_spot_respond_list_collection.prototype.create_list_item = function(_param) {
    return new Annotation_spot_list_item_respond(_param, this._topic_item);
};

/* End of file Annotation_spot_respond_list_collection */
/* Location: ./system/application/views/web_apps/Annotation_spot_respond_list_collection.js */