/**
 * List_like_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/30 下午 02:24:45
 * @extends {JSONP_dispatcher}
 * @param {List_item}
 */
function List_like_component(_item) {
    
    JSONP_dispatcher.call(this);
    
    //$.test_msg("set item了嗎？", $.isset(_item));
    this._set_list_item(_item);
}

List_like_component.prototype = new JSONP_dispatcher();

// --------
// List Item
// --------

/**
 * List_item
 * @type List_item
 */
List_like_component.prototype._item = null;

List_like_component.prototype._set_list_item = function (_item) {
	//$.test_msg("set item了嗎？", this._item._annotation_param.annotation_id);
    if ($.isset(_item)) {
        this._item = _item;
        var _this = this;
        this._item.add_listener('set', function (_item) {
            _this.set_param();
        });
        //$.test_msg("設進去了嗎？set item了嗎？", $.isset(this._item._annotation_param.annotation_id));
    }
    return this;
};

/**
 * 設定參數
 * @returns {List_like_component}
 */
List_like_component.prototype.set_param = function () {
    var _param = this._item.get_data();
    var _is_like = _param.is_like;
    this._toggle_like(_is_like);
    this._set_like_count(_param.like_count);
    return this;
};

// --------
// Private Attributes
// --------

List_like_component.prototype._$load_url = 'annotation_setter/like';

List_like_component.prototype.like_classname = 'liked';

List_like_component.prototype._hover_classname = 'hover';

// --------
// UI
// --------

/**
 * Create UI
 * @memberOf {List_like_component}
 * @type {jQuery} UI
 */
List_like_component.prototype._$create_ui = function () {
    var _ui = $('<span></span>')
        .addClass('list-like-component');
    
    var _hover_classname = this._hover_classname;
    _ui.hover(function () {
        $(this).addClass(_hover_classname);
    }, function () {
        $(this).removeClass(_hover_classname);
    });
    
    var _icon = this._create_icon_component();
    _icon.appendTo(_ui);
    
    var _count = this._create_count_component();
    _count.prependTo(_ui);
    
    //如果沒有登入，則不顯示like
    var _this = this;
    
    _ui.click(function (_e) {
        _e.preventDefault();
        _this.set_is_like();
    });
    
    KALS_context.ready(function () {
        _this._init_policy_listener();
    });
    
    return _ui;
};

List_like_component.prototype._count_component = null;

List_like_component.prototype._create_count_component = function () {
    
    var _ui = $('<span></span>')
        .addClass('count-component');
    this._count_component = _ui;
    return _ui;
};

List_like_component.prototype._icon_component = null;

List_like_component.prototype._create_icon_component = function () {
    
    var _ui = $('<span></span>')
        .addClass('icon-component');
    this._icon_component = _ui;
    return _ui;
    
};

/**
 * 對伺服器送出喜愛訊息
 * 
 * @param {boolean} _is_like
 * @returns {List_like_component} description
 */
List_like_component.prototype.set_is_like = function (_is_like) {
    
    if ($.is_null(_is_like)) {
        _is_like = !(this.is_liked());
    }
    
    /**
     * @author Pulipuli Chen 20141113
     * 加入防止大量愛心
     */
    var _this = this;
    //$.test_msg("List_like_component._interval_timer()", [typeof(List_like_component._interval_timer), _is_like, (List_like_component._interval_timer !== null), (_is_like === true)]);
    if (typeof(List_like_component._interval_timer) === "number" && _is_like === true) {
        KALS_util.confirm(_this._lang.robot_check_heading
                , _this._lang.robot_check_content
                , function (_boolean_value, _overlay_close_action) {
                    if (_boolean_value === true) {
                        clearTimeout(List_like_component._interval_timer);
                        List_like_component._interval_timer = null;

                        _this.set_is_like(_is_like);
                        
                        //$.test_msg("List_like_component.set_is_like()", [_boolean_value, _is_like]);
                    }
                    _overlay_close_action();
                });
        return this;
    }
    else if (_is_like === true) {
        //$.test_msg("先設定-1");
        List_like_component._interval_timer = -1;
    }
    
    if (this._lock === true) {
        return this;
    }
    
    if (this._enable === false) {
        return this;
    }
    
    //$.test_msg("set_is_like", [_is_like, this.is_liked()]);
                
    var _annotation_id = this._item.get_annotation_id();
    
    var _data = {
        is_like: _is_like,
        annotation_id: _annotation_id
    };
    
    this._lock = true;
    
    /**
     * @type {Context_user} _context_user
     */
    var _context_user = KALS_context.user;

    //調整次數
    if (_is_like === true) {
        this.add_like_count();
        _context_user.set_like_to_count_add();
    }
    else {
        this.reduce_like_count();
        _context_user.set_like_to_count_reduce();
    }

    //_this._toggle_like(_is_like);

    //var _param = _this._item.get_data();
    var _lang;
    if (_is_like === true) {
        _lang = this._lang.set_like;
    }
    else {
        _lang = this._lang.set_not_like;
    }

    KALS_util.notify(_lang);
        
    this.load(_data, function (_this, _data) {
        _this.set_is_like_after_post(_this, _data, _is_like);
    });
    return this;
};

/**
 * 對伺服器送出喜愛訊息
 * 
 * @author Pulipuli Chen 20141113
 * @param {List_like_component} _this
 * @para {JSON} _data
 * @param {boolean} _is_like
 * @returns {List_like_component} description
 */
List_like_component.prototype.set_is_like_after_post = function (_this, _data, _is_like) {
    
    if (_this._lock === false) {
        return this;
    }

    _this._lock = false;

    /**
     * @author Pulipuli Chen
     * 20141107 不採用local update，直接從伺服器端update
     */
    KALS_context.user.load_user_params(function () {
        
        if (_is_like === true) {
            //$.test_msg("List_like_component.set_is_like_after_post()", ["開始設定", KALS_CONFIG.annotation_list.like_interval * 1000]);
            List_like_component._interval_timer = setTimeout(function () {
                clearTimeout(List_like_component._interval_timer);
                List_like_component._interval_timer = null;
                //$.test_msg("List_like_component.set_is_like_after_post()", "結束");
            }, KALS_CONFIG.annotation_list.like_interval * 1000);
        }
        
    });
    
    return this;
};

/**
 * 防止喜愛
 * @type Boolean
 */
List_like_component.prototype._lock = false;

/**
 * 計時器
 * @author Pulipuli Chen 20141103
 */
List_like_component._interval_timer = null;

List_like_component.prototype._lang = {
    'set_like': new KALS_language_param(
            'Add to like list',
            'list_like_component.set_like'
        ),
    'set_not_like': new KALS_language_param(
            'Remove from like list',
            'list_like_component.set_not_like'
        ),
    'robot_check_heading': new KALS_language_param(
            "Are You Sure?",
            "list_like_component.robot_check.heading"
        ), 
    'robot_check_content': new KALS_language_param(
            "Are you sure that you like this annotation?",
            "list_like_component.robot_check.content"
        )
}; 

/**
 * 是否是喜愛
 * @author Pulipuli Chen
 * @returns {Boolean}
 */
List_like_component.prototype.is_liked = function () {
    var _ui = this.get_ui();
    return _ui.hasClass(this.like_classname);
};

List_like_component.prototype._toggle_like = function (_is_like) {
    
    var _ui = this.get_ui();
    //$.test_msg('List_like_component.toggle_like 1', [_is_like, _ui.hasClass(this.like_classname), this.is_liked()]);
    
    if ($.is_null(_is_like)) {
        _is_like = (!(this.is_liked()));
    }
	
    if (_is_like === true) {
        _ui.addClass(this.like_classname);
    }
    else {
        _ui.removeClass(this.like_classname);
    }
        
    //$.test_msg('List_like_component.toggle_like 2', [_is_like, _ui.hasClass(this.like_classname), this.is_liked()]);
    
    return this;
};

List_like_component.prototype._like_count = 0;

List_like_component.prototype._set_like_count = function (_count) {
    if ($.is_null(_count) || _count < 1) {
        this._count_component.hide();
        this._count_component.empty();
        this._like_count = 0;
    }
    else {
        this._count_component.show();
        
        var _lang = new KALS_language_param(
            '{0} like',
            'list_like_component.like_count',
            _count
        );
        
        var _msg = KALS_context.lang.line(_lang);
        
        this._count_component.html(_msg);
        this._like_count = _count;
		
        //要修改item的param參數
        //var _param = this._item.get_annotation_param();
        //_param.like_count = _count;
        //this._item.editor_set_data(_param);
    }
    return this;
};

/**
 * 增加喜愛的計數
 * @returns {List_like_component}
 */
List_like_component.prototype.add_like_count = function () {
    this._like_count++;
    this._toggle_like(true);
    this._set_list_item_count();
    return this._set_like_count(this._like_count);
}; 

List_like_component.prototype.reset_like_count = function () {
    return this._set_like_count(0);
};

List_like_component.prototype.reduce_like_count = function () {
    this._like_count--;
    this._toggle_like(false);
    this._set_list_item_count();
    return this._set_like_count(this._like_count);
};

/**
 * 設定list item的參數
 * @param {number} _count
 */
List_like_component.prototype._set_list_item_count = function () {
    if ($.is_null(this._item)) {
        return this;
    }
    var _count = this._like_count;
    var _param = this._item.get_annotation_param();
    _param.like_count = _count;
    _param.is_like = this.is_liked();
    this._item.editor_set_data(_param);
	
    return this;
};

// --------------------------------------
// 權限設定

/**
 * 偵測是否是respond
 * 
 * @returns {Boolean}
 */
List_like_component.prototype._is_respond = function () {
    return this._item.is_respond();
};

/**
 * 初始化權限監聽器
 * @returns {List_like_component}
 */
List_like_component.prototype._init_policy_listener = function () {
    
    var _this = this;
    if (this._is_respond()) {
        KALS_context.policy.add_attr_listener('able_like_respond', function (_policy) {
            var _enable = _policy.able_like_respond();
            _this.toggle_enable(_enable);
        });
    }
    else {
        KALS_context.policy.add_attr_listener('able_like_topic', function (_policy) {
            var _enable = _policy.able_like_topic();
            _this.toggle_enable(_enable);
        });
    }    
    
    return this;
};

/**
 * 設定是否啟用
 * @param {Boolean} _enable
 * @returns {List_like_component}
 */
List_like_component.prototype.toggle_enable = function (_enable) {
    
    var _ui = this.get_ui();
    
    var _disable_classname = "disable-like";
    
    var _title = KALS_context.lang.line(new KALS_language_param(
            "Your like function is disabled.",
            "list_like_component.disable_like"
        ));

    if (_enable === true) {
        _ui.removeClass(_disable_classname);
        _ui.removeAttr("title");
    }
    else {
        _ui.addClass(_disable_classname);
        _ui.attr("title", _title);
    }
    this._enable = _enable;
    
    return this;
};

/**
 * 是否啟用
 * @type Boolean
 */
List_like_component.prototype._enable = true;

/* End of file List_like_component */
/* Location: ./system/application/views/web_apps/List_like_component.js */