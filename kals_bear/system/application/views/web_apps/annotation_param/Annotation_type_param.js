/**
 * Annotation_type_param
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/26 下午 02:07:24
 * @extends {KALS_user_interface}
 */
function Annotation_type_param(_param) {

    if ($.isset(_param))
    {
        this.set(_param);
    }
}

Annotation_type_param.prototype.id = 1;
Annotation_type_param.prototype.custom_name = null;

Annotation_type_param._type_mapping = {
    1: 'importance',
    2: 'question',
    3: 'confusion',
    4: 'summary',
    5: 'concept',
    6: 'example',
    7: 'custom'
};

Annotation_type_param.prototype.set = function (_param) {
    
    var _id = Annotation_type_param.filter_id(_param);
    
    //$.test_msg('Annotation_type_param.set()', [_param, _id, $.is_number(_id)]);
    
    if ($.is_number(_id))
    {
        this.id = _id;
        this.custom_name = null;
    } 
    else if ($.is_class(_param, 'Annotation_type_param'))
    {
        this.id = _param.get_id();
        this.custom_name = _param.get_custom_name();
    }
    else
    {
        this.id = 7;
        this.custom_name = _id;
    }
    
    return this;
};

Annotation_type_param.prototype.set_type = function (_param) {
    return this.set(_param);
};

Annotation_type_param.prototype.reset_custom_name = function () {
    this.custom_name = null;
    return this;
};

Annotation_type_param.prototype.get_id = function () {
    return this.id;
};

Annotation_type_param.prototype.get_name = function () {
    
    if (this.id != 7)
        return Annotation_type_param.filter_name(this.id);
    else
    {
        if (this.custom_name == null)
        {
            return Annotation_type_param.filter_name(this.id);
        }
        else
        {
            return this.custom_name;
        }
    }    
};

Annotation_type_param.prototype.get_type_name = function () {
    var _id = this.get_id();
    if (_id > 7)
        _id = 7;
    
    //$.test_msg('Annotation_type_param.get_type_name()', [this.get_id(), _id, Annotation_type_param.filter_name(_id)]);
    
    return Annotation_type_param.filter_name(_id);
};

Annotation_type_param.prototype.get_custom_name = function () {
    return this.custom_name;
};

Annotation_type_param.prototype.is_custom = function () {
    return (this.id == 7);
};

Annotation_type_param.prototype.has_custom_name= function () {
    return (this.custom_name != null);
};

Annotation_type_param.prototype.equals = function (_type) {
    if ($.is_null(_type))
        return false;
    if ($.is_class(_type, 'Annotation_type_param') == false)
        _type = new Annotation_collection_param(_type);
    
    return (_type.get_id() == this.get_id()
            && _type.get_custom_name() == this.get_custom_name());
};

Annotation_type_param.prototype.export_json = function () {
    
    var _json = this.get_id();
    
    if (_json == 7)
    {
        var _name = this.get_name();
        if (_name != 'custom')
            _json = _name;
    }
    
    return _json;
};

Annotation_type_param.filter_id = function (_param) {
    
    if ($.is_number(_param))
        return _param;
    else ($.is_string(_param))
    {
        for (var _i in Annotation_type_param._type_mapping)
        {
            _typename = Annotation_type_param._type_mapping[_i];
            if (_typename == _param)
                return parseInt(_i);
        }
    }
    
    return null;
};

Annotation_type_param.filter_name = function (_param) {
    
    if ($.is_string(_param))
        return _param; 
    else if ($.is_number(_param)
        && typeof(Annotation_type_param._type_mapping[_param]) == 'string')
    {
        return Annotation_type_param._type_mapping[_param];
    }
    else
        return _param;
};

/* End of file Annotation_type_param */
/* Location: ./system/application/views/web_apps/Annotation_type_param.js */