/**
 * Style_manager
 * 管理CSS，動態地新增、刪除、載入外部CSS
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/16 下午 03:38:58
 */
function Style_manager() {
}

Style_manager.prototype.create_style = function (_style_name) {
    var _style;
    
    if (this._use_style_sheet() == false)
    {
        if ($.isset(_style_name))
        {
            _style = $('head style[name="'+_style_name+'"]');
        
            if (_style.length == 0)
            {
                _style = $('<style type="text/css" name="'+_style_name+'"></style>')
                    .appendTo($('head'));
            }
            
            return _style;    
        }
        else
        {
            _style = $('<style type="text/css"></style>')
                .appendTo($('head'));
            return _style;
        }    
    }
    else
    {
        _style = document.createStyleSheet();
        _style.title = _style_name;
        return _style;
    }
};

Style_manager.prototype.get_style = function (_style_name) {
    var _style;
    if ($.is_null(_style_name))
        return null;
    else if (this._use_style_sheet() == false)
    {
        _style = $('head style[name="'+_style_name+'"]');
        if (_style.length > 0)
            return _style;
        else
            return this.create_style(_style);
    }   
    else
    {
        for (var _i in document.styleSheets)
        {
            var _style = document.styleSheets[_i];
            if (_style.title == _style_name)
            {
                return _style;
            }
        }
        return this.create_style(_style_name);
    } 
};

Style_manager.prototype.remove_style = function (_style_name) {
    if ($.is_null(_style_name))
        return this;
    
    if (this._use_style_sheet() == false)
    {
        this.get_style(_style_name).remove();    
    }
    else
    {
        this.clear_style(_style_name);
    }
    return this;
};

Style_manager.prototype.clear_style = function (_style_name) {
    if ($.is_null(_style_name))
        return this;
    
    var _style_sheet = this.get_style(_style_name); 
    if (this._use_style_sheet() == false)
    {
        _style_sheet.empty();    
    }
    else
    {
        var _rules = _style_sheet.rules;
        if (_rules == null)
            return this;
        
        var _length = _rules.length;
        if (_length == null || _length == 0)
            return this;
            
        //for (var _i = 1; _i < _length + 1 ;_i++)
        //    _style_sheet.removeRule(_i);    //12597
        //_style_sheet.removeRule();
        while (true)
        {
            try
            {
                _style_sheet.removeRule();
            }
            catch (e)
            {
                break;
            }
        }
    }
    return this;
};

Style_manager.prototype.add_style = function (_style_name, _selector, _style) {
    
    var _style_tag = this.get_style(_style_name);
    
    if (this._use_style_sheet() == false)
    {
        var _rule = this.create_rule(_selector, _style);
    
        var _style_text = _style_tag.html();
        _style_text = _style_text + _rule;
        _style_tag.html(_style_text);
        return this;    
    }
    else
    {
        _selector = this._combine_selector(_selector);
        _style = this._combine_rule(_style);
        _style_tag.addRule(_selector, _style);
    }
    
};
Style_manager.prototype._combine_selector = function (_selector) {
    if ($.is_array(_selector))
    {
        var _temp = '';
        for (var _i in _selector)
        {
            if (_i > 0)
                _temp = _temp + ', ';
            _temp = _temp + _selector[_i];
        }
        _selector = _temp;
    }
    return _selector;
};

Style_manager.prototype._combine_rule = function (_style) {
        
    if ($.is_object(_style))
    {
        var _style_temp = '';
        var _first = true;
        for (var _field in _style)
        {
            var _value = _style[_field];
            
            var _formal_field = $.str_replace('_', '-', _field);
            var _r = _formal_field + ':' + _value;
            
            if (_first == false)
                _style_temp = _style_temp + '; ';
            _style_temp = _style_temp + _r;
            _first = false;
        }
        _style = _style_temp;
    }
    else if ($.is_string(_style))
    {
        _style = $.trim(_style);
        if (_style.substr(0, 1) == '{')
            _style = _style.substr(1, _style.length);
        
        if (_style.substr(_style.length-1, _style.length) == '}')
            _style = _style.substr(0, _style.length-1);
    }
    
    return _style;
    
}; 

Style_manager.prototype.create_rule = function (_selector, _style) {
    _selector = this._combine_selector(_selector);
    _style = this._combine_rule(_style);
    
    var _rule = _selector + '{' + _style + '}';
    return _rule;
};

Style_manager.prototype.set_style = function (_style_name, _selector, _style) {
    this.clear_style(_style_name);
    return this.add_style(_style_name, _selector, _style);
};

Style_manager.prototype.load_style = function (_title, _path, _config) {
    
    if ($.is_null(_config), $.is_object(_path))
    {
        _config = _path;
        _path = 'custom';
    }
    
    _path = KALS_context.get_base_url(['style/', _path]);
    
    if ($.isset(_config))
    {
        var _data = $.json_encode(_config);
        _data = encodeURIComponent(_data);
        _data = escape(_data);
        _path = _path + '/' + _data;
    }
    
    //var _link = $('head link[href="'+_path+'"]');
    
    
    if (document.createStyleSheet)
    {
        var _found = false;
        for (var _i in document.styleSheets)
        {
            var _style = document.styleSheets[_i];
            if (_style.title == _title)
            {
                //_style.disabled = true;
                _style.href = _path;
                _style.disabled = false;
                _found = true;
                break;
            }
        }
        
        if (_found == false)
            document.createStyleSheet(_path).title = _title;
    }
    else
    {
        var _link = $('head link[title="'+_title+'"]');
        $.test_msg('Style_manager.load_style()', _link.length);
        if (_link.length > 0)
            _link.remove();
            
        _link = $('<link type="text/css" rel="stylesheet" href="'+_path+'" title="'+_title+'" />')
            .appendTo($('head'));    
    }
    
    return this;
};

Style_manager.prototype._use_style_sheet = function () {
    return (document.createStyleSheet != null);
};

Style_manager.prototype.unload_style = function (_path) {
    
    _path = KALS_context.get_base_url(['style/', _path]);
    if (document.createStyleSheet)
    {
        for (var _i in document.styleSheets)
        {
            var _style = document.styleSheets[_i];
            if (_style.title == _path || _style.href == _path)
            {
                _style.disabled = true;
            }
        }
    }
    else
    {        
        $('head link[href="'+_path+'"]').remove();
        $('head link[title="'+_path+'"]').remove();    
    }
    
};

/* End of file Style_manager */
/* Location: ./system/application/views/web_apps/Style_manager.js */