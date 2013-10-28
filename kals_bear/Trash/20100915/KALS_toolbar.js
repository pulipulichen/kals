/**
 * KALS_toolbar
 *
 * @package		KALS
 * @category		Webpage Application Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/8/16 下午 08:44:37
  */

/**
 * @memberOf {KALS_toolbar}
 * @constructor
 */
function KALS_toolbar(_callback) {
    
    var _this = this;
    this._setup_ui(function () {
        
        _this.logo = new Logo_component();
        _this.loading = new Loading_component();
        //_this.avatar = new Avatar_component();
        //_this.search_form = new Search_form_component();
        //_this.login_nav = new Login_navigation();
        
       //設置Toolbar
       _this._setup_toolbar_left([_this.logo.ui]);
       _this._setup_toolbar_center([_this.loading.ui]);
       _this._setup_toolbar_right([3]);
       
       //初始化做完
       _this._complete(_callback);    
    });
    
    return this;
}


/**
 * 切換中間部分
 * @param {boolean} _is_loading = true；
 * true:顯示login / false:顯示search
 */
KALS_toolbar.prototype.toggle_loading = function (_is_loading)
{
   if ($.is_null(_is_loading))
       _is_loading = true;
   
   //尚未完成
    
   var _loading = this.loading.ui;
   if (_is_loading)
   {
       _loading.show();
   }
   else
   {
       _loading.hide();
   }
   return this;
};

/**
 * 切換
 * @param {String} _type = 'login'；
 * 'login':顯示login / 'avatar': 顯示avatar
 */
KALS_toolbar.prototype.toggle_navigation = function (_type) {
    if ($.is_null(_type))
        _type = 'login';
    
    //尚未完成
    
    return this;
};


// ---------
// Public
// ---------

/**
 * @type {Logo_component}
 */
KALS_toolbar.prototype.logo = null;

/**
 * @type {Loading_component}
 */
KALS_toolbar.prototype.loading = null;

/**
 * @type {Avatar_component}
 */
KALS_toolbar.prototype.avatar = null;

/**
 * @type {Search_form_component}
 */
KALS_toolbar.prototype.search_form = null;

/**
 * @type {Login_navigation}
 */
KALS_toolbar.prototype.login_nav = null;

// ---------
// Private
// ---------

/**
 * @type {jQuery}
 */
KALS_toolbar.prototype.ui = null;

/**
 * 設置好UI
 * @param {function} _callback
 */
KALS_toolbar.prototype._setup_ui = function (_callback) {
    
    var _ui = Modal_factory.create_toolbar(); 
    
    var _toolbar = $('<div class="' + Modal_factory.modal_class_name + ' toolbar">' 
        + '<table width="100%" cellpadding="0" cellspaing="0" border="0">'
        + '<tbody><tr>'
        + '<td class="toolbar-left"></td>'
        + '<td class="toolbar-center"></td>'
        + '<td class="toolbar-right"></td>'
        + '</tr></tbody></table>'
        + '</div>')
        .appendTo(_ui);
        
    var _toggle = this._create_toggle()
        .appendTo(_ui);
    
    if ($.object_isset('KALS_context.view'))
    {
        KALS_context.view.add_listener(function () {
            if (_toolbar.visible())
            {
                var _left = _toolbar.find('.toolbar-left:first');
                if ($.is_small_width())
                {
                    _left.hide();
                }
                else
                {
                    _left.show();
                }
            }
            
            if ($.is_small_height())
            {
                _toggle.show();
            }
            else
            {
                _toggle.hide();
                _toolbar.show();
            }
        });
    }
    
    this.ui = _ui;
    
    setTimeout(function () {
        if ($.is_function(_callback))
            _callback();    
    }, 100);
    
    return this;
};

/**
 * 建立下拉的Toggle
 * 2010.8.20 不使用了，因為無法偵測移動事件
 * @deprecated 
 * @type {jQuery}
 */
KALS_toolbar.prototype._create_toggle = function () {
    
    var _toggle = $('<div class="toolbar-toggle"></div>').html(': : : :');
    var _this = this;
    
    _toggle.click(function () {
        if (_this._get_toolbar().css('display') == 'block')
        {
            _this._hide();
        }
        else
        {
            _this._show();
        }
    });
    
    return _toggle;
};
/**
 * 隱藏Toolbar，但不包括toggle
 * @param {function} _callback
 */
KALS_toolbar.prototype._hide = function (_callback) {
    
    if (this.ui.hasClass('locked'))
        return this;
    
    var _ui = this.ui;
    _ui.addClass('locked');
    this._get_toolbar().slideUp(function () {
        _ui.css('width', _ui.find('.toolbar-toggle:last').width() + 'px');
        _ui.align({option:'center', speed: 0});
        _ui.removeClass('locked');
        
        $.trigger_callback(_callback);
    });
    return this;
};

/**
 * 顯示Toolbar
 * @param {function} _callback
 */
KALS_toolbar.prototype._show = function (_callback) {
    
    if (this.ui.hasClass('locked'))
        return this;
        
    var _ui = this.ui;
    _ui.fullscreen_width();
    _ui.align({option:'center', speed: 0});
    _ui.addClass('locked');
    
    this._get_toolbar().slideDown(function () {
        _ui.removeClass('locked');
        $.trigger_callback(_callback);
    });
    
    return this;
};

/**
 * @type {jQuery} Toolbar元素
 */
KALS_toolbar.prototype._get_toolbar = function () {
    return this.ui.find('.toolbar:first');
};

KALS_toolbar.prototype._setup_toolbar_left = function(_ui_list) {
    var _toolbar_left = this._get_toolbar().find('.toolbar-left:first');
    return this._setup_component(_ui_list, _toolbar_left);
};

KALS_toolbar.prototype._setup_toolbar_center = function(_ui_list) {
    var _toolbar_center = this._get_toolbar().find('.toolbar-center:first');
    return this._setup_component(_ui_list, _toolbar_center);
};

KALS_toolbar.prototype._setup_toolbar_right = function(_ui_list) {
    var _toolbar_right = this._get_toolbar().find('.toolbar-right:first');
    return this._setup_component(_ui_list, _toolbar_right);
};

KALS_toolbar.prototype._setup_component = function (_ui_list, _container) {
    if (false == $.is_array(_ui_list))
        _ui_list = [_ui_list];
    
    for (var _i in _ui_list)
    {
        _container.append(_ui_list[_i]);
    }
    return this;
};

/**
 * 完全設置完成之後
 * @param {function} _callback
 */
KALS_toolbar.prototype._complete = function (_callback) {
    
    //跟Context註冊一下，說他初始化完成了
    KALS_context.task_core.complete('toolbar', true);
    
    if ($.is_function(_callback))
        _callback();
    return this;
};


/* End of file KALS_toolbar */
/* Location: ./system/application/views/web_apps/KALS_toolbar.js */