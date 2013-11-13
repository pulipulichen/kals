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

List_item_search_respond.prototype._$create_ui = function(){
    
    //var _ui = KALS_window.ui.panel('no-result');
    var _ui = List_item_respond.prototype._$create_ui.call(this);
    
	/*
	var _factory = KALS_window.ui;
	
    var _no_result_row = _factory.row(
	    new KALS_language_param('no-result','window.content.noresult'),'1'
	).appendTo(_ui); 
	*/
		
    return _ui;	
};

List_item_search_respond.prototype.get_topic_param = function () {
    return this.get_annotation_param();
};

List_item_search_respond.prototype.get_topic_id = function () {
    return this.get_annotation_id();
};

List_item_search_respond.prototype._disable_option = ['edit','delete','view','recommend'];

List_item_search_respond.prototype._setup_menu_block = function () {
  
    var _component = new List_menu_search(this, this._disable_option);
    this.child('menu_block', _component);
    return _component;  
};

List_item_search_respond.prototype._menu_style_default = 'block';

// 開啟留言的瀏覽討論
List_item_search_respond.prototype._note_show_fulltext = false; 

/* End of file View_list_item_respond */
/* Location: ./system/application/views/web_apps/View_list_item_respond.js */