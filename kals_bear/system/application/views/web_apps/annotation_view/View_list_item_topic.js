/**
 * View_list_item_topic
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/6 下午 10:31:03
 * @extends {List_item_topic}
 * @param {Annotation_param} _param
 */
function View_list_item_topic(_param) {
    
    List_item_topic.call(this, _param);
}

View_list_item_topic.prototype = new List_item_topic();


/**
 * @type {View_respond_list_collection}
 */
View_list_item_topic.prototype.respond_list = null;

View_list_item_topic.prototype._setup_respond_list = function () {
    var _component = new View_respond_list_collection(this);
    this.child('respond_list', _component);
    return _component;
};

View_list_item_topic.prototype._$respond_force_load = true;

View_list_item_topic.prototype._menu_style_default = 'block';

View_list_item_topic.prototype._note_show_fulltext = true;

View_list_item_topic.prototype._disable_option = ['view', 'respond', 'recommend'];

/*
View_list_item_topic.prototype.editor_set_data = function (_param) {
    KALS_text.tool.view.set_modified();
    return this.set_data(_param);
};
*/

View_list_item_topic.prototype.get_editor = function () {
    return KALS_text.tool.view.editor_container.editor;
};

View_list_item_topic.prototype.get_list = function () {
    return KALS_text.tool.view.list;
};

View_list_item_topic.prototype.set_selection = function () {
    //不做任何事情
    return this;
};

View_list_item_topic.prototype.show_recommend = function () {
    //不做任何事情
    return this;
};

/* End of file View_list_item_topic */
/* Location: ./system/application/views/web_apps/View_list_item_topic.js */