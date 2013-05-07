/**
 * Recommend_tooltip
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/12 上午 11:07:59
 * @extends {Recommend_hint}
 */
function Recommend_tooltip() {
    
    Recommend_hint.call(this);
    
}

Recommend_tooltip.prototype = new Recommend_hint();

Recommend_tooltip.prototype._$modal_name = 'Recommend_tooltip';

Recommend_tooltip.prototype._$tooltip_id = 'recommend_tooltip';

// ---------
// Recommended Setup
// --------

/**
 * @param {Annotation_param}
 */
Recommend_tooltip.prototype.setup_recommend = function(_recommended, _scroll_to) {
    if ($.isset(_recommended)) {   
        if ($.is_number(_recommended) || $.is_string(_recommended)) {
            return this.load_recommend(_recommended);
        }
    
        this._recommended = _recommended;
        
        //$.test_msg('Recommend_tooltip.setup_recommend()', this.has_recommend());
        if (this.has_recommend() === false) {
			return this;
		}
            
        if (this.recommended_item === null) {
			var _recommended_item = this._setup_recommended_item(_recommended);
			_recommended_item.get_ui().appendTo(this._recommended_item_container);
		}
		else {
			this.recommended_item.set_data(_recommended);
		}
        
        this.setup_recommend_by();
        this.setup_tips();
        this._setup_has_recommend_by();
        
        this._setup_position_words();
        this.toggle_submit_loading(false);
        
        //關掉其他的
        KALS_text.tool.close();
        KALS_text.tool.recommend_hint.close();
        
        //設定選取範圍
        var _recommended_scope = this._recommended.scope;
        KALS_text.selection.recommended.set_scope_coll(_recommended_scope);
        if ($.isset(_scroll_to) && _scroll_to === true) {
			KALS_text.selection.recommended.scroll_into_view();
		}
        
        KALS_context.hash.set_field('recommend', this._recommended.annotation_id);
        
        
        this.setup_position();
        var _this = this;
        this.open();
        this.setup_position();
        
    }
    return this;
};

Recommend_tooltip.prototype.load_recommend = function (_annotation_id, _callback) {
    
    var _this = this;
    //$.test_msg('Recommend_tooltip.load_recommend() id', _annotation_id);
    KALS_text.tool.load_annotation_param(_annotation_id, function (_param) {
        
        //$.test_msg('Recommend_tooltip.load_recommend()', _param);
        //$.test_msg('Recommend_tooltip.load_recommend() param', _param.export_json());
        _this.setup_recommend(_param, true);
        $.trigger_callback(_callback);
    });
    return false;
};

Recommend_tooltip.prototype.setup_recommend_by = function () {
    if (this.has_recommend_by() === false) {
		return this;
	}
    
    var _recommend_by = this._recommended.recommend.recommend_by;
    if ($.is_class(_recommend_by, 'Annotation_param')) {
        if (this.recommend_by_item === null) {
			var _recommend_by_item = this._setup_recommend_by_item(_recommend_by);
			_recommend_by_item.get_ui().appendTo(this._recommend_by_item_container);
		}
		else {
			this.recommend_by_item.set_data(_recommend_by);
		}
        
        //設定選取範圍
        var _recommend_by_scope = _recommend_by.scope;
        KALS_text.selection.recommend_by.set_scope_coll(_recommend_by_scope);
    }
    return this;
};

Recommend_tooltip.prototype._has_recommend_by_classname = 'has-recommend-by';

Recommend_tooltip.prototype._setup_has_recommend_by = function () {
    
    var _ui = this.get_ui();
    if (this.has_recommend_by()) {
		_ui.addClass(this._has_recommend_by_classname);
	}
	else {
		_ui.removeClass(this._has_recommend_by_classname);
	}
    return this;
};

Recommend_tooltip.prototype.setup_tips = function () {
    var _tips = this._recommended.recommend.tips;
    
    if ($.is_array(_tips) && _tips.length > 0 && _tips[0] !== false) {
        this._tips_heading.show();
        this._tips_container.show().empty();
        //$.test_msg('Recommend_tooltip.setup_tips()', _tips.length);
        for (var _i in _tips) {
            var _tip_list = this._create_tip_list(_tips[_i]);
            if ($.isset(_tip_list)) {
				_tip_list.appendTo(this._tips_container);
			}
        }
    }
    else {
        this._tips_heading.hide();
        this._tips_container.hide();
    }
    
    return this;
};

// --------
// UI
// --------

/**
 * Create UI
 * @memberOf {Recommend_tooltip}
 * @type {jQuery} UI
 */
Recommend_tooltip.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass('recommend-tooltip tooltip draggable-tool')
        .appendTo($('body'))
        .hide();
    
    var _content = $('<div class="tip-content kals-modal"></div>')
        .appendTo(_ui);
    
    // ---------
    
    var _recommended_item_container = this._create_recommended_item_container();
    _recommended_item_container.appendTo(_content);
    
    var _header = this._create_header_component();
    _header.appendTo(_recommended_item_container);
    
    //var _recommended_item = this._setup_recommended_item();
    //_recommended_item.get_ui().appendTo(_recommended_item_container);
    
    // ---------
    
    var _recommend_content = $('<div></div>')
        .addClass('recommend-content')
        .appendTo(_content);
    
    var _heading = $('<div></div>')
        .addClass('heading')
        .appendTo(_recommend_content);
    
    var _heading_lang = new KALS_language_param(
        'There are some recommend for you:',
        'recommend_tooltip.heading'
    );
    
    KALS_context.lang.add_listener(_heading, _heading_lang);
    
    this._tips_heading = _heading;
    
    // ---------
    
    var _tips_container = this._create_tips_container();
    _tips_container.appendTo(_recommend_content);
    
    var _recommend_by_item_container = this._create_recommend_by_item_container();
    _recommend_by_item_container.appendTo(_recommend_content);
    
    //var _list_item = this._setup_list_item();
    //_list_item.get_ui().appendTo(_list_item_container);
    
    // --------
    
    var _bottom = this._create_bottom_container();
    _bottom.appendTo(_content);
    
    var _submit = this._create_submit_container();
    _submit.appendTo(_bottom);
    
    var _submit_loading = this._create_submit_loading_component();
    _submit_loading.appendTo(_bottom);
    
    var _this = this;
    setTimeout(function () {
        
    
        KALS_context.policy.add_attr_listener('write', function (_policy) {
            if (_policy.writable()) {
                //_bottom.show();
            }
            else {
                //_bottom.hide();
                _this.close();
            }
        });
    }, 0);
    
    // ---------
    
    //var _needle_top = $('<div class="tip-needle top"></div>')
    //    .prependTo(_ui);
    //var _needle_bottom = $('<div class="tip-needle bottom"></div>')
    //    .appendTo(_ui);
    
    //設定可拖曳
    var _draggable_config = {
        handle: 'div.annotation-tool-header'
    };
    
    if ($('body').height() > _ui.height() + 100) {
        _draggable_config.containment = 'parent';
    }
    
    _ui.draggable(_draggable_config);
    _ui.bind('dragstop', function(_event) {
        var _body_top = 0;
        if ($.is_small_height() === false) {
			_body_top = KALS_toolbar.get_ui().height();
		}
        if (_ui.offset().top < _body_top) {
			_ui.css('top', _body_top + 'px');
		} 
    });
    
    _this = this;
    _ui.mouseover(function () {
        $('.draggable-tool.hover').removeClass('hover');
        $(this).addClass('hover');
    });
    
    return _ui;
};

Recommend_tooltip.prototype._header_component = null;

/**
 * 用Annotation_tool._create_header_component()
 */
Recommend_tooltip.prototype._create_header_component = function () {
    return Annotation_tool.prototype._create_header_component.call(this);
};    

/**
 * @type {jQuery}
 */
Recommend_tooltip.prototype._tips_heading = null;

/**
 * @type {jQuery}
 */
Recommend_tooltip.prototype._tips_container = null;

Recommend_tooltip.prototype._create_tips_container = function () {
    var _ui = $('<ul></ul>')
        .addClass('tips-container');
    this._tips_container = _ui;
    return _ui;
};

Recommend_tooltip.prototype._create_tip_list = function (_tip) {
    
    if ($.is_null(_tip)) {
		return null;
	}
    
    var _ui = $('<li></li>')
        .addClass('tip-list');
    
    _ui.html(_tip);
    
    return _ui;
};

/**
 * @type {jQuery}
 */
Recommend_tooltip.prototype._recommended_item_container = null;

Recommend_tooltip.prototype._create_recommended_item_container = function () {
    var _ui = $('<div></div>')
        .addClass('recommended-item-container');
        
    this._recommended_item_container = _ui;
    return _ui;
};

/**
 * @type {jQuery}
 */
Recommend_tooltip.prototype._recommend_by_item_container = null;

Recommend_tooltip.prototype._create_recommend_by_item_container = function () {
    var _ui = $('<div></div>')
        .addClass('recommend-by-item-container');
    
    var _heading = $('<div></div>')
        .addClass('heading')
        .appendTo(_ui);
    
    var _heading1 = $('<span></span>')
        .appendTo(_heading);
    
    var _heading1_lang = new KALS_language_param(
        'There is',
        'recommend_tooltip.recommend_by.heading1'
    );
    
    var _heading2 = $('<span></span>')
        .addClass('recommend-by-annotation')
        .appendTo(_heading);
    
    var _heading2_lang = new KALS_language_param(
        'a recommend annotation (with green color)',
        'recommend_tooltip.recommend_by.heading2'
    );
    
    var _heading3 = $('<span></span>')
        .appendTo(_heading);
    
    var _heading3_lang = new KALS_language_param(
        'for you:',
        'recommend_tooltip.recommend_by.heading3'
    );
    
    KALS_context.lang.add_listener(_heading1, _heading1_lang);
    KALS_context.lang.add_listener(_heading2, _heading2_lang);
    KALS_context.lang.add_listener(_heading3, _heading3_lang);
        
    this._recommend_by_item_container = _ui;
    return _ui;
};


/**
 * @type {Recommend_list_item}
 */
Recommend_tooltip.prototype.recommended_item = null;

Recommend_tooltip.prototype._setup_recommended_item = function (_param) {
    //var _param = this._recommended;
    var _component = new Recommend_list_item(_param);
    this.child('recommended_item', _component);
    _component.add_class('recommended-item');
    return _component;
};

/**
 * @type {Recommend_list_item}
 */
Recommend_tooltip.prototype.recommend_by_item = null;

Recommend_tooltip.prototype._setup_recommend_by_item = function (_param) {
    var _component = new Recommend_list_item(_param);
    this.child('recommend_by_item', _component);
    _component.add_class('recommend-by-item');
    return _component;
};



// --------
// Submit
// --------

Recommend_tooltip.prototype._bottom_container = null;

Recommend_tooltip.prototype._create_bottom_container = function () {
    var _ui = $('<div></div>')
        .addClass('bottom-container');
    
    this._bottom_container = _ui;
    return _ui;
};

Recommend_tooltip.prototype._submit_container = null;

Recommend_tooltip.prototype._create_submit_container = function () {
    var _ui = $('<div></div>')
        .addClass('submit-container');
    
    var _heading = $('<div></div>')
        .addClass('submit-heading')
        .appendTo(_ui);
    
    var _heading_lang = new KALS_language_param(
        'Base on this recommend, you can do following options:',
        'recommend_tooltip.submit.heading'
    );
    
    KALS_context.lang.add_listener(_heading, _heading_lang);
    
    // --------
        
    var _this = this;
    
    var _accept_delete_submit = $('<button type="button"></button>')
        .addClass('accept-delete submit-option')
        .click(function () {
            _this.accept();
        })
        .appendTo(_ui);
    
    var _accept_delete_lang = new KALS_language_param(
        'DELETE YOUR ANNOTATION',
        'recommend_tooltip.submit.accept_delete'
    );
    
    KALS_context.lang.add_listener(_accept_delete_submit, _accept_delete_lang);
    
    // ---------
    
    var _accept_recommend_submit = $('<button type="button"></button>')
        .addClass('accept-recommend submit-option')
        .click(function () {
            _this.accept();
        })
        .appendTo(_ui);
    
    var _accept_recommend_lang = new KALS_language_param(
        'REWRITE YOUR ANNOTATION',
        'recommend_tooltip.submit.accept_recommend'
    );
    
    KALS_context.lang.add_listener(_accept_recommend_submit, _accept_recommend_lang);
    
    // ---------
    
    var _reject_submit = $('<button type="button"></button>')
        .addClass('reject submit-option')
        .click(function () {
            _this.reject();
        })
        .appendTo(_ui);
    
    var _reject_lang = new KALS_language_param(
        'REJECT RECOMMEND',
        'recommend_tooltip.submit.reject'
    );
    
    KALS_context.lang.add_listener(_reject_submit, _reject_lang);
    
    _accept_delete_submit.setup_hover();
    _accept_recommend_submit.setup_hover();
    _reject_submit.setup_hover();
    
    this._submit_container = _ui;
    
    return _ui;
};

Recommend_tooltip.prototype._$default_position = 'bottom'; 

// ---------
// Loading
// ---------

Recommend_tooltip.prototype._loading_classname = 'loading';

Recommend_tooltip.prototype._submit_loading_component = null;

Recommend_tooltip.prototype._create_submit_loading_component = function () {
    var _component = $('<div></div>')
        .addClass('submit-loading-component')
        .hide();
        
    this._loading_component = _component;
    
    var _lang = new KALS_language_param(
        'Now Loading...',
        'recommend_tooltip.loading'
    );
    
    KALS_context.lang.add_listener(_component, _lang);
    
    this._submit_loading_component = _component;
    
    return _component;
};

Recommend_tooltip.prototype.toggle_submit_loading = function (_is_loading, _callback) {
    
    var _ui = this.get_ui();
    if ($.is_null(_is_loading)) {
        _is_loading = !(this.is_loading());
    }
    
    if (_is_loading) {
        _ui.addClass(this._loading_classname);
        
        var _this = this;
        this._submit_container.fadeOut('fast', function () {
            _this._submit_loading_component.fadeIn('fast', function () {
                $.trigger_callback(_callback);
            });
        });
    }
    else {
        _ui.removeClass(this._loading_classname);
        
        if (this._submit_loading_component === null) {
			return this;
		}
        this._submit_container.show();
        this._submit_loading_component.hide();
        $.trigger_callback(_callback);
    }
    return this;
};

/**
 * 是否正在讀取推薦提交中
 * @return {boolean}
 */
Recommend_tooltip.prototype.is_submit_loading = function () {
    var _ui = this.get_ui();
    return (_ui.hasClass(this._loading_classname));
};


// --------
// Submit
// --------

Recommend_tooltip.prototype._accept_url = 'annotation_setter/recommend_accept';

Recommend_tooltip.prototype.accept = function () {
    if (this.is_submit_loading()) {
		return this;
	}
    
    var _this = this;
    //注意的是，accept_recommend回傳的資料是更新過後的資料喔！
    var _callback = function (_data) {
        
        KALS_text.selection.select.clear();
        
        if (_data !== false)    //如果是錯誤的狀況，才會回傳false
        {
            var _reload_my_callback = function () {
                
                var _lang;
                if (typeof(_data.annotation_id) != 'undefined') {
                    //將新增的標註作為修改對象
                    var _annotation_id = _data.annotation_id;
                    KALS_text.tool.list.set_editing_param(_annotation_id);
                    
                    //先改變選取位置
                    var _recommend_by = _this.get_recommend_by();
                    var _recommend_by_scope = _recommend_by.scope;
                    KALS_text.selection.select.set_scope_coll(_recommend_by_scope);
                    
                    _lang = new KALS_language_param(
                        'Your annotation has been moved to recommend annotation\'s scope. You can edit it!',
                        'recommend_tooltip.submit.accept_recommend.notify'
                    );    
                }
                else {
                    _lang = new KALS_language_param(
                        'Your annotation has been deleted. Try to write another better!',
                        'recommend_tooltip.submit.accept_delete.notify'
                    );
                }
                KALS_util.notify(_lang);
                
                _this.close();
            };
            
            //因為範圍改變了，所以需要重新讀取
            if (typeof(_data.my) != 'undefined') {
				KALS_text.load_my.reload(_data.my, _reload_my_callback);
				
				if (typeof(_data.nav) != 'undefined') {
					KALS_text.load_navigation.reload(_data.nav);
				}
			}
			else {
				_reload_my_callback();
			}
        }
    };
    
    var _config = {
        url: this._accept_url,
        data: this.get_recommended_id(),
        callback: _callback
    };
    
    this.toggle_submit_loading(true, function () {
        //2010.11.14 測試用
        //_callback({annotation_id: 1212});return this;
        
        KALS_util.ajax_get(_config);
    });    
    
    return this;
};

Recommend_tooltip.prototype._reject_url = 'annotation_setter/recommend_reject';

Recommend_tooltip.prototype.reject = function () {
    if (this.is_submit_loading()) {
		return this;
	}
    
    var _this = this;
    //var _recommended_list_item = this._recommended_list_item;
    
    var _callback = function (_data) {
        var _recommended = _this._recommended;
        //刪除
        _recommended.recommend = null;
        //_recommended_list_item.set_data(_recommended);
        
        _this.close();
        
        //將新增的標註作為修改對象
        var _annotation_id = _recommended.annotation_id;
        KALS_text.tool.set_editing_param(_annotation_id);
        
        var _recommended_scope = _recommended.scope;
        KALS_text.selection.select.set_scope_coll(_recommended_scope);
    };
    
    var _config = {
        url: this._reject_url,
        data: this.get_recommended_id(),
        callback: _callback
    };
    
    this.toggle_submit_loading(true, function () {
        //2010.11.14 測試用
        //_callback(); return this;
        
        KALS_util.ajax_get(_config);    
    });
    return this;
};

Recommend_tooltip.prototype.close = function (_callback) {
    KALS_text.selection.recommend_by.clear();
    KALS_text.selection.recommended.clear();
    KALS_context.hash.delete_field('recommend');
    
    Overlay_modal.prototype.close.call(this, _callback);
};
Recommend_tooltip.prototype._$onviewportmove = null;

/* End of file Recommend_tooltip */
/* Location: ./system/application/views/web_apps/Recommend_tooltip.js */