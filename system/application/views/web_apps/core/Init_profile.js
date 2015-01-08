/**
 * Init_profile
 *
 * 初始化最終步驟
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/12 下午 08:10:10
 * @extends {Task_event_dispatcher}
 * @param {function|null} _onstart 開始動作 
 * @param {function|null} _oncomplete 所有任務都完成之後的動作
 */
function Init_profile(_onstart, _oncomplete) {
    
    Task_event_dispatcher.call(this, _onstart, _oncomplete);
    
    this._$schedule_task = [
        'check_login', 
        'notification', 
        'navigation_annotation', 
        'my_style', 
        'hash'
    ];
}

Init_profile.prototype = new Task_event_dispatcher();

Init_profile.prototype._$onstart = function () {
    //KALS_context資料初始化之後，才能進行其他資料的讀取
    
    //$.test_msg('Init_profile._$onstart()');
    
    KALS_context.init_profile.complete('notification');
    
    //KALS_text.load_my_basic.initialize();
    //KALS_text.load_my_custom.initialize();
    KALS_text.load_my.initialize();
    
    //KALS_context.init_profile.complete('my_annotation');
    
    KALS_text.load_navigation.initialize();
    //KALS_context.init_profile.complete('navigation_annotation');
    
    // 因為My_style尚未實作，所以my_style直接算是完成
    KALS_context.init_profile.complete('my_style');
    
    
    //check_login是指去確認遠端伺服器上是否已經有登入的資料，如果有的話，則將現在狀況設為登入的狀況
    //KALS_context.init_profile.complete('check_login');
    //KALS_context.init_profile.complete('my_basic_annotation');    //因為登入之後就會自動讀取，所以此處不用去確認
    
    //$.test_msg('Init_profile.prototype._$onstart()');
    
    KALS_context.auth.check_login(function() {
        KALS_context.init_profile.complete('check_login');
        
        //$.test_msg('KALS_context.auth.check_login() callback');
        
        setTimeout(function () {
			
            KALS_context.hash.check_hash(function () {
                KALS_context.init_profile.complete('hash');
            });

            //@TODO 暫時先關掉
            //KALS_context.init_profile.complete('hash');
        }, 50);
            
    });
    
};

/**
 * 所有工作都讀取完成了
 * 最後只剩下測試而已了
 */
Init_profile.prototype._$oncomplete = function () {
    
    //2010.10.21 在Init_component時已經load了
    //KALS_context.load(function () {
        //KALS_context.completed = true;
        //$.test_msg('KALS_context.completed = true;');
    //});
    
    //KALS_context.completed = true;
    KALS_context.set_completed();

    // 以下啟動測試區
//    var _this = this;
//    setTimeout(function () {
//        for (var _t in _this._test) {
//            _this._test[_t]();
//        }	
//    }, 1000);
    if (typeof(KALS_CONFIG.debug.auto_run) === "object") {
        var _auto_run = KALS_CONFIG.debug.auto_run;
        setTimeout(function () {
            for (var _t in _auto_run) {
                if (typeof(_auto_run[_t]) === "function") {
                    $.test_msg("AUTORUN", _t);
                    _auto_run[_t]();
                }
            }	
        }, 1000);
    }
};

// --------------------------------
// 以下是讀取完成之後的測試區


/*
Init_profile.prototype._test_sentence_index = ;
*/

/**
 * 測試功能保存區
 * 
 * 不使用的時候就註解起來吧
 */
Init_profile.prototype._test = [
    /**
     * 第一個，不使用
     */
    function () {}
    /**
     * 測試CKeditor檔案上傳功能
     * @author 20140901 Pulipuli Chen
     */
//    , function () {
//        setTimeout(function () {
//            console.log($(".ckeditor.note-editor-ckeditor.Note_editor_ckeditor .cke_off cke_button_image").lenght);
//            $(".ckeditor.note-editor-ckeditor.Note_editor_ckeditor .cke_off cke_button_image").click();
//            
//            setTimeout(function () {
//                $(".cke_dialog_tabs *[title='上傳']").click();
//            }, 1000);
//        }, 3000);
//    }
    /**
     * 測試網頁暫存功能
     * @author Pulipuli Chen 20140517
     */
    /*
    , function () {
        //var _cache = KALS_context.module.load("Webpage_cache");
        var _cache = new Webpage_cache();
        
        var _select_text = "測試看看資料有沒有存進去";
        
        _cache.load(function (_data) {
            if (_data !== false) {
                $.test_msg("取得了資料：[" + _data + "]");
            }
            else {
                _cache.save(_select_text, function () {
                    $.test_msg("儲存完畢");
                    
                    setTimeout(function () {
                        location.reload();
                    }, 100);
                });
            }
        });
    }
    */
    /**
     * 測試網頁暫存功能草稿
     * @author Pulipuli Chen 20140517
     */
    /*
    , function () {
        
        var _save = function () {
            var _webpage_cache_save_url = "webpage_cache/save";
            var _cache_json = "<div>測試看看能不能正常儲存2</div>";
            var _callback = function () {
                $.test_msg("儲存完成，接著開始讀取");
                
                _load();
            };

            var _post_config = {
                url: _webpage_cache_save_url,
                data: _cache_json,
                callback: _callback
            };

            KALS_util.ajax_post(_post_config);
        };
        
        var _load = function () {
            var _webpage_cache_save_url = "webpage_cache/load/" + KALS_context.get_webpage_id();
            _webpage_cache_save_url = KALS_context.get_base_url(_webpage_cache_save_url);
            var _callback = function (_data) {
                _data = _remove_cache_prefix(_data);
                $.test_msg("讀取完成，資料：" + _data);
            };
            $.get(_webpage_cache_save_url, _callback);
        };
        
        var _remove_cache_prefix = function (_data) {
            // /*Content-type: text/html
            _data = $.substr(_data, 27);
            return _data;
        }
        
        //_save();
        _load();
    }
    */
    /**
     * 測試開啟獎章功能
     * @author Pulipuli Chen 20140516
     */
    /*
    , function () {
        var _module = KALS_context.module.load("KALS_stamp");
        _module.open();
    }
    */
    /**
     * 測試開啟標註地圖
     * @author Pulipuli Chen 20140428
     */
    /*
    , function () {
        var _map = KALS_context.module.load("Annotation_navigation_map");
        _map.open();
    }
    */
    /**
     * 測試KALS_moudle_manager的功能
     * @author Pulipuli Chen 20140428
     */
    /*
    , function () {
        var _module_manager = KALS_context.module;
        var _module = _module_manager.load("Annotation_navigation_map");
        
        $.test_msg("module", [typeof(_module), _module.enable, _module.ok]);
    }
    */
    /**
     * 測試導讀功能
     * @author Pulipuli Chen 20131230
     */
    /*
    , function () {
        //$.test_msg("如何？");
        //KALS_context.search.open_recent_annotation(function () {
        //    $(".button.dialog-option.guide-button").click();
        //});
        
        //KALS_text.guide.open_whole_annotations();
        //KALS_text.guide.open_whole_annotations_by_sentence();
        //KALS_text.guide.open_apriori_all();
        KALS_text.guide.open();
    }
    */
    /**
     * 測試樣板功能
     * @author Pulipuli Chen 20131117
     */
    /*
    , function () {
            //var _template = KALS_context.template.get_template('helpers/test');
            //$.test_msg('KALS_template', _template);

            //var _logout = new Window_logout();
            //_logout.open_window();

            var _window = new Dashboard();
            _window.open();
    }
    */
    /**
     * 測試意見回饋功能
     * @20131116 Pulipuli Chen
     */
    /*
    , function () {
            KALS_context.feedback.open();
    }
    */
    /**
     * 測試通知功能
     * @20131115 Pulipuli Chen
     */
	/*
	,function () {
		KALS_util.notify("要通知什麼好呢？", 3000);
		
		setTimeout(function () {
			KALS_util.notify("第二次要通知什麼好呢？", 10000);
		}, 1000);
		
		setTimeout(function () {
            KALS_util.notify("第三次通知！", 3000);
        }, 1500);
		
		setTimeout(function () {
            KALS_util.notify("隔很久的通知！", 1000);
        }, 6000);
	}
	*/
	/**
	 * @version 20130224 布丁測試用
	 */
	/*
    function () {
	    var _sentence_list = KALS_text.selection.text.get_sentence_index();
	    
	    var _php_array = 'new Array(';
	    for (var _i = 0; _i < _sentence_list.length; _i++)
	    {
	        if (_i != 0)
	            _php_array = _php_array + ',';
	        _php_array = _php_array + _sentence_list[_i];
	    }
	    _php_array = _php_array + ');';
	    
	    $.test_msg('count .kals-sentence-punctuation', $('.kals-sentence-punctuation').length);
	    $.test_msg('list .kals-sentence-punctuation', _sentence_list);
	    $.test_msg('list php array .kals-sentence-punctuation', _php_array);
	}
	*/
];


/* End of file Init_profile */
/* Location: ./system/application/views/web_apps/Init_profile.js */