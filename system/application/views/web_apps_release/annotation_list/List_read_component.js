/**
 * List_read_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/30 下午 02:24:45
 * @extends {JSONP_dispatcher}
 * @param {List_item}
 */
function List_read_component(_item) {
    
    JSONP_dispatcher.call(this);
    
    this._set_list_item(_item);
}

List_read_component.prototype = new JSONP_dispatcher();

// --------
// List Item
// --------

/**
 * @type {List_item}
 */
List_read_component.prototype._item = null;

List_read_component.prototype._set_list_item = function (_item) {
    if ($.isset(_item))
    {
        this._item = _item;
        var _this = this;
        this._item.add_listener('set', function (_item) {
            _this.set_param();
        });
    }
    return this;
};


List_read_component.prototype.set_param = function () {
    
    var _param = this._item.get_data();
    var _is_read = _param.is_read;
    this._toggle_read(_is_read);
    this._set_read_count(_param.read_count);
    return this;
};

// --------
// Private Attributes
// --------

List_read_component.prototype._$load_url = 'annotation_setter/read';

List_read_component.prototype.read_classname = 'readd';

List_read_component.prototype._hover_classname = 'hover';

// --------
// UI
// --------

/**
 * Create UI
 * @memberOf {List_read_component}
 * @type {jQuery} UI
 */
List_read_component.prototype._$create_ui = function ()
{
    var _ui = $('<span></span>')
        .addClass('list-read-component');
    
    var _hover_classname = this._hover_classname;
    _ui.hover(function () {
        $(this).addClass(_hover_classname);
    }, function () {
        $(this).removeClass(_hover_classname);
    });
    
    var _icon = this._create_icon_component();
    _icon.appendTo(_ui);
    
    var _count = this._create_count_component();
    _count.prependTo(_ui);
    
    //如果沒有登入，則不顯示read
    var _this = this;
    
    _ui.click(function () {
        _this.set_is_read();
    });
    
    
    return _ui;
};

List_read_component.prototype._count_component = null;

List_read_component.prototype._create_count_component = function () {
    
    var _ui = $('<span></span>')
        .addClass('count-component');
    this._count_component = _ui;
    return _ui;
};

List_read_component.prototype._icon_component = null;

List_read_component.prototype._create_icon_component = function () {
    
    var _ui = $('<span></span>')
        .addClass('icon-component');
    this._icon_component = _ui;
    return _ui;
};

/**
 * @param {boolean} _is_read
 */
List_read_component.prototype.set_is_read = function (_is_read) {
    
    if (this._lock == true)
        return;
    
    if ($.is_null(_is_read))
        _is_read = !(this.is_readd());
                
    var _annotation_id = this._item.get_annotation_id();
    
    var _data = {
        is_read: _is_read,
        annotation_id: _annotation_id
    };
    
    this._lock = true;
    
    this.load(_data, function (_this, _data) {
        
        if (_this._lock == false)
            return;
            
        _this._lock = false;
        
        _this._toggle_read(_is_read);
        
        //var _param = _this._item.get_data();
        var _lang;
        if (_is_read == true)
            _lang = _this._lang.set_read;
        else
            _lang = _this._lang.set_not_read;
            
        KALS_util.notify(_lang);
        
        //調整次數
        if (_is_read == true)
        {
            _this.add_read_count();
        }
        else
        {
            _this.reduce_read_count();
        }
    });
    return this;
};

List_read_component.prototype._lock = false;

List_read_component.prototype._lang = {
    'set_read': new KALS_language_param(
            'Add to read list',
            'list_read_component.set_read'
        ),
    'set_not_read': new KALS_language_param(
            'Remove from read list',
            'list_read_component.set_not_read'
        )
}; 


List_read_component.prototype.is_readd = function () {
    var _ui = this.get_ui();
    return _ui.hasClass(this.read_classname);
};

List_read_component.prototype._toggle_read = function (_is_read) {
    
    var _ui = this.get_ui();
    //$.test_msg('List_read_component.toggle_read 1', [_is_read, _ui.hasClass(this.read_classname), this.is_readd()]);
    
    if ($.is_null(_is_read))
        _is_read = (!(this.is_readd()));
    
    
    if (_is_read == true)
        _ui.addClass(this.read_classname);
    else
        _ui.removeClass(this.read_classname);
        
    //$.test_msg('List_read_component.toggle_read 2', [_is_read, _ui.hasClass(this.read_classname), this.is_readd()]);
    
    return this;
};

List_read_component.prototype._read_count = 0;

List_read_component.prototype._set_read_count = function (_count)
{
    if ($.is_null(_count) || _count < 1)
    {
        this._count_component.hide();
        this._count_component.empty();
        this._read_count = 0;
    }
    else
    {
        this._count_component.show();
        
        var _lang = new KALS_language_param(
            '{0} read',
            'list_read_component.read_count',
            _count
        );
        
        var _msg = KALS_context.lang.line(_lang);
        
        this._count_component.html(_msg);
        this._read_count = _count;
    }
    return this;
};

List_read_component.prototype.add_read_count = function () {
    
    this._read_count++;
    return this._set_read_count(this._read_count);
}; 

List_read_component.prototype.reset_read_count = function () {
    return this._set_read_count(0);
};

List_read_component.prototype.reduce_read_count = function () {
    this._read_count--;
    return this._set_read_count(this._read_count);
};

/* End of file List_read_component */
/* Location: ./system/application/views/web_apps/List_read_component.js */