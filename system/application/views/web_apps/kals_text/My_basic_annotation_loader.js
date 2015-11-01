/**
 * My_basic_annotation_loader
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/24 下午 06:40:07
 * @extends {Annotation_scope_loader}
 */
function My_basic_annotation_loader() {
    
    Annotation_subscope_loader.call(this);
    //$.test_msg("My_basic_annotation_loader", this._$is_basic);
}

My_basic_annotation_loader.prototype = new Annotation_subscope_loader();

My_basic_annotation_loader.prototype._$load_url = 'annotation_getter/my_basic';

My_basic_annotation_loader.prototype._$is_basic = true;

/**
 * 範圍名稱
 * @type String
 */
My_basic_annotation_loader.prototype._$scope_name = "my_basic";

/**
 * 設定權限的名稱
 * @type String
 */
My_basic_annotation_loader.prototype._$policy_name = "my_basic";


/* End of file My_annotation_loader */
/* Location: ./system/application/views/web_apps/My_annotation_loader.js */