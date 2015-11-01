/**
 * Annotation_other_loader
 * 負責做Annotation_other_basic_loader跟Annotation_other_custom_loader的中介者
 *
 * @package   KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2015, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2015/11/02 上午 00:19:07
 * @extends {Annotation_scope_loader}
 */
function Annotation_other_loader() {
    
    Annotation_scope_loader_manager.call(this);
    
    return this;
}

Annotation_other_loader.prototype = new Annotation_scope_loader_manager();

// ------------------------------
// 設定區
// ------------------------------

Annotation_other_loader.prototype._$init_loaders = function () {
    
    this.basic = new My_basic_annotation_loader();
    this.custom = new My_custom_annotation_loader();
    
    // -------------------------------
    
    if (KALS_CONFIG.anchor_navigation_type === "disable") {
        KALS_CONFIG.anchor_navigation_type = "none";
    }
    this._$load_url = this._$load_url + KALS_CONFIG.anchor_navigation_type;
};


/**
 * 基本標註的關鍵字
 * @type String
 */
Annotation_other_loader.prototype._$basic_key = "basic";

/**
 * 預訂標註的關鍵字
 * @type String
 */
Annotation_other_loader.prototype._$custom_key = "custom";

//----------------------------


/**
 * @type {Selection_navigation}
 */
Navigation_loader.prototype._selection = null;

Navigation_loader.prototype._$load_url = 'annotation_getter/navigation_';

/* End of file Annotation_other_loader */
/* Location: ./system/application/views/web_apps/Annotation_other_loader.js */