/**
 * Dialog_link
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/5 下午 11:08:42
 * @extends {Dialog_option}
 */
function Dialog_link(_lang, _callback, _arg) {
    
    Dialog_option.call(this, _lang, _callback, _arg);
    
}

Dialog_link.prototype = new Dialog_option();

Dialog_link.prototype._$create_option = function () {
    //$.test_msg('Dialog_link._$create_option()');
    return $('<a href="#" class="link"></a>');
};


/* End of file Dialog_link */
/* Location: ./system/application/views/web_apps/Dialog_link.js */