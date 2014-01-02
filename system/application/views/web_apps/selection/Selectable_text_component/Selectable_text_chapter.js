/**
 * Selectable_text_chapter
 *
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) Expression year is undefined on line 7, column 33 in Templates/KALS/KALS_JavaScript_Class.js., Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2014/1/2 下午 09:17:54
 */

/**
 * @memberOf {Selectable_text_chapter}
 * @extends {KALS_user_interface}
 * @constructor
 * @param {Selectable_text} _selectable_text 父物件
 */
function Selectable_text_chapter(_selectable_text) {
    
    this._selectable_text = _selectable_text;
    this._text = _selectable_text._text;
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Selectable_text_chapter}
 */
Selectable_text_chapter.prototype = new KALS_user_interface();

/**
 * 父物件
 * @type {Selectable_text}
 */
Selectable_text_chapter.prototype._selectable_text;

/**
 * 主要可以選擇的物件
 * @type {jQuery}
 */
Selectable_text_chapter.prototype._text;

// -----------------------------------
// 內部參數設定
// -----------------------------------

// -----------------------------------
// 方法
// -----------------------------------

/* End of file Selectable_text_chapter */
/* Location: ./system/application/views/web_apps/Selectable_text_chapter.js */