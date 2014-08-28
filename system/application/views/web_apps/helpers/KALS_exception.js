/**
 * KALS_exception
 * 丟出例外錯誤
 *
 * @package		KALS
 * @category		Webpage Application Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/8/5 下午 07:24:29
 * @param {Object|string} _class 物件本身
 * @param {string|null} _message 錯誤訊息
 * @type {string} 例外錯誤敘述
 */
function KALS_exception(_class, _message) {
    
    if ($.is_object(_class) 
        && (typeof(_class.heading) !== 'undefined' 
        || typeof(_class.message) !== 'undefined'
        || typeof(_class.request_uri) !== 'undefined')) {
        var _server_error = _class;
        if (typeof(_server_error.heading) !== 'undefined') {
            this.heading = _server_error.heading;
        }
        if (typeof(_server_error.message) !== 'undefined') {
            this.message = _server_error.message;
        }
        if (typeof(_server_error.request_uri) !== 'undefined') {
            this.request_uri = _server_error.request_uri;
        }
    }
    else if ($.is_class(_class, "KALS_language_param")) {
        var _lang = _class;
        this.message = KALS_context.lang.line(_lang);
    }
    else {
        if ($.is_null(_message) && $.is_string(_class)) {
            _message = _class;
            _class = null;
        }
        
		var _base_url = KALS_context.get_base_url();
		if ($.is_string(_class) && _class.substr(0, _base_url.length) === _base_url) {
			_message = KALS_context.lang.line(_message);
			
			var _url = _class;
			//_message = _message + '\n <br /><a href="'+_url+'" target="_blank">'+_url+'</a>';
			this.request_uri = _url;
		}
		else {
			var _class_name = false;
            if ($.isset(_class)) {
                _class_name = $.get_class(_class);
            }
                
            if (false !== _class_name) {
                _message = '[' + _class_name + '] ' + _message;
            }
			
	        //_message = new KALS_language_param(_message, _message);
	        _message = KALS_context.lang.line(_message);
		}   
        
        this.message = _message;
		
        //return _message;   
    }
}

/**
 * 錯誤的標頭
 */
KALS_exception.prototype.heading = null;

/**
 * 錯誤的訊息
 */
KALS_exception.prototype.message = null;

/**
 * 錯誤的請求網址。如果沒有此項，則不會顯示。
 */
KALS_exception.prototype.request_uri = null;

/* End of file KALS_exception */
/* Location: ./system/application/views/web_apps/KALS_exception.js */