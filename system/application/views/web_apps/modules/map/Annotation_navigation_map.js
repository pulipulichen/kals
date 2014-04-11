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
    //12121
    this.init_tabs();
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
Annotation_navigation_map.prototype._$absolute = false;

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
    _ele.find("span.type-navigation").addClass('selected');
    //_ele.css('color', 'black');
    
    //var _current_type = _ele.find("[kals-field='annotation_type']").attr("type-name");
    var _current_type = _ele.find(".type-navigation").attr("type-id");
    $.test_msg("current-type", _current_type);
    
    var _chapter = KALS_text.selection.text.chapter;
    var _structure = _chapter.get_structure();
    var _heading_list = _chapter.get_heading_list();
    
    
    // [標題1, 標題2, 標題3]
    $.test_msg("chapter heading", _heading_list);
 
    // [0, 1063, 5200]
    // chapter1: 0-1062
    // chapter2: 1063-5199
    // chapter3: 5200-
    $.test_msg("chapter structure", _structure);
    
    //this.debug(_ele.html());
    
    var _data = {
        
        1: {
            1: 5,
            2: 4,
            3: 3,
            4: 6,
            5: 5,
            6: 7,
            7: 3
        },
        
        
        4: {    // Title No.4
            1: 4,   // Annotation Important has 4 annotations
            2: 3,
            3: 2,
            4: 1,
            5: 3,
            6: 7,
            7: 3
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
    
  
    
    
    this.find(".list").css("display", "none");
    
    $.test_msg(".list.type-"+_current_type);
    var _list = this.find(".list.type-"+_current_type).show();
    
    var _lists = [];
    
    // _list clear
    // for loop _data
    //  create li: Title, Type, Type Count 
    //  li appendTo _list
    
    //
    var _types = this.get_annotation_types(); //取得所有標註的種類 
    var _type_numbers = [];
    var _type_display_names = [];
    var _type_classes = [];
    
    for (var _i in _types){
        var _type = _types[_i] ;
        var _type_id = _type.get_id(); //取得標註類別id: 1~7
        _type_numbers[_type_id] = _i;
        
        var _type_lang = _type.get_type_name_lang();
        var _class = _type.get_classname(); //取得類別class名稱 question, important...
        //var _type_id = _type.get_id();
        
        _type_classes [_type_id] = _class; //_type_classes[1~7] = question, important...
        _type_display_names [_type_id] = KALS_context.lang.line(_type_lang); //類別中文名稱

        
    }
    
    $.test_msg("change_tab()", 1);
    
    _list.empty();
    var _list_content = $('<ul></ul>');
    
    $.test_msg("change_tab() 2", 2);
    
    var _this = this;
    
    for (var _heading_number in _data) {
        
        var _heading_text = this.get_heading_text(_heading_number);
        
        var _list_item = $("<li></li>");
        
        //_list_item.html("<div class='list-header-component'>" + _heading_text + " <span class='current-type'>"+ _current_type+"</span> </div>");
        _list_item.html("<div class='list-header-component '>" + _heading_text + " <span class='current-type'></span> </div>");
        _list_item.append("<div class='list-header-component other-type'></div>");
        
        var _heading_annotations = _data[_heading_number];
        
        var _current_type_container = _list_item.find(".current-type");
        var _other_type_container = _list_item.find(".other-type");
        for (var _annotation_type_name in _heading_annotations) {
            var _annotation_type_count = _heading_annotations[_annotation_type_name];
            //var _button = $("<span style='border:1px solid black'>" + _annotation_type_name + ":" + _annotation_type_count + "</span>");
            //var _button = $("<span >" + _type_display_names [_annotation_type_name] + ":" + _annotation_type_count + "</span>");
            var _button = $("<span class='" + _type_classes [_annotation_type_name] + " type-navigation type-option' type-id='" + _annotation_type_name + "'>" + _type_display_names [_annotation_type_name] + ":" + _annotation_type_count + "</span>");
            //var _current_type_plusone = _current_type + 1 ;
            
            _button.click(function () {
                var _heading_number;    //測試用資料
                //var _type_id;   //測試用資料
                //$(this).hide();
                var _type_id_selected = $(this).attr("type-id");
                
                // Step.1 取得資料
                // 測試用資料
                _heading_number = 1;
                //_type_id = 2;
                
                $.test_msg("標題編號:" + _heading_number + " / 標註類型:" + _type_id_selected);
                
                // Step.2 跳到標題編號
                
                // 要搭配小地圖的功能(自己想
                
                
                
                
                
                // Step.3 搜尋功能
                // 更新目標:http://demo-kals.dlll.nccu.edu.tw/kals/help/demo/
                
                KALS_context.search.search({
                    search_range: "annotation_type",
                    keyword:_type_id_selected,
                    order_by: "update|create"
                }, false);
                
                // 關掉標註地圖
                _this.close();
            });
            
            if (_annotation_type_name === _current_type ) {
                _button.appendTo(_current_type_container);
            }
            else {
                _button.appendTo(_other_type_container);
            }
        }
        
        _list_item.appendTo(_list_content);
        
    }
    _list_content.appendTo(_list);
    $.test_msg("change_tab() 3", 3);
    
    //this.change_tab_heading();
    //this.change_tab_btn(_current_type);
    
    
    
};

/**
 * 取得指定編號的標題的內文
 * @param {int} _heading_number
 * @returns {String}
 */
Annotation_navigation_map.prototype.get_heading_text = function (_heading_number) {
    
    var _heading_text_data = {
        1: "標題No.1",
        3: "標題No.3",
        4: "標題No.4",
        5: "標題No.5"
    }
    
    return _heading_text_data[_heading_number];
};


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
};




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
};


Annotation_navigation_map.prototype.init_tabs = function () {

    var _types = this.get_annotation_types();
    
   

    //var _types_name = 'web_apps.annotation.type'._types;  
    
    var _btn_array = [];
    var _div_array = [];
    
    var _count = 0;
    var _type_num_array = [];
    
    
    
    for (var _i in _types) {
        // Annotation_type_param
        var _type = _types[_i];

        var _lang = _type.get_type_name_lang();
       
        var _class = _type.get_classname();
        var _type_id = _type.get_id();

        
        var _display_name = KALS_context.lang.line(_lang);
        

        
        //var _btn = '<span class='+ _class +'>' + _types[_i].get_name() + '</span>';
        var _btn = '<span class="'+ _class +' type-navigation type-option" type-id="' + _type_id + '">' + _display_name + '</span>';
        _btn_array.push(_btn);
        
        
        //var _type_num = _type.get_id();
        //var _type_num = _count;
        
        
        //var _list = '<ul class="list type-' + _type_num +  '"><li>' + _type_num + '</li></ul>';
        var _list = '<ul class="list type-' + _type_id +  '"><li>' + _type_id + '</li></ul>';
                

        
        _type_num_array.push(_list);
        //_type_num_array[_type_num] = "test";
        _count++ ;
    }

    this.set_field("annotation_type_num", _type_num_array);
    

    this.find(".list").css("display", "none");

    
    // get_annotation_types()
    
    this.set_field("annotation_type",  _btn_array);
    
    this.set_field("");
    
    //this.set_field("annotation_type", ["全部", "重要", "困惑", "質疑", "舉例"]);
};

/**
 * 獨立視窗
 * 
 * 如果是false，則會依附在KALS_window底下
 * 如果是true，則會直接open
 */
Annotation_navigation_map.prototype._$absolute = true;

/* End of file Annotation_navigation_map */
/* Location: ./system/application/views/web_apps/extension/dashboard/Annotation_navigation_map.js */