/**
 * Text_margin
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/16 下午 08:25:51
 * @param {jQuery} _selector
 */
function Text_margin(_selector) {
    
    KALS_user_interface.call(this);
    
    this._text = _selector;
    
    this.setup_margin();
    
    var _this = this;
    KALS_context.view.add_listener(function () {
        _this.setup_margin();
    });
}

/**
 * 可選擇的本體範圍！
 * @type {jQuery}
 */
Text_margin.prototype._text = null;

Text_margin.prototype._float = null;

Text_margin.prototype._last_padding = null;
Text_margin.prototype._last_padding_style = null;

/**
 * 標註工具所需寬度，單位是px。
 * @type {number}
 */
Text_margin.prototype.get_tool_width = function () {
    //實際上使用時，要記得跟Annotation_tool調寬度。
    return 300;
};

Text_margin.prototype.setup_margin = function (_callback) {
    
    if ($.is_small_width() == false)
    {
        var _tool_width = this.get_tool_width();
    
        var _left_margin = this.get_text_left_margin();
        if (_left_margin > _tool_width)
        {
            this._float = 'left';
            return;
        }
        
        var _right_margin = this.get_text_right_margin();
        if (_right_margin > _tool_width)
        {
            this._float = 'right';
            return;
        }
        
        //$.test_msg('Text_margin.setup_margin()', [_tool_width, _left_margin, _right_margin]);
        
        //如果都不行，則要在text本身設置padding
        
        //先決定padding的方向
        var _float = this.decide_float();
        var _padding_style = 'padding-' + _float;
        
        //觀察一下text原本的padding_length
        var _padding_length = this._text.css(_padding_style);
        _padding_length = $.strip_unit(_padding_length);
        
        //$.test_msg('Text_margin.setup_margin() _padding_length', _padding_length);
        
        //取得還需要的padding寬度
        var _margin = this['get_text_' + _float + '_margin']();
        var _set_padding_length = _tool_width - _margin + _padding_length + 5;
        
        this._text.css(_padding_style, _set_padding_length + 'px');
        
        if (this._last_padding == null)
        {
            this._last_padding = _padding_length + 'px'; 
            this._last_padding_style = _padding_style;
        }    
    }
    else
    {
        //還原
        if (this._last_padding != null)
        {
            this._text.css(this._last_padding_style, this._last_padding);
            this._last_padding = null;    
            this._last_padding_style = null;
        }
    }
    
    $.trigger_callback(_callback);
    return this;
};

Text_margin.prototype.get_text_left_margin = function () {
    
    var _left = this._text.offset().left;
    
    var _text_padding_left = this._text.css('padding-left');
        _text_padding_left = $.strip_unit(_text_padding_left);
    
    _left = _left + _text_padding_left;
    
    return _left;
};

Text_margin.prototype.get_text_right_margin = function () {
    
    var _body_width = $('body').width();
    var _left_margin = this.get_text_left_margin();
    var _text_width = this.get_text_width();
    
    var _text_padding_right = this._text.css('padding-right');
        _text_padding_right = $.strip_unit(_text_padding_right);
    
    var _right_margin = _body_width - _left_margin - _text_width - _text_padding_right;
    return _right_margin;
};

Text_margin.prototype.get_text_width = function () {
    
    var _text_width = this._text.width();
    var _text_padding_left = this._text.css('padding-left');
        _text_padding_left = $.strip_unit(_text_padding_left);
    var _text_padding_right = this._text.css('padding-right');
        _text_padding_right = $.strip_unit(_text_padding_right);
    _text_width = _text_width + _text_padding_left + _text_padding_right;
    
    return _text_width;
    
};

Text_margin.prototype.decide_float = function () {
    
    //2010.10.16
    //第一次判斷的最準確，之後會偏掉
    //除非目標在第一次判斷之後還會左右移動，但那種情況應該很少，可以不用在意
    //if (this._float != null)
    //    return this.get_float();
        
    var _left_margin = this.get_text_left_margin();
    var _right_margin = this.get_text_right_margin();
    
    //$.test_msg('Text_margin.decide_float()', [_left_margin, _right_margin, this.get_text_width()]);
    
    if (_left_margin < _right_margin)
        this._float = 'right';
    else
        this._float = 'left';
        
    return this._float;
};

Text_margin.prototype.get_float = function () {
    if ($.is_small_width())
        return 'bottom';
    else
        return this._float;
};

/* End of file Text_margin */
/* Location: ./system/application/views/web_apps/Text_margin.js */