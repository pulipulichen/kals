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
    
    var _anchor_text = this._setup_anchor_text_component()
            .get_ui()
            .insertBefore(_ui.find(".list-note-component"));
	
	/*
	var _factory = KALS_window.ui;
	
    var _no_result_row = _factory.row(
	    new KALS_language_param('no-result','window.content.noresult'),'1'
	).appendTo(_ui); 
	*/
		
    return _ui;	
};

//List_item_search_respond.prototype.get_topic_param = function () {
//    return this.get_annotation_param();
//};
//
//List_item_search_respond.prototype.get_topic_id = function () {
//    return this.get_annotation_id();
//};

List_item_search_respond.prototype._disable_option = ['edit','delete','view','recommend', 'respond'];

//List_item_search_respond.prototype._setup_menu_block = function () {
//  
//    var _component = new List_menu_search(this, this._disable_option);
//    this.child('menu_block', _component);
//    return _component;  
//};

List_item_search_respond.prototype._menu_style_default = 'block';

// 開啟留言的瀏覽討論
List_item_search_respond.prototype._note_show_fulltext = false;

/**
 * 顯示標註細節，顯示的方式跟預設的有些不同
 * 直接引用List_item_search_topic的作法
 * @author Pulipuli Chen 20131113
 */
List_item_search_respond.prototype.view_thread = function () {
    return List_item_search_topic.prototype.view_thread.call(this);
};

/**
 * 設定menu的部份
 */
List_item_search_respond.prototype._setup_menu_block = function () {
    return List_item_search_topic.prototype._setup_menu_block.call(this);
};

/**
 * 取得主題標註的id，但因為搜尋中沒有主題標註，所以僅取得自己的ID即可
 * @returns {Number}
 * @author Pulipuli Chen 20141114
 */
List_item_search_respond.prototype.get_topic_id = function () {
    return this.get_annotation_id();
};

/**
 * 取得主題標註的參數，但因為搜尋中沒有主題標註，所以僅取得自己的參數即可
 * @returns {Annotation_param}
 * @author Pulipuli Chen 20141114
 */
List_item_search_respond.prototype.get_topic_param = function () {
    return this.get_annotation_param();
};

/* End of file View_list_item_respond */
/* Location: ./system/application/views/web_apps/View_list_item_respond.js */