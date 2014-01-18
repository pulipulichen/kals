/**
 * Common_navigation
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/16 下午 08:16:44
 * @extends {Navigation_list}
 */
function Common_navigation() {
    
    Navigation_list.call(this);
    
    // @20130603 Pudding Chen
    // Isolation Mode
    if (KALS_context.policy.allow_show_navigation()) {

        var _search = new Window_search();
        var _search_recent = new Window_search();
        _search_recent.setup_recent();
        
        this._$nav_items = [
            new Window_filter()
            , new Window_map()
            , _search_recent
            , new Dashboard()
            //, KALS_text.guide
            //_search
        ];
    }
}

Common_navigation.prototype = new Navigation_list();

Common_navigation.prototype._$classname = 'common-navigation';

Common_navigation.prototype._$create_ui = function () {
    
};

/* End of file Common_navigation */
/* Location: ./system/application/views/web_apps/Common_navigation.js */
