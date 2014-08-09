/**
 * View_anchor_text_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/6 下午 10:30:46
 * @extends {KALS_user_interface}
 * @param {Annotation_param} _topic_param
 */
function View_anchor_text_component(_topic_param) {
    
    KALS_user_interface.call(this);
    
    this.set_topic_param(_topic_param);
}

// Extend from KALS_user_interface
View_anchor_text_component.prototype = new KALS_user_interface();

/**
 * @type {Annotation_param}
 */
View_anchor_text_component.prototype._topic_param = null;

/**
 * @type {Scope_collection_param}
 */
View_anchor_text_component.prototype._scope_coll = null;

/**
 * @type {String}
 */
View_anchor_text_component.prototype._anchor_text = null;

View_anchor_text_component.prototype.set_topic_param = function (_topic_param) {
    if ($.is_class(_topic_param, 'Annotation_param')) {
        this._topic_param = _topic_param;
        var _anchor_text = this.get_anchor_text(_topic_param.scope);
        this.set_anchor_text(_anchor_text);
    }
    return this;
};

View_anchor_text_component.prototype.get_anchor_text = function (_scope_coll) {
    
    var _text = KALS_text.selection.text;
    
    var _recommend_scope_coll = _text.get_recommend_scope_coll(_scope_coll);
    var _focused_anchor_text = _text.get_display_anchor_text(_recommend_scope_coll, _scope_coll);
    
    //_focused_anchor_text.find('.focus.head').addClass('from');
    //_focused_anchor_text.find('.focus.foot').addClass('to');
    //_focused_anchor_text.find('.focus').addClass('select');
    
    return _focused_anchor_text;
};

View_anchor_text_component.prototype.set_anchor_text = function (_anchor_text) {
    this._anchor_text = _anchor_text;
    var _text_container = this._create_text_container();
    if ($.isset(_anchor_text)) {
		_text_container.html(_anchor_text);
	}
	else {
		_text_container.empty();
	}
    return this;
};

View_anchor_text_component.prototype.clear_anchor_text = function () {
    return this.set_anchor_text(null);
};

// --------
// UI
// --------

View_anchor_text_component.prototype._classname = 'view-anchor-text-component';

/**
 * Create UI
 * @memberOf {View_anchor_text_component}
 * @type {jQuery} UI
 */
View_anchor_text_component.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass(this._classname)
        .addClass('kals-paragraph');
    
    var _text_container = this._create_text_container();
    _text_container.appendTo(_ui);
        
    return _ui;
};

/**
 * @type {jQuery}
 */
View_anchor_text_component.prototype._text_container = null;

/**
 * @type {jQuery}
 */
View_anchor_text_component.prototype._create_text_container = function () {
   if ($.is_null(this._text_container)) {
       var _ui = $('<div></div>')
           .addClass('text-container');
       this._text_container = _ui;
   } 
   return this._text_container;
};

View_anchor_text_component.prototype.reset = function () {
    return this.clear_anchor_text();
};

View_anchor_text_component.prototype.focus = function () {
    var _anchor = this.get_ui();
    _anchor.scrollIntoView();
};

/* End of file View_anchor_text_component */
/* Location: ./system/application/views/web_apps/View_anchor_text_component.js */