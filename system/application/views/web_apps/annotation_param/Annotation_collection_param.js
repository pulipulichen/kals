/**
 * Annotation_collection_param
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/20 下午 06:51:04
 */
function Annotation_collection_param(_param) {
    
    this.annotations = [];
    
	if ($.is_class(_param, 'Annotation_collection_param')) {
		this.annotations = _param.annotations;
		return;
	}
	
    if ($.isset(_param)) {
        if ($.is_array(_param)) {
			this.import_json(_param);
		}
		else {
			this.add(_param);
		}
    }
        
}

/**
 * @type {Annotation_param[]}
 */
Annotation_collection_param.prototype.annotations = [];

/**
 * 增加標註
 * @param {Annotation_param|Annotation_param[]} _param
 */
Annotation_collection_param.prototype.add = function (_param) {
    
    if ($.is_null(_param)) {
		return this;
	}
    
    if ($.is_array(_param) && _param.length > 0) {
        var _coll = _param;
		//$.test_msg('anno coll add is array', _param);
        for (var _i in _coll) {
			//$.test_msg('anno coll coll', _coll[_i].annotation_id);
            this.add(_coll[_i]);
        }
        return this;
    }
    
    if (typeof(_param.annotation_id) != 'undefined') {
		//$.test_msg('anno coll convert anno param, before', [_param.annotation_id, ($.is_class(_param) != 'Annotation_param')]);
		if ($.is_class(_param, 'Annotation_param') == false) {
			_param = new Annotation_param(_param);
		}
		//$.test_msg('anno coll convert anno param, after', _param.annotation_id);
        this.annotations.push(_param);
    }
    return this;
};

Annotation_collection_param.prototype.empty = function () {
    this.annotations = [];
    return this;
};

Annotation_collection_param.prototype.export_json = function () {
    
    var _json = [];
    
    for (var _i in this.annotations) {
        var _annotation = this.annotations[_i];
        var _j = _annotation.export_json();
        _json.push(_j);
    }
    
    return _json;
};

Annotation_collection_param.prototype.export_respond_json = function () {
    var _json = [];
    
    for (var _i in this.annotations) {
        var _annotation = this.annotations[_i];
        var _j = _annotation.export_respond_json();
        _json.push(_j);
    }
    
    return _json;
};

Annotation_collection_param.prototype.import_json = function (_json) {
    return this.add(_json);
};

Annotation_collection_param.prototype.get = function (_index) {
    if (_index === null &&
	this.annotations.length > 0) {
		return this.annotations[0];
	}
    
    if ($.is_number(_index) &&
	_index < this.annotations.length) {
		return this.annotations[_index];
	}
	else {
		return null;
	}
};

Annotation_collection_param.prototype.get_annotations = function () {
	var _output = [];
	$.test_msg(this.length());
	/*
	for (var _i = 0; _i < this.length(); _i++) {
		var _annotation_param = this.get(_i);
		if ($.is_class(_annotation_param, 'Annotation_param') === false) {
			_annotation_param = new Annotation_param(_annotation_param);
		}
		_output.push(_annotation_param);
	}
	*/
	return _output;
};

Annotation_collection_param.prototype.length = function () {
    return this.annotations.length;
};


/* End of file Annotation_collection_param */
/* Location: ./system/application/views/web_apps/Annotation_collection_param.js */