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
    if (typeof(location.hash) != 'undefined') {
        _hash = location.hash;
        if (_hash.substring(0, 1) == '#') {
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
        if (_hash_pos == -1) {
            //情況1：沒有hash
            return '';
        }
        else if (_query_pos == -1) {
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
    
    var _pos = this._save_scroll_position();
    
    if (typeof(location.hash) != 'undefined') {   
        //$.test_msg('設定location hash', this._set_lcok);
        window.location.hash = _hash;
    }
    else {
        //2010.8 因為大部分瀏覽器都支援location.hash，所以下面這種情況應該是不會發生
        var _url = location.href;
        
        var _hash_pos = _url.indexOf('#');
        
        if (_hash_pos != -1) {
            var _start = _hash_pos;
            var _end = _url.length;
            
            var _query_pos = _url.indexOf('?');
            if (_query_pos != -1
                && (_query_pos > _hash_pos)) {
                _end = _query_pos;
            }
            
            var _head = _url.substring(0, _start);
            var _foot = '';
            if (_url.length != _end) {
				_foot = _url.substring(_end, _url.length);
			}
            
            _url = _head + _foot;
        }
        
        window.location.href = _url + _hash;
    }
    
    this._restore_scroll_position(_pos);
    
    return this;
};

URL_hash_dispatcher.prototype._save_scroll_position = function () {
    
    var _pos = {
        x: window.scrollX,
        y: window.scrollY
    };
    return _pos;
};

/**
 * 讓網頁開始捲動
 * @deprecated 20131115 不使用了
 * @param {Object} _pos
 */
URL_hash_dispatcher.prototype._restore_scroll_position = function (_pos) {
    
	window.scrollTo(_pos.x, _pos.y);
	
};

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
        $(window).hashchange(function () {
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
		//$.test_msg('URL_hash_dispatcher', 'pass2');
		
        var _id = this.get_field('view');
        KALS_context.init_profile.add_listener(function () {
            KALS_text.tool.view.load_view(_id);
        });
        
    }
    else {
		//$.test_msg('URL_hash_dispatcher', 'pass3');
		
        if (this.has_field('recommend') === true) {
			//$.test_msg('URL_hash_dispatcher', 'pass4');
            _id = this.get_field('recommend');
            //$.test_msg('has check_hash() recommend', _id);
            KALS_text.tool.recommend.load_recommend(_id);
        }
        if (this.has_field('select') === true) {
            //$.test_msg('URL_hash_dispatcher', 'pass5');
            var _scope_text = this.get_field('select');
            //$.test_msg('has check_hash()', _scope_text);
            
			KALS_context.init_profile.add_listener(function () {
		        KALS_text.selection.select.load_select(_scope_text);  
		    });
			//setTimeout(function () {
			//	KALS_text.selection.select.load_select(_scope_text);
			//}, 3000); 
        }  
    }
    
    //$.test_msg('has check_hash() end', this.has_field('recommend'));
    
    this.delete_field('backward');
    this.delete_field('model');
	
	//$.test_msg('URL_hash_dispatcher', 'pass');
    
    $.trigger_callback(_callback);
    return this;
};

/* End of file URL_hash_dispatcher */
/* Location: ./system/application/views/web_apps/URL_hash_dispatcher.js */