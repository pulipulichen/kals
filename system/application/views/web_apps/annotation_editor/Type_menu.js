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
 */
function Type_menu(_type_component) {
    
    Tooltip_modal.call(this);
    
    this._type_component = _type_component;
    
    var _this = this;
    /*
    setTimeout(function () {
        _this.get_ui();
    }, 0);
    */
}

Type_menu.prototype = new Tooltip_modal();

Type_menu.prototype._$modal_name = 'Type_menu';

/**
 * type menu id
 * @type {String}
 */
Type_menu.prototype._menu_id = 'editor_type_menu';

/**
 * Create UI
 * @memberOf {Type_menu}
 * @type {jQuery} UI
 */
Type_menu.prototype._$create_ui = function ()
{
    this._menu_id = this._menu_id + $.create_id();
    var _id = this._menu_id;
    
    var _ui = this._create_tooltip_prototype({
        id: _id,
        classname: 'type-menu'
    });
    
    var _options = this._type_options;
    var _disable_annotation_type = KALS_CONFIG.disable_annotation_type;
    
    for (var _i in _options)
    {
        var _type = _options[_i];
        
        if ($.inArray(_type, _disable_annotation_type) > -1)
            continue;
        
        var _type_ui = this.create_type_option(_type);
        _type_ui = this.setup_type_option(_type_ui);
        _type_ui.appendTo(_ui);
        
        var _hint_ui = this.create_type_hint(_type);
        _hint_ui.appendTo(_ui);
        
        _type_ui.tooltip(this._hint_tooltip_config);
    }
    
    return _ui;
};

Type_menu.prototype._option_classname = 'type-option';

/**
 * @type {jQuery}
 */
Type_menu.prototype.create_type_option = function (_type) {
    
    var _lang_index = this._type_lang_header + _type;
    
    if (this.enable_custom_name == false
        && _type == 'custom')
    {
        _lang_index = this._type_lang_header + 'other';
    }
    
    
    var _type_lang = new KALS_language_param(
        _type,
        _lang_index
    );
    
    var _type_ui = $('<span></span>')
        .addClass(this._option_classname)
        .addClass(_type)
        .attr('annotation_type', _type);
    
    //var _type_value = $('<input type="hidden" class="type-value" value="'+_type+'" />')
    //    .appendTo(_type_ui);
        
    KALS_context.lang.add_listener(_type_ui, _type_lang);
    
    return _type_ui;
};

Type_menu.prototype._hint_classname = 'type-hint';

Type_menu.prototype.create_type_hint = function (_type) {
    
    var _hint_lang;
    if (this.enable_custom_name == false
        && _type == 'custom')
    {
        _hint_lang = new KALS_language_param(
            'Your custom type.',
            'annotation.type.other.hint'
        );
    }
    else
    {
        _hint_lang = new KALS_language_param(
            '',
            'annotation.type.' + _type + '.hint'
        );
    }
    
    var _hint_ui = $('<div></div>')
        .addClass(this._hint_classname)
        .addClass(_type + '-hint');
    
    KALS_context.lang.add_listener(_hint_ui, _hint_lang);
    
    return _hint_ui;
};

Type_menu.prototype._hint_tooltip_config = {
    position: 'center right',
    relative: true,
    offset: [0, 5],
    delay: 0
};

Type_menu.prototype.create_type_option_list = function () {
    
    var _list = {};
    
    for (var _i in this._type_options)
    {
        var _type = this._type_options[_i];
        var _option = this.create_type_option(_type);
        _list[_type] = _option;
    }
    
    return _list;
    
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
        
        if (_this.enable_custom_name == true
            && _type == 'custom')
        {
            _this.open_custom_name_dialog();
        }
        else
        {
            _component.set_type(_type);    
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
Type_menu.prototype._type_options = [
    'importance',
    'concept',
    'confusion',
    'question',
    'example',
    'summary',
    'custom'
];

Type_menu.prototype._type_lang_header = 'annotation.type.';

Type_menu.prototype._$get_config = function () {
    
    var _selector = '#' + this._menu_id + ':first';
    
    var _config = Tooltip_modal.prototype._$get_config.call(this, _selector);
    
    _config['position'] = 'bottom right';
    _config['offset'] = [-50, -13];
    _config['events'] = {def: 'click mouseover, mouseleave' };
    
    var _onbeforeshow;
    if (typeof(_config['onBeforeShow']) == 'function')
        _onbeforeshow = _config['onBeforeShow'];
        
    var _this = this;
    _config['onBeforeShow'] = function () {
        
        setTimeout(function () {
            _this.setup_position();    
        }, 10);
        
        
        if ($.is_function(_onbeforeshow))
            _onbeforeshow.call(this);
    };
    
    _config['relative'] = true;
    
    return _config;
    
};

Type_menu.prototype.setup_position = function () {
    
    
    var _ui = this.get_ui();
    
    var _top, _left;
    
    //上極限
    if (_ui.offset().top < 0)
        _top = 0;
    
    //$.test_msg('Type_menu.setup_position()', _ui.offset().top);
    
    if ($.isset(_top))
        _ui.css('top', _top + 'px');
    
    //左右
    var _ui_left = _ui.offset().left;
    var _ui_right = _ui_left + _ui.width();
    
    if (_ui_right > $('body').width())
    {
        var _trigger = this.get_trigger();
        var _trigger_left = _trigger.offset().left;
        _left = _trigger_left - _ui.width() - 10;
        
        if (_left < 0)
            _left = null;
    }
    
    if ($.isset(_left))
        _ui.css('left', _left + 'px');
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
    if (_dialog == null)
    {
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
            var _custom_name = _content.find('input:first').val();
            //_this._type_component.set_custom_name(_custom_name);
            //_this._type_component.set_type('custom');
            _this._type_component.set_type(_custom_name);
            return false;
        });
        
        _dialog.set_options(_option);
        
        this._custom_name_dialog = _dialog;
    } 
    this._custom_name_dialog_content.find('input').val('');
    _dialog.open();
    return this;
};

Type_menu.prototype.filter_type = function (_type) {
    
    for (var _i in this._type_options)
    {
        if (_type == this._type_options[_i])
            return _type;
    }
    
    return 'custom';
};

/* End of file Type_menu */
/* Location: ./system/application/views/web_apps/Type_menu.js */