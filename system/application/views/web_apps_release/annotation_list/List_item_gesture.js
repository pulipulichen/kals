/**
 * List_item_gesture
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/30 下午 11:31:40
 * @extends {List_item}
 */
function List_item_gesture(_param) {
    
    List_item_topic.call(this, _param);
    
}

List_item_gesture.prototype = new List_item_topic();

List_item_gesture.prototype._note_show_fulltext = true;


/**
 * Create UI
 * @memberOf {List_item_gesture}
 * @type {jQuery} UI
 */
List_item_gesture.prototype._$create_ui = function () {
    
	var _this = this;
    
    var _ui = $('<div></div>')
        .addClass(this._classname)
        .addClass('list-item');
    
    if ($.isset(this._annotation_param)) {
        _ui.attr('annotation_id', this._annotation_param.annotation_id);
        
        var _topic_id = this.get_topic_id();
        _ui.attr('topic_id', _topic_id);
    }
    
    var _header = this._setup_header();
    _header.get_ui().appendTo(_ui);
    
    var _note = this._setup_note();
    _note.get_ui().appendTo(_ui);
    
    var _menu_block, _menu_tooltip;
    if (this._menu_style_default === null) {
        _menu_block = this._setup_menu_block();
        _menu_block.get_ui().appendTo(_ui);
        
        _menu_tooltip = this._setup_menu_tooltip();
        _menu_tooltip.get_ui().appendTo(_ui);
    }
    else if (this._menu_style_default == 'block') {
        _menu_block = this._setup_menu_block();
        _menu_block.get_ui().appendTo(_ui);
    }
    
    _ui.mouseover(function() {
        _this.focus(false);
    });
    _ui.mouseout(function () {
        _this.blur();
    }); 
    
	// @20130609 Pudding Chen
	// 只有在不顯示全文的情況下，按下內容才會顯示thread
	if (this._note_show_fulltext === false) {
		_ui.click(function () {
			_this.view_thread();
		});
	}
	
    setTimeout(function() {
        //$.test_msg('List_item._$create_ui()', _config);
        
        if (_this._menu_style_default === null 
            || _this._menu_style_default == 'tooltip') {
            var _config = _menu_tooltip._$get_config();
            _ui.tooltip(_config);        
        }
            
        _this._toggle_menu_style();
    }, 0);
    
    
    this.notify_listeners('set');
    
    //this._ready = true;
	
    var _item = _ui;
	
    var _respond_list = this._setup_respond_list();
    //$.test_msg('List_item_gesture._$create_ui()', [$.isset(_respond_list), $.get_class(_respond_list)]);
    _respond_list.get_ui().appendTo(_ui);
    
    if (this._$respond_force_load === false) {
        var _param = this.get_data();
        //$.test_msg('List_item_gesture._$create_ui()', _param.respond_list);
        
        if ($.isset(_param.respond_list)) {
			_respond_list.load_list(_param.respond_list);
		}    
    }
    else {
        _respond_list.load_list();
    }
    
    /*
    this._ready = false;
    var _this = this;
    _respond_list.add_listener(function (_respond_list) {
        _this.ready = true;
    }, true);
    */
    return _ui;
};

List_item_gesture.prototype.show_recommend = function (_callback) {
  
    return this; 
};

// ---------
// Respond List
// ---------

List_item_gesture.prototype._$respond_force_load = false;

/**
 * @type {Respond_list_collection}
 */
List_item_gesture.prototype.respond_list = null;

List_item_gesture.prototype._setup_respond_list = function () {
    var _component = new Respond_list_collection(this);
    this.child('respond_list', _component);
    return _component;
};

// --------
// Overrider Other Methods
// --------

List_item_gesture.prototype.focus = function (_scrollto) {
	//$.test_msg("List_item_gesture", "是你嗎?")
    return this; 
};

List_item_gesture.prototype.blur_other_focus = function () {
 
    return this;
};

/*
List_item_gesture.prototype.set_selection = function () {
    
    List_item.prototype.set_selection.call(this);
    
    //var _param = this.get_data();
    //if (_param.has_recommend())
    //{
    //    var _recommend_by_scope = _param.recommend_by.scope;
    //    KALS_text.selection.recommend.set_scope_coll(_recommend_by_scope);
    //}
    return this;
};
*/

List_item_gesture.prototype.clear_selection = function () {
    
    //L/ist_item.prototype.clear_selection.call(this);
    
    //KALS_text.selection.recommend.clear();
    
    return this;
};

//List_item_gesture.prototype._classname = 'list-item';

List_item_gesture.prototype.respond_annotation = function () {
    
    return this;
};

/* End of file List_item_gesture */
/* Location: ./system/application/views/web_apps/List_item_gesture.js */