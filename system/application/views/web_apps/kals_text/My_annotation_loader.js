/**
 * My_annotation_loader
 * 負責做My_basic_annotation_loader跟My_custom_annotation_loader的中介者
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2011/11/06 上午 00:19:07
 * @extends {Annotation_scope_loader}
 */
function My_annotation_loader() {
    
    Annotation_scope_loader_manager.call(this);
    
    return this;
}

My_annotation_loader.prototype = new Annotation_scope_loader_manager();

// ------------------------------
// 設定區
// ------------------------------

My_annotation_loader.prototype._$init_loaders = function () {
    
    this.basic = new My_basic_annotation_loader();
    this.custom = new My_custom_annotation_loader();
};


/**
 * 基本標註的關鍵字
 * @type String
 */
My_annotation_loader.prototype._$basic_key = "my_basic";

/**
 * 預訂標註的關鍵字
 * @type String
 */
My_annotation_loader.prototype._$custom_key = "my_custom";

//----------------------------


/* End of file My_annotation_loader */
/* Location: ./system/application/views/web_apps/My_annotation_loader.js */