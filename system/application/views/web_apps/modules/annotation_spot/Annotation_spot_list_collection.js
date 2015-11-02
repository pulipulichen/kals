/**
 * Annotation_spot_list_collection
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2015/11/2 下午 03:36:17
 * @extends {List_collection}
 */
function Annotation_spot_list_collection() {
    
    List_collection.call(this);
    
}

Annotation_spot_list_collection.prototype = new List_collection();

Annotation_spot_list_collection.prototype._$name = 'view-list';

Annotation_spot_list_collection.prototype._$target_my = true;

Annotation_spot_list_collection.prototype._$target_like = false;

Annotation_spot_list_collection.prototype._$enable_check_login = true;

Annotation_spot_list_collection.prototype._$need_login = true;

/* End of file Annotation_spot_list_collection */
/* Location: ./system/application/views/web_apps/Annotation_spot_list_collection.js */