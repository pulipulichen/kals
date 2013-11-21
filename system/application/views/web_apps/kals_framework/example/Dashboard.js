/**
 * Dashboard
 *
 * 結合樣板的控制器
 * 作為示範用
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2013/11/19 下午 03:36:17
 * @extends {KALS_controller_window}
 */
function Dashboard() {
    KALS_controller_window.call(this);
    
    this.init_hotkey();
}

/**
 * ===========================
 * 開頭宣告
 * ===========================
 */

/**
 * 繼承自KALS_controller_window
 * 
 * KALS_controller 是部分元件
 * KALS_controller_window 是獨立視窗
 */
Dashboard.prototype = new KALS_controller_window();

/**
 * ====================
 * View設定
 * ====================
 */

/**
 * 指定View
 * @type String
 */
Dashboard.prototype._$view = 'kals_framework/example/view/Dashboard';

/**
 * ====================
 * Model設定
 * ====================
 */

/**
 * 指定Model
 * @type String
 */
Dashboard.prototype._$model = 'dashboard';

/**
 * 初始化物件時執行的Action
 * @type String|null null=不執行任何action
 */
Dashboard.prototype._$init_request_action = null;

/**
 * open()時執行的Action
 * @type String|null null=不執行任何action
 */
Dashboard.prototype._$open_request_action = 'open';

/**
 * close()時執行的Action
 * @type String|null null=不執行任何action
 */
Dashboard.prototype._$close_request_action = null;


/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 是否開啟偵錯功能
 * @type Boolean
 */
Dashboard.prototype._$enable_debug = true;

/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 啟用權限檢查機制
 * @type {Boolean}
 */
Dashboard.prototype._$enable_auth_check = true;

/**
 * 權限檢查
 * 
 * 請用KALS_controller提供的兩個參數，以及其他自己設定的資料
 * 來決定是否要讓權限檢查通過
 * 
 * 舉例：
 * 
 * 不允許未登入的人使用
 * return _is_login;
 * 
 * 不允許已登入的人使用
 * retunr !(_is_login);
 * 
 * @param {boolean} _is_login 是否已經登入
 * @param {User_param} _user 現在登入的使用者，沒有登入的情況會是null
 * @returns {boolean} true=通過;false=未通過
 */
Dashboard.prototype._$auth_check = function (_is_login, _user) {
    //this.debug('auth check: has login', _is_login);
    //return _is_login;
    return true;
};

/**
 * ====================
 * KALS_controller_window設定
 * ====================
 */

/**
 * 獨立視窗功能
 * @type Boolean true=開啟獨立視窗|false=依附在KALS_window底下
 * @author Pulipuli Chen 20131121 尚未完成 
 */
Dashboard.prototype._$absolute = false;

/**
 * 視窗的Class Name
 * @type String
 */
Dashboard.prototype.name = 'Dashboard';

/**
 * 視窗的標題
 * @type KALS_language_param
 */
Dashboard.prototype.heading = new KALS_language_param (
    'Dashboard',
    'window.dashboard.heading'
);

/**
 * 視窗位於導覽列的按鈕名稱
 * @type KALS_language_param
 */
Dashboard.prototype.nav_heading = new KALS_language_param (
    'Dashboard',
    'window.dashboard.heading'
);

/**
 * ====================
 * Action設定
 * ====================
 */

/**
 * 開啟最新的標註
 * 
 * @param {jQuery} _ele
 * 由於是kals-event-field-set事件，所以固定會回傳觸發事件的jQuery物件
 * @returns {Dashboard.prototype}
 */
Dashboard.prototype.setup_activity = function (_ele) {
    if (this.has_field("activity")) {
        var _activity = this.get_field('activity').toLowerCase();
        _ele.attr('className', 'activity-' + _activity);
    }
    return this;
};

/**
 * 開啟最近的標註
 * @returns {Dashboard.prototype}
 */
Dashboard.prototype.open_recent_annotation = function() {
    if (this.is_opened()) {
        this.close(function () {
            KALS_context.search.open_recent_annotation();
        });
    }
    else {
        KALS_context.search.open_recent_annotation();
    }
        
    return this;
};

/**
 * 使用Hotkey的範例
 * http://unixpapa.com/js/key.html
 * @returns {Dashboard.prototype}
 */
Dashboard.prototype.init_hotkey = function () {
    // 65表示A
    // 按鍵對應的編號請參考http://unixpapa.com/js/key.html
    var _hotkey = 65;   
    
    var _this = this;
    this.set_hotkey(_hotkey, function () {
        _this.open();
    });
    
    return this;
};

Dashboard.prototype.select = function (_ele) {
    this.debug('select', this._data);
    var _annotation_id = this.get_field('last_annotation_id');
    this.select_annotation(_annotation_id);
    return this;
};

/* End of file Dashboard */
/* Location: ./system/application/views/web_apps/extension/dashboard/Dashboard.js */