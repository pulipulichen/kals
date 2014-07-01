/**
 * KALS_event_hub
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2014/7/1 下午 02:28:30
 */
function KALS_event_hub(){
}

/**
 * 物件本身
 * @type {
 *     "object_name:1": {
 *          "object": _object,
 *          "dispatcher": _dispatcher
 *     }
 * }
 */
KALS_event_hub.prototype._object_dispatchers = {};


KALS_event_hub.prototype.on = function (_object, _event_name, _callback) {
    var _dispatcher = this.get_dispatcher(_object_name);
    
    _dispatcher.add_listener(_event_name, _callback, false);
    
    return this;
};

/**
 * 取得物件的名稱
 * @param {Object} _object
 * @returns {String}
 */
KALS_event_hub.prototype._filter_object_name = function (_object) {
    if (_object === undefined 
            || _object === null 
            || $.is_object(_object) === false) {
        KALS_util.throw_exception("Object is not defined");
        return this;
    }
    
    var _object_name = $.get_class(_object);
    return _object_name;
};

KALS_event_hub.prototype._add_object = function (_object) {
    
    var _object_name = this._filter_object_name(_object);
    var _existed_object;
    for (var _object_index = 0; true; _object_index++) {
        var _index_name = _object_name + ":" + _object_index;
        if (typeof(this._object_dispatchers[_index_name]) === "undefined"
                || typeof(this._object_dispatchers[_index_name].object) === "undefined") {
            
            // 加入新的object
            
            
            break;
        }
        else {
            _existed_object = this._object_dispatchers[_index_name].object;
            if (_existed_object === _object) {
                break;
            }
        }
    }
    return _existed_object;
};

KALS_event_hub.prototype._create_dispatcher_config = function (_object) {
    return {
        new Injection_event_dispatcher(_object
    };
};

/**
 * 取得物件的配給器
 * @param {Object} _object
 * @returns {Multi_event_dispatcher}
 */
KALS_event_hub.prototype._get_dispatcher = function (_object) {
    
    var _object_name = this._filter_object_name(_object);
    
    
    
    var _dispatcher;
    if (typeof(this._dispatchers[_object_name]) === "undefined") {
        _dispatcher = new Multi_event_dispatcher();
        this._dispatchers[_object_name] = _dispatcher;
    }
    else {
        _dispatcher = this._dispatchers[_object_name];
    }
    
    return _dispatcher;
};

/* End of file KALS_event_hub */
/* Location: ./system/application/views/web_apps/core/KALS_event_hub.js */