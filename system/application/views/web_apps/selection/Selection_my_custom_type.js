/**
 * Selection_my_custom_type
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/24 下午 01:58:03
 * @extends {Selection_my}
 */
function Selection_my_custom_type(_text, _type_name) {
    
    Selection_my.call(this,_text);
    
    if ($.isset(_type_name)) {
		this._$name = _type_name;
	}
}

Selection_my_custom_type.prototype = new Selection_my();

Selection_my_custom_type.prototype._$name = 'my_custom_type';

/* End of file Selection_my_custom_type */
/* Location: ./system/application/views/web_apps/Selection_my_custom_type.js */