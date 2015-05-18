/**
 * Frag_reading
 * 閱讀進度
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
function Frag_reading() {
    // 繼承宣告的步驟之一
    KALS_controller_window.call(this);
    
    // 初始化要做的動作
    var _this = this;
    if (typeof(KALS_context) === "object") {
        // 讀取完KALS_context後
        KALS_context.add_listener(function () {
            _this.initialize_save_reading_progress();
            
            // 暫時使用
            _this.save_reading_progress();
        });
    }
        
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
Frag_reading.prototype = new KALS_controller_window();

/**
 * 指定Module的名稱
 * 
 * 也是顯示在Hash的名稱。如果是null，則會顯示KALS_modal._$modal_name
 * @type String
 */
//Frag_reading.prototype.prototype.name = 'frag_reading';

/**
 * ====================
 * View設定
 * ====================
 */

/**
 * 指定View
 * @type String
 */
Frag_reading.prototype._$view = 'modules/frag_reading/view/Frag_reading';

/**
 * 初始化View
 * 
 * 如果要在Controller啟動時為UI做設定，請覆寫這個方法
 * 這個方法只會執行一次
 */
Frag_reading.prototype._$initialize_view = function () {
    
    // 打開ui後要做的事情
    var _word_id = KALS_text.selection.text.word.get_current_progress_word();
    var _position = $(window).scrollTop();
    
    this.set_field("position",  _position);
    this.set_field('word_id', _word_id);  
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
Frag_reading.prototype._$model = 'frag_reading';

/**
 * 初始化物件時執行的Action
 * @type String|null null=不執行任何action
 */
Frag_reading.prototype._$init_request_action = null;

/**
 * open()時執行的Action
 * @type String|null null=不執行任何action
 */
Frag_reading.prototype._$open_request_action = null;

/**
 * close()時執行的Action
 * @type String|null null=不執行任何action
 */
Frag_reading.prototype._$close_request_action = null;


/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 是否開啟偵錯功能
 * @type Boolean
 */
Frag_reading.prototype._$enable_debug = true;

/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 啟用權限檢查機制
 * @type {Boolean}
 */
Frag_reading.prototype._$enable_auth_check = true;

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
Frag_reading.prototype._$auth_check = function (_is_login, _user) {
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
Frag_reading.prototype._$absolute = false;

/**
 * 視窗的Class Name
 * @type String
 */
Frag_reading.prototype._$name = 'Frag_reading';

/**
 * 視窗的標題
 * 
 * @type KALS_language_param
 * 對應到樣板的語系檔
 */
Frag_reading.prototype._$heading = 'heading';

/**
 * 視窗位於導覽列的按鈕名稱
 * 
 * @type KALS_language_param|String
 * 對應到樣板的語系檔
 */
Frag_reading.prototype._$nav_heading = 'heading';

/**
 * 設定視窗的寬度
 * @type Number 單位是px，null表示不設定
 */
Frag_reading.prototype._$width = 400;

/**
 * 設定視窗的高度
 * @type Number 單位是px，null表示不設定
 */
Frag_reading.prototype._$height = null;


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
Frag_reading.prototype._$position_left = null;

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
Frag_reading.prototype._$position_top = null;

/**
 * ====================
 * 導覽列相關的設定
 * ====================
 */

/**
 * 導覽列相關的設定
 * @type JSON
 */

Frag_reading.prototype.nav_config = {
    /**
     * 顯示資料 
     * @type Boolean
     */
    // 先不顯示在上方列
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
 * 開啟最新的標註
 * 
 * 這是kals-event-field-set的範例
 * 
 * @param {jQuery} _ele
 * 由於是kals-event-field-set事件，所以固定會回傳觸發事件的jQuery物件
 * @returns {Dashboard.prototype}
 */
Frag_reading.prototype.setup_activity = function (_ele) {
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
Frag_reading.prototype.open_recent_annotation = function() {
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
Frag_reading.prototype.action = function (_param) {
    
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
 * @returns {Dashboard.prototype}
 */
Frag_reading.prototype.init_hotkey = function () {
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
 * @returns {Dashboard.prototype}
 */
Frag_reading.prototype.select = function (_ele) {
    this.debug('select', this._data);
    var _annotation_id = this.get_field('last_annotation_id');
    this.select_annotation(_annotation_id);
    return this;
};

/*
Frag_reading.prototype._$onopen = function () {
    $.test_msg("onopen");
};
*/

/**
 * 設定自動save_reading_progress的時間頻率
 * 
 * 預設10秒
 * @type Number
 */
Frag_reading.prototype.interval_span = 10;

/**
 * 頁面停止時延遲的增加時間
 * 
 * 預設30秒
 * @type Number
 */
Frag_reading.prototype.increase_interval_span = 30;

/**
 * 計時器
 * @type type
 */
Frag_reading.prototype._check_timer = null;

/**
 * initialize_save_reading_progress()
 * 初始化載入完KALS_context後要做的事情
 * 
 */
Frag_reading.prototype.initialize_save_reading_progress = function(){
    var _this = this;
    var _interval_span = this.interval_span *1000;
    var _check_interval_span = this.interval_span *2000;
    var _current_word = null;
    var _before_word = null;
    
    var _check_progress = function (){
        //現在的word_id不等於之前的word_id
        //alert('start');
        
        if (typeof(KALS_text) !== "object" 
                || typeof(KALS_text.selection) !== "object" 
                || KALS_text.selection === null 
                || typeof(KALS_text.selection.text) !== "object" 
                || KALS_text.selection.text === null
                || typeof(KALS_text.selection.text.word) !== "object"
                || typeof(KALS_text.selection.text.word.get_current_progress_word) !== "function") {
            //return this;
        }
        else {
            KALS_text.selection.text.word.get_current_progress_word(_save_process);
        }
        
    };
    
    var _save_process = function (_current_word) {
        
        //進入if之前的值
        //$.test_msg('before IF, before_word, current word', [_before_word, _current_word]); 
        
        
        //var _check_timer;
        if ( _current_word !== _before_word || _before_word === null) {
            _interval_span = _this.interval_span *1000;
            /*
            _check_timer = setTimeout(function(){
                alert('1!');
                _interval_span = KALS_CONFIG.modules.Frag_reading.interval_span *1000;
                //_this.save_reading_progress();
                alert('this.save_reading_progress!');
                $.test_msg('before, current, interval', [ _before_word, _current_word, _interval_span]);  
            }
            , _interval_span);  //_basic_timer = setTimeout(function(){
            */
           
           //$.test_msg('save_reading_progress before, current, interval', [ _before_word, _current_word, _interval_span]);  
           _this.save_reading_progress(_current_word);
        }
        else {
            //alert('else');
            _interval_span = _interval_span 
                    + _this.increase_interval_span *1000;
            /*
            _check_timer = setTimeout(function(){
                //_this.save_reading_progress();
                $.test_msg('add interval', [_interval_span, _current_word, _before_word]);
            }
            , _interval_span);  //_basic_timer = setTimeout(function(){
            */
           //$.test_msg('else before, current, interval', [ _before_word, _current_word, _interval_span]);  
        }  
        _before_word = _current_word; 
        //alert('back');
        
        //$.test_msg("next", [_current_word, _interval_span]);
        
        //var _interval_span = _check_progress();
        if ($.is_number(_interval_span) && isNaN(_interval_span) === false) {
            _this._check_timer = setTimeout(function () {
                _check_progress(); 
            }, _interval_span);
        }
        else {
            $.test_msg("interval_span錯誤", [_interval_span, this.increase_interval_span, this.interval_span]);
        }
        
    };
    
    var _start_timer = function () {
        _this._check_timer = setTimeout(function () {
            _check_progress();
        }, _check_interval_span);
    };
    
    _start_timer();
    
    $(window).blur(function () {
        //$.test_msg("離開視窗了");
        clearTimeout(_this._check_timer);
    });
    
    $(window).focus(function () {
        //$.test_msg("回到視窗了");
        _start_timer();
    });
    
    $(window).unload(function (){
        _this.save_reading_progress();}
    );
  
};

/**
 * 儲存現在的閱讀進度
 * 
 * @param {Int} _current_word 現在進度的word_id
 */
Frag_reading.prototype.save_reading_progress = function(_current_word){
    
    // 未登入時不使用
    if (KALS_context.auth.is_login() === false
            || _current_word === undefined
            || _current_word === false
            || _current_word === null) {
        return this;
    }
    
    if (typeof(KALS_text) !== "object" 
            || typeof(KALS_text.selection) !== "object"
            || typeof(KALS_text.selection.text) !== "object") {
        return this;
    }
    
    // 取得現在頁面上的第一個字的word_id
    var _word_id = KALS_text.selection.text.word.get_current_progress_word();    
    //$.test_msg("save_reading_progress word_id", _word_id);
    
    var _action = 43; //"Frag_reading.save"
    var _message = {
        current_word: _current_word
    };
    KALS_util.log(_action, _message, function () {
        $.test_msg("儲存完成");
    });
    //$.test_msg('current_scroll', _current_scroll);
    //context_complete();    
    return this;
};

/* End of file Dashboard */
/* Location: ./system/application/views/web_apps/extension/dashboard/Dashboard.js */