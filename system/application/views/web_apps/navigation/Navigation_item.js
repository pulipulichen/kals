/**
 * Navigation_item
 * 
 * 選單按鈕
 *
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) Expression year is undefined on line 7, column 33 in Templates/KALS/KALS_JavaScript_Class.js., Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2014/1/18 下午 12:19:43
 */

/**
 * @memberOf {Navigation_item}
 * @extends {KALS_user_interface}
 * @constructor
 */
function Navigation_item(_lang) {
    
    this.set_lang(_lang);
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Navigation_item}
 */
Navigation_item.prototype = new KALS_user_interface();

/**
 * 顯示在標題列的語系檔
 * @memberOf {Navigation_item}
 * @type {KALS_language_param}
 */
Navigation_item.prototype._lang;

//Navigation_item.prototype.attribute = null;

/**
 * Reset Navigation_item
 * @memberOf {Navigation_item}
 */
Navigation_item.prototype.set_lang = function (_lang) {
    if (_lang === undefined) {
        return this;
    }
    
    this._lang = _lang;
    return this;
};


/**
 * Create UI
 * @memberOf {Navigation_item}
 * @type {jQuery} UI
 */
Navigation_item.prototype._$create_ui = function ()
{
    return this;
};

//Navigation_item.prototype.method = function (_param)
//{
//    return this;
//};

// ---------
// Initilaize
// ---------
//$(function () {
//    Navigation_item = new Navigation_item();
//});

/* End of file Navigation_item */
/* Location: ./system/application/views/web_apps/Navigation_item.js */