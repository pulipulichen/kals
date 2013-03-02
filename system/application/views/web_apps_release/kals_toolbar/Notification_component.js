/**
 * Notification_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 09:43:35
 * @extends {KALS_user_interface}
 */
function Notification_component() {
    
    KALS_user_interface.call(this);
    
    var _this = this;
    KALS_context.auth.add_listener(function (_auth, _data) {
        //如果有登入，則開始設置檢查
        _this._set_interval_check(_data.logined);
    });
}

// Extend from KALS_user_interface
Notification_component.prototype = new KALS_user_interface();

/**
 * Create UI
 * @memberOf {Notification_component}
 * @type {jQuery} UI
 */
Notification_component.prototype._$create_ui = function ()
{
    var _ui = $('<div><div class="unread"></div></div>')
        .addClass('notification-component');
    
    return _ui;
};

Notification_component.prototype.get_unread = function () {
    
    var _unread = this.get_ui('.unread:first').html();
    
    if (_unread === '') {
		_unread = 0;
	}
	else {
		_unread = parseInt(_unread,10);
	}
    return _unread;
};

/**
 * 設定未讀的數量
 * @param {number|null} _unread 在null的情況下，會移除has-unread的classname
 */
Notification_component.prototype.set_unread = function (_unread) {
    
    if (_unread === null)
    {
        _unread = 0;
    }
    
    var _unread_div = this.get_ui('.unread:first');
    
    var _has_unread_classname = 'has-unread';
    if (_unread === 0)
    {
        this.add_class(_has_unread_classname);
        _unread_div.empty();
    }
    else
    {
        this.add_class(_has_unread_classname);
        _unread_div(_unread);
    }
    
    return this;
};

Notification_component.prototype.reset_unread = function () {
    return this.set_unread();
};

Notification_component.prototype.has_unread = function () {
    return (this.get_unread() !== 0);
};

/**
 * 減少unread的數量
 * @param {number|null} _reduce = 1
 */
Notification_component.prototype.reduce_unread = function (_reduce) {
    
    if (_reduce === null) {
		_reduce = 1;
	}
        
    var _unread = this.get_unread();
    if (_reduce > _unread) {
		_unread = 0;
	}
	else {
		_unread = _unread - _reduce;
	}
    
    return this.set_unread(_unread);
};

Notification_component.prototype.toggle_hover = function (_is_hover) {
    
    var _ui = this.get_ui();
    
    var _hover_classname = 'hover';
    if (_is_hover === null) {
		_ui.toggleClass(_hover_classname);
	}
	else 
		if (_is_hover) {
			_ui.addClass(_hover_classname);
		}
		else {
			_ui.removeClass(_hover_classname);
		}
    
};

// --------
// 自動確認的相關設定
// --------

/**
 * 設定是否開始進行間隔確認
 * @param {boolean} _excute = true 執行或停止
 */
Notification_component.prototype._set_interval_check = function (_excute) {
    
    if (_excute === null)
    {
        _excute = true;
    }
    
    if (_excute === true)
    {
        var _this = this;
        this._interval_checker = setInterval(function () {
            
            _this.load_unread();
            
        }, this._interval_time);
        this.load_unread();
    }
    else
    {
        clearInterval(this._interval_checker);
        this._interval_checker = null;
    }
    return this;
};

/**
 * 間隔確認的記錄物件
 */
Notification_component.prototype._interval_checker = null;

/**
 * 間隔確認的時間，預設是5分鐘
 * @type {number}
 */
Notification_component.prototype._interval_time = 1000 * 60 * 5;

// --------
// 讀取未讀資料
// --------

Notification_component.prototype._$load_url = 'notification/count_unread';

Notification_component.prototype.load_unread = function (_callback) {
    
    var _this = this;
    KALS_util.ajax_get({
        url: this._$load_url,
        callback: function (_data) {
            _this.set_unread(_data);
            $.trigger_callback(_callback);
        }
    });
    
    return this;
};

/* End of file Notification_component */
/* Location: ./system/application/views/web_apps/Notification_component.js */