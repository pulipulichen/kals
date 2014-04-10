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
 * @param {Selectable_text} _selectable_text 父物件
 */
function Select_tooltip(_selectable_text) {
    
    Tooltip_modal.call(this);
    
    var _this = this;
    setTimeout(function () {
        _this.get_ui();
    }, 0);
    
    KALS_context.init_profile.add_listener(function () {
        _this.reset();
    });
	
    setTimeout(function () {
        KALS_text.selection.select.add_listener("select", function() {
                _this.reset();
        });

        KALS_text.selection.select.add_listener("clear", function() {
            _this.reset();
        });
    }, 0);
    
    this._selectable_text = _selectable_text;
}

Select_tooltip.prototype = new Tooltip_modal();

/**
 * 父物件
 * @type {Selectable_text}
 */
Select_tooltip.prototype._selectable_text;

// -----------------------------------
// 內部參數設定
// -----------------------------------

/**
 * 允許選取
 * @type Boolean
 */
Select_tooltip.prototype.enable_select = false;

/**
 * 開始的ID
 * @type String
 */
Select_tooltip.prototype.tooltip_id = 'kals_select_tooltip';

// -----------------------------------
// 方法
// -----------------------------------


/**
 * 重置成為初始狀態
 */
Select_tooltip.prototype.reset = function () {
	var _ui = this.get_ui();
    _ui.removeClass('hide');
    _ui.hide();
    this.enable_select = true;
};

/**
 * 設定tooltip
 * @returns Select_tooltip
 */
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
       
       if (typeof(TRIGGER_TOUCHSTART_EVENT_LOCK) === 'undefined')
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
    var _this = this;
        
    var _tip = _this.getTip();
    if (_tip.length === 0) {
        return;
    }
            
    if (_select_tooltip.enable_select === false) {
        return;
    }

    var _trigger = _this.getTrigger();
    var _id = $.get_prefixed_id(_trigger);

    _select_tooltip._event = _event;
    _select_tooltip._tip = _tip;
    _select_tooltip._trigger = _trigger;
        
    var _position_setup = function () {
        $('.tooltip-trigger-hover').removeClass('tooltip-trigger-hover');
        _trigger.addClass('tooltip-trigger-hover');
	        
	        //$.test_msg('Select_tooltip._$get_config()', _tip.length);
	        
			//_select_tooltip.setup_position(_event);
	        
	        
	        // --------
	        	        
	        _tip.attr('word_id', _id);
	        
	        //在顯示之前，決定是否要調整
	        var _selected_classname = 'selected';
	        if (KALS_text.selection.select._select_from !== null) {
	            _tip.addClass(_selected_classname);
	        }
	        else {
	            _tip.removeClass(_selected_classname);
	        }
	        
	        if ($.is_function(_onbeforeshow)) {
	            _onbeforeshow.call(_this);
	        }
		};    //var _position_setup = function () {
		
		// 讀取標註
        _select_tooltip.load_tooltip_annotation(_id, function () {
			_position_setup();
		});
    };    //onBeforeShow: function () {
    
    var _onbeforehide = $.get_parameter( _config, 'onBeforeHide' );
    _config['onBeforeHide'] = function (_this) {
        
        if (_select_tooltip.enable_select === false) {
            return;
        }
        
        //if ($.is_null(_this))
        //{
            _this = this;
        //}
        
        if (typeof(_this.getTrigger) !== 'function'
            && typeof(this.getTrigger) === 'function')
            _this.getTrigger = this.getTrigger;
        var _trigger = _this.getTrigger();
        _trigger.removeClass('tooltip-trigger-hover');
        
        if ($.is_function(_onbeforehide)) {
            _onbeforehide.call(this);
        }
        
    };    //onBeforeHide: function () {
    
    if ($.is_mobile_mode()) {
        _config['effect'] = 'toggle';
    }
    //else
    //    _config['effect'] = 'fade';
    
    return _config;
};

/**
 * 重設標註的位置
 * @param {Object} _tip
 * @param {Object} _trigger
 * @param {function} _callback
 */
Select_tooltip.prototype.setup_position = function (_callback) {
	
	this.setup_position_pdf2htmlex();
	
	var _tip = this._tip;
	var _trigger = this._trigger; 
	var _event = this._event;
	
	//$.test_msg("tooltip setup_position", [typeof _tip, typeof _trigger]);
	
	//調整tip的位置
    //setTimeout(function () {
	   /*
        var _trigger_bottom;
        var _tip_top = _tip.offset().top;
        var _top_padding = KALS_toolbar.get_ui().height();
        if (_tip_top < window.pageYOffset + _top_padding) {             
           _trigger_bottom = _trigger.offset().top + _trigger.height();
               _tip.css('top', _trigger_bottom+'px');
           _tip.addClass('bottom');
        }
        else {
            _tip.removeClass('bottom');
        }
        
        var _tip_left = _tip.offset().left;
        var _x_left = window.pageXOffset;
        */
        // 如果他沒有對到字的正上方，則調整一下吧
        /*
        var _trigger_offset = _trigger.offset();
        
		var _tip_width = _tip.width();
		var _tip_height = _tip.height();
		
		var _trigger_width = _trigger.width();
		var _trigger_hei
		
		var _min_width = (_tip_width / 2);
		
		$.test_msg('Select_tooltip._$get_config()'
		  , [_trigger.offset().left, _trigger.offset().top
		      , _tip.offset().left, _tip.offset().top
			  , _min_width]);
		*/
		
		/*
        if (Math.abs( _tip_left - _trigger_offset.left) > _min_width ) {
            //那就定位在滑鼠上方
            //$.test_msg('Select_tooltip._$get_config()', [_event.clientX, _event.clientY]);
            _tip_left = _event.clientX - (_tip.width() / 2);
            _tip.css('left', _tip_left + 'px');
            
            _tip_top = window.pageYOffset + _event.clientY - _tip.height() - 3;
            //$.test_msg('Select_tooltip._$get_config()', [_tip_top]);
            _tip.css('top', _tip_top+'px');
            if (_tip_top < window.pageYOffset + _top_padding) {             
               _tip_top = window.pageYOffset + _event.clientY + (_trigger.height() / 3);
                   _tip.css('top', _tip_top+'px');
               _tip.addClass('bottom');
               //$.test_msg('Select_tooltip._$get_config() bottom', [_event.clientY, _tip_top, window.pageYOffset, _top_padding]);
            }
            else {
                $.test_msg('Select_tooltip._$get_config() top', [_tip_top]);
                _tip.css('top', _tip_top+'px');
                _tip.removeClass('bottom');
            }
        }   //if (Math.abs( _tip_left - _trigger_offset.left) > 50 ) {
        */
		
		_tip
                  //.removeClass('bottom')
		  .removeClass('left')
		  .removeClass('right');
		
		var _is_bottom = false;
		
        _tip.position({
            my: 'center bottom',
            at: 'center top',
            of: _trigger
        });
		
		var _tip_offset = _tip.offset();
		
		var _margin_width = 5;
		
		var _my_y = "bottom";
		var _at_y = "top";
		var _my_x = "center";
		var _at_x = "center";
		var _changed = false;
		
		if ( _tip_offset.top > _trigger.offset().top || 
                    (_tip_offset.top < window.pageYOffset + _margin_width + KALS_toolbar.get_height()) ) {
			//_tip.addClass('bottom');
			_my_y = "top";
			_at_y = "bottom";
			_is_bottom = true;
			_changed = true;
		}
		
		//$.test_msg('tooltip is bottom [1]', [_tip_offset.top, _trigger.offset().top]);
        //$.test_msg('tooltip is bottom [2]', [_tip_offset.top, [window.pageYOffset, _margin_width, KALS_toolbar.get_height()], _is_bottom]);
		this.toggle_bottom(_is_bottom);
		//this.toggle_bottom(true);
		
		if (_tip_offset.left < window.pageXOffset + _margin_width) {
			_my_x = "left";
			_at_x = "left";	
			_tip.addClass('left');
			_changed = true;
		}
		
		if (_tip_offset.left + _tip.width() > window.pageXOffset + $("body").width() + _margin_width) {
			//$.test_msg("tip right", [[_tip_offset.left, _tip.width(), _tip_offset.left + _tip.width()], [window.pageXOffset, $("body").width(), _margin_width]]);
			
            _my_x = "right";
            _at_x = "right"; 
            _tip.addClass('right');
			_changed = true;
        }
		
		if (_changed) {
			_tip.position({
                my: _my_x + ' ' + _my_y,
                at: _at_x + ' ' + _at_y,
                of: _trigger
            });
		}
			
		
        //$.test_msg("position");
		
        
		$.trigger_callback(_callback);
    return this;
    //}, 0);    //setTimeout(function () {
};

/**
 * 確認是否是bottom模式
 */
Select_tooltip.prototype.check_bottom = function () {
	var _tip = this._tip;
    var _trigger = this._trigger; 
    var _event = this._event;
	
	var _bottom = "bottom";
	var _tip_offset = _tip.offset();
	var _margin_width = 5; 
	//var _is_bottom = false;
	if ( _tip_offset.top > _trigger.offset().top && 
                    (_tip_offset.top < window.pageYOffset + _margin_width + KALS_toolbar.get_height()) ) {
        //_is_bottom = true;
		_tip.addClass(_bottom);
    }
	else {
		_tip.removeClass(_bottom);
	}
};

/**
 * 切換bottom模式
 * @param {boolean} _is_bottom
 */
Select_tooltip.prototype.toggle_bottom = function (_is_bottom) {
	//$.test_msg('Tooltip toggle_bottom', _is_bottom);
	
	var _content = this.get_ui().find(".tip-content:first");
	var _item_ui = this._item.get_ui();
	
        var _tip = _content.parent();
        
	if (_is_bottom) {
		_item_ui.appendTo(_content);
                _tip.addClass('bottom');
	}
	else {
		_item_ui.prependTo(_content);
                _tip.removeClass('bottom');
	}
};

/**
 * 20131108 Pulipuli Chen
 * 只有在pdf2htmlEX的特殊情況下才使用的定位
 */
Select_tooltip.prototype.setup_position_pdf2htmlex = function () {
	
	var _tip = this._tip;
	var _trigger = this._trigger;
    
    if ($(".ff1").length > 0) {
        
        var _trigger_offset = _trigger.offset();
        _tip_left = (_trigger_offset.left + _trigger.width() / 2 / 2) - (_tip.width() / 2 );
        _tip.css("visibility", "hidden");
        setTimeout(function () {
            _tip.css("left", _tip_left + "px");
            _tip.css("visibility", "visible");
        }, 0);
    }
};

/**
 * Tooltip的設定
 * @type {Object}
 */
Select_tooltip.prototype._tooltip_config = null;

/**
 * 載入初始化tooltip設定
 * @returns {Select_tooltip.prototype@call;_$get_config}
 */
Select_tooltip.prototype.get_tooltip_config = function () {
    if (this._tooltip_config === null) {
        this._tooltip_config = this._$get_config();
    }
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
Select_tooltip.prototype._$create_ui = function () {
    var _this = this;
    
    var _tooltip_id = this.tooltip_id;
    var _container_classname = this.container_classname;
    var _button_classname = this.button_classname;
    
    var _select_button = $('<button class="' + _button_classname + ' select">SELECT</button>');
    var _cancel_button = $('<button class="' + _button_classname + ' cancel">CANCEL</button>');
    
    var _content = $('<div class="tooltip">' 
            + '<div class="tip-needle top"></div>'
            + '<div class="tip-content"></div>'
            + '<div class="tip-needle bottom"></div>' 
            + '</div>');
			
    var _item = this._setup_item();
    _item.get_ui().prependTo(_content.find(".tip-content:first"));
	
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
    
    //var _word_id_prefix = Selection_manager.prototype.word_id_prefix;
    //var _word_id_prefix = Selectable_text_word.prototype.word_id_prefix;
    //var _word_id_prefix = KALS_CONFIG.classname.selectable_text.word_id_prefix;
    var _selectable_text = this._selectable_text;
    
    /*
    var _select_event = function (_event) {
        _this._select_event(_event);
    };
    
    var _cancel_event = function (_event) {
        _this._cancel_event(_event);
    };
    */
    _select_button.click(function (_event) {
        _this._select_event(_event);
    });
    _cancel_button.click(function (_event) {
        _this._cancel_event(_event)
    });
    
    _select_tooltip.addClass('hide');
    
    var _deny_read_classname = 'deny-read';
    KALS_context.policy.add_attr_listener('read', function (_policy) {
        //$.test_msg('Select_tooltip._$create_ui()', _policy.readable());
        if (_policy.readable()) {
            _select_tooltip.removeClass(_deny_read_classname);
        }
        else {
            _select_tooltip.addClass(_deny_read_classname);
        }
    }, true);
    
    return _select_tooltip;
};

/**
 * 選取事件
 * @param {Object} _event
 * @returns Select_tooltip
 */
Select_tooltip.prototype._select_event = function (_event) {
    //先叫原本的事件不要動
    _event.preventDefault();

    //先關掉上一個的word的Tooltip
    var _tooltip_id = this.tooltip_id;
    
    var _tooltip = $('#' + _tooltip_id);
    var _word_id = _tooltip.attr('word_id');
    //var _word = $('#' + _word_id_prefix + _word_id );
    
    //$.test_msg("_select_event " + this.tooltip_id + ": ", _word_id);
    var _word = this._selectable_text.get_word(_word_id);

    _word.tooltip().hide();

    //呼叫Selection_manager.listen_select()事件
    //_this.listen_select(_word);
    //KALS_text.selection.listen_select(_word);

    KALS_text.selection.select.set_select(_word);
    
    return this;
};

/**
 * 取消事件
 * @param {Object} _event
 * @returns Select_tooltip
 */
Select_tooltip.prototype._cancel_event = function (_event) {
    //先叫原本的事件不要動
    _event.preventDefault();

    var _tooltip_id = this.tooltip_id;

    var _tooltip = $('#' + _tooltip_id);
    var _word_id = _tooltip.attr('word_id');
    //var _word = $('#' + _word_id_prefix + _word_id );
    var _word = this._selectable_text.get_word(_word_id);
    _word.tooltip().hide();

    KALS_text.selection.select.cancel_select();
    
    return this;
};

/**
 * 顯示標註的功能
 * 
 */
Select_tooltip.prototype._item = null;

Select_tooltip.prototype._setup_item = function () {
    var _item = new List_item_tooltip();
    this._item = _item;
    return _item;
};

/**
 * 記錄現在在讀取的ID
 * @deprecated 不使用 Pulipuli Chen 20131116
 */
//Select_tooltip.prototype._load_id = null;

/**
 * 讀取單一標註
 * @param int _index 標註的位置
 * @param function _callback
 */
Select_tooltip.prototype.load_tooltip_annotation = function (_index, _callback) {
	
	//var _item_ui = this._item.get_ui();
	//_item_ui.hide();
	this.reset_style();
	var _url = 'annotation_getter/tooltip';
	var _data = _index;
	
	var _ui = this.get_ui();
	_ui.addClass("loading");
	
	var _this = this;
	var _ajax_callback = function (_data) {
		//$.test_msg("load_tooltip_annotation", _data);
		
		if (_data.count > 0) {
			var _annotation_json = _data.annotation;
			var _param = new Annotation_param(_annotation_json);
                        _this._item.set_data(_param);
			
			var _count = _data.count;
			_this._item.set_count(_count);
			
			//_item_ui.show();
			_this.set_has_annotation();
		}
		//_ui.css("visibility", "visible");
		
         _this._item.adjust_note();
		setTimeout(function () {
             
			 // @author Pulipuli Chen 20131117 17:16 
			 // 這是可以用的版本
			 
			 
			 _this.setup_position(function () {
			 	_this._item.adjust_note(function () {
					
					// 調整過note之後，位置會有所改變，所以需要再調整
					
					setTimeout(function () {
						//$.test_msg('第二次 setup_position');
						_ui.removeClass("loading");
						_this.setup_position();
					}, 0);
				});
			 });
			 $.trigger_callback(_callback);
			 
			 //_this.setup_position(function () {
			 	//setTimeout(function () {
				//	_this.check_bottom();
				//}, 1000);	
			 //});
			 
			 
			 
			 //_ui.appendTo($('body'));
			 
			 //setTimeout(function () {
			 //	_this._item.adjust_note(function () {
			 //		_ui.addClass("loading");
             //       _this.setup_position(function () {
			 //			_ui.removeClass("loading");
			 //		});
             //    });
			 //}, 0);     
        }, 0);
	};
	
	KALS_util.ajax_get({
		url: _url,
		data: _data,
		callback: _ajax_callback
	});
	
	
	return this;
};

Select_tooltip.prototype._has_annotation_classname = "has-annotation";

/**
 * 重設tooltip的樣式
 */
Select_tooltip.prototype.reset_style = function () {
	var _ui = this.get_ui();
	_ui.removeClass(this._has_annotation_classname);
};

/**
 * 變成有標註的樣式
 */
Select_tooltip.prototype.set_has_annotation = function () {
    var _ui = this.get_ui();
    _ui.addClass(this._has_annotation_classname);
};

/**
 * 顯示的位置
 */
Select_tooltip.prototype._tip = null;

/**
 * 觸動的位置
 */
Select_tooltip.prototype._trigger = null;


/**
 * 事件記錄
 */
Select_tooltip.prototype._event = null;

/* End of file Select_tooltip */
/* Location: ./system/application/views/web_apps/Select_tooltip.js */