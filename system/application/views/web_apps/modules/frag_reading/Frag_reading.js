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
    var _word_id = 18;
    var _test_msg = 'test';
    var _position = $(window).scrollTop();
    var _doc_height = $(document).height();
    
    this.set_field("position",  _position);
    this.set_field("doc_height",  _doc_height);
    
    
    this.set_field('word_id', _word_id);
    this.set_field('test_msg', _test_msg);
    
  
    
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
 * initialize_save_reading_progress()
 * 初始化載入完KALS_context後要做的事情
 * 
 */
Frag_reading.prototype.initialize_save_reading_progress = function(){
    var _this = this;
    var _interval_span = KALS_CONFIG.modules.Frag_reading.interval_span *1000;
    setInterval(function(){
        _this.save_reading_progress();},
        _interval_span
    );
    
    $(window).unload(function (){
        _this.save_reading_progress();}
    );
  
};

/**
 * save_reading_progress
 */
Frag_reading.prototype.save_reading_progress = function(){
    // 1.先比對kals_paragraph_i
    // 2.再比對該層內的word_id 直到比現在捲軸位置還大(y)的 記錄id
    var _scroll_top = $(window).scrollTop();
    _scroll_top = _scroll_top + KALS_toolbar.get_height();
    //_scroll_top = _scroll_top + $(".kals-word:first").height();
    //var _paragraph_height = parseInt($('.kals_paragraph_0').offset().top, 10); //第一個paragraph的高度   
    //var _first_paragraph = _paragraph_height;
    // 取得kals_paragraph的個數
    var _paragraph_collection = $('.kals-paragraph');
    
    //$.test_msg('save_reading_progress, para length', _paragraph_len);
    //if( _position > _first_paragraph) { //起始位置已經到第一個paragraph\
        var _target_paragraph;
    
        for (var _index = 0; _index < _paragraph_collection.length; _index++ ) {
            var _paragraph = _paragraph_collection.eq(_index);
            //var _paragraph_height = parseInt($('.kals_paragraph_' + _i).offset().top, 10);        
            var _paragraph_height = $.get_offset_top(_paragraph.find(".kals-word:first"));
            $.test_msg('save_reading_progress', [_paragraph_height, _scroll_top, _index]);
            
            if (_paragraph_height > _scroll_top) {
                _target_paragraph = _paragraph_collection.eq(_index-1);
                break;
            }
            //$.test_msg('i', _i);
        }
        
        var _target_word;
        if (_target_paragraph !== undefined) {
            var _words = _target_paragraph.find(".kals-word");
            
            for (var _w = 0; _w < _words.length; _w++) {
                _target_word = _words.eq(_w);
                var _word_height = $.get_offset_top(_target_word);
                
                if (_word_height > _scroll_top) {
                    break;
                }
                if (_w === _words.length - 1) {
                    var _word_id = $.get_prefixed_id(_target_word.attr("id"));
                    _target_word = $("#kals_word_" + (_word_id+1));
                    break;
                }
            };
        }
        else {
            _target_word = $(".kals-word:last");
        }
        
        var _word_id;
        if (_target_word !== undefined) {
            _word_id = _target_word.attr("id");
            _word_id = $.get_prefixed_id(_word_id);
        }
        
        $.test_msg("save_reading_progress word_id", [_word_id, _target_paragraph.attr("className")]);
    //}
  
    // 比較paragraph與現在捲軸位置(y)

    //this.set_field("current_position", _position);
  
    
};

/* End of file Dashboard */
/* Location: ./system/application/views/web_apps/extension/dashboard/Dashboard.js */