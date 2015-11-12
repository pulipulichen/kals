/**
 * Annotation_spot_editor
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2015/11/13 下午 03:36:17
 * @param {Annotation_spot_list_collection} _list_coll
 */
/*global KALS_CONFIG:false */ /*global KALS_context:false */ /*global KALS_util:false */ /*global KALS_text:false */ /*global KALS_toolbar:false */
/*global Annotation_editor:false */
function Annotation_spot_editor(_editor_container, _list_coll, _disable_option) {
    Annotation_editor.call(this, _editor_container, _list_coll, _disable_option);
}

Annotation_spot_editor.prototype = new Annotation_editor();

/**
 * 取得標註範圍的資料
 * @returns {JSON}
 * @author Pudding 20151103
 */
Annotation_spot_editor.prototype._get_scope_data_from_select = function () {
    var _select = KALS_context.module.get_module("Annotation_spot").get_scope_coll();
    return {
        scope: _select.get_scope_coll(),
        feature_location: _select.get_location_feature(),
        feature_recommend_scope: _select.get_recommend_scope_coll()
    };
};


/* End of file Annotation_spot_editor */
/* Location: ./system/application/views/web_apps/Annotation_spot_editor.js */