/**
 * Profile_admin_navigation
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2015/4/10 下午 09:44:04
 * @extends {Navigation_list}
 */
function Profile_admin_navigation(_common_windows) {
    
    Navigation_list.call(this);
    
    this._$nav_items = [
        new Window_profile()
        , new Window_logout()
    ];
    
    // 載入來自KALS_navigation的導覽列
    this._init_module_nav_items();

}

Profile_admin_navigation.prototype = new Navigation_list();

Profile_admin_navigation.prototype._$classname = 'profile-admin-navgation';

/**
 * 導覽類型
 * 
 * 類型包括：
 * - common: 不管什麼類型都會顯示(在以下三種類型中都會顯示)
 * - login: 只要有登入就會顯示
 * - profile: 以手動登入的使用者才會顯示
 * - embed: 以內嵌登入的使用者才會顯示
 * - anonymous: 未登入的使用者才會顯示
 * - null: 不列入在目前的導覽列
 * @type String
 */
Profile_admin_navigation.prototype._$nav_type = ["profile", "login", "common", "admin"];


/* End of file Profile_admin_navigation */
/* Location: ./system/application/views/web_apps/Profile_admin_navigation.js */
