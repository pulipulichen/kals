/**
 * Window_style_submit
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
function Window_style_submit() {
    
    Window_content_submit.call(this);
    
}

Window_style_submit.prototype = new Window_content_submit();

Window_style_submit.prototype.url = 'authentication/register';

Window_style_submit.prototype.lang = new KALS_language_param(
    'Save',
    'window.save'
);

/*
Window_style_submit.prototype.get_data = function () {
    //TODO Window_login_submit.get_data();
};
*/

/*
Window_style_submit.prototype.submit = function () {
    // TODO Window_login_submit.submit()
};
*/

/*
Window_style_submit.prototype.exception_handle = function (_data) {
    
    // TODO Window_login_submit.exception_handle()
    
};
*/

/* End of file Window_style_submit */
/* Location: ./system/application/views/web_apps/Window_style_submit.js */