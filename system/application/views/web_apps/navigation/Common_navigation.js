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

        this._$nav_items = [];
        
        //if (KALS_CONFIG.modules.Window_filter.enable === true) {
        //    this._$nav_items.push(new Window_filter());
        //}
        
        //if (KALS_CONFIG.modules.Window_map.enable === true) {
        //    this._$nav_items.push(new Window_map());
        //}
        
        //var _search = new Window_search();
        
        if (KALS_CONFIG.enable_search_toolbar === true) {
            var _search_recent = new Window_search();
            //var _search_recent = KALS_context.search;
            _search_recent.setup_recent();
            this._$nav_items.push(_search_recent);
        }
        
        //$.test_msg("nav_item.length", this._$nav_items.length);
        
        /*
        if (KALS_CONFIG.modules.Reading_guide.enable === true) {
            var _guide_nav = new Navigation_item("導讀");
            _guide_nav.set_callback(function () {
                //KALS_text.guide.open_whole_annotations_by_sentence();
                KALS_text.guide.open();
            });
            this._$nav_items.push(_guide_nav);
        }
        */
       
        /*
        this._$nav_items = [
            new Window_filter()
            , new Window_map()
            , _search_recent
            
            //, new Dashboard()
            
            //, _guide_nav
            //, new Reading_guide()
            //, KALS_text.guide
            //_search
            
            //, new Annotation_navigation_map()
        ];
        */
        this._init_module_nav_items();
    }
}

Common_navigation.prototype = new Navigation_list();

Common_navigation.prototype._$classname = 'common-navigation';

/**
 * 導覽類型
 * 
 * 類型包括：
 * - common: 不管什麼類型都會顯示(在以下三種類型中都會顯示)
 * - login: 已經登入的使用者就會顯示
 * - profile: 以手動登入的使用者才會顯示
 * - embed: 以內嵌登入的使用者才會顯示
 * - anonymous: 未登入的使用者才會顯示
 * - null: 不列入在目前的導覽列
 * @type String
 */
Common_navigation.prototype._$nav_type = "common";

Common_navigation.prototype._$create_ui = function () {
    
};

/* End of file Common_navigation */
/* Location: ./system/application/views/web_apps/Common_navigation.js */
