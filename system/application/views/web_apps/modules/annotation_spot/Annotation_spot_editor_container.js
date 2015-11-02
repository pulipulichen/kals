/**
 * Annotation_spot_editor_container
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2015/11/2 下午 03:36:17
 * @extends {View_editor_container}
 * 
 * @param {Annotation_spot_list_collection} _list_coll
 */
function Annotation_spot_editor_container(_list_coll) {
    View_editor_container.call(this, null, _list_coll);
}

Annotation_spot_editor_container.prototype = new View_editor_container();

/**
 * 設定範圍參數
 * @param {Scope_collection_param} _scope_coll
 * @returns {Annotation_spot_editor_container.prototype}
 */
Annotation_spot_editor_container.prototype.set_scope_coll = function (_scope_coll) {
    
    // @TODO #154 把裡面的Editor範圍參數設為scope_coll
    
    return this;
};

/* End of file Annotation_spot_editor_container */
/* Location: ./system/application/views/web_apps/Annotation_spot_editor_container.js */