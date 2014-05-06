/**
 * KALS_toolbar
 * 實體化交由Init_component去做！
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/9/14 下午 05:40:35
 * @extends {Overlay_modal}
 */
function KALS_toolbar() {
    
    Overlay_modal.call(this);
    
    this.child('toolbar', new Toolbar_component());
    this.child('toggle', new Toolbar_toggle_component());
    this.child('padding', new Toolbar_padding_component());
    
    this.child('logo', new Logo_component());
    this.child('loading', new Loading_component());
    this.child('search', new Search_form_component());
    
    this._common_windows = (new Common_navigation()).get_nav_items();
    this.child('anonymous_nav', new Anonymous_navigation(this._common_windows));
    this.child('avatar', new Avatar_component(this._common_windows));
    //this.child('common_nav', new Common_navigation());
        
    var _this = this;
    
    KALS_context.init_profile.add_listener(function () {
        _this.toggle_loading(false);    
    });
    
    setTimeout(function () {
        _this.toggle_loading(true);
        KALS_context.init_component.complete('KALS_toolbar');    
    }, 0);
}

KALS_toolbar.prototype = new Overlay_modal();

KALS_toolbar.prototype._$modal_name = 'KALS_toolbar';
KALS_toolbar.prototype._$closable = false;
KALS_toolbar.prototype._$exposable = false;

/**
 * @type {Toolbar_component}
 */
KALS_toolbar.prototype.toolbar = null;

/**
 * @type {Toolbar_toggle_component}
 */
KALS_toolbar.prototype.toggle = null;

/**
 * @type {Toolbar_padding_component}
 */
KALS_toolbar.prototype.padding = null;

/**
 * @type {Logo_component}
 */
KALS_toolbar.prototype.logo = null;

/**
 * @type {Loading_component}
 */
KALS_toolbar.prototype.loading = null;

/**
 * @type {Search_component}
 */
KALS_toolbar.prototype.search = null;

/**
 * @type {Anonymous_navigation}
 */
KALS_toolbar.prototype.anonymous_nav = null;

/**
 * @type {Avatar_component}
 */
KALS_toolbar.prototype.avatar = null;

/**
 * @type {Common_navigation}
 */
//KALS_toolbar.prototype.common_nav = null;

KALS_toolbar.prototype._common_windows = null;

// ---------

KALS_toolbar.prototype._$create_ui = function () {
    
    var _ui = this._$create_ui_prototype();
    _ui.removeClass('kals-modal');
    _ui.addClass('kals-toolbar')
		.addClass("KALS");
    
    var _toolbar_ui = this.toolbar.get_ui();
    var _toggle_ui = this.toggle.get_ui();
    this.toggle.hide(true);
    _ui.append(_toolbar_ui).append(_toggle_ui);
    
    var _config = this._$get_config();
    _config.top = '0%';
    _config.closeOnClick = false;
    _config.closeOnEsc = false;
    _ui.overlay(_config);
    
    var _logo_ui = this.logo.get_ui();
    this.toolbar.setup_left(_logo_ui);
    
    var _loading_ui = this.loading.get_ui();
    var _search_ui = this.search.get_ui();
    this.toolbar.setup_center([
        _search_ui
    ]);
    
    var _anonymous_ui = this.anonymous_nav.get_ui();
        _anonymous_ui.addClass('anonymous-component');
    var _avatar_ui = this.avatar.get_ui();
    //var _common_ui = this.common_nav.get_ui();
    
    var _navigation_container = $('<div></div>').addClass('navigation-container')
        .append(_anonymous_ui)
        .append(_avatar_ui);
    
    this.toolbar.setup_right([
        _loading_ui,
        //_anonymous_ui
        //, _avatar_ui
        _navigation_container 
    ]);
    
    //最後加上Padding
    var _padding = this.padding.get_ui();
    //_padding.hide();
    $('body').prepend(_padding);
    
    _ui.addClass('loading');
    
    var _this = this;
    setTimeout(function () {
        
        _this.toggle_navigation('anonymous-component');
        
        var _toolbar_height = _this.get_height();
        //$.test_msg('toolbar_height', _toolbar_height);
        //_padding.css("height", _toolbar_height + 'px');
        
        
        //2010.10.5 測試顯示avatar-component看看？
        //_this.toggle_navigation('avatar-component');
        /*
        _padding.slideDown(function () {
            $.test_msg('slideDown');
            $(this).removeAttr('style');
        });
        */
        _padding.show();
        _padding.animate({
            height: _toolbar_height + "px"
        }, 1000);
        _this.open();
    }, 0);
    
    
    KALS_context.auth.add_listener(function (_auth, _data) {
        if (_data === null) {
			return;
		}
        
        //$.test_msg('KALS_context_auth.add_listener()', _data.login);
        //如果有登入，切換至avatar-nav，否則切換至login-nav        
        if (_data.login === true) {
            _this.toggle_navigation('avatar-component');
        }
        else {
            _this.toggle_navigation('anonymous-component');
        }
    });
    
    // 點兩下關閉工具列
    _ui.dblclick(function () {
        _this.toggle_toolbar(false);
    });
    
    
    
    return _ui;
};

/**
 * 當視窗大小改變時，需要因應變更的動作
 * @param {jQuery} _ui
 * @returns {KALS_toolbar}
 */
KALS_toolbar.prototype._$onviewportmove = function (_ui) {
    
    var _ui_toggle = this.toggle.get_ui();
    var _padding_ui = this.padding.get_ui();
    
    //$.test_msg('KALS_toolbar onviewportmove', {height: $.is_small_height(), width: $.is_small_width()});
    
    if ($.is_small_height()) {   
        // 如果是小高度的話
        
        if (this.toggle.is_show() === false) {
            this.toggle_toolbar(false);
            this.toggle.show();
        }
        if (_padding_ui.hasClass('compact-height') === false) {
            _padding_ui.slideUp(function () {
                _padding_ui.addClass('compact-height');    
            });
        }
    }
    else {
        this.toggle_toolbar(true);
        this.toggle.hide();
        
        if (_padding_ui.hasClass('compact-height')) {
            _padding_ui.removeClass('compact-height');
            _padding_ui.slideDown(function () {
                //_padding_ui.css('display', null);
                _padding_ui.removeAttr('style');    
            });   
        }
    }
    
    if ($.is_small_width()) {
        _ui.addClass('compact-width');
        //this.toolbar.toggle_left(false);
    }
    else {
        _ui.removeClass('compact-width');
        //this.toolbar.toggle_left(true);
    }
    
    if ($.is_mobile_mode()) {
        _ui.valign('top');
    }
    
    if (this.toolbar_visible() === false) {
        _ui.align('center');
    }
    
    return this;
};

/**
 * 即使被隱藏了，也能夠使用viewportmove
 * @type {function} = function (_ui) {}
 */
KALS_toolbar.prototype._$viewportmove_visible_enable = true;

/**
 * 切換Toolbar元件的顯示
 * @param {null|boolean} _display = null：如果是null，則會切換到另一種型態去。
 * @param {function} _callback
 */
KALS_toolbar.prototype.toggle_toolbar = function (_display, _callback) {
   
   var _toolbar_ui = this.toolbar.get_ui();
   var _ui = this.get_ui();
   var _ui_hidden = _ui.hasClass('hide');
   
   if ($.is_null(_display)) {
       if (_ui_hidden) {
            _display = true;
        }
        else {
            _display = false;
        }
   }
   
   var _complete = function () {
       $.trigger_callback(_callback);
   };
   
   //$.test_msg('display', _display);
   var _height;
   if (_display === true && _ui_hidden === true) {
       // 準備顯示
       
       //_toolbar_ui.slideDown(_callback);
       //_ui.show();
       _ui.removeClass('hide');
       _height = _toolbar_ui.height();
       _height = (_height * -1) + 'px';
       _ui.css('left', 0);
       _ui.css('top', _height);
       
       _ui.animate({
           top: 0
       }, {
           queue: false,
           complete: function () {
               _complete();
           }
       });
   }
   else if (_display === false && _ui_hidden === false) {
       // 準備隱藏
       
       _height = _toolbar_ui.height();
       _height = (_height * -1) + 'px';
       //$.test_msg(_height);
       //_toolbar_ui.slideUp(_callback);
       _ui.animate({
           top: _height
       }, {
           queue: false,
           complete: function () {
               _ui.addClass('hide');
               _ui.valign('top');
               _ui.align('center');
               //_ui.hide();
               _complete();
           }
       });
   }
   else {
       $.trigger_callback(_callback);
   }
   
   return this;
};

KALS_toolbar.prototype.toolbar_visible = function () {
    var _ui = this.get_ui();
    return (!(_ui.hasClass('hide'))); 
};

KALS_toolbar.prototype.toggle_loading = function (_is_loading) {
    
    //$.test_msg('toggle loading', _is_loading);
    
    var _ui = this.get_ui();
    
    var _class_name = 'loading';
    
    if ($.is_null(_is_loading)) {
        _ui.toggleClass(_class_name);
    }
    else if (_is_loading === true) {
        _ui.addClass(_class_name);
    }
    else {
        _ui.removeClass(_class_name);
    }
    
    return this;
};

KALS_toolbar.prototype.toggle_navigation = function (_show_classname) {
    
    var _toolbar_right = this.toolbar.get_right();
    var _container = _toolbar_right.children('.navigation-container:first');
    
    //$.test_msg('KALS_toolbar.toggle_navigation() container', _container.length);
    
    _container.children(':not(.common-navigation)').hide();
    _container.children('.' + _show_classname).show();
    
    //$.test_msg('KALS_toolbar.toggle_navigation()', [_show_classname, _toolbar_right.children('.' + _show_classname).length
    //    , _toolbar_right.length, _toolbar_right.html()]);
    
    return this;
};    

KALS_toolbar.prototype.disable = function () {
    this.get_ui().hide();
    this.padding.get_ui().hide();
};

/**
 * 取得工具列的高度
 * @returns {Int}
 */
KALS_toolbar.prototype.get_height = function () {
    return this.height();
};

/**
 * 取得工具列的高度
 * @returns {Int}
 */
KALS_toolbar.prototype.height = function () {
    var _ui = this.get_ui();
    var _height = _ui.find("table.toolbar-component:first").height();
    if (_height === 0) {
        _height = _ui.height();
    }
    return _height;
};

/* End of file KALS_toolbar */
/* Location: ./system/application/views/web_apps/KALS_toolbar.js */