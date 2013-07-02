/**
 * Context_search
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/12 上午 10:45:51
 * @extends {Attribute_event_dispatcher}
 */
function Context_search (){
    
    Attribute_event_dispatcher.call(this);
    
}

Context_search.prototype = new Attribute_event_dispatcher(); 

Context_search.prototype.set_field = function(_value) {
    return this.set_attr('field', _value);
};

Context_search.prototype.set_keyword = function(_value) {
    return this.set_attr('keyword', _value);
};

Context_search.prototype.set_page = function(_value) {
    return this.set_attr('page', _value);
};

Context_search.prototype.set_page_limit = function(_value) {
    return this.set_attr('page_limit', _value);
};

/**
 * 送出查詢時的參數
 */
Context_search.prototype.get_search_option = function () {
    return {
        field: this.get_attr('field'),
        keyword: this.get_attr('keyword'),
        page: this.get_attr('page', 0),
        page_limit: this.get_attr('page_litmit', 10)
    };
};

/**
 * 取得搜尋結果的路徑
 */
Context_search.prototype.ajax_get_search_result_path = function() {
    
    // TODO Context_search.ajax_get_search_result_path() 
    
    return this;
};

/**
 * 取得搜尋結果之後……
 */
Context_search.prototype.ajax_get_search_result_callback = function() {
    
    // TODO Context_search.ajax_get_search_result_callback()
    
    return this;
};

/**
 * 將搜尋範圍中的標註標示出來
 */
Context_search.prototype.locate_annotation = function() {
    
    // TODO Context_search.locate_annotation()
    
    return this;
};

/* End of file Context_search */
/* Location: ./system/application/views/web_apps/Context_search.js */