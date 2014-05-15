/**
 * List_item_respond
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/30 下午 11:31:58
 * @extends {List_item}
 */
function List_item_respond(_param, _topic_item) {
    
    List_item.call(this, _param);

    this._set_topic_item(_topic_item);
}

List_item_respond.prototype = new List_item();

List_item_respond.prototype._classname = 'list-item-respond';

/**
 * @type {List_item_topic}
 */
List_item_respond.prototype._topic_item = null;

List_item_respond.prototype._set_topic_item = function (_topic_item) {
    if ($.isset(_topic_item)) {
        this._topic_item = _topic_item;
    }
    return this;
};

List_item_respond.prototype.get_topic_param = function () {
    return this._topic_item.get_annotation_param();
};

List_item_respond.prototype.get_topic_id = function () {
    return this._topic_item.get_annotation_id();
};

List_item_respond.prototype.view_thread = function (_focus_id, _callback) {
    
    if ($.is_function(_focus_id) && $.is_null(_callback)) {
        _callback = _focus_id;
        _focus_id = null;
    }
    
    var _content = KALS_text.tool.view;
    if ($.is_null(_focus_id)) {
		_content.set_focus_id(this.get_annotation_id());
	}
	else {
		_content.set_focus_id(_focus_id);
	}
    
    return List_item.prototype.view_thread.call(this, _callback);
};

List_item_respond.prototype.focus_respond = function (_respond_to_id) {
    
    var _list = this.get_list();
    
    var _result = _list.focus(_respond_to_id, true);
    
    if ($.is_null(_result)
        && this.is_enable('view')) {
        var _content = KALS_text.tool.view;
        _content.set_focus_id(_respond_to_id);
        
        this.view_thread(_respond_to_id);
    }
    return this;
};


List_item_respond.prototype._disable_option = [
    //'like', 
    'policy'
];

/**
 * 從回覆列表中，回應指定標註
 * 會開啟Window_view
 */
List_item_respond.prototype.respond_annotation = function () {
    var _respond_to = this.get_data();
    
    var _content = KALS_text.tool.view;
    _content.set_respond_param(_respond_to);
	_content._respond_param = _respond_to;
    _content.set_focus_id(_respond_to.annotation_id);
	
    return this.view_thread();
};

List_item_respond.prototype.edit_annotation = function () {
    
    var _param = this.get_data();
    var _content = KALS_text.tool.view;
    _content.set_edit_param(_param);
    
    return this.view_thread(_param.annotation_id);
};

/* End of file List_item_respond */
/* Location: ./system/application/views/web_apps/List_item_respond.js */