/**
 * Window_change_link
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/5 下午 11:13:03
 * @extends {Dialog_close_link}
 */
function Window_change_link(_lang, _content_name) {

    this.content_name = _content_name;
    Dialog_close_link.call(this, _lang);

    //$.test_msg('Window_change_link()', [this._$option_prototype, Dialog_link.prototype._$option_prototype]);
}

Window_change_link.prototype = new Dialog_close_link();

Window_change_link.prototype.content_name = null;

Window_change_link.prototype.close_handle = function (_ui, _callback) {
    
    //$.test_msg('Window_change_link.close_handle()');
    
    KALS_context.overlay.lock_mask();
    
    var _this = this;
    if (typeof(_this.content_name) != 'undefined') {
            KALS_window.setup_window(_this.content_name, function () {
                KALS_context.overlay.unlock_mask();
            });
    }
	
    /*
    var _this = this;
    setTimeout(function () {
        Dialog_close_link.prototype.close_handle.call(_this, _ui, function () {
            //if (typeof(_this.content_name) == 'string')
            if (typeof(_this.content_name) != 'undefined') {
				KALS_window.setup_window(_this.content_name);
			}
                
        });    
    }, 0);
    */
    
};

/* End of file Window_change_link */
/* Location: ./system/application/views/web_apps/Window_change_link.js */