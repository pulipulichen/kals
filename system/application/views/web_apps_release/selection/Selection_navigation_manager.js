/**
 * Selection_navigation_manager
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/24 下午 01:57:42
 * @extends {KALS_user_interface}
 */
function Selection_navigation_manager(_text) {
    
    KALS_user_interface.call(this);
    
    this.child('bad', new Selection_navigation_bad(_text));
    this.child('normal', new Selection_navigation_normal(_text));
    this.child('good', new Selection_navigation_good(_text));
    this.child('great', new Selection_navigation_great(_text));
    
}

// Extend from KALS_user_interface
Selection_navigation_manager.prototype = new KALS_user_interface();

Selection_navigation_manager.prototype._nav_selections = {
	1: 'bad',
	2: 'normal',
	3: 'good',
	4: 'great'
};

/**
 * @type {Selection_navigation_bad}
 */
Selection_navigation_manager.prototype.bad = null;

/**
 * @type {Selection_navigation_normal}
 */
Selection_navigation_manager.prototype.normal = null;

/**
 * @type {Selection_navigation_good}
 */
Selection_navigation_manager.prototype.good = null;

/**
 * @type {Selection_navigation_great}
 */
Selection_navigation_manager.prototype.great = null;

/**
 * 
 * @param {String} _type
 * @param {Scope_collection_param} _scope_coll
 * @param {boolean} _is_initialize
 */
Selection_navigation_manager.prototype.set_scope_coll = function (_type, _scope_coll, _is_initialize) {
    
    //$.test_msg('Selection_navigation_manager.set_scope_coll()', [_scope_coll.length(), _type, $.is_number(_type), typeof(this._nav_selections[_type])]);
    
    if (_scope_coll.length() === 0)
        return this;
        
    if ($.is_null(_is_initialize))
        _is_initialize = false;
    
    
    //$.test_msg('Selection_navigation_manager.set_scope_coll()', [_type, $.is_number(_type), typeof(this._nav_selections[_type])]);
    
    if (typeof(this._nav_selections[_type]) == 'string') {
        _type = this._nav_selections[_type];
    }
    
    for (var _i in this._nav_selections) {
        var _type_name = this._nav_selections[_i];
        
        
        //$.test_msg('Selection_navigation_manager.set_scope_coll()', [_type, _type_name, _i]);
        
        if (_type_name == _type)
        {
            //如果是現在這個類型，則設置
            this[_type].set_scope_coll(_scope_coll);
         
            //$.test_msg('Selection_navigation_manager.set_scope_coll()',[ _scope_coll.length(), typeof(this[_type].set_scope_coll), _type, _scope_coll.export_json()]);
               
            //continue;
        }   
        //else if (_is_initialize === false)
        //{
            //其他的則是刪除標註
            //this[_type_name].clear_scope_coll(_scope_coll);
        //}
    }
    
    return this;
};

Selection_navigation_manager.prototype.clear = function () {
    
    for (var _i in this._nav_selections) {
        var _type = this._nav_selections[_i];
        this[_type].clear();
    }
    return this;
};

/* End of file Selection_navigation_manager */
/* Location: ./system/application/views/web_apps/Selection_navigation_manager.js */