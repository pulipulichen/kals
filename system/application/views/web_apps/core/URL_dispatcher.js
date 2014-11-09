/**
 * URL_dispatcher
 *
 * 分擔KALS_context中關於網址部分的工作
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2014/5/19 下午 03:36:17
 * @extends {Multi_event_dispatcher}
 */
function URL_dispatcher(){
   
   Event_dispatcher.call(this);
   
    //設定基本網址
    if (typeof(KALS_loader) !== 'undefined') {
        this.base_url = KALS_loader.get_base_url();
    }
    else {
        // TODO 2010.8 KALS_context.setup_base_url: 只能在測試時使用
        this.setup_base_url();
    }
    
    if (this.base_url === null || this.base_url === '') {
        this.base_url = 'http://demo-kals.lias.nccu.edu.tw/kals/web_apps/';
    }
}

URL_dispatcher.prototype = new Multi_event_dispatcher(); 


/**
 * @example http://192.168.11.2/kals/web_apps/
 * @example /kals/web_apps/
 * @type {string}
 */
URL_dispatcher.prototype.base_url = null;

/**
 * 測試時使用限定
 * 偵測基本網址的用法
 * 
 * @type {string} base_url
 */
URL_dispatcher.prototype.setup_base_url = function () {
    if (this.base_url !== null) {
        return this;
    }
    
    var _scripts = $('script');
    
    //$.test_msg('KALS_context.setup_base_url()', _scripts.length);
    
    var _needle = '/web_apps/';
    for (var _i in _scripts) {
        var _src = _scripts.eq(_i).attr('src');
        if (typeof(_src) !== 'string') {
			continue;
		}
        
        var _pos = _src.indexOf(_needle); 
        if (_pos > 0) {
            this.base_url = _src.substring(0, _pos + _needle.length);
            
            //$.test_msg('KALS_context.setup_base_url()', this.base_url);
            
            return this.base_url;
        }
    }
    return null;
};

/**
 * 供其他物件取用基礎網址
 * @param {string|array} _file
 * @param {Boolean} _from_root = false 是否從根目錄開始(/kals)，而非從/kals/web_apps開始
 * @type {string}
 */
URL_dispatcher.prototype.get_base_url = function (_file, _from_root) {
    
    if (_from_root === undefined) {
        _from_root = false;
    }
    
    if ($.is_null(_file)) {
        _file = '';
    }
    else if ($.is_array(_file)) {
        var _temp = '';
        for (var _i in _file) {
            var _f = _file[_i];
            if ($.starts_with(_f, '/')) {
                _f = _f.substr(1, _f.length);
            }
            if (_i < _file.length - 1) {
                $.appends_with(_f, '/');
            }
            
            _temp = _temp + _f;
        }
        _file = _temp;
    }
    
    if (this.base_url === null) {
        return _file;
    }
    
    if ($.is_string(_file) && $.starts_with(_file, '/')) {
        _file = _file.substring(1, _file.length);
    }
    
    if ($.ends_with(this.base_url, '/') === false) {
        this.base_url = this.base_url + '/';
    }
    
    var _url;
    
    // 如果是從根目錄開始的話
    if (_from_root === true) {
        var _needle = "web_apps/";
        var _root_path = this.base_url.substr(0, (this.base_url.length - _needle.length));
        _url = _root_path + _file;
    }
    else {
        _url = this.base_url + _file;
    }
    
    //$.test_msg('KALS_context.get_base_url()', [_url, this.base_url, _file]); 
    
    return _url;
};

/**
 * 回傳圖片網址
 * @param {string} _img 圖片的檔案名稱
 * @type {string} 圖片的完整網址
 */
URL_dispatcher.prototype.get_image_url = function (_img) {
    
    if ($.is_null(_img)) {
        _img = '';
    }
    
    if ($.is_string(_img) && $.starts_with(_img, '/')) {
        _img = _img.substring(1, _img.length);
    }
    
    if (this.base_url === null) {
        return _img;
    }
        
    var _img_url = this.get_base_url();
    var _pos = _img_url.lastIndexOf('/web_apps');
    if (_pos === -1) {
        return _img;
    }
    
    _img_url = _img_url.substring(0, _pos + 1);
    _img_url = _img_url + 'images/' + _img;
    
    if (_img === '') {
        return _img_url;
    }
    else {
        return $('<img src="' + _img_url + '" border="0" />');
    }
};

/**
 * 回傳libraries網址
 * @param {string} _file 檔案名稱
 * @type {string} 檔案的完整網址
 */
URL_dispatcher.prototype.get_library_url = function (_file) {
    
    var _img = _file;
    if ($.is_null(_img)) {
        _img = '';
    }
    
    if ($.is_string(_img) && $.starts_with(_img, '/')) {
        _img = _img.substring(1, _img.length);
    }
    
    if (this.base_url === null) {
        return _img;
    }
        
    var _img_url = this.get_base_url();
    var _pos = _img_url.lastIndexOf('/web_apps');
    if (_pos === -1) {
        return _img;
    }
    
    _img_url = _img_url.substring(0, _pos + 1);
    _img_url = _img_url + 'libraries/' + _img;
    
    return _img_url;
};

/**
 * 重新引導網頁到其他地方
 * @param {String} _url
 * @param {Boolean} _from_root
 * @returns {URL_dispatcher}
 */
URL_dispatcher.prototype.redirect = function (_url, _from_root) {
    _url = this.get_base_url(_url, _from_root);
    
    location.href = _url;
    return this;
};


/**
 * 過濾${base_url}
 * @author Pulipuli Chen 20141109
 * @param {string} _url 網址
 * @type {string} 完整網址
 */
URL_dispatcher.prototype.filter_base_url = function (_url) {
    //return this.url.get_image_url(_img);
    var _base_url = this.get_base_url("", true);
    
    _url = $.str_replace("${base_url}/", _base_url, _url);
    
    return _url;
};

/* End of file URL_dispatcher */
/* Location: ./system/application/views/web_apps/URL_dispatcher.js */