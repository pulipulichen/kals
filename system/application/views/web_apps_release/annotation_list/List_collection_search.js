/**
 * List_collection_search-由此送出做查尋並接收result畫出無限捲軸
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/27 下午 09:03:09
 * @extends {List_collection}
 */
function List_collection_search() {
    
    List_collection.call(this);
    
	
	//.list-collection.search .list-menu {
	//  text-align: right;
	//}
}

List_collection_search.prototype = new List_collection();

List_collection_search.prototype._$name = 'search';

List_collection_search.prototype._$target_my = false;

List_collection_search.prototype._$target_like = false;

List_collection_search.prototype._$need_login = false;

//接收資料的來源
List_collection_search.prototype._$load_url = 'annotation_getter/search_annotation'; 

List_collection_search.prototype._$limit = null;




/**
 * 搜尋範圍
 * @type {String}
 */
List_collection_search.prototype._searchrange;

/**
 * 關鍵字
 * @type {String}
 */
List_collection_search.prototype._keyword;

/**
 * 排序
 * @type {type}
 */
//List_collection_search.prototype.order_by;
//因為List_collection中已經有$order_by，直接拿來使用


/**
 * 設定要搜尋的物件
 * 
 * @type {JSON}
 */
List_collection_search.prototype.get_search_data = function(){
	var _search_data = {};
	
	_search_data.searchrange = this._searchrange;
	_search_data.keyword = this._keyword;
	_search_data.order_by = this._$order_by;
	

	return _search_data;
};

/**
 * 設定搜尋範圍
 * @param {string} _searchrange
 */
List_collection_search.prototype.set_searchrange = function (_searchrange) {
	this._searchrange = _searchrange;
};

/**
 * 設定關鍵字
 * @param {string} _keyword
 */
List_collection_search.prototype.set_keyword = function (_keyword) {
	this._keyword = _keyword;
};

/**
 * 設定排序
 * @param {string} _order_by
 */
List_collection_search.prototype.set_order_by = function (_order_by) {
	this._$order_by = _order_by;
};

 // 取得result數量
 var _result_number = List_collection.prototype.count_list_item; 
$.test_msg('_result_number', _result_number);

// 開始建立List_item-topic & respond
List_collection_search.prototype.create_list_item = function(_param) {
    if (this._$target_topic === true) {
        return new List_item_search_topic(_param, this._topic_param);
    }
    else {
        return new List_item_search_respond(_param, this._topic_param);
    }
};

List_collection_search.prototype.get_search_data = function () {
	
    var _search_data = {};
    
    //如果有指定target id，則就不需要其他參考資料
    if ($.isset(this._$topic_id)) {
        _search_data.topic_id = this._$topic_id;
        
        if ($.isset(this._$limit)) {
			_search_data.limit = this._$limit;
		}
            
        if ($.isset(this._$target_topic)) {
			_search_data.target_topic = this._$target_topic;
		}
        if ($.isset(this._$order_by) && this._$order_by != 'score') {
			_search_data.order_by = this._$order_by;
		}
            
        if ($.isset(this._offset)) {
			_search_data.offset = this._offset;
		}
            
        return _search_data;
    }
       
    //需要登入身分的兩個參數
    if (($.isset(this._$target_like) || $.isset(this._$target_my)) &&
	KALS_context.auth.is_login() === false) {
		return null;
	}
    
    if ($.isset(this._$target_like)) {
		_search_data.target_like = this._$target_like;
	}
    if ($.isset(this._$target_my)) {
		_search_data.target_my = this._$target_my;
	}
    
    if ($.isset(this._$limit)) {
		_search_data.limit = this._$limit;
	}
    
    if ($.isset(this._$target_topic)) {
		_search_data.target_topic = this._$target_topic;
	}
    if ($.isset(this._$order_by) && this._$order_by != 'score') {
		_search_data.order_by = this._$order_by;
	}
        
    if ($.isset(this._offset)) {
		_search_data.offset = this._offset;
	}
    
    //$.test_msg('Respond_list_collection.get_search_data()', _data);
    _search_data.searchrange = this._searchrange;
	_search_data.keyword = this._keyword;
	_search_data.order_by = this._$order_by;
	
    _search_data.show_total_count = true;
    

	return _search_data;
    return _data;
};

/* End of file List_collection_search */
/* Location: ./system/application/views/web_apps/List_collection_search.js */