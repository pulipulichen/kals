/**
 * Dialog_modal
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/26 下午 08:27:46
 * @extends {Overlay_modal}
 */
function Dialog_modal() {
    
    Overlay_modal.call(this);
    
}

Dialog_modal.prototype = new Overlay_modal();

Dialog_modal.prototype._$modal_name = 'Dialog_modal';
    
Dialog_modal.prototype._$create_ui = function () {
    
    var _ui = this._$create_ui_prototype();
    
    _ui.addClass('dialog-modal')
		.addClass('KALS').addClass('window')
        .html('<table align="center" class="dialog-table" height="100%" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody>'
        + '<tr class="dialog-toolbar-tr"><th class="dialog-toolbar" valign="middle">'
            + '<table class="dialog-toolbar-table" width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tbody><tr>'
            + '<td class="toolbar-options toolbar-backward"></td>'
            + '<td class="dialog-heading"></td>'
            + '<td class="toolbar-options toolbar-forward"></td>'
            + '</tr></tbody></table>'
        + '</th></tr>' 
        + '<tr class="dialog-content-tr"><td class="dialog-content-td">'
            + '<div class="dialog-content"></div></td></tr>'
        + '</tbody></table>');
    
    if ($.browser.msie6) {
        _ui.css('width', '480px');
        //_ui.css('font-size', '1.5em');
    }
    
    //$.test_msg('Dialog_modal._$create_ui()', this._$modal_name);
 
    var _config = this._$get_config();
    _ui.overlay(_config);	//jQuery TOOL Overlay
    
    if ($.is_mobile_mode()) {
        _ui.addClass('mobile');
        //var _el = _ui.find('.dialog-content');  
        //this.enable_touch_scroll(_el);
        this.enable_touch_scroll(_ui);
    }
    
    return _ui;
};

Dialog_modal.prototype._$onviewportmove = function (_ui) {
    if ($.browser.msie6) {
        return;
    }
    
    if ($.is_small_width()) {
        _ui.fullscreen_width();
        _ui.addClass('compact-width');
    }
    else {
        _ui.restore();
        _ui.removeClass('compact-width');
    }
    
    if ($.is_small_height()) {
        _ui.addClass('compact-height');
    }
    else {
        _ui.removeClass('compact-height');
    }
    
    _ui.ready(function () {
        
        if ($.is_small_height() 
            && (_ui.height() > $.get_viewport_height() || _ui.height() == $.get_viewport_height())) {
            _ui.valign('top');
        }
        else {
            _ui.css('top', '10%');
        }
        
        _ui.align('center');
    });
};

/**
 * Dialog專用的setup_modal方法
 * @param {Object} _config = {
 *     heading: '標頭語言索引',    //Lang
 *     backword_option: _option,
 *     forword_option: _option,
 *     message: '內文語言索引',    //KALS_language_param
 *     content: '內文UI',    //jQuery，如果同時有message，則會以content為主
 *     display_content: true,    //是否顯示content
 *     options: [_option1, _option2]
 * }
 */
Dialog_modal.prototype.setup_modal = function (_config) {
    
    //2010.10.1 不採用Base用法，而用Prototype往上call
    //this.base(_config);
    Overlay_modal.prototype.setup_modal.call(this, _config);
    
    var _heading = $.get_parameter(_config, 'heading');
    
    if (_heading !== null) {
		this.set_heading(_heading);
	}
    var _backword_option = $.get_parameter(_config, 'backword_option');
    if (_backword_option !== null) {
		this.set_backward_option(_backword_option);
	}
    
    var _forword_option = $.get_parameter(_config, 'forword_option');
    if (_forword_option !== null) {
		this.set_forward_option(_forword_option);
	}
    
    var _message = $.get_parameter(_config, 'message');
    var _content = $.get_parameter(_config, 'content');
    if ($.is_jquery(_content)) {
        this.set_content(_content);
    }
    else if ($.is_string(_message)) {
        this.set_message(_message);
    }
    
    var _display_content = $.get_parameter(_config, 'display_content', true);
    if (_display_content === false) {
        this.toggle_content(false);
    }
    
    var _options = $.get_parameter(_config, 'option');
    if (_options !== null) {
		this.set_options(_options);
	}
    
    return this;  
};

/**
 * 設定標頭
 * @param {string|KALS_language_param} _lang_param
 */
Dialog_modal.prototype.set_heading = function (_lang_param) {
    var _container = this.get_heading();
    if (_container.length == 1) {
        if ($.is_string(_lang_param)) {
            _container.html(_lang_param);
        }
        else {
           KALS_context.lang.add_listener(_container, _lang_param);
        }
    }
    return this;
};

/**
 * 取得標頭
 * @type (jQuery)
 */
Dialog_modal.prototype.get_heading = function () {
    var _ui = this.get_ui();
    var _container = _ui.find('.dialog-heading:first');
    return _container;
};

/**
 * 設定toolbar上的左方按鈕
 * @param {Dialog_option} _option
 */
Dialog_modal.prototype.set_backward_option = function (_option) {
    var _ui = this.get_ui();
    
    var _option_ui = _option;
    if ($.is_jquery(_option) === false) {
        if (typeof(_option.get_ui) != 'function') {
			return this;
		}
        _option_ui = _option.get_ui();
    }
    
    var _container = _ui.find('.toolbar-backward:first');
        
    _container
        .show()
        .append(_option_ui);    
    
     _option_ui.ready(function() {
        
        setTimeout(function () {
            var _width = _option_ui.width();
            if (_width !== 0) {
				_ui.find('.toolbar-options').css('max-width', _width + 'px').show();
			}    
        }, 100);
    });
    
    //同時擁有.with-backward-option.with-forward-option的.dialog-modal，會改變min-width
    _ui.addClass('with-backward-option');
    
    return this;
};

/**
 * 設定toolbar上的右方按鈕
 * @param {Dialog_option} _option
 */
Dialog_modal.prototype.set_forward_option = function (_option) {
    var _ui = this.get_ui();
    
    if (typeof(_option.get_ui) != 'function') {
		return this;
	}
    
    var _option_ui = _option.get_ui();
    var _container = _ui.find('.toolbar-forward:first');
    
    _container
        .show()
        .append(_option_ui);
    
    /*
    _option_ui.ready(function() {
        
        setTimeout(function () {
            var _width = _option_ui.width();
            if (_width != 0)
                _ui.find('.toolbar-options').css('max-width', _width + 'px').show();    
        }, 100);
    });
    */
   
    this.set_backward_option(_option_ui.clone().css('visibility', 'hidden'));
    
    
    //同時擁有.with-backward-option.with-forward-option的.dialog-modal，會改變min-width
    _ui.addClass('with-forward-option');
    
    return this;
};

/**
 * 切換顯示工具列的按鈕
 * @param {boolean} _display
 * @returns {Dialog_modal}
 */
Dialog_modal.prototype.toggle_toolbar_option = function(_display) {
    
    var _toolbar = this.get_ui('.dialog-toolbar:first');
    
    var _classname = 'hide-option';
    if ($.is_null(_display)) {
        _toolbar.toggleClass(_classname);
    }
    else if (_display) {
        _toolbar.removeClass(_classname);
    }
    else {
        _toolbar.addClass(_classname);
    }
        
    return this;
};

/**
 * 設定內文
 * @param {string|KALS_language_param|jQuery} _lang
 */
Dialog_modal.prototype.set_content = function (_lang) {
    var _container = this.get_content();
    
    if (_container.length == 1) {
        this.toggle_content(true);
        this.get_ui().addClass('with-content');
        if ($.is_null(_lang)) {
            //如果是空物件，則隱藏
            _container.empty();
            this.toggle_content(false);
            this.get_ui().removeClass('with-content');  
        }
        else if ($.is_string(_lang)) {
            _container.html(_lang);
        }
        else if ($.is_class(_lang, 'KALS_language_param')) {
            if (typeof(KALS_context) != 'undefined') {
                KALS_context.lang.add_listener(_container, _lang);
            }
        }
        else {
            _container.empty();
            
            if ($.isset(_lang)) {
                _container.append(_lang);
                _lang.show();
            }
        }
        
    }
    return this;
};

Dialog_modal.prototype.set_content_temp = function () {
    var _container = this.get_content();
    
    var _content = _container.children();
    
    if (_content.length > 0) {
        _content.hide()
            .appendTo($('body'));
    }
    
    return this;
};

Dialog_modal.prototype.get_content = function () {
    var _ui = this.get_ui();
    
    var _container = _ui.find('.dialog-content:first');
    return _container;
};

Dialog_modal.prototype.toggle_content = function (_display, _callback) {
    if ($.is_function(_display) && $.is_null(_callback)) {
        _callback = _display;
        _display = null;
    }
    
    var _ui = this.get_ui();
    
    //var _container = _ui.find('.dialog-content-tr:first');
    var _container = _ui.find('.dialog-content:first');
    
    if (_display === null) {
        _container.toggle();
    }
    else if (_display === true) {
        _container.show();
    }
    else {
        _container.hide();
    }
    
    $.trigger_callback(_callback);
    return this;
};

/**
 * 設置下方按鈕
 * @param {Array|Dialog_option} _options
 * @param {boolean} _double_col = true
 */
Dialog_modal.prototype.set_options = function (_options, _double_col) {
    
    if ($.is_null(_options)) {
        _options = [];
    }
    else if (false == $.is_array(_options)) {
        _options = [_options];
    }
        
    //$.test_msg('set_options', _options.length);
    
    if ($.is_null(_double_col)) {
        _double_col = true;
    }
    
    var _ui = this.get_ui();
    
    _tbody = _ui.find('tbody:first');
    
    //_tbody.find('.dialog-options').remove();
    _tbody.find('.dialog-options').hide().appendTo($('body'));
    
    _ui.removeClass('with-options');
    
    for (var _index = 0; _index < _options.length; _index++) {
        //$.test_msg('set_options forloop', [$.get_class(_options[_index]), (typeof(_options[_index].get_ui))]);
        
        if (typeof(_options[_index].get_ui) !== 'function') {
            continue;
        }
        
        var _option_ui = _options[_index].get_ui();
        
        
        
        if (_index === 0) {
            _ui.addClass('with-options');
        }
        
        if (_index < _options.length -1
            && _double_col === true) {
            var _option_left = _option_ui;
            _index++;
            var _option_right = _options[_index].get_ui();
            
            var _tr = $('<tr class="dialog-options"><td></td></tr>')
                .appendTo(_tbody);
                
            _tr.find('td').append(_option_left)
                .append(_option_right);
            _option_left.addClass('option-left');
            _option_right.addClass('option-right');
        }
        else {
            var _option = _option_ui;
            _tr = $('<tr class="dialog-options"><td></td></tr>')
                .appendTo(_tbody);
                
            _tr.find('td:first').append(_option);
        }
        
    }
    return this;
};

/**
 * 決定是否顯示Options
 * @param {null|boolean} _display
 */
Dialog_modal.prototype.toggle_options = function (_display) {
    
    var _ui = this.get_ui();
    
    if ($.is_null(_display)) {
        _ui.toggleClass('hide-options');
    }
    else if (_display === true) {
        _ui.removeClass('hide-options');
    }
    else {
        _ui.addClass('hide-options');
    }
    
    //$.test_msg('toggle_options', _ui.attr('className'));
    
    return this;
};

/**
 * 將焦點鎖定在第一個按鈕上
 * @param {number} _offset = 0;
 */
Dialog_modal.prototype.focus_option = function (_offset) {
    if (this._setted_focus === true) {
		return this;
	}
    
    var _ui = this.get_ui();
    
    if (_ui !== null) {
        if ($.is_null(_offset)) {
			_offset = 0;
		}
            
        var _option = _ui.find('.dialog-options .dialog-option').eq(_offset);
        
        if (_option.length == 1) {
			_option.focus();
		}
        
        this._setted_focus = true;
    }
    return this;
};

Dialog_modal.prototype._setted_focus = false;

/**
 * 將有捲軸的物件轉換成可以碰觸捲軸
 * @param {jQuery} _el 要設定成可以碰觸捲軸的物件 
 */
Dialog_modal.prototype.enable_touch_scroll = function (_el) {
    
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
            
            /*
            var _el_position = _el.css('position').toLowerCase();
            if (_el_position == 'absolute' || _el_position == 'fixed') {
                //加入wrapper!
                var _scroll_wrapper = $('<div class="scroll-wrapper"></div>').appendTo($('body'));
                var _el_offset = _el.offset();
                
                _scroll_wrapper.css({
                    position: _el_position,
                    top: _el_offset.top + 'px',
                    left: _el_offset.left + 'px',
                    zIndex: _el.css('z-index')
                });
                
                _scroll_wrapper.append(_el);
                _el.css('position', 'static');
            }
            */
           
            var _scroll_container = $('<div class="scroll-container"><div class="scroll">&nbsp;</div></div>').css({
                    height: _el_height + 'px'
                })
                .prependTo(_el);
                //.insertBefore(_el);
            
            _scroll_container.ready(function () {
                //var _el_offset = _el.offset();
                var _el_offset = $.get_offset(_el);
                
                //_scroll_container.css('top', _el_offset.top + 'px');
                _scroll_container.css('position', 'fixed');
                _scroll_container.css('top', 0);
                if ($.is_mobile_mode()) {   
                    //_scroll_container.css('top', _el_offset.top + 'px');
                }
                else {   
                    _scroll_container.css('top', 0);    
                }
                _scroll_container.css('right', '5px');
                _scroll_container.css('z-index', _el.css('z-index'));
                //_scroll_container.css('left', (_el_offset.left + _el.width() - _scroll_container.width() - 5) + 'px' );
                //_scroll_container.
                
                $(function () {
                    KALS_context.view.add_listener(function () {
                        /*
                        _scroll_container.valign('top');
                        _scroll_container.align({
                            option: 'right',
                            offset: '5px'
                        });
                        */
                        _scroll_container.css('position', 'fixed');
                        _scroll_container.css('top', 0);    
                    });    
                });
                    
            });
            
            //_scroll_container.hide();
            
            _scroll_height = _el_height / _el.attr('scrollHeight') * _el_height;
            _scroll = _scroll_container.find('.scroll');
            _scroll.css({
                height: _scroll_height + 'px',
                position: 'relative'
            });
            _el.css('overflow-y', 'hidden');
            _el.css('cursor', 'n-resize');
            
            setTimeout(function () {
                _el.attr('scrollTop', 0);
            }, 1000);
        }

        var _start_event = function(_event) {
            //_el.css('color', 'red');    //偵測用功能
            _event.preventDefault();
            var _pageY = _get_event_pageY(_event);
            _scrollStartPos = _el.attr('scrollTop') + _pageY;
            
            var _listen_object=  window;
            if ($.browser.msie || $.is_mobile_mode()) {
                _listen_object = document;
            }
            
            $(_listen_object).bind("touchmove", _move_event);
            $(_listen_object).bind("mousemove", _move_event);
            
            $(_listen_object).bind("touchend", _end_event);
            $(_listen_object).bind("mouseup", _end_event);
            $(_listen_object).bind("mouseout", _end_event);
        };
        
        var END_TIMER;
        var _move_event = function(_event) {
            if (_scrollStartPos === null) {
                return;
            }
            
            //_el.css('color', 'blue');    //偵測用功能
            _event.preventDefault();
            
            var _origin_scroll_top = _el.attr('scrollTop'); 
            var _pageY = _get_event_pageY(_event);
            var _target_top = (_scrollStartPos - _pageY);
            _el.attr('scrollTop', _target_top);
            var _max_height = _el.attr('scrollHeight');
            
            if (_scroll !== null
                && _el.attr('scrollTop') === _origin_scroll_top) {
                
                if (_origin_scroll_top > 0) {
                
                    _target_top = _target_top - _el.attr('scrollTop');
                    if (_target_top > 50) {
						_target_top = 50;
					}
                    var _bottom_padding = _el.find('.bottom-padding:first');
                    if (_bottom_padding.length === 0) {
                        _bottom_padding = $('<div class="bottom-padding"></div>').appendTo(_el);
                    }
                    if (_bottom_padding.height() < _target_top) {
						_bottom_padding.css('height', _target_top + 'px');
					}
                    _bottom_padding.css('height', _target_top + 'px');
                    
                    if (_scroll !== null) {
                        var _max_top = _el_height - _scroll.css_number('height');
                        _scroll.css({
                                top: _max_top + 'px'
                        });
                    }
                }
                else {
                    _el.attr('scrollTop', 0);
                    _target_top = _target_top * -1;
                    if (_target_top > 50) {
						_target_top = 50;
					}
                    var _top_padding = _el.find('.top-padding:first');
                    if (_top_padding.length === 0) {
                        _top_padding = $('<div class="top-padding"></div>').prependTo(_el);
                    }
                    
                    if (_top_padding.height() < _target_top) {
						_top_padding.css('height', _target_top + 'px');
					} 
                        
                    if (_scroll !== null) {
                        _scroll.css({
                                top: 0 + 'px'
                        });
                    }   
                }
            }
            else if (_target_top > 0 && _target_top < _max_height + 1) {
                _el.attr('scrollTop', _target_top);
                
                if (_scroll !== null) {
                    var _scroll_top = _el.attr('scrollTop') / _el.attr('scrollHeight') * _el_height;
                    _max_top = _el_height - _scroll.css_number('height');
                    if (_scroll_top < _max_top) {
                        _scroll.css({
                            top: _scroll_top + 'px'
                        });
                    }
                }
            }
            //_ti.html(_scrollStartPos + ', ' + _el.attr('scrollTop')+ ', ' + _pageY]);
			
            clearTimeout(END_TIMER);
            
            END_TIMER = setTimeout(function () {
                
                _end_event();
                
            }, 1000);
		};
        
        var _end_event = function(_event) {
            
            clearTimeout(END_TIMER);
            
            _scrollStartPos = null;
            //_el.css('color', 'black');    //偵測用功能
            
            var _listen_object=  window;
            if ($.browser.msie || $.is_mobile_mode()) {
				_listen_object = document;
			}
            $(_listen_object).unbind("touchmove", _move_event);
            $(_listen_object).unbind("mousemove", _move_event);
            
            $(_listen_object).unbind("touchend", _end_event);
            $(_listen_object).unbind("mouseup", _end_event);
            
            setTimeout(function () {
                var _top_padding = _el.find('.top-padding:first');
                if (_top_padding.length === 1) {
                    var _option = {};
                    _option.height = 0;
                    _top_padding.animate(_option, {
                        queue: false,
                        complete: function () { _top_padding.remove(); }
                    });
                }
                
                var _bottom_padding = _el.find('.bottom-padding:first');
                if (_bottom_padding.length == 1) {
                    _option = {};
                    _option.height = 0;
                    _bottom_padding.animate(_option, {
                        queue: false,
                        complete: function () { _bottom_padding.remove(); }
                    });
                    var _el_option = {};
                    _el_option.scrollTop = _el.attr('scrollTop') - _bottom_padding.height();
                    _el.animate(_el_option, {
                        queue: false
                    });
                }
            }, 0);
            
		};
        _el.bind("touchstart", _start_event);
        _el.bind("mousedown", _start_event);  
        
        var _wheel_event = function (_event, _delta) {
            if (_event.preventDefault) {
				_event.preventDefault();
			}
            if (_delta) {
                _delta = -_delta;
                var _scroll_top = _el.attr('scrollTop');
                
                _el.attr('scrollTop', _scroll_top + (_delta * 30));
                
                if (_scroll !== null) {
                    _scroll_top = _el.attr('scrollTop') / _el.attr('scrollHeight') * _el_height;
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

Dialog_modal.prototype.get_event_pageY = function (_event) {
    if (typeof(_event.touches) != 'undefined' &&
	typeof(_event.touches[0]) != 'undefined' &&
	typeof(_event.touches[0].pageY) != 'undefined') {
		return _event.touches[0].pageY;
	}
	else {
		//alert(_event.pageY);
		return _event.pageY;
	}
};

/**
 * open的時候，focus在第一顆按鈕上
 * @param {Object} _callback
 */
Dialog_modal.prototype.open = function (_callback) {
    
    var _this = this;
    this._setted_focus = false;
    var _open_callback = function (_ui) {
        
        //$.test_msg('Dialog_modal.open() _open_callback');
        
        _this.focus_option();
        
        if ($.is_function(_callback)) {
			_callback(_ui);
		}
    };
    
    //2010.10.1 不使用Base庫
    //return this.base(_open_callback);
    
    //$.test_msg('檢查Dialog_modal.open的_callback', [ this._$modal_name ,_open_callback]);
    return Overlay_modal.prototype.open.call(this, _open_callback);
};

/**
 * 曝光
 * 
 * 背後加上深色背景的Mask
 * @param {Object} _callback
 */
Dialog_modal.prototype.expose = function (_callback) {
    var _this = this;
    var _expose_callback = function () {
        _this.focus_option();
        $.trigger_callback(_callback);   
    };
    
    //2010.10.1 不使用Base庫
    //return this.base(_expose_callback);
    return Overlay_modal.prototype.expose.call(this, _expose_callback);
};
/* End of file Dialog_modal */
/* Location: ./system/application/views/web_apps/Dialog_modal.js */