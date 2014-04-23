/**
 * Topic_list
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/27 下午 08:51:16
 * @extends {Event_dispatcher}
 */
function Topic_list_gesture() {
    
    Topic_list.call(this);
    this._list_colls = [];
}

Topic_list_gesture.prototype = new Topic_list();

Topic_list_gesture.prototype._toggle_complete = function (_is_complete) {
    
    return this;
};
Topic_list_gesture.prototype._toggle_loading = function (_is_loading, _callback) {
   
    return this;
};

Topic_list_gesture.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass('topic-list')
		.addClass('gesture');
    
    var _loading = this._create_loading_component();
    _loading.appendTo(_ui);
    
    var _gesture = new List_collection_gesture();
    _gesture.get_ui().appendTo(_ui);
    this._list_colls.push(_gesture);
    this.child('gesture', _gesture);
	
    var _blank = this._create_blank_component();
    _blank.appendTo(_ui);
    
    var _complete = this._create_complete_component();
    _complete.appendTo(_ui);
    
    var _this = this;
    
    
    return _ui;
};

/* End of file Topic_list_gesture */
/* Location: ./system/application/views/web_apps/Topic_list_gesture.js */