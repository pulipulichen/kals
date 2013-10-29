/**
 * KALS_loader
 *
 * @package		KALS
 * @category		JavaScript Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/22 下午 10:13:01
 * @constructor KALS_loader()
 * @requires jQuery
 * @requires Other_class
 */

/**
 * @class KALS_loader
 * @constructor KALS_loader
 */
function KALS_loader() {
    

// --------
// 安裝程序
// --------

/**
 * 執行各物件的安裝
 * 
 * @param {Object} _conf JSON格式物件。範例：
 * var _conf = {user_name: 'pudding'};
 * @param {Object} _callback 回呼函數
 */
this.load = function (_conf, _callback)
{
    this.generic_load(_conf, _callback);
    return this;
};

this.generic_dispatcher = null;

this.generic_load = function (_conf, _callback)
{
    var _prefix = "generic/";
    
    if (typeof(_conf) == 'function' && typeof(_callback) == 'undefined')
    {
        _callback = _conf;
        _conf = null;
    }
    
    var _this = this;
    var _toolkit_libraries = {
        script_list: _prefix+'toolkit',
        style_list: _prefix+'style|generic'
    };
    
    var _generic_libraries = {
        script_list: _prefix+'script'
    };
    _this.load_jquery(function () {
        
        _this.load_libraries(_toolkit_libraries, function () {
            //$.test_msg('load_libraries');
            //設定generic設定的觀察者模式
            var _generic_info = _this.get_base_url() + _prefix + 'info';
            
            _this.generic_dispatcher = new JSONP_dispatcher(_generic_info);
            
            _this.load_libraries(_generic_libraries, function () {
                
                _this.generic_dispatcher.load(function () {
                    _callback();
                });
                
            });
        });
    });
    
    return this;
};

this.has_jquery = function () 
{
    return (typeof(jQuery) == 'object'
        && jQuery instanceof jQuery)
};

//this.base_url = null;
this.base_url = 'http://192.168.11.2/kals/web_apps/';

/**
 * 取得KALS伺服器的網址
 * 這是從引用KALS_loader檔案的script的src屬性中去分析得來的
 * @type {string}
 * @final
 */
this.get_base_url = function ()
{
    if (this.base_url == null)
    {
        var _base_url = null;
        var _script_tags = document.getElementsByTagName("script");
        var _needle = 'setup';
        for (var _i in _script_tags)
        {
            var _s = _script_tags[_i];
            if (typeof(_s.src) == 'undefined')
                continue;
            
            var _url = _s.src;
            if (_url.length >= _needle.length
                && _url.substring(_url.length - _needle.length, _url.length) == _needle)
            {
                _needle = 'web_apps/';
                var _pos = _url.lastIndexOf(_needle);
                
                if (_pos > -1)
                    _base_url = _url.substring(0, _pos + _needle.length);
            }
            
            if (_base_url != null) 
            {
                break;
            }
        }
        
        if (_base_url != null)
        {
            $.test_msg('KALS_loader.setup_base_url()', _base_url);
            this.base_url = _base_url;
        }   
        else
            window.alert('Detect base url error!');
    }
    return this.base_url;
};

this.load_jquery = function (_callback)
{
    if (this.has_jquery())
    {
        if (typeof(_callback) == 'function')
            _callback();
    }
    else
    {   
        var _base_url = this.get_base_url();
        
        if (_base_url != null)
        {
            var _jquery_url = _base_url + 'generic/jquery';
            var _head= document.getElementsByTagName('head')[0];
            var _script= document.createElement('script');
            _script.type= 'text/javascript';
            _script.src= _jquery_url;
            _script.onreadystatechange = function () 
            {
                if (typeof(this.readyState) != 'undefined'
                    && this.readyState == 'complete')
                {                     
                    if (typeof(_callback) == 'function')
                        _callback();
                }
            };
            _script.onload = function () {
                if (typeof(_callback) == 'function')
                    _callback();
            };
            _head.appendChild(_script);
        }
    }
    return this;
};

/**
 * 同時讀取指定的所有script，並在完全完成之後呼叫callback。
 * @param {Array} _script_list
 * @param {Function} _callback
 */
this.load_scripts = function (_script_list, _callback) 
{
    var _loaded = [];
    
    var _check_complete = function (_script) {
        if (typeof(_script) == 'undefined'
            || _script == ''
            || $.inArray(_script, _loaded) > -1)
            return;
        
        _loaded.push(_script);
        
        if (_loaded.length == _script_list.length)
        {
            if (typeof(_callback) == 'function')
                _callback();
        }
    };
    
    
    var _base_url = this.get_base_url();
    //_base_url = _base_url + '/load_js/';
    if (typeof(_script_list) == 'string')
        _script_list = [_script_list];
    
    for (var _i in _script_list)
    {
        var _script_url = _base_url + _script_list[_i];
        $.getScript(_script_url, function () {
            _check_complete(_script_url);
        });
        /*
       var _script = $('<script type="text/javascript" src="' + _script_url + '"></script>')
            .load(function () {
                //var _script_url = $('this').attr('src');
                //_check_complete(_script_url);
            })
            .ready(function () {
                //var _script_url = this.src;
                if (this.readyState == 'complete') 
                {
                    var _script_url = $('this').attr('src');
                    _check_complete(_script_url);
                }
            });
       _script.appendTo($('head'));
       */
    }
    /*
    var _base_url = this.get_base_url();
    //_base_url = _base_url + '/load_js/';
    if (typeof(_script_list) == 'string')
        _script_list = [_script_list];
    
    var _load = function (_i, _script_list, _callback)
    {
        if (_i < _script_list.length)
        {
            var _script_url = _base_url + _script_list[_i];
            $.getScript(_script_url, function () {
                _i++;
                //setTimeout(function () {
                //    _load(_i, _script_list, _callback);
                //}, 10);
                _load(_i, _script_list, _callback);
            });
        }
        else
        {
            if (typeof(_callback) == 'function') {
                setTimeout(_callback, 10);
            }
        }
    };
    
    _load(0, _script_list, _callback);
    */
    return this;
};

this.load_styles = function (_style_list, _callback)
{
    var _loaded = [];
    var _check_complete = function (_style) {
        if (typeof(_style) == 'undefined'
            || $.inArray(_style, _loaded) > -1)
            return;
        
        _loaded.push(_style);
        if (_loaded.length >= _style_list.length)
        {
            if (typeof(_callback) == 'function')
                _callback();
        }
    };
    
    var _base_url = this.get_base_url();
    //_base_url = _base_url + '/load_css/';
    
    if (typeof(_style_list) == 'string')
        _style_list = [_style_list];
    
    for (var _i in _style_list)
    {
        var _style_data = _style_list[_i];
        var _style_url = null;
        var _style_title = null;
        
        var _pos = _style_data.lastIndexOf('|');
        if (_pos > -1)
        {
            _style_url = _style_data.substr(0, _pos);
            _style_title = _style_data.substring(_pos+1, _style_data.length);
        }
        else
            _style_url = _style_data;
        
        var _style = _base_url + _style_url;
            
        //檢查一下是否已有該title
        var _link = null;
        if (_style_title != null)
        {
            _link = $('link[type=text/css][rel=stylesheet][title='+_style_title+']');
            if (_link.length == 0)
                _link = $('<link type="text/css" rel="stylesheet" href="'+_style+'" />')
                    .appendTo($('head'));
            else
                _link.attr('href', _style);
        }
        else
            _link = $('<link type="text/css" rel="stylesheet" href="'+_style+'" />')
                .appendTo($('head'));
        
        _link.attr('onreadystatechange', function () 
            {
                if (this.readyState == 'complete')
                    _check_complete(this.href);
            })
            .attr('onload', function () 
            {
                _check_complete(this.href);
            });
            
        if (_style_title != null)
            _link.attr('title', _style_title);
    }
    //if (typeof(_callback) == 'function')
    //    _callback();
    return this;
};

this.load_libraries = function (_libraries, _callback) 
{
    var _loaded = 0;
    var _threshold = 0;
    var _complete = function () {
        _loaded++;
        
        if (_loaded >= _threshold)
        {
            if (typeof(_callback) == 'function')
                _callback();
        }
    };
    
    if (typeof(_libraries.script_list) != 'undefined')
    {
        _threshold++;
    }
    if (typeof(_libraries.style_list) != 'undefined')
    {
        _threshold++;
    }
    // 在此處開始執行
    if (typeof(_libraries.script_list) != 'undefined')
    {
        this.load_scripts(_libraries.script_list, function () {
            _complete();
        });
    }
    if (typeof(_libraries.style_list) != 'undefined')
    {   
        this.load_styles(_libraries.style_list, function () {
            _complete();
        });
    }
    
    
    return this;
};

/**
 * Setup完畢之後，接下來要開始跟伺服器取得資料，進行初始化。
 */
this.initialize = function (email)
{
    
};

/**
 * 初始化完畢、也取得伺服器資料之後，接下來就進行更進一步的設置。
 */
this.ready = function ()
{

};

/**
 * 上述工作完成之後，最後的設定。
 */
this.complete = function ()
{

};

    // --------
    return this;
}


$(function() {
    KALS_loader = new KALS_loader();
})


/* End of file KALS_loader */
/* Location: ./libraries/core/KALS_loader.js */