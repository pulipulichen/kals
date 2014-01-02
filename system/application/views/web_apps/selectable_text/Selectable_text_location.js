/**
 * Selectable_text_location
 *
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) Expression year is undefined on line 7, column 33 in Templates/KALS/KALS_JavaScript_Class.js., Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2014/1/2 下午 09:45:35
 */

/**
 * @memberOf {Selectable_text_location}
 * @extends {KALS_user_interface}
 * @constructor
 * @param {Selectable_text} _selectable_text 父物件
 */
function Selectable_text_location(_selectable_text) {
    
    this._selectable_text = _selectable_text;
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Selectable_text_location}
 */
Selectable_text_location.prototype = new KALS_user_interface();

/**
 * 父物件
 * @type {Selectable_text}
 */
Selectable_text_location.prototype._selectable_text;

/**
 * 主要可以選擇的物件
 * @type {jQuery}
 */
Selectable_text_location.prototype._text;

// -----------------------------------
// 內部參數設定
// -----------------------------------

/**
 * 標註相對位置的classname，以及其代號
 * 
 * 2221 檢查完畢
 * @type {Array} 
 */
Selectable_text_location.prototype.location_classnames = [
                             //view modal
    'location-head',         //0    0 表示開頭
    'location-foot',         //1    4 表示結尾
    null,                    //2    2 表示同時是接近開頭與結尾
    'location-near-head',    //3    1 表示接近開頭
    'location-near-foot'     //4    3 標示接近結尾
                             //     6 表示同時是開頭與結尾
                             //     5 其他位置
];


// -----------------------------------
// 方法
// -----------------------------------

/**
 * 取得段落的特徵
 *                           //view modal
 *  'location-head',         //0    0
 *  'location-foot',         //1    4
 *  'location-near-head-foot'//2    2
 *  'location-near-head',    //3    1
 *  'location-near-foot'     //4    3
 *  'location-head-foot'     //     5
 *  (other)                  //     6
 *  
 *  2221 檢查完畢，轉接完畢
 * @param {Scope_collection_param} _scope_coll
 */
Selectable_text_location.prototype.get_location_feature = function (_scope_coll) {
	
    var _classnames = this.location_classnames;
    var _words = this._selectable_text.scope.get_words_by_scope_coll(_scope_coll);
    
    var _location_id_ary = [];
    
    var _push_location = function (_id) {
        if ($.inArray(_id, _location_id_ary) === -1) {
            _location_id_ary.push(_id);
        }
    };
    
    for (var _i in _words) {
        for (var _j in _words[_i]) {
            var _word = _words[_i][_j];
            
            if (_word.hasClass(_classnames[0]) 
                && _word.hasClass(_classnames[1])) {
                _push_location(5);
            }
            else {
                if (_word.hasClass(_classnames[0])) {
                    _push_location(0);
                }
                
                if (_word.hasClass(_classnames[1])) {
                    _push_location(4);
                }    
            }   
            
            if (_word.hasClass(_classnames[3])
                && _word.hasClass(_classnames[4])) {
                _push_location(2);
            }
            else {
                if (_word.hasClass(_classnames[3])) {
                    _push_location(1);
                }
                
                if (_word.hasClass(_classnames[4])) {
                    _push_location(3);
                }    
            }
        }
    }
    
    //if (_location_id_ary.length === 0)
    //    _location_id_ary.push(5);    //預設是5
    
    return _location_id_ary;
    
};


/* End of file Selectable_text_location */
/* Location: ./system/application/views/web_apps/Selectable_text_location.js */