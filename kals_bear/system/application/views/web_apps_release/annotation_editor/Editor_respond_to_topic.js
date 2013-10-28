/**
 * Editor_respond_to_topic
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/20 下午 04:38:37
 * @extends {Editor_respond_to_collection}
 */
function Editor_respond_to_topic(_editor) {
    
    Editor_respond_to_collection.call(this, _editor);
    
}

Editor_respond_to_topic.prototype = new Editor_respond_to_collection();

Editor_respond_to_topic.prototype._$listen_field = 'respond_to_topic';

/**
 * 
 * @param {Annotation_param} _param
 */
Editor_respond_to_topic.prototype.add_respond_to = function (_param) {
    this.reset();
    Editor_respond_to_collection.prototype.add_respond_to.call(this, _param, false);
    
    //$.test_msg('Editor_respond_to_toipc.add_respond_to()', this._responds.length);
};

Editor_respond_to_topic.prototype._$create_ui = function () {
    var _ui = Editor_respond_to_collection.prototype._$create_ui.call(this);
    _ui.addClass('editor-respond-to-topic');
    return _ui;
};

/* End of file Editor_respond_to_topic */
/* Location: ./system/application/views/web_apps/Editor_respond_to_topic.js */