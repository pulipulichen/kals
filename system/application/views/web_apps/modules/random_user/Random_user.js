/**
 * Random_user
 *
 * 結合樣板的控制器
 * KALS Framework的Controller示範
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     red mao hong <r3dmaohong@gmail.com>
 * @copyright  Copyright (c) 2015, red mao hong
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2015/04/20 下午 04:29
 * @extends {KALS_controller_window}
 */
function Random_user() {
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
Random_user.prototype = new KALS_controller_window();

/**
 * 指定Module的名稱
 * 
 * 也是顯示在Hash的名稱。如果是null，則會顯示KALS_modal._$modal_name
 * @type String
 */
Random_user.prototype.name = 'Random_user';

/**
 * ====================
 * View設定
 * ====================
 */

/**
 * 指定View
 * @type String
 */
Random_user.prototype._$view = 'modules/random_user/view/Random_user';

/**
 * 初始化View
 * 
 * 如果要在Controller啟動時為UI做設定，請覆寫這個方法
 * 這個方法只會執行一次
 */
Random_user.prototype._$initialize_view = function () {
    
    // 設置熱鍵
    //this.init_hotkey();
    
    var _types = this.get_annotation_types();
    //this.set_field('annotation_type', ['1', '2', '3']);
    //_types = _types.question;
    //this.debug('init view', typeof(_types.get_ui));
    this.set_field('annotation_type', _types);
    
    // 設定連結
    var _mobile_topics_link = KALS_context.get_base_url("mobile_apps/annotation_topics", true);
    this.find("a.mobile-topics-link").attr("href", _mobile_topics_link);
    
    var _rss_feed_link = KALS_context.get_base_url("/rss");
    this.find("a.rss-feed-link").attr("href", _rss_feed_link);
    
    
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
Random_user.prototype._$model = 'Random_user';

/**
 * 初始化物件時執行的Action
 * @type String|null null=不執行任何action
 */
Random_user.prototype._$init_request_action = null;

/**
 * open()時執行的Action
 * @type String|null null=不執行任何action
 */
Random_user.prototype._$open_request_action = 'open';

/**
 * close()時執行的Action
 * @type String|null null=不執行任何action
 */
Random_user.prototype._$close_request_action = null;


/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 是否開啟偵錯功能
 * @type Boolean
 */
Random_user.prototype._$enable_debug = true;

/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 啟用權限檢查機制
 * @type {Boolean}
 */
Random_user.prototype._$enable_auth_check = true;

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
Random_user.prototype._$auth_check = function (_is_login, _user) {
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
 */
Random_user.prototype._$absolute = false;

/**
 * 視窗的Class Name
 * @type String
 */
Random_user.prototype._$name = 'Random_user';

/**
 * 視窗的標題
 * 
 * @type KALS_language_param
 * 對應到樣板的語系檔
 */
Random_user.prototype._$heading = 'heading';

/**
 * 視窗位於導覽列的按鈕名稱
 * 
 * @type KALS_language_param|String
 * 對應到樣板的語系檔
 */
Random_user.prototype._$nav_heading = 'heading';

/**
 * 設定視窗的寬度
 * @type Number 單位是px，null表示不設定
 */
Random_user.prototype._$width = 400;

/**
 * 設定視窗的高度
 * @type Number 單位是px，null表示不設定
 */
Random_user.prototype._$height = null;


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
Random_user.prototype._$position_left = null;

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
Random_user.prototype._$position_top = null;

/**
 * ====================
 * 導覽列相關的設定
 * ====================
 */

/**
 * 導覽列相關的設定
 * @type JSON
 */

Random_user.prototype.nav_config = {
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
 * Action設定
 * ====================
 */

/**
 * 開啟視窗時的載入動作
 * 
 * @returns {Random_user}
 */
Random_user.prototype._$onopen = null;

//Random_user.prototype._$onopen = function () {
//    
//    var _this = this;
//    //var _login_id = 1362;
//    this.request_get("open", {}, function (_data) {
// 
//        _this.set_data(_data);
//
//
//    });
    
    //return this;

//};

Random_user.prototype.search_user = function (_ele) {
    var _user_name = _ele.text();
    var _param = {
        query_field: "annotation_user_name",
        query_value:_user_name
    };
    KALS_context.search.search(_param);
};

Random_user.prototype.search_hot_topic = function (_ele) {
    //var _name = _ele.text();
    var _param = {
        query_field: "",
        query_value: "熱門標註", 
        order_by: "responded"
        //order_by: ["update","create","responded","liked", "scope"]	
        
    };
    KALS_context.search.search(_param);
};


/**
 * 開啟最新的標註
 * 
 * 這是kals-event-field-set的範例
 * 
 * @param {jQuery} _ele
 * 由於是kals-event-field-set事件，所以固定會回傳觸發事件的jQuery物件
 * @returns {Random_user}
 */
Random_user.prototype.setup_activity = function (_ele) {
    if (this.has_field("activity")) {
        var _activity = this.get_field('activity').toLowerCase();
        _ele.attr('className', 'activity-' + _activity);
    }
    return this;
};

/**
 * 開啟最近的標註
 * @returns {Random_user}
 */
Random_user.prototype.open_recent_annotation = function() {
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
 * 這是一個action
 * 
 * function的細節
 * 
 * @param {JSON} _param 傳入的參數
 * @returns {Boolean} true=成功;false=失敗
 * @author Pulipuli Chen 20131122
 */
Random_user.prototype.action = function (_param) {
    
    /**
     * @type {boolean} 這個變數的名字
     */
    var _param2 = true;
    
    
    return false;
};

/**
 * 使用Hotkey的範例
 * http://unixpapa.com/js/key.html
 * 
 * 這是this.set_hotkey()的範例
 * 
 * @returns {Random_user}
 */
Random_user.prototype.init_hotkey = function () {
    // 65表示A
    // 按鍵對應的編號請參考http://unixpapa.com/js/key.html
    var _hotkey = 65;   
    
    var _this = this;    
    this.set_hotkey(_hotkey, function () {
        _this.open();
    });
    
    return this;
};

/**
 * 選擇指定標註的action
 * 
 * 這是this.select_annotation()的範例
 * 
 * @param {jQuery} _ele
 * @returns {Random_user}
 */
Random_user.prototype.select = function (_ele) {
    this.debug('select', this._data);
    var _annotation_id = this.get_field('last_annotation_id');
    this.select_annotation(_annotation_id);
    return this;
};

/* End of file Random_user */
/* Location: ./system/application/views/web_apps/extension/Random_user/Random_user.js */