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
    
    this.basic = new Annotation_other_basic_loader();
    this.custom = new Annotation_other_custom_loader();
    
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
Annotation_other_loader.prototype._$basic_key = "other_basic";

/**
 * 預訂標註的關鍵字
 * @type String
 */
Annotation_other_loader.prototype._$custom_key = "other_custom";


/**
 * 完成後的動作
 * @type {Function}
 */
Annotation_other_loader.prototype._$initialize_callback = function () {
    KALS_context.init_profile.complete('navigation_annotation');
    return this;
}; 

Annotation_other_loader.prototype.initialize = function () {
    
    //$.test_msg("Annotation_scope_loader_manager.prototype.initialize", [this._$basic_key, this._$custom_key]);
    if (KALS_CONFIG.anchor_navigation_type === "original") {
        var _this = this;
        this.basic.initialize(function () {
            _this.custom.initialize(function () {
                $.trigger_callback(_this._$initialize_callback);
            });
        });
    }
    return this;
};

//----------------------------

/* End of file Annotation_other_loader */
/* Location: ./system/application/views/web_apps/Annotation_other_loader.js */