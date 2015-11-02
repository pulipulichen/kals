/**
 * Selection_basic_factory
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/24 下午 01:58:03
 * @extends {Selection}
 * @param {Selectable_text} _text 
 * @param {JSON} _config = {
 *      "name": "my",
 *      "select_once": false
 * }
 */
function Selection_basic_factory(_text, _config) {
    
    Selection.call(this,_text);
    
    this._initialize_config(_config);
};

Selection_basic_factory.prototype = new Selection();

/**
 * 設定
 * @param {JSON} _config
 * @returns {Selection_basic_factory}
 */
Selection_basic_factory.prototype._initialize_config = function (_config) {
    
    if (typeof(_config) === "object") {
        if (typeof(_config.name) === "string") {
            this._$name = _config.name;
        }
        if (typeof(_config.select_once) === "boolean") {
            this._$select_once = _config.select_once;
        }
    }
    
    return this;
};

/**
 * 改成用constructor設定
 * @type {String}
 */
//Selection_basic_factory.prototype._$name = 'my_concept';

/* End of file Selection_basic_factory */
/* Location: ./system/application/views/web_apps/Selection_basic_factory.js */