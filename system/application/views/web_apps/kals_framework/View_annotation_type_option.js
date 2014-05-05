/**
 * View_annotation_type_option
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pulipuli Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2013/11/23 下午 03:31:54
 * @extends {KALS_user_interface}
 * @param {Annotation_type_param} _type
 */
function View_annotation_type_option(_type) {
    
    KALS_user_interface.call(this);
    
    this.set_type(_type);
}

View_annotation_type_option.prototype = new KALS_user_interface();

/**
 * 這個按鈕的標註類型參數
 * @type {Annotation_type_param}
 */
View_annotation_type_option.prototype._type = null;

/**
 * 設定標註類型
 * @param {Annotation_type_param} _type
 * @returns {View_annotation_type_option}
 */
View_annotation_type_option.prototype.set_type = function (_type) {
    this._type = _type;
    return this;
};

/**
 * Create UI
 * @type {jQuery} UI
 */
View_annotation_type_option.prototype._$create_ui = function () {
    var _option = $('<span></span>')
        .addClass('type-option')
        .addClass('view-annotation-type');
    
    //取得參數    
    var _type_param = this._type;
    
    //設置外觀
    _option.addClass(_type_param.get_classname());
    if (_type_param.is_basic() === false) {
        _option.attr('style', _type_param.get_option_style());
    }
    
    //接下來是內文的部份
    var _type_name = _type_param.get_type_name();
    _option.html(_type_name);
    
    if (_type_param.is_basic()) {
        var _type_lang_header = Type_menu.prototype._type_lang_header;
        var _lang = new KALS_language_param(
            _type_name,
            _type_lang_header + _type_name
        );
        
        KALS_context.lang.add_listener(_option, _lang);
    }
    
    //額外的參數
    _type_name = _type_param.get_type_name();
    _option.attr('annotation_type', _type_name);
    
    return _option;
};

/* End of file View_annotation_type_option */
/* Location: ./system/application/views/web_apps/kals_framework/View_annotation_type_option.js */