/**
 * Window_filter
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 10:56:17
 * @extends {Window_content}
 */
function Window_filter() {
    
    Window_content.call(this);
    
    this._setup_submit(new Window_filter_submit());
    
}

Window_filter.prototype = new Window_content();

Window_filter.prototype.name = 'Filter';

Window_filter.prototype.width = 220;

Window_filter.prototype.heading = new KALS_language_param (
    'Annotation Filter',
    'window.filter.heading'
);

Window_filter.prototype.nav_heading = new KALS_language_param (
    'Annotation Filter',
    'window.filter.nav_heading'
);

Window_filter.prototype._$create_ui = function () {
    
    var _factory = KALS_window.ui;
    
    var _ui = _factory.panel('window-filter');
        
    var _my_div = $('<div></div>')
        .addClass('my-div')
        .appendTo(_ui);
    
    var _my_input = $('<label><input type="checkbox" name="filter" value="my" checked="true" /> <span></span></label>')
        .appendTo(_my_div);
    
    var _my_label = _my_input.find('span')
        .addClass('kals-word my_importance');
    var _my_lang = new KALS_language_param(
        'My annotations',
        'window.filter.content.option.my'
    ); 
    KALS_context.lang.add_listener(_my_label, _my_lang);
    
    // ---------
    
    //設定勾選my_input時，就勾選底下全部選項，或是取消全部選項
    var _my_checkbox = _my_input.find('input');
    
    // ---------
    
    var _my_type_div = $('<table><tbody></tbody></table>')
        .addClass('my-type-div')
        .appendTo(_my_div);
        
    // 2010.11.16 因為指定type顯示的功能很麻煩，所以先不作
    _my_type_div.hide();
    
    var _types = Annotation_type_param._type_mapping;
    var _type_lang_header = Type_menu.prototype._type_lang_header;
    
    var _type_inputs = [];
    for (var _i in _types)
    {
        var _type = _types[_i];
        
        var _type_input = $('<td><label><input type="checkbox" name="filter" value="my_'+_type+'" checked="true" /> <span></span></label></td>');
        _type_inputs.push(_type_input);
            
        var _type_label = _type_input.find('span')
            .addClass('my_' + _type + ' kals-word');
        
        var _type_lang = new KALS_language_param(
            _type,
            _type_lang_header + _type
        );
        
        KALS_context.lang.add_listener(_type_label, _type_lang);
        
        var _type_checkbox = _type_input.find('input');
        _type_checkbox.change(function () {
            var _inputs = _my_type_div.find('input');
            var _state = null;
            for (var _i = 0; _i < _inputs.length; _i++)
            {
                var _checked = _inputs.eq(_i).attr('checked');
                if (_state === null)
                {
                    _state = _checked;
                }
                else if (_state != _checked)
                {
                    _state = 'half';
                    break;
                }
            }
            
            if (_state != 'half')
            {
                _my_checkbox.attr('checked', _state);
            }
            else
            {
                _my_checkbox.attr('checked', false);
                _my_checkbox.attr('disabled', true);
            }
        });
    }
    
    var _tr;
    for (_i in _type_inputs)
    {
        if (_i % 2 === 0)
        {
            _tr = $('<tr></tr>')
                .appendTo(_my_type_div);
        }
        
        _type_input = _type_inputs[_i];
        _type_input.appendTo(_tr);
        
        if (_i == _type_inputs && _i % 2 === 0)
        {
            _type_input.attr('colspan', 2);
        }
    }
    
    // ---------
    
    //勾選全部
    _my_checkbox.change(function () {
        var _checked = this.checked;
        
        var _inputs =  _my_type_div.find('input');
        _inputs.attr('checked', _checked);
    });
    /*
    _my_input.click(function (_event) {
        var _disabled = _my_checkbox.attr('disabled');
        
        if (_disabled == true)
        {
            _event.preventDefault();
            
            _my_checkbox.attr('disabled', false)
                .attr('checked', true)
                .change();
        }
    });
    */
    
    //如果登出狀態，則隱藏
    KALS_context.auth.add_listener(function (_auth) {
        var _inputs = _my_div.find('input');
        if (_auth.is_login()) {
			_inputs.attr('disabled', false);
		}
		else {
			_inputs.attr('disabled', true);
		}
    }, true);
    
    // ---------
    
    //設定登入跟權限檢查
    
    var _nav_div = $('<div></div>')
        .addClass('nav-div')
        .appendTo(_ui);
    
    var _nav_input = $('<label><input type="checkbox" name="filter" value="nav" checked="true" /> <span></span></label>')
        .appendTo(_nav_div);
    
    var _nav_label = _nav_input.find('span')
        .addClass('kals-word nav_great');
    
    var _nav_lang = new KALS_language_param(
        'Recommend annotations',
        'window.filter.content.option.navigation'
    ); 
    KALS_context.lang.add_listener(_nav_label, _nav_lang);
    
    KALS_context.policy.add_attr_listener('show_navigation', function (_policy) {
        var _input = _nav_div.find('input');
        if (_policy.allow_show_navigation()) {
			_input.attr('disabled', false);
		}
		else {
			_input.attr('disabled', true);
		}
    });
    
    return _ui;
};

/* End of file Window_filter */
/* Location: ./system/application/views/web_apps/Window_filter.js */
