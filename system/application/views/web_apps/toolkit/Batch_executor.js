/**
 * Batch_executor
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2013/12/28 下午 08:10:10
 * @extends {Event_dispatcher}
 * @param {Number} _threshold 批次執行的次數
 */
function Batch_executor(_threshold) {
    
    Event_dispatcher.call(this);
    
    if (_threshold !== undefined) {
        this.set_batch_threshold(_threshold);
    }
}

/**
 * 繼承自Task_event_dispatcher
 */
Batch_executor.prototype = new Event_dispatcher();

/**
 * 批次執行的次數
 * @type Number
 */
Batch_executor.prototype._batch_threshold = 100;

/**
 * 設定批次執行的次數
 * @param {Number} _threshold
 * @returns {Batch_executor}
 */
Batch_executor.prototype.set_batch_threshold = function (_threshold) {
    if ($.is_number(_threshold)) {
        this._batch_threshold = _threshold;
    }
    return this;
};

/**
 * 執行task的任務清單
 * @type Array
 */
Batch_executor.prototype._task_queue = [];

/**
 * 新增任務
 * @param {function} _task
 * @returns {Batch_executor}
 */
Batch_executor.prototype.add_task = function (_task) {
    if ($.is_function(_task)) {
        this._task_queue.push(_task);
        
        if (this._task_queue.length % this._batch_threshold === 0) {
            this.excute();
        }
    }
    return this;
};

/**
 * 執行並清空任務列
 * @returns {Batch_executor}
 */
Batch_executor.prototype.excute = function () {
    if (this._task_queue.length > 0) {
        for (var _i in this._task_queue) {
            var _task = this._task_queue[_i];
            if ($.is_function(_task)) {
                _task();
            }
        }
        
        this.clear_task();
    }
    
    return this;
};

/**
 * 清除任務
 * @returns {Batch_executor}
 */
Batch_executor.prototype.clear_task = function () {
    this._task_queue = [];
    return this;
};

/* End of file Batch_executor */
/* Location: ./system/application/views/web_apps/Batch_executor.js */