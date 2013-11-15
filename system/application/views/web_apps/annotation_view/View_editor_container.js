/**
 * View_editor_container
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/6 下午 10:32:12
 * @extends {Editor_container}
 * @param {Annotation_param} _topic_param
 * @param {View_list_collection} _list_coll
 */
function View_editor_container(_topic_prarm, _list_coll) {
    
    Editor_container.call(this, _list_coll);
    
    if ($.isset(_topic_prarm)) {
        this.set_topic_param(_topic_param);
    }
	
}

View_editor_container.prototype = new Editor_container();

/**
 * @type {Annotation_param}
 */
View_editor_container.prototype._topic_param = null;

View_editor_container.prototype._toggle_position = 'top';

View_editor_container.prototype._disable_option = ['policy_changable', 'note_allow_empty'];

View_editor_container.prototype.get_parent_container = function () {
    return this.get_ui().parents('.window-view-content:first');
};

View_editor_container.prototype.set_topic = function (_topic_param) {
    if ($.is_class(_topic_param, 'Annotation_param')) {
        this._topic_param = _topic_param;
        var _editor = this._setup_editor();
        _editor.set_topic(_topic_param);
        
        //設定policy
        _editor.policy.set_data(_topic_param);
    }
    return this;
};

/**
 * @param {Annotation_param} _respond_param
 */
View_editor_container.prototype.add_respond_to = function (_respond_param) {
    if ($.is_class(_respond_param, 'Annotation_param')) {
        var _editor = this._setup_editor();
        _editor.respond_coll.add_respond_to(_respond_param);
    }
    else if ($.is_array(_respond_param)) {
        for (var _i in _respond_param) {
            this.add_respond_to(_respond_param[_i]);
        }
    }
    return this;
};


/**
 * 預設的開啟狀態
 * @tyep boolean true=開啟; false=關閉
 */
View_editor_container.prototype._$default_toggle = false;

/* End of file View_editor_container */
/* Location: ./system/application/views/web_apps/View_editor_container.js */