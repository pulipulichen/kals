/**
 * Template_list_collection
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2013/11/19 下午 07:27:52
 * @extends {List_collection}
 */
function Template_list_collection(_annotation_collection_param) {
    
    List_collection.call(this);
    
	this._list_items = [];
	if (_annotation_collection_param !== undefined) {
		//this.set_annotation_collection(_annotation_collection_param);
		//var _annotations = _annotation_collection_param.get_annotations();
		//$.test_msg('--------------------------------');
		//$.test_msg('temp list coll', _annotation_collection_param);
		var _annotations = _annotation_collection_param.annotations;
		this.set_field('annotation', _annotations);
	}
}

Template_list_collection.prototype = new List_collection();

/**
 * 繼承自Template_controller，要結合起來
 */
var _prototype = new Template_controller();
    
for (var _i in _prototype) {
	
	if (typeof(Template_list_item.prototype[_i]) === 'undefined')  {
		Template_list_collection.prototype[_i] = _prototype[_i];
	}
}

Template_list_collection.prototype._$template = 'annotation_list/template/Template_list_collection';

//Template_list_collection.prototype._$name = 'template-list-collection';

/**
 * @param {Annotation_param} _param
 * @type {Template_list_item} 
 */
/*
Template_list_collection.prototype.create_list_item = function(_param) {
    return new Template_list_item(_param);
};
*/

/* End of file Template_list_collection */
/* Location: ./system/application/views/web_apps/Template_list_collection.js */