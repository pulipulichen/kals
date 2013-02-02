/**
 * Recommend_list_item
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/13 上午 12:09:12
 * @extends {List_item}
 */
function Recommend_list_item(_param) {
    
    List_item.call(this, _param);
    
}

Recommend_list_item.prototype = new List_item();

Recommend_list_item.prototype._menu_style_default = 'block';
Recommend_list_item.prototype._disable_option = ['respond', 'edit', 'delete', 'recommend'];

Recommend_list_item.prototype._$create_ui = function () {
    
    var _ui = List_item.prototype._$create_ui.call(this);
    
    var _menu_block = this.menu_block;
    _menu_block.get_ui().prependTo(_ui);
    
    return _ui;
};

Recommend_list_item.prototype.focus = function () {
    //什麼都不做
    return this;
};

Recommend_list_item.prototype.view_thread = function (_callback) {
    
    var _content = KALS_text.tool.view;
    _content.set_stop_select();
    _content.set_temp_logout();
    
    return List_item.prototype.view_thread.call(this, _callback);
};

/* End of file Recommend_list_item */
/* Location: ./system/application/views/web_apps/Recommend_list_item.js */