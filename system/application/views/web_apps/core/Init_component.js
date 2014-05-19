/**
 * Init_component
 *
 * 初始化第二步驟
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
function Init_component (_onstart, _oncomplete) {
    
    Task_event_dispatcher.call(this, _onstart, _oncomplete);
    
    this._$schedule_task = [
        'KALS_toolbar', 
        'KALS_text', 
        'KALS_window', 
        'site_reform',
        'modules_config',
        "webpage_info"
    ];
}

Init_component.prototype = new Task_event_dispatcher();

/**
 * 初始化所有元件，包括KALS_window、KALS_toolbar、KALS_text等，並以全域變數型態設置。
 */
Init_component.prototype._$onstart = function () {
    
    if (this._is_ie6) {
        /*
        var _line = new KALS_language_param(
            'This browser cannot use KALS, but you still can read this page.',
            'init_component.excute_confirm.deny_ie6'
        );
        var _msg = KALS_context.lang.line(_line);
        alert(_msg);
        return;
        */
        return this.deny_ie6();
    }
    
    var _this = this;
    
    // 執行Site_reform
    KALS_context.site_reform.reform(function () {
        _this.complete('site_reform');
    });
        
    //初始化時大概是這項這樣子的
    //KALS_toolbar = new KALS_toolbar(); 
    KALS_window = new KALS_window(); 
    //KALS_context.init_component.complete('KALS_window');
    
    KALS_toolbar = new KALS_toolbar();    
    //KALS_context.init_component.complete('KALS_toolbar');
        
    //KALS_text = new KALS_text();
    
    //$.test_msg('Init_component.$onstart()');
    if ($.browser.msie) {
        //this.excute_confirm();
    }
    
    KALS_context.loader.load_modules_config(function () {
        _this.complete("modules_config");
    });
    
    /**
     * @version 20140519 Pulipuli Chen
     */ 
    KALS_context.loader.load_webpage_info(function () {
        _this.complete("webpage_info");
        KALS_text = new KALS_text();
    });
    
    $(function() {
        KALS_context.feedback.init();
    });
    
};

Init_component.prototype._is_ie6 = ($.browser.msie && $.browser.version.substr(0,1) < 7);

Init_component.prototype._$oncomplete = function () {
    //$.test_msg('Init_component.$oncomplete()');
    
    /**
     * 根據頁面條件，強制調整網頁的樣式
     * 
     * 但是應該寫成獨立物件
     * @20131113 Pulipuli Chen
     * @deprecated 20131227 寫成了Site_reform，所以不使用這個了
     */
    //KALS_text.style_adapter();

    //this._check_css_loaded();

    KALS_context.init_profile.start();
};

Init_component.prototype.excute_confirm = function (_excute_callback) {
    
    
    var _heading = new KALS_language_param(
        'Browser Information',
        'init_component.excute_confirm.heading'
    );
    
    var _content = $('<div></div>')
        .addClass('init-component')
        .addClass('excute-confirm');
    
    var _browser_detect = $('<div></div>')
        .appendTo(_content);
        
    KALS_context.lang.create_listener(new KALS_language_param(
        'Your browser is ',
        'init_component.excute_confirm.browser_detect.1'
    )).appendTo(_browser_detect);
    
    var _browser = $('<span></span>')
        .addClass('browser')
        .html(navigator.appName + ' ' + $.browser.version)
        .appendTo(_browser_detect);
    
    KALS_context.lang.create_listener(new KALS_language_param(
        '.',
        'init_component.excute_confirm.browser_detect.2'
    )).appendTo(_browser_detect);
    
        var _hint = $('<div></div>')
            .appendTo(_content);
        
        KALS_context.lang.add_listener(_hint, new KALS_language_param(
            'This browser cannot get well performance on KALS. It will loading with very long time.',
            'init_component.excute_confirm.deny'
        ));
    
    var _recommend_browser = $('<div></div>')
        .appendTo(_content);
    
    KALS_context.lang.create_listener(new KALS_language_param(
        'If you want to use KALS with high performance, we recommend you use ',
        'init_component.excute_confirm.recommend_browser.1'
    )).appendTo(_recommend_browser);
    
    var _browser_name = $('<a href="http://www.google.com/chrome/" target="chrome"></a>')
        .addClass('recommend-browser')
        .appendTo(_recommend_browser);
        
    KALS_context.lang.add_listener(_browser_name, new KALS_language_param(
        'Google Chrome',
        'init_component.excute_confirm.recommend_browser.google_chrome'
    ));
    
    KALS_context.lang.create_listener(new KALS_language_param(
        '.',
        'init_component.excute_confirm.recommend_browser.2'
    )).appendTo(_recommend_browser);
    
    var _options_list = [];
    
    
    
        var _option_excute = new Dialog_close_option(new KALS_language_param(
            'I still want to use KALS with this browser.',
            'init_component.excute_confirm.excute'
        ), _excute_callback);
        
        var _option_exit = new Dialog_close_option(new KALS_language_param(
            'I don\'t want to use KALS, just read this page.',
            'init_component.excute_confirm.exit'
        ), function () {
            
            //隱藏KALS_toolbar
            KALS_toolbar.disable();
            KALS_text.selection.text.stop_initialize();
            
        });
        
        _options_list.push(_option_excute);
        _options_list.push(_option_exit);
    
    var _alert = KALS_util.select_menu({
        heading: _heading,
        content: _content,
        options: _options_list,
        heading_close: false
    });
    
    KALS_context.init_profile.add_listener(function () {
        _alert.close();
    });
};

Init_component.prototype.deny_ie6 = function () {
    
    var _heading = new KALS_language_param(
        'Browser Information',
        'init_component.excute_confirm.heading'
    );
    
    var _content = $('<div></div>')
        .addClass('init-component')
        .addClass('excute-confirm');
    
    var _browser_detect = $('<div></div>')
        .appendTo(_content);
        
    KALS_context.lang.create_listener(new KALS_language_param(
        'Your browser is ',
        'init_component.excute_confirm.browser_detect.1'
    )).appendTo(_browser_detect);
    
    var _browser = $('<span></span>')
        .addClass('browser')
        .html(navigator.appName + ' ' + $.browser.version)
        .appendTo(_browser_detect);
    
    KALS_context.lang.create_listener(new KALS_language_param(
        '.',
        'init_component.excute_confirm.browser_detect.2'
    )).appendTo(_browser_detect);
    
    
        var _hint = $('<div></div>')
            .appendTo(_content);
        
        KALS_context.lang.add_listener(_hint, new KALS_language_param(
            'This browser cannot use KALS, but you still can read this page.',
            'init_component.excute_confirm.deny_ie6'
        ));
    
    var _recommend_browser = $('<div></div>')
        .appendTo(_content);
    
    KALS_context.lang.create_listener(new KALS_language_param(
        'If you want to use KALS with high performance, we recommend you use ',
        'init_component.excute_confirm.recommend_browser.1'
    )).appendTo(_recommend_browser);
    
    var _browser_name = $('<a href="http://www.google.com/chrome/" target="chrome"></a>')
        .addClass('recommend-browser')
        .appendTo(_recommend_browser);
        
    KALS_context.lang.add_listener(_browser_name, new KALS_language_param(
        'Google Chrome',
        'init_component.excute_confirm.recommend_browser.google_chrome'
    ));
    
    KALS_context.lang.create_listener(new KALS_language_param(
        '.',
        'init_component.excute_confirm.recommend_browser.2'
    )).appendTo(_recommend_browser);
    
    var _options_list = [];
    
        
        var _option_exit = new Dialog_close_option(new KALS_language_param(
            'OK',
            'window.ok'
        ));
        
        _options_list.push(_option_exit);
    
    var _alert = KALS_util.select_menu({
        heading: _heading,
        content: _content,
        options: _options_list
    });
    
};

/* End of file Init_component */
/* Location: ./system/application/views/web_apps/Init_component.js */