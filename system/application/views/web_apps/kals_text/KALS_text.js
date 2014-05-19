/**
 * KALS_text
 * 實體化交給KALS_context.init_component吧！
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/15 下午 04:06:28
 * @extends {KALS_user_interface}
 * @param {String|jQuery} _selector 標註範圍
 */
function KALS_text(_selector) {
    
    KALS_user_interface.call(this);
    
    this.child('text_selector', new Text_selector());
    if (typeof(_selector) === "undefined") {
        _selector = this.get_selector();	
    }
    //$.test_msg('KALS_text()', _selector);
    
    _selector = this.filter_selector(_selector);
    
    this.child('init', new Init_text());
    this.child('selection', new Selection_manager(_selector));
    this.child('load_my', new My_annotation_loader());
    this.child('load_navigation', new Navigation_loader());
    this.child('tool', new Annotation_tool(_selector));
    this.child('guide', new Reading_guide());
    
    var _this = this;
    setTimeout(function() {
        
        _this.text_selector.check_text_selector(function () {
            _this.init_start();
        });
        
        //_this.load_my.initialize();
    }, 0);
}

// Extend from KALS_user_interface
KALS_text.prototype = new KALS_user_interface();

/**
 * @type {Selection_manager}
 */
KALS_text.prototype.selection = null;

/**
 * @type {Text_margin}
 * @deprecated 2010.10.21 因為改變了定位型態
 */
//KALS_text.prototype.margin = null;

/**
 * @type {My_annotation_loader}
 */
KALS_text.prototype.load_my = null;

/**
 * @type {My_basic_annotation_loader}
 */
KALS_text.prototype.load_my_basic = null;

/**
 * @type {My_custom_annotation_loader}
 */
KALS_text.prototype.load_my_custom = null;

/**
 * @type {Recommend_loader}
 */
KALS_text.prototype.load_recommend = null;

/**
 * 導讀精靈
 * @type {Reading_guide}
 */
KALS_text.prototype.guide = null;

/**
 * @type {Text_selector}
 */
KALS_text.prototype.text_selector = null;

KALS_text.prototype.init_start = function () {
    
    this.init.start();
    
    return this;
};

KALS_text.prototype.get_selector = function () {
    return this.text_selector.get_text_selector();
};

/**
 * 確認選取範圍是否正確
 * @param {jQuery|String} _selector
 * @return {jQuery}
 * @version 2010 Pudding Chen
 */
KALS_text.prototype.filter_selector = function (_selector) {
    
    var _exception = null;
    
    if ($.is_string(_selector)) {
        _selector = $(_selector);
    }
    else if ($.is_jquery(_selector)) {
        //_selector = _selector;
        //不做任何事情，因為他本來就是jQuery型態           
    }
    else {
        //丟出錯誤
        _exception = new KALS_exception('kals_text.exception.selector_not_exist');
        KALS_util.show_exception(_exception);
        return null;
    }
    
    if (_selector.length > 0) {
            return _selector;
	}
	else {
            //找不到_selector，丟出錯誤
            _exception = new KALS_exception('kals_text.exception.selector_not_exist');
            KALS_util.show_exception(_exception);
            return null;
	}
};

/**
 * 根據頁面條件，強制調整網頁的樣式
 * 
 * 但是應該寫成獨立物件
 * @20131113 Pulipuli Chen
 * @deprecated 20131227 寫成了Site_reform，不使用了
 */
/*
KALS_text.prototype.style_adapter = function () {
    
    // PDF2HTML EX
    if ($("#sidebar").length == 1 && $("#page-container").length == 1
        && $("#pf1").length > 0) {
        
        $("body").css("background-color", "#2f3236");
        $("#page-container").css("position", "relative");
    }
};
*/

/**
 * 讀取指定的標註
 * @param {Int} _annotation_id
 */
KALS_text.prototype.load_annotation = function (_annotation_id) {
	KALS_text.tool.view.load_view(_annotation_id);
};

/**
 * 選擇物件
 * @param {Scope_collection_param} _scope_coll
 * @param {boolean} _scroll_into_view 是否捲動過去
 * @returns {KALS_text}
 * @author Pulipuli Chen 20131230
 */
KALS_text.prototype.set_select = function (_scope_coll, _scroll_into_view) {
    this.selection.select.set_scope_coll(_scope_coll);
    if (_scroll_into_view !== undefined && _scroll_into_view === true) {
        this.selection.select.scroll_into_view();
    }
    return this;
};

KALS_text.prototype.get_sentence_structure = function () {
    return this.selection.text.sentence.get_structure();
};

/* End of file KALS_text */
/* Location: ./system/application/views/web_apps/KALS_text.js */