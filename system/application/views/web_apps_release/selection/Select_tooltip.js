/**
 * Select_tooltip
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/15 下午 08:23:13
 * @extends {Tooltip_modal}
 */
function Select_tooltip() {
    
    Tooltip_modal.call(this);
    
    var _this = this;
    setTimeout(function () {
        _this.get_ui();
    }, 0);
    
    KALS_context.init_profile.add_listener(function () {
        var _ui = _this.get_ui();
        _ui.removeClass('hide');
        _ui.hide();
        _this.enable_select = true;
    });
    
}

Select_tooltip.prototype = new Tooltip_modal();

Select_tooltip.prototype.enable_select = false;

Select_tooltip.prototype.tooltip_id = 'kals_select_tooltip';

Select_tooltip.prototype._$get_config = function () {
    
    var _select_tooltip = this;
    
    var _config = Tooltip_modal.prototype._$get_config.call(this, '#' + this.tooltip_id + ':first');
    //_config['delay'] = 30;
    //_config['predelay'] = 100;
    
    if ($.is_mobile_mode()) {
        _config['events'] = {
            def: 'mouseenter click,null'
        }; 
    }
    else {
        //_config['events'] = {
        //    def: 'mouseenter click,mouseleave'
        //};    
    }
    
    if ($.is_touchable()) {
       var _touch_event = 'touchstart ';
       _config['events']['def'] = _touch_event + _config['events']['def'];
       
       var _trigger_class_name = this.trigger_classname;
       
       if (typeof(TRIGGER_TOUCHSTART_EVENT_LOCK) == 'undefined')
       {
           $('.' + _trigger_class_name).live('touchstart', function (_event) {
               _event.preventDefault();
           });
           TRIGGER_TOUCHSTART_EVENT_LOCK = true;
       }
    }
    
    var _onbeforeshow = _config['onBeforeShow'];
    _config['onBeforeShow'] = function (_event) {
        
        //if ($.is_null(_this))
            _this = this;
        
        var _tip = _this.getTip();
        if (_tip.length === 0)
            return;
            
        if (_select_tooltip.enable_select === false)
            return;
        
        var _trigger = _this.getTrigger();
        $('.tooltip-trigger-hover').removeClass('tooltip-trigger-hover');
        _trigger.addClass('tooltip-trigger-hover');
        
        //$.test_msg('Select_tooltip._$get_config()', _tip.length);
        
        //調整tip的位置
        setTimeout(function () {
            
            var _trigger_bottom;
            var _tip_top = _tip.offset().top;
            var _top_padding = KALS_toolbar.get_ui().height();
            if (_tip_top < window.pageYOffset + _top_padding)
            {             
               _trigger_bottom = _trigger.offset().top + _trigger.height();
                   _tip.css('top', _trigger_bottom+'px');
               _tip.addClass('bottom');
            }
            else
            {
                _tip.removeClass('bottom');
            }
            
            var _tip_left = _tip.offset().left;
            var _x_left = window.pageXOffset;
            
            // 如果他沒有對到字的正上方，則調整一下吧
            //$.test_msg('Select_tooltip._$get_config()', [_trigger.offset().left, _trigger.offset().top, _tip.offset().left, _tip.offset().top]);
            var _trigger_offset = _trigger.offset();
            if (Math.abs( _tip_left - _trigger_offset.left) > 50 )
            {
                //那就定位在滑鼠上方
                //$.test_msg('Select_tooltip._$get_config()', [_event.clientX, _event.clientY]);
                _tip_left = _event.clientX - (_tip.width() / 2);
                _tip.css('left', _tip_left + 'px');
                
                _tip_top = window.pageYOffset + _event.clientY - _tip.height() - 3;
                //$.test_msg('Select_tooltip._$get_config()', [_tip_top]);
                _tip.css('top', _tip_top+'px');
                if (_tip_top < window.pageYOffset + _top_padding)
                {             
                   _tip_top = window.pageYOffset + _event.clientY + (_trigger.height() / 3);
                       _tip.css('top', _tip_top+'px');
                   _tip.addClass('bottom');
                   //$.test_msg('Select_tooltip._$get_config() bottom', [_event.clientY, _tip_top, window.pageYOffset, _top_padding]);
                }
                else
                {
                    //$.test_msg('Select_tooltip._$get_config() top', [_tip_top]);
                    _tip.css('top', _tip_top+'px');
                    _tip.removeClass('bottom');
                }
            }
            
            /*
            if (_tip_left < _x_left + 30)
            {
                _x_left = _x_left - 30;
                if (_x_left > 0)
                {
                    setTimeout(function () {
                        if (_tip.offset().left == _tip_left)
                        {
                            $.scroll_to({x: _x_left});
                        }
                    }, 1000);
                }
            }
            
            var _x_right = _x_left + $.get_viewport_width();
            var _tip_right = _tip_left + _tip.width();
            if (_tip_right > _x_right - 30)
            {
                _x_left = _x_left + 30;
                
                setTimeout(function () {
                    if (_tip.offset().left == _tip_left)
                    {
                        $.scroll_to({x: _x_left});
                    }
                }, 1000);
            }
            */
            
        }, 0);    //setTimeout(function () {
        
        // --------
        
        //if ($.is_null(_this))
        //    _this = this;
        
        //var _tip = _this.getTip();
        //var _trigger = _this.getTrigger();
        //設定調整            
        var _id = $.get_prefixed_id(_trigger);
        _tip.attr('word_id', _id);
        
        //在顯示之前，決定是否要調整
        var _selected_classname = 'selected';
        if (KALS_text.selection.select._select_from != null)
            _tip.addClass(_selected_classname);
        else
            _tip.removeClass(_selected_classname);
        
        if ($.is_function(_onbeforeshow))
        {
            _onbeforeshow.call(this);
        }
        
    };    //onBeforeShow: function () {
    
    var _onbeforehide = $.get_parameter( _config, 'onBeforeHide' );
    _config['onBeforeHide'] = function (_this) {
        
        if (_select_tooltip.enable_select === false)
            return;
        
        //if ($.is_null(_this))
        //{
            _this = this;
        //}
        
        if (typeof(_this.getTrigger) != 'function'
            && typeof(this.getTrigger) == 'function')
            _this.getTrigger = this.getTrigger;
        var _trigger = _this.getTrigger();
        _trigger.removeClass('tooltip-trigger-hover');
        
        if ($.is_function(_onbeforehide))
            _onbeforehide.call(this);
        
    };    //onBeforeHide: function () {
    
    if ($.is_mobile_mode())
        _config['effect'] = 'toggle';
    //else
    //    _config['effect'] = 'fade';
    
    return _config;
};

/**
 * Tooltip的設定
 * @type {Object}
 */
Select_tooltip.prototype.tooltip_config = null;

Select_tooltip.prototype.get_tooltip_config = function () {
    if (this._tooltip_config === null)
        this._tooltip_config = this._$get_config();
    return this._tooltip_config;
};

Select_tooltip.prototype.tooltip_id = 'kals_select_tooltip';
Select_tooltip.prototype.container_classname = 'kals-select-trigger-container';
Select_tooltip.prototype.button_classname = 'kals-select-trigger';

/**
 * 標示現在是Tooltip的trigger的classname
 * @type {String}
 */
Select_tooltip.prototype.trigger_classname = 'tooltip-trigger';

/**
 * Create UI
 * @memberOf {Select_tooltip}
 * @type {jQuery} UI
 */
Select_tooltip.prototype._$create_ui = function ()
{
    var _tooltip_id = this.tooltip_id;
    var _container_classname = this.container_classname;
    var _button_classname = this.button_classname;
    
    var _select_button = $('<button class="' + _button_classname + ' select">SELECT</button>');
    var _cancel_button = $('<button class="' + _button_classname + ' cancel">CANCEL</button>');
    
    var _content = _tooltip = $('<div class="tooltip">' 
            + '<div class="tip-needle top"></div>'
            + '<div class="tip-content"></div>'
            + '<div class="tip-needle bottom"></div>' 
            + '</div>');
    _content.find('.tip-content:first')
        .append(_cancel_button)
        .append(_select_button);
    
    var _select_tooltip = this._create_tooltip_prototype({
        id: _tooltip_id,
        content: _content
    });
    
    KALS_context.lang.add_listener(
        _select_button, 
        new KALS_language_param(
            'SELECT',
            'selection_manager.select_tooltip'    
        ) 
    );
    
    KALS_context.lang.add_listener(
        _cancel_button, 
        new KALS_language_param(
            'CANCEL',
            'selection_manager.select_tooltip.cancel'    
        ) 
    );
    
    _select_tooltip.addClass(_container_classname);
    
    var _this = this;
    
    //var _word_id_prefix = Selection_manager.prototype.word_id_prefix;
    var _word_id_prefix = Selectable_text.prototype.word_id_prefix;
    
    var _select_event = function (_event) {
        //先叫原本的事件不要動
        _event.preventDefault();
        
        //先關掉上一個的word的Tooltip
        var _tooltip = $('#' + _tooltip_id);
        var _word_id = _tooltip.attr('word_id');
        var _word = $('#' + _word_id_prefix + _word_id );
        _word.tooltip().hide();
        
        //呼叫Selection_manager.listen_select()事件
        //_this.listen_select(_word);
        //KALS_text.selection.listen_select(_word);
        
        KALS_text.selection.select.set_select(_word);
    };
    
    var _cancel_event = function (_event) {
        //先叫原本的事件不要動
        _event.preventDefault();
        
        var _tooltip = $('#' + _tooltip_id);
        var _word_id = _tooltip.attr('word_id');
        var _word = $('#' + _word_id_prefix + _word_id );
        _word.tooltip().hide();
        
        KALS_text.selection.select.cancel_select();
    };
    
    _select_button.click(_select_event);
    _cancel_button.click(_cancel_event);
    
    _select_tooltip.addClass('hide');
    
    var _deny_read_classname = 'deny-read';
    KALS_context.policy.add_attr_listener('read', function (_policy) {
        //$.test_msg('Select_tooltip._$create_ui()', _policy.readable());
        if (_policy.readable())
            _select_tooltip.removeClass(_deny_read_classname);
        else
            _select_tooltip.addClass(_deny_read_classname);
    }, true);
    
    return _select_tooltip;
};


/* End of file Select_tooltip */
/* Location: ./system/application/views/web_apps/Select_tooltip.js */