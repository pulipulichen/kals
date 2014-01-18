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
Reading_guide.prototype._$model = "reading_guide";

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
Reading_guide.prototype._$position_left = "-50px";

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
Reading_guide.prototype._$position_top = null;


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
    
    if ($.is_array(_coll) === false || _coll.lenght === 0) {
        return;
    }
    
    //this.set_field("step_index", -1);
    this.reset_step_index();
    
    _coll = this._filter_scope_coll(_coll);
    
    //$.test_msg("設定步驟參數", _coll.annotations.length);
    
    
    var _output_scope_coll = [];
    
    for (var _i in _coll) {
        var _scope = _coll[_i];
        var _step_list = this.create_step_list(_scope, _i);
        _output_scope_coll.push(_step_list);
    }
    this.set_field("step_list", _output_scope_coll);
    
   //this.set_field("annotation_step", "12112");
    
    //var _this = this;
    this.open(function () {
        //_this.set_field("annotation_step", "12112");
    });
    return this;
};

Reading_guide.prototype._filter_scope_coll = function (_coll) {
    
    var _output_coll = [];
    if ($.is_array(_coll) && _coll.length > 0 && typeof(_coll[0].annotation_id) !== "undefined") {
        //$.test_msg("是JSON陣列嗎？", _coll);
        _coll = new Annotation_collection_param(_coll);
    }
    
    if ($.is_class(_coll, "Annotation_collection_param")) {
        //var _scope_coll = _coll.export_scope_colleciotn_json();
        var _scope_coll = _coll.get_scope_colleciotn_param_array();
        //$.test_msg("匯出位置參數", _scope_coll.length);
        
        var _last_scope_json = null;
        for (var _s in _scope_coll) {
            var _scope_coll_param = _scope_coll[_s];
            var _scope_json = _scope_coll_param.export_json(false); //$.json_encode(_scope_array);
            _scope_json = $.json_encode(_scope_json);
            if (_scope_json === _last_scope_json) {
                continue;
            }
            
            _output_coll.push(_scope_coll_param);
            
            _last_scope_json = _scope_json;
        }
    }
    else if ($.is_array(_coll)) {
        $.test_msg('是普通的陣列嗎？');
        for (var _c in _coll) {
            var _from = _coll[_c][0];
            var _to = _coll[_c][1];
            var _scope_coll = new Scope_collection_param(_from, _to);
            _output_coll.push(_scope_coll);
        }
        
    }
    
    return _output_coll;
};

/**
 * 建立步驟的選單
 * @param {Scope_collection_param} _scope_coll_param
 * @param {Number} _index
 * @returns {jQuery}
 */
Reading_guide.prototype.create_step_list = function (_scope_coll_param, _index) {

    var _scope_json = _scope_coll_param.export_json(false); //$.json_encode(_scope_array);
    _scope_json = $.json_encode(_scope_json);
            
    // 取出文字
    var _text = KALS_text.selection.text;
    var _anchor_text = _text.get_abbreviated_anchor_text(_scope_coll_param);
    var _step_list = _anchor_text;
    //_step_list = _step_list + ", " + _scope_json;    
    
    this._scope_coll_array.push(_scope_coll_param);
    
    //_step_list.attr("scope", _scope_json);
    //_step_list.attr("step-index", _index);
    
    return _step_list;
};

Reading_guide.prototype._scope_coll_array = [];

Reading_guide.prototype.select_this_step = function (_step_list) {
    
    //var _stpe_list = this.get_ui(".step-list").eq(_index);
    
    if (_step_list.length === 0) {
        return this;
    }
    
    this.clear_read_now();
    
    _step_list.addClass("read")
            .addClass("now");
    //var _index = _step_list.find.attr("kals-field-repeat-index");
    //_step_list.css("border", "1px solid red");
    var _index = this.get_ui(".step-list").index(_step_list);
    //$.test_msg("select_step", _index);
    var _scope_coll_param = this._scope_coll_array[_index];
    //$.test_msg("select_step", _scope_coll_param.export_json());
    KALS_text.set_select(_scope_coll_param, true);
    
    // -------------
    // 內部也捲動到這個位置
    _step_list.scrollIntoView();
    
    // --------------
    
    //this.set_field("step_index", _index);
    this.set_step_index(_index);
    
    return this;
};

Reading_guide.prototype.clear_read_now = function () {
    this.get_ui(".read.now").removeClass("now");
    return this;
};

Reading_guide.prototype.select_step = function (_step_index) {
    var _step_list = this.get_ui(".step-list").eq(_step_index);
    return this.select_this_step(_step_list);
};

Reading_guide.prototype.reset_steps = function () {
    //this.set_field("step_index", -1);
    this.reset_step_index();
    
    this.get_ui(".step-list.read").removeClass('read');
    
    return this;
};

Reading_guide.prototype.goto_next_step = function () {
    var _index = this.get_field("step_index");
    _index++;
    if (_index < this.get_ui(".step-list").length) {
        this.select_step(_index);
    }
    return this;
};

/**
 * 前往下一步
 * @returns {Reading_guide.prototype}
 */
Reading_guide.prototype.goto_prev_step = function () {
    var _index = this.get_field("step_index");
    
    _index--;
    if (_index === -1) {
        //this.set_field("step_index", _index);
        //this.reset_step_index();
    }
    else if (_index > -1) {
        this.select_step(_index);
    }
    return this;
};

Reading_guide.prototype.set_step_index = function (_index) {
    this.set_field("step_index", _index);
    this.set_field("step_index_display", (_index+1));
    return this;
};

Reading_guide.prototype.reset_step_index = function () {
    this.set_field("step_index_display", "-");
    this.set_field("step_index", -1);
    return this;
};

Reading_guide.prototype.get_step_index = function () {
    return this.get_field("step_index");
};

/**
 * ====================
 * 各種導讀的開啟方式
 * ====================
 */

/**
 * 開啟所有的標註
 * @returns {Reading_guide}
 */
Reading_guide.prototype.open_whole_annotations = function () {
    //$.test_msg("準備開啟所有標註", _structure);
    var _data = {};
    var _this = this;
    this.request_get("whole_annotations", _data, function (_data) {
        var _steps = _data.steps;
        _this.setup_steps(_steps);
    });
    
    return this;
};

/**
 * 開啟所有的標註，以句子切割
 * @returns {Reading_guide}
 */
Reading_guide.prototype.open_whole_annotations_by_sentence = function () {
    
    var _structure = KALS_text.get_sentence_structure();
    //$.test_msg("準備開啟所有標註", _structure);
    var _data = {
        "sentence_structure": _structure
    };
    var _this = this;
    this.request_post("whole_annotations_by_sentence", _data, function (_data) {
        var _steps = _data.steps;
        
        $.test_msg("讀取到了什麼呢？ from_index", _data.from_index_array);
        $.test_msg("讀取到了什麼呢？ scope", _steps);
        _this.setup_steps(_steps);
    });
    
    return this;
};


/**
 * 開啟Apriopri ALL演算法的標註
 * @returns {Reading_guide}
 */
Reading_guide.prototype.open_apriori_all = function () {
    
    var _structure = KALS_text.get_sentence_structure();
    //$.test_msg("準備開啟 apriori_all", _structure);
    var _data = {
        "sentence_structure": _structure
    };
    var _this = this;
    this.request_post("apriori_all", _data, function (_data) {
        var _steps = _data.steps;
        
        $.test_msg("讀取到了什麼呢？ scope", _steps);
        
        _this.setup_steps(_steps);
    });
    
    return this;
};

/* End of file Reading_guide */
/* Location: ./system/application/views/web_apps/extension/Reading_guide/Reading_guide.js */