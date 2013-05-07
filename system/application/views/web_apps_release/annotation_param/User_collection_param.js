/**
 * User_collection_param
 * 一群使用者的名單
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/19 下午 12:53:07
 * @param {User_collection_param|User_param[]} _users
 */
function User_collection_param(_users) {
    
    this.users = [];
    
    this.import_coll(_users);
}

/**
 * 使用者
 * @type {User_param[]}
 */
User_collection_param.prototype.users = [];

/**
 * 新增使用者資料
 * @param {Object} _user
 */
User_collection_param.prototype.add = function (_user) {
    
    if ($.is_array(_user)) {
        var _users = _user;
        for (var _i in _users) {
            _user = _users[_i];
            this.add(_user);
        }
        return;
    }
    
    if ($.is_number(_user)) {
        _user = new User_param(_user);
    }
    else if ($.is_class(_user, 'User_param') === false) {
        return this;
    }
    
    this.users.push(_user);
    
    return this;
};

/**
 * 移除使用者資料
 * @param {int|User_param} _user_id
 */
User_collection_param.prototype.remove = function (_user_id) {
    
    if (typeof(_user_id.id) != 'undefined')
        _user_id = _user_id.id;
    
    var _old_coll = this.users;
    var _new_coll = [];
    
    for (var _i in _old_coll) {
        var _user = _old_coll[_i];
        
        if (_user.id == _user_id)
            continue;
        else
            _new_coll.push(_user);
    }
    
    this.users = _new_coll;
    return this;
};

/**
 * 清空使用者資料
 */
User_collection_param.prototype.empty = function () {
    
    this.users = [];
    return this;
    
};

User_collection_param.prototype.length = function () {
    if ($.is_array(this.users))
        return this.users.length;
    else
        return 0;
};

/**
 * 匯入
 * @param {User_collection_param|User_param[]} _users
 */
User_collection_param.prototype.import_coll = function (_users) {
    
    if ($.isset(_users)) {
        if ($.is_class(_users, 'User_collection_param'))
            this.users = _users.users;
        else if ($.is_class(_users, 'User_param')
            || $.is_array(_users))
            this.add(_users);
    }
    return this;
};

User_collection_param.prototype.export_json = function () {
    
    var _json = [];
    
    for (var _i in this.users) {
        var _user = this.users[_i];
        var _j = _user.export_json();
        _json.push(_j);
    }
    
    return _json;
    
};

/* End of file User_collection_param */
/* Location: ./system/application/views/web_apps/User_collection_param.js */