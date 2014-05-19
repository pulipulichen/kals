/**
 * Mobile_navigation
 *
 * 結合樣板的控制器
 * KALS Framework的Controller示範
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2014/5/19 下午 03:36:17
 * @extends {Navigation_list}
 */
function Mobile_navigation(_common_windows) {
    
    Navigation_list.call(this);
    
    //this.login = new Window_login();
    //this.register = new Window_register();  
    
    this._$nav_items = [
         //this.login
         //, this.register
         //'Window_login',
         //'Window_register'
    ];
    
    /*
    if (KALS_CONFIG.deny_register === true) {
        this._$nav_items = [
             this.login
        ];
    }
    */
    // 載入來自KALS_navigation的導覽列
    this._init_module_nav_items();
    
    // 載入Common_navigation
    //if ($.isset(_common_windows)) {
    //   for (var _i in _common_windows) {
    //        this._$nav_items.push(_common_windows[_i]);
    //    }
    //}
}

Mobile_navigation.prototype = new Navigation_list();

Mobile_navigation.prototype._$classname = 'mobile-navigation';

/**
 * @type {Window_login}
 */
Mobile_navigation.prototype.login = null;

/**
 * @type {Window_register}
 */
Mobile_navigation.prototype.register = null;

/**
 * 導覽類型
 * 
 * 類型包括：
 * - common: 不管什麼類型都會顯示(在以下三種類型中都會顯示)
 * - profile: 以手動登入的使用者才會顯示
 * - embed: 以內嵌登入的使用者才會顯示
 * - anonymous: 未登入的使用者才會顯示
 * - null: 不列入在目前的導覽列
 * @type String
 */
Mobile_navigation.prototype._$nav_type = ["mobile"];

/* End of file Mobile_navigation */
/* Location: ./system/application/views/web_apps/Mobile_navigation.js */