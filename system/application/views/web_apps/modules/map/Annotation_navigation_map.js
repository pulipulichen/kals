/**
 * Annotation_navigation_map
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
function Annotation_navigation_map() {
    KALS_controller_window.call(this);
    
    //this.init_tabs();
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
Annotation_navigation_map.prototype = new KALS_controller_window();

/**
 * 指定Module的名稱
 * 
 * 也是顯示在Hash的名稱。如果是null，則會顯示KALS_modal._$modal_name
 * @type String
 */
Annotation_navigation_map.prototype.name = 'annotation_navigation_map';

/**
 * ====================
 * 來自KALS_CONFIG設定
 * ====================
 */

/**
 * 搜尋結果是否依照章節順序排序
 * 
 * 這個設定會受到KALS_CONFIG的影響
 * @type Boolean
 */
Annotation_navigation_map.prototype.order_by_article = false;

/**
 * ====================
 * View設定
 * ====================
 */

/**
 * 指定View
 * @type String
 */
Annotation_navigation_map.prototype._$view = 'modules/map/view/Annotation_navigation_map';


/**
 * 初始化View
 * 
 * 如果要在Controller啟動時為UI做設定，請覆寫這個方法
 * 這個方法只會執行一次
 * 
 * 請覆寫這個方法
 * @return {KALS_controller}
 */
Annotation_navigation_map.prototype._$initialize_view = function () {
    //$.test_msg("Annotation_navigation_map 初始化");
    
    this.init_tabs();
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
Annotation_navigation_map.prototype._$model = 'annotation_navigation_map';

/**
 * 初始化物件時執行的Action
 * @type String|null null=不執行任何action
 */
Annotation_navigation_map.prototype._$init_request_action = null;

/**
 * open()時執行的Action
 * @type String|null null=不執行任何action
 */
Annotation_navigation_map.prototype._$open_request_action = 'open';

/**
 * close()時執行的Action
 * @type String|null null=不執行任何action
 */
Annotation_navigation_map.prototype._$close_request_action = null;


/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 是否開啟偵錯功能
 * @type Boolean
 */
Annotation_navigation_map.prototype._$enable_debug = true;

/**
 * ====================
 * Controller設定
 * ====================
 */

/**
 * 啟用權限檢查機制
 * @type {Boolean}
 */
Annotation_navigation_map.prototype._$enable_auth_check = true;

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
Annotation_navigation_map.prototype._$auth_check = function (_is_login, _user) {
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
Annotation_navigation_map.prototype._$absolute = true;

/**
 * 視窗的Class Name
 * @type String
 */
Annotation_navigation_map.prototype._$name = 'Annotation_navigation_map';

/**
 * 視窗的標題
 * 
 * @type KALS_language_param
 * 對應到樣板的語系檔
 */
Annotation_navigation_map.prototype._$heading = 'heading';

/**
 * 視窗位於導覽列的按鈕名稱
 * 
 * @type KALS_language_param|String
 * 對應到樣板的語系檔
 */
Annotation_navigation_map.prototype._$nav_heading = 'heading';

/**
 * 設定視窗的寬度
 * @type Number 單位是px，null表示不設定
 */
Annotation_navigation_map.prototype._$width = 400;

/**
 * 設定視窗的高度
 * @type Number 單位是px，null表示不設定
 */
Annotation_navigation_map.prototype._$height = null;

/**
 * 導覽列相關的設定
 * @type JSON
 */
Annotation_navigation_map.prototype.nav_config = {
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
 * 開啟最新的標註
 * 
 * 這是kals-event-field-set的範例
 * 
 * @param {jQuery} _ele
 * 由於是kals-event-field-set事件，所以固定會回傳觸發事件的jQuery物件
 * @returns {Annotation_navigation_map.prototype}
 */
Annotation_navigation_map.prototype.setup_activity = function (_ele) {
    if (this.has_field("activity")) {
        var _activity = this.get_field('activity').toLowerCase();
        _ele.attr('className', 'activity-' + _activity);
    }
    return this;
};

/**
 * 開啟最近的標註
 * @returns {Annotation_navigation_map.prototype}
 */
Annotation_navigation_map.prototype.open_recent_annotation = function() {
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
Annotation_navigation_map.prototype.action = function (_param) {
    
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
 * @returns {Annotation_navigation_map.prototype}
 */
Annotation_navigation_map.prototype.init_hotkey = function () {
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
 * @returns {Annotation_navigation_map.prototype}
 */
Annotation_navigation_map.prototype.select = function (_ele) {
    this.debug('select', this._data);
    var _annotation_id = this.get_field('last_annotation_id');
    this.select_annotation(_annotation_id);
    return this;
};

Annotation_navigation_map.prototype.change_tab = function (_ele) {
    
    //var _current_type = _ele.attr("kals-field-repeat-index");
    
    //this.find("button");
    this.find("span.type-navigation.selected").removeClass('selected');
    this.find("span.type-navigation").addClass('non-selected');
    _ele.find("span.type-navigation").removeClass('non-selected');
    _ele.find("span.type-navigation").addClass('selected');
    
    //var _current_type = _ele.find("[kals-field='annotation_type']").attr("type-name");
    var _navigation = _ele.find(".type-navigation");
    var _current_type = _navigation.attr("type-id");
    var _query_type = _current_type;
    if (_navigation.hasAttr("custom-name")) {
        _query_type = _navigation.attr("custom-name");
    }
    //$.test_msg("current-type", _current_type);
    
    
    //var _chapter = KALS_text.selection.text.chapter;
    //var _structure = _chapter.get_structure();
    //var _heading_list = _chapter.get_heading_list(); 
    
    // [標題1, 標題2, 標題3]
    //$.test_msg("chapter heading", _heading_list[2].text());
 
    // [0, 1063, 5200]
    // chapter1: 0-1062
    // chapter2: 1063-5199
    // chapter3: 5200-
    //$.test_msg("chapter structure", _structure);
    
    //this.debug(_ele.html());
/**    
    var _data = {
        0: {
            1: 5,
            2: 4,
            3: 3,
            4: 6,
            5: 5,
            6: 7,
            7: 3
        },
        
        
        1: {
            1: 5,
            2: 4,
            3: 3,
            4: 6,
            5: 5,
            6: 7,
            7: 3
        },
        
        2: {
            1: 5,
            2: 4,
            3: 3,
            4: 6,
            5: 5,
            6: 7,
            7: 3
        },
        
        
        3: {    // Title No.4
            1: 4,   // Annotation Important has 4 annotations
            2: 3,
            3: 2,
            4: 1,
            5: 3,
            6: 7,
            7: 3
        },
        4: {
            1: 6,
            2: 5,
            3: 4,
            4: 3,
            5: 2,
            6: 1,
            7: 0
        },
        
        5: {
            1: 6,
            2: 5,
            3: 4,
            4: 3,
            5: 2,
            6: 1,
            7: 0
        }        
        
 
    };
 */   
  
    
    
    this.find(".list").css("display", "none");
    
    //$.test_msg(".list.type-"+_current_type);
    
    
    //var _lists = [];
    
 
/**
    for (var _i in _types){
        var _type = _types[_i] ;
        var _type_id = _type.get_id(); //取得標註類別id: 1~7
        _type_numbers[_type_id] = _i;
        
        var _type_lang = _type.get_type_name_lang();
        var _class = _type.get_classname(); //取得類別class名稱 question, important...
        //var _type_id = _type.get_id();
        
        _type_classes [_type_id] = _class; //_type_classes[1~7] = question, important...
        //_type_display_names [_type_id] = KALS_context.lang.line(_type_lang); //類別中文名稱

        
    }
 */
 
 
    var _list = this.find(".list.type-"+_current_type).show();
    _list.empty();
    var _this = this; 
    this._request_heading_data(_query_type, function (_data) {
        _this._change_tab_process_data(_data, _query_type, _current_type, _list);
    });
};

/**
 * 取得資料之後的後續處理
 * @param {JSON} _data 來自資料庫的資料
 * @param {String} _current_type 現在的類型
 * @param {jQuery} 目前顯示的表單
 */
Annotation_navigation_map.prototype._change_tab_process_data = function (_data, _type_id, _type_name, _list) {
    //$.test_msg("get_heading_data", _data);
    
    
    var _types = this.get_annotation_types(); //取得所有標註的種類 
    //var _type_numbers = [];
    var _type_display_names = this.get_annotation_type_display_name_array();
    var _type_classes = this.get_annotation_type_class_array();
    var _type_styles = this.get_style_array();
    
    var _chapter = KALS_text.selection.text.chapter;
    //var _structure = _chapter.get_structure();
    var _heading_list = _chapter.get_heading_list(); 
    
    _chapter.get_data();
    //$.test_msg("Annotation_navigation_map._change_tab_process_data()", _heading_list);
   
    var _list_content;
    if (this.order_by_article === true) {
        _list_content= $('<ol></ol>');
    }
    else {
        _list_content= $('<ul></ul>');
    }
    _list_content.addClass("list-content");
    
    var _this = this;
    
    var _data_empty = true;

    for (var _index in _data.heading_data) {
        _data_empty = false;
        
        var _heading_number = _data.heading_data[_index].heading_number;
        var _heading_annotations = _data.heading_data[_index].type_count;
        
        //var _heading_text = this.get_heading_text(_heading_number);
        
        var _list_item = $("<li></li>");
        
        //$.test_msg("[_heading_count]"+_heading_number);
        
        //_list_item.html("<div class='list-header-component'>" + _heading_text + " <span class='current-type'>"+ _current_type+"</span> </div>");
        
        // var _heading_ele = $("<div class='list-header-component '>" + _heading_text + " <span class='current-type'></span> </div>");
        //_list_item.append(_heading_ele);
        //_list_item.append("<div class='list-header-component other-type'></div>");
        
        var _heading_div = $("<div class='list-header-component'></div>");
        var _heading_text = "";
        if (typeof(_heading_list[_heading_number]) === "object") {
            _heading_text = _heading_list[_heading_number].text();
        }
        var _heading_btn = $("<span "  
                 + " type_id='" + _type_id + "' "
                 + "heading_id='" + _heading_number +"' >" 
                    + _heading_text 
                 + "</span>");
        //var _heading_offset = $(".kals-heading-"+_heading_number ).offset().top;

        _heading_btn.click(function () {
            _this._click_map_list_item(this);
        });
        
        _heading_div.append(_heading_btn);
        _heading_div.append("<span class='current-type'></span>");
        _list_item.append(_heading_div);
        
        //_list_item.append("<div class='list-header-component other-type'></div>");

        //var _heading_annotations = _data[_heading_number];
        //$.test_msg("[_heading_annotations]"+_heading_annotations);
        var _current_type_container = _list_item.find(".current-type");
        //var _other_type_container = _list_item.find(".other-type");
        
        var _annotation_type_count = _heading_annotations;
        var _annotation_type_name = _type_name;
        //$.test_msg("[_annotation_type_count]"+_annotation_type_count);
        
        
        var _button = $("<span class='" + _type_classes [_annotation_type_name] 
                + " type-navigation type-option heading-button'"
                + _type_styles[_annotation_type_name]
                + " type_id='" + _type_id 
                + "' heading_id='" + _heading_number + "' >" 
                + _type_display_names [_annotation_type_name] 
                + ":" + _annotation_type_count + "</span>");
        
        _button.click(function () {
            _this._click_map_list_item(this);
        });

        if (_annotation_type_name === _type_name 
                && _annotation_type_count !== 0) {
            _button.appendTo(_current_type_container);
        }
        
        _list_item.appendTo(_list_content);
        
    }
    
    /**
     * @author Pulipuli Chen 20140502
     * 不要在程式中直接寫中文，要改成用語系檔顯示
     */
    //if (_data_empty === true) {
    if (_data.total_count === 0) {
        // 提示空資料的訊息，加入到list_content
        //_list_content = $("<span class='hint'>這個分類目前還沒有標註喔!</span>");
        this._not_found_hint_show();
    }
    else {
        this._not_found_hint_hide();
    }
   

    _list_content.appendTo(_list);   
};

/**
 * 顯示沒有找到訊息的提示
 * @author 20140502 Pulipuli Chen
 * @returns {Annotation_navigation_map.prototype}
 */
Annotation_navigation_map.prototype._not_found_hint_show = function () {
    this.find(".not-found-hint").show();
    return this;
};

/**
 * 隱藏沒有找到訊息的提示
 * @author 20140502 Pulipuli Chen
 * @returns {Annotation_navigation_map.prototype}
 */
Annotation_navigation_map.prototype._not_found_hint_hide = function () {
    this.find(".not-found-hint").hide();
    return this;
};

/**
 * 點下按鈕之後的事件
 * @param {jQuery} _btn
 * @returns {Annotation_navigation_map.prototype}
 */
Annotation_navigation_map.prototype._click_map_list_item = function (_btn) {
    var _btn = $(_btn);
    this._scroll_to_heading(_btn.attr("heading_id") );
    this._search_annotation(_btn.attr("type_id") );
    
    // 關掉標註地圖
    this.close();
    
    return this;
};

/**
 * 跳到指定的標題位置
 * @param {type} _current_heading_number
 * @returns {undefined}
 */
Annotation_navigation_map.prototype._scroll_to_heading = function (_current_heading_number) {
    /*
    var _heading = $(".kals-heading-"+_current_heading_number );
    
    $.test_msg("_jump_to_heading", ".kals-heading-"+_current_heading_number );
    
    if (_heading.length > 0) {
        //var _heading_offset = $(".kals-heading-"+_current_heading_number ).offset().top;
        var _heading_offset = $.get_offset_top(_heading);
        //$.test_msg("[_heading_offset]"+_heading_offset);
        $(window).scrollTop(_heading_offset-50);
    
        // 關掉標註地圖
        this.close();
    }
    else {
        KALS_util.show_exception("Heading not found");
    }
    */
    KALS_text.selection.text.chapter.scroll_to(_current_heading_number);
    //KALS_text.selection.text.word.scroll_to(55);
    return this;
    
    
};

/**
 * 進行搜尋
 * @param {String} _type_id_selected
 * @returns {Annotation_navigation_map.prototype}
 */
Annotation_navigation_map.prototype._search_annotation = function (_type_id_selected) {
    /*var _current_heading_number = $(_btn).attr("heading_id");
    var _heading_offset = $(".kals-heading-"+_current_heading_number ).offset().top;
    $(window).scrollTop(_heading_offset-50);

    var _type_id_selected = $(_btn).attr("type-id");
    */
    KALS_context.search.search({
        search_range: "annotation_type",
        keyword:_type_id_selected,
        order_by: "update|create"
    }, false);
    
    return this;
};
Annotation_navigation_map.prototype.get_annotation_type_class_array = function () {
    
    var _types = this.get_annotation_types(); //取得所有標註的種類 
    //var _type_numbers = [];
    //var _type_display_names = [];
    var _type_classes = [];
 
    for (var _i in _types){
        var _type = _types[_i] ;
        var _type_id = _type.get_id(); //取得標註類別id: 1~7
        //_type_numbers[_type_id] = _i;
        
        //var _type_lang = _type.get_type_name_lang();
        var _class = _type.get_classname(); //取得類別class名稱 question, important...
        //var _type_id = _type.get_id();
        
        _type_classes [_type_id] = _class; //_type_classes[1~7] = question, important...
        //_type_display_names [_type_id] = KALS_context.lang.line(_type_lang); //類別中文名稱

        
    }
    
    return _type_classes;
};

Annotation_navigation_map.prototype.get_style_array = function () {
    
    var _types = this.get_annotation_types(); //取得所有標註的種類
    var _type_styles = [];
    
        for (var _i in _types){
        var _type = _types[_i] ;
        var _type_id = _type.get_id(); //取得標註類別id: 1~7
        
        _type_styles[_type_id] = "";
        var _style = "";
        
        if (_type.is_basic() === false) {
            _style = _type.get_option_style();
            _style = ' style="' + _style + '"';
            _type_styles[_type_id] = _style;
        }
        
        //$.test_msg(_type_id + "[_type_styles[_type_id]]"+_type_styles[_type_id]);
    }
    
    return _type_styles;
};

Annotation_navigation_map.prototype.get_annotation_type_display_name_array = function () {
    
    var _types = this.get_annotation_types(); //取得所有標註的種類
    var _type_display_names = [];
    
        for (var _i in _types){
        var _type = _types[_i] ;
        var _type_id = _type.get_id(); //取得標註類別id: 1~7
        
        //var _type_lang = _type.get_type_name_lang();

        //_type_display_names [_type_id] = KALS_context.lang.line(_type_lang); //類別中文名稱
        _type_display_names [_type_id] = _type.get_type_name_display();

    }
    
    return _type_display_names;
};

/**
 * 從伺服器取得資料
 * @param {String} _current_type 要查詢的標註類型
 * @param {Function} _callback
 */
Annotation_navigation_map.prototype._request_heading_data = function (_current_type, _callback) {
    
    /**
     * @author Pulipuli Chen 20140502
     * 假資料，用不到了
     */
    /*
    var _data = [
        {
            heading_number: 4,
            type_count: 5
        },
 
        {
            heading_number: 2,
            type_count: 1
        },
        
        {
            heading_number: 0,
            type_count: 2
        },        
        
        {
            heading_number: 3,
            type_count: 3
        },
               
        {
            heading_number: 1,
            type_count: 4
        },
        
        {
            heading_number: 5,
            type_count: 5
        } 
    ];
    */
    // --------------------------------
    
    var _chapter = KALS_text.selection.text.chapter;
    var _structure = _chapter.get_structure();
    
    //var _order_by_article = KALS_CONFIG.modules.Annotation_navigation_map.order_by_article;
    var _order_by_article = this.order_by_article;
    
    var _action = "get_heading_annotation";
    var _send_data = {
        structure: _structure,
        current_type: _current_type,
        order_by_article: _order_by_article
    };
    this.request_get(_action, _send_data, function (_data) {
        if (typeof(_callback) === "function") {
            _callback(_data);
        }
    });
    
    return _data;
};   

/**
 * 取得指定編號的標題的內文
 * @param {int} _heading_number
 * @returns {String}
 * @deprecated 20140502 Pulipuli Chen
 */
/*
Annotation_navigation_map.prototype.get_heading_text = function (_heading_number) {
    
    var _heading_text_data = {
        0: "標題1",
        1: "標題1-1",
        2: "標題1-2",
        3: "標題2",
        4: "標題2-1",
        5: "標題2-2"
    }
    
    return _heading_text_data[_heading_number];
};
*/

/**
 * 變更按鈕的類型
 * @param {jQuery} _ele
 * @returns {Annotation_navigation_map}
 */
Annotation_navigation_map.prototype.change_tab_btn = function (_ele) {
    //將類別按鈕加在被排序的標題後
    //var _current_type = _ele.find("[kals-field='annotation_type']").attr("kals-field-repeat-index");
    
    var _types = this.get_annotation_types();
    var _btn_array = [];
    
    var _btn_array_main = [];
    
    var _count = 0;
    
    
    for (var _i in _types) {
        // Annotation_type_param
        
        
        var _type = _types[_i];
        
        var _lang = _type.get_type_name_lang();
        var _name = _type.get_id();
        var _class = _type.get_classname();
        
        var _display_name = KALS_context.lang.line(_lang);
         
        //var _btn = '<span class='+ _class +'>' + _types[_i].get_name() + '</span>';
        //var _btn = '<span class='+ _class +'>' + _display_name + '</span>';
        
        if( _count !== _ele ){

            var _btn = '<span class='+ _class +' type-name="'+_name+'">'+_name + _display_name + '</span>';
            _btn_array.push(_btn);
        } else{
            var _btn = '<span class="'+ _class +'" style="display:block" type-name="'+_name+'">'+_name+ + _display_name + '</span>';
            _btn_array_main.unshift(_btn);
          }
        
        _count ++;

    }
    
    // get_annotation_types()
    
    
    this.set_field("annotation_type_main",  _btn_array_main);
    this.set_field("annotation_type_sub",  _btn_array);
    
    this.set_field("types", _types);
    return this;
};

/**
 * 依照所選類別切換列出該類別之標題排名
 * @param {jQuery} _ele
 * @returns {Annotation_navigation_map}
 */
Annotation_navigation_map.prototype.change_tab_heading = function (_ele) {
    
    //依照所選類別切換列出該類別之標題排名

    var _types = this.get_annotation_types();
    var _heading_array = [];
    
    for (var _i in _types) {
        // Annotation_type_param

        var _type = _types[_i];
        
        var _lang = _type.get_type_name_lang();
        var _class = _type.get_classname();
        
        var _display_name = KALS_context.lang.line(_lang);
 
        var _heading = '<a>' + _display_name + '</a>';
        
        _heading_array.push(_heading);

    }
 
    this.set_field("annotation_map_heading",  _heading_array);
    
    return this;
};

/**
 * 初始化標註類型
 * @returns {undefined}
 */
Annotation_navigation_map.prototype.init_tabs = function () {

    var _types = this.get_annotation_types();
    
    //var _ui = this.get_ui().css("border", "3px solid red").appendTo("body");
    //$.test_msg("Annotation_navigation_map.init_tabs()");
    //var _types_name = 'web_apps.annotation.type'._types;  
    
    var _btn_array = [];
    var _div_array = [];
    
    var _count = 0;
    var _type_num_array = [];
    
    var _first_class = null;
    
    for (var _i in _types) {
        // Annotation_type_param
        var _type = _types[_i];

        var _display_name = _type.get_type_name_display();
       
        var _class = _type.get_classname();
        var _type_id = _type.get_id();

        
        if(_count === 0){
            _first_class = _class;
            _count = _count + 1;
        }
        
        //var _display_name = KALS_context.lang.line(_lang);

        
        // ---------------------------
        // 如果是自訂標註的話，現在要幫標註畫上按鈕顏色
        var _style = "";
        if (_type.is_basic() === false) {
            _style = _type.get_option_style();
            _style = ' style="' + _style + '"';
        }
        
        // ---------------------------
        
        //var _btn = '<span class='+ _class +'>' + _types[_i].get_name() + '</span>';
        
        var _custom_name_attr = "";
        if (_type.is_basic() === false) {
            _custom_name_attr = 'custom-name="' + _display_name + '"';
        }
        
        var _btn = '<span class="'+ _class +' type-navigation type-option non-selected" ' 
                + _style
                + _custom_name_attr
                + 'type-id="' + _type_id + '">' 
                + _display_name + '</span>';
        
        _btn_array.push(_btn);
        
        
        //var _type_num = _type.get_id();
        //var _type_num = _count;
        
        
        /**
         * @author Pulipuli Chen 20140502 ul多餘了，刪掉
         * //var _list = '<ul class="list type-' + _type_num +  '"><li>' + _type_num + '</li></ul>';
         * //var _list = '<ul class="list type-' + _type_id +  '"><li>' + _type_id + '</li></ul>';
         */
        var _list = '<div class="list type-' + _type_id +  '">' + _type_id + '</div>';
        
        _type_num_array.push(_list);
        //_type_num_array[_type_num] = "test";
        _count++ ;
    }

    this.set_field("annotation_type_num", _type_num_array);
    

    this.find(".list").css("display", "none");
    
    //$.test_msg("anno map", this.find(".list").length);
    
    // get_annotation_types()
    
    this.set_field("annotation_type",  _btn_array);
    
    this.set_field("");

    //var _this = this;
    //setTimeout(function () {
        this.find(".list-header-component .type-navigation.type-option:first").click();
    //}, 100);
    //this.set_field("annotation_type", ["全部", "重要", "困惑", "質疑", "舉例"]);
    
    //$.test_msg("Annotation_navigation_map.init_tabs() end");
};

/**
 * 開啟前的檢查
 * @returns {Annotation_navigation_map}
 */
Annotation_navigation_map.prototype._$onopen = function (_callback) {
    var _has_heading = KALS_text.selection.text.chapter.has_heading();
    //_has_heading = false;
    if (_has_heading === false) {
        var _msg = new KALS_language_param(
                "No heading found.",
                "window.map.no_heading_found"
        );
        //_msg = "找不到資料";
        KALS_util.show_exception(_msg);
        return this;
    }
    return this;
};

/* End of file Annotation_navigation_map */
/* Location: ./system/application/views/web_apps/extension/dashboard/Annotation_navigation_map.js */