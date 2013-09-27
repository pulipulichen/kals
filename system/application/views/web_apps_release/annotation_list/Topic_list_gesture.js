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

Topic_list_gesture.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass('topic-list');
    
    var _loading = this._create_loading_component();
    _loading.appendTo(_ui);
    
    var _my = new List_collection_my();
    _my.get_ui().appendTo(_ui);
    this._list_colls.push(_my);
    this.child('my', _my);
    
    var _like = new List_collection_like();
	var _like_ui = _like.get_ui();
    _like_ui.appendTo(_ui);
    this._list_colls.push(_like);
    
    var _other = new List_collection_other();
	var _other_ui = _other.get_ui();
    _other_ui.appendTo(_ui);
    this._list_colls.push(_other);
	
    var _anonymous = new List_collection_anonymous();
	var _anonymous_ui = _anonymous.get_ui(); 
    _anonymous_ui.appendTo(_ui);
    this._list_colls.push(_anonymous);
   
    var _blank = this._create_blank_component();
    _blank.appendTo(_ui);
    
    var _complete = this._create_complete_component();
    _complete.appendTo(_ui);
    
    var _this = this;
    
    
    return _ui;
};

/* End of file Topic_list_gesture */
/* Location: ./system/application/views/web_apps/Topic_list_gesture.js */