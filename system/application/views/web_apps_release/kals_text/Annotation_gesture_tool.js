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
    
	var pos_align = 0;
	//體感模式下使用UI左右判斷式
	if(KALS_CONFIG.reading_mode == "gesture"){
		pos_align = Selection.prototype.get_select_align();
		this.maxmize();
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


/* End of file Annotation_gesture_tool */
/* Location: ./system/application/views/web_apps/Annotation_gesture_tool.js */