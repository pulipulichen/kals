/**
 * KALS_stamp
 *
 * 結合樣板的控制器
 * KALS Framework的Controller示範
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
function KALS_stamp() {
    // 繼承宣告的步驟之一
    KALS_controller_window.call(this);
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
KALS_stamp.prototype = new KALS_controller_window();

/**
 * 指定Module的名稱
 * 
 * 也是顯示在Hash的名稱。如果是null，則會顯示KALS_modal._$modal_name
 * @type String
 */
KALS_stamp.prototype.name = 'KALS_stamp';

/**
 * ====================
 * View設定
 * ====================
 */

/**
 * 指定View
 * @type String
 */
KALS_stamp.prototype._$view = 'modules/kals_stamp/view/KALS_stamp';

/**
 * 初始化View
 * 
 * 如果要在Controller啟動時為UI做設定，請覆寫這個方法
 * 這個方法只會執行一次
 */
KALS_stamp.prototype._$initialize_view = function () {
    
    // @TODO 20140516 Pulipuli Chen
    // 載入KALS_stamp.html的初始化訊息
    
};

/**
 * ====================
 * Model設定
 * ====================
 */

/**
 * 指定Model
 * @type String
 */
KALS_stamp.prototype._$model = 'KALS_stamp';

/**
 * 初始化物件時執行的Action
 * @type String|null null=不執行任何action
 */
KALS_stamp.prototype._$init_request_action = null;

/**
 * open()時執行的Action
 * @type String|null null=不執行任何action
 */
KALS_stamp.prototype._$open_request_action = null;

/**
 * close()時執行的Action
 * @type String|null null=不執行任何action
 */
KALS_stamp.prototype._$close_request_action = null;


/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 是否開啟偵錯功能
 * @type Boolean
 */
KALS_stamp.prototype._$enable_debug = true;

/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 啟用權限檢查機制
 * @type {Boolean}
 */
KALS_stamp.prototype._$enable_auth_check = true;

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
KALS_stamp.prototype._$auth_check = function (_is_login, _user) {
    if (_is_login === false) {
        return false;
    }
    else {
        return true;
    }
};

/**
 * ====================
 * KALS_controller_window設定
 * ====================
 */

/**
 * 獨立視窗功能
 * @type Boolean true=開啟獨立視窗|false=依附在KALS_window底下
 */
KALS_stamp.prototype._$absolute = false;

/**
 * 視窗的Class Name
 * @type String
 */
KALS_stamp.prototype._$name = 'KALS_stamp';

/**
 * 視窗的標題
 * 
 * @type KALS_language_param
 * 對應到樣板的語系檔
 */
KALS_stamp.prototype._$heading = 'heading';

/**
 * 視窗位於導覽列的按鈕名稱
 * 
 * @type KALS_language_param|String
 * 對應到樣板的語系檔
 */
KALS_stamp.prototype._$nav_heading = 'heading';

/**
 * 設定視窗的寬度
 * @type Number 單位是px，null表示不設定
 */
KALS_stamp.prototype._$width = 400;

/**
 * 設定視窗的高度
 * @type Number 單位是px，null表示不設定
 */
KALS_stamp.prototype._$height = null;


/**
 * 設定視窗的左右位置
 * 
 * 可用參數：
 *  null: 預設center
 *  left: 置左
 *  right: 置右
 *  center: 置中
 *  middle: 置中
 *  10px: 靠左距離10px
 *  -10px: 靠右距離10px
 *  10%: 靠左距離視窗寬度的10%
 *  -10%: 靠右距離視窗寬度的10%
 * @type String
 */
KALS_stamp.prototype._$position_left = null;

/**
 * 設定視窗的上下位置
 * 
 * 可用參數：
 *  null: 預設10%
 *  top: 置頂
 *  bottom: 置底
 *  center: 置中
 *  middle: 置中
 *  10px: 靠頂距離10px
 *  -10px: 靠底距離10px
 *  10%: 靠頂距離視窗寬度的10%
 *  -10%: 靠底距離視窗寬度的10%
 * @type String
 */
KALS_stamp.prototype._$position_top = null;

/**
 * ====================
 * 導覽列相關的設定
 * ====================
 */

/**
 * 導覽列相關的設定
 * @type JSON
 */

KALS_stamp.prototype.nav_config = {
    /**
     * 顯示資料
     * @type Boolean
     */
    display: true,
    
    /**
     * 決定顯示導覽列的位置
     * 
     * 類型包括：
     * - common: 不管什麼類型都會顯示(在以下三種類型中都會顯示)
     * - login: 已經登入的使用者就會顯示
     * - profile: 以手動登入的使用者才會顯示
     * - embed: 以內嵌登入的使用者才會顯示
     * - anonymous: 未登入的使用者才會顯示
     * @type String
     */
    nav_type: "login",
    
    /**
     * 排序順序
     * 
     * 數字越大，越往左邊靠
     * 數字最小的是1
     * @type Number
     */
    order: 1
};

/**
 * ====================
 * Action設定，跟view相關的action
 * ====================
 */

/**
 * 開啟時的載入動作
 * 
 * 開啟KALS_stamp的視窗時，跟伺服器請求資訊，以載入必要資料到view上顯示的動作
 * 
 * @returns {KALS_stamp.prototype}
 */
KALS_stamp.prototype.onopen = function () {
    
    $.test_msg("onopen?");
    this.set_stamp_qualified();
    this.set_stamp_qualification();
    
    return this;
};

/**
 * 設定已經獲得的獎章
 * @returns {KALS_stamp.prototype}
 */
KALS_stamp.prototype.set_stamp_qualified = function() {
    
    // @TODO 20140516 Pulipuli Chen
    // 這邊設定的是假資料，請把它改成真的資料
    
    var _qualified_config = {
        "獎章1": "您已經獲得了獎章1，歡迎來到KALS標註系統，希望您在這裡能夠愉快地閱讀。",
        "獎章2": "您已經獲得了獎章2，可以開啟某某功能。您做得很棒喔！"
    };
    
    var _qualified_container = this.find(".stamp-qualified")
            .empty();
    
    for (var _stamp_title in _qualified_config) {
        var _title = $("<dt></dt>").html(_stamp_title)
                .appendTo(_qualified_container);
        var _qualified_message = _qualified_config[_stamp_title];
        var _message = $("<dd></dd>").html(_qualified_message)
                .appendTo(_qualified_container);
    }
        
    return this;
};

/**
 * 設定尚未獲得的獎章
 * @returns {KALS_stamp.prototype}
 */
KALS_stamp.prototype.set_stamp_qualification = function() {
    
    // @TODO 20140516 Pulipuli Chen
    // 這邊設定的是假資料，請把它改成真的資料
    
    var _qualification_config = {
        "獎章3": "您必須與其他朋友多多互動。多多回應朋友或按下其他人的喜愛按鈕吧！",
        "獎章4": "您必須讓其他朋友與您互動，如果您被回應的篇數及喜愛的篇數夠多，您就能獲得這個獎章！"
    };
    
    var _qualification_container = this.find(".stamp-qualification")
            .empty();
    
    for (var _stamp_title in _qualification_config) {
        var _title = $("<dt></dt>").html(_stamp_title)
                .appendTo(_qualification_container);
        var _qualification_message = _qualification_config[_stamp_title];
        var _message = $("<dd></dd>").html(_qualification_message)
                .appendTo(_qualification_container);
    }
        
    return this;
};


/* End of file KALS_stamp */
/* Location: ./system/application/views/web_apps/extension/KALS_stamp/KALS_stamp.js */