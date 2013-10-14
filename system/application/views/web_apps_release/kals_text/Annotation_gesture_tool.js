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
	var _lang = new KALS_language_param(
		'CLOSE',
    	'dialog.option.close'
	);
	KALS_context.lang.add_listener(_button_left, _lang);	
	KALS_context.lang.add_listener(_button_right, _lang);
	
	var _select_timer = null;
	var _tool = this;
	_button_left.click(function () {
	_tool.close();
	});
	_button_right.click(function () {
		_tool.close();
	});
	_button_left.mouseover(function () {
		clearTimeout(_select_timer);
		
		_select_timer = setTimeout(function() {
								_button_left.click();
							//_select_timer = null;
								}, 2000);
	});
	_button_right.mouseover(function () {
		clearTimeout(_select_timer);
		
		_select_timer = setTimeout(function() {
								_button_right.click();
							//_select_timer = null;
								}, 2000);
	});
	
	
	
	
	
	
    //建立標註列表
    // TODO Annotation_tool._$create_ui() _list_group
    var _topic_list = this.setup_list();
    
	//設置標註列表
    var _topic_list_ui = _topic_list.get_ui();
    _topic_list_ui.addClass('annotation-tool-list')
        .appendTo(_ui);
    
    this.setup_view();
    
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
			_ui.find(".close-button.left").hide();
			_ui.find(".close-button.right").show();
		}
		else if(pos_align == 4){
			_ui.find(".close-button.left").show();
			_ui.find(".close-button.right").hide();
		}
	}
	
	this.setup_position(pos_align);   
    var _scope_coll = KALS_text.selection.select.get_scope_coll();
    this.list.set_scope_coll(_scope_coll);
    
    var _this = this;
    this.list.load_list(function () {
        
    });
	
	
	
    KALS_modal.prototype.open.call(this, _callback);
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
		_ui.find(".close-button.right").css("height", _h);
		

		
	return this;
};


/* End of file Annotation_gesture_tool */
/* Location: ./system/application/views/web_apps/Annotation_gesture_tool.js */