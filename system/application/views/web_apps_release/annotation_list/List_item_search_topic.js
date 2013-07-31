/**
 * List_item_search_topic
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
function List_item_search_topic(_param) { 
    
    List_item_topic.call(this, _param);
}

List_item_search_topic.prototype = new List_item_topic();



//List_item_search_topic.prototype._$respond_force_load = true;

List_item_search_topic.prototype._menu_style_default = 'block';

// 開啟留言的瀏覽討論
List_item_search_topic.prototype._note_show_fulltext = false; 


List_item_search_topic.prototype._disable_option = ['edit','delete','recommend'];


// 重新覆寫一個ui，在裡面修改功能
List_item_search_topic.prototype._$create_ui = function(){

	//View_list_item_topic.prototype._$create_ui(this);
	var _ui = List_item_topic.prototype._$create_ui.call(this);
	
	_ui.addClass("list-item-search-topic");
	//只有改topic的部分
	_ui.find(".list-menu-option").css("border-left","none");
	

	//_ui.css("clear","right"); 
	_ui.find(".list-menu.list-menu-block").css("padding","5px");
	
	
   //試著把留言換成檢視
   	
	
	
	return _ui;
	
	
	
};




/* End of file List_item_search_topic */
/* Location: ./system/application/views/web_apps/List_item_search_topic.js */