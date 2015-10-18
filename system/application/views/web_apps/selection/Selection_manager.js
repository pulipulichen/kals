/**
 * Selection_manager
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/5 下午 01:45:46
 * @extends {Multi_event_dispatcher}
 * @param {jQuery} _selector
 */
function Selection_manager(_selector) {
    
    //參數初始化
    this._$enable_types = ['ready'];
    
    //設置元件
    //this.scope = new Selectable_text(_selector);
    this.child('text', new Selectable_text(_selector));
    
    var _text = this.text;
    this.child('select', new Selection_select(_text));
    //this.child('editor', new Selection_editor(_text));
    this.child('view', new Selection_view(_text));
    this.child('search', new Selection_search(_text));
	
    this.child('my_basic', new Selection_my_manager(_text));
    this.child('my_custom', new Selection_my_custom_manager(_text));
	
    
    this.child('recommend', new Selection_recommend(_text));
    this.child('navigation', new Selection_navigation_manager(_text));
    
    this.child('recommended', new Selection_recommended(_text));
    this.child('recommend_by', new Selection_recommend_by(_text));
    
    //this.selectable_selector = null;
    //this.selected_scope = [];
    //this.selected_start = null;
    
    return this;
}

/**
 * 繼承
 * @memberOf {Selection_manager}
 */
Selection_manager.prototype = new Multi_event_dispatcher();

/**
 * Selection_manager管理的範圍
 * @type {Selectable_text}
 */
Selection_manager.prototype.text = null;

/**
 * @type {Selection_select}
 */
Selection_manager.prototype.select = null;

/**
 * @type {Selection_view}
 */
Selection_manager.prototype.view = null;

/**
 * @type {Selection_Search}
 */
Selection_manager.prototype.search = null;

/**
 * @type {Selection_my_manager}
 */
Selection_manager.prototype.my_basic = null;

/**
 * @type {Selection_my_custom_manager}
 */
Selection_manager.prototype.my_custom = null;

/**
 * @type {Selection_recommend}
 */
Selection_manager.prototype.recommend = null;

/**
 * @type {Selection_navigation_manager}
 */
Selection_manager.prototype.navigation = null;
/**
 * 將可選取範圍初始化
 * @memberOf {Selection_manager}
 * @param {Object} _selector
 */
Selection_manager.prototype.initialize = function () {
    // ---------
    // 開始作初始化
    // ---------
    var _this = this;
    this.text.initialize(function () {
        // ---------
        // 完成後的動作
        // ---------
        _this.notify_listeners('ready', this);
        
        //$.test_msg('Selection_manager.iitialize() 完成！');
        
        KALS_text.init.complete('Selection_manager');
    });    
    
    return this; 
};

// --------
// 以下廢棄
// --------

/**
 * 目前已經被選取的範圍，注意，資料型態不是JSON，而是被選取的jQuery元素
 * @type {jQuery[]} = [
 *     [jQuery1_1, jQuery1_2, jQuery1_3],
 *     [jQuery2_1, jQuery2_2]
 * ]
 */
/*
Selection_manager.prototype.selected_scope = [];
*/

/**
 * 將目前選取的範圍轉換成scope陣列回傳
 * @type {Scope_collection_param}
 */
/*
Selection_manager.prototype.get_selection_scopes = function () {
    
    var _scopes = new Scope_collection_param();
    
    var _first_id = null;
    var _last_id = null;
    for (var _key in this.selected_scope) {
        var _s = this.selected_scope[_key];
        
        var _from = _s[0];
        var _to = _s[(_s.length-1)];
        
        var _from_id = $.get_prefixed_id(_from);
        var _to_id = $.get_prefixed_id(_to);
        
        var _scope = new Scope_param(_from_id, _to_id);
        
        //_scopes.push([_from_id, _to_id]);
        _scopes.add(_scope);
    }
   
    return _scopes;
};
*/

/*
Selection_manager.prototype.get_anchor_text = function () {
    
    var _anchor_text = '';
    
    for (var _i in this.selected_scope) {
        if (_i > 0)
            _anchor_text = _anchor_text + ' ';
        
        var _scope = this.selected_scope[_i];
        for (var _j in _scope) {
            var _word = _scope[_j];
            _anchor_text = _anchor_text + _word.html();
        }
    }
    
    return _anchor_text;
};
*/

/*
Selection_manager.prototype.get_recommend_scope = function () {
    return this.scope.get_recommend_scope();
};
*/
/**
 * 選擇指定範圍
 * @param {Scope_param|Scope_param[]} _scope 範圍
 */
/*
Selection_manager.prototype.select = function (_scope) {
    this.cancel_select();
    this.add_select(_scope);
    return this;
};
*/
/**
 * 增加選擇範圍
 * @param {Scope_param|Scope_param[]} _scope 範圍。example: {
 *     from: 0,
 *     to: 12
 * }
 */
/*
Selection_manager.prototype.add_select = function (_scope) {
    _scope = this.scope.add_select(_scope);
    this.selected_scope.push(_scope);
    this.notify_listeners('select', this);
    
    return this;
};
*/
/**
 * 看看是否有選取範圍
 * @type {boolean} 
 */
/*
Selection_manager.prototype.has_selected = function () {
    return (this.selected_scope.length > 0);
};
*/

/**
 * 設定該選取範圍為此標註類型
 * @param {number} _type 標註類型ID
 */
/*
Selection_manager.prototype.set_annotation_type = function (_type) {
    //有哪些標註的class_name，尚未訂定
    var _anno_class_name = _type;
    this.add_class(_anno_class_name);
    
    return this;
};
*/
/*
Selection_manager.prototype.unset_annotation_type = function (_type) {
    //有哪些標註的class_name，尚未訂定
    var _anno_class_name = _type;
    this.remove_class(_anno_class_name);
    
    return this;
};
*/
//Selection_manager.prototype.recommend_classname = 'recommend';

/**
 * 設定該選取範圍為推薦
 */
/*
Selection_manager.prototype.set_recommend = function () {
    
    //有哪些推薦標註的class_name，尚未訂定
    this.add_class(this.recommend_classname);
    
    return this;
};
*/
/*
Selection_manager.prototype.unset_recommend = function () {
    
    //有哪些推薦標註的class_name，尚未訂定
    this.remove_class(this.recommend_classname);
        
    return this;
};
*/
/**
 * 增加_class_name
 * @param {String} _class_name
 */
/*
Selection_manager.prototype.add_class = function (_class_name) {
    
    for (var _i in this.selected_scope) {
        var _scope = this.selected_scope[_i];
        if ($.is_array(_scope)) {
            for (var _j in _scope) {
                var _word = _scope[_j];
                if ($.is_jquery(_word)) {
                    _word.addClass(_class_name);
                }
            }
        }
        else if ($.is_jquery(_scope)) {
            _scope.addClass(_class_name);
        }
    }
    return this;
};
*/
/**
 * 移除_class_name
 * @param {String} _class_name
 */
/*
Selection_manager.prototype.remove_class = function (_class_name) {
    
    for (var _i in this.selected_scope) {
        var _scope = this.selected_scope[_i];
        if ($.is_array(_scope)) {
            for (var _j in _scope) {
                var _word = _scope[_j];
                if ($.is_jquery(_word)) {
                    _word.removeClass(_class_name);
                }
            }
        }
        else if ($.is_jquery(_scope)) {
            _scope.removeClass(_class_name);
        }
    }
    return this;
};
*/
/**
 * 取消選取。注意，notify是在真正取消選取之前進行的的。
 */
/*
Selection_manager.prototype.cancel_select = function () {
    
    this.notify_listeners('cancel_select', this);
    
    this.scope.cancel_select();
    this.selected_scope = [];
    
    return this;
};
*/

/**
 * 清理標註範圍標示
 */
/*
Selection_manager.prototype.clear_annotation = function () {
    
    //有哪些標註的class_name，尚未訂定
    var _anno_class_names = [];
    
    for (var _i in _anno_class_names) {
        var _class_name = _anno_class_names[_i];
        $('.' + _class_name).removeClass(_class_name);
    }
    return this;
    
};
*/
/**
 * 清理推薦範圍標示
 */
/*
Selection_manager.prototype.clear_recommend = function () {
    
    //有哪些推薦標註的class_name，尚未訂定
    var _recommend_class_names = [];
    
    for (var _i in _recommend_class_names) {
        var _class_name = _recommend_class_names[_i];
        $('.' + _class_name).removeClass(_class_name);
    }
    return this;
    
};
*/
/**
 * 取得選取區域的top。沒有選取時，回傳null。
 * @type {number} 單位是px
 */
/*
Selection_manager.prototype.get_selection_top = function () {
    
    if (this.selected_scope === null
        || this.selected_scope.length === 0)
        return null;
    
    var _first_group = this.selected_scope[0];
    _first_word = _first_group[0];
    
    //$.test_msg('Selection_manager.get_selection_top()', _first_word.length);
    //_first_word.css('color', 'red');
    
    var _top = _first_word.offset().top;
    
    return _top;
};
*/
/**
 * 取得選取區域的bottom。沒有選取時，回傳null。
 * @type {number} 單位是px
 */
/*
Selection_manager.prototype.get_selection_bottom = function () {
    
    if (this.selected_scope === null
        || this.selected_scope.length === 0)
        return null;
    
    var _last_scope = this.selected_scope[(this.selected_scope.length - 1)];
    _last_word = _last_scope[( _last_scope.length-1 )];
    
    var _top = _last_word.offset().top;
    var _height = _last_word.height();
    var _bottom = _top + _height;
    
    return _bottom;
};
*/

/**
 * 檢查範圍內是否有標註
 * @author Pudding 20151019
 * @param {jQuery|Scoll_coll_param} _word
 * @returns {Boolean}
 */
Selection_manager.prototype.has_annotation = function (_word) {
    if (_word === undefined) {
        return false;
    }
    
    //$.test_msg("has_annotation", typeof(_word.scopes));
    if (typeof(_word.scopes) === "object") {
        var _scope_coll = _word;
        var _words = this.text.get_words_by_scope_coll(_scope_coll);
        
        
        for (var _i in _words) {
            for (var _j in _words[_i]) {
                var _w = _words[_i][_j];
                if (this.has_annotation(_w) === true) {
                    return true;
                }
            }
        }
        return false;
    }
    else {
        return (this.my_basic.is_my(_word)
                || this.navigation.is_navigation(_word));
    }
};

/* End of file Selection_manager */
/* Location: ./system/application/views/web_apps/kals_text/Selection_manager.js */