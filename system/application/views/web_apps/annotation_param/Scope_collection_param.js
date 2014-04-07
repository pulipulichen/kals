/**
 * Scope_collection_param
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/19 下午 02:06:18
 * @param {Scope_collection_param|Scope_param[]} _coll
 * @param {Object} _to
 */
function Scope_collection_param(_scope_coll, _to) {
    
    this.scopes = [];
    
    if ($.isset(_scope_coll) && $.is_null(_to)) {
        this.import_coll(_scope_coll);
    }
    else if ($.isset(_scope_coll) && $.isset(_to)) {
        var _from = _scope_coll;
        var _scope = new Scope_param(_from, _to);
        this.import_coll(_scope);
    }
}

/**
 * 標註
 * @type {Scopes_param[]}
 */
Scope_collection_param.prototype.scopes = [];

/**
 * 新增範圍
 * @param {Scope_param|number} _scope
 * @param {null|number} _to
 */
Scope_collection_param.prototype.add = function (_scope, _to) {
    
    if ($.is_array(_scope)) {
        var _scopes = _scope;
        for (var _i in _scopes) {
            _scope = _scopes[_i];
            this.add(_scope);
        }
        return this;
    }
    
    if ($.is_number(_scope) && $.is_number(_to)) {
        var _from = _scope;
        _scope = new Scope_param(_from, _to);
    }
    
    this.scopes.push(_scope);
    this._resorted = false;
    return this;
};

/**
 * 清空範圍
 */
Scope_collection_param.prototype.empty = function () {
    this.scopes = [];
    this._resorted = true;
    return this;
};

/**
 * 匯入
 * @param {Scope_collection_param|Scope_param[]|Array} _scope_coll
 * Array型態，也就是JSON型態，組成如下：
 * _scope_coll = [
 *     [0, 1],    //這是Scope_param的JSON型態
 *     [6, 18] 
 * ]
 */
Scope_collection_param.prototype.import_coll = function (_scope_coll) {
    
    //$.test_msg('Scope_collection_para.import_coll()', $.is_array(_scope_coll));
    
    if ($.is_class(_scope_coll, 'Scope_collection_param')) {
        this.scopes = _scope_coll.scopes;
    }
    else if ($.is_class(_scope_coll, 'Scope_param')) {
        this.empty();
        this.add(_scope_coll);
    }
    else if ($.is_array(_scope_coll)) {
        var _scope_coll_json = _scope_coll;
        
        //$.test_msg('Scope_collection_para.import_coll()', _scope_coll_json.length);
        //$.test_msg('Scope_collection_para.import_coll()', _scope_coll_json);
        
        for (var _i in _scope_coll_json) {
            var _scope_json = _scope_coll_json[_i];
            var _from = _scope_json[0];
            var _to = _scope_json[1];
            //$.test_msg('Scope_collection_para.import_coll() add', [_from, _to]);
            this.add(_from, _to);
        }
        
        this._resorted = true;
        
        //this.resort();
        //$.test_msg('Scope_collection_para.import_coll()', this.scopes[0].get_to());
    }
	else if ($.is_object(_scope_coll)) {
		
		for (var _i in _scope_coll) {
			var _webpage_scope_coll = _scope_coll[_i];
			this.import_coll(_webpage_scope_coll);
		}
	}
    return this;
};

Scope_collection_param.prototype.length = function () {
    return this.scopes.length;
};

/**
 * 
 * @param {number} _index
 * @type {Scope_param}
 */
Scope_collection_param.prototype.get = function (_index) {
    
    var _scope = null;
    if ($.is_number(_index)
        && _index < this.length()) {
        //this.resort();
        _scope = this.scopes[_index];
    }
    return _scope;
};

/**
 * 是否已經排序過的一個_flag。初始化為true。
 * 每次add時，都會將之設為false。只有經過resort()之後才會設為true。
 * @type {boolean}
 */
Scope_collection_param.prototype._resorted = true;

Scope_collection_param.prototype.resort = function (_force) {
    
    if ($.is_null(_force)) {
		_force = false;
	}
    
    //如果非強迫排序，而且是已經排序的情況下，則略過排序動作    
    if (_force === false && this._resorted === true) {
		return this;
	}
    
    var _scopes = this.scopes; 
    var _resort_scopes = [];
    var _hold = false;
    var _length = _scopes.length;
    
    for (var _i = 0; _i < _length; _i++) {
        var _scope = _scopes[_i];
        if (_i < _length - 1) {
            var _next_scope = _scopes[_i+1];
            
            if (_scope.get_to() < _next_scope.get_from()) {
                if (_hold === false) {
					_resort_scopes.push(_scope);
				}
                    
                _hold = false;
                continue;
            }
            else {
                if (_hold === true) {
					_scope = _resort_scopes.pop();
				}
                    
                //_scope = [_scope[0], _next_scope[1]];
                _scope = new Scope_param(_scope.get_from(), _next_scope.get_to());
                _resort_scopes.push(_scope);
                _hold = true;
                continue;
            }
            
            //做完是做完了，尚未經過驗證 
        }
        else {
            _resort_scopes.push(_scope);
        }
    }
    
    this.scopes = _resort_scopes;
    this._resorted = true;
    
    return this;
};

/**
 * 取得所有ID，並以陣列輸出
 * 注意，裡面是兩層陣列喔！
 * @type {number[][]}
 */
Scope_collection_param.prototype.get_index_array = function () {
    
    this.resort();
    
    var _coll = [];
    
    for (var _i = 0; _i < this.length(); _i++) {
        var _ary = [];
        var _scope = this.get(_i);
        
        var _from = _scope.get_from();
        var _to = _scope.get_to();
        
        //$.test_msg('Scope_coll.get_index_array()', [_from, _to]);
        
        for (var _j = _from; _j < (parseInt(_to, 10) + 1); _j++) {
			_ary.push(_j);
		}
        _coll.push(_ary);
    }
    
    return _coll;
    
};

/**
 * 取得所有位於開頭的index的id
 */
Scope_collection_param.prototype.get_from_index_array = function () {
    
    this.resort();
    
    var _coll = [];
    
    for (var _i = 0; _i < this.length(); _i++) {
        var _scope = this.get(_i);
        var _from = _scope.get_from();
        _coll.push(_from);
    }
    
    return _coll;
    
};

/**
 * 取得所有位於開頭的index的id
 */
Scope_collection_param.prototype.get_to_index_array = function () {
    
    this.resort();
    
    var _coll = [];
    
    for (var _i = 0; _i < this.length(); _i++) {
        var _scope = this.get(_i);
        var _to = _scope.get_to();
        _coll.push(_to);
    }
    
    return _coll;
    
};

Scope_collection_param.prototype.get_first_index = function () {
    
    var _index;
    
    if (this.length() > 0) {
        var _scope = this.get(0);
        _index = _scope.get_from();
    }
    
    return _index;
};

/**
 * 取得第一個from
 * @type number
 */
Scope_collection_param.prototype.get_from = function(){
	return this.get_first_index();
};

Scope_collection_param.prototype.get_last_index = function () {
    
    var _index;
    
    if (this.length() > 0) {
        var _scope = this.get((this.length()-1));
        _index = _scope.get_to();
    }
    
    return _index;
};

/**
 * 取得最後一個to
 * @type number
 */
Scope_collection_param.prototype.get_to = function(){
    return this.get_last_index();
};

Scope_collection_param.prototype.export_json = function (_export_anchor_text) {
    
    var _json = [];
    
    for (var _i in this.scopes) {
        var _scope = this.scopes[_i];
        var _j = _scope.export_json(_export_anchor_text);
        _json.push(_j);
    }
    
    return _json;
    
};

/**
 * @param {Scope_collection_param} _scope_coll
 * @type {Boolean}
 */
Scope_collection_param.prototype.equals = function (_scope_coll) {
    if ($.is_class(_scope_coll, 'Scope_collection_param') === false) {
		return false;
	}
    
    if (this.length() != _scope_coll.length()) {
		return false;
	}
        
    for (var _i = 0; _i < this.length(); _i++) {
        var _this_scope = this.get(_i);
        var _scope = _scope_coll.get(_i);
        
        if (_this_scope.equals(_scope) === false) {
			return false;
		}
    }
    
    return true;
};

/* End of file Scope_collection_param */
/* Location: ./system/application/views/web_apps/Scope_collection_param.js */