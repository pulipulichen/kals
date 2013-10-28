/**
 * Window_filter_submit
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/3 下午 11:04:46
 * @extends {Window_content_submit}
 */
function Window_filter_submit() {
    
    Window_content_submit.call(this);
    
}

Window_filter_submit.prototype = new Window_content_submit();

Window_filter_submit.prototype.lang = new KALS_language_param(
    'OK',
    'window.ok'
);

Window_filter_submit.prototype.submit = function () {
    var _data = this.get_data();
    
    var _style_name = 'filter';
    var _style_manager = KALS_context.style;
    
    
    
    if ($.isset(_data)) {
        _style_manager.clear_style(_style_name);
        var _url = 'custom';
        
        var _config = [];
        if (typeof(_data.my) == 'object' && _data.my.length > 0) {
            var _my_style = {
                //'background_color': 'transparent'
                'border-bottom-style': 'none'
                //'border-bottom-color': 'inherit'
            };
            _style_manager.add_style(_style_name, _data.my, _my_style);
            
            var _select_selector = '.kals-paragraph .select';
            var _select_style = {
                'border-bottom': '3px solid blue !important'
            };
            _style_manager.add_style(_style_name, _select_selector, _select_style);
            
            var _recommended_selector = '.kals-paragraph .recommended';
            var _recommended_style = {
                'border-bottom': '3px solid green !important'
            };
            _style_manager.add_style(_style_name, _recommended_selector, _recommended_style);
            
            /*
            _config.push({
                selector: _data.my,
                rule: _my_style
            });
            */
        }
        if (typeof(_data.nav) == 'object') {
            var _nav_style = {
                'color': 'inherit'
                //'text_decoration': 'none'
            };
            _style_manager.add_style(_style_name, _data.nav, _nav_style);
            /*
            _config.push({
                selector: _data.nav,
                rule: _nav_style
            });
            */
        }
        
        //_style_manager.load_style(_style_name, _url, _config);
        
    }
    else {
        _style_manager.remove_style(_style_name);
        //_style_manager.unload_style(_style_name);
    }
    
    KALS_window.close();
};

Window_filter_submit.prototype.get_data = function () {
    var _data = {};
    var _has_data = false;
    var _content_ui = this._content.get_ui();
    
    var _is_login = KALS_context.auth.is_login();
    var _word_classname = '.kals-paragraph .kals-word';
    //如果有登入，才需要取得my資料
    if (_is_login === true) {
        var _my = [];
        var _inputs = _content_ui.find('.my-type-div input');
        //$.test_msg('Window_filter_submit.get_data() my', _inputs.length);
        for (var _i = 0; _i < _inputs.length; _i++) {
            var _input = _inputs.eq(_i);
            if (_input.attr('checked') === true) {
				continue;
			}
            
            var _classname = _input.attr('value');
            _my.push(_word_classname + '.' + _classname);
        }
        
        if (_my.length > 0) {
            _data.my = _my;
            _has_data = true;
        }
    }
    
    //如果有show navigation，才需要取得nav資料
    var _allow_show_navigation = KALS_context.policy.allow_show_navigation();
    if (_allow_show_navigation) {
        
        var _nav_input = _content_ui.find('.nav-div input');
        var _nav_checked = _nav_input.attr('checked');
        if (_nav_checked === false) {
            var _nav = [];
            _nav.push(_word_classname + '.nav_bad');
            _nav.push(_word_classname + '.nav_normal');
            _nav.push(_word_classname + '.nav_good');
            _nav.push(_word_classname + '.nav_great');
            _data.nav = _nav;
            _has_data = true;
        }
    }
    
    if (_has_data === true) {
		return _data;
	}
	else {
		return null;
	}
};

/* End of file Window_filter_submit */
/* Location: ./system/application/views/web_apps/Window_filter_submit.js */
