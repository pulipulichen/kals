/**
 * Annotation_subscope_loader
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2015, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2015/11/2 下午 06:40:07
 * @extends {Annotation_scope_loader}
 */
function Annotation_subscope_loader() {
    
    Annotation_scope_loader.call(this);
    
}

Annotation_subscope_loader.prototype = new Annotation_scope_loader();

// ---------------------------
// 請覆寫以下資料
// ---------------------------

/**
 * @author Pudding 20151102
 * 要設定的資料之一
 */
//Annotation_subscope_loader.prototype._$load_url = 'annotation_getter/my';

/**
 * 是否是基本標註？這會影響到如何繪製選取範圍
 * @type Boolean
 */
Annotation_subscope_loader.prototype._$is_basic = true;

/**
 * 範圍名稱
 * @type String
 */
//Annotation_subscope_loader.prototype._$scope_name = "other_basic";

// -----------------------------
// 函式庫區，沒事不要變更
// -----------------------------

/**
 * @type {Selection_my_custom_manager}
 */
Annotation_subscope_loader.prototype._selection = null;

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
 * @param {type} _data
 * @param {type} _callback
 * @returns {Annotation_subscope_loader.prototype}
 */
Annotation_subscope_loader.prototype.load_annotation = function (_data, _callback) {
    
    if ($.is_function(_data) && $.is_null(_callback)) {
        _callback = _data;
        _data = null;
    }
    
    var _is_initialize = !(this.is_initialized());
    
    //$.test_msg("load_annotation", [this._$is_basic,this._$scope_name]);
    
    if (this._$is_basic === true) {
        this._load_annotation_basic(_data, _is_initialize);
    }
    else {
        this._load_annotation_custom(_data, _is_initialize);
    }
    
    $.trigger_callback(_callback);
    
    return this;
};

Annotation_subscope_loader.prototype._load_annotation_basic = function (_data, _is_initialize) {
    
    var _basic_scope = _data;
    //$.test_msg("_load_annotation_basic", _basic_scope);
    for (var _i in _basic_scope) {
        var _type_id = _i;
        var _scope_coll_json = _basic_scope[_i];
        
        //$.test_msg("_load_annotation_basic", [this._$scope_name, _type_id]);
        
        if (_scope_coll_json === null 
                || _scope_coll_json.length === 0) {
            continue;
        }
        
        //$.test_msg('My_annotation_loader.load_annotation()', $.is_array(_scope_coll_json[0]));
        
        var _scope_coll = new Scope_collection_param(_scope_coll_json);
        
        //$.test_msg('My_annotation_loader.load_annotation() _scope_coll', [_scope_coll.length(), _is_initialize]); 
        
        this._selection.set_scope_coll(_type_id, _scope_coll, _is_initialize);
    }
    
    return this;
};


Annotation_subscope_loader.prototype._load_annotation_custom = function (_data, _is_initialize) {
    
    var _custom_scope = _data;
    
    //$.test_msg('Annotation_subscope_loader.load_annotation() data', _data);
    
    for (var _i in _custom_scope) {
        var _type_id = _i;
        var _scope_coll_json = _custom_scope[_i];
        
        //$.test_msg('Annotation_subscope_loader.load_annotation() for', [_type_id, typeof(_scope_coll_json), _scope_coll_json.length]);
        
        if (_scope_coll_json === null 
                || _scope_coll_json.length === 0) {
            continue;
        }
        
        var _scope_coll = new Scope_collection_param(_scope_coll_json);
        this._selection.set_scope_coll(_type_id, _scope_coll, _is_initialize);
        
        
        //$.test_msg('Annotation_subscope_loader.load_annotation() for', [_type_id, typeof(_scope_coll_json), _scope_coll_json.length]);
        
    }
    
    return this;
};

Annotation_subscope_loader.prototype.clear = function () {
    this._selection.clear();
    return this;
};

/**
 * 
 * @param {Context_policy} _policy
 * @returns {Boolean}
 */
Annotation_subscope_loader.prototype._policy_allow_get = function (_policy) {
    
    var _my = _policy.get_attr(this._$policy_name);
    var _is_login = KALS_context.auth.is_login();
    
    return ($.isset(_my) && _is_login);
};

/**
 * 設定權限的名稱
 * @type String
 */
Annotation_subscope_loader.prototype._$policy_name = null;

Annotation_subscope_loader.prototype.initialize = function (_callback) {
    
    //$.test_msg("Annotation_subscope_loader.prototype.initialize", [this._$scope_name, this._$policy_name]);
    if (typeof(KALS_text) === 'object') {
        
        if (typeof(KALS_text.selection[this._$scope_name]) === "object") {
            this._selection = KALS_text.selection[this._$scope_name];
        }
        else {
            throw "找不到selection, 名稱: " + this._$scope_name;
        }
        
        var _this = this;
        
        //$.test_msg("Annotation_subscope_loader.prototype.initialize 1", [_this._$scope_name, _this._$policy_name]);
        
        KALS_context.policy.add_attr_listener(_this._$policy_name, function(_policy) {
            var _scope_name = _policy.get_attr(_this._$scope_name);
            //$.test_msg("Annotation_subscope_loader.prototype.initialize 2", [_this._$scope_name, _this._$policy_name]);
            if (_this._policy_allow_get(_policy)) {
                if (_this.is_loaded()) {
                    return;
                }
                _this.setup_loader(_scope_name, function () {
                    _this.stop_loader();
                });
            }
            else {
                _this.reset();
            }
        });
    }
    
    $.trigger_callback(_callback);
    
    return this;
};

Annotation_subscope_loader.prototype._$exception_handle = function (_data) {
    if (this.is_initialized() === false) {
        var _this = this;
        setTimeout(function () {
            _this.setup_loader(function () {
                KALS_context.init_profile.complete(_this._$scope_name + '_annotation');
            });    
        }, 5000);
    }
    return this;
};

/* End of file My_annotation_loader */
/* Location: ./system/application/views/web_apps/My_annotation_loader.js */