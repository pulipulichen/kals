/**
 * KALS_controller_window
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pulipuli Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2013/11/21 下午 01:27:09
 * @extends {Window_content}
 * @extends {KALS_controller_window}
 */
function KALS_controller_window(){
    
    Window_content.call(this);
    
}

/**
 * 改為繼承自Window_content
 */
KALS_controller_window.prototype = new Window_content();

/**
 * 繼承自Template_controller，要結合起來
 */
var _prototype = new KALS_controller();
	
for (var _i in _prototype) {
    KALS_controller_window.prototype[_i] = _prototype[_i];
}

/**
 * 開啟
 * @param {function} _callback
 * @returns {KALS_controller_window}
 */
KALS_controller_window.prototype.open = function (_callback) {
    return this.open_window(_callback);
};

/**
 * 使用Window_content的close功能
 * @param {Object} _callback
 */
KALS_controller_window.prototype.close = function (_callback) {
    return KALS_window.close(_callback);
};

/**
 * 設定hash url
 * ※請覆寫
 * @type {String}
 */
KALS_controller_window.prototype._$hash_url = null;

/**
 * 設定hash url
 */
KALS_controller_window.prototype._setup_hash_url = function () {
	// @TODO
};



/* End of file KALS_controller_window */
/* Location: ./system/application/views/web_apps/kals_framework/KALS_controller_window.js */