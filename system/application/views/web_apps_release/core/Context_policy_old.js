/**
 * Context_policy
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/12 上午 10:45:43
 * @extends {Attribute_event_dispatcher}
 */
function Context_policy(){
    
    Attribute_event_dispatcher.call(this);
    
    //if ($.object_isset('KALS_context.auth.add_listener()'))
    //{
        KALS_context.auth.add_listener(this);
    //}
}

Context_policy.prototype = new Attribute_event_dispatcher();

Context_policy.prototype._$data_key = 'policy';

Context_policy.prototype.readable = function () {
    return this.get_attr('read', true);
};

Context_policy.prototype.writable = function () {
    return this.get_attr('write', false);
};

Context_policy.prototype.allow_show_navigation = function () {
    //實驗中，預設是不顯示推薦標註
    return this.get_attr('show_navigation', false);
    
    //正式使用時，預設是顯示推薦標註
    //return this.get_attr('recommend', true);
};

Context_policy.prototype.get_navigation_data = function () {
    return this.get_attr('navigation_data');
};

Context_policy.prototype.get_my_basic = function () {
    return this.get_attr('my_basic');
};

Context_policy.prototype.get_my_custom = function () {
    return this.get_attr('my_custom');
};

Context_policy.prototype.set_readable = function (_boolean) {
    return this.set_attr('read', _boolean);
};

Context_policy.prototype.set_writable = function (_boolean) {
    return this.set_attr('write', _boolean);
};

Context_policy.prototype.set_show_navigation = function (_boolean) {
    return this.set_attr('show_navigation', _boolean);
};

/* End of file Context_policy */
/* Location: ./system/application/views/web_apps/Context_policy.js */