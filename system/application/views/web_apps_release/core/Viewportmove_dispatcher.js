/**
 * Viewportmove_dispatcher
 * 畫面移動、視窗放大縮小時的事件通知者
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/7/28 下午 03:36:17
 * @extends {Event_dispatcher}
 */
function Viewportmove_dispatcher() {
    
    Event_dispatcher.call(this);
    
    // 2010.8 以下都是偵測手機縮放尺寸的功能，已經放棄不使用
    //this._detect_interval = 1000;
    //this._viewport_locked = false;
    //this._zoom_scale = 1;
    
    var _this = this;
    var _event = function(){
        if (typeof($viewport_trigger) != 'undefined')
        {
            clearTimeout($viewport_trigger);
        }
        $viewport_trigger = setTimeout(function () {
            _this.set_changed();
            _this.notify_listeners();
            clearTimeout($viewport_trigger);
        }, 500);
    };
    
    $(window).bind('scroll', _event)
        .bind('resize', _event)
        .bind('load', _event);
        
    if ($.is_mobile_mode())
    {
        _event = function () {
            _this.set_changed();
            _this.notify_listeners(_this);
        };
        
        $(document).bind('click', _event)
            .bind('mouseup', _event)
            .bind('touchend', _event);
    }
    
}

Viewportmove_dispatcher.prototype = new Event_dispatcher();

// --------
// 手機縮放尺寸偵測函式
// 2010.8 已經放棄不使用
// -------

/**
 * 偵測縮放尺寸的間隔時間，單位是毫秒
 * @type {number}
 */
//Viewportmove_dispatcher.prototype._detect_interval = 1000;

/**
 * zoom_scale
 * 
 * 目前縮放的比例
 * @class Viewportmove_dispatcher
 * @type number
 */
//Viewportmove_dispatcher.prototype._zoom_scale = 1;

/**
 * 設定縮放偵測器
 * 2010.8 後來決定不使用了
 * 
 * Provides a device_scale class on iOS devices for scaling user
 * interface elements relative to the current zoom factor.
 * 
 * http://37signals.com/svn/posts/2407-device-scale-user-interface-elements-in-ios-mobile-safari
 * Copyright (c) 2010 37signals.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @memberOf {Viewportmove_dispatcher}
 * @copyright http://37signals.com/svn/posts/2407-device-scale-user-interface-elements-in-ios-mobile-safari
 * @author Copyright (c) 2010 37signals.
 */
/*
Viewportmove_dispatcher.prototype._setup_zoom_detector = function () {
    
    return;
    
    if (typeof(jQuery) != 'undefined' 
         && typeof(jQuery.is_mobile_mode) == 'function'
         && jQuery.is_mobile_mode() == false)
        return;
    
    //原程式有這一段，但是用意不明，所以我先把他刪掉了
    //var _hasTouchSupport = "createTouch" in document;
    //if (!hasTouchSupport) return;
    
    var _headElement  = document.getElementsByTagName("head")[0];
    var _styleElement = document.createElement("style");
    
    _styleElement.setAttribute("type", "text/css");
    _headElement.appendChild(_styleElement);
    this._width_stylesheet = _styleElement.sheet;
    
    //設置寬度偵測器
    var _padding_text = 'a';
    for (var _i = 0; _i < 2000; _i++)
        _padding_text = _padding_text + ' a';
    
    var _width_detector_container = $('<div><span class="detector">'+_padding_text+'</span></div>')
        //.css('max-height', '0px')
        .css('overflow', 'hidden')
        .css('margin', '0')
        .css('padding', '0')
        .css('font-size', '1px')
        //.css('position', 'absolute')
        //.css('left', 0)
        .appendTo($('body'));
        _width_detector_container.find('span').css('background-color', 'red');
    this._width_detector = _width_detector_container.find('.detector');
    
    //其他的捲軸移動事件由Viewportview_dispatcher去偵測
    //window.addEventListener("scroll", updateDeviceScaleStyle, false);
    //window.addEventListener("resize", updateDeviceScaleStyle, false);
    //window.addEventListener("load",   updateDeviceScaleStyle, false);
    
    this._update_device_scale_style();
    
    var _this = this;
    setInterval(function () {
        
        var _detect_width = _this.get_detector_width();
        var _viewport_width = _this.get_viewport_width();
        
        //如果偵測到的寬度與之前設定的寬度不同，則觸發事件
        if (_detect_width != _viewport_width) 
        {
            //將偵測到的寬度存成設定的寬度
            _this.viewport_width = _detect_width;
            _this.update_device_scale_style();
            _this.set_changed();
            _this.notify_listeners();
        }
    }, this._detect_interval);
    
    return this;
};
*/

/**
 * @type {jQuery}
 */
//Viewportmove_dispatcher.prototype._width_detector = null;

//Viewportmove_dispatcher.prototype._width_stylesheet = null;

/*
Viewportmove_dispatcher.prototype._get_viewport_width = function () {
    return this.viewport_width;
};
*/

/*
Viewportmove_dispatcher.prototype._get_detector_width = function () {
    var _width = this._width_detector.width();
    var _body = $('body');
    var _body_margin_left = _body.css('margin-left');
        _body_margin_left = _body_margin_left.substr(0, _body_margin_left.length - 2); 
    var _body_margin_right = _body.css('margin-right');
        _body_margin_right = _body_margin_right.substr(0, _body_margin_right.length - 2);
    var _max_width = $(document).width();
    
    var _screen_x = window.screenLeft;
    
    
    
    //$.test_msg($(document).width(), [_body_width, _body_margin_left, _body_margin_right, _width]);
    
    if ((_max_width - _body_margin_left - _body_margin_right) == _width) {
        _width = eval(parseInt(_width) + parseInt(_body_margin_left) + parseInt(_body_margin_right));
        _width = _width + _screen_x * 2;
        
    }
    else {
        //_width = eval(parseInt(_width) + parseInt(_body_margin_left));
        //_width = _width + _screen_x * 2 + $.getScrollbarWidth();
        
        _width = eval(parseInt(_width) + parseInt(_body_margin_left) + parseInt(_body_margin_right));
        _width = _width + _screen_x * 2;
    }
    
    //var _scrollbar = $.getScrollbarWidth();
    //if (_scrollbar > 0)
    //    _scrollbar = _scrollbar + 3;
    //
    //_width = eval(parseInt(_width) + parseInt(_body_margin_left) + parseInt(_body_margin_right));
    //    _width = _width + _screen_x * 2 + _scrollbar;
    
    return _width;
};
*/

/*
Viewportmove_dispatcher.prototype._get_device_scale = function()
{
    var _deviceWidth = null;
    //偵測方向
    var _landscape = Math.abs(window.orientation) == 90;
    
    //if (_landscape) {
      // iPhone OS < 3.2 reports a screen height of 396px
      // Android沒有辦法偵測到landscape，所以這條規則無效
      //_deviceWidth = Math.max(480, screen.height);
    //} else {
      //_deviceWidth = screen.width;
    //}
    var _deviceWidth = this._get_detector_width();
    
    //var _result = _width_detector.find('.detector').width() / _deviceWidth;
    var _result = _deviceWidth / window.outerWidth;
    
    // 加入平滑化(smooth)修正比例參數
    for (var _i = 0; _i < this._scale_range.length-1; _i++)
    {
        var _range1 = this._scale_range[_i];
        var _range2 = this._scale_range[(_i+1)];
        
        if (_result == _range1)
            break;
        
        if (_result < _range1 
            && _result > _range2)
        {
            var _middle = (_range1 + _range2) / 2;
            if (_result > _middle)
                _result = _range1;
            else
                _result = _range2;
            break;
        }
    }
    
    return _result;
};
*/

/**
 * Android手機瀏覽器可能的縮放比例，用來作為平滑化的依據。
 * 但是這個比例並不一定正確，仍需要確認。
 * 不同手機上也可能會有不同比例。
 */
//Viewportmove_dispatcher.prototype._scale_range = [2.5, 2, 1.5, 1.25, 1, 0.75, 0.625, 0.5, 0.375, 0.3125, 0.25, 0.2];

/*
Viewportmove_dispatcher.prototype._update_device_scale_style = function () 
{
    var _stylesheet = this._width_stylesheet;
    if (typeof(_stylesheet.cssRules) != 'undefined' 
        && _stylesheet.cssRules.length) 
    {
        _stylesheet.deleteRule(0);
    }
    
    var _scale = this._get_device_scale();
    
    _stylesheet.insertRule(
      ".device_scale {-webkit-transform:scale(" + _scale + ")}", 0
    );
    
    this._zoom_scale = _scale;
};
*/

//Viewportmove_dispatcher.prototype._viewport_locked = false,

/*
Viewportmove_dispatcher.prototype.lock_viewport = function () {
    if (this._viewport_locked == true)
        return;
    
    var _head = $('head');
    var _origin_viewport = $('head meta[name=viewport]');
    if (_origin_viewport.length == 0)
    {
        _origin_viewport = $('<meta name="viewport" ' 
                + 'content="width='+$(document).width()+', maximum-scale=5.0, minimum-scale=1.0, user-scalable=yes '
                + ' initial-scale=' + this._zoom_scale+ '" />')
            .appendTo(_head);
    }
    var _x_offset = window.pageXOffset;
        _origin_viewport.attr('x_offset', _x_offset);
    var _y_offset = window.pageYOffset;
        _origin_viewport.attr('y_offset', _y_offset);
    
    _origin_viewport.attr('name', 'origin_viewport');
    
    var _new_viewport = $('<meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes" />')
        .appendTo(_head);
        
    this._viewport_locked = true;
    return this;
};
*/

/*
Viewportmove_dispatcher.prototype.unlock_viewport = function(){
    if (this._viewport_locked == false)
        return;
    
    var _new_viewport = $('head meta#kals_viewport_lock');
    var _origin_viewport = $('head meta[name=origin_viewport]');
    
    if (_new_viewport.length > 0)
        _new_viewport.remove();
    if (_origin_viewport.length > 0)
    {
        _origin_viewport.attr('name', 'viewport');
        alert(_origin_viewport.attr('content'));
        var _x_offset = _origin_viewport.attr('x_offset');
        var _y_offset = _origin_viewport.attr('y_offset');
        if (typeof(_x_offset) != 'undefined'
            && typeof(_y_offset) != 'undefined')
            window.scrollTo(_x_offset, _y_offset);
    }
    
    this._viewport_locked = false;
    return this;
};
*/

/* End of file Viewportmove_dispatcher */
/* Location: ./system/application/views/web_apps/toolkit/Viewportmove_dispatcher.js */