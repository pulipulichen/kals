/**
 * Window_search_submit
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
    
    this._$input_names = ['searchrange', 'keyword', 'order_by']; //送出seatchrange與keyword
}

Window_search_submit.prototype = new Window_content_submit();

Window_search_submit.prototype.url = 'annotation_getter/search_annotation'; //將資料包成json送出的目的路徑-
                                                                    //使用annotation_getter   

Window_search_submit.prototype.lang = new KALS_language_param(  //顯示的文字-查詢
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
//====↓取得查詢欄位中的資料====
Window_search_submit.prototype.complete_handle = function (_data) { // complete_handle in window_content_submit.js
                                                                    //取得資料
    if (_data === true)
    {
        var _input_data = this.get_data();
        
        var _search = KALS_context.search;   //in KALS_context
        _search.set_field(_input_data.searchrange); //取得欄位中的值→Context_search.js
        _search.set_keyword(_input_data.keyword);
		_search.set_order(_input_data.order_by);

    }
    
    return Window_content_submit.prototype.complete_handle.call(this, _data);
};



/* End of file Window_profile_submit */
/* Location: ./system/application/views/web_apps/Window_profile_submit.js */