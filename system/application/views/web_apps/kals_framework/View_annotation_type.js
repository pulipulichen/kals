/**
 * View_annotation_type
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pulipuli Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2013/11/23 下午 03:31:54
 * @extends {Type_component}
 * @param {Annotation_type_param} _type
 */
function View_annotation_type(_type) {
    
    Type_component.call(this);
    
    this.set_type(_type, false);
}

View_annotation_type.prototype = new Type_component();

/**
 * Create UI
 * @type {jQuery} UI
 */
View_annotation_type.prototype._$create_ui = function () {
    var _ui = $('<span></span>')
        .addClass('type-component')
        .addClass('view-annotation-type');
    
    var _this = this;
    
    setTimeout(function () {
        _this.set_type();
    }, 0);
    var _menu = this._setup_menu();
    //_menu.get_ui().appendTo(_ui);
    var _config = _menu._$get_config();
    
    //$.test_msg('Type_component._$create_ui()', _config);
    
    var _options = _menu.create_type_option_list();
    
    for (var _i in _options) {
        var _option = _options[_i];
        
        //_option.tooltip(_config);
        
        if (_i === 'custom') {
            _option = this._create_custom_type_option(_option);
        }
        _option.hide().appendTo(_ui);
    }
    
    //_ui.tooltip(_config);
	
    //_ui.setup_hover();
    
    // 20130603 Pudding Chen
    // 預設選單
    var _default_type = null;
    if (typeof(KALS_CONFIG.default_annotation_type) === "string") {
        var _default_type_name = KALS_CONFIG.default_annotation_type;
        for (_i in _options) {
            _option = _options[_i];
            var _type_name = _i;
            //$.test_msg("Type_component", [_i, _default_type_name]);
            if (_default_type_name === _type_name) {
                this._default_type = KALS_context.custom_type.find_type(_i);
                _default_type = this._default_type;
                //$.test_msg("Type_component set default", this._default_type); 
                break;
            }
        }
    }

    //如果沒有設定預設選單，則自動選擇第一個選單
    if (_default_type === null) {
        for (_i in _options) {
            _option = _options[_i];
            _type_name = _i;
            this._default_type = KALS_context.custom_type.find_type(_i);
            break;
        }
    }
    //this._listen_editor();
    return _ui;
};

/* End of file Type_component */
/* Location: ./system/application/views/web_apps/kals_framework/View_annotation_type.js */