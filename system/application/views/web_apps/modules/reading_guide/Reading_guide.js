/**
 * Reading_guide
 *
 * 導讀功能
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2013/12/30 下午 03:36:17
 * @extends {KALS_controller_window}
 */
function Reading_guide() {
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
Reading_guide.prototype = new KALS_controller_window();

/**
 * ====================
 * View設定
 * ====================
 */

/**
 * 指定View
 * @type String
 */
Reading_guide.prototype._$view = 'modules/reading_guide/view/Reading_guide';

/**
 * 初始化View
 * 
 * 如果要在Controller啟動時為UI做設定，請覆寫這個方法
 * 這個方法只會執行一次
 */
//Reading_guide.prototype._$initialize_view = function () {
//};

/**
 * ====================
 * Model設定
 * ====================
 */

/**
 * 指定Model
 * @type String
 */
Reading_guide.prototype._$model = null;

/**
 * 初始化物件時執行的Action
 * @type String|null null=不執行任何action
 */
Reading_guide.prototype._$init_request_action = null;

/**
 * open()時執行的Action
 * @type String|null null=不執行任何action
 */
Reading_guide.prototype._$open_request_action = null;

/**
 * close()時執行的Action
 * @type String|null null=不執行任何action
 */
Reading_guide.prototype._$close_request_action = null;


/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 是否開啟偵錯功能
 * @type Boolean
 */
Reading_guide.prototype._$enable_debug = true;

/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 啟用權限檢查機制
 * @type {Boolean}
 */
Reading_guide.prototype._$enable_auth_check = true;

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
Reading_guide.prototype._$auth_check = function (_is_login, _user) {
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
Reading_guide.prototype._$absolute = true;

/**
 * 視窗的Class Name
 * @type String
 */
Reading_guide.prototype._$name = 'Reading_guide';

/**
 * 視窗的標題
 * 
 * @type KALS_language_param
 * 對應到樣板的語系檔
 */
Reading_guide.prototype._$heading = 'heading';

/**
 * 視窗位於導覽列的按鈕名稱
 * 
 * @type KALS_language_param|String
 * 對應到樣板的語系檔
 */
Reading_guide.prototype._$nav_heading = 'heading';

/**
 * 設定視窗的寬度
 * @type Number 單位是px，null表示不設定
 */
Reading_guide.prototype._$width = 300;

/**
 * 設定視窗的高度
 * @type Number 單位是px，null表示不設定
 */
Reading_guide.prototype._$height = null;

/**
 * ====================
 * Action設定
 * ====================
 */

/**
 * 設定步驟參數
 * @param {Annotation_collection_param} _coll
 * @returns {Reading_guide}
 */
Reading_guide.prototype.setup_steps = function (_coll) {
    
    $.test_msg("設定步驟參數", _coll.annotations.length);
    
    if ($.is_class(_coll, "Annotation_collection_param")) {
        //var _scope_coll = _coll.export_scope_colleciotn_json();
        var _scope_coll = _coll.get_scope_colleciotn_param_array();
        //$.test_msg("匯出位置參數", _scope_coll.length);
        
        var _output_scope_coll = [];
        var _last_scope_json = null;
        for (var _s in _scope_coll) {
            var _scope_coll_param = _scope_coll[_s];
            var _scope_json = _scope_coll_param.export_json(false); //$.json_encode(_scope_array);
            _scope_json = $.json_encode(_scope_json);
            if (_scope_json === _last_scope_json) {
                continue;
            }
            //else {
            //    $.test_msg("沒有差異1", _scope_json);
            //    $.test_msg("沒有差異2", _last_scope_json);
            //}
            
            // 取出文字
            var _text = KALS_text.selection.text;
            var _anchor_text = _text.get_anchor_text(_scope_coll_param);
            _output_scope_coll.push(_anchor_text + ", " + _scope_json);    
            
            _last_scope_json = _scope_json;
        }
        
        //$.test_msg("取得位置？", _output_scope_coll);
        this.set_field("select_step", _output_scope_coll);
    }
        
    
   //this.set_field("annotation_step", "12112");
    
    var _this = this;
    this.open(function () {
        //_this.set_field("annotation_step", "12112");
    });
    return this;
};

/* End of file Reading_guide */
/* Location: ./system/application/views/web_apps/extension/Reading_guide/Reading_guide.js */