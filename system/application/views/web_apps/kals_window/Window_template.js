/**
 * Window_template
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/9/9 下午 01:27:09
 * @extends {Window_content}
 */
function Window_template(){
    
    Window_content.call(this);
    
}

/**
 * 改為繼承自Window_content
 */
Window_template.prototype = new Window_content();

/**
 * 繼承自KALS_modal，要結合起來
 */
//(function () {
	
	var _prototype = new Template_controller();
	
    for (var _i in _prototype) {
        Window_template.prototype[_i] = _prototype[_i];
    }
	
//});

Window_template.prototype.close = function (_callback) {
    KALS_window.close(_callback);
};

/* End of file Window_template */
/* Location: ./system/application/views/web_apps/Window_template.js */