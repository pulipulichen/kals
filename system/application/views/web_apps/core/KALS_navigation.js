/**
 * KALS_navigation
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2014/4/28 下午 02:28:30
 * @extends {Multi_event_dispatcher}
 */
function KALS_navigation(){
   
   Multi_event_dispatcher.call(this);
   
}

/**
 * 繼承自Multi_event_dispatcher
 */
KALS_navigation.prototype = new Multi_event_dispatcher(); 

/**
 * 預先載入模組
 */
KALS_navigation.prototype.init = function(_loaded_modules) {
    
    for (var _item_name in _loaded_modules) {
        var _item = _loaded_modules[_item_name];
        //var _item = this._load(_item_name);
        //$.test_msg("KALS_navigaition. prepare register_item", [_item_name, typeof(_item), _item.nav_config.display]);
        this.register_item(_item);
    }
    
    return this;
};

/**
 * 載入模組
 * @param {String} _name 模組的名稱，注意要用字串
 * @param {Object} _param 搭配模組載入的參數
 * @param {Function} _callback 回呼函式
 * @returns {Object|Boolean} 回傳載入的模組的物件。如果是False，則表示載入失敗。
 */
//KALS_navigation.prototype._load = KALS_module_manager.prototype.load;

/**
 * list的原始資料
 * @type JSON
 */
KALS_navigation.prototype._list = {};

/**
 * 已經排序的list
 * @type JSON
 */
KALS_navigation.prototype._sorted_list = {};

/**
 * 已經註冊的名字
 * @type Array
 */
KALS_navigation.prototype._registered_name = [];

/**
 * 註冊到導覽列
 * @param {KALS_controller_window} _item
 */
KALS_navigation.prototype.register_item = function (_item) {
    
    if (_item === undefined) {
        return this;
    }
    
    if (typeof(_item.nav_config) === "object") {
        var _display = _item.nav_config.display;
        
        if (_display === false) {
            return this;
        }
        
        var _nav_type = _item.nav_config.nav_type;
        var _order = _item.nav_config.order;
        
        // 避免重複註冊
        var _name = _item.name;
        if ($.inArray(_name, this._registered_name) !== -1) {
            // 已經註冊過了
            return this;
        }
        this._registered_name.push(_name);
        //$.test_msg("KALS_navigation.register_item", [_name, _nav_type, _order]);
        
        this._push_list(_item, _nav_type, _order);
    }
    
    return this;
};

/**
 * 取得指定nav_type的list
 * @param {String} _nav_type
 * @returns {JSON}
 */
KALS_navigation.prototype._push_list = function (_item, _nav_type, _order) {
    if (typeof(this._list[_nav_type]) === "undefined") {
        this._list[_nav_type] = {};
        //$.test_msg("缺乏nav_type", _nav_type);
    }
    
    if (typeof(this._list[_nav_type][_order]) === "undefined") {
        this._list[_nav_type][_order] = [];
        //$.test_msg("缺乏order", [_nav_type, _order]);
    }
    
    this._list[_nav_type][_order].push(_item);
    
    return this;
};

/**
 * 取得列表
 * 
 * 依照order排序來取出，由大到小(顯示時是從左到右)
 * @param {String|Array<String>} _nav_type
 * @returns {Array}
 */
KALS_navigation.prototype.get_list = function (_nav_type) {
    
    var _cache_key = _nav_type;
    if ($.is_array(_nav_type)) {
        _cache_key = _nav_type.join(",");
    }
    
    $.test_msg("nav get_list", _cache_key);
    
    // 取得快取
    if (typeof(this._sorted_list[_cache_key]) === "object") {
        return this._sorted_list[_cache_key];
    }
    
    var _list = [], _order, _item, _item_list, _disorder_list = {};
    
    //$.test_msg("get_list nav_type", [_nav_type, typeof(this._list[_nav_type])]);
    
    if ($.is_string(_nav_type)) {
        _nav_type = [_nav_type];
    }
    
    for (var _index in _nav_type) {
        var _nav_type_name = _nav_type[_index];
        
        if (typeof(this._list[_nav_type_name]) === "object") {
            var _disorder_list_part = this._list[_nav_type_name];
            for (var _order in _disorder_list_part) {
                var _order_array = _disorder_list_part[_order];
                //_disorder_list.push(_part_item);
                $.test_msg("nav " + _order, [$.is_array(_order_array), typeof(_disorder_list[_order])]);
                if (typeof(_disorder_list[_order]) === "undefined") {
                    _disorder_list[_order] = _order_array;
                }
                else {
                    for (var _part_index in _order_array) {
                        var _part_item = _order_array[_part_index];
                        _disorder_list[_order].push(_part_item);
                        
                        $.test_msg("nav " + _part_index, [_order, _disorder_list[_order].length]);
                    }
                }
            }
        }
    }
    
    //if (_disorder_list.length > 0) {
        
        //$.test_msg("get_list get!");
        
        //_disorder_list = this._list[_nav_type];
        //$.test_msg("_disorder_list", _disorder_list);
        var _order_key = [];
        for (_order in _disorder_list) {
            //$.test_msg("order", [_order, _nav_type]);
            _order_key.push(_order);
        }
        
        // 把order的順序由大到小顯示
        _order_key.sort(function(a,b){return b-a});
        
        for (var _i in _order_key) {
            _order = _order_key[_i];
            _item_list = _disorder_list[_order];
            
            for (var _j in _item_list) {
                _item = _item_list[_j];
                
                _list.push(_item);
            }
        }
    //}
    
    // 儲存快取
    if (_list.length > 0) {
        this._sorted_list[_cache_key] = _list;
    }
    
    return _list;
};

/* End of file KALS_navigation */
/* Location: ./system/application/views/web_apps/core/KALS_navigation.js */