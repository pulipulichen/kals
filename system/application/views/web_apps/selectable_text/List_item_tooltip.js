/**
 * List_item_tooltip
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2013/11/16 下午 11:31:40
 * @extends {List_item}
 */
function List_item_tooltip(_param) {
    
    List_item.call(this, _param);
    
}

List_item_tooltip.prototype = new List_item();

/**
 * Create UI
 * @memberOf {List_item}
 * @type {jQuery} UI
 */
List_item_tooltip.prototype._$create_ui = function () {
    var _this = this;
    
    var _ui = $('<div></div>')
        .addClass(this._classname)
        .addClass('list-item')
        .addClass('list-item-tooltip');
    
    var _header = this._setup_header();
    _header.get_ui().appendTo(_ui);

    var _count = this._setup_count();
    _count.prependTo(_header.get_ui());

    var _note = this._setup_note();
    _note.get_ui().appendTo(_ui);
	
    _ui.click(function () {
        //$.test_msg("List_item_tooltip click", _this.get_scope_coll());
        //KALS_text.selection.select.clear();
        KALS_text.tool.set_once_close_editor();
        _this.select();
    });
    
    _ui.append('<div class="fade-out"></div>');
    
    /**
     * @version 20141110 Pulipuli Chen
     * 初始化權限監聽器
     */
//    KALS_context.ready(function () {
//        _this._init_readable_policy_listener();
//        _this._init_writable_policy_listener();
//    });

    return _ui;
};

List_item_tooltip.prototype._$max_width = 200;

/**
 * 顯示標註數量
 */
List_item_tooltip.prototype._setup_count = function () {
    var _ui = $("<div></div>")
       .addClass("count-component");

    var _message1 = KALS_context.lang.create_listener(new KALS_language_param(
            '',
            'selection_manager.select_tooltip.annotation_count1'
         ))
       .appendTo(_ui);

    var _count = $("<span></span>")
       .addClass("count")
       .appendTo(_ui);

    var _message2 = KALS_context.lang.create_listener(new KALS_language_param(
            ' annotations',
            'selection_manager.select_tooltip.annotation_count2'
         ))
       .appendTo(_ui);
     
    return _ui;
};

/**
 * 設定標註數量
 * @param {int} _count
 */
List_item_tooltip.prototype.set_count = function (_count) {
    var _ui = this.get_ui();
    _ui.find(".count-component .count").html(_count);
};

/**
 * 初始化權限
 * @author Pulipuli Chen 20141110
 */
List_item_tooltip.prototype._init_policy = function () {
    if (this._annotation_param !== null  && this._policy_initialized === false) {
        this._init_readable_policy_listener();
        this._policy_initialized = true;
    }
};

/**
 * 是否已經初始化過了
 * @type Boolean
 * @author Pulipuli Chen 20141110
 */
List_item_tooltip.prototype._policy_initialized = false;

/* End of file List_item_tooltip */
/* Location: ./system/application/views/web_apps/List_item_tooltip.js */