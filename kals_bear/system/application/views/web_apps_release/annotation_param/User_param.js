/**
 * User_param
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/19 下午 12:52:59
 * @param {number} _id
 * @param {String} _name
 */
function User_param(_id, _name) {
    
    if ($.is_null(_id))
        return;
    else if ($.is_object(_id) && $.is_null(_name))
    {
        if (typeof(_id.name) != 'undefined')
            _name = _id.name;
        if (typeof(_id.id) != 'undefined')
            _id = _id.id;
    }
    
    if ($.is_number(_id))
        this.set_id(_id);
    
    if ($.isset(_name))
        this.set_name(_name);
    
}

User_param.prototype.id = null;
User_param.prototype.name = null;

User_param.prototype.set_id = function (_id) {
    this.id = _id;
};

User_param.prototype.get_id = function () {
    return this.id;
};

User_param.prototype.set_name = function (_name) {
    this.name = _name;
};

User_param.prototype.get_name = function () {
    return this.name;
};

User_param.prototype.is_me = function () {
    var _login_user = KALS_context.user.get_data();
    if ($.is_null(_login_user))
        return false;
    else
        return this.equals(_login_user);
};

User_param.prototype.equals = function (_other_user) {
    if ($.is_class(_other_user, 'User_param') == false)
        return false;
        
    var _other_user_id = _other_user.id;
    return (this.id == _other_user_id);
};

User_param.prototype.export_json = function () {
    
    var _json = {
        id: this.get_id(),
        name: this.get_name()
    };
    
    return _json;
};

/* End of file User_param */
/* Location: ./system/application/views/web_apps/User_param.js */