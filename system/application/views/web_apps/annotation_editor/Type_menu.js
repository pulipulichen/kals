/**
 * Type_menu
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/18 下午 04:57:05
 * @extends {Tooltip_modal}
 * @param {jQuery} _type_component 放置標註類型的元件
 */
function Type_menu(_type_component) {
    
    Tooltip_modal.call(this);
    
    this._type_component = _type_component;
    
    //var _this = this;
    this._init_type_options();
    
    //setTimeout(function () {
    //    _this.get_ui();
    //}, 0);
    
    //this._enable_type = _enable_type;
}

Type_menu.prototype = new Tooltip_modal();

Type_menu.prototype._$modal_name = 'Type_menu';

/**
 * type menu id
 * @type {String}
 */
Type_menu.prototype._menu_id = 'editor_type_menu';

/**
 * 啟用標註類型的形態
 * @type String|undefined
 * @deprecated 20140505 Pulipuli Chen
 * 不寫死，動態調整
 */
//Type_menu.prototype._enable_type = "topic";

/**
 * Create UI
 * @memberOf {Type_menu}
 * @type {jQuery} UI
 */
Type_menu.prototype._$create_ui = function () {
    this._menu_id = this._menu_id + $.create_id();
    var _id = this._menu_id;
    
    var _ui = this._create_tooltip_prototype({
        id: _id,
        classname: 'type-menu KALS'
    });
    /*
    // 基本類型
    var _options = KALS_context.basic_type.get_type_list();
    for (var _i in _options) {
        var _type = _options[_i];
        this._setup_type_ui(_ui, _type);
    }
    
    // 預定類型
    var _custom_type_list = KALS_context.predefined_type.get_type_list();
    //$.test_msg('Type_menu._$create_ui custom_type_lis', _custom_type_list);
    for (var _j in _custom_type_list) {
        //$.test_msg('Type_menu._$create_ui custom_type_lis', _j);
        _type = _custom_type_list[_j];
        this._setup_type_ui(_ui, _type);
    }
    //_ui.appendTo($("body"));
    */
    var _type_list = KALS_context.create_type_param_list();
    for (var _type_name in _type_list) {
        var _type_param = _type_list[_type_name];
        this._setup_type_ui(_ui, _type_param);
    }
    return _ui;
};

/**
 * 設置標註類型的按鈕
 * @version 20111105 Pudding Chen
 * @param {jQuery} _ui 按鈕元件
 * @param {string|Annotation_type_param} _type 類型
 */
Type_menu.prototype._setup_type_ui = function (_ui, _type) {
    var _type_ui = this.create_type_option(_type);
    _type_ui = this.setup_type_option(_type_ui);
    _type_ui.appendTo(_ui);
    
    var _hint_ui = this.create_type_hint(_type);
    if ($.is_null(_hint_ui) === false) {
        //$.test_msg("setup_type_ui");
        _hint_ui.appendTo(_ui);
        _type_ui.tooltip(this._hint_tooltip_config);
    }
    return this;
};

/**
 * 標註選項的classname
 * @type {String} 
 */
Type_menu.prototype._option_classname = 'type-option';

/**
 * 建立按鈕吧
 * @param {String|Annotation_type_param} _type 標註類型
 * @return {jQuery}
 */
Type_menu.prototype.create_type_option = function (_type) {
    
    /*
    var _type_ui = $('<span></span>')
        .addClass(this._option_classname);
        
    var _classname;
    var _annotation_type;
    
    if ($.is_string(_type)) {
        _classname = _type;
        _annotation_type = _type;
        
        var _lang_index = this._type_lang_header + _type;
        if (this.enable_custom_name === false
            && _type == 'custom') {
            _lang_index = this._type_lang_header + 'other';
        }
        
        var _type_lang = new KALS_language_param(
            _type,
            _lang_index
        );
        
        KALS_context.lang.add_listener(_type_ui, _type_lang);
    }
    else if ($.is_class(_type, 'Annotation_type_param')) {
        _classname = _type.get_classname();
        _annotation_type = _type.get_name();
        var _type_name = _type.get_name();
        //$.test_msg('Type_menu.create_type_option _classname', [_annotation_type, _classname]);
        
        _type_ui.html(_type_name);
        
        var _style = _type.get_menu_style();
        _type_ui.attr('style', _style);
    }
    
    _type_ui.addClass(_classname)
        .attr('annotation_type', _annotation_type);
    */
	
    //var _type_value = $('<input type="hidden" class="type-value" value="'+_type+'" />')
    //    .appendTo(_type_ui);
    
    //var _option_ui = KALS_context.predefined_type.get_type_option(_type);
    if ($.is_class(_type, "Annotation_type_param") === false) {
        _type = new Annotation_type_param(_type);
    }
    var _option_ui = _type.get_option_ui().clone(true);
    
    return _option_ui;
};

/**
 * @type {String} 提示
 */
Type_menu.prototype._hint_classname = 'type-hint';

/**
 * 建立提示的選項
 * @param {String|Annotation_type_param} _type
 */
Type_menu.prototype.create_type_hint = function (_type) {
    
    var _hint_ui = $('<div></div>')
        .addClass(this._hint_classname);
    var _classname = '';
    
    if ($.is_string(_type)) {
        _classname = _type;
        var _hint_lang;
        if (this.enable_custom_name === false
                && _type === 'custom') {
            _hint_lang = new KALS_language_param(
                'Your custom type.',
                'annotation.type.other.hint'
            );
        }
        else {
            _hint_lang = new KALS_language_param(
                '',
                'annotation.type.' + _type + '.hint'
            );
        }
        KALS_context.lang.add_listener(_hint_ui, _hint_lang);
    }
    else if ($.is_class(_type, 'Annotation_type_param')) {
        _classname = _type.get_classname();
        var _hint = _type.get_hint();
        if ($.is_null(_hint)) {
            return null;
        }
        _hint_ui.html(_type.get_hint());
    }
    
    _hint_ui.addClass(_classname + '-hint');
    
    return _hint_ui;
};

Type_menu.prototype._hint_tooltip_config = {
    position: 'center right',
    relative: true,
    offset: [0, 5],
    delay: 0
};

/**
 * 建立標註類型選項
 * @type {Array|jQuey} 標註類型選項的列表
 */
Type_menu.prototype.create_type_option_list = function () {
    
    var _list = {};
    for (var _i in this._type_options) {
        var _type = this._type_options[_i];
        var _option = this.create_type_option(_type);
        _list[_type] = _option;
    }
    
    //$.test_msg('Type_menu.create_type_option_list _list.length', _length);
    
	/**
	 * 20130603 Pudding Chen 
	 * 加入自訂的標註類型
	 */
    var _custom_type_list = KALS_context.predefined_type.get_type_list();
    for (var _j in _custom_type_list) {
        _type = _custom_type_list[_j];
        var _type_name = _type.get_name();
        _option = this.create_type_option(_type);
        _list[_type_name] = _option;
    }
    
    return _list;
    
};


/**
 * 建立標註類型參數
 * @type {Array|Annotation_type_param} 標註類型選項的列表
 */
Type_menu.prototype.create_type_param_list = function () {
	
	/**
	 * Pulipuli Chen 20131114
	 * 改為KALS_context中使用
	 */
    return KALS_context.create_type_param_list();
};

Type_menu.prototype.setup_type_option = function (_type_ui) {
    
    var _hover_classname = 'hover';
    
    _type_ui.hover(function () {
        $(this).addClass(_hover_classname);
    }, function () {
        $(this).removeClass(_hover_classname);
    });
   
    var _component = this._type_component;
    var _this = this;
    _type_ui.click(function () {
        //var _type = $(this).find('.type-value').val();
        var _type = $(this).attr('annotation_type');
        
        //$.test_msg('Type_menu.setup_option()', _type);
        
        if (_this.enable_custom_name === true
                && _type === 'custom') {
            _this.open_custom_name_dialog();
        }
        else {
            /**
             * 20130603 Pudding Chen
             * 加入記錄最後選擇參數的設定
             */
			//_component.set_type(_type);    
			_component.set_type(_type, true);
			
        }
        _this.close();
    });
    
    return _type_ui;
};

/**
 * @type {Type_component}
 */
Type_menu.prototype._type_component = null;

/**
 * 標註選項。注意此選項會影響順序。
 * @type {String[]}
 */
Type_menu.prototype._type_options = [];

/**
 * @author Pulipuli Chen 20140502
 * 將設定改成到函式中處理
 * @returns {undefined}
 */
/*
if (typeof(KALS_CONFIG.annotation_type_basic_enable) !== "undefined") {
    Type_menu.prototype._type_options = KALS_CONFIG.annotation_type_basic_enable;
}
else if (typeof(KALS_CONFIG.annotation_type_option) !== "undefined") {
    Type_menu.prototype._type_options = KALS_CONFIG.annotation_type_option;
}
*/

/**
 * 初始化載入標註的類型
 * @returns {Type_menu.prototype}
 */
Type_menu.prototype._init_type_options = function () {
    //this._type_options = KALS_context.get_basic_type_options();
    this._type_options = KALS_context.basic_type.get_type_name_list();
    return this;
};

/*
Type_menu.prototype._type_options = [
    'importance',
    'concept',
    'confusion',
    'question',
    'example',
    'summary',
    'custom'
];
*/

Type_menu.prototype._type_lang_header = 'annotation.type.';

Type_menu.prototype._$get_config = function () {
    
    var _selector = '#' + this._menu_id + ':first';
    
    var _config = Tooltip_modal.prototype._$get_config.call(this, _selector);
    
    _config.position = 'bottom right';
    //_config.offset = [-50, -13];
	_config.offset = [0, 0];
    _config.events = {def: 'click mouseover, mouseleave' };
    
    var _onbeforeshow;
    if (typeof(_config.onBeforeShow) === 'function') {
        _onbeforeshow = _config.onBeforeShow;
    }
        
    var _this = this;
    _config.onBeforeShow = function () {
        _this._on_before_show(this, _onbeforeshow);
    };
    
    _config.relative = true;
    
    return _config;
};

/**
 * 顯示之前的調整
 * @param {Function} _onbeforeshow
 * @returns {Type_menu}
 */
Type_menu.prototype._on_before_show = function (_tooltip, _onbeforeshow) {
    var _this = this;
    //this.get_ui().css("visibility", "hidden");
    
    var _loading_classname = "loading";
    this.get_ui().addClass(_loading_classname);
    setTimeout(function () {		
        _this.setup_position();    
        //_this.get_ui().css("visibility", "visible");
        _this.get_ui().removeClass(_loading_classname);
    }, 0);

    if ($.is_function(_onbeforeshow)) {
        _onbeforeshow.call(_tooltip);
    }
    
    // 開啟時改變型態
    var _enable_type = "topic";
    if (this._type_component.is_respond()) {
        _enable_type = "respond";
    }
    this.change_enable_type(_enable_type);
    
    return this;
};

/**
 * 設定標註類型選單的位置
 */
Type_menu.prototype.setup_position = function () {
    
    var _ui = this.get_ui();
    
	var _type_ui = this._type_component.get_ui();
	
	//var _type_offset = _type_ui.offset();
        var _type_offset = $.get_offset(_type_ui);
	var _type_right = _type_ui.width();
	//$.test_msg("setup_position", [_type_offset.left, _type_ui.width(), _type_right]);
	_ui.css("left", _type_right + "px");
	
	_ui.css("top", "-50px");
	
    var _top, _left;
    
    //上極限
    //if (_ui.offset().top < 0) {
    if ($.get_offset_top(_ui) < 0) {
        _top = 0;
    }
    
    //$.test_msg('Type_menu.setup_position()', _ui.offset().top);
    
    if ($.isset(_top)) {
        _ui.css('top', _top + 'px');
    }
    
    //左右
    //var _ui_left = _ui.offset().left;
    //var _ui_right = _ui_left + _ui.width();
    var _ui_left = $.get_offset_left(_ui);
    var _ui_right = $.get_offset_right(_ui);
    
    if (_ui_right > $('body').width()) {
        var _trigger = this.get_trigger();
        //var _trigger_left = _trigger.offset().left;
        var _trigger_left = $.get_offset_left(_trigger);
        _left = _trigger_left - _ui.width() - 10;
        
        if (_left < 0) {
            _left = null;
        }
    }
    
    if ($.isset(_left)) {
        _ui.css('left', _left + 'px');
    }
    
    return this;
};

// --------
// Custom name dialog
// --------


/**
 * 是否啟用自訂標籤。
 * 
 * 如果啟用的話，則允許使用者自訂標籤的字串。
 * 否則自訂會以「其他」顯示，使用者不能自訂字串。
 * 2010.10.25 因為Modal端尚不能自訂字串，所以在此設定為false
 */
Type_menu.prototype.enable_custom_name = KALS_CONFIG.enable_custom_name;

/**
 * @type {Dialog_modal}
 */
Type_menu.prototype._custom_name_dialog = null;

/**
 * @type {jQuery}
 */
Type_menu.prototype._custom_name_dialog_content = null;

Type_menu.prototype.open_custom_name_dialog = function () {
    
    var _dialog = this._custom_name_dialog;
    var _this = this;
    if (_dialog === null) {
        _dialog = new Dialog_modal();
        
        _dialog.set_heading(new KALS_language_param(
            'Custom Annotation Type',
            'type_menu.custom_type_dialog.heading'
        ));
        
        var _content = $('<div class="custom-type-dialog"><input name="custom_type" type="text" class="text" /></div>');
        
        this._custom_name_dialog_content = _content;
        
        _dialog.set_content(_content);
        
        var _option_lang = new KALS_language_param(
            'OK',
            'window.ok'
        );
        
        var _option = new Dialog_close_option(_option_lang, function () {
            var _custom_name = _content.find('input[name="custom_type"]:first').val();
            //alert(_custom_name);
			
			/**
			 * 20130603 Pudding Chen
			 * 改成記錄最後一次選擇的標註類型
			 */
            //_this._type_component.set_type(_custom_name);
			_this._type_component.set_type(_custom_name, true);
			
            return false;
        });
        
        _dialog.set_options(_option);
        
        this._custom_name_dialog = _dialog;
    } 
    this._custom_name_dialog_content.find('input').val('');
    _dialog.open();
    return this;
};

/**
 * 找一下這個type是不是自訂的類型
 * @deprecated 20130603 Pudding Chen 不使用了，因為現在標註類型不是單純的字串，而是物件
 * @param {Object} _type
 */
Type_menu.prototype.filter_type = function (_type) {
    
    for (var _i in this._type_options) {
        if (_type === this._type_options[_i]) {
            return _type;
        }
    }
    
    return 'custom';
};

/**
 * --------------------------------------------------
 */

/**
 * 在主題標註時啟用
 * @type Boolean
 */
//Type_menu.prototype._enable_topic = true;

/**
 * 在回應標註時啟用
 * @type Boolean
 */
//Type_menu.prototype._enable_respond = true;
/*
Type_menu.prototype.set_enable_type = function (_type) {
    if (_type === "topic") {
        this._enable_topic = true;
        this._enable_respond = false;
    }
    else if (_type === "repsond") {
        this._enable_topic = false;
        this._enable_respond = true;
    }
    else {
        this._enable_topic = true;
        this._enable_respond = true;
    }
    
    return this;
};
*/
/**
 * 確認是否是回應的狀態
 * 
 * 直接介接到Type_component.is_respond()
 * @returns {Boolean}
 */
Type_menu.prototype.is_respond = function () {
    var _is_respond = false;
    if (this._type_component !== null) {
        _is_respond = this._type_component.is_respond();
    }
    return _is_respond;
};

/**
 * 切換要顯示的標註類型
 * @param {String} _enable_type
 * @returns {Type_menu.prototype}
 */
Type_menu.prototype.change_enable_type = function (_enable_type) {
    
    //$.test_msg("type-menu, _enable_type", _enable_type);
    
    var _type_options = this.find(".type-option")
                            .hide()
                            .filter(".enable-type-" + _enable_type);
    if (_type_options.length > 1) {
        _type_options.show();
    }
    
    return this;
};

/* End of file Type_menu */
/* Location: ./system/application/views/web_apps/Type_menu.js */