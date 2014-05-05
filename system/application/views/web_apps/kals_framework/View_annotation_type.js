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



View_annotation_type_option.prototype.set_type = function (_type) {
    
};

/**
 * Create UI
 * @type {jQuery} UI
 */
View_annotation_type.prototype_option._$create_ui = function () {
    var _ui = $('<span></span>')
        .addClass('type-component')
        .addClass('view-annotation-type');

    return _ui;
};

/* End of file View_annotation_type_option */
/* Location: ./system/application/views/web_apps/kals_framework/View_annotation_type_option.js */