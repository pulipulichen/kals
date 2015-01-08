/**
 * Task_event_dispatcher
 * 
 * 可以設定很多任務，然後任務完成時，再觸發事件
 * 
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/12 下午 07:39:25
 * @extends {Event_dispatcher}
 */
function Task_event_dispatcher(_onstart, _oncomplete) {
    
    Event_dispatcher.call(this);
    
    this._$schedule_task = [];
    this._task_state = {};
    this.completed = false;
    
    if ($.is_function(_onstart)) {
        this._$onstart = _onstart;
    }
    
    if ($.is_function(_oncomplete)) {
        this._$oncomplete = _oncomplete;
    }
}

Task_event_dispatcher.prototype = new Event_dispatcher();

/**
 * 預定要做的任務名稱
 * @type {Array}
 * @example ['task1', 'task2', 'task3']
 */
Task_event_dispatcher.prototype._$schedule_task = [];

/**
 * 任務狀態。在執行reset()之後，會成設定下面的範例
 * @example {
 *     task1: false,
 *     task2: false,
 *     task3: false
 * }
 */
Task_event_dispatcher.prototype._task_state = {};

/**
 * 任務完成之後呼叫監聽者的method名稱
 * @type {string}
 */
Task_event_dispatcher.prototype._$event_name = 'complete';

/**
 * 任務完成之後的呼叫函式
 * @type {funciton}
 */
Task_event_dispatcher.prototype._$oncomplete = null;

/**
 * 設定完成之後的動作
 * @param {function} _oncomplete
 */
Task_event_dispatcher.prototype.set_oncomplete = function (_oncomplete) {
    this._$oncomplete = _oncomplete;
    return this;
};

/**
 * 開始進行任務時呼叫的函式
 * @type {function}
 */
Task_event_dispatcher.prototype._$onstart = null;

/**
 * 設定開始的動作
 * @param {function} _onstart
 */
Task_event_dispatcher.prototype.set_onstart = function (_onstart) {
    this._$onstart = _onstart;
    return this;
};

/**
 * 標註是否已經完成
 * @type {boolean}
 */
Task_event_dispatcher.prototype.completed = false;

/**
 * 設定任務_task完成
 * @param {string} _task
 * @param {boolean} _boolean
 */
Task_event_dispatcher.prototype.complete = function(_task, _boolean) {
    //$.test_msg('檢查任務', _task);
    //$.test_msg('目前所有任務', this._$schedule_task);
    
    var _this = this;
    
    setTimeout(function () {
        
        if ($.is_null(_task)) {
            return;
        }
        if ($.is_null(_boolean)) {
            _boolean = true;
        }
            
        if (_this._task_state === null) {
            _this.reset();
        }
        
        if ($.inArray(_task, _this._$schedule_task) > -1) {
            //$.test_msg('設定任務', [_task, _boolean]);
            _this._task_state[_task] = _boolean;
        }
        
        if (_this.completed === true) {
			return; //表示全部已經完成
		}
        
        //$.test_msg('是否完成全部任務', [_task, _this.is_completed(), '[', _this._$schedule_task, ']']);
        if (_this.is_completed()) {
            $(function () {
                _this.notify_listeners();
                if ($.is_function(_this._$oncomplete)) {
                    _this._$oncomplete();
                    
                    _this.completed = true;
                }
            });   
                
        }
        
    }, 0);
    
    return this;
};

/**
 * 將所有任務的狀態設置為未完成
 */
Task_event_dispatcher.prototype.reset = function() {
    
    this._task_state = {};
    for (var _t in this._$schedule_task) {
        var _task = this._$schedule_task[_t];
        this._task_state[_task] = false;
    }
    
    this.completed = false;
    return this;
};

/**
 * 確認任務是否完成
 * 
 * 如果沒有輸入_task，則確認是否全部任務都已經完成
 * @param {string} _task
 */
Task_event_dispatcher.prototype.is_completed = function (_task) {
    
    if (this._task_state === null) {
        return false;
    }
    
    if ($.isset(_task)) {
        if (typeof(this._task_state[_task]) === 'undefined') {
            return false;
        }
        else {
            return this._task_state[_task];
        }
    }
    else {
        for (var _t in this._$schedule_task) {
            _task = this._$schedule_task[_t];
            if (typeof(this._task_state[_task]) === 'undefined') {
                return false;
            }
            else if (false === this._task_state[_task]) {
                return false;
            }
        }   //for (var _t in this._$schedule_task) {
        return true;
    }
};

/**
 * 開始進行任務
 * @param {Function} _callback
 * @author Pulipuli Chen 20141109
 */
Task_event_dispatcher.prototype.start = function (_callback) {
    if ($.is_function(this._$onstart)) {
        var _this = this;
        //隔一下再開始進行
        setTimeout(function () {
            _this._$onstart();
            
            if ($.is_function(_this._$oncomplete) === false) {
                _this._$oncomplete = _callback;
            }
        }, 0);
    }
        
    return this;
};

/* End of file Task_event_dispatcher */
/* Location: ./system/application/views/web_apps/Task_event_dispatcher.js */