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
function KALS_loader_class() {
    

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
this.load = function (_conf, _callback) {
    this.generic_load(_conf, _callback);
    return this;
};

this.generic_dispatcher = null;

this.generic_load = function (_conf, _callback) {   
    var _prefix = "generic/";
    
    if (typeof(_conf) === 'function' 
            && typeof(_callback) === 'undefined') {
        _callback = _conf;
        _conf = null;
    }
    
    var _this = this;
    
    var _libraries = {
        libraries_list: [
            "libraries/ckeditor/ckeditor.js",
            "libraries/jquery-ui/js/jquery-ui-1.8.5.custom.min.js",
            'libraries/jquery-file-upload/js/jquery.iframe-transport.js'
            //'libraries/jquery-file-upload/js/vendor/jquery.ui.widget.js'
        ],
        // @version 20140703 Pudding Chen
        // 解決CKeditor圖示無法顯示的問題
        images_list: [
            "libraries/ckeditor/skins/kama/icons.png"
        ]
    };
    
    var _toolkit_libraries = {
        //script_list: _prefix+'toolkit',
        libraries_list: [
            "libraries/ckeditor/adapters/jquery.js",
            "libraries/jquery-file-upload/js/jquery.fileupload.js"
        ],
        style_list: _prefix+'style|generic'
    };
    
    /*
    var _component_libraries = {
        //script_list: _prefix+'component_package'
        //script_list: _prefix+'package'
        
        script_list: [
            _prefix+'toolkit',
            _prefix+'core',
            _prefix+'component'
        ]
    };*/
    
    var _component_libraries = [
            _prefix+'toolkit',
            _prefix+'component',
            _prefix+'core'
            //_prefix+'package'
        ];
    
    //console.log('[KALS] load jquery');
    _this.load_jquery(function () {
        
        //console.log('[KALS] load libraries');
        _this.load_libraries(_libraries, function () {
            
            //console.log('[KALS] load toolkit');
            _this.load_libraries(_toolkit_libraries, function () {
                //$.test_msg('load_libraries');
                //設定generic設定的觀察者模式
                
                //console.log('[KALS] load component');
                
                //_this.load_libraries(_component_libraries, function () {
                _this.load_scripts_orderly(_component_libraries, function () {
                    //console.log('[KALS] callback');
                    if (typeof(_callback) === "function") {
                        _callback();
                    }
                });    
            });
        });
    });
    
    return this;
};

this.has_jquery = function () {
    return (typeof(jQuery) === 'object'
        && jQuery !== null
        && jQuery instanceof jQuery);
};

//this.base_url = null;
this.base_url = null;

/**
 * 取得KALS伺服器的網址
 * 這是從引用KALS_loader檔案的script的src屬性中去分析得來的
 * @type {string}
 * @final
 */
this.get_base_url = function () {
    if (this.base_url === null) {
        var _base_url = null;
        var _script_tags = document.getElementsByTagName("script");
        var _needle = '/kals/web_apps/generic/loader';
        for (var _i in _script_tags) {
            var _s = _script_tags[_i];
            if (typeof(_s.src) === 'undefined') {
                continue;
            }
            
            var _url = _s.src;
            if (_url.length >= _needle.length
                && _url.indexOf(_needle) > -1) {
                _needle = 'web_apps/';
                var _pos = _url.lastIndexOf(_needle);
                
                if (_pos > -1) {
                    _base_url = _url.substring(0, _pos + _needle.length);
                }
                
            }
            
            if (_base_url !== null) {
                break;
            }
        }
        
        if (_base_url !== null) {
            //$.test_msg('KALS_loader.setup_base_url()', _base_url);
            this.base_url = _base_url;
        }
        else {
            window.alert('Detect base url error!');
        }
    }
    return this.base_url;
};

/**
 * 
 * @returns {String}
 */
this.get_libraries_url = function () {
    var _libraries_url = this.get_base_url();
    var _needle = "web_apps/";
    if (_libraries_url.substr(_libraries_url.length - _needle.length, _needle.length) === _needle) {
        _libraries_url = _libraries_url.substr(0, _libraries_url.length - _needle.length);
    }
    return _libraries_url;
    
};

this.load_jquery = function (_callback) {
    if (this.has_jquery()) {
        if (typeof(_callback) === 'function') {
            _callback();
        }
    }
    else {   
        var _base_url = this.get_base_url();
        if (_base_url !== null) {
            var _jquery_url = _base_url + 'generic/jquery';
            var _head= document.getElementsByTagName('body')[0];
            var _script= document.createElement('script');
            _script.type= 'text/javascript';
            _script.src= _jquery_url;
            _script.onreadystatechange = function () {
                if (typeof(this.readyState) !== 'undefined'
                    && this.readyState === 'complete') {                     
                    if (typeof(_callback) === 'function') {
						_callback();
					}
                }
            };
            _script.onload = function () {              
                if (typeof(_callback) === 'function') {
                    setTimeout(function () {
                        _callback();    
                    }, 0);
                }
            };
            
            if (_head !== undefined) {
                _head.appendChild(_script);
            }
        }
    }
    return this;
};

/**
 * 同時讀取指定的所有script，並在完全完成之後呼叫callback。
 * @param {Array} _script_list
 * @param {Function} _callback
 */
this.load_scripts = function (_script_list, _callback, _is_libraries) {
    var _loaded = [];
    
    var _check_complete = function (_script) {
        if (typeof(_script) === 'undefined'
            || _script === ''
            || $.inArray(_script, _loaded) > -1) {
            return this;
        }
        
        //console.log(["load_scripts", _script]);
        _loaded.push(_script);
        
        if (_loaded.length === _script_list.length) {
            if (typeof(_callback) === 'function') {
                _callback();
            }
        }
    };
    
    var _base_url = this.get_base_url();
    if (typeof(_is_libraries) === "boolean" 
            && _is_libraries === true) {
        _base_url = this.get_libraries_url();
    }
    
    if (typeof(_script_list) === 'string') {
        _script_list = [_script_list];
    }
    
    for (var _i in _script_list) {
        var _script_url = _base_url + _script_list[_i];
        
        //console.log('[KALS] start load: '+_script_url);
        $.getScript(_script_url, function () {
            _check_complete(_script_url);
        });           
    }
    return this;
};

/**
 * 同時讀取指定的所有images，並在完全完成之後呼叫callback。
 * @param {Array} _images_list
 * @param {Function} _callback
 */
this.load_images = function (_images_list, _callback, _is_libraries) {
    var _loaded = [];
    
    var _check_complete = function (_script) {
        if (typeof(_script) === 'undefined'
            || _script === ''
            || $.inArray(_script, _loaded) > -1) {
            return this;
        }
        
        //console.log(["load_scripts", _script]);
        _loaded.push(_script);
        
        if (_loaded.length === _images_list.length) {
            if (typeof(_callback) === 'function') {
                _callback();
            }
        }
    };
    
    var _base_url = this.get_base_url();
    if (typeof(_is_libraries) === "boolean" 
            && _is_libraries === true) {
        _base_url = this.get_libraries_url();
    }
    
    if (typeof(_images_list) === 'string') {
        _images_list = [_images_list];
    }
    
    for (var _i in _images_list) {
        var _url = _base_url + _images_list[_i];
        
        //console.log('[KALS] start load image: '+_url);
        $.get(_url, function () {
            _check_complete(_url);
        });           
    }
    return this;
};

/**
 * 以插入標籤的方式讀取JavaScript
 * @param {Array|String} _script_list
 * @param {Function} _callback
 * @param {Boolean} _is_libraries
 * @returns {KALS_loader_class}
 */
this.insert_scripts = function (_script_list, _callback, _is_libraries) {
    
    var _base_url = this.get_base_url();
    if (typeof(_is_libraries) === "boolean" 
            && _is_libraries === true) {
        _base_url = this.get_libraries_url();
    }
    
    var _thread = _script_list.length;
    var _loaded_count = 0;
    
    var _loaded = false;
    
    var _head = $('head');
    
    for (var _i in _script_list) {
        var _script_url = _base_url + _script_list[_i];
        console.log(_script_url);
        //var _script_tag = $('<script type="text/javascript" src="' + _script_url + '"></script>');
        //_script_tag.appendTo(_head);
        var _s = document.createElement("script");
        _s.type = "text/javascript";
        _s.src = _script_url;
        // Use any selector
        //console.log($(_s).html());
        //_head.append(_s);
        document.head.appendChild(_s);
       
       //console.log('[KALS] append script: ' + _script_url);
       //$.getScript(_script_url, function () {
       var _get_script_callback = function () {
           /**
            * @author Pulipuli Chen 20140428
            * 加上了讀取次數的改進
            */
           _loaded_count++;
           //if (_loaded === false) {
           //console.log(['[KALS] loaded script: ', _script_url, _loaded_count, _thread]);
           if (_loaded_count >= _thread) {
               if (typeof(_callback) === 'function') {
                    _callback();
               }
           }
           
           //_loaded = true;
       };
       
       $.ajax({
           dataType: "script",
           cache: true,
           url: _script_url,
           complete: _get_script_callback
       });
    }
    return this;
};

/**
 * 以插入style標籤的方式讀取CSS
 * @param {Array} _style_list
 * @param {Function} _callback
 * @returns {KALS_loader_class}
 */
this.load_styles = function (_style_list, _callback) {
    var _loaded = [];
    var _check_complete = function (_style) {
        if (typeof(_style) === 'undefined' ||
            $.inArray(_style, _loaded) > -1) {
            return;
        }
        
        _loaded.push(_style);
        if (_loaded.length >= _style_list.length) {
            if (typeof(_callback) === 'function') {
                _callback();
            }
        }
    };
    
    var _base_url = this.get_base_url();
    //_base_url = _base_url + '/load_css/';
    
    if (typeof(_style_list) === 'string') {
        _style_list = [_style_list];
    }
    
    for (var _i in _style_list) {
        var _style_data = _style_list[_i];
        var _style_url = null;
        var _style_title = null;
        
        var _pos = _style_data.lastIndexOf('|');
        if (_pos > -1) {
            _style_url = _style_data.substr(0, _pos);
            _style_title = _style_data.substring(_pos + 1, _style_data.length);
        }
        else {
            _style_url = _style_data;
        }
        
        var _style = _base_url + _style_url;
            
        //檢查一下是否已有該title
        var _link = null;
        if (_style_title !== null) {
            _link = $('link[type="text/css"][rel="stylesheet"][title="' + _style_title + '"]');
            if (_link.length === 0) {
                _link = $('<link type="text/css" rel="stylesheet" href="' + _style + '" />').appendTo($('head'));
            }
            else {
                _link.attr('href', _style);
            }
        }
        else {
            _link = $('<link type="text/css" rel="stylesheet" href="' + _style + '" />').appendTo($('head'));
        }
        
        _link.attr('onreadystatechange', function () {
                if (this.readyState === 'complete') {
                    _check_complete(this.href);
                }
            })
            .attr('onload', function () {
                _check_complete(this.href);
            });
            
        if (_style_title !== null) {
            _link.attr('title', _style_title);
        }
    }
    return this;
};

/**
 * 讀取指定的資料
 * @param {JSON} _libraries 舉例：
 * var _toolkit_libraries = {
 *     libraries_list: [
 *         "libraries/ckeditor/adapters/jquery.js"
 *     ],
 *     style_list: _prefix+'style|generic'
 * };
 * @param {Function} _callback
 * @returns {KALS_loader_class}
 */
this.load_libraries = function (_libraries, _callback) {
    var _loaded = 0;
    var _threshold = 0;
    var _complete = function () {
        
        //console.log(["load_lib complete", _loaded, _threshold]);
        if (_loaded === -1) {
            return;
        }
        _loaded++;
        
        if (_loaded >= _threshold && _loaded !== -1) {
            _loaded = -1;
            if (typeof(_callback) === 'function') {
                _callback();
            }
        }
    };
    
    if (typeof(_libraries.script_list) !== 'undefined') {
        _threshold++;
    }
    if (typeof(_libraries.style_list) !== 'undefined') {
        _threshold++;
    }
    if (typeof(_libraries.libraries_list) !== 'undefined') {
        _threshold++;
    }
    //console.log("[KALS] 有image嗎？" + typeof(_libraries.images_list));
    if (typeof(_libraries.images_list) !== 'undefined') {
        _threshold++;
    }
    // 在此處開始執行
    
    var _this = this;
    
    //如果有libraries_list的話，則先讀取libraries_list，再讀其他
    if (typeof(_libraries.libraries_list) !== 'undefined') {
        this.insert_scripts(_libraries.libraries_list, function () {
            setTimeout(function () {
                
                if (typeof(_libraries.script_list) !== 'undefined') {
                    _this.load_scripts(_libraries.script_list, function () {
                        _complete();
                    });
                }
                if (typeof(_libraries.style_list) !== 'undefined') {   
                    _this.load_styles(_libraries.style_list, function () {
                        _complete();
                    });
                }
                if (typeof(_libraries.images_list) !== 'undefined') {
                    _this.load_images(_libraries.images_list, function () {
                        _complete();
                    }, true);
                }
            
            }, 0);    //setTimeout(function () {
            
            _complete();
            
        }, true);
    }
    else {
        if (typeof(_libraries.script_list) !== 'undefined') {
            _this.load_scripts(_libraries.script_list, function () {
                _complete();
            });
        }
        if (typeof(_libraries.images_list) !== 'undefined') {
            _this.load_images(_libraries.images_list, function () {
                _complete();
            }, true);
        }
        if (typeof(_libraries.style_list) !== 'undefined') {   
            _this.load_styles(_libraries.style_list, function () {
                _complete();
            });
        }
    }
    
    return this;
};

/**
 * 依序讀取JS程式檔
 */
this.load_scripts_orderly = function (_scripts, _callback) {
    
    var _script = _scripts[0];
    
    var _base_url = this.get_base_url();
    //_script = _base_url + _script;
    
    var _other_scripts = [];
    //console.log('[KALS] load script:' + _script);
    for (var _i = 0; _i < _scripts.length; _i++) {
        _other_scripts[(_i-1)] = _scripts[_i];
    }
        
    //console.log('[KALS] _other_scripts length:' + _other_scripts.length);
    
    //this.load_scripts([_script], function () {
    this.insert_scripts([_script], function () {
        var _this = this;
        if (_other_scripts.length > 0) {
            _this.load_scripts_orderly(_other_scripts, _callback);
        }
        else {
            _callback();
        }
    }, false); 
};

/**
 * Setup完畢之後，接下來要開始跟伺服器取得資料，進行初始化。
 */
this.initialize = function (email) {
    
};

/**
 * 初始化完畢、也取得伺服器資料之後，接下來就進行更進一步的設置。
 */
this.ready = function () {

};

/**
 * 上述工作完成之後，最後的設定。
 */
this.complete = function () {

};

    // --------
    return this;
}    //function KALS_loader_class() {

setTimeout(function () {
    var KALS_loader = KALS_loader_class();
    KALS_loader.load();
}, 0);

/* End of file KALS_loader */
/* Location: ./libraries/core/KALS_loader.js */