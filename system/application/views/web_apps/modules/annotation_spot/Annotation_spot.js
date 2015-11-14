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
    
    
    this._add_listener_URL_hash_dispatcher();
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
    
    // 錨點的部分
    this.anchor = new View_anchor_text_component();
    this.find(".view-anchor-text-component").append(this.anchor.get_ui());
    
    // 列表的部分
    this.list = new Annotation_spot_list_collection();
    this.find(".list-collection.view-list").append(this.list.get_ui());
    
    // 編輯器的部分
    this.editor = new Annotation_spot_editor_container(this.list);
    this.find(".editor-container").append(this.editor.get_ui());
    
    // 測試範圍
    //var _scope_coll = new Scope_collection_param(155, 160);
    //this.set_scope_coll(_scope_coll);
    
    
    return this;
};

/**
 * 設定範圍參數
 * @param {Scope_collection_param|jQuery} _scope_coll
 * @returns {Annotation_spot.prototype}
 */
Annotation_spot.prototype.set_scope_coll = function (_scope_coll) {
    
    if ($.is_null(_scope_coll)) {
        KALS_util.show_exception("Annotation_spot.prototype.set_scope_coll() _scope_colll is null");
        return this;
    
    }
    //$.test_msg("set_scope_coll", _scope_coll);
    
    var _word = null;
    if ($.is_int(_scope_coll)) {
        _scope_coll = KALS_text.selection.text.get_word_by_index(_scope_coll);
        //$.test_msg(_scope_coll.html());
    }
    
    if (this.is_annotation_spot(_scope_coll)) {
        _word = _scope_coll;
        _scope_coll = new Scope_collection_param(_scope_coll);
        //$.test_msg("如何？", "if (this.is_annotation_spot(_scope_coll)) {");
    }
    
    this._scope_coll = _scope_coll;
    
    // 開啟時變更選取範圍
    //$.test_msg("有變更選取範圍嗎？");
    KALS_text.selection.select.set_scope_coll(_scope_coll);
    
    
    if ($.is_null(_word)) {
        this.anchor.set_scope_coll(_scope_coll);
    }
    else {
        var _anchor_text = this.get_anchor_text_from_word(_word);
        this.anchor.set_word(_anchor_text);
    }
    
    this.list.set_scope_coll(_scope_coll);
    
    // @TODO #154
    if (this.is_annotation_spot_private(_word) 
            && KALS_context.auth.is_admin() === false) {
        this.list._$target_my = true;
    }
    
    this.list.load_list();
    
    //this.editor.set_scope_coll(_scope_coll);
    this.editor.toggle_container(false);
    //this.editor.toggle_container(true);
    
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
//Annotation_spot.prototype._$width = null;

/**
 * 設定視窗的高度
 * @type Number 單位是px，null表示不設定
 */
//Annotation_spot.prototype._$height = null;


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
 * 設定背後有背景
 * @type Boolean
 */
Annotation_spot.prototype._$exposable = true;

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

/**
 * @type {View_anchor_text_component}
 */
Annotation_spot.prototype.anchor = null;

/**
 * @type {Annotation_spot_list_collection}
 */
Annotation_spot.prototype.list = null;

/**
 * @type {Annotation_spot_editor_container}
 */
Annotation_spot.prototype.editor = null;

/**
 * 取得編輯器
 * @author Pudding 20151103
 * @returns {Annotation_editor}
 */
Annotation_spot.prototype.get_editor = function () {
    return this.editor.get_editor();
};

/**
 * 取得列表
 * @author Pudding 20151103
 * @returns {Annotation_spot_list_collection}
 */
Annotation_spot.prototype.get_list = function () {
    return this.list;
};

/**
 * 設定選取這個文字
 * @param {jQuery|Scope_collection_param} _word
 * @returns {Annotation_spot.prototype}
 */
Annotation_spot.prototype.set_select = function (_word) {
    //$.test_msg("Annotation_spot.prototype.set_select", $.get_prefixed_id(_word));
    var _this = this;
    
    if (this.is_opened()) {
        this.close(function () {
            _this.set_select(_word);
        });
        return this;
    }
    
    
    this.reset();
    this.open(function () {
        _this.set_scope_coll(_word);
    });
    return this;
};

/**
 * 標註討論點的名稱
 * @type String
 */
Annotation_spot.prototype.annotation_spot_classname = "kals-word-spot";

/**
 * 私人標註討論點的名稱
 * @type String
 * @author Pudding 20151109
 */
Annotation_spot.prototype.annotation_spot_private_classname = "private";

/**
 * 確認是否是標註討論點
 * @param {jQuery} _word
 * @returns {Boolean}
 */
Annotation_spot.prototype.is_annotation_spot = function (_word) {
    return ($.is_jquery(_word) 
            && _word.hasClass(this.annotation_spot_classname));
};

/**
 * 確認是否是私人的標註討論點
 * @param {jQuery} _word
 * @returns {Boolean}
 * @author Pudding 20151109
 */
Annotation_spot.prototype.is_annotation_spot_private = function (_word) {
    //$.test_msg("is_annotation_spot_private", _word.attr("className"))
    return ($.is_jquery(_word) 
            && _word.hasClass(this.annotation_spot_classname) 
            && _word.hasClass(this.annotation_spot_private_classname) );
};

/**
 * 取得標註的文字
 * @param {jQuery} _word
 * @returns {jQuery|string}
 */
Annotation_spot.prototype.get_anchor_text_from_word = function (_word) {
    if (_word.hasAttr("title")) {
        return _word.attr("title");
    }
    else {
        return _word;
    }
};

/**
 * 重置
 * @param {Function} _callback
 * @returns {Annotation_spot.prototype}
 */
Annotation_spot.prototype.reset = function (_callback) {
    if ($.isset(this.anchor)) {
        this.anchor.reset();
        this.list.reset();
        this.editor.reset();
    }
    $.trigger_callback(_callback);
    return this;
};

/**
 * 覆寫原本的callback
 * @param {function} _callback
 * @returns {Annotation_spot.prototype}
 */
Annotation_spot.prototype.close = function (_callback) {
    var _this = this;
    //$.test_msg("關閉？");
    KALS_text.tool.close(function () {
        KALS_controller_window.prototype.close.call(_this, _callback);
    });
    return this;
};

/**
 * 監聽URL_hash_dispatcher事件
 * @author Pudding 20151109
 * @returns {Selection_select.prototype}
 */
Annotation_spot.prototype._add_listener_URL_hash_dispatcher = function () {
    var _this = this;
    //$.test_msg("_add_listener_URL_hash_dispatcher 呼叫?");
    KALS_context.hash.add_listener(function (_hash) {
        if (_hash.has_field("modal") === false 
                || _hash.get_field("modal") !== _this.name
                || _hash.has_field('select') === false) {
            //$.test_msg("不是的");
            return;
        }
        //$.test_msg("是的");
        
        if ($.is_mobile_mode()) {
            return;
        }

        //$.test_msg('URL_hash_dispatcher', 'pass5');
        var _scope_text = _hash.get_field('select');
        var _word_id = _scope_text.substr(0, _scope_text.indexOf(","));
        _word_id = parseInt(_word_id);
        //$.test_msg("word_id", _word_id);

        //KALS_context.init_profile.add_listener(function () {
        KALS_context.ready(function() {
            _this.set_select(_word_id);
        });
    });
    return this;
};

// ------------------------------------------------------------------

/**
 * 取得資料的網址
 * @type String
 */
Annotation_spot.prototype.get_url = "image_spot/get/";

/**
 * 儲存資料的網址
 * @type String
 */
Annotation_spot.prototype.set_url = "image_spot/set/";
//Annotation_spot.prototype.set_url = "annotation_setter/image_spot/";

/**
 * 刪除資料的網址
 * @type String
 */
Annotation_spot.prototype.del_url = "image_spot/del/";

Annotation_spot.prototype.initialize_jquery_image = function (_images, _callback) {
    
    var _types = ["重要", "困惑", "舉例", "摘要"];
    var _user = "布丁";
    
    var _this = this;
    _images.each(function (_index, _img) {
        _img = $(_img);
        var _scope = $.get_prefixed_id(_img);
        
        //var _url = KALS_context.get_base_url("annotation_getter/image_spot/");
        
        _img.annotateImage({
            getUrl: _this.get_url,
            saveUrl: _this.set_url,
            deleteUrl: _this.del_url,
            scope: _scope,
            editable: true,
            useAjax: true,
            //notes: _notes,
            types: _types,
            user: _user
        });
    });
    
    $.trigger_callback(_callback);
    return this;
};

/* End of file Annotation_spot */
/* Location: ./system/application/views/web_apps/extension/dashboard/Annotation_spot.js */