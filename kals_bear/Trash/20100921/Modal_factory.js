/**
 * Modal_factory
 *
 * @package		KALS
 * @category		Webpage Application Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/31 下午 08:55:05
 * @constructor Modal_factory()
 * @requires jQuery
 */

/**
 * Modal工廠
 * @requires {jQuery}
 * @requires {KALS_context}
 * @requires {jQuery.tools}
 */
Modal_factory = new Object;

/**
 * Modal CSS類別
 * @type {string}
 * @property
 * @memberOf {Modal_factory}
 */
Modal_factory.modal_class_name = 'kals-modal';

/**
 * 建立一個overlay模型
 * @memberOf {Modal_factory}
 * @property
 * @method [create_overlay]
 * @type {jQuery}
 */
Modal_factory.create_overlay = function (_setup) {
    
    var _modal_class_name = this.modal_class_name;
    var _modal = $.create_once('<div class="' + _modal_class_name + ' overlay"><table height="100%" width="100%" cellpadding="0" cellspacing="0" border="0">'
            + '<tr><th style="height: 2.4em;" class="modal-toolbar">'
                + '<h2 class="modal-heading"></h2></th></tr>' 
            + '<tr><td class="modal-message-td"><div style="height: auto;" class="modal-message"></div></td></tr>'
            + '</table></div>');
    _modal.hide();
    
    if (typeof(_modal.overlay) == 'undefined')
        return null;
    
    _modal.overlay({
        //top: '0',
        mask: {
            color: '#333333',
            loadSpeed: 200,
            opacity: 0.5
        },
        closeOnClick: false,
        load: false
    });
    
    if ($.object_isset('KALS_context.view'))
    {
        KALS_context.view.add_listener(_modal, function (_vpm_obs) {
            $.test_msg($.is_small_width());
            if ($.is_small_width())
            {
                _modal.fullscreen_width();
            }
            else
            {
                _modal.restore();
            }
            if (_modal.visible())
            {
                _modal.center();
            }
        });
    }
    
    /**
     * 設定標頭
     * @param {string} _text 允許HTML
     */
    _modal.set_heading = function (_text) {
        $(this).find('.modal-heading').html(_text);
        return this;
    };
    _modal.get_heading = function () {
        return $(this).find('.modal-heading');
    };
    
    _modal.set_title
    
    /**
     * 設定內文
     * @param {string} _text 允許HTML
     */
    _modal.set_message = function (_text) {
        $(this).find('.modal-message').html(_text);
        return this;
    };
    _modal.get_message = function () {
        return $(this).find('.modal-message');
    };
    
    _modal.set_backward_option = function (_option) {
        var _this = $(this);
        _this.find('.modal-toolbar').prepend(_option);
        _option.addClass('modal-backward');
        _this.addClass('with-backward-option');
        return this;
    };
    
    _modal.set_forward_option = function (_option) {
        var _this = $(this);
        _this.find('.modal-toolbar').prepend(_option);
        _option.addClass('modal-forward');
        _this.addClass('with-forward-option');
        return this;
    };
    
    /**
     * 設定選項按鈕
     * @param {jQuery} _options 製造方法請見create_option
     */
    _modal.set_options = function (_options) {
        if (false == $.is_array(_options))
            _options = [_options];
        var _tbody = $(this).find('tbody');
        _tbody.find('.modal-options').remove();
        
        for (var _index = 0; _index < _options.length; _index++)
        {
            if (_index == 0) {
                _options[0].ready(function () {
                    _options[0].focus();
                });
            }
            
            if (_index < _options.length -1)
            {
                var _option_left = _options[_index];
                _index++;
                var _option_right = _options[_index];
                
                var _tr = $('<tr class="modal-options"><td></td></tr>')
                    .appendTo(_tbody);
                    
                _tr.find('td').append(_option_left)
                    .append(_option_right);
                _option_left.addClass('option-left');
                _option_right.addClass('option-right');
            }
            else
            {
                var _option = _options[_index];
                var _tr = $('<tr class="modal-options"><td></td></tr>')
                    .appendTo(_tbody);
                    
                _tr.find('td:first').append(_option);
            }
        }
        return this;
    };
    _modal.get_options = function () {
        return $(this).find('.modal-options .modal-option');
    };
    
    var _heading = $.get_parameter(_setup, 'heading');
    if ($.isset(_heading))
        _modal.set_heading(_heading);
    var _message = $.get_parameter(_setup, 'message');
    if ($.isset(_message))
        _modal.set_message(_message);
    var _backward_option = $.get_parameter(_setup, 'backward_option');
    if ($.isset(_backward_option))
        _modal.set_backward_option(_backward_option);
    var _forward_option = $.get_parameter(_setup, 'forward_option');
    if ($.isset(_forward_option))
        _modal.set_forward_option(_forward_option);
    var _options = $.get_parameter(_setup, 'options');
    if ($.isset(_options))
        _modal.set_options(_options);
    
    var _el = _modal.find('.modal-message');    
    if ($.is_mobile_mode()) {
        _modal.addClass('mobile');
        this.enable_touch_scroll(_el);
    }
    
        
    //}    //if ($.is_mobile_mode()) {
    return _modal;
};

/**
 * 建立關閉的選項按鈕
 * @memberOf {Modal_factory}
 * @property
 * @method [create_close_option]
 * @type {jQuery}
 */
Modal_factory.create_close_option = function () {
    
    var _close_button = this.create_option('modal.close');
    _close_button.html('CLOSE');
    _close_button.addClass('modal-close');
    
    return _close_button;
};

/**
 * 建立按鈕
 * @method [create_option]
 * @property
 * @param {string|Object} _lang 按鈕的語系索引，可以加入參數，例如：{lang: 'modal.close', arg: []}
 * @param {function} _callback 按下按鈕之後的動作，參數為_modal
 * @type {jQuery}
 */
Modal_factory.create_option = function (_lang, _callback, _value) {
    var _arg = [];
    if ($.is_object(_lang))
    {
        _arg = _lang.arg;
        _lang = _lang.line
    }
    
    var _modal_class_name = this.modal_class_name;
    var _button = $('<button class="modal-option">' + _lang + '</button>');
    
    if ($.isset(_value))
        _button.attr('value', _value);
    
    if ($.object_isset('KALS_context.get_lang()'))
        KALS_context.get_lang().add_listener(_button, _lang, _arg);
    
    if ($.is_function(_callback)) 
    {
        _button.click(function(){
            var _this = $(this);
            var _modal = _this.parents('.' + _modal_class_name + ':first');
            _callback(_modal, _this.attr('value'));
            _modal.overlay().close();
        });
    }
    else
    {
        _button.click(function(){
            var _this = $(this);
            var _modal = _this.parents('.' + _modal_class_name + ':first');
            _modal.overlay().close();
        });
    }
    
    return _button;
};

/**
 * 將有捲軸的物件轉換成可以碰觸捲軸
 * @param {jQuery} _el 要設定成可以碰觸捲軸的物件 
 */
Modal_factory.enable_touch_scroll = function (_el) {
    
    //_el.css('cursor', 'pointer');
    
    var _get_event_pageY = this.get_event_pageY;
    var _setup_message = function () {
		var _scrollStartPos=0;
        
        //安裝捲軸
        var _el_height = _el.height() 
            + $.strip_unit(_el.css('padding-top'))
            + $.strip_unit(_el.css('padding-bottom'));
        var _el_scroll_height = _el.attr('scrollHeight');
        
        var _scroll = null;
        
        if (_el_height < _el_scroll_height) {
            var _scroll_container = $('<div class="scroll-container"><div class="scroll">&nbsp;</div></div>').css({
                    height: _el_height + 'px'
                })
                .insertBefore(_el);
                
            //_scroll_container.hide();
            
            _scroll_height = _el_height / _el.attr('scrollHeight') * _el_height;
            var _scroll = _scroll_container.find('.scroll');
            _scroll.css({
                height: _scroll_height + 'px',
                position: 'relative'
            });
            _el.css('overflow-y', 'hidden');
        }

        var _start_event = function(_event) {
            //_el.css('color', 'red');    //偵測用功能
            _event.preventDefault();
            var _pageY = _get_event_pageY(_event);
			_scrollStartPos = _el.attr('scrollTop') + _pageY;
            
            var _listen_object=  window;
            if ($.browser.msie || $.is_mobile_mode())
                _listen_object = document;
            
			$(_listen_object).bind("touchmove", _move_event);
            $(_listen_object).bind("mousemove", _move_event);
            
            $(_listen_object).bind("touchend", _end_event);
            $(_listen_object).bind("mouseup", _end_event);
            $(_listen_object).bind("mouseout", _end_event);
		};
        
        var _move_event = function(_event) {
            if (_scrollStartPos == null)
                return;
            
            //_el.css('color', 'blue');    //偵測用功能
            _event.preventDefault();
            
            var _origin_scroll_top = _el.attr('scrollTop'); 
            var _pageY = _get_event_pageY(_event);
            var _target_top = (_scrollStartPos - _pageY);
            _el.attr('scrollTop', _target_top);
            var _max_height = _el.attr('scrollHeight');
            
            if (_scroll != null
                && _el.attr('scrollTop') == _origin_scroll_top) {
                
                if (_origin_scroll_top > 0) {
                
                    _target_top = _target_top - _el.attr('scrollTop');
                    if (_target_top > 50)
                        _target_top = 50;
                    var _bottom_padding = _el.find('.bottom-padding:first');
                    if (_bottom_padding.length == 0) {
                        _bottom_padding = $('<div class="bottom-padding"></div>').appendTo(_el);
                    }
                    if (_bottom_padding.height() < _target_top)
                        _bottom_padding.css('height', _target_top+'px');
                    _bottom_padding.css('height', _target_top + 'px');
                    
                    if (_scroll != null) {
                        var _max_top = _el_height - _scroll.css_number('height');
                        _scroll.css({
                                top: _max_top + 'px'
                        });
                    }
                }
                else
                {
                    _el.attr('scrollTop', 0);
                    _target_top = _target_top * -1;
                    if (_target_top > 50)
                        _target_top = 50;
                    var _top_padding = _el.find('.top-padding:first');
                    if (_top_padding.length == 0) {
                        _top_padding = $('<div class="top-padding"></div>').prependTo(_el);
                    }
                    
                    if (_top_padding.height() < _target_top)
                        _top_padding.css('height', _target_top+'px'); 
                        
                    if (_scroll != null) {
                        _scroll.css({
                                top: 0 + 'px'
                        });
                    }   
                }
            }
            else if (_target_top > 0 && _target_top < _max_height + 1)
            {
                _el.attr('scrollTop', _target_top);
                
                if (_scroll != null) {
                    var _scroll_top = _el.attr('scrollTop') / _el.attr('scrollHeight') * _el_height;
                    var _max_top = _el_height - _scroll.css_number('height');
                    if (_scroll_top < _max_top) {
                        _scroll.css({
                            top: _scroll_top + 'px'
                        });
                    }
                }
            }
            //_ti.html(_scrollStartPos + ', ' + _el.attr('scrollTop')+ ', ' + _pageY]);
			
		};
        
        var _end_event = function(_event) {
            _scrollStartPos = null;
            //_el.css('color', 'black');    //偵測用功能
            
            var _listen_object=  window;
            if ($.browser.msie || $.is_mobile_mode())
                _listen_object = document;
            $(_listen_object).unbind("touchmove", _move_event);
            $(_listen_object).unbind("mousemove", _move_event);
            
            $(_listen_object).unbind("touchend", _end_event);
            $(_listen_object).unbind("mouseup", _end_event);
            
            setTimeout(function () {
                var _top_padding = _el.find('.top-padding:first');
                if (_top_padding.length == 1) {
                    var _option = {};
                    _option['height'] = 0;
                    _top_padding.animate(_option, {
                        queue: false,
                        complete: function () { _top_padding.remove() }
                    });
                }
                
                var _bottom_padding = _el.find('.bottom-padding:first');
                if (_bottom_padding.length == 1) {
                    var _option = {};
                    _option['height'] = 0;
                    _bottom_padding.animate(_option, {
                        queue: false,
                        complete: function () { _bottom_padding.remove() }
                    });
                    var _el_option = {};
                    _el_option['scrollTop'] = _el.attr('scrollTop') - _bottom_padding.height();
                    _el.animate(_el_option, {
                        queue: false
                    });
                }
            }, 0);
            
		};
        _el.bind("touchstart", _start_event);
        _el.bind("mousedown", _start_event);  
        
        var _wheel_event = function (_event, _delta) {
            if (_event.preventDefault)
                _event.preventDefault();
            if (_delta)
            {
                _delta = -_delta;
                var _scroll_top = _el.attr('scrollTop');
                
                _el.attr('scrollTop', _scroll_top + (_delta * 30));
                
                if (_scroll != null) {
                    var _scroll_top = _el.attr('scrollTop') / _el.attr('scrollHeight') * _el_height;
                    var _max_top = _el_height - _scroll.css_number('height');
                    if (_scroll_top < _max_top) {
                        _scroll.css({
                            top: _scroll_top + 'px'
                        });
                    }
                }
            }
        };    //var _wheel_event
        
        _el.mousewheel(_wheel_event);  
    };
    
    _el.ready(function () {
        setTimeout(_setup_message, 500);
    });
};

Modal_factory.get_event_pageY = function (_event) {
    if (typeof(_event.touches) != 'undefined' &&
    typeof(_event.touches[0]) != 'undefined' &&
    typeof(_event.touches[0].pageY) != 'undefined') 
        return _event.touches[0].pageY;
    else {
        //alert(_event.pageY);
        return _event.pageY;
    }
};

Modal_factory.tooltip_config = null;
Modal_factory.tooltip_config_default = {
        delay: 30,
        predelay: 100,
        events: {
            def: 'mouseenter click,mouseleave'
        },
        onBeforeShow: function (_this) {
            if ($.is_null(_this))
                _this = this;
            
            var _tip = _this.getTip();
            var _trigger = _this.getTrigger();
            $('.tooltip-trigger-hover').removeClass('tooltip-trigger-hover');
            _trigger.addClass('tooltip-trigger-hover');
            
            
            //調整tip的位置
            setTimeout(function () {
                var _tip_top = _tip.offset().top;
                if (_tip_top < window.pageYOffset + 30)
                {             
                   var _trigger_bottom = _trigger.offset().top + _trigger.height();
                       _tip.css('top', _trigger_bottom+'px');
                   _tip.addClass('bottom');
                }
                else
                {
                    _tip.removeClass('bottom');
                }
                
                var _tip_left = _tip.offset().left;
                var _x_left = window.pageXOffset;
                
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
            }, 0);    //setTimeout(function () {
        },    //onBeforeShow: function () {
        onBeforeHide: function (_this) {
            if ($.is_null(_this))
            {
                _this = this;
            }
            
            if (typeof(_this.getTrigger) != 'function'
                && typeof(this.getTrigger) == 'function')
                _this.getTrigger = this.getTrigger;
            var _trigger = _this.getTrigger();
            _trigger.removeClass('tooltip-trigger-hover');
        },    //onBeforeHide: function () {
        effect: 'fade'
    }; 

Modal_factory.get_tooltip_config = function (_config) {
    var _tooltip_config;
    if (this.tooltip_config == null)
    {
        _tooltip_config = this.tooltip_config_default;
        
        if ($.is_mobile_mode())
        {
            _tooltip_config['effect'] = 'toggle';
            _tooltip_config['events'] = {
                def: 'mouseenter click,null'
            };
        }
        
        if ($.is_touchable())
        {
           var _touch_event = 'touchstart ';
           _tooltip_config['events']['def'] = _touch_event + _tooltip_config['events']['def'];
           
           var _trigger_class_name = KALS_CONFIG.tooltip.trigger_class_name;
           $('.' + _trigger_class_name).live('touchstart', function (_event) {
               _event.preventDefault();
           });
        }
        
        this.tooltip_config = _tooltip_config;
    }
    
    _tooltip_config = this.tooltip_config; 
    for (var _key in _config)
    {
        var _attr = _config[_key];
        var _tooltip_attr = _tooltip_config[_key];
        if ($.is_function(_attr))
        {   
            _tooltip_config[_key] = function () {
                _attr(this);
                _tooltip_attr(this);
            };
        }
        else
        {
            _tooltip_config[_key] = _attr;
        }
    }
    
    return _tooltip_config;
};

Modal_factory.get_tooltip = function (_config) {
    
    var _id = $.get_parameter(_config, 'id');
    var _content = $.get_parameter(_config, 'content');
    if ($.is_string(_content))
    {
        _content = $(_content);
    }
    
    var _tooltip = null;
    var _tooltip_existed = false;
    
    if ($.isset(_id))
    {
        _tooltip = $('div#' + _id);
        _tooltip_existed = (_tooltip.length > 0);
    }
    if (_tooltip_existed == false)
    {   
        _tooltip = $('<div class="tooltip">' 
            + '<div class="tip-needle top"></div>'
            + '<div class="tip-content"></div>'
            + '<div class="tip-needle bottom"></div>' 
            + '</div>')
            .appendTo($('body'));
        
        if ($.isset(_id))
            _tooltip.attr('id', _id);
        if ($.isset(_content))
            _tooltip.find('.tip-content').append(_content);
    }
    
    return _tooltip;
};

Modal_factory.create_notification = function (_config) {
    
    var _modal = $.create_once('<div id="kals_notification_modal" class="kals-notification-modal"><div class="wrapper"></div></div>');
    
    _modal.overlay({
        speed: 1000,
        closeSpeed: 1000,
        top: '20px',
        left: 'center',
        load: false,
        effect: 'fade',
        onClose: function () {
            this.getOverlay().find('.wrapper').empty();
        }
    });
    
    _modal.set_timeout_close = function (_time) {
        var _this = $(this);
        _this.attr('timeout_close', _time);
        
        if (typeof($CLOSE_NOTIFICATION) != 'undefined')
            clearTimeout($CLOSE_NOTIFICATION);
        
        $CLOSE_NOTIFICATION = setTimeout(function () {
            _this.overlay().close();
        }, _time);
        return this;
    };
    
    _modal.set_message = function (_message, _time) {
        var _this = $(this);
        
        if ($.is_null(_time))
            _time = _this.attr('timeout_close');
        if (typeof(_time) == 'undefined')
            _time = 11000;
        else
            _time = _time + 1000;
        
        var _container = $('<div class="message"></div>').html(_message);
        _this.find('.wrapper').prepend(_container);
        _container.fadeIn();
        setTimeout(function () {
            _container.fadeOut(function () {
                $(this).remove();
            });
        }, _time);
        //_this.html(_message);
        return this;
    };
    
    _modal.load = function() {
        $(this).overlay().load();
        return this;
    };
    
    _modal.set_position = function() {
        var _modal = $(this);
        if (_modal.visible())
        {
            _modal.valign({
                option: 'top',
                offset: '20px'
            });
            _modal.align({
                option: 'center'
            });
        }
        return this;
    };
    
    var _timeout_close = $.get_parameter(_config, 'timeout_close');
    if ($.isset(_timeout_close))
        _modal.set_timeout_close(_timeout_close);
    
    var _message = $.get_parameter(_config, 'message');
    if ($.isset(_message))
        _modal.set_message(_message);
    
    var _load = $.get_parameter(_config, 'load');
    if ($.isset(_load) && _load == true)
        _modal.overlay().load();
    
    if ($.object_isset('KALS_context.view'))
    {
        KALS_context.view.add_listener(_modal, function (_vpm_obs) {
            /*
            if (_modal.visible())
            {
                _modal.valign({
                    option: 'top',
                    offset: '20px'
                });
                _modal.align({
                    option: 'center'
                });
            }
            */
           _modal.set_position();
        });
    }
    
    return _modal;
    
};

Modal_factory.create_toolbar = function () {
    
    var _modal = $.create_once('<div id="kals_toolbar_modal" class="kals-toolbar-modal"></div>');
    
    _modal.overlay({
        speed: 1000,
        closeSpeed: 1000,
        top: '0',
        left: 'center',
        load: true,
        effect: 'fade'
    });
    
    if ($.object_isset('KALS_context.view'))
    {
        KALS_context.view.add_listener(_modal, function (_vpm_obs) {
            if (_modal.visible())
            {
                _modal.fullscreen_width();
                _modal.align({
                    option: 'center'
                });
                _modal.valign({
                    option: 'top',
                    offset: -5
                });
            }
        });
    }
    
    _modal.fullscreen_width();
    _modal.align({
        option: 'center'
    });
    _modal.valign({
        option: 'top',
        offset: -5
    });
    
    
    return _modal;
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

/* End of file Modal_factory */
/* Location: ./system/application/views/web_apps/toolkit/Modal_factory.js */