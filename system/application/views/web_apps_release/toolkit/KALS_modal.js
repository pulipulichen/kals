/**
 * KALS_modal
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/26 下午 03:22:46
 * @extends {KALS_user_interface}
 */
function KALS_modal() {
    
    KALS_user_interface.call(this);
    
}

KALS_modal.prototype = new KALS_user_interface();
        
/**
 * 建立Modal的原形物件
 * @memberOf {KALS_modal}
 * @param {string|jQuery|null} _element = div 可以指定原形物件的標籤名稱
 * @type {jQuery}
 */
KALS_modal.prototype._$create_ui_prototype = function (_element) {
    
    var _ui;
    if ($.is_null(_element)) {
		_element = 'div';
	}
    
    if ($.is_string(_element)) {
        _ui = $('<' + _element + '></' + _element + '>');
    }
    else {
        _ui =  $(_element);
    }
    
    _ui.addClass(this.class_name)
        .hide()
        .appendTo($('body'));
    
    return _ui;
};

/**
 * 建立Modal的UI
 * @type {jQuery}
 */
KALS_modal.prototype._$create_ui = function () {
    return this._$create_ui_prototype();
};

/**
 * 可否關閉
 * @type {boolean}
 */
KALS_modal.prototype._$closable = true;

/**
 * 檢查是否可關閉
 * @type {boolean} = true
 */
KALS_modal.prototype.is_closable = function () {
    return this._$closable;
};

/**
 * 模組名稱
 * @type {string}
 * @property
 */
KALS_modal.prototype._$modal_name = null;

/**
 * KALS_modal統一會擁有的Class Name
 * @type {string}
 */
KALS_modal.prototype.class_name = 'kals-modal';

/**
 * 建立UI的動作
 * @private
 */
KALS_modal.prototype._setup_ui = function () {
    
    this._ui = this._$create_ui();
    
    if (this._$onviewportmove !== null
        && typeof(KALS_context) != 'undefined'
        && typeof(KALS_context.view) != 'undefined') {
        var _this = this;
        
        KALS_context.view.add_listener(function () {
            if (_this.has_setup_ui() && _this._ui.visible()) {
                _this._$onviewportmove(_this._ui);
            }
        });
    }
    
    return this;
};

/**
 * 設定Modal
 * @param {Object} _config = {
 *     modal_name: 'modal_name',
 *     closable: true,
 *     open: true,
 *     onopen: function() {},
 *     onclose: function() {},
 *     onviewportmove: function () {}
 * }
 */
KALS_modal.prototype.setup_modal = function (_config) {
    
    var _get_parameter = function (_name, _default) {
        return $.get_parameter(_config, _name, _default);
    };
    
    var _modal_name = _get_parameter('modal_name');
    if ($.is_string(_modal_name)) {
		this.set_modal_name(_modal_name);
	}
    
    var _closable = _get_parameter('closable');
    if ($.is_boolean(_closable)) {
		this.set_closable(_closable);
	}
    
    var _onopen = _get_parameter('onopen');
    if ($.isset(_onopen)) {
		this.set_onopen(_onopen);
	}
    
    var _onclose = _get_parameter('onclose');
    if ($.isset(_onclose)) {
		this.set_onclose(_onclose);
	}
    
    var _onviewportmove = _get_parameter('onviewportmove');
    if ($.isset(_onviewportmove)) {
		this.set_onviewportmove(_onviewportmove);
	}
    
    var _open = _get_parameter('open', true);
    if (_open) {
		this.open();
	}
    
    return this;
};

/**
 * 設定Modal的名稱
 * @param {Object} _modal_name
 */
KALS_modal.prototype.set_modal_name = function (_modal_name) {
    if ($.is_string(_modal_name)) {
		this._$modal_name = _modal_name;
	}
    return this;
};

/**
 * 設定是否可以關閉
 * @param {boolean} _closable
 */
KALS_modal.prototype.set_closable = function (_closable) {
    if ($.is_boolean(_closable)) {
		this._$closable = _closable;
	}
	else {
		this._$closable = false;
	}
    return this;
};

/**
 * 設定onopen的callback
 * @param {function|boolean} _callback
 */
KALS_modal.prototype.set_onopen = function (_callback) {
    if ($.is_function(_callback)) {
		this._$onopen = _callback;
	}
	else 
		if (_callback === false || _callback === null) {
			this._$onopen = null;
		}
    return this;
};

/**
 * 設定onclose的callback
 * @param {function|boolean} _callback
 */
KALS_modal.prototype.set_onclose = function (_callback) {
    
    if ($.is_function(_callback)) {
        this._$onclose = _callback;
    }
    else if (_callback === false || _callback === null) {
        this._$onclose = null;
    }
        
    return this;
};

/**
 * 設定onviewportmove的callback
 * @param {function|boolean} _callback
 */
KALS_modal.prototype.set_onviewportmove = function (_callback) {
    if ($.is_function(_callback)) {
		this._$onviewportmove = _callback;
	}
	else 
		if (_callback === false || _callback === null) {
			this._$onviewportmove = null;
		}
    return this;
};

/**
 * 開關Modal
 * @param {boolean} _display
 * @param {function} _callback
 */
KALS_modal.prototype.toggle_modal = function (_display, _callback) {
    if ($.is_function(_display) && $.is_null(_callback)) {
        _callback = _display;
        _display = null;
    }
    
    if ($.is_null()) {
        _display = !(this.is_opened());
    }
    
    if (_display === true) {
		this.open(_callback);
	}
	else {
		this.close(_callback);
	}
    return this;
};

/**
 * 檢查Modal是否有開啟
 * @type {boolean}
 */
KALS_modal.prototype.is_opened = function () {
    var _ui = this.get_ui();
    if (_ui !== null) {
        return _ui.visible();
    }
    else {
        return false;
    }
};

/**
 * 開啟UI
 * @param {function|null} _callback
 */
KALS_modal.prototype.open = function (_callback) {
    var _ui = this.get_ui();
    if (_ui !== null) {
        _ui.show();
    }
    
    if ($.is_function(this._$onviewportmove)) {
		this._$onviewportmove(this._ui);
	}
    if ($.is_function(this._$onopen)) {
		this._$onopen(this._ui);
	}
    if ($.is_function(_callback)) {
		_callback(this._ui);
	}
    
    //跟Modal_controller註冊開啟
    if (typeof(KALS_context) == 'object' && typeof(KALS_context.modal) == 'object') {
		KALS_context.modal.add_opened(this);
	}
    
    return this;
};

/**
 * 開啟UI之後的callback
 * 肯定已經完成get_ui()
 * 參數會傳入this._ui。
 * @type {function} = function (_ui) {}
 */
KALS_modal.prototype._$onopen = null;

/**
 * 關閉UI
 * @param {Object} _callback
 */
KALS_modal.prototype.close = function (_callback) {
    if (this._$closable) {
        var _ui = this.get_ui();
        if (_ui !== null) {
            _ui.hide();
        }
        if ($.is_function(this._$onclose)) {
			this._$onclose(this._ui);
		}
        if ($.is_function(_callback)) {
			_callback(this._ui);
		}
            
        //跟Modal_controller註冊關閉
        if (typeof(KALS_context) == 'object' && typeof(KALS_context.modal) == 'object') {
			KALS_context.modal.delete_opened(this);
		}
    }
    return this;
};

/**
 * 關閉UI之後的callback
 * 肯定已經完成get_ui()
 * 參數會傳入this._ui。
 * @type {function} = function (_ui) {}
 */
KALS_modal.prototype._$onclose = null;

/**
 * 畫面移動時候的callback。
 * 只有在this.has_setup_ui() === true的時候啟動。
 * 參數會傳入this._ui。
 * @type {function} = function (_ui) {}
 */
KALS_modal.prototype._$onviewportmove = null;

/**
 * 暫存用的回呼函數
 * @type {null|function}
 */
KALS_modal.prototype._$temp_callback = null;

/**
 * 呼叫暫存用的回呼函數，然後刪除。在open與close的時候會用到
 * @param {jQuery} _ui
 */
KALS_modal.prototype.call_temp_callback = function (_ui) {
    
    //$.test_msg('call temp callback', [this.get_modal_name(), ($.is_function(this._$temp_callback))
    //    , this._$temp_callback]);
    
    if ($.is_function(this._$temp_callback)) {
        //$.test_msg('is funciton');
        this._$temp_callback(_ui);
        this._$temp_callback = null;
    }
};

/**
 * 取得Modal Name
 * @type {string}
 */
KALS_modal.prototype.get_modal_name = function () {
    return this._$modal_name;
};

// ---------
// 設定jQuery Tools特效
// ---------
$(function () {
    $.tools.overlay.addEffect("fade", function(position, done) {
          this.getOverlay().css(position).fadeIn(this.getConf().speed, done);
       },// close function
       function(done) {
          // fade out the overlay
          this.getOverlay().fadeOut(this.getConf().closeSpeed, done);
       }
    );    
});

/* End of file KALS_modal */
/* Location: ./system/application/views/web_apps/KALS_modal.js */