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
    KALS_context.ready(function () {
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

///**
// * 權限檢查
// * 
// * 請用KALS_controller提供的兩個參數，以及其他自己設定的資料
// * 來決定是否要讓權限檢查通過
// * 
// * 舉例：
// * 
// * 不允許未登入的人使用
// * return _is_login;
// * 
// * 不允許已登入的人使用
// * retunr !(_is_login);
// * 
// * @param {boolean} _is_login 是否已經登入
// * @param {User_param} _user 現在登入的使用者，沒有登入的情況會是null
// * @returns {boolean} true=通過;false=未通過
// */
//
//KALS_stamp.prototype._$auth_check = function (_is_login, _user) {
//    if (_is_login === false) {
//        return false;
//    }
//    else {
//        return true;
//    }
//};

/**
 * ====================
 * KALS_controller_window設定
 * ====================
 */

/**
 * 獨立視窗功能
 * @type Boolean true=開啟獨立視窗|false=依附在KALS_window底下
 */
KALS_stamp.prototype._$absolute = false;

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
KALS_stamp.prototype._$width = 800;

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

///**
// * 開啟時的載入動作
// * 
// * 開啟KALS_stamp的視窗時，跟伺服器請求資訊，以載入必要資料到view上顯示的動作
// * 
// * @returns {KALS_stamp.prototype}
// */
//KALS_stamp.prototype._$onopen = function () {
//    
//    if (KALS_context.auth.is_login() === false
//            || KALS_context.completed === false) {
//        return this;
//    }
//    
//    this.set_stamp_statistic();
//    this.set_stamp_qualified();
//    //this.set_stamp_qualification();
//    
//    this.get_stamp_list();
//    //KALS_context.user.load_user_params();
//    return this;
//};

/**
 * 切換顯示分頁
 * @param {String} _btn 按鈕的Classname
 * @returns {KALS_stamp.prototype}
 */
KALS_stamp.prototype.change_tab = function (_btn){
    
    if (typeof(_btn) === "string") {
        _btn = this.find(".tab-button." + _btn);
    }
    
    var _selected_classname = "selected";
    this.find(".tab-button."+_selected_classname).removeClass(_selected_classname);
    _btn.addClass(_selected_classname);
    
    this.find(".tab-content").hide();
    this.find(".tab-content." + _btn.attr("tab_name")).show();
    
    //----------
    //this.find(".tab-button").removeAttr("style");

   //KALS_util.notify("test",this.find("list-button-counts"));
    //$.test_msg("change_tab", [typeof(_btn.attr), _btn.parent().length]);
   //取出btn-name屬性的值   
    //var _tab_name = _btn.attr("tab_name");
    
    /*
    var _selected_classname = "selected";
    this.find(".tab-button."+_selected_classname).removeClass(_selected_classname);
    
    var _tab_name = _btn;
    if (typeof(_btn) === "object") {
        _tab_name = _btn.attr;
    }
    else {
        _btn = this.find(".tab-button."+_tab_name).addClass(_selected_classname);
    }
    _btn.addClass(_selected_classname);
    
//    $.test_msg("change_tabl", typeof(_tab_name));
//    $.test_msg("change_tab2", _tab_name);
    
   
    //_btn.css("background", "red");   
    //_btn.css("color", "white");
    //$.test_msg("tab name", _tab_name);
    //KALS_util.notify("_btn_name="+ _tab_name);
    
    $.test_msg("change_tab3", [_tab_name, ".tab-button."+_tab_name]);
   
    var _tab_contents = _btn.parents(".tab-area:first").find(".tab-content");
    // _btn.css("background", "red");
   
    //先隱藏所有的div
    _tab_contents.hide();
    //再依tab-name來顯示要看的div
    _tab_contents.filter("." + _tab_name).show();
    
    //var _tab = this.find("list-button-counts");
    //-------------
//    var _types = this.get_annotation_types();
//    for(var _i in _types){
//        var _type = _types[_i];
//        //var _type_id = _type.get_id();
//        //$.test_msg("type_id=", _type_id);      
//    }
    */
};


/**
 * 設定目前獎章的進度
 * @returns {KALS_stamp.prototype}
 */
KALS_stamp.prototype.set_stamp_statistic = function() {
    
    //$.test_msg("KALS_stamp.set_stamp_statistic()", "暫停運作");
    //return;
    
    //抓取目前所有的types_id(含basic與自訂義)
    /*var _types = this.get_annotation_types();
    for(var _i in _types){
        var _type = _types[_i];
        var _type_id = _type.get_id();
        //$.test_msg("type_id=", _type_id);      
    }*/

    /*這邊要改成去搜尋自訂的TYPE_ID
    //basic - 可用id
    var _type_importance = 1;
    var _annotation_type_importance = new Annotation_type_param(_type_importance);
    var _type_confusion = 'confusion';
    var _annotation_type_confusion = new Annotation_type_param(_type_confusion); */
    
    //自訂義
    var _type_knowed = "我知道";
    var _type_knowledge = "新知識";
    var _type_dont_know = "我不懂";
    var _type_strange = "很奇怪";
    var _type_predefined = "補充舉例";//這個是name
    var _type_discuss = "我想說";
    //用id建立annotation_type_param再代入
    var _annotation_type_knowed = new Annotation_type_param(_type_knowed); 
    var _annotation_type_knowledge = new Annotation_type_param(_type_knowledge); 
    var _annotation_type_dont_know = new Annotation_type_param(_type_dont_know); 
    var _annotation_type_strange = new Annotation_type_param(_type_strange); 
    var _annotation_type_predefined = new Annotation_type_param(_type_predefined); 
    var _annotation_type_discuss = new Annotation_type_param(_type_discuss);  
    //KALS_util.notify("predefined = "+ _annotation_type_predefined.get_name());
    
    var _statistic_count_list = { 
        //topic總數量       
        "statistic_topic_annotation_count": KALS_context.user.get_topic_annotation_count(),        
//        // topic我知道
//        "statistic_topic_knowed_count": KALS_context.user.get_topic_annotation_count(_annotation_type_knowed),
//        // topic新知識
//        "statistic_topic_knowledge_count": KALS_context.user.get_topic_annotation_count(_annotation_type_knowledge),
//        // topic我不懂
//        "statistic_topic_dont_know_count": KALS_context.user.get_topic_annotation_count(_annotation_type_dont_know),
//        // topic很奇怪
//        "statistic_topic_strange_count": KALS_context.user.get_topic_annotation_count(_annotation_type_strange),
//        // topic補充舉例
//        "statistic_topic_predefined_count":KALS_context.user.get_topic_annotation_count(_annotation_type_predefined),       
//        // topic我想說
        "statistic_topic_discuss_count": KALS_context.user.get_topic_annotation_count(_annotation_type_discuss),    
        //被回應的數量
        "statistic_responded_annotation_count":KALS_context.user.get_respond_to_my_annotation_count(),
        //回應別人的數量
        "statistic_respond_to_annotation_count":KALS_context.user.get_respond_to_other_annotation_count(),
        //被回應的人數
        "statistic_responded_users_count":KALS_context.user.get_responded_users_count(),
        //回應的人數
        "statistic_respond_to_users_count":KALS_context.user.get_respond_to_users_count(),
        //我喜愛的人數
        "statistic_like_to_users_count":KALS_context.user.get_like_to_users_count(),
        //有多少人喜愛我
        "statistic_liked_users_count": KALS_context.user.get_liked_users_count(),
        //我有多少愛心
        "statistic_liked_count": KALS_context.user.get_liked_count(),
        //我送出去多少愛心
        "statistic_like_to_count": KALS_context.user.get_like_to_count()

    };
    
    /**
     * 要用自訂標註的偵測
     * @author Pulipuli Chen 20141110
     */
    var _annotation_type_count_list = {};
    var _types = this.get_annotation_types();
    for(var _i in _types){
        var _type = _types[_i];
        var _type_name = _type.get_name();
        //var _type_id = _type.get_id();
        //$.test_msg("type_id=", _type_id);      
        //$.test_msg("type_name=", _type_name);
        
        //var _annotation_param = KALS_context.user.get_topic_annotation_count(_type_name);
        _annotation_type_count_list[_type_name] = KALS_context.user.get_topic_annotation_count(_type_name);
    }
    
    var _container_selector = ".stamp-statistic";
    var _container = this.find(_container_selector)
            .empty();
    
    for (var _key in _statistic_count_list) {
        
        var _field_name  = this.get_view_lang_line(_key);
        var _field_value = _statistic_count_list[_key];
        var _li_html = "<strong>" + _field_name + "</strong>: " + _field_value; 
        
        $("<li></li>")
                .html(_li_html)
                .addClass(_key)
                .appendTo(_container);
//        
//        
//        var _title = $("<strong></strong>").html(_title_lang + ": ")
//                .appendTo(_li);
//        var _qualified_message = _statistic_config[_statistic_title];
//        var _message = $("<span></span>").html(_qualified_message)
//                .appendTo(_li);
//        
//        _li.appendTo(_container);
    }
    
    var _annotation_type_container = $("<ul />").appendTo(_container.find(".statistic_topic_annotation_count"));
    
    for (var _key in _annotation_type_count_list) {
        var _li_html = "<strong>" + _key + "</strong>: " + _annotation_type_count_list[_key]; 
        $("<li />")
                .addClass(_key)
                .html(_li_html)
                .appendTo(_annotation_type_container);
    }
        
    return this;
};

/**
 * 設定已經獲得的獎章
 * @author Pulipuli Chen 20141109
 * @returns {KALS_stamp}
 */
KALS_stamp.prototype.set_stamp_qualified = function() {
 
    var _stamps_config = this._init_config();
//    var _qualified_config = {
//         "stamps_level_0": _stamps_config[0].name,
//         "stamps_level_1": _stamps_config[1].name,
//         "stamps_level_2": this._stamps_config[2].name,
//         "stamps_level_3": this._stamps_config[3].name,
//         "stamps_level_4": this._stamps_config[4].name
//    };
//    
//    //var _qualified_container = this.find(".stamp-qualified")
//    //        .empty();
//
	//TABLE
    var _qualified_name = this.find(".qualified-name").empty();
    var _qualified_img = this.find(".qualified-img").empty();
    var _qualification_container = this.find(".stamp-qualification-list").empty();
	
//    var _i = 0;
//    var _k = 0;
    for (var _stamp_index in _stamps_config) {   
        // 取得is_qualified的值來讓後面的迴圈判斷要不要顯示圖片(取得獎章) 
        //var _stamp_title = "stamps_level_" + _stamp_index;
        
        var _image_url = _stamps_config[_stamp_index].image_url;
        //$.test_msg("KALS_stamp.set_stamp_qualified()", typeof(KALS_context.url));
        _image_url = KALS_context.url.filter_base_url(_image_url);
        var _image = '<img src="' + _image_url + '" />';
        
        var _stamp_title_lang = _stamps_config[_stamp_index].name;
        
        if ( _stamps_config[_stamp_index].is_qualified === true) {
            //KALS_util.notify("現在是幾呢？"+ _i);
            
            //var _stamp_title_lang = this.get_view_lang_line(_stamp_title);
            var _title = $('<td></td>')
                    .html(_stamp_title_lang)
                    .appendTo(_qualified_name);					
            //_i++;
//        }
//        
//        if ( _stamps_config[_stamp_index].is_qualified === true ) {
            //var _stamp_picture = $();來加入圖片吧！
            //var _stamp_picture = $("<td background=/kals/images/stamp_imgs/stamp_"+ _k +".png></td>").html(_qualified_message)
            
            
            var _stamp_picture = $('<td></td>')
                    .html(_image)
                    .appendTo(_qualified_img);		
            //_k++;
        }   //if ( _stamps_config[_stamp_index].is_qualified === true) {
        else {
//            //var _stamp_title_lang = this.get_view_lang_line(_stamp_title);
//            var _title = $("<dt></dt>").html(_stamp_title_lang)
//                    .appendTo(_qualification_container);
//            //var _qualification_message = _qualification_config[_stamp_title];
//            var _qualification_message = _stamps_config[_stamp_index].qualification_message;            
//            var _stamp_picture = $('<img src="' + _image_url + '" />').html(_qualification_message)
//                        .appendTo(_qualification_container);			
//            var _message = $("<dd></dd>").html(_qualification_message)
//                    .appendTo(_qualification_container);
            var _tr = $("<tr />");
            $("<th />")
                    .html('<div class="header">' + _stamp_title_lang + "</div>"
                        + _image)
                    .appendTo(_tr);
            
            var _qualification_message = _stamps_config[_stamp_index].qualification_message;   
            $("<td />")
                    .html(_qualification_message)
                    .appendTo(_tr);
            
            _tr.appendTo(_qualification_container);
        }
    }
        
    return this;
};

///**
// * 設定尚未獲得的獎章
// * @returns {KALS_stamp.prototype}
// */
//KALS_stamp.prototype.set_stamp_qualification = function() {   
//    
//    var _qualification_config = {
//         "stamps_level_0": this._stamps_config[0].qualification_message,
//         "stamps_level_1": this._stamps_config[1].qualification_message,
//         "stamps_level_2": this._stamps_config[2].qualification_message,
//         "stamps_level_3": this._stamps_config[3].qualification_message,
//         "stamps_level_4": this._stamps_config[4].qualification_message
//        };
//    var _qualification_container = this.find(".stamp-qualification")
//            .empty();
//    var _i = 0;
//    
//    for (var _stamp_title in _qualification_config) {
//        if( this._stamps_config[_i].is_qualified !== false){
//            _i++;
//        }
//        else{
//            //KALS_util.notify("現在是幾呢？"+ _i);
//            var _stamp_title_lang = this.get_view_lang_line(_stamp_title);
//            var _title = $("<dt style=clear:both></dt>").html(_stamp_title_lang)
//                    .appendTo(_qualification_container);
//            var _qualification_message = _qualification_config[_stamp_title];
//            var _stamp_picture = $("<img src=/kals/images/stamp_imgs/stamp_"+ _i +".png style=float:left;></>").html(_qualification_message)
//                        .appendTo(_qualification_container);			
//            var _message = $("<dd style=margin-left:75px;></dd>").html(_qualification_message)
//                    .appendTo(_qualification_container);
//
//            _i++;
//        }
//    }
//        
//    return this;
//};

/**
 * 設定顯示階級名單
 * @author Pulipuli Chen 20141107
 */
KALS_stamp.prototype.get_stamp_list = function() { 
    
    //$.test_msg("get_stamp_list", "先在這裡打住");
    //return this;
    
    var _stamp_data = this._init_config();
    // 要改成每個階級都要顯示！
    
    var _this = this;
    
    this.request_post("get_stamps_list", _stamp_data, function( _stamp_result){
        _this.get_stamp_list_after_post(_stamp_result);
    });
   return this;
};

/**
 * 設定顯示階級名單，在送出post之後
 * @param {Object} _stamp_result
 * @author Pulipuli Chen 20141110
 */
KALS_stamp.prototype.get_stamp_list_after_post = function(_stamp_result) { 
    //加入class在stamps-list的區塊畫出user
    //$.test_msg("KALS_stamp.get_stamp_list_after_post() 接收stamp_result", _stamp_result[0]);
    
    var _list_container = this.find('.stamps-list').empty();
    
    for ( var _i in _stamp_result) {
//        //$.test_msg("接收stamp_result " + _k, _stamp_result[_k]);
//
//        //_list_container.empty();
//        //$.test_msg("stamp_name = "+ _stamp_result[_k].stamp_name );
//        //$.test_msg("user_name = "+ _stamp_result[_k].user_name_list );
//        //名稱
//        var _stamp_index = _stamp_result[_k].stamp_index;
//        //var _stamp_title = _stamp_result[_k].stamp_name ;
//        var _stamp_title_lang = _stamp_data[_stamp_index].name;
//        //var _stamp_title_lang = this.get_view_lang_line(_stamp_title);
//        //var _stamp_title_lang = _stamp_data[_];
//
//        //縮圖與名單
//        var _name_arr = _stamp_result[_k].user_name_list;  
//        //var _stamp_name = _stamp_result[_k].stamp_name;
//        //var _image = KALS_context.get_base_url("/images/stamp_imgs/stamp_"+_stamp_name +".png", true);
//        var _image_url = _stamp_data[_stamp_index].image_url;
//        _image_url = KALS_context.url.filter_base_url(_image_url);
//        //for( var _index=0; _index<_stamp_result.length; _index++){
//        if( _name_arr !== null 
//                || _name_arr !== "undefined" ){
//            var _title = $("<h4></h4>")
//                    .html(_stamp_title_lang)
//                    .appendTo(_list_container);                  
//            var _stamp_user_list = $('<ul class="stamps-list king-list-area list-name" style="border-bottom: 3px solid gray; padding-left: 80px; background-image: url('+_image_url+'); min-height: 100px; background-repeat: no-repeat">'
//                    //+ _name_arr 
//                    +'</ul>')
//                    .appendTo(_list_container);    
//            for (var _index in _name_arr) {
//
//                var _name_span = $('<li style=" width: 100px; cursor: pointer"/>').html(_name_arr[_index]);
//                _name_span.appendTo(_stamp_user_list);
//
//                _name_span.click(function() {
//                    //搜尋
//                    KALS_context.search.search({
//                        range: "author",
//                        keyword: $(this).html()
//                    }, false);
//                });
//
//                _name_span.addClass("list-span");
//
//                _name_span.css("float","left");
//
//                if (_index % 3 === 0) {
//                    _name_span.css("clear", "both");
//                } 
//            }   //for (var _index in _name_arr) {
//        }
        
        //$.test_msg("KALS_stamp.get_stamp_list_after_post() _i=", _i);
        var _stamp_index = _stamp_result[_i].stamp_index;
        var _user_name_list = _stamp_result[_i].user_name_list;
        
        if ($.is_array(_user_name_list)) {
            var _list_ele = this.get_stamp_list_create(_stamp_index, _user_name_list);
            _list_ele.appendTo(_list_container); 
        }
        
    }   //for ( var _i in _stamp_result) {
};

/**
 * 設定顯示階級名單，單一階級
 * @param {Object} _stamp_result
 * @author Pulipuli Chen 20141110
 * @return {jQuery} 單一階級的jQuery元素
 */
KALS_stamp.prototype.get_stamp_list_create = function(_stamp_index, _user_name_list) { 
    
    var _this = this;
    
    var _list_ele = $("<tr/>");
    
    var _stamp_data = this._init_config();
    var _stamp_title_lang = _stamp_data[_stamp_index].name;
    
    var _image_url = _stamp_data[_stamp_index].image_url;
    _image_url = KALS_context.url.filter_base_url(_image_url);
    var _image = '<img src="' + _image_url + '" />';
    
    $("<th />")
            .html('<div class="header">' + _stamp_title_lang + "</div>"
                + _image)
            .appendTo(_list_ele);
    
    var _td = $("<td />").appendTo(_list_ele);
    
    for (var _i in _user_name_list) {

        var _name_span = $('<li class="user-name-list" />').html(_user_name_list[_i]);
        _name_span.appendTo(_td);

        _name_span.click(function() {
            var _keyword = $(this).html();
            _this.close(function () {
                //setTimeout(function () {
                    //搜尋
                    KALS_context.search.search({
                        search_range: "author",
                        keyword: _keyword
                    }, true);
                //}, 500);
            });
        });

        //_name_span.addClass("list-span");

        //_name_span.css("float","left");

        if (_i % 3 === 0) {
            _name_span.css("clear", "both");
        } 
    }   //for (var _index in _name_arr) {
    
    return _list_ele;
};

/**
 * ====================
 * 獎章資格設定
 * ====================
 */

/**
 * 初始化獎章的設定
 * @type {Object}
 */
KALS_stamp.prototype._stamps_config = null;

/**
 * 取得設定
 * 
 * 請從KALS_CONFIG中取得獎章模組的資格設定
 * @returns {KALS_stamp}
 */
KALS_stamp.prototype._init_config = function() {
    
    if (this._stamps_config === null) {
        this._stamps_config = KALS_CONFIG.modules.KALS_stamp.stamps;
    }
    
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
    
    var _listen_attr_list = [
        "topic_annotation_count",
        "responded_annotation_count",
        "respond_to_users_count",
        "respond_to_my_annotation_count",
        "respond_to_other_annotation_count",
        "responded_users_count",
        "respond_to_users_count",
        "responded_count",
        "like_to_count",
        "liked_count",
        "like_to_users_count",
        "liked_users_count"
    ];
    
    var _this = this;
    var _listen_callback = function (_user, _attr_value, _attr) {
        if (KALS_context.completed === true) {
            //$.test_msg("KALS_stamp _init_listener", _attr);
            _this._delay_check_qualification(_user);
            //$.test_msg("KALS_stamp _init_listener_topic KALS_context.completed", KALS_context.completed); 
        }
    };
    
//    
//    KALS_context.user.add_attr_listener("topic_annotation_count", function (_user) {
//        if (KALS_context.completed === true) {
//            $.test_msg("KALS_stamp _init_listener_topic", KALS_context.completed);
//            _this._delay_check_qualification(_user);
//           //$.test_msg("KALS_stamp _init_listener_topic KALS_context.completed", KALS_context.completed); 
//        }
//    });
//    
//    KALS_context.user.add_attr_listener("responded_annotation_count", function (_user) {
//        if (KALS_context.completed === true) {
//            $.test_msg("KALS_stamp _init_listener_res", KALS_context.completed);
//            _this._delay_check_qualification(_user);
//        }
//    });    
//    KALS_context.user.add_attr_listener("respond_to_users_count", function (_user) {
//        if (KALS_context.completed === true) {
//            $.test_msg("KALS_stamp _init_listener_respond_to_users_count", KALS_context.completed);
//            _this._delay_check_qualification(_user);
//        }
//    });
//    
    KALS_context.ready(function () {
        _this.change_tab("btn-qualification");
        
        // 選擇標註範圍時，把獎章關掉
        KALS_text.selection.select.add_listener("select", function() {
            //$.test_msg("KALS_stamp._init_listener()", "已經有選擇");
            _this.close();
        });
        
        KALS_context.auth.add_listener(function (_auth) {
            if (_auth.is_login() === true) {
                _this.setup_stamp_content();
            }
        }, true);
        //_this.setup_stamp_content();
        
        $.each(_listen_attr_list, function(_key, _value) {
            KALS_context.user.add_attr_listener(_value, _listen_callback);
        });
        
//        KALS_context.policy.add_attr_listener('write', function (_policy) {
//            if (_policy.writable()) {
//                //_this.open();
//            }
//        }, true);
    });
    
    return this;
};

KALS_stamp.prototype._delay_timer = null;

/**
 * 延後確認晉級訊息
 * @type Number
 */
KALS_stamp.prototype._delay_interval = 1000;

/**
 * 延遲呼叫check_qualification
 * @param {Context_user} _user
 */
KALS_stamp.prototype._delay_check_qualification = function (_user) {
    
    if (KALS_context.auth.is_login() === false) {
        return this;
    }
    
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
        clearTimeout(_this._delay_timer);
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
    
    //$.test_msg("KALS_stamp.check_qualification");
    
    var _qualification_modified = false;
    
    //-----要check的資料------
    //var _topic_impotrance_count = _user.get_topic_annotation_count();
    //-----------------------
    // var _stamps_data = this._stamps_config;會怪怪的
    //$.test_msg("KALS_stamp check_qualification 1");
    var _stamps_data = this._init_config();
    // 全部的資格
    for ( var _i=0; _i< _stamps_data.length; _i++ ) {
        // 用來判斷是否有通過資格
        var _stamp_qualified = false;
        var _qualifier = _stamps_data[_i].qualifier;
        // 檢查qualifier中的所有條件
        for (var _key in _qualifier) {
            
            var _config = _qualifier[_key];
            //KALS_util.notify("_KEY =" + _key); //KEY有哪些
            switch (_key) {
                case "topic_annotation_count":
                    //------第一項---------------------------------
                    _stamp_qualified = this.check_qualification_topic_annotation_count(_user, _config);
                    break;
                case "respond_to_user_count":
                    //-----第2項respond_to_user_count-----------------------------------
                    _stamp_qualified = this.check_qualification_respond_to_user_count(_user, _config);
                    break;
                case "responded_user_count":
                    //-------第3項responded_user_count-----------------------
                    _stamp_qualified = this.check_qualification_responded_user_count(_user, _config);
                    break;
                case "like_to_users_count":
                    //-----第4項like_to_users_count---------------------------
                    _stamp_qualified = this.check_qualification_like_to_users_count(_user, _config);
                    break;
                case "liked_users_count":
                    //--------第5項liked_users_count--------------------------------------
                    _stamp_qualified = this.check_qualification_liked_users_count(_user, _config);                
                    break;
            }   //switch (_key) {
//            if (_key === "topic_annotation_count") {
//                //------第一項---------------------------------
//                _stamp_qualified = this.check_qualification_topic_annotation_count(_user, _config);
//            }   //if (_key === "topic_annotation_count") {
//            else if (_key === "respond_to_user_count") {
//                //-----第2項respond_to_user_count-----------------------------------
//                _stamp_qualified = this.check_qualification_respond_to_user_count(_user, _config);
//            } //if (_key === "respond_to_user_count"){  
//            else if (_key === "responded_user_count") {
//                //-------第3項responded_user_count-----------------------
//                _stamp_qualified = this.check_qualification_responded_user_count(_user, _config);
//            } //if (_key === "responded_user_count"){               
//            else if (_key === "like_to_users_count") {
//                //-----第4項like_to_users_count---------------------------
//                _stamp_qualified = this.check_qualification_like_to_users_count(_user, _config);
//            } //if (_key === "like_to_users_count"){        
//            else if (_key === "liked_users_count") {
//                //--------第5項liked_users_count--------------------------------------
//                _stamp_qualified = this.check_qualification_liked_users_count(_user, _config);                
//            }  //if (_key === "liked_users_count") {
             //-------------------------------------------------------
            // KALS_util.notify("_i.is_qualified為" + _i + this._stamps_config[_i].is_qualified);
            if (_stamp_qualified === false) {
                break;
            }
//            else {
//                this._stamps_config[_i].is_qualified = _stamp_qualified;
//            }
        }   //for (var _key in _qualifier) {
        
//        var _qualifier = _stamps_data[_i].qualifier;
//        var _stamp_qualified = (
//                this.check_qualification_topic_annotation_count(_user, _config)
//                && this.check_qualification_respond_to_user_count(_user, _config)
//                && this.check_qualification_responded_user_count(_user, _config)
//                && this.check_qualification_like_to_users_count(_user, _config)
//                && this.check_qualification_liked_users_count(_user, _config)
//                );
        
        if (this._stamps_config[_i].is_qualified !== _stamp_qualified) {
            _qualification_modified = true;
        }
        
        // 獲得獎章的設定
        this._stamps_config[_i].is_qualified = _stamp_qualified;
        //KALS_util.notify("_i.is_qualified為" + _i + this._stamps_config[_i].is_qualified);
        //$.test_msg("KALS_stamp _i.is_qualified為"+  _i + this._stamps_config[_i].is_qualified);
        
    }   //for ( var _i=0; _i< _stamps_data.length; _i++ ) {
    
    //$.test_msg("KALS_stamp.prototype.check_qualification", _qualification_modified);
    if ( _qualification_modified === true 
            || this._stamp_level === -1) {
        this.qualify();
    }
    
    //$.test_msg("KALS_stamp check_qualification 2");
    //this.open();
    
    return this;
};

/**
 * 確認主題標註總數
 * @author Pulipuli Chen 20141108
 * @param {Object} _user 來自Context_user
 * @param {Object} _config
 * @returns {Boolean} 是否符合資格
 */
KALS_stamp.prototype.check_qualification_topic_annotation_count = function(_user, _config) {
    var _stamp_qualified = false;
    for (var _type in _config) {
        var _type_config = _config[_type];

        if (_type === "_total") {
            var _total_annotation_count = _user.get_topic_annotation_count();
            if ( _type_config.count > _total_annotation_count ){
                // 不合格
                _stamp_qualified = false;    
                break;
            }
            else{ // 合格
                _stamp_qualified = true;

                //KALS_util.notify("第一項有跑嗎？"+ _type_config.count + _stamp_qualified + _total_annotation_count);
                //this.qualify();
            }
        }
        else {
            // 取出指定type的數量
            var _annotation_type = new Annotation_type_param(_type);
            var _total_annotation_count = _user.get_topic_annotation_count(_annotation_type);

            //$.test_msg("現在的類型" + _type, [_total_annotation_count, _type_config.count, ( _type_config.count > _total_annotation_count )]);
            if ( _type_config.count > _total_annotation_count ){
                // 不合格
                _stamp_qualified = false;    
                break;
            }
            else{ // 合格
                _stamp_qualified = true;
                //KALS_util.notify("第二項有跑嗎？"+ this._stamps_config[_i].is_qualified + _i);
                //this.qualify();
            }
        }
    }   //for (var _type in _config) {              

    return _stamp_qualified;
};


/**
 * 確認回應標註總數
 * @author Pulipuli Chen 20141108
 * @param {Object} _user 來自Context_user
 * @param {Object} _config 回應標註的數量
 * @returns {Boolean} 是否符合資格
 */
KALS_stamp.prototype.check_qualification_respond_to_user_count = function(_user, _config) {
    var _stamp_qualified = false;
    
    var _count = _config.count;
    var _respond_to_user_count = _user.get_respond_to_users_count();
    // var _respond_to_user_count_config = _config[_key];
      //$.test_msg("NO2.respond_to_user_count = ", _count);
     if (_respond_to_user_count < _count) {
         // 不合格
         _stamp_qualified = false;
        //KALS_util.notify("第2項respond_to_user_count未達成"+ _qualifier[_key].count + _stamp_qualified);
        //break;                  
     }
     else {// 合格
         _stamp_qualified = true;                
     }     
     
     return _stamp_qualified;
};

/**
 * 確認被回應標註總數
 * @author Pulipuli Chen 20141108
 * @param {Object} _user 來自Context_user
 * @param {Object} _config 條件設定
 * @returns {Boolean} 是否符合資格
 */
KALS_stamp.prototype.check_qualification_responded_user_count = function(_user, _config) {
    var _stamp_qualified = false;
    
    var _responded_user_count = _user.get_responded_users_count();

    //$.test_msg("NO3.responded_user_count = ", _config.count);
    if (_responded_user_count < _config.count){
        // 不合格
        _stamp_qualified = false;
       //KALS_util.notify("第3項responded_user_count未達成"+ _qualifier[_key].count + _stamp_qualified);
       //break;                  
    }
    else{// 合格
        _stamp_qualified = true;                
    }     
    
    return _stamp_qualified;
};

/**
 * 確認喜愛別人的標註總數
 * @author Pulipuli Chen 20141108
 * @param {Object} _user 來自Context_user
 * @param {Object} _config 回應標註的數量
 * @returns {Boolean} 是否符合資格
 */
KALS_stamp.prototype.check_qualification_like_to_users_count = function(_user, _config) {
    var _stamp_qualified = false;
    
    var _like_to_users_count = _user.get_like_to_users_count();

    //$.test_msg("NO4.responded_user_count = ", _config.count);
    if (_like_to_users_count < _config.count){
        // 不合格
        _stamp_qualified = false;
       //KALS_util.notify("第4項_like_to_users_count未達成"+ _qualifier[_key].count + _stamp_qualified);
       //break;                  
    }
    else { // 合格
        _stamp_qualified = true;                
    }     
    
    return _stamp_qualified;
};

/**
 * 確認喜愛人數的標註總數
 * @author Pulipuli Chen 20141108
 * @param {Object} _user 來自Context_user
 * @param {Object} _config 回應標註的數量
 * @returns {Boolean} 是否符合資格
 */
KALS_stamp.prototype.check_qualification_liked_users_count = function(_user, _config) {
    var _stamp_qualified = false;
    
    var _liked_users_count = _user.get_liked_users_count();
    //$.test_msg("NO5.liked_users_count = ", _config.count);
    if ( _liked_users_count < _config.count ){
       // 不合格
       _stamp_qualified = false;
        //KALS_util.notify("第5項liked_users_count未達成"+ _qualifier[_key].count + _stamp_qualified);
       //break;
    }
    else { // 合格
       _stamp_qualified = true;
    }
    
    return _stamp_qualified;
};

///**
// * 獲得資格後的動作->開放權限？
// * 
// * @returns {KALS_stamp.prototype}
// */

/**
 * 最後資格的等級
 * @type Number
 * @author Pulipuli Chen 20141108
 */
KALS_stamp.prototype._stamp_level = -1;

/**
 * 是不是第一次開啟獎章
 * @type  Boolean
 * @author Pulipuli Chen 20141110
 */
KALS_stamp.prototype._first_notify = true;

//KALS_stamp.prototype._stamp_level_modified = false;

//KALS_stamp.prototype._stamp_level_up = true;

/**
 * 確認晉升動作
 * @author Pulipuli Chen 20141108
 * @returns {KALS_stamp}
 */
KALS_stamp.prototype.qualify = function() {
//    
//    //this._stamp_level_modified = false;
//    this._stamp_level_up = true;
//    var _i;
//    // 設定開啟功能
//
//    var _stamps_data = this._init_config();
//    //$.test_msg("ERROR: " + JSON.stringify(_stamps_data));
//    for ( var _i in _stamps_data) {
//        if (this._stamps_config[_i].is_qualified === true) {
//          
//           // $.test_msg("KALS_stamp qualify 3");
//           if (this._stamps_config[_i].is_qualified === true) {
//               if (this._stamp_level === null) { //如果你還沒有等級的話就設定現在的等級給level
//                   this._stamp_level = _i;
//                   //this._stamp_level_modified = true;
//                   this._stamp_level_up = true;
//                   //$.test_msg("KALS_stamp qualify 4 this._stamp_level" + this._stamp_level);                  
//               }    //if (this._stamp_level === null) { //如果你還沒有等級的話就設定現在的等級給level
//               else if (_i > this._stamp_level) { //已經有等級了->升級
//                   this._stamp_level = _i;
//                   //this._stamp_level_modified = true;
//                   this._stamp_level_up = true;
//                  
//                   //$.test_msg("KALS_stamp qualify 5 this._stamp_level" + this._stamp_level);
//               }    //else if (_i > this._stamp_level) { //已經有等級了->升級
//               else{ //已經等級了->降級
//                   //...?
//                   //$.test_msg("KALS_stamp qualify FALSE _1!!" + this._stamps_config[_i].is_qualified + "NOW IS "+ _i + "this._stamp_level"+ this._stamp_level);  
//               }    //else{ //已經等級了->降級
//           }    //if (this._stamps_config[_i].is_qualified === true) {
//           else if (this._stamp_level === _i 
//                   && this._stamp_level > 0) {
//               this._stamp_level--;
//               //this._stamp_level_modified = true;
//               this._stamp_level_up = false;
//               //$.test_msg("KALS_stamp qualify 6 this._stamp_level" + this._stamp_level);  
//           }    //else if (this._stamp_level === _i 
//   
//       //$.test_msg("KALS_stamp qualify 7 this._stamp_level" + this._stamp_level); 
//        // KALS_context.policy.set_readable(true);
//        }   //if (this._stamps_config[_i].is_qualified === true) {
//    }   //for ( _i in _stamps_data) {
    
    var _stamp_config = this._stamps_config;
    var _stamp_level = this._stamp_level;
    var _stamp_level_up = null;
    
    var _stamp_new_level = this.qualify_check_modified_direct(_stamp_config, _stamp_level);
    if (_stamp_new_level < _stamp_level) {
        _stamp_level_up = false;
    }
    else {
        _stamp_level_up = true;
    }
    this.qualify_change_policy(_stamp_config, _stamp_new_level);
    
    /**
     * 資料有更新時，才重新設定
     * @author Pulipuli Chen 20141110 
     */
    this.setup_stamp_content();
    
    this.qualify_notify(_stamp_config, _stamp_new_level, _stamp_level_up);
    ///if (this._stamp_level_modified === true) {
    
    this._stamp_level = _stamp_new_level;
    //} //if (this._stamp_level_modified === true) {
    
    //$.test_msg("KALS_stamp.qualify()", "有人open嗎？");
    this.change_tab("btn-qualification");
    //this.change_tab("btn-king-list");
    
    this.open();
        
    return this;
};

/**
 * 確認晉升或降級
 * @author Pulipuli Chen 20141108
 * @param {Object} _stamps_config 所有獎章的設定
 * @param {Number} _stamp_level 現在獎章的等級
 * @returns {boolean} true=升級 false=降級
 */
KALS_stamp.prototype.qualify_check_modified_direct = function(_stamps_config, _stamp_level) {
    
    //this._stamp_level_modified = false;
    //var _stamp_level_up = true;
    
    var _i;
    // 設定開啟功能

    var _stamps_data = this._init_config();
    //$.test_msg("ERROR: " + JSON.stringify(_stamps_data));
    for ( _i in _stamps_data) {
        if (_stamps_config[_i].is_qualified === true) {
           // $.test_msg("KALS_stamp qualify 3");
           if (_stamps_config[_i].is_qualified === true) {
               _stamp_level = _i;
//               if (_stamp_level === -1) { //如果你還沒有等級的話就設定現在的等級給level
//                   _stamp_level = _i;
//                   //this._stamp_level_modified = true;
//                   //_stamp_level_up = true;
//                   //$.test_msg("KALS_stamp qualify 4 this._stamp_level" + this._stamp_level);                  
//               }    //if (this._stamp_level === null) { //如果你還沒有等級的話就設定現在的等級給level
//               else if (_i > _stamp_level) { //已經有等級了->升級
//                   _stamp_level = _i;
//                   //this._stamp_level_modified = true;
//                   //_stamp_level_up = true;
//                  
//                   //$.test_msg("KALS_stamp qualify 5 this._stamp_level" + this._stamp_level);
//               }    //else if (_i > this._stamp_level) { //已經有等級了->升級
//               else{ //已經等級了->降級
//                   //...?
//                   //$.test_msg("KALS_stamp qualify FALSE _1!!" + this._stamps_config[_i].is_qualified + "NOW IS "+ _i + "this._stamp_level"+ this._stamp_level);  
//               }    //else{ //已經等級了->降級
           }    //if (this._stamps_config[_i].is_qualified === true) {
           else if (_stamp_level === _i 
                   && _stamp_level > 0) {
               _stamp_level--;
               //this._stamp_level_modified = true;
               //_stamp_level_up = false;
               //$.test_msg("KALS_stamp qualify 6 this._stamp_level" + this._stamp_level);  
           }    //else if (this._stamp_level === _i 
   
       //$.test_msg("KALS_stamp qualify 7 this._stamp_level" + this._stamp_level); 
        // KALS_context.policy.set_readable(true);
        }   //if (this._stamps_config[_i].is_qualified === true) {
    }   //for ( _i in _stamps_data) {
    
    return _stamp_level;
};

/**
 * 變更權限
 * @author Pulipuli Chen 20141108
 * @param {Object} _stamps_config 所有獎章的設定
 * @param {Number} _stamp_level 現在獎章的等級
 * @returns {KALS_stamp}
 */
KALS_stamp.prototype.qualify_change_policy = function(_stamps_config, _stamp_level) {
    
    if (typeof(_stamps_config[_stamp_level].policy) === "undefined") {
        // 如果沒有需要設定的權限，那就略過
        return this;
    }
    
    var _policy = _stamps_config[_stamp_level].policy;
    // 用迴圈檢視設定policy中的權限設定
    for ( var _k in _policy ) {
        // _ k = topic_writable
        switch (_k) {
            case "topic_writable":
                //KALS_context.policy.set_topic_writable(_policy[_k]);
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
        }   //switch (_k) {
    }   //for( var _k in _policy ){
    
    return this;
};

/**
 * 顯示升級或降級訊息
 * @author Pulipuli Chen 20141108
 * @param {Object} _stamps_config 所有獎章的設定
 * @param {Number} _stamp_level 現在獎章的內容
 * @param {boolean} _stamp_level_up 是否升級
 * @returns {boolean} true=升級 false=降級
 */
KALS_stamp.prototype.qualify_notify = function(_stamps_config, _stamp_level, _stamp_level_up) {
    var _msg;
    //var _img_path =  KALS_context.get_base_url("/images/stamp_imgs/stamp_"+ _stamps_config[_stamp_level].name +".png", true);
    var _image_url = _stamps_config[_stamp_level].image_url;
    _image_url = KALS_context.url.filter_base_url(_image_url);
    
    var _img ='<img src="'+_image_url+'" style="height: 50px; width: auto;margin-right: 1em;"/>';
    
    if (this._first_notify === true) {
        _msg = _stamps_config[_stamp_level].quailfy_message;
        this._first_notify = false;
    }
    else if (_stamp_level_up === true) {
        //升級通知訊息
        _msg = _stamps_config[_stamp_level].qualified_message;
        //KALS_util.notify(_msg+_img);
        //$.test_msg("KALS_stamp qualify 8 _stamp_level_up" + this._stamp_level_up);
    }   //if (this._stamp_level_up === true) {
    else {  //if (this._stamp_level_up === true) {
        //降級通知訊息
        _msg = _stamps_config[_stamp_level].disqualify_message;
        //KALS_util.notify(_msg+_img);
        //$.test_msg("KALS_stamp qualify 9 _stamp_level_up" + this._stamp_level_up);
    }   //else {

    //$.test_msg("KALS_stamp.qualify", _msg);
    //KALS_util.notify(_msg+_img);
    
    _msg = '<span style="clear:both; line-height: 50px;float:right">' + _msg + '</span>' + _img;
    KALS_util.notify(_msg);

    return this;
};

/**
 * 設定獎章的資料
 * @author Pulipuli Chen 20141110
 * @returns {KALS_stamp}
 */
KALS_stamp.prototype.setup_stamp_content = function () {
    this.set_stamp_statistic();
    this.set_stamp_qualified();
    this.get_stamp_list();
    
    return this;
};

/* End of file KALS_stamp */
/* Location: ./system/application/views/web_apps/extension/KALS_stamp/KALS_stamp.js */