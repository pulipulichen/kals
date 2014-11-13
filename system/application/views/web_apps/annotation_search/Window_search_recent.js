/**
 * Window_search_recent
 * 最新標註
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/16 下午 03:38:58
 */
function Window_search_recent() {
	
}

Window_search_recent.prototype = new Navigation_item_link();

Window_search_recent.prototype.name = "Window_search_recent";

Window_search_recent.prototype.open = function (_callback) {
    var _search = KALS_context.search;
    /*
    var _save_input_value = {
        search_range: _search.get_input_value("search_range"),
        keyword: _search.get_input_value("keyword"),
        order_by: _search.get_input_value("order_by")
    };

    //$.test_msg("setup_recent", _save_input_value);

    //$.test_msg("setup_recent", "keyword *");
    _search.set_input_value({
        search_range: "note",
        keyword: "*",
        order_by: "update"
    });

    _search.submit.submit(function () {
        _search.set_input_value(_save_input_value);
    });
    
    _search.open();
    */
    //_search.open_recent_annotation(_callback);
    
    var _search_option = {
        search_range: "note",
        keyword: "*",
        order_by: "update"
    };
    
    _search.search(_search_option);
    
    return this;
};

Window_search_recent.prototype.nav_heading = new KALS_language_param (
    'Recent',
    'window.search_recent.nav_heading'
);

/**
 * 導覽列相關的設定
 * @type JSON
 */
Window_search_recent.prototype.nav_config = {
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
    order: 2
};

/**
 * 檢測是否是獨立視窗
 * 
 * 搭配模組化使用
 * @returns {Boolean}
 */
Window_search_recent.prototype.is_absolute = function () {
    return false;
};

/* End of file Window_search_recent */
/* Location: ./system/application/views/web_apps/Window_search_recent.js */