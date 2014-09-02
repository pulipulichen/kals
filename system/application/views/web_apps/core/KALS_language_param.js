/**
 * KALS_language_param
 * 語系參數
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/26 下午 09:53:28
 * @param {string} _msg 預設顯示值
 * @param {string|null} _line 語系索引，可以省略
 * @param {Array|null} _arg 語系索引參數，除了是字串之外，也可以是jQuery元素。
 * 可以在create_listener的參數中再插入一個listener
 */
function KALS_language_param (_msg, _line, _arg) {
  
    if ($.is_array(_line)
        && $.is_null(_arg)) {
        _arg = _line;
        _line = _msg;
        _msg = null;
    }
    
    this.msg = _msg;
    this.line = _line;
    
    if ($.isset(_arg) 
          && false === $.is_array) {
        _arg = [_arg];
    }
    this.arg = _arg;
}

/**
 * 預設顯示的值
 * @type {string}
 */
KALS_language_param.prototype.msg = null;

/**
 * 語系索引
 * @type {string}
 */
KALS_language_param.prototype.line = null;

/**
 * 語系索引參數
 * @type {Array}
 */
KALS_language_param.prototype.arg = [];
   
/* End of file KALS_language_param */
/* Location: ./system/application/views/web_apps/KALS_language_param.js */