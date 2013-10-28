/**
 * My_custom_annotation_loader
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/24 下午 06:40:07
 * @extends {Annotation_scope_loader}
 */
function My_custom_annotation_loader() {
    
    Annotation_scope_loader.call(this);
    
}

My_custom_annotation_loader.prototype = new Annotation_scope_loader();

/**
 * @type {Selection_my_custom_manager}
 */
My_custom_annotation_loader.prototype._selection = null;

My_custom_annotation_loader.prototype._$load_url = 'annotation_getter/my_custom';

/**
 * 讀取標註資料並且設置
 * @param {Object} _data 預設的樣子如下：
 * _data = {
 *     1:    //類型代號，表示importance 
 *     [    //Scope_collection_param的JSON型態
 *         [1, 2],    //Scope_param的JSON型態
 *         [6, 9]
 *     ],
 *     2: [
 *     ]
 * }
 * @param {function} _callback
 */
My_custom_annotation_loader.prototype.load_annotation = function (_data, _callback) {
    
    if ($.is_function(_data) && $.is_null(_callback)) {
        _callback = _data;
        _data = null;
    }
    
    var _is_initialize = !(this.is_initialized());
    
    var _custom_scope = _data;
    
    //$.test_msg('My_custom_annotation_loader.load_annotation() data', _data);
    
    for (var _i in _custom_scope) {
        var _type_id = _i;
        var _scope_coll_json = _custom_scope[_i];
        
        //$.test_msg('My_custom_annotation_loader.load_annotation() for', [_type_id, typeof(_scope_coll_json), _scope_coll_json.length]);
        
        if (_scope_coll_json === null ||
		_scope_coll_json.length === 0) {
			continue;
		}
        
        var _scope_coll = new Scope_collection_param(_scope_coll_json);
        this._selection.set_scope_coll(_type_id, _scope_coll, _is_initialize);
        
        
        //$.test_msg('My_custom_annotation_loader.load_annotation() for', [_type_id, typeof(_scope_coll_json), _scope_coll_json.length]);
        
    }
    
    $.trigger_callback(_callback);
    
    return this;
};

My_custom_annotation_loader.prototype.clear = function () {
    this._selection.clear();
};

My_custom_annotation_loader.prototype.initialize = function () {
    
    if (typeof(KALS_text) == 'object') {
        this._selection = KALS_text.selection.my_custom;
        
        var _this = this;
        
        KALS_context.policy.add_attr_listener('my_custom', function(_policy) {
            
            var _my = _policy.get_my_custom();
            var _is_login = KALS_context.auth.is_login();
            
            //$.test_msg('my_custom initialize', [$.isset(_my), _is_login]);
            
            if ($.isset(_my) && _is_login) {
                if (_this.is_loaded()) {
					return;
				}
                _this.setup_loader(_my, function () {
                    _this.stop_loader();
                });
            }
            else {
                _this.reset();
            }
        });
    }
};

My_custom_annotation_loader.prototype._$exception_handle = function (_data) {
    if (this.is_initialized() === false) {
        var _this = this;
        setTimeout(function () {
            _this.setup_loader(function () {
                KALS_context.init_profile.complete('my_custom_annotation');
            });    
        }, 5000);
    }
};

/* End of file My_annotation_loader */
/* Location: ./system/application/views/web_apps/My_annotation_loader.js */