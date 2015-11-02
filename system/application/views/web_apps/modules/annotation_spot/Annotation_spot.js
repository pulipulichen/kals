/**
 * Annotation_spot
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
 * @version    1.0 2015/11/2 下午 03:36:17
 * @extends {KALS_controller_window}
 */
function Annotation_spot() {
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
Annotation_spot.prototype = new KALS_controller_window();

/**
 * 指定Module的名稱
 * 
 * 也是顯示在Hash的名稱。如果是null，則會顯示KALS_modal._$modal_name
 * @type String
 */
Annotation_spot.prototype.name = 'annotation_spot';

/**
 * ====================
 * View設定
 * ====================
 */

/**
 * 指定View
 * @type String
 */
Annotation_spot.prototype._$view = 'modules/annotation_spot/view/Annotation_spot';

/**
 * 初始化View
 * 
 * 如果要在Controller啟動時為UI做設定，請覆寫這個方法
 * 這個方法只會執行一次
 * 
 * return Annotation_spot
 */
Annotation_spot.prototype._$initialize_view = function () {
    
    // 測試範圍
    //this._scope_coll = new Scope_collection_param(7, 14);
    
    // 錨點的部分
    var _anchor = new View_anchor_text_component(this._scope_coll);
    this.find(".view-anchor-text-component").append(_anchor.get_ui());
    
    // 列表的部分
    var _list = new View_list_collection(this._scope_coll);
    this.find(".list-collection view-list").append(_list.get_ui());
    
    // 編輯器的部分
    var _editor = new View_editor_container(this._scope_coll, _list);
    this.find(".editor-container").append(_editor.get_ui());
    
    return this;
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
Annotation_spot.prototype._$model = 'dashboard';

/**
 * 初始化物件時執行的Action
 * @type String|null null=不執行任何action
 */
Annotation_spot.prototype._$init_request_action = null;

/**
 * open()時執行的Action
 * @type String|null null=不執行任何action
 */
Annotation_spot.prototype._$open_request_action = 'open';

/**
 * close()時執行的Action
 * @type String|null null=不執行任何action
 */
Annotation_spot.prototype._$close_request_action = null;


/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 是否開啟偵錯功能
 * @type Boolean
 */
Annotation_spot.prototype._$enable_debug = true;

/**
 * ====================
 * KALS_controller_window設定
 * ====================
 */

/**
 * 獨立視窗功能
 * @type Boolean true=開啟獨立視窗|false=依附在KALS_window底下
 */
Annotation_spot.prototype._$absolute = true;

/**
 * 視窗的Class Name
 * @type String
 */
Annotation_spot.prototype._$name = 'Annotation_spot';

/**
 * 視窗的標題
 * 
 * @type KALS_language_param
 * 對應到樣板的語系檔
 */
Annotation_spot.prototype._$heading = 'heading';

/**
 * 視窗位於導覽列的按鈕名稱
 * 
 * @type KALS_language_param|String
 * 對應到樣板的語系檔
 */
Annotation_spot.prototype._$nav_heading = 'heading';

/**
 * 設定視窗的寬度
 * @type Number 單位是px，null表示不設定
 */
Annotation_spot.prototype._$width = 600;

/**
 * 設定視窗的高度
 * @type Number 單位是px，null表示不設定
 */
Annotation_spot.prototype._$height = null;


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
Annotation_spot.prototype._$position_left = null;

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
Annotation_spot.prototype._$position_top = null;

/**
 * ====================
 * 導覽列相關的設定
 * ====================
 */

/**
 * 導覽列相關的設定
 * @type JSON
 */

Annotation_spot.prototype.nav_config = {
    /**
     * 顯示資料
     * @type Boolean
     */
    display: false,
    
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
 * @returns {Annotation_spot}
 */
Annotation_spot.prototype._$onopen = null;

/**
 * 這個討論串的範圍
 * @type {Scope_collection_param}
 */
Annotation_spot.prototype._scope_coll = null;

/* End of file Annotation_spot */
/* Location: ./system/application/views/web_apps/extension/dashboard/Annotation_spot.js */