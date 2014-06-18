/**
 * Navigation_item_link
 * 設置意見回饋
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
  * @version    1.0 2014/6/18 下午 03:38:58
 */
function Navigation_item_link() {
	
}

Navigation_item_link.prototype.name = "Navigation_item_link";

Navigation_item_link.prototype._feedback = null;

/**
 * 開啟視窗的事件
 * @returns {Navigation_item_link}
 */
Navigation_item_link.prototype.open = function () {
    return this;
};

/**
 * 初始化動作
 * @returns {Navigation_item_link}
 */
Navigation_item_link.prototype.init = function () {
    return this;
};

Navigation_item_link.prototype.nav_heading = new KALS_language_param (
    'Link',
    'web_apps.toolbar.navigation_list.link'
);

/**
 * 導覽列相關的設定
 * @type JSON
 */
Navigation_item_link.prototype.nav_config = {
    /**
     * 顯示資料 
     * @type Boolean
     */
    display: true,
    
    /**
     * 決定顯示導覽列的位置
     * 
     * 類型包括：
     * - common: 不管什麼類型都會顯示(在以下三種類型中都會顯示)
     * - login: 已經登入的使用者就會顯示
     * - profile: 以手動登入的使用者才會顯示
     * - embed: 以內嵌登入的使用者才會顯示
     * - anonymous: 未登入的使用者才會顯示
     * @type String
     */
    nav_type: "common",
    
    /**
     * 排序順序
     * 
     * 數字越大，越往左邊靠
     * 數字最小的是1
     * @type Number
     */
    order: 1
};

/**
 * 檢測是否是獨立視窗
 * 
 * 搭配模組化使用
 * @returns {Boolean}
 */
Navigation_item_link.prototype.is_absolute = function () {
    return false;
};

/* End of file Navigation_item_link */
/* Location: ./system/application/views/web_apps/Navigation_item_link.js */