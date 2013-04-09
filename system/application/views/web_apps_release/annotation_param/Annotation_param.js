/**
 * Annotation_param
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/19 下午 12:13:19
 */
function Annotation_param(_param) {
    
    this.user = null;
    this.topic = null;
    this.respond_to_coll = null;
    this.recommend = null;
    this.scope = null;
    this.share_list = null;
    this.feature_location = [];
    this.feature_recommend_scope = null;
    this.type = new Annotation_type_param();
    this.navigation_level = 0;
    
    if ($.isset(_param))
    {
        this.import_json(_param);
    }
}

/**
 * 標註的ID
 * @type {number}
 */
Annotation_param.prototype.annotation_id = null;

/**
 * 標註的作者
 * @type {User_param}
 */
Annotation_param.prototype.user = null;

/**
 * 回應的主題標註
 * @type {Annotation_param}
 */
Annotation_param.prototype.topic = null;

/**
 * 回應的其他標註
 * @type {Annotation_collection_param}
 */
Annotation_param.prototype.respond_to_coll = null;

/**
 * 筆記
 * @type {String}
 */
Annotation_param.prototype.note = null;

/**
 * 是否喜歡
 * @type {boolean}
 */
Annotation_param.prototype.is_like = false;

Annotation_param.prototype.is_read = false;
/**
 * 喜歡的人數
 * @type {number}
 */
Annotation_param.prototype.like_count = 0;

Annotation_param.prototype.read_count = 0;
/**
 * 標註類型
 * 1    importance
 * 2    question
 * 3    confusion
 * 4    summary
 * 5    concept
 * 6    example
 * 7    custom
 * @type {Annotation_type_param}
 */
Annotation_param.prototype.type = null;

/**
 * 時間。通常是指更新的時間，而非建立的時間。
 * @type {Date}
 */
Annotation_param.prototype.timestamp = null;

/**
 * 推薦標註
 * @type {Annotation_param|null}
 */
Annotation_param.prototype.recommend = null;

/**
 * 範圍
 * @type {Scope_colleciotn_param}
 */
Annotation_param.prototype.scope = null;

/**
 * 特徵：位置
 * 'location-head',    //0
 * 'location-near-head',    //1
 * 'location-near-head-foot'    //2
 * 'location-near-foot'    //3
 * 'location-foot',    //4
 * 'location-other'    //5
 * 'location-head-foot'    //6
 * 改以一個陣列輸出
 */
Annotation_param.prototype.feature_location = [];

/**
 * 特徵：推薦範圍
 * @type {Scope_collection_param}
 */
Annotation_param.prototype.feature_recommend_scope = null;

/**
 * 權限設定
 * @type {String} 代號的意義如下：
 * 1    public
 * 2    private    private特別是指只有自己能閱讀
 * 3    share  
 */
Annotation_param.prototype.policy_type = 'public';

/**
 * 私密清單。只有在policy_type='share'的時候才需要設定。
 * @type {User_collection_param}
 */
Annotation_param.prototype.share_list = null;

/**
 * 只負責存入，不負責匯出
 * @type {Object} = {
 *     annotation_collection: [],
 *     totally_loaded: true
 * }
 */
Annotation_param.prototype.respond_list = null;

/**
 * 指引標註的等級
 * @type {number}
 */
Annotation_param.prototype.navigation_level = 1;

//------------------------

/**
 * 是否是回應的標註
 * @type {boolean}
 */
Annotation_param.prototype.is_respond = function () {
    return (this.topic != null);
};

/**
 * 是否是現在登入者的標註。未登入的情況下一律回傳false
 * @type {boolean}
 */
Annotation_param.prototype.is_my_annotation = function () {
    
    if (this.user == null)
        return false;
    
    var _user_id = KALS_context.user.get_id();
    var _author_id = this.user.get_id();
    
    return (_user_id == _author_id);
};

/**
 * 是否擁有建議
 * @type {boolean}
 */
Annotation_param.prototype.has_recommend = function () {
    return !(this.recommend == null);
};

Annotation_param.prototype._plain_types = [
    'annotation_id',
    'feature_location',
    'note',
    'policy_type',
    'timestamp',
    'is_like',
	'is_read',
    'like_count',
	'read_count',
    'respond_list'
];

Annotation_param.prototype._param_types = [
    'feature_recommend_scope',
    //'recommend',    //新增或修改時不會動到recommend
    'respond_to_coll',
    'topic',
    'scope',
    'share_list',
    'user',
    'type',
    'recommend'    //只輸入不輸出
];

Annotation_param.prototype._only_for_import = [
    'recommend',
    'like_count',
	'read_count'
];

Annotation_param.prototype._policy_types = {
    1: 'public',
    2: 'private',
    3: 'share'
};

Annotation_param.prototype.export_json = function () {
    
    var _json = {};
    
    var _plain_types = this._plain_types;
    for (var _i in _plain_types)
    {
        var _attr = _plain_types[_i];
        if ($.isset(this[_attr]))
        {
            var _value = this[_attr];
            if (_attr == 'note')
            {
                _value = encodeURIComponent(_value);
            }
            else if (_attr == 'policy_type' && $.is_string(_value))
            {
                for (var _p in this._policy_types)
                {
                    var _policy_type = this._policy_types[_p];
                    if (_policy_type == _value)
                    {
                        _value = parseInt(_p);
                        break;
                    }
                }
            }
            else if (_attr == 'respond_list')
            {
                continue;
            }
            
            _json[_attr] = _value;
        }
    }
    
    var _param_types = this._param_types;
    
    for (var _i in _param_types)
    {
        var _attr = _param_types[_i];
        //$.test_msg('Annotation_param.export_json', [_attr, ($.isset(this[_attr]))]);
        
        if ($.isset(this[_attr]))
        {
            if (_attr == 'respond_to_coll')
            {
                var _data = this[_attr].export_respond_json();
                if ($.is_array(_data) && _data.length > 0)
                    _json[_attr] = _data;
            }  
            else if (_attr == 'topic')
            {
                _json[_attr] = this[_attr].export_respond_json();
            }
            else if ($.inArray(_attr, this._only_for_import) > -1)
            {
                // 不做輸出！
                continue;
            }
            else
                _json[_attr] = this[_attr].export_json();
        }
    }
    
    return _json;
};

Annotation_param.prototype.export_respond_json = function () {
    var _data = {};
    
    if ($.isset(this.annotation_id))
        _data.annotation_id = this.annotation_id;
        
    return _data;
};

Annotation_param.prototype.import_json = function (_json) 
{
    //取得Annotation的note時，也記得要先做urlencode()跟JavaScript端的decodeURIComponent()
    var _plain_types = this._plain_types;
    for (var _i in _plain_types)
    {
        var _attr = _plain_types[_i];
        if (typeof(_json[_attr]) != 'undefined')
        {
            var _value = _json[_attr];
            if (_attr == 'note')
            {
                _value = decodeURIComponent(_value);
            }
            else if (_attr == 'policy_type' && $.is_number(_value))
            {
                _value = _value + '';
                for (var _p in this._policy_types)
                {
                    var _policy_type = this._policy_types[_p];
                    if (_p == _value)
                    {
                        _value = _policy_type;
                        break;
                    }
                }
            }
            
            this[_attr] = _value;
        }
    }
    
    var _param_types = this._param_types;
    for (var _i in _param_types)
    {
        var _attr = _param_types[_i];
        if (typeof(_json[_attr]) != 'undefined')
        {
            var _value = _json[_attr];
            if (_attr == 'respond_to_coll')
                this[_attr] = new Annotation_collection_param(_value);
            else if (_attr == 'scope')
                this[_attr] = new Scope_collection_param(_value);
            else if (_attr == 'share_list')
                this[_attr] = new User_collection_param(_value);
            else if (_attr == 'user')
                this[_attr] = new User_param(_value);
            else if (_attr == 'topic')
                this[_attr] = new Annotation_param(_value);
            else if (_attr == 'type')
            {
                _value = decodeURIComponent(_value);
                //this[_attr] = new Annotation_type_param(_value);
                this[_attr] = KALS_context.custom_type.import_json(_value);
            }
            else if (_attr == 'recommend')
                this[_attr] = new Recommend_param(_value);
        }
    }
    
    return this;
};

/**
 * 設置標註類型
 * @param {Annotation_type_param} _type
 */
Annotation_param.prototype.set_type = function (_type) {
    this.type = _type;
    return this;
};

Annotation_param.prototype.get_interval_time = function () {
    var _timestamp = this.timestamp;
    if ($.is_null(_timestamp))
        return null;
    else
        return $.get_interval_time(_timestamp);
};

/**
 * 取得指引等級
 * @type {number} 
 */
Annotation_param.prototype.get_navigation_level = function () {
    return this.navigation_level;
};

/* End of file Annotation_param */
/* Location: ./system/application/views/web_apps/Annotation_param.js */