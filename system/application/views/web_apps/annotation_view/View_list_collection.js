/**
 * View_list_collection
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/6 下午 10:31:08
 * @extends {List_collection}
 * @param {Annotation_param} _topic_param
 */
function View_list_collection(_topic_param) {
    
    List_collection.call(this);
    
    this.set_topic_param(_topic_param);
}

View_list_collection.prototype = new List_collection();

View_list_collection.prototype._$name = "view-list";

View_list_collection.prototype._$topic_id = null;

View_list_collection.prototype._$enable_check_login = false;

View_list_collection.prototype._$target_topic = true;

/**
 * 預設讀取的回應標註
 * @type {number|null} 如果是null，表示讀取全部
 */
View_list_collection.prototype._$respond_limit = null;

/**
 * 排序的方向。
 * @type {string} desc|asc，如果是null，則由系統預設
 */
View_list_collection.prototype._$direction = 'asc';

/**
 * 回應的排序方向。
 * @type {string} desc|asc，如果是null，則由系統預設
 */
View_list_collection.prototype._$respond_direction = 'asc';

/**
 * @type {Annotation_param}
 */
View_list_collection.prototype._topic_param = null;

View_list_collection.prototype.set_topic_param = function (_topic_param) {
    if ($.isset(_topic_param)) {
        this._topic_param = _topic_param;
        
        var _topic_id = _topic_param.annotation_id;
        this._$topic_id = _topic_id;
        
        this.load_list(_topic_param);
    }
    return this;
};

View_list_collection.prototype.create_list_item = function(_param) {
    if (this._$target_topic === true) {
        return new View_list_item_topic(_param, this._topic_param);
    }
    else {
        return new View_list_item_respond(_param, this._topic_param);
    }
};

/**
 * 如果底下有respond_list的話，則順延到底下的respond_list去。
 * @param {Annotation_param} _param
 * @param {boolean} _from_head
 */
View_list_collection.prototype.add_list_item = function(_param, _from_head) {
    if ($.is_class(_param.topic, 'Annotation_param')) {
        var _topic_param = _param.topic;
        
        //$.test_msg('View_list_colleciton.add_list_item() add repsond param', _topic_param.export_json());
        
        var _topic_item = this.focus(_topic_param, false);
        
        if (typeof(_topic_item.respond_list) == 'object'
            && _topic_item.respond_list !== null) {
            _topic_item.respond_list.add_list_item(_param, false);
            _topic_item.respond_list.get_ui().show();
        }
        
        return this;
    }
    else {
        return List_collection.prototype.add_list_item.call(this, _param, _from_head);
    }
};

/*
View_list_collection.prototype.editor_add_list_item = function (_param, _from_head) {
    //KALS_text.tool.view.set_modified();
    return List_collection.prototype.editor_add_list_item.call(this, _param, _from_head);
};
*/
/*
View_list_collection.prototype.remove_list_item = function () {
    //KALS_text.tool.view.set_modified();
    return List_collection.prototype.remove_list_item.call(this);
};
*/
/* End of file View_list_collection */
/* Location: ./system/application/views/web_apps/View_list_collection.js */