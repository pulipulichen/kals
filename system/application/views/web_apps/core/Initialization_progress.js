/**
 * Initialization_progress
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2013/12/27 下午 08:10:10
 * @extends {Event_dispatcher}
 */
function Initialization_progress() {
    
    Event_dispatcher.call(this);
    
    this._start_timestamp = (new Date()).getTime();
}

/**
 * 繼承自Task_event_dispatcher
 */
Initialization_progress.prototype = new Event_dispatcher();

/**
 * 開始時間
 * @type Number
 */
Initialization_progress.prototype._start_timestamp;

/**
 * 記數
 * @type Number
 */
Initialization_progress.prototype._progress_count = 0;

/**
 * 最大數量
 * @type Number
 */
Initialization_progress.prototype._progress_total = 0;

/**
 * 最後一次計算時的進度百分比
 * @type Number
 */
Initialization_progress.prototype._last_progress_percent = 0;

/**
 * 要顯示的最小底限百分比
 * @type Number
 */
Initialization_progress.prototype._display_min_percent = 0;

/**
 * 要顯示的最大底限百分比，超過這個百分比就先等待finish完成
 * @type Number
 * @deprecated 使用_slow_rate
 */
Initialization_progress.prototype._display_max_percent = 99;

/**
 * 增加速率變緩
 * @type Number
 */
Initialization_progress.prototype._slow_rate = 0.8;

/**
 * 是否已經完成
 * @type Boolean
 */
Initialization_progress.prototype._is_finished = false;

/**
 * 設定總數
 * @param {number} _total
 * @returns {Initialization_progress}
 */
Initialization_progress.prototype.set_total = function (_total) {
    
    if (_total > this._progress_total) {
        this._progress_total = _total;
    }
    
    return this;
};

/**
 * 增加記數
 * @param {Int} _count 額外增加的次數，預設是加1次
 * @returns {Initialization_progress.prototype}
 */
Initialization_progress.prototype.add_count = function (_count) {
    
    if (_count === undefined 
            || $.is_number(_count) === false) {
        _count = 1;
    }
    this._progress_count = this._progress_count + _count;
    
    var _percent = this.get_percent();
    
    if (_percent > this._display_min_percent && 
            _percent > this._last_progress_percent) {
        
        if (_percent > this._display_max_percent) {
            //超過比例，那就不做任何事情
            //$.test_msg("init progress: over max percent", this.get_percent(true));
        }
        else {
            //$.test_msg("init progress", this.get_percent(true));
            this.notify_listeners();    //通知大家改變了
        }
        
        this._last_progress_percent = _percent;
    }
    
    return this;
};

/**
 * 輸出百分比
 * @param {boolean} _with_unit 是否伴隨「%」符號，預設是false只顯示數字
 * @returns {String|Number}
 */
Initialization_progress.prototype.get_percent = function (_with_unit) {
    
    var _percent = 0;
    
    if (this._is_finished === true) {
        _percent = this._display_max_percent;
    }
    else if (this._progress_total !== 0) {
        // 計算
        _percent = (this._progress_count / this._progress_total) * 100;
        
        _percent = _percent * this._slow_rate;
        
        _percent = parseInt( _percent, 10 );
        
        
        if (_percent > this._display_max_percent) {
            _percent = this._display_max_percent;
        }
    }
    
    // 輸出
    if (_with_unit !== undefined && _with_unit === true) {
        return _percent + "%";
    }
    else {
        return _percent;
    }
    
};

/**
 * 設定已完成
 * @returns {Initialization_progress}
 */
Initialization_progress.prototype.set_finished = function () {
    this._is_finished = true;
    
    this.notify_listeners();    //通知大家改變了
    
    // 計算耗費時間
    var _timestamp = (new Date()).getTime();
    var _cost = _timestamp - this._start_timestamp;
    
    _cost = parseInt(_cost / 60, 10);    
    $.test_msg("init progress finished", _cost);
    
    return this;
};

/* End of file Initialization_progress */
/* Location: ./system/application/views/web_apps/Initialization_progress.js */