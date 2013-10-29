/**
 * View_list_item_respond
 *
 * @package    KALS

 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/8 下午 11:42:54
 * @extends {List_item_respond}
 */
function List_item_search_respond(_param) { 
    
    List_item_respond.call(this, _param);
}

List_item_search_respond.prototype = new List_item_respond();


/*List_item_search_respond.prototype.row = function(){
	new KALS_language_param('no-result', 'window.content.noresult');
	
	
};	
*/



List_item_search_respond.prototype._$create_ui = function(){
    
    //var _ui = KALS_window.ui.panel('no-result');
    var _ui = List_item_respond.prototype._$create_ui.call(this);
    //var _factory = KALS_window.ui;
	
    var _no_result_row = _factory.row(
	    new KALS_language_param('no-result','window.content.noresult'),'1'
	).appendTo(_ui); 

		
    return _ui;	
};

/**
 * 使用最原始的List_item.respond_annotation()
 */
/*View_list_item_respond.prototype.respond_annotation = function () {
    
    //先將Window_view的editor打開吧
    KALS_text.tool.view.editor_container.toggle_container(true);
    
    return List_item.prototype.respond_annotation.call(this);
    
};*/

/**
 * 使用最原始的List_item.edit_annotation()
 */
/*View_list_item_respond.prototype.edit_annotation = function () {
    return List_item.prototype.edit_annotation.call(this);
};

View_list_item_respond.prototype.set_selection = function () {
    //不做任何事情
    return this;
};*/
    

/* End of file View_list_item_respond */
/* Location: ./system/application/views/web_apps/View_list_item_respond.js */