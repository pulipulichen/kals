/**
 * Respond_list_collection
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/8 下午 03:19:55
 * @extends {List_collection}
 * @param {List_item_topic} _topic_item
 */
function Respond_list_collection(_topic_item) {
    
    List_collection.call(this);
    
    this._set_topic_item(_topic_item);
    //$.test_msg('Respond_list_collection()');
}

Respond_list_collection.prototype = new List_collection();

/**
 * @type {List_item_topic}
 */
Respond_list_collection.prototype._topic_item = null;

/**
 * @param {List_item_topic} _topic_item
 */
Respond_list_collection.prototype._set_topic_item = function (_topic_item) {
    if ($.isset(_topic_item)) {
        this._topic_item = _topic_item;
        
        this._$topic_id = _topic_item.get_annotation_id();
    }
    return this;
};

Respond_list_collection.prototype._$limit = 5;

Respond_list_collection.prototype._$target_topic = false;

Respond_list_collection.prototype._$order_by = 'create';

Respond_list_collection.prototype._$topic_id = null;

// --------
// UI
// --------

Respond_list_collection.prototype._$create_ui = function () {
    var _ui = List_collection.prototype._$create_ui.call(this);
    
    _ui.addClass('respond-list-collection');
    
    var _view = this._create_view_component();
    _view.appendTo(_ui);
    
    return _ui;
};

/**
 * @type {jQuery}
 */
Respond_list_collection.prototype._view_component = null;

Respond_list_collection.prototype._create_view_component = function () {
    var _component = $('<div></div>')
        .addClass('view-component');
    
    var _msg1 = $('<span></span>')
        .appendTo(_component);
    
    var _lang1 = new KALS_language_param(
        'View All ',
        'respond_list_collection.view_thread.1'
    );
    
    KALS_context.lang.add_listener(_msg1, _lang1);
    
    var _count = $('<span></span>')
        .addClass('respond-count')
        .appendTo(_component);
    
    var _msg2 = $('<span></span>')
        .appendTo(_component);
    
    var _lang2 = new KALS_language_param(
        ' messages',
        'respond_list_collection.view_thread.2'
    );
    
    KALS_context.lang.add_listener(_msg2, _lang2);
    
    _component.hide();
    
    var _topic_item = this._topic_item;
    _component.click(function () {
        _topic_item.view_thread();
    });
    
    _component.setup_hover();
    
    this._view_component = _component;
    return _component;
};

Respond_list_collection.prototype._set_respond_count = function (_respond_count) {
    
    var _item_count = this.count_list_item();
    
    if (_respond_count > _item_count) {
        this._view_component.find('.respond-count:first').html(_respond_count);    
        this._view_component.show();
    }
    else {
        this._view_component.hide();
    }
    
    return this;
};

Respond_list_collection.prototype.get_search_data = function () {
    var _data = List_collection.prototype.get_search_data.call(this);
    
    _data.show_total_count = true;
    
    //$.test_msg('Respond_list_collection.get_search_data()', _data);
    
    return _data;
};

Respond_list_collection.prototype.setup_load_list = function (_data, _callback) {
    
    var _this = this;
    List_collection.prototype.setup_load_list.call(this,_data, function () {
        var _respond_count = _data.total_count;
        if (_respond_count === 0) {
            _this.hide();
        }
        else {
            _this._set_respond_count(_respond_count);    
        }
        
        //_this.notify_ready();    
        $.trigger_callback(_callback);
    });
    
    return this;
};

Respond_list_collection.prototype.create_list_item = function(_param) {
    return new List_item_respond(_param, this._topic_item);
};

Respond_list_collection.prototype.hide = function () {
    var _ui = this.get_ui();
    _ui.hide();
    return this;
};

/*
Respond_list_collection.prototype.is_ready = function () {
    return this._ready;
};
*/

/* End of file Respond_list_collection */
/* Location: ./system/application/views/web_apps/Respond_list_collection.js */