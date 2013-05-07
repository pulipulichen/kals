/**
 * Notify_modal
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/27 下午 10:25:27
 * @extends {Overlay_modal}
 */
function Notify_modal() {
    
    Overlay_modal.call(this);
    
}

Notify_modal.prototype = new Overlay_modal();

Notify_modal.prototype._$modal_name = "Notify";

Notify_modal.prototype._$exposable = false;

Notify_modal.prototype._$create_ui = function () {
    
    var _ui = this._$create_ui_prototype();
    
    _ui.addClass('notify-modal')
        .removeClass( this.class_name )
        .attr('id', 'notify_modal')
        .html('<div class="wrapper"></div>');
    
    var _config = this._$get_config();
    
    _config.speed = 1000;
    _config.closeSpeed = 1000;
    
    //_config.left = 'center';
    _config.mask = null;
    _config.effect = 'fade';
    
    var _onbeforeload;
    if (typeof(_config.onBeforeLoad) == 'function') {
        _onbeforeload = _config.onBeforeLoad;
    }
    
    _config.onBeforeLoad = function () {
        
        if ($.is_function(_onbeforeload)) {
            _onbeforeload();
        }
    };
    
    var _onclose;
    if (typeof(_config.onClose) == 'function') {
        _onclose = _config.onClose;   
    }
     
    _config.onClose = function () {
        if ($.is_function(_onclose))
            _onclose();
        this.getOverlay().find('.wrapper').empty();
        //_ui.css('top', '0px');
    };
    
    //2010.9.10 在此決定Notify
    //_config.top = '10%';
    _config.top = 40;
    
    _ui.overlay(_config);
    _ui.css('z-index', 19999);
    //_ui.css('top', '0px');
    
    //$.test_msg('Notify_modal._$create_ui() 確認_ui是否建立', $('#notify_modal').length);
        
    return _ui;
};

Notify_modal.prototype._$onviewportmove = function (_ui) {
    _ui.align({
        option: 'center'
    });
};

/**
 * Notify_modal的setup_modal
 * @param {Object} _config = {
 *     timeout_close: _time,
 *     message: _lang,    //KALS_language_param,
 *     timeout_close_message: _lang_time 
 * }
 */
Notify_modal.prototype.setup_modal = function (_config) {
    
    //先使用KALS_modal.setup_modal()來設置吧
    Notify_modal.prototype.setup_modal.call(this, _config);
    
    var _time = $.get_parameter(_config, 'timeout_close');
    if ($.isset(_time)) {
        this.set_timeout_close(_time);
    }
    
    var _lang = $.get_parameter(_config, 'message');
    var _lang_time = $.get_parameter(_config, 'timeout_close_message');
    if ($.isset(_lang)) {
        this.set_message(_lang, _lang_time);
    } 
    
    return this;
},

/**
 * 設定關閉的指示物
 * @type {Object} 由setTimeout()回傳
 */
Notify_modal.prototype._close_lock = null;

/**
 * 設定時間關閉整個Notification_modal
 * @param {number} _time 單位是毫秒(1000ms = 1s)
 * @deprecated
 */
/*
Notify_modal.prototype.set_timeout_close = function (_time) {
    if (false == this.has_setup_ui())
        return this;
        
    var _ui = this.get_ui();
    _ui.attr('timeout_close', _time);
    
    if (this._close_lock != null) {
        clearTimeout(this._close_lock);
    }
    
    var _this = this;
    this._close_lock = setTimeout(function () {
        _this.close(function () {
            clearTimeout(_this._close_lock);
            _this._close_lock = null;
        });
    }, _time);
    return this;
};
*/

Notify_modal.prototype.close = function (_callback) {
    
    //先確認UI裡面有沒有還沒準備關掉
    var _ui = this.get_ui();
    var _display_message = _ui.find('.' + this._message_classname + ':not(.' + this._close_classname + ')');
    
    
    
    if (_display_message.length === 0) {
        var _this = this;
        Overlay_modal.prototype.close.call(this, function () {
            try
            {
                clearTimeout(_this._close_lock);    
            }
            catch (e) { }
            _this._close_lock = null;
            
            $.trigger_callback(_callback);
        });
    }
    else {
        $.trigger_callback(_callback);
    }
};

Notify_modal.prototype._close_classname = 'ready-close';
Notify_modal.prototype._message_classname = 'message';

/**
 * 設置留言訊息
 * @param {KALS_language_param|String} _lang
 * @param {Number} _lang_time
 */
Notify_modal.prototype.set_message = function (_lang, _lang_time) {
    
    if ($.is_null(_lang))
        return this;
    
    var _ui = this.get_ui();
    
    if ($.is_null(_lang_time)) {
        _lang_time = _this.attr('timeout_close');
        _lang_time = parseInt(_lang_time);
    }
    if (typeof(_lang_time) == 'undefined')
        _lang_time = 11000;
    else
        _lang_time = _lang_time + 1000;
    
    var _container = $('<div class="' + this._message_classname + '"></div>')
        .hide();
    
    KALS_context.lang.add_listener(_container, _lang);
    
    _ui.find('.wrapper:first')
        .prepend(_container);
    
    _container.fadeIn();
    
    //加入新留言之後，就要重新對齊一下
    this._$onviewportmove(_ui);
    
    
    //this.set_timeout_close(_lang_time);
    
    var _this = this;
    
    var _close_message = function () {
        _container.addClass(_this._close_classname);
        
        _this.close(function () {
            _container.fadeOut('slow', function () {
                $(this).remove();
                _this._$onviewportmove(_ui);
            });
        });
    };
    
    this.open(function () {    
    
        //$.test_msg('Notify_modal.set_message() setup _container');
    
        var _timer = setTimeout(function () {
            _close_message();
        }, _lang_time);
        
        _container.click(function () {
            clearTimeout(_timer);
            _close_message();
        }); 
    });
    
    return this;
};

/* End of file Notify_modal */
/* Location: ./system/application/views/web_apps/Notify_modal.js */