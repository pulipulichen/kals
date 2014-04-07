/**
 * Search_result_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/9/16 下午 09:51:08
 * @extends {KALS_user_interface}
 */
function Search_result_component() {
    
    KALS_user_interface.call(this);
    
}

Search_result_component.prototype = new KALS_user_interface();
    
/**
 * Create UI
 * @memberOf {Search_result_component}
 * @type {jQuery} UI
 */
Search_result_component.prototype._$create_ui = function () {
    var _ui = $('<span class="search-result"></span>');
    
    KALS_context.lang.add_listener(_ui, new KALS_language_param('Search result: ',
        'toolbar.search.search_result'));
    
    return _ui;
};

/* End of file Search_result_component */
/* Location: ./system/application/views/web_apps/Search_result_component.js */