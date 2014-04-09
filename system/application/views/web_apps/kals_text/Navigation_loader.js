/**
 * Navigation_loader
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
function Navigation_loader() {
    
    Annotation_scope_loader.call(this);
    
	if (KALS_CONFIG.anchor_navigation_type == "disable") {
		KALS_CONFIG.anchor_navigation_type = "none";
	}
	this._$load_url = this._$load_url + KALS_CONFIG.anchor_navigation_type;
}

Navigation_loader.prototype = new Annotation_scope_loader();

/**
 * @type {Selection_navigation}
 */
Navigation_loader.prototype._selection = null;

Navigation_loader.prototype._$load_url = 'annotation_getter/navigation_';

/**
 * 讀取標註資料並且設置
 * @param {Object} _data 預設的樣子如下：
 * _data = [    //Scope_collection_param的JSON型態
 *         [1, 2],    //Scope_param的JSON型態
 *         [6, 9]
 * ]
 * @param {function} _callback
 */
Navigation_loader.prototype.load_annotation = function (_data, _callback) {
    
    if ($.is_function(_data) && $.is_null(_callback)) {
        _callback = _data;
        _data = null;
    }
    
    //$.test_msg('Navigation_loader.load_annotation() data', _data);
    
    var _is_initialize = !(this.is_initialized());
    
    for (var _i in _data) {
        var _type_id = _i;
        var _scope_coll_json = _data[_i];
        
        if (_scope_coll_json === null ||
		_scope_coll_json.length === 0) {
			continue;
		}
        
        //$.test_msg('Navigation_loader.load_annotation()', [$.is_array(_scope_coll_json[0]), _i]);
        
        var _scope_coll = new Scope_collection_param(_scope_coll_json);
        
        //$.test_msg('My_annotation_loader.load_annotation() _scope_coll', [_scope_coll.length(), _is_initialize]); 
        
        this._selection.set_scope_coll(_type_id, _scope_coll, _is_initialize);
    }
    
    $.trigger_callback(_callback);
    
    return this;
};

Navigation_loader.prototype.clear = function () {
    this._selection.clear();
    
};

Navigation_loader.prototype.initialize = function () {
    
    //$.test_msg('Navigation_loader.initialize()', typeof(KALS_text));
    
    if (typeof(KALS_text) == 'object') {
        this._selection = KALS_text.selection.navigation;
        
        var _this = this;
		
		var _setup = setTimeout(function () {
            
			var _policy = KALS_context.policy;
            //$.test_msg('Navigation_loader.initialize()', [_policy.allow_show_navigation(), _policy.get_navigation_data()]);
            if (_policy.allow_show_navigation() === false) {
                _this.reset();
                return;
            }
            else {
                var _navigation_data = _policy.get_navigation_data();
                if ($.isset(_navigation_data)) {       
				
					//$.test_msg('Navigation_loader.initialize()', "start load");         
                    //var _navigation_data = _data.Navigation_loader;
                    _this.setup_loader( _navigation_data , function () {
                        //KALS_context.init_profile.complete('navigation_annotation');
                        //_this.stop_loader();
                    });
                }
                else {
					//$.test_msg('Navigation_loader.initialize()', "nothing");
					_this.setup_loader( );
                }    
            }
        }, 0);
		
		KALS_context.add_listener(function () {
			KALS_context.policy.add_attr_listener('show_navigation', function () {
            	_setup();
	        }, true);
			_setup();
		});
    }
    
    KALS_context.init_profile.complete('navigation_annotation');
    return this;
};

Navigation_loader.prototype._$exception_handle = function (_data) {
    
    if (this.is_initialized() === false) {
        $.test_msg('Navigation_loader._$exception_handle()');
        
        var _this = this;
        setTimeout(function () {
            _this.setup_loader(function () {
                KALS_context.init_profile.complete('navigation_annotation');
            });    
        }, 5000);
        
    }
    
};

/* End of file Navigation_loader */
/* Location: ./system/application/views/web_apps/Navigation_loader.js */