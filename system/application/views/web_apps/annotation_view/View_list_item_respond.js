/**
 * View_list_item_respond
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/8 下午 11:42:54
 * @extends {List_item_respond}
 * @param {JSON} _param
 * @param {List_item} _topic_item
 */
function View_list_item_respond(_param, _topic_item) {
    
    List_item_respond.call(this, _param, _topic_item);
    
}

View_list_item_respond.prototype = new List_item_respond();

View_list_item_respond.prototype._menu_style_default = 'block';

View_list_item_respond.prototype._note_show_fulltext = true;

View_list_item_respond.prototype._disable_option = [
    'view'
    //, 'like'
];

/*
View_list_item_respond.prototype.editor_set_data = function (_param) {
    KALS_text.tool.view.set_modified();
    return this.set_data(_param);
};
*/

View_list_item_respond.prototype.get_editor = function () {
    return KALS_text.tool.view.editor_container.editor;
};

View_list_item_respond.prototype.get_list = function () {
    return KALS_text.tool.view.list;
};

/**
 * 使用最原始的List_item.respond_annotation()
 */
View_list_item_respond.prototype.respond_annotation = function () {
    
    //先將Window_view的editor打開吧
    KALS_text.tool.view.editor_container.toggle_container(true);
    
    return List_item.prototype.respond_annotation.call(this);
};

/**
 * 使用最原始的List_item.edit_annotation()
 */
View_list_item_respond.prototype.edit_annotation = function () {
    return List_item.prototype.edit_annotation.call(this);
};

View_list_item_respond.prototype.set_selection = function () {
    //不做任何事情
    return this;
};
    

/* End of file View_list_item_respond */
/* Location: ./system/application/views/web_apps/View_list_item_respond.js */