/**
 * List_timestamp_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/30 下午 05:03:49
 * @extends {KALS_user_interface}
 * @param {List_item} _item
 */
function List_timestamp_component(_item) {
    
    KALS_user_interface.call(this);
    
    if ($.isset(_item))
        this._item = _item;
    
}

// Extend from KALS_user_interface
List_timestamp_component.prototype = new KALS_user_interface();

/**
 * @type {List_item}
 */
List_timestamp_component.prototype._item = null;

/**
 * Create UI
 * @memberOf {List_timestamp_component}
 * @type {jQuery} UI
 */
List_timestamp_component.prototype._$create_ui = function ()
{
    var _ui = $('<td></td>')
        .addClass('list-timestamp-component');
    
    var _this = this;
    setTimeout(function () {
        _this.set_timestamp();
    }, 0);    
    
    return _ui;
};

List_timestamp_component.prototype.set_timestamp = function (_timestamp) {
    
    if ($.is_null(_timestamp))
    {
        _timestamp = this._item.get_data().timestamp;
    }
    
    var _until_time = $.get_interval_time(_timestamp);
    var _message = KALS_context.lang.get_interval_message(_timestamp);
    
    var _ui = this.get_ui();
    _ui.html(_message);
    
    return this;
};


/* End of file List_timestamp_component */
/* Location: ./system/application/views/web_apps/List_timestamp_component.js */