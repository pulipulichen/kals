/**
 * Toolbar_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/9/14 下午 07:22:35
 * @extends {KALS_user_interface}
 */
function Toolbar_component() {
    
    KALS_user_interface.call(this);

}

Toolbar_component.prototype = new KALS_user_interface();

Toolbar_component.prototype._$create_ui = function () {
    
    var _ui = $('<table width="100%" cellspacing="0" cellpadding="0" class="toolbar-component">'
        + '<tbody><tr>'
        + '<td class="toolbar-left" valign="middle" width="120">'+'&nbsp;'+'</td>'
        + '<td class="toolbar-center" valign="middle">'+'&nbsp;'+'</td>'
        + '<td class="toolbar-right" valign="middle">'+'&nbsp;'+'</td>'
        + '</tr></tbody></table>');
    
    return _ui;
};


/**
 * 把UI塞到左邊的框框去
 * @param {array} _ui_list
 */
Toolbar_component.prototype.setup_left = function (_ui_list) {
    return this._setup_component('toolbar-left', _ui_list);
};

/**
 * 把UI塞到中間的框框去
 * @param {array} _ui_list
 */
Toolbar_component.prototype.setup_center = function (_ui_list) {
    return this._setup_component('toolbar-center', _ui_list);
};

/**
 * 把UI塞到右邊的框框去
 * @param {array} _ui_list
 */
Toolbar_component.prototype.setup_right = function (_ui_list) {
    return this._setup_component('toolbar-right', _ui_list);
};

/**
 * 把UI塞到_container裡面去
 * @param {string} _container_class_name
 * @param {array} _ui_list
 */
Toolbar_component.prototype._setup_component = function (_component_class_name, _ui_list) {
    
    if ($.is_array(_ui_list) == false)
        _ui_list = [ _ui_list ];
    
    var _ui = this.get_ui();
    
    var _component = _ui.find('.' + _component_class_name + ':first');
    
    _component.empty();
    
    for (var _i in _ui_list)
    {
        _component.append(_ui_list[_i]);
    }
    
    return this;
};

Toolbar_component.prototype.toggle_left = function (_display) {
    return this._toggle_component('toolbar-left', _display);
};

Toolbar_component.prototype.toggle_center = function (_display) {
    return this._toggle_component('toolbar-center', _display);
};

Toolbar_component.prototype.toggle_right = function (_display) {
    return this._toggle_component('toolbar-right', _display);
};

Toolbar_component.prototype._toggle_component = function (_component_class_name, _display)
{
    
    var _ui = this.get_ui();
    var _component = _ui.find('.' + _component_class_name + ':first');
    
    if (_display == null)
        _component.toggle();
    else if (_display == true)
        _component.show();
    else
        _component.hide();
        
    return this;
};

Toolbar_component.prototype.get_left = function () {
    return this._get_component('toolbar-left');
};

Toolbar_component.prototype.get_left = function () {
    return this._get_component('toolbar-center');
};

Toolbar_component.prototype.get_right = function () {
    return this._get_component('toolbar-right');
};

Toolbar_component.prototype._get_component = function (_component_class_name)
{
    var _component = this.get_ui('.' + _component_class_name + ':first');
    
    return _component;
}

/* End of file Toolbar_component */
/* Location: ./system/application/views/web_apps/Toolbar_component.js */