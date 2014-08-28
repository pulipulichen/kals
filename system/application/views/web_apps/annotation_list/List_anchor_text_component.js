/**
 * List_anchor_text_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/30 下午 05:02:59
 * @extends {KALS_user_interface}
 * @param {List_item} _item
 * @param {boolean} _show_fulltext 
 */
function List_anchor_text_component(_item) {
    
    KALS_user_interface.call(this);
    
    this._set_list_item(_item);
}

// Extend from KALS_user_interface
List_anchor_text_component.prototype = new KALS_user_interface();

// --------
// List Item
// --------

/**
 * @type {List_anchor_text_component}
 */
List_anchor_text_component.prototype._item = null;

List_anchor_text_component.prototype._set_list_item = function (_item) {

    //$.test_msg("List_anchor_text, _set_list_item");
	
    if ($.isset(_item)) {
        this._item = _item;
        var _this = this;
        this._item.add_listener('set', function (_item) {
            //$.test_msg("List_anchor_text", "set_data");
            _this.set_data();
        });
        this.set_data();
    }
};

/**
 * 設定資料
 */
List_anchor_text_component.prototype.set_data = function () {
    var _text = this.get_anchor_text();
	this.set_anchor_text(_text);
};

// --------
// UI
// --------

/**
 * Create UI
 * @memberOf {List_anchor_text_component}
 * @type {jQuery} UI
 */
List_anchor_text_component.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass('list-anchor-text-component');
    return _ui;
};

/**
 * 取得設定標註範圍文字
 * @type {String} 範圍文字
 */
List_anchor_text_component.prototype.get_anchor_text = function(){
    var _param = this._item.get_annotation_param();
    var _scope = _param.scope;

    var _text = KALS_text.selection.text;

    //$.test_msg("get_anchor_text scope", _scope);
    var _anchor_text = _text.get_anchor_text(_scope);
    //$.test_msg("get_anchor_text text", _anchor_text);
    return _anchor_text;
};


/**
 * 設定標註範圍文字
 * @param {String} _note
 */
List_anchor_text_component.prototype.set_anchor_text = function (_text) {
    //$.test_msg("set_anchor_text text", _text);
    //$.test_msg("set_anchor_text ui", this.get_ui().length);

    if (this._item.max_anchor_text_length != null) {
        var _max = this._item.max_anchor_text_length;

        if (_text.length > _max) {
            var _half = parseInt(_max / 2);

            var _first_part = _text.substr(0, _half);
            var _last_part = _text.substr(_text.length - _half, _half);
            _text = _first_part + "..." + _last_part; 
        }
    }
	
	_text = '"' + _text + '"'; 
    this.get_ui().html(_text);
    return this;
};


/* End of file List_anchor_text_component */
/* Location: ./system/application/views/web_apps/List_anchor_text_component.js */