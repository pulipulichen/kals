/**
 * Scope_param
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/15 下午 10:56:35
 * @extends {KALS_user_interface}
 */
function Scope_param(_from, _to, _anchor_text) {
    
    if ($.isset(_from)) {
        this.set_from(_from);
    }
    if ($.isset(_to)) {
        this.set_to(_to);
    }
    if ($.isset(_anchor_text)) {
        this.set_anchor_text(_anchor_text);
    }
}

Scope_param.prototype.from = null;

Scope_param.prototype.to = null;

Scope_param.prototype.anchor_text = null;

Scope_param.prototype._filter_index = function (_index) {
    
    var id;
    if ($.is_number(_index)) {
        return _index;
    }
    else if ($.is_jquery(_index)) {
        _id = _index.attr('id');
        _id = $.get_prefixed_id(_id);
        return _id;
    }
    else if (typeof(_index.id) !== 'undefined') {
        _id = _index.id;
        _id = $.get_prefixed_id(_id);
        return _id;
    }
    else {
        try {
            _index = parseInt(_index, 10);
            return _index;
        } 
        catch (e) {
            return null;
        }
    }
};

Scope_param.prototype.set_from = function (_index) {
    
    _index = this._filter_index(_index);
    
    if (_index !== null) {
        this.from = _index;
    }

    this._check_order();
    
    return this;
};

Scope_param.prototype.get_from = function () {
    return this.from;
};

Scope_param.prototype.set_to = function (_index) {
    
    _index = this._filter_index(_index);
    
    if (_index !== null) {
		this.to = _index;
	}
    
    this._check_order();
    
    return this;
};

Scope_param.prototype.get_to = function () {
    return this.to;
};

Scope_param.prototype.set_anchor_text = function (_text) {
    this.anchor_text = _text;
    return this;
};

Scope_param.prototype.get_anchor_text = function () {
    return this.anchor_text;
};

Scope_param.prototype.reset = function() {
    this.from = null;
    this.to = null;
    this.anchor_text = null;
    return this;
};

Scope_param.prototype._check_order = function () {
    
    if (this.from === null ||
	this.to === null) {
		return this;
	}
    
    //$.test_msg('Scope_param', [this.from, this.to]);
    
    if (this.from > this.to) {
        var _temp = this.from;
        this.from = this.to;
        this.to = _temp;
    }
    
    return this;
};

Scope_param.prototype.export_json = function (_export_anchor_text) {
    
    var _json = [
        this.get_from(),
        this.get_to()
    ];
    
    if (_export_anchor_text !== false
        && this.get_anchor_text() !== null) {
        var _anchor_text = this.get_anchor_text();
        _anchor_text = encodeURIComponent(_anchor_text); 
        _json.push(_anchor_text);
    }
    
    return _json;
};

/**
 * @param {Scope_param} _scope
 * @type {Boolean}
 */
Scope_param.prototype.equals = function (_scope) {
    
    if ($.is_class(_scope, 'Scope_param') === false) {
		return false;
	}
        
    var _this_to = this.get_to();
    var _this_from = this.get_from();
    
    var _to = _scope.get_to();
    var _from = _scope.get_from();
    
    return (_this_to === _to && _this_from === _from);
};

/**
 * 計算長度
 * @author Pulipuli Chen 20141110
 * @returns {Number}
 */
Scope_param.prototype.count_length = function () {
     return this.get_to() - this.get_from() + 1;
};

/* End of file Scope_param */
/* Location: ./system/application/views/web_apps/Scope_param.js */