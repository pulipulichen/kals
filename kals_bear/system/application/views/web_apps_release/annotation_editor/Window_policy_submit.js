/**
 * Window_policy_submit
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/22 下午 04:36:47
 * @extends {Window_content_submit}
 */
function Window_policy_submit() {
    
    Window_content_submit.call(this);
    
}

Window_policy_submit.prototype = new Window_content_submit();

Window_policy_submit.prototype.lang = new KALS_language_param(
    'OK',
    'window.ok'
);

Window_policy_submit.prototype.submit = function () {
    
    var _trigger = this._content.get_trigger();
    
    var _type = this._content.get_policy_type();
    
    _trigger.set_policy_type(_type);
    
    KALS_window.close();
    
};

/* End of file Window_policy_submit */
/* Location: ./system/application/views/web_apps/Window_policy_submit.js */