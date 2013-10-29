/**
 * Window_search_submit -啟動List_collection_search來送出查詢
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 11:04:46
 * @extends {Window_content_submit}
 */
function Window_search_submit() {
    
    Window_content_submit.call(this);
   
    // 送出seatchrange,keyword,order_by
    this._$input_names = ['searchrange', 'keyword', 'order_by']; 
}

Window_search_submit.prototype = new Window_content_submit();

//將資料包成json送出的目的路徑-使用annotation_getter
Window_search_submit.prototype.url = 'annotation_getter/search_annotation';
                                                                     
//顯示的文字-查詢
Window_search_submit.prototype.lang = new KALS_language_param(  
    'Send',
    'window.send'
);


/*Window_profile_submit.prototype.complete_notification = new KALS_language_param(
    'Profile updated.',
    'window.profile.submit.complete'
);

Window_profile_submit.prototype.failed_notification = new KALS_language_param(
    'Profile not updated.',
    'window.profile.submit.failed'
);
*/

/**
 * 取得查詢欄位中的資料
 * @param {Object} _data
 */
Window_search_submit.prototype.complete_handle = function () {
	//complete_handle in window_content_submit.js 

    var _input_data = this.get_data();
        
    var _search = KALS_context.search;   //in KALS_context
    _search.set_field(_input_data.searchrange); //取得欄位中的值→Context_search.js
    _search.set_keyword(_input_data.keyword);
	//_search.set_order_by(_input_data.order_by); 
    
    //return Window_content_submit.prototype.complete_handle.call(this, _data); 
	//因為complete_handle.call做完後會自動關閉視窗，所以不使用
};

/**
 * 把參數丟給List_collection_search，讓他開始送出做查詢
 * 覆寫Window_content_submit-Window_content_submit.prototype.submit
 */
Window_search_submit.prototype.submit = function(){
	
	var _list = this._content.list;
	
	var _data = this.get_data();
	
	_list.set_searchrange(_data.searchrange);
	_list.set_keyword(_data.keyword);
	_list.set_order_by(_data.order_by);
	
	_list.reset();
	
	// 我們要叫List_collection_search進行搜尋
	var _this = this;
	_list.load_list(function () {
		_this.complete_handle();
	});
};

/* End of file Window_profile_submit */
/* Location: ./system/application/views/web_apps/Window_profile_submit.js */