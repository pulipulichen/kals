/**
 * Recommend_param
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/12 上午 11:08:57
 * @extends {KALS_user_interface}
 */
function Recommend_param(_json) {
    
    if ($.isset(_json)) {
        this.import_json(_json);
    }
}

/**
 * 提示
 * @type {String[]} 直接存入的是完整的訊息
 * 其實也只有三種
 * 1    speech
 * 2    length
 * 3    location
 */
Recommend_param.prototype.tips = [];

/**
 * @type {Annotation_param}
 */
Recommend_param.prototype.recommend_by = null;

Recommend_param.prototype.import_json = function (_json) {
    if ($.isset(_json)) {
        if (typeof(_json.tips) != 'undefined'
            && $.is_array(_json.tips)) {
            this.tips = [];
            for (var _i in _json.tips) {
                this.tips.push(_json.tips[_i])
            }
        }
        
        if (typeof(_json.recommend_by) == 'object'
            && $.isset(_json.recommend_by)) {
            var _param = new Annotation_param(_json.recommend_by);
            this.recommend_by = _param;
        }
    }
    return this;
};

/* End of file Recommend_param */
/* Location: ./system/application/views/web_apps/Recommend_param.js */