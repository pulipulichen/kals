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
/*global View_editor_container:false */
function Annotation_spot_editor_container(_list_coll) {
    View_editor_container.call(this, null, _list_coll);
}

Annotation_spot_editor_container.prototype = new View_editor_container();


/**
 * 建立編輯器
 * @type {Annotation_editor}
 */
Annotation_spot_editor_container.prototype._setup_editor = function () {
    $.test_msg("_setup_editor");
    if ($.is_null(this.editor)) {
        var _list_coll = this._list_coll;
        var _disable_option = this._disable_option;
        var _editor = new Annotation_spot_editor(this, _list_coll, _disable_option);
        _editor.get_ui();
        this.child('editor', _editor);    
    }
    return this.editor;
};

/* End of file Annotation_spot_editor_container */
/* Location: ./system/application/views/web_apps/Annotation_spot_editor_container.js */