/**
 * jquery.extends
 *
 * @package		KALS
 * @category		JavaScript Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/22 下午 09:25:20
 * @requires jQuery
 * @memberOf {jQUery}
 * @alias $
 */

// Deny defined again.
if (typeof($jquery_extends) == 'undefined') {

/**
 * 顯示測試訊息
 * @version 20130222 Pulipuli Chen 把錯誤訊息改成console.log()輸出
 * @param {string} _title
 * @param {Object} _test
 */
jQuery.test_msg = function (_title, _test)
{
    if (this.isset(_title) && this.is_null(_test)) {
        _test = _title;
        _title = null;
    }
    else if (this.is_null(_title) && this.is_null(_test)) {
        _test = '---------------';
        return;
    }
    
    if (this.is_object(_test)) {
        _test = '[Object: '+this.json_encode(_test)+']';
    }

	if (this.isset(_title))
		console.log('[KALS]'+'['+_title+'] '+_test);
	else
		console.log('[KALS] '+_test);
	
	return this;
};

// --------
// 字串處理
// --------

/**
 * 擷取字串
 * @param {string} _str 要被擷取的字串
 * @param {number} _start 起始位置。如果是負數，則從最後面開始算
 * @param {number} _length 長度
 */
jQuery.substr = function(_str, _start, _length)
{
    _str = _str + '';
    if (_start < 0)
        _start = _str.length + _start;
    if (this.isset(_length) === false) {
        return _str.substr(_start);
    }
    else {
        return _str.substr(_start, _length);
    }
};

/**
 * 
 * @memberOf {jQuery}
 * @method ends_with
 * @param {string} _str
 * @param {string} _suffix
 * @type {string}
 */
jQuery.ends_with = function(_str, _suffix)
{
    _str = _str + '';
    var _len = _suffix.length;
    var _start = 0 - _len;
    if (this.substr(_str, _start, _len) == _suffix)
        return true;
    else
        return false;
};

/**
 * 測試_str的開頭是否為_prefix
 * @memberOf {jQuery}
 * @method starts_with
 * @param {string} _str
 * @param {string} _prefix
 */
jQuery.starts_with = function(_str, _prefix)
{
    _str = _str + '';
    var _len = _prefix.length;
    var _start = 0;
    if (_str.substr(_start, _len) == _prefix)
        return true;
    else
        return false;
};

/**
 * 
 * @memberOf {jQuery}
 * @method appends_with
 * @param {string} _str
 * @param {string} _suffix
 * @type {string}
 */
jQuery.appends_with = function(_str, _suffix)
{
    if (this.ends_with(_str, _suffix) === false)
        return _str + _suffix;
    else
        return _str;
};

/**
 * 判斷字首是否是prefix，否則加上prefix
 *
 * @param _str
 * @param _prefix
 * @type boolean
 */
jQuery.prepends_with = function(_str, _prefix)
{
    if (this.starts_with(_str, _prefix) === false)
        return _str + _prefix;
    else
        return _str;
};

jQuery.str_replace = function (_search, _replace, _subject, _count) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // +   improved by: Simon Willison (http://simonwillison.net)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   bugfixed by: Anton Ongson
    // +      input by: Onno Marsman
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    tweaked by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   input by: Oleg Eremeev
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Oleg Eremeev
    // %          note 1: The count parameter must be passed as a string in order
    // %          note 1:  to find a global variable in which the result will be given
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'
    // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    // *     returns 2: 'hemmo, mars'

    var _i = 0, _j = 0, _temp = '', _repl = '', _sl = 0, _fl = 0,
            _f = [].concat(_search),
            _r = [].concat(_replace),
            _s = _subject,
            _ra = _r instanceof Array, _sa = _s instanceof Array;
    _s = [].concat(_s);
    if (_count) {
        this.window[_count] = 0;
    }

    for (_i=0, _sl=_s.length; _i < _sl; _i++) {
        if (_s[_i] === '') {
            continue;
        }
        for (_j=0, _fl=_f.length; _j < _fl; _j++) {
            _temp = _s[_i]+'';
            _repl = _ra ? (_r[_j] !== undefined ? _r[_j] : '') : _r[0];
            _s[_i] = (_temp).split(_f[_j]).join(_repl);
            if (_count && _s[_i] !== _temp) {
                this.window[_count] += (_temp.length-_s[_i].length)/_f[_j].length;}
        }
    }
    return _sa ? _s : _s[0];
};

// --------
// JSON與AJAX
// --------

jQuery.json_encode = function (_json)
{
    if (this.is_number(_json) || this.is_boolean(_json) || this.is_null(_json))
        return _json;
    else if(this.is_string(_json))
        return this.serialize_string(_json);
    else if (this.is_array(_json))
        return this.serialize_array(_json);
    else
        return this.serialize_json(_json);
};

/**
 * 將JSON轉換成字串
 * @memberOf {jQuery}
 * @method serialize_json
 * @param {Object} _json
 * @type {string}
 */
jQuery.serialize_json = function (_json)
{
    if (this.is_number(_json) || this.is_boolean(_json) || this.is_null(_json))
        return _json;
    else if(this.is_string(_json))
        return this.serialize_string(_json);
    else if (this.is_array(_json))
        return this.serialize_array(_json);

    var _output = '';

    for (var _key in _json) {
        var _attr = '"'+_key+'":';
        var _value = _json[_key];
        if (this.is_number(_value) || this.is_boolean(_value) || this.is_null(_value))
            _attr += _value;
        else if (this.is_string(_value))
            _attr += this.serialize_string(_value);
        else if (this.is_array(_value))
            _attr += this.serialize_array(_value);
        else if (this.is_object(_value))
        {
            if (typeof(_value.to_string) == 'function') {
                _attr += _value.to_string();
            }
            else
            {
                var _class_name = $.get_class(_value);
                if (_class_name == 'Object')
                    _attr += this.serialize_json(_value);
                else
                    _attr += '[Object: '+_class_name+']';
            }
        }

        _output = this.combine_comma(_output);
        _output += _attr;
    }

    _output = '{' + _output + '}';
    return _output;
};

jQuery.serialize_array = function (_array)
{
    if (this.is_number(_array) || this.is_boolean(_array) || this.is_null(_array))
        return _array;
    else if(this.is_string(_array))
        return this.serialize_string(_array);
    else if (this.is_object(_array))
        return this.serialize_json(_array);

    var _output = '';

    for (var _key in _array) {
        var _attr = "";
        var _value = _array[_key];
        if (this.is_number(_value) || this.is_boolean(_value) || this.is_null(_value))
            _attr += _value;
        else if (this.is_string(_value))
            _attr += this.serialize_string(_value);
        else if (this.is_array(_value))
            _attr += this.serialize_array(_value);
        else if (this.is_object(_value))
            _attr += this.serialize_json(_value);

        _output = this.combine_comma(_output);
        _output += _attr;
    }

    _output = '[' + _output + ']';
    return _output;
};

jQuery.serialize_string = function (_str)
{
    if (this.is_number(_str) || this.is_boolean(_str) || this.is_null(_str))
        return _str;
    else if (this.is_array(_str))
        return this.serialize_array(_str);
    else if (this.is_object(_str))
        return this.serialize_json(_str);

    _str = this.addslashes(_str);
    return '"'+_str+'"';
};

jQuery.addslashes = function (_str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: marrtins
    // +   improved by: Nate
    // +   improved by: Onno Marsman
    // +   input by: Denny Wardhana
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Oskar Larsson Högfeldt (http://oskar-lh.name/)
    // *     example 1: addslashes("kevin's birthday");
    // *     returns 1: 'kevin\'s birthday'

    return (_str+'').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
};

jQuery.combine_comma = function (_str)
{
    if (_str !== '')
        _str += ',';
    return _str;
};

// --------
// 驗證類
// --------

jQuery.get_class = function (_obj) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ates Goral (http://magnetiq.com)
    // +   improved by: David James
    // *     example 1: get_class(new (function MyClass() {}));
    // *     returns 1: "MyClass"
    // *     example 2: get_class({});
    // *     returns 2: "Object"
    // *     example 3: get_class([]);
    // *     returns 3: false
    // *     example 4: get_class(42);
    // *     returns 4: false
    // *     example 5: get_class(window);
    // *     returns 5: false
    // *     example 6: get_class(function MyFunction() {});
    // *     returns 6: false
    
    if ($.is_jquery(_obj))
        return 'jQuery';
    else if ($.is_array(_obj))
        return 'Array';
    
    var _class_name;
    if (_obj instanceof Object
        && !(_obj instanceof Array)
        && !(_obj instanceof Function)
        && _obj.constructor
        && _obj != this.window) {
        var _arr = _obj.constructor.toString().match(/function\s*(\w+)/);
        if (_arr && _arr.length == 2) {
            return _arr[1];
        }
        else
        {
            _class_name = _obj.constructor.toString();
            
            //$.test_msg('$.get_class()', _class_name);
    
            if (this.starts_with(_class_name, '[object '))
                _class_name = _class_name.substring(8, _class_name.length);
            else
                return false;
            
            if (this.ends_with(_class_name, ']'))
                _class_name = _class_name.substring(0, _class_name.length-1);
            return _class_name;
        }
    }
    
    try
    {
        var _constructor = _obj.constructor + '';
        
        if ($.starts_with(_constructor, '[object'))
        {
            //$.test_msg('get_class', [_constructor, typeof(_constructor)]);
            var _space_pos = _constructor.lastIndexOf(' ');
            _class_name = _constructor.substring(_space_pos + 1, _constructor.length -1);
            return _class_name;
        }
    }
    catch (e) {}
    

    return false;
};

jQuery.is_null = function (_obj)
{
    if (typeof(_obj) == 'undefined'
        || (typeof(_obj) == 'string' && _obj == 'null'))
        return true;
    else
        return (_obj === null);
};

jQuery.is_class = function(_obj, _class_name)
{
    if ($.is_null(_class_name))
        return false;
    
    try
    {
        return (typeof(_obj) == 'object' 
            && _obj != null 
            //&& (_obj instanceof _class_name));
            && $.get_class(_obj) == _class_name);
    }
    catch (e) {
        return false;
    }
};

jQuery.is_boolean = function(_obj)
{
    return (typeof(_obj) == 'boolean');
};

/**
 * 驗證是否為陣列
 *
 * @param _obj
 * @return 驗證結果
 * @type boolean
 */
jQuery.is_array = function(_obj)
{
    return (typeof(_obj) == 'object' && (_obj instanceof Array));
};

jQuery.filter_array = function (_obj)
{
    var _is_array = (typeof(_obj) == 'object' && (_obj instanceof Array));
    if (false == _is_array)
        return [_obj];
    else
        return _obj;
};

jQuery.is_string = function (_obj)
{
    return (typeof(_obj) == 'string');
};

jQuery.is_number = function (_obj)
{
    return (typeof(_obj) == 'number');
};

/**
 * 檢查物件是否屬於整數或是英字、半型標點符號。詳細的範圍請看下面的連結。
 * @see   Wikipedia - ASCII: http://zh.wikipedia.org/zh-tw/Ascii
 * @param {Object} _text
 */
jQuery.is_ascii = function (_text)
{
    if ($.is_number(_text))
        return true;
    else if ($.is_string(_text)) {
        
        for (var _i = 0; _i < _text.length; _i++)
        {
            _ascii_num = _text.charCodeAt(_i);
            
            //$.test_msg('$.is_ascii', [_ascii_num, _i, _text, _text.length]);
            
            if (_ascii_num > 32 && _ascii_num < 126)
            {
                //return true; 
            } 
            else 
            {
                return false;
                break; 
            }
        }
        return true;
    }
    else
        return false;
};

jQuery.is_object = function (_obj)
{
    return (typeof(_obj) == 'object' && !(_obj instanceof Array));
};

jQuery.is_function = function (_obj)
{
    return (typeof(_obj) == 'function');
};

/**
 * 驗證是否物件為jQuery物件
 * @param {Object} _obj
 */
jQuery.is_jquery = function (_obj)
{
    return (typeof(_obj) == 'object' && (_obj instanceof jQuery));
};

/**
 * 驗證是否物件_element為HTML物件
 * @param {Object} _element
 */
jQuery.is_html_element = function (_element)
{
    var _class_name = this.get_class(_element);
    
    //$.test_msg([_class_name, _element.constructor]);
    if (_class_name === false)
        return false;
    if (this.starts_with(_class_name, 'HTML')
        && (this.ends_with(_class_name, 'Element') || this.ends_with(_class_name, 'ElementConstructor')))
    // 2010.9.3 Android會把HTML元素判斷為「HTMLDivElementConstructor」之類的
    {
        return true;
    }   
    else
        return false;
};

/**
 * 檢測變數是否存在，如果是null，也作為不存在
 * @param {Object} _obj
 */
jQuery.isset = function (_obj)
{
    if (typeof(_obj) == "undefined"
        || this.is_null(_obj) === true)
        return false;
    else
        return true;
};

/**
 * 確認此路徑是否有物件可以使用
 * @memberOf {jQuery}
 * @method object_isset
 * @param {string} _object_path 要偵測的路徑
 * @type {boolean}
 */
jQuery.object_isset = function (_object_path)
{
    var _paths = _object_path.split('.');
    var _path_now = '';
    for (var _key in _paths) {
        if (_path_now !== '')
            _path_now = _path_now + '.';
        _path_now = _path_now + _paths[_key];
        
        var _test_path = _path_now;
        if (this.ends_with(_test_path, '()'))
            _test_path = _test_path.substr(0, _test_path.length - 2);
        
        var _result = eval('typeof('+_test_path+')');     
        if (_result == 'undefined')
            return false;
    }
    return true;
};

// --------
// URL類
// --------

jQuery.is_link = function(_url)
{
    if (this.starts_with(_url, 'http://')
        || this.starts_with(_url, 'https://')
        || this.starts_with(_url, 'ftp://'))
        return true;
    else
        return false;
};

jQuery.parse_url = function (_str, _component) {
    // http://kevin.vanzonneveld.net
    // +      original by: Steven Levithan (http://blog.stevenlevithan.com)
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // %          note: Based on http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    // %          note: blog post at http://blog.stevenlevithan.com/archives/parseuri
    // %          note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    // %          note: Does not replace invaild characters with '_' as in PHP, nor does it return false with
    // %          note: a seriously malformed URL.
    // %          note: Besides function name, is the same as parseUri besides the commented out portion
    // %          note: and the additional section following, as well as our allowing an extra slash after
    // %          note: the scheme/protocol (to allow file:/// as in PHP)
    // *     example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
    // *     returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}

    var  _o   = {
        strictMode: false,
        key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
        q:   {
            name:   "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-protocol to catch file:/// (should restrict this)
        }
    };

    var _m   = _o.parser[_o.strictMode ? "strict" : "loose"].exec(_str),
    uri = {},
    i   = 14;
    while (i--) {uri[_o.key[i]] = _m[i] || "";}
    // Uncomment the following to use the original more detailed (non-PHP) script

    //    uri[o.q.name] = {};
    //    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    //    if ($1) uri[o.q.name][$1] = $2;
    //    });
    //    return uri;


    switch (_component) {
        case 'PHP_URL_SCHEME':
            return uri.protocol;
        case 'PHP_URL_HOST':
            return uri.host;
        case 'PHP_URL_PORT':
            return uri.port;
        case 'PHP_URL_USER':
            return uri.user;
        case 'PHP_URL_PASS':
            return uri.password;
        case 'PHP_URL_PATH':
            return uri.path;
        case 'PHP_URL_QUERY':
            return uri.query;
        case 'PHP_URL_FRAGMENT':
            return uri.anchor;
        default:
            var _retArr = {};
            if (uri.protocol !== '') {_retArr.scheme=uri.protocol;}
            if (uri.host !== '') {_retArr.host=uri.host;}
            if (uri.port !== '') {_retArr.port=uri.port;}
            if (uri.user !== '') {_retArr.user=uri.user;}
            if (uri.password !== '') {_retArr.pass=uri.password;}
            if (uri.path !== '') {_retArr.path=uri.path;}
            if (uri.query !== '') {_retArr.query=uri.query;}
            if (uri.anchor !== '') {_retArr.fragment=uri.anchor;}
            return _retArr;
    }
};

jQuery.is_image = function(_url)
{
    if (false == this.is_link(_url))
        return false;
    var _param = this.parse_url(_url);
    if (this.is_null(_param) || this.is_null(_param.path))
        return false;
    var _path = _param.path;
    var _ext = this.parse_extension_name(_path);
    if (this.is_null(_ext))
        return false;
    if (this.inArray(_ext, ['jpg', 'jpeg', 'gif', 'png']) != -1)
        return true;
    else
        return false;
};

jQuery.parse_extension_name = function (_path)
{
    var _dot = _path.lastIndexOf('.');
    var _slash = _path.lastIndexOf('/');
    if (_dot == -1
        || _dot < _slash)
        return null;
    else {
        var _ext = _path.substr(_dot+1);
        return _ext;
    }
};

jQuery.get_time_interval = function (_time)
{
    // TODO 留到server端去做

};

/**
 * 是否存在
 * @memberOf {jQuery}
 * @class {jQuery}
 * @method [exists]
 * @type {boolean}
 */
jQuery.fn.exists = function () {
    return (this.length > 0);
};

/**
 * @memberOf {jQuey}
 * @property
 * @type {string}
 */
jQuery.inited_flag = 'inited';
jQuery.fn.has_inited = function () {
    return this.hasClass(this.inited_flag);
};

/**
 * 設定為已初始化
 * @memberOf {jQuery}
 * @method [set_inited]
 */
jQuery.fn.set_inited = function () {
    return this.addClass(this.inited_flag);
};

jQuery.extend({
    /**
     * 初始化
     * @memberOf {jQuery}
     * @method [init]
     * @param {function} _callback 要初始化的動作
     */
    init: function (_callback) {
        if (false == $(this).hasClass('inited'))
        {
            if (this.is_function(_callback))
                _callback(this);
            $(this).addClass('inited');
        }
        return this;
    }
});

jQuery.fn.extend({
    /**
     * 元素水平對齊
     * @memberOf {jQuery}
     * @method [align]
     * @param {Object} _options
     * 選項有三個
     * - option: 'left', 'middle', 'right'
     * - offset: 位移。會受到scale影響。
     * - scale: 手機模式用的縮放比例
     */
    align: function (_options) 
    {
        if (_options == 'left' || _options == 'center' || _options == 'right')
            _options = {option: _options};
                    
        var _option = $.get_parameter(_options, 'option');
        if ($.is_null(_option))
            return this;
        var _scale = $.get_parameter(_options, 'scale', 1);
        _scale = 1;
        var _offset = $.get_parameter(_options, 'offset', 0);
        _offset = $.css_scale(_offset, _scale);
        _offset = $.strip_unit(_offset);
        var _speed = $.get_parameter(_options, 'speed', 'normal');
    
        var _this = $(this);
        //var position = _this.css('position');
        
        var _mobile_mode = $.is_mobile_mode();
        //_mobile_mode = false;
        
        if (_this.is_layer()) 
        {
            if (_mobile_mode)
                _this.css('position', 'absolute');
            else
                _this.css('position', 'fixed');
            
            var _direction = 'left';
            
            //探測螢幕寬度
            /*
            var _max_width = window.innerWidth;
            if (window.innerWidth > window.outerWidth) {
                _max_width = window.outerWidth;
            }
            */
            var _max_width = $.get_viewport_width();
            _max_width = _max_width * _scale;
            
            
            if (_option == 'left') 
            {
                if (_mobile_mode) {
                    _option = window.pageXOffset;
                    _option = _option + _offset;
                }
                else {
                    _option = _offset;
                }
            }
            else if (_option == 'right') {
               
               _direction = 'right';
               if (_mobile_mode) {
                   _option = window.screen.width 
                       - window.pageXOffset 
                       - _max_width
                       + _offset;
               }
               else
               {
                   _direction = 'right';
                   _option = _offset;    
               }
            }
            else if (_option == 'center') 
            {
                var _width = _this.width();
                
                var _padding_left = $.strip_unit(_this.css('padding-left'));
                _width = _width + _padding_left;
                var _padding_right = $.strip_unit(_this.css('padding-right'));
                _width = _width + _padding_right;
                
                var _border_left = $.strip_unit(_this.css('border-left-width'));
                _width = _width + _border_left;
                var _border_right = $.strip_unit(_this.css('border-right-width'));
                _width = _width + _border_right;
                
                _option = (_max_width - _width) / 2 
                    + _offset;
                if (_mobile_mode)
                    _option = _option + window.pageXOffset;
    
            }
            
            ALIGN_CHECK = _this.width();
            /*
            if (_mobile_mode) 
                _this.css(_direction, _option + 'px');
            else {
                var _animate_option = {};
                _animate_option[_direction] = _option + 'px';
                _this.animate(_animate_option, {
                    queue:false,
                    complete: function () {
                        if (_this.width() != ALIGN_CHECK)
                        {
                            $(_this).align(_options);
                        }
                    },
                    duration: _speed
                });
            }
            */
            //2010.9.10 取消動畫
            _this.css(_direction, _option + 'px');
            
        }
        else
        {
            if (_option == 'left')
            {
                _this.css('margin-left', 0)
                    .css('float', 'none');
            }
            else if (_option == 'right')
            {
                _this.css('margin-right', 0)
                    .css('float', 'right');
            }
            else if (_option == 'center')
            {
                _this.css('margin-right', 'auto')
                    .css('margin-left', 'auto')
                    .css('float', 'none');
            }
            else
            {
                _this.css('margin-left', _option)
                    .css('float', 'none');
            }
        }
        return this;
    },
    /**
     * 元素垂直對齊
     * @memberOf {jQuery}
     * @param {Object} _options
     * 選項有三個
     * - option: 'left', 'middle', 'right'
     * - offset: 位移。會受到scale影響。
     * - scale: 手機模式用的縮放比例
     */
    valign: function (_options) 
    {
        if (_options == 'top' || _options == 'middle' || _options == 'bottom')
            _options = {option: _options};
        
        var _option = $.get_parameter(_options, 'option');
        
        if ($.is_null(_option))
            return this;
            
        var _scale = $.get_parameter(_options, 'scale', 1);
        var _offset = $.get_parameter(_options, 'offset', 0);
        _offset = $.css_scale(_offset, _scale);
        _offset = $.strip_unit(_offset);
        var _speed = $.get_parameter(_options, 'speed', 'normal');
        
        var _this = $(this);
        //var _position = _this.css('position');
        
        if ($.is_null(_scale))
            _scale = 1;
            
        var _mobile_mode = $.is_mobile_mode();
        
        //if (_position != 'static')
        if (_this.is_layer()) 
        {
            if (_mobile_mode)
                _this.css('position', 'absolute');
            else
                _this.css('position', 'fixed');
            
            //探測螢幕高度
            var _max_height = $.get_viewport_height();
            _max_height = _max_height * _scale;
            
            var _direction = 'top';
            
            
            if (_option == 'top') {
                
                if (_mobile_mode) {
                    _option = window.pageYOffset
                        + _offset;
                }
                else
                {
                    _option = _offset;    
                }
            }
            else if (_option == 'bottom') {
                _direction = 'bottom';
                _option = _offset;
                if (_mobile_mode) {
                    _option = window.screen.height 
                        - window.pageYOffset 
                        - _max_height
                        + _offset;
                }
                
            }
            else if (_option == 'middle') 
            {
                var _height = _this.height();
                
                var _padding_top = $.strip_unit(_this.css('padding-top'));
                _height = _height + _padding_top;
                var _padding_bottom = $.strip_unit(_this.css('padding-bottom'));
                _height = _height + _padding_bottom;
                
                var _border_top = $.strip_unit(_this.css('border-top-width'));
                _height = _height + _border_top;
                var _border_bottom = $.strip_unit(_this.css('border-bottom-width'));
                _height = _height + _border_bottom;
                
                _option = (_max_height - _height) / 2 + _offset;
                
                if (_mobile_mode) {
                    _option = _option + window.pageYOffset;
                }
                //alert([_option, _max_height, _height, window.pageYOffset]);
            }
            
            /*
            if (_mobile_mode) 
                _this.css(_direction, _option + 'px');
            else {
               var _animate_option = {};
               _animate_option[_direction] = _option + 'px';
               _this.animate(_animate_option, {
                   queue:false,
                   duration: _speed
               });
            }
            */
            //2010.9.10 取消動畫
            _this.css(_direction, _option + 'px');
        }
        else
        {
            if (_option == 'top')
            {
                _this.css('margin-top', 0);
            }
            else if (_option == 'bottom')
            {
                _this.css('margin-bottom', 0);
            }
            else if (_option == 'middle')
            {
                _this.css('margin-top', 0)
                    .css('margin-bottom', 0);
            }
            else
            {
                _this.css('margin-top', _option);
            }
        }
        
        return this;
    },
    center: function (_scale) {
        var _this = $(this);
        
        _this.valign({
            option: 'middle',
            scale: _scale
        });
        
        _this.align({
            option: 'center',
            scale: _scale
        });
    },
    is_layer: function () {
        var _this = $(this);
        var _position = _this.css('position');
        return (_position != 'static');
    },
    /**
     * 是否顯示
     * @memberOf {jQuery}
     * @class {jQuery}
     * @method visible
     * @type {boolean}
     */
    visible: function () {
        var _this = $(this);
        /*
        if (_this.css('display') == 'none')
            return false;
        else if (_this.css('visibility') == 'hidden')
            return false;
        return true;
        */
        return (_this.filter(':visible').length > 0);
    },
    /**
     * 將物件寬度成到畫面寬度
     * 
     * @memberOf {jQuery}
     * @class {jQuery}
     * @param {Object} _scale 縮放比率
     */
    fullscreen_width: function (_scale) {
        var _this = $(this);
        
        if ($.is_null(_scale))
            _scale = 1;
        //探測螢幕寬度
        //var _max_width = Math.min(window.innerWidth, window.outerWidth, $(document).width());
        var _max_width = $.get_viewport_width();
        //_max_width = _max_width * _scale;
        
        var _padding_left = $.strip_unit(_this.css('padding-left'));
        _max_width = _max_width - _padding_left;
        var _padding_right = $.strip_unit(_this.css('padding-right'));
        _max_width = _max_width - _padding_right;
        var _border_left = $.strip_unit(_this.css('border-left-width'));
        _max_width = _max_width - _border_left;
        var _border_right = $.strip_unit(_this.css('border-right-width'));
        _max_width = _max_width - _border_right;
        
        //保留原本的寬度到屬性去
        _this.attr('restore_width', _max_width + 'px');
        
        _this.css('width', _max_width  + 'px');
            //.css('border-right-width', 0)
            //.css('border-left-width', 0);
        
        return this;
    },
    fullscreen_height: function (_scale) {
        var _this = $(this);
        
        if ($.is_null(_scale))
            _scale = 1;
        
        //探測螢幕高度
        var _max_height = $.get_viewport_height();
        //_max_height = _max_height * _scale;
        
        //if ($.is_mobile_mode())
        //    _max_height = _max_height - 20;
        
        var _padding_top = $.strip_unit(_this.css('padding-top'));
        _max_height = _max_height - _padding_top;
        var _padding_bottom = $.strip_unit(_this.css('padding-bottom'));
        _max_height = _max_height - _padding_bottom;
        
        var _border_top = $.strip_unit(_this.css('border-top-width'));
        _max_height = _max_height - _border_top;
        var _border_bottom = $.strip_unit(_this.css('border-bottom-width'));
        _max_height = _max_height - _border_bottom;
        
        //保留原本的高度到屬性去
        _this.attr('restore_height', _max_height + 'px');
        
        _this.css('height', _max_height+'px');
            //.css('border-top-width', 0)
            //.css('border-bottom-width', 0);
            //.css('padding-top', 0)
            //.css('padding-bottom', 0);
        
        return this;
    },
    /**
     * 將元素伸展到螢幕寬度及高度
     * @memberOf {jQuery}
     * @class {jQuery}
     * @param {string} _option "width", "height", "x", "y"
     * @param {number} _scale 比例
     */
    fullscreen: function (_option, _scale) {
        var _this = $(this);
        if ($.is_number(_option) && $.is_null(_scale))
        {
            _scale = _option;
            _option = null;
        }
        if ($.is_null(_scale))
            _scale = 1;
        if (_option == 'width' || _option == 'x')
            _this.fullscreen_width(_scale);
        else if (_option == 'height' || _option == 'y')
            _this.fullscreen_height(_scale);
        else
        {
            _this.fullscreen_width(_scale);
            _this.fullscreen_height(_scale);
            
        }
        return this;
    },
    restore: function () {
        var _this = $(this);
        if (_this.hasAttr('restore_width'))
        {
            //_this.css('width', _this.attr('restore_width'));
            _this.css('width', 'auto');
            _this.removeAttr('restore_width');
        }
        if (_this.hasAttr('restore_height'))
        {
            //_this.css('width', _this.attr('restore_width'));
            _this.css('width', 'auto');
            _this.removeAttr('restore_height');
        }
    },
    /**
     * 將屬性回存到CSS當中
     * @param {string} _attr 屬性
     * @param {string} _css CSS項目
     * @param {string|null} _reset 回存之後，屬性的值。空值則刪除此屬性 
     */
    attr_to_css: function (_attr, _css, _reset) {
        var _this = $(this);
        var _value = _this.attr(_attr);
        if ($.isset(_value))
        {
            _this.css(_css, _value);
            if ($.is_null(_reset)) {
                _this.removeAttr(_attr);
            }
            else 
                _this.attr(_attr, _reset);
        }
        return this;
    },
    css_to_attr: function (_css, _attr, _reset) {
        var _this = $(this);
        if (_this.hasAttr(_attr))
            return this;
        
        var _value = _this.css(_css);
        if ($.isset(_value) && _value != 0 && _value !== '')
        {
            _this.attr(_attr, _value);
            if ($.isset(_reset))
                _this.css(_css, _reset);
        }
        return this;
    },
    css_number: function (_css) {
        return $.strip_unit($(this).css(_css));
    },
    /**
     * 取得物件的寬度
     * @type {number}
     */
    get_width: function () {
        var _this = $(this);
        var _length = _this.css('width');
        if ($.is_null(_length)) {
            _length = _this.width();
            _length = $.append_unit(_length);
        }
        return _length;
    },
    /**
     * 取得物件的高度
     * @type {number}
     */
    get_height: function () {
        var _this = $(this);
        var _length = _this.css('height');
        if ($.is_null(_length)) {
            _length = _this.height();
            _length = $.append_unit(_length);
        }
        return _length;
    },
    /**
     * 是否擁有屬性
     * @param {string} _attr
     * @type {boolean}
     */
    hasAttr: function (_attr) {
        var _this = $(this);
        var _value = _this.attr(_attr);
        return ($.isset(_value));
    },
    /**
     * 按照比例調整jQuery物件本身的CSS值
     * @memberOf {jQuery}
     * @class {jQuery}
     * @param {string} _css 指定CSS項目
     * @param {string|number} _expect 預期值
     * @param {number|null} _scale 比例值
     */
    css_scale: function (_css, _expect, _scale) {   
        if ($.is_object(_css) && $.is_null(_scale))
        {
            _scale = _expect;
            _expect = _css.expect;
            _css = _css.css;
        }
    
        if ($.is_array(_css))
        {
            for (var _i in _css)
            {
                this.css_scale(_css[_i], _expect, _scale);
            }
            return this;
        }
        
        if ($.is_null(_scale))
            _scale = 1;
        //var _this = $(this);
        
        //var _value = this.css(_css);
        
        if ($.is_null(_expect)
            || _expect === 0
            || _expect === '')
            return this;
        
        var _scale_length = function (_expect, _scale) {
            if ($.is_number(_expect)) {
                _expect = _expect * _scale;
                if (_expect < 1) 
                    _expect = 1;
            }
            else {
                if ($.is_string(_expect)) {
                    if ($.ends_with(_expect, '%')) {
                        _expect = _expect.substr(0, _expect.length - 1);
                        _expect = _expect * _scale;
                        if (_expect < 1) 
                            _expect = 1;
                        _expect = _expect + '%';
                    }
                    else {
                        if ($.ends_with(_expect, 'px') ||
                        $.ends_with(_expect, 'em') ||
                        $.ends_with(_expect, 'cm') ||
                        $.ends_with(_expect, 'pt') ||
                        $.ends_with(_expect, 'ex') ||
                        $.ends_with(_expect, 'px') ||
                        $.ends_with(_expect, 'in') ||
                        $.ends_with(_expect, 'mm') ||
                        $.ends_with(_expect, 'pc')) {
                            var _len = _expect.length;
                            var _unit = _expect.substr(_len - 2, _len);
                            _expect = _expect.substr(0, _len - 2);
                            _expect = _expect * _scale;
                            
                            if (_expect < 1) 
                                _expect = 1;
                            
                            _expect = _expect + _unit;
                        }
                        else 
                            return null;
                    }
                }
            }
            return _expect;
        };
        
        if ($.is_string(_expect) && _expect.indexOf(' ') > -1)
        {
            var _expects = _expect.split(' ');
            for (var _key in _expects)
            {
                _expects[_key] = _scale_length(_expects[_key], _scale);
            }
            _expect = _expects.join(' ');
        }
        else
        {
            _expect = _scale_length(_expect, _scale);
        }
        if ($.is_null(_expect))
            return this;
        
        this.css(_css, _expect);
        return this;
    },
    id: function(_set) {
        if ($.isset(_set))
            return $(this).attr('id', _set);
        else
            return $(this).attr('id');
    }
});

/**
 * 將CSS值加入單位。如果已經有單位，則不做調整
 * @param {string|number} _length CSS值
 * @param {string} _default_unit 預設單位
 * @type {type}
 */
jQuery.append_unit = function (_length, _default_unit) {
    if (this.is_null(_default_unit))
        _default_unit = 'px';
    
    if (this.is_number(_length))
        return _length + _default_unit;
    else {
        if (this.ends_with(_length, 'px')
            || this.ends_with(_length, '%')
            || this.ends_with(_length, 'em')
            || this.ends_with(_length, 'cm')
            || this.ends_with(_length, 'pt')
            || this.ends_with(_length, 'ex')
            || this.ends_with(_length, 'px')
            || this.ends_with(_length, 'in')
            || this.ends_with(_length, 'mm')
            || this.ends_with(_length, 'pc'))
            return _length;
        else
            return _length + _default_unit;
    }
};

/**
 * 去除CSS值的單位
 * @param {string|number} _length CSS值
 * @type {number}
 */
jQuery.strip_unit = function (_length) {
    if (this.is_number(_length))
        return _length;
    else {
        if (this.ends_with(_length, '%'))
            _length = _length.substr(0, _length.length -1);
        if (this.ends_with(_length, 'px')
            || this.ends_with(_length, 'em')
            || this.ends_with(_length, 'cm')
            || this.ends_with(_length, 'pt')
            || this.ends_with(_length, 'ex')
            || this.ends_with(_length, 'px')
            || this.ends_with(_length, 'in')
            || this.ends_with(_length, 'mm')
            || this.ends_with(_length, 'pc'))
            _length = _length.substr(0, _length.length -2);
            
            //$.test_msg(_length);
        var _output = parseInt(_length);
        if (isNaN(_output))
            _output = 0;
        return _output;
    }
};

/**
 * 取得CSS值的單位
 * @param {string|number} _length
 * @type {string}
 */
jQuery.get_unit = function (_length) {
    var _unit = null;
    if (this.is_number(_length))
        return _unit;
    else {
        var _len = _length.length;
        if (this.ends_with(_length, '%'))
            _unit = _length.substr(_len -1, _len);
        if (this.ends_with(_length, 'px')
            || this.ends_with(_length, 'em')
            || this.ends_with(_length, 'cm')
            || this.ends_with(_length, 'pt')
            || this.ends_with(_length, 'ex')
            || this.ends_with(_length, 'px')
            || this.ends_with(_length, 'in')
            || this.ends_with(_length, 'mm')
            || this.ends_with(_length, 'pc'))
            _unit = _length.substr(_len -2, _len);
        return _unit;
    }
};

/**
 * 縮放CSS單位的數值
 * @param {string|number} _length 要縮放的數值 
 * @param {number} _scale 比例
 */
jQuery.css_scale = function (_length , _scale) {
    if (_scale != 1 && _length != 0) {
        var _unit = $.get_unit(_length);
        _length = $.strip_unit(_length) * _scale;
        _length = _length + _unit;
    }
    return _length;
};

jQuery.get_viewport_width = function () {
    var _max_width = window.innerWidth;
    if (isNaN(window.innerWidth) || window.innerWidth > window.outerWidth )
        _max_width = window.outerWidth;
    if (isNaN(_max_width) || _max_width > $(document).width())
        _max_width = $(document).width();
    
    if (document.documentElement && document.documentElement.clientWidth) 
    {
        //IE 6+ in 'standards compliant mode'
        _ie_width = document.documentElement.clientWidth;
        if (isNaN(_max_width) || _max_width > _ie_width)
            _max_width = _ie_width;
    }
    return _max_width;
};

jQuery.get_viewport_height = function () {
    var _max_length = window.innerHeight;
    if (isNaN(_max_length) || _max_length > window.outerHeight )
        _max_length = window.outerHeight;
    if (isNaN(_max_length) || _max_length > $(document).height())
        _max_length = $(document).height();
    
    if (document.documentElement && document.documentElement.clientHeight) 
    {
        //IE 6+ in 'standards compliant mode'
        _ie_height = document.documentElement.clientHeight;
        if (isNaN(_max_length) || _max_length > _ie_height)
            _max_length = _ie_height;
    }
    
    return _max_length;
};

/**
 * 建立HTML元素，並附加在body之後。
 * @param {string} _html
 * @memberOf {jQuery}
 * @type {jQuery}
 */
jQuery.create_once = function (_html, _append_to) {
    
    if (this.is_null(_append_to))
        _append_to = this('body');
    
    var _temp_obj = this(_html);
    var _tag_name = _temp_obj.attr('tagName');

    var _class_name = _temp_obj.attr('class');
    if (_class_name !== '' && _class_name != null) {
        var _classes = _class_name.split(' ');
        _class_name = '';
        for (var _key in _classes)
        {
            _class_name += '.'+_classes[_key];
        }
    }
    else
        _class_name = '';

    var _id = _temp_obj.attr('id');
    if (_id !== '' && _id != null)
        _id = '#'+_id;
    else
        _id = '';


    if (_class_name === '' && _id === '') {
        _temp_obj.appendTo(_append_to);
        return _temp_obj;
    }
    else {
        var _selector = _tag_name+_class_name+_id;
        var _obj = this(_selector);
        if (false == _obj.exists())
        {
            _temp_obj.appendTo(_append_to);
            _obj = _temp_obj;
        }
        return _obj;
    }
};

/**
 * 檢查是否符合Interface
 * @param {Object} _theObject
 * @param {Object} _theInterface
 * @type {boolean}
 */
jQuery.check_interface = function(_theObject, _theInterface) {
    for (var _member in _theInterface) {
        if ( (typeof _theObject[_member] != typeof _theInterface[_member]) ) {
            this.test_msg("object failed to implement interface member ", _member);
            return false;
        }
    }
    //if we get here, it passed the test, so return true
    return true;
};

/**
 * 去除HTML標籤
 * @memberOf {jQuery}
 * @param {string} _html 含有HTML標籤的字串
 * @param {string} _except_tags 不要移除的標籤
 * @type {string}
 */
jQuery.strip_html_tag = function(_html, _except_tags) {
    //var _reTag = /<(?:.|\s)*?/g;
    var _reTag = /<[^>].*?>/g;
    
    if (typeof(_except_tags) == "string") {
        _except_tags = [_except_tags];
    }
    if (typeof(_except_tags) != "undefined" 
		&& typeof(_except_tags[0]) == "string") {
		_reTag = "<[^(";
		for (var _i = 0; _i < _except_tags.length; _i++) {
			if (_i > 0) {
				_reTag = _reTag + "|";
			}
			_reTag = _reTag + _except_tags[_i];
		}
		_reTag = _reTag + ")>].*?>";
		_reTag = new RegExp(_reTag, "g");
	}
    
    return _html.replace(_reTag,"");
};

/**
 * CSS框線圓角的名稱區
 */
jQuery.css_border_radius = { 
    moz: [
        '-moz-border-radius-topleft' ,
        '-moz-border-radius-topright' , 
        '-moz-border-radius-bottomleft' ,
        '-moz-border-radius-bottomright'
    ],
    webkit: [
        'border-top-left-radius' ,
        'border-top-right-radius' ,
        'border-bottom-left-radius' ,
        'border-bottom-right-radius'
    ]
};

/**
 * 適合手指的格式儲存區
 */
jQuery.css_finger_friendly = {
    'button': [
        {css: 'font-size', expect: '30px'},
        {css: 'border-width', expect: '3px'},
        {css: 'padding', expect: '5px'},
        {css: jQuery.css_border_radius.moz, expect: '10px'},
        {css: jQuery.css_border_radius.webkit, expect: '10px 10px'}
    ]
};

/**
 * 手機模式的暫存區
 * @type {boolean}
 */
jQuery.mobile_mode = null;

/**
 * 是否為手機模式
 * @type {boolean}
 * @memberOf {jQuery}
 * @method [is_mobile_mode]
 */
jQuery.is_mobile_mode = function () {
    if (this.mobile_mode === null) {
        var _this = this;
        YUI().use("", function(Y){
            var _mode = (!$.is_null(Y.UA.mobile));
            _this.mobile_mode = _mode;
        });
    }
    return this.mobile_mode;
};

/**
 * 是否為小螢幕模式
 * 這邊所指的小螢幕，是指寬小於400，或是高度小於480
 * @param {boolean} _strict = true
 * true：必須要寬度與高度符合才算小螢幕
 * false：寬度或高度其中一個符合就算是小螢幕
 * @type {boolean}
 */
jQuery.is_small_screen = function (_strict) {
    
    if ($.is_null(_strict))
        _strict = true;
    
    var _width = $.get_viewport_width();
    var _height = $.get_viewport_height();
    
    if (_strict)
        return (!(_width > 400 && _height > 480));
    else
        return (!(_width > 400 || _height > 480));
};

jQuery.is_small_width = function () {
    var _width = $.get_viewport_width();
    return (_width < 400);
};

jQuery.is_small_height = function () {
    var _height = $.get_viewport_height();
    
    return (!(_height > 480));
};

jQuery.touchable = null;
/**
 * 偵測螢幕是否為觸控式
 */
jQuery.is_touchable = function () {
   
   if (this.touchable === null)
   {
       var _touchable = false;
        try 
        {            
            var _el = document.createElement('div');
            _el.setAttribute('ontouchstart', 'return;');
           if (typeof(_el.ontouchstart) == "function")
              _touchable = true;
       } catch (_e) { }
       this.touchable = _touchable;
   }
   return this.touchable;
};

// ---------
// 相關介面
// ---------

jQuery.fn.extend({
    /**
     * 對應到Zoom觀察者的方法
     * @param {Zoom_observable} _zoom_observable
     */
    onzoom: function (_zoom_observable) {
        
    },
    /**
     * 對應到Viewport Move事件
     * 
     */
    onviewportmove: function() {
        
    }
});

/**
 * 取得參數
 * @memberOf {jQuery}
 * @memberOf {$}
 * @method [get_paramter]
 * @param {Object} _parameters
 * @param {string} _name
 * @param {Object} _default_value
 */
jQuery.get_parameter = function(_parameters, _name, _default_value) 
{
    if ($.is_null(_parameters))
        return null;
    
    if ($.is_array(_name)) {
        for (var _key in _name)
        {
            var _n = _name[_key];
            //if (typeof(_parameters[_n])!= 'undefined' && _parameters[_n] != null)
            if (typeof(_parameters[_n])!= 'undefined' && $.isset(_parameters[_n]))
            //if ($.isset(_parameters[_n])) 
                return _parameters[_n];
        }
    }
    else if (typeof(_parameters[_name]) != 'undefined' && $.isset(_parameters[_name]))
    //else if ($.isset(_parameters[_name])) 
        return _parameters[_name];
    
    if ($.isset(_default_value))
        return _default_value;
    else
        return null;
};

jQuery._match_config = {
    english: {
        'q':1,'w':1,'e':1,'r':1,'t':1,'y':1,'u':1,'i':1,'o':1,'p':1,'a':1,'s':1,'d':1,'f':1,'g':1,'h':1,'j':1,'k':1,'l':1,'z':1,'x':1,'c':1,'v':1,'b':1,'n':1,'m':1
        ,
        'Q':1,'W':1,'E':1,'R':1,'T':1,'Y':1,'U':1,'I':1,'O':1,'P':1,'A':1,'S':1,'D':1,'F':1,'G':1,'H':1,'J':1,'K':1,'L':1,'Z':1,'X':1,'C':1,'V':1,'B':1,'N':1,'M':1
    },
    upper_english: {
        'Q':1,'W':1,'E':1,'R':1,'T':1,'Y':1,'U':1,'I':1,'O':1,'P':1,'A':1,'S':1,'D':1,'F':1,'G':1,'H':1,'J':1,'K':1,'L':1,'Z':1,'X':1,'C':1,'V':1,'B':1,'N':1,'M':1
    },
    punctuation: {
        '，':1,',':1,'。':1,'.':1,'：':1,':':1,'；':1,';':1,'、':1,'？':1,'?':1,'！':1,'!':1,'-':1
    },
    sentence_punctuation: {
        '。':1,'.':1,'：':1,':':1,'；':1,'？':1,'?':1,'！':1,'!':1
    },
    english_sentence_punctuation: {
        '.':1,':':1,'?':1,'!':1
    }
}; 

jQuery.match_english = function(_text)
{
	//var _reg = /^([a-z]|[A-Z])$/;
	//return _reg.test(_text);
    return (typeof(jQuery._match_config.english[_text]) == 'number');
};

jQuery.match_upper_english = function(_text)
{
	//var _reg = /^([A-Z])$/;
	//return _reg.test(_text);
    return (typeof(jQuery._match_config.upper_english[_text]) == 'number');
};
jQuery.match_number = function(_text)
{
	var _reg = /^\d$/;
	return _reg.test(_text);
};
/**
 * 測試是否為標點符號
 * @param {String} _text
 */
jQuery.match_punctuation = function(_text)
{
	//var _reg = /^(，|,|。|\.|\'|")$/;
    //var _reg = /^(，|,|。|\.|：|:|；|;|、|？|\?|！|!|-)$/;
	//return _reg.test(_text);
    return (typeof(jQuery._match_config.punctuation[_text]) == 'number');
};

/**
 * 測試是否為斷句的標點符號
 * @param {String} _text
 */
jQuery.match_sentence_punctuation = function(_text)
{
	//var _reg = /^(，|,|。|\.|\'|")$/;
    //var _reg = /^(。|\.|：|:|；|？|\?|！|!)$/;
	//return _reg.test(_text);
    return (typeof(jQuery._match_config.sentence_punctuation[_text]) == 'number');
};

/**
 * 測試是否為斷句的標點符號
 * @param {String} _text
 */
jQuery.match_english_sentence_punctuation = function(_text)
{
	//var _reg = /^(，|,|。|\.|\'|")$/;
    //var _reg = /^(\.|:|\?|!)$/;
	//return _reg.test(_text);
    return (typeof(jQuery._match_config.english_sentence_punctuation[_text]) == 'number');
};

jQuery.match_space = function(_text)
{
	var _reg = /^(\s|　)$/;
	return _reg.test(_text);
};

/**
 * 取消選擇範圍
 */
jQuery.cancel_select = function() 
{
	if ($.browser.msie === true)
		top.document.selection.empty();
	else
		window.getSelection().removeAllRanges();
};

jQuery.lock_viewport = function () 
{
    var _new_viewport = $('<meta name="viewport" id="kals_viewport_lock" content="width=device-width, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes" />')
        .appendTo($('head'));
};

jQuery.unlock_viewport = function () 
{
    $('head meta[name=viewport]#kals_viewport');
};

jQuery.get_prefixed_id = function (_prefixed_id) {
    if ($.is_null(_prefixed_id))
        return null;
    
    if ($.is_number(_prefixed_id))
        return _prefixed_id;
    if ($.is_object(_prefixed_id)) {
        if ($.is_jquery(_prefixed_id))
            _prefixed_id = _prefixed_id.attr('id');
        else if ($.is_null(_prefixed_id))
            return null;
        else if (typeof(_prefixed_id) != 'undefined'
            && typeof(_prefixed_id.id) != 'undefined')
        {
            _prefixed_id = _prefixed_id.id;
        }
        else
            return null;
    }
    
    if ($.is_null(_prefixed_id) || $.trim(_prefixed_id) === '') {
        return null;
    }
    _prefixed_id = _prefixed_id + '';
    
    var _parts = _prefixed_id.split('_');
    var _id = _parts[ (_parts.length-1) ];
    _id = parseInt(_id);
    if (isNaN(_id))
        return null;
    else
        return _id;
};

jQuery.get_class_prefixed_id = function (_classname, _prefixed) {
	
	if ($.is_jquery(_classname))
		_classname = _classname.attr('className');
		
	var _classname_ary = _classname.split(' ');
	var _id = null;
	if (_prefixed === null)
	{
		for (var _i = 0; _i < _classname_ary.length; _i++)
		{
			_id = $.get_prefixed_id(_classname_ary[_i]);
			if (_id != null)
				return _id;
		}
	}
	else
	{
		for (var _i = 0; _i < _classname_ary.length; _i++)
		{
			var _c = _classname_ary[_i];
			if ($.starts_with(_c, _prefixed))
			{
				_id = $.get_prefixed_id(_c);
				if (_id != null)
					return _id;
			}
		}
	}
	return _id;
};

/**
 * 以動畫的方式捲動捲軸
 * @memberOf {jQuery}
 * @param {Object} _position
 * _postion = {
 *     x: 100,    //單位是像素
 *     y: 100
 * }
 * _postion = {
 *     x: +100'    //任一可省略，表示固定原有捲軸位置
 * }
 * @param {number|string|null} _speed 預設為1000
 * _speed = 1000;    //1000毫秒=1秒鐘以內跑完
 * _speed = 'fast';    //fast=200, normal=1000, slow=2000
 * @param {function|null} _callback 回呼函數
 */
jQuery.scroll_to = function (_position, _speed, _callback) {
    
    //$.test_msg('$.scroll_to', [$.json_encode(_position), _speed, _callback]);
    
    //宣告基本資料
    var _target_x, _target_y, _interval_x, _interval_y, _interval_time = 10, _repeat_count
        , _next_x, _next_y;
    
    //確定位置資料
    _target_x = $.get_parameter(_position, ['x', 'left', 'pageXOffset'], window.pageXOffset);
    if ($.starts_with(_target_x, '+') || $.starts_with(_target_x, '-'))
        _target_x = eval(window.pageXOffset + _target_x);
    _target_y = $.get_parameter(_position, ['y', 'top', 'pageYOffset'], window.pageYOffset);
    if ($.starts_with(_target_y, '+') || $.starts_with(_target_y, '-'))
        _target_y = eval(window.pageYOffset + _target_y);
    
    if ($.is_number(_target_x) === false || $.is_number(_target_y) === false)
        return this;
    
    //調整_speed跟_callback
    if ($.is_function(_speed) && $.is_null(_callback)) {
        _callback = _speed;
        _speed = 1000;
    }
    
    //取得_speed
    if (_speed == 'fast')
        _speed = 200;
    else if (_speed == 'slow')
        _speed = 2000;
    else if ($.is_number(_speed) === false)
        _speed = 1000;
        
    //確認要移動的次數
    _repeat_count = parseInt(_speed / _interval_time)+1;
    
    //確認要移動的距離
    _interval_x = parseInt((_target_x - window.pageXOffset) / _repeat_count)+1;
    _interval_y = parseInt((_target_y - window.pageYOffset) / _repeat_count)+1;
    
    
    var _loop = function (_i, _count, _callback) {
        if (_i == _count || _i > _count)
        {
            if ($.is_function(_callback))
                _callback();
            return;
        }
        else
        {
            if (_i < _count -1)
            {
                var _offset_x = window.pageXOffset;
                _next_x = _offset_x + _interval_x;
                if (_next_x > _target_x)
                    _next_x = _target_x;
                
                var _offset_y = window.pageYOffset;
                _next_y = _offset_y + _interval_y;
                if (_next_y > _target_y)
                    _next_y = _target_y;
            }
            else
            {
                _next_x = _target_x;
                _next_y = _target_y;
            }
            
            window.scrollTo(_next_x, _next_y);
            
            setTimeout(function () {
                _i++;
                _loop(_i, _count, _callback);
            }, _interval_time);
        }
    };
    
    _loop(0, _repeat_count, _callback);
    return this;
};

jQuery.save_scroll_position = function () {
    
    this._scroll_position = [window.pageXOffset, window.pageYOffset];
    
};

jQuery.load_scroll_position = function () {
    
    
    if (window.pageXOffset != this._scroll_position[0]) {
        //$.test_msg('X被移動了', [this._scroll_position[0], '->', window.pageXOffset]);
    }
    
    if (window.pageYOffset != this._scroll_position[1]) {
        //$.test_msg('Y被移動了', [this._scroll_position[1], '->', window.pageYOffset]);
        //alert(['Y被移動了', this._scroll_position[1], '->', window.pageYOffset]);
    }
    
    window.scrollTo(this._scroll_position[0], this._scroll_position[1]);
    
};

jQuery.create_id = function () {
    return (new Date()).getTime() + '';
};

/**
 * 啟動callback
 * @param {function} _callback
 * @param {Object} _arg1 參數
 * @param {Object} _arg2 參數
 * @param {Object} _arg3 參數
 * @param {Object} _arg4 參數
 * @param {Object} _arg5 參數
 */
jQuery.trigger_callback = function (_callback, _arg1, _arg2, _arg3, _arg4, _arg5)
{
    var _delay = 0;
    
    if (typeof(_callback) == 'number') {
        if (typeof(_arg1) == 'function')
        {
            _delay = _callback;
            _callback = _arg1;
        }
    }
    
    if ($.is_function(_callback)) {
        setTimeout(function () {
            
            if ($.isset(_arg1) && $.isset(_arg2) && $.isset(_arg3) && $.isset(_arg4) && $.isset(_arg5))
                _callback(_arg1, _arg2, _arg3, _arg4, _arg5);
            else if ($.isset(_arg1) && $.isset(_arg2) && $.isset(_arg3) && $.isset(_arg4))
                _callback(_arg1, _arg2, _arg3, _arg4);
            else if ($.isset(_arg1) && $.isset(_arg2) && $.isset(_arg3))
                _callback(_arg1, _arg2, _arg3);
            else if ($.isset(_arg1) && $.isset(_arg2))
                _callback(_arg1, _arg2);
            else if ($.isset(_arg1))
                _callback(_arg1);
            else
                _callback();
                
        }, _delay);
    }
};

/**
 * 多重繼承的功能
 * 
 * @example 讓ClassB繼承ClassA
 * 
 * function ClassA { }
 * function ClassB {
 *   $.multi_extend(this, new ClassA());
 * }
 * 
 * @param {Object} _this_class
 * @param {Object} _super_class
 */
jQuery.multi_extend = function (_this_class, _super_class)
{
    if ($.is_object(_super_class)) {
        for (var _key in _super_class)
        {
            _this_class[_key] = _super_class[_key];
        }
    }
    return _this_class;
};

/**
 * 計算_time到現在的間隔秒數
 * @param {number|string} _time 請輸入從1970/01/01到現在秒的格式
 */
jQuery.get_interval_time = function (_time) {
    if ($.is_string(_time))
        _time = parseInt(_time);
    
    if ($.is_number(_time)) {
        var _now = parseInt((new Date()).getTime()/1000);
        return _now - _time;
    }
    else
        return 0;
};

/**
 * 刪除陣列中指定的索引
 * @param {Array} _ary
 * @param {number} _index
 */
jQuery.array_remove = function (_ary, _index) {
    if(isNaN(_index)||_index>_ary.length){return false;}
    for(var i=0,n=0;i<_ary.length;i++) {
        if(_ary[i]!=_ary[_index])
        {
            _ary[n++]=_ary[i];
        }
    }
    _ary.length-=1;
    return _ary;
};

/**
 * 取得從1970/1/1到現在的秒數。注意是秒數，而非毫秒數。
 * 詳細的文件請參考此網頁http://www.epochconverter.com/
 * @type {number}
 */
jQuery.get_epoch_time = function () {
    return parseInt((new Date()).getTime()/1000);
};

jQuery.fn.setup_hover = function () {
    return $(this).hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });
};

jQuery.browser.msie6 = ($.browser.msie && $.browser.version.substr(0,1) < 7);

/**
 * 移除反斜線
 * @param {string} _str
 * @return {string}
 */
jQuery.stripslashes = function (_str) {
	_str=_str.replace(/\\'/g,'\'');
	_str=_str.replace(/\\"/g,'"');
	_str=_str.replace(/\\0/g,'\0');
	_str=_str.replace(/\\\\/g,'\\');
	return _str;
};

/**
 * 改良原本的decodeURIComponent
 * @version 20130222 Pullipuli
 * @param  {String} _str 要轉換的字串
 * @return {String}      轉換完成的字串
 */
jQuery.decodeURIComponent = function (_str) {
    var _result;
    /*
    try
    {
        _result = decodeURIComponent(_str);
    }
    catch (_e) {
        _str = $.str_replace("%", "%25", _str);
        _result = decodeURIComponent(_str);
    }
    */
    _str = $.str_replace("%", "%25", _str);
    _result = decodeURIComponent(_str);
    return _result;
};

/**
 * 20130222 Pulipuli Chen
 * 不採用
 */
if (false)
{
    /**
     * @type {jQuery}
     * @alias $
     * @constructor
     * @method [$]
     */
    $ = jQuery;
}

// ---------
// 防止重複讀取
// ---------
$jquery_extends = true;

}   //if (typeof(...

/* End of file jquery.extends */
/* Location: ./libraries/helpers/jquery.extends.js */