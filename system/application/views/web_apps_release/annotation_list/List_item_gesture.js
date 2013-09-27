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


/**
 * Create UI
 * @memberOf {List_item_gesture}
 * @type {jQuery} UI
 */
List_item_gesture.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass('list-item-gesture');
    
    var _item = List_item.prototype._$create_ui.call(this);
    _item.appendTo(_ui);
    
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

    return this; 
};

List_item_gesture.prototype.blur_other_focus = function () {
 
    return List_item.prototype.blur_other_focus.call(this);
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
    
    List_item.prototype.clear_selection.call(this);
    
    KALS_text.selection.recommend.clear();
    
    return this;
};

//List_item_gesture.prototype._classname = 'list-item';

List_item_gesture.prototype.respond_annotation = function () {
    
    return this;
};

/* End of file List_item_gesture */
/* Location: ./system/application/views/web_apps/List_item_gesture.js */