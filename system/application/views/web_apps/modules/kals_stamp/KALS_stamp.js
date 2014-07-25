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
    
    var _this = this;
    
    KALS_context.add_listener(function () {
        _this._init_listener();
    });
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
KALS_stamp.prototype._$absolute = true;

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
KALS_stamp.prototype._$onopen = function () {
    
    this.set_stamp_statistic();
    this.set_stamp_qualified();
    this.set_stamp_qualification();
    KALS_context.user.load_user_params();
    return this;
};

/**
 * 設定目前獎章的進度
 * @returns {KALS_stamp.prototype}
 */
KALS_stamp.prototype.set_stamp_statistic = function() {

    //todo想一下該怎麼做出全部的TYPE
    var _type_importance = 'importance';
    var _annotation_type_importance = new Annotation_type_param(_type_importance);
    var _type_confusion = 'confusion';
    var _annotation_type_confusion = new Annotation_type_param(_type_confusion); 
    var _type_summary = 'summary';
    var _annotation_type_summary = new Annotation_type_param(_type_summary);    
    
    var _statistic_config = {
        
        //topic總數量       
        "statistic_topic_annotation_count": KALS_context.user.get_topic_annotation_count(),
        // topic重要數量
        "statistic_topic_annotation_importance_count": KALS_context.user.get_topic_annotation_count(_annotation_type_importance),
        // topic困惑數量
        "statistic_topic_annotation_confusion_count": KALS_context.user.get_topic_annotation_count(_annotation_type_confusion),
        // topic摘要數量
        "statistic_topic_annotation_summary_count": KALS_context.user.get_topic_annotation_count(_annotation_type_summary),
        //被回應的數量
        "statistic_responded_annotation_count":KALS_context.user.get_respond_to_my_annotation_count(),
        //回應別人的數量
        "statistic_respond_to_annotation_count":KALS_context.user.get_respond_to_other_annotation_count()
    };
    
    var _container_selector = ".stamp-statistic";
    var _container = this.find(_container_selector)
            .empty();
    
    for (var _statistic_title in _statistic_config) {
        var _li = $("<li></li>").appendTo(_container);
        var _title_lang = this.get_view_lang_line(_statistic_title);
        
        var _title = $("<strong></strong>").html(_title_lang + ": ")
                .appendTo(_li);
        var _qualified_message = _statistic_config[_statistic_title];
        var _message = $("<span></span>").html(_qualified_message)
                .appendTo(_li);
    }
        
    return this;
};

/**
 * 設定已經獲得的獎章
 * @returns {KALS_stamp.prototype}
 */
KALS_stamp.prototype.set_stamp_qualified = function() {
 
    // 記得要修改成用迴圈跑喔！
    var _qualified_config = {

         "stamps_level_0": this._stamps_config[0].name,
         "stamps_level_1": this._stamps_config[1].name,
         "stamps_level_2": this._stamps_config[2].name,
         "stamps_level_3": this._stamps_config[3].name,
         "stamps_level_4": this._stamps_config[4].name
    };
    
    var _qualified_container = this.find(".stamp-qualified")
            .empty();
    var _i = 0;
    for (var _stamp_title in _qualified_config) {   
        // 取得is_qualified的值來讓後面的迴圈判斷要不要顯示圖片(取得獎章) 
        if( this._stamps_config[_i].is_qualified === true){
           //KALS_util.notify("現在是幾呢？"+ _i);
            var _stamp_title_lang = this.get_view_lang_line(_stamp_title);
            var _title = $("<dt></dt>").html(_stamp_title_lang)
                    .appendTo(_qualified_container);
            var _qualified_message = _qualified_config[_stamp_title];
            //var _message = $("<dd></dd>").html(_qualified_message)
            //        .appendTo(_qualified_container);
            //var _stamp_picture = $();來加入圖片吧！
            var _stamp_picture = $("<img src=/kals/images/stamp_"+ _i +".png></>").html(_qualified_message)
                    .appendTo(_qualified_container);
            _i++;
        }
    }
        
    return this;
};

/**
 * 設定尚未獲得的獎章
 * @returns {KALS_stamp.prototype}
 */
KALS_stamp.prototype.set_stamp_qualification = function() {   
    
    var _qualification_config = {
         "stamps_level_0": this._stamps_config[0].qualification_message,
         "stamps_level_1": this._stamps_config[1].qualification_message,
         "stamps_level_2": this._stamps_config[2].qualification_message,
         "stamps_level_3": this._stamps_config[3].qualification_message,
         "stamps_level_4": this._stamps_config[4].qualification_message
        };
    var _qualification_container = this.find(".stamp-qualification")
            .empty();
    var _i = 0;
    
    for (var _stamp_title in _qualification_config) {
        if( this._stamps_config[_i].is_qualified !== false){
            _i++;
        }
        else{
            //KALS_util.notify("現在是幾呢？"+ _i);
            var _stamp_title_lang = this.get_view_lang_line(_stamp_title);
            var _title = $("<dt></dt>").html(_stamp_title_lang)
                    .appendTo(_qualification_container);
            var _qualification_message = _qualification_config[_stamp_title];
            var _message = $("<dd></dd>").html(_qualification_message)
                    .appendTo(_qualification_container);
            var _stamp_picture = $("<img src=/kals/images/stamp_"+ _i +".png></>").html(_qualification_message)
                        .appendTo(_qualification_container);
            _i++;
        }
    }
        
    return this;
};

/**
 * ====================
 * 獎章資格設定
 * ====================
 */

KALS_stamp.prototype._stamps_config;

/**
 * 取得設定
 * 
 * 請從KALS_CONFIG中取得獎章模組的資格設定
 * @returns {KALS_stamp.prototype}
 */
KALS_stamp.prototype._init_config = function() {
    // @TODO 20140516 Pulipuli Chen
    this._stamps_config = KALS_CONFIG.modules.KALS_stamp.stamps;
    return this._stamps_config;
};

/**
 * 初始化Context_user的監聽功能
 * @returns {KALS_stamp.prototype}
 */
KALS_stamp.prototype._init_listener = function() {
    
    // @TODO 20140516 Pulipuli Chen
    // 這邊只有監聽部分屬性，請把它擴增其他監聽的事件
    // 監聽其他需要的變數是否有變動，若是有變動則檢查獎章條件
    
    var _this = this;
    KALS_context.user.add_attr_listener("topic_annotation_count", function (_user) {
        //$.test_msg("KALS_stamp _init_listener", KALS_context.completed);
        if (KALS_context.completed === true) {
            _this._delay_check_qualification(_user);
        }
    });
    KALS_context.user.add_attr_listener("responded_annotation_count", function (_user) {
        //$.test_msg("KALS_stamp _init_listener", KALS_context.completed);
        if (KALS_context.completed === true) {
            _this._delay_check_qualification(_user);
        }
    });
    
    return this;
};

KALS_stamp.prototype._delay_timer = null;
KALS_stamp.prototype._delay_interval = 1000;

/**
 * 延遲呼叫check_qualification
 * @param {Context_user} _user
 */
KALS_stamp.prototype._delay_check_qualification = function (_user) {
    
    var _this = this;
    
    // 如果現在有計時器的話
    if (this._delay_timer !== null) {
        // 清空之前的計時器
        clearTimeout(this._delay_timer);
    }
    
    // 設定目前要做的計時器
    this._delay_timer = setTimeout(function () {
        
        _this.check_qualification(_user);
        
        // 執行完畢，計時器清空
        _this._delay_timer = null;
    
        // 要延遲的時間
    }, this._delay_interval);
    
    return this;
};

/**
 * 檢查是否獲得獎章資格
 * 
 * 要考慮已經獲得的資格，以及從無到有獲得資格的時候
 * @param {Context_user} _user 可以從Context_user取得統計資料
 * @returns {KALS_stamp.prototype}
 */
KALS_stamp.prototype.check_qualification = function(_user) {
   
    //-----要check的資料------
    //var _topic_impotrance_count = _user.get_topic_annotation_count();
    //-----------------------
    // var _stamps_data = this._stamps_config;會怪怪的
    var _stamps_data = this._init_config();
    // 全部的資格
    for ( var _i=0; _i< _stamps_data.length; _i++ ){
        // 用來判斷是否有通過資格
        var _stamp_qualified = true;
        var _qualifier = _stamps_data[_i].qualifier;
        // 檢查qualifier中的所有條件
        for (var _key in _qualifier) {
            var _config = _qualifier[_key];
            //ALS_util.notify("_KEY =" + _key); //KEY有哪些
            //------第一項---------------------------------
            if (_key === "topic_annotation_count") {
                
                for (var _type in _config) {
                    var _type_config = _config[_type];
                    
                    if (_type === "_total") {
                        var _total_annotation_count = _user.get_topic_annotation_count();
                        if ( _total_annotation_count < _type_config.count ){
                            // 不合格
                            _stamp_qualified = false;    
                            break;
                        }
                        else{ // 合格
                            _stamp_qualified = true;
                            
                            //KALS_util.notify("第一項有跑嗎？"+ this._stamps_config[_i].is_qualified + _i);
                            //this.qualify();
                        }
                    }
                    else {
                        // 取出指定type的數量
                        var _annotation_type = new Annotation_type_param(_type);
                        var _total_annotation_count = _user.get_topic_annotation_count(_annotation_type);
                        
                        $.test_msg(_i + "現在的類型" + _type, [_total_annotation_count, _type_config.count, ( _total_annotation_count < _type_config.count )]);
                        if ( _total_annotation_count < _type_config.count ){
                            // 不合格
                            _stamp_qualified = false;    
                            break;
                        }
                        else{ // 合格
                            _stamp_qualified = true;
                            //KALS_util.notify("第一項有跑嗎？"+ this._stamps_config[_i].is_qualified + _i);
                            //this.qualify();
                        }
                    }
                }   //for (var _type in _config) {              
               
            }   //if (_key === "topic_annotation_count") {
            //-------第二項respond----------------------------------    
            if (_key === "respond_annotation_count") {
                 var _respond_annotation_count = _user.get_respond_to_other_annotation_count();
                 if ( _respond_annotation_count < _config[_key] ){
                            // 不合格
                            _stamp_qualified = false;
                            KALS_util.notify("第二項respond count未達成"+ _config[_key] + _stamp_qualified);
                            break;
                        }
                        else{ // 合格
                            _stamp_qualified = true;
                        }
             
            }//if (_key === "respond_annotation_count") {       
            //--------第三項like--------------------------------------
            if (_key === "liked_count") {
                 var _liked_count = _user.get_liked_count();
                 if ( _liked_count < _config[liked_count].count ){
                            // 不合格
                            _stamp_qualified = false;
                            KALS_util.notify("第三項like count未達成"+ _config[liked_count].count + _stamp_qualified);
                            break;
                        }
                        else{ // 合格
                            _stamp_qualified = true;
                        }
             }  //if (_key === "respond_annotation_count") { 
             //-------------------------------------------------------
            this._stamps_config[_i].is_qualified = _stamp_qualified;
            if (_stamp_qualified === false) {
                break;
            }
        }   //for (var _key in _qualifier) {
        
        // 獲得獎章的設定
        this._stamps_config[_i].is_qualified = _stamp_qualified;
        //KALS_util.notify("現在到底有什麼~"+ this._stamps_config[_i].name + this._stamps_config[_i].is_qualified);
        //---------------     
    }   //for (var _key in _qualifier) {
    
    this.qualify();
    
    this.open();
    
    return this;
};

/**
 * 獲得資格後的動作->開放權限？
 * 
 * @returns {KALS_stamp.prototype}
 */
KALS_stamp.prototype.qualify = function() {
    // 設定開啟功能
    var _stamps_data = this._init_config();
    for( var _i in _stamps_data){
        if(this._stamps_config[_i].is_qualified === true){
            var _policy = _stamps_data[_i].policy;
            // 用迴圈檢視設定policy中的權限設定
            for( var _k in _policy ){
                // _ k = topic_writable
                switch (_k){
                    case "topic_writable":
                        KALS_context.policy.set_topic_writable(_policy[_k]);
                       //KALS_util.notify("設定"+_k +"為"+ _policy[_k]);
                        break;
                    case "other_topic_readable":
                        KALS_context.policy.set_other_topic_readable(_policy[_k]);
                        //KALS_util.notify("設定"+_k +"為"+ _policy[_k]);
                        break;
                    case "other_topic_respondable":
                        KALS_context.policy.set_respond_other_topic_wrtiable(_policy[_k]);
                        //KALS_util.notify("設定"+_k +"為"+ _policy[_k]);
                        break;
                    case "other_respond_readable":
                        KALS_context.policy.set_other_respond_readable(_policy[_k]);
                        //KALS_util.notify("設定"+_k +"為"+ _policy[_k]);
                        break;  
                    case "like":
                        KALS_context.policy.set_able_like_topic(_policy[_k]);
                        KALS_context.policy.set_able_like_respond(_policy[_k]);
                       //KALS_util.notify("設定"+_k +"為"+ _policy[_k]);
                        break; 
                    default :
                        KALS_util.notify("no = "+ _policy[_k]);
                }

            }
          KALS_util.notify("現在階段為"+ _stamps_data[_i].name); 

       }
    // KALS_context.policy.set_readable(true);
    }//for( var _i in _stamps_data){
    return this;
};

/* End of file KALS_stamp */
/* Location: ./system/application/views/web_apps/extension/KALS_stamp/KALS_stamp.js */