/**
 * URL_hash_dispatcher
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/21 下午 02:28:30
 * @extends {Event_dispatcher}
 */
function URL_hash_dispatcher(){
   
   Event_dispatcher.call(this);
   
   this._hash_data = null;
   //this._setup_onhashchange_backward(); 
}

URL_hash_dispatcher.prototype = new Event_dispatcher(); 

/**
 * @memberOf {URL_hash_dispatcher}
 * @type {Name_value_pair}
 */
URL_hash_dispatcher.prototype._hash_data = null;

/**
 * 取得hash字串
 *
 * @memberOf {URL_hash_dispatcher}
 * @type {String} Description about return value.
 */
URL_hash_dispatcher.prototype._get_location_hash = function () {
    var _hash = '';
    if (typeof(location.hash) !== 'undefined') {
        _hash = location.hash;
        if (_hash.substring(0, 1) === '#') {
            _hash = _hash.substring(1, _hash.length);
        }
    }
    else {
        //2010.8 因為大部分瀏覽器都支援location.hash，所以下面這種情況應該是不會發生
        var _url = location.href;
    
        var _hash_pos = _url.indexOf('#');
        var _query_pos = _url.indexOf('?');
        
        var _start = 0;
        var _end = _url.length;
        if (_hash_pos === -1) {
            //情況1：沒有hash
            return '';
        }
        else if (_query_pos === -1) {
            //情況2：有hash但沒有query
            _start = _hash_pos + 1;
        }
        else if (_hash_pos < _query_pos) {
            //情況3：hash比query先寫
            _start = _hash_pos + 1;
            _end = _query_pos;
        }
        else {
            //情況4：query比hash
            _start = _hash_pos + 1;
        }
        
        _hash = _url.substring(_start, _end);    
    }
    
    return _hash;
};

/**
 * 設定hash
 * @param {String} _hash 
 */
URL_hash_dispatcher.prototype._set_location_hash = function(_hash) {
    
    this._set_lock = true;
    
    _hash = $.trim(_hash);
    _hash = '#' + _hash;
    
    //var _pos = this._save_scroll_position();
    $.save_scroll_position();
    
    if (typeof(location.hash) !== 'undefined') {   
        //$.test_msg('設定location hash', this._set_lcok);
        //window.location.hash = _hash;
        //$.test_msg("set hast: " + "location.hash", _hash);
        //alert("要上囉", _hash);
        location.hash = _hash;
        //alert("完成", _hash);
    }
    else if (typeof(document.location.hash) !== 'undefined') {   
        //$.test_msg("set hast: " + "docuemnt.location.hash", _hash);
        document.location.hash = _hash;
    }
    else if (typeof(window.location.hash) !== 'undefined') {   
        //$.test_msg("set hast: " + "window.location.hash", _hash);
        window.location.hash = _hash;
    }
    else {
        //$.test_msg("set hast:" + "window.location.href", _hash);
        
        
        //2010.8 因為大部分瀏覽器都支援location.hash，所以下面這種情況應該是不會發生
        var _url = location.href;
        
        var _hash_pos = _url.indexOf('#');
        
        if (_hash_pos !== -1) {
            var _start = _hash_pos;
            var _end = _url.length;
            
            var _query_pos = _url.indexOf('?');
            if (_query_pos !== -1
                && (_query_pos > _hash_pos)) {
                _end = _query_pos;
            }
            
            var _head = _url.substring(0, _start);
            var _foot = '';
            if (_url.length !== _end) {
                _foot = _url.substring(_end, _url.length);
            }
            
            _url = _head + _foot;
        }
        
        window.location.href = _url + _hash;
        //document.location.hash = _url + _hash;
    }
    
    //this._restore_scroll_position(_pos);
    $.load_scroll_position();
    
    return this;
};

//URL_hash_dispatcher.prototype._last_pos = null;
//
///**
// * 保存捲軸位置
// * 
// * @returns {JSON} = {
// *       x: window.scrollX,
// *       y: window.scrollY
// *   };
// * @deprecated 20140626 交給$.save_scroll_position去處理吧
// */
//URL_hash_dispatcher.prototype._save_scroll_position = function () {
//    
//    /*
//    var _pos = {
//        x: window.scrollX,
//        y: window.scrollY
//    };
//    */
//    //if (this._last_pos !== null) {
//    //    return this._last_pos;
//    //}
//   
//    var _pos = $.get_current_scroll_position();
//    if (_pos.y !== 0) {
//        this._last_pos = _pos;
//    }
//    //$.test_msg("儲存:現在的捲軸位置", _pos);    
//    //alert(["儲存:現在的捲軸位置", _pos]);
//    return _pos;
//};

/**
 * 讓網頁開始捲動
 * 
 * @deprecated 20140626 交給$.load_scroll_position去處理吧
 * @param {Object} _pos
 */
//URL_hash_dispatcher.prototype._restore_scroll_position = function (_pos) {
//
//    //$.scroll_to(_pos, 0);
//    var _this = this;
//    
//    if ($("body").scrollTop() === 0
//            && _this._last_pos !== null) {
//        //alert("準備回滾");
//        window.scrollTo(_this._last_pos.scrollLeft, _this._last_pos.scrollTop);
//    }
//    
//    if (this._last_pos !== null && this._restore_pos_lock === false) {
//        this._restore_pos_lock = true;
//        //$.test_msg("準備恢復：設定了現在的捲軸位置", _pos);
//        //alert(["準備恢復：設定了現在的捲軸位置", _pos]);
//        //$.test_msg("最後的捲軸位置", this._last_pos);
//        //alert(["最後的捲軸位置", this._last_pos]);
//        //$.scroll_to(this._last_pos, 0);
//        
//        if ($("body").scrollTop() === 0
//                    && _this._last_pos !== null) {
//            //window.scrollTo(_this._last_pos.scrollLeft, _this._last_pos.scrollTop);
//            //$.scroll_to(_this._last_pos, 0);
//        }
//        
//        setTimeout(function () {
////            //$.scroll_to(_this._last_pos);
////            $.test_msg("現在的body", [$("body").scrollTop(), _this._last_pos.scrollTop]);
//            if ($("body").scrollTop() === 0
//                    && _this._last_pos !== null) {
//                alert("怎麼會這樣？");
//                window.scrollTo(_this._last_pos.scrollLeft, _this._last_pos.scrollTop);
////                //$.scroll_to(_this._last_pos, 0);
////                //window.scrollTo()
//            }
////            else if (_this._last_pos !== null) {
////                //$.scroll_to(_this._last_pos, 0);
////                //window.scrollTo(_this._last_pos.scrollLeft, _this._last_pos.scrollTop);
////            }
////            $.test_msg("恢復：設定了現在的捲軸位置", _this._last_pos);
////            _this._last_pos = null;
////            _this._restore_pos_lock = false;
//            //_this._last_pos = null;
//            _this._restore_pos_lock = false;
//            
//            setTimeout(function () {
//                //alert("100秒之後的狀態");
//            }, 100);
//            
//        }, 0);
//    }
//    
//    return this;
//};
//
//URL_hash_dispatcher.prototype._restore_pos_lock = false;

/**
 * 設定標題
 * @param {String} _hash
 * @returns {URL_hash_dispatcher}
 */
URL_hash_dispatcher.prototype._set_document_title = function (_hash) {
    
    this._set_lock = true;
    //設定標題修改
    var _title = document.title;
    var _hash_pos = _title.lastIndexOf('#');
    
    if (_hash_pos > -1) {
        _title = _title.substring(0, _hash_pos);
    }
    
    if (_hash !== '') {
		_hash = ' #' + _hash;
	}
    
    _title = _title + _hash;
    document.title = _title;
    
    return this;
};

/**
 * @type {Name_value_pair}
 * @param {boolean} _force = false：是否要強制覆蓋原本的設定。如果已經從this._get_location_hash()取得過資料，則此處不會再設定。
 */
URL_hash_dispatcher.prototype._setup_hash_data = function (_force) {
    if ($.is_null(_force)) {
        _force = false;
    }
    
    if (this._hash_data === null || _force) {
        var _hash = this._get_location_hash();
        //$.test_msg('setup', _hash);
        this._hash_data = new Name_value_pair(_hash);
    }
    return this._hash_data;
};

/**
 * 取得hash的欄位資料
 * @param {string} _key
 * @param {Object} _default = null 預設值
 */
URL_hash_dispatcher.prototype.get_field = function (_key, _default) {
    
    var _hash_data = this._setup_hash_data();
    return _hash_data.get_field(_key, _default);
};

/**
 * 確認hash的欄位資料
 * @param {string} _key
 */
URL_hash_dispatcher.prototype.has_field = function (_key) {
    
    var _hash_data = this._setup_hash_data();
    return _hash_data.has_field(_key);
};


/**
 * 取得所有hash的資料
 * @type {Name_value_pair}
 */
URL_hash_dispatcher.prototype.get_hash_data = function () {
    return this._setup_hash_data();
};

/**
 * 設定指定欄位的資料到hash中
 * @param {string} _key
 * @param {Object} _value
 */
URL_hash_dispatcher.prototype.set_field = function (_key, _value) {
    
    try {
        //嘗試將值化為字串，因為hash只能存入字串而已
        _value = _value + '';
    }
    catch (e) { }
    
    var _hash_data = this._setup_hash_data();
    _hash_data.set_field(_key, _value);
    this._hash_data = _hash_data;
    var _hash = _hash_data.serialize();
    
    this._set_location_hash(_hash);
    this._set_document_title(_hash);
    
    return this;        
};

/**
 * 刪除指定的欄位，並設定到hash中
 * @param {string} _key
 */
URL_hash_dispatcher.prototype.delete_field = function (_key) {
    
	
    var _hash_data = this._setup_hash_data();
    _hash_data.delete_field(_key);
    this._hash_data = _hash_data;
    
    var _hash = _hash_data.serialize();
    
    this._set_location_hash(_hash);
        
    this._set_document_title(_hash);
    
    return this;     
};

/**
 * 設定this._hash_data當中
 * @deprecated 不建議使用此方法
 * @param {Object} _object_data
 */
URL_hash_dispatcher.prototype.set_hash_data = function (_object_data) {
    
    var _hash_data = this._setup_hash_data();
    _hash_data._data = _object_data;
    this._hash_data = _hash_data;
    var _hash = _hash_data.serialize();
    this._set_location_hash(_hash);
    
    //通知有所改變
    this.notify_listeners(_hash_data.get_data());
    return this;
};

/**
 * 重置hash data
 */
URL_hash_dispatcher.prototype.clear_hash = function () {
    
    this._hash_data = null;
    this._set_location_hash('');
    this.notify_listeners({});
    return this;
};

/**
 * 是否已經設定了監聽事件？在this._setup_onhashchange()之後就會變成true了
 * @type {boolean}
 */
URL_hash_dispatcher.prototype._had_setup_onhashchange = false;
URL_hash_dispatcher.prototype._set_lock = false;

/**
 * 設定hash改變的監聽事件，並限定是非URL_hash_dispatcher設定的hash(通常都是「上一頁」的功能)。這是要搭配「jquery.ba-hashchange.js」才能運作的功能。
 * 
 */
URL_hash_dispatcher.prototype._setup_onhashchange_backward = function () {
    if (this._had_setup_onhashchange === false) {
        var _this = this;
        /**
         * 由於jquery.ba-hashchange.js 不支援jQuery 1.9以上，所以不使用這個套件
         * @version 20140902 Pulipuli Chen
         */
        //$(window).hashchange(function () {
        $(window).on("hashchange", function () {
            if (_this._set_lock === false) {
                //$.test_msg('backward setup 之前', _this._hash_data.get_data());
                
                //只有在沒有特別設定this._set_lock的時候，才會執行這段
                var _hash_data = _this._setup_hash_data(true);
                
                
                //$.test_msg('backward', _hash_data.get_data());
                
                //加上一個上一頁的備註
                //_hash_data.set_field('backward', true);
                var _data = _hash_data.get_data();
                var _backward_field = 'backward';
                _data[_backward_field] = true;
                //$.test_msg('hashchange' + _this._set_lock, _data);
                _this.notify_listeners(_data);   
                delete _data[_backward_field]; 
            }
            else {
                setTimeout(function () {
                    _this._set_lock = false;    
                }, 2000);
            }
        });
        this._had_setup_onhashchange = true;
    }
    return this;
};

/**
 * 開啟之前檢查網頁的hash
 * @param {function} _callback
 */
URL_hash_dispatcher.prototype.check_hash = function (_callback) {
    
    //$.test_msg('URL_hash_dispatcher.check_hash()', [window.location.hash]);
    
    //$.test_msg('has check_hash() end', this.has_field('select'));
    
	//$.test_msg('URL_hash_dispatcher', 'pass1');
	
    //優先度：view recommend = select
    if (this.has_field('view') === true) {
        this._action_view();
    }
    else if (this.has_field("mobile") === true) {
        this._action_mobile();
    }
    else {
        //$.test_msg('URL_hash_dispatcher', 'pass3');

        if (this.has_field('recommend') === true) {
            this._action_recommend()
        }
        if (this.has_field('select') === true) {
            this._action_select();
        }  
    }
    
    //$.test_msg('has check_hash() end', this.has_field('recommend'));
    
    this.delete_field('backward');
    this.delete_field('model');
	
	//$.test_msg('URL_hash_dispatcher', 'pass');
    
    $.trigger_callback(_callback);
    return this;
};

/**
 * 啟動view的動作
 * @returns {URL_hash_dispatcher.prototype}
 */
URL_hash_dispatcher.prototype._action_view = function () {
    
    if ($.is_mobile_mode()) {
        return this;
    }
    
    //$.test_msg('URL_hash_dispatcher', 'pass2');
		
    var _id = this.get_field('view');
    KALS_context.ready(function () {
        KALS_text.tool.view.load_view(_id);
    });
    
    return this;
};

/**
 * 啟動mobile相關的動作
 * @returns {URL_hash_dispatcher}
 */
URL_hash_dispatcher.prototype._action_mobile = function () {
    
    var _url; 
    
    if (this.has_field("topic_id") === false) {
        //KALS_context.redirect("mobile_apps/annotation_topics", true);
        _url = "mobile_apps/annotation_topics";
    }
    else {
        //KALS_context.redirect("mobile_apps/annotation_thread/topic_id/" + this.get_field("topic_id") + "#annotation_" + this.get_field("annotation_id"), true);
        _url = "mobile_apps/annotation_thread/topic_id/" 
                + this.get_field("topic_id")
                + "#annotation_" 
                + this.get_field("annotation_id");
    }
    
    KALS_context.redirect(_url, true);
    
    return this;
};

/**
 * 啟動recommend的動作
 * @returns {URL_hash_dispatcher.prototype}
 */
URL_hash_dispatcher.prototype._action_recommend = function () {
    
    if ($.is_mobile_mode()) {
        return this;
    }
    
    //$.test_msg('URL_hash_dispatcher', 'pass4');
    var _id = this.get_field('recommend');
    //$.test_msg('has check_hash() recommend', _id);
    KALS_text.tool.recommend.load_recommend(_id);
    
    return this;
};

/**
 * 啟動select的動作
 * @returns {URL_hash_dispatcher.prototype}
 */
URL_hash_dispatcher.prototype._action_select = function () {
    
    if ($.is_mobile_mode()) {
        return this;
    }
    
    //$.test_msg('URL_hash_dispatcher', 'pass5');
    var _scope_text = this.get_field('select');
    //$.test_msg('has check_hash()', _scope_text);

    //KALS_context.init_profile.add_listener(function () {
    KALS_context.ready(function() {
        KALS_text.selection.select.load_select(_scope_text);  
    });
    /*
    KALS_context.init_profile.add_listener(function () {
        //KALS_context.auth.add_once_listener(function () {
            //setTimeout(function () {
                $.test_msg("gogo select");
                KALS_text.selection.select.load_select(_scope_text);  
            ///}, 5000);
        //});
    });
    */
    //setTimeout(function () {
    //	KALS_text.selection.select.load_select(_scope_text);
    //}, 3000); 
    
    return this;
};

/* End of file URL_hash_dispatcher */
/* Location: ./system/application/views/web_apps/URL_hash_dispatcher.js */