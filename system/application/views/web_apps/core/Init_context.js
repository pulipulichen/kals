/**
 * Init_context
 * 
 * 初始化第一步驟
 * 
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/3 下午 07:08:28
 * @extends {Task_event_dispatcher}
 * @param {function|null} _onstart 開始動作 
 * @param {function|null} _oncomplete 所有任務都完成之後的動作
 */
function Init_context() {
    
    Task_event_dispatcher.call(this);
    
    this._$schedule_task = ['selector', 'load', "check_css_loaded"];
    
}

Init_context.prototype = new Task_event_dispatcher();

Init_context.prototype._$onstart = function () {
    //KALS_context資料的讀取
    
    //$.test_msg('Init_context._$onstart()');
    
    //準備基本資料
    KALS_context.load_info(function () {
        
        var _loaded_modules = KALS_context.module.init();
        KALS_context.navigation.init(_loaded_modules);
        
        KALS_context.init_context.complete('load');
    });
    
    var _this = this;
    $(function () {
       _this._check_css_setup();	
    });
};

Init_context.prototype._$oncomplete = function () {
    
    KALS_context.init_component.start();
    
    // 20131115 Pulipuli Chen 測試用
    //this._test_exception();
};

/**
 * 測試錯誤訊息
 * 沒用的話就可以關閉
 */
Init_context.prototype._test_exception = function () {
	$.test_msg("初始化完成");
    KALS_util.ajax_get({
        url: "log/error",
        data: {},
        retry: 1,
        retry_wait: 1000
    });
};

Init_context.prototype._check_css_setup = function () {
	$("<span class='KALS check-css'>KALS check css indicator<span>")
	   .hide()
	   .appendTo($("body"));
   
   this._check_css_loaded();
};

/**
 * 檢測CSS是否有正常讀取
 */
Init_context.prototype._check_css_loaded = function () {
    
    var _ui = $(".KALS.check-css");
    var _color = _ui.css("color");
    var _normal_color = "rgb(128, 128, 128)";
    var _assert = (_color === _normal_color);
	
	//$.test_msg("check css load", [_color, _normal_color, _assert]);
	
    
    if (_assert === false) {
    
        if (this._retry_check_css_count > 3) {
            var _message = KALS_context.lang.line("exception.css_not_load_complete");
            
            if (window.confirm(_message)) {
                location.reload();
            }
        }
        else {
            $.test_msg("css check faild, retry", this._retry_check_css_count);
            
            var _prefix = "generic/";
            var _style_list = _prefix+'style|generic';
            
            var _this = this;
            var _KALS_loader = KALS_loader_class();
            setTimeout(function () {
                $("head link[title='generic']").remove();
                _KALS_loader.load_styles(_style_list, function () {
                    _this._check_css_loaded();
                });
            }, 3000);
                
            
            this._retry_check_css_count = this._retry_check_css_count + 1;
            
            return;
        }
    }
    else {
		/*
        if (this._retry_check_css_count > 0) {
            //location.reload();
            //$(window).trigger('resize');
            KALS_toolbar._$onviewportmove();
        }
        */
        KALS_context.init_context.complete('check_css_loaded');
    }
    
    return _assert;
};

/**
 * 確認CSS正常讀取的次數
 */
Init_context.prototype._retry_check_css_count = 0;   


/* End of file Init_context */
/* Location: ./system/application/views/web_apps/Init_context.js */