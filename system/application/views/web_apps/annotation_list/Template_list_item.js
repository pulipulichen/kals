/**
 * Template_list_item
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2013/11/19 下午 07:27:52
 * @extends {List_item}
 * 
 * @param {Annotation_param} _annotation_param
 */
function Template_list_item(_annotation_param) {
    
    List_item.call(this, _annotation_param);
}

Template_list_item.prototype = new List_item();

/**
 * 繼承自Template_controller，要結合起來
 */
var _prototype = new Template_controller();
    
for (var _i in _prototype) {
	if (typeof(Template_list_item.prototype[_i]) === 'undefined') {
		Template_list_item.prototype[_i] = _prototype[_i];
	}
}

Template_list_item.prototype._$name = 'template-list-item';

Template_list_item.prototype._$create_ui = function () {
	var _ui = List_item.prototype._$create_ui.call(this);
	_ui.addClass(this._$name);
	return _ui;
};

/* End of file Template_list_item */
/* Location: ./system/application/views/web_apps/Template_list_item.js */