/**
 * Window_top_submit
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
function Window_top_submit() {
    
    Window_content_submit.call(this);
    
    /**
     * _$input_names屬性的用法
     * 
     * 給get_data()方法去使用的，他可以抓到Window，中表單的「name」跟「value」配對。
     * 然後把這個配對做成json資料，透過AJAX丟給Server端。
     * 
     * 舉例來說，Window內有表單name為「userid」，而其value為「7101」。
     * （表單的type為何皆可，不管是text或是radio，都會有一個name配對value的組合，即使value是空值null）
     * 那麼丟給server的資料就會是 $data->userid //為7101
     * server那邊的，我們稍後再看，總之這邊要先指定
     * */
    //
    this._$input_names = ['user_id'];
}

Window_top_submit.prototype = new Window_content_submit();

Window_top_submit.prototype.url = 'annotation_getter/top';

Window_top_submit.prototype.lang = new KALS_language_param(
    '確認',
    ' '
);

Window_top_submit.prototype.complete_notification = new KALS_language_param(
    '顯示成功.',
    'window.top.submit.complete'
);

Window_top_submit.prototype.failed_notification = new KALS_language_param(
    '顯示失敗.',
    'window.top.submit.failed'
);

/**
 * 送出資料給Server端，取得top的標註資料之後
 */
Window_top_submit.prototype.complete_handle = function (_data) {
    
    if (typeof(_data) == "object")
    {
		//從這邊開始，要將資料丟給Top_annotation_loader去處理
    	
    	//但在這之前，我們先測試一下data是否正確。
    	//$.test_msg("取得top標註資料了嗎？", _data);	//成功
    	
    	var _user_data  = this.get_data();
    	var _user_id = _user_data["user_id"];
    	
    	//在這之前，KALS_text.load_top(=Top_annotation_loader.js)要先做initiaulize()初始化
    	//在Init_profile.js那邊，跟其他的My_annotation_loader與Navigation_loader一起
    	KALS_text.load_top.clear();
    	KALS_text.load_top.set_user_id(_user_id);
    	KALS_text.load_top.setup_loader(_data, function () {
			    //Window_content_submit.prototype.complete_handle.call(this, _data);
				KALS_text.load_top.stop_loader();
    	});
    }
    
    //注意下面第二個參數
    //如果是true則顯示成功，之外就是失敗
    //通常data裡面都會是true，可以自行調整
    return Window_content_submit.prototype.complete_handle.call(this, true);
    //return this;
};

/* End of file Window_top_submit */
/* Location: ./system/application/views/web_apps/Window_top_submit.js */