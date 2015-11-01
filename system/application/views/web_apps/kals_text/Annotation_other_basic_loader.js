/**
 * Annotation_other_basic_loader
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2015, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2015/11/02 下午 06:40:07
 * @extends {Annotation_scope_loader}
 */
function Annotation_other_basic_loader() {
    
    Annotation_subscope_loader.call(this);
	
}

Annotation_other_basic_loader.prototype = new Annotation_subscope_loader();

Annotation_other_basic_loader.prototype._$load_url = 'annotation_getter/other_basic';


Annotation_other_basic_loader.prototype._$is_basic = true;

/**
 * 範圍名稱
 * @type String
 */
Annotation_other_basic_loader.prototype._$scope_name = "other_basic";

/**
 * 只需要得知是否可以瀏覽其他資料即可
 * @param {Context_policy} _policy
 * @returns {boolean}
 */
Annotation_other_basic_loader.prototype._policy_allow_get = function (_policy) {
    //$.test_msg("Annotation_other_basic_loader.prototype._policy_allow_get", [_policy.get_attr("navigation_data")]);
    return _policy.get_attr("navigation_data");
};

/**
 * 設定權限的名稱
 * @type String
 */
Annotation_other_basic_loader.prototype._$policy_name = "navigation_data";

/* End of file My_annotation_loader */
/* Location: ./system/application/views/web_apps/My_annotation_loader.js */