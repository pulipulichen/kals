/**
 * Search_topic_list
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2014/11/14 下午 08:51:16
 * @extends {Event_dispatcher}
 */
function Search_topic_list() {
    
    Topic_list.call(this);
    this._list_colls = [];
}

Search_topic_list.prototype = new Topic_list();

/**
 * 辨別事件的名稱
 * @type String
 */
Search_topic_list.prototype._$event_name = 'search_topic_list';

/**
 * Create UI
 * @memberOf {Topic_list}
 * @type {jQuery} UI
 */
Search_topic_list.prototype._$create_ui = function () {
    var _ui = Topic_list.prototype._$create_ui.call(this);
    //_ui.show();
    this._loading_component.appendTo(_ui);
    return _ui;
};

/**
 * 設定內在的List_collection
 * @memberOf {Topic_list}
 * @author Pulipuli Chen 201411114
 * @param {jQuery} _ui
 * @returns {jQuery}
 */
Search_topic_list.prototype._setup_list_collection = function (_ui) {
    var _list = new List_collection_search();
    _list.get_ui().appendTo(_ui);
    this._list_colls.push(_list);
    this.child('list_collection_search', _list);
    
    return _ui;
};

/**
 * @type List_collection_search
 */
Search_topic_list.prototype.list_collection_search = null;

/**
 * 搜尋的選項
 * @type JSON
 */
Search_topic_list.prototype._search_option = null;

/**
 * 設定搜尋的選項
 * @param {JSON} _search_option
 * @returns {Search_topic_list.prototype}
 */
Search_topic_list.prototype.set_search_option = function (_search_option) {
    this._search_option = _search_option;
    this.list_collection_search.set_search_option(_search_option);
    return this;
};

/**
 * 回覆
 * @returns {Search_topic_list}
 */
Search_topic_list.prototype.restore_last_search_scope = function () {
    this.list_collection_search.restore_last_search_scope();
    return this;
};

/**
 * 讀取完成的訊息
 * @returns {KALS_langauge_param}
 * @author Pulipuli Chen 20141115
 */
Search_topic_list.prototype._lang_complete_component = new KALS_language_param(
        'THERE IS ALL.',
        'window_search.list.load_complete'
    );

/* End of file Search_topic_list */
/* Location: ./system/application/views/web_apps/Search_topic_list.js */