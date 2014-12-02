/**
 * Overlay_manager
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/9/6 下午 08:39:15
 */
function Overlay_manager () {

    this._opened_modals = [];
    
    var _this = this;
    //跟URL_hash_dispatcher註冊
    if (typeof(KALS_context) === 'object'
        && typeof(KALS_context.hash) === 'object') {
        KALS_context.hash.add_listener(function (_dispatcher, _data) {
            if (typeof(_data.backward) === 'boolean'
                && _data.backward === true) {
                //$.test_msg('modal listener', _data);
                _this.close_all();
            }
        });
    }   
    
    //跟onviewportmove註冊mash的fit事件
    if (typeof($.mask) !== 'undefined') {
        KALS_context.view.add_listener(function () {
            if ($.mask.isLoaded()) {
                $.mask.fit();
            } 
        });    
    }
}

/**
 * 已經開啟的Modal。
 * @type {Array|KALS_Modal}
 */
Overlay_manager.prototype._opened_modals = [];

/**
 * 關閉所有Modal
 * @param {null|string|array} _except_name = []: 排除的名稱
 */    
Overlay_manager.prototype.close_all = function (_except_name) {
    
    if ($.is_null(_except_name)) {
		_except_name = [];
	}
	else 
		if ($.is_string(_except_name)) {
			_except_name = [_except_name];
		}
    
    var _this = this;
    var _loopy = function (_callback) {
        
        //$.test_msg('call loopy');
        
        var _index = null;
        for (_i in _this._opened_modals) {
			_index = _i;
		}
        
        //if (_index < _this._opened_modals.length)
        if (_index !== null) {
            var _modal = _this._opened_modals[_index];
            var _name = _modal.get_modal_name();
            
            //$.test_msg('call loopy', [_index, _modal.get_modal_name()]);
            
            _modal.close(function () {
                //$.test_msg('loopy after close, call next...');
                _loopy(_callback);    
            });
        }
        else {
            _callback();
        }
    };
    
    _loopy(function () {
        //跟URL_hash_dispatcher註冊
        if (typeof(KALS_context) == 'object'
            && typeof(KALS_context.hash) == 'object') {
            KALS_context.hash.delete_field('modal');
        }  
        
        _this.check_mask(true);    
    });
    
    return this;
};

/**
 * 關閉指定的Modal
 * @param {null|string|array} _target_name = []: 指定的名稱
 */
Overlay_manager.prototype.close = function (_target_name) {
    
    if ($.is_null(_target_name)) {
		_target_name = [];
	}
	else 
		if ($.is_string(_target_name)) {
			_target_name = [_target_name];
		}
    
    for (var _i in this._opened_modals) {
        var _modal = this._opened_modals[_i];
        var _name = _modal.get_modal_name();
        
        if ($.inArray(_name, _target_name) > -1) {
            _modal.close();
        }
    }
    
    this.check_mask(true);
    return this;
};

Overlay_manager.prototype._check_mask_timer = null;
Overlay_manager.prototype.check_mask = function (_is_close) {
    
    if ($.isset(this._check_mask_timer)) {
		clearTimeout(this._check_mask_timer);
	}
    
    //$.test_msg('Overlay_manager.check_mask()', _is_close);
    
    if (_is_close === true && this._mask_locker === true) {
        this._mask_locker = false;
        //$.test_msg('Overlay_manager.check_mask() unlock mask');
        return this;
    }
    else {
        this._mask_locker = false;
    }
        
    var _this = this;
    
    this._check_mask_timer = setTimeout(function () {
        
        var _need_expose = false;
        
        //$.test_msg('Overlay_manager.check_mask()', [_this._opened_modals.length]);
        
        for (var _i in _this._opened_modals) {
            var _modal = _this._opened_modals[_i];
            
            //$.test_msg('Overlay_manager.check_mask() for', [_modal.get_modal_name(), _modal.is_exposable()]);
            
            if (_modal.is_exposable()) {
                _need_expose = true;
                break;
            }
        }
        
        if (_need_expose === false) {
            $.mask.close();
        } 
    }, 200);
    
    return this;
};

Overlay_manager.prototype._mask_locker = false;

/**
 * 鎖定黑幕
 */
Overlay_manager.prototype.lock_mask = function () {
    //$.test_msg('Overlay_manager.lock_mask()');
    this._mask_locker = true;
    return this;
};

/**
 * 取消鎖定黑幕
 */
Overlay_manager.prototype.unlock_mask = function () {
    //$.test_msg('Overlay_manager.unlock_mask()');
    this._mask_locker = false;
    return this;
};

/**
 * 註冊說已經開啟
 * @param {KALS_modal} _modal
 */
Overlay_manager.prototype.add_opened = function (_modal) {
    
    if (_modal._$exposable === false) {
		return this;
	}
    
    if (_modal === null || typeof(_modal.is_closable) !== 'function') {
		return this;
	}
    
    if ($.inArray(_modal, this._opened_modals) === -1
        && _modal.is_closable()) {
        
        //$.test_msg('add_opened', [_modal.get_modal_name(), _modal.is_exposable()]);
        
        this._opened_modals.push(_modal);
        
        if (_modal.is_exposable()) {
            //先將已經開啟的modal移至mask之後
            for (var _i in this._opened_modals) {
                var _opened_modal = this._opened_modals[_i];
                if (_opened_modal.is_exposable()) {
					_opened_modal.cover();
				}
            } 
			if (typeof(_modal.expose) === "function") {
				_modal.expose();
			}
        }
        
        //跟URL_hash_dispatcher註冊
        if (typeof(KALS_context) == 'object'
            && typeof(KALS_context.hash) == 'object') {
            KALS_context.hash.set_field('modal', _modal.get_modal_name());
        }   
    }   
    return this;
};

/**
 * 是否還有未關閉的Modal
 * @type {boolean}
 */
Overlay_manager.prototype.has_opened = function () {
    return (this._opened_modals.length > 0);
};

/**
 * 移除註冊
 * @param {KALS_modal} _modal
 */
Overlay_manager.prototype.delete_opened = function (_modal) {
    
    if (_modal._$exposable === false) {
		return this;
	}
    
	//$.test_msg("Overlay_manager delete_opended", "check point 1");
    var _this = this;
    var _deleted = $.inArray(_modal, this._opened_modals);
    if (_deleted > -1) {
        //delete this._opened_modals[_i];
        //this._opened_modals[_i].pop();
        //this._opened_modals.length -= 1;
        
        var _new_opened = [];
        for (var _i = 0; _i < this._opened_modals.length; _i++) {
            if (_i === _deleted) {
				continue;
			}
			else {
				_new_opened.push(this._opened_modals[_i]);
			}
        }
        this._opened_modals = _new_opened;
        
		//$.test_msg("Overlay_manager delete_opended", "check point 2");
		
        //將未關閉的modal最後一個移至mask之前
        var _last_modal;
        
        for (_i in this._opened_modals) {
            //不做任何事情，只是取得modal
            _last_modal = this._opened_modals[_i];
        }
        //迴圈最後就會取得最後一個modal
        
        //$.test_msg('delete_opened', [_modal.get_modal_name(), this._opened_modals.length]);
        //if (_last_modal != null)
        //    $.test_msg('delete_opened', [_last_modal.get_modal_name()]);
        
		//$.test_msg("Overlay_manager delete_opended", "check point 3");
		
        if (_last_modal !== null && _last_modal !== undefined) {
			//$.test_msg("Overlay_manager delete_opended", "check point 3.1 " + typeof(_last_modal.expose));
            //_last_modal.get_ui().css('z-index', 9999);
            if (typeof(_last_modal.expose) !== "undefined") {
                    $.test_msg("Overlay_manager", "before last_modal expose");
                    _last_modal.expose();	
            }
            
            //_last_modal.focus_option();
            
            //跟URL_hash_dispatcher註冊
            if (typeof(KALS_context) === 'object'
                && typeof(KALS_context.hash) === 'object') {
                KALS_context.hash.set_field('modal', _modal.get_modal_name(), function () {
                    //$.test_msg('deleted_opended length', this._opened_modals.length);
                    _this.check_mask(true);
                });
            }
            else {
                _this.check_mask(true);
            }
			//$.test_msg("Overlay_manager delete_opended", "check point 3.1.1");
        }
        else {
			//$.test_msg("Overlay_manager delete_opended", "check point 3.2");
            //跟URL_hash_dispatcher註冊
            if (typeof(KALS_context) === 'object'
                && typeof(KALS_context.hash) === 'object') {
                KALS_context.hash.delete_field('modal');
            }
            else {
                //$.test_msg('deleted_opended length', this._opened_modals.length);
                this.check_mask(true);
            }
			//$.test_msg("Overlay_manager delete_opended", "check point 3.2.1");
        }
		
		//$.test_msg("Overlay_manager delete_opended", "check point 4");
    }   //if (_deleted > -1) {
    else {
        //$.test_msg('deleted_opended length', this._opened_modals.length);
        this.check_mask(true);
    }
        
    
    //$.test_msg('deleted_opended length', this._opened_modals.length);
    this.check_mask(true);
    
	//$.test_msg("Overlay_manager delete_opended", "check point 5");
	
    return this;
};

/* End of file Overlay_manager */
/* Location: ./system/application/views/web_apps/Overlay_manager.js */