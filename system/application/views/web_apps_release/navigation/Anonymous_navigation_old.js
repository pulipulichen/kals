/**
 * Anonymous_navigation
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 09:43:57
 * @extends {Navigation_list}
 */
function Anonymous_navigation(_common_windows) {
    
    Navigation_list.call(this);
    
    this.login = new Window_login();
    this.register = new Window_register();  
    
    this._$nav_items = [
         this.login
         , this.register
         //, new Window_top()
         //'Window_login',
         //'Window_register'
    ];
    
    if (KALS_CONFIG.deny_register == true)
    {
        this._$nav_items = [
             this.login
        ];
    }
    
    if ($.isset(_common_windows))
    {
        for (var _i in _common_windows)
            this._$nav_items.push(_common_windows[_i]);
    }
}

Anonymous_navigation.prototype = new Navigation_list();

Anonymous_navigation.prototype._$classname = 'anonymous-navigation';

/**
 * @type {Window_login}
 */
Anonymous_navigation.prototype.login = null;

/**
 * @type {Window_register}
 */
Anonymous_navigation.prototype.register = null;

/* End of file Anonymous_navigation */
/* Location: ./system/application/views/web_apps/Anonymous_navigation.js */