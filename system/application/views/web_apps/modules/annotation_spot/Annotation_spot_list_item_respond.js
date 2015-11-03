/**
 * Annotation_spot_list_item_respond
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2015, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2015/11/3 下午 03:36:17
 * @extends {List_item_respond}
 
 * @param {JSON} _param
 * @param {List_item} _topic_item
 */
function Annotation_spot_list_item_respond(_param, _topic_item) {
    
    List_item_respond.call(this, _param, _topic_item);
    
}

Annotation_spot_list_item_respond.prototype = new List_item_respond();

Annotation_spot_list_item_respond.prototype._menu_style_default = 'block';

Annotation_spot_list_item_respond.prototype._note_show_fulltext = true;

Annotation_spot_list_item_respond.prototype._disable_option = [
    'view'
    //, 'like'
];

/**
 * 取得模組
 * @returns {Annotation_spot}
 */
Annotation_spot_list_item_respond.prototype.get_module = function () {
    return KALS_context.module.get_module("Annotation_spot");
};

/**
 * 取得編輯器
 * @returns {Annotation_editor}
 */
Annotation_spot_list_item_respond.prototype.get_editor = function () {
    var _editor = this.get_module().get_editor();
    return _editor;
};

/**
 * 取得列表
 * @author Pudding 20151103
 * @returns {Annotation_spot_list_collection}
 */
Annotation_spot_list_item_respond.prototype.get_list = function () {
    return this.get_module().get_list();
};

/**
 * 使用最原始的List_item.respond_annotation()
 */
Annotation_spot_list_item_respond.prototype.respond_annotation = function () {
    
    //先將Window_view的editor打開吧
    KALS_text.tool.view.editor_container.toggle_container(true);
    //$.test_msg("Annotation_spot_list_item_respond");
    
    return List_item_respond.prototype.respond_annotation.call(this);
};

/**
 * 使用最原始的List_item.edit_annotation()
 */
Annotation_spot_list_item_respond.prototype.edit_annotation = function () {
    return List_item.prototype.edit_annotation.call(this);
};

Annotation_spot_list_item_respond.prototype.set_selection = function () {
    //不做任何事情
    return this;
};
    

/* End of file Annotation_spot_list_item_respond */
/* Location: ./system/application/views/web_apps/Annotation_spot_list_item_respond.js */