/**
 * Sna_counting
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
function Sna_counting() {
    // 繼承宣告的步驟之一
    KALS_controller_window.call(this);
//     var _this = this;
//    KALS_context.ready(function () {
//        _this._init_listener();
//    });
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
Sna_counting.prototype = new KALS_controller_window();

/**
 * 指定Module的名稱
 * 
 * 也是顯示在Hash的名稱。如果是null，則會顯示KALS_modal._$modal_name
 * @type String
 */
Sna_counting.prototype.name = 'Sna_counting';

/**
 * ====================
 * View設定
 * ====================
 */

/**
 * 指定View
 * @type String
 */
Sna_counting.prototype._$view = 'modules/sna_counting/view/Sna_counting';

/**
 * 初始化View
 * 
 * 如果要在Controller啟動時為UI做設定，請覆寫這個方法
 * 這個方法只會執行一次
 */
Sna_counting.prototype._$initialize_view = function () {
    
    // 設置熱鍵
    //this.init_hotkey();
    
//    var _types = this.get_annotation_types();
    //this.set_field('annotation_type', ['1', '2', '3']);
    //_types = _types.question;
//    //this.debug('init view', typeof(_types.get_ui));
//    this.set_field('annotation_type', _types);
//    
//    // 設定連結
//    var _mobile_topics_link = KALS_context.get_base_url("mobile_apps/annotation_topics", true);
//    this.find("a.mobile-topics-link").attr("href", _mobile_topics_link);
//    
//    var _rss_feed_link = KALS_context.get_base_url("/rss");
//    this.find("a.rss-feed-link").attr("href", _rss_feed_link);
    
    
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
Sna_counting.prototype._$model = 'Sna_counting';

/**
 * 初始化物件時執行的Action
 * @type String|null null=不執行任何action
 */
Sna_counting.prototype._$init_request_action = null;

/**
 * open()時執行的Action
 * @type String|null null=不執行任何action
 */
Sna_counting.prototype._$open_request_action = 'open';

/**
 * close()時執行的Action
 * @type String|null null=不執行任何action
 */
Sna_counting.prototype._$close_request_action = null;


/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 是否開啟偵錯功能
 * @type Boolean
 */
Sna_counting.prototype._$enable_debug = true;

/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 啟用權限檢查機制
 * @type {Boolean}
 */
Sna_counting.prototype._$enable_auth_check = true;

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
Sna_counting.prototype._$auth_check = function (_is_login, _user) {
    //this.debug('auth check: has login', _is_login);
    //return _is_login;
    return true;
//    if(_user = ""){return true;}
//    else{return false;}
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
Sna_counting.prototype._$absolute = true;

/**
 * 視窗的Class Name
 * @type String
 */
Sna_counting.prototype._$name = 'Sna_counting';

/**
 * 視窗的標題
 * 
 * @type KALS_language_param
 * 對應到樣板的語系檔
 */
Sna_counting.prototype._$heading = 'heading';

/**
 * 視窗位於導覽列的按鈕名稱
 * 
 * @type KALS_language_param|String
 * 對應到樣板的語系檔
 */
Sna_counting.prototype._$nav_heading = 'heading';

/**
 * 設定視窗的寬度
 * @type Number 單位是px，null表示不設定
 */
Sna_counting.prototype._$width = 400;

/**
 * 設定視窗的高度
 * @type Number 單位是px，null表示不設定
 */
Sna_counting.prototype._$height = null;


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
Sna_counting.prototype._$position_left = null;

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
Sna_counting.prototype._$position_top = null;

/**
 * ====================
 * 導覽列相關的設定
 * ====================
 */

/**
 * 導覽列相關的設定
 * @type JSON
 */

Sna_counting.prototype.nav_config = {
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
    nav_type: "common",
    
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
 * @returns {Sna_counting}
 */
Sna_counting.prototype._$onopen = null;
//Sna_counting.prototype._$onopen = function () {
//    
//    this.request_get("test", {"name": "pudding"}, function (_data) {
//        
//        var _name = _data.name;
//        alert(_name);
//        
//    });
//
Sna_counting.prototype._$onopen = function () {
    
    var _this = this;
    //request_post
    
    this.request_get("test3", {}, function (_data) {
        
        
        
        _this.set_data(_data);
        
        

        
    });

    //return this;

};

//
//
//Sna_counting.prototype.setup_stu_list = function(_stu_index) { 
//    
//    var _this = this;
//    
//    var _list_ele = $("<tr/>");
//    
//    $("<th />")
//            .html('<div class="header">' + _stamp_title_lang + "</div>"
//                + _image)
//            .appendTo(_list_ele);
//    
//    var _td = $("<td />").appendTo(_list_ele);
//    
//    for (var _i in _user_name_list) {
//
//        var _name_span = $('<li class="user-name-list" />').html(_user_name_list[_i]);
//        _name_span.appendTo(_td);
//
//        _name_span.click(function() {
//            var _query_value = $(this).html();
//            _this.close(function () {
//                //setTimeout(function () {
//                    //搜尋
//                    KALS_context.search.search({
//                        query_field: "annotation_user_name",
//                        query_value: _query_value
//                    }, true);
//                //}, 500);
//            });
//        });

        //_name_span.addClass("list-span");

        //_name_span.css("float","left");
//
//        if (_i % 3 === 0) {
//            _name_span.css("clear", "both");
//        } 
//    }   //for (var _index in _name_arr) {
//    
//    return _list_ele;
//};

/**
 * 開啟最新的標註
 * 
 * 這是kals-event-field-set的範例
 * 
 * @param {jQuery} _ele
 * 由於是kals-event-field-set事件，所以固定會回傳觸發事件的jQuery物件
 * @returns {Sna_counting}
 */
//Sna_counting.prototype.setup_activity = function (_ele) {
//    if (this.has_field("activity")) {
//        var _activity = this.get_field('activity').toLowerCase();
//        _ele.attr('className', 'activity-' + _activity);
//    }
//    return this;
//};

/**
 * 開啟最近的標註
 * @returns {Sna_counting}
 */
//Sna_counting.prototype.open_recent_annotation = function() {
//    if (this.is_opened()) {
//        this.close(function () {
//            KALS_context.search.open_recent_annotation();
//        });
//    }
//    else {
//        KALS_context.search.open_recent_annotation();
//    }
//        
//    return this;
//};

/**
 * 這是一個action
 * 
 * function的細節
 * 
 * @param {JSON} _param 傳入的參數
 * @returns {Boolean} true=成功;false=失敗
 * @author Pulipuli Chen 20131122
 */
Sna_counting.prototype.action = function (_param) {
    
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
 * @returns {Sna_counting}
 */
//Sna_counting.prototype.init_hotkey = function () {
//    // 65表示A
//    // 按鍵對應的編號請參考http://unixpapa.com/js/key.html
//    var _hotkey = 65;   
//    
//    var _this = this;    
//    this.set_hotkey(_hotkey, function () {
//        _this.open();
//    });
//    
//    return this;
//};

/**
 * 選擇指定標註的action
 * 
 * 這是this.select_annotation()的範例
 * 
 * @param {jQuery} _ele
 * @returns {Sna_counting}
 */
//Sna_counting.prototype.select = function (_ele) {
//    this.debug('select', this._data);
//    var _annotation_id = this.get_field('last_annotation_id');
//    this.select_annotation(_annotation_id);
//    return this;
//};

//Sna_counting.prototype.setup_stu_list_create = function(_user_name_list) { 
//    
//    var _this = this;
//    
//    var _list_ele = $("<tr/>");
//    
//    //var _stamp_data = this._init_config();
//    
//    //var _show_list = _stamp_data[_stamp_index].show_list;
//    //if (_show_list === false) {
//     //   return null;
//   // }
//    
//   // var _stamp_title_lang = _stamp_data[_stamp_index].name;
//    
//    //var _image_url = _stamp_data[_stamp_index].image_url;
//   // _image_url = KALS_context.url.filter_base_url(_image_url);
//    //var _image = '<img src="' + _image_url + '" />';
//    
//    //$("<th />")
//   //        .html('<div class="header">' + _stamp_title_lang + "</div>"
//   //            + _image)
//    //        .appendTo(_list_ele);
//    
//    var _td = $("<td />").appendTo(_list_ele);
//    
//    for (var _i in _user_name_list) {
//
//        var _name_span = $('<li class="user-name-list" />').html(_user_name_list[_i]);
//        _name_span.appendTo(_td);
//
//        _name_span.click(function() {
//            var _query_value = $(this).html();
//            _this.close(function () {
//                //setTimeout(function () {
//                    //搜尋
//                    KALS_context.search.search({
//                        query_field: "annotation_user_name",
//                        query_value: _query_value
//                    }, true);
//                //}, 500);
//            });
//        });
//
//        //_name_span.addClass("list-span");
//
//        //_name_span.css("float","left");
//
//        if (_i % 3 === 0) {
//            _name_span.css("clear", "both");
//        } 
//    }   //for (var _index in _name_arr) {
//    
//    return _list_ele;
//};





/* End of file Sna_counting */
/* Location: ./system/application/views/web_apps/extension/Sna_counting/Sna_counting.js */