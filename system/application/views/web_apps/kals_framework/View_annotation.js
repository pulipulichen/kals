/**
 * View_annotation
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2013/11/19 下午 07:27:52
 * @extends {List_item}
 * @param {Annotation_param} _annotation_param
 */
function View_annotation(_annotation_param) {
    
    List_item.call(this, _annotation_param);
}

View_annotation.prototype = new List_item();

/**
 * 繼承自KALS_controller，要結合起來
 */
var _prototype = new KALS_controller();
    
for (var _i in _prototype) {
	if (typeof(View_annotation.prototype[_i]) === 'undefined') {
		View_annotation.prototype[_i] = _prototype[_i];
	}
}

View_annotation.prototype._$name = 'view-annotation';

View_annotation.prototype._$create_ui = function () {
	var _ui = List_item.prototype._$create_ui.call(this);
	_ui.addClass(this._$name);
	return _ui;
};

/* End of file View_annotation */
/* Location: ./system/application/views/web_apps/kals_framework/View_annotation.js */