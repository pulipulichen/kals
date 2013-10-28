/**
 * Window_top
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/5 下午 07:51:43
 * @extends {Window_content}
 */
function Window_top() {
    
    Window_content.call(this);
    
    this._setup_submit(new Window_top_submit());
}

Window_top.prototype = new Window_content();

Window_top.prototype.name = 'Top';

Window_top.prototype.heading = new KALS_language_param (
    '標註達人排行榜',
    'window.top.heading'
);

Window_top.prototype.nav_heading = new KALS_language_param (
    '標註達人排行榜',
    'window.top.nav_heading'
);

Window_top.prototype._$load_config = 'Window_top';

Window_top.prototype.width = 500;

/**
 * Create UI
 * @memberOf {Window_profile}
 * @type {jQuery} UI
 */
Window_top.prototype._$create_ui = function ()
{
    var _ui = KALS_window.ui.panel('window-top');
    
    var _factory = KALS_window.ui;
    
   
    var _rank_data = $('<div>       請選取一位標註達人觀看其標註：</div>').append();
     /*
    var _rank_hint = _factory.tip(new KALS_language_param(
        '(Rank cannot change.)',
        'window.profile.content.rank_cannot_change'
    )).appendTo(_rank_data);
    
    */
    var _rank_row = _factory.row(
        new KALS_language_param(' ', 'window.top.email'),
        _rank_data
    ).appendTo(_ui);

    /*
    var _name_row = _factory.row(
        new KALS_language_param('Name', 'window.content.name'),
        _factory.input('name', KALS_context.user.get_name())
    ).appendTo(_ui);
    */
    /*
    var _data = [
    	{
    		user_id: 1700,
    		name: "布丁"
    	},
    	{
    		user_id: 1701,
    		name: "北極熊"
    	},
    	{
    		user_id: 1702,
    		name: "陳老師"
    	}
    ];
    
    
    var _subpanel = _factory.subpanel('ranking').appendTo(_ui);
    
    for (var _i in _data) {
    	var _user_id = _data[_i].user_id;
    	var _name = _data[_i]._user_name;
    	
    	var _option = $('<input type="radio" name="rank" value="'+_user_id+'" id="rank_'+_user_id+'" />');
    	var _label = $('<label for="rank_'+_user_id+'">'+_name+'</label>');
    	
    	var _row = _factory.row(
        	_option,
        	_label
    	).appendTo(_subpanel);
    }
	*/
    
    return _ui;
};

Window_top.prototype.setup_content = function (_callback) {
    
	var _ui = this._ui;
	
	var _factory = KALS_window.ui;
	
	//清空ui
	_ui.empty();
	
	//ajax_get
	KALS_util.ajax_get({
		url: "top/get_top",
		callback: function (_data) {
			//callback這邊
		
			//在subpanel繪製清單
			/*
		    var _data = [
		    	{
		    		user_id: 1700,
		    		user_name: "布丁"
		    	},
		    	{
		    		user_id: 1701,
		    		user_name: "北極熊"
		    	},
		    	{
		    		user_id: 1702,
		    		user_name: "陳老師"
		    	}
		    ];
		    */
		    
			//取得上一次選取的user_id
			var _last_user_id = KALS_text.load_top.get_user_id();
			var _match_user_id = false;
			
		    var _subpanel = _factory.subpanel('ranking').appendTo(_ui);
		    
		    for (var _i in _data) {
		    	var _user_id = _data[_i].user_id;
		    	var _name = _data[_i].user_name;
		    	
		    	var _option = null;
		    	if (_last_user_id != _user_id)
		    		_option = $('<input type="radio" name="user_id" value="'+_user_id+'" id="rank_'+_i+'" />');
		    	else
		    	{
		    		_option = $('<input type="radio" name="user_id" value="'+_user_id+'" id="rank_'+_i+'" checked />');
		    		_match_user_id = true;	//表示有找到對應的user_id
		    	}
		    	//var _label = $('<label for="rank_'+_user_id+'">'+_name+'</label>');
		        var _label = $('<label for="rank_'+_i+'">排行'+(++_i)+' '+_name+'</label>');
		    	
		    	var _row = _factory.row(
		        	_option,
		        	_label
		    	).appendTo(_subpanel);
		    }
			
		    var _disable_radio = null;
		    if (_match_user_id == false)
		    	_disable_radio = '<input type="radio" name="user_id" value=0 id="disable" checked/>';
		    else
		    	_disable_radio = '<input type="radio" name="user_id" value=0 id="disable" />';
		    
		    //使用語系檔顯示
		    var _disable = _factory.row(
		        	_disable_radio,
		        	"不顯示標註達人標註"
		    	).appendTo(_subpanel);
			//讀取完成
		    
		    /*	
		    var top = document.getElementsByName['rank'];
		    for (var i=0; i<5; i++)
    		{
      			if (top[i].checked)
      			{
        			$json = '{"user_id:"'+top[i].value+'}';
        			
        			//也不是在這邊丟給Loader，要在Submit那邊，這樣的丟法也是錯誤的
      				//丟給Loader
      				url = "annotation_getter/top(json_decode("+$json+"))";	//不是用「:」，指定變數要用「=」
        			break;
      			}
    		}
		    */

		    	
			KALS_window.loading_complete(_callback);
		}
	});	//KALS_util.ajax_get({
	
    return _ui;
};

/* End of file Window_top */
/* Location: ./system/application/views/web_apps/Window_top.js */