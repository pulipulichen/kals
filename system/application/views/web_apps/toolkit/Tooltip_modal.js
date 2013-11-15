/**
 * Tooltip_modal
 * 這個Tooltip是指jQuery TOOLS的tooltip
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/26 下午 04:00:43
 * @extends {KALS_modal}
 */
function Tooltip_modal() {
    
    KALS_modal.call(this);
    
}

Tooltip_modal.prototype = new KALS_modal();

Tooltip_modal.prototype._$modal_name = 'Tooltip_modal';

Tooltip_modal.prototype._$tooltip_id = null;

/**
 * trigger的classname，跟this._$modal_name一起運作
 * @type {String}
 */
Tooltip_modal.prototype.get_trigger_classname = function () {
    var _trigger_classname = this._$modal_name + '_trigger';
    return _trigger_classname;
};

/**
 * 取得tooltip的設定
 * @param {string} _selector 指定此物件當做tip
 */
Tooltip_modal.prototype._$get_config = function (_selector) {
    
    var _this = this;
    var _trigger_classname = this.get_trigger_classname();
    
    var _config = {
        onBeforeShow: function () {
            var _trigger = this.getTrigger();
            _trigger.addClass(_trigger_classname);
        },
        onBeforeHide: function () {
            $('.' + _trigger_classname).removeClass(_trigger_classname);
        },
        onShow: function () {
            var _ui = _this.get_ui();
            
            //2010.9.4 因為Tooltip可能會跟著trigger的位置跑，所以我想應該是不需要_$onviewportmove
            //if ($.is_function(_this._$onviewportmove))
            //    _this._$onviewportmove(_ui);
            
            if ($.is_function(_this._$onopen)) {
				_this._$onopen(_ui);
			}
                
            _this.call_temp_callback(_ui);
        },
        onHide: function () {
            var _ui = _this.get_ui();
            if ($.is_function(_this._$onclose)) {
				_this._$onclose(_ui);
			}
            _this.call_temp_callback(_ui);
        },
        delay: 30,
        predelay: 100,
        events: { def: 'mouseenter, mouseleave' }
        //, effect: 'fade'        
    };
    
    if ($.is_null(_selector) && $.isset(this._$tooltip_id)) {
        _selector = '#' + this._$tooltip_id;
    }
    
    if ($.isset(_selector)) {
		_config.tip = _selector;
	}
    
    return _config;  
};


Tooltip_modal.prototype.get_trigger = function () {
    
    var _trigger_classname = this.get_trigger_classname();
    
    var _trigger = $('.' + _trigger_classname);
    return _trigger;
};

/**
 * 建立tip原形
 * @param {Object} _config = {
 *     id: ID,
 *     classname: CLASSNAME,
 *     content: 內容
 * }
 */
Tooltip_modal.prototype._create_tooltip_prototype = function (_config) {
    
    var _id = $.get_parameter(_config, 'id');
    if ($.is_null(_id) && $.isset(this._$tooltip_id)) {
		_id = this._$tooltip_id;
	}
    
    var _content = $.get_parameter(_config, 'content');
    var _classname = $.get_parameter(_config, 'classname');
    
    if ($.is_string(_content)) {
        _content = $(_content);
    }
    else if ($.is_null(_content)) {
        _content = $('<div></div>');
    }
    
    var _tooltip = null;
    var _tooltip_existed = false;
    
    if ($.isset(_id)) {
        _tooltip = $('div#' + _id);
        _tooltip_existed = (_tooltip.length > 0);
    }
    
    //$.test_msg('Tooltip_modal._create_tooltip.prototype()', _tooltip_existed);
    
    if (_tooltip_existed === false) {  
        _tooltip = _content
            .addClass('tooltip')
			.addClass("KALS")
            .appendTo($('body'));
        
        if ($.isset(_id)) {
			_tooltip.attr('id', _id);
		}
        
        if ($.isset(_classname)) {
			_tooltip.addClass(_classname);
		}
        
        //$.test_msg('Tooltip_modal._create_tooltip.prototype()', _tooltip.length);
    }
    
    return _tooltip;
};

/**
 * Tooltip的開啟動作
 * @param {Function} _callback
 */
Tooltip_modal.prototype.open = function (_callback) {
    var _ui = this.get_trigger();
    
    var _this = this;
    
    if (_ui !== null) {
        if (typeof(_ui.tooltip) == 'function') {
            this._$temp_callback = _callback;
            _ui.tooltip().show();
        }
        else {
            _ui.show();
            if ($.is_function(_callback)) {
				_callback(_ui);
			}
        }
    }
    
    return this;
};

/**
 * Tooltip的關閉動作
 * @param {function|null} _callback
 */
Tooltip_modal.prototype.close = function (_callback) {
    if (this._$closable && this.is_opened()) {
        //var _ui = this.get_ui();
        var _ui = this.get_trigger();
        
        var _this = this;
        
        if (_ui !== null) {
            if (typeof(_ui.tooltip) == 'function') {
                 this._$temp_callback = _callback;
                 _ui.tooltip().hide();
            }
            else {
                _ui.hide();
                if ($.is_function(_callback)) {
					_callback(_ui);
				}
            }
        }
    }
    return this;
};


/**
 * 利用tooltip的isShown()來偵測是否開啟
 * 2010.10.18 那要設置在trigger上才對，目前這個無法這樣做，所以取消
 * @param {boolean} _fully = false。如果_fully === true，則會在tooltip完全顯示且定位完成之後才會回傳true
 * @type {boolean}
 */
/*
Tooltip_modal.prototype.is_opened = function (_fully) {
    var _ui = this.get_trigger();
    if (_ui != null) {
        return _ui.tooltip().isShown(_fully);
        
    }
    else {
        return false;
    }
};
*/
/* End of file Tooltip_modal */
/* Location: ./system/application/views/web_apps/Tooltip_modal.js */