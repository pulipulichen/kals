/**
 * Init_text
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/15 下午 04:55:55
 * @extends {Task_event_dispatcher}
 */
function Init_text(_onstart, _oncomplete) {
    
    Task_event_dispatcher.call(this, _onstart, _oncomplete);
    
    this._$schedule_task = [
        'Selection_manager',
        'Annotation_tool'
    ];
    
}

Init_text.prototype = new Task_event_dispatcher();

Init_text.prototype._$onstart = function () {
    
    //$.test_msg('Init_text._$onstart() is completed?', [this.is_completed(), this.completed]);
        
    KALS_text.selection.initialize();
    //KALS_text.init.complete('Selection_manager');
    
    //等CKEditor初始化完成之後才算是整個完成
    //KALS_text.init.complete('Annotation_tool');
};

/**
 * 完成時，呼叫KALS_context.init_component！
 */
Init_text.prototype._$oncomplete = function () {
    
    //$.test_msg('Init_text._$oncomplete()');
    
    KALS_context.init_component.complete('KALS_text');
    
};

/* End of file Init_text */
/* Location: ./system/application/views/web_apps/Init_text.js */