/**
 * Init_context
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
    
    this._$schedule_task = ['selector', 'load'];
    
}

Init_context.prototype = new Task_event_dispatcher();

Init_context.prototype._$onstart = function () {
    //KALS_context資料的讀取
    
    //$.test_msg('Init_context._$onstart()');
    
    //準備基本資料
    KALS_context.load_info(function () {
        KALS_context.init_context.complete('load');
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


/* End of file Init_context */
/* Location: ./system/application/views/web_apps/Init_context.js */