/**
 * Annotation_spot_list_item_topic
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2015, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2015/11/3 下午 03:36:17
 * @extends {List_item_topic}
 * @param {Annotation_param} _param
 */
function Annotation_spot_list_item_topic(_param) {
    
    List_item_topic.call(this, _param);
}

Annotation_spot_list_item_topic.prototype = new List_item_topic();


/**
 * @type {View_respond_list_collection}
 */
Annotation_spot_list_item_topic.prototype.respond_list = null;

Annotation_spot_list_item_topic.prototype._setup_respond_list = function () {
    var _component = new Annotation_spot_respond_list_collection(this);
    this.child('respond_list', _component);
    return _component;
};

Annotation_spot_list_item_topic.prototype._$respond_force_load = true;

Annotation_spot_list_item_topic.prototype._menu_style_default = 'block';

Annotation_spot_list_item_topic.prototype._note_show_fulltext = false;

Annotation_spot_list_item_topic.prototype._disable_option = ['recommend'];

/*
Annotation_spot_list_item_topic.prototype.editor_set_data = function (_param) {
    KALS_text.tool.view.set_modified();
    return this.set_data(_param);
};
*/

/**
 * 取得模組
 * @returns {Annotation_spot}
 */
Annotation_spot_list_item_topic.prototype.get_module = function () {
    return KALS_context.module.get_module("Annotation_spot");
};

/**
 * 取得編輯器
 * @returns {Annotation_editor}
 */
Annotation_spot_list_item_topic.prototype.get_editor = function () {
    var _editor = this.get_module().get_editor();
    return _editor;
};

/**
 * 取得列表
 * @author Pudding 20151103
 * @returns {Annotation_spot_list_collection}
 */
Annotation_spot_list_item_topic.prototype.get_list = function () {
    return this.get_module().get_list();
};

Annotation_spot_list_item_topic.prototype.set_selection = function () {
    //不做任何事情
    return this;
};

Annotation_spot_list_item_topic.prototype.show_recommend = function () {
    //不做任何事情
    return this;
};

/* End of file Annotation_spot_list_item_topic */
/* Location: ./system/application/views/web_apps/Annotation_spot_list_item_topic.js */