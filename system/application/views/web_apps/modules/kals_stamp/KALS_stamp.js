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
    this.get_stamp_list();
    KALS_context.user.load_user_params();
    return this;
};

/**
 * 切換顯示分頁
 * @returns {KALS_stamp.prototype}
 */
KALS_stamp.prototype.change_tab = function (_btn){
    //-------------
    var _types = this.get_annotation_types();
    for(var _i in _types){
        var _type = _types[_i];
        var _type_id = _type.get_id();
        //$.test_msg("type_id=", _type_id);      
    }
   //----------
    this.find(".tab-button").removeAttr("style");

   //KALS_util.notify("test",this.find("list-button-counts"));
    //$.test_msg("change_tab", [typeof(_btn.attr), _btn.parent().length]);
   //取出btn-name屬性的值   
    var _tab_name = _btn.attr("tab_name");

    
    _btn.css("background", "red");   
    _btn.css("color", "white");
    $.test_msg("tab name", _tab_name);
    //KALS_util.notify("_btn_name="+ _tab_name);
    
    var _tab_contents = $(_btn).parents(".tab-area:first").find(".tab-content");
   // _btn.css("background", "red");
   
    //先隱藏所有的div
    _tab_contents.hide();
    //再依tab-name來顯示要看的div
    _tab_contents.filter("." + _tab_name).show();
    
    //var _tab = this.find("list-button-counts");
    
    
}


/**
 * 設定目前獎章的進度
 * @returns {KALS_stamp.prototype}
 */
KALS_stamp.prototype.set_stamp_statistic = function() {
    
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
    
    var _statistic_config = { 
        //topic總數量       
        "statistic_topic_annotation_count": KALS_context.user.get_topic_annotation_count(),        
        // topic我知道
        "statistic_topic_knowed_count": KALS_context.user.get_topic_annotation_count(_annotation_type_knowed),
        // topic新知識
        "statistic_topic_knowledge_count": KALS_context.user.get_topic_annotation_count(_annotation_type_knowledge),
        // topic我不懂
        "statistic_topic_dont_know_count": KALS_context.user.get_topic_annotation_count(_annotation_type_dont_know),
        // topic很奇怪
        "statistic_topic_strange_count": KALS_context.user.get_topic_annotation_count(_annotation_type_strange),
        // topic補充舉例
        "statistic_topic_predefined_count":KALS_context.user.get_topic_annotation_count(_annotation_type_predefined),       
        // topic我想說
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
        "statistic_liked_users_count": KALS_context.user.get_liked_users_count()

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
 
	var _qualified_config = {

         "stamps_level_0": this._stamps_config[0].name,
         "stamps_level_1": this._stamps_config[1].name,
         "stamps_level_2": this._stamps_config[2].name,
         "stamps_level_3": this._stamps_config[3].name,
         "stamps_level_4": this._stamps_config[4].name
    };
    
    //var _qualified_container = this.find(".stamp-qualified")
    //        .empty();

	//TABLE
    var _qualified_name = this.find(".qualified-name").empty();
    var _qualified_img = this.find(".qualified-img").empty();
	
    var _i = 0;
    var _k = 0;
    for (var _stamp_title in _qualified_config) {   
        // 取得is_qualified的值來讓後面的迴圈判斷要不要顯示圖片(取得獎章) 
        if( this._stamps_config[_i].is_qualified === true){
           //KALS_util.notify("現在是幾呢？"+ _i);
            var _stamp_title_lang = this.get_view_lang_line(_stamp_title);
            var _title = $("<td width=60px align=center></td>").html(_stamp_title_lang)
                    .appendTo(_qualified_name);					
            _i++;
        }
		if( this._stamps_config[_k].is_qualified === true ){
			//var _stamp_picture = $();來加入圖片吧！
           //var _stamp_picture = $("<td background=/kals/images/stamp_imgs/stamp_"+ _k +".png></td>").html(_qualified_message)
           var _qualified_image = "<img src=/kals/images/stamp_imgs/stamp_"+ _k +".png></>";
		   var _stamp_picture = $("<td width=60px align=center></td>").html(_qualified_image)
		   .appendTo(_qualified_img)			
			_k++;
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
            var _title = $("<dt style=clear:both></dt>").html(_stamp_title_lang)
                    .appendTo(_qualification_container);
            var _qualification_message = _qualification_config[_stamp_title];
            var _stamp_picture = $("<img src=/kals/images/stamp_imgs/stamp_"+ _i +".png style=float:left;></>").html(_qualification_message)
                        .appendTo(_qualification_container);			
            var _message = $("<dd style=margin-left:75px;></dd>").html(_qualification_message)
                    .appendTo(_qualification_container);

            _i++;
        }
    }
        
    return this;
};

/**
 * 設定顯示階級名單
 * @return array
 */
KALS_stamp.prototype.get_stamp_list = function() { 
    var _stamp_data = this._init_config();
    // 要改成每個階級都要顯示！
    var _this = this;
    
    var _list_container = this.find('.stamps-list').empty();
    this.request_post("get_stamps_list", _stamp_data, function( _stamp_result){
    //$.test_msg("get_stamps_list", _stamp_result);
    //加入class在stamps-list的區塊畫出user
        var _i = _stamp_result.length - 1;
        //$.test_msg("length = "+ _i);
        for ( var _k in _stamp_result){
            //_list_container.empty();
            $.test_msg("stamp_name = "+ _stamp_result[_k].stamp_name );
            $.test_msg("user_name = "+ _stamp_result[_k].user_name );
            //名稱
            var _stamp_title = _stamp_result[_k].stamp_name ;
            var _stamp_title_lang = _this.get_view_lang_line(_stamp_title);

            //縮圖與名單
            var _name_arr = _stamp_result[_k].user_name;  
            var _image = KALS_context.get_base_url("/images/stamp_imgs/stamp_"+ _i +".png", true);
            //for( var _index=0; _index<_stamp_result.length; _index++){
            if( _name_arr !== null || _name_arr !== "undefined" ){
                var _title = $("<h4></h4>").html(_stamp_title_lang).appendTo(_list_container);                  
                var _stamp_user_list = $('<ul class="stamps-list king-list-area list-name" style="border-bottom: 3px solid gray; padding-left: 80px; background-image: url('+_image+'); min-height: 100px; background-repeat: no-repeat">'
                        //+ _name_arr 
                        +'</ul>')
                        .appendTo(_list_container);    
                for (var _index in _name_arr){
                    
                    var _name_span = $('<li style=" width: 100px; cursor: pointer"/>').html(_name_arr[_index]);
                    _name_span.appendTo(_stamp_user_list);
                    
                    _name_span.click(function() {
                        //搜尋
                        KALS_context.search.search({
                            range: "author",
                            keyword: $(this).html()
                        }, false);
                    });
                    
                    _name_span.addClass("list-span");
                    
                    _name_span.css("float","left");
                    
                    if (_index % 3 === 0) {
                        _name_span.css("clear", "both");
                    } 
                }     
            }
            _i--;
        }
        
     });
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
            //KALS_util.notify("_KEY =" + _key); //KEY有哪些
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
           // KALS_util.notify("_i.is_qualified為" + _i + this._stamps_config[_i].is_qualified);
            if (_stamp_qualified === false) {
                break;
            }
        }   //for (var _key in _qualifier) {
        
        // 獲得獎章的設定
        this._stamps_config[_i].is_qualified = _stamp_qualified;

       // KALS_util.notify("現在到底有什麼~"+ this._stamps_config[_i].name + this._stamps_config[_i].is_qualified);
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

KALS_stamp.prototype._stamp_level = null;
KALS_stamp.prototype._stamp_level_modified = false;
KALS_stamp.prototype._stamp_level_up = true;

KALS_stamp.prototype.qualify = function() {
    
    this._stamp_level_modified = false;
    this._stamp_level_up = true;
    
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
          // 確認有晉升再提示訊息，提示訊息為圖+文 ->由獲得獎章來判斷 
          //if(this._stamps_config[_i].is_qualified === false){};
          //KALS_util.notify("現在階段為"+ _stamps_data[_i].name); 
          /*
          if(this._stamps_config[_i].is_notify === false) {
                var _img = KALS_context.get_base_url("/images/stamp_imgs/stamp_"+ _i +".png", true);
                var _name = this._stamps_config[_i].name;
                var _name_lang = this.get_view_lang_line(_name);
                //_this.get_view_lang_line(_stamp_title);
                KALS_util.notify("恭喜你成為"+_name_lang+ _img);
                $.test_msg("_stamps_config.is_notify",_i+ this._stamps_config[_i].is_notify);
                this._stamps_config[_i].is_notify = true;
                $.test_msg("_stamps_config.is_notify_2",_i + this._stamps_config[_i].is_notify);
                //降級的情況
           }
           */
          
           if (this._stamps_config[_i].is_qualified === true){
               if (this._stamp_level === null) {
                   this._stamp_level = _i;
                   this._stamp_level_modified = true;
                   this._stamp_level_up = true;
               }
               else if (_i > this._stamp_level) {
                   this._stamp_level = _i;
                   this._stamp_level_modified = true;
                   this._stamp_level_up = true;
               }
           }
           else if (this._stamp_level === _i && this._stamp_level > 0) {
               this._stamp_level--;
               this._stamp_level_modified = true;
               this._stamp_level_up = false;
           }
       }
       
        // KALS_context.policy.set_readable(true);
    }//for( var _i in _stamps_data){
    
    if (this._stamp_level_modified === true) {
        var _msg;
        if (this._stamp_level_up === true) {
           //_msg = this._stamps_config[this._stamp_level].level_up_msg;
        }
        else {
            //_msg = this._stamps_config[this._stamp_level].level_down_msg;
        }
        
        KALS_util.notify(_msg);
    }
    
    return this;
};

/* End of file KALS_stamp */
/* Location: ./system/application/views/web_apps/extension/KALS_stamp/KALS_stamp.js */