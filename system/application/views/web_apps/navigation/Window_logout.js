/**
 * Window_logout
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 10:56:17
 * @extends {Window_content}
 */
function Window_logout() {
    
    Window_content.call(this);
    
    this._setup_submit(new Window_logout_submit());
	
	/**
	 * 布丁測試用
	 * @author Pulipuli Chen 2013117
	 */
	/*
	var _this = this;
	setTimeout(function() {
		_this.get_ui();
		
		_this.set_field('first', '這是第一個值')
		_this.set_field('test', ['TEST A', 'TEST B 如何？', 'TEST C試試看吧！！']);
		//_this.set_field('repeat', ['重複1', '重複2', '重複3']);
		//_this.set_field('repeat', ['重複4', '重複5', '重複6']);
		//_this.set_field('repeat', ['不重複 啦 7']);
		
		_this.set_field('repeat', {
			'重複1': {
				'foot': 1
			},
			'重複2': {
                'foot': [2, 'a', 'b']
            }
		});
		
		//_this.reset_field('foot');
		
		_this.set_field('color', 'blue');
		//_this.set_field('display', 'none');
	}, 0);
	*/
}

Window_logout.prototype = new Window_content();

Window_logout.prototype.name = 'Logout';

Window_logout.prototype.width = 320;

Window_logout.prototype.heading = new KALS_language_param (
    'Logout',
    'window.logout.heading'
);

Window_logout.prototype.nav_heading = new KALS_language_param (
    'Logout',
    'window.logout.nav_heading'
);

Window_logout.prototype._$template = 'navigation/template/Window_logout';


Window_logout.prototype.action = function (_ele, _params) {
	//alert(121212);
	_ele.css('color', 'red');
};

Window_logout.prototype.action_reset = function (_ele, _params) {
    //alert(121212);
    _ele.css('color', 'green');
};

/*
Window_logout.prototype._$create_ui = function () {
    
    var _ui = KALS_window.ui.panel('window-logout');
    
    var _lang_param = new KALS_language_param(
        'Are you sure?',
        'window.logout.content.confirm'
    );
    
    KALS_context.lang.add_listener(_ui, _lang_param);
    
    return _ui;
};
*/



/* End of file Window_logout */
/* Location: ./system/application/views/web_apps/Window_logout.js */