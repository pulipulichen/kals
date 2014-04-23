/**
 * Annotation_gesture_tool
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/16 下午 09:46:28
 * @extends {Overlay_modal}
 * @param {jQuery} _selector
 */
function Annotation_gesture_tool(_selector) {
    
    Annotation_tool.call(this, _selector);
    
}

Annotation_gesture_tool.prototype = new Annotation_tool();

/**
 * Create UI
 * @memberOf {Annotation_tool}
 * @type {jQuery} UI
 */
Annotation_gesture_tool.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass('annotation-tool')
        .addClass('draggable-tool')
        .addClass('kals-modal')
		.addClass("KALS")	
		.addClass("gesture")
		.hide()
        .appendTo($('body'));
		
       
    var _config = this._$get_config();
    
    //$.test_msg('Annotation_tool._$create_ui()', _config.onBeforeLoad);
    
    _ui.overlay(_config);
    
	
	var _button_left = $("<button></button>")
		.addClass("close-button")
		.addClass("left")
		.appendTo(_ui);
	var _button_right = $("<button></button>")
		.addClass("close-button")
		.addClass("right")
		.appendTo(_ui);
	
	// 設定語系檔
	//var _lang = new KALS_language_param(
	//	'CLOSE',
    //	'dialog.option.close'
	//);
	//KALS_context.lang.add_listener(_button_left, _lang);	
	//KALS_context.lang.add_listener(_button_right, _lang);
	
	var _select_timer = null;
	var _tool = this;
	
	var _close_left = function () {
		if (_tool.is_opened() === false) {
			return;
		}
		//$.test_msg("close left");
		if (_tool._$closable) {
	        var _ui = _tool.get_ui();
	        if (_ui !== null) {
	            _ui.hide('slide',{direction:'left'},100);
	        }
	        if ($.is_function(_tool._$onclose)) {
				_tool._$onclose(_tool._ui);
			}
	        //if ($.is_function(_callback)) {
			//	_callback(_tool._ui);
			//}
	            
	        //跟Modal_controller註冊關閉
	        if (typeof(KALS_context) == 'object' && typeof(KALS_context.modal) == 'object') {
				KALS_context.modal.delete_opened(_tool);
			}
	    }
	    return _tool;
	};
	
	_button_left.click(_close_left);
	
	var _close_right = function () {
		if (_tool.is_opened() === false) {
			return;
		}
		
		//$.test_msg("close left");
		if (_tool._$closable) {
	        var _ui = _tool.get_ui();
	        if (_ui !== null) {
	            _ui.hide('slide',{direction:'right'},100);
	        }
	        if ($.is_function(_tool._$onclose)) {
				_tool._$onclose(_tool._ui);
			}
	        //if ($.is_function(_callback)) {
			//	_callback(_tool._ui);
			//}
	            
	        //跟Modal_controller註冊關閉
	        if (typeof(KALS_context) == 'object' && typeof(KALS_context.modal) == 'object') {
				KALS_context.modal.delete_opened(_tool);
			}
	    }
	    return _tool;
	};
	_button_right.click(_close_right);
	_button_left.mouseover(function () {
		clearTimeout(_select_timer);
		
		_select_timer = setTimeout(function() {
								_button_left.click();
							//_select_timer = null;
								}, 1000);
	});
	_button_right.mouseover(function () {
		clearTimeout(_select_timer);
		
		_select_timer = setTimeout(function() {
								_button_right.click();
							//_select_timer = null;
								}, 1000);
	});
	
    //建立標註列表
    // TODO Annotation_tool._$create_ui() _list_group
    var _topic_list = this.setup_list();
    
	//設置標註列表
    var _topic_list_ui = _topic_list.get_ui();
    _topic_list_ui.addClass('annotation-tool-list')
        .appendTo(_ui);
	_ui.find(".annotation-tool-list").css("font-family","微軟正黑體");
    
	
	var _anchor_text = $("<div></div>")
		.addClass("anchor-text")
		.insertBefore(_topic_list_ui);
	_ui.find(".anchor-text").css("font-weight","bolder");
	
		
	
    this.setup_view();
    
	// 熱鍵操作
	KALS_context.hotkey.register_hotkey(37, _close_left);
	KALS_context.hotkey.register_hotkey(39, _close_right);
	
	_ui.keydown(function (_event) {
		$.test_msg('keydown');
		if (_event.which == 37) {
			_close_left();
		}
		else if (_event.which == 39) {
			_close_right();
		}
	});
	
    return _ui;
};

Annotation_gesture_tool.prototype.onselect = function () {
	this.open();
    return this;
};

Annotation_gesture_tool.prototype.open = function (_callback) {
    
    this.setup_position();
    var _ui = this.get_ui();
	
	var pos_align = 0;
	//體感模式下使用UI左右判斷式
	if(KALS_CONFIG.reading_mode == "gesture"){
		pos_align = Selection.prototype.get_select_align();
		this.maxmize();
		if(pos_align == 6){
			_ui.find(".close-button.left").show();
			_ui.find(".close-button.right").hide();
		}
		else if(pos_align == 4){
			_ui.find(".close-button.left").hide();
			_ui.find(".close-button.right").show();
		}
	}
	
	this.setup_position(pos_align);   
    var _scope_coll = KALS_text.selection.select.get_scope_coll();
    this.list.set_scope_coll(_scope_coll);
    
    var _this = this;
    this.list.load_list(function () {
        
    });
	
	// 先取出被選取的文字範圍
	var _anchor_text = KALS_text.selection.select.get_extended_anchor_text("nav_normal");
	_ui.find(".anchor-text:first").text(_anchor_text);
	//$.test_msg("當標註工具打開時，測試能不能抓到選取範圍的文字", _anchor_text);
	
    //KALS_modal.prototype.open.call(this, _callback);
	if(pos_align == 6){
		var _ui = this.get_ui();
	    if (_ui !== null) {
	        _ui.show('slide',{direction:'left'},100);
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
	}
	if(pos_align == 4){
		var _ui = this.get_ui();
	    if (_ui !== null) {
	        _ui.show('slide',{direction:'right'},100);
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
		
		
		
		$('body').focus();
		$('body').click();
		//$('body').css("background-color", 'blue');
		_ui.focus();
		_ui.click();
	    
	    return this;
	}
};

Annotation_gesture_tool.prototype.setup_list = function () {
    var _component = new Topic_list_gesture();
    this.child('list', _component);
	
	var _tool = this;
	//註冊一下
	_component.add_listener(function () {
		if (_component.is_totally_loaded()) {
			
		}
    });
    return _component;
};

Annotation_tool.prototype.maxmize = function(){
	
	var _mode = KALS_CONFIG.reading_mode;
	
	// 取得Annotation_tool的_ui, get_ui()
	var _ui = this.get_ui();
	
	if (_mode == "gesture") {
		
		// 取得_ui的高度 var _h = 視窗高度()
		var _h = $(window).height();
		// 取得_ui的寬度 var _w = parseInt(視窗寬度 / 3)
		var _w = parseInt($(window).width()/3);
	}	
		// 設定高度到 _ui.css("height", _h);
		_ui.css("height", _h);
		// 設定寬度
		_ui.css("width", _w);
		
		_ui.find(".close-button.left").css("height", _h);
		_ui.find(".close-button.right").css("height", _h)	;
		

		
	return this;
};


/* End of file Annotation_gesture_tool */
/* Location: ./system/application/views/web_apps/Annotation_gesture_tool.js */