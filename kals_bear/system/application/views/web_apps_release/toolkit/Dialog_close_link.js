/**
 * Dialog_close_link
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/5 下午 11:13:03
 * @extends {Dialog_close_option}
 */
function Dialog_close_link(_lang, _callback, _arg) {
    
    Dialog_close_option.call(this, _lang, _callback, _arg);
    
    //$.test_msg('Dialog_close_link()', [this._$option_prototype, Dialog_link.prototype._$option_prototype]);
}

Dialog_close_link.prototype = new Dialog_close_option();

Dialog_close_link.prototype._$create_option = function () {
    return Dialog_link.prototype._$create_option.call(this);
};

/* End of file Dialog_close_link */
/* Location: ./system/application/views/web_apps/Dialog_close_link.js */