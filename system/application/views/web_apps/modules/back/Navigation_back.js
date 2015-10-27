/**
 * Navigation_back
 * 建立回到上一層的按鈕
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2015, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2015/10/28
 */
function Navigation_back() {
	
}

Navigation_back.prototype = new Navigation_item_link();

Navigation_back.prototype.name = "Navigation_back";

Navigation_back.prototype.open = function () {
    var _back_url = KALS_CONFIG.modules.Navigation_back.back_url;
    
    if ($.is_function(_back_url)) {
        _back_url = _back_url();
    }

    window.location.href = _back_url;
};

Navigation_back.prototype.nav_heading = new KALS_language_param (
    '<i class="level up icon"></i>',
    'toolbar.navigation_list.back'
);

/**
 * 導覽列相關的設定
 * @type JSON
 */
Navigation_back.prototype.nav_config = {
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
Navigation_back.prototype.is_absolute = function () {
    return false;
};

/* End of file Navigation_back */
/* Location: ./system/application/views/web_apps/Navigation_back.js */