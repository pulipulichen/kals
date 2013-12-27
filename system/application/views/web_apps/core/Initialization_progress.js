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
 * @extends {Task_event_dispatcher}
 */
function Initialization_progress() {
    
    Task_event_dispatcher.call(this);
    
}

/**
 * 繼承自Task_event_dispatcher
 */
Initialization_progress.prototype = new Task_event_dispatcher();

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
 * @returns {Initialization_progress.prototype}
 */
Initialization_progress.prototype.add_count = function () {
    this._progress_count++;
    
    $.test_msg("init progress", this.get_percent(true));
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
        _percent = 100;
    }
    else if (this._progress_total !== 0) {
        // 計算
        _percent = (this._progress_count / this._progress_total) * 100;
        _percent = parseInt( _percent, 10 );
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
    
    $.test_msg("init progress finished", this.get_percent(true));
    return this;
};

/* End of file Initialization_progress */
/* Location: ./system/application/views/web_apps/Initialization_progress.js */