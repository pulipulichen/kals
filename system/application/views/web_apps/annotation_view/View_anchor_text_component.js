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
 * @param {Annotation_param} _config
 */
function View_anchor_text_component(_config) {
    
    KALS_user_interface.call(this);
    
    this._initialize_config(_config);
}

// Extend from KALS_user_interface
View_anchor_text_component.prototype = new KALS_user_interface();

/**
 * 設定參數
 * @param {Object} _config
 * @returns {View_anchor_text_component.prototype}
 * 
 * @author Pudding 20151102
 * 讓參數選項變成可以設定範圍的選項
 */
View_anchor_text_component.prototype._initialize_config = function (_config) {
    
    if ($.is_class(_config, 'Annotation_param')) {
        this.set_topic_param(_config);
    }
    else if ($.is_class(_config, 'Scope_collection_param')) {
        this.set_scope_coll_param(_config);
    }
    
    return this;
};

/**
 * 頂層標註的參數
 * 
 * Pudding 20151102
 * 這個屬性是幹嘛用的? 好像沒有用到啊
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

/**
 * 設定參數範圍
 * @param {Scope_collection_param} _scope_coll
 * @returns {View_anchor_text_component.prototype}
 */
View_anchor_text_component.prototype.set_scope_coll_param = function (_scope_coll) {
    if ($.is_class(_scope_coll, 'Scope_collection_param')) {
        var _anchor_text = this.get_anchor_text(_scope_coll);
        this.set_anchor_text(_anchor_text);
    }
    return this;
};

/**
 * 設定參數範圍
 * @param {Scope_collection_param} _scope_coll
 * @returns {View_anchor_text_component.prototype}
 * @author Pudding 20151102
 */
View_anchor_text_component.prototype.set_scope_coll = function (_scope_coll) {
    return this.set_scope_coll_param(_scope_coll);
};

/**
 * 設定參數範圍
 * @param {jQuery} _word
 * @returns {View_anchor_text_component.prototype}
 * @author Pudding 20151103
 */
View_anchor_text_component.prototype.set_word = function (_word) {
    var _text_container = this._create_text_container();
    if ($.is_jquery(_word)) {
        _word = _word.clone();
    }
    _text_container.html(_word);
    return this;
};

/**
 * 取得標註範圍文字
 * @param {Array} _scope_coll
 */
View_anchor_text_component.prototype.get_anchor_text = function (_scope_coll) {
    
    var _text = KALS_text.selection.text;
    
    var _recommend_scope_coll = _text.get_recommend_scope_coll(_scope_coll);
    var _focused_anchor_text = _text.get_display_anchor_text(_recommend_scope_coll, _scope_coll);
    
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
    //$.test_msg("View_anchor_text_component", "focus");
    _anchor.scrollIntoView();
};

/* End of file View_anchor_text_component */
/* Location: ./system/application/views/web_apps/View_anchor_text_component.js */